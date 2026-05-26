import { isAuthenticatedCookie } from "./_auth-config";

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const cookieHeader = request.headers.get("cookie") ?? undefined;

  if (!isAuthenticatedCookie(cookieHeader)) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  return Response.json({ authenticated: true });
}
