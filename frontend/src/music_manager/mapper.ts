import { getTrack } from "@/spotify/getTrack";
import { parseSpotifyTrackResult } from "@/spotify/mapper";
import { Song, SongPayload, SongQueue } from "@/stores/music";

export async function songToSongPayload(song: Song): Promise<SongPayload> {
  const songId = song.id;

  const trackResult = await getTrack(songId);

  if (trackResult === null) {
    throw new Error("Failed to get track");
  }

  return parseSpotifyTrackResult(trackResult);
}

interface SongQueueResult {
  content: {
    queue: {
      likes: number;
      position: number;
      song: Song;
    }[];
    size: number;
  };
  message: string;
}

export function mapSongQueueResult(
  songQueueResult: SongQueueResult
): SongQueue[] {
  return songQueueResult.content.queue.map((queueItem) => ({
    position: queueItem.position,
    likes: queueItem.likes,
    title: queueItem.song.title,
    artist: queueItem.song.artist,
    duration: queueItem.song.duration,
    cover: queueItem.song.cover,
  }));
}