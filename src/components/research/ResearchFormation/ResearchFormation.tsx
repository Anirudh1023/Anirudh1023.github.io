"use client";

import React, { useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { Icon2T } from "@/components/knockout/icons/Icons2T";
import { siteContent } from "@/content/site";

// KnockOut RosterBlock -> ResearchFormation
export function ResearchFormation() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: "representation", row: 1, col: 1, label: "REPRESENTATION", icon: "layer", work: "Task-Dependent Speech" },
    { id: "depth", row: 1, col: 2, label: "DEPTH", icon: "depth", work: "Task-Dependent Speech" },
    { id: "execution", row: 2, col: 1, label: "EXECUTION", icon: "compute", work: "SNAPLite" },
    { id: "state", row: 2, col: 2, label: "STATE", icon: "memory", work: "Hybrid Inference" },
    { id: "optimization", row: 3, col: 1, label: "OPTIMIZATION", icon: "parameter", work: "Zeroth-Order" },
    { id: "reuse", row: 4, col: 1, label: "REUSE / ADAPTATION", icon: "reuse", work: "Hybrid Inference" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2xl)" }}>
      {/* Visual Formation */}
      <div style={{ position: "relative", padding: "var(--s-xl) 0", display: "flex", flexDirection: "column", gap: "var(--s-xl)", alignItems: "center" }}>
        
        {/* Connectors (SVG background) */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
          <path d="M 400 60 Q 400 120 400 180" fill="none" stroke={KO.textGhost} strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 400 180 Q 400 240 400 300" fill="none" stroke={KO.textGhost} strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Rows */}
        <div style={{ display: "flex", gap: "var(--s-3xl)", zIndex: 1 }}>
          <FormationNode data={nodes[0]} active={activeNode === nodes[0].id} onHover={() => setActiveNode(nodes[0].id)} onLeave={() => setActiveNode(null)} />
          <FormationNode data={nodes[1]} active={activeNode === nodes[1].id} onHover={() => setActiveNode(nodes[1].id)} onLeave={() => setActiveNode(null)} />
        </div>
        <div style={{ display: "flex", gap: "var(--s-3xl)", zIndex: 1 }}>
          <FormationNode data={nodes[2]} active={activeNode === nodes[2].id} onHover={() => setActiveNode(nodes[2].id)} onLeave={() => setActiveNode(null)} />
          <FormationNode data={nodes[3]} active={activeNode === nodes[3].id} onHover={() => setActiveNode(nodes[3].id)} onLeave={() => setActiveNode(null)} />
        </div>
        <div style={{ display: "flex", gap: "var(--s-3xl)", zIndex: 1 }}>
          <FormationNode data={nodes[4]} active={activeNode === nodes[4].id} onHover={() => setActiveNode(nodes[4].id)} onLeave={() => setActiveNode(null)} />
        </div>
        <div style={{ display: "flex", gap: "var(--s-3xl)", zIndex: 1 }}>
          <FormationNode data={nodes[5]} active={activeNode === nodes[5].id} onHover={() => setActiveNode(nodes[5].id)} onLeave={() => setActiveNode(null)} />
        </div>
      </div>

      {/* Detail Panel */}
      <div style={{ background: KO.bgSec, borderRadius: 24, padding: "var(--s-xl)", textAlign: "center", minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {!activeNode ? (
          <div>
            <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 8 }}>THE QUESTION</div>
            <div style={{ ...F.head(24), color: KO.text }}>{siteContent.researchThread.question}</div>
          </div>
        ) : (
          <div>
            <div style={{ ...F.eyebrow(10), color: KO.accent, marginBottom: 8 }}>{nodes.find(n => n.id === activeNode)?.label}</div>
            <div style={{ ...F.head(20), color: KO.text, marginBottom: 8 }}>Associated with {nodes.find(n => n.id === activeNode)?.work}</div>
            <a href="#" style={{ ...F.btn(11), color: KO.accent, textDecoration: "none" }}>VIEW WORK →</a>
          </div>
        )}
      </div>

      {/* Evidence Strip */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "var(--s-md)", borderTop: `1px solid ${KO.textGhost}` }}>
        {siteContent.researchThread.metrics.map((m: any, i: number) => (
          <div key={i}>
            <div style={{ ...F.num(24), color: KO.text }}>{m.value}</div>
            <div style={{ ...F.eyebrow(10), color: KO.textMute }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormationNode({ data, active, onHover, onLeave }: any) {
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ 
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer",
        transform: `translateY(${active ? -4 : 0}px)`,
        transition: "transform 0.2s cubic-bezier(0.2, 1, 0.3, 1)"
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 99, 
        background: active ? KO.accent : KO.surface,
        border: `2px solid ${active ? KO.accent : KO.constr}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease"
      }}>
        <Icon2T name={data.icon || "question"} size={24} primary={active ? KO.surface : KO.textDim} secondary={active ? KO.surface : KO.textGhost} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...F.eyebrow(10), color: active ? KO.text : KO.textMute }}>{data.label}</div>
        <div style={{ ...F.body(11), color: KO.textGhost }}>{data.work}</div>
      </div>
    </div>
  );
}
