import { validateToken } from "@/spotify/validate_token";
import { formatClientURL } from "@/utils/url";
import { redirect } from "next/navigation";
import Script from "next/script";

export default async function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isValid = await validateToken();
  if (!isValid) return redirect(formatClientURL("/login"));

  return (
    <>
      {children}
      <Script async src="https://sdk.scdn.co/spotify-player.js"></Script>
    </>
  );
}
