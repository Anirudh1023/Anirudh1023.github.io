"use client";

import React from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";

export function TopNav() {
  const { identity } = siteContent;
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 1000,
      background: "rgba(247, 238, 228, 0.75)", /* matches var(--ko-bg) F7EEE4 but translucent */
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      padding: "var(--s-md) 0 var(--s-md)",
      borderBottom: `1px solid ${KO.textGhost}`,
      gridColumn: "1 / -1",
      marginLeft: "-var(--s-2xl)", marginRight: "-var(--s-2xl)", /* offset the page padding */
      paddingLeft: "var(--s-2xl)", paddingRight: "var(--s-2xl)"
    }}>
      <div>
        <div style={{ ...F.eyebrow(10), color: KO.textMute }}>SAMSUNG RESEARCH INDIA</div>
      </div>
      <div className="responsive-flex-stack" style={{ display: "flex", gap: "var(--s-md)" }}>
        <a href={identity.links.cv} target="_blank" rel="noopener noreferrer" style={{ ...F.btn(11), color: KO.text, textDecoration: "none" }}>CV ↗</a>
        <a href={identity.links.github} target="_blank" rel="noopener noreferrer" style={{ ...F.btn(11), color: KO.text, textDecoration: "none" }}>GITHUB ↗</a>
        <a href={identity.links.email} style={{ ...F.btn(11), color: KO.text, textDecoration: "none" }}>EMAIL ↗</a>
      </div>
    </div>
  );
}
