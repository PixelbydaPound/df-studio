import { FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  checkEnterpriseRolesAuth,
  hasEnterpriseRolesClientSession,
  loginEnterpriseRoles,
} from "../lib/auth";
import { LoIcon, PrimaryButton } from "./LotusOrg";

export function useEnterpriseRolesUnlock() {
  const [unlocked, setUnlocked] = useState(() =>
    typeof window === "undefined" ? false : hasEnterpriseRolesClientSession(),
  );

  useEffect(() => {
    let isMounted = true;
    checkEnterpriseRolesAuth().then((authenticated) => {
      if (isMounted) setUnlocked(authenticated);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { unlocked, setUnlocked };
}

type EnterpriseRolesCaseGateProps = {
  unlocked: boolean;
  onUnlocked: () => void;
  /** Shown inside the gate card when `variant` is full */
  description?: ReactNode;
  variant?: "full" | "inline";
  submitLabel?: string;
};

export function EnterpriseRolesCaseGate({
  unlocked,
  onUnlocked,
  description,
  variant = "full",
  submitLabel = "Unlock case study detail",
}: EnterpriseRolesCaseGateProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  if (unlocked) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length === 0) {
      setShowError(true);
      return;
    }
    setIsSubmitting(true);
    const isValid = await loginEnterpriseRoles(password);
    if (isValid) {
      onUnlocked();
      return;
    }
    setIsSubmitting(false);
    setShowError(true);
  }

  const defaultDescription =
    "Confidential employer work (NDA). Enter the case-study password to view reconstructed Organization Admin screens and the interactive prototype.";

  if (variant === "inline") {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center mx-auto mb-4">
            <LoIcon name="lock" className="text-white/80 text-lg" />
          </div>
          <h3 className="text-white text-lg mb-2">Detail locked</h3>
          <p className="text-white/50 text-sm mb-4 leading-relaxed">
            {description ?? defaultDescription}
          </p>
          <input
            type="password"
            name="enterprise-roles-password"
            aria-label="Case study password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setShowError(false);
            }}
            className="w-full mb-3 px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white text-sm"
            style={{ borderColor: showError ? "#b20c27" : undefined }}
          />
          {showError && (
            <p className="text-[#EB5097] text-sm mb-3">Please enter a valid password</p>
          )}
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Unlocking…" : submitLabel}
          </PrimaryButton>
        </form>
      </div>
    );
  }

  return (
    <div className="lotus-org lo-gate">
      <form onSubmit={handleSubmit} className="lo-gate-card">
        <h3>
          <LoIcon name="lock" /> Confidential detail locked
        </h3>
        <p>{description ?? defaultDescription}</p>
        <input
          type="password"
          name="enterprise-roles-password"
          aria-label="Case study password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setShowError(false);
          }}
          className="lo-input"
          style={{ marginBottom: 12, borderColor: showError ? "#b20c27" : undefined }}
        />
        {showError && <p className="lo-error">Please enter a valid password</p>}
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Unlocking…" : submitLabel}
        </PrimaryButton>
      </form>
    </div>
  );
}

type GatedDetailProps = {
  unlocked: boolean;
  onUnlocked: () => void;
  children: ReactNode;
  id?: string;
};

/** Public narrative stops here; UI reconstructions render only after unlock. */
export function EnterpriseRolesGatedDetail({
  unlocked,
  onUnlocked,
  children,
  id = "solution-detail",
}: GatedDetailProps) {
  return (
    <div id={id} className="relative space-y-16">
      {!unlocked ? (
        <EnterpriseRolesCaseGate
          unlocked={false}
          onUnlocked={onUnlocked}
          variant="inline"
          submitLabel="Unlock screens & prototype"
        />
      ) : (
        <div className="space-y-16">{children}</div>
      )}
    </div>
  );
}
