import { Song } from "@/stores/music";

interface SpotifySearchResult {
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
      name: string;
      popularity: number;
      id: string;
      type: string;
      href: string;
      duration_ms: number;
      uri: string;
      album: {
        name: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
      };
    }[];
  };
  artists: unknown;
  albums: unknown;
  playlists: unknown;
  shows: unknown;
  episodes: unknown;
  audiobooks: unknown;
}

export function testSchema(rawData: object): rawData is SpotifySearchResult {
  return (
    "tracks" in rawData &&
    rawData.tracks !== null &&
    typeof rawData.tracks === "object" &&
    "items" in rawData.tracks &&
    Array.isArray(rawData.tracks.items) &&
    rawData.tracks.items.length > 0 &&
    "name" in rawData.tracks.items[0] &&
    "duration_ms" in rawData.tracks.items[0] &&
    "album" in rawData.tracks.items[0] &&
    "images" in rawData.tracks.items[0].album &&
    Array.isArray(rawData.tracks.items[0].album.images) &&
    "url" in rawData.tracks.items[0].album.images[0]
  );
}

function padZero(num: number): string {
  return num.toFixed(0).padStart(2, "0");
}

function formatDuration(duration_ms: number): string {
  if (duration_ms === 0) return "0:00";

  // if longer than an hour
  const hours = Math.floor(duration_ms / 3600000);
  const minutes = Math.floor((duration_ms % 3600000) / 60000);
  const seconds = ((duration_ms % 3600000) % 60000) / 1000;

  return duration_ms > 3600000
    ? `${hours}:${padZero(minutes)}:${padZero(seconds)}`
    : `${minutes}:${padZero(seconds)}`;
}

export function parseSpotifySearchResult(rawData: SpotifySearchResult): Song[] {
  return rawData.tracks.items.map((track) => ({
    title: track.name,
    artist: track.album.name,
    duration: formatDuration(track.duration_ms),
    cover: track.album.images[0].url,
  }));
}
