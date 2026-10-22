import { type ReactNode, useMemo, useState } from "react";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "../../styles/lotus-org.css";

export type NavKey = "accounts" | "groups" | "roles" | "access-rules";

const LO_ICONS = {
  home: "fa-house",
  users: "fa-users",
  security: "fa-shield-halved",
  locations: "fa-location-dot",
  logs: "fa-list-ul",
  sites: "fa-building",
  chevronDown: "fa-chevron-down",
  chevronLeft: "fa-chevron-left",
  bell: "fa-bell",
  search: "fa-magnifying-glass",
  close: "fa-xmark",
  plus: "fa-plus",
  expand: "fa-up-right-and-down-left-from-center",
  circleCheck: "fa-circle-check",
  user: "fa-user",
  lock: "fa-lock",
} as const;

export function LoIcon({
  name,
  className = "",
}: {
  name: keyof typeof LO_ICONS;
  className?: string;
}) {
  return <i className={`fa-solid ${LO_ICONS[name]} lo-icon ${className}`.trim()} aria-hidden="true" />;
}

export function OrgShell({
  active,
  drawer,
  onNavigate,
  brand = "Organization Admin",
  product,
  children,
}: {
  active: NavKey;
  drawer?: ReactNode;
  onNavigate?: (key: NavKey) => void;
  brand?: string;
  product?: string;
  children: ReactNode;
}) {
  const usersOpen = active === "accounts" || active === "groups" || active === "roles";
  const securityOpen = active === "access-rules";

  const go = (key: NavKey) => {
    onNavigate?.(key);
  };

  const interactive = Boolean(onNavigate);

  const child = (key: NavKey | string, label: string) => {
    const isActive = key === active;
    const canGo = interactive && (key === "accounts" || key === "groups" || key === "roles" || key === "access-rules");
    return (
      <button
        key={key}
        type="button"
        className={`lo-nav-child${isActive ? " is-active" : ""}${canGo ? " is-interactive" : ""}`}
        onClick={canGo ? () => go(key as NavKey) : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="lotus-org lo-frame">
      <div className="lo-shell">
        <aside className="lo-nav" aria-label="Organization Admin">
          <div className="lo-nav-head">Organization Admin</div>
          <span className="lo-nav-toggle" aria-hidden="true">
            <LoIcon name="chevronLeft" />
          </span>
          <nav className="lo-nav-list">
            <div className="lo-nav-item">
              <LoIcon name="home" /> Home
            </div>
            <div className={`lo-nav-item${usersOpen ? " has-active-child" : ""}`}>
              <LoIcon name="users" /> Users
              <LoIcon name="chevronDown" className="lo-nav-chevron" />
            </div>
            {usersOpen && (
              <>
                {child("licenses", "Licenses")}
                {child("accounts", "Accounts")}
                {child("groups", "Groups")}
                {child("roles", "Roles")}
              </>
            )}
            <div
              className={`lo-nav-item${securityOpen ? " has-active-child" : ""}${interactive ? " is-interactive" : ""}`}
              onClick={interactive ? () => go("access-rules") : undefined}
              role={interactive ? "button" : undefined}
            >
              <LoIcon name="security" /> Security
              <LoIcon name="chevronDown" className="lo-nav-chevron" />
            </div>
            {securityOpen && (
              <>
                {child("password", "Password")}
                {child("domains", "Email Domains")}
                {child("mfa", "Multifactor Authentication")}
                {child("uid", "Universal ID Management")}
                {child("reset", "Password Reset")}
                {child("timeout", "Inactivity Timeout")}
                {child("access-rules", "Access Rules")}
              </>
            )}
            <div className="lo-nav-item">
              <LoIcon name="locations" /> Locations
            </div>
            <div className="lo-nav-item">
              <LoIcon name="logs" /> Event Logs
            </div>
            <div className="lo-nav-item">
              <LoIcon name="sites" /> Sites
            </div>
          </nav>
        </aside>
        <div className="lo-main">
          <header className="lo-header">
            <span className="lo-brand-wrap">
              <span className="lo-brand">{brand}</span>
              {product && <span className="lo-brand-app">{product}</span>}
            </span>
            <div className="lo-header-right">
              <span className="lo-bell" aria-hidden="true">
                <LoIcon name="bell" />
                <span className="lo-bell-badge">5</span>
              </span>
              <span className="lo-user">
                <LoIcon name="user" className="lo-user-icon" /> Cane, Dan
              </span>
            </div>
          </header>
          <div className={`lo-content${drawer ? " has-drawer" : ""}`}>{children}</div>
          {drawer}
        </div>
      </div>
    </div>
  );
}

export function Crumb({ items }: { items: string[] }) {
  return (
    <p className="lo-crumb">
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          {index > 0 && <span className="lo-crumb-sep">›</span>}
          <span className={index === items.length - 1 ? "lo-crumb-current" : ""}>{item}</span>
        </span>
      ))}
    </p>
  );
}

export function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="lo-chip">
      <span className="lo-chip-label">{label}</span>
      <span className="lo-chip-value">
        {value}
        <span className="lo-chip-x" aria-hidden="true">
          <LoIcon name="close" />
        </span>
      </span>
    </span>
  );
}

export function AddFilter() {
  return (
    <span className="lo-add-filter">
      Add Filter
      <span className="lo-chip-x">
        <LoIcon name="plus" />
      </span>
    </span>
  );
}

export function SearchField({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const live = Boolean(onChange);
  return (
    <div className="lo-search">
      <input
        type="search"
        placeholder={placeholder}
        value={value ?? ""}
        readOnly={!live}
        aria-readonly={!live}
        onChange={live ? (event) => onChange?.(event.target.value) : undefined}
      />
      <span className="lo-search-btn" aria-hidden="true">
        <LoIcon name="search" />
      </span>
    </div>
  );
}

export function Verified() {
  return <LoIcon name="circleCheck" className="lo-verified" />;
}

export function PrimaryButton({
  children,
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type={type} className="lo-btn" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className="lo-btn lo-btn-secondary" onClick={onClick}>
      {children}
    </button>
  );
}

export function DangerButton({ children }: { children: ReactNode }) {
  return (
    <span className="lo-btn lo-btn-destructive" aria-hidden="true">
      {children}
    </span>
  );
}

export function LinkButton({ children }: { children: ReactNode }) {
  return (
    <span className="lo-btn lo-btn-link" aria-hidden="true">
      {children}
    </span>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="lo-card">{children}</div>;
}

export function Drawer({
  title,
  subtitle,
  tabs,
  activeTab,
  footer,
  children,
}: {
  title: string;
  subtitle?: string;
  tabs: string[];
  activeTab: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside className="lo-drawer" aria-label={title}>
      <div className="lo-drawer-head">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p className="lo-drawer-title">{title}</p>
            {subtitle && <p className="lo-drawer-sub">{subtitle}</p>}
          </div>
          <LoIcon name="close" className="lo-drawer-close" />
        </div>
        <div className="lo-drawer-tabs">
          {tabs.map((tab) => (
            <span key={tab} className={`lo-drawer-tab${tab === activeTab ? " is-active" : ""}`}>
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="lo-drawer-body">{children}</div>
      <div className="lo-drawer-foot">{footer}</div>
    </aside>
  );
}

export function DayChip({ label, on }: { label: string; on?: boolean }) {
  return <span className={`lo-day${on ? " is-on" : ""}`}>{label}</span>;
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="lo-field">
      <span className="lo-field-label">{label}</span>
      {children}
    </label>
  );
}

/* ---------- RBAC permissions matrix ---------- */

export type FlatPrivilege = {
  id: string;
  label: string;
  info: string;
  checked: boolean;
  gate?: boolean;
};

export type AnalyticsLevel = "Hidden" | "View" | "Custom";

export type AnalyticsChild = {
  id: string;
  label: string;
  level: AnalyticsLevel;
  options: AnalyticsLevel[];
  info: string;
};

export type PayLevel = "Hidden" | "View" | "Manage";

export type MatrixState = {
  patient: FlatPrivilege[];
  firm: FlatPrivilege[];
  payLevel: PayLevel;
  payManage: Record<string, boolean>;
  analytics: AnalyticsChild[];
};

export const PATIENT_FINANCIALS: FlatPrivilege[] = [
  { id: "basic-financials", label: "Basic Financials", info: "View-only access to balances, bills, charges, and statement history.", checked: true, gate: true },
  { id: "manage-billing", label: "Manage Billing", info: "Add charges, post/void bills, and manage billing notes.", checked: true },
  { id: "manage-patient-payments", label: "Manage Patient Payments", info: "Collect/void payments, refunds, allocations, and payment plans.", checked: true },
  { id: "manage-statements", label: "Manage Statements", info: "Generate, hold, and send patient statements.", checked: true },
  { id: "manage-ledger", label: "Manage Ledger", info: "Patient/business-unit transfers and global periods.", checked: false },
];

export const FIRM_FINANCIALS: FlatPrivilege[] = [
  { id: "financials-home", label: "Financials Home", info: "Allows the user to access the main Financial Tab which will show Claims & Bills.", checked: true, gate: true },
  { id: "key-metrics", label: "Key Metrics", info: "Allows the user to see the Key Metrics calculations in Financials Home.", checked: true },
  { id: "manage-payments", label: "Manage Payments", info: "Post, edit, and associate payer payment batches and run the ERA Report.", checked: true },
  { id: "statements", label: "Statements", info: "View patients in the statements queue, hold, send, and run the Statement File Report.", checked: true },
  { id: "reconciliation-access", label: "Reconciliation Access", info: "Reconcile funds, close financials, and run billing periods.", checked: false },
  { id: "biller-console", label: "Biller Console", info: "Create, edit, and remove consoles and view widgets.", checked: true },
  { id: "biller-console-key-metrics", label: "Biller Console Key Metrics", info: "View dollar amounts on Biller Console widgets.", checked: true },
];

export const ANALYTICS_CHILDREN: AnalyticsChild[] = [
  { id: "financial-analytics", label: "Financial Analytics", level: "View", options: ["Hidden", "View", "Custom"], info: "Allows the user to access Financial Analytics reports." },
  { id: "clinical-analytics", label: "Clinical Analytics", level: "Hidden", options: ["Hidden", "View"], info: "Clinical and operational reports, plus compliance reports." },
  { id: "data-explorer-analytics", label: "Data Explorer Analytics", level: "Hidden", options: ["Hidden", "View"], info: "Access Data Explorer Analytics reports." },
  { id: "compliance-reports", label: "Compliance Reports", level: "Hidden", options: ["Hidden", "View"], info: "MIPS and Specialized Registry reports." },
  { id: "enterprise-reports", label: "Enterprise Reports", level: "Hidden", options: ["Hidden", "View"], info: "Access Enterprise Reports." },
];

const ANALYTICS_SCOPE_LABELS: Record<string, Record<string, string>> = {
  "financial-analytics": { Hidden: "None", View: "Custom", Custom: "All Data" },
  "clinical-analytics": { Hidden: "None", View: "All Data" },
  "data-explorer-analytics": { Hidden: "None", View: "All Data" },
  "compliance-reports": { Hidden: "None", View: "All Data" },
  "enterprise-reports": { Hidden: "None", View: "All Data" },
};

export const PAY_VIEW = ["Transactions", "Key Metrics", "Funding", "Reports", "Documents"];
export const PAY_MANAGE = ["Manage Settings", "Collect Payments", "Process Refunds", "Manage Disputes"];

export function billerMatrix(): MatrixState {
  return {
    patient: PATIENT_FINANCIALS.map((item) => ({ ...item })),
    firm: FIRM_FINANCIALS.map((item) => ({ ...item })),
    payLevel: "Hidden",
    payManage: Object.fromEntries(PAY_MANAGE.map((item) => [item, false])),
    analytics: ANALYTICS_CHILDREN.map((item) => ({ ...item })),
  };
}

export function readOnlyMatrix(): MatrixState {
  return {
    patient: PATIENT_FINANCIALS.map((item) => ({ ...item, checked: Boolean(item.gate) })),
    firm: FIRM_FINANCIALS.map((item) => ({ ...item, checked: Boolean(item.gate) })),
    payLevel: "Hidden",
    payManage: Object.fromEntries(PAY_MANAGE.map((item) => [item, false])),
    analytics: ANALYTICS_CHILDREN.map((item) => ({ ...item, level: "View" as const })),
  };
}

function financialRollup(items: FlatPrivilege[]) {
  const on = items.filter((item) => item.checked).length;
  if (on === 0) return "Hidden";
  if (on === items.length) return "Manage";
  return "Custom";
}

function togglePrivileges(items: FlatPrivilege[], id: string) {
  const next = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
  const gate = next.find((item) => item.gate);
  if (gate && !gate.checked) {
    return next.map((item) => (item.gate ? item : { ...item, checked: false }));
  }
  return next;
}

function PrivilegeList({
  items,
  interactive,
  onToggle,
}: {
  items: FlatPrivilege[];
  interactive?: boolean;
  onToggle?: (id: string) => void;
}) {
  const gateOn = items.find((item) => item.gate)?.checked ?? true;
  return (
    <div>
      {items.map((item) => {
        const disabled = item.gate ? false : !gateOn;
        return (
          <label key={item.id} className={`lo-priv${disabled ? " is-off" : ""}`}>
            <input
              type="checkbox"
              checked={item.checked}
              disabled={disabled || !interactive}
              onChange={interactive && onToggle ? () => onToggle(item.id) : undefined}
              aria-label={item.label}
            />
            <div>
              <div className="lo-priv-label">{item.label}</div>
              <p className="lo-priv-info">{item.info}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}

export function PermissionsMatrix({
  state,
  roleName = "Biller",
  rolePill = "Revenue",
  openId = "firm-financials",
  interactive = false,
  usersActive = 4,
  usersInactive = 1,
  groups = 2,
  detail,
  onTogglePatient,
  onToggleFirm,
  onPayLevel,
  onTogglePayManage,
  onAnalyticsLevel,
  onOpen,
}: {
  state: MatrixState;
  roleName?: string;
  rolePill?: string;
  openId?: string;
  interactive?: boolean;
  usersActive?: number;
  usersInactive?: number;
  groups?: number;
  detail?: string;
  onTogglePatient?: (id: string) => void;
  onToggleFirm?: (id: string) => void;
  onPayLevel?: (level: PayLevel) => void;
  onTogglePayManage?: (label: string) => void;
  onAnalyticsLevel?: (id: string, level: AnalyticsLevel) => void;
  onOpen?: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const match = (text: string) => !needle || text.toLowerCase().includes(needle);

  const patientItems = useMemo(
    () => state.patient.filter((item) => match(item.label) || match(item.info)),
    [state.patient, needle],
  );
  const firmItems = useMemo(
    () => state.firm.filter((item) => match(item.label) || match(item.info)),
    [state.firm, needle],
  );
  const analyticsItems = useMemo(
    () => state.analytics.filter((item) => match(item.label) || match(item.info) || match("Analytics")),
    [state.analytics, needle],
  );

  const patientRollup = financialRollup(state.patient);
  const firmRollup = financialRollup(state.firm);
  const analyticsGranted = state.analytics.filter((item) => item.level !== "Hidden").length;
  const payGranted =
    state.payLevel === "Hidden" ? 0 : state.payLevel === "View" ? PAY_VIEW.length : PAY_VIEW.length + Object.values(state.payManage).filter(Boolean).length;
  const showPay = match("ModMed Pay") || PAY_VIEW.some(match) || PAY_MANAGE.some(match);

  const payOpen = openId === "modmed-pay";
  const analyticsOpen = openId === "analytics";

  return (
    <div>
      <Crumb items={["Users", "Roles", roleName]} />
      <div className="lo-page-title">
        <h2>{roleName}</h2>
        <span className="lo-license-pill">{rolePill}</span>
      </div>
      {detail && <p className="lo-role-detail">{detail}</p>}
      <div className="lo-folder-tabs">
        <span className="lo-folder-tab is-active">Permissions</span>
        <span className="lo-folder-tab">
          Users <span className="lo-tab-count">{usersActive + usersInactive}</span>
        </span>
        <span className="lo-folder-tab">
          Groups <span className="lo-tab-count">{groups}</span>
        </span>
      </div>
      <div className="lo-perm-panel">
        <div className="lo-perm-row">
          <div className="lo-perm-main">
            <div className="lo-filter-row">
              <FilterChip label="Access level" value="Any" />
              <AddFilter />
              <SearchField
                placeholder="Search by Permission or Setting"
                value={query}
                onChange={interactive ? setQuery : undefined}
              />
            </div>

            <div className="lo-perm-group">
              <h3 className="lo-perm-group-title">Patients</h3>
              <div className="lo-acc">
                <AccordionRow
                  title="Patient Financials"
                  meta={patientRollup}
                  open={openId === "patient-financials"}
                  onToggle={() => onOpen?.("patient-financials")}
                >
                  <PrivilegeList items={patientItems} interactive={interactive} onToggle={onTogglePatient} />
                </AccordionRow>
              </div>
            </div>

            <div className="lo-perm-group">
              <h3 className="lo-perm-group-title">Practices</h3>
              <div className="lo-acc">
                <AccordionRow
                  title="Firm Financials"
                  meta={firmRollup}
                  open={openId === "firm-financials"}
                  onToggle={() => onOpen?.("firm-financials")}
                >
                  <PrivilegeList items={firmItems} interactive={interactive} onToggle={onToggleFirm} />
                </AccordionRow>
              </div>
            </div>

            {showPay && <div className="lo-perm-group">
              <h3 className="lo-perm-group-title">ModMed Pay</h3>
              <div className="lo-acc">
                <AccordionRow
                  title="ModMed Pay"
                  meta={state.payLevel}
                  open={payOpen}
                  onToggle={() => onOpen?.("modmed-pay")}
                >
                  {interactive ? (
                    <label className="lo-field">
                      <span className="lo-field-label">Access level</span>
                      <select
                        className="lo-select lo-level"
                        value={state.payLevel}
                        onChange={(event) => onPayLevel?.(event.target.value as PayLevel)}
                      >
                        <option>Hidden</option>
                        <option>View</option>
                        <option>Manage</option>
                      </select>
                    </label>
                  ) : (
                    <p className="lo-note">Category level: {state.payLevel}</p>
                  )}
                  {state.payLevel !== "Hidden" && (
                    <div className="lo-static-block">
                      <h5>View</h5>
                      <ul>
                        {PAY_VIEW.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {state.payLevel === "Manage" && (
                    <div className="lo-static-block">
                      <h5>Manage options</h5>
                      {PAY_MANAGE.map((item) => (
                        <label key={item} className="lo-priv">
                          <input
                            type="checkbox"
                            checked={state.payManage[item]}
                            disabled={!interactive}
                            onChange={interactive ? () => onTogglePayManage?.(item) : undefined}
                          />
                          <span className="lo-priv-label">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </AccordionRow>
              </div>
            </div>}

            {analyticsItems.length > 0 && <div className="lo-perm-group">
              <h3 className="lo-perm-group-title">Analytics</h3>
              <div className="lo-acc">
                <AccordionRow
                  title="Analytics"
                  meta={`${analyticsGranted} granted`}
                  open={analyticsOpen}
                  onToggle={() => onOpen?.("analytics")}
                >
                  {analyticsItems.map((child) => (
                    <div key={child.id} className="lo-child-row">
                      <div>
                        <div className="lo-child-label">{child.label}</div>
                        <p className="lo-priv-info">{child.info}</p>
                      </div>
                      {interactive ? (
                        <select
                          className="lo-select lo-level"
                          value={child.level}
                          aria-label={`${child.label} access`}
                          onChange={(event) => onAnalyticsLevel?.(child.id, event.target.value as AnalyticsLevel)}
                        >
                          {child.options.map((option) => (
                            <option key={option} value={option}>
                              {ANALYTICS_SCOPE_LABELS[child.id]?.[option] ?? option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="lo-acc-meta">
                          {ANALYTICS_SCOPE_LABELS[child.id]?.[child.level] ?? child.level}
                        </span>
                      )}
                    </div>
                  ))}
                </AccordionRow>
              </div>
            </div>}
          </div>

          <aside className="lo-perm-side">
            <div className="lo-side-card">
              <h3 className="lo-side-title">This role grants</h3>
              <GrantRow label="Patient Financials" count={state.patient.filter((item) => item.checked).length} color="#0e6cbb" />
              <GrantRow label="Firm Financials" count={state.firm.filter((item) => item.checked).length} color="#005fbc" />
              <GrantRow label="ModMed Pay" count={payGranted} color="#864fdf" />
              <GrantRow label="Analytics" count={analyticsGranted} color="#2da45d" />
            </div>
            <div className="lo-side-card">
              <h3 className="lo-side-title">Users with this role</h3>
              <div className="lo-users-row">
                <span>Active</span>
                <span className="lo-users-count">{usersActive}</span>
                <span className="lo-viewall">View all</span>
              </div>
              <div className="lo-users-row">
                <span>Inactive</span>
                <span className="lo-users-count">{usersInactive}</span>
                <span className="lo-viewall">View all</span>
              </div>
            </div>
            <div className="lo-side-card">
              <h3 className="lo-side-title">Groups with this role</h3>
              <div className="lo-users-row">
                <span>Groups</span>
                <span className="lo-users-count">{groups}</span>
                <span className="lo-viewall">View all</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AccordionRow({
  title,
  meta,
  open,
  onToggle,
  children,
}: {
  title: string;
  meta: string;
  open: boolean;
  onToggle?: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`lo-acc-item${open ? " is-open" : ""}`}>
      <button type="button" className="lo-acc-hd" aria-expanded={open} onClick={onToggle}>
        <span className="lo-acc-hd-start">
          <LoIcon name="chevronDown" className="lo-acc-chev" />
          {title}
        </span>
        <span className="lo-acc-meta">{meta}</span>
      </button>
      {open && <div className="lo-acc-body">{children}</div>}
    </div>
  );
}

function GrantRow({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="lo-legend-row">
      <span className="lo-legend-dot" style={{ background: color }} />
      <span>{label}</span>
      <span className="lo-legend-count">{count}</span>
    </div>
  );
}

export { togglePrivileges };
