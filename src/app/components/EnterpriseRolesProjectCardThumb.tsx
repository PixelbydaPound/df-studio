import { Lock } from "lucide-react";

/** Project card preview — no live RBAC UI (NDA); full matrix behind case-study password. */
export function EnterpriseRolesProjectCardThumb() {
  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#0f172a] flex flex-col items-center justify-center gap-3 px-6 text-center"
      aria-hidden="true"
    >
      <div className="w-12 h-12 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center">
        <Lock className="w-6 h-6 text-white/70" strokeWidth={1.75} aria-hidden />
      </div>
      <p className="text-white/80 text-sm font-medium tracking-wide">Password-protected prototype</p>
      <p className="text-white/45 text-xs leading-snug max-w-[220px]">
        Confidential enterprise healthtech · screens & prototype unlock on the case study
      </p>
    </div>
  );
}
