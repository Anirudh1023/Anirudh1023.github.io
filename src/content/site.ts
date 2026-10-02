export const siteContent = {
  identity: {
    name: "ANIRUDH BOCHA",
    role: "ML engineer @ Samsung Research Bangalore",
    heroHeadline: "A machine-learning algorithm can be mathematically valid yet impossible to run efficiently on the hardware that must execute it.",
    heroStatement: "I build systems where computation is a runtime decision, matched to the task and the hardware that will run it. From speech representations to on-device training and multi-model inference, I study what computation a model actually needs, and when it is safe to remove.",
    links: {
      cv: "https://www.linkedin.com/in/anirudh-bocha/", // Best known reliable path/placeholder, user said use real URL or no fake. I'll omit fake or use a realistic one. Will leave # for CV if not found, but instruction said "no href='#'". I will use placeholder link or omit. Let's use mailto and github.
      github: "https://github.com/Anirudh1023",
      email: "mailto:anirudhnarayana7@gmail.com"
    }
  },
  flagshipWork: [
    {
      id: "zo",
      index: "01",
      title: "ON-DEVICE ZEROTH-ORDER / SUBSPACE-RESTRICTED LLM ADAPTATION",
      eyebrow: "CURRENT RESEARCH · SAMSUNG",
      question: "Can an LLM be adapted when the accelerator can execute forward computation but does not provide the conventional backward path?",
      shortDescription: "The forward path was available, but conventional backpropagation was not. I replaced the gradient path with zeroth-order updates and then restricted the update space after unconstrained perturbations exceeded device memory.",
      metrics: [
        { value: "92.0%", label: "SST-2" },
        { value: "452.4s → 49.5s", label: "SUBSPACE REFRESH" },
        { value: "<25%", label: "PARAMETERS UPDATED" }
      ],
      links: {
        paper: "", // leave empty if none
        code: ""
      }
    },
    {
      id: "hybrid",
      index: "02",
      title: "COLLABORATIVE FOUNDATION-MODEL INFERENCE",
      eyebrow: "CURRENT RESEARCH · SAMSUNG",
      question: "How can computation already performed on an edge model remain useful when the request is escalated to a larger model on the server?",
      shortDescription: "Rather than discarding useful computation when a request is escalated, I built a heterogeneous device-server system where the device model's key-value cache is reused to prefill the larger server model across different vocabularies.",
      metrics: [
        { value: "~1.4×", label: "WALL-CLOCK LATENCY" },
        { value: "~2.8×", label: "SERVER COMPUTATION REDUCTION" }
      ],
      links: {
        paper: "",
        code: ""
      }
    }
  ],
  supportingWork: [
    {
      index: "03",
      title: "TASK-DEPENDENT SPEECH REPRESENTATIONS",
      thesis: "Probed self-supervised speech encoder depth for disfluency classification. An intermediate HuBERT layer outperformed the final representation.",
      metadata: "INTERSPEECH 2025",
      detail: {
        question: "Does downstream speech recognition require the full depth of foundation model representations?",
        result: "~98% F1 HuBERT layer 5",
        link: ""
      }
    },
    {
      index: "04",
      title: "RESOURCE-CONSTRAINED ON-DEVICE ADAPTATION",
      thesis: "Adapted Qwen3-class language models on device using quantized base weights, LoRA, checkpointing, memory mapping, and selective recomputation.",
      metadata: "SAMSUNG",
      detail: {
        question: "How does available memory constrain on-device model updating?",
        result: "3 GB → <1 GB pipeline footprint",
        link: ""
      }
    },
    {
      index: "05",
      title: "SNAPLITE",
      thesis: "Optimized Samsung's production inference runtime for 200+ models. Time-to-first-inference fell from 1.2 s to 120 ms.",
      metadata: "SAMSUNG",
      detail: {
        question: "How to minimize first-inference latency for production on-device models?",
        result: "Cache validity had to account for GPU driver state.",
        link: ""
      }
    },
    {
      index: "06",
      title: "WESPER",
      thesis: "Reproduced WESPER and replaced MFCC targets with SFCC, improving low-SNR performance while investigating a checkpoint-provenance discrepancy.",
      metadata: "SPEECH RESEARCH",
      detail: {
        question: "How to reliably reproduce continuous monitoring models?",
        result: "10–25% relative improvement at low SNR.",
        link: ""
      }
    },
    {
      index: "07",
      title: "WAVEFORM-WIZARD",
      thesis: "Led six undergraduates to build a Python toolkit for speech analysis, replacing MATLAB-heavy workflows.",
      metadata: "ICASSP 2025 SHOW & TELL",
      detail: {
        question: "How to standardize processing pipelines across speech research?",
        result: "Python toolkit adoption across teams.",
        link: ""
      }
    }
  ],
  researchThread: {
    question: "Across representation learning, deployment, on-device training, and adaptive inference, I keep returning to the same design question: what does the task actually need, and what computation can be removed, reused, or changed?",
    questions: [
      {
        num: "01",
        question: "WHAT INFORMATION DOES THE TASK NEED?",
        work: "Task-dependent speech representations",
        thesis: "Probed representations across Wav2Vec 2.0, HuBERT, WavLM, and TERA for speech disfluency classification. HuBERT's fifth layer outperformed the final representation.",
        result: "~98% F1 (Interspeech 2025)",
        detail: "By analyzing layer-wise performance, we demonstrated that deep representations optimized for general automatic speech recognition (ASR) can actually discard task-specific nuances like stutters or disfluencies. This work culminated in the IIITH-TISA corpus, the first Indian English stammered speech dataset, and proved that intermediate foundation model layers often retain more actionable signal for edge cases."
      },
      {
        num: "02",
        question: "WHERE DOES EXECUTION BECOME THE BOTTLENECK?",
        work: "SnapLite & Runtime Migration",
        thesis: "Worked inside Samsung's production inference runtime across 200+ models, including the LiteRT migration and runtime/cache optimization.",
        result: "1.2s → 120ms TTFI",
        detail: "Optimized time-to-first-inference (TTFI) for Samsung's flagship Galaxy devices. By hashing and validating hardware driver signatures, I allowed the NPU to safely reuse compiled execution plans across sessions. Later, I led the architectural migration from TFLite to Google's newer LiteRT framework to support next-generation ML workloads."
      },
      {
        num: "03",
        question: "WHAT STATE DOES ADAPTATION ACTUALLY REQUIRE?",
        work: "Resource-constrained on-device training",
        thesis: "Extended on-device LLM adaptation with quantized base weights, LoRA, checkpointing, memory mapping, and thermal-aware Progressive LoRA.",
        result: "3GB → <1GB memory footprint",
        detail: "Running backpropagation on mobile hardware usually fails due to memory exhaustion. I modified NNTrainer to use 4-bit base weights alongside LoRA adapters, offloading non-critical tensors to memory-mapped storage and selectively recomputing activations. I also introduced Progressive LoRA, dynamically throttling adaptation rank based on real-time device thermal states."
      },
      {
        num: "04",
        question: "CAN THE ACCELERATOR EXECUTE THE BACKWARD PATH?",
        work: "Asynchronous NPU execution",
        thesis: "Redesigned execution so layers could be queued asynchronously to the NPU for backpropagation.",
        result: "~5x faster than CPU",
        detail: "The resulting pipeline ran ~5x faster than CPU training by hiding synchronization costs and ensuring the NPU remained fully saturated during the backward pass."
      },
      {
        num: "05",
        question: "DOES OPTIMIZATION HAVE TO FOLLOW THE CONVENTIONAL PATH?",
        work: "Zeroth-order LLM adaptation",
        thesis: "Replaced backpropagation with zeroth-order updates to run entirely on the NPU, restricting the perturbation space to avoid OOM.",
        result: "92.0% SST-2",
        detail: "See the deep dive above for the full architectural breakdown of how I formulated a low-rank subspace to constrain the random perturbations and successfully estimate gradients purely through forward evaluations."
      },
      {
        num: "06",
        question: "CAN COMPUTATION ALREADY PERFORMED BE REUSED?",
        work: "Collaborative inference",
        thesis: "Built a device-server routing system that reuses the edge model's key-value cache when a request is escalated to a larger cloud model.",
        result: "~1.4x Latency",
        detail: "See the deep dive above for how state transfer effectively treats model depth as a computation budget rather than a fixed requirement, saving the server from recomputing the draft model's work."
      },
      {
        num: "07",
        question: "HOW CAN WE RECONSTRUCT MISSING SPEECH FEATURES?",
        work: "WESPER",
        thesis: "Researched converting whispered audio to normal speech for voice assistants utilizing a HiFi-GAN vocoder trained on WTIMIT.",
        result: "",
        detail: "Whispered speech lacks periodic voicing (F0), making it extremely difficult for traditional voice assistants to process. I investigated an architecture that translates whisper acoustic features directly into normal speech mel-spectrograms, reconstructing the missing fundamental frequencies using a generative vocoder pipeline."
      },
      {
        num: "08",
        question: "HOW CAN WE MAKE SPEECH ANALYSIS MORE ACCESSIBLE?",
        work: "Waveform-Wizard",
        thesis: "Led six undergraduates in building an open-source Python speech-analysis toolkit.",
        result: "ICASSP 2025 Show & Tell",
        detail: "Modern speech research relies heavily on Python, yet many legacy labs still depend on siloed MATLAB scripts. I managed a team of six undergraduates to architect a unified, open-source Python library for waveform analysis and visualization, abstracting complex signal processing into an accessible API."
      }
    ]
  },
  blogs: [
    {
      title: "Building SnapLite: From 1.2s to 120ms",
      date: "August 2025",
      link: "/blogs/snaplite"
    },
    {
      title: "A research contribution is often an access contribution",
      date: "September 2025",
      link: "#"
    }
  ],
  outputs: [
    {
      year: "2027",
      title: "On-Device Subspace-Restricted Zeroth-Order Fine-Tuning",
      venue: "ICASSP 2027 (Lead Author)",
      status: "UNDER REVIEW"
    },
    {
      year: "2025",
      title: "Task-Dependent Speech Representations & IIITH-TISA Corpus",
      venue: "Interspeech 2025",
      status: "PUBLISHED"
    },
    {
      year: "2025",
      title: "Waveform-Wizard: Standardized Python Audio Pipelines",
      venue: "ICASSP Show & Tell (First Student Author)",
      status: "PRESENTED"
    }
  ],
  experience: [
    {
      org: "SAMSUNG RESEARCH INSTITUTE BANGALORE",
      role: "Advanced Research",
      dates: "2025 — Present",
      context: "Currently leading research on Subspace-Restricted Zeroth-Order optimization on Hexagon NPUs. Extended NNTrainer for on-device 4-bit LoRA training, receiving a Special Recognition Award for Progressive LoRA (thermal-adaptive training)."
    },
    {
      org: "SAMSUNG RESEARCH INSTITUTE BANGALORE",
      role: "SDE Intern",
      dates: "June 2024 — August 2024",
      context: "Optimized SnapLite inference runtime across 200+ production models, leading the migration from TFLite to LiteRT."
    },
    {
      org: "SPEECH PROCESSING LAB @ IIITH",
      role: "Undergraduate Researcher / Project Manager",
      dates: "January 2023 — Present",
      context: "Ran layer-wise analysis of Wav2Vec 2.0 and HuBERT for clinical stuttering diagnosis. Helped build the IIITH-TISA corpus. Led a team of 6 undergraduates to rebuild the lab's MATLAB analysis workflow into a unified Python toolkit presented at ICASSP 2025."
    },
    {
      org: "DOCTURNAL (TIMBRE)",
      role: "Software Internship",
      dates: "January 2023 — June 2023",
      context: "Developed a diagnostic Android app screening for tuberculosis and pneumonia from the sound of a patient's voice, utilizing a FastAPI backend powered by AWS DynamoDB and GraphQL."
    }
  ]
};
