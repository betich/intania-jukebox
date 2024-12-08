import { env } from "@/env";

export function formatClientURL(path: string) {
  return new URL(path, env.NEXT_PUBLIC_CLIENT_BASE_URL).toString();
}
