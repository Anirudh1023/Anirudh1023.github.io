"use client";

import React from "react";
import {
  TonalSystem,
  EvidenceBlock,
  IconSpecimen,
  InteractiveResearchObject,
  TechnicalIllustration,
} from "@/components/DesignLabComponents";

export default function DesignLab() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background Graphic Language */}
      <div className="bg-technical-underlay" />

      <div className="layout-col">
        <header className="dl-header">
          <h1 className="t-hero">Design Lab</h1>
          <p className="t-sub" style={{ color: "var(--ko-muted)" }}>
            Visual DNA Reset &middot; KnockOut Editorial Translation
          </p>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* A. TYPOGRAPHY SPECIMEN */}
        <section className="dl-section">
          <div className="dl-section-label t-eyebrow">A. Typography (Satoshi Variable)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-sm)" }}>
            <div className="t-logo">RESEARCH LAB</div>
            <div className="t-hero">92.0%</div>
            <div className="t-head">Zeroth-Order Adaptation</div>
            <div className="t-sub">The execution path dictates the hardware requirement.</div>
            <div className="t-body" style={{ maxWidth: "80%" }}>
              The primary typeface provides an authored personality through strong weight 
              contrast, tight display tracking, heavy headlines, and disciplined small labels.
            </div>
            <div className="t-eyebrow" style={{ color: "var(--ko-orange)", marginTop: "var(--s-xs)" }}>
              EYEBROW / TECHNICAL ANNOTATION
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* B & C. TONAL SYSTEM & ORANGE SIGNAL HIERARCHY */}
        <section className="dl-section">
          <div className="dl-section-label t-eyebrow">B & C. Tonal Depth & Orange Signal</div>
          <TonalSystem />
          <div style={{ marginTop: "1px", background: "var(--ko-orange)", padding: "var(--s-md) var(--s-xs)" }}>
            <span className="t-eyebrow" style={{ color: "var(--ko-surface)" }}>
              PRIMARY SIGNAL (ACTIVE / RETAINED / LIVE)
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* D & H. ASYMMETRIC GEOMETRY & EVIDENCE BLOCK */}
        <section className="dl-section">
          <div className="dl-section-label t-eyebrow">D & H. Asymmetric Geometry & Evidence Block</div>
          <EvidenceBlock 
            metric="120ms" 
            label="First Inference Latency" 
            detail="Using collaborative AR-diffusion cascade on the edge device." 
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* E. TECHNICAL ILLUSTRATION */}
        <section className="dl-section">
          <div className="dl-section-label t-eyebrow">E. Technical Illustration Specimen</div>
          <TechnicalIllustration />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* F. 2D TWO-TONE ICON SPECIMEN */}
        <section className="dl-section">
          <div className="dl-section-label t-eyebrow">F. 2D Two-Tone Icon Specimen</div>
          <div style={{ padding: "var(--s-lg)", background: "var(--ko-surface)", border: "1px solid var(--ko-constr)" }}>
            <IconSpecimen />
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* G. INTERACTIVE RESEARCH OBJECT */}
        <section className="dl-section" style={{ paddingBottom: "var(--s-2xl)" }}>
          <div className="dl-section-label t-eyebrow">G. Interactive Object (The court is the UI)</div>
          <InteractiveResearchObject />
        </section>

      </div>
    </div>
  );
}
