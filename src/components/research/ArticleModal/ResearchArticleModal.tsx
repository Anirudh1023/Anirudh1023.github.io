"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KO, F } from "@/lib/knockout-tokens";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

interface Section {
  type: string;
  content?: string;
  caption?: string;
  visual?: string;
}

interface Article {
  intro: string;
  sections: Section[];
}

interface ModalData {
  id: string;
  number: string;
  category?: string;
  metadata?: string | string[];
  title: string;
  articleTitle?: string;
  article: Article;
}

interface Props {
  data: ModalData | null;
  onClose: () => void;
}

export const ResearchArticleModal = ({ data, onClose }: Props) => {
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px"
      }}
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(34,34,34,0.4)",
          backdropFilter: "blur(4px)"
        }}
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          maxHeight: "100%",
          background: KO.bgPrimary,
          borderRadius: 24,
          boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: `1px solid ${KO.border}`
        }}
      >
        {/* Header / Sticky */}
        <div style={{
          padding: "24px 32px",
          borderBottom: `1px solid ${KO.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: KO.bgPrimary,
          zIndex: 10
        }}>
          <div>
            <div style={{ ...F.btn(11), color: KO.accent, marginBottom: 8 }}>
              {data.number} · {data.category || (Array.isArray(data.metadata) ? data.metadata[0] : data.metadata)}
            </div>
            <h2 style={{ ...F.head(20), color: KO.text, margin: 0 }}>
              {data.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
              marginLeft: 16
            }}
          >
            <Icon2T name="plus" size={24} primary={KO.text} secondary="transparent" style={{ transform: "rotate(45deg)" }} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: "40px 32px", overflowY: "auto", flex: 1 }}>
          
          <h1 style={{ ...F.head(32), color: KO.text, marginBottom: 24, letterSpacing: "-1px" }}>
            {data.articleTitle || data.title}
          </h1>

          {Array.isArray(data.metadata) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              {data.metadata.map((m, i) => (
                <span key={i} style={{ ...F.btn(12), color: KO.textDim, padding: "6px 12px", border: `1px solid ${KO.border}`, borderRadius: 99 }}>
                  {m}
                </span>
              ))}
            </div>
          )}

          <p style={{ ...F.sub(20), color: KO.text, marginBottom: 48, lineHeight: 1.5 }}>
            {data.article.intro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {data.article.sections.map((sec, idx) => {
              if (sec.type === "heading") {
                return (
                  <h3 key={idx} style={{ ...F.head(20), color: KO.text, marginTop: 16 }}>
                    {sec.content}
                  </h3>
                );
              }
              if (sec.type === "paragraph") {
                return (
                  <p key={idx} style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.6 }}>
                    {sec.content}
                  </p>
                );
              }
              if (sec.type === "equation") {
                return (
                  <div key={idx} style={{ padding: 24, background: KO.bgSec, borderRadius: 12, fontFamily: "monospace", fontSize: 14, color: KO.text, whiteSpace: "pre-wrap" }}>
                    {sec.content}
                  </div>
                );
              }
              if (sec.type === "result-table") {
                return (
                  <div key={idx} style={{ padding: 24, background: KO.surface, border: `1px solid ${KO.border}`, borderRadius: 12 }}>
                    <pre style={{ ...F.body(14), color: KO.text, margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                      {sec.content}
                    </pre>
                  </div>
                );
              }
              if (sec.type === "status-list") {
                return (
                  <ul key={idx} style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {sec.content?.split('\n').map((line, i) => {
                      const match = line.match(/^\[(.*?)\] (.*)$/);
                      if (match) {
                        return (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <span style={{ ...F.btn(11), background: KO.bgSec, color: KO.text, padding: "4px 8px", borderRadius: 4, marginTop: 2 }}>{match[1]}</span>
                            <span style={{ ...F.body(15), color: KO.textDim, lineHeight: 1.5 }}>{match[2]}</span>
                          </li>
                        )
                      }
                      return <li key={i} style={{ ...F.body(15), color: KO.textDim }}>{line}</li>
                    })}
                  </ul>
                );
              }
              if (sec.type === "figure") {
                return (
                  <div key={idx} style={{ margin: "24px 0", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ background: KO.bgSec, borderRadius: 16, border: `1px solid ${KO.border}`, padding: 32, overflow: "hidden" }}>
                      {sec.visual === "zo-crash" && <DiagramZOCrash />}
                      {sec.visual === "zo-rank" && <DiagramZORank />}
                      {sec.visual === "hybrid-handoff" && <DiagramHybridHandoff />}
                      {sec.visual === "nntrainer-pipeline" && <DiagramNNTrainer />}
                      {sec.visual === "speech-layers" && <DiagramSpeechLayers />}
                    </div>
                    <span style={{ ...F.btn(12), color: KO.textDim, textAlign: "center" }}>{sec.caption}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// DIAGRAM COMPONENTS
// ============================================================================

function DiagramZOCrash() {
  const [subspace, setSubspace] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: 360, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ ...F.eyebrow(10), color: KO.textDim }}>
          {subspace ? "LEARNED SUBSPACE (SAFE)" : "FULL RANK (CRASH RISK)"}
        </div>
        <div style={{ display: "flex", background: KO.surface, borderRadius: 99, padding: 4, border: `1px solid ${KO.border}` }}>
          <button onClick={() => setSubspace(false)} style={{ border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 99, background: !subspace ? KO.text : "transparent", color: !subspace ? KO.surface : KO.text, ...F.btn(11), transition: "all 0.2s" }}>
            FULL WEIGHTS
          </button>
          <button onClick={() => setSubspace(true)} style={{ border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 99, background: subspace ? KO.accent : "transparent", color: subspace ? KO.surface : KO.text, ...F.btn(11), transition: "all 0.2s" }}>
            SUBSPACE RxR
          </button>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", background: KO.surface, borderRadius: 12, border: `1px solid ${KO.border}`, padding: 24 }}>
        <svg viewBox="0 0 700 240" style={{ width: "100%", height: "100%" }}>
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill={KO.textGhost} />
            </marker>
            <marker id="arrow-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill={KO.accent} />
            </marker>
          </defs>

          {/* Full Rank Path */}
          <motion.g animate={{ opacity: subspace ? 0.15 : 1 }} transition={{ duration: 0.4 }}>
            <rect x="20" y="20" width="180" height="60" rx="8" fill={KO.bgSec} stroke={KO.border} />
            <text x="110" y="54" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(11) }}>FULL WEIGHT MATRIX</text>
            
            <path d="M 200 50 L 260 50" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="270" y="10" width="140" height="80" rx="8" fill="none" stroke={KO.accent} strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
            <text x="340" y="54" textAnchor="middle" fill={KO.accent} style={{ ...F.eyebrow(11) }}>3.2 GB DISPATCH</text>
            
            <path d="M 410 50 L 470 50" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrow)" />
          </motion.g>

          {/* Subspace Path */}
          <motion.g animate={{ opacity: subspace ? 1 : 0.15 }} transition={{ duration: 0.4 }}>
            <rect x="20" y="160" width="180" height="60" rx="8" fill={subspace ? KO.accent + "11" : KO.bgSec} stroke={KO.border} />
            <text x="110" y="194" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(11) }}>RxR COEFFICIENTS</text>
            
            <path d="M 200 190 L 260 190" fill="none" stroke={subspace ? KO.accent : KO.textGhost} strokeWidth="2" markerEnd={subspace ? "url(#arrow-active)" : "url(#arrow)"} />
            
            <rect x="270" y="160" width="140" height="60" rx="8" fill={subspace ? KO.accent : KO.bgSec} stroke={KO.border} />
            <text x="340" y="194" textAnchor="middle" fill={subspace ? KO.surface : KO.textDim} style={{ ...F.eyebrow(11) }}>SAFE DISPATCH</text>
            
            <path d="M 410 190 L 470 120" fill="none" stroke={subspace ? KO.accent : KO.textGhost} strokeWidth="2" markerEnd={subspace ? "url(#arrow-active)" : "url(#arrow)"} className={subspace ? "animate-dash-flow" : ""} strokeDasharray={subspace ? "4 4" : "0"} />
          </motion.g>

          {/* Device Path */}
          <rect x="480" y="70" width="180" height="60" rx="8" fill={KO.bgSec} stroke={KO.border} />
          <text x="570" y="104" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(11) }}>FORWARD EVALUATION</text>
          
          <AnimatePresence>
            {!subspace && (
              <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                <rect x="480" y="15" width="180" height="45" rx="6" fill="#FF4444" />
                <text x="570" y="42" textAnchor="middle" fill={KO.surface} style={{ ...F.eyebrow(11) }}>DEVICE CRASH!</text>
              </motion.g>
            )}
          </AnimatePresence>

        </svg>
      </div>
    </div>
  );
}

function DiagramZORank() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
      <div style={{ display: "flex", gap: 64, marginBottom: 32, width: "100%", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center" }}>
          <div style={{ ...F.hero(48), color: KO.text }}>r = 8</div>
          <div style={{ ...F.btn(12), color: KO.textDim, marginTop: 8 }}>LOW RANK</div>
          <div style={{ ...F.btn(11), color: KO.surface, background: KO.accent, padding: "6px 12px", borderRadius: 99, marginTop: 16 }}>CPU FASTER (0.92s)</div>
        </motion.div>
        <div style={{ width: 1, background: KO.border }}></div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ textAlign: "center" }}>
          <div style={{ ...F.hero(48), color: KO.text }}>r = 256</div>
          <div style={{ ...F.btn(12), color: KO.textDim, marginTop: 8 }}>HIGH RANK</div>
          <div style={{ ...F.btn(11), color: KO.surface, background: KO.accent, padding: "6px 12px", borderRadius: 99, marginTop: 16 }}>NPU FASTER (2.75s)</div>
        </motion.div>
      </div>
      <div style={{ ...F.body(16), color: KO.textDim, fontStyle: "italic" }}>
        At higher ranks, enough useful work accumulates to amortize NPU fixed dispatch overhead.
      </div>
    </div>
  );
}

function DiagramHybridHandoff() {
  const [method, setMethod] = useState("direct"); // "direct" or "ngram"
  return (
    <div style={{ position: "relative", width: "100%", height: 380, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ ...F.eyebrow(10), color: KO.textDim }}>
          CROSS-VOCABULARY TRANSLATION
        </div>
        <div style={{ display: "flex", background: KO.surface, borderRadius: 99, padding: 4, border: `1px solid ${KO.border}` }}>
          <button onClick={() => setMethod("direct")} style={{ border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 99, background: method === "direct" ? KO.accent : "transparent", color: method === "direct" ? KO.surface : KO.text, ...F.btn(11), transition: "all 0.2s" }}>
            DIRECT MAPPING
          </button>
          <button onClick={() => setMethod("ngram")} style={{ border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 99, background: method === "ngram" ? KO.accent : "transparent", color: method === "ngram" ? KO.surface : KO.text, ...F.btn(11), transition: "all 0.2s" }}>
            N-GRAM MERGE
          </button>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", background: KO.surface, borderRadius: 12, border: `1px solid ${KO.border}`, padding: 24 }}>
        <svg viewBox="0 0 700 240" style={{ width: "100%", height: "100%" }}>
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill={KO.textGhost} />
            </marker>
            <marker id="arrow-accent" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill={KO.accent} />
            </marker>
          </defs>

          {/* Device Side */}
          <rect x="20" y="20" width="180" height="200" rx="12" fill={KO.bgSec} stroke={KO.border} />
          <text x="110" y="50" textAnchor="middle" fill={KO.text} style={{ ...F.eyebrow(12) }}>DEVICE</text>
          
          <rect x="40" y="90" width="140" height="60" rx="8" fill={KO.surface} stroke={KO.border} />
          <text x="110" y="124" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(11) }}>SMALL MODEL</text>
          
          <path d="M 180 120 L 250 120" fill="none" stroke={KO.textGhost} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" className="animate-dash-flow" />
          <text x="215" y="105" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>DRAFT TOKENS</text>

          {/* Translation Box */}
          <motion.rect animate={{ fill: method === "direct" ? KO.accent : KO.text }} transition={{ duration: 0.3 }} x="260" y="80" width="180" height="80" rx="8" />
          <text x="350" y="120" textAnchor="middle" fill={KO.surface} style={{ ...F.eyebrow(11) }}>TRANSLATION</text>
          <text x="350" y="140" textAnchor="middle" fill={KO.surface} style={{ ...F.eyebrow(10), opacity: 0.8 }}>
            {method === "direct" ? "[ 1:1 MAP ]" : "[ N-GRAM MERGE ]"}
          </text>

          <path d="M 440 120 L 510 120" fill="none" stroke={KO.accent} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-accent)" className="animate-dash-flow" />

          {/* Server Side */}
          <rect x="520" y="20" width="160" height="200" rx="12" fill={KO.bgSec} stroke={KO.border} />
          <text x="600" y="50" textAnchor="middle" fill={KO.text} style={{ ...F.eyebrow(12) }}>SERVER</text>
          
          <rect x="540" y="70" width="120" height="45" rx="8" fill={KO.surface} stroke={KO.border} />
          <text x="600" y="96" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>LARGE MODEL</text>
          
          <rect x="540" y="135" width="120" height="45" rx="8" fill={KO.text} />
          <text x="600" y="161" textAnchor="middle" fill={KO.surface} style={{ ...F.eyebrow(10) }}>VERIFICATION</text>
        </svg>
      </div>
    </div>
  );
}

function DiagramNNTrainer() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ ...F.btn(12), background: KO.surface, padding: "12px 24px", borderRadius: 8, border: `1px solid ${KO.border}` }}>PTQ BASE</motion.div>
        <div style={{ ...F.btn(11), color: KO.textGhost }}>→</div>
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ ...F.btn(12), background: KO.surface, padding: "12px 24px", borderRadius: 8, border: `1px solid ${KO.border}` }}>LORA</motion.div>
        <div style={{ ...F.btn(11), color: KO.textGhost }}>→</div>
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ ...F.btn(12), background: KO.accent, color: KO.surface, padding: "12px 24px", borderRadius: 8 }}>QAT ADAPTATION</motion.div>
      </div>
      <div style={{ ...F.body(15), color: KO.textDim, marginTop: 16, textAlign: "center" }}>
        Adapters learn blockwise quantization behavior dynamically rather than quantizing post-adaptation.
      </div>
    </div>
  );
}

function DiagramSpeechLayers() {
  const bars = [40, 60, 100, 80, 50];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 480, alignItems: "flex-end", height: 160, borderBottom: `2px solid ${KO.border}`, gap: 8 }}>
        {bars.map((height, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring", damping: 15 }}
            style={{ flex: 1, background: i === 2 ? KO.accent : KO.bgSec, borderRadius: "8px 8px 0 0", display: "flex", justifyContent: "center", border: `1px solid ${i === 2 ? KO.accent : KO.border}`, borderBottom: "none" }}
          >
            {i === 2 && <span style={{ ...F.btn(12), color: KO.surface, marginTop: 12 }}>0.97 F1</span>}
          </motion.div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 480, marginTop: 16 }}>
        <span style={{ ...F.btn(11), color: KO.textDim }}>Layer 1</span>
        <span style={{ ...F.btn(11), color: KO.text }}>Layer 5 (Peak)</span>
        <span style={{ ...F.btn(11), color: KO.textDim }}>Final Layer</span>
      </div>
    </div>
  );
}

