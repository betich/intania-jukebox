"use client";

import { addSongToQueue, getQueue, likeSong } from "@/music_manager/fetch";
import { Song } from "@/stores/music";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback } from "react";

export function useMusicQueue() {
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["music"],
    queryFn: () => getQueue(),
    refetchInterval: 1000,
  });
  const [likes, setLikes] = useLocalStorage<string[]>("likes", []);

  const addMusic = useCallback(
    (song: Song) => {
      addSongToQueue(song);
      refetch();
    },
    [refetch]
  );

  const likeMusic = useCallback(
    (id: string) => {
      if (likes.includes(id)) {
        return;
      } else {
        likeSong(id);
        setLikes((value) => [...value, id]);
        refetch();
      }
    },
    [refetch, setLikes, likes]
  );

  return {
    music: data,
    error,
    isLoading,
    addMusic,
    likeMusic,
    likes,
  };
}
