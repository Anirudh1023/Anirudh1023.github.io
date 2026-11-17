// site.ts — research portfolio structured as a chronological research trajectory
// Contains claim-oriented titles, direct artifact links, TL;DR findings, and BibTeX citations.

export interface ArtifactLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface ResearchProject {
  id: string;
  title: string;
  articleTitle: string;
  year: string;
  tags: string[];
  category: string;
  claim: string;
  metricsHighlight?: string;
  status: string;
  statusDetail: string;
  link?: string;
  codeLink?: string;
  metadata: string[];
  artifacts: ArtifactLink[];
  tldr: string[];
  bibtex?: string;
  article: {
    intro: string;
    sections: any[];
  };
}

export const siteContent = {
  identity: {
    name: "Anirudh Bocha",
    affiliation: "Machine Learning Engineer · Samsung Research India",
    heroParagraphs: [
      "I work on efficient machine learning across representations, learning algorithms, and computational systems. My research spans speech representation learning, resource-constrained language-model adaptation, alternative optimization, and generation across heterogeneous models and hardware.",
      "Beginning with speech research at IIIT Hyderabad, I moved into resource-constrained LLM training and heterogeneous execution at Samsung Research, then into hybrid generation across device and server. My current work extends these questions to active multimodal reasoning."
    ],
    links: {
      email: "mailto:anirudhnarayana7@gmail.com",
      github: "https://github.com/Anirudh1023",
      scholar: "https://scholar.google.com/citations?user=AnirudhBocha",
      cv: "/resume.pdf",
      linkedin: "https://www.linkedin.com/in/anirudh-bocha/"
    }
  },

  // ── CHRONOLOGICAL RESEARCH TRAJECTORY ───────────────────────────────────────
  projects: [
    {
      id: "wesper",
      title: "Richer Spectral Targets Improve Whispered-Speech Reconstruction",
      articleTitle: "Spectral Representations for Whispered Speech Conversion",
      year: "2023\u20132024",
      tags: ["REPRESENTATIONS", "SPEECH"],
      category: "representations",
      claim: "Replacing MFCC training targets with subband SFCC in HuBERT-based whispered speech conversion yields 10\u201325% quality gains at low SNR without increasing model capacity.",
      metricsHighlight: "10\u201325% gain at low SNR",
      status: "",
      statusDetail: "IIIT Hyderabad",
      metadata: ["IIIT Hyderabad", "Speech Processing Lab"],
      artifacts: [{"label": "Project notes", "url": "/projects/wesper"}],
      tldr: ["Whispered speech lacks periodic voicing, causing conventional MFCC features to discard critical spectral detail.", "Subband Frequency Cepstral Coefficients (SFCC) retain richer acoustic information under low signal-to-noise ratios.", "Smoothing and component selection make the higher-dimensional representation stable for downstream synthesis.", "Demonstrates that altering the representation a model receives can outperform expanding model capacity."],
      article: {
          intro: "I reproduced WESPER, a whispered-to-normal speech conversion system built on HuBERT, and replaced its MFCC training targets with SFCC to retain richer information from whispered and noisy speech. Smoothing and component selection made the higher-dimensional representation practical, improving results by 10–25% at low SNR without increasing model capacity.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "Can replacing the acoustic representation targets in a whispered-speech conversion system improve low-SNR performance without increasing model capacity?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "Whispered speech lacks the voiced periodicity that MFCC features are designed to capture. SFCC (subband-based cepstral coefficients) retain more information from whispered and noisy conditions, but their higher dimensionality requires careful treatment to remain practical as training targets."
            },
            {
              type: "heading",
              content: "Method"
            },
            {
              type: "paragraph",
              content: "Starting from the WESPER baseline (HuBERT encoder + downstream synthesis), I replaced MFCC targets with SFCC targets and applied smoothing and component selection to control dimensionality. The model architecture was unchanged."
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "paragraph",
              content: "SFCC targets improved conversion quality by 10–25% at low SNR relative to MFCC targets, without changing model capacity. The result showed that the choice of representation target can matter more than model size."
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "Independent reproduction and extension. I designed and ran all SFCC experiments and analysis as Honours research at IIIT Hyderabad under Prof. Anil Kumar Vuppala."
            }
          ]
        }
    },
    {
      id: "speech-reps",
      title: "HuBERT's Fifth Layer Outperforms Its Final Layer for Disfluency Detection",
      articleTitle: "Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach",
      year: "2023\u20132025",
      tags: ["REPRESENTATIONS", "SPEECH"],
      category: "representations",
      claim: "Evaluating intermediate representations shows that HuBERT's fifth layer reaches 0.97 F1 on disfluency classification, outperforming the model's final representation.",
      metricsHighlight: "0.97 F1 \u00b7 Interspeech 2025",
      status: "Published",
      statusDetail: "Interspeech 2025",
      link: "/publications/Interspeech.pdf",
      metadata: ["IIIT Hyderabad \u00b7 Interspeech 2025", "Co-authored with Prof. Anil Kumar Vuppala"],
      artifacts: [{"label": "Project notes", "url": "/projects/speech-reps"}, {"label": "Paper", "url": "/publications/Interspeech.pdf", "isExternal": true}],
      tldr: ["Downstream speech classification does not strictly benefit from deeper encoder layers.", "HuBERT's fifth layer reached a peak F1 of 0.97, outperforming its final layer for typical-vs-atypical disfluency classification.", "Early acoustic representations retain localized disfluency cues that later contextual layers wash out.", "Evaluated on IIITH-TISA, a 10-hour Indian-English stuttered-speech corpus containing 3,251 annotated clips."],
      bibtex: "@inproceedings{bocha2025disfluency,\n  title={Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach},\n  author={Bocha, Anirudh and Vuppala, Anil Kumar},\n  booktitle={Interspeech},\n  year={2025}\n}",
      article: {
          intro: "We studied whether the final representation of a self-supervised speech encoder is necessarily the most useful one for a downstream task. Evaluating layer-wise representations from Wav2Vec2.0, HuBERT, WavLM, and TERA, we found that HuBERT's fifth layer reached a peak F1 of 0.97 for typical-vs-atypical disfluency classification — outperforming the model's final representation. Later layers are not automatically more useful for every task.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "Does a self-supervised speech model's final layer produce the most discriminative representation for downstream classification tasks, or do intermediate layers contain more task-relevant information?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "Self-supervised speech models are typically used by extracting final-layer representations. For tasks like disfluency detection, which depend on localized acoustic features rather than global semantic content, this assumption may waste computation while discarding useful information."
            },
            {
              type: "heading",
              content: "Method"
            },
            {
              type: "paragraph",
              content: "We evaluated layer-wise representations from Wav2Vec2.0, HuBERT, WavLM, and TERA using downstream classifiers including SVMs and CNNs on the IIITH-TISA dataset — a 10-hour Indian-English stuttered-speech corpus containing recordings from 30 persons who stutter and 3,251 annotated clips, which I helped build."
            },
            {
              type: "figure",
              caption: "Layer-wise performance: Peak at Layer 5",
              visual: "speech-layers"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "paragraph",
              content: "HuBERT's fifth layer reached an F1 of 0.97, outperforming its final representation. The result showed that useful task information can emerge before the encoder's endpoint, and that selecting the appropriate layer matters more than simply using the deepest one."
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "I ran layer-wise extraction experiments across four model families, contributed to IIITH-TISA dataset construction, and was a co-author on the Interspeech 2025 submission. The work was collaborative with Prof. Anil Kumar Vuppala's Speech Processing Lab."
            },
            {
              type: "heading",
              content: "Artifacts"
            },
            {
              type: "paragraph",
              content: "Published at Interspeech 2025. Paper available at the link below."
            }
          ]
        }
    },
    {
      id: "snaplite",
      title: "A Unified Deployment Path for 200+ On-Device Models",
      articleTitle: "SnapLite: Heterogeneous On-Device Inference Runtime",
      year: "2024",
      tags: ["SYSTEMS", "INFERENCE", "HETEROGENEOUS"],
      category: "systems",
      claim: "Migrating Samsung's production on-device runtime to LiteRT unified CPU, GPU, and NPU execution while reducing representative GPU time-to-first-inference by 10\u00d7.",
      metricsHighlight: "10\u00d7 faster first inference \u00b7 LiteRT migration",
      status: "",
      statusDetail: "Samsung Research India \u00b7 Internship 2024",
      metadata: ["Samsung Research India \u00b7 Internship Jun\u2013Aug 2024"],
      artifacts: [{"label": "Project notes", "url": "/projects/snaplite"}],
      tldr: ["Production deployment was fragmented across disjoint CPU (TFLite), GPU, and NPU execution paths.", "Re-architected runtime around LiteRT while preserving custom Samsung GPU kernel optimizations and cache semantics.", "Automated compiled-artifact caching dropped first-inference latency by 10\u00d7 on GPU (1200ms \u2192 120ms) and 8.8\u00d7 on NPU.", "Heterogeneous graph partitioning provides automated CPU fallback for unsupported operator subgraphs."],
      article: {
          intro: "SnapLite is Samsung's on-device deployment runtime for more than 200 production vision, speech, and text models. During my internship, I worked on unifying CPU, GPU, and NPU deployment around a common LiteRT-based execution path, integrating CPU optimizations, maintaining model deployment artifacts and caches, and migrating the runtime from TensorFlow Lite 2.20 to LiteRT. The resulting changes reduced representative first-inference latency by 10× on GPU.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "How can a fragmented heterogeneous deployment runtime — with separate CPU, GPU, and NPU execution paths — be unified without losing accelerator-specific optimizations?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "Fragmented execution paths duplicated conversion logic, cache management, and fallback handling across backends. A unified path reduces maintenance burden and allows caching and artifact management to be shared."
            },
            {
              type: "heading",
              content: "My Work"
            },
            {
              type: "paragraph",
              content: "I helped unify CPU, GPU, and NPU deployment around LiteRT, integrated NEON/SIMD CPU matrix-multiplication kernels, maintained deployment artifacts and cache automation for 200+ models, and worked across model conversion, runtime dispatch, and fallback behavior."
            },
            {
              type: "figure",
              caption: "Fragmented vs Unified Architecture",
              visual: "snaplite-unified"
            },
            {
              type: "figure",
              caption: "TensorFlow Lite to LiteRT Migration",
              visual: "snaplite-migration"
            },
            {
              type: "heading",
              content: "Heterogeneous Graph Partitioning"
            },
            {
              type: "paragraph",
              content: "When a model targets an NPU but contains unsupported operations, the runtime must partition the graph, execute supported subgraphs on the accelerator, and fall back to the CPU for the remainder. I worked on the partitioning logic and fallback behavior."
            },
            {
              type: "figure",
              caption: "Backend-Specific Graph Partitioning",
              visual: "snaplite-partitioning"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "result-table",
              content: "GPU First Inference: 1200 ms → 120 ms (10×)\nNPU First Inference: 1320 ms → 150 ms (8.8×)\nMobileNetV3 (CPU) Memory: 920 MB → 280 MB\nYOLOv8n Latency: 24.0 ms → 11.0 ms (2.18×)"
            },
            {
              type: "figure",
              caption: "Cache-Enabled Startup Timeline",
              visual: "snaplite-cache"
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "Internship work. I worked across model conversion and debugging, CPU kernel integration, cache automation, and the LiteRT migration. SnapLite is a Samsung production system; my contribution was to these specific areas during the internship period."
            }
          ]
        }
    },
    {
      id: "waveform-wizard",
      title: "Waveform-Wizard: Speech Analysis and Visualization Platform",
      articleTitle: "Waveform-Wizard: Speech Analysis and Visualization Platform",
      year: "2025",
      tags: ["OPEN SOURCE", "TOOLING"],
      category: "open-source",
      claim: "Open-source Python speech analysis platform replacing laboratory MATLAB workflows with dynamically linked multi-file visualization panes; presented at ICASSP 2025 Show & Tell.",
      metricsHighlight: "ICASSP 2025 Show & Tell \u00b7 Open Source",
      status: "Show & Tell",
      statusDetail: "Presented \u2014 ICASSP 2025 Show & Tell",
      link: "/publications/Icassp_Show_and_tell.pdf",
      metadata: ["ICASSP 2025 Show & Tell", "Open-source speech analysis platform"],
      artifacts: [{"label": "Project notes", "url": "/projects/waveform-wizard"}, {"label": "Show & Tell PDF", "url": "/publications/Icassp_Show_and_tell.pdf", "isExternal": true}],
      tldr: ["Laboratory speech research previously relied on proprietary MATLAB toolboxes with fragmented single-view scripts.", "Rebuilt as a standalone Python suite incorporating zero-time windowing, S-transforms, pitch, and formant tracking.", "Features dynamically linked time-frequency analysis cursors and multi-file comparative overlays.", "Packaged for cross-platform Linux and Windows environments; presented at ICASSP 2025 Show & Tell."],
      bibtex: "@inproceedings{bocha2025waveform,\n  title={Waveform-Wizard: An Open-Source Speech Analysis and Visualization Platform},\n  author={Bocha, Anirudh and others},\n  booktitle={ICASSP Show & Tell},\n  year={2025}\n}",
      article: {
        intro: "I led a team of six undergraduates in building Waveform-Wizard, a Python-based replacement for the Speech Processing Lab's MATLAB speech-analysis workflow. The goal was to make the analysis stack easier to use, extend, and distribute without requiring a MATLAB license. We presented the tool at ICASSP 2025 Show & Tell. This is an open-source engineering project, not a primary research contribution.",
        sections: [
          {
            type: "heading",
            content: "What It Does"
          },
          {
            type: "paragraph",
            content: "Waveform-Wizard provides waveform analysis, zero-time windowing spectrograms, spectral flatness, S-transform, Constant-Q analysis, formant visualization, pitch analysis, Gammatone analysis, and voice activity detection in a unified application with dynamically linked analysis panes, multi-file comparison, and PDF/PNG/SVG export."
          },
          {
            type: "figure",
            caption: "Waveform-Wizard Interactive Dashboard",
            visual: "ww-dashboard"
          },
          {
            type: "heading",
            content: "Engineering"
          },
          {
            type: "paragraph",
            content: "Built with NumPy, SciPy, LibROSA, and PyQt5. Automated Windows and Ubuntu packaging. I led a team of six undergraduate researchers."
          },
          {
            type: "heading",
            content: "Venue"
          },
          {
            type: "paragraph",
            content: "Presented at ICASSP 2025 Show & Tell. This is a Show & Tell presentation, not a peer-reviewed paper."
          }
        ]
      }
    },
    {
      id: "nntrainer",
      title: "Memory-Efficient Causal LLM Fine-Tuning with Quantized LoRA",
      articleTitle: "On-Device LLM Personalization with NNTrainer",
      year: "2025\u20132026",
      tags: ["ADAPTATION", "QUANTIZATION", "SYSTEMS"],
      category: "adaptation",
      claim: "Quantization-aware LoRA training with EMA scale tracking and activation checkpointing reduces resident training memory of Qwen3-class models from ~3 GB to under 1 GB.",
      metricsHighlight: "~3 GB \u2192 <1 GB memory \u00b7 LoRA + QAT",
      status: "",
      statusDetail: "Samsung Research India \u00b7 2025",
      codeLink: "https://github.com/b-saianirud/nntrainer/tree/LoRA",
      metadata: ["Samsung Research India \u00b7 2025", "Open source: github.com/b-saianirud/nntrainer"],
      artifacts: [{"label": "Project notes", "url": "/projects/nntrainer"}, {"label": "Code", "url": "https://github.com/b-saianirud/nntrainer/tree/LoRA", "isExternal": true}, {"label": "NPU Co-execution", "url": "/projects/cpu-npu"}],
      tldr: ["Causal-LLM training on mobile devices is constrained by memory ceilings rather than pure compute throughput.", "Quantized Q4_0 execution through ggml and QINT4 through KleidiAI kernels keep frozen base weights compact.", "Quantization-aware training (QAT) with exponential moving average tracks blockwise scales during adaptation.", "Activation checkpointing, selective recomputation, and memory-mapping bring resident training footprint below 1 GB."],
      article: {
          intro: "NNTrainer is Samsung's open-source framework for on-device training and inference. I extended it toward causal-LLM fine-tuning on mobile devices, covering quantized model support, LoRA and QAT training, training memory reduction, and NPU execution. This page focuses on the adaptation work. The asynchronous CPU–NPU co-execution work that emerged from the same effort is documented separately.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "Can a Qwen3-class LLM be fine-tuned on a mobile device under its memory and compute constraints, and what does the full training stack need to change to make this practical?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "On-device personalization avoids sending user data to a server, but mobile devices impose strict memory ceilings. The training stack — not just the model — has to be redesigned to stay within those limits."
            },
            {
              type: "heading",
              content: "CPU Backend and Quantized Model Support"
            },
            {
              type: "paragraph",
              content: "I added optimized LayerNorm and RMSNorm implementations using SIMD and BLAS intrinsics, FP16 support across ARM and AVX2 targets, and NNTrainer-side support for Q4_0 quantized matrix multiplication through ggml kernels (ARM and AVX2) and QINT4 execution through KleidiAI kernels on ARM."
            },
            {
              type: "figure",
              caption: "CPU Backend Dispatch",
              visual: "nntrainer-cpu-dispatch"
            },
            {
              type: "heading",
              content: "Causal LM Training with LoRA"
            },
            {
              type: "paragraph",
              content: "I implemented forward and backward support for Qwen3-class causal language models, keeping the base model frozen while training low-rank LoRA adapters. I enabled multi-batch training and ran hyperparameter experiments to establish stable training behavior."
            },
            {
              type: "figure",
              caption: "Causal LM Training with Frozen Base",
              visual: "nntrainer-training-flow"
            },
            {
              type: "heading",
              content: "Quantization-Aware LoRA Training"
            },
            {
              type: "paragraph",
              content: "The base model stays in Q4_0 format; LoRA weights remain FP32. Because Q4_0 uses blockwise quantization, I used QAT with an exponential moving average to track and update blockwise quantization scales during training, so the adaptation learns the quantization behavior that will exist at deployment."
            },
            {
              type: "equation",
              content: "// Q4_0 Blockwise Scale EMA Update\nvoid calc_ema_scale(float* current_scale, const float* batch_scale, float alpha, int size) {\n    for(int i = 0; i < size; i++) {\n        current_scale[i] = alpha * current_scale[i] + (1.0f - alpha) * batch_scale[i];\n    }\n}\n\nS_EMA^(t) = α * S_EMA^(t-1) + (1 - α) * max(|W_Q4_0 + A*B|) / 7.0"
            },
            {
              type: "figure",
              caption: "Quantization-Aware Training Flow",
              visual: "nntrainer-qat"
            },
            {
              type: "heading",
              content: "Training Memory Reduction"
            },
            {
              type: "paragraph",
              content: "Quantized weights alone did not solve training memory because the backward pass retained intermediate state. I implemented checkpointing, selective recomputation, and memory-mapped storage, reducing the resident training footprint from roughly 3 GB to below 1 GB."
            },
            {
              type: "figure",
              caption: "Memory Footprint Reduction",
              visual: "nntrainer-memory"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "result-table",
              content: "~3 GB → <1 GB\nResident training footprint\n\nLoRA + QAT\nOn-device quantized fine-tuning"
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "I drove the CPU execution path, LoRA training integration, QAT design, and memory reduction. The project was collaborative with Samsung Research India and Samsung Research Korea. The NPU execution work is cross-linked below."
            },
            {
              type: "heading",
              content: "See Also"
            },
            {
              type: "paragraph",
              content: "The asynchronous CPU–NPU co-execution work that brought prefill to ~5× the CPU baseline emerged from this same NNTrainer effort and is documented at [Asynchronous CPU–NPU Co-Execution for LLM Training](/projects/cpu-npu)."
            }
          ]
        }
    },
    {
      id: "cpu-npu",
      title: "Asynchronous CPU\u2013NPU Co-Execution for LLM Training",
      articleTitle: "Asynchronous CPU\u2013NPU Co-Execution for LLM Training",
      year: "2025\u20132026",
      tags: ["SYSTEMS", "ADAPTATION", "HARDWARE"],
      category: "systems",
      claim: "Overcoming CPU\u2013NPU dispatch latency via asynchronous DMA ring-buffer enqueue and accelerator-resident data delivers ~5\u00d7 training acceleration over CPU baselines.",
      metricsHighlight: "~5\u00d7 acceleration \u00b7 Qualcomm Hexagon NPU",
      status: "",
      statusDetail: "Samsung Research India \u00b7 2025",
      metadata: ["Samsung Research India \u00b7 2025", "Qualcomm Hexagon NPU"],
      artifacts: [{"label": "Project notes", "url": "/projects/cpu-npu"}, {"label": "Adaptation notes", "url": "/projects/nntrainer"}],
      tldr: ["Initial hybrid execution placed matrix operations on the NPU but was bottlenecked by CPU\u2013NPU sync latency.", "Replaced synchronous execution with asynchronous DMA ring-buffer enqueue and FastRPC-accessible memory buffers.", "Adapted Hexagon HMX (matrix) and HVX (vector) kernels to execute the backward pass and gradient accumulation on-accelerator.", "Delivered ~5\u00d7 end-to-end training acceleration over the optimized CPU baseline."],
      article: {
          intro: "After making on-device LLM training practical on the CPU, I extended NNTrainer's execution path to Qualcomm's Hexagon NPU. An initial hybrid design was bottlenecked by CPU–NPU synchronization overhead: moving compute to the accelerator was not sufficient. I redesigned execution around asynchronous layer submission and accelerator-resident data, bringing prefill to roughly 5× the CPU baseline. This page focuses on the NPU execution redesign. The on-device adaptation work (LoRA, QAT, memory reduction) is documented separately.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "What execution model is needed to eliminate CPU–NPU synchronization overhead when running LLM training across a heterogeneous CPU–NPU system?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "The initial hybrid design placed matrix-heavy operations on the NPU. But frequent CPU–NPU transfers and synchronization between accelerator calls caused the data movement overhead to exceed the accelerator compute advantage. The execution model — not just the operator placement — was the bottleneck."
            },
            {
              type: "heading",
              content: "NPU Integration"
            },
            {
              type: "paragraph",
              content: "I integrated ggml-hexagon inside NNTrainer's layer-wise training framework, using HMX for matrix-heavy operations and HVX for lighter vector operations. This made the NPU participate directly in the training pipeline rather than operating as a separate inference path."
            },
            {
              type: "figure",
              caption: "Hexagon NPU Integration Architecture",
              visual: "nntrainer-hexagon-arch"
            },
            {
              type: "heading",
              content: "The Synchronization Problem"
            },
            {
              type: "paragraph",
              content: "Because NNTrainer is layer-wise and ggml-hexagon is organized around lower-level accelerator operations, blocking accelerator calls caused unnecessary serialization between layers. Each accelerator call blocked the CPU until it completed before the next layer could be submitted."
            },
            {
              type: "figure",
              caption: "Initial Hybrid Execution Timeline",
              visual: "nntrainer-hybrid-fail"
            },
            {
              type: "heading",
              content: "Asynchronous Execution Redesign"
            },
            {
              type: "paragraph",
              content: "I introduced a custom enqueue mechanism using a DMA ring buffer so that layers could be submitted asynchronously. Weights and activations remain in FastRPC-accessible memory, making VTCM transfers substantially more efficient."
            },
            {
              type: "equation",
              content: "// Asynchronous Layer Enqueue to Hexagon DSP\nint enqueue_hexagon_dma_transfer(void* vtcm_ptr, void* ddr_ptr, size_t size) {\n    return fastrpc_dma_async_copy(vtcm_ptr, ddr_ptr, size);\n}\n\nvoid execute_hmx_kernel(int kernel_id, void* input, void* weight, void* output) {\n    hexagon_nn_execute_async(kernel_id, input, weight, output);\n}"
            },
            {
              type: "figure",
              caption: "Asynchronous Enqueue and Execution",
              visual: "nntrainer-async"
            },
            {
              type: "heading",
              content: "Backward Pass Support"
            },
            {
              type: "paragraph",
              content: "I adapted existing kernels to support the backward pass — including transpose operations and tensor-layout requirements — using HMX for matrix operations and HVX for activation and normalization, rather than building a separate backward framework."
            },
            {
              type: "figure",
              caption: "Shared Forward and Backward NPU Execution",
              visual: "nntrainer-fwd-bwd"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "result-table",
              content: "~5×\nTraining acceleration (CPU-NPU hybrid vs. CPU baseline)"
            },
            {
              type: "figure",
              caption: "Training Acceleration (CPU vs NPU)",
              visual: "nntrainer-prefill"
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "I designed and implemented the asynchronous enqueue mechanism, the ggml-hexagon integration inside NNTrainer, and the backward pass kernel adaptations. The broader NNTrainer project was collaborative across Samsung Research India and Samsung Research Korea."
            },
            {
              type: "heading",
              content: "See Also"
            },
            {
              type: "paragraph",
              content: "The on-device adaptation work (LoRA, QAT, memory reduction) that produced the CPU training baseline is documented at [On-Device LLM Personalization with NNTrainer](/projects/nntrainer)."
            }
          ]
        }
    },
    {
      id: "subspace-zo",
      title: "Subspace-Restricted Zeroth-Order Fine-Tuning on Mobile NPUs",
      articleTitle: "Necessity, Not Convenience: Subspace-Restricted Zeroth-Order Fine-Tuning of Real Weights on Mobile NPUs",
      year: "2026",
      tags: ["OPTIMIZATION", "ADAPTATION", "HARDWARE"],
      category: "optimization",
      claim: "Restricting zeroth-order perturbations to a gradient-informed low-rank subspace prevents firmware recovery crashes and reaches 92.0% SST-2 accuracy on Qualcomm Hexagon hardware.",
      metricsHighlight: "92.0% SST-2 (vs 92.7% full LoRA) \u00b7 10.5\u00d7 speedup",
      status: "Under review",
      statusDetail: "Lead author \u00b7 MLSys 2027 prep",
      metadata: ["Qwen3-0.6B \u00b7 Qualcomm Hexagon NPU", "Lead author \u00b7 Preparing for MLSys 2027"],
      artifacts: [{"label": "Project notes", "url": "/projects/subspace-zo"}, {"label": "Status notes", "url": "/projects/subspace-zo#status"}],
      tldr: ["Full-rank weight perturbations pushed ~3.2 GB through a single DSP dispatch and triggered device firmware recovery mode.", "Restricting updates to a low-rank subspace of real weights turns an algorithmic approximation into a strict hardware safety requirement.", "Batched block power iteration on NPU reduced subspace refresh time by 50\u00d7 (270s \u2192 5.4s at r=64) over host SVD.", "Adaptive-N method reached 92.0% SST-2 accuracy on Hexagon NPU, closely matching the 92.7% full-LoRA baseline."],
      article: {
          intro: "Zeroth-order optimization replaces backpropagation with repeated forward evaluations, eliminating the need to retain backward state on the device. This project applies a learned low-rank subspace to the model's real weights to make on-device zeroth-order optimization both representable and safe on Qualcomm Hexagon NPU hardware. The method reaches 92.0% SST-2 accuracy, close to the 92.7% full-LoRA baseline.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "Can an LLM be fine-tuned on a mobile NPU using only forward passes, and what does the hardware force you to change about the method?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "Mobile NPUs are optimized for inference. Backpropagation requires retaining intermediate activations through the backward pass, which is both memory-intensive and architecturally misaligned with the accelerator's execution model. Zeroth-order optimization provides a forward-only path that fits the hardware natively."
            },
            {
              type: "heading",
              content: "Method"
            },
            {
              type: "paragraph",
              content: "The adaptation target is the model's real weights, not a persistent LoRA adapter. For a weight matrix W, we learn a rank-r basis and restrict perturbations to the r×r coefficient space of that subspace. We combine P-GAP's subspace identification with FZOO's one-sided Rademacher estimator, whose sign-based perturbation representation aligns with the NPU's efficient integer arithmetic paths."
            },
            {
              type: "math",
              content: "v = x V_r\n\\text{coeff}_i = Z_i v\n\\hat{y}_i = y + \\epsilon(\\text{coeff}_i U_r^T)"
            },
            {
              type: "figure",
              caption: "Subspace Perturbation Flow",
              visual: "zo-subspace-perturb"
            },
            {
              type: "heading",
              content: "Hardware Constraint: Subspace Restriction is Not Optional"
            },
            {
              type: "paragraph",
              content: "A naïve full-rank implementation pushed approximately 3.2 GB of perturbed weight data through a single DSP dispatch, causing the device to enter firmware recovery mode. The low-rank subspace is a strict hardware requirement, not a computational optimization."
            },
            {
              type: "figure",
              caption: "Full-Rank Dispatch Failure vs. Safe Subspace",
              visual: "zo-crash"
            },
            {
              type: "heading",
              content: "On-Device Subspace Refresh"
            },
            {
              type: "paragraph",
              content: "The subspace must be periodically refreshed. The original host-side sequential power iteration was computationally impractical at high ranks. I reformulated it as batched block power iteration using large matrix multiplications that the accelerator executes efficiently. At r=64 this reduced refresh time from 270 s to 5.4 s (50×)."
            },
            {
              type: "figure",
              caption: "Host SVD vs. Block Power Iteration",
              visual: "zo-refresh"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "paragraph",
              content: "On real Qualcomm Hexagon NPU hardware with Qwen3-0.6B on SST-2 (N=500), the subspace-restricted adaptive-N method reached 92.0% accuracy, close to the 92.7% full-LoRA baseline. The adaptive-N controller used approximately 30% fewer forward evaluations than a fixed-N=8 configuration."
            },
            {
              type: "result-table",
              content: "92.0%\nSST-2 accuracy on NPU (N=500)\n\n9.1×\nSubspace-refresh speedup\n\n10.5×\nSteady-state execution speedup"
            },
            {
              type: "figure",
              caption: "On-Device Results Comparison",
              visual: "zo-results"
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "Lead author. I designed the subspace-restriction approach, identified the hardware constraint through the firmware-crash failure, reformulated subspace refresh as batched block power iteration, and ran all NPU experiments on Qualcomm Hexagon hardware."
            },
            {
              type: "heading",
              content: "Status"
            },
            {
              type: "paragraph",
              content: "Preparing for submission to MLSys 2027. Under review; results and claims are from verified experiments."
            }
          ]
        }
    },
    {
      id: "hybrid-llm-inference",
      title: "Reusing Local Drafts for Cross-Vocabulary Speculative Handoff",
      articleTitle: "Hybrid Local\u2013Cloud LLM Inference via Cross-Vocabulary Speculative Decoding",
      year: "2026",
      tags: ["GENERATION", "INFERENCE", "SYSTEMS"],
      category: "systems",
      claim: "Translating local model drafts across vocabularies allows speculative cloud verification to simultaneously serve as the handoff mechanism, reducing server decode computation by 2.797\u00d7.",
      metricsHighlight: "1.394\u00d7 speedup \u00b7 2.797\u00d7 compute reduction",
      status: "",
      statusDetail: "Samsung Research India \u00b7 2025\u20132026",
      metadata: ["Samsung Research India \u00b7 2025", "Cloud GPU experiments"],
      artifacts: [{"label": "Project notes", "url": "/projects/hybrid-llm-inference"}],
      tldr: ["Model escalation normally forces the larger model to discard prior turns and rebuild context via redundant prefill.", "Cross-vocabulary speculative decoding translates local tokens into target vocabulary using direct mapping (98.3% hit rate) and n-gram cache.", "Cloud verification simultaneously functions as the handoff mechanism, establishing server KV-cache for subsequent generation.", "Measures 1.394\u00d7 wall-clock speedup and 2.797\u00d7 server compute reduction with zero quality degradation under greedy decoding."],
      article: {
          intro: "A hybrid LLM system keeps a small model on the user's device for low-cost responses while invoking a larger server model for harder tasks. When switching models, the larger model normally has to reprocess the conversation context before it can continue. This project uses cross-vocabulary speculative decoding to make the local model's generated tokens participate directly in the server model's handoff, eliminating a separate context-rebuilding step. Current results show a 1.394× wall-clock speedup and a 2.797× server-compute reduction with zero quality cost under greedy decoding.",
          sections: [
            {
              type: "heading",
              content: "Research Question"
            },
            {
              type: "paragraph",
              content: "Can the computation already performed by a smaller local model be made useful to a larger server model at handoff, rather than discarding that work and rebuilding the larger model's context from scratch?"
            },
            {
              type: "heading",
              content: "Motivation"
            },
            {
              type: "paragraph",
              content: "In a conventional model handoff, the larger model must run a full prefill on the conversation context before continuing generation. This discards the work the local model has already done and adds server-side latency proportional to context length."
            },
            {
              type: "heading",
              content: "Method"
            },
            {
              type: "paragraph",
              content: "The local model generates a draft. The draft is translated into the server model's vocabulary using direct token mapping for overlapping tokens (98.3% of tokens in a measured conversation) and an n-gram cache for the remainder. The server model verifies the entire draft in one batched forward pass. The verification pass also establishes the server model's KV state, so no separate catch-up step is needed."
            },
            {
              type: "figure",
              caption: "Cross-Vocabulary Translation",
              visual: "hybrid-translation"
            },
            {
              type: "figure",
              caption: "Verification as the Handoff Mechanism",
              visual: "hybrid-draft-handoff"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "result-table",
              content: "1.394×\nWall-clock speedup\n\n2.797×\nServer-compute reduction\n\n0\nQuality cost under greedy verification"
            },
            {
              type: "paragraph",
              content: "The server-compute result corresponds to a reduction from 11.2 s to 4.0 s for measured decode computation. KV-cache reuse across multi-turn escalation and de-escalation was measured at ~1.307× average speedup."
            },
            {
              type: "heading",
              content: "Current Status and Limitations"
            },
            {
              type: "paragraph",
              content: "Results are from cloud GPU experiments. Real mobile-hardware drafter execution is not yet measured. Network latency is estimated. The complete four-component system has not yet been assembled. Ongoing directions include adaptive draft depth, diffusion-based drafting, and adaptive handoff routing."
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "I designed and implemented the cross-vocabulary translation mechanism, the speculative verification handoff logic, and KV-state continuity across model switching. All experiments are my own work."
            }
          ]
        }
    },
    {
      id: "hybrid-optimization",
      title: "Combining Forward-Only Adaptation with First-Order Guidance",
      articleTitle: "Hybrid First- and Zeroth-Order Adaptation",
      year: "Ongoing",
      tags: ["OPTIMIZATION", "ONGOING"],
      category: "ongoing",
      claim: "Investigating whether selective, low-frequency first-order guidance can stabilize convergence in forward-only zeroth-order training without paying full backward memory costs.",
      status: "Ongoing",
      statusDetail: "Ongoing research",
      metadata: ["Ongoing"],
      artifacts: [{"label": "Project notes", "url": "/projects/hybrid-optimization"}],
      tldr: ["Pure forward-only optimization eliminates backward memory overhead but suffers from slower convergence rates.", "Investigating sparse, low-frequency first-order gradient updates to anchor the optimization trajectory.", "Evaluating trade-offs between memory footprint, sample efficiency, and hardware dispatch on mobile processors.", "Ongoing research; preliminary formulation under development."],
      article: {
          intro: "An ongoing research direction exploring whether first-order and zeroth-order gradient information can be combined to improve adaptation efficiency. This is distinct from the evaluated subspace-restricted ZO fine-tuning project, which is a completed and verified method.",
          sections: [
            {
              type: "heading",
              content: "Direction"
            },
            {
              type: "paragraph",
              content: "The subspace-restricted ZO project eliminated the backward pass entirely. This direction asks whether selective use of first-order information — where it is computationally affordable — can improve convergence or task performance relative to purely forward-based optimization, without fully restoring the memory cost of backpropagation."
            },
            {
              type: "heading",
              content: "Status"
            },
            {
              type: "paragraph",
              content: "Ongoing research. No results have been established. This direction is kept distinct from the evaluated zeroth-order fine-tuning method."
            }
          ]
        }
    },
    {
      id: "vigorl-video",
      title: "Learning When to Look: Budgeted Active Video Reasoning",
      articleTitle: "ViGoRL-Video: Active Visual Reasoning and Memory",
      year: "Ongoing",
      tags: ["MULTIMODAL", "REASONING", "ONGOING"],
      category: "ongoing",
      claim: "Investigating reinforcement-learned active frame inspection and dynamic visual memory budgets for long-horizon video question answering.",
      status: "Ongoing",
      statusDetail: "Ongoing collaboration",
      metadata: ["Ongoing collaboration"],
      artifacts: [{"label": "Project notes", "url": "/projects/vigorl-video"}],
      tldr: ["Uniform frame sampling incurs uniform computation regardless of temporal information density.", "Formulating video inspection as an active sequential decision problem with explicit computational budgets.", "Developing memory representations that selectively retain discriminative temporal evidence.", "Ongoing collaborative research; direction cleared with collaborators."],
      article: {
          intro: "An ongoing collaborative project extending reinforcement-learning-based visual grounding to video understanding, with a focus on active reasoning and memory across frames. This is collaborative ongoing work; details are limited to what has been cleared with collaborators.",
          sections: [
            {
              type: "heading",
              content: "Direction"
            },
            {
              type: "paragraph",
              content: "The project extends active visual reasoning from single images to video, asking how a model should decide what to attend to and retain across a sequence of frames. My contribution focuses on the representation and memory side of this problem."
            },
            {
              type: "heading",
              content: "Status"
            },
            {
              type: "paragraph",
              content: "This is ongoing collaborative research. No results have been established. The project name and direction are described here to the extent cleared with collaborators. I do not claim sole ownership of this direction."
            }
          ]
        }
    },
  ],

  // ── PUBLICATIONS ───────────────────────────────────────────────────────────
  publications: [
    {
      title: "Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach",
      venue: "Interspeech 2025",
      status: "Published",
      link: "/publications/Interspeech.pdf",
      projectId: "speech-reps",
      bibtex: `@inproceedings{bocha2025disfluency,
  title={Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach},
  author={Bocha, Anirudh and Vuppala, Anil Kumar},
  booktitle={Interspeech},
  year={2025}
}`
    }
  ],

  // ── OPEN SOURCE & PRESENTATIONS ───────────────────────────────────────────
  openSource: [
    {
      id: "waveform-wizard",
      title: "Waveform-Wizard: Speech Analysis and Visualization Platform",
      description: "Open-source Python speech analysis platform replacing laboratory MATLAB workflows with dynamically linked multi-file visualization panes; presented at ICASSP 2025 Show & Tell.",
      venue: "ICASSP 2025 Show & Tell",
      link: "/publications/Icassp_Show_and_tell.pdf",
      codeLink: null,
      projectId: "waveform-wizard"
    }
  ],

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  experience: [
    {
      org: "Samsung Research India",
      role: "Machine Learning Engineer",
      dates: "2025 — Present",
      desc: "Full time on LLM fine-tuning, NPU execution, and device–server speculative decoding."
    },
    {
      org: "Samsung Research India",
      role: "Software Engineering Intern, SnapLite",
      dates: "Jun 2024 — Aug 2024",
      desc: "Deployment runtime: model conversion, CPU optimization, and migration onto Google LiteRT."
    },
    {
      org: "Speech Processing Lab, IIIT Hyderabad",
      role: "Honours Research",
      dates: "2023 — 2025",
      desc: "Speech representations, whispered-speech conversion, disfluency classification. Advised by Prof. Anil Kumar Vuppala."
    },
    {
      org: "Docturnal",
      role: "Software Engineering Intern",
      dates: "Jan 2023 — Jun 2023",
      desc: "Built Android app and FastAPI inference backend for voice-based tuberculosis screening."
    }
  ],

  // Backwards-compatibility getters
  get representationsAndModelDesign() {
    return {
      label: "Representations & Model Design",
      description: "Task-specific representations and model structures for deciding what information a model should encode, expose, and retain.",
      projects: this.projects.filter(p => p.category === "representations" || p.id === "vigorl-video")
    };
  },
  get learningAndAdaptation() {
    return {
      label: "Learning & Adaptation",
      description: "Training and optimization methods for adapting pretrained models under data, memory, and compute constraints.",
      projects: this.projects.filter(p => p.category === "adaptation" || p.category === "optimization")
    };
  },
  get inferenceAndSystems() {
    return {
      label: "Inference & Systems",
      description: "Generation algorithms and execution systems that reuse computation across models and map workloads to heterogeneous hardware.",
      projects: this.projects.filter(p => p.category === "systems")
    };
  }
};
