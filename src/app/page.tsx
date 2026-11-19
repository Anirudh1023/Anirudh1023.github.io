"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAM, FAM_HEAD } from "@/lib/knockout-tokens";
import { siteContent, ResearchProject, ResearchThread } from "@/content/site";

// ─── Filter Categories ────────────────────────────────────────────────────────
type FilterCategory = "all" | "adaptation-systems" | "optimization" | "representations" | "open-source" | "ongoing";

const FILTERS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "adaptation-systems", label: "Adaptation & Systems" },
  { id: "optimization", label: "Optimization" },
  { id: "representations", label: "Representations" },
  { id: "open-source", label: "Open Source" },
  { id: "ongoing", label: "Ongoing" },
];

const matchesFilter = (project: ResearchProject, filter: FilterCategory) => {
  if (filter === "all") return true;
  if (filter === "adaptation-systems")
    return project.category === "adaptation" || project.category === "systems";
  if (filter === "optimization") return project.category === "optimization";
  if (filter === "representations") return project.category === "representations";
  if (filter === "open-source") return project.category === "open-source";
  if (filter === "ongoing")
    return project.category === "ongoing" || project.status?.toLowerCase().includes("ongoing");
  return false;
};

type MainTab = "threads" | "contributions" | "publications" | "experience";

export default function Home() {
  const { identity, projects, publications, experience, researchThreads } = siteContent;
  const [activeTab, setActiveTab] = useState<MainTab>("threads");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);

  // Filter projects according to selected filter
  const filteredProjects = projects.filter((p) => matchesFilter(p, activeFilter));

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: FAM,
      }}
    >
      {/* ── TWO-COLUMN GRID ── */}
      <div
        className="qlabs-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: 40,
          columnGap: 88,
          minHeight: "100vh",
        }}
      >
        {/* ── LEFT: IDENTITY (Sticky on Desktop) ── */}
        <aside
          className="qlabs-identity"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            position: "sticky",
            top: 52,
            alignSelf: "start",
            paddingBottom: 40,
          }}
        >
          {/* IDENTITY HEADER WITH MONOCHROME PIXEL PORTRAIT */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid var(--line)",
                background: "#000000",
                flexShrink: 0,
              }}
            >
              <img
                src="/profile-pixel.png"
                alt="Anirudh Bocha"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                  display: "block",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  fontFamily: FAM_HEAD,
                  fontWeight: 700,
                  fontSize: "clamp(30px, 4.5vw, 44px)",
                  lineHeight: 1.05,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {identity.name}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontFamily: FAM,
                }}
              >
                {identity.affiliation}
              </p>
            </div>
          </div>

          {/* STATEMENT */}
          <div style={{ maxWidth: 440, display: "flex", flexDirection: "column", gap: 16 }}>
            {identity.heroParagraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--text)",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* MODULAR VIEW SELECTOR (Zero-scroll navigation) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              paddingTop: 8,
              borderTop: "1px solid var(--line)",
              maxWidth: 440,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 4,
              }}
            >
              Navigation
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px" }}>
              <button
                onClick={() => setActiveTab("threads")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: FAM,
                  fontSize: 14,
                  fontWeight: activeTab === "threads" ? 600 : 400,
                  color: activeTab === "threads" ? "var(--text)" : "var(--muted)",
                  borderBottom: activeTab === "threads" ? "2px solid var(--text)" : "2px solid transparent",
                  paddingBottom: 2,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                Research Threads ({researchThreads.length})
              </button>
              <button
                onClick={() => setActiveTab("contributions")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: FAM,
                  fontSize: 14,
                  fontWeight: activeTab === "contributions" ? 600 : 400,
                  color: activeTab === "contributions" ? "var(--text)" : "var(--muted)",
                  borderBottom: activeTab === "contributions" ? "2px solid var(--text)" : "2px solid transparent",
                  paddingBottom: 2,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                All Contributions ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("publications")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: FAM,
                  fontSize: 14,
                  fontWeight: activeTab === "publications" ? 600 : 400,
                  color: activeTab === "publications" ? "var(--text)" : "var(--muted)",
                  borderBottom: activeTab === "publications" ? "2px solid var(--text)" : "2px solid transparent",
                  paddingBottom: 2,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                Publications ({publications.length})
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: FAM,
                  fontSize: 14,
                  fontWeight: activeTab === "experience" ? 600 : 400,
                  color: activeTab === "experience" ? "var(--text)" : "var(--muted)",
                  borderBottom: activeTab === "experience" ? "2px solid var(--text)" : "2px solid transparent",
                  paddingBottom: 2,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                Experience ({experience.length})
              </button>
            </div>
          </div>

          {/* REACH OUT */}
          <div style={{ marginTop: "auto", paddingTop: 16 }}>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--text)",
                lineHeight: 1.8,
              }}
            >
              <span style={{ color: "var(--muted)" }}>reach out: </span>
              <a href={identity.links.email} style={{ color: "inherit" }}>
                Email
              </a>
              {" · "}
              <a href={identity.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {" · "}
              <a href={identity.links.scholar} target="_blank" rel="noopener noreferrer">
                Scholar
              </a>
              {" · "}
              <a href={identity.links.cv} target="_blank" rel="noopener noreferrer">
                CV
              </a>
              {" · "}
              <a href={identity.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </aside>

        {/* ── RIGHT: TRAJECTORY & SECTIONS ── */}
        <section
          className="qlabs-content-pane"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            minWidth: 0,
          }}
        >
          {/* ════ TAB 0: RESEARCH THREADS ════ */}
          {activeTab === "threads" && (
            <div id="threads" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      lineHeight: 1.5,
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontFamily: FAM,
                    }}
                  >
                    Research Threads
                  </h2>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: 13.5,
                      color: "var(--muted)",
                    }}
                  >
                    Sustained intellectual questions connecting multiple papers, methods, and execution systems.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("contributions")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: 12.5,
                    fontFamily: FAM,
                    color: "var(--text)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    cursor: "pointer",
                  }}
                >
                  View All {projects.length} Contributions →
                </button>
              </div>

              {/* Research Threads List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {researchThreads.map((thread) => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
              </div>
            </div>
          )}

          {/* ════ TAB 1: ALL CONTRIBUTIONS ════ */}
          {activeTab === "contributions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Header with Topic Filters */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      lineHeight: 1.5,
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontFamily: FAM,
                    }}
                  >
                    All Contributions Index
                  </h2>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    {filteredProjects.length} contributions
                  </span>
                </div>

                {/* Filter Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px 12px",
                    alignItems: "center",
                  }}
                >
                  {FILTERS.map((f) => {
                    const isSelected = activeFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          fontSize: 12,
                          fontFamily: FAM,
                          color: isSelected ? "var(--text)" : "var(--muted)",
                          fontWeight: isSelected ? 600 : 400,
                          cursor: "pointer",
                          textDecoration: isSelected ? "underline" : "none",
                          textUnderlineOffset: 3,
                          transition: "color 0.15s ease",
                        }}
                        onMouseOver={(e) => {
                          if (!isSelected) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                        }}
                        onMouseOut={(e) => {
                          if (!isSelected) (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                        }}
                      >
                        {f.label} ({projects.filter((p) => matchesFilter(p, f.id)).length})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Research Projects List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {filteredProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          )}

          {/* ════ TAB 2: PUBLICATIONS ════ */}
          {activeTab === "publications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    lineHeight: 1.5,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontFamily: FAM,
                  }}
                >
                  Peer-Reviewed Publications &amp; Presentations
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {publications.map((pub, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {pub.venue} · {pub.status}
                    </div>
                    <Link
                      href={`/projects/${pub.projectId}`}
                      style={{
                        fontFamily: FAM_HEAD,
                        fontSize: 19,
                        fontWeight: 700,
                        color: "var(--text)",
                        textDecoration: "underline",
                        textDecorationColor: "var(--line)",
                        textUnderlineOffset: 4,
                        lineHeight: 1.3,
                      }}
                    >
                      {pub.title}
                    </Link>
                    <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 4 }}>
                      {pub.link && pub.link !== "#" && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 13, textDecoration: "underline", textUnderlineOffset: 3 }}
                        >
                          {pub.projectId === "speech-reps"
                            ? "DOI ↗"
                            : pub.projectId === "waveform-wizard"
                            ? "Project / Software ↗"
                            : "Artifact ↗"}
                        </a>
                      )}
                      <Link
                        href={`/projects/${pub.projectId}`}
                        style={{ fontSize: 13, textDecoration: "underline", textUnderlineOffset: 3 }}
                      >
                        Technical record ↗
                      </Link>
                      {pub.bibtex && (
                        <button
                          onClick={() => handleCopyBibtex(pub.projectId, pub.bibtex)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            fontFamily: FAM,
                            fontSize: 13,
                            color: copiedBibtexId === pub.projectId ? "var(--text)" : "var(--muted)",
                            cursor: "pointer",
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                          }}
                        >
                          {copiedBibtexId === pub.projectId ? "Copied BibTeX ✓" : "BibTeX ↗"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ TAB 3: EXPERIENCE ════ */}
          {activeTab === "experience" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    lineHeight: 1.5,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontFamily: FAM,
                  }}
                >
                  Research &amp; Engineering Experience
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      position: "relative",
                      paddingLeft: "1.1em",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0.1em",
                        top: "0.72em",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--muted)",
                        display: "inline-block",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 500, color: "var(--text)" }}>
                        {exp.org}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                        {exp.dates}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
                      {exp.role}
                    </div>
                    <p style={{ margin: "4px 0 0 0", fontSize: 14.5, color: "var(--text)", lineHeight: 1.55 }}>
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 1009px) {
          .qlabs-grid {
            grid-template-columns: 1fr !important;
            row-gap: 48px !important;
          }
          .qlabs-identity {
            position: relative !important;
            top: 0 !important;
            border-bottom: 1px solid var(--line);
            padding-bottom: 32px;
          }
        }
      `}</style>
    </main>
  );
}

// ─── Research Thread Card Component ───────────────────────────────────────────
function ThreadCard({ thread }: { thread: ResearchThread }) {
  const linked = (thread.linkedContributionIds || [])
    .map((pid) => siteContent.projects.find((p) => p.id === pid))
    .filter(Boolean) as ResearchProject[];

  return (
    <article
      style={{
        padding: "24px 26px",
        borderRadius: 10,
        border: "1px solid var(--line)",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "border-color 0.15s ease",
      }}
      onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--text)")}
      onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--line)")}
    >
      {/* Title & Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Link
          href={`/research/${thread.id}`}
          style={{
            fontFamily: FAM_HEAD,
            fontWeight: 700,
            fontSize: "clamp(18px, 2.4vw, 21px)",
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
          onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
          onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
        >
          {thread.title} ↗
        </Link>
        {thread.status && (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: 4,
              background: "#000000",
              color: "#ffffff",
            }}
          >
            {thread.status}
          </span>
        )}
      </div>

      {/* Central Question */}
      <p
        style={{
          margin: 0,
          fontSize: 15,
          fontStyle: "italic",
          lineHeight: 1.5,
          color: "var(--muted)",
        }}
      >
        &ldquo;{thread.question}&rdquo;
      </p>

      {/* Short Homepage Description */}
      <p
        style={{
          margin: 0,
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "var(--text)",
        }}
      >
        {thread.homepageDesc}
      </p>

      {/* Linked Contributions */}
      <div
        style={{
          paddingTop: 10,
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          fontSize: 13,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px" }}>
          <span style={{ color: "var(--muted)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Contributions:
          </span>
          {linked.map((p, idx) => (
            <React.Fragment key={p.id}>
              {idx > 0 && <span style={{ color: "var(--line)" }}>·</span>}
              <Link
                href={`/projects/${p.id}`}
                style={{
                  color: "var(--text)",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textDecorationColor: "var(--line)",
                  textUnderlineOffset: 3,
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.textDecorationColor = "var(--text)")}
                onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.textDecorationColor = "var(--line)")}
              >
                {p.title.split(":")[0]}
              </Link>
            </React.Fragment>
          ))}
        </div>

        <Link
          href={`/research/${thread.id}`}
          style={{
            color: "var(--text)",
            fontWeight: 500,
            fontSize: 13,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            whiteSpace: "nowrap",
          }}
        >
          Explore thread ↗
        </Link>
      </div>
    </article>
  );
}

// ─── Research Project Item Component ──────────────────────────────────────────
function ProjectCard({ project }: { project: ResearchProject }) {
  const metaStr = `${project.year} · ${project.tags.join(" · ")}`;

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        paddingBottom: 24,
        borderBottom: "1px solid rgba(212, 212, 212, 0.5)",
      }}
    >
      {/* Date & Topics Meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>{metaStr}</span>
        {project.statusDetail && (
          <span style={{ color: project.status ? "var(--text)" : "var(--muted)" }}>
            {project.statusDetail}
          </span>
        )}
      </div>

      {/* Claim Title */}
      <h3 style={{ margin: 0, lineHeight: 1.3 }}>
        <Link
          href={`/projects/${project.id}`}
          style={{
            fontFamily: FAM_HEAD,
            fontSize: "clamp(18px, 2.5vw, 21px)",
            fontWeight: 700,
            color: "var(--text)",
            textDecoration: "underline",
            textDecorationColor: "var(--line)",
            textUnderlineOffset: 4,
            textDecorationThickness: 1,
            transition: "text-decoration-color 0.15s, color 0.15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.textDecorationColor = "currentColor";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "var(--text)";
            e.currentTarget.style.textDecorationColor = "var(--line)";
          }}
        >
          {project.title}
        </Link>
      </h3>

      {/* 1-sentence technical hypothesis or finding */}
      <p
        style={{
          margin: "4px 0 6px 0",
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--muted)",
          fontFamily: FAM,
          maxWidth: 640,
        }}
      >
        {project.claim}
      </p>

      {/* Direct Artifact Links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", alignItems: "center" }}>
        {project.artifacts.map((a, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            {a.isExternal ? (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
                  color: "var(--text)",
                  textDecoration: "underline",
                  textDecorationColor: "var(--line)",
                  textUnderlineOffset: 3,
                  fontWeight: 500,
                }}
              >
                {a.label} ↗
              </a>
            ) : (
              <Link
                href={a.url}
                style={{
                  fontSize: 13,
                  color: "var(--text)",
                  textDecoration: "underline",
                  textDecorationColor: "var(--line)",
                  textUnderlineOffset: 3,
                  fontWeight: 500,
                }}
              >
                {a.label} ↗
              </Link>
            )}
          </span>
        ))}
        {project.primaryThreadId && (
          <Link
            href={`/research/${project.primaryThreadId}`}
            style={{
              fontSize: 12.5,
              color: "var(--muted)",
              textDecoration: "underline",
              textDecorationColor: "var(--line)",
              textUnderlineOffset: 3,
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            Part of thread ↗
          </Link>
        )}
      </div>
    </article>
  );
}
