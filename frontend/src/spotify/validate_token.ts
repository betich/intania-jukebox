import { formatClientURL } from "@/utils/url";
import { cookies } from "next/headers";

export async function validateToken(): Promise<boolean> {
  const cookieStore = await cookies();

  console.log("===");

  console.log(cookieStore.getAll());

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
    return response.ok && response.status === 200;
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

    if (response.ok && response.status === 200) {
      const data = await response.json();

      console.log(data);

      // const tokenResponse = await fetch(formatClientURL("/auth/verify"), {
      //   headers: {
      //     Authorization: `Bearer ${data.access_token}`,
      //   },
      // });

      // if (tokenResponse.ok && response.status === 200) {
      //   return true;
      // }
      return true;
    }
  }

  return false;
}
