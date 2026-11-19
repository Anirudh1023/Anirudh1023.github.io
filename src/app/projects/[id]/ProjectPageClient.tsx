"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent, ResearchProject } from "@/content/site";
import katex from "katex";
import { FAM, FAM_HEAD } from "@/lib/knockout-tokens";
import { ProjectFigure } from "@/components/research/ArticleModal/ResearchArticleModal";

// ── Aliases map ──────────────────────────────────────────────────────────────
const ALIASES: Record<string, string> = {
  "whispered-speech": "wesper",
  "speech-disfluency": "speech-reps",
  "cpu-npu-training": "cpu-npu",
  "zo": "subspace-zo",
  "hybrid": "hybrid-llm-inference",
  "waveform": "waveform-wizard",
  "nfuse": "n-fuse",
};

// ── Distill Technical Terms Registry ──────────────────────────────────────────
const DISTILL_TERMS: Record<string, string> = {
  "Rademacher perturbation": "Perturbing weights with random signs (+1 or -1) to enable bit-level sign arithmetic instead of floating-point random generation.",
  "low-rank subspace": "Constraining weight updates to an r-dimensional basis (r ≪ d) to keep activation data within hardware dispatch bounds.",
  "VTCM": "Vector Tightly-Coupled Memory — ultra-low-latency on-chip scratchpad memory on Qualcomm Hexagon DSPs.",
  "FastRPC": "Qualcomm's Remote Procedure Call mechanism for coordinating host CPU and Hexagon DSP data transfers.",
  "EMA": "Exponential Moving Average — tracks running statistics smoothly over training iterations.",
  "LiteRT": "Google's lightweight runtime (formerly TFLite) for high-performance ML inference on edge accelerators.",
  "Q4_0": "Blockwise 4-bit weight quantization format used for memory-constrained on-device execution.",
  "LoRA": "Low-Rank Adaptation: freezes pretrained model weights and injects trainable rank-decomposition matrices.",
  "QAT": "Quantization-Aware Training: models low-precision rounding during forward/backward passes to prevent deployment drift.",
  "checkpointing": "Discarding intermediate activations during forward propagation and recomputing them on-demand during the backward pass.",
  "selective recomputation": "Strategically re-evaluating memory-heavy operators during the backward pass to reduce peak resident memory.",
  "cross-vocabulary": "Mapping token representations across models with distinct tokenizer vocabularies.",
  "speculative decoding": "Drafting multiple candidate tokens with a smaller model and verifying them in a single batched pass with a larger target model.",
  "block power iteration": "A batched iterative matrix algorithm for subspace refresh that runs efficiently on hardware matrix units.",
  "DMA": "Direct Memory Access — allows hardware accelerators to transfer tensor data without CPU intervention."
};

// ── Distill Term Interactive Component ────────────────────────────────────────
function DistillTerm({ term, definition }: { term: string; definition: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          font: "inherit",
          color: "inherit",
          cursor: "help",
          borderBottom: "1px dotted var(--muted)",
          textDecoration: "none",
        }}
        aria-label={`${term}: ${definition}`}
      >
        {term}
      </button>

      {isOpen && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "max-content",
            maxWidth: 280,
            padding: "10px 14px",
            background: "#ffffff",
            border: "1px solid var(--line)",
            borderRadius: 8,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
            fontSize: 12.5,
            lineHeight: 1.5,
            color: "var(--text)",
            zIndex: 100,
            pointerEvents: "auto",
            fontFamily: FAM,
            fontWeight: 400,
            textAlign: "left",
            display: "block",
          }}
        >
          <strong style={{ display: "block", marginBottom: 3, fontWeight: 600 }}>{term}</strong>
          {definition}
        </span>
      )}
    </span>
  );
}

function renderTextWithDistillTerms(text: string): React.ReactNode[] {
  const keys = Object.keys(DISTILL_TERMS).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${keys.join("|")})\\b`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const key = keys.find((k) => k.toLowerCase() === part.toLowerCase());
    if (key) {
      return <DistillTerm key={i} term={part} definition={DISTILL_TERMS[key]} />;
    }
    return <span key={i}>{part}</span>;
  });
}

// ── Syntax highlighting & math ────────────────────────────────────────────────
function highlightSyntax(code: string) {
  if (!code) return null;
  return code.split("\n").map((line, i) => {
    const highlighted = line
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /\b(int|float|void|const|for|if|else|return|size_t|auto)\b/g,
        '<span style="color: #ff79c6">$1</span>'
      )
      .replace(/(\b\w+)(?=\()/g, '<span style="color: #50fa7b">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color: #8B949E">$1</span>');
    return (
      <span
        key={i}
        dangerouslySetInnerHTML={{ __html: highlighted || " " }}
        style={{ display: "block", minHeight: "1em" }}
      />
    );
  });
}

function parseMath(text: string) {
  try {
    const html = katex.renderToString(text, { throwOnError: false, displayMode: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <span>{text}</span>;
  }
}

function parseBold(text: string): React.ReactNode[] {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex)
      parts.push(...renderTextWithDistillTerms(text.substring(lastIndex, match.index)));
    parts.push(<strong key={`b-${match.index}`} style={{ fontWeight: 600 }}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length)
    parts.push(...renderTextWithDistillTerms(text.substring(lastIndex)));
  return parts;
}

function parseFormatting(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex)
      parts.push(...parseBold(text.substring(lastIndex, match.index)));
    const url = match[2];
    const isInternal = url.startsWith("/") || url.startsWith("#");
    parts.push(
      <a
        key={`l-${match.index}`}
        href={url}
        target={isInternal ? "_self" : "_blank"}
        rel="noopener noreferrer"
        style={{
          textDecoration: "underline",
          textDecorationColor: "var(--line)",
          textUnderlineOffset: 4,
          textDecorationThickness: 1,
        }}
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(...parseBold(text.substring(lastIndex)));
  return parts;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Project lookup ────────────────────────────────────────────────────────────
function findProject(id: string): ResearchProject | null {
  const resolvedId = ALIASES[id] || id;
  return siteContent.projects.find((p) => p.id === resolvedId) ?? null;
}

// ── Client page ───────────────────────────────────────────────────────────────
export default function ProjectPageClient({ id }: { id: string }) {
  const project = findProject(id);

  if (!project) {
    return (
      <main style={{ padding: "52px clamp(24px, 8vw, 112px)", fontFamily: FAM }}>
        <p style={{ color: "var(--muted)" }}>Project not found.</p>
        <Link href="/" style={{ fontSize: 15, textDecoration: "underline" }}>
          ← Back to research
        </Link>
      </main>
    );
  }

  return <ProjectContent project={project} />;
}

interface HeadingItem {
  num: number;
  title: string;
  id: string;
}

// ── Full project page — qlabs.sh research article style ───────────────────────
function ProjectContent({ project }: { project: ResearchProject }) {
  const article = project.article;
  const [activeSection, setActiveSection] = useState<string>("");
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  // Extract headings for table of contents
  const headings: HeadingItem[] = (article?.sections || [])
    .filter((sec: any) => sec.type === "heading" && sec.content)
    .map((sec: any, index: number) => ({
      num: index + 1,
      title: sec.content as string,
      id: slugify(sec.content),
    }));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(headings[i].id);
          return;
        }
      }
      if (headings.length > 0 && window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleCopyBibtex = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  if (!article) return null;

  let figureCounter = 1;

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: FAM,
        minHeight: "100vh",
      }}
    >
      {/* ── Top bar ── */}
      <header
        style={{
          padding: "24px clamp(24px, 6vw, 88px)",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--bg)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            Research
          </span>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                color: "var(--text)",
                textDecoration: "underline",
                textDecorationColor: "var(--line)",
                textUnderlineOffset: 3,
              }}
            >
              PDF ↗
            </a>
          )}
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                color: "var(--text)",
                textDecoration: "underline",
                textDecorationColor: "var(--line)",
                textUnderlineOffset: 3,
              }}
            >
              Source Code ↗
            </a>
          )}
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
            Close ✕
          </Link>
        </div>
      </header>

      {/* ── Main Two-Column Layout (qlabs research style) ── */}
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
        {/* ── Left Sticky Outline (Table of Contents) ── */}
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
            Contents
          </div>

          <nav style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="#overview"
              style={{
                padding: "6px 0 6px 12px",
                borderLeft: !activeSection ? "2px solid var(--text)" : "2px solid var(--line)",
                color: !activeSection ? "var(--text)" : "var(--muted)",
                fontWeight: !activeSection ? 500 : 400,
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              Overview
            </a>
            {headings.map((h) => {
              const isActive = activeSection === h.id;
              return (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  style={{
                    padding: "6px 0 6px 12px",
                    borderLeft: isActive ? "2px solid var(--text)" : "2px solid var(--line)",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: "none",
                    display: "flex",
                    gap: 6,
                    transition: "all 0.15s ease",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  }}
                >
                  <span style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                    {h.num}.
                  </span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {h.title}
                  </span>
                </a>
              );
            })}
            {project.bibtex && (
              <a
                href="#citation"
                style={{
                  padding: "6px 0 6px 12px",
                  borderLeft: activeSection === "citation" ? "2px solid var(--text)" : "2px solid var(--line)",
                  color: activeSection === "citation" ? "var(--text)" : "var(--muted)",
                  textDecoration: "none",
                }}
              >
                Citation
              </a>
            )}
          </nav>
        </aside>

        {/* ── Right: Article Content ── */}
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
            <span>{project.year} · {project.tags.join(" · ")}</span>
            {project.statusDetail && (
              <span style={{ color: project.status ? "var(--text)" : "var(--muted)" }}>
                {project.statusDetail}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: FAM_HEAD,
              fontWeight: 700,
              fontSize: "clamp(30px, 5vw, 42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: "0 0 20px 0",
            }}
          >
            {project.articleTitle || project.title}
          </h1>

          {/* Byline */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 24px",
              fontSize: 14,
              color: "var(--muted)",
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: "1px solid var(--line)",
            }}
          >
            <span>Anirudh Bocha</span>
            {Array.isArray(project.metadata) &&
              project.metadata.map((m: string, i: number) => <span key={i}>{m}</span>)}
          </div>

          {/* Part of Research Thread Banner */}
          {(() => {
            const primaryThread = siteContent.researchThreads.find((t) => t.id === project.primaryThreadId);
            if (!primaryThread) return null;
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 32,
                  fontSize: 13,
                  color: "var(--muted)",
                  fontFamily: FAM,
                }}
              >
                <span>Part of Research Thread:</span>
                <Link
                  href={`/research/${primaryThread.id}`}
                  style={{
                    color: "var(--text)",
                    fontWeight: 500,
                    textDecoration: "underline",
                    textDecorationColor: "var(--line)",
                    textUnderlineOffset: 3,
                  }}
                >
                  {primaryThread.title} ↗
                </Link>
              </div>
            );
          })()}

          {/* ── TL;DR / KEY FINDINGS BOX (qlabs style) ── */}
          {project.tldr && project.tldr.length > 0 && (
            <section
              style={{
                margin: "0 0 36px 0",
                padding: "20px 24px",
                borderRadius: 10,
                background: "#fafafa",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 12,
                  fontFamily: FAM,
                }}
              >
                Key Findings
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {project.tldr.map((point: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--text)",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Intro paragraph */}
          <div
            style={{
              fontSize: 18.5,
              lineHeight: 1.65,
              color: "var(--text)",
              margin: "0 0 44px 0",
              fontWeight: 400,
            }}
          >
            {parseFormatting(article.intro || "")}
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {(article.sections || []).map((sec: any, idx: number) => {
              if (sec.type === "heading") {
                const sId = slugify(sec.content || "");
                const hIndex = headings.findIndex((h) => h.id === sId);
                const num = hIndex >= 0 ? headings[hIndex].num : null;
                return (
                  <h2
                    key={idx}
                    id={sId}
                    style={{
                      fontFamily: FAM_HEAD,
                      fontWeight: 700,
                      fontSize: 22,
                      color: "var(--text)",
                      margin: "24px 0 0 0",
                      lineHeight: 1.25,
                      scrollMarginTop: 120,
                    }}
                  >
                    {num && (
                      <span
                        style={{
                          color: "var(--muted)",
                          fontWeight: 500,
                          marginRight: 8,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {num}.
                      </span>
                    )}
                    {parseFormatting(sec.content || "")}
                  </h2>
                );
              }

              if (sec.type === "paragraph") {
                return (
                  <p
                    key={idx}
                    style={{
                      fontSize: 17,
                      lineHeight: 1.65,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {parseFormatting(sec.content || "")}
                  </p>
                );
              }

              if (sec.type === "equation") {
                return (
                  <div
                    key={idx}
                    style={{
                      background: "#0D1117",
                      borderRadius: 8,
                      border: "1px solid #30363D",
                      overflow: "hidden",
                      margin: "12px 0",
                    }}
                  >
                    <div
                      style={{
                        background: "#161B22",
                        padding: "8px 16px",
                        display: "flex",
                        gap: 6,
                        borderBottom: "1px solid #30363D",
                      }}
                    >
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
                    </div>
                    <div style={{ padding: 24, overflowX: "auto" }}>
                      <div
                        style={{
                          fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
                          fontSize: 13,
                          color: "#E6EDF3",
                          whiteSpace: "pre-wrap",
                          lineHeight: 1.6,
                        }}
                      >
                        {highlightSyntax(sec.content || "")}
                      </div>
                    </div>
                  </div>
                );
              }

              if (sec.type === "math") {
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "24px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {(sec.content || "").split("\n").map((line: string, i: number) => (
                      <div key={i} style={{ fontStyle: "italic", color: "var(--text)", fontSize: 18 }}>
                        {parseMath(line)}
                      </div>
                    ))}
                  </div>
                );
              }

              if (sec.type === "result-table") {
                const rows = (sec.content || "").split("\n\n").map((block: string) => {
                  const lines = block.trim().split("\n");
                  return { value: lines[0] || "", label: lines[1] || "" };
                });
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1px",
                      background: "var(--line)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      overflow: "hidden",
                      margin: "12px 0",
                    }}
                  >
                    {rows.map((row: { value: string; label: string }, i: number) => (
                      <div
                        key={i}
                        style={{
                          flex: "1 1 180px",
                          background: "var(--bg)",
                          padding: "24px 28px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: FAM_HEAD,
                            fontWeight: 700,
                            fontSize: 26,
                            color: "var(--text)",
                          }}
                        >
                          {row.value}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--muted)",
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          {row.label}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              if (sec.type === "figure") {
                const currentFigNum = figureCounter++;
                return (
                  <figure key={idx} style={{ margin: "28px 0" }}>
                    <div
                      style={{
                        background: "#fafafa",
                        borderRadius: 12,
                        border: "1px solid var(--line)",
                        padding: "32px 24px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ProjectFigure visual={sec.visual} />
                    </div>
                    {sec.caption && (
                      <figcaption
                        style={{
                          marginTop: 12,
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "var(--muted)",
                          fontFamily: FAM,
                        }}
                      >
                        <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                          Figure {currentFigNum}.{" "}
                        </strong>
                        {sec.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return null;
            })}
          </div>

          {/* ── CONNECTED RESEARCH THREADS ── */}
          {(() => {
            const primaryThread = siteContent.researchThreads.find((t) => t.id === project.primaryThreadId);
            const relatedThreads = (project.relatedThreadIds || [])
              .map((tid) => siteContent.researchThreads.find((t) => t.id === tid))
              .filter(Boolean);
            if (!primaryThread && relatedThreads.length === 0) return null;
            return (
              <div
                style={{
                  marginTop: 56,
                  padding: "20px 24px",
                  borderRadius: 10,
                  border: "1px solid var(--line)",
                  background: "#fafafa",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontFamily: FAM,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  Connected Research Threads
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px" }}>
                  {primaryThread && (
                    <div>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>Primary Thread: </span>
                      <Link
                        href={`/research/${primaryThread.id}`}
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--text)",
                          textDecoration: "underline",
                          textDecorationColor: "var(--line)",
                          textUnderlineOffset: 3,
                        }}
                      >
                        {primaryThread.title} ↗
                      </Link>
                    </div>
                  )}
                  {relatedThreads.map((t) => (
                    <div key={t!.id}>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>Related: </span>
                      <Link
                        href={`/research/${t!.id}`}
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--text)",
                          textDecoration: "underline",
                          textDecorationColor: "var(--line)",
                          textUnderlineOffset: 3,
                        }}
                      >
                        {t!.title} ↗
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ── BIBTEX CITATION BOX ── */}
          {project.bibtex && (
            <section
              id="citation"
              style={{
                marginTop: 64,
                padding: "22px 24px",
                borderRadius: 10,
                background: "#0d1117",
                border: "1px solid #30363d",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                scrollMarginTop: 120,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#8b949e",
                    fontFamily: FAM,
                  }}
                >
                  Citation
                </span>
                <button
                  onClick={() => handleCopyBibtex(project.bibtex!)}
                  style={{
                    background: "#21262d",
                    border: "1px solid #30363d",
                    borderRadius: 6,
                    padding: "4px 10px",
                    color: copiedBibtex ? "#58a6ff" : "#c9d1d9",
                    fontSize: 12,
                    fontFamily: FAM,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {copiedBibtex ? "Copied BibTeX ✓" : "Copy BibTeX"}
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12.5,
                  color: "#e6edf3",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                  overflowX: "auto",
                }}
              >
                <code>{project.bibtex}</code>
              </pre>
            </section>
          )}

          {/* ── Footer Navigation ── */}
          <footer
            style={{
              marginTop: 96,
              paddingTop: 32,
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: FAM,
                fontSize: 15,
                color: "var(--text)",
                textDecoration: "underline",
                textDecorationColor: "var(--line)",
                textUnderlineOffset: 4,
              }}
            >
              ← Back to research
            </Link>
            <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: FAM }}>
              Anirudh Bocha · Machine Learning Engineer · Samsung Research India
            </span>
          </footer>
        </main>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 1009px) {
          .qlabs-article-layout {
            grid-template-columns: 1fr !important;
            padding-top: 36px !important;
          }
          .qlabs-outline {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
