import { useMusic } from "@/hooks/useMusic";
import MusicSearchCard from "./music_search_card.client";

export default function SearchDrawer({ search }: { search: string }) {
  console.log("s", search);
  const { music } = useMusic();

  return (
    <div className="w-full bg-white flex flex-col gap-4 absolute top-20 border border-gray-100 shadow-lg p-4 rounded-lg">
      <h1 className="text-xl font-lg">ค้นหาเพลง</h1>

      <div className="flex flex-col gap-2">
        {music.map((m) => (
          <MusicSearchCard
            artist={m.artist}
            cover={m.cover}
            duration={m.duration}
            key={m.position}
            title={m.title}
          />
        ))}
      </div>
    </div>
  );
}
