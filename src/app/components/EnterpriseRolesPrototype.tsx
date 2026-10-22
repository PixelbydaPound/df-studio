import { type ReactNode, useMemo, useState } from "react";
import {
  EnterpriseRolesCaseGate,
  useEnterpriseRolesUnlock,
} from "./EnterpriseRolesCaseGate";
import {
  AddFilter,
  Card,
  Crumb,
  DangerButton,
  DayChip,
  Drawer,
  Field,
  FilterChip,
  LoIcon,
  OrgShell,
  PermissionsMatrix,
  PrimaryButton,
  SearchField,
  SecondaryButton,
  Verified,
  type AnalyticsLevel,
  type MatrixState,
  type NavKey,
  type PayLevel,
  billerMatrix,
  readOnlyMatrix,
  togglePrivileges,
} from "./LotusOrg";

type DemoView = "roles" | "matrix" | "assign" | "groups" | "rules";
type RoleId = "biller" | "read-only" | "sr-biller" | "jr-biller";

const ACCOUNTS = [
  { last: "Barton", first: "Clara", user: "cbartonstar", seen: "04/17/2024", groups: "BetterBones Sr. Biller", status: "Active", verified: true },
  { last: "Adams", first: "Taylor", user: "tadams", seen: "04/16/2024", groups: "BetterBones Sr. Biller", status: "Active", verified: true },
  { last: "Brooks", first: "Jamie", user: "jbrooks", seen: "04/14/2024", groups: "BetterBones Sr. Biller", status: "Active", verified: true },
  { last: "Cole", first: "Morgan", user: "mcole", seen: "04/11/2024", groups: "BetterBones Sr. Biller", status: "Active", verified: true },
  { last: "Fisher", first: "Jordan", user: "jfish.swim", seen: "03/02/2024", groups: "BetterBones Jr. Biller", status: "Active", verified: true },
  { last: "Grant", first: "Felix", user: "felixthegreat", seen: "04/12/2024", groups: "RCM Supervisors", status: "Active", verified: true },
  { last: "Lee", first: "Nora", user: "norakwaves", seen: "02/28/2024", groups: "BetterBones Jr. Biller", status: "Active", verified: false },
  { last: "Martinez", first: "Elliott", user: "eleetech", seen: "04/15/2024", groups: "BetterBones Sr. Biller", status: "Active", verified: true },
  { last: "Thompson", first: "Lucia", user: "lrey", seen: "04/10/2024", groups: "BetterBones Front Desk", status: "Active", verified: false },
  { last: "Kim", first: "Miles", user: "milesjourney", seen: "—", groups: "—", status: "Inactive", verified: false },
  { last: "Reyes", first: "Sofia", user: "sofiam", seen: "01/09/2024", groups: "—", status: "Inactive", verified: false },
  { last: "Wallace", first: "Avery", user: "averyrocks", seen: "—", groups: "—", status: "Invited", verified: false },
] as const;

const ACCOUNT_MEMBERSHIPS: Record<string, { name: string; application: string; unit: string; role: string }[]> = {
  cbartonstar: [
    { name: "BetterBones Sr. Biller", application: "EMA", unit: "All Business Units", role: "Sr. Biller" },
    { name: "BetterBones Jr. Biller", application: "EMA", unit: "Florida", role: "Jr. Biller" },
    { name: "RCM Supervisors", application: "RCM AI Platform", unit: "—", role: "RCM" },
  ],
  tadams: [{ name: "BetterBones Sr. Biller", application: "EMA", unit: "All Business Units", role: "Sr. Biller" }],
  jbrooks: [{ name: "BetterBones Sr. Biller", application: "EMA", unit: "All Business Units", role: "Sr. Biller" }],
  mcole: [{ name: "BetterBones Sr. Biller", application: "EMA", unit: "All Business Units", role: "Sr. Biller" }],
  "jfish.swim": [{ name: "BetterBones Jr. Biller", application: "EMA", unit: "Florida", role: "Jr. Biller" }],
  felixthegreat: [{ name: "RCM Supervisors", application: "RCM AI Platform", unit: "—", role: "RCM" }],
  norakwaves: [{ name: "BetterBones Jr. Biller", application: "EMA", unit: "Florida", role: "Jr. Biller" }],
  eleetech: [{ name: "BetterBones Sr. Biller", application: "EMA", unit: "All Business Units", role: "Sr. Biller" }],
  lrey: [{ name: "BetterBones Front Desk", application: "EMA", unit: "Florida", role: "Front desk" }],
};

const GROUPS = [
  { name: "BetterBones Sr. Biller", application: "EMA", site: "BetterBones", role: "Sr. Biller", members: 4, units: "Florida, Georgia", rule: "No After Hours Access", status: "Active" },
  { name: "BetterBones Jr. Biller", application: "EMA", site: "BetterBones", role: "Jr. Biller", members: 6, units: "Florida", rule: "Day Shift Only", status: "Active" },
  { name: "RCM Supervisors", application: "RCM AI Platform", site: "BetterBones", role: "RCM", members: 3, units: "All Business Units", rule: "No Weekend Access", status: "Active" },
  { name: "BetterBones Front Desk", application: "EMA", site: "BetterBones", role: "Front desk", members: 8, units: "Florida", rule: "Evening Shift Only", status: "Active" },
  { name: "Analytics Reviewers", application: "Organization Admin", site: "BetterBones", role: "Read-only · Standard", members: 6, units: "—", rule: "—", status: "Active" },
] as const;

const GROUP_MEMBERS: Record<string, string[]> = {
  "BetterBones Sr. Biller": ["cbartonstar", "Adams, Taylor", "Brooks, Jamie", "Cole, Morgan"],
  "BetterBones Jr. Biller": ["Fisher, Jordan", "Lee, Nora", "Barton, Theo", "Nguyen, Pat", "Shah, Priya", "Ortiz, Sam"],
  "RCM Supervisors": ["Grant, Felix", "cbartonstar", "Ibrahim, Noor"],
  "BetterBones Front Desk": ["Thompson, Lucia", "Diaz, Cam", "Patel, Rina", "Hale, Quinn"],
  "Analytics Reviewers": ["Kim, Miles", "Reyes, Sofia", "Wallace, Avery", "Chen, Ari", "Moss, Devon", "Park, Jun"],
};

const ROLES = [
  { id: "read-only" as const, name: "Read-only · Standard", type: "Phase 1 PoC", users: "6", groups: "1", modified: "Jul 22, 2025", status: "Enabled", open: true },
  { id: "biller" as const, name: "Biller", type: "Revenue", users: "5", groups: "2", modified: "Aug 4, 2025", status: "Enabled", open: true },
  { id: "sr-biller" as const, name: "Sr. Biller", type: "Revenue", users: "4", groups: "1", modified: "Aug 4, 2025", status: "Enabled", open: true },
  { id: "jr-biller" as const, name: "Jr. Biller", type: "Revenue", users: "6", groups: "1", modified: "Aug 18, 2025", status: "Enabled", open: true },
  { id: "front-desk" as const, name: "Front desk", type: "Clinical ops", users: "8", groups: "1", modified: "—", status: "Disabled", open: false },
  { id: "rcm" as const, name: "RCM", type: "Coming later", users: "3", groups: "1", modified: "—", status: "Disabled", open: false },
];

const RULES = [
  { name: "No Weekend Access", days: "Mon–Fri", hours: "All day", grace: "—", groups: 2, mapped: "RCM Supervisors, Analytics Reviewers" },
  { name: "No After Hours Access", days: "Mon–Fri", hours: "08:00 – 22:00", grace: "15 min", groups: 4, mapped: "BetterBones Sr. Biller + 3 more" },
  { name: "Day Shift Only", days: "Mon–Fri", hours: "07:00 – 15:00", grace: "15 min", groups: 2, mapped: "BetterBones Jr. Biller, Analytics Reviewers" },
  { name: "Evening Shift Only", days: "Mon–Fri", hours: "15:00 – 23:00", grace: "15 min", groups: 2, mapped: "BetterBones Front Desk" },
  { name: "Weekend Coverage Only", days: "Sat–Sun", hours: "08:00 – 18:00", grace: "30 min", groups: 1, mapped: "On-call coverage" },
] as const;

function matches(query: string, ...fields: string[]) {
  const needle = query.trim().toLowerCase();
  return !needle || fields.some((field) => field.toLowerCase().includes(needle));
}

function StatusDot({ on, label }: { on: boolean; label: string }) {
  return <span className={`lo-status${on ? " is-on" : " is-off"}`}>{label}</span>;
}

function PageHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="lo-page-head">
      <div className="lo-page-title">
        <h2>{title}</h2>
        {children}
      </div>
      <button type="button" className="lo-history">
        <LoIcon name="logs" /> View History
      </button>
    </div>
  );
}

function InteractiveMatrix({
  template,
}: {
  template: RoleId;
}) {
  const isReadOnly = template === "read-only";
  const [state, setState] = useState<MatrixState>(() =>
    isReadOnly ? readOnlyMatrix() : billerMatrix(),
  );
  const [openId, setOpenId] = useState(isReadOnly ? "patient-financials" : "firm-financials");

  useEffect(() => {
    setState(isReadOnly ? readOnlyMatrix() : billerMatrix());
    setOpenId(isReadOnly ? "patient-financials" : "firm-financials");
  }, [isReadOnly]);

  const copy = {
    "read-only": {
      name: "Read-only · Standard",
      pill: "Phase 1 PoC",
      usersActive: 6,
      usersInactive: 0,
      groups: 1,
      detail:
        "View-only financials and analytics for compliance reviewers at BetterBones. Area-level Hidden / View only — no write or reconciliation.",
    },
    biller: {
      name: "Biller",
      pill: "Revenue",
      usersActive: 4,
      usersInactive: 1,
      groups: 2,
      detail:
        "Revenue staff access in EMA for BetterBones. Firm Financials open — Biller Console on, reconciliation off. Patients, Practices, ModMed Pay, Analytics.",
    },
    "sr-biller": {
      name: "Sr. Biller",
      pill: "Revenue",
      usersActive: 4,
      usersInactive: 0,
      groups: 1,
      detail:
        "Senior revenue template bound to BetterBones Sr. Biller. Same V1 matrix as Biller, used by the Florida and Georgia units.",
    },
    "jr-biller": {
      name: "Jr. Biller",
      pill: "Revenue",
      usersActive: 6,
      usersInactive: 0,
      groups: 1,
      detail:
        "Junior revenue template for Florida-only locations. Same financial privileges as Biller; scoped by the group’s business unit.",
    },
  }[template];

  return (
    <PermissionsMatrix
      state={state}
      roleName={copy.name}
      rolePill={copy.pill}
      detail={copy.detail}
      openId={openId}
      interactive
      usersActive={copy.usersActive}
      usersInactive={copy.usersInactive}
      groups={copy.groups}
      onOpen={(id) => setOpenId((current) => (current === id ? "" : id))}
      onTogglePatient={(id) =>
        setState((prev) => ({ ...prev, patient: togglePrivileges(prev.patient, id) }))
      }
      onToggleFirm={(id) =>
        setState((prev) => ({ ...prev, firm: togglePrivileges(prev.firm, id) }))
      }
      onPayLevel={(level: PayLevel) => setState((prev) => ({ ...prev, payLevel: level }))}
      onTogglePayManage={(label) =>
        setState((prev) => ({
          ...prev,
          payManage: { ...prev.payManage, [label]: !prev.payManage[label] },
        }))
      }
      onAnalyticsLevel={(id, level: AnalyticsLevel) =>
        setState((prev) => ({
          ...prev,
          analytics: prev.analytics.map((child) =>
            child.id === id ? { ...child, level } : child,
          ),
        }))
      }
    />
  );
}

function RolesList({
  selected,
  enablementOn,
  onSelect,
  onOpenMatrix,
  onToggleEnablement,
}: {
  selected: RoleId;
  enablementOn: boolean;
  onSelect: (id: RoleId) => void;
  onOpenMatrix: () => void;
  onToggleEnablement: () => void;
}) {
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => ROLES.filter((role) => matches(query, role.name, role.type, role.status)),
    [query],
  );

  return (
    <>
      <Crumb items={["Users", "Roles"]} />
      <PageHead title="Roles" />
      <p className="lo-role-detail">
        Templates live here; people pick them up through groups. Phase 1 enablement stays off until
        assignments are reviewed.
      </p>
      <div className="lo-filter-row">
        <FilterChip label="Type" value="Any" />
        <FilterChip label="Status" value="Any" />
        <AddFilter />
        <SearchField placeholder="Search roles" value={query} onChange={setQuery} />
      </div>
      <div className="lo-table-wrap">
        <table className="lo-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Type</th>
              <th>Users</th>
              <th>Groups</th>
              <th>Last modified</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((role) => (
              <tr
                key={role.id}
                className={selected === role.id ? "is-selected" : ""}
                onClick={() => role.open && onSelect(role.id as RoleId)}
                style={{ cursor: role.open ? "pointer" : "default", opacity: role.open ? 1 : 0.45 }}
              >
                <td>
                  {role.open ? (
                    <button type="button" className="lo-link" onClick={onOpenMatrix}>
                      {role.name}
                    </button>
                  ) : (
                    role.name
                  )}
                </td>
                <td>{role.type}</td>
                <td>{role.users}</td>
                <td>{role.groups}</td>
                <td>{role.modified}</td>
                <td>
                  <StatusDot on={role.status === "Enabled"} label={role.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lo-pager">
          <span>
            Total Roles: <strong style={{ color: "#1c1c1c" }}>{ROLES.length}</strong>
          </span>
        </div>
      </div>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p className="lo-priv-label">Enable for organization</p>
            <p className="lo-priv-info">
              Review assignments on BetterBones before turning on enforcement. Disabled roles stay
              visible to org admins but are not granted.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enablementOn}
            className={`lo-toggle${enablementOn ? " is-on" : ""}`}
            onClick={onToggleEnablement}
          >
            <span className="lo-toggle-thumb" />
          </button>
        </div>
      </Card>
    </>
  );
}

function AssignView({
  selected,
  onSelect,
  onNavigate,
}: {
  selected: string;
  onSelect: (user: string) => void;
  onNavigate: (key: NavKey) => void;
}) {
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () =>
      ACCOUNTS.filter((row) =>
        matches(query, row.last, row.first, row.user, row.groups, row.status),
      ),
    [query],
  );
  const account = ACCOUNTS.find((row) => row.user === selected);
  const memberships = ACCOUNT_MEMBERSHIPS[selected] ?? [];

  return (
    <OrgShell
      active="accounts"
      brand="ModMed"
      product="Organization Admin"
      onNavigate={onNavigate}
      drawer={
        account ? (
          <Drawer
            title={`${account.last}, ${account.first} · ${account.user}`}
            subtitle={`Access Area: ${memberships.length || 1} · Last Seen: ${account.seen}`}
            tabs={["Profile", "Groups", "Settings"]}
            activeTab="Groups"
            footer={
              <>
                <PrimaryButton>Save</PrimaryButton>
                <SecondaryButton>Cancel</SecondaryButton>
                <span className="lo-btn lo-btn-link" style={{ marginLeft: "auto", color: "#b20c27" }}>
                  Disable Account
                </span>
              </>
            }
          >
            <Card>
              <p className="lo-note" style={{ marginTop: 0 }}>
                Membership is assigned on the user. Application, business unit, and role travel with
                the group — not a second login.
              </p>
              <table className="lo-table">
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Application</th>
                    <th>Business Unit</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.length === 0 ? (
                    <tr>
                      <td colSpan={5}>No groups assigned</td>
                    </tr>
                  ) : (
                    memberships.map((row) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.application}</td>
                        <td>{row.unit}</td>
                        <td>{row.role}</td>
                        <td>
                          <DangerButton>Remove</DangerButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div style={{ marginTop: 12 }}>
                <SecondaryButton>+ Add to Group</SecondaryButton>
              </div>
            </Card>
          </Drawer>
        ) : undefined
      }
    >
      <Crumb items={["Users", "Accounts"]} />
      <PageHead title="Accounts" />
      <p className="lo-meta-line">
        <span>
          Organization <strong>BetterBones</strong>
        </span>
        <span>
          One user, one login · <strong>49</strong> accounts
        </span>
      </p>
      <div className="lo-filter-row">
        <FilterChip label="Role" value="Any" />
        <FilterChip label="Status" value="Active" />
        <AddFilter />
        <SearchField placeholder="Search accounts" value={query} onChange={setQuery} />
      </div>
      <div className="lo-table-wrap">
        <table className="lo-table">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Username</th>
              <th>Last Seen</th>
              <th>Groups</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.user}
                className={selected === row.user ? "is-selected" : ""}
                onClick={() => onSelect(row.user)}
                style={{ cursor: "pointer" }}
              >
                <td>{row.last}</td>
                <td>{row.first}</td>
                <td>
                  <span className="lo-link">{row.user}</span>
                  {row.verified && <Verified />}
                </td>
                <td>{row.seen}</td>
                <td>{row.groups}</td>
                <td>
                  <StatusDot on={row.status === "Active"} label={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lo-pager">
          <span>
            Total Accounts: <strong style={{ color: "#1c1c1c" }}>49</strong>
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <span className="lo-page-btn is-active">1</span>
            <span className="lo-page-btn">2</span>
            <span className="lo-page-btn">3</span>
            <span className="lo-page-btn">4</span>
          </div>
        </div>
      </div>
    </OrgShell>
  );
}

function GroupsView({
  selected,
  onSelect,
  onNavigate,
}: {
  selected: string;
  onSelect: (name: string) => void;
  onNavigate: (key: NavKey) => void;
}) {
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => GROUPS.filter((row) => matches(query, row.name, row.application, row.role, row.rule)),
    [query],
  );
  const group = GROUPS.find((row) => row.name === selected);
  const members = GROUP_MEMBERS[selected] ?? [];

  return (
    <OrgShell
      active="groups"
      brand="ModMed"
      product="Organization Admin"
      onNavigate={onNavigate}
      drawer={
        group ? (
          <Drawer
            title={group.name}
            subtitle={`${group.application} · ${group.role} · ${group.members} members`}
            tabs={["Basic Info", "Business Units and Locations", "Settings"]}
            activeTab="Basic Info"
            footer={
              <>
                <PrimaryButton>Save</PrimaryButton>
                <SecondaryButton>Cancel</SecondaryButton>
              </>
            }
          >
            <Card>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Group Name">
                  <span className="lo-input">{group.name}</span>
                </Field>
                <div className="lo-field">
                  <span className="lo-field-label">Status</span>
                  <span className="lo-radio-row">
                    <span className="lo-radio">○ Inactive</span>
                    <span className="lo-radio is-on">● Active</span>
                  </span>
                </div>
              </div>
              <h4>Applications</h4>
              <table className="lo-table">
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Site</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{group.application}</td>
                    <td>{group.site}</td>
                    <td>{group.role}</td>
                    <td>
                      <DangerButton>Remove</DangerButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4>Group Members</h4>
              <table className="lo-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((name) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>
                        <DangerButton>Remove</DangerButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="lo-note" style={{ marginTop: 12 }}>
                Total Members: <strong>{group.members}</strong>
                {" · "}
                Business units: <strong>{group.units}</strong>
                {" · "}
                Access rule: <strong>{group.rule}</strong>
              </p>
            </Card>
          </Drawer>
        ) : undefined
      }
    >
      <Crumb items={["Users", "Groups"]} />
      <PageHead title="Groups" />
      <p className="lo-role-detail">
        Groups are the provisioning unit between universal identity and RBAC. A group binds an
        application to a role, then scopes business units, locations, and an access rule.
      </p>
      <div className="lo-filter-row">
        <FilterChip label="Application" value="Any" />
        <FilterChip label="Status" value="Active" />
        <AddFilter />
        <SearchField placeholder="Search groups" value={query} onChange={setQuery} />
      </div>
      <div className="lo-table-wrap">
        <table className="lo-table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Application</th>
              <th>Role</th>
              <th>Members</th>
              <th>Access Rule</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className={selected === row.name ? "is-selected" : ""}
                onClick={() => onSelect(row.name)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <span className="lo-link">{row.name}</span>
                </td>
                <td>{row.application}</td>
                <td>{row.role}</td>
                <td>{row.members}</td>
                <td>{row.rule}</td>
                <td>
                  <StatusDot on label={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lo-pager">
          <span>
            Total Groups: <strong style={{ color: "#1c1c1c" }}>{GROUPS.length}</strong>
          </span>
        </div>
      </div>
    </OrgShell>
  );
}

function RulesView({
  selected,
  onSelect,
  onNavigate,
}: {
  selected: string;
  onSelect: (name: string) => void;
  onNavigate: (key: NavKey) => void;
}) {
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => RULES.filter((row) => matches(query, row.name, row.days, row.mapped)),
    [query],
  );
  const rule = RULES.find((row) => row.name === selected);
  const weekday = rule?.days === "Mon–Fri";
  const weekend = rule?.days === "Sat–Sun";

  return (
    <OrgShell
      active="access-rules"
      brand="ModMed"
      product="Organization Admin"
      onNavigate={onNavigate}
      drawer={
        rule ? (
          <Drawer
            title="Edit Access Rule"
            tabs={["Details", "Groups"]}
            activeTab="Details"
            footer={
              <>
                <PrimaryButton>Save</PrimaryButton>
                <SecondaryButton>Cancel</SecondaryButton>
              </>
            }
          >
            <Card>
              <Field label="Rule Name">
                <span className="lo-input">{rule.name}</span>
              </Field>
              <h4>When Can Users Access the System</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <DayChip
                    key={day}
                    label={day}
                    on={weekday ? day !== "Sun" && day !== "Sat" : weekend ? day === "Sat" || day === "Sun" : true}
                  />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="lo-input" style={{ width: 88 }}>
                  {rule.hours === "All day" ? "00:00" : rule.hours.slice(0, 5)}
                </span>
                <span className="lo-note">to</span>
                <span className="lo-input" style={{ width: 88 }}>
                  {rule.hours === "All day" ? "23:59" : rule.hours.slice(-5)}
                </span>
                <SecondaryButton>Apply to Selected Days</SecondaryButton>
              </div>
              <table className="lo-table">
                <thead>
                  <tr>
                    <th>Days</th>
                    <th>Access Hours</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{rule.days}</td>
                    <td>{rule.hours}</td>
                    <td>
                      <DangerButton>Remove</DangerButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="lo-note" style={{ margin: "10px 0 16px" }}>
                Days not listed above have no access. Mapped groups: {rule.mapped}.
              </p>
              <Field label="Grace Period">
                <span className="lo-select" style={{ maxWidth: 160 }}>
                  {rule.grace === "—" ? "None" : rule.grace === "15 min" ? "15 minutes" : "30 minutes"}
                </span>
              </Field>
            </Card>
          </Drawer>
        ) : undefined
      }
    >
      <Crumb items={["Security", "Access Rules"]} />
      <PageHead title="Access Rules" />
      <p className="lo-role-detail">
        Proactive login windows for hourly and shift-based staff. Rules map to groups — any day
        left off the list is implicitly denied.
      </p>
      <div className="lo-filter-row">
        <FilterChip label="Groups" value="Any" />
        <AddFilter />
        <SearchField placeholder="Search rules" value={query} onChange={setQuery} />
      </div>
      <div className="lo-table-wrap">
        <table className="lo-table">
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Schedule</th>
              <th>Grace</th>
              <th>Groups</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className={selected === row.name ? "is-selected" : ""}
                onClick={() => onSelect(row.name)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <span className="lo-link">{row.name}</span>
                </td>
                <td>
                  {row.days} {row.hours === "All day" ? "" : row.hours}
                </td>
                <td>{row.grace}</td>
                <td>{row.groups}</td>
                <td>
                  <SecondaryButton>Edit</SecondaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lo-pager">
          <span>
            Total Rules: <strong style={{ color: "#1c1c1c" }}>{RULES.length}</strong>
          </span>
        </div>
      </div>
    </OrgShell>
  );
}

export function EnterpriseRolesPrototype({ hideOverlayGate = false }: { hideOverlayGate?: boolean }) {
  const { unlocked, setUnlocked } = useEnterpriseRolesUnlock();
  const [view, setView] = useState<DemoView>("matrix");
  const [template, setTemplate] = useState<RoleId>("biller");
  const [enablementOn, setEnablementOn] = useState(false);
  const [account, setAccount] = useState("cbartonstar");
  const [group, setGroup] = useState("BetterBones Sr. Biller");
  const [rule, setRule] = useState("No After Hours Access");

  const navActive: NavKey =
    view === "rules" ? "access-rules" : view === "assign" ? "accounts" : view === "groups" ? "groups" : "roles";

  function handleNavigate(key: NavKey) {
    if (key === "access-rules") setView("rules");
    else if (key === "accounts") setView("assign");
    else if (key === "roles") setView("roles");
    else if (key === "groups") setView("groups");
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl lo-widget">
      {!hideOverlayGate && !unlocked && (
        <EnterpriseRolesCaseGate
          unlocked={false}
          onUnlocked={() => setUnlocked(true)}
          submitLabel="Unlock widget"
          description="Explore Organization Admin — roles, group provisioning, and the Biller permissions matrix."
        />
      )}
      <div className={!unlocked && !hideOverlayGate ? "pointer-events-none select-none blur-[2px]" : ""}>
        {view === "assign" ? (
          <AssignView selected={account} onSelect={setAccount} onNavigate={handleNavigate} />
        ) : view === "groups" ? (
          <GroupsView selected={group} onSelect={setGroup} onNavigate={handleNavigate} />
        ) : view === "rules" ? (
          <RulesView selected={rule} onSelect={setRule} onNavigate={handleNavigate} />
        ) : (
          <OrgShell active={navActive} onNavigate={handleNavigate} brand="ModMed" product="Organization Admin">
            {view === "matrix" && <InteractiveMatrix template={template} />}
            {view === "roles" && (
              <RolesList
                selected={template}
                enablementOn={enablementOn}
                onSelect={setTemplate}
                onOpenMatrix={() => setView("matrix")}
                onToggleEnablement={() => setEnablementOn((value) => !value)}
              />
            )}
          </OrgShell>
        )}
      </div>
    </div>
  );
}
