import type { HTTP_METHOD } from "next/dist/server/web/http";
import { getAccessToken } from "./access_token";

async function getToken() {
  const token = await getAccessToken();
  return token;
}

export async function fetchWebApi(
  endpoint: string,
  method: HTTP_METHOD,
  body?: unknown
) {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: method === "GET" ? undefined : JSON.stringify(body),
  });

  try {
    return await res.json();
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
