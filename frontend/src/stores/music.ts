import { create } from "zustand";

interface SongQueue {
  position: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export interface Song {
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface MusicStore {
  music: SongQueue[];
  setMusic: (music: Song[]) => void;
  addMusic: (song: Song) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  music: [],
  setMusic: (music) => {
    const indexedMusic = music.map((m, i) => ({ ...m, position: i + 1 }));
    set({ music: indexedMusic });
  },
  addMusic: (song) =>
    set((state) => ({
      music: [...state.music, { ...song, position: state.music.length + 1 }],
    })),
}));
