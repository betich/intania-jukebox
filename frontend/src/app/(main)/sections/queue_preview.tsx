"use client";
// import { Button } from "@/components/common/button";
import { H2 } from "@/components/common/typography";
import { MusicCard } from "@/components/music";
import { useMusicQueue } from "@/hooks/useMusicQueue";

export default function QueuePreview() {
  const { music, likeMusic, likes } = useMusicQueue();

  return (
    <div className="flex flex-col p-4 bg-white border gap-4 border-slate-300 max-w-screen-sm w-full rounded-lg">
      <div className="flex justify-between items-center">
        <H2>เพลงในคิว</H2>
        {/* <Button>ดูคิวทั้งหมด</Button> */}
      </div>
      <div className="flex flex-col w-full gap-4">
        {music &&
          music.map((m, i) => (
            <MusicCard
              key={`${m.position}-${m.title}-${m.id}-${i}`}
              likeMusic={likeMusic}
              isLiked={likes.includes(m.id)}
              {...m}
            />
          ))}
      </div>
    </div>
  );
}
