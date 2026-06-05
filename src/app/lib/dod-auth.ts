async function tryDodRequest(
  path: string,
  init?: RequestInit,
): Promise<Response | null> {
  try {
    return await fetch(path, {
      credentials: "include",
      ...init,
    });
  } catch {
    return null;
  }
}

export async function checkDodAuth(): Promise<boolean> {
  const authResponse = await tryDodRequest("/api/dod-auth");
  return authResponse?.ok ?? false;
}

export async function loginDod(password: string): Promise<boolean> {
  const loginResponse = await tryDodRequest("/api/dod-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  return loginResponse?.ok ?? false;
}
