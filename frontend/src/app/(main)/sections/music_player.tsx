"use client";
import { Player } from "@/components/music";
import { useMusic } from "@/hooks/useMusic";

export default function MusicPlayer() {
  const { music } = useMusic();

  return (
    <div className="flex bg-red-50 flex-col w-full pt-12 pb-6">
      <Player music={music} />
    </div>
  );
}
