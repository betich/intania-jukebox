import { musicSearch } from "@/spotify/search";
import { Song } from "@/stores/music";
import { useEffect, useState } from "react";

export const useSpotify = ({ search }: { search: string }) => {
  const [result, setResult] = useState<Song[]>([]);

  useEffect(() => {
    if (!search || search === "") {
      return;
    }
    const result = musicSearch(search);
    result.then((res) => {
      setResult(res);
    });
  }, [search]);

  return {
    result,
  };
};
