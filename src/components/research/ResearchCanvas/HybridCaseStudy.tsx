"use client";

import React, { useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { PressButton } from "@/components/knockout/atoms/Atoms";
import { siteContent } from "@/content/site";
import { HoverTerm } from "../UI/HoverTerm";
import { CodeSnippet } from "../UI/CodeSnippet";

export function HybridCaseStudy() {
  const data = siteContent.flagshipWork[1];
  const [reuse, setReuse] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [highlightMetric, setHighlightMetric] = useState<number | null>(null);

  const codeString = `def escalate_request(prompt, device_kv_cache):
    # Instead of recomputing from scratch on the server,
    # transfer the intermediate state computed on device
    server_model = load_foundation_model()
    
    if is_compatible_architecture(device_model, server_model):
        # Transfer and project state to server space
        transferred_state = project_cache(device_kv_cache)
        
        # Resume computation natively on server
        return server_model.generate(
            prompt, 
            past_key_values=transferred_state
        )
    else:
        return server_model.generate(prompt)`;

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
        {/* LEFT: Graphic (7 cols) - Sticky for Scrollytelling */}
        <div className="layout-col-7" style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: `1px solid ${KO.textGhost}`, paddingTop: 32, position: "sticky", top: 120 }}>
          <div style={{ background: KO.bgSec, padding: 32, borderRadius: 16, position: "relative" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ ...F.eyebrow(10), color: KO.textDim }}>
                {reuse ? "STATE REUSE" : "INDEPENDENT WORK"}
              </div>
              <div style={{ display: "flex", background: KO.surface, borderRadius: 99, padding: 4, border: `1px solid ${KO.constr}` }}>
                <PressButton onClick={() => setReuse(false)} style={{ padding: "6px 12px", borderRadius: 99, background: !reuse ? KO.text : "transparent", color: !reuse ? KO.surface : KO.text, ...F.btn(10) }}>
                  RECOMPUTE
                </PressButton>
                <PressButton onClick={() => setReuse(true)} style={{ padding: "6px 12px", borderRadius: 99, background: reuse ? KO.accent : "transparent", color: reuse ? KO.surface : KO.text, ...F.btn(10) }}>
                  REUSE STATE
                </PressButton>
              </div>
            </div>

            <svg viewBox="0 0 650 300" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrowH" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={KO.textGhost} />
                </marker>
                <marker id="arrowH-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={KO.accent} />
                </marker>
              </defs>

              {/* DEVICE SIDE */}
              <rect x="20" y="40" width="160" height="220" rx="12" fill={KO.surface} stroke={KO.constr} />
              <text x="100" y="70" textAnchor="middle" fill={KO.text} style={{ ...F.eyebrow(10) }}>DEVICE</text>
              
              <rect x="40" y="100" width="120" height="40" rx="4" fill={KO.bgSec} stroke={KO.constr} />
              <text x="100" y="124" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>DRAFT / COMPUTE</text>
              
              <rect x="40" y="180" width="120" height="40" rx="4" fill={KO.text} stroke={KO.text} />
              <text x="100" y="204" textAnchor="middle" fill={KO.surface} style={{ ...F.eyebrow(10) }}>DEVICE CACHE</text>

              <path d="M 100 140 L 100 180" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrowH)" />

              {/* SERVER SIDE */}
              <rect x="470" y="40" width="160" height="220" rx="12" fill={KO.surface} stroke={KO.constr} />
              <text x="550" y="70" textAnchor="middle" fill={KO.text} style={{ ...F.eyebrow(10) }}>SERVER</text>
              
              <rect x="490" y="100" width="120" height="40" rx="4" fill={reuse ? KO.accent + "22" : KO.bgSec} stroke={reuse ? KO.accent : KO.constr} style={{ transition: "all 0.3s" }} />
              <text x="550" y="124" textAnchor="middle" fill={reuse ? KO.accent : KO.textDim} style={{ ...F.eyebrow(10) }}>SHARED STATE</text>
              
              <rect x="490" y="180" width="120" height="40" rx="4" fill={KO.bgSec} stroke={highlightMetric === 1 ? KO.text : KO.constr} style={{ transition: "stroke 0.2s" }} />
              <text x="550" y="204" textAnchor="middle" fill={KO.textDim} style={{ ...F.eyebrow(10) }}>VERIFY / CONTINUE</text>

              <path d="M 550 140 L 550 180" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrowH)" />

              {/* CONNECTION PATHS */}
              {/* Recompute Path (Top) */}
              <g style={{ opacity: !reuse ? 1 : 0.15, transition: "opacity 0.4s" }}>
                <path d="M 160 120 Q 325 50 490 120" fill="none" stroke={KO.textGhost} strokeWidth="2" markerEnd="url(#arrowH)" strokeDasharray="4 4" className="animate-dash-flow" />
                <text x="325" y="70" textAnchor="middle" fill={KO.textMute} style={{ ...F.eyebrow(9) }}>ESCALATE REQUEST (NO STATE)</text>
              </g>

              {/* Reuse Path (Bottom) */}
              <g style={{ opacity: reuse ? 1 : 0.15, transition: "opacity 0.4s" }}>
                <path d="M 160 200 Q 325 270 490 120" fill="none" stroke={KO.accent} strokeWidth={highlightMetric === 0 ? 5 : 3} markerEnd="url(#arrowH-active)" style={{ transition: "stroke-width 0.2s" }} />
                <text x="325" y="250" textAnchor="middle" fill={KO.accent} style={{ ...F.eyebrow(9) }}>TRANSFER CACHE STATE</text>
              </g>
            </svg>
          </div>
          
          {/* Caption */}
          <div style={{ ...F.body(14), color: KO.textMute, paddingLeft: 16, borderLeft: `2px solid ${KO.constr}` }}>
            {reuse 
              ? "When escalating a request, the intermediate state computed on the device is transferred to the server, avoiding redundant computation."
              : "Conventional escalation discards the device's draft work, requiring the server model to recompute the entire state from scratch."
            }
          </div>
        </div>

        {/* RIGHT: Text (5 cols) */}
        <div className="layout-col-5" style={{ display: "flex", flexDirection: "column", maxWidth: 520, borderTop: `1px solid ${KO.textGhost}`, paddingTop: 32 }}>
          
          <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 8 }}>QUESTION</div>
          <p style={{ ...F.sub(18), color: KO.textDim, margin: 0, marginBottom: 24, lineHeight: 1.4 }}>
            How can computation already performed on an edge model remain useful when the request is <HoverTerm term="escalated" definition="When a local edge model cannot handle a complex prompt, the request is escalated to a larger cloud foundation model." /> to a larger model on the server?
          </p>
          
          <p style={{ ...F.body(16), color: KO.textDim, margin: 0, marginBottom: 40, lineHeight: 1.5 }}>
            Rather than discarding useful computation when a request is escalated, I am investigating how <HoverTerm term="intermediate state" definition="The Key-Value (KV) cache generated during auto-regressive decoding, representing the model's understanding of the prompt so far." /> can be transferred and projected directly into the larger model's computation space.
          </p>

          {/* Metric Binding Section */}
          <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 12 }}>RESULTS & ARCHITECTURAL IMPACT</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
            {data.metrics.map((m, i) => (
              <div 
                key={i}
                onMouseEnter={() => {
                  setHighlightMetric(i);
                  setReuse(true); // Hovering either metric implies state reuse is active
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

          <CodeSnippet code={codeString} filename="core/cache_transfer.py" />

          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {data.links?.paper && (
              <a href={data.links.paper} style={{ ...F.btn(11), color: KO.text, border: `1px solid ${KO.constr}`, padding: "8px 16px", borderRadius: 99, textDecoration: "none" }}>PAPER ↗</a>
            )}
            {data.links?.code && (
              <a href={data.links.code} style={{ ...F.btn(11), color: KO.text, border: `1px solid ${KO.constr}`, padding: "8px 16px", borderRadius: 99, textDecoration: "none" }}>CODE ↗</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
