# Research Portfolio: Content Architecture & Implementation Brief

## 1. The organizing idea

The site should represent two related but distinct levels of research:

1. **Research threads** explain the questions that connect several projects and papers, how those questions have evolved, and what is being explored next.
2. **Contributions** are the concrete papers, methods, systems, tools, and experiments that provide evidence of the work.

A research thread is not a publication and a project page is not a research agenda. They should link to one another, but must not repeat one another.

The homepage should behave as a compact research map. A thread page should provide the intellectual context. A paper or project page should provide the technical detail.

Do not explicitly present the site as three pillars. The breadth across model/representation design, learning methodology, and computational execution should become clear through the threads and their linked contributions.

---

## 2. Current-site audit and what should change

The current homepage already has a strong minimalist base: a short introduction, a research list, publication and experience sections, direct project links, and a restrained visual style. Keep that design language.

The current “Research Trajectory” list contains ten contributions and filter chips such as Adaptation & Systems, Optimization, Representations, and Ongoing. This is useful for browsing, but it makes the site feel like one flat list with tags. It does not fully communicate how several contributions connect into a sustained research question.

### Keep

- Existing typography, layout, navigation treatment, white background, spacing, and responsive behaviour.
- Existing project pages and their technical material, diagrams, result tables, and artifact links.
- Concise, finding-oriented project titles.
- Direct links to papers, code, notes, and presentations when those artifacts are public.
- Publication and experience sections.

### Change

- Replace the filter-first homepage presentation with a small set of **Research Threads**.
- Keep a compact “Selected Contributions” or “All Work” index for individual project/paper entries.
- Add thread pages that link several projects together and describe the research questions behind them.
- Add a reusable page type for a research direction, distinct from a paper/project page.
- Allow a contribution to appear in more than one thread through cross-links; do not force every project into one exclusive category.
- Clearly separate established results, ongoing work, and exploratory reproductions of external methods.

The goal is to add a research narrative layer, not to rebuild the frontend.

---

## 3. Proposed site hierarchy

### Homepage `/`

1. **Identity / introduction** — two or three sentences describing the overall research interests.
2. **Research Threads** — four or five compact entries. Each has a title, one-sentence research question, and two or three linked contributions.
3. **Selected Publications** — formal publication records only, with accurate status labels.
4. **Selected Systems & Open Source** — only if this adds information not already obvious from the research index; keep compact.
5. **Experience** — concise chronology.
6. **Contact** — existing links.

The homepage should not contain long project explanations. Use claim-oriented titles and short metadata. The research thread titles should be broader than paper titles.

### Research thread pages `/research/<thread-slug>`

These are umbrella pages. They should answer:

- What is the central research question?
- Why is it important?
- Which contributions have informed this line of work?
- What is established versus still being explored?
- What questions might come next?

A thread page should not reproduce the full methodology or result tables from each linked project. It should synthesize and connect them.

### Contribution pages `/projects/<project-slug>`

Keep the existing technical project pages. Each page is the source of truth for its own methodology, experiments, contributions, limitations, and artifacts.

Contribution types may include:

- Paper / research contribution
- Systems or runtime contribution
- Open-source tool
- Ongoing project
- Exploratory reproduction / research note

### Publications

Keep a dedicated, compact publication list. Use precise statuses: Published, Public preprint, Under review, In preparation, or Ongoing. Do not display contradictory labels such as “preparing for submission” and “under review” at the same time.

---

## 4. Research threads for the current portfolio

These are working titles and descriptions. They are intentionally framed as research questions rather than fixed skill categories.

### Thread A — Task-Specific Speech Representations

**Question:** What information should a speech model represent, and which parts of a pretrained representation are actually useful for a downstream task?

**Homepage description:** Studying acoustic targets and intermediate representations for speech reconstruction and disfluency detection.

**Linked contributions:**
- Richer Spectral Targets Improve Whispered-Speech Reconstruction (WESPER)
- HuBERT's Fifth Layer Outperforms Its Final Layer for Disfluency Detection

**Thread-page flow:**
1. Motivation: speech tasks depend on different acoustic and linguistic cues; a richer representation is not automatically a better or cheaper one.
2. WESPER: spectral target design, SFCC, reconstruction quality, low-SNR results, and feature-cost trade-offs.
3. HuBERT: layer-wise representation analysis and the finding that layer 5 out of 24 reaches 0.97 F1 and outperforms the final layer.
4. Synthesis: task performance can depend on where information is represented, not simply on using the final or largest representation.
5. Open questions: task-conditioned representation selection, intermediate-layer use, and balancing representational richness with compute.

Keep the two individual technical project pages separate; the thread page explains their conceptual connection.

### Thread B — Language-Model Adaptation and Learning Beyond Backpropagation

**Question:** How should pretrained language models be adapted when memory, backward computation, or accelerator capabilities constrain the available learning procedure?

**Homepage description:** Exploring quantized adaptation and forward-only optimization, from practical on-device fine-tuning to alternative learning signals and search spaces.

**Linked contributions:**
- Memory-Efficient Causal LLM Fine-Tuning with Quantized LoRA (NNTrainer)
- Necessity, Not Convenience: Subspace-Restricted Zeroth-Order Fine-Tuning of Real Weights on Mobile NPUs
- N-FUSE: A Fused-Execution Framework for Fast, Backprop-Free LLM Training on Mobile NPUs
- Combining Forward-Only Adaptation with First-Order Guidance (ongoing)

**Important relationship:** NNTrainer establishes the backpropagation-based, quantized adaptation baseline and the practical memory/runtime constraints. The subspace-ZO project explores an alternative forward-only update method. N-FUSE is a distinct paper focused on the fused execution architecture and parameterization needed to make ZO training efficient on inference-oriented NPUs. The hybrid optimizer is a later research direction, not a result of either paper.

**Thread-page flow:**
1. Motivation: adaptation is not a single algorithmic choice; the model, learning procedure, and execution substrate jointly determine what is feasible.
2. Backprop-based adaptation: quantized LoRA, QAT, memory reduction, and the NNTrainer work.
3. Forward-only real-weight adaptation: learned/gradient-informed low-rank subspace, FZOO, NPU constraints, and measured outcomes.
4. NPU-native execution: N-FUSE's separation of estimator, parameterization, and execution.
5. Ongoing work: better subspace selection; hybrid first-/zeroth-order guidance; exploratory activation-space learning.
6. Open questions: how to improve the quality of the search space, how to improve learning signals, and how to choose the right mixture of first-order and zeroth-order computation.

### Thread C — Collaborative Generation and Inference

**Question:** How can models with different capabilities cooperate during generation without discarding useful context or repeating computation?

**Homepage description:** Designing generation and handoff strategies that reuse model state and divide work across device and server models.

**Linked contributions:**
- Reusing Local Drafts for Cross-Vocabulary Speculative Handoff
- Any later intermediate-layer exit or block-generation work, once there is a concrete experiment and a public description.

**Thread-page flow:**
1. Motivation: device/server collaboration can reduce latency or serving cost, but naïve handoff may duplicate prefill and lose useful state.
2. Hybrid speculative handoff: local drafting, server verification, vocabulary translation, and reuse of local context/state.
3. Results: report the measured 1.394× end-to-end latency reduction and 2.797× lower server decode computation only with their exact evaluation setup and baseline stated.
4. Ongoing questions: intermediate-layer exits, diffusion-style block generation, and how to allocate generation across models with complementary capabilities.

Do not imply that early exits or diffusion-based generation have results unless those experiments have been completed.

### Thread D — Heterogeneous Execution for Machine Learning

**Question:** How should training and inference workloads be decomposed and scheduled across CPUs, GPUs, and NPUs to respect each accelerator's execution model?

**Homepage description:** Co-designing runtimes, data movement, and scheduling around heterogeneous accelerators and their memory and dispatch constraints.

**Linked contributions:**
- A Unified Deployment Path for 200+ On-Device Models (SnapLite)
- Asynchronous CPU–NPU Co-Execution for LLM Training
- N-FUSE (cross-linked from the learning/ZO thread)
- NNTrainer (cross-linked for quantized model execution and training support)

**Thread-page flow:**
1. Motivation: accelerator availability alone does not guarantee efficient execution; packing, dispatch, data movement, synchronization, and memory layout matter.
2. SnapLite: unified deployment, backend preservation, graph partitioning, and time-to-first-inference result.
3. CPU–NPU co-execution: asynchronous dispatch, shared memory/data movement, and prefill/training results.
4. N-FUSE: link to the NPU-specific fused execution contribution rather than repeating its full technical details.
5. Synthesis: execution strategies must be selected with the accelerator's actual primitives and bottlenecks in mind.

### Thread E — Active Multimodal Reasoning (Emerging)

**Question:** Can a multimodal model learn what visual evidence to inspect, at what granularity, and what information to retain for later reasoning?

**Homepage description:** Exploring active visual inspection and memory allocation for multi-turn or long-horizon video understanding.

**Linked contribution:**
- Learning When to Look: Budgeted Active Video Reasoning (ongoing collaboration)

**Thread-page flow:**
1. Motivation: fixed frame sampling and static visual context may spend tokens on uninformative evidence or discard information needed later.
2. Research problem: learn when to inspect additional temporal segments or spatial regions and what evidence to retain under a budget.
3. Current status: accurately describe the present collaboration and the work completed so far; distinguish the user's contribution from collaborators' contributions.
4. Open questions: inspection policy, spatial/temporal budget allocation, memory retention, and downstream reasoning quality.

Keep this explicitly marked as emerging/ongoing. Do not make it appear to be a completed research contribution.

---

## 5. Detailed research-direction page: Beyond Backpropagation

This is a child/featured direction within Thread B. It is not another paper page. It should connect the N-FUSE paper, the real-weight subspace-ZO work, and ongoing investigations.

### Recommended title

**Beyond Backpropagation: Zeroth-Order Learning for Language Models**

### Short description

Zeroth-order optimization replaces analytical gradients with objective evaluations, avoiding the backward-pass state required by conventional training. But removing backpropagation is only one part of the problem: practical forward-only learning also depends on the search space being explored, the signal used to guide updates, and the way evaluations are executed.

### Opening copy

My work on zeroth-order learning explores these questions across language-model adaptation and training. I have investigated low-dimensional search spaces for real model weights and NPU-native execution for forward-only updates. I am now exploring how better subspace construction and occasional first-order guidance can improve optimization, alongside early experiments with activation-space methods that extend the question beyond downstream fine-tuning.

### Organize the direction into three connected questions

#### A. Where should the model search?

The real-weight subspace project restricts perturbations to a learned, gradient-informed low-rank subspace. This makes the update space more structured and, in the tested mobile setting, avoids the infeasible cost of full-weight perturbations.

**Established contribution:** Subspace-Restricted Zeroth-Order Fine-Tuning of Real Weights on Mobile NPUs.

**Ongoing exploration:** Better subspace construction and maintenance. Investigate how task/gradient information can identify useful directions, when the basis should be refreshed, and how rank and refresh cost affect the quality/compute trade-off. Do not claim novelty or results until experiments establish them.

#### B. What learning signal should guide forward-only updates?

Pure ZO relies on loss differences and can require many forward evaluations. A hybrid approach could use occasional first-order information to improve the direction of subsequent local ZO updates without making every device step pay the full cost of backpropagation.

**Ongoing exploration:** Hybrid first- and zeroth-order adaptation. The device performs local ZO updates; a server periodically supplies first-order guidance. Research questions include what information to transmit, how often to refresh guidance, how stale guidance behaves, and how convergence trades off against communication and memory.

Do not describe this as an established method or report results unless validated.

#### C. Can forward-only learning extend beyond fine-tuning?

DUST is an external method from QLabs, not an algorithm developed by Anirudh. It perturbs transformer activations independently across tokens and uses token-level loss feedback; each token contributes to a virtual population evaluated in parallel within forward execution.

**Exploratory work:** Initial experiments with DUST-inspired activation-space zeroth-order pretraining. Present this only as an exploration/reproduction of an external method unless a distinct original contribution and evaluation have been established. Attribute the method to its authors and link to the original QLabs research page: https://qlabs.sh/research/dust/.

Research questions include whether activation-space perturbations can complement weight-space subspaces, how the compute cost scales, and whether the approach can be adapted to the constraints of the training settings being studied.

### Established contributions to link

1. **Subspace-Restricted Zeroth-Order Fine-Tuning of Real Weights on Mobile NPUs** — detailed technical project page.
2. **N-FUSE: A Fused-Execution Framework for Fast, Backprop-Free LLM Training on Mobile NPUs** — separate paper page.

### Ongoing explorations to list separately

- Better subspace construction and adaptive subspace maintenance.
- Hybrid first-order guidance for forward-only adaptation.
- DUST/activation-space pretraining experiments (external method; clearly attributed).

### Closing synthesis

The unifying question is how to make forward-only learning useful in practice: selecting a search space that captures task-relevant updates, providing enough information to guide optimization, and executing the resulting evaluations efficiently. These are related but distinct research problems, and the page should preserve those distinctions.

---

## 6. N-FUSE paper page: separate technical record

Create a separate project page for the N-FUSE paper. Do not merge it with the real-weight subspace-ZO page.

### Title

**N-FUSE: A Fused-Execution Framework for Fast, Backprop-Free LLM Training on Mobile NPUs**

### One-sentence summary

N-FUSE makes zeroth-order LLM training practical on inference-oriented mobile NPUs by separating gradient estimation, update parameterization, and execution, then mapping each training step to a fused inference batch over an immutable 4-bit base model.

### TL;DR / key findings

- Mobile NPUs impose a different execution model: weights are packed and effectively immutable, dispatch overhead is high, backward kernels are unavailable, and memory/thermal budgets are tight.
- N-FUSE separates the ZO estimator, coefficient-space parameterization, and NPU execution engine; all perturbed queries are packed into one fused decode.
- It evaluates N-FUSE-Full and N-FUSE-LoRA across five models (360M–4B) and fourteen tasks, with end-to-end on-device validation across five Samsung devices.
- Against the MobiZO estimator in the paper's like-for-like on-device comparison, N-FUSE reports a 4.5× geometric-mean step-time improvement and 4.8× lower host memory.

### Recommended page flow

1. **Problem and motivation** — why a conventional ZO implementation does not automatically map to a mobile NPU.
2. **Design principle: inference-equivalent training** — one training step should be computationally indistinguishable from a fused inference batch.
3. **Framework decomposition**
   - What is estimated: one-sided FZOO loss-difference estimator.
   - Where the update lives: low-rank coefficient space, with N-FUSE-Full and N-FUSE-LoRA parameterizations.
   - How it executes: fused query slots, immutable Q4_0 base, deferred updates.
4. **NPU execution engine** — activation correction instead of materialized perturbed weights, fused slot packing, batch-shared slots, precomputed/transposed basis operations, deferred updates, quantization-error correction, and restartable execution.
5. **Evaluation** — models, tasks, devices, baseline protocol, task quality, per-step latency, host memory, and ablations.
6. **Contributions** — describe the user's precise individual contribution only after confirming ownership and division of work.
7. **Limitations and status** — distinguish what is measured on-device, what is compared using a server-side reference, and what the paper does not claim.
8. **Artifacts and citation** — paper, public code if available, BibTeX only when appropriate, and related research thread.

### Important technical distinction

N-FUSE uses fixed random orthonormal bases in its reported default configuration. The paper says probe-derived and informed bases showed negligible gains in its ablations. Do not describe N-FUSE as introducing the learned gradient-informed subspace used in the separate real-weight subspace-ZO project.

The 4.5× step-time and 4.8× host-memory figures are the geometric means reported in the abstract and detailed comparison table. Avoid mixing them with other speedup figures from individual ablations or alternative conclusion wording.

The supplied manuscript is marked under review and “Do not distribute.” The page may describe the work, but only expose the manuscript or unpublished details publicly if the authors have cleared them for disclosure.

---

## 7. Reusable templates for future projects and threads

### Research-thread page template

- Title: a broad research question, not a paper title.
- 2–3 sentence overview explaining the problem and why it matters.
- “Established contributions” with links to project/paper pages.
- “Ongoing explorations” with explicit status labels.
- “Open questions” with 3–5 research questions.
- “Related threads” cross-links.

### Paper / technical-contribution page template

- Title and metadata: collaborators, affiliation, date, type, status, links.
- TL;DR: problem, insight, key result.
- Motivation and prior limitations.
- Method / architecture.
- Personal contribution (specific and accurate).
- Evaluation and results.
- Limitations / what is not claimed.
- Artifacts and citations.
- Related research thread.

### Systems / engineering project page template

- Problem and workload.
- Execution model and bottlenecks.
- Architecture / runtime design.
- Implementation decisions.
- Performance and reliability evaluation.
- Personal contribution.
- Source code / documentation.
- Related thread(s).

### Exploratory reproduction / research-note template

- Original method and authors clearly credited.
- Why it is relevant to the research thread.
- What was reproduced or modified.
- Experimental setup and observations.
- What remains uncertain.
- Explicit label: “Exploratory experiment” or “Reproduction,” not “paper” or “proposed method.”

---

## 8. Proposed concise homepage copy

### Identity block

**Anirudh Bocha**  
Machine Learning Engineer · Samsung Research India

I work on efficient machine learning across model representations, learning algorithms, and computational systems. My projects span speech representation learning, language-model adaptation, forward-only optimization, collaborative generation, and execution across heterogeneous hardware.

My work has moved from task-specific speech representations at IIIT Hyderabad to LLM adaptation and heterogeneous execution at Samsung Research, and now extends to alternative optimization and active multimodal reasoning.

Email · GitHub · Google Scholar · CV · LinkedIn

### Research Threads

**Task-Specific Speech Representations**  
What information should a speech model preserve, and which internal representations best serve a downstream task?  
WESPER · HuBERT Disfluency Detection

**Language-Model Adaptation and Learning Beyond Backpropagation**  
How should pretrained language models adapt when memory, backward computation, or accelerator capabilities constrain the learning procedure?  
NNTrainer · Subspace ZO · N-FUSE · Hybrid Optimization

**Collaborative Generation and Inference**  
How can models with different capabilities share context and computation without repeating work?  
Hybrid LLM Inference

**Heterogeneous Execution for Machine Learning**  
How should model workloads be mapped across CPUs, GPUs, and NPUs to meet memory, dispatch, and latency constraints?  
SnapLite · CPU–NPU Co-Execution · N-FUSE

**Active Multimodal Reasoning** *(Emerging)*  
Can a model learn what visual evidence to inspect and retain under a limited token and memory budget?  
Active Video Reasoning

### Publications

List formal publications and manuscripts with exact status and public links. Keep exploratory notes and internal drafts out of this section.

### Open Source

Waveform-Wizard and public code repositories that are useful independent artifacts. Keep this section short.

### Experience

Samsung Research India · IIIT Hyderabad · other relevant roles. One line per role.

---

## 9. Metadata and status conventions

Every work entry should have structured metadata so future work can be added without redesigning the site:

- `title`
- `slug`
- `type` (`paper`, `system`, `open_source`, `ongoing_project`, `reproduction`)
- `status` (`published`, `public_preprint`, `under_review`, `in_preparation`, `ongoing`, `exploratory`)
- `date` or date range
- `collaborators` / `authors`
- `personal_contribution`
- `primary_thread`
- `related_threads[]`
- `tags[]`
- `artifacts[]` (paper, code, notes, demo, slides)
- `public_visibility` (public / link-only / private)

Status labels must be explicit. Avoid representing an under-review paper as accepted or a reproduction as an authored method. An ongoing direction may have hypotheses and questions but must not display unverified quantitative results.

---

## 10. Visual and interaction guidance

- Preserve the existing minimalist design. Do not introduce a new visual identity.
- Research threads should be compact rows or small typographic blocks, not large marketing cards.
- Give each thread a one-sentence question and links to its contributions.
- Use small status labels: Published, Under Review, Ongoing, Exploratory.
- Use topic tags only as secondary metadata, not as the primary navigation mechanism.
- Allow a project to be cross-linked from multiple threads without duplicating its technical page.
- Keep paper/project titles as the primary links.
- Keep the current detailed project-page components (TL;DR, figures, result tables, contents navigation) where they work.
- Add a subtle “Part of: [Research Thread]” link near the top or bottom of each project page.
- Add “Related contributions” links at the bottom of thread pages.
- Preserve mobile readability and keyboard-accessible interactions.

---

## 11. Implementation order for the website agent

1. Audit the existing routes and content. Do not delete or overwrite technical project pages.
2. Add the reusable research-thread content type and page template.
3. Build the “Beyond Backpropagation” thread page using the structure in Section 5.
4. Add the N-FUSE paper page using Section 6, leaving the personal-contribution paragraph for precise confirmation if needed.
5. Build the other thread pages incrementally, beginning with speech representations, heterogeneous execution, generation, and active multimodal reasoning.
6. Rework the homepage to show the five thread summaries and their linked contributions instead of relying on category filters as the main information architecture.
7. Keep the existing all-work list available as a compact index or secondary route.
8. Validate every route, artifact link, status label, mobile layout, and cross-link.

### Non-negotiable content rules

- Never merge N-FUSE with the separate learned real-weight subspace-ZO method.
- Never imply DUST is Anirudh's method; credit the QLabs authors and label any experiments as exploratory/reproduction work.
- Do not invent results, collaborators, authorship, or individual contributions.
- Do not expose an under-review manuscript without author clearance.
- Maintain the distinction between established work, ongoing research, and external methods being explored.
- The site should tell a coherent story, but it must not force every contribution into one narrative or imply that every ongoing idea is already validated.
