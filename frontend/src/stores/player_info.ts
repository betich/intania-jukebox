import { RawTrack } from "@/app/(player)/player/playback.type";
import { formatDuration } from "@/spotify/mapper";
import { create } from "zustand";

export interface Track {
  id: string;
  duration_ms: number;
  duration: string;
  name: string;
  uri: string;
  artists: string;
  album: string;
  cover: string;
}

export interface CurrentTrack extends Track {
  position_ms: number;
  position: string;
  paused: boolean;
}

export interface PlayerInfo {
  currentTrack: CurrentTrack | null;
  trackWindow: {
    current_track: Track | null;
    next_tracks: Track[];
    prvious_tracks: Track[];
  };
  setPlayerInfo: (playerInfo: Partial<PlayerInfo>) => void;
  setCurrentTrack: (
    track: RawTrack,
    position_ms: number,
    paused: boolean
  ) => void;
  setTrackWindow: (
    currentTrack: RawTrack,
    nextTracks: RawTrack[],
    previousTracks: RawTrack[]
  ) => void;
}

function mapTrack(track: RawTrack): Track {
  return {
    id: track.id,
    duration_ms: track.duration_ms,
    duration: formatDuration(track.duration_ms),
    name: track.name,
    uri: track.uri,
    artists: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    cover: track.album.images[0].url,
  };
}

function mapCurrentTrack(
  track: RawTrack,
  position_ms: number,
  paused: boolean
): CurrentTrack {
  return {
    ...mapTrack(track),
    position_ms,
    position: formatDuration(position_ms),
    paused,
  };
}

export const usePlayerInfoStore = create<PlayerInfo>((set) => ({
  currentTrack: null,
  trackWindow: {
    current_track: null,
    next_tracks: [],
    prvious_tracks: [],
  },
  setPlayerInfo: (playerInfo: Partial<PlayerInfo>) => set(playerInfo),
  setCurrentTrack: (track: RawTrack, position_ms: number, paused: boolean) =>
    set((state) => ({
      currentTrack: mapCurrentTrack(track, position_ms, paused),
      trackWindow: {
        ...state.trackWindow,
        current_track: mapTrack(track),
      },
    })),
  setTrackWindow: (
    currentTrack: RawTrack,
    nextTracks: RawTrack[],
    previousTracks: RawTrack[]
  ) =>
    set(() => ({
      trackWindow: {
        current_track: mapTrack(currentTrack),
        next_tracks: nextTracks.map(mapTrack),
        prvious_tracks: previousTracks.map(mapTrack),
      },
    })),
}));
