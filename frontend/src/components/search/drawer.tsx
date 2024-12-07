"use client";
import { QueryConsumer } from "../common/QueryConsumer";
import MusicSearchCard, {
  MusicSearchCardSkeleton,
} from "./music_search_card.client";
import { useSpotifyQuery } from "@/hooks/useSpotifyQuery";

function MusicSearch({ search }: { search: string }) {
  const { data: result, isPending, error } = useSpotifyQuery({ search });

  if (error) {
    return <div>There was a problem while fetching the music</div>;
  }

  return (
    <div className="flex flex-col gap-1">
      {isPending
        ? Array.from({ length: 5 }).map((_, i) => (
            <MusicSearchCardSkeleton key={i} />
          ))
        : result &&
          result.map((m, i) => (
            <MusicSearchCard key={`${i}-${m.title}`} song={m} />
          ))}
    </div>
  );
}

export default function SearchDrawer({ search }: { search: string }) {
  return (
    <QueryConsumer>
      <div className="w-full bg-white flex flex-col gap-4 absolute top-20 border border-gray-100 shadow-lg p-4 rounded-lg">
        <h1 className="text-xl font-lg">ค้นหาเพลง</h1>

        <MusicSearch search={search} />
      </div>
    </QueryConsumer>
  );
}
