"use client";

import { addSongToQueue, getQueue } from "@/music_manager/fetch";
import { Song } from "@/stores/music";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

// import { useMusicStore } from "@/stores/music";
// import { useEffect } from "react";

export function useMusicQueue() {
  // const musicStore = useMusicStore();
  // const { music, setMusic, addMusic } = musicStore;

  // useEffect(() => {
  //   // Fetch music from server
  //   // setMusic(mockMusic);
  // }, [setMusic]);

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["music"],
    queryFn: () => getQueue(),
    refetchInterval: 1000,
  });

  const addMusic = useCallback(
    (song: Song) => {
      addSongToQueue(song);
      refetch();
    },
    [refetch]
  );

  return {
    music: data,
    error,
    isLoading,
    addMusic,
  };
}
