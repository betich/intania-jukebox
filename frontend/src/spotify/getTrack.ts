import { getAccessToken } from "./access_token";
import { SpotifyTrackResult } from "./mapper";

export async function getTrack(id: string): Promise<SpotifyTrackResult | null> {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });

  try {
    return await res.json();
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
