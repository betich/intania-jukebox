import { env } from "@/env";
import { cookies } from "next/headers";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");

  const form = {
    code: code ?? "",
    redirect_uri: env.SPOTIFY_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const response: TokenResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(form),
    }
  ).then((response) => response.json());

  // save the token in a cookie
  const cookieStore = await cookies();

  cookieStore.set("access_token", response.access_token, {
    expires: new Date(Date.now() + response.expires_in * 1000),
    domain: new URL(env.NEXT_PUBLIC_CLIENT_BASE_URL).hostname,
    httpOnly: true,
  });

  cookieStore.set("refresh_token", response.refresh_token, {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    domain: new URL(env.NEXT_PUBLIC_CLIENT_BASE_URL).hostname,
    httpOnly: true,
  });

  return Response.redirect(
    new URL("/player", new URL(request.url).origin).toString()
  );
}
