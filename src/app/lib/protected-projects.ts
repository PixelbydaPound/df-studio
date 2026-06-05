export const DOD_PROTECTED_PROJECT_IDS = ["maia", "rappi-mix"] as const;

export type DodProtectedProjectId = (typeof DOD_PROTECTED_PROJECT_IDS)[number];

const PROJECT_TITLES: Record<DodProtectedProjectId, string> = {
  maia: "Building a Conversational AI Design System for GovTech HRIT",
  "rappi-mix": "Maia - AI native GovTech HRIT Solution",
};

export function isDodProtectedProject(
  projectId: string,
): projectId is DodProtectedProjectId {
  return DOD_PROTECTED_PROJECT_IDS.includes(projectId as DodProtectedProjectId);
}

export function getDodProtectedProjectTitle(projectId: string): string {
  if (isDodProtectedProject(projectId)) {
    return PROJECT_TITLES[projectId];
  }

  return "DoD case study";
}
