import { create } from "zustand";

interface Song {
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface MusicStore {
  music: Song[];
  setMusic: (music: Song[]) => void;
  addMusic: (song: Song) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  music: [],
  setMusic: (music) => set({ music }),
  addMusic: (song) => set((state) => ({ music: [...state.music, song] })),
}));
