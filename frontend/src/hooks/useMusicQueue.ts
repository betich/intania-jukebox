"use client";

import { addSongToQueue, getQueue, likeSong } from "@/music_manager/fetch";
import { Song } from "@/stores/music";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export function useMusicQueue() {
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

  const likeMusic = useCallback(
    (songId: string) => {
      likeSong(songId);
      refetch();
    },
    [refetch]
  );

  return {
    music: data,
    error,
    isLoading,
    addMusic,
    likeMusic,
  };
}
