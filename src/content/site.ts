export const siteContent = {
  identity: {
    name: "ANIRUDH BOCHA",
    heroEyebrow: "SAMSUNG RESEARCH INDIA · ON-DEVICE AI",
    heroHeadline: "EFFICIENT FOUNDATION MODELS UNDER REAL HARDWARE CONSTRAINTS.",
    heroParagraphs: [
      "👋 I'm a Machine Learning Engineer at [Samsung Research India](https://research.samsung.com/sri) in Bengaluru. My current work on the On-Device AI team revolves around making large foundation models run efficiently under strict constraints, with projects ranging from on-device LLM fine-tuning without backpropagation to hybrid speculative decoding across devices. I'm also interested in algorithm-system co-design, figuring out how scheduling, memory movement, and accelerator primitives can be designed together.",
      "Previously, I spent two amazing years doing Honours research at the Speech Processing Lab at [IIIT Hyderabad](https://www.iiit.ac.in/) with Prof. Anil Kumar Vuppala. There, I explored task-dependent speech representations and built systems for whispered-to-normal speech conversion. I also led a team to build Waveform-Wizard and helped curate the first Indian-English stuttered-speech corpus.",
      "Before that, I interned at Samsung Research India, where I unified the CPU, GPU, and NPU deployment paths for over 200 production vision and speech models into a single runtime. During that time, I also spent time at Docturnal working on voice-based tuberculosis screening.",
      "After slamming down my laptop's lid, I like to spend time discovering the best coffee places in town and reading about system architectures.",
      "If you find me a good fit for your team, want to chat about ML systems, or just want to say hello – please freely reach out via the links below!"
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
      heroQuestion: "Can an LLM be adapted when the accelerator can execute forward computation but does not provide the conventional backward path?",
      homepageSummary: "Mobile NPUs are built around forward execution, but the hardware path we targeted exposes no conventional backward/autodiff route. I built a forward-only fine-tuning system around zeroth-order optimization. Restricting the update to a learned low-rank subspace turned out to be not just an efficiency optimization, but a hardware requirement to avoid crashing the device.",
      metrics: [],
      article: { intro: "", sections: [] }
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
      homepageSummary: "A small model can handle many requests locally while a larger model provides additional capability when needed. I use speculative decoding as the handoff itself: the small model's draft is translated into the large model's vocabulary, then verified by the large model in a batched forward pass, simultaneously accelerating generation and transferring the context state.",
      metrics: [],
      article: { intro: "", sections: [] }
    },
    {
      id: "nntrainer",
      number: "03",
      category: "CURRENT WORK",
      title: "NNTRAINER (CPU+NPU TRAINING)",
      articleTitle: "NNTRAINER",
      metadata: [
        "SAMSUNG RESEARCH"
      ],
      heroQuestion: "How does execution scheduling impact on-device training efficiency?",
      homepageSummary: "Making on-device training practical on CPU was not enough. I extended NNTrainer to use the mobile NPU while preserving its flexible layer-level execution. By redesigning the execution path so that successive layers could be submitted asynchronously while keeping intermediate data readily accessible across the CPU and NPU, I accelerated prefill by roughly 5×.",
      metrics: [],
      article: { intro: "", sections: [] }
    }
  ],

  selectedWork: [
    {
      id: "waveform",
      number: "04",
      title: "Waveform-Wizard: A free tool for Spectro-Temporal visualization of Speech",
      metadata: "ICASSP 2025 Show & Tell",
      teaser: "I led six undergraduates in building Waveform-Wizard, an open-source Python replacement for a MATLAB-heavy speech-analysis workflow. The project rebuilt the analysis stack around Python, NumPy, SciPy, and LibROSA, adding dynamic visualization tools in a unified application.",
      result: "Presented",
      link: "/publications/Icassp_Show_and_tell.pdf",
      article: { intro: "", sections: [] }
    },
    {
      id: "speech-reps",
      number: "05",
      title: "Towards Classification of Typical and Atypical Disfluencies: A Self Supervised Representation Approach",
      metadata: "Interspeech 2025",
      teaser: "We evaluated layer-wise representations from Wav2Vec2.0, HuBERT, WavLM, and TERA for typical-vs-atypical disfluency classification. HuBERT's fifth layer reached a peak F1 of 0.97 and outperformed the final representation, showing that deeper computation was not universally more useful.",
      result: "Published",
      link: "/publications/Interspeech.pdf",
      article: { intro: "", sections: [] }
    }
  ],

  otherProjects: [
    {
      id: "snaplite",
      number: "06",
      title: "SNAPLITE RUNTIME",
      metadata: "SAMSUNG RESEARCH INDIA · 2024",
      teaser: "I led the migration from the legacy TensorFlow Lite execution backend to Google's LiteRT, reworking the runtime around a common deployment path across CPU, GPU, and NPU execution for over 200 production models. The resulting system was 10× faster on first inference.",
      result: "10× Speedup",
      article: { intro: "", sections: [] }
    },
    {
      id: "wesper",
      number: "07",
      title: "WHISPERED SPEECH REPRESENTATIONS (WESPER)",
      metadata: "IIIT HYDERABAD",
      teaser: "I reproduced WESPER, a whispered-to-normal speech conversion system, and replaced MFCC targets with SFCC because whispered and noisy speech lose fine-grained acoustic information. SFCC improved performance 10–25% at low SNR, demonstrating that changing representation space improves tasks without increasing capacity.",
      result: "10-25% Improvement",
      article: { intro: "", sections: [] }
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
