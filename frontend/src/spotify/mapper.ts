import { Song, SongPayload } from "@/stores/music";

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
      artists: {
        id: string;
        name: string;
        type: "artist";
        href: string;
        uri: string;
      }[];
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
    "url" in rawData.tracks.items[0].album.images[0] &&
    "artists" in rawData.tracks.items[0] &&
    Array.isArray(rawData.tracks.items[0].artists) &&
    rawData.tracks.items[0].id &&
    rawData.tracks.items[0].uri
  );
}

function padZero(num: number): string {
  return num.toFixed(0).padStart(2, "0");
}

export function formatDuration(duration_ms: number): string {
  if (duration_ms === 0) return "0:00";

  // if longer than an hour
  const hours = Math.floor(duration_ms / 3600000);
  const minutes = Math.floor((duration_ms % 3600000) / 60000);
  const seconds = Math.floor(((duration_ms % 3600000) % 60000) / 1000);

  return duration_ms > 3600000
    ? `${hours}:${padZero(minutes)}:${padZero(seconds)}`
    : `${minutes}:${padZero(seconds)}`;
}

export function parseSpotifySearchResult(rawData: SpotifySearchResult): Song[] {
  return rawData.tracks.items.map((track) => ({
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    duration: formatDuration(track.duration_ms),
    cover: track.album.images[0].url,
    id: track.id,
    uri: track.uri,
  }));
}

export function parseSpotifyTrackResult(
  rawData: SpotifyTrackResult
): SongPayload {
  return {
    title: rawData.name,
    artist: rawData.artists.map((artist) => artist.name).join(", "),
    duration: rawData.duration_ms,
    cover: rawData.album.images[0].url,
    release_date: rawData.album.release_date,
    id: rawData.id,
    album: rawData.album.name,
    popularity: rawData.popularity,
    uri: rawData.uri,
  };
}

export interface SpotifyTrackResult {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    type: string;
    uri: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object;
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}
