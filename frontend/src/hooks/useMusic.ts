"use client";
import { useMusicStore } from "@/stores/music";
import { useEffect } from "react";

const mockMusic = [
  {
    title: "Something",
    artist: "The Beatles",
    duration: "3:00",
    cover: "https://placehold.co/150x150.png",
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    duration: "4:00",
    cover: "https://placehold.co/150x150.png",
  },
  {
    title: "APT.",
    artist: "ROSÉ, Bruno Mars",
    duration: "2:14",
    cover: "https://placehold.co/150x150.png",
  },
  {
    title: "APT.",
    artist: "ROSÉ, Bruno Mars",
    duration: "2:14",
    cover: "https://placehold.co/150x150.png",
  },
];

export function useMusic() {
  const musicStore = useMusicStore();
  const { music, setMusic, addMusic } = musicStore;

  useEffect(() => {
    // Fetch music from server
    setMusic(mockMusic);
  }, [setMusic]);

  return {
    music,
    addMusic,
  };
}
