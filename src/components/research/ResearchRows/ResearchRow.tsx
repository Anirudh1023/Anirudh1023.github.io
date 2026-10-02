"use client";

import React, { useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { Icon2T } from "@/components/knockout/icons/Icons2T";
import Link from "next/link";

export function ResearchRow({ index, title, thesis, status, href }: any) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={href || "#"} style={{ textDecoration: "none" }}>
      <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex", alignItems: "center", padding: "16px 0",
          borderBottom: `1px solid ${KO.constr}`,
          background: hover ? KO.bgSec : "transparent",
          transition: "background 0.2s ease",
          borderRadius: hover ? 8 : 0,
        }}
      >
        <div style={{ width: 48, flexShrink: 0, textAlign: "center" }}>
          <span style={{ ...F.num(14), color: KO.textMute }}>{index}</span>
        </div>
        
        <div style={{ 
          flex: 1, 
          transform: hover ? "translateX(4px)" : "none",
          transition: "transform 0.2s ease" 
        }}>
          <div style={{ ...F.sub(16), color: KO.text, marginBottom: 2 }}>{title}</div>
          <div style={{ ...F.body(14), color: KO.textDim }}>{thesis}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 16 }}>
          <span style={{ ...F.eyebrow(10), color: hover ? KO.accent : KO.textMute }}>
            {status}
          </span>
          <div style={{ opacity: hover ? 1 : 0, transform: hover ? "translateX(0)" : "translateX(-4px)", transition: "all 0.2s ease" }}>
            <Icon2T name="arrow" size={16} primary={KO.accent} secondary={KO.accent} />
          </div>
        </div>
      </div>
    </Link>
  );
}
