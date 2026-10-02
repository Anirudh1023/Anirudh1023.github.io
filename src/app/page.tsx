"use client";

import React, { useState } from "react";
import { KO } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";
import { ResearchArticleModal } from "@/components/research/ArticleModal/ResearchArticleModal";
import { AnimatePresence, motion } from "framer-motion";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

const TOOLTIPS: Record<string, string> = {
  "NNTrainer": "Samsung's open-source on-device Gen AI runtime.",
  "zeroth-order": "Optimizing models without analytical gradients, using only forward passes.",
  "speculative decoding": "Accelerating generation by using a small model to draft tokens and a large model to verify them.",
  "HuBERT": "A self-supervised speech model that learns representations from raw audio.",
  "Wav2Vec2.0": "A self-supervised speech model that learns representations from raw audio.",
  "SnapLite": "Samsung's unified on-device deployment runtime.",
  "forward-only": "Execution that does not use a backward pass (autodiff)."
};

function renderTextWithTooltips(text: string) {
  const keys = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    const key = keys.find(k => k.toLowerCase() === part.toLowerCase());
    if (key) {
      return <Tooltip key={i} content={TOOLTIPS[key]}>{part}</Tooltip>;
    }
    return <span key={i}>{part}</span>;
  });
}

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
              marginBottom: 10, padding: "12px 16px", background: KO.surface, border: `1px solid ${KO.border}`,
              borderRadius: 12, fontSize: "0.8rem", color: KO.text, width: 240, zIndex: 100,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)", pointerEvents: "none",
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ 
      fontSize: "0.7rem", 
      padding: "2px 8px", 
      borderRadius: 6, 
      background: "rgba(255, 128, 0, 0.08)", 
      color: KO.accent, 
      border: `1px solid rgba(255, 128, 0, 0.15)`,
      fontWeight: 600,
      letterSpacing: "0.5px"
    }}>
      {children}
    </span>
  );
}

export default function Home() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"All" | "Current" | "Publications">("All");

  const activeArticleData = 
    siteContent.projects.find(p => p.id === activeModalId) ||
    siteContent.selectedWork.find(w => w.id === activeModalId) ||
    null;

  const displayProjects = activeTab === "All" || activeTab === "Current" ? siteContent.projects : [];
  const displayWork = activeTab === "All" || activeTab === "Publications" ? siteContent.selectedWork : [];

  return (
    <main style={{ minHeight: "100vh", background: KO.bgPrimary, color: KO.text, overflow: activeModalId ? "hidden" : "auto", fontFamily: "'Satoshi-Variable', 'Satoshi', sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 24px 32px 24px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 32 }}>
          <a href={siteContent.identity.links.cv} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>CV</a>
          <a href={siteContent.identity.links.github} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>GitHub</a>
          <a href={siteContent.identity.links.email} style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>Email</a>
        </div>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px", paddingBottom: 120, display: "flex", gap: 80, alignItems: "flex-start" }}>
        
        {/* MAIN CONTENT */}
        <div style={{ flex: 1, maxWidth: 680 }}>
          
          {/* HERO */}
          <section id="hello" style={{ marginBottom: 64, paddingTop: 16 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, overflow: "hidden", flexShrink: 0, border: `1px solid ${KO.border}` }}>
                <img src="/profile.jpg" alt="Anirudh Bocha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.5px", color: KO.text }}>
                  {siteContent.identity.name}
                </h1>
                <div style={{ fontSize: "0.9rem", color: KO.textDim, fontWeight: 500, marginBottom: 16 }}>
                  Machine Learning Engineer @ Samsung Research, Bengaluru
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <p style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    Machine-learning algorithms are usually designed as though computation is free and the execution substrate is interchangeable. On a device, neither is true.
                  </p>
                  <p style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    At Samsung Research India, I work on the <Tooltip content="Running ML directly on mobile chips (CPUs, GPUs, NPUs) rather than servers.">On-Device AI</Tooltip> team, where I study how <Tooltip content="Large, general-purpose models like LLMs that require significant adaptation.">foundation models</Tooltip> can be adapted and executed when memory, latency, thermal limits, and accelerator capabilities constrain what a system can actually do.
                  </p>
                  <p style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                    My work asks a recurring question: what information, computation, and state does a task actually require, and what can be removed, reused, or executed differently?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RESEARCH & PROJECTS (Combined with Tabs) */}
          <section id="research" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, marginBottom: 24 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: KO.text }}>
                Research & Projects
              </h2>
              <div style={{ display: "flex", gap: 16 }}>
                {(["All", "Current", "Publications"] as const).map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    style={{ 
                      background: "none", border: "none", padding: 0, cursor: "pointer", 
                      fontSize: "0.85rem", fontWeight: 600, 
                      color: activeTab === tab ? KO.text : KO.textMute,
                      borderBottom: activeTab === tab ? `2px solid ${KO.text}` : "2px solid transparent",
                      paddingBottom: 4
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              
              {/* CURRENT PROJECTS */}
              {displayProjects.map(proj => (
                <div 
                  key={proj.id} 
                  onClick={() => setActiveModalId(proj.id)}
                  style={{ 
                    padding: "16px",
                    borderRadius: 16,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    marginLeft: -16,
                    marginRight: -16
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = KO.surface; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: KO.text }}>
                      {proj.title}
                    </h3>
                    <Badge>{proj.category.includes("CURRENT") ? "Current Research" : proj.category}</Badge>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: KO.textDim, lineHeight: 1.5, margin: "0 0 12px 0" }}>
                    {renderTextWithTooltips(proj.homepageSummary)}
                  </p>
                  <div style={{ fontSize: "0.85rem", color: KO.accent, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    Read Notes <Icon2T name="arrow" size={10} primary={KO.accent} secondary="transparent" style={{ transform: "rotate(90deg)" }} />
                  </div>
                </div>
              ))}

              {/* SELECTED WORK */}
              {displayWork.map(work => (
                <div 
                  key={work.id}
                  onClick={() => setActiveModalId(work.id)}
                  style={{
                    padding: "16px",
                    borderRadius: 16,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    marginLeft: -16,
                    marginRight: -16
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = KO.surface; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: KO.text }}>
                      {work.title}
                    </h3>
                    <Badge>{work.metadata.includes("INTERSPEECH") || work.metadata.includes("ICASSP") ? "Conference Paper" : "Project"}</Badge>
                    <span style={{ fontSize: "0.75rem", color: KO.textMute, fontWeight: 500 }}>· {work.result}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: KO.textDim, lineHeight: 1.5, margin: 0 }}>
                    {renderTextWithTooltips(work.teaser)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE (Timeline) */}
          <section id="experience" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 24px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, color: KO.text }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingLeft: 12 }}>
              {siteContent.experience.map((exp, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", paddingLeft: 20 }}>
                  
                  {/* Timeline continuous line */}
                  {i !== siteContent.experience.length - 1 && (
                    <div style={{ position: "absolute", left: 3, top: 16, bottom: -24, width: 2, background: KO.border }} />
                  )}
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: 0, top: 6, width: 8, height: 8, borderRadius: "50%", background: KO.bgPrimary, border: `2px solid ${KO.accent}` }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: KO.text }}>{exp.org}</div>
                    <div style={{ fontSize: "0.8rem", color: KO.textDim, fontWeight: 500 }}>{exp.dates}</div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: KO.textDim, fontWeight: 500, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontSize: "0.9rem", color: KO.text, lineHeight: 1.5 }}>
                    {renderTextWithTooltips(exp.desc)}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT VERTICAL NAV */}
        <div className="mobile-hide" style={{ width: 180, position: "sticky", top: 120 }}>
          <div style={{
            padding: "20px 24px",
            background: "rgba(247, 238, 228, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 20,
            border: `1px solid ${KO.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1.5px", color: KO.textDim, textTransform: "uppercase" }}>CONTENTS</div>
            <a href="#hello" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Hello</a>
            <a href="#research" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Research</a>
            <a href="#experience" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Experience</a>
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
