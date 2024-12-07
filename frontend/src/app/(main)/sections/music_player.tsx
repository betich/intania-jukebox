"use client";
import { Player } from "@/components/music";
import { useMusicQueue } from "@/hooks/useMusicQueue";

export default function MusicPlayer() {
  const { music } = useMusicQueue();

  return (
    <div className="flex bg-red-50 flex-col items-center w-full pt-12 pb-6">
      <Player music={music ?? []} />
    </div>
  );
}
