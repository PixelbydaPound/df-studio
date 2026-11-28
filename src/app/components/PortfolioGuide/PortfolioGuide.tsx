import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import {
  getPortfolioGuideBrand,
  getPortfolioGuideData,
  getIntentById,
  getThinkingLinesForIntent,
  matchPortfolioGuideQuery,
  resolveFollowUp,
  type PortfolioGuideBrand,
  type PortfolioGuideIntent,
  type PortfolioGuideSection,
} from "../../lib/portfolioGuide";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { GuideDisclosure } from "./GuideDisclosure";
import { GuideThinking } from "./GuideThinking";
import { StreamingGuideMessage } from "./StreamingGuideMessage";
import "./PortfolioGuide.css";

const THINKING_STEP_MS = 340;
const THINKING_FINISH_MS = 240;

type GuideMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sections?: PortfolioGuideSection[];
  sourceLabel?: string | null;
  caseStudyId?: string;
  followUps?: string[];
};

type PortfolioGuideProps = {
  onNavigateToProject?: (projectId: string) => void;
};

let messageId = 0;
function nextId() {
  messageId += 1;
  return `guide-msg-${messageId}`;
}

function intentToAssistantMessage(intent: PortfolioGuideIntent): GuideMessage {
  const hasSections = Boolean(intent.sections?.length);
  return {
    id: nextId(),
    role: "assistant",
    content: hasSections ? "" : intent.answer,
    sections: hasSections ? intent.sections : undefined,
    sourceLabel: intent.sourceLabel,
    caseStudyId: intent.caseStudyId,
    followUps: intent.followUps,
  };
}

export function PortfolioGuide({ onNavigateToProject }: PortfolioGuideProps) {
  const guide = getPortfolioGuideData();
  const brand = getPortfolioGuideBrand();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [thinkingLines, setThinkingLines] = useState<string[]>([]);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [topicsExpanded, setTopicsExpanded] = useState(true);
  const [followUpsExpanded, setFollowUpsExpanded] = useState(false);
  const [customInputOpen, setCustomInputOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<GuideMessage[]>([]);
  const [lastFollowUps, setLastFollowUps] = useState<string[]>(
    guide.prompts.map((p) => p.label),
  );
  const listRef = useRef<HTMLDivElement>(null);
  const pendingIntentRef = useRef<PortfolioGuideIntent | null>(null);

  const conversationStarted = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages],
  );

  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === "assistant") return messages[i].id;
    }
    return null;
  }, [messages]);

  const seedsBusy = thinking || isStreaming;

  useEffect(() => {
    if (!open || messages.length > 0) return;
    setMessages([
      {
        id: nextId(),
        role: "assistant",
        content: guide.welcome,
      },
    ]);
  }, [open, messages.length, guide.welcome]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking, thinkingStep, isStreaming, open]);

  const applyIntent = useCallback(
    (intent: PortfolioGuideIntent) => {
      setMessages((prev) => [...prev, intentToAssistantMessage(intent)]);
      setLastFollowUps(
        intent.followUps?.length
          ? intent.followUps
          : guide.prompts.map((p) => p.label),
      );
    },
    [guide.prompts],
  );

  const finishThinking = useCallback(() => {
    const intent = pendingIntentRef.current;
    if (intent) {
      applyIntent(intent);
      pendingIntentRef.current = null;
    }
    setThinking(false);
    setThinkingLines([]);
    setThinkingStep(0);
    setFollowUpsExpanded(true);
  }, [applyIntent]);

  useEffect(() => {
    if (!thinking || thinkingLines.length === 0) return;

    if (thinkingStep >= thinkingLines.length) {
      const id = window.setTimeout(finishThinking, THINKING_FINISH_MS);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setThinkingStep((s) => s + 1);
    }, THINKING_STEP_MS);

    return () => window.clearTimeout(id);
  }, [thinking, thinkingStep, thinkingLines.length, finishThinking]);

  const queueAssistantReply = useCallback(
    (userText: string, intent: PortfolioGuideIntent) => {
      const trimmed = userText.trim();
      if (!trimmed) return;

      setTopicsExpanded(false);
      setFollowUpsExpanded(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", content: trimmed },
      ]);
      setDraft("");

      if (reducedMotion) {
        applyIntent(intent);
        setFollowUpsExpanded(true);
        return;
      }

      pendingIntentRef.current = intent;
      setThinkingLines(getThinkingLinesForIntent(intent, trimmed));
      setThinkingStep(0);
      setThinking(true);
    },
    [applyIntent, reducedMotion],
  );

  const respond = useCallback(
    (userText: string) => {
      if (seedsBusy) return;
      const trimmed = userText.trim();
      if (!trimmed) return;
      const { intent } = matchPortfolioGuideQuery(trimmed);
      queueAssistantReply(trimmed, intent);
    },
    [queueAssistantReply, seedsBusy],
  );

  const handlePrompt = useCallback(
    (label: string, intentId?: string) => {
      if (seedsBusy) return;
      const intent = intentId
        ? getIntentById(intentId)
        : resolveFollowUp(label);
      if (!intent) return;
      queueAssistantReply(label, intent);
    },
    [queueAssistantReply, seedsBusy],
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (seedsBusy) return;
    respond(draft);
  };

  const openCaseStudy = (projectId: string) => {
    setOpen(false);
    onNavigateToProject?.(projectId);
  };

  const showFollowUpSection =
    conversationStarted && lastFollowUps.length > 0;

  return (
    <>
      {!open && (
        <button
          type="button"
          className="portfolio-guide-fab"
          onClick={() => setOpen(true)}
          aria-label={`Open ${brand.name}`}
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
          <span className="hidden sm:inline">{brand.fabLabel}</span>
          <span className="sm:hidden">{brand.fabLabelShort}</span>
        </button>
      )}

      {open && (
        <>
          <button
            type="button"
            className="portfolio-guide-backdrop"
            aria-label={`Close ${brand.name}`}
            onClick={() => setOpen(false)}
          />
          <div
            className="portfolio-guide-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-guide-title"
          >
            <header className="portfolio-guide-header">
              <div>
                <p className="portfolio-guide-audience">{brand.audience}</p>
                <h2 id="portfolio-guide-title">{brand.name}</h2>
                <p>{brand.tagline}</p>
              </div>
              <button
                type="button"
                className="portfolio-guide-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="w-4 h-4 mx-auto" />
              </button>
            </header>

            <div
              className={`portfolio-guide-messages${
                conversationStarted ? " portfolio-guide-messages--conversation" : ""
              }`}
              ref={listRef}
            >
              {messages.map((msg) => {
                const isWelcome =
                  msg.role === "assistant" &&
                  msg.content === guide.welcome &&
                  !msg.sections?.length;
                const streamThis =
                  msg.role === "assistant" &&
                  msg.id === lastAssistantId &&
                  !isWelcome;
                const showSource =
                  msg.role === "assistant" &&
                  msg.sourceLabel &&
                  !(streamThis && isStreaming);

                return (
                  <div
                    key={msg.id}
                    className={`portfolio-guide-bubble portfolio-guide-bubble--${msg.role}${
                      msg.role === "assistant" ? " portfolio-guide-bubble--answer" : ""
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <StreamingGuideMessage
                        content={msg.content}
                        sections={msg.sections}
                        enabled={streamThis}
                        onStreamingChange={
                          streamThis ? setIsStreaming : undefined
                        }
                      />
                    ) : (
                      msg.content
                    )}
                    {showSource && (
                      <>
                        {msg.caseStudyId && onNavigateToProject ? (
                          <button
                            type="button"
                            className="portfolio-guide-source"
                            onClick={() => openCaseStudy(msg.caseStudyId!)}
                          >
                            Open {msg.sourceLabel}
                          </button>
                        ) : (
                          <p className="portfolio-guide-meta">{msg.sourceLabel}</p>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {thinking && thinkingLines.length > 0 && (
                <GuideThinking
                  headline={brand.thinkingLabel}
                  thoughtsLabel={brand.thoughtsLabel}
                  lines={thinkingLines}
                  activeIndex={thinkingStep}
                />
              )}
            </div>

            <div className="portfolio-guide-seed-dock">
              <GuideDisclosure
                label={brand.topicsLabel}
                open={topicsExpanded}
                badge={guide.prompts.length}
                onToggle={() => setTopicsExpanded((v) => !v)}
              >
                <div className="portfolio-guide-seed-scroll">
                  {guide.prompts.map((prompt) => (
                    <button
                      key={prompt.intentId}
                      type="button"
                      className="portfolio-guide-chip portfolio-guide-chip--compact"
                      disabled={seedsBusy}
                      onClick={() =>
                        handlePrompt(prompt.label, prompt.intentId)
                      }
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </GuideDisclosure>

              {showFollowUpSection && (
                <GuideDisclosure
                  label={brand.followUpsLabel}
                  open={followUpsExpanded}
                  badge={lastFollowUps.length}
                  onToggle={() => setFollowUpsExpanded((v) => !v)}
                >
                  <div className="portfolio-guide-seed-scroll portfolio-guide-seed-scroll--followups">
                    {lastFollowUps.map((label) => (
                      <button
                        key={label}
                        type="button"
                        className="portfolio-guide-chip portfolio-guide-chip--compact portfolio-guide-chip--followup"
                        disabled={seedsBusy}
                        onClick={() => handlePrompt(label)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </GuideDisclosure>
              )}
            </div>

            <GuideFooter
              brand={brand}
              customInputOpen={customInputOpen}
              setCustomInputOpen={setCustomInputOpen}
              draft={draft}
              setDraft={setDraft}
              thinking={seedsBusy}
              onSubmit={handleSubmit}
              onRespond={respond}
              disclaimer={guide.disclaimer}
            />
          </div>
        </>
      )}
    </>
  );
}

type GuideFooterProps = {
  brand: PortfolioGuideBrand;
  customInputOpen: boolean;
  setCustomInputOpen: (open: boolean) => void;
  draft: string;
  setDraft: (value: string) => void;
  thinking: boolean;
  onSubmit: (event: FormEvent) => void;
  onRespond: (text: string) => void;
  disclaimer: string;
};

function GuideFooter(props: GuideFooterProps) {
  const {
    brand,
    customInputOpen,
    setCustomInputOpen,
    draft,
    setDraft,
    thinking,
    onSubmit,
    onRespond,
    disclaimer,
  } = props;

  return (
    <form className="portfolio-guide-input-row" onSubmit={onSubmit}>
      {!customInputOpen ? (
        <button
          type="button"
          className="portfolio-guide-custom-toggle"
          onClick={() => setCustomInputOpen(true)}
        >
          {brand.searchCta}
        </button>
      ) : (
        <div className="portfolio-guide-input-wrap">
          <textarea
            className="portfolio-guide-input"
            rows={1}
            placeholder={brand.searchPlaceholder}
            value={draft}
            disabled={thinking}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!thinking) onRespond(draft);
              }
            }}
          />
          <button
            type="submit"
            className="portfolio-guide-send"
            disabled={thinking || draft.trim().length === 0}
            aria-label="Send"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}
      {customInputOpen && (
        <button
          type="button"
          className="portfolio-guide-custom-collapse"
          onClick={() => setCustomInputOpen(false)}
        >
          Back to case studies
        </button>
      )}
      <p className="portfolio-guide-footer-note">{disclaimer}</p>
    </form>
  );
}