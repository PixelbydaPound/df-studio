import { track } from "@vercel/analytics";

const PORTFOLIO_SESSION_KEY = "df_portfolio_session_tracked";

type AnalyticsEventType =
  | "portfolio_session"
  | "case_study_view"
  | "dod_unlock";

async function postAnalyticsEvent(
  type: AnalyticsEventType,
  projectId?: string,
): Promise<void> {
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, projectId }),
    });
  } catch {
    // Analytics should never block navigation.
  }
}

export function trackPortfolioSession(): void {
  if (sessionStorage.getItem(PORTFOLIO_SESSION_KEY) === "true") {
    return;
  }

  sessionStorage.setItem(PORTFOLIO_SESSION_KEY, "true");
  void postAnalyticsEvent("portfolio_session");
  track("portfolio_session");
}

export function trackCaseStudyView(projectId: string): void {
  void postAnalyticsEvent("case_study_view", projectId);
  track("case_study_view", { projectId });
}

export type PortfolioStats = {
  portfolioSessions: number;
  caseStudyViews: Record<string, number>;
  dodUnlocks: number;
  recentEvents: Array<{
    type: string;
    projectId?: string;
    at: string;
  }>;
  updatedAt: string;
};

export async function fetchPortfolioStats(): Promise<PortfolioStats | null> {
  try {
    const response = await fetch("/api/analytics/stats", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as PortfolioStats;
  } catch {
    return null;
  }
}

export function isAnalyticsDashboardEnabled(): boolean {
  return new URLSearchParams(window.location.search).get("analytics") === "1";
}
