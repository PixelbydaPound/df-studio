import { type ReactNode } from "react";

const helvetica =
  '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif';

type IllustrationProps = {
  title: string;
  caption: string;
};

function Frame({ title, caption, children }: IllustrationProps & { children: ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 pb-4 border-b border-white/5">
        <h3 className="text-lg text-white" style={{ fontFamily: helvetica }}>
          {title}
        </h3>
        <p className="text-white/40 text-sm mt-1" style={{ fontFamily: helvetica }}>
          {caption}
        </p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export function RoleAssignmentIllustration() {
  return (
    <Frame
      title="Assign role flow (illustrative)"
      caption="Synthetic wireframe — not client UI or copy"
    >
      <div className="rounded-xl bg-[#0f172a] border border-white/10 p-5 space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-white/50 uppercase tracking-wider text-xs">Step 2 of 3</span>
          <span className="text-[#EB5097] text-xs">Review before enable</span>
        </div>
        <div className="rounded-lg bg-black/40 p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-white/70">User</span>
            <span className="text-white">A. Rivera (composite)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Role template</span>
            <span className="text-white">Read-only · Enterprise</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Scope</span>
            <span className="text-white">Region → 3 locations</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-9 rounded-lg bg-white/10 border border-white/15" />
          <div className="flex-1 h-9 rounded-lg bg-[#EB5097]/25 border border-[#EB5097]/40" />
        </div>
      </div>
    </Frame>
  );
}

export function PermissionsMatrixIllustration() {
  const rows = ["Clinical areas", "Scheduling", "Billing views", "Admin settings"];
  return (
    <Frame
      title="Area-level permissions matrix (illustrative)"
      caption="Read / write / deny at area scope — conceptual only"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="text-white/50 text-xs uppercase tracking-wider">
              <th className="pb-3 pr-4 font-normal">System area</th>
              <th className="pb-3 px-2 font-normal text-center">Read</th>
              <th className="pb-3 px-2 font-normal text-center">Write</th>
              <th className="pb-3 px-2 font-normal text-center">Deny</th>
            </tr>
          </thead>
          <tbody className="text-white/80">
            {rows.map((row, i) => (
              <tr key={row} className="border-t border-white/10">
                <td className="py-3 pr-4">{row}</td>
                {[0, 1, 2].map((col) => (
                  <td key={col} className="py-3 px-2 text-center">
                    <span
                      className={`inline-block w-4 h-4 rounded-full border ${
                        i === 0 && col === 0
                          ? "bg-[#EB5097] border-[#EB5097]"
                          : i === 3 && col === 2
                            ? "bg-white/20 border-white/40"
                            : "border-white/20"
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

export function VisibilityIllustration() {
  return (
    <Frame
      title="Roles per user · Users per role (illustrative)"
      caption="Dual visibility pattern for org admins at scale"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-black/40 border border-white/10 p-4">
          <p className="text-xs text-white/45 uppercase tracking-wider mb-3">Roles for user</p>
          <ul className="space-y-2 text-sm text-white/75">
            <li className="flex justify-between">
              <span>Read-only</span>
              <span className="text-[#EB5097]">Active</span>
            </li>
            <li className="flex justify-between opacity-50">
              <span>Front desk</span>
              <span>—</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl bg-black/40 border border-white/10 p-4">
          <p className="text-xs text-white/45 uppercase tracking-wider mb-3">Users on role</p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>12 users · 4 locations</li>
            <li className="text-white/45">Filter: high-risk admin</li>
          </ul>
        </div>
      </div>
    </Frame>
  );
}
