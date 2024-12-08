export async function GET(request: Request) {
  const accessToken = request.headers.get("Authorization");

  if (!accessToken) {
    return Response.json({ message: "token is not valid" }, { status: 401 });
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: accessToken,
    },
  });

  if (response.ok && response.status === 200) {
    return Response.json({ message: "token is valid" });
  } else {
    return Response.json({ message: "token is not valid" }, { status: 401 });
  }
}
