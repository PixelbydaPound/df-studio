import { ReactNode, useEffect, useState } from "react";
import { checkAuth } from "../lib/auth";
import { PasswordGate } from "./PasswordGate";

type ProtectedAppProps = {
  children: ReactNode;
};

const skipSiteGateInDev = import.meta.env.DEV;

export function ProtectedApp({ children }: ProtectedAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    skipSiteGateInDev ? true : null,
  );

  useEffect(() => {
    if (skipSiteGateInDev) {
      return;
    }

    let isMounted = true;

    checkAuth().then((authenticated) => {
      if (isMounted) {
        setIsAuthenticated(authenticated);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  return <>{children}</>;
}
