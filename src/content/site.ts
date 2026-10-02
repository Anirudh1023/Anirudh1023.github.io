export const siteContent = {
  identity: {
    name: "ANIRUDH BOCHA",
    heroEyebrow: "SAMSUNG RESEARCH INDIA · ON-DEVICE AI",
    heroHeadline: "EFFICIENT FOUNDATION MODELS UNDER REAL HARDWARE CONSTRAINTS.",
    heroParagraphs: [
      "Machine-learning algorithms are usually designed as though computation is free and the execution substrate is interchangeable. On a device, neither is true.",
      "At Samsung Research India, I work on the On-Device AI team, where I study how foundation models can be adapted and executed when memory, latency, thermal limits, and accelerator capabilities constrain what a system can actually do.",
      "My work asks a recurring question: what information, computation, and state does a task actually require, and what can be removed, reused, or executed differently? I have explored this through speech representations, model depth, production inference runtimes, on-device training, accelerator-aware optimization, and hybrid inference."
    ],
    links: {
      email: "mailto:anirudhnarayana7@gmail.com",
      github: "https://github.com/Anirudh1023",
      cv: "/resume.pdf",
      linkedin: "https://www.linkedin.com/in/anirudh-bocha/"
    },
    about: {
      p1: "I am an ML systems researcher / engineer working on efficient foundation models under real device constraints. I currently work on the On-Device AI team at Samsung Research India. Before that, my research at IIIT Hyderabad focused on speech representations and task-dependent model depth.",
      p2: "My current work explores forward-only adaptation, heterogeneous execution, and computation reuse for foundation models. I am interested in algorithm–system co-design: situations where the model, optimizer, runtime and accelerator have to be designed together."
    }
  },

  projects: [
    {
      id: "zo",
      number: "01",
      category: "CURRENT RESEARCH · SAMSUNG",
      title: "ON-DEVICE SUBSPACE-RESTRICTED ZEROTH-ORDER FINE-TUNING",
      articleTitle: "NECESSITY, NOT CONVENIENCE: SUBSPACE-RESTRICTED ZEROTH-ORDER FINE-TUNING OF REAL WEIGHTS ON MOBILE NPUs",
      metadata: [
        "Qwen3-0.6B",
        "Qualcomm Hexagon NPU",
        "SST-2",
        "Lead author",
        "Preparing for MLSys 2027"
      ],
      heroQuestion: "Can an LLM be adapted when the accelerator can execute forward computation but does not provide the conventional backward path?",
      homepageSummary: "Mobile NPUs are built around forward execution, but the hardware path we targeted exposes no conventional backward/autodiff route. I therefore built a forward-only fine-tuning system around zeroth-order optimization. The first naïve implementation revealed a deeper constraint: perturbing the real weights at full rank pushed roughly 3.2 GB through a single dispatch and crashed the device. Restricting the update to a learned low-rank subspace turned out to be not just an efficiency optimization, but a hardware requirement.\n\nThe current system combines gradient-informed subspace identification with a hardware-compatible Rademacher estimator, adaptive sampling, and on-device subspace refresh.",
      metrics: [
        { value: "92.0%", label: "SST-2 accuracy (N=500)" },
        { value: "9.1×", label: "subspace-refresh speedup" },
        { value: "10.5×", label: "steady-state speedup" }
      ],
      article: {
        intro: "The problem is not just memory.",
        sections: [
          {
            type: "heading",
            content: "THE PROBLEM IS NOT JUST MEMORY"
          },
          {
            type: "paragraph",
            content: "Fine-tuning a language model directly on a user's device is attractive because personalization can happen locally without sending private data back to a server. But mobile NPUs introduce a different constraint from a conventional server GPU: the accelerator is highly capable at forward neural-network execution while the execution path exposes no documented backward/autodiff primitives for the training path we target."
          },
          {
            type: "paragraph",
            content: "On a GPU, zeroth-order optimization is one alternative among several. It trades analytical gradients for repeated forward evaluations, usually to reduce memory pressure. On an inference-oriented mobile NPU, the situation is different. If the accelerator does not expose the backward path, forward-only optimization is not simply a convenient alternative. It becomes the path through which training can be expressed using the available hardware."
          },
          {
            type: "heading",
            content: "THE NAÏVE IMPLEMENTATION CRASHED THE DEVICE"
          },
          {
            type: "paragraph",
            content: "The natural extension was to perturb the model's real weights and batch the resulting forward evaluations. On paper, this is a straightforward way to exploit the same forward-only execution path. On the target device, it exposed a failure that is invisible in GPU-only experiments."
          },
          {
            type: "paragraph",
            content: "The dispatch path attempted to move roughly 3.2 GB of full-rank perturbed weight data through a single DSP kernel path. That operand size had not previously been exercised at real-weight scale; the same batching mechanism had been used around much smaller adapter-scale tensors. The device entered firmware recovery mode and required a manual reboot."
          },
          {
            type: "paragraph",
            content: "This failure changed the role of subspace restriction. It was no longer just a way to reduce estimator variance or computational cost. It became the interface that made the computation representable and safe on the accelerator."
          },
          {
            type: "figure",
            caption: "The Crash vs The Solution",
            visual: "zo-crash"
          },
          {
            type: "heading",
            content: "THE UPDATE SPACE HAS TO MATCH THE HARDWARE"
          },
          {
            type: "paragraph",
            content: "For a weight matrix W ∈ R^(m×n), we define a rank-r subspace using orthonormal U_r and V_r. Each step draws Rademacher directions: Z_i ∈ {-1,+1}^{r×r}. Instead of perturbing the full matrix, the perturbation lives in the compact coefficient space."
          },
          {
            type: "equation",
            content: "v = x V_r\ncoeff_i = Z_i v\nŷ_i = y + ε(coeff_i U_rᵀ)"
          },
          {
            type: "paragraph",
            content: "We project the current activation into the learned subspace, apply the ±1 perturbation there, reconstruct the induced output perturbation, and run the normal forward computation. The loss variation estimates the update. THE MODEL'S REAL WEIGHTS ARE THE OBJECT BEING ADAPTED. This is not just LoRA; we do not use a persistent LoRA adapter as the update object."
          },
          {
            type: "equation",
            content: "μ = √(mn) / r"
          },
          {
            type: "paragraph",
            content: "Restricting random signs to r² coefficients changes the scale of the update. Without the normalization μ, the same learning rate can become silently up to ~20× too small for the restricted update."
          },
          {
            type: "heading",
            content: "WHY THE PERTURBATION HAS TO BE HARDWARE-COMPATIBLE"
          },
          {
            type: "paragraph",
            content: "We use P-GAP's subspace-identification mechanism, but we use FZOO's one-sided Rademacher estimator because Rademacher perturbations can be represented through bit-valued sign flips. This avoids the floating-point sampling/multiplication behavior that would undermine the intended NPU dispatch. We combined pieces because the hardware made one of the original algorithmic choices unusable."
          },
          {
            type: "heading",
            content: "THE NUMBER OF FORWARD EVALUATIONS SHOULD NOT BE FIXED BLINDLY"
          },
          {
            type: "paragraph",
            content: "One calibration statistic drives TWO decisions: how many perturbation directions to sample, and when the subspace itself needs refreshing. In the measured on-device configuration at r=256, adaptive-N reached 92.0% while the fixed-N=8 arm reached only 86.7%. The adaptive-N arm used approximately 30% fewer forward passes."
          },
          {
            type: "heading",
            content: "THE SUBSPACE REFRESH BECAME A SECOND SYSTEMS PROBLEM"
          },
          {
            type: "paragraph",
            content: "The old host-side refresh was sequential and large ranks became impractical. Moving it to the NPU wasn't just running the same algorithm faster; it required reformulating it as a batch block-power iteration using ordinary large matmul operations to exploit the hardware's efficient batched math path."
          },
          {
            type: "heading",
            content: "THE OPTIMUM RANK ALSO CHANGES THE OPTIMUM BACKEND"
          },
          {
            type: "paragraph",
            content: "At very low rank, the NPU's fixed dispatch overhead dominates. At higher rank, enough useful work accumulates to amortize that overhead. The same rank parameter that changes the optimization capacity therefore also changes which processor is faster."
          },
          {
            type: "figure",
            caption: "CPU vs NPU Speedup by Rank",
            visual: "zo-rank"
          },
          {
            type: "heading",
            content: "EXPERIMENTS & RESULTS"
          },
          {
            type: "paragraph",
            content: "Hyperparameters were developed on GPU then transferred to the device setup (Qwen3-0.6B, Qualcomm Hexagon v81 NPU). The best on-device result currently reaches 92.0%, a 0.7 percentage-point gap to the measured full-LoRA baseline."
          },
          {
            type: "result-table",
            content: "OPT-2.7B SST-2\nffn_down: 86.1% (31,407 passes)\nattention q/k/v/o: 93.3% (41,437 passes)\n\nAttention targeting required less than half the forward-pass budget of the 20k-step ffn_down run."
          },
          {
            type: "result-table",
            content: "92.0% ON REAL HEXAGON NPU\n\nFull-LoRA no-subspace baseline: 92.7%\nOurs subspace (r=256, adaptive N): 92.0%\nFixed N=8: 86.7%\nPlain FZOO full-LoRA: 91.3%"
          },
          {
            type: "heading",
            content: "WHAT IS STILL OPEN"
          },
          {
            type: "status-list",
            content: "[VERIFIED] On-device numbers in current table use N=500\n[VERIFIED] GPU MobiZO comparison uses N=1000 (not directly interchangeable)\n[PENDING] Attention-target NPU run (pending target-matching bug fix)\n[PENDING] Clean rank sweep r={8,32,64,128,256}\n[PENDING] Exact CPU/NPU crossover rank\n[FUTURE] Quantization-compatible persistent correction"
          },
          {
            type: "heading",
            content: "CONCLUSION"
          },
          {
            type: "paragraph",
            content: "The important result is not simply that zeroth-order fine-tuning can run on a mobile NPU. It is that deployment exposed algorithmic structure that is invisible in GPU simulation. Full-rank perturbations were not simply expensive; they were unsafe for the dispatch path. Subspace restriction therefore became a hardware requirement. Rank was not merely an optimization hyperparameter; it changed the balance between CPU and NPU execution. And moving subspace identification on-device required reformulating the refresh algorithm around the accelerator's own strengths. The hardware did not merely host the optimization method. It helped determine the method itself."
          }
        ]
      }
    },
    {
      id: "hybrid",
      number: "02",
      category: "CURRENT RESEARCH · SAMSUNG",
      title: "CROSS-VOCABULARY SPECULATIVE DECODING AS BOTH ACCELERATOR AND HANDOFF MECHANISM",
      articleTitle: "CROSS-VOCABULARY SPECULATIVE DECODING AS BOTH ACCELERATOR AND HANDOFF MECHANISM",
      metadata: [
        "Cloud GPU",
        "2× T4 / A6000",
        "1.394× wall-clock speedup",
        "2.797× server compute reduction",
        "Real mobile hardware: not yet evaluated"
      ],
      heroQuestion: "How can computation already performed by a small device model remain useful when control moves to a larger model?",
      homepageSummary: "A small model can handle many requests locally while a larger model provides additional capability when needed. The usual escalation strategy discards the small model's work and makes the larger model process the conversation again. I instead use speculative decoding as the handoff itself: the small model's draft is translated into the large model's vocabulary, then verified by the large model in a batched forward pass. The verification step simultaneously accelerates generation and lets the larger model pick up the computation.",
      metrics: [
        { value: "1.394×", label: "WALL-CLOCK SPEEDUP" },
        { value: "2.797×", label: "SERVER-COMPUTE REDUCTION" },
        { value: "0", label: "QUALITY COST (GREEDY)" }
      ],
      article: {
        intro: "A small language model running locally and a larger model running in the cloud have complementary economics.",
        sections: [
          {
            type: "paragraph",
            content: "The local model is cheap enough to execute continuously. The larger model is more capable but expensive enough that it should be invoked selectively. The hard problem begins after the decision to escalate."
          },
          {
            type: "paragraph",
            content: "The small model may already have generated part of the response. If that work is discarded, the large model has to read and generate the same context again. A router reduces how often the large model is called, but does not make an escalated call itself more efficient. This project asks whether the acceleration mechanism used inside speculative decoding can also become the mechanism through which one model hands work to another."
          },
          {
            type: "paragraph",
            content: "Cross-vocabulary speculative decoding uses the small model's draft as the candidate sequence that the large model verifies. Because the models do not share a vocabulary, the candidate sequence first has to be translated. The large model then verifies the translated sequence in one batched forward pass."
          },
          {
            type: "heading",
            content: "FOUR COMPONENTS"
          },
          {
            type: "status-list",
            content: "[BUILT] Turn-level router (LinUCB, deployment threshold not fully calibrated)\n[SOLVED] Cross-architecture handoff (through cross-vocab SD token/text round-trip)\n[PROTOTYPED] Cheap context reuse (training-free context methods are default, open research)\n[DESCOPED] Turn-level partial correction"
          },
          {
            type: "paragraph",
            content: "The current flagship result is the direct cross-vocabulary SD mechanism. The entire four-component system has not been assembled end-to-end."
          },
          {
            type: "heading",
            content: "THE HANDOFF"
          },
          {
            type: "paragraph",
            content: "The flow: The small model handles turns locally. The router decides to escalate. The small model's generated tokens become the draft, translated into the target vocabulary (direct 1:1 mapping when possible, n-gram merge cache otherwise). The large model verifies candidate tokens in one batched forward pass. Under greedy decoding, a token is accepted iff it matches what the target would generate. The first mismatch is replaced by the target token, and subsequent tokens are discarded. This verification is itself the handoff."
          },
          {
            type: "figure",
            caption: "Cross-Vocabulary Translation & Handoff",
            visual: "hybrid-handoff"
          },
          {
            type: "heading",
            content: "CROSS-VOCABULARY TRANSLATION"
          },
          {
            type: "paragraph",
            content: "Direct mapping uses a static overlap lookup (zero runtime training). The n-gram merge cache decodes token runs to text and re-encodes using the target tokenizer. In one measured conversation, 98.3% of tokens were resolved by direct mapping. BUT: the broader n-gram-cache mechanism was not universally helpful. In open conversational Q&A, the cache did not create a robust speed advantage because the domain lacked enough repeated token structure."
          },
          {
            type: "heading",
            content: "ZERO QUALITY COST IS A PROPERTY OF THE DECODING RULE"
          },
          {
            type: "paragraph",
            content: "Under greedy verification, the target distribution is effectively a delta at its argmax. We accept only an exact target match, otherwise replace with the target argmax. Therefore the output is forced to match ordinary greedy target generation. This is provable by construction, and empirically confirmed (F1 0.186 vs 0.182 for SD-handoff vs plain-target generation)."
          },
          {
            type: "heading",
            content: "THE IMPORTANT LIBRARY DISCOVERY"
          },
          {
            type: "paragraph",
            content: "The HuggingFace candidate-generator selection differs depending on `do_sample`. The useful translator path and greedy correctness path were not naturally exposed together. The library abstraction hid an important coupling between token translation and verification behavior, and the intended combination required system-level intervention."
          },
          {
            type: "heading",
            content: "THE DEBUGGING STORY"
          },
          {
            type: "paragraph",
            content: "Early results showed 0.22×–0.33× relative speed. Timing revealed ~94% of the time was elsewhere. The root cause was cross-GPU model splitting. Moving to single-GPU placement restored outputs to 1.11×, and the final controlled setup produced 1.394×."
          },
          {
            type: "heading",
            content: "FLAGSHIP RESULT"
          },
          {
            type: "result-table",
            content: "1.394× WALL-CLOCK SPEEDUP\n2.797× SERVER-COMPUTE REDUCTION (11.2s → 4.0s decode time)\n\nServer compute reduction is independent of network because it is about target-model forward passes. The combined user-latency model includes estimated network conditions."
          },
          {
            type: "heading",
            content: "FAILED / REJECTED DIRECTIONS"
          },
          {
            type: "status-list",
            content: "[RULED OUT] Quantized Drafter (ruled out for this setup)\n[RULED OUT] Same-GPU Concurrent Drafting (under initial test conditions)\n[NOT HELPFUL] N-gram cache (in open conversation domain)\n[NULL] Online Training (negative in conversational Q&A)\n[RETRACTED] Adaptive Speculation Length (false +53.9% result was a confound)"
          },
          {
            type: "paragraph",
            content: "The flagship direct-mapping + greedy-verification result is the only mechanism in this project that has robustly improved the target conversational deployment domain so far."
          },
          {
            type: "heading",
            content: "LIMITATIONS & NEXT AGENDA"
          },
          {
            type: "status-list",
            content: "[OPEN] Real mobile hardware validation (tested on cloud GPU)\n[OPEN] Real mobile drafter compute is not measured\n[OPEN] Network latency is simulated/estimated\n[OPEN] Complete four-component system was not assembled\n[OPEN] Calibrate routing threshold"
          }
        ]
      }
    }
  ],

  selectedWork: [
    {
      id: "nntrainer",
      number: "03",
      title: "NNTRAINER",
      metadata: "SAMSUNG RESEARCH",
      teaser: "Quantized on-device adaptation under memory and thermal limits",
      result: "3 GB → <1 GB pipeline",
      article: {
        intro: "I worked with Samsung Research Korea on on-device parameter-efficient fine-tuning for foundation models, extending NNTrainer toward causal-LLM training and multi-batch execution across heterogeneous backends.",
        sections: [
          {
            type: "paragraph",
            content: "The base model stayed in a deployment-oriented quantized format while LoRA carried the adaptation. Rather than training in higher precision and compressing afterward, we used quantization-aware training so the adapters learned the behavior introduced by blockwise quantization during adaptation."
          },
          {
            type: "paragraph",
            content: "I also worked on what the runtime needed to keep resident during training: checkpointing, memory mapping, selective recomputation, and thermal-aware Progressive LoRA. The resulting pipeline brought a 3 GB model workflow below 1 GB and extended on-device training from a static memory problem into a runtime problem that could respond to device conditions."
          },
          {
            type: "figure",
            caption: "PTQ + LoRA + QAT Pipeline",
            visual: "nntrainer-pipeline"
          }
        ]
      }
    },
    {
      id: "snaplite",
      number: "04",
      title: "SNAPLITE",
      metadata: "SAMSUNG RESEARCH INDIA · 2024",
      teaser: "Unified CPU/GPU/NPU deployment runtime",
      result: "10× GPU first-inference reduction",
      article: {
        intro: "During my Samsung Research internship, I worked inside SnapLite, Samsung's on-device AI deployment runtime supporting more than 200 production vision, speech, and text models.",
        sections: [
          {
            type: "paragraph",
            content: "The work started with unsupported operations and incorrect outputs in converted models: tracing failures through the model graph and runtime, modifying architectures where necessary, and adding optimized CPU matrix-multiplication paths."
          },
          {
            type: "paragraph",
            content: "I then led the migration from the legacy TensorFlow Lite execution backend to Google's LiteRT, reworking the runtime around a common deployment path across CPU, GPU, and NPU execution while retaining accelerator-specific optimizations. The resulting infrastructure addressed graph partitioning, delegate execution, compiled artifacts, cache lifecycle, driver-aware cache validation, quantization workflows, startup cost, and fallback behavior."
          },
          {
            type: "result-table",
            content: "GPU first inference: 1200ms → 120ms (10× reduction)\nNPU first inference: 1320ms → 150ms (8.8× reduction)\nMemory: 70% reduction on MobileNetV3 (CPU), 74% reduction on YOLOv8n (NPU)\n\n*Based on representative evaluation workloads."
          }
        ]
      }
    },
    {
      id: "speech-reps",
      number: "05",
      title: "TASK-DEPENDENT SPEECH REPRESENTATIONS",
      metadata: "IIIT HYDERABAD · INTERSPEECH 2025",
      teaser: "Intermediate representations can outperform final encoder states",
      result: "0.97 F1 · HuBERT layer 5",
      article: {
        intro: "I studied whether the final representation of a self-supervised speech encoder is necessarily the most useful one for a downstream task.",
        sections: [
          {
            type: "paragraph",
            content: "We evaluated layer-wise representations from Wav2Vec2.0, HuBERT, WavLM, and TERA for typical-vs-atypical disfluency classification using downstream classifiers including SVMs and CNNs."
          },
          {
            type: "paragraph",
            content: "HuBERT's fifth layer reached a peak F1 of 0.97 and outperformed the final representation, showing that useful task information can emerge well before the encoder's endpoint. Later layers are not automatically better for every task. The work also involved IIITH-TISA, a 10-hour Indian-English dataset containing recordings from 30 persons who stutter and 3,251 annotated clips."
          },
          {
            type: "figure",
            caption: "Layer-wise performance: Peak at Layer 5",
            visual: "speech-layers"
          }
        ]
      }
    },
    {
      id: "wesper",
      number: "06",
      title: "WHISPERED SPEECH REPRESENTATIONS WITH SFCC",
      metadata: "IIIT HYDERABAD · EARLIER SPEECH RESEARCH",
      teaser: "Task-relevant speech information can change with the target representation",
      result: "10–25% low-SNR relative improvement if verified",
      article: {
        intro: "I reproduced WESPER, a whispered-to-normal speech conversion system built around self-supervised HuBERT representations and downstream synthesis.",
        sections: [
          {
            type: "paragraph",
            content: "The original training used MFCC targets; I replaced them with SFCC targets to preserve richer information in whispered and noisy speech, then used smoothing and component selection to make the higher-dimensional representation practical."
          },
          {
            type: "paragraph",
            content: "The takeaway: representation design can improve performance before adding model complexity."
          }
        ]
      }
    },
    {
      id: "waveform",
      number: "07",
      title: "WAVEFORM-WIZARD",
      metadata: "ICASSP 2025 SHOW & TELL",
      teaser: "Rebuilt a MATLAB speech-analysis workflow as a Python tool",
      result: "ICASSP 2025 Show & Tell",
      article: {
        intro: "I led six undergraduates in building Waveform-Wizard, an open-source Python replacement for a MATLAB-heavy speech-analysis workflow.",
        sections: [
          {
            type: "paragraph",
            content: "The project rebuilt the analysis stack around Python, NumPy, SciPy, LibROSA and PyQt5, adding waveform, zero-time windowing, spectral flatness, S-transform, Constant-Q, formant, pitch, Gammatone and VAD analysis in a unified application."
          },
          {
            type: "paragraph",
            content: "The tool also supports multi-file comparison, dynamically linked analysis panes, save/resume through a custom workflow format, export to PDF/PNG/SVG, and packaging for Windows and Ubuntu with GitHub Actions."
          }
        ]
      }
    }
  ],

  outputs: [
    {
      title: "On-Device Subspace-Restricted Zeroth-Order Fine-Tuning",
      metadata: "Lead author · preparing for MLSys 2027"
    },
    {
      title: "Task-Dependent Speech Representations",
      metadata: "Interspeech 2025 · Published"
    },
    {
      title: "Waveform-Wizard",
      metadata: "ICASSP 2025 Show & Tell · Presented"
    }
  ],

  experience: [
    {
      org: "Samsung Research India",
      role: "On-Device AI",
      dates: "2025 — Present",
      desc: "Working across on-device LLM training, heterogeneous accelerator execution, zeroth-order optimization, and hybrid inference."
    },
    {
      org: "Samsung Research India",
      role: "Software Engineering Intern",
      dates: "2024",
      desc: "SnapLite: 200+ production vision/speech/text models, LiteRT migration, runtime and CPU optimization."
    },
    {
      org: "Speech Processing Lab, IIIT Hyderabad",
      role: "Honours research",
      dates: "2023 — 2025",
      desc: "Focus: speech representations, disfluency classification, WESPER, Waveform-Wizard."
    },
    {
      org: "Docturnal",
      role: "Earlier internship",
      dates: "2023",
      desc: "Voice-based TB screening."
    }
  ]
};
