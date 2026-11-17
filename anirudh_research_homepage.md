# Anirudh Bocha — Research Homepage Content

## Content direction

A compact research portfolio for research teams, independent labs, and industry groups. The homepage should communicate the research trajectory and expose selected work; individual project pages should contain the technical detail.

The research areas are deliberately presented as themes, not as an explicit three-pillar framework. Give all three equal visual weight. The order below follows the trajectory of the work: representations, learning and adaptation, then inference and systems.

---

## Navigation

**Research** · **Publications** · **Experience** · **CV**

Keep Email and GitHub visible in the header or footer. Add Google Scholar and LinkedIn only if the profiles are maintained and linked.

---

## Hero

# Anirudh Bocha

**Machine Learning Engineer · Samsung Research India**

I work on efficient machine learning at the intersection of model design, learning algorithms, and computational systems. My work spans speech representations, LLM adaptation, alternative optimization, and inference across heterogeneous hardware.

Beginning with speech research at IIIT Hyderabad, I moved into resource-constrained LLM training and heterogeneous execution at Samsung Research, then into hybrid generation across device and server. My current work extends these questions to active multimodal reasoning.

**Links:** Email · GitHub · CV · Google Scholar (if maintained) · LinkedIn (if maintained)

---

## Research

### Representations & Model Design

Task-specific representations and model structures for deciding what information a model should encode, expose, and retain.

- [Spectral Representations for Whispered Speech](/projects/whispered-speech)
- [Layer-wise Representations for Speech Disfluency Detection](/projects/speech-disfluency)
- [ViGoRL-Video: Active Visual Reasoning and Memory](/projects/vigorl-video) — Ongoing collaboration

### Learning & Adaptation

Training and optimization methods for adapting pretrained models under data, memory, and compute constraints.

- [On-Device LLM Personalization with NNTrainer](/projects/nntrainer)
- [Subspace-Restricted Zeroth-Order Fine-Tuning](/projects/subspace-zo)
- [Hybrid First- and Zeroth-Order Adaptation](/projects/hybrid-optimization) — Ongoing

### Inference & Systems

Generation algorithms and execution systems that reuse computation across models and map workloads to heterogeneous hardware.

- [Cross-Vocabulary Speculative Decoding for Hybrid LLMs](/projects/hybrid-llm-inference)
- [Asynchronous CPU–NPU Co-Execution for LLM Training](/projects/cpu-npu-training)
- [SnapLite: Heterogeneous On-Device Inference](/projects/snaplite)

---

## Publications

**Towards Classification of Typical and Atypical Disfluencies: A Self-Supervised Representation Approach**  
Interspeech 2025 · [Paper]

---

## Open Source & Presentations

**Waveform-Wizard**  
ICASSP 2025 Show & Tell · Open-source speech analysis and visualization platform · [Project] · [Repository]


---

## Experience

**Samsung Research India**  
Machine Learning Engineer · 2025–Present

**Samsung Research India**  
Software Engineering Intern, SnapLite · Jun–Aug 2024

**IIIT Hyderabad**  
B.Tech. in Computer Science and Engineering · Honours Research, Speech Processing Lab · 2021–2025

**Docturnal**  
Software Engineering Intern · Jan–Jun 2023

---

## Footer

Anirudh Bocha · Bengaluru, India  
Email · GitHub · CV

---

# Project-page content guidance (not homepage copy)

Keep the homepage project lists title-only, with a small `Ongoing` label where appropriate. Each project should open a separate page with the following structure:

1. **Title and metadata:** dates, affiliation, collaborators, role, and accurate publication status.
2. **Research question:** one concise sentence explaining the problem.
3. **Motivation:** what limitation in existing methods or systems motivates the work.
4. **Method:** the central algorithmic, representational, architectural, or systems contribution. Clearly separate personal contributions from collaborative work.
5. **Results:** the strongest verified quantitative results, with baselines and evaluation context.
6. **Artifacts:** paper/preprint, code, presentation, and related notes.

## Project-page grouping notes

Suggested project URL paths in the research lists are placeholders; connect each title to the existing subpage or the route chosen by the design agent.

- The NNTrainer page should focus on on-device LLM adaptation (quantized LoRA, QAT, and memory-efficient training). The asynchronous CPU–NPU co-execution page should focus on dispatch, shared memory, overlap, and measured training performance. Cross-link the pages because they emerged from the same broader NNTrainer effort.
- Keep the zeroth-order fine-tuning page distinct from the ongoing hybrid optimizer direction. The former is an evaluated method; the latter is ongoing research.
- Keep cross-vocabulary speculative decoding distinct from subsequent exploratory work on intermediate-layer exits and diffusion-based drafting. Label exploratory directions accurately.
- ViGoRL-Video is collaborative ongoing work. Publish the project name and description only to the extent cleared with collaborators; do not imply sole ownership or report results that have not been established.
- Waveform-Wizard belongs under Open Source, not as a core research direction. Its ICASSP 2025 Show & Tell presentation should be clearly distinguished from the Interspeech peer-reviewed paper.

## Implementation notes for the design agent

- Keep the existing restrained visual language; prioritize content hierarchy over decorative redesign.
- Make the three research categories visually equal in prominence.
- Project names should be the primary clickable elements. Avoid homepage paragraphs, large project cards, or repeated metric tiles.
- Keep research-area descriptions to one sentence each.
- Keep the hero to two short paragraphs at most.
- Retain a compact publication list and experience timeline.
- Put detailed explanations, metrics, diagrams, implementation notes, and code links on project subpages.
- Use consistent title case and status labels (`Ongoing`, `Published`, `Under review`) only where accurate.
