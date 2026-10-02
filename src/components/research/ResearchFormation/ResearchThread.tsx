"use client";

import React, { useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

const THREAD_NODES = [
  { id: "01", name: "REPRESENTATION", work: "Speech disfluency", x: 20, y: 30, icon: "layer" },
  { id: "02", name: "DEPTH", work: "HuBERT probing", x: 80, y: 30, icon: "depth" },
  { id: "03", name: "EXECUTION", work: "SnapLite", x: 10, y: 65, icon: "compute" },
  { id: "04", name: "STATE", work: "NNTrainer", x: 90, y: 65, icon: "memory" },
  { id: "05", name: "OPTIMIZATION", work: "Zeroth-order adaptation", x: 50, y: 75, icon: "optimize" },
  { id: "06", name: "REUSE", work: "Adaptive inference", x: 50, y: 90, icon: "reuse" },
];

export function ResearchThread() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{
      background: KO.bgSec, borderRadius: 28, padding: "var(--s-lg)",
      position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
      border: `1px solid ${KO.constr}`
    }}>
      <div style={{ textAlign: "center", marginBottom: "var(--s-xl)" }}>
        <h2 style={{ ...F.head(28), color: KO.text, margin: 0 }}>
          WHAT COMPUTATION AND STATE<br />DOES A TASK ACTUALLY REQUIRE?
        </h2>
      </div>

      <div style={{ position: "relative", height: "400px", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Connectors */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {THREAD_NODES.map((n, i) => {
            // Draw lines from the center (50,50) to the nodes
            const cx = 50; const cy = 50;
            const isSelected = selected === n.id;
            return (
              <line 
                key={`line-${n.id}`} 
                x1={`${cx}%`} y1={`${cy}%`} 
                x2={`${n.x}%`} y2={`${n.y}%`}
                stroke={isSelected ? KO.accent : KO.textGhost}
                strokeWidth={isSelected ? 3 : 1.5}
                style={{ transition: "stroke 300ms ease" }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {THREAD_NODES.map((n) => {
          const isSelected = selected === n.id;
          return (
            <div 
              key={n.id}
              onClick={() => setSelected(n.id)}
              onMouseEnter={() => !selected && setSelected(n.id)}
              onMouseLeave={() => !selected && setSelected(null)}
              style={{
                position: "absolute",
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: `translate(-50%, -50%) ${isSelected ? 'translateY(-4px)' : ''}`,
                transition: "transform 200ms ease",
                cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                zIndex: isSelected ? 10 : 1,
              }}
            >
              <div style={{ 
                background: isSelected ? KO.accent : KO.surface,
                border: `1px solid ${isSelected ? KO.accent : KO.constr}`,
                borderRadius: 99, padding: 8, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: isSelected ? "0 8px 16px rgba(255,128,0,0.2)" : "0 4px 12px rgba(0,0,0,0.05)"
              }}>
                <Icon2T name={n.icon} size={24} primary={isSelected ? KO.surface : KO.accent} secondary={isSelected ? KO.bgSec : KO.text} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ ...F.eyebrow(10), color: isSelected ? KO.accent : KO.textMute }}>{n.id} &middot; {n.name}</div>
                {isSelected && <div style={{ ...F.body(12), color: KO.text, fontWeight: 500, marginTop: 4 }}>{n.work}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
