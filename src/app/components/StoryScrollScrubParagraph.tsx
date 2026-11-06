import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";

const ACCENT = "#EB5097";

export type StoryWordToken = {
  word: string;
  href?: string;
  linkClassName?: string;
};

function tokenizePlainText(text: string): StoryWordToken[] {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({ word }));
}

/** Build ordered word tokens; link words share href so we can wrap consecutive runs in one <a>. */
export function storyTokensFromParts(
  parts: ReadonlyArray<
    | { kind: "text"; text: string }
    | { kind: "link"; text: string; href: string; linkClassName?: string }
  >,
): StoryWordToken[] {
  const out: StoryWordToken[] = [];
  for (const part of parts) {
    if (part.kind === "text") {
      out.push(...tokenizePlainText(part.text));
    } else {
      for (const word of part.text.split(/\s+/).filter(Boolean)) {
        out.push({
          word,
          href: part.href,
          linkClassName: part.linkClassName,
        });
      }
    }
  }
  return out;
}

type StoryScrollScrubParagraphProps = {
  tokens: StoryWordToken[];
  className?: string;
};

/**
 * Collins-style scroll-scrubbed body copy: words crossfade from --story-soft to --story-fg
 * as the block moves through the viewport.
 */
export function StoryScrollScrubParagraph({ tokens, className }: StoryScrollScrubParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.38"],
  });

  const [progress, setProgress] = useState(() => scrollYProgress.get());
  useLayoutEffect(() => {
    setProgress(scrollYProgress.get());
  }, [scrollYProgress]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  const total = tokens.length;

  const grouped = useMemo(() => {
    type Group = { href?: string; linkClassName?: string; startIndex: number; words: StoryWordToken[] };
    const groups: Group[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      const prev = groups[groups.length - 1];
      const key = t.href ?? "";
      const prevKey = prev?.href ?? "";
      if (!prev || key !== prevKey) {
        groups.push({
          href: t.href,
          linkClassName: t.linkClassName,
          startIndex: i,
          words: [t],
        });
      } else {
        prev.words.push(t);
      }
    }
    return groups;
  }, [tokens]);

  const wordRevealWeight = (globalIndex: number) => {
    if (total <= 1) {
      return 1;
    }
    const segmentStart = globalIndex / total;
    const segmentEnd = (globalIndex + 1) / total;
    return Math.min(1, Math.max(0, (progress - segmentStart) / (segmentEnd - segmentStart)));
  };

  const bodyWordColor = (globalIndex: number) => {
    const w = wordRevealWeight(globalIndex);
    const softPct = (1 - w) * 100;
    const fgPct = w * 100;
    return `color-mix(in oklch, var(--story-soft) ${softPct}%, var(--story-fg) ${fgPct}%)`;
  };

  /** Accent link: fade from muted pink to full accent (no dependency on --story-fg). */
  const linkWordStyle = (globalIndex: number) => {
    const w = wordRevealWeight(globalIndex);
    return {
      color: ACCENT,
      opacity: 0.35 + 0.65 * w,
    } as const;
  };

  if (reducedMotion) {
    return (
      <p ref={ref} className={className}>
        {grouped.map((group, gi) => (
          <span key={gi}>
            {gi > 0 ? " " : null}
            {group.href ? (
              <a href={group.href} target="_blank" rel="noopener noreferrer" className={group.linkClassName}>
                {group.words.map((t, wi) => (
                  <span key={wi}>
                    {t.word}
                    {wi < group.words.length - 1 ? " " : ""}
                  </span>
                ))}
              </a>
            ) : (
              group.words.map((t, wi) => (
                <span key={wi}>
                  {t.word}
                  {wi < group.words.length - 1 ? " " : ""}
                </span>
              ))
            )}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {grouped.map((group, gi) => {
        const wordSpans = group.words.map((t, wi) => {
          const globalIndex = group.startIndex + wi;
          const style = t.href ? linkWordStyle(globalIndex) : { color: bodyWordColor(globalIndex) };

          return (
            <span
              key={`${gi}-${wi}`}
              className="transition-[color,opacity] duration-75"
              style={style}
            >
              {t.word}
              {wi < group.words.length - 1 ? " " : ""}
            </span>
          );
        });

        const tailSpace = gi < grouped.length - 1 ? " " : null;

        if (group.href) {
          return (
            <span key={gi}>
              <a href={group.href} target="_blank" rel="noopener noreferrer" className={group.linkClassName}>
                {wordSpans}
              </a>
              {tailSpace}
            </span>
          );
        }

        return (
          <span key={gi}>
            {wordSpans}
            {tailSpace}
          </span>
        );
      })}
    </p>
  );
}
