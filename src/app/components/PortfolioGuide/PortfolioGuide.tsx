import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import {
  getPortfolioGuideBrand,
  getPortfolioGuideData,
  getIntentById,
  matchPortfolioGuideQuery,
  resolveFollowUp,
  type PortfolioGuideBrand,
  type PortfolioGuideIntent,
  type PortfolioGuideSection,
} from "../../lib/portfolioGuide";
import "./PortfolioGuide.css";

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
  const [open, setOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [customInputOpen, setCustomInputOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<GuideMessage[]>([]);
  const [lastFollowUps, setLastFollowUps] = useState<string[]>(
    guide.prompts.map((p) => p.label),
  );
  const listRef = useRef<HTMLDivElement>(null);

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
  }, [messages, thinking, open]);

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

  const respond = useCallback(
    (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed) return;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", content: trimmed },
      ]);
      setDraft("");
      setThinking(true);

      const { intent, reason } = matchPortfolioGuideQuery(trimmed);
      const delay = reason === "matched" || reason === "off-topic" ? 0 : 280;

      window.setTimeout(() => {
        applyIntent(intent);
        setThinking(false);
      }, delay);
    },
    [applyIntent],
  );

  const handlePrompt = useCallback(
    (label: string, intentId?: string) => {
      const intent = intentId
        ? getIntentById(intentId)
        : resolveFollowUp(label);
      if (!intent) return;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", content: label },
      ]);
      applyIntent(intent);
    },
    [applyIntent],
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (thinking) return;
    respond(draft);
  };

  const openCaseStudy = (projectId: string) => {
    setOpen(false);
    onNavigateToProject?.(projectId);
  };

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

            <div className="portfolio-guide-messages" ref={listRef}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`portfolio-guide-bubble portfolio-guide-bubble--${msg.role}`}
                >
                  {msg.role === "assistant" && msg.sections?.length ? (
                    <div className="portfolio-guide-sections">
                      {msg.sections.map((section) => (
                        <div
                          key={section.title}
                          className="portfolio-guide-section"
                        >
                          <p className="portfolio-guide-section-title">
                            {section.title}
                          </p>
                          <p className="portfolio-guide-section-body">
                            {section.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    msg.content
                  )}
                  {msg.role === "assistant" && msg.sourceLabel && (
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
              ))}
              {thinking && (
                <p className="portfolio-guide-thinking" aria-live="polite">
                  {brand.thinkingLabel}
                </p>
              )}
            </div>

            <div className="portfolio-guide-topics">
              <p className="portfolio-guide-topics-label">{brand.topicsLabel}</p>
              <div className="portfolio-guide-topics-scroll">
                {guide.prompts.map((prompt) => (
                  <button
                    key={prompt.intentId}
                    type="button"
                    className="portfolio-guide-chip portfolio-guide-chip--compact"
                    disabled={thinking}
                    onClick={() => handlePrompt(prompt.label, prompt.intentId)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            {lastFollowUps.length > 0 && messages.length > 0 && (
              <div className="portfolio-guide-followups">
                <p className="portfolio-guide-followups-label">{brand.followUpsLabel}</p>
                {lastFollowUps.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="portfolio-guide-followup"
                    disabled={thinking}
                    onClick={() => handlePrompt(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <GuideFooter
              brand={brand}
              customInputOpen={customInputOpen}
              setCustomInputOpen={setCustomInputOpen}
              draft={draft}
              setDraft={setDraft}
              thinking={thinking}
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
          Back to topics
        </button>
      )}
      <p className="portfolio-guide-footer-note">{disclaimer}</p>
    </form>
  );
}