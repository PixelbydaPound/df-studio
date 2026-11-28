import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";
import type { PortfolioGuideSection } from "../../lib/portfolioGuide";

type StreamingGuideMessageProps = {
  content: string;
  sections?: PortfolioGuideSection[];
  enabled: boolean;
  onStreamingChange?: (active: boolean) => void;
};

function tokenizeWords(text: string): string[] {
  return text.match(/\S+\s*/g) ?? [];
}

function StreamingParagraph({
  text,
  active,
  onComplete,
}: {
  text: string;
  active: boolean;
  onComplete: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const tokens = useMemo(() => tokenizeWords(text), [text]);
  const [visibleCount, setVisibleCount] = useState(
    active && !reducedMotion ? 0 : tokens.length,
  );
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    if (!active || reducedMotion) {
      setVisibleCount(tokens.length);
      if (active && !completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }

    setVisibleCount(0);
    if (tokens.length === 0) {
      completedRef.current = true;
      onComplete();
      return;
    }

    const step = Math.max(
      8,
      Math.min(14, 1800 / Math.max(tokens.length, 1)),
    );

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);
      if (index >= tokens.length) {
        window.clearInterval(timer);
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      }
    }, step);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion, tokens, onComplete, text]);

  const streaming = active && !reducedMotion && visibleCount < tokens.length;

  return (
    <p className="portfolio-guide-section-body">
      {tokens.slice(0, visibleCount).join("")}
      {streaming && (
        <span className="portfolio-guide-stream-caret" aria-hidden="true" />
      )}
    </p>
  );
}

export function StreamingGuideMessage({
  content,
  sections,
  enabled,
  onStreamingChange,
}: StreamingGuideMessageProps) {
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState(0);
  const [bodyFinished, setBodyFinished] = useState(false);

  const shouldStream = enabled && !reducedMotion;
  const sectionCount = sections?.length ?? 0;

  useEffect(() => {
    setActiveSection(0);
    setBodyFinished(false);
    if (!shouldStream) {
      onStreamingChange?.(false);
      return;
    }
    onStreamingChange?.(true);
  }, [content, sections, shouldStream, onStreamingChange]);

  const finishAll = useCallback(() => {
    onStreamingChange?.(false);
  }, [onStreamingChange]);

  useEffect(() => {
    if (!sections?.length) return;
    if (!shouldStream) return;
    if (activeSection >= sectionCount && bodyFinished) {
      finishAll();
    }
  }, [
    activeSection,
    bodyFinished,
    sectionCount,
    sections,
    shouldStream,
    finishAll,
  ]);

  const onSectionBodyComplete = useCallback(() => {
    setBodyFinished(true);
    window.setTimeout(() => {
      setActiveSection((i) => {
        const next = i + 1;
        if (next >= sectionCount) {
          finishAll();
        }
        return next;
      });
      setBodyFinished(false);
    }, 60);
  }, [sectionCount, finishAll]);

  if (sections?.length) {
    const streamComplete =
      !shouldStream || activeSection >= sectionCount;

    return (
      <div
        className="portfolio-guide-sections"
        aria-live={shouldStream ? "polite" : "off"}
      >
        {sections.map((section, index) => {
          if (!streamComplete && index > activeSection) return null;

          const showFull =
            streamComplete || index < activeSection || !shouldStream;

          return (
            <div key={section.title} className="portfolio-guide-section">
              <p className="portfolio-guide-section-title">{section.title}</p>
              {showFull ? (
                <p className="portfolio-guide-section-body">{section.body}</p>
              ) : (
                <StreamingParagraph
                  text={section.body}
                  active={index === activeSection && !bodyFinished}
                  onComplete={onSectionBodyComplete}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <PlainStreamingContent
      content={content}
      active={shouldStream}
      onStreamingChange={onStreamingChange}
    />
  );
}

function PlainStreamingContent({
  content,
  active,
  onStreamingChange,
}: {
  content: string;
  active: boolean;
  onStreamingChange?: (active: boolean) => void;
}) {
  const reducedMotion = useReducedMotion();
  const tokens = useMemo(() => tokenizeWords(content), [content]);
  const [visibleCount, setVisibleCount] = useState(
    active && !reducedMotion ? 0 : tokens.length,
  );

  useEffect(() => {
    if (!active || reducedMotion) {
      setVisibleCount(tokens.length);
      onStreamingChange?.(false);
      return;
    }

    onStreamingChange?.(true);
    setVisibleCount(0);
    if (tokens.length === 0) {
      onStreamingChange?.(false);
      return;
    }

    const step = Math.max(8, Math.min(14, 1800 / Math.max(tokens.length, 1)));
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);
      if (index >= tokens.length) {
        window.clearInterval(timer);
        onStreamingChange?.(false);
      }
    }, step);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion, tokens, content, onStreamingChange]);

  const streaming = active && !reducedMotion && visibleCount < tokens.length;

  return (
    <p className="portfolio-guide-plain-stream" aria-live={active ? "polite" : "off"}>
      {tokens.slice(0, visibleCount).join("")}
      {streaming && (
        <span className="portfolio-guide-stream-caret" aria-hidden="true" />
      )}
    </p>
  );
}