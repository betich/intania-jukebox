import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  return Response.json({ message: "pong", cookies: cookieStore.getAll() });
}
