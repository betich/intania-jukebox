import { cookies } from "next/headers";
import WebPlayback from "./webplayback";
import { redirect } from "next/navigation";
import { formatClientURL } from "@/utils/url";

export default async function Player() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect(formatClientURL("/login"));

  return <WebPlayback token={accessToken} />;
}
