import { formatClientURL } from "@/utils/url";
import { cookies } from "next/headers";

export async function validateToken(): Promise<boolean> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return false;
  }

  const isAccessTokenValid = await fetch(formatClientURL("/auth/verify"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    return response.ok;
  });

  if (isAccessTokenValid) {
    return true;
  } else if (refreshToken) {
    const response = await fetch(formatClientURL("/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      const tokenResponse = await fetch(formatClientURL("/auth/verify"), {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (tokenResponse.ok) {
        return true;
      }
    }
  }

  return false;
}
