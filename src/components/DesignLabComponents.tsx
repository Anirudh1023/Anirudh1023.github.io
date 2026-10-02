"use client";

import React, { useState } from "react";
import "./DesignLab.css";

// -----------------------------------------------------------------------------
// B. NEUTRAL TONAL SYSTEM
// -----------------------------------------------------------------------------
export function TonalSystem() {
  const tones = [
    { var: "--ko-bg", label: "WARM PAPER (BASE)" },
    { var: "--ko-bgsec", label: "SECONDARY PAPER" },
    { var: "--ko-surface", label: "SURFACE" },
    { var: "--ko-cream2", label: "LIGHT NEUTRAL" },
    { var: "--ko-constr", label: "CONSTRUCTION" },
    { var: "--ko-faint", label: "FAINT 20%" },
    { var: "--ko-muted", label: "MUTED 60%" },
    { var: "--ko-charcoal", label: "CHARCOAL TEXT" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1px", background: "var(--ko-constr)" }}>
      {tones.map(t => (
        <div key={t.var} style={{ background: `var(${t.var})`, padding: "var(--s-md) var(--s-xs)", height: "100px", display: "flex", alignItems: "flex-end" }}>
          <span className="t-eyebrow" style={{ color: t.var === "--ko-charcoal" || t.var === "--ko-muted" ? "var(--ko-bg)" : "var(--ko-charcoal)" }}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// D. ASYMMETRIC GEOMETRY & H. EVIDENCE BLOCK
// -----------------------------------------------------------------------------
export function EvidenceBlock({ metric, label, detail }: { metric: string, label: string, detail: string }) {
  return (
    <div className="evidence-block">
      <div className="t-eyebrow" style={{ color: "var(--ko-orange)" }}>KEY RESULT</div>
      <div className="t-hero" style={{ color: "var(--ko-charcoal)" }}>{metric}</div>
      <div>
        <div className="t-sub">{label}</div>
        <div className="t-body" style={{ color: "var(--ko-muted)" }}>{detail}</div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// F. 2D TWO-TONE ICON SPECIMEN
// -----------------------------------------------------------------------------
export function IconSpecimen() {
  return (
    <div style={{ display: "flex", gap: "var(--s-md)" }}>
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="4" y="4" width="24" height="24" rx="6" fill="var(--ko-bgsec)" />
        <path d="M 10 16 L 16 10 L 22 16" fill="none" stroke="var(--ko-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="10" x2="16" y2="22" stroke="var(--ko-charcoal)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill="var(--ko-bgsec)" />
        <circle cx="16" cy="16" r="6" fill="none" stroke="var(--ko-orange)" strokeWidth="2" strokeDasharray="2 2" />
        <circle cx="16" cy="16" r="2" fill="var(--ko-charcoal)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// G. INTERACTIVE RESEARCH OBJECT (The Object is the Interface)
// -----------------------------------------------------------------------------
export function InteractiveResearchObject() {
  const [activeLayer, setActiveLayer] = useState(2);
  const layers = [0, 1, 2, 3];

  return (
    <div style={{ position: "relative", padding: "var(--s-lg) 0" }}>
      <svg viewBox="0 0 400 300" className="svg-fig">
        <text x="0" y="20" className="s-text t-eyebrow">REPRESENTATION SPACE</text>

        {layers.map(l => {
          const isActive = l === activeLayer;
          const yOff = 60 + l * 40;
          return (
            <g 
              key={l} 
              className={`s-interactive ${isActive ? "active" : ""}`}
              onClick={() => setActiveLayer(l)}
            >
              <polygon points={`20,${yOff} 220,${yOff - 20} 300,${yOff} 100,${yOff + 20}`} className="s-hitbox" />
              
              <polygon 
                points={`20,${yOff} 220,${yOff - 20} 300,${yOff} 100,${yOff + 20}`} 
                className="s-line"
                fill={isActive ? "var(--ko-orange-dim)" : "var(--ko-surface)"}
                strokeWidth={isActive ? 2 : 1}
              />
              
              <text x="315" y={yOff + 5} className="s-text t-num">LAYER {l + 1}</text>
              {isActive && (
                <text x="315" y={yOff + 20} className="s-text s-text-sub s-text-signal">ACTIVE</text>
              )}
            </g>
          );
        })}

        {/* Traces mapping down the stack */}
        <path d="M 160 40 L 160 220" className="s-line s-line-dashed s-line-muted" style={{ pointerEvents: "none" }} />
        {/* Signal Trace down to active layer */}
        <path d={`M 160 40 L 160 ${60 + activeLayer * 40}`} className="s-line s-line-signal" style={{ pointerEvents: "none" }} />
        <circle cx="160" cy={60 + activeLayer * 40} r="4" fill="var(--ko-orange)" style={{ pointerEvents: "none" }} />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// E. TECHNICAL ILLUSTRATION (Exploded Diagram / Cross-section)
// -----------------------------------------------------------------------------
export function TechnicalIllustration() {
  return (
    <svg viewBox="0 0 500 200" className="svg-fig">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill="var(--ko-muted)" />
        </pattern>
      </defs>

      <rect x="50" y="50" width="150" height="100" fill="url(#grid)" stroke="var(--ko-constr)" strokeWidth="1" />
      <rect x="70" y="30" width="150" height="100" fill="var(--ko-surface)" stroke="var(--ko-charcoal)" strokeWidth="1.5" />
      
      {/* Orange cutaway / highlight */}
      <polygon points="70,80 220,80 220,130 70,130" fill="var(--ko-orange-dim)" stroke="var(--ko-orange)" strokeWidth="1.5" strokeDasharray="4 2" />
      
      {/* Annotation line extending out */}
      <line x1="220" y1="105" x2="300" y2="105" className="s-line s-line-muted" />
      <circle cx="220" cy="105" r="3" fill="var(--ko-orange)" />
      
      <text x="310" y="100" className="s-text t-eyebrow" fill="var(--ko-orange)">SELECTED SUBSPACE</text>
      <text x="310" y="115" className="s-text s-text-sub">Restricted parameter field</text>
    </svg>
  );
}
