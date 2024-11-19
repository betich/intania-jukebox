"use client";
import { useMusicStore } from "@/stores/music";
import { useEffect } from "react";

export function useMusic() {
  const musicStore = useMusicStore();
  const { music, setMusic, addMusic } = musicStore;

  useEffect(() => {
    // Fetch music from server
    // setMusic(mockMusic);
  }, [setMusic]);

  return {
    music,
    addMusic,
  };
}
