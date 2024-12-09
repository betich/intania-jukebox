import { create } from "zustand";

export interface SongQueue {
  id: string;
  position: number;
  likes: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  uri: string;
  queueId?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  uri: string;
}

export interface SongPayload {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: number;
  release_date: string;
  album: string;
  popularity: number;
  uri: string;
}

interface MusicState {
  music: SongQueue[];
  setMusic: (music: Song[]) => void;
  addMusic: (song: Song) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  music: [],
  setMusic: (music) => {
    const indexedMusic = music.map((m, i) => ({
      ...m,
      position: i + 1,
      likes: 0,
    }));
    set({ music: indexedMusic });
  },
  addMusic: (song) =>
    set((state) => ({
      music: [
        ...state.music,
        { ...song, position: state.music.length + 1, likes: 0 },
      ],
    })),
}));
