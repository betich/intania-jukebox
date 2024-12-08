"use client";
import { useCallback, useEffect, useRef } from "react";
import { PlaybackState } from "./playback.type";
import { usePlayerInfoStore } from "@/stores/player_info";

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
}

export function usePlayer({ token }: { token: string }) {
  const player = useRef<Player | null>(null);
  const { currentTrack, trackWindow, setCurrentTrack, setTrackWindow } =
    usePlayerInfoStore();

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

        // play
        const play = ({
          spotify_uri,
          playerInstance: {
            _options: { getOAuthToken },
          },
          position_ms,
        }: {
          spotify_uri: string;
          playerInstance: {
            _options: {
              getOAuthToken: (cb: (a: string) => void) => void;
              id: string;
            };
          };
          position_ms: number;
        }) => {
          getOAuthToken((access_token) => {
            fetch(
              `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
              {
                method: "PUT",
                body: JSON.stringify({
                  uris: [
                    spotify_uri,
                    // TDSOTM
                    "spotify:track:574y1r7o2tRA009FW0LE7v",
                    "spotify:track:2ctvdKmETyOzPb2GiJJT53",
                    "spotify:track:73OIUNKRi2y24Cu9cOLrzM",
                    "spotify:track:3TO7bbrUKrOSPGRTB5MeCz",
                    "spotify:track:2TjdnqlpwOjhijHCwHCP2d",
                    "spotify:track:0vFOzaXqZHahrZp6enQwQb",
                    "spotify:track:1TKTiKp3zbNgrBH2IwSwIx",
                    "spotify:track:6FBPOJLxUZEair6x4kLDhf",
                    "spotify:track:05uGBKRCuePsf43Hfm0JwX",
                    "spotify:track:1tDWVeCR9oWGX8d5J9rswk",
                    //
                    "spotify:track:5JJPfHpByZ66XsEyCNVi2p",
                  ],
                  position_ms,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
          });
        };

        if (player.current) {
          play({
            playerInstance: player.current,
            spotify_uri: "spotify:track:6uPnrBgweGOcwjFL4ItAvV",
            position_ms: 0,
          });
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
  }, [token]);

  const handleGetCurrentState = useCallback(() => {
    if (player.current) {
      console.log("i am so triggered");
      player.current.getCurrentState().then((state) => {
        if (!state) {
          console.log("User is not playing music through the Web Playback SDK");
          return;
        }

        const { current_track, next_tracks, previous_tracks } =
          state.track_window;

        setCurrentTrack(current_track, state.position, state.paused);
        setTrackWindow(current_track, next_tracks, previous_tracks);
      });
    }
  }, [player, setCurrentTrack, setTrackWindow]);

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
      handleGetCurrentState();
    }
  }, [handleGetCurrentState]);

  const handleNextTrack = useCallback(() => {
    if (player.current) {
      player.current.activateElement();
      player.current.nextTrack().then(() => {
        console.log("Skipped to next track!");
      });
      handleGetCurrentState();
    }
  }, [handleGetCurrentState]);

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

  return {
    handleTogglePlay,
    handleNextTrack,
    handlePreviousTrack,
    handleGetCurrentState,
    handleSetVolume,
    currentTrack,
    trackWindow,
  };
}
