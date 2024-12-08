"use server";
import { cookies } from "next/headers";
import { env } from "@/env";

// get access token
const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(
        `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

export async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (token?.value) {
    return token.value;
  }

  const response = await fetch(authOptions.url, {
    method: "POST",
    headers: authOptions.headers,
    body: new URLSearchParams(authOptions.form),
  });

  const data = await response.json();
  cookieStore.set("access_token", data.access_token, {
    expires: new Date(Date.now() + data.expires_in * 1000),
  });

  return data.access_token;
}
