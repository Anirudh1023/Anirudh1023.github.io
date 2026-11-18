"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent, ResearchThread, ResearchProject, SubDirection } from "@/content/site";
import { FAM, FAM_HEAD } from "@/lib/knockout-tokens";

const THREAD_ALIASES: Record<string, string> = {
  "beyond-backprop": "beyond-backpropagation",
  "speech": "speech-representations",
  "collaborative": "collaborative-inference",
  "heterogeneous": "heterogeneous-execution",
  "multimodal": "active-multimodal-reasoning",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ThreadPageClient({ id }: { id: string }) {
  const resolvedId = THREAD_ALIASES[id] || id;
  const thread = siteContent.researchThreads.find((t) => t.id === resolvedId);

  if (!thread) {
    return (
      <main style={{ padding: "52px clamp(24px, 8vw, 112px)", fontFamily: FAM }}>
        <p style={{ color: "var(--muted)" }}>Research thread not found.</p>
        <Link href="/" style={{ fontSize: 15, textDecoration: "underline" }}>
          ← Back to home
        </Link>
      </main>
    );
  }

  return <ThreadContent thread={thread} />;
}

function ThreadContent({ thread }: { thread: ResearchThread }) {
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Gather linked projects
  const linkedProjects: ResearchProject[] = (thread.linkedContributionIds || [])
    .map((pid) => siteContent.projects.find((p) => p.id === pid))
    .filter(Boolean) as ResearchProject[];

  const establishedProjects = linkedProjects.filter((p) =>
    (thread.establishedContributionIds || []).includes(p.id)
  );

  const ongoingProjects = linkedProjects.filter((p) =>
    (thread.ongoingContributionIds || []).includes(p.id)
  );

  const relatedThreads = (thread.relatedThreadIds || [])
    .map((tid) => siteContent.researchThreads.find((t) => t.id === tid))
    .filter(Boolean) as ResearchThread[];

  // Construct TOC entries
  const tocItems: { id: string; label: string }[] = [
    { id: "overview", label: "Overview" },
  ];

  if (thread.subDirections && thread.subDirections.length > 0) {
    thread.subDirections.forEach((sub) => {
      tocItems.push({
        id: `direction-${sub.letter.toLowerCase()}`,
        label: `Area ${sub.letter}: ${sub.title}`,
      });
    });
  }

  if (establishedProjects.length > 0) {
    tocItems.push({ id: "established-contributions", label: "Established Contributions" });
  }

  if (ongoingProjects.length > 0 || thread.id === "beyond-backpropagation") {
    tocItems.push({ id: "ongoing-explorations", label: "Ongoing & Explorations" });
  }

  tocItems.push({ id: "synthesis", label: "Synthesis" });
  tocItems.push({ id: "open-questions", label: "Open Questions" });

  if (relatedThreads.length > 0) {
    tocItems.push({ id: "related-threads", label: "Related Threads" });
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = tocItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(tocItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(tocItems[i].id);
          return;
        }
      }
      setActiveSection("overview");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: FAM,
      }}
    >
      {/* ── TOP HEADER / BREADCRUMBS ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--line)",
          padding: "16px clamp(24px, 6vw, 88px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href="/"
            style={{
              fontFamily: FAM,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            Anirudh Bocha
          </Link>
          <span style={{ color: "var(--line)", fontSize: 13 }}>/</span>
          <Link
            href="/#threads"
            style={{
              fontFamily: FAM,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            Research Threads
          </Link>
          <span style={{ color: "var(--line)", fontSize: 13 }}>/</span>
          <span
            style={{
              fontFamily: FAM,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            {thread.shortTitle}
          </span>
        </div>

        <div>
          <Link
            href="/"
            style={{
              fontSize: 14,
              color: "var(--muted)",
              textDecoration: "none",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div
        className="qlabs-article-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "220px minmax(0, 720px)",
          columnGap: "clamp(48px, 6vw, 96px)",
          padding: "52px clamp(24px, 6vw, 88px) 120px",
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        {/* ── Left Sticky Outline (TOC) ── */}
        <aside
          className="qlabs-outline"
          style={{
            position: "sticky",
            top: 96,
            alignSelf: "start",
            fontSize: 13,
            lineHeight: 1.45,
            fontFamily: FAM,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 16,
            }}
          >
            Thread Outline
          </div>

          <nav style={{ display: "flex", flexDirection: "column" }}>
            {tocItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    padding: "6px 0 6px 12px",
                    borderLeft: isActive ? "2px solid var(--text)" : "2px solid var(--line)",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* ── Right Content ── */}
        <main id="overview" style={{ minWidth: 0 }}>
          {/* Eyebrow & Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: 8,
              margin: "0 0 16px 0",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: FAM,
            }}
          >
            <span>RESEARCH THREAD · {thread.timeframe}</span>
            {thread.status && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  padding: "3px 8px",
                  borderRadius: 4,
                  background: "#000000",
                  color: "#ffffff",
                }}
              >
                {thread.status}
              </span>
            )}
          </div>

          {/* Thread Title */}
          <h1
            style={{
              fontFamily: FAM_HEAD,
              fontWeight: 700,
              fontSize: "clamp(30px, 5vw, 42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: "0 0 28px 0",
            }}
          >
            {thread.title}
          </h1>

          {/* ── CENTRAL RESEARCH QUESTION CALLOUT BANNER ── */}
          <section
            style={{
              margin: "0 0 36px 0",
              padding: "24px 28px",
              borderRadius: 10,
              background: "#fafafa",
              border: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: FAM,
              }}
            >
              Central Research Question
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(18px, 2.4vw, 22px)",
                fontFamily: FAM_HEAD,
                fontWeight: 700,
                lineHeight: 1.35,
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;{thread.question}&rdquo;
            </p>
          </section>

          {/* Overview text */}
          <div style={{ marginBottom: 48 }}>
            {thread.overview.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--text)",
                  margin: "0 0 20px 0",
                  fontFamily: FAM,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* ── SUB-DIRECTIONS (Detailed Deep Dive for Beyond Backprop) ── */}
          {thread.subDirections && thread.subDirections.length > 0 && (
            <div style={{ margin: "48px 0" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 24,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                  fontFamily: FAM,
                }}
              >
                Core Questions & Sub-Directions
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
                {thread.subDirections.map((sub: SubDirection) => (
                  <section
                    key={sub.letter}
                    id={`direction-${sub.letter.toLowerCase()}`}
                    style={{ scrollMarginTop: 120 }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: 6,
                        fontFamily: FAM,
                      }}
                    >
                      Question {sub.letter}
                    </div>

                    <h2
                      style={{
                        fontFamily: FAM_HEAD,
                        fontWeight: 700,
                        fontSize: "clamp(22px, 3.5vw, 26px)",
                        lineHeight: 1.25,
                        color: "var(--text)",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {sub.title}
                    </h2>

                    <div
                      style={{
                        fontStyle: "italic",
                        fontSize: 16,
                        color: "var(--muted)",
                        marginBottom: 16,
                        lineHeight: 1.5,
                      }}
                    >
                      &ldquo;{sub.question}&rdquo;
                    </div>

                    <p
                      style={{
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--text)",
                        margin: "0 0 20px 0",
                      }}
                    >
                      {sub.description}
                    </p>

                    {/* Linked established projects */}
                    {sub.establishedContributionIds && sub.establishedContributionIds.length > 0 && (
                      <div style={{ marginTop: 16, marginBottom: 20 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            marginBottom: 10,
                          }}
                        >
                          Established Contribution:
                        </div>
                        {sub.establishedContributionIds.map((pid) => {
                          const p = siteContent.projects.find((proj) => proj.id === pid);
                          if (!p) return null;
                          return <ProjectMiniCard key={p.id} project={p} />;
                        })}
                      </div>
                    )}

                    {/* Linked ongoing projects */}
                    {sub.ongoingContributionIds && sub.ongoingContributionIds.length > 0 && (
                      <div style={{ marginTop: 16, marginBottom: 20 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            marginBottom: 10,
                          }}
                        >
                          Ongoing Exploration:
                        </div>
                        {sub.ongoingContributionIds.map((pid) => {
                          const p = siteContent.projects.find((proj) => proj.id === pid);
                          if (!p) return null;
                          return <ProjectMiniCard key={p.id} project={p} isOngoing />;
                        })}
                      </div>
                    )}

                    {/* Exploratory reproduction item (e.g. DUST with explicit credit) */}
                    {sub.exploratoryItem && (
                      <div
                        style={{
                          margin: "20px 0",
                          padding: "18px 20px",
                          borderRadius: 8,
                          background: "#fafafa",
                          border: "1px solid var(--line)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            flexWrap: "wrap",
                            gap: 8,
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: FAM_HEAD,
                              fontWeight: 700,
                              fontSize: 16,
                              color: "var(--text)",
                            }}
                          >
                            {sub.exploratoryItem.title}
                          </span>
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              padding: "2px 7px",
                              borderRadius: 4,
                              background: "var(--line)",
                              color: "var(--text)",
                            }}
                          >
                            {sub.exploratoryItem.status}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 14.5,
                            lineHeight: 1.6,
                            color: "var(--text)",
                            margin: "0 0 10px 0",
                          }}
                        >
                          {sub.exploratoryItem.description}
                        </p>
                        {sub.exploratoryItem.attribution && (
                          <div
                            style={{
                              fontSize: 12.5,
                              color: "var(--muted)",
                              borderTop: "1px solid var(--line)",
                              paddingTop: 8,
                              marginTop: 8,
                            }}
                          >
                            <strong>Attribution: </strong>
                            {sub.exploratoryItem.attribution}{" "}
                            {sub.exploratoryItem.externalUrl && (
                              <a
                                href={sub.exploratoryItem.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "underline",
                                  textUnderlineOffset: 3,
                                  color: "var(--text)",
                                }}
                              >
                                {sub.exploratoryItem.externalUrl.replace("https://", "")} ↗
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Sub-direction open questions */}
                    {sub.openQuestions && sub.openQuestions.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            marginBottom: 8,
                          }}
                        >
                          Open Questions for this Area:
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 20,
                            fontSize: 14.5,
                            lineHeight: 1.65,
                            color: "var(--text)",
                          }}
                        >
                          {sub.openQuestions.map((q, qi) => (
                            <li key={qi} style={{ marginBottom: 6 }}>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          )}

          {/* ── ESTABLISHED CONTRIBUTIONS ── */}
          {establishedProjects.length > 0 && (
            <section id="established-contributions" style={{ margin: "52px 0", scrollMarginTop: 120 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 20,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                  fontFamily: FAM,
                }}
              >
                Established Contributions ({establishedProjects.length})
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {establishedProjects.map((p) => (
                  <ProjectCardFull key={p.id} project={p} />
                ))}
              </div>
            </section>
          )}

          {/* ── ONGOING & EXPLORATORY WORK ── */}
          {(ongoingProjects.length > 0 || thread.id === "beyond-backpropagation") && (
            <section id="ongoing-explorations" style={{ margin: "52px 0", scrollMarginTop: 120 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 20,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                  fontFamily: FAM,
                }}
              >
                Ongoing & Exploratory Investigations
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {ongoingProjects.map((p) => (
                  <ProjectCardFull key={p.id} project={p} isOngoing />
                ))}

                {thread.id === "beyond-backpropagation" && (
                  <div
                    style={{
                      padding: "20px 24px",
                      borderRadius: 10,
                      border: "1px solid var(--line)",
                      background: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FAM_HEAD,
                          fontWeight: 700,
                          fontSize: 17,
                          color: "var(--text)",
                        }}
                      >
                        Activation-Space Zeroth-Order Pretraining (DUST-inspired)
                      </span>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "2px 7px",
                          borderRadius: 4,
                          background: "#f0f0f0",
                          color: "var(--text)",
                        }}
                      >
                        Exploratory reproduction
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: "var(--text)",
                      }}
                    >
                      Exploratory reproduction investigating token-level loss signals and parallel virtual population evaluations inside forward execution. External algorithm proposed by Akshay Vegesna & Samip Dahal (QLabs).
                    </p>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>
                      <span>Attribution: </span>
                      <a
                        href="https://qlabs.sh/research/dust/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "underline", color: "var(--text)" }}
                      >
                        QLabs Research (qlabs.sh/research/dust) ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── SYNTHESIS ── */}
          <section id="synthesis" style={{ margin: "52px 0", scrollMarginTop: 120 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 20,
                paddingBottom: 8,
                borderBottom: "1px solid var(--line)",
                fontFamily: FAM,
              }}
            >
              Synthesis & Collective Findings
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {thread.synthesis.map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* ── OPEN QUESTIONS ── */}
          <section id="open-questions" style={{ margin: "52px 0", scrollMarginTop: 120 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 20,
                paddingBottom: 8,
                borderBottom: "1px solid var(--line)",
                fontFamily: FAM,
              }}
            >
              Open Questions & Next Horizons
            </div>

            <ol
              style={{
                margin: 0,
                paddingLeft: 24,
                fontSize: 16,
                lineHeight: 1.75,
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {thread.openQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </section>

          {/* ── RELATED THREADS ── */}
          {relatedThreads.length > 0 && (
            <section id="related-threads" style={{ margin: "52px 0", scrollMarginTop: 120 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 20,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                  fontFamily: FAM,
                }}
              >
                Connected Research Threads
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {relatedThreads.map((rt) => (
                  <Link
                    key={rt.id}
                    href={`/research/${rt.id}`}
                    style={{
                      display: "block",
                      padding: "18px 20px",
                      borderRadius: 8,
                      border: "1px solid var(--line)",
                      background: "#fafafa",
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--text)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FAM_HEAD,
                        fontWeight: 700,
                        fontSize: 16,
                        color: "var(--text)",
                        marginBottom: 6,
                      }}
                    >
                      {rt.title} ↗
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "var(--muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {rt.homepageDesc}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── FOOTER NAVIGATION ── */}
          <div
            style={{
              marginTop: 64,
              paddingTop: 24,
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              ← Back to Research Overview
            </Link>

            <Link
              href="#overview"
              style={{
                fontSize: 13,
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              Top ↑
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

// ── COMPACT MINI CARD FOR SUB-DIRECTIONS ───────────────────────────────────────
function ProjectMiniCard({ project, isOngoing }: { project: ResearchProject; isOngoing?: boolean }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      style={{
        display: "block",
        padding: "14px 18px",
        borderRadius: 8,
        border: "1px solid var(--line)",
        background: "#ffffff",
        textDecoration: "none",
        transition: "all 0.15s ease",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--text)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontFamily: FAM_HEAD,
            fontWeight: 700,
            fontSize: 15.5,
            color: "var(--text)",
          }}
        >
          {project.title} ↗
        </span>
        {project.status && (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: 4,
              background: isOngoing ? "#f0f0f0" : "var(--text)",
              color: isOngoing ? "var(--text)" : "#ffffff",
            }}
          >
            {project.status}
          </span>
        )}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          color: "var(--muted)",
          lineHeight: 1.5,
        }}
      >
        {project.claim}
      </p>
    </Link>
  );
}

// ── FULL PROJECT CARD FOR ESTABLISHED/ONGOING LISTS ───────────────────────────
function ProjectCardFull({ project, isOngoing }: { project: ResearchProject; isOngoing?: boolean }) {
  return (
    <div
      style={{
        padding: "22px 24px",
        borderRadius: 10,
        border: "1px solid var(--line)",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 10,
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
        <Link
          href={`/projects/${project.id}`}
          style={{
            fontFamily: FAM_HEAD,
            fontWeight: 700,
            fontSize: 18,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
          onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
          onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
        >
          {project.title} ↗
        </Link>
        {project.status && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "2px 8px",
              borderRadius: 4,
              background: isOngoing ? "#f0f0f0" : "#000000",
              color: isOngoing ? "var(--text)" : "#ffffff",
            }}
          >
            {project.status}
          </span>
        )}
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--text)",
        }}
      >
        {project.claim}
      </p>

      {project.metricsHighlight && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text)",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {project.metricsHighlight}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          paddingTop: 10,
          borderTop: "1px solid var(--line)",
          fontSize: 13,
        }}
      >
        <span style={{ color: "var(--muted)" }}>
          {project.year} · {project.tags.join(" · ")}
        </span>

        <div style={{ display: "flex", gap: 14 }}>
          <Link
            href={`/projects/${project.id}`}
            style={{
              color: "var(--text)",
              fontWeight: 500,
              textDecoration: "underline",
              textDecorationColor: "var(--line)",
              textUnderlineOffset: 3,
            }}
          >
            Read technical record ↗
          </Link>
          {project.artifacts &&
            project.artifacts
              .filter((a) => a.url !== `/projects/${project.id}`)
              .map((art, i) => (
                <a
                  key={i}
                  href={art.url}
                  target={art.url.startsWith("/") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--muted)",
                    textDecoration: "underline",
                    textDecorationColor: "var(--line)",
                    textUnderlineOffset: 3,
                  }}
                  onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                >
                  {art.label} ↗
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}
