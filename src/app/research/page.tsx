"use client";

import React, { useState } from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { ResearchNav } from "@/components/knockout/navigation/ResearchNav";
import { ResearchThread } from "@/components/research/ResearchFormation/ResearchThread";
import { ResearchRow } from "@/components/research/ResearchRows/ResearchRow";

export default function ResearchIndex() {
  const [tab, setTab] = useState<"thread" | "work" | "systems">("work");

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* 19. RESEARCH PAGE HERO */}
      <section className="layout-col" style={{ padding: "var(--s-xl) var(--s-md) var(--s-lg)" }}>
        <div style={{ 
          background: KO.accent, borderRadius: 28, padding: "var(--s-xl) var(--s-lg)",
          color: KO.surface 
        }}>
          <div style={{ ...F.eyebrow(10), color: KO.bg, marginBottom: "var(--s-sm)" }}>
            RESEARCH
          </div>
          <h1 style={{ ...F.head(40), margin: 0, marginBottom: "var(--s-md)" }}>
            WHAT COMPUTATION IS NECESSARY?
          </h1>
          <p style={{ ...F.body(18), opacity: 0.9, maxWidth: "90%", marginBottom: "var(--s-xl)" }}>
            The recurring question behind my work across representations, model depth,
            execution, training state, optimization, and inference.
          </p>
          
          <div style={{ display: "flex", gap: "var(--s-lg)" }}>
            <div>
              <div style={{ ...F.hero(32) }}>02</div>
              <div style={{ ...F.eyebrow(10), opacity: 0.8 }}>CORE</div>
            </div>
            <div>
              <div style={{ ...F.hero(32) }}>02</div>
              <div style={{ ...F.eyebrow(10), opacity: 0.8 }}>SUPPORTING</div>
            </div>
            <div>
              <div style={{ ...F.hero(32) }}>03</div>
              <div style={{ ...F.eyebrow(10), opacity: 0.8 }}>SYSTEMS</div>
            </div>
          </div>
        </div>
      </section>

      {/* 20. RESEARCH PAGE TABS */}
      <section className="layout-col" style={{ padding: "0 var(--s-md) var(--s-lg)" }}>
        <div style={{ 
          background: KO.cream2, borderRadius: 99, padding: 4, 
          display: "inline-flex", gap: 4
        }}>
          {(["thread", "work", "systems"] as const).map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              style={{
                ...F.btn(11),
                padding: "10px 24px", borderRadius: 99, border: "none", cursor: "pointer",
                background: tab === t ? KO.text : "transparent",
                color: tab === t ? KO.bg : KO.textMute,
                transition: "all 0.2s ease"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* 23. RESEARCH ORDER */}
      <section className="layout-col" style={{ padding: "0 var(--s-md) var(--s-lg)" }}>
        
        {tab === "thread" && (
          <ResearchThread />
        )}

        {tab === "work" && (
          <>
            <div style={{ marginBottom: "var(--s-xl)" }}>
              <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: "var(--s-sm)" }}>CORE RESEARCH</div>
              <ResearchRow 
                index="01" 
                title="ON-DEVICE ZEROTH-ORDER LLM ADAPTATION" 
                thesis="Forward-only optimization restricting the update space to adapt LLMs under strict hardware limits." 
                status="2026" 
                href="/research/zeroth-order"
              />
              <ResearchRow 
                index="02" 
                title="ADAPTIVE FOUNDATION-MODEL INFERENCE" 
                thesis="Hybrid device-server inference using collaborative caching and computation reuse." 
                status="ACTIVE" 
                href="/research/collaborative-inference"
              />
            </div>
            
            <div style={{ marginBottom: "var(--s-xl)" }}>
              <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: "var(--s-sm)" }}>SUPPORTING RESEARCH</div>
              <ResearchRow 
                index="03" 
                title="TASK-DEPENDENT SPEECH REPRESENTATIONS" 
                thesis="Probing HuBERT to determine necessary representation depth." 
                status="PUBLISHED" 
              />
              <ResearchRow 
                index="04" 
                title="RESOURCE-CONSTRAINED ON-DEVICE ADAPTATION" 
                thesis="Early investigation into memory limits during adaptation." 
                status="ARCHIVED" 
              />
            </div>
          </>
        )}

        {tab === "systems" && (
          <div style={{ marginBottom: "var(--s-xl)" }}>
            <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: "var(--s-sm)" }}>SYSTEMS / RESEARCH ENGINEERING</div>
            <ResearchRow index="05" title="SNAPLITE" thesis="Production inference runtime and cache context execution." status="DEPLOYED" />
            <ResearchRow index="06" title="WESPER" thesis="Wearable sensing platform." status="COMPLETED" />
            <ResearchRow index="07" title="WAVEFORM-WIZARD" thesis="Research infrastructure for audio processing." status="TOOLING" />
          </div>
        )}

      </section>

      <ResearchNav />
    </div>
  );
}
