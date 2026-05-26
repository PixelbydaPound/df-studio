import { buildAuthCookie, readRequestPassword, validatePassword } from "./_auth-config";

export default async function handler(
  request: Request,
): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const password = readRequestPassword(body);

  if (!validatePassword(password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildAuthCookie(),
    },
  });
}
