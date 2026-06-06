const fs = require("fs");
const path = require("path");

const BLOB_PATHNAME = "portfolio-analytics.json";
const LOCAL_DATA_FILE = path.join(__dirname, "analytics-data.json");
const MAX_RECENT_EVENTS = 100;

const VALID_EVENT_TYPES = new Set([
  "portfolio_session",
  "case_study_view",
  "dod_unlock",
]);

function createEmptyStats() {
  return {
    portfolioSessions: 0,
    caseStudyViews: {},
    dodUnlocks: 0,
    recentEvents: [],
    updatedAt: new Date().toISOString(),
  };
}

function sanitizeProjectId(projectId) {
  if (typeof projectId !== "string") return "";
  return projectId.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 64);
}

function applyEvent(stats, event) {
  const next = {
    portfolioSessions: stats.portfolioSessions,
    caseStudyViews: { ...stats.caseStudyViews },
    dodUnlocks: stats.dodUnlocks,
    recentEvents: [...stats.recentEvents],
    updatedAt: new Date().toISOString(),
  };

  if (event.type === "portfolio_session") {
    next.portfolioSessions += 1;
  }

  if (event.type === "case_study_view") {
    const projectId = sanitizeProjectId(event.projectId);
    if (projectId) {
      next.caseStudyViews[projectId] =
        (next.caseStudyViews[projectId] || 0) + 1;
    }
  }

  if (event.type === "dod_unlock") {
    next.dodUnlocks += 1;
  }

  next.recentEvents.unshift({
    type: event.type,
    projectId: event.projectId
      ? sanitizeProjectId(event.projectId) || undefined
      : undefined,
    at: next.updatedAt,
  });

  if (next.recentEvents.length > MAX_RECENT_EVENTS) {
    next.recentEvents = next.recentEvents.slice(0, MAX_RECENT_EVENTS);
  }

  return next;
}

function readLocalStats() {
  try {
    if (!fs.existsSync(LOCAL_DATA_FILE)) {
      return createEmptyStats();
    }

    const raw = fs.readFileSync(LOCAL_DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      ...createEmptyStats(),
      ...parsed,
      caseStudyViews: parsed.caseStudyViews || {},
      recentEvents: parsed.recentEvents || [],
    };
  } catch {
    return createEmptyStats();
  }
}

function writeLocalStats(stats) {
  fs.mkdirSync(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(stats, null, 2), "utf8");
}

async function readBlobStats() {
  const { head, get } = await import("@vercel/blob");

  try {
    const meta = await head(BLOB_PATHNAME);
    const response = await fetch(meta.url);

    if (!response.ok) {
      return createEmptyStats();
    }

    const parsed = await response.json();
    return {
      ...createEmptyStats(),
      ...parsed,
      caseStudyViews: parsed.caseStudyViews || {},
      recentEvents: parsed.recentEvents || [],
    };
  } catch (error) {
    if (error && typeof error === "object" && error.statusCode === 404) {
      return createEmptyStats();
    }

    throw error;
  }
}

async function writeBlobStats(stats) {
  const { put } = await import("@vercel/blob");

  await put(BLOB_PATHNAME, JSON.stringify(stats), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function useBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

function isStorageConfigured() {
  if (useBlobStorage()) {
    return true;
  }

  return !isVercelRuntime();
}

async function readStats() {
  if (useBlobStorage()) {
    return readBlobStats();
  }

  if (isVercelRuntime()) {
    return createEmptyStats();
  }

  return readLocalStats();
}

async function recordEvent(event) {
  if (!VALID_EVENT_TYPES.has(event.type)) {
    throw new Error("Invalid analytics event type");
  }

  if (event.type === "case_study_view" && !sanitizeProjectId(event.projectId)) {
    throw new Error("Invalid project id");
  }

  if (!isStorageConfigured()) {
    const error = new Error(
      "Analytics storage is not configured. Link a Vercel Blob store to this project.",
    );
    error.code = "STORAGE_NOT_CONFIGURED";
    throw error;
  }

  const current = await readStats();
  const next = applyEvent(current, event);

  if (useBlobStorage()) {
    await writeBlobStats(next);
  } else {
    writeLocalStats(next);
  }

  return next;
}

module.exports = {
  BLOB_PATHNAME,
  LOCAL_DATA_FILE,
  createEmptyStats,
  isStorageConfigured,
  readStats,
  recordEvent,
  sanitizeProjectId,
  VALID_EVENT_TYPES,
};
