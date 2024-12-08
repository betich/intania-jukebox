import { env } from "@/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { refresh_token: refreshToken } = await request.json();

  if (!refreshToken) {
    return Response.json(
      { message: "Please provide refresh_token as body" },
      { status: 401 }
    );
  }

  if (refreshToken) {
    // refresh the token
    const form = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const response = await fetch("https://accounts.spotify.com/api/token", {
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
    });

    const data = await response.json();

    const tokenResponse = NextResponse.json({
      access_token: data.access_token,
    });

    tokenResponse.cookies.set("access_token", data.access_token, {
      expires: new Date(Date.now() + data.expires_in * 1000),
      domain: new URL(env.NEXT_PUBLIC_CLIENT_BASE_URL).hostname,
      httpOnly: true,
    });

    tokenResponse.cookies.set("refresh_token", data.refresh_token, {
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      domain: new URL(env.NEXT_PUBLIC_CLIENT_BASE_URL).hostname,
      httpOnly: true,
    });

    return tokenResponse;
  }
}
