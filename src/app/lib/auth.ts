const AUTH_SESSION_KEY = "df_site_authenticated";

function getClientPassword(): string {
  return import.meta.env.VITE_SITE_PASSWORD || "";
}

function setClientSession(authenticated: boolean) {
  if (authenticated) {
    sessionStorage.setItem(AUTH_SESSION_KEY, "true");
    return;
  }

  sessionStorage.removeItem(AUTH_SESSION_KEY);
}

function hasClientSession(): boolean {
  return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
}

function validateClientPassword(password: string): boolean {
  const expected = getClientPassword();
  return expected.length > 0 && password === expected;
}

async function tryServerAuth(
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

export async function checkAuth(): Promise<boolean> {
  const authResponse = await tryServerAuth("/api/auth");

  if (authResponse?.ok) {
    setClientSession(true);
    return true;
  }

  if (hasClientSession() && getClientPassword()) {
    return true;
  }

  return false;
}

export async function login(password: string): Promise<boolean> {
  const loginResponse = await tryServerAuth("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (loginResponse?.ok) {
    setClientSession(true);
    return true;
  }

  if (validateClientPassword(password)) {
    setClientSession(true);
    return true;
  }

  setClientSession(false);
  return false;
}
