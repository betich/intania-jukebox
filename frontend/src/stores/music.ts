import { create } from "zustand";

export interface SongQueue {
  id: string;
  position: number;
  likes: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export interface SongPayload extends Song {
  release_date: string;
  id: string;
  album: string;
  popularity: number;
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
