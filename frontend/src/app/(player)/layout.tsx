import { validateToken } from "@/spotify/validate_token";
import { formatClientURL } from "@/utils/url";
import { redirect } from "next/navigation";

export default async function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isValid = await validateToken();
  if (!isValid) return redirect(formatClientURL("/login"));

  return <>{children}</>;
}
