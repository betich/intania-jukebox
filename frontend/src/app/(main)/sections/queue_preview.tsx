"use client";
import { Button } from "@/components/common/button";
import { H2 } from "@/components/common/typography";
import MusicCard from "@/components/music/music_card.client";
import { useMusic } from "@/hooks/useMusic";

export default function QueuePreview() {
  const { music } = useMusic();

  return (
    <div className="flex flex-col p-4 bg-white border gap-4 border-slate-300 max-w-screen-sm w-full rounded-lg">
      <div className="flex justify-between items-center">
        <H2>เพลงในคิว</H2>
        <Button>ดูคิวทั้งหมด</Button>
      </div>
      <div className="flex flex-col w-full gap-4">
        {music.map((m, i) => (
          <MusicCard
            key={`${i}-${m.title}`}
            title={m.title}
            artist={m.artist}
            duration={m.duration}
            position={i + 1}
            cover={m.cover}
          />
        ))}
      </div>
    </div>
  );
}
