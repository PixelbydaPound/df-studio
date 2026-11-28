import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type GuideDisclosureProps = {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  badge?: number;
};

export function GuideDisclosure({
  label,
  open,
  onToggle,
  children,
  badge,
}: GuideDisclosureProps) {
  return (
    <div className="portfolio-guide-disclosure">
      <button
        type="button"
        className="portfolio-guide-disclosure-trigger"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="portfolio-guide-disclosure-label">{label}</span>
        {!open && badge !== undefined && badge > 0 ? (
          <span className="portfolio-guide-disclosure-badge">{badge}</span>
        ) : null}
        <ChevronDown
          className={`portfolio-guide-disclosure-chevron${open ? " is-open" : ""}`}
          size={16}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      <div
        className={`portfolio-guide-disclosure-panel${open ? " is-open" : ""}`}
      >
        <div className="portfolio-guide-disclosure-inner">{children}</div>
      </div>
    </div>
  );
}