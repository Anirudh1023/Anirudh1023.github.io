"use client";

import React from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { ResearchNav } from "@/components/knockout/navigation/ResearchNav";
import { TopNav } from "@/components/knockout/navigation/TopNav";
import { SelectedOutputs, Experience } from "@/components/research/About/OutputsAndExperience";
import { ZOCaseStudy } from "@/components/research/ResearchCanvas/ZOCaseStudy";
import { HybridCaseStudy } from "@/components/research/ResearchCanvas/HybridCaseStudy";
import { siteContent } from "@/content/site";
import { Icon2T } from "@/components/knockout/icons/Icons2T";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { identity, blogs, researchThread } = siteContent;
  const [showCV, setShowCV] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 var(--s-2xl)", paddingBottom: 160 }}>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%", background: KO.accent, position: "fixed", top: 0, left: 0, right: 0, height: 4, zIndex: 100000 }}
      />

      {/* 12-column Grid Container */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>

        <TopNav />

        {/* ================================================================== */}
        {/* HERO (#home) */}
        {/* ================================================================== */}
        <section id="home" className="animate-fade-up" style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "65vh", paddingTop: 80, paddingBottom: 80, animationDelay: "100ms" }}>

          <h1 style={{ ...F.hero(72), color: KO.text, margin: 0, letterSpacing: "-1.5px", lineHeight: 1, maxWidth: 900 }}>
            {identity.name}
          </h1>

          <p style={{ ...F.sub(24), color: KO.text, marginTop: 40, marginBottom: 24, lineHeight: 1.4, maxWidth: 800 }}>
            {identity.heroHeadline}
          </p>

          <p style={{ ...F.body(16), color: KO.textDim, maxWidth: 650, lineHeight: 1.6, marginBottom: 48 }}>
            {identity.heroStatement}
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: 16 }}>
            <a href="#work" style={{ ...F.btn(11), color: KO.text, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: `1px solid ${KO.textGhost}`, borderRadius: 99, background: KO.surface }}>
              SCROLL TO WORK <span style={{ transform: "rotate(90deg)" }}><Icon2T name="arrow" size={12} primary={KO.accent} secondary="transparent" /></span>
            </a>
            <button onClick={() => setShowCV(true)} style={{ ...F.btn(11), color: KO.surface, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: `none`, borderRadius: 99, background: KO.accent, cursor: "pointer" }}>
              VIEW CV
            </button>
          </div>

          <div style={{ marginTop: 80, borderTop: `1px solid ${KO.textGhost}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ ...F.eyebrow(10), color: KO.textMute, marginBottom: 8 }}>CURRENTLY</div>
            <a href="#zo" style={{ ...F.sub(16), color: KO.text, textDecoration: "none", display: "flex", gap: 16 }}>
              <span style={{ color: KO.textMute }}>01</span> On-device subspace-restricted zeroth-order LLM adaptation
            </a>
            <a href="#hybrid" style={{ ...F.sub(16), color: KO.text, textDecoration: "none", display: "flex", gap: 16 }}>
              <span style={{ color: KO.textMute }}>02</span> Collaborative foundation-model inference
            </a>
          </div>
        </section>

        {/* ================================================================== */}
        {/* WORK (#work) */}
        {/* ================================================================== */}
        <section id="work" style={{ gridColumn: "1 / -1", paddingTop: 100 }}>
          <div className="animate-fade-up" style={{ gridColumn: "1 / -1", marginBottom: 80, animationDelay: "300ms" }}>
            <h2 style={{ ...F.head(28), color: KO.text, margin: 0 }}>CURRENT WORK</h2>
            <p style={{ ...F.body(16), color: KO.textMute, marginTop: 8 }}>
              Two current investigations at Samsung Research that extend the same question into optimization and inference.
            </p>
          </div>

          <div id="zo" className="animate-fade-up" style={{ marginBottom: 120, animationDelay: "400ms" }}>
            <ZOCaseStudy />
          </div>

          <div id="hybrid" className="animate-fade-up" style={{ marginBottom: 120, animationDelay: "500ms" }}>
            <HybridCaseStudy />
          </div>

          <div className="animate-fade-up" style={{ marginBottom: 60, animationDelay: "600ms", borderTop: `1px solid ${KO.textGhost}`, paddingTop: 80 }}>
            <h2 style={{ ...F.head(28), color: KO.text, margin: 0, marginBottom: 8 }}>OTHER WORK</h2>
            <div style={{ ...F.sub(20), color: KO.textDim, maxWidth: 800, marginTop: 16 }}>
              {siteContent.researchThread.question}
            </div>
          </div>

          <div className="animate-fade-up" style={{ display: "flex", flexDirection: "column", animationDelay: "700ms" }}>
            {siteContent.researchThread.questions?.map((q, i) => (
              <ResearchQuestionRow key={i} data={q} />
            ))}
          </div>
        </section>

        {/* BLOGS */}
        <div style={{ gridColumn: "1 / -1", marginBottom: 80 }}>
          <h2 style={{ ...F.head(24), color: KO.text, margin: 0, marginBottom: 16 }}>BLOGS</h2>
          <p style={{ ...F.body(16), color: KO.textMute, marginBottom: 40, maxWidth: 700 }}>
            Informal writing and documentation.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-md)" }}>
            {blogs.map((blog, i) => (
              <a key={i} href={blog.link} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--s-md)", padding: "24px 0", borderBottom: `1px solid ${KO.textGhost}`, textDecoration: "none" }}>
                <div>
                  <div style={{ ...F.head(18), color: KO.text, marginBottom: 8 }}>{blog.title}</div>
                  <div style={{ ...F.body(14), color: KO.textDim }}>{blog.date}</div>
                </div>
                <div style={{ alignSelf: "center", color: KO.textDim }}>
                  <Icon2T name="arrow" size={16} primary={KO.textDim} secondary={KO.textGhost} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* OUTPUTS & EXPERIENCE */}
        {/* ================================================================== */}
        <section className="animate-fade-up" style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24, paddingTop: 80, animationDelay: "800ms" }}>
          <div className="layout-col-7">
            <h2 style={{ ...F.head(24), color: KO.text, margin: 0, marginBottom: 32 }}>SELECTED OUTPUTS</h2>
            <SelectedOutputs />
          </div>
          <div className="layout-col-5">
            <h2 style={{ ...F.head(24), color: KO.text, margin: 0, marginBottom: 32 }}>EXPERIENCE</h2>
            <Experience />
          </div>
        </section>

        {/* ================================================================== */}
        {/* MASSIVE FOOTER / GET IN TOUCH */}
        {/* ================================================================== */}
        <section id="about" className="animate-fade-up" style={{ gridColumn: "1 / -1", paddingTop: 160, paddingBottom: 160, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", animationDelay: "900ms" }}>

          <div style={{ width: 120, height: 120, borderRadius: 40, overflow: "hidden", marginBottom: 40, border: `1px solid ${KO.textGhost}`, boxShadow: "0 24px 48px rgba(0,0,0,0.1)" }}>
            <img src="/profile.jpg" alt="Anirudh Bocha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <h2 style={{ ...F.hero(80), color: KO.text, margin: 0, letterSpacing: "-3px", lineHeight: 1 }}>CONTACT.</h2>
          <p style={{ ...F.sub(20), color: KO.textDim, maxWidth: 650, marginTop: 24, marginBottom: 48, lineHeight: 1.5 }}>
            I am a machine learning engineer at Samsung Research, building systems where computation is a runtime decision. I am currently seeking opportunities to study the principles of hardware-aware ML optimization. If you are building intelligent systems or researching runtimes, I would be glad to connect.
          </p>

          <div className="responsive-flex-stack" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href={identity.links.email} style={{ ...F.btn(14), color: KO.surface, background: KO.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 99 }}>
              <Icon2T name="arrow" size={20} primary={KO.surface} secondary="transparent" /> EMAIL ME
            </a>
            <button onClick={() => setShowCV(true)} style={{ ...F.btn(14), color: KO.text, background: KO.surface, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", border: `1px solid ${KO.textGhost}`, borderRadius: 99, cursor: "pointer" }}>
              VIEW CV
            </button>
            <a href={identity.links.github} target="_blank" style={{ ...F.btn(14), color: KO.text, background: "transparent", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", border: `1px solid ${KO.textGhost}`, borderRadius: 99 }}>
              GITHUB
            </a>
          </div>
        </section>

      </div>
      <ResearchNav />

      {/* CV Modal */}
      <AnimatePresence>
        {showCV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          >
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }} onClick={() => setShowCV(false)} />
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              style={{ position: "relative", background: KO.surface, borderRadius: 24, padding: 16, maxWidth: 1000, width: "100%", height: "90vh", overflow: "hidden", border: `1px solid ${KO.textGhost}`, boxShadow: "0 24px 64px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "0 16px" }}>
                <div style={{ ...F.head(20), color: KO.text }}>Curriculum Vitae</div>
                <button onClick={() => setShowCV(false)} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: KO.textMute }}>×</button>
              </div>
              <iframe src="/resume.pdf" style={{ width: "100%", flex: 1, border: "none", borderRadius: 12 }} title="CV" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function ResearchQuestionRow({ data }: any) {
  const [hover, setHover] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "32px 0",
        borderBottom: `1px solid ${KO.textGhost}`,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.2, 1, 0.3, 1)"
      }}
    >
      <div className="question-grid">
        <div style={{ ...F.num(14), color: hover ? KO.accent : KO.textMute, transition: "color 0.2s ease", marginTop: 4 }}>
          {data.num}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
            <div style={{ ...F.head(22), color: KO.text, letterSpacing: "-0.5px", marginBottom: 12, transform: hover && !expanded ? "translateX(4px)" : "none", transition: "transform 0.2s ease" }}>
              {data.question}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {data.result && (
                <div style={{ ...F.eyebrow(10), color: KO.accent, background: `${KO.accent}15`, padding: "4px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>
                  {data.result}
                </div>
              )}
              <div style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                <Icon2T name="arrow" size={16} primary={hover ? KO.accent : KO.textGhost} secondary={KO.textGhost} />
              </div>
            </div>
          </div>

          <div style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.5, maxWidth: 800, transform: hover && !expanded ? "translateX(4px)" : "none", transition: "transform 0.2s ease", marginBottom: 4 }}>
            {data.work}
          </div>
          <div style={{ ...F.body(15), color: KO.textMute, lineHeight: 1.5, maxWidth: 800, transform: hover && !expanded ? "translateX(4px)" : "none", transition: "transform 0.2s ease" }}>
            {data.thesis}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && data.detail && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ 
              marginLeft: 92,
              padding: 24,
              background: KO.surface,
              borderRadius: 12,
              border: `1px solid ${KO.textGhost}`,
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}>
              <p style={{ ...F.body(15), color: KO.textDim, lineHeight: 1.6, margin: 0 }}>
                {data.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

