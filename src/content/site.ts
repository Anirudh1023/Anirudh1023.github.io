// site.ts — research portfolio structured as a chronological research trajectory
// Contains claim-oriented titles, direct artifact links, TL;DR findings, and BibTeX citations.

export interface ArtifactLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface ExploratoryItem {
  title: string;
  description: string;
  attribution?: string;
  externalUrl?: string;
  status: string;
}

export interface SubDirection {
  letter: string;
  title: string;
  question: string;
  description: string;
  establishedContributionIds?: string[];
  ongoingContributionIds?: string[];
  exploratoryItem?: ExploratoryItem;
  openQuestions: string[];
}

export interface ResearchThread {
  id: string;
  title: string;
  shortTitle: string;
  question: string;
  homepageDesc: string;
  status?: string;
  timeframe: string;
  linkedContributionIds: string[];
  establishedContributionIds: string[];
  ongoingContributionIds: string[];
  overview: string[];
  synthesis: string[];
  openQuestions: string[];
  relatedThreadIds: string[];
  subDirections?: SubDirection[];
}

export interface ResearchProject {
  id: string;
  title: string;
  articleTitle: string;
  year: string;
  tags: string[];
  category: string;
  primaryThreadId?: string;
  relatedThreadIds?: string[];
  type?: string;
  attribution?: string;
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
      "I work on efficient machine learning across model representations, learning algorithms, and computational systems. My work asks what information a model needs to preserve, what computation a learning or inference task actually requires, and how that computation should be organized for the hardware that must execute it.",
      "This has led me from speech representation learning and analysis to quantized LLM adaptation, forward-only optimization, heterogeneous execution, collaborative generation, and active multimodal reasoning."
    ],
    links: {
      email: "mailto:anirudhnarayana7@gmail.com",
      github: "https://github.com/Anirudh1023",
      scholar: "https://scholar.google.com/citations?user=AnirudhBocha",
      cv: "/resume.pdf",
      linkedin: "https://www.linkedin.com/in/anirudh-bocha/"
    }
  },

  // ── RESEARCH THREADS ───────────────────────────────────────────────────────
  researchThreads: [
    {
      id: "speech-representations",
      title: "Task-Specific Speech Representations",
      shortTitle: "Speech Representations",
      question: "What information should a speech model represent, and which parts of a pretrained representation are actually useful for a downstream task?",
      homepageDesc: "Studying acoustic targets and intermediate representations for speech reconstruction and disfluency detection.",
      timeframe: "2023 – 2025",
      linkedContributionIds: ["wesper", "speech-reps", "waveform-wizard"],
      establishedContributionIds: ["wesper", "speech-reps"],
      ongoingContributionIds: [],
      relatedThreadIds: ["collaborative-inference"],
      overview: [
        "Pretrained speech models are frequently treated as black-box representation extractors, with downstream tasks defaulting to either the final encoder layer or legacy acoustic representations like MFCCs. However, speech tasks depend on vastly different phonetic and spectral cues: whispered speech lacks periodic vocal-fold vibration and demands rich subband spectral detail that standard cepstra discard, while atypical disfluency classification relies on intermediate phonetic transitions best captured well before the final layer.",
        "My Honours research at IIIT Hyderabad examined two related but distinct representation questions: how acoustic target design shapes whispered-speech reconstruction, and where pretrained speech encoders expose useful information for disfluency classification. The experiments show that representation choices affect these speech tasks, without establishing a general advantage over scaling model capacity."
      ],
      synthesis: [
        "Across these two speech studies, representation design mattered in different ways. In whispered-to-normal reconstruction, I experimented with SPCC-based targets rather than MFCCs to retain richer spectral structure under whispered and low-SNR conditions, while examining the resulting dimensionality and compute trade-offs. In disfluency classification, useful representation depth was classifier-dependent: HuBERT's fifth transformer layer reached peak F1 scores (97.67% prolongation, 97.95% repetition, 97.89% filled pause) with an SVM, whereas layer 4 was optimal with a CNN.",
        "Together, the studies show that the representation supplied to a downstream system is an important design choice. They do not establish that changing representations is generally preferable to increasing model capacity."
      ],
      openQuestions: [
        "Can downstream speech models learn task-conditioned dynamic routing to selectively tap intermediate representations rather than relying on fixed layer extraction?",
        "How do spectral representation choices interact with modern diffusion-based and flow-matching speech vocoders?",
        "How should the dimensionality and spectral detail of richer acoustic targets be balanced against training cost and eventual inference requirements?"
      ]
    },
    {
      id: "beyond-backpropagation",
      title: "Language-Model Adaptation and Learning Beyond Backpropagation",
      shortTitle: "Beyond Backpropagation",
      question: "How should pretrained language models be adapted when memory, backward computation, or accelerator capabilities constrain the available learning procedure?",
      homepageDesc: "Exploring quantized adaptation and forward-only optimization, from practical on-device fine-tuning to alternative learning signals and search spaces.",
      timeframe: "2024 – Present",
      linkedContributionIds: ["nntrainer", "subspace-zo", "hybrid-optimization"],
      establishedContributionIds: ["nntrainer", "subspace-zo"],
      ongoingContributionIds: ["hybrid-optimization"],
      relatedThreadIds: ["heterogeneous-execution"],
      overview: [
        "Backpropagation has underpinned deep learning for decades, but on mobile accelerators and edge NPUs, its operational requirements collide directly with hardware architecture. Storing intermediate activations across dozens of layers for reverse-mode automatic differentiation demands gigabytes of high-bandwidth memory. Moreover, commercial mobile NPUs are physically built as forward-only inference engines lacking reverse-mode autodiff kernels and mutable weight storage.",
        "Zeroth-order (ZO) optimization replaces analytical gradients with directional objective evaluations, eliminating backward passes and intermediate activation caching. However, removing backpropagation is only one part of the problem: practical forward-only learning depends critically on where the model searches (the parameter subspace), what signal guides the updates, and how the forward evaluations are executed on hardware."
      ],
      subDirections: [
        {
          letter: "A",
          title: "Where should the model search?",
          question: "How do we constrain forward-only perturbations to structured, low-dimensional subspaces of model weights?",
          description: "Naïve full-rank zeroth-order perturbation requires sampling Gaussian noise across billions of parameters, causing extreme variance in gradient estimation and overwhelming hardware dispatch. In our mobile NPU experiments, full-weight perturbation pushed 3.2 GB through a single DSP dispatch and triggered device firmware recovery crashes. Restricting updates to a low-rank subspace transforms an algorithmic approximation into an absolute hardware safety requirement.",
          establishedContributionIds: ["subspace-zo"],
          ongoingContributionIds: [],
          openQuestions: [
            "How can task and gradient information identify high-yield update subspaces before on-device forward-only training begins?",
            "When and how often should the low-rank projection basis be refreshed during training?",
            "What is the quantitative trade-off between subspace rank, refresh compute cost, and adaptation convergence rate?"
          ]
        },
        {
          letter: "B",
          title: "What learning signal should guide forward-only updates?",
          question: "Can occasional first-order information improve forward-only trajectory without full backward overhead?",
          description: "Pure zeroth-order optimization relies strictly on scalar loss differences, requiring dozens to hundreds of forward evaluations per parameter update. In collaborative or hybrid environments, a server or occasional first-order pass can periodically provide high-quality directional guidance to steer local zeroth-order updates on the device without incurring continuous backpropagation memory costs.",
          ongoingContributionIds: ["hybrid-optimization"],
          openQuestions: [
            "What exact representation should directional guidance take (e.g. low-rank momentum, gradient projections, or coordinate masks)?",
            "How resilient is forward-only adaptation to stale or asynchronous first-order guidance?",
            "What communication and compute budget minimizes total energy per accuracy point?"
          ]
        },
        {
          letter: "C",
          title: "Can forward-only learning extend beyond fine-tuning?",
          question: "How do activation-space perturbations and token-level loss signals compare to weight-space zeroth-order optimization?",
          description: "Weight-space zeroth-order methods such as Subspace-ZO target downstream adaptation of a model's real weights. A separate line of work explores whether activation-space perturbations and token-level loss feedback can provide useful learning signals. DUST, a method described by Q Labs Research, perturbs transformer activations at token positions and uses the resulting feedback to construct an update signal. I explored an adaptation of this idea in a smaller-context fine-tuning setting; this is an exploratory investigation, not a reproduction of the original pretraining-oriented method.",
          exploratoryItem: {
            title: "Exploratory Investigation of Activation-Space Perturbations (DUST-inspired)",
            description: "An adapted smaller-context experiment converged, whereas applying the original pretraining-oriented setup directly did not. The main bottleneck is turning token-level activation feedback into a useful weight-update signal without losing the memory and compute savings that motivate forward-only methods.",
            attribution: "External reference: DUST, Q Labs Research.",
            externalUrl: "https://qlabs.sh/research/dust/",
            status: "Exploratory work"
          },
          openQuestions: [
            "Can activation-space perturbations complement low-rank weight-space subspaces in edge fine-tuning?",
            "How does memory and compute scale when evaluating virtual populations inside memory-bound inference engines?",
            "Does token-level feedback provide sufficient variance reduction for broader adaptation domains?"
          ]
        }
      ],
      synthesis: [
        "Making on-device adaptation practical involves several distinct questions. NNTrainer addresses quantized first-order adaptation and model-weight residency under a constrained memory budget. Subspace-ZO explores forward-only adaptation through a learned low-rank search space over the model's real weights, with subspace restriction also serving as a hardware-safety constraint. The ongoing FO/ZO direction asks whether occasional first-order guidance can improve local zeroth-order updates without restoring continuous backward-pass costs.",
        "These are distinct design choices rather than one algorithm: where to search, what learning signal to use, and how to execute the resulting forward evaluations."
      ],
      openQuestions: [
        "How do we systematically choose the optimal mixture of zeroth-order forward evaluations and periodic first-order guidance across varying network bandwidths?",
        "Can forward-only adaptation preserve calibration and safety guarantees when updating quantized foundation models in the wild?",
        "What minimal hardware primitives (e.g. lightweight hardware sign multipliers or scratchpad accumulators) would make NPUs 10× more efficient for forward-only learning?"
      ]
    },
    {
      id: "collaborative-inference",
      title: "Collaborative Generation and Inference",
      shortTitle: "Collaborative Generation",
      question: "How can models with different capabilities cooperate during generation without discarding useful context or repeating computation?",
      homepageDesc: "Designing generation and handoff strategies that reuse model state and divide work across device and server models.",
      timeframe: "2024 – Present",
      linkedContributionIds: ["hybrid-llm-inference"],
      establishedContributionIds: ["hybrid-llm-inference"],
      ongoingContributionIds: [],
      relatedThreadIds: ["beyond-backpropagation", "heterogeneous-execution"],
      overview: [
        "Modern generative AI deployments typically face an artificial dilemma: either run a compact model entirely on-device (fast, private, but limited in reasoning depth), or stream all prompts to large cloud models (capable, but high serving cost and network latency). Naïve hybrid approaches that simply switch models at designated points waste computation by forcing the server to recompute full prompt prefill from scratch.",
        "This research thread investigates how heterogeneous models—differing in size, architecture, and even vocabulary—can collaboratively generate text while sharing intermediate state, reusing draft computations, and maintaining exact mathematical output quality."
      ],
      synthesis: [
        "In our hybrid speculative handoff framework, an on-device model drafts candidate tokens locally and translates them into the server model's vocabulary using direct token mapping and an n-gram merge cache. When the server verifies drafts in a batched pass, that verification simultaneously validates the draft and constructs the target model's own KV state, eliminating catch-up prefill. In cloud GPU experiments, this reduced server decode time from 11.2 s to 4.0 s (2.797×) and total latency by 1.394× with zero loss in generation quality under greedy decoding.",
        "The key insight is that generation work should be allocated dynamically according to difficulty, and representation mapping must preserve context continuity across disparate models."
      ],
      openQuestions: [
        "Can intermediate-layer early exit representations be passed across network boundaries as compressed speculative prompts?",
        "How can collaborative generation extend from autoregressive text to multi-token diffusion and non-autoregressive decoding blocks?",
        "What verification mechanisms guarantee worst-case quality parity under stochastic sampling rather than greedy decoding?"
      ]
    },
    {
      id: "heterogeneous-execution",
      title: "Heterogeneous Execution for Machine Learning",
      shortTitle: "Heterogeneous Execution",
      question: "How should training and inference workloads be decomposed and scheduled across CPUs, GPUs, and NPUs to respect each accelerator's execution model?",
      homepageDesc: "Co-designing runtimes, data movement, and scheduling around heterogeneous accelerators and their memory and dispatch constraints.",
      timeframe: "2024 – Present",
      linkedContributionIds: ["snaplite", "cpu-npu", "nntrainer"],
      establishedContributionIds: ["snaplite", "cpu-npu", "nntrainer"],
      ongoingContributionIds: [],
      relatedThreadIds: ["beyond-backpropagation"],
      overview: [
        "Machine learning deployment in production environments cannot assume uniform hardware. Real mobile devices and edge platforms feature asymmetric multi-core CPUs, GPUs with shared system RAM, and fixed-function NPUs with highly specialized vector tightly-coupled memory (VTCM). Hardware availability alone does not guarantee acceleration: without co-designed memory layout, asynchronous dispatch, and execution-aware partitioning, accelerator overheads often exceed the latency of running on a standard CPU.",
        "This thread focuses on systems-level co-design: analyzing execution bottlenecks, eliminating cross-bus synchronization stalls, and scheduling workloads across heterogeneous cores according to their natural compute and memory strengths."
      ],
      synthesis: [
        "Across SnapLite, CPU–NPU co-execution, and NNTrainer, the shared issue is how execution should be organized around each accelerator's constraints. SnapLite brought deployment paths for more than 200 on-device models onto a LiteRT-based runtime while retaining the relevant accelerator-specific optimizations. In CPU–NPU LLM training, asynchronous layer submission and DMA-backed data movement addressed synchronization overhead between the host and Hexagon. NNTrainer's quantized training path separately integrated CPU execution support and managed model-weight residency through checkpointing and Flash Storage.",
        "Runtime performance on heterogeneous systems is dictated primarily by data movement and synchronization boundaries, not raw TOPS."
      ],
      openQuestions: [
        "How should zero-copy shared memory buffers be orchestrated across DSP/NPU scratchpads and host CPUs without memory cache invalidation penalties?",
        "Can runtime compilation dynamically repartition attention graphs between CPU and NPU based on real-time thermal throttling indicators?",
        "What automated compiler abstractions can translate arbitrary neural network training graphs into inference-equivalent fused batches?"
      ]
    },
    {
      id: "active-multimodal-reasoning",
      title: "Active Multimodal Reasoning",
      shortTitle: "Active Multimodal Reasoning",
      question: "Can a multimodal model learn what visual evidence to inspect, at what granularity, and what information to retain for later reasoning?",
      homepageDesc: "Exploring active visual inspection and memory allocation for multi-turn or long-horizon video understanding.",
      status: "Emerging",
      timeframe: "2025 – Present",
      linkedContributionIds: ["vigorl-video"],
      establishedContributionIds: [],
      ongoingContributionIds: ["vigorl-video"],
      relatedThreadIds: ["speech-representations"],
      overview: [
        "Current video-language models typically process videos by uniformly sampling frames (e.g. 1 frame per second) and feeding all visual tokens into transformer attention. For long-horizon videos, this approach is both computationally wasteful and cognitively flawed: vast numbers of tokens are spent encoding static backgrounds and redundant action, while subtle, high-information moments are downsampled or dropped completely to fit within fixed context windows.",
        "This emerging research direction treats visual perception not as a passive, static ingestion stream, but as an active sequential decision problem under explicit token and compute budgets. The goal is to formulate reinforcement-learned policies that decide when to look closer, what spatial regions to crop, and how to condense temporal memory for downstream multi-step reasoning."
      ],
      synthesis: [
        "This is an active collaboration extending reinforcement-learning-based visual grounding into long-horizon temporal domains. The shared research plan explores three connected questions: what visual evidence to inspect, what information to retain, and how to combine both under an on-device compute and memory budget. The work is ongoing, and this page describes the collaboration's research direction rather than presenting completed individual results.",
        "This direction remains ongoing and exploratory. Claims and results will be reported as formal evaluations are completed with collaborators."
      ],
      openQuestions: [
        "What reward formulation best balances active inspection accuracy against total token and inference FLOP expenditure?",
        "How should visual working memory be structured to retain temporal dependencies over thousands of frames without quadratic attention cost?",
        "Can reinforcement-learned inspection policies generalize zero-shot to unseen video lengths and camera motions?"
      ]
    }
  ],

  // ── CHRONOLOGICAL RESEARCH TRAJECTORY ───────────────────────────────────────
  projects: [
    {
      id: "wesper",
      primaryThreadId: "speech-representations",
      relatedThreadIds: [],
      type: "early_observation",
      status: "Observation",
      statusDetail: "IIIT Hyderabad · Early observation",
      title: "Early Observation: Reconstructing Speech from Incomplete Acoustic Evidence",
      articleTitle: "Reconstructing Speech from Incomplete Acoustic Evidence",
      year: "2023–2024",
      tags: ["REPRESENTATIONS", "SPEECH"],
      category: "representations",
      claim: "Investigating SPCC-based acoustic targets in self-supervised whispered-to-normal speech reconstruction exposed the trade-off between representational richness and computational cost.",
      metricsHighlight: "Early research observation · HuBERT + FastSpeech",
      metadata: ["IIIT Hyderabad", "Speech Processing Lab"],
      artifacts: [{"label": "Observation notes", "url": "/projects/wesper"}],
      tldr: [
        "Whispered speech lacks periodic vocal-fold excitation, requiring reconstruction models to infer missing acoustic information rather than simply denoise.",
        "Explored HuBERT-based encoder with FastSpeech-style acoustic decoder and HiFi-GAN vocoder.",
        "Experimented with SPCC-based targets in place of MFCCs to preserve richer spectral structure under low-SNR conditions.",
        "Richer acoustic targets preserve more spectral detail, but increase feature dimensionality and training compute."
      ],
      article: {
        intro: "My early speech research began with whispered-to-normal speech reconstruction. Whispered speech lacks the periodic vocal-fold excitation that gives voiced speech its harmonic structure, so reconstruction requires a model to infer information that is absent from the input rather than simply denoise an otherwise complete signal. I explored a HuBERT-based encoder with a FastSpeech-style acoustic decoder and HiFi-GAN vocoder, focusing on the acoustic targets used to shape the learned representation.",
        sections: [
          {
            type: "heading",
            content: "Research Motivation"
          },
          {
            type: "paragraph",
            content: "Whispered speech is not simply ordinary speech recorded at low volume. Without regular vocal-fold excitation, it lacks periodic structure and harmonic cues. A reconstruction model must infer missing voiced characteristics from remaining spectral and articulatory information. A target feature that discards fine spectral structure can limit what the reconstruction system learns to recover."
          },
          {
            type: "heading",
            content: "Architecture and Investigation"
          },
          {
            type: "paragraph",
            content: "Rather than relying on MFCC targets, I experimented with SPCC-based targets to preserve richer spectral information under whispered and low-SNR conditions. This was not simply a feature concatenation at inference: the aim was to alter the representation-learning signal itself in the HuBERT-related pipeline."
          },
          {
            type: "heading",
            content: "Dimensionality and System Cost"
          },
          {
            type: "paragraph",
            content: "The richer target increased feature dimensionality and computational burden. I investigated spectral smoothing and component selection to control that cost while retaining useful information. The broader lesson was that representation design is not independent of system cost: a richer signal can improve what a model can learn, while changing the computation required to use it."
          },
          {
            type: "heading",
            content: "Role in Research Trajectory"
          },
          {
            type: "paragraph",
            content: "This work represents the initial exploratory observation that sparked my sustained focus on task-specific representations and their computational trade-offs, motivating the subsequent Interspeech disfluency study."
          }
        ]
      }
    },
    {
      id: "speech-reps",
      primaryThreadId: "speech-representations",
      relatedThreadIds: [],
      type: "paper",
      title: "Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach",
      articleTitle: "Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach",
      year: "2023–2025",
      tags: ["REPRESENTATIONS", "SPEECH"],
      category: "representations",
      claim: "Layer-wise probing of self-supervised speech encoders reveals that representation utility is classifier-dependent: HuBERT layer 5 yields 97.67–97.95% F1 with an SVM, while layer 4 performs best with a CNN.",
      metricsHighlight: "97.95% peak F1 (SVM L5) · 95.84% (CNN L4)",
      status: "Published",
      statusDetail: "Interspeech 2025 · Published",
      link: "https://doi.org/10.21437/Interspeech.2025-964",
      metadata: ["IIIT Hyderabad · Interspeech 2025", "Co-author with Prof. Anil Kumar Vuppala"],
      artifacts: [
        {"label": "Project notes", "url": "/projects/speech-reps"},
        {"label": "Interspeech DOI", "url": "https://doi.org/10.21437/Interspeech.2025-964", "isExternal": true},
        {"label": "Paper PDF", "url": "/publications/Interspeech.pdf", "isExternal": true}
      ],
      tldr: [
        "Downstream speech systems often default to the final encoder layer, but early/intermediate layers retain localized temporal and acoustic cues.",
        "Layer-wise probing of Wav2Vec 2.0, HuBERT, WavLM, and TERA demonstrated classifier-dependent representation utility.",
        "With an SVM, HuBERT's fifth transformer layer achieved peak F1 scores (97.67% prolongation, 97.95% repetition, 97.89% filled pause); with a CNN, layer 4 was optimal.",
        "Evaluated on IIITH-TISA (10h stuttered corpus, 30 speakers, 3,251 clips) and the expanded IIITH-IED-E dataset."
      ],
      bibtex: `@inproceedings{kommagouni2025towards,
  title={Towards Classification of Typical and Atypical Disfluencies: A Self Supervised Representation Approach},
  author={Kommagouni, Priyanka and Khanna, Pragya and Narasinga, Vamshiraghusimha and Bocha, Anirudh and Vuppala, Anil Kumar},
  booktitle={Interspeech},
  year={2025},
  doi={10.21437/Interspeech.2025-964}
}`,
      article: {
        intro: "I studied how self-supervised speech encoders represent the acoustic and temporal differences between typical conversational disfluencies and atypical disfluencies associated with stuttering. Rather than assuming that the final encoder output is the best feature for classification, I performed a layer-wise analysis of Wav2Vec 2.0, HuBERT, WavLM, and TERA, evaluating their representations with SVM and CNN classifiers. The best-performing representation depended on the classifier: with an SVM, HuBERT's fifth transformer layer achieved F1 scores of 97.67% for prolongation, 97.95% for repetition, and 97.89% for filled pauses; with a CNN, layer 4 performed best.",
        sections: [
          {
            type: "heading",
            content: "Research Question"
          },
          {
            type: "paragraph",
            content: "Downstream systems often use the final representation of a pretrained speech encoder by default, but a final layer is optimized for the pretraining objective, not necessarily for every downstream task. Which representation depth best separates typical conversational hesitations from atypical disfluencies associated with stuttering?"
          },
          {
            type: "heading",
            content: "Starting Observation"
          },
          {
            type: "paragraph",
            content: "Typical conversational disfluencies (hesitations, filled pauses, repetitions) are part of ordinary speech. Atypical disfluencies associated with stuttering can share surface forms while differing in acoustic realization, timing, and severity. A classifier needs to resolve subtle temporal and spectral cues rather than simply detect whether a pause occurred."
          },
          {
            type: "heading",
            content: "Method and Experimental Design"
          },
          {
            type: "paragraph",
            content: "The study compared layer-wise representations from four self-supervised speech models (Wav2Vec 2.0, HuBERT, WavLM, and TERA) evaluated using both SVM and CNN classifiers. The paper also compared learned SSL features with handcrafted acoustic feature sets (eGeMAPS and openSMILE) and examined CCA-based combinations of HuBERT layer-5 features with handcrafted features across speaker-exclusive train/validation/test splits."
          },
          {
            type: "figure",
            caption: "Layer-wise performance: Peak at Intermediate Layers",
            visual: "speech-layers"
          },
          {
            type: "heading",
            content: "Results: Classifier-Dependent Layer Utility"
          },
          {
            type: "paragraph",
            content: "The best-performing representation depended on the classifier. With an SVM, HuBERT's fifth transformer layer achieved F1 scores of 97.67% for prolongation, 97.95% for repetition, and 97.89% for filled pauses. With the CNN, HuBERT's fourth layer performed best. The paper does not show that layer 5 is universally optimal; it shows that useful representation depth is a design variable that interacts with downstream classifier architecture."
          },
          {
            type: "result-table",
            content: "97.95% / 97.67% / 97.89%\nSVM + HuBERT Layer 5 (Rep / Prol / FP F1)\n\n95.71% / 94.51% / 95.84%\nCNN + HuBERT Layer 4 (Rep / Prol / FP F1)\n\nIIITH-TISA & IIITH-IED-E\n10h stuttered corpus (30 speakers, 3,251 clips)"
          },
          {
            type: "heading",
            content: "My Contribution"
          },
          {
            type: "paragraph",
            content: "I ran layer-wise extraction experiments across the four model families, contributed to Indian-English speech resources through IIITH-TISA and the expanded IIITH-IED-E dataset, and co-authored the Interspeech 2025 publication. The work was collaborative within Prof. Anil Kumar Vuppala's Speech Processing Lab."
          }
        ]
      }
    },
    {
      id: "snaplite",
      primaryThreadId: "heterogeneous-execution",
      relatedThreadIds: [],
      type: "system",
      title: "A Unified Deployment Path for 200+ On-Device Models",
      articleTitle: "SnapLite: Heterogeneous On-Device Inference Runtime",
      year: "2024",
      tags: ["SYSTEMS", "INFERENCE", "HETEROGENEOUS"],
      category: "systems",
      claim: "Migrating Samsung's production runtime from TFLite 2.20 to LiteRT unified deployment across 200+ models, achieving 10\u00d7 GPU (1,200ms \u2192 120ms) and 8.8\u00d7 NPU (1,320ms \u2192 150ms) first-inference speedups and up to 2.18\u00d7 runtime latency reduction.",
      metricsHighlight: "10\u00d7 GPU / 8.8\u00d7 NPU first inference \u00b7 Up to 2.18\u00d7 runtime speedup",
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
      primaryThreadId: "speech-representations",
      relatedThreadIds: [],
      type: "open_source",
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
      bibtex: `@inproceedings{vuppala2025waveformwizard,
  title={Waveform-Wizard: A free tool for Spectro-Temporal visualization of Speech},
  author={Vuppala, Anil and Bocha, Anirudh and Reddy, Abhinav and Chavali, Sasidhar and Survi, Saikiran and Losetti, Srivatsa and Harsha, Sree and Vuddagiri, Sumanth and Harshwardhan and Bandarupalli, Srihari and Narasinga, Vamshiraghusimha and Barche, Purva},
  booktitle={ICASSP Show & Tell},
  year={2025}
}`,
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
      primaryThreadId: "beyond-backpropagation",
      relatedThreadIds: ["heterogeneous-execution"],
      type: "paper",
      title: "Memory-Efficient Causal LLM Fine-Tuning with Quantized LoRA",
      articleTitle: "On-Device LLM Personalization with NNTrainer",
      year: "2025\u20132026",
      tags: ["ADAPTATION", "QUANTIZATION", "SYSTEMS"],
      category: "adaptation",
      claim: "Quantization-aware causal LLM adaptation with block-aware scales and Flash Storage-backed weight checkpointing reduces measured on-device training footprint from ~3 GB to below 0.5 GB.",
      metricsHighlight: "<0.5 GB training footprint · Flash Storage · Block-aware QAT",
      status: "",
      statusDetail: "Samsung Research India · Advanced Research Fund",
      codeLink: "https://github.com/b-saianirud/nntrainer/tree/LoRA",
      metadata: ["Samsung Research · Advanced Research Fund", "Samsung Special Recognition Award"],
      artifacts: [{"label": "Project notes", "url": "/projects/nntrainer"}, {"label": "Code", "url": "https://github.com/b-saianirud/nntrainer/tree/LoRA", "isExternal": true}, {"label": "NPU Co-execution", "url": "/projects/cpu-npu"}],
      tldr: [
        "Causal-LLM training on mobile devices is constrained by memory ceilings rather than pure compute throughput.",
        "Quantized Q4_0 execution through ggml and QINT4 through KleidiAI kernels keep frozen base weights compact.",
        "Quantization-aware causal LoRA maintains block-aware Q4_0 scales via EMA updates to eliminate post-training drift.",
        "Flash Storage-backed weight checkpointing drops measured training footprint from ~3 GB to below 0.5 GB (activation checkpointing was investigated but was not the primary driver in short context)."
      ],
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
              content: "Training Memory Residency and Flash Storage"
            },
            {
              type: "paragraph",
              content: "The measured training footprint for a roughly 1-GB base model initially reached approximately 3 GB. Using NNTrainer's weight-checkpointing path backed by its Flash Storage feature, we reduced the measured training footprint to below 0.5 GB. Activation checkpointing was explored, but in this short-context setting it was not the mechanism behind the headline reduction. I also introduced Progressive LoRA, which applies temperature-aware scheduling and adaptive pauses to make adaptation sustainable under mobile thermal envelopes."
            },
            {
              type: "figure",
              caption: "Memory Footprint Reduction via Flash Storage",
              visual: "nntrainer-memory"
            },
            {
              type: "heading",
              content: "Results"
            },
            {
              type: "result-table",
              content: "~3 GB → <0.5 GB\nMeasured training footprint\n\nFlash Storage\nWeight-checkpointing on device\n\nProgressive LoRA\nTemperature-aware scheduling under thermal limits"
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
      primaryThreadId: "heterogeneous-execution",
      relatedThreadIds: ["beyond-backpropagation"],
      type: "system",
      title: "Asynchronous CPU\u2013NPU Co-Execution for LLM Training",
      articleTitle: "Asynchronous CPU\u2013NPU Co-Execution for LLM Training",
      year: "2025\u20132026",
      tags: ["SYSTEMS", "ADAPTATION", "HARDWARE"],
      category: "systems",
      claim: "Overcoming layer-by-layer CPU\u2013NPU synchronization via asynchronous DMA ring-buffer enqueue delivers 8\u00d7 faster training than CPU backpropagation, with ~5\u00d7 prefill acceleration.",
      metricsHighlight: "8\u00d7 faster training vs CPU backprop \u00b7 ~5\u00d7 prefill",
      status: "",
      statusDetail: "Samsung Research India \u00b7 2025",
      metadata: ["Samsung Research India \u00b7 2025", "Qualcomm Hexagon NPU"],
      artifacts: [{"label": "Project notes", "url": "/projects/cpu-npu"}, {"label": "Adaptation notes", "url": "/projects/nntrainer"}],
      tldr: ["Initial hybrid execution placed matrix operations on the NPU but was bottlenecked by CPU\u2013NPU sync latency.", "Replaced synchronous execution with asynchronous DMA ring-buffer enqueue and FastRPC-accessible memory buffers.", "Adapted Hexagon HMX (matrix) and HVX (vector) kernels to execute the backward pass and gradient accumulation on-accelerator.", "Reported 8\u00d7 faster training than CPU backpropagation; a separate prefill measurement showed ~5\u00d7 acceleration."],
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
              type: "paragraph",
              content: "The result is an execution path in which the NPU accelerates the training workload as a whole rather than a set of isolated forward operations. The reported result is 8× faster training than CPU backpropagation. An earlier measurement separately reported approximately 5× prefill acceleration; these are distinct benchmark conditions and are kept separate."
            },
            {
              type: "result-table",
              content: "8×\nFaster training than CPU backpropagation\n\n~5×\nPrefill acceleration (separate benchmark)\n\nFastRPC & DMA\nAsynchronous ring-buffer submission"
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
      primaryThreadId: "beyond-backpropagation",
      relatedThreadIds: ["heterogeneous-execution"],
      type: "paper",
      title: "Subspace-Restricted Zeroth-Order Fine-Tuning of Real Weights on Mobile NPUs",
      articleTitle: "Necessity, Not Convenience: Subspace-Restricted Zeroth-Order Fine-Tuning of Real Weights on Mobile NPUs",
      year: "2026",
      tags: ["OPTIMIZATION", "ADAPTATION", "HARDWARE"],
      category: "optimization",
      claim: "Restricting zeroth-order perturbations to a gradient-informed low-rank subspace prevents firmware recovery crashes and reaches 92.0% SST-2 accuracy on Qualcomm Hexagon hardware.",
      metricsHighlight: "92.0% SST-2 (vs 92.7% full LoRA) \u00b7 10.5\u00d7 speedup",
      status: "Active research",
      statusDetail: "Active research \u00b7 selected experimental results",
      metadata: ["Qwen3-0.6B \u00b7 Qualcomm Hexagon NPU", "Lead author \u00b7 Real-weight subspace ZO"],
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
              content: "The adaptation target is the model's real weights, not a persistent LoRA adapter. For a target matrix W, I learn low-rank factors U_r and V_r and sample Rademacher directions in the reduced coefficient space. Forward hooks apply the resulting perturbations through activations, avoiding the construction and restoration of full perturbed weight tensors. The estimator is FZOO-compatible, with sign-based directions that suit the NPU's efficient integer arithmetic paths."
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
              content: "On real Qualcomm Hexagon NPU hardware with Qwen3-0.6B on SST-2 (N=500), the subspace-restricted adaptive-N method reached 92.0% accuracy, closely approaching the 92.7% full-LoRA baseline. The adaptive-N controller used approximately 30% fewer forward evaluations than a fixed-N=8 configuration (which reached 86.7%). For subspace refresh, batched block power iteration reduced rank-64 refresh time from 270 s to 5.4 s (50×); at rank 256, NPU refresh took 49.5 s vs 452.4 s on CPU (9.1×), and steady-state step time fell from 28.9 s to 2.75 s (10.5×)."
            },
            {
              type: "result-table",
              content: "92.0%\nSST-2 accuracy on NPU (vs 92.7% full-LoRA)\n\n50×\nRank-64 refresh speedup (270s → 5.4s)\n\n9.1× / 10.5×\nRank-256 refresh & steady-state step speedup"
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
              content: "This remains active research. A venue or submission status is not listed here. The page reports selected experiments rather than claiming a complete rank or task sweep."
            }
          ]
        }
    },

    {
      id: "hybrid-llm-inference",
      primaryThreadId: "collaborative-inference",
      relatedThreadIds: [],
      type: "paper",
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
              content: "The server-compute result corresponds to a reduction from 11.2 s to 4.0 s for measured decode computation. A separate realistic comparison with an approximately 1,800-token context measured a 1.307× speedup with a warm KV cache relative to a cold-cache run; this is distinct from the speculative handoff measurements above."
            },
            {
              type: "heading",
              content: "Current Status and Limitations"
            },
            {
              type: "paragraph",
              content: "Timing tests used cloud GPUs (T4 and A6000 setups); mobile drafter execution and the integrated mobile-router-network-server path remain open to end-to-end hardware validation. Furthermore, several component experiments produced important negative or nuanced evidence:\n\n• **Escalation Router:** Implemented, but the production threshold across open-domain distributions remains uncalibrated.\n• **N-gram Cache:** Handles non-one-to-one token mappings, but did not improve throughput on the measured open conversational workload.\n• **Online Drafter Training:** Improved tokens-per-call by 5.4% on GSM8K, but showed no benefit on open conversational Q&A, demonstrating domain dependence.\n• **Adaptive Speculation Length:** An initial apparent +53.9% gain was retracted after identifying and correcting a token-selection-policy confound.\n• **Quantized Drafter:** Same-GPU concurrent quantized drafting did not provide net throughput gains in the tested conversational setup."
            },
            {
              type: "heading",
              content: "My Contribution"
            },
            {
              type: "paragraph",
              content: "This was a collaborative project with Dr. Prateek Kesarwani and colleagues at Samsung Research India. My contribution focused on the cross-vocabulary translation mechanism and speculative verification handoff. The server model's own KV state is established during target verification rather than transferred from the local model."
            }
          ]
        }
    },
    {
      id: "hybrid-optimization",
      primaryThreadId: "beyond-backpropagation",
      relatedThreadIds: [],
      type: "ongoing_project",
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
      primaryThreadId: "active-multimodal-reasoning",
      relatedThreadIds: ["speech-representations"],
      type: "ongoing_project",
      title: "Active Video Reasoning: Learning What to Inspect and What to Remember",
      articleTitle: "Active Video Reasoning: Learning What to Inspect and What to Remember",
      year: "Ongoing",
      tags: ["MULTIMODAL", "REASONING", "ONGOING"],
      category: "ongoing",
      claim: "Investigating reinforcement-learned budgeted active visual inspection and streaming visual working memory for long-horizon video understanding under explicit compute budgets.",
      status: "Ongoing",
      statusDetail: "Ongoing collaboration · Research plan",
      metadata: ["Collaborative research direction", "Reinforcement learning on visual budgets"],
      artifacts: [{"label": "Research plan notes", "url": "/projects/vigorl-video"}],
      tldr: [
        "A video model operating under a fixed visual-token budget cannot inspect every frame or retain every observation indefinitely.",
        "Direction A (Where to look): Reinforcement-learned active visual inspection policy with checkable rewards and hard token budgets.",
        "Direction B (What to keep): Streaming visual working memory under explicit byte/slot budgets evaluated against delayed questions.",
        "Direction C (On-device co-design): Joint looking-and-remembering policies co-designed for quantized models on edge accelerators."
      ],
      article: {
        intro: "This collaborative research direction explores active video understanding under explicit compute and memory budgets. Rather than processing a fixed set of frames and treating the resulting visual context as sufficient, the goal is to train a model to decide when it needs more evidence, which temporal segment or spatial region to inspect, and what visual information should remain available for later questions.",
        sections: [
          {
            type: "heading",
            content: "Central Research Problem"
          },
          {
            type: "paragraph",
            content: "Fixed frame sampling allocates visual computation without considering whether a frame contains useful evidence, while static memory windows discard information needed for later questions. The research explores whether a model can learn both what to inspect and what to retain while respecting explicit compute and memory budgets."
          },
          {
            type: "heading",
            content: "Axis A: Where to Look (Budgeted Active Inspection)"
          },
          {
            type: "paragraph",
            content: "A compact policy receives an initial low-resolution view of the video under a strict visual-token budget. It learns to request additional temporal intervals or zoom into spatial regions over small decision turns. Training uses reinforcement learning with checkable answer rewards and hard environment-enforced budgets, with training-time exploration scaffolding to prevent policy collapse to zero inspection."
          },
          {
            type: "heading",
            content: "Axis B: What to Keep (Streaming Memory Under Byte Budgets)"
          },
          {
            type: "paragraph",
            content: "For streaming video where questions arrive after varying delays, a memory controller decides whether to write a new observation, merge with an existing slot, overwrite, or skip under a fixed slot budget. Evaluation measures whether discriminative evidence survives beyond the recent-frame window compared against a last-few-frames baseline."
          },
          {
            type: "heading",
            content: "Axis C: On-Device Co-Design"
          },
          {
            type: "paragraph",
            content: "Combines active inspection and memory under a shared edge device envelope, trading off latency, compute, and peak memory when evaluated against quantized models on edge hardware (Jetson Orin platforms and mobile targets)."
          },
          {
            type: "heading",
            content: "Status and Collaboration Scope"
          },
          {
            type: "paragraph",
            content: "This is an active collaborative research direction. These axes represent an evolving research plan; no achieved quantitative gains or hardware benchmarks are claimed at this stage. Details will be updated as experiments conclude."
          }
        ]
      }
    },
  ],

  // ── PUBLICATIONS ───────────────────────────────────────────────────────────
  publications: [
    {
      title: "Towards Classification of Typical and Atypical Disfluencies: A Self Supervised Representation Approach",
      venue: "Interspeech 2025",
      status: "Published",
      link: "https://doi.org/10.21437/Interspeech.2025-964",
      projectId: "speech-reps",
      bibtex: `@inproceedings{kommagouni2025towards,
  title={Towards Classification of Typical and Atypical Disfluencies: A Self Supervised Representation Approach},
  author={Kommagouni, Priyanka and Khanna, Pragya and Narasinga, Vamshiraghusimha and Bocha, Anirudh and Vuppala, Anil Kumar},
  booktitle={Interspeech},
  year={2025},
  doi={10.21437/Interspeech.2025-964}
}`
    },
    {
      title: "Waveform-Wizard: A free tool for Spectro-Temporal visualization of Speech",
      venue: "ICASSP 2025 Show & Tell",
      status: "Presented",
      link: "https://spl-btp-2k24.github.io/Waveform-Wizard/",
      projectId: "waveform-wizard",
      bibtex: `@inproceedings{vuppala2025waveformwizard,
  title={Waveform-Wizard: A free tool for Spectro-Temporal visualization of Speech},
  author={Vuppala, Anil and Bocha, Anirudh and Reddy, Abhinav and Chavali, Sasidhar and Survi, Saikiran and Losetti, Srivatsa and Harsha, Sree and Vuddagiri, Sumanth and Harshwardhan and Bandarupalli, Srihari and Narasinga, Vamshiraghusimha and Barche, Purva},
  booktitle={ICASSP Show & Tell},
  year={2025}
}`
    },

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
      desc: "Built an Android application around a voice/cough-based respiratory screening model, connecting audio input to the inference pipeline and returning screening analysis through a FastAPI backend and cloud data services. Motivated subsequent speech research."
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
