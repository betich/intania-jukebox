"use server";
import { Song } from "@/stores/music";
import { fetchWebApi } from "./fetch.server";
import { parseSpotifySearchResult, testSchema } from "./mapper";

export async function musicSearch(query: string): Promise<Song[]> {
  if (query === "") {
    return [];
  }

  const spotifySearchResult = await fetchWebApi(
    `search?q=${query}&type=track&limit=15`,
    "GET",
    null
  );

  if (!spotifySearchResult) {
    return [];
  }

  if (!testSchema(spotifySearchResult)) {
    console.info("Spotify search result schema is invalid");
    return [];
  }

  return parseSpotifySearchResult(spotifySearchResult);
}
