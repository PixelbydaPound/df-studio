import type { VercelRequest } from "@vercel/node";

export async function readRequestPassword(
  req: VercelRequest,
): Promise<string> {
  const body = req.body;

  if (body && typeof body === "object" && "password" in body) {
    const password = (body as { password?: unknown }).password;
    if (typeof password === "string") {
      return password;
    }
  }

  if (typeof body === "string" && body.length > 0) {
    try {
      const parsed = JSON.parse(body) as { password?: unknown };
      if (typeof parsed.password === "string") {
        return parsed.password;
      }
    } catch {
      return "";
    }
  }

  if (typeof req.readable === "object" && req.readable && !body) {
    const rawBody = await readStream(req);
    if (!rawBody) return "";

    try {
      const parsed = JSON.parse(rawBody) as { password?: unknown };
      return typeof parsed.password === "string" ? parsed.password : "";
    } catch {
      return "";
    }
  }

  return "";
}

function readStream(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}
