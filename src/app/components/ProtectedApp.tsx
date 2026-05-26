import { ReactNode, useEffect, useState } from "react";
import { checkAuth } from "../lib/auth";
import { PasswordGate } from "./PasswordGate";

type ProtectedAppProps = {
  children: ReactNode;
};

export function ProtectedApp({ children }: ProtectedAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
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
