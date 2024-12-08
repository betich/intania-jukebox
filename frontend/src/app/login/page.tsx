import { validateToken } from "@/spotify/validate_token";
import { formatClientURL } from "@/utils/url";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const isValid = await validateToken();
  if (isValid) {
    return redirect(formatClientURL("/player"));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 gap-4 font-sans">
      <h1 className="font-bold text-xl">Login with Spotify to continue</h1>
      <Link
        href="/auth/login"
        className="
      bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out font-medium
      "
      >
        Continue with Spotify
      </Link>
    </div>
  );
}
