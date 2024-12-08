"use client";
import { useCallback, useEffect, useRef } from "react";

interface Player {
  activateElement: () => void;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  getCurrentState: () => Promise<{
    current_track: any;
    next_tracks: any;
    previous_tracks: any;
  }>;
  addListener: (event: string, cb: (a: any) => void) => void;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  _options: {
    getOAuthToken: (cb: (a: string) => void) => void;
    id: string;
  };
}

export default function WebPlayback({ token }: { token: string }) {
  const player = useRef<Player | null>(null);

  useEffect(() => {
    console.log();

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
                    "spotify:track:46kspZSY3aKmwQe7O77fCC",
                    "spotify:track:15cQVPbbwv0sZXrHRIAZeX",
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

    return () => {
      //@ts-expect-error player is not defined
      player.current.disconnect().then(() => {
        console.log("Player disconnected!");
      });
    };
  }, [token]);

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
      player.current.nextTrack().then(() => {
        console.log("Skipped to next track!");
      });
    }
  }, []);

  const handlePreviousTrack = useCallback(() => {
    if (player.current) {
      player.current.activateElement();
      player.current.previousTrack().then(() => {
        console.log("Set to previous track!");
      });
    }
  }, []);

  const handleGetCurrentState = useCallback(() => {
    if (player.current) {
      player.current.activateElement();
      player.current.getCurrentState().then((state) => {
        if (!state) {
          console.log("User is not playing music through the Web Playback SDK");
          return;
        }

        const { current_track, next_tracks, previous_tracks } =
          // @ts-expect-error current_track, next_tracks, previous_tracks are not defined
          state.track_window;

        console.log("Currently Playing", current_track);
        console.log("Playing Next", next_tracks);
        console.log("Playing Previous", previous_tracks);
      });
    }
  }, [player]);

  return (
    <main className="w-full p-4">
      <div className="max-w-screen-md mx-auto flex flex-col gap-4 min-h-screen justify-center items-center">
        <h1 className="font-bold">Player</h1>
        <div className="flex gap-4">
          <button
            className="underline hover:no-underline"
            onClick={() => handlePreviousTrack()}
          >
            previous
          </button>
          <button
            className="underline hover:no-underline"
            onClick={() => handleTogglePlay()}
          >
            play
          </button>
          <button
            className="underline hover:no-underline"
            onClick={() => handleNextTrack()}
          >
            next
          </button>
        </div>

        <button
          className="underline hover:no-underline"
          onClick={handleGetCurrentState}
        >
          get current state
        </button>
      </div>
    </main>
  );
}
