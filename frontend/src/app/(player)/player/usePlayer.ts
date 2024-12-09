"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlaybackState } from "./playback.type";
import { usePlayerInfoStore } from "@/stores/player_info";
import {
  getNextTrack as getCurrentTrack,
  deleteTrack,
  getUpcomingTracks,
} from "./queue";
import { io, type Socket } from "socket.io-client";
import { env } from "@/env";

interface Player {
  activateElement: () => void;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  getCurrentState: () => Promise<PlaybackState>;
  addListener: (event: string, cb: (a: any) => void) => void;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  _options: {
    getOAuthToken: (cb: (a: string) => void) => void;
    id: string;
  };
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
}

export interface ServerToClientEvents {
  // detect_color: (data: { data: string[] }) => void;
  hello: () => void;
  command: (data: {
    command: "TOGGLE_PLAY" | "NEXT" | "VOLUME_UP" | "VOLUME_DOWN";
  }) => void;
}

export interface ClientToServerEvents {
  hi: () => void;
}

export function usePlayer({ token }: { token: string }) {
  const player = useRef<Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const {
    currentTrack,
    trackWindow,
    isEmpty,
    setIsEmpty,
    setCurrentTrack,
    setTrackWindow,
    upcomingTracks,
    setUpcomingTracks,
    clear,
  } = usePlayerInfoStore();

  const play = useCallback(
    async ({
      spotify_uri,
      position_ms,
    }: {
      spotify_uri: string;
      position_ms: number;
    }) => {
      if (player.current && deviceId) {
        const getOAuthToken = player.current._options.getOAuthToken;
        getOAuthToken((access_token) => {
          fetch("https://api.spotify.com/v1/me/player/devices", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("devices", data);
            });

          fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
            {
              method: "PUT",
              body: JSON.stringify({
                uris: [spotify_uri],
                position_ms,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
        });
      }
    },
    [deviceId]
  );

  useEffect(() => {
    //@ts-expect-error player is not defined
    window.onSpotifyWebPlaybackSDKReady = () => {
      //@ts-expect-error player is not defined
      const newPlayer = new window.Spotify.Player({
        name: "Intania Jukebox v1",
        getOAuthToken: (cb: (a: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      player.current = newPlayer;

      //@ts-expect-error player is not defined
      player.current.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });

      //@ts-expect-error player is not defined
      player.current.addListener("ready", ({ device_id }) => {
        console.log("The Web Playback SDK is ready to play music!");
        console.log("Ready with Device ID", device_id);

        setDeviceId(device_id);

        if (player.current) {
          player.current.activateElement();
        }
      });

      //@ts-expect-error player is not defined
      player.current.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      if (player.current) player.current.connect();
    };

    // return () => {
    //   if (player.current)
    //     player.current.disconnect().then(() => {
    //       console.log("Player disconnected!");
    //     });
    // };
  }, [token, play]);

  const clearEverything = useCallback(() => {
    clear();
    setIsEmpty(true);
    if (player.current) {
      player.current.togglePlay();
    }
  }, [clear, setIsEmpty]);

  const handleGetCurrentState = useCallback(() => {
    if (player.current && deviceId) {
      player.current.getCurrentState().then((state) => {
        if (!state) {
          console.log("User is not playing music through the Web Playback SDK");
          setIsEmpty(true);

          getCurrentTrack().then((track) => {
            if (!track) {
              clearEverything();
              return;
            }
            play({
              spotify_uri: track.uri,
              position_ms: 0,
            }).then(() => {
              player?.current?.activateElement();
              console.log("[e] Playing music!");
            });
          });

          return;
        }

        const { current_track, next_tracks, previous_tracks } =
          state.track_window;

        // song has finished
        if (
          current_track &&
          current_track?.duration_ms - state.position < 1000
        ) {
          deleteTrack(current_track?.id ?? "").then(() => {
            getCurrentTrack().then((track) => {
              if (!track) {
                clearEverything();
                return;
              }
              play({
                spotify_uri: track.uri,
                position_ms: 0,
              }).then(() => {
                player?.current?.activateElement();
                console.log("[f] Playing music!");
              });
            });
          });
          return;
        }

        getCurrentTrack().then((track) => {
          if (!track) {
            clearEverything();
            return;
          }
          if (track?.uri !== current_track?.uri) {
            play({
              spotify_uri: track.uri,
              position_ms: 0,
            }).then(() => {
              player?.current?.activateElement();
              console.log("[mis] Playing music!");
            });
          }
        });

        getUpcomingTracks().then((tracks) => {
          setUpcomingTracks(tracks);
        });

        setIsEmpty(false);
        setCurrentTrack(current_track, state.position, state.paused);
        setTrackWindow(current_track, next_tracks, previous_tracks);
      });
    }
  }, [
    player,
    setCurrentTrack,
    setTrackWindow,
    setIsEmpty,
    play,
    deviceId,
    setUpcomingTracks,
    clearEverything,
  ]);

  useEffect(() => {
    // interval
    const interval = setInterval(() => {
      handleGetCurrentState();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [handleGetCurrentState]);

  const handleTogglePlay = useCallback(() => {
    if (player.current) {
      player.current.activateElement();
      player.current.togglePlay().then(() => {
        console.log("Toggled playback!");
      });
    }
  }, []);

  const handleNextTrack = useCallback(() => {
    if (player.current) {
      player.current.activateElement();
      // player.current.nextTrack().then(() => {
      //   console.log("Skipped to next track!");
      // });
      player.current.getCurrentState().then((state) => {
        const currentTrack = state.track_window.current_track;
        deleteTrack(currentTrack!.id);
      });
    }
  }, []);

  const handlePreviousTrack = useCallback(() => {
    if (player.current) {
      player.current.activateElement();
      player.current.previousTrack().then(() => {
        console.log("Set to previous track!");
      });
      handleGetCurrentState();
    }
  }, [handleGetCurrentState]);

  const handleSetVolume = useCallback((volume_ratio: number) => {
    if (volume_ratio < 0 || volume_ratio > 1) {
      console.error("Volume must be between 0 and 1");
      return;
    }

    if (player.current) {
      player.current.setVolume(volume_ratio).then(() => {
        console.log("Set volume to", volume_ratio);
      });
    }
  }, []);

  const handleSeek = useCallback((percent: number) => {
    if (player.current) {
      player.current.getCurrentState().then((state) => {
        const currentTrack = state.track_window.current_track;
        const progress_ms = (percent / 100) * currentTrack!.duration_ms;

        player?.current?.seek(progress_ms).then(() => {
          console.log("Seeked to", progress_ms);
        });
      });
    }
  }, []);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      env.NEXT_PUBLIC_API_BASE_URL
    );

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("hello", () => {
      console.log("hello from server :)");
      socket.emit("hi");
    });

    socket.on("command", (data) => {
      console.log("command", data);
      switch (data.command) {
        case "TOGGLE_PLAY":
          handleTogglePlay();
          break;
        case "NEXT":
          handleNextTrack();
          break;
        case "VOLUME_UP":
          player.current?.getVolume().then((volume) => {
            handleSetVolume(volume ? volume + 0.1 : 0.5);
          });
          break;
        case "VOLUME_DOWN":
          player.current?.getVolume().then((volume) => {
            handleSetVolume(volume ? volume - 0.1 : 0.5);
          });
          break;
      }
    });
  }, [handleSetVolume, handleNextTrack, handleTogglePlay]);

  return {
    handleTogglePlay,
    handleNextTrack,
    handlePreviousTrack,
    handleGetCurrentState,
    handleSetVolume,
    currentTrack,
    trackWindow,
    isEmpty,
    handleSeek,
    upcomingTracks,
  };
}
