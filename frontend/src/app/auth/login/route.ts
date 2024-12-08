import { env } from "@/env";
import { NextResponse } from "next/server";

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function getSpotifyLoginPath() {
  const clientId = env.SPOTIFY_CLIENT_ID;

  const scope =
    "streaming user-read-private user-read-email user-read-playback-state";
  const state = generateRandomString(16);

  const redirectURI = env.SPOTIFY_REDIRECT_URI;

  const authQuery = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectURI,
    state,
  });

  const authURL = `https://accounts.spotify.com/authorize?${authQuery.toString()}`;
  return authURL;
}

export async function GET() {
  const path = getSpotifyLoginPath();

  const response = NextResponse.redirect(path);
  return response;
}
