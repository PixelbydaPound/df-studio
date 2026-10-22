const AUTH_SESSION_KEY = "df_site_authenticated";

function setClientSession(authenticated: boolean) {
  if (authenticated) {
    sessionStorage.setItem(AUTH_SESSION_KEY, "true");
    return;
  }

  sessionStorage.removeItem(AUTH_SESSION_KEY);
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

  setClientSession(false);
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

  setClientSession(false);
  return false;
}

const ENTERPRISE_ROLES_SESSION_KEY = "df_enterprise_roles_unlocked";

function setEnterpriseRolesClientSession(authenticated: boolean) {
  if (authenticated) {
    sessionStorage.setItem(ENTERPRISE_ROLES_SESSION_KEY, "true");
    return;
  }

  sessionStorage.removeItem(ENTERPRISE_ROLES_SESSION_KEY);
}

export function hasEnterpriseRolesClientSession(): boolean {
  return sessionStorage.getItem(ENTERPRISE_ROLES_SESSION_KEY) === "true";
}

export async function checkEnterpriseRolesAuth(): Promise<boolean> {
  const authResponse = await tryServerAuth("/api/enterprise-roles-auth");

  if (authResponse?.ok) {
    setEnterpriseRolesClientSession(true);
    return true;
  }

  setEnterpriseRolesClientSession(false);
  return false;
}

export async function loginEnterpriseRoles(password: string): Promise<boolean> {
  const loginResponse = await tryServerAuth("/api/enterprise-roles-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (loginResponse?.ok) {
    setEnterpriseRolesClientSession(true);
    return true;
  }

  setEnterpriseRolesClientSession(false);
  return false;
}
