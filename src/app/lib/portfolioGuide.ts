import guideData from "../../data/portfolio-guide.json";

export type PortfolioGuideSection = {
  title: string;
  body: string;
};

export type PortfolioGuideIntent = {
  id: string;
  keywords: string[];
  /** Plain fallback when `sections` is omitted */
  answer: string;
  sections?: PortfolioGuideSection[];
  sourceLabel: string | null;
  caseStudyId?: string;
  followUps?: string[];
};

export type PortfolioGuideBrand = {
  name: string;
  audience: string;
  tagline: string;
  fabLabel: string;
  fabLabelShort: string;
  topicsLabel: string;
  followUpsLabel: string;
  searchCta: string;
  searchPlaceholder: string;
  thinkingLabel: string;
  thoughtsLabel: string;
};

export type PortfolioGuideData = {
  brand?: PortfolioGuideBrand;
  welcome: string;
  disclaimer: string;
  prompts: { label: string; intentId: string }[];
  followUpRoutes?: { label: string; intentId: string }[];
  intents: PortfolioGuideIntent[];
};

const DEFAULT_BRAND: PortfolioGuideBrand = {
  name: "Recruiter Ask",
  audience: "For hiring teams",
  tagline: "From Daniel's portfolio case studies, not a general chatbot",
  fabLabel: "Recruiter Ask",
  fabLabelShort: "Ask",
  topicsLabel: "Other case studies",
  followUpsLabel: "Insights",
  searchCta: "Search portfolio case studies",
  searchPlaceholder: "Juice Up, Allied, outcomes (this site only)",
  thinkingLabel: "Matching your question",
  thoughtsLabel: "Review steps",
};

/** Scripted “thinking” lines for Recruiter Ask (portfolio matching, not a live LLM). */
export function getThinkingLinesForIntent(
  intent: PortfolioGuideIntent,
  userText: string,
): string[] {
  const lines: string[] = ["Scanning published case studies on this site…"];

  if (intent.sourceLabel) {
    lines.push(`Matched: ${intent.sourceLabel}`);
  } else if (intent.sections?.[0]?.title) {
    lines.push(`Pulling section: ${intent.sections[0].title}`);
  } else if (intent.id !== "default" && intent.id !== "out-of-scope") {
    const hint = userText.trim().slice(0, 56);
    if (hint) lines.push(`Topic: ${hint}${userText.length > 56 ? "…" : ""}`);
  }

  lines.push("Formatting answer from Daniel's portfolio work");
  return lines.slice(0, 4);
}

const data = guideData as PortfolioGuideData;

const intentById = new Map(data.intents.map((intent) => [intent.id, intent]));

/** Minimum keyword score before we return a non-default intent from free text. */
export const MIN_PORTFOLIO_GUIDE_SCORE = 2;

const OFF_TOPIC_PATTERN =
  /\b(resume|résumé|cover letter|salary|negotiat|write (me|a)|poem|recipe|homework|essay|python tutorial|javascript tutorial|react tutorial|compare apple|openai|chatgpt|gpt-4|claude\b|midjourney|crypto|bitcoin|weather|who won|election|president)\b/i;

export type PortfolioGuideMatch = {
  intent: PortfolioGuideIntent;
  score: number;
  reason: "routed" | "matched" | "off-topic" | "low-confidence";
};

export function getPortfolioGuideData(): PortfolioGuideData {
  return data;
}

export function getPortfolioGuideBrand(): PortfolioGuideBrand {
  return { ...DEFAULT_BRAND, ...data.brand };
}

export function getIntentById(intentId: string): PortfolioGuideIntent | undefined {
  return intentById.get(intentId) ?? intentById.get("default");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function scoreIntent(intent: PortfolioGuideIntent, normalized: string, words: string[]): number {
  let score = 0;
  for (const keyword of intent.keywords) {
    const kw = keyword.toLowerCase();
    if (normalized.includes(kw)) {
      score += kw.includes(" ") ? 3 : 2;
    }
    for (const word of words) {
      if (word === kw || (kw.length > 4 && word.startsWith(kw.slice(0, 4)))) {
        score += 1;
      }
    }
  }
  return score;
}

export function isOffTopicPortfolioQuery(query: string): boolean {
  const normalized = query.trim();
  if (normalized.length < 3) return false;
  return OFF_TOPIC_PATTERN.test(normalized);
}

export function matchPortfolioGuideQuery(query: string): PortfolioGuideMatch {
  const normalized = query.toLowerCase().trim();
  const words = tokenize(normalized);

  if (isOffTopicPortfolioQuery(query)) {
    return {
      intent: intentById.get("out-of-scope") ?? intentById.get("default")!,
      score: 0,
      reason: "off-topic",
    };
  }

  let best: PortfolioGuideIntent = intentById.get("default")!;
  let bestScore = 0;

  for (const intent of data.intents) {
    if (intent.id === "default" || intent.id === "out-of-scope") continue;

    const score = scoreIntent(intent, normalized, words);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (bestScore >= MIN_PORTFOLIO_GUIDE_SCORE) {
    return { intent: best, score: bestScore, reason: "matched" };
  }

  return {
    intent: intentById.get("default")!,
    score: bestScore,
    reason: "low-confidence",
  };
}

export function resolveFollowUp(label: string): PortfolioGuideIntent {
  const route = data.followUpRoutes?.find(
    (entry) => entry.label.toLowerCase() === label.toLowerCase(),
  );
  if (route) {
    const routed = getIntentById(route.intentId);
    if (routed) {
      return { ...routed, id: routed.id };
    }
  }

  const prompt = data.prompts.find(
    (p) => p.label.toLowerCase() === label.toLowerCase(),
  );
  if (prompt) {
    const intent = getIntentById(prompt.intentId);
    if (intent) return intent;
  }

  for (const intent of data.intents) {
    if (intent.id === "default" || intent.id === "out-of-scope") continue;
    const hit = intent.keywords.some((kw) =>
      label.toLowerCase().includes(kw.toLowerCase()),
    );
    if (hit) return intent;
  }

  return matchPortfolioGuideQuery(label).intent;
}

/** On by default in dev and production; set VITE_PORTFOLIO_GUIDE=0 to hide. */
export function isPortfolioGuideEnabled(): boolean {
  if (import.meta.env.VITE_PORTFOLIO_GUIDE === "0") return false;
  return true;
}