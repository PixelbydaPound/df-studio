import { useState } from "react";
import { ChevronDown } from "lucide-react";

type GuideThinkingProps = {
  headline: string;
  thoughtsLabel: string;
  lines: string[];
  activeIndex: number;
};

export function GuideThinking({
  headline,
  thoughtsLabel,
  lines,
  activeIndex,
}: GuideThinkingProps) {
  const [stepsOpen, setStepsOpen] = useState(true);
  const doneCount = Math.min(activeIndex, lines.length);

  return (
    <div className="portfolio-guide-thinking-block" aria-live="polite">
      <div className="portfolio-guide-thinking-head">
        <span className="portfolio-guide-thinking-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{headline}</span>
      </div>

      {lines[doneCount] && (
        <p className="portfolio-guide-thinking-current">{lines[doneCount]}</p>
      )}

      {lines.length > 0 && (
        <>
          <button
            type="button"
            className="portfolio-guide-thinking-steps-toggle"
            aria-expanded={stepsOpen}
            onClick={() => setStepsOpen((v) => !v)}
          >
            <span>{thoughtsLabel}</span>
            <ChevronDown
              className={`portfolio-guide-disclosure-chevron${
                stepsOpen ? " is-open" : ""
              }`}
              size={14}
              aria-hidden
            />
          </button>

          <div
            className={`portfolio-guide-thinking-steps${
              stepsOpen ? " is-open" : ""
            }`}
          >
            <div className="portfolio-guide-thinking-steps-inner">
              <ul>
                {lines.map((line, i) => {
                  const status =
                    i < doneCount ? "done" : i === doneCount ? "active" : "pending";
                  return (
                    <li
                      key={line}
                      className={`portfolio-guide-thinking-step portfolio-guide-thinking-step--${status}`}
                    >
                      {line}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}