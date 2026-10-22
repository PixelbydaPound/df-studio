import { motion } from "motion/react";
import { LoIcon } from "./LotusOrg";
import { useState } from "react";
import heroImage from "../../assets/enterprise-roles-hero.svg";
import msoEcosystemDiagram from "../../assets/enterprise-mso-ecosystem-diagram.svg";
import rbacProvisioningDiagram from "../../assets/enterprise-rbac-provisioning-diagram.svg";
import { ScrollToTop } from "./ScrollToTop";
import { Footer } from "./Footer";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";
import { EnterpriseRolesPrototype } from "./EnterpriseRolesPrototype";
import {
  EnterpriseRolesGatedDetail,
  useEnterpriseRolesUnlock,
} from "./EnterpriseRolesCaseGate";
import {
  AccountGroupsDrawerFigure,
  AccountsMainFigure,
  AccessRulesFigure,
  EditAccessRuleFigure,
  GroupBasicInfoFigure,
  GroupLocationsFigure,
  GroupSettingsFigure,
  RolesBillerFigure,
} from "./EnterpriseRolesScreens";

const helvetica =
  '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif';

interface EnterpriseRolesProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
};

type ResearchFigureProps = {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  onExpand: () => void;
};

function ResearchFigure({ title, subtitle, src, alt, onExpand }: ResearchFigureProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 pb-0 flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg text-white" style={{ fontFamily: helvetica }}>
            {title}
          </h3>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: helvetica }}>
            {subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onExpand}
          className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-colors"
          aria-label={`Expand ${title}`}
        >
          <LoIcon name="expand" className="text-white text-sm" />
        </button>
      </div>
      <button type="button" onClick={onExpand} className="block w-full p-6 pt-4 text-left">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto min-h-[120px] rounded-lg border border-white/5 bg-[#0f172a]"
          loading="lazy"
        />
      </button>
    </div>
  );
}

type FigureModalProps = {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  onClose: () => void;
};

function FigureModal({ title, subtitle, src, alt, onClose }: FigureModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3"
        aria-label="Close expanded view"
      >
        <LoIcon name="close" className="text-white text-xl" />
      </button>
      <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden max-w-5xl">
          <div className="p-6 pb-0">
            <h3 className="text-lg text-white" style={{ fontFamily: helvetica }}>
              {title}
            </h3>
            <p className="text-white/40 text-sm mt-1">{subtitle}</p>
          </div>
          <img src={src} alt={alt} className="w-full h-auto p-6 pt-4" />
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id}>
      <h2 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: helvetica }}>
        {title}
      </h2>
      {subtitle && <p className="text-white/50 text-base md:text-lg">{subtitle}</p>}
    </div>
  );
}

function UserPersona({
  name,
  timeBudget,
  job,
  context,
  needs,
}: {
  name: string;
  timeBudget: string;
  job: string;
  context: string;
  needs: string[];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-white text-lg">{name}</h4>
        <span className="text-[#EB5097] text-sm font-medium">{timeBudget}</span>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{job}</p>
      <p className="text-white/45 text-sm">{context}</p>
      <ul className="text-white/60 space-y-2 text-sm list-none">
        {needs.map((need) => (
          <li key={need} className="flex gap-2">
            <span className="text-[#EB5097]">—</span>
            {need}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-white/60 space-y-3 list-none text-lg leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-[#EB5097] shrink-0">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function EnterpriseRolesProject({
  onNavigateToProject,
}: EnterpriseRolesProjectProps) {
  const [expandedFigure, setExpandedFigure] = useState<"mso" | "rbac" | null>(null);
  const { unlocked, setUnlocked } = useEnterpriseRolesUnlock();

  const disciplineTags = [
    "Product design",
    "Enterprise admin UX",
    "Roles & permissions",
    "Healthtech",
  ];

  return (
    <div className="min-h-screen bg-black text-white" style={{ paddingTop: "64px" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-wrap gap-2 mb-6"
          style={{ fontFamily: helvetica }}
        >
          {disciplineTags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 text-white/55"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight max-w-4xl"
          style={{ fontFamily: helvetica }}
        >
          Proactive access control for MSO-scale specialty care
          <span style={{ color: "#EB5097" }}>.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mb-16"
          style={{ fontFamily: helvetica }}
        >
          Enterprise specialty-care SaaS still governs clinical, revenue, and engagement access in
          overlapping models. I spent three months on Phase 0–1 of a multi-year authorization
          program at the organization-admin layer — with UX research, enterprise architecture, and
          product — moving from audit-only security toward area-level control and a read-only
          proof-of-concept. Reconstructed product detail and the interactive demo unlock with a
          case-study password under NDA.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 space-y-8"
            style={{ fontFamily: helvetica }}
          >
            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">Jul – Oct 2025 (~3 months)</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Team</h3>
              <p className="text-white/60">
                Senior product designer (me), UX research, enterprise architecture, product, and
                engineering
              </p>
            </div>
            <div>
              <h3 className="text-white mb-2">Program</h3>
              <p className="text-white/60">
                Unified authorization · Organization Admin · Phase 0–1 during my tenure (not
                customer-shipped before I left)
              </p>
            </div>
            <div>
              <h3 className="text-white mb-2">Role</h3>
              <p className="text-white/60">Senior Product Designer</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Client</h3>
              <p className="text-white/60">Confidential · Enterprise specialty-care SaaS</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Reading time</h3>
              <p className="text-white/60">8 min</p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-9 space-y-16"
            style={{ fontFamily: helvetica }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={heroImage}
                alt="Abstract illustration of enterprise roles and permissions administration"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>

            <section id="overview" className="space-y-4">
              <SectionHeading title="Overview" />
              <p className="text-white/80 text-xl md:text-2xl leading-snug">
                How might we let a large MSO govern access{" "}
                <span className="text-white">proactively</span> — one identity, area-level rules,
                audit-ready assignments — without redrawing every product admin on day one?
              </p>
            </section>

            <section id="context" className="space-y-4">
              <SectionHeading title="Context" />
              <div className="text-white/60 space-y-4 text-lg leading-relaxed">
                <p>
                  The work sat inside a{" "}
                  <span className="text-white">platform-wide authorization initiative</span>: MSO
                  and organization admins need one place to assign roles, scope locations, and
                  enforce login windows while clinical, revenue, and patient-engagement products
                  converge on shared identity.
                </p>
                <p>
                  There was no clean handoff from “research phase” to design — the program was still
                  being defined while we shaped Phase 0 foundation and a Phase 1 read-only vertical
                  slice to de-risk area-level enforcement before custom roles and dense permission
                  matrices scale up.
                </p>
              </div>
            </section>

            <section id="problem" className="space-y-4">
              <SectionHeading title="Problem" />
              <BulletList
                items={[
                  "Permission models had accreted over years — fragmented across products and layers, hard to govern at MSO scale.",
                  "Risk was often managed reactively: changes visible in audit logs after the fact, not prevented up front.",
                  "Varied access frequently forced multiple logins per person, complicating lifecycle management and compliance reviews.",
                  "Organization admins lacked templates, bulk visibility, and location-scoped control needed for large practice groups.",
                ]}
              />
            </section>

            <section id="constraints" className="space-y-4">
              <SectionHeading title="Constraints" />
              <BulletList
                items={[
                  "Area-level enforcement first — not field-level — so the architecture could ship while staying defensible in enterprise audits.",
                  "Read-only as the PoC vertical slice: immediate value for legal and compliance reviewers, plus proof for harder read/write/deny templates later.",
                  "One user, one login as the baseline identity story; roles and groups layer on without duplicating accounts per application.",
                  "Employer confidentiality: product UI cannot be shown publicly — only anonymized diagrams and password-gated reconstructions.",
                  "Multi-year roadmap: design deliverables had to align to phased rollout, not a single big-bang admin rewrite.",
                ]}
              />
            </section>

            <section id="users" className="space-y-6">
              <SectionHeading
                title="Users"
                subtitle="Two audiences read the same admin model — with very different time budgets"
              />
              <div className="grid md:grid-cols-2 gap-6">
                <UserPersona
                  name="MSO organization admin"
                  timeBudget="Ongoing program"
                  job="Has anything been over-assigned, and can I fix it before the next audit?"
                  context="40+ sites, mixed revenue and clinical staff, templates and bulk changes — not one-off user flags."
                  needs={[
                    "Single org-admin entry instead of siloed product-by-product configuration",
                    "Location-scoped groups and role templates",
                    "Enablement toggles to review assignments before broad rollout",
                  ]}
                />
                <UserPersona
                  name="Security & compliance reviewer"
                  timeBudget="Review windows"
                  job="Can we prove who had access when — and prevent login outside policy?"
                  context="Shift-based staff, proactive login rules, read-only roles for reviewers who must not change clinical data."
                  needs={[
                    "Read-only PoC that still exercises the new architecture",
                    "Access rules mapped to groups, not orphaned per-user exceptions",
                    "Traceable decisions in research repository and design-partner reviews",
                  ]}
                />
              </div>
            </section>

            <section id="research" className="space-y-8">
              <SectionHeading
                title="Research"
                subtitle="Cross-functional discovery while the program was still being defined"
              />
              <div className="text-white/60 space-y-4 text-lg leading-relaxed">
                <p>
                  <span className="text-white/90">The biggest gap:</span> we did not run a formal
                  usability study with production MSO admins in their environment. What we had was
                  architecture reviews, admin-facing interviews triangulated through UX research,
                  and weekly enterprise design-partner walkthroughs of PoC flows.
                </p>
                <p>
                  A core artifact was a{" "}
                  <span className="text-white">permission matrix spanning the multi-application ecosystem</span>{" "}
                  — what each role grants across surfaces — converging toward a single org-admin
                  mental model. Insights landed in an automated UX research repository so decisions
                  stayed traceable across workstreams.
                </p>
              </div>

              <ResearchFigure
                title="MSO layer in a multi-application ecosystem"
                subtitle="Concept diagram — anonymized; not client UI or deliverable export"
                src={msoEcosystemDiagram}
                alt="Concept diagram showing enterprise org admin layer above unified authorization and multiple application surfaces"
                onExpand={() => setExpandedFigure("mso")}
              />

              <ResearchFigure
                title="Group provisioning → universal identity → licensing → RBAC"
                subtitle="How we modeled provisioning feeding role-based access — portfolio concept only"
                src={rbacProvisioningDiagram}
                alt="Concept flow from groups through universal identity and licensing to RBAC area permissions"
                onExpand={() => setExpandedFigure("rbac")}
              />
            </section>

            <section id="pattern-scan" className="space-y-6">
              <SectionHeading
                title="Pattern scan"
                subtitle="Category-level comparison — not client UI"
              />
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-left min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50">
                      <th className="p-4 font-normal">Approach</th>
                      <th className="p-4 font-normal">Audit-only / reactive</th>
                      <th className="p-4 font-normal">Proactive / area-level (our direction)</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/65">
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-white/80">When risk surfaces</td>
                      <td className="p-4">After change, in logs</td>
                      <td className="p-4">At login and assignment, before access</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-white/80">Admin mental model</td>
                      <td className="p-4">Per-product silos</td>
                      <td className="p-4">Org admin + groups as provisioning unit</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-white/80">PoC strategy</td>
                      <td className="p-4">Report on legacy matrix</td>
                      <td className="p-4">Read-only role on new enforcement layer</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-white/80">Scale tradeoff</td>
                      <td className="p-4">Field-level precision, high config cost</td>
                      <td className="p-4">Area-level first, templates later</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="phasing" className="space-y-6">
              <SectionHeading title="Phased program" subtitle="Where my tenure sat in the roadmap" />
              <div className="space-y-4">
                {[
                  {
                    phase: "Phase 1 · Foundation",
                    body:
                      "Default read-only role, area-level restrictions, single-identity assignment flows, core audit narrative, and safe enablement for org admins.",
                  },
                  {
                    phase: "Phase 2 · Scale for org admins",
                    body:
                      "Custom roles, permission matrix, bulk assignment, dual visibility (roles per user / users per role), and conflict surfacing.",
                  },
                  {
                    phase: "Phase 3 · Advanced MSO",
                    body:
                      "Multi-org access patterns, temporary roles, sandbox parity, alerting, and reporting for enterprise security reviews.",
                  },
                ].map((item) => (
                  <div
                    key={item.phase}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <h4 className="text-white mb-2">{item.phase}</h4>
                    <p className="text-white/55">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="solution" className="space-y-6">
              <SectionHeading
                title="Solution"
                subtitle="What I owned in IA and interaction design"
              />
              <div className="text-white/60 space-y-4 text-lg leading-relaxed">
                <p>
                  I partnered on authorization IA for the MSO layer: account directory as identity
                  anchor, groups as the provisioning unit between universal identity and RBAC, a
                  scannable permission matrix for revenue staff, and proactive access rules under
                  Security for shift-based teams.
                </p>
                <p>
                  The flows below are{" "}
                  <span className="text-white">reconstructed Organization Admin patterns</span> with
                  brand marks removed — not production exports. Unlock once to view static frames
                  and the interactive prototype (roles, groups, matrix, access rules).
                </p>
              </div>

              <EnterpriseRolesGatedDetail
                unlocked={unlocked}
                onUnlocked={() => setUnlocked(true)}
              >
                <div id="accounts" className="space-y-6">
                  <h3 className="text-xl text-white">One user, one login</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Organization Admin starts at the account directory. Identity lives on the
                    person; application, business unit, and role travel with groups — so a biller
                    covering two practices does not need two logins.
                  </p>
                  <AccountsMainFigure />
                  <AccountGroupsDrawerFigure />
                </div>

                <div id="groups" className="space-y-6">
                  <h3 className="text-xl text-white">Groups as the provisioning unit</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Groups bind applications to roles, filter locations for large MSOs, and attach
                    one access rule per team — login hours follow the group, not a one-off user
                    flag.
                  </p>
                  <GroupBasicInfoFigure />
                  <GroupLocationsFigure />
                  <GroupSettingsFigure />
                </div>

                <div id="roles-matrix" className="space-y-6">
                  <h3 className="text-xl text-white">The Biller matrix</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Phase 2 needed a matrix org admins could scan. Privileges group as Patients,
                    Practices, payments, and Analytics — with Firm Financials as the first revenue
                    vertical slice.
                  </p>
                  <RolesBillerFigure />
                </div>

                <div id="access-rules" className="space-y-6">
                  <h3 className="text-xl text-white">Access rules under Security</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Rules map to groups and describe when access is allowed — any day left off the
                    list is implicitly denied.
                  </p>
                  <AccessRulesFigure />
                  <EditAccessRuleFigure />
                </div>

                <div id="interactive-demo" className="space-y-4">
                  <h3 className="text-xl text-white">Interactive concept demo</h3>
                  <p className="text-white/45 text-sm leading-relaxed max-w-3xl border-l-2 border-[#EB5097]/40 pl-4">
                    Do not redistribute captures without approval. Recruiters: request the
                    case-study password if you do not already have it.
                  </p>
                  <EnterpriseRolesPrototype hideOverlayGate />
                </div>
              </EnterpriseRolesGatedDetail>
            </section>

            <section id="testing" className="space-y-6">
              <SectionHeading
                title="Testing"
                subtitle="No formal usability study — design-partner reviews instead"
              />
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Design-partner reviews", value: "Weekly" },
                  { label: "Formal usability study", value: "None in tenure" },
                  { label: "Production KPIs", value: "Not yet — PoC phase" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center"
                  >
                    <p className="text-2xl text-white mb-1">{stat.value}</p>
                    <p className="text-white/45 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              <BulletList
                items={[
                  "Pressure-tested read-only PoC flows: enablement toggles, assignment review, and audit visibility.",
                  "Surfaced conflict states, overlapping roles, and org-admin mental models in working sessions.",
                  "Aligned group provisioning stories with universal identity and license rules before matrix scale-up.",
                ]}
              />
            </section>

            <section id="teamwork" className="space-y-6">
              <SectionHeading title="Teamwork" />
              <div className="space-y-3">
                {[
                  "Partnered with UX research, enterprise architecture, product, and engineering on authorization IA for the MSO layer.",
                  "Co-led discovery toward a cross-ecosystem permission matrix and single org-admin mental model.",
                  "Facilitated weekly enterprise design-partner reviews; synthesized learnings via research repository.",
                  "Aligned design deliverables to a multi-product roadmap while keeping PoC scope shippable.",
                ].map((point) => (
                  <div key={point} className="flex gap-4 items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "#EB5097" }}
                    />
                    <p className="text-white/60 flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="impact" className="space-y-4">
              <SectionHeading title="Impact" />
              <p className="text-white/60 text-lg leading-relaxed">
                This initiative belonged to a larger platform program; I left before Phase 1 reached
                customer release. The case study documents{" "}
                <span className="text-white">design leadership and systems thinking</span> under
                enterprise constraints — not launch metrics or revenue impact. Deeper product detail
                remains confidential behind the case-study password.
              </p>
            </section>

            <section id="reflection" className="space-y-6">
              <SectionHeading
                title="Reflection"
                subtitle="What I would carry into the next authorization program"
              />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Research",
                    body:
                      "I'd sit with MSO admins in their tooling first — one week of contextual work would sharpen the matrix and enablement flows more than another architecture deck.",
                  },
                  {
                    title: "PoC scope",
                    body:
                      "Read-only was the right de-risk move. I'd still name earlier which Phase 2 matrix rows are non-negotiable for revenue vs clinical so design partners do not debate the whole grid at once.",
                  },
                  {
                    title: "Confidentiality",
                    body:
                      "Password-gated reconstructions let me show craft to hiring teams without publishing client UI — worth the extra build if the narrative and diagrams earn trust first.",
                  },
                  {
                    title: "Program honesty",
                    body:
                      "Not shipped during my tenure is the accurate story. Leading with that keeps the case study credible for senior enterprise roles.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <h4 className="text-white mb-2">{card.title}</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {expandedFigure === "mso" && (
              <FigureModal
                title="MSO layer in a multi-application ecosystem"
                subtitle="Concept diagram — anonymized; not client UI"
                src={msoEcosystemDiagram}
                alt="Expanded MSO ecosystem concept diagram"
                onClose={() => setExpandedFigure(null)}
              />
            )}
            {expandedFigure === "rbac" && (
              <FigureModal
                title="Group provisioning → universal identity → licensing → RBAC"
                subtitle="Portfolio concept only"
                src={rbacProvisioningDiagram}
                alt="Expanded RBAC provisioning concept diagram"
                onClose={() => setExpandedFigure(null)}
              />
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-8">
          <PreviousProject
            projectName="Allied Credit Union — Mobile Banking"
            onNavigate={() => onNavigateToProject?.("project-3")}
          />
          <NextProject
            projectName="Juice Up — E-Commerce"
            onNavigate={() => onNavigateToProject?.("juice-up")}
          />
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
