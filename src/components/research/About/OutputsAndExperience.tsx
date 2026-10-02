"use client";

import React from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";

import { useState } from "react";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

export function SelectedOutputs() {
  const { outputs } = siteContent;
  const [hovered, setHovered] = useState<number | null>(null);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {outputs.map((out, i) => (
        <div 
          key={i} 
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="responsive-grid"
          style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr auto", 
            padding: "24px", 
            borderRadius: 16,
            background: hovered === i ? KO.bgSec : KO.surface,
            border: `1px solid ${hovered === i ? KO.textGhost : "transparent"}`,
            alignItems: "center",
            transition: "all 0.3s ease",
            cursor: "default",
            boxShadow: hovered === i ? "0 4px 24px rgba(0,0,0,0.04)" : "none"
        }}>
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div style={{ ...F.num(12), color: KO.textMute }}>{out.year}</div>
              <div style={{ width: 4, height: 4, borderRadius: 2, background: KO.textGhost }} />
              <div style={{ 
                ...F.eyebrow(9), 
                color: out.status === 'SUBMITTED' || out.status === 'UNDER REVIEW' ? KO.surface : KO.textMute,
                background: out.status === 'SUBMITTED' || out.status === 'UNDER REVIEW' ? KO.textDim : KO.surface,
                padding: "4px 8px",
                borderRadius: 99,
                border: `1px solid ${out.status === 'SUBMITTED' || out.status === 'UNDER REVIEW' ? "transparent" : KO.textGhost}`
              }}>
                {out.status}
              </div>
            </div>
            <div style={{ ...F.head(18), color: KO.text, marginBottom: 4, lineHeight: 1.3, transform: hovered === i ? "translateX(4px)" : "none", transition: "transform 0.2s" }}>{out.title}</div>
            <div style={{ ...F.body(14), color: KO.textDim, transform: hovered === i ? "translateX(4px)" : "none", transition: "transform 0.2s" }}>{out.venue}</div>
          </div>
          <div style={{ color: KO.textGhost, transform: hovered === i ? "scale(1.1)" : "scale(1)", transition: "transform 0.3s" }}>
            <Icon2T name="paper" size={24} primary={hovered === i ? KO.text : KO.textGhost} secondary={hovered === i ? KO.textGhost : KO.surface} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Experience() {
  const { experience } = siteContent;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Timeline track */}
      <div style={{ position: "absolute", left: 15, top: 24, bottom: 24, width: 2, background: `linear-gradient(to bottom, ${KO.accent}, ${KO.textGhost} 80%)`, opacity: 0.3 }} />
      
      {experience.map((exp, i) => (
        <div key={i} style={{ 
          display: "flex",
          gap: 32,
          padding: "32px 0",
          position: "relative"
        }}>
          {/* Timeline Node */}
          <div style={{ 
            width: 32, height: 32, 
            borderRadius: 16, 
            background: KO.surface, 
            border: `2px solid ${i === 0 ? KO.accent : KO.textGhost}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            zIndex: 1,
            marginTop: -4
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: i === 0 ? KO.accent : KO.textGhost }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: -4 }}>
            <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 8, letterSpacing: "1px" }}>{exp.dates}</div>
            <h4 style={{ ...F.head(20), color: KO.text, margin: 0, letterSpacing: "-0.5px", marginBottom: 4 }}>{exp.org}</h4>
            <div style={{ ...F.sub(16), color: KO.accent, marginBottom: 16 }}>
              {exp.role}
            </div>
            
            {exp.context && (
              <div style={{ 
                background: KO.bgSec, 
                padding: "20px 24px", 
                borderRadius: 16,
                border: `1px solid ${KO.textGhost}`,
                position: "relative"
              }}>
                <p style={{ ...F.body(15), color: KO.textDim, margin: 0, lineHeight: 1.6 }}>
                  {exp.context}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
