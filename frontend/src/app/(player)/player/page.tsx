import { cookies } from "next/headers";

export default async function Player() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return (
    <div>
      <h1>Player</h1>
      <p>Access Token: {accessToken}</p>
    </div>
  );
}
