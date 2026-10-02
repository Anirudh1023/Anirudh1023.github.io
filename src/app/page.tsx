"use client";

import React, { useState } from "react";
import { TopNav } from "@/components/knockout/navigation/TopNav";
import { KO, F } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";
import { ResearchArticleModal } from "@/components/research/ArticleModal/ResearchArticleModal";
import { AnimatePresence } from "framer-motion";
import { Icon2T } from "@/components/knockout/icons/Icons2T";
import { ResearchNav } from "@/components/knockout/navigation/ResearchNav";

export default function Home() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const activeArticleData = 
    siteContent.projects.find(p => p.id === activeModalId) ||
    siteContent.selectedWork.find(w => w.id === activeModalId) ||
    null;

  return (
    <main style={{ minHeight: "100vh", background: KO.bgPrimary, color: KO.text, overflow: activeModalId ? "hidden" : "auto" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 var(--s-2xl)", paddingBottom: 160 }}>
        <TopNav />
        <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
        {/* ================================================================== */}
        {/* HERO */}
        {/* ================================================================== */}
        <section id="identity" style={{ gridColumn: "1 / -1", paddingTop: 160, paddingBottom: 120 }}>
          <div style={{ ...F.btn(12), color: KO.accent, marginBottom: 24 }}>
            {siteContent.identity.heroEyebrow}
          </div>
          <h1 style={{ ...F.hero(72), maxWidth: 1000, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 48 }}>
            {siteContent.identity.heroHeadline}
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 680 }}>
            {siteContent.identity.heroParagraphs.map((p, i) => (
              <p key={i} style={{ ...F.sub(20), color: KO.textDim, lineHeight: 1.5, margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* CURRENT WORK */}
        {/* ================================================================== */}
        <section id="current-work" style={{ gridColumn: "1 / -1", paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ borderBottom: `1px solid ${KO.border}`, paddingBottom: 24, marginBottom: 48 }}>
            <h2 style={{ ...F.head(32), margin: 0, letterSpacing: "-1px" }}>CURRENT WORK</h2>
            <p style={{ ...F.body(16), color: KO.textDim, marginTop: 12 }}>
              Two current investigations into how foundation-model computation changes when the hardware becomes part of the problem.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {siteContent.projects.map(proj => (
              <div key={proj.id} style={{ 
                background: KO.surface, 
                borderRadius: 24, 
                border: `1px solid ${KO.border}`,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                gap: 32
              }} className="mobile-padding">
                <div>
                  <div style={{ ...F.btn(11), color: KO.accent, marginBottom: 16 }}>{proj.number} · {proj.category}</div>
                  <h3 style={{ ...F.head(32), letterSpacing: "-1px", margin: 0, maxWidth: 800 }}>{proj.title}</h3>
                </div>
                
                <p style={{ ...F.body(18), color: KO.text, lineHeight: 1.5, maxWidth: 800, margin: 0 }}>
                  {proj.heroQuestion}
                </p>
                <p style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.6, maxWidth: 800, margin: 0, whiteSpace: "pre-wrap" }}>
                  {proj.homepageSummary}
                </p>

                {proj.metrics && (
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
                    {proj.metrics.map((m, i) => (
                      <div key={i} style={{ background: KO.bgSec, padding: "16px 24px", borderRadius: 16, border: `1px solid ${KO.border}` }}>
                        <div style={{ ...F.head(24), color: KO.text }}>{m.value}</div>
                        <div style={{ ...F.btn(11), color: KO.textDim, marginTop: 4 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <button 
                    onClick={() => setActiveModalId(proj.id)}
                    style={{ ...F.btn(14), color: KO.surface, background: KO.accent, padding: "16px 32px", borderRadius: 99, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12 }}
                  >
                    OPEN RESEARCH <Icon2T name="arrow" size={16} primary={KO.surface} secondary="transparent" style={{ transform: "rotate(90deg)" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SELECTED WORK */}
        {/* ================================================================== */}
        <section id="selected-work" style={{ gridColumn: "1 / -1", paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ borderBottom: `1px solid ${KO.border}`, paddingBottom: 24, marginBottom: 48 }}>
            <h2 style={{ ...F.head(32), margin: 0, letterSpacing: "-1px" }}>SELECTED WORK</h2>
            <p style={{ ...F.body(16), color: KO.textDim, marginTop: 12 }}>
              Earlier work that shaped how I think about representation, execution, memory, and computation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {siteContent.selectedWork.map(work => (
              <div 
                key={work.id}
                onClick={() => setActiveModalId(work.id)}
                style={{
                  background: KO.surface,
                  border: `1px solid ${KO.border}`,
                  borderRadius: 16,
                  padding: "24px 32px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "border-color 0.2s"
                }}
                className="mobile-padding"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ ...F.btn(11), color: KO.textGhost, marginBottom: 8 }}>{work.number} · {work.metadata}</div>
                    <div style={{ ...F.head(20), color: KO.text }}>{work.title}</div>
                  </div>
                  <div style={{ ...F.btn(12), color: KO.accent }}>{work.result}</div>
                </div>
                <div style={{ ...F.body(15), color: KO.textDim, maxWidth: 800 }}>{work.teaser}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* ================================================================== */}
        {/* OUTPUTS & EXPERIENCE */}
        {/* ================================================================== */}
        <section className="responsive-grid" style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24, paddingTop: 80, paddingBottom: 80 }}>
          <div className="layout-col-7">
            <div style={{ borderBottom: `1px solid ${KO.border}`, paddingBottom: 24, marginBottom: 48 }}>
              <h2 style={{ ...F.head(24), margin: 0, letterSpacing: "-1px" }}>PUBLICATIONS & OUTPUTS</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {siteContent.outputs.map((out, i) => (
                <div key={i}>
                  <div style={{ ...F.head(18), color: KO.text, marginBottom: 8 }}>{out.title}</div>
                  <div style={{ ...F.btn(12), color: KO.textDim }}>{out.metadata}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="layout-col-5">
            <div style={{ borderBottom: `1px solid ${KO.border}`, paddingBottom: 24, marginBottom: 48 }}>
              <h2 style={{ ...F.head(24), margin: 0, letterSpacing: "-1px" }}>EXPERIENCE</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {siteContent.experience.map((exp, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                    <div style={{ ...F.head(18), color: KO.text }}>{exp.org}</div>
                    <div style={{ ...F.btn(11), color: KO.textGhost }}>{exp.dates}</div>
                  </div>
                  <div style={{ ...F.btn(12), color: KO.textDim, marginBottom: 12 }}>{exp.role}</div>
                  <div style={{ ...F.body(15), color: KO.textDim, lineHeight: 1.5 }}>{exp.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* ABOUT */}
        {/* ================================================================== */}
        <section id="about" style={{ gridColumn: "1 / -1", paddingTop: 120, paddingBottom: 160, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          
          <div style={{ width: 80, height: 80, borderRadius: 24, overflow: "hidden", marginBottom: 32, border: `1px solid ${KO.border}` }}>
            <img src="/profile.jpg" alt="Anirudh Bocha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <h2 style={{ ...F.head(24), color: KO.text, margin: 0, letterSpacing: "-1px", marginBottom: 32 }}>ABOUT</h2>
          
          <div style={{ maxWidth: 650, display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
            <p style={{ ...F.body(16), color: KO.textDim, margin: 0, lineHeight: 1.6 }}>
              {siteContent.identity.about.p1}
            </p>
            <p style={{ ...F.body(16), color: KO.textDim, margin: 0, lineHeight: 1.6 }}>
              {siteContent.identity.about.p2}
            </p>
          </div>

          <div className="responsive-flex-stack" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href={siteContent.identity.links.email} style={{ ...F.btn(14), color: KO.surface, background: KO.accent, textDecoration: "none", padding: "16px 32px", borderRadius: 99 }}>
              EMAIL
            </a>
            <a href={siteContent.identity.links.cv} target="_blank" style={{ ...F.btn(14), color: KO.text, background: KO.surface, textDecoration: "none", padding: "16px 32px", border: `1px solid ${KO.border}`, borderRadius: 99 }}>
              CV
            </a>
            <a href={siteContent.identity.links.github} target="_blank" style={{ ...F.btn(14), color: KO.text, background: KO.surface, textDecoration: "none", padding: "16px 32px", border: `1px solid ${KO.border}`, borderRadius: 99 }}>
              GITHUB
            </a>
            <a href={siteContent.identity.links.linkedin} target="_blank" style={{ ...F.btn(14), color: KO.text, background: KO.surface, textDecoration: "none", padding: "16px 32px", border: `1px solid ${KO.border}`, borderRadius: 99 }}>
              LINKEDIN
            </a>
          </div>
        </section>

      </div>
      </div>
      
      <ResearchNav />

      <AnimatePresence>
        {activeModalId && (
          <ResearchArticleModal 
            data={activeArticleData} 
            onClose={() => setActiveModalId(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
