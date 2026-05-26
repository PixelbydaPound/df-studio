export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth", {
      credentials: "include",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function login(password: string): Promise<boolean> {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
