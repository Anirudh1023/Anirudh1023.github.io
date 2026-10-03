export const siteContent = {
  identity: {
    name: "ANIRUDH BOCHA",
    heroEyebrow: "SAMSUNG RESEARCH INDIA · ON-DEVICE AI",
    heroHeadline: "EFFICIENT FOUNDATION MODELS UNDER REAL HARDWARE CONSTRAINTS.",
    heroParagraphs: [
      "I’m a Machine Learning Engineer at [Samsung Research India](https://research.samsung.com/sri), where I work on making machine learning more efficient across training, inference, and systems. My current work spans on-device LLMs, heterogeneous CPU–NPU execution, quantization, memory-efficient training, continual adaptation, and adaptive inference. More broadly, I’m interested in understanding what information, computation, and state a model actually needs for a task, and how those requirements can be reduced, reused, or adapted as models and workloads change.",
      "At Samsung, I’ve explored efficiency at different levels of the stack: choosing better representations and computation depth, reducing training state and numerical precision, adapting models to changing resource conditions, and redesigning runtimes to make better use of heterogeneous hardware. More recently, I’ve been studying how computation can be reused across models during inference and how models can adapt their computation to the difficulty of a task. These problems have led me toward a broader interest in designing ML algorithms and systems together rather than treating model efficiency and system efficiency as separate problems.",
      "I first became interested in these questions through speech research at [IIIT Hyderabad](https://www.iiit.ac.in/). In Prof. Anil Kumar Vuppala’s Speech Processing Lab, I studied how different representations and intermediate layers affected task performance, finding that more information and deeper computation were not always more useful. That perspective has stayed with me as my work has moved from speech representations to model optimization, efficient execution, and adaptive ML systems."
    ],
    links: {
      email: "mailto:anirudhnarayana7@gmail.com",
      github: "https://github.com/Anirudh1023",
      cv: "/resume.pdf",
      linkedin: "https://www.linkedin.com/in/anirudh-bocha/"
    }
  },

  projects: [
    {
      id: "zo",
      number: "01",
      category: "CURRENT RESEARCH",
      title: "ON-DEVICE SUBSPACE-RESTRICTED ZEROTH-ORDER FINE-TUNING",
      articleTitle: "NECESSITY, NOT CONVENIENCE: SUBSPACE-RESTRICTED ZEROTH-ORDER FINE-TUNING OF REAL WEIGHTS ON MOBILE NPUs",
      metadata: [
        "Qwen3-0.6B",
        "Qualcomm Hexagon NPU",
        "Lead author",
        "Preparing for MLSys 2027"
      ],
      heroQuestion: "Can an LLM be fine-tuned on a mobile NPU with forward passes alone, and what does the hardware force you to change about the method?",
      homepageSummary: "Backpropagation worked on the NPU, but it still had to store backward state, so I asked whether forward passes alone could fine-tune the model. My zeroth-order system needs only inference-level memory, but its first version crashed the device: perturbing the real weights at full rank pushed about 3.2 GB through a single dispatch. Restricting updates to a learned low-rank subspace of the model's real weights fixed that, and made the restriction a hardware requirement, not an optimization. On Qwen3-0.6B running on a Qualcomm Hexagon NPU, it reaches 92.0% on SST-2, against 92.7% for our full-LoRA baseline.",
      metrics: [
        { value: "92.0%", label: "SST-2 accuracy (N=500)" },
        { value: "9.1×", label: "subspace-refresh speedup" },
        { value: "10.5×", label: "steady-state speedup" }
      ],
      article: {
        intro: "Backpropagation already runs on the NPU, but it still has to store backward state.",
        sections: [
          {
            type: "heading",
            content: "WHY GO FORWARD-ONLY WHEN BACKPROPAGATION RUNS"
          },
          {
            type: "paragraph",
            content: "Fine-tuning a language model directly on a user's device is attractive because personalization can happen locally, without sending private data back to a server. In NNTrainer I had already built an NPU training path that runs backpropagation, so the NPU could train. The cost was memory: backpropagation has to keep the intermediate state the backward pass needs, and on a phone that memory is scarce."
          },
          {
            type: "paragraph",
            content: "Zeroth-order optimization replaces analytical gradients with repeated forward evaluations, so training can run at close to inference-level memory. It also suits the hardware, because mobile NPUs are built around forward execution. The question was whether a forward-only method could fine-tune the model's real weights on the device, and what the hardware would force me to change along the way."
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
      category: "CURRENT RESEARCH",
      title: "CROSS-VOCABULARY SPECULATIVE DECODING",
      articleTitle: "CROSS-VOCABULARY SPECULATIVE DECODING AS BOTH ACCELERATOR AND HANDOFF MECHANISM",
      metadata: [
        "Cloud GPU",
        "1.394× wall-clock speedup",
        "2.797× server compute reduction"
      ],
      heroQuestion: "How can computation already performed by a small device model remain useful when control moves to a larger model?",
      homepageSummary: "A small model on the device can handle most requests, and a larger server model takes over when it's needed. The usual way to escalate throws away what the small model already wrote and has the large model start over. I use speculative decoding as the handoff instead: the small model's draft is translated into the large model's vocabulary, and the large model verifies it in one batched pass. That check speeds up generation and lets the large model pick up where the small one stopped. In a cloud-GPU setup, it cut wall-clock time by 1.4× and server compute by 2.8×, with the same output as the large model decoding greedily on its own.",
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
    },
    {
      id: "nntrainer",
      number: "03",
      category: "CURRENT WORK",
      title: "NNTRAINER (CAUSAL-LLM TRAINING & CPU+NPU PIPELINE)",
      articleTitle: "NNTRAINER",
      metadata: [
        "SAMSUNG RESEARCH"
      ],
      heroQuestion: "How does execution scheduling and memory design impact on-device training efficiency?",
      homepageSummary: "I extended NNTrainer, Samsung's open-source on-device training engine, to fine-tune Qwen3-class models with LoRA while keeping the base model in the 4-bit Q4_0 format it ships in. Quantization-aware training, checkpointing, and memory-mapped storage cut a 3 GB model's training footprint below 1 GB. I then moved training onto the NPU. My first CPU–NPU design was slower than the CPU alone, and redesigning it around asynchronous execution brought prefill to roughly 5× the CPU baseline. I also introduced Progressive LoRA, which adapts training to the device's thermal state.",
      metrics: [
        { value: "3 GB → <1 GB", label: "MEMORY PIPELINE REDUCTION" },
        { value: "5×", label: "PREFILL ACCELERATION" }
      ],
      article: {
        intro: "I worked on on-device parameter-efficient fine-tuning for foundation models, extending NNTrainer toward causal-LLM training and multi-batch execution across heterogeneous backends.",
        sections: [
          {
            type: "paragraph",
            content: "The challenge was making Qwen3-class LoRA fine-tuning feasible under real on-device constraints. I enabled causal-LLM and multi-batch training while keeping the deployed base model in Q4_0 and LoRA weights in FP32. Quantization-aware training made the adaptation learn deployment-time quantization error, while weight and activation checkpointing, selective recomputation, and memory-mapped storage reduced a 3 GB model's resident footprint below 1 GB."
          },
          {
            type: "paragraph",
            content: "I also introduced Progressive LoRA to adapt training to the device's thermal state. But making on-device training practical on CPU was not enough; I wanted to know whether the NPU could execute the training workload as effectively as it executed inference. I extended NNTrainer to use the mobile NPU while preserving its flexible layer-level execution, unlike existing accelerator paths designed around fixed, operator-level inference graphs."
          },
          {
            type: "paragraph",
            content: "My initial CPU–NPU design was inefficient because frequent synchronization and data transfers erased the benefit of NPU acceleration. I therefore redesigned the execution path so that successive layers could be submitted asynchronously while keeping intermediate data readily accessible across the CPU and NPU, and adapted existing inference kernels to support the additional operations required for backpropagation."
          },
          {
            type: "paragraph",
            content: "This enabled the NPU to handle the compute-intensive parts of training, accelerating prefill by roughly 5× while substantially reducing training memory. More importantly, the experience showed me that hardware and ML execution cannot be optimized independently: the way an algorithm schedules and moves computation can determine whether an accelerator helps at all."
          },
          {
            type: "figure",
            caption: "PTQ + LoRA + QAT Pipeline",
            visual: "nntrainer-pipeline"
          }
        ]
      }
    }
  ],

  selectedWork: [
    {
      id: "waveform",
      number: "04",
      title: "Waveform-Wizard: A free tool for Spectro-Temporal visualization of Speech",
      metadata: "ICASSP 2025 Show & Tell",
      teaser: "I led a team of six undergraduates in building Waveform-Wizard, an open-source Python tool that replaced our lab's MATLAB speech-analysis workflow. It brings waveform, spectral, pitch, formant, and other analyses into one application, with linked views, multi-file comparison, and installers for Windows and Ubuntu. We presented it at ICASSP 2025 Show & Tell.",
      result: "Presented",
      link: "/publications/Icassp_Show_and_tell.pdf",
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
    },
    {
      id: "speech-reps",
      number: "05",
      title: "Towards Classification of Typical and Atypical Disfluencies: A Self Supervised Representation Approach",
      metadata: "Interspeech 2025",
      teaser: "We compared layer-wise representations from Wav2Vec2.0, HuBERT, WavLM, and TERA for telling typical from atypical speech disfluencies. HuBERT's fifth layer, five layers into a 24-layer encoder, reached a peak F1 of 0.97 and outperformed the final layer, so more depth did not help on this task. I also helped build IIITH-TISA, a 10-hour Indian-English stuttered-speech corpus from 30 speakers.",
      result: "Published",
      link: "/publications/Interspeech.pdf",
      article: {
        intro: "We studied whether the final representation of a self-supervised speech encoder is necessarily the most useful one for a downstream task.",
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
    }
  ],

  otherProjects: [
    {
      id: "snaplite",
      number: "06",
      title: "SNAPLITE RUNTIME",
      metadata: "SAMSUNG RESEARCH INDIA · 2024",
      teaser: "SnapLite is Samsung's on-device deployment runtime for more than 200 production vision, speech, and text models. As an intern, I traced unsupported operations and wrong outputs in converted PyTorch and ONNX models, added optimized CPU matrix-multiplication paths, and reworked the runtime around Google's LiteRT instead of TensorFlow Lite, so CPU, GPU, and NPU deployment share one path. First inference on GPU dropped from 1.2 s to 120 ms.",
      result: "10× Speedup",
      article: {
        intro: "During my Samsung Research internship, I worked inside SnapLite, Samsung's on-device AI deployment runtime supporting more than 200 production vision, speech, and text models.",
        sections: [
          {
            type: "paragraph",
            content: "The work started with unsupported operations and incorrect outputs in converted models: tracing failures through the model graph and runtime, modifying architectures where necessary, and adding optimized CPU matrix-multiplication paths."
          },
          {
            type: "paragraph",
            content: "I then reworked the runtime around Google's LiteRT in place of the legacy TensorFlow Lite execution backend, giving CPU, GPU, and NPU deployment a common path while retaining accelerator-specific optimizations. The resulting infrastructure addressed graph partitioning, delegate execution, compiled artifacts, cache lifecycle, driver-aware cache validation, quantization workflows, startup cost, and fallback behavior."
          },
          {
            type: "result-table",
            content: "GPU first inference: 1200ms → 120ms (10× reduction)\nNPU first inference: 1320ms → 150ms (8.8× reduction)\nMemory: 70% reduction on MobileNetV3 (CPU), 74% reduction on YOLOv8n (NPU)\n\n*Based on representative evaluation workloads."
          }
        ]
      }
    },
    {
      id: "wesper",
      number: "07",
      title: "WHISPERED SPEECH REPRESENTATIONS (WESPER)",
      metadata: "IIIT HYDERABAD",
      teaser: "I reproduced WESPER, a whispered-to-normal speech conversion system built on HuBERT, and replaced its MFCC training targets with SFCC, which keeps more information from whispered and noisy speech. Smoothing and component selection kept the larger representation practical. The change improved results by 10–25% (relative) at low SNR, and it came from the targets, not from a bigger model.",
      result: "10-25% Improvement",
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
    }
  ],

  experience: [
    {
      org: "Samsung Research India",
      role: "On-Device AI (ML Systems)",
      dates: "2025 — Present",
      desc: "Full time on LLM fine-tuning, NPU execution, and device–server speculative decoding."
    },
    {
      org: "Samsung Research India",
      role: "Software Engineering Intern, SnapLite",
      dates: "Jun 2024 — Aug 2024",
      desc: "Worked on the SnapLite deployment runtime: debugging converted models, optimizing CPU matrix multiplication, and moving the runtime onto LiteRT so CPU, GPU, and NPU deployment share one path."
    },
    {
      org: "Speech Processing Lab, IIIT Hyderabad",
      role: "Honours research",
      dates: "2023 — 2025",
      desc: "Four-semester Honours research with Prof. Anil Kumar Vuppala on speech representations, whispered-speech conversion, and disfluency classification. Led the Waveform-Wizard team."
    },
    {
      org: "Docturnal",
      role: "Software Intern",
      dates: "Jan 2023 — Jun 2023",
      desc: "Built the Android app and FastAPI inference backend for a voice-based tuberculosis screening product."
    }
  ]
};
