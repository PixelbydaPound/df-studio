import { type ReactNode, useState } from "react";
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
  SecondaryButton,
  Verified,
  billerMatrix,
} from "./LotusOrg";

const helvetica =
  '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif';

type ScreenFrameProps = {
  title: string;
  caption: string;
  children: ReactNode;
};

function ScreenFrame({ title, caption, children }: ScreenFrameProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 pb-0 flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg text-white" style={{ fontFamily: helvetica }}>
              {title}
            </h3>
            <p className="text-white/40 text-sm mt-1" style={{ fontFamily: helvetica }}>
              {caption}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-colors"
            aria-label={`Expand ${title}`}
          >
            <LoIcon name="expand" className="text-white text-sm" />
          </button>
        </div>
        <div className="p-6 pt-4">{children}</div>
      </div>
      {expanded && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3"
            aria-label="Close expanded view"
          >
            <LoIcon name="close" className="text-white text-xl" />
          </button>
          <div
            className="w-full max-w-[1280px] max-h-[90vh] overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

const ACCOUNTS = [
  ["Barton", "Clara", "cbartonstar", true],
  ["Fisher", "Jordan", "jfish.swim", true],
  ["Grant", "Felix", "felixthegreat", true],
  ["Kim", "Miles", "milesjourney", false],
  ["Wallace", "Avery", "averyrocks", false],
  ["Lee", "Nora", "norakwaves", false],
  ["Martinez", "Elliott", "eleetech", true],
  ["Reyes", "Sofia", "sofiam", false],
  ["Thompson", "Lucia", "lrey", false],
  ["Barton", "Theo", "theowworld", true],
] as const;

function AccountsTable({ highlight }: { highlight?: string }) {
  return (
    <div className="lo-table-wrap">
      <table className="lo-table">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {ACCOUNTS.map(([last, first, user, verified]) => (
            <tr key={user} className={highlight === user ? "is-selected" : ""}>
              <td>{last}</td>
              <td>{first}</td>
              <td>
                <span className="lo-link">{user}</span>
                {verified && <Verified />}
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
  );
}

function AccountsMainScreen() {
  return (
    <OrgShell active="accounts">
      <Crumb items={["Users", "Accounts"]} />
      <div className="lo-filter-row">
        <FilterChip label="Role" value="Any" />
        <FilterChip label="Status" value="Any" />
        <AddFilter />
      </div>
      <AccountsTable />
    </OrgShell>
  );
}

function AccountGroupsDrawerScreen() {
  return (
    <OrgShell
      active="accounts"
      drawer={
        <Drawer
          title="Barton, Clara · cbartonstar"
          subtitle="Access Area: 1 · Last Seen: 04/17/2024"
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
                {[
                  ["BetterBones Sr. Biller", "EMA", "All Business Units", "Sr. Biller"],
                  ["BetterBones Jr. Biller", "EMA", "All Business Units", "Jr. Biller"],
                  ["RCM Supervisors", "RCM AI Platform", "—", "RCM"],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                    <td>
                      <DangerButton>Remove</DangerButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 12 }}>
              <SecondaryButton>+ Add to Group</SecondaryButton>
            </div>
          </Card>
        </Drawer>
      }
    >
      <Crumb items={["Users", "Accounts"]} />
      <div className="lo-filter-row">
        <FilterChip label="Role" value="Any" />
        <FilterChip label="Status" value="Any" />
      </div>
      <AccountsTable highlight="cbartonstar" />
    </OrgShell>
  );
}

function GroupsMain({
  drawer,
  tab,
  children,
}: {
  drawer: string;
  tab: string;
  children: ReactNode;
}) {
  return (
    <OrgShell
      active="groups"
      drawer={
        <Drawer
          title={drawer}
          tabs={["Basic Info", "Business Units and Locations", "Settings"]}
          activeTab={tab}
          footer={
            <>
              <PrimaryButton>Save</PrimaryButton>
              <SecondaryButton>Cancel</SecondaryButton>
            </>
          }
        >
          {children}
        </Drawer>
      }
    >
      <Crumb items={["Users", "Groups"]} />
      <div className="lo-table-wrap">
        <table className="lo-table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Members</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["BetterBones Sr. Biller", "4", "Active"],
              ["BetterBones Jr. Biller", "6", "Active"],
              ["RCM Supervisors", "3", "Active"],
            ].map(([name, members, status]) => (
              <tr key={name} className={name === "BetterBones Sr. Biller" ? "is-selected" : ""}>
                <td>
                  <span className="lo-link">{name}</span>
                </td>
                <td>{members}</td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OrgShell>
  );
}

export function AccountsMainFigure() {
  return (
    <ScreenFrame
      title="Accounts — org-admin directory"
      caption="One user, one login. Groups carry application, business unit, and role."
    >
      <AccountsMainScreen />
    </ScreenFrame>
  );
}

export function AccountGroupsDrawerFigure() {
  return (
    <ScreenFrame
      title="Account drawer · Groups"
      caption="Membership is assigned on the user, not as a second login. One person can sit in multiple groups."
    >
      <AccountGroupsDrawerScreen />
    </ScreenFrame>
  );
}

export function GroupBasicInfoFigure() {
  return (
    <ScreenFrame
      title="Group drawer · Basic Info"
      caption="A group binds applications to a role, then lists the people in that assignment."
    >
      <GroupsMain drawer="BetterBones Sr. Biller" tab="Basic Info">
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Group Name">
              <span className="lo-input">BetterBones Sr. Biller</span>
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
                <td>EMA</td>
                <td>BetterBones</td>
                <td>Sr. Biller</td>
                <td>
                  <DangerButton>Remove</DangerButton>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ margin: "12px 0 20px" }}>
            <SecondaryButton>Add Application</SecondaryButton>
          </div>
          <h4>Group Members</h4>
          <table className="lo-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {["cbartonstar", "Adams, Taylor", "Brooks, Jamie", "Cole, Morgan"].map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <DangerButton>Remove</DangerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <SecondaryButton>Add User</SecondaryButton>
          </div>
          <p className="lo-note" style={{ marginTop: 12 }}>
            Total Members: <strong>4</strong>
          </p>
        </Card>
      </GroupsMain>
    </ScreenFrame>
  );
}

export function GroupLocationsFigure() {
  return (
    <ScreenFrame
      title="Group drawer · Business Units and Locations"
      caption="Pick the business unit first, then locations underneath it — so large MSOs don’t assign the wrong site."
    >
      <GroupsMain drawer="BetterBones Sr. Biller" tab="Business Units and Locations">
        <Card>
          <h4>Business Units</h4>
          <table className="lo-table">
            <thead>
              <tr>
                <th>Business Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {["Florida", "Georgia"].map((unit) => (
                <tr key={unit}>
                  <td>{unit}</td>
                  <td>
                    <DangerButton>Remove</DangerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ margin: "12px 0 8px" }}>
            <SecondaryButton>Add Business Unit</SecondaryButton>
          </div>
          <p className="lo-note" style={{ marginBottom: 20 }}>
            Total Business Units: <strong>2</strong>
          </p>
          <h4>Locations</h4>
          <table className="lo-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Business Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Miami Lakes", "Florida"],
                ["Coral Gables", "Florida"],
                ["Savannah", "Georgia"],
              ].map(([loc, bu]) => (
                <tr key={loc}>
                  <td>{loc}</td>
                  <td>{bu}</td>
                  <td>
                    <DangerButton>Remove</DangerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <SecondaryButton>Add Location</SecondaryButton>
          </div>
          <p className="lo-note" style={{ marginTop: 12 }}>
            Total Locations: <strong>3</strong>
          </p>
        </Card>
      </GroupsMain>
    </ScreenFrame>
  );
}

export function GroupSettingsFigure() {
  return (
    <ScreenFrame
      title="Group drawer · Settings"
      caption="Access rules map to groups — not to individual roles — so login hours travel with the team."
    >
      <GroupsMain drawer="BetterBones Sr. Biller" tab="Settings">
        <Card>
          <Field label="Access Rules">
            <span className="lo-select">No After Hours Access</span>
          </Field>
        </Card>
      </GroupsMain>
    </ScreenFrame>
  );
}

function BillerMatrixScreen() {
  const [openId, setOpenId] = useState("firm-financials");
  return (
    <OrgShell active="roles">
      <PermissionsMatrix
        state={billerMatrix()}
        openId={openId}
        onOpen={(id) => setOpenId((current) => (current === id ? "" : id))}
      />
    </OrgShell>
  );
}

export function RolesBillerFigure() {
  return (
    <ScreenFrame
      title="Roles · Biller permissions matrix"
      caption="Lotus RBAC groups: Patients, Practices, ModMed Pay, Analytics. Firm Financials open — Biller Console on, reconciliation off."
    >
      <BillerMatrixScreen />
    </ScreenFrame>
  );
}

export function AccessRulesFigure() {
  return (
    <ScreenFrame
      title="Security · Access Rules"
      caption="Proactive login windows for hourly and shift-based staff. No weekend / after-hours / shift rules, mapped to groups."
    >
      <OrgShell active="access-rules">
        <Crumb items={["Security", "Access Rules"]} />
        <div className="lo-filter-row">
          <FilterChip label="Groups" value="Any" />
          <AddFilter />
        </div>
        <div className="lo-table-wrap">
          <table className="lo-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Groups</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["No Weekend Access", "2"],
                ["No After Hours Access", "4"],
                ["Day Shift Only", "2"],
                ["Evening Shift Only", "2"],
                ["Weekend Coverage Only", "1"],
              ].map(([name, groups]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{groups}</td>
                  <td>
                    <SecondaryButton>Edit</SecondaryButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="lo-pager">
            <span>
              Total Rules: <strong style={{ color: "#1c1c1c" }}>5</strong>
            </span>
          </div>
        </div>
      </OrgShell>
    </ScreenFrame>
  );
}

export function EditAccessRuleFigure() {
  return (
    <ScreenFrame
      title="Edit Access Rule"
      caption="Allowed hours only — days not listed have no access. Grace period covers clock-out overlap."
    >
      <OrgShell
        active="access-rules"
        drawer={
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
                <span className="lo-input">No After Hours Access</span>
              </Field>
              <h4>When Can Users Access the System</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <DayChip key={day} label={day} on={day !== "Sun" && day !== "Sat"} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="lo-input" style={{ width: 88 }}>
                  08:00
                </span>
                <span className="lo-note">to</span>
                <span className="lo-input" style={{ width: 88 }}>
                  22:00
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
                    <td>Mon–Fri</td>
                    <td>08:00 – 22:00</td>
                    <td>
                      <DangerButton>Remove</DangerButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="lo-note" style={{ margin: "10px 0 16px" }}>
                Days not listed above have no access.
              </p>
              <Field label="Grace Period">
                <span className="lo-select" style={{ maxWidth: 160 }}>
                  15 minutes
                </span>
              </Field>
            </Card>
          </Drawer>
        }
      >
        <Crumb items={["Security", "Access Rules"]} />
        <div className="lo-table-wrap" style={{ opacity: 0.7 }}>
          <table className="lo-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Groups</th>
              </tr>
            </thead>
            <tbody>
              <tr className="is-selected">
                <td>No After Hours Access</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </OrgShell>
    </ScreenFrame>
  );
}
