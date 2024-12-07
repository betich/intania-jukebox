import { env } from "@/env";
import { Song, SongPayload, SongQueue } from "@/stores/music";
import { mapSongQueueResult, songToSongPayload } from "./mapper";

export function formatAPIPath(path: string): URL {
  return new URL(path, env.NEXT_PUBLIC_API_BASE_URL);
}

export async function getQueue(): Promise<SongQueue[]> {
  const url = formatAPIPath("/queue");
  const songQueueResult = await fetch(url.toString(), {
    mode: "cors",
  }).then((res) => res.json());

  if (!songQueueResult) {
    throw new Error("Failed to get queue");
  }

  return mapSongQueueResult(songQueueResult);
}

export async function addSongToQueue(song: Song) {
  const url = formatAPIPath("/queue/add");

  try {
    const songPayload: SongPayload = await songToSongPayload(song);

    return fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ song: songPayload }),
    });
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function likeSong(songId: string) {
  const url = formatAPIPath(`/queue/like/${songId}`);

  return fetch(url.toString(), {
    method: "PUT",
    mode: "cors",
  });
}

export async function unLikeSong(songId: string) {
  const url = formatAPIPath(`/queue/unlike/${songId}`);

  return fetch(url.toString(), {
    method: "POST",
    mode: "cors",
  });
}
