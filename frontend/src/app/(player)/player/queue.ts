import { formatAPIPath } from "@/music_manager/fetch";
import { formatDuration } from "@/spotify/mapper";
import { Track } from "@/stores/player_info";

function mapSongQueueResult(queueItem: any): Track {
  return {
    id: queueItem.song.id,
    duration_ms: queueItem.song.duration,
    duration: formatDuration(queueItem.song.duration),
    name: queueItem.song.title,
    uri: queueItem.song.uri,
    artists: queueItem.song.artist,
    album: queueItem.song.album,
    cover: queueItem.song.cover,
  };
}

export async function getNextTrack(): Promise<Track> {
  const url = formatAPIPath("/queue");
  const songQueueResult = await fetch(url.toString(), {
    mode: "cors",
  }).then((res) => res.json());

  if (!songQueueResult) {
    throw new Error("Failed to get queue");
  }

  return mapSongQueueResult(songQueueResult.content.queue[0]);
}

export async function getUpcomingTracks(): Promise<Track[]> {
  const url = formatAPIPath("/queue");
  const songQueueResult = await fetch(url.toString(), {
    mode: "cors",
  }).then((res) => res.json());

  if (!songQueueResult) {
    throw new Error("Failed to get queue");
  }

  return songQueueResult.content.queue.slice(1, 6).map(mapSongQueueResult);
}

export async function deleteTrack(trackId: string) {
  const url = formatAPIPath(`/queue/music/${trackId}`);

  return fetch(url.toString(), {
    method: "DELETE",
    mode: "cors",
  });
}

export async function popTrack() {
  const url = formatAPIPath("/queue/pop");

  return fetch(url.toString(), {
    mode: "cors",
  });
}
