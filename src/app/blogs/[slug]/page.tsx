import React from "react";
import { KO, F } from "@/lib/knockout-tokens";
import { TopNav } from "@/components/knockout/navigation/TopNav";
import Link from "next/link";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

// This is a server component template for blogs
export default function BlogPost({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the blog data based on params.slug here
  // For the template, we use placeholder editorial content
  
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 var(--s-2xl)", paddingBottom: 160 }}>
      <TopNav />
      
      <main style={{ marginTop: 120 }}>
        {/* Back Link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: KO.textMute, marginBottom: 40, ...F.eyebrow(10) }}>
          <span style={{ transform: "rotate(180deg)" }}>
            <Icon2T name="arrow" size={14} primary={KO.textMute} secondary="transparent" />
          </span>
          BACK TO HOMEPAGE
        </Link>
        
        {/* Editorial Header */}
        <header style={{ marginBottom: 80, borderBottom: `1px solid ${KO.textGhost}`, paddingBottom: 40 }}>
          <div style={{ ...F.eyebrow(10), color: KO.accent, marginBottom: 16 }}>ENGINEERING & DESIGN</div>
          <h1 style={{ ...F.hero(56), color: KO.text, margin: 0, letterSpacing: "-1.5px", lineHeight: 1.1, maxWidth: 900 }}>
            Building SnapLite: Why the First Inference Takes So Long.
          </h1>
          
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            <div>
              <div style={{ ...F.eyebrow(9), color: KO.textMute, marginBottom: 4 }}>AUTHOR</div>
              <div style={{ ...F.body(14), color: KO.textDim }}>Anirudh Bocha</div>
            </div>
            <div>
              <div style={{ ...F.eyebrow(9), color: KO.textMute, marginBottom: 4 }}>PUBLISHED</div>
              <div style={{ ...F.body(14), color: KO.textDim }}>August 12, 2025</div>
            </div>
            <div>
              <div style={{ ...F.eyebrow(9), color: KO.textMute, marginBottom: 4 }}>READ TIME</div>
              <div style={{ ...F.body(14), color: KO.textDim }}>6 min</div>
            </div>
          </div>
        </header>

        {/* Content Grid (Academic Marginalia Layout) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
          
          {/* Main Reading Column (span 8) */}
          <article className="layout-col-8" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p style={{ ...F.sub(20), color: KO.text, lineHeight: 1.6, margin: 0 }}>
              When a machine learning model is deployed to an edge device, the primary metric is often steady-state latency. But in real-world voice assistants, the user doesn't care about steady-state; they care about the absolute wall-clock time between speaking and hearing a response.
            </p>
            
            <p style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.8, margin: 0 }}>
              This time-to-first-inference (TTFI) is notoriously difficult to optimize because it involves crossing the boundary between user-space application code, the ML runtime, and the GPU/NPU driver. When I started working on SnapLite at Samsung, our TTFI for production models was hovering around 1.2 seconds.
            </p>
            
            <h2 style={{ ...F.head(24), color: KO.text, margin: "24px 0 0 0" }}>The Caching Problem</h2>
            
            <p style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.8, margin: 0 }}>
              The naive solution is to cache the compiled model graph. However, cache validity on edge devices is highly fragile. If the OS silently updates the GPU driver overnight, your cached binary is no longer valid, and attempting to load it will cause a catastrophic fault. 
            </p>

            {/* Example Blockquote */}
            <blockquote style={{ margin: "24px 0", paddingLeft: 24, borderLeft: `2px solid ${KO.accent}` }}>
              <p style={{ ...F.body(18), color: KO.text, fontStyle: "italic", margin: 0 }}>
                "We had to build a provenance tracking system that bound the cache validity directly to the hardware driver signature, not just the model weights."
              </p>
            </blockquote>

            <p style={{ ...F.body(16), color: KO.textDim, lineHeight: 1.8, margin: 0 }}>
              By implementing a deterministic caching strategy and aggressively parallelizing the graph compilation during the application boot sequence, we were able to drop the TTFI to 120ms, rendering the latency virtually imperceptible to human users.
            </p>
          </article>
          
          {/* Marginalia / Sidenotes Column (span 4) */}
          <aside className="layout-col-4" style={{ paddingLeft: 32 }}>
            <div style={{ position: "sticky", top: 120, display: "flex", flexDirection: "column", gap: 40 }}>
              
              {/* Sidenote 1 */}
              <div>
                <div style={{ ...F.eyebrow(9), color: KO.accent, marginBottom: 8 }}>FIGURE 1</div>
                <div style={{ width: "100%", height: 160, background: KO.surface, border: `1px solid ${KO.textGhost}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                   {/* Placeholder for small charts/graphs */}
                   <span style={{ ...F.eyebrow(10), color: KO.textMute }}>TTFI DISTRIBUTION</span>
                </div>
                <div style={{ ...F.body(12), color: KO.textMute, lineHeight: 1.5 }}>
                  The long tail of initialization latency was primarily dominated by driver negotiation, not weight loading.
                </div>
              </div>
              
              {/* Sidenote 2 */}
              <div style={{ borderTop: `1px solid ${KO.textGhost}`, paddingTop: 24 }}>
                <div style={{ ...F.eyebrow(9), color: KO.textMute, marginBottom: 8 }}>REFERENCE</div>
                <div style={{ ...F.body(12), color: KO.textDim, lineHeight: 1.5 }}>
                  <a href="#" style={{ color: KO.text, textDecoration: "underline" }}>TFLite GPU Delegate Documentation</a> (2024). Details the implicit compilation overheads during context creation.
                </div>
              </div>

            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
}
