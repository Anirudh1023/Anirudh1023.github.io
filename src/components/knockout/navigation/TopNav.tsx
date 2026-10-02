"use client";

import React from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";

export function TopNav() {
  const { identity } = siteContent;
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 1000,
      background: "rgba(247, 238, 228, 0.95)", /* nearly opaque */
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      padding: "24px var(--s-2xl)",
      borderBottom: `1px solid ${KO.border}`,
      gridColumn: "1 / -1",
      marginLeft: "-var(--s-2xl)", marginRight: "-var(--s-2xl)", /* offset the page padding */
    }}>
      <div>
        <div style={{ ...F.btn(11), color: KO.textMute, lineHeight: 1.5 }}>
          SAMSUNG RESEARCH INDIA<br />ON-DEVICE AI
        </div>
      </div>
      <div className="responsive-flex-stack" style={{ display: "flex", gap: "var(--s-md)" }}>
        <a href={identity.links.cv} target="_blank" rel="noopener noreferrer" style={{ ...F.btn(11), color: KO.text, textDecoration: "none" }}>CV ↗</a>
        <a href={identity.links.github} target="_blank" rel="noopener noreferrer" style={{ ...F.btn(11), color: KO.text, textDecoration: "none" }}>GITHUB ↗</a>
        <a href={identity.links.email} style={{ ...F.btn(11), color: KO.text, textDecoration: "none" }}>EMAIL ↗</a>
      </div>
    </div>
  );
}
