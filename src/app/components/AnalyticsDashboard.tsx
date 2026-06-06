import { useEffect, useState } from "react";
import {
  fetchPortfolioStats,
  type PortfolioStats,
} from "../lib/analytics";
import "./AnalyticsDashboard.css";

const PROJECT_LABELS: Record<string, string> = {
  maia: "Maia Design System",
  "rappi-mix": "Maia HRIT",
  "project-3": "Allied Credit Union",
  "juice-up": "Juice Up",
  "urc-records": "URC Records",
};

type AnalyticsDashboardProps = {
  onClose: () => void;
};

function formatProjectLabel(projectId?: string): string {
  if (!projectId) return "—";
  return PROJECT_LABELS[projectId] || projectId;
}

function formatEventLabel(type: string): string {
  if (type === "portfolio_session") return "Portfolio session";
  if (type === "case_study_view") return "Case study view";
  if (type === "dod_unlock") return "DoD unlock";
  return type;
}

export function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPortfolioStats().then((result) => {
      if (cancelled) return;

      if (result.status === "ok") {
        setStats(result.stats);
        setErrorMessage(null);
      } else if (result.status === "unauthorized") {
        setStats(null);
        setErrorMessage(
          "You need to be signed in to the portfolio before opening this dashboard.",
        );
      } else {
        setStats(null);
        setErrorMessage("Unable to load analytics right now. Try again shortly.");
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const caseStudyEntries = Object.entries(stats?.caseStudyViews || {}).sort(
    (a, b) => b[1] - a[1],
  );

  const totalCaseStudyViews = caseStudyEntries.reduce(
    (sum, [, count]) => sum + count,
    0,
  );

  return (
    <div className="analytics-dashboard" role="dialog" aria-modal="true">
      <div className="analytics-dashboard__panel">
        <div className="analytics-dashboard__header">
          <div>
            <h2 className="analytics-dashboard__title">Portfolio analytics</h2>
            <p className="analytics-dashboard__subtitle">
              Internal view tracker for portfolio sessions and case study access.
            </p>
          </div>
          <button
            type="button"
            className="analytics-dashboard__close"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {loading && (
          <p className="analytics-dashboard__loading">Loading analytics...</p>
        )}

        {!loading && errorMessage && (
          <p className="analytics-dashboard__empty">{errorMessage}</p>
        )}

        {!loading && stats && (
          <>
            {stats.storageConfigured === false && (
              <p className="analytics-dashboard__empty" style={{ marginBottom: 16 }}>
                Analytics storage is not connected yet. In Vercel, create a Blob
                store, link it to this project, redeploy, then revisit this page.
              </p>
            )}

            <div className="analytics-dashboard__grid">
              <div className="analytics-dashboard__card">
                <div className="analytics-dashboard__card-label">
                  Portfolio sessions
                </div>
                <div className="analytics-dashboard__card-value">
                  {stats.portfolioSessions}
                </div>
              </div>
              <div className="analytics-dashboard__card">
                <div className="analytics-dashboard__card-label">
                  Case study views
                </div>
                <div className="analytics-dashboard__card-value">
                  {totalCaseStudyViews}
                </div>
              </div>
              <div className="analytics-dashboard__card">
                <div className="analytics-dashboard__card-label">
                  DoD unlocks
                </div>
                <div className="analytics-dashboard__card-value">
                  {stats.dodUnlocks}
                </div>
              </div>
            </div>

            <section>
              <h3 className="analytics-dashboard__section-title">
                Case study breakdown
              </h3>
              {caseStudyEntries.length === 0 ? (
                <p className="analytics-dashboard__empty">No case study views yet.</p>
              ) : (
                <div className="analytics-dashboard__list">
                  {caseStudyEntries.map(([projectId, count]) => (
                    <div key={projectId} className="analytics-dashboard__row">
                      <span className="analytics-dashboard__row-label">
                        {formatProjectLabel(projectId)}
                      </span>
                      <span className="analytics-dashboard__row-value">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="analytics-dashboard__events">
              <h3 className="analytics-dashboard__section-title">
                Recent activity
              </h3>
              {stats.recentEvents.length === 0 ? (
                <p className="analytics-dashboard__empty">No recent events.</p>
              ) : (
                stats.recentEvents.slice(0, 20).map((event, index) => (
                  <div key={`${event.at}-${index}`} className="analytics-dashboard__event">
                    <span>{formatEventLabel(event.type)}</span>
                    <span>{formatProjectLabel(event.projectId)}</span>
                    <span>{new Date(event.at).toLocaleString()}</span>
                  </div>
                ))
              )}
            </section>

            <p className="analytics-dashboard__subtitle" style={{ marginTop: 24 }}>
              Last updated: {new Date(stats.updatedAt).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
