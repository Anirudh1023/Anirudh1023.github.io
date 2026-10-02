"use client";

import React, { useState } from "react";
import { KO } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";
import { ResearchArticleModal } from "@/components/research/ArticleModal/ResearchArticleModal";
import { AnimatePresence } from "framer-motion";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

export default function Home() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const activeArticleData = 
    siteContent.projects.find(p => p.id === activeModalId) ||
    siteContent.selectedWork.find(w => w.id === activeModalId) ||
    null;

  return (
    <main style={{ minHeight: "100vh", background: KO.bgPrimary, color: KO.text, overflow: activeModalId ? "hidden" : "auto", fontFamily: "'Satoshi-Variable', 'Satoshi', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", paddingBottom: 120 }}>
        
        {/* HEADER */}
        <header style={{ padding: "64px 0 40px 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${KO.border}`, marginBottom: 64 }}>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.5px" }}>{siteContent.identity.name}</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href={siteContent.identity.links.cv} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>CV</a>
            <a href={siteContent.identity.links.github} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>GitHub</a>
            <a href={siteContent.identity.links.email} style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>Email</a>
          </div>
        </header>

        {/* HERO */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `1px solid ${KO.border}` }}>
              <img src="/profile.jpg" alt="Anirudh Bocha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: "0 0 16px 0", letterSpacing: "-0.5px", color: KO.text }}>
                Hello.
              </h1>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {siteContent.identity.heroParagraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: "1.05rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CURRENT WORK */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 32px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 16, color: KO.text }}>
            Current Work
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {siteContent.projects.map(proj => (
              <div key={proj.id}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: KO.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>
                  {proj.category}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "0 0 12px 0", lineHeight: 1.3, color: KO.text }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: "1rem", color: KO.text, lineHeight: 1.6, margin: "0 0 16px 0" }}>
                  {proj.homepageSummary}
                </p>
                <button 
                  onClick={() => setActiveModalId(proj.id)}
                  style={{ background: "none", border: "none", padding: 0, color: KO.accent, fontWeight: 500, fontSize: "0.95rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  Read Research Notes <Icon2T name="arrow" size={12} primary={KO.accent} secondary="transparent" style={{ transform: "rotate(90deg)" }} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED WORK */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 32px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 16, color: KO.text }}>
            Selected Publications & Work
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {siteContent.selectedWork.map(work => (
              <div key={work.id}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "0 0 4px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, color: KO.text }}>
                  <span>{work.title}</span>
                  <span style={{ fontSize: "0.8rem", color: KO.accent, fontWeight: 500, background: `${KO.accent}11`, padding: "2px 8px", borderRadius: 4 }}>{work.result}</span>
                </h3>
                <div style={{ fontSize: "0.85rem", color: KO.textDim, marginBottom: 8 }}>
                  {work.metadata}
                </div>
                <p style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.5, margin: "0 0 8px 0" }}>
                  {work.teaser}
                </p>
                <button 
                  onClick={() => setActiveModalId(work.id)}
                  style={{ background: "none", border: "none", padding: 0, color: KO.textDim, textDecoration: "underline", fontSize: "0.85rem", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 32px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 16, color: KO.text }}>
            Experience
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {siteContent.experience.map((exp, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: KO.text }}>{exp.org}</div>
                  <div style={{ fontSize: "0.85rem", color: KO.textDim }}>{exp.dates}</div>
                </div>
                <div style={{ fontSize: "0.9rem", color: KO.textDim, fontWeight: 500, marginBottom: 4 }}>{exp.role}</div>
                <div style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.5 }}>{exp.desc}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
      
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
