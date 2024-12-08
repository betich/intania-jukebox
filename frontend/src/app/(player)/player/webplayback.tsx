"use client";

import Image from "next/image";
import { usePlayer } from "./usePlayer";

export default function WebPlayback({ token }: { token: string }) {
  const {
    handleTogglePlay,
    handleNextTrack,
    handlePreviousTrack,
    handleSetVolume,
    currentTrack,
    isEmpty,
    trackWindow,
  } = usePlayer({ token });

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
            {!currentTrack || currentTrack?.paused ? "play" : "pause"}
          </button>
          <button
            className="underline hover:no-underline"
            onClick={() => handleNextTrack()}
          >
            next
          </button>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => handleSetVolume(parseFloat(e.target.value))}
        />

        {currentTrack && !isEmpty ? (
          <div className="flex flex-col gap-2 items-center">
            <h2 className="font-bold">Current Track</h2>
            <Image
              width={128}
              height={128}
              src={currentTrack.cover}
              alt={currentTrack.name}
              className="rounded-sm"
            />
            <div className="flex flex-col items-center">
              <p className="font-bold">{currentTrack.name}</p>
              <p>
                {currentTrack.artists} · {currentTrack.duration}
              </p>
            </div>
            <p>{currentTrack.position}</p>
          </div>
        ) : (
          <h2 className="font-bold">No current track</h2>
        )}

        {!isEmpty && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">Next Tracks</h2>
            {trackWindow.next_tracks.map((track) => (
              <div key={track.id} className="flex gap-4">
                <Image
                  width={48}
                  height={48}
                  src={track.cover}
                  alt={track.name}
                  className="rounded-sm"
                />
                <div className="flex flex-col">
                  <p>{track.name}</p>
                  <p>
                    {track.artists} · {track.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
