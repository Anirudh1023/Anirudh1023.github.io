"use client";

import React, { useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { PressButton } from "@/components/knockout/atoms/Atoms";
import { siteContent } from "@/content/site";
import { HoverTerm } from "../UI/HoverTerm";
import { CodeSnippet } from "../UI/CodeSnippet";

export function ZOCaseStudy() {
  const data = siteContent.flagshipWork[0];
  const [subspace, setSubspace] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [highlightMetric, setHighlightMetric] = useState<number | null>(null);

  const codeString = `def zeroth_order_step(model, z_probe, eps=1e-3):
    # Restrict update space to low-rank matrices U and V
    # to prevent exceeding edge memory budget
    with torch.no_grad():
        loss_pos = forward_probe(model, z_probe, eps)
        loss_neg = forward_probe(model, z_probe, -eps)
        
        # Estimate gradient
        grad_est = (loss_pos - loss_neg) / (2 * eps)
        
        # Apply memory-efficient update
        apply_subspace_update(model, grad_est, z_probe)`;

  return (
    <div style={{ 
      border: `1px solid ${KO.textGhost}`, 
      borderRadius: 24, 
      background: KO.surface,
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.2, 1, 0.3, 1)"
    }}>
      {/* Header Toggle */}
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{ 
          padding: "32px", 
          cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}
      >
        <div>
          <div style={{ ...F.eyebrow(10), color: KO.accent, marginBottom: 8 }}>{data.eyebrow}</div>
          <h3 style={{ ...F.head(24), color: KO.text, margin: 0, letterSpacing: "-0.5px" }}>{data.title}</h3>
        </div>
        <div style={{ ...F.btn(11), color: KO.textDim, display: "flex", gap: 8, alignItems: "center" }}>
          {expanded ? "HIDE DEEP DIVE" : "VIEW DEEP DIVE"}
          <span style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>↓</span>
        </div>
      </div>

      {/* Expandable Content */}
      <div style={{ 
        display: expanded ? "grid" : "none", 
        gridTemplateColumns: "repeat(12, 1fr)", 
        gap: 24, 
        padding: "0 32px 32px 32px",
        alignItems: "start" 
      }}>
        {/* LEFT: Text (5 cols) */}
        <div className="layout-col-5" style={{ display: "flex", flexDirection: "column", maxWidth: 520, borderTop: `1px solid ${KO.textGhost}`, paddingTop: 32 }}>
          
          <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 8 }}>QUESTION</div>
          <p style={{ ...F.sub(18), color: KO.textDim, margin: 0, marginBottom: 24, lineHeight: 1.4 }}>
            Can an LLM be adapted when the accelerator can execute forward computation but does not provide the conventional <HoverTerm term="backward path" definition="The memory-intensive backpropagation algorithm used to compute gradients during standard neural network training." />?
          </p>
          
          <p style={{ ...F.body(16), color: KO.textDim, margin: 0, marginBottom: 40, lineHeight: 1.5 }}>
            The forward path was available, but conventional backpropagation was not. I replaced the gradient path with <HoverTerm term="zeroth-order updates" definition="A method of estimating gradients by evaluating the loss function at slightly perturbed forward parameter states." /> and then restricted the update space after unconstrained perturbations exceeded device memory.
          </p>

          {/* Metric Binding Section */}
          <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 12 }}>RESULTS & ARCHITECTURAL IMPACT</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
            {data.metrics.map((m, i) => (
              <div 
                key={i}
                onMouseEnter={() => {
                  setHighlightMetric(i);
                  if (i === 1 || i === 2) setSubspace(true);
                  if (i === 0) setSubspace(false);
                }}
                onMouseLeave={() => setHighlightMetric(null)}
                style={{
                  cursor: "crosshair",
                  padding: "8px 12px",
                  marginLeft: "-12px",
                  borderRadius: 8,
                  background: highlightMetric === i ? KO.textGhost : "transparent",
                  transition: "background 0.2s"
                }}
              >
                <div style={{ ...F.num(28), color: highlightMetric === i ? KO.accent : KO.text, lineHeight: 1, marginBottom: 4, transition: "color 0.2s" }}>{m.value}</div>
                <div style={{ ...F.eyebrow(9), color: highlightMetric === i ? KO.text : KO.textMute, transition: "color 0.2s" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <CodeSnippet code={codeString} filename="core/zo_optim.py" />

          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {data.links?.paper && (
              <a href={data.links.paper} style={{ ...F.btn(11), color: KO.text, border: `1px solid ${KO.constr}`, padding: "8px 16px", borderRadius: 99, textDecoration: "none" }}>PAPER ↗</a>
            )}
            {data.links?.code && (
              <a href={data.links.code} style={{ ...F.btn(11), color: KO.text, border: `1px solid ${KO.constr}`, padding: "8px 16px", borderRadius: 99, textDecoration: "none" }}>CODE ↗</a>
            )}
          </div>
        </div>

        {/* RIGHT: Graphic (7 cols) - Sticky for Scrollytelling */}
        <div className="layout-col-7" style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: `1px solid ${KO.textGhost}`, paddingTop: 32, position: "sticky", top: 120 }}>
          {/* The Graphic Canvas */}
          <div style={{ background: KO.bgSec, padding: 32, borderRadius: 16, position: "relative" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ ...F.eyebrow(10), color: KO.textDim }}>
                {subspace ? "SUBSPACE RESTRICTED (MEMORY OPTIMIZED)" : "UNCONSTRAINED (OOM RISK)"}
              </div>
              <div style={{ display: "flex", background: KO.surface, borderRadius: 99, padding: 4, border: `1px solid ${KO.constr}` }}>
                <PressButton onClick={() => setSubspace(false)} style={{ padding: "6px 12px", borderRadius: 99, background: !subspace ? KO.text : "transparent", color: !subspace ? KO.surface : KO.text, ...F.btn(10) }}>
                  FULL UPDATE
                </PressButton>
                <PressButton onClick={() => setSubspace(true)} style={{ padding: "6px 12px", borderRadius: 99, background: subspace ? KO.accent : "transparent", color: subspace ? KO.surface : KO.text, ...F.btn(10) }}>
                  SUBSPACE UPDATE
                </PressButton>
              </div>
            </div>

            <svg viewBox="0 0 650 300" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={KO.textGhost} />
                </marker>
                <marker id="arrow-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={KO.accent} />
                </marker>
              </defs>

              {/* Path 1: Full Update (Unconstrained) */}
              <g style={{ opacity: subspace ? 0.15 : 1, transition: "opacity 0.4s cubic-bezier(0.2, 1, 0.3, 1)" }}>
                <rect x="20" y="40" width="160" height="40" rx="4" fill={KO.surface} stroke={KO.constr} />
                <text x="100" y="64" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>FULL WEIGHT SPACE</text>

                <path d="M 180 60 L 260 60" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrow)" />

                <rect x="270" y="20" width="100" height="80" rx="4" fill="none" stroke={KO.accent} strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                <text x="320" y="64" textAnchor="middle" fill={KO.accent} style={{ ...F.eyebrow(10) }}>Z (PROBE)</text>

                <path d="M 370 60 L 450 60" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrow)" />
              </g>

              {/* Path 2: Subspace Update */}
              <g style={{ opacity: subspace ? 1 : 0.15, transition: "opacity 0.4s cubic-bezier(0.2, 1, 0.3, 1)" }}>
                <rect x="20" y="160" width="160" height="40" rx="4" fill={KO.surface} stroke={highlightMetric === 2 ? KO.accent : KO.constr} style={{ transition: "stroke 0.2s" }} />
                <text x="100" y="184" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>LOW-RANK U/V</text>

                <path d="M 180 180 L 260 180" fill="none" stroke={subspace ? KO.accent : KO.textGhost} strokeWidth="2" markerEnd={subspace ? "url(#arrow-active)" : "url(#arrow)"} />

                <rect x="270" y="160" width="100" height="40" rx="4" fill={subspace ? KO.accent : KO.surface} stroke={highlightMetric === 1 ? KO.text : KO.constr} style={{ transition: "stroke 0.2s" }} />
                <text x="320" y="184" textAnchor="middle" fill={subspace ? KO.surface : KO.textDim} style={{ ...F.eyebrow(10) }}>Z (PROBE)</text>

                <path d="M 370 180 L 450 120" fill="none" stroke={subspace ? KO.accent : KO.textGhost} strokeWidth="2" markerEnd={subspace ? "url(#arrow-active)" : "url(#arrow)"} />
              </g>

              {/* Shared Tail */}
              <rect x="460" y="70" width="160" height="40" rx="4" fill={KO.surface} stroke={KO.constr} />
              <text x="540" y="94" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>FORWARD EVALUATIONS</text>

              <path d="M 540 110 L 540 150" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrow)" />

              <rect x="460" y="160" width="160" height="40" rx="4" fill={KO.surface} stroke={KO.constr} />
              <text x="540" y="184" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>LOSS ESTIMATE</text>

              <path d="M 540 200 L 540 240" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrow)" />

              <rect x="460" y="250" width="160" height="40" rx="4" fill={KO.text} stroke={KO.text} />
              <text x="540" y="274" textAnchor="middle" fill={KO.surface} style={{ ...F.eyebrow(10) }}>OPTIMIZER UPDATE</text>
              
              {/* Memory Constraint Indicator */}
              {!subspace && (
                <text x="320" y="116" textAnchor="middle" fill="#FF4444" style={{ ...F.eyebrow(10) }}>EXCEEDS DEVICE MEMORY</text>
              )}
            </svg>
          </div>
          
          {/* Caption */}
          <div style={{ ...F.body(14), color: KO.textMute, paddingLeft: 16, borderLeft: `2px solid ${KO.constr}` }}>
            {subspace 
              ? "The subspace formulation restricts the update representation to low-rank matrices U and V before forward probing, avoiding memory exhaustion."
              : "Full perturbations move the entire weight space, exceeding the available memory budget on edge devices during forward evaluations."
            }
          </div>
        </div>
      </div>
    </div>
  );
}
