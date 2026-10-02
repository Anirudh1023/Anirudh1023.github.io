"use client";

import React from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

export function CodeSnippet({ code, filename }: { code: string; filename: string }) {
  // Ultra-simple syntax highlighting mock for Python/PyTorch
  const highlight = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Very naive coloring for demonstration of competence
      let highlightedLine = line
        .replace(/\b(def|class|return|if|else|import|from|for|in|with)\b/g, `<span style="color: #FF8000">$1</span>`) // Keywords
        .replace(/\b(self|torch|nn|F)\b/g, `<span style="color: #88C0D0">$1</span>`) // Objects
        .replace(/([a-zA-Z_0-9]+)(?=\()/g, `<span style="color: #D8DEE9">$1</span>`) // Functions
        .replace(/#.*$/g, match => `<span style="color: rgba(255,255,255,0.4)">${match}</span>`); // Comments

      return (
        <div key={i} style={{ display: "flex", gap: 16 }}>
          <div style={{ ...F.code(12), color: "rgba(255,255,255,0.2)", width: 24, textAlign: "right", userSelect: "none" }}>{i + 1}</div>
          <div style={{ ...F.code(12), color: "rgba(255,255,255,0.8)", whiteSpace: "pre" }} dangerouslySetInnerHTML={{ __html: highlightedLine }} />
        </div>
      );
    });
  };

  return (
    <div style={{
      background: "#1A1A1A",
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid rgba(255,255,255,0.1)`,
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      marginTop: 24
    }}>
      <div style={{
        padding: "12px 16px",
        background: "#222",
        borderBottom: `1px solid rgba(255,255,255,0.05)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon2T name="code" size={14} primary={KO.accent} secondary="rgba(255,255,255,0.2)" />
          <div style={{ ...F.code(12), color: "rgba(255,255,255,0.6)" }}>{filename}</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>
      <div style={{ padding: "16px 16px 16px 8px", overflowX: "auto" }}>
        {highlight(code)}
      </div>
    </div>
  );
}
