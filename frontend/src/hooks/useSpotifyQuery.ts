import { musicSearch } from "@/spotify/search";
import { Song } from "@/stores/music";
import { useQuery } from "@tanstack/react-query";

export const useSpotifyQuery = ({ search }: { search: string }) => {
  const { isPending, error, data } = useQuery<Song[]>({
    queryKey: ["musicSearch", search],
    queryFn: async () => {
      const data = await musicSearch(search);
      return data;
    },
    enabled: true,
  });

  return {
    isPending,
    error,
    data,
  };
};
