"use client";

import React, { useState } from "react";
import { KO } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";
import { ResearchArticleModal } from "@/components/research/ArticleModal/ResearchArticleModal";
import { AnimatePresence, motion } from "framer-motion";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

function Tooltip({ children, content }: { children: React.ReactNode, content: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
      style={{ position: "relative", cursor: "help", borderBottom: `2px dotted ${KO.accent}` }}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            style={{
              position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
              marginBottom: 12, padding: "16px", background: KO.surface, border: `1px solid ${KO.border}`,
              borderRadius: 16, fontSize: "0.85rem", color: KO.text, width: 280, zIndex: 100,
              boxShadow: "0 12px 32px rgba(0,0,0,0.06)", pointerEvents: "none",
              fontWeight: 400, letterSpacing: 0, lineHeight: 1.5, whiteSpace: "normal"
            }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Home() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const activeArticleData = 
    siteContent.projects.find(p => p.id === activeModalId) ||
    siteContent.selectedWork.find(w => w.id === activeModalId) ||
    null;

  return (
    <main style={{ minHeight: "100vh", background: KO.bgPrimary, color: KO.text, overflow: activeModalId ? "hidden" : "auto", fontFamily: "'Satoshi-Variable', 'Satoshi', sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 24px 32px 24px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 32 }}>
          <a href={siteContent.identity.links.cv} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>CV</a>
          <a href={siteContent.identity.links.github} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>GitHub</a>
          <a href={siteContent.identity.links.email} style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>Email</a>
        </div>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px", paddingBottom: 120, display: "flex", gap: 80, alignItems: "flex-start" }}>
        
        {/* MAIN CONTENT */}
        <div style={{ flex: 1, maxWidth: 720 }}>
          
          {/* HERO */}
          <section id="hello" style={{ marginBottom: 100, paddingTop: 16 }}>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 100, height: 100, borderRadius: 28, overflow: "hidden", flexShrink: 0, border: `1px solid ${KO.border}` }}>
                <img src="/profile.jpg" alt="Anirudh Bocha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.5px", color: KO.text }}>
                  {siteContent.identity.name}
                </h1>
                <div style={{ fontSize: "1rem", color: KO.textDim, fontWeight: 500, marginBottom: 24, letterSpacing: "-0.2px" }}>
                  Machine Learning Engineer @ Samsung Research, Bengaluru
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <p style={{ fontSize: "1.05rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    Machine-learning algorithms are usually designed as though computation is free and the execution substrate is interchangeable. On a device, neither is true.
                  </p>
                  <p style={{ fontSize: "1.05rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    At Samsung Research India, I work on the <Tooltip content="Running machine learning directly on mobile chips (CPUs, GPUs, NPUs) rather than servers, optimizing for power, memory, and thermal limits.">On-Device AI</Tooltip> team, where I study how <Tooltip content="Large, general-purpose models like LLMs that require significant adaptation to run efficiently.">foundation models</Tooltip> can be adapted and executed when memory, latency, thermal limits, and accelerator capabilities constrain what a system can actually do.
                  </p>
                  <p style={{ fontSize: "1.05rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    My work asks a recurring question: what information, computation, and state does a task actually require, and what can be removed, reused, or executed differently? I have explored this through speech representations, model depth, production inference runtimes, on-device training, accelerator-aware optimization, and hybrid inference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CURRENT WORK */}
          <section id="current-work" style={{ marginBottom: 100 }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 32px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 16, color: KO.text, letterSpacing: "-0.2px" }}>
              Current Work
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {siteContent.projects.map(proj => (
                <div 
                  key={proj.id} 
                  onClick={() => setActiveModalId(proj.id)}
                  style={{ 
                    background: KO.surface, 
                    borderRadius: 24, 
                    border: `1px solid ${KO.border}`,
                    padding: "32px 40px",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.03)` }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}
                  className="mobile-padding"
                >
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: KO.accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "1px" }}>
                    {proj.category}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 16px 0", lineHeight: 1.3, color: KO.text }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: "1rem", color: KO.textDim, lineHeight: 1.6, margin: "0 0 24px 0" }}>
                    {proj.homepageSummary}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: KO.text, fontWeight: 500, fontSize: "0.95rem" }}>
                    Read Research Notes <Icon2T name="arrow" size={14} primary={KO.text} secondary="transparent" style={{ transform: "rotate(90deg)" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SELECTED WORK */}
          <section id="selected-work" style={{ marginBottom: 100 }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 32px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 16, color: KO.text, letterSpacing: "-0.2px" }}>
              Selected Publications & Work
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {siteContent.selectedWork.map(work => (
                <div 
                  key={work.id}
                  onClick={() => setActiveModalId(work.id)}
                  style={{
                    background: KO.bgPrimary, /* Blends in by default */
                    border: `1px solid transparent`,
                    borderRadius: 20,
                    padding: "24px 32px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = KO.surface; e.currentTarget.style.border = `1px solid ${KO.border}`; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = KO.bgPrimary; e.currentTarget.style.border = `1px solid transparent`; }}
                  className="mobile-padding"
                >
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "0 0 8px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, color: KO.text }}>
                    <span>{work.title}</span>
                    <span style={{ fontSize: "0.8rem", color: KO.accent, fontWeight: 600, background: `${KO.accent}11`, padding: "4px 10px", borderRadius: 99 }}>{work.result}</span>
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: KO.textDim, marginBottom: 12 }}>
                    {work.metadata}
                  </div>
                  <p style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.5, margin: 0 }}>
                    {work.teaser}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 32px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 16, color: KO.text, letterSpacing: "-0.2px" }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 16 }}>
              {siteContent.experience.map((exp, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: -16, top: 8, width: 6, height: 6, borderRadius: "50%", background: KO.border }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 600, color: KO.text }}>{exp.org}</div>
                    <div style={{ fontSize: "0.85rem", color: KO.textDim, fontWeight: 500 }}>{exp.dates}</div>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: KO.textDim, fontWeight: 500, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.6 }}>{exp.desc}</div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT VERTICAL NAV */}
        <div className="mobile-hide" style={{ width: 220, position: "sticky", top: 120 }}>
          <div style={{
            padding: "24px 32px",
            background: "rgba(247, 238, 228, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 24,
            border: `1px solid ${KO.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1.5px", color: KO.textDim, textTransform: "uppercase" }}>CONTENTS</div>
            <a href="#hello" style={{ color: KO.text, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>Hello</a>
            <a href="#current-work" style={{ color: KO.text, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>Current Work</a>
            <a href="#selected-work" style={{ color: KO.text, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>Selected Work</a>
            <a href="#experience" style={{ color: KO.text, textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>Experience</a>
          </div>
        </div>

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
