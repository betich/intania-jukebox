"use client";
import MusicSearchCard from "./music_search_card.client";
import { useSpotify } from "@/hooks/useSpotify";

export default function SearchDrawer({ search }: { search: string }) {
  const { result } = useSpotify({ search });

  return (
    <div className="w-full bg-white flex flex-col gap-4 absolute top-20 border border-gray-100 shadow-lg p-4 rounded-lg">
      <h1 className="text-xl font-lg">ค้นหาเพลง</h1>

      <div className="flex flex-col gap-1">
        {result.map((m, i) => (
          <MusicSearchCard key={`${i}-${m.title}`} song={m} />
        ))}
      </div>
    </div>
  );
}
