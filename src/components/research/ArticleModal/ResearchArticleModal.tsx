"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { KO, F } from "@/lib/knockout-tokens";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

interface Section {
  type: string;
  content?: string;
  caption?: string;
  visual?: string;
}

interface Article {
  intro: string;
  sections: Section[];
}

interface ModalData {
  id: string;
  number: string;
  category?: string;
  metadata?: string | string[];
  title: string;
  articleTitle?: string;
  article: Article;
}

interface Props {
  data: ModalData | null;
  onClose: () => void;
}

export const ResearchArticleModal = ({ data, onClose }: Props) => {
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px"
      }}
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(34,34,34,0.4)",
          backdropFilter: "blur(4px)"
        }}
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          maxHeight: "100%",
          background: KO.bgPrimary,
          borderRadius: 24,
          boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: `1px solid ${KO.border}`
        }}
      >
        {/* Header / Sticky */}
        <div style={{
          padding: "24px 32px",
          borderBottom: `1px solid ${KO.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: KO.bgPrimary,
          zIndex: 10
        }}>
          <div>
            <div style={{ ...F.btn(11), color: KO.accent, marginBottom: 8 }}>
              {data.number} · {data.category || (Array.isArray(data.metadata) ? data.metadata[0] : data.metadata)}
            </div>
            <h2 style={{ ...F.head(20), color: KO.text, margin: 0 }}>
              {data.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
              marginLeft: 16
            }}
          >
            <Icon2T name="plus" size={24} primary={KO.text} secondary="transparent" style={{ transform: "rotate(45deg)" }} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: "40px 32px", overflowY: "auto", flex: 1 }}>
          
          <h1 style={{ ...F.head(32), color: KO.text, marginBottom: 24, letterSpacing: "-1px" }}>
            {data.articleTitle || data.title}
          </h1>

          {Array.isArray(data.metadata) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              {data.metadata.map((m, i) => (
                <span key={i} style={{ ...F.btn(12), color: KO.textDim, padding: "6px 12px", border: `1px solid ${KO.border}`, borderRadius: 99 }}>
                  {m}
                </span>
              ))}
            </div>
          )}

          <p style={{ ...F.sub(20), color: KO.text, marginBottom: 48, lineHeight: 1.5 }}>
            {data.article.intro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {data.article.sections.map((sec, idx) => {
              if (sec.type === "heading") {
                return (
                  <h3 key={idx} style={{ ...F.head(20), color: KO.text, marginTop: 16 }}>
                    {sec.content}
                  </h3>
                );
              }
              if (sec.type === "paragraph") {
                return (
                  <p key={idx} style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.6 }}>
                    {sec.content}
                  </p>
                );
              }
              if (sec.type === "equation") {
                return (
                  <div key={idx} style={{ padding: 24, background: KO.bgSec, borderRadius: 12, fontFamily: "monospace", fontSize: 14, color: KO.text, whiteSpace: "pre-wrap" }}>
                    {sec.content}
                  </div>
                );
              }
              if (sec.type === "result-table") {
                return (
                  <div key={idx} style={{ padding: 24, background: KO.surface, border: `1px solid ${KO.border}`, borderRadius: 12 }}>
                    <pre style={{ ...F.body(14), color: KO.text, margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                      {sec.content}
                    </pre>
                  </div>
                );
              }
              if (sec.type === "status-list") {
                return (
                  <ul key={idx} style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {sec.content?.split('\n').map((line, i) => {
                      const match = line.match(/^\[(.*?)\] (.*)$/);
                      if (match) {
                        return (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <span style={{ ...F.btn(11), background: KO.bgSec, color: KO.text, padding: "4px 8px", borderRadius: 4, marginTop: 2 }}>{match[1]}</span>
                            <span style={{ ...F.body(15), color: KO.textDim, lineHeight: 1.5 }}>{match[2]}</span>
                          </li>
                        )
                      }
                      return <li key={i} style={{ ...F.body(15), color: KO.textDim }}>{line}</li>
                    })}
                  </ul>
                );
              }
              if (sec.type === "figure") {
                return (
                  <div key={idx} style={{ margin: "24px 0", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ height: 240, background: KO.bgSec, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", border: `1px dashed ${KO.border}` }}>
                      <span style={{ ...F.btn(12), color: KO.textGhost }}>[Diagram: {sec.visual}]</span>
                    </div>
                    <span style={{ ...F.btn(12), color: KO.textDim, textAlign: "center" }}>{sec.caption}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
