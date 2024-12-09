"use client";

import Image from "next/image";
import { usePlayer } from "./usePlayer";

export default function WebPlayback({ token }: { token: string }) {
  const {
    handleTogglePlay,
    handleNextTrack,
    handlePreviousTrack,
    handleSetVolume,
    // handleSeek,
    currentTrack,
    isEmpty,
    // trackWindow,
    upcomingTracks,
  } = usePlayer({ token });

  return (
    <main className="w-full p-4">
      <div className="max-w-screen-md mx-auto flex flex-col gap-4 min-h-screen justify-center items-center">
        <h1 className="font-bold text-2xl">Player</h1>

        {currentTrack && !isEmpty ? (
          <div className="flex flex-col gap-2 items-center pt-6 pb-2">
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
              <p>{currentTrack.artists}</p>
            </div>
          </div>
        ) : (
          <h2 className="font-bold">No current track</h2>
        )}

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

        <div className="flex items-center gap-2">
          <label htmlFor="seek">
            {currentTrack ? currentTrack.position : "-:--"}
          </label>
          <input
            id="seek"
            type="range"
            min="0"
            max="100"
            step="0.01"
            value={
              currentTrack
                ? ~~(
                    (currentTrack?.position_ms / currentTrack?.duration_ms) *
                    100
                  )
                : 0
            }
            readOnly
            disabled={!currentTrack}
            // onChange={(e) => setSeek(parseFloat(e.target.value))}
          />
          <p>{currentTrack ? currentTrack.duration : "-:--"}</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="volume">Volume</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => handleSetVolume(parseFloat(e.target.value))}
            disabled={!currentTrack}
          />
        </div>

        {!isEmpty && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">Next Tracks</h2>
            {upcomingTracks.map((track, i) => (
              <div key={`${track.id}-${i}`} className="flex gap-4">
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
