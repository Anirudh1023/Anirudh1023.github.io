"use client";

import React, { useState } from "react";
import { KO } from "@/lib/knockout-tokens";
import { siteContent } from "@/content/site";
import { ResearchArticleModal } from "@/components/research/ArticleModal/ResearchArticleModal";
import { AnimatePresence, motion } from "framer-motion";
import { Icon2T } from "@/components/knockout/icons/Icons2T";

const TOOLTIPS: Record<string, string> = {
  "MATLAB": "A proprietary multi-paradigm programming language and numeric computing environment widely used in academia.",
  "PyQt5": "A comprehensive set of Python bindings for the Qt v5 application framework, used to build the GUI.",
  "SciPy": "An open-source Python library used for scientific computing and technical computing.",
  "LibROSA": "A Python package for music and audio analysis.",
  "zero-time windowing spectrograms": "A technique for producing spectrograms with extremely high temporal resolution.",
  "spectral flatness": "A measure used in digital signal processing to characterize an audio spectrum.",
  "S-transform": "A time-frequency analysis technique similar to the Short-Time Fourier Transform but with a frequency-dependent window.",
  "Constant-Q": "A transform that spaces frequency bins logarithmically, closely mirroring human hearing.",
  "formant": "A concentration of acoustic energy around a particular frequency in the speech wave.",
  "pitch": "The fundamental frequency of the speech signal, corresponding to perceived vocal pitch.",
  "Gammatone": "A filter bank model designed to approximate the frequency filtering performed by the human ear.",
  "voice activity detection": "An algorithm used to detect the presence or absence of human speech in an audio segment.",

  "EMA": "Exponential Moving Average — used here to track blockwise quantization scales smoothly over training steps.",
  "DMA": "Direct Memory Access — allows the NPU to fetch tensor data independently of the CPU.",

  "zeroth-order optimization": "Optimization techniques that estimate gradients using only forward evaluations rather than analytical backpropagation.",
  "Rademacher perturbation": "Perturbing weights using random signs (+1 or -1), which allows the perturbation to be applied using efficient bit-level operations.",
  "low-rank subspace": "A smaller, lower-dimensional representational space that constrains the optimization search space.",
  "SVD": "Singular Value Decomposition — a mathematical method used here to identify the most important directions for the subspace.",
  "Qwen3-0.6B": "A 0.6 billion parameter causal language model from the Qwen3 family.",
  "FZOO": "Forward-only Zeroth-Order Optimization — an estimator using one-sided perturbations.",
  "P-GAP": "A subspace identification method that builds a basis from historical gradients or activations.",
  "adaptive-N": "A controller that dynamically adjusts the number of forward evaluations (N) based on step difficulty.",
  "SST-2": "Stanford Sentiment Treebank — a standard benchmark dataset for binary sentiment classification.",
  "block power iteration": "A batched iterative algorithm for subspace refresh that is highly efficient on hardware accelerators.",

  "LayerNorm": "A technique to normalize the activations of a neural network layer, stabilizing training.",
  "RMSNorm": "Root Mean Square Normalization, a computationally cheaper alternative to LayerNorm.",
  "Qwen3": "A family of foundation models; in this context, referring to causal language models in the Qwen3 class.",
  "FlashAttention": "An algorithm that speeds up attention computation and reduces its memory footprint.",
  "QNN": "Qualcomm Neural Network library, an SDK for executing ML workloads on Snapdragon hardware.",
  "checkpointing": "Saving intermediate activations during the forward pass to save memory, recomputing the rest during the backward pass.",
  "selective recomputation": "Strategically recomputing only specific operations during the backward pass to balance memory and compute.",
  "memory-mapped storage": "Mapping files or devices into memory to handle large tensors without loading them entirely into RAM.",
  "prefill": "The initial phase of LLM generation where the entire input prompt is processed in parallel.",
  "backpropagation": "The algorithm used to calculate gradients of the loss function with respect to the model's weights.",
  "Progressive LoRA": "A technique to dynamically adjust the computational budget of LoRA training based on runtime conditions.",
  "SIMD": "Single Instruction, Multiple Data — hardware instructions that perform the same operation on multiple data points simultaneously.",
  "BLAS": "Basic Linear Algebra Subprograms — a specification for low-level vector and matrix math routines.",
  "ARM": "A family of RISC instruction set architectures widely used in mobile processors.",
  "AVX2": "Advanced Vector Extensions 2 — an extension to the x86 instruction set for SIMD operations.",
  "ggml": "A tensor library designed for ML inference on commodity hardware.",
  "KleidiAI": "ARM's suite of AI technology for optimized execution on ARM architecture.",
  "QINT4": "A 4-bit integer quantization format.",


  "Q4_0": "Blockwise 4-bit weight quantization format used by the deployment model.",
  "QAT": "Quantization-aware training: training while modeling the quantization behavior used at deployment.",
  "quantization-aware training": "Quantization-aware training: training while modeling the quantization behavior used at deployment.",
  "LoRA": "Low-Rank Adaptation: fine-tuning a small set of trainable low-rank parameters while keeping the base model fixed.",
  "multi-batch training": "Training with batch sizes > 1 to amortize weight-loading costs.",
  "NPU": "Neural Processing Unit — a hardware accelerator specialized for ML computation on mobile devices.",
  "CPU–NPU synchronization": "The overhead of coordinating execution and data transfer between the CPU and NPU.",
  "asynchronous execution": "Submitting layers to the accelerator without blocking the CPU, masking dispatch latency.",
  "accelerator-resident data": "Keeping intermediate activations on the NPU to avoid costly transfers back to the CPU.",

  "speculative decoding": "A decoding method where a smaller model proposes tokens that a larger model verifies.",
  "cross-vocabulary": "Mapping tokens or text across models that do not share the same tokenizer.",
  "greedy decoding": "Selecting the single most probable token at each step.",
  "LiteRT": "Google's on-device inference runtime used here as the common execution path across accelerator backends.",
  "HMX": "Qualcomm Hexagon matrix accelerator used for high-throughput matrix computation.",
  "HVX": "Qualcomm Hexagon vector processing architecture.",

  "SnapLite": "Samsung's on-device AI deployment runtime orchestration layer.",
  "TensorFlow Lite": "An open-source deep learning framework for on-device inference.",
  "TFLite": "An open-source deep learning framework for on-device inference.",
  "delegate": "A software abstraction that delegates subgraph execution to a specific hardware accelerator.",
  "graph partitioning": "Dividing a neural network graph so different subgraphs run on different hardware backends.",
  "compiled artifact": "A cached, hardware-specific binary representing a compiled model.",
  "cache": "Stored deployment artifacts that bypass recompilation across runs.",
  "quantization": "Reducing numerical precision to improve speed and memory footprint.",
  "fallback": "Routing unsupported operations from an accelerator back to the CPU to ensure execution succeeds.",
  "NEON": "ARM's Advanced SIMD architecture for accelerating multimedia and signal processing.",
  "accelerator": "Specialized hardware (like GPUs or NPUs) designed to accelerate ML execution.",
  "CPU": "Central Processing Unit — handles general-purpose execution and fallback.",
  "GPU": "Graphics Processing Unit — used here for heavily parallelized, compiled delegate execution.",
  "FastRPC": "RPC mechanism used to coordinate host and DSP-side execution on Qualcomm platforms.",
  "VTCM": "Fast on-chip memory available to the Hexagon accelerator.",
  "ggml-hexagon": "The Hexagon backend for the ggml tensor library.",
  "HuBERT": "Self-supervised speech representation model.",
  "Wav2Vec2.0": "Self-supervised speech representation model.",
  "WavLM": "Self-supervised speech representation model.",
  "TERA": "Self-supervised speech representation model.",
  "MFCC": "Mel-frequency cepstral coefficients, a traditional compact representation of speech acoustics.",
  "SFCC": "Subband-based cepstral representation used here to retain more acoustic information in whispered/noisy speech.",
  "IIITH-TISA": "10-hour Indian-English stuttered-speech corpus.",
  "NNTrainer": "Samsung's open-source on-device Gen AI runtime.",

  
  "tokenizer": "A system that converts raw text into a sequence of discrete token IDs for model processing.",
  "KV cache": "Key-Value cache — stored intermediate states from past tokens, allowing the model to avoid recomputing previous context.",
  "KV-cache reuse": "Transferring or retaining KV states to avoid costly prefill computation.",
  "draft model": "The smaller, faster model that proposes candidate tokens.",
  "target model": "The larger, more capable model that verifies proposed tokens.",
  "candidate sequence": "The sequence of tokens proposed by the draft model.",
  "direct token mapping": "A static 1:1 translation for tokens that exist identically in both vocabularies.",
  "n-gram merge cache": "A dynamic cache that stores translations for multi-token sequences.",
  "LinUCB": "A contextual bandit algorithm used to select when to enable speculative drafting.",
  "contextual bandit": "A learning framework that balances exploration and exploitation based on context features.",
  "reverse KL": "Reverse Kullback-Leibler divergence — an alignment objective used during drafter training.",
  "forward KL": "Forward Kullback-Leibler divergence — a loss objective matching draft distributions to the target.",
  "server compute": "The total amount of GPU execution time required on the server side.",
  "verification": "The operation where the target model evaluates all draft tokens in a single forward pass."
};

function renderTextWithTooltips(text: string) {
  const keys = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    const key = keys.find(k => k.toLowerCase() === part.toLowerCase());
    if (key) {
      return <Tooltip key={i} content={TOOLTIPS[key]}>{part}</Tooltip>;
    }
    return <span key={i}>{part}</span>;
  });
}

function renderFormattedText(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...renderTextWithTooltips(text.substring(lastIndex, match.index)));
    }
    parts.push(
      <a key={`link-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ color: KO.text, textDecoration: "underline", textDecorationColor: KO.accent }}>
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < text.length) {
    parts.push(...renderTextWithTooltips(text.substring(lastIndex)));
  }
  
  return parts;
}

function Tooltip({ children, content }: { children: React.ReactNode, content: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
      style={{ position: "relative", cursor: "help", borderBottom: `2px dotted ${KO.accent}` }}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            style={{
              position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
              marginBottom: 10, padding: "12px 16px", background: KO.surface, border: `1px solid ${KO.border}`,
              borderRadius: 12, fontSize: "0.8rem", color: KO.text, width: 240, zIndex: 100,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)", pointerEvents: "none",
              fontWeight: 400, letterSpacing: 0, lineHeight: 1.5, whiteSpace: "normal"
            }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ 
      fontSize: "0.7rem", 
      padding: "2px 8px", 
      borderRadius: 6, 
      background: "rgba(255, 128, 0, 0.08)", 
      color: KO.accent, 
      border: `1px solid rgba(255, 128, 0, 0.15)`,
      fontWeight: 600,
      letterSpacing: "0.5px",
      display: "inline-block"
    }}>
      {children}
    </span>
  );
}

function ProjectCard({ proj, isFeatured, onClick }: { proj: any, isFeatured?: boolean, onClick: () => void }) {
  const hasArticle = proj.article && proj.article.sections && proj.article.sections.length > 0;
  return (
    <div 
      onClick={hasArticle ? onClick : undefined}
      style={{ 
        padding: isFeatured ? "24px 20px" : "16px",
        borderRadius: 16,
        cursor: hasArticle ? "pointer" : "default",
        transition: "background 0.2s",
        marginLeft: isFeatured ? -20 : -16,
        marginRight: isFeatured ? -20 : -16,
        background: isFeatured ? KO.surface : "transparent",
        border: isFeatured ? `1px solid ${KO.border}` : "1px solid transparent",
        marginBottom: 16
      }}
      onMouseOver={(e) => { e.currentTarget.style.background = KO.surface; e.currentTarget.style.borderColor = KO.border; }}
      onMouseOut={(e) => { 
        e.currentTarget.style.background = isFeatured ? KO.surface : "transparent"; 
        e.currentTarget.style.borderColor = isFeatured ? KO.border : "transparent"; 
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: isFeatured ? 12 : 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: KO.textMute }}>{proj.number}</div>
        <h3 style={{ fontSize: isFeatured ? "1.15rem" : "1rem", fontWeight: 700, margin: 0, color: KO.text }}>
          {proj.title}
        </h3>
        {proj.category && <Badge>{proj.category}</Badge>}
      </div>

      {proj.metadata && (
        <div style={{ fontSize: "0.75rem", color: KO.textMute, fontWeight: 500, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {Array.isArray(proj.metadata) ? proj.metadata.join(" · ") : proj.metadata}
        </div>
      )}

      {proj.result && (
        <div style={{ marginBottom: 12 }}>
          <Badge>{proj.result}</Badge>
        </div>
      )}

      {proj.heroQuestion && (
        <p style={{ fontSize: "0.95rem", fontWeight: 600, color: KO.text, margin: "0 0 12px 0", lineHeight: 1.5 }}>
          {renderFormattedText(proj.heroQuestion)}
        </p>
      )}

      <p style={{ fontSize: "0.9rem", color: KO.textDim, lineHeight: 1.6, margin: hasArticle || proj.metrics || proj.link ? "0 0 16px 0" : 0 }}>
        {renderFormattedText(proj.homepageSummary || proj.teaser)}
      </p>

      {proj.metrics && proj.metrics.length > 0 && (
        <div style={{ display: "flex", gap: 24, marginBottom: hasArticle ? 16 : 0, flexWrap: "wrap" }}>
          {proj.metrics.map((m: any, idx: number) => (
            <div key={idx}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: KO.text }}>{m.value}</div>
              <div style={{ fontSize: "0.7rem", color: KO.textMute, textTransform: "uppercase", letterSpacing: "0.5px" }}>{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {hasArticle && (
          <div style={{ fontSize: "0.85rem", color: KO.accent, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
            Read Notes <Icon2T name="arrow" size={10} primary={KO.accent} secondary="transparent" style={{ transform: "rotate(90deg)" }} />
          </div>
        )}
        {proj.codeLink && (
          <a href={proj.codeLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: KO.text, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }} onClick={(e) => e.stopPropagation()}>
            Source Code <Icon2T name="arrow" size={10} primary={KO.text} secondary="transparent" style={{ transform: "rotate(45deg)" }} />
          </a>
        )}
        {proj.link && (
          <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: KO.accent, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }} onClick={(e) => e.stopPropagation()}>
            Read Paper PDF <Icon2T name="arrow" size={10} primary={KO.accent} secondary="transparent" style={{ transform: "rotate(45deg)" }} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const activeArticleData = 
    siteContent.featuredResearch.find(p => p.id === activeModalId) ||
    siteContent.systemsDeployment.find(w => w.id === activeModalId) ||
    siteContent.researchFoundations.find(w => w.id === activeModalId) ||
    siteContent.engineeringLeadership.find(w => w.id === activeModalId) ||
    null;

  return (
    <main style={{ minHeight: "100vh", background: KO.bgPrimary, color: KO.text, overflow: activeModalId ? "hidden" : "auto", fontFamily: "'Satoshi-Variable', 'Satoshi', sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 24px 32px 24px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 32 }}>
          <a href={siteContent.identity.links.cv} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>CV</a>
          <a href={siteContent.identity.links.github} target="_blank" style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>GitHub</a>
          <a href={siteContent.identity.links.email} style={{ color: KO.textDim, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = KO.text} onMouseOut={e => e.currentTarget.style.color = KO.textDim}>Email</a>
        </div>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px", paddingBottom: 120, display: "flex", gap: 80, alignItems: "flex-start" }}>
        
        {/* MAIN CONTENT */}
        <div style={{ flex: 1, maxWidth: 680 }}>
          
          {/* HERO */}
          <section id="hello" style={{ marginBottom: 64, paddingTop: 16 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, overflow: "hidden", flexShrink: 0, border: `1px solid ${KO.border}` }}>
                <img src="/profile.jpg" alt="Anirudh Bocha" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "1px", color: KO.accent, marginBottom: 8 }}>
                  {siteContent.identity.heroEyebrow}
                </div>
                <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-0.5px", color: KO.text }}>
                  {siteContent.identity.heroHeadline}
                </h1>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {siteContent.identity.heroParagraphs.map((p, i) => (
                    <p key={i} style={{ fontSize: "0.95rem", color: KO.text, lineHeight: 1.6, margin: 0 }}>
                      {renderFormattedText(p)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED RESEARCH */}
          <section id="featured-research" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 24px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, color: KO.text }}>
              Featured Research
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {siteContent.featuredResearch.map(proj => (
                <ProjectCard key={proj.id} proj={proj} isFeatured={true} onClick={() => setActiveModalId(proj.id)} />
              ))}
            </div>
          </section>

          {/* SYSTEMS & DEPLOYMENT */}
          <section id="systems" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 24px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, color: KO.text }}>
              Systems & Deployment
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {siteContent.systemsDeployment.map(proj => (
                <ProjectCard key={proj.id} proj={proj} isFeatured={true} onClick={() => setActiveModalId(proj.id)} />
              ))}
            </div>
          </section>

          {/* RESEARCH FOUNDATIONS */}
          <section id="foundations" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 24px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, color: KO.text }}>
              Research Foundations
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {siteContent.researchFoundations.map(proj => (
                <ProjectCard key={proj.id} proj={proj} onClick={() => setActiveModalId(proj.id)} />
              ))}
            </div>
          </section>

          {/* ENGINEERING & LEADERSHIP */}
          <section id="engineering" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 24px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, color: KO.text }}>
              Engineering & Leadership
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {siteContent.engineeringLeadership.map(proj => (
                <ProjectCard key={proj.id} proj={proj} onClick={() => setActiveModalId(proj.id)} />
              ))}
            </div>
          </section>

          {/* EXPERIENCE (Timeline) */}
          <section id="experience" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 24px 0", borderBottom: `1px solid ${KO.border}`, paddingBottom: 12, color: KO.text }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingLeft: 12 }}>
              {siteContent.experience.map((exp, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", paddingLeft: 20 }}>
                  
                  {/* Timeline continuous line */}
                  {i !== siteContent.experience.length - 1 && (
                    <div style={{ position: "absolute", left: 3, top: 16, bottom: -24, width: 2, background: KO.border }} />
                  )}
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: 0, top: 6, width: 8, height: 8, borderRadius: "50%", background: KO.bgPrimary, border: `2px solid ${KO.accent}` }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: KO.text }}>{exp.org}</div>
                    <div style={{ fontSize: "0.8rem", color: KO.textDim, fontWeight: 500 }}>{exp.dates}</div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: KO.textDim, fontWeight: 500, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontSize: "0.9rem", color: KO.text, lineHeight: 1.5 }}>
                    {renderFormattedText(exp.desc)}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT VERTICAL NAV */}
        <div className="mobile-hide" style={{ width: 180, position: "sticky", top: 120 }}>
          <div style={{
            padding: "20px 24px",
            background: "rgba(247, 238, 228, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 20,
            border: `1px solid ${KO.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1.5px", color: KO.textDim, textTransform: "uppercase" }}>CONTENTS</div>
            <a href="#hello" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Hello</a>
            <a href="#featured-research" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Featured Research</a>
            <a href="#systems" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Systems & Deployment</a>
            <a href="#foundations" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Research Foundations</a>
            <a href="#engineering" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Engineering</a>
            <a href="#experience" style={{ color: KO.text, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Experience</a>
          </div>
        </div>

      </div>
      
      <AnimatePresence>
        {activeModalId && (
          <ResearchArticleModal 
            data={activeArticleData} 
            onClose={() => setActiveModalId(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
