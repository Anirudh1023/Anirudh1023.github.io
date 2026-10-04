export const siteContent = {
  identity: {
    name: "ANIRUDH BOCHA",
    heroEyebrow: "SAMSUNG RESEARCH, BANGALORE · EFFICIENT ML",
    heroHeadline: "ANIRUDH BOCHA",
    heroParagraphs: [
      "I’m a Machine Learning Engineer at [Samsung Research India](https://research.samsung.com/srib), where I work on making machine learning more efficient across training, inference, and systems. My work spans on-device LLMs, heterogeneous execution, quantization, memory-efficient training, continual adaptation, and adaptive inference across cloud and device. More broadly, I’m interested in understanding what information, computation, and state a model actually needs for a task, and how that work can be reduced, reused, or adapted as models and workloads change.",
      "I’ve explored these questions at different levels of the stack: from representations and computation depth to optimization, memory, runtimes, scheduling, and accelerator execution. More recently, I’ve also been studying how computation can be reused across models during inference and how models can adapt their computation to the workload. These problems have led me toward a broader interest in designing ML algorithms and systems together rather than treating model efficiency and system efficiency as separate problems.",
      "I first became interested in these questions through speech research at [IIIT Hyderabad](https://www.iiit.ac.in/). In Prof. Anil Kumar Vuppala’s Speech Processing Lab, I started by asking what information a task actually needs and how much computation is necessary to extract it. That perspective has stayed with me as my work has moved into production runtimes, training systems, hardware-constrained optimization, and hybrid execution. At every layer, the core question remains the same: how do we identify the work that is actually necessary, and how do we eliminate the rest?"
    ],
    links: {
      email: "mailto:anirudhnarayana7@gmail.com",
      github: "https://github.com/Anirudh1023",
      cv: "/resume.pdf",
      linkedin: "https://www.linkedin.com/in/anirudh-bocha/"
    }
  },

  featuredResearch: [
    {
      id: "nntrainer",
      number: "01",
      category: "CURRENT WORK",
      title: "NNTRAINER",
      articleTitle: "NNTRAINER",
      metadata: [
        "SAMSUNG RESEARCH"
      ],
      codeLink: "https://github.com/b-saianirud/nntrainer/tree/LoRA",
      heroQuestion: "How does execution scheduling and memory design impact on-device training efficiency?",
      homepageSummary: "I extended Samsung’s open-source NNTrainer framework toward causal-LLM fine-tuning on mobile devices. I added the CPU-side support needed for Qwen3-class models, including quantized Q4_0 execution, LoRA and multi-batch training, quantization-aware training, and memory-saving techniques that brought a roughly 3 GB model’s resident training footprint below 1 GB. I then extended the training path to the mobile NPU; an initial hybrid design was bottlenecked by CPU–NPU synchronization, so I redesigned execution around asynchronous layer submission and accelerator-resident data, bringing prefill to roughly 5× the CPU baseline.",
      metrics: [
        { value: "3 GB → <1 GB", label: "MEMORY PIPELINE REDUCTION" },
        { value: "5×", label: "TRAINING ACCELERATION (CPU-NPU HYBRID)" }
      ],
      article: {
        intro: "NNTrainer is Samsung’s open-source framework for on-device training and inference. I joined the project through Samsung Research India and worked with Samsung Research Korea on extending it toward causal language model fine-tuning. My work covered the CPU execution path, quantized model support, causal-language-model training, parameter-efficient fine-tuning, memory reduction, and eventually NPU execution for the training workload.\n\nThe project progressed through two main stages. First, I helped make Qwen3-class fine-tuning practical on the CPU under the memory and compute constraints of an on-device environment. I then extended the execution path to Qualcomm’s mobile NPU, which required changes to how computation was scheduled, transferred, and executed rather than simply moving individual operators to the accelerator.",
        sections: [
          {
            type: "heading",
            content: "1. CPU BACKEND AND QUANTIZED MODEL SUPPORT"
          },
          {
            type: "paragraph",
            content: "I added optimized implementations for LayerNorm and RMSNorm using SIMD and BLAS intrinsics where appropriate, together with FP16 support across ARM and AVX2 targets. These changes were integrated into NNTrainer rather than implemented as independent kernels."
          },
          {
            type: "paragraph",
            content: "For quantized matrix multiplication, I added NNTrainer-side support for existing optimized kernels. This included Q4_0 execution through ggml kernels on ARM and AVX2, as well as QINT4 execution through KleidiAI kernels on ARM. The integration required the appropriate model packing, backend dispatch, and selection of the correct GEMM implementation for each supported architecture."
          },
          {
            type: "figure",
            caption: "CPU Backend Dispatch",
            visual: "nntrainer-cpu-dispatch"
          },
          {
            type: "heading",
            content: "2. CAUSAL LANGUAGE MODEL TRAINING"
          },
          {
            type: "paragraph",
            content: "To support Qwen3-class causal language models, I implemented the necessary forward and backward support, including derivative calculation for the required layers. The base model remained frozen while we trained low-rank adapters (LoRA). I enabled multi-batch training and ran extensive learning-rate and hyperparameter experiments to establish stable training behavior, including controlled overfitting experiments to verify correctness."
          },
          {
            type: "figure",
            caption: "Causal LM Training with Frozen Base",
            visual: "nntrainer-training-flow"
          },
          {
            type: "heading",
            content: "3. QUANTIZATION-AWARE LORA TRAINING"
          },
          {
            type: "paragraph",
            content: "In this setup, the base model remains in its quantized Q4_0 format while the LoRA weights remain in FP32 during optimization. Because Q4_0 uses blockwise quantization with block-specific scales, standard post-training calibration was not appropriate. Instead, we used quantization-aware training (QAT), incorporating an exponential moving average to track and update the blockwise quantization scales during training. The adaptation learns the quantization behavior that will exist at deployment, rather than training in FP32 and quantizing afterward."
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
            content: "4. TRAINING MEMORY REDUCTION"
          },
          {
            type: "paragraph",
            content: "Quantized weights alone did not solve training memory because the backward pass retained intermediate state. To reduce this footprint, I implemented checkpointing, selective recomputation, and memory-mapped storage. These techniques dramatically reduced the resident memory footprint from approximately 3 GB to below 1 GB."
          },
          {
            type: "figure",
            caption: "Memory Footprint Reduction",
            visual: "nntrainer-memory"
          },
          {
            type: "heading",
            content: "5. NPU EXECUTION FOR LLM TRAINING"
          },
          {
            type: "paragraph",
            content: "Once CPU training became practical, the next question was whether the NPU could execute the same training workload. Mobile NPUs are designed around matrix-heavy ML computation, and while QNN existed for inference, it provided a relatively fixed inference-oriented interface. I wanted direct accelerator integration inside NNTrainer's flexible layer-level training framework. I integrated ggml-hexagon, leveraging HMX for matrix-heavy operations and HVX for lighter vector operations, making the NPU execution participate directly in the training pipeline."
          },
          {
            type: "figure",
            caption: "Hexagon NPU Integration Architecture",
            visual: "nntrainer-hexagon-arch"
          },
          {
            type: "heading",
            content: "6. CPU–NPU SYNCHRONIZATION AND DATA MOVEMENT"
          },
          {
            type: "paragraph",
            content: "The initial hybrid design placed QKV and fully-connected matrix operations on the NPU, along with FFN projections and FlashAttention, while leaving the remaining operations on the CPU. However, this approach introduced frequent CPU–NPU transfers and synchronization between accelerator calls. The data movement overhead and waiting between operations caused the accelerator compute advantage to be lost. Moving compute to the NPU was not sufficient. The execution model had become the bottleneck."
          },
          {
            type: "figure",
            caption: "Initial Hybrid Execution Timeline",
            visual: "nntrainer-hybrid-fail"
          },
          {
            type: "heading",
            content: "7. ASYNCHRONOUS NPU EXECUTION"
          },
          {
            type: "paragraph",
            content: "Because NNTrainer is layer-wise and ggml-hexagon is organized around lower-level accelerator operations, blocking accelerator calls caused unnecessary synchronization. I introduced a custom enqueue mechanism using a DMA ring buffer so that layers could be submitted asynchronously. Weights and activations remain in FastRPC-accessible memory, making VTCM transfers substantially more efficient. As a result, the CPU does not need to wait for each accelerator operation to complete before subsequent work is submitted."
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
            content: "8. NPU SUPPORT FOR BACKPROPAGATION"
          },
          {
            type: "paragraph",
            content: "Existing accelerator kernels were designed primarily for inference, but training required additional backward operations, transpose operations, and tensor-layout considerations. I adapted the existing kernels and execution pathways—using HMX for matrix-heavy operations and HVX for simpler operations such as activation and normalization where appropriate—to support the backward pass, rather than building an entirely separate framework."
          },
          {
            type: "figure",
            caption: "Shared Forward and Backward NPU Execution",
            visual: "nntrainer-fwd-bwd"
          },
          {
            type: "heading",
            content: "9. TRAINING ACCELERATION WITH CPU-NPU HYBRID"
          },
          {
            type: "paragraph",
            content: "The optimized asynchronous NPU execution path resulted in approximately 5× training acceleration with the CPU-NPU hybrid versus the CPU baseline."
          },
          {
            type: "figure",
            caption: "Training Acceleration (CPU vs NPU)",
            visual: "nntrainer-prefill"
          },
          {
            type: "heading",
            content: "10. PROGRESSIVE LORA AND DEVICE CONDITIONS"
          },
          {
            type: "paragraph",
            content: "Mobile devices have changing thermal conditions, so the available compute budget is not necessarily constant. I implemented Progressive LoRA as a separate extension to adapt training to the device's thermal state. This approach extends efficiency from static model and resource optimization toward runtime-aware adaptation."
          },
          {
            type: "figure",
            caption: "Progressive LoRA Thermal Adaptation",
            visual: "nntrainer-progressive"
          },
          {
            type: "heading",
            content: "11. SYSTEM ARCHITECTURE"
          },
          {
            type: "paragraph",
            content: "The complete system connects quantized causal-LLM training, memory-efficient optimization, and asynchronous heterogeneous execution within a single unified framework."
          },
          {
            type: "figure",
            caption: "Full NNTrainer System Architecture",
            visual: "nntrainer-architecture"
          },
          {
            type: "heading",
            content: "12. RESULTS"
          },
          {
            type: "result-table",
            content: "~3 GB → <1 GB\nResident training footprint\n\n~5×\nTraining acceleration with CPU-NPU hybrid"
          },
          {
            type: "heading",
            content: "13. ENGINEERING CONTRIBUTIONS"
          },
          {
            type: "paragraph",
            content: "My work on NNTrainer covered several parts of the stack rather than a single operator or optimization.\n\nAt the CPU level, I integrated existing optimized kernels and added the backend support required to execute quantized transformer workloads efficiently. At the training level, I extended NNTrainer to support causal language models, LoRA, multi-batch execution, and quantization-aware training. At the memory level, I worked on checkpointing, recomputation, and memory management. At the accelerator level, I integrated Hexagon kernels and redesigned execution around asynchronous layer submission and accelerator-aware data movement.\n\nThe project was collaborative, and several components were developed with other engineers across Samsung Research India and Samsung Research Korea. My primary responsibility was driving the implementation of the training and NPU execution path and making the design decisions required to connect these components into a working system."
          },
          {
            type: "heading",
            content: "14. CONCLUSION"
          },
          {
            type: "paragraph",
            content: "The NNTrainer work showed that efficient on-device training is not determined by model compression or accelerator throughput alone.\n\nQuantized representations reduced the model footprint, but training state remained a memory constraint. Checkpointing reduced resident memory, but CPU execution left accelerator capacity unused. Moving compute to the NPU exposed synchronization and data-movement overhead, which required a different execution model rather than a different kernel alone.\n\nThe resulting system connected quantized causal-LLM training, memory-efficient optimization, and asynchronous heterogeneous execution within the same framework.\n\nThe remaining constraint was memory associated with the backward pass itself. That raised the next question in my work: whether fine-tuning could be reformulated to use only forward computation and therefore avoid retaining backward state on the device.\n\nThis led to my work on [ON-DEVICE SUBSPACE-RESTRICTED ZEROTH-ORDER FINE-TUNING](#zo)."
          }
        ]
      }
    },
    {
      id: "zo",
      number: "02",
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
      homepageSummary: "After getting backpropagation running on the NPU, I asked whether fine-tuning could avoid the backward state altogether. Zeroth-order optimization reduced the memory requirement to forward execution, but perturbing the model’s real weights at full rank pushed about 3.2 GB through a single NPU dispatch and crashed the device. I therefore restricted updates to a learned low-rank subspace of the real weights, turning a computational limitation into a hardware requirement; the resulting system reaches 92.0% on SST-2 on a Qualcomm Hexagon NPU, close to our 92.7% full-LoRA baseline.",
      metrics: [
        { value: "92.0%", label: "SST-2 accuracy (N=500)" },
        { value: "9.1×", label: "subspace-refresh speedup" },
        { value: "10.5×", label: "steady-state speedup" }
      ],
      article: {
        intro: "Qwen3-0.6B is being fine-tuned directly on Qualcomm Hexagon NPU hardware. Mobile NPU execution is inherently inference-oriented, meaning conventional backpropagation does not fit the target execution model. Zeroth-order optimization provides a forward-only training path that aligns with accelerator capabilities. This project studies applying a learned low-rank subspace directly to the model's real weights to make on-device zeroth-order optimization both representable and safe.",
        sections: [
          {
            type: "heading",
            content: "Hardware Constraints for On-Device Fine-Tuning"
          },
          {
            type: "paragraph",
            content: "Conventional backpropagation requires maintaining intermediate activation state for the backward pass. On mobile devices, this memory requirement is often prohibitive. Zeroth-order (ZO) optimization replaces analytical gradients with repeated forward evaluations, estimating the loss variation to calculate the update. The critical advantage here is not that ZO is universally better, but that forward-only computation perfectly matches the existing inference-optimized execution model of mobile accelerators."
          },
          {
            type: "figure",
            caption: "Backpropagation vs. Forward-Only ZO Optimization",
            visual: "zo-hardware-constraints"
          },
          {
            type: "heading",
            content: "Subspace-Restricted Zeroth-Order Optimization"
          },
          {
            type: "paragraph",
            content: "The adaptation target is the model's real weights; this is not a persistent LoRA adapter. For a weight matrix W ∈ R^(m×n), we use a learned rank-r basis defined by U_r and V_r. The perturbation lives entirely within this compact r×r coefficient space, which drastically reduces the dimensionality."
          },
          {
            type: "math",
            content: "v = x V_r\n\\text{coeff}_i = Z_i v\n\\hat{y}_i = y + \\epsilon(\\text{coeff}_i U_r^T)"
          },
          {
            type: "paragraph",
            content: "where Z_i ∈ {-1,+1}^(r×r). The restriction to a lower-dimensional subspace changes the scale of the update, requiring a normalization factor μ = √(mn) / r to prevent the effective learning rate from becoming silently too small."
          },
          {
            type: "figure",
            caption: "Subspace Perturbation Flow",
            visual: "zo-subspace-perturb"
          },
          {
            type: "heading",
            content: "Hardware-Compatible Perturbation Estimation"
          },
          {
            type: "paragraph",
            content: "We combine P-GAP's subspace identification mechanism with FZOO's one-sided Rademacher estimator. The Rademacher formulation is specifically useful on the NPU because the perturbation can be represented through bit-valued sign operations rather than requiring continuous random directions and floating-point perturbation generation. This representation directly aligns with the hardware's efficient integer arithmetic paths."
          },
          {
            type: "figure",
            caption: "Continuous vs. Sign-Based Perturbation",
            visual: "zo-perturb-rep"
          },
          {
            type: "heading",
            content: "Full-Rank Dispatch and Subspace Restriction"
          },
          {
            type: "paragraph",
            content: "A naïve full-rank implementation pushed approximately 3.2 GB of perturbed weight data through a single DSP dispatch, which caused the device to enter firmware recovery mode. The low-rank subspace is therefore not merely a computational optimization. It keeps the fused perturbation operand small enough to safely execute within the accelerator's dispatch path. Subspace restriction is a strict hardware requirement."
          },
          {
            type: "figure",
            caption: "Full-Rank Dispatch Failure vs. Safe Subspace",
            visual: "zo-crash"
          },
          {
            type: "heading",
            content: "Rank-Dependent CPU and NPU Execution"
          },
          {
            type: "paragraph",
            content: "The subspace rank affects both the expressiveness of the update and the amount of work available to amortize the NPU's dispatch overhead. At r=256, the NPU achieved a 9.1× subspace refresh speedup (452.4 s → 49.5 s) and a 10.5× steady-state execution speedup (28.9 s → 2.75 s) over the CPU. However, at a low rank of r=8, the NPU processed steps at ~1.35 s/step while the CPU completed them in ~0.92 s/step, demonstrating that fixed accelerator overhead dominates when the workload is too small."
          },
          {
            type: "figure",
            caption: "Rank and Backend Amortization",
            visual: "zo-rank"
          },
          {
            type: "heading",
            content: "On-Device Subspace Refresh"
          },
          {
            type: "paragraph",
            content: "The subspace must be periodically refreshed to remain effective. The original host-side implementation used sequential power iteration and deflation, which became computationally impractical at high ranks. I reformulated this as a batched block power iteration using large matrix multiplications that the accelerator already executes efficiently. At r=64, this reduced refresh time from 270 s to 5.4 s (a 50× improvement). At r=256, a process that was infeasible on the host completed in 33 s on-device."
          },
          {
            type: "figure",
            caption: "Host SVD vs. Block Power Iteration",
            visual: "zo-refresh"
          },
          {
            type: "heading",
            content: "Experimental Results"
          },
          {
            type: "paragraph",
            content: "For Qwen3-0.6B evaluated on SST-2 using real Hexagon NPU hardware (N=500), our subspace-restricted adaptive-N method reached 92.0% accuracy, closely approaching the measured full-LoRA no-subspace baseline of 92.7%. A fixed-N=8 configuration at the same rank only achieved 86.7%. The adaptive-N controller reaches higher accuracy while using approximately 30% fewer forward evaluations.\\n\\nIn GPU validation comparisons (N=1000), our attention-target configuration achieved 87.3%, closely matching the MobiZO reported result of 87.8% under the same sample-count protocol."
          },
          {
            type: "figure",
            caption: "On-Device Results Comparison",
            visual: "zo-results"
          },
          {
            type: "heading",
            content: "Continual Learning Extension"
          },
          {
            type: "paragraph",
            content: "I am currently extending this on-device optimization framework toward continual personalization. For sequential tasks, we identify important activation directions using SVD-based top-k directions and apply soft suppression to directions that would strongly interfere with previously learned behavior."
          },
          {
            type: "figure",
            caption: "Continual Learning Subspace Suppression",
            visual: "zo-continual"
          },
          {
            type: "heading",
            content: "Future Work"
          },
          {
            type: "paragraph",
            content: "Future directions include implementing a quantization-compatible persistent correction mechanism and scaling the continual learning methodology for robust, long-term on-device personalization."
          },
          {
            type: "heading",
            content: "Conclusion"
          },
          {
            type: "paragraph",
            content: "Deploying the optimization on real NPU hardware exposed constraints that GPU simulation did not show. Full-rank perturbations were unsafe at the accelerator dispatch level. Rank changed the relative efficiency of CPU and NPU execution. Subspace refresh had to be reformulated around batched accelerator-friendly computation. The resulting system reached 92.0% SST-2 accuracy on real Hexagon hardware, close to the 92.7% full-LoRA baseline, while showing that the hardware affected not only execution strategy but the optimization representation itself.\\n\\nBy redesigning the optimization around the hardware, we eliminated the backward state entirely. But whether we are training or inferencing on a single device, we are still restricted by its local compute capacity. The next step was asking whether we could break beyond a single device: when a local model reaches its limits and escalates to a larger cloud model, can we reuse the computation it has already performed? This led to my work on [CROSS-VOCABULARY SPECULATIVE DECODING](#hybrid)."
          }
        ]
      }
    },
    {
      id: "hybrid",
      number: "03",
      category: "CURRENT RESEARCH",
      title: "CROSS-VOCABULARY SPECULATIVE DECODING",
      articleTitle: "HYBRID LOCAL–CLOUD LLM INFERENCE",
      metadata: [
        "Cloud GPU",
        "1.394× wall-clock speedup",
        "2.797× server compute reduction"
      ],
      heroQuestion: "Can the computation already performed by the smaller model be made useful to the larger model at handoff, rather than discarding that work and rebuilding the larger model's context?",
      homepageSummary: "A hybrid LLM system can keep a small model on the user's device for low-cost responses while invoking a larger server model when greater capability is needed. In a multi-turn interaction, however, switching models introduces a state-management problem: the model taking control may not contain the KV state accumulated by the model that was previously active. A conventional handoff can therefore require the larger model to process the conversation context again before it can continue generation. This project explores whether the work already performed by the local model can instead participate directly in that handoff. The current approach uses cross-vocabulary speculative decoding. The local model generates a draft, the draft is translated into the server model's vocabulary, and the larger model verifies it in a batched forward pass. The experiment is whether that verification process can simultaneously function as the large model's transition into the conversation.",
      metrics: [
        { value: "1.394×", label: "WALL-CLOCK SPEEDUP" },
        { value: "2.797×", label: "SERVER-COMPUTE REDUCTION" },
        { value: "0", label: "QUALITY COST (GREEDY)" }
      ],
      article: {
        intro: "A hybrid LLM system can keep a small model on the user's device for low-cost responses while invoking a larger server model when greater capability is needed. In a multi-turn interaction, however, switching models introduces a state-management problem: the model taking control may not contain the [KV cache](#kv-cache) accumulated by the model that was previously active.\n\nA conventional handoff can therefore require the larger model to process the conversation context again before it can continue generation. This project explores whether the work already performed by the local model can instead participate directly in that handoff.\n\nThe current approach uses [cross-vocabulary](#cross-vocabulary) [speculative decoding](#speculative-decoding). The local model generates a draft, the draft is translated into the server model's vocabulary, and the larger model verifies it in a batched forward pass. The experiment is whether that [verification](#verification) process can simultaneously function as the large model's transition into the conversation.\n\nThe current results show a 1.394× wall-clock speedup and a 2.797× server-compute reduction with zero quality cost under [greedy decoding](#greedy-decoding). Current experiments use cloud GPUs; real mobile-hardware validation remains future work.",
        sections: [
          {
            type: "heading",
            content: "Hybrid Local–Cloud Model Handoff"
          },
          {
            type: "paragraph",
            content: "The system combines a small local model and a large server model. The small model handles ordinary turns. A routing mechanism can decide when a turn should escalate. When escalation occurs, the important question is not simply 'Which model should answer?' It is: 'How much of the computation already performed by the current model can remain useful after the switch?'"
          },
          {
            type: "paragraph",
            content: "In a conventional approach, the model taking control must rebuild the state. This requires sending the context and executing a large-model [prefill](#prefill) to construct the large-model KV cache before it can continue."
          },
          {
            type: "figure",
            caption: "Model Switching and the Handoff Cost",
            visual: "hybrid-handoff-cost"
          },
          {
            type: "heading",
            content: "Cross-Vocabulary Speculative Decoding"
          },
          {
            type: "paragraph",
            content: "The local model has already generated tokens. Instead of discarding those tokens when escalating, we use them as the speculative draft. The large model verifies that draft. The difficulty is that the two models generally use different [tokenizer](#tokenizer) schemes, so the [draft model](#draft-model) token IDs and [target model](#target-model) token IDs are not directly comparable.\n\nThe draft must first be translated into the target model's vocabulary. We use [direct token mapping](#direct-token-mapping) for overlapping tokens, and an [n-gram cache](#n-gram-cache) that decodes, re-tokenizes, and caches unmapped token runs. A measured conversation resolved 98.3% of tokens through direct mapping."
          },
          {
            type: "figure",
            caption: "Cross-Vocabulary Translation",
            visual: "hybrid-translation"
          },
          {
            type: "heading",
            content: "Speculative Verification as the Handoff Mechanism"
          },
          {
            type: "paragraph",
            content: "The core mechanism executes as follows: the small model generates the draft, the draft is translated into the target vocabulary, and the large model verifies the entire candidate sequence in one batched forward pass. Matching tokens are accepted. At the first mismatch, the large model's own token is used, and subsequent tokens are discarded. The large model then continues generation.\n\nThe key conceptual point is that the verification pass is also the handoff. There is no independent 'catch-up' generation stage. The large model has processed the small model's generated continuation as part of verification."
          },
          {
            type: "figure",
            caption: "Verification as the Handoff Mechanism",
            visual: "hybrid-draft-handoff"
          },
          {
            type: "heading",
            content: "KV-State Continuity Across Model Switching"
          },
          {
            type: "paragraph",
            content: "During verification, the large model processes the candidate sequence. Therefore the verification computation also establishes the large model's KV state for the accepted context. When the large model continues generation, that state is available. Similarly, the small model already has the accepted tokens in its own state, allowing the system to move back toward the local model without rebuilding everything from scratch.\n\nThe project measured realistic warm/cold KV-cache behavior with an approximately 1.307× average speedup."
          },
          {
            type: "figure",
            caption: "KV Cache Continuity Across Handoff",
            visual: "hybrid-kv-continuity"
          },
          {
            type: "heading",
            content: "Experimental Results"
          },
          {
            type: "result-table",
            content: "1.394×\nWall-clock speedup\n\n2.797×\nServer-compute reduction\n\n0\nQuality cost under greedy verification"
          },
          {
            type: "paragraph",
            content: "The server-side compute result corresponds to a reduction from 11.2 s to 4.0 s for the measured decode computation. Server-compute reduction is independent of network latency because it measures expensive target-model forward computation."
          },
          {
            type: "figure",
            caption: "Reduced Server Computation",
            visual: "hybrid-server-saved"
          },
          {
            type: "heading",
            content: "Greedy Verification and Output Equivalence"
          },
          {
            type: "paragraph",
            content: "If the draft token matches the target's greedy token, we accept it. Otherwise we replace it with the target's own choice. Therefore the final greedy output is forced to match ordinary greedy target decoding. An empirical sanity check confirmed this: the small model alone achieved 0.051 F1, target generation achieved 0.182 F1, and the speculative handoff achieved 0.186 F1. The deterministic decoding rule guarantees zero quality cost."
          },
          {
            type: "figure",
            caption: "Greedy Verification Logic",
            visual: "hybrid-greedy-math"
          },
          {
            type: "heading",
            content: "Current System"
          },
          {
            type: "paragraph",
            content: "The established results are that the cross-vocabulary speculative handoff mechanism works, greedy verification preserves target output by construction, and the speedup (1.394×) and compute reduction (2.797×) have been measured on cloud GPUs. Realistic KV-cache reuse was measured at ~1.307×, and multi-turn escalation/de-escalation behavior has been tested.\n\nNot yet established: complete real-mobile deployment, final router calibration, fully integrated end-to-end four-component system, and broad evaluation across workload types."
          },
          {
            type: "heading",
            content: "Ongoing Research Directions"
          },
          {
            type: "paragraph",
            content: "**Adaptive Draft Depth**: I am exploring whether the small model needs to execute its full computation before handoff. Can a shallower draft computation provide enough useful information to trigger an efficient handoff? The goal is to reduce unnecessary draft computation while preserving useful handoff work.\n\n**Diffusion Drafting**: I am exploring replacing the [autoregressive decoding](#autoregressive-decoding) drafter with [diffusion drafting](#diffusion-drafting). The research question is how reducing the number of refinement steps affects the quality and efficiency of the handoff, and how refinement depth interacts with the point at which the system hands control to the autoregressive target.\n\n**Adaptive Handoff**: The broader system direction is to make the amount of draft computation depend on the request and the expected benefit of escalation. An easy request would see more local computation, while a hard request would see an earlier handoff."
          },
          {
            type: "figure",
            caption: "Adaptive Handoff Computation",
            visual: "hybrid-adaptive-depth"
          },
          {
            type: "paragraph",
            content: "Finally, experiments showed that reuse and adaptation mechanisms may depend strongly on workload structure. Online drafter training produced a confirmed +5.4% tok/call improvement under the matched GSM8K experiment, but did not help open conversational Q&A because the domain has relatively little literal repetition."
          },
          {
            type: "heading",
            content: "Limitations"
          },
          {
            type: "paragraph",
            content: "Current timing uses cloud GPUs; real mobile-device drafter execution is not yet measured. Network latency is estimated rather than measured in a real deployment. The complete four-component system has not yet been assembled, router deployment calibration remains open, and context-reuse mechanisms may be workload dependent."
          },
          {
            type: "heading",
            content: "Conclusion"
          },
          {
            type: "paragraph",
            content: "The current results show that speculative decoding can serve not only as an acceleration mechanism but also as a mechanism for transferring computation from a local model to a larger server model. Instead of discarding the local model's work when control changes, the large model can verify that work as part of its own forward execution.\n\nThe current implementation establishes this mechanism on cloud GPUs. The next question is how little computation the local model needs to perform before the handoff becomes useful, and whether alternative drafting mechanisms such as shallow autoregressive execution or diffusion refinement can make that transfer more efficient.\n\nFrom speech representations to speculative decoding, the underlying thread remains the same: by understanding exactly what information, state, and computation an ML task requires, we can design systems and algorithms that eliminate everything else."
          }
        ]
      }
    }
  ],

  systemsDeployment: [
    {
      id: "snaplite",
      number: "04",
      title: "SNAPLITE RUNTIME",
      articleTitle: "SNAPLITE RUNTIME",
      metadata: [
        "SAMSUNG RESEARCH INDIA · 2024",
        "Unified deployment runtime for heterogeneous on-device AI"
      ],
      teaser: "During my Samsung Research internship, I worked on SnapLite, Samsung’s on-device deployment runtime supporting more than 200 production vision, speech, and text models. I helped unify CPU, GPU, and NPU deployment around a common LiteRT-based path while retaining accelerator-specific optimizations, working across model conversion, runtime dispatch, compiled artifacts, caching, and fallback behavior. The resulting changes reduced representative first-inference latency by 10× on GPU.",
      result: "10× Speedup",
      article: {
        intro: "SnapLite is Samsung's on-device deployment runtime for production vision, speech, and text models. When I joined the project, it used a [TensorFlow Lite](#tflite) 2.20 backend with Samsung-specific changes layered on top, including [accelerator](#accelerator)-specific kernels, [caching](#cache), and deployment APIs.\n\nMy initial work focused on production model enablement: maintaining deployment artifacts for more than 200 models across devices and [SnapLite](#snaplite) versions, working with use-case teams to convert PyTorch and ONNX models to TFLite, and debugging conversion and execution failures when models did not behave correctly on-device.\n\nI then moved deeper into the runtime itself, integrating [CPU](#cpu) optimizations and replacing the TensorFlow Lite backend with Google's [LiteRT](#litert) while preserving the Samsung-specific execution and caching behavior required by the production stack.",
        sections: [
          {
            type: "heading",
            content: "1. PRODUCTION MODEL ENABLEMENT"
          },
          {
            type: "paragraph",
            content: "SnapLite is responsible for executing over 200 models across diverse on-device workloads, including vision, speech, and text. Model deployment is a systems pipeline, not a single conversion command. I worked directly with use-case teams to convert PyTorch and ONNX models into TFLite format and actively debugged cases where operators were unsupported or where runtime execution produced incorrect outputs."
          },
          {
            type: "paragraph",
            content: "Because I worked at the boundary between the model, the runtime, and the target hardware, debugging required determining whether to make a model-side architectural change or a runtime/kernel-side modification to fix the failure."
          },
          {
            type: "heading",
            content: "2. DEPLOYMENT ARCHITECTURE"
          },
          {
            type: "paragraph",
            content: "SnapLite sat inside Samsung's broader on-device ecosystem and provided the runtime layer used by multiple applications. However, the original execution architecture was fragmented. The CPU path relied on SnapLite wrapping TensorFlow Lite 2.20. The [GPU](#gpu) path involved separate Samsung-specific GPU execution code, and the [NPU](#npu) utilized an entirely distinct vendor-specific deployment path. This fragmentation meant that execution logic, model conversion, and cache management were often duplicated."
          },
          {
            type: "figure",
            caption: "Fragmented vs Unified Architecture",
            visual: "snaplite-unified"
          },
          {
            type: "heading",
            content: "3. RUNTIME AND CACHE ENGINEERING"
          },
          {
            type: "paragraph",
            content: "A significant part of the deployment system involved managing [compiled artifacts](#compiled-artifact). I developed automated cache maintenance processes for the 200+ models. The cache architecture was designed so that a single binary artifact contained the required cache state—rather than maintaining separate cache files for each individual model where possible."
          },
          {
            type: "paragraph",
            content: "Caching was not just a performance afterthought; it was deeply integrated into the deployment orchestration, requiring driver-aware and version-aware validation to ensure artifacts remained valid across OS updates and SnapLite versions."
          },
          {
            type: "heading",
            content: "4. CPU OPTIMIZATION"
          },
          {
            type: "paragraph",
            content: "I integrated optimized CPU matrix-multiplication kernels (including [NEON](#neon)/SIMD paths) into the runtime. Rather than writing every low-level kernel from scratch, I focused on adding the necessary framework support and dispatch logic within SnapLite to utilize these existing optimized implementations efficiently while preserving the runtime's existing abstractions."
          },
          {
            type: "heading",
            content: "5. MIGRATION TO LITERT"
          },
          {
            type: "paragraph",
            content: "I helped migrate SnapLite from the legacy TensorFlow Lite 2.20 backend to Google's newer LiteRT execution infrastructure. This was an architectural migration, not a simple dependency bump. LiteRT exposed a different [delegate](#delegate) and accelerator model, requiring me to map Samsung's custom APIs and deployment orchestration onto the new backend."
          },
          {
            type: "paragraph",
            content: "A critical requirement was preserving Samsung's existing production behavior. I salvaged useful GPU kernel optimizations from the older TFLite path, integrated new accelerator-oriented APIs, and ensured that caching and artifact management continued to function correctly under the new paradigm."
          },
          {
            type: "figure",
            caption: "TensorFlow Lite to LiteRT Migration",
            visual: "snaplite-migration"
          },
          {
            type: "heading",
            content: "6. HETEROGENEOUS EXECUTION"
          },
          {
            type: "paragraph",
            content: "A common runtime abstraction is not enough on its own because different accelerators have vastly different constraints. CPUs offer low startup costs and broad operator coverage. GPUs rely heavily on compiled kernels and delegate execution, meaning startup compilation is expensive. NPUs offer massive throughput but have strict operator restrictions and strong driver dependencies."
          },
          {
            type: "paragraph",
            content: "SnapLite handles these realities through [graph partitioning](#graph-partitioning). When a model targets an NPU but contains unsupported operations, the deployment runtime must partition the graph, execute the supported subgraphs on the NPU, and automatically [fallback](#fallback) to the CPU for the remainder. This requires intelligent orchestration, backend selection, and [quantization](#quantization) handling."
          },
          {
            type: "figure",
            caption: "Backend-Specific Graph Partitioning",
            visual: "snaplite-partitioning"
          },
          {
            type: "heading",
            content: "7. RESULTS"
          },
          {
            type: "paragraph",
            content: "By unifying the deployment architecture and enforcing strict artifact reuse, the runtime achieved massive improvements in startup and execution latency across representative workloads."
          },
          {
            type: "result-table",
            content: "GPU First Inference: 1200 ms → 120 ms (10× reduction)\\nNPU First Inference: 1320 ms → 150 ms (8.8× reduction)\\nMobileNetV3 (CPU) Memory: 920 MB → 280 MB (70% reduction)\\nYOLOv8n (NPU) Memory: 880 MB → 230 MB (74% reduction)\\nYOLOv8n Latency: 24.0 ms → 11.0 ms (2.18×)"
          },
          {
            type: "figure",
            caption: "Cache-Enabled Startup Timeline",
            visual: "snaplite-cache"
          },
          {
            type: "heading",
            content: "8. ENGINEERING SCOPE"
          },
          {
            type: "paragraph",
            content: "My work on SnapLite ranged from production model enablement to runtime infrastructure. I worked with use-case teams to bring models through conversion and validation, debugged failures across the model and runtime boundary, integrated optimized CPU execution, maintained deployment artifacts and caches, and helped migrate the framework from TensorFlow Lite 2.20 to LiteRT. The migration required preserving Samsung-specific execution behavior while adapting the runtime around LiteRT's accelerator and delegate architecture."
          },
          {
            type: "heading",
            content: "CONCLUSION"
          },
          {
            type: "paragraph",
            content: "SnapLite taught me that efficient model execution is not only a property of the model or the accelerator. Production deployment also depends on how graphs are partitioned, how artifacts are compiled and reused, how backends are selected, and how the runtime handles unsupported operations and failures.\n\nThe LiteRT migration brought these concerns under a more unified execution framework while preserving Samsung-specific optimizations and deployment behavior across CPUs, GPUs, and NPUs.\n\nSnapLite solved efficient execution for static inference models, but deploying training workloads introduces an entirely new constraint: maintaining backward state. This realization motivated my work on [NNTRAINER](#nntrainer)."
          }
        ]
      }
    }
  ],
  researchFoundations: [
    {
      id: "wesper",
      number: "06",
      title: "WHISPERED SPEECH REPRESENTATIONS (WESPER)",
      metadata: "IIIT HYDERABAD",
      teaser: "I reproduced WESPER, a whispered-to-normal speech conversion system built on HuBERT, and replaced its MFCC targets with SFCC to retain more information from whispered and noisy speech. Smoothing and component selection made the larger representation practical, improving results by 10–25% at low SNR without increasing model capacity. It was my first experience seeing that changing what information a model receives can be more effective than simply making the model larger.",
      result: "10–25% IMPROVEMENT",
      article: {
        intro: "I reproduced WESPER, a whispered-to-normal speech conversion system built around self-supervised HuBERT representations and downstream synthesis.",
        sections: [
          {
            type: "paragraph",
            content: "The original training used MFCC targets; I replaced them with SFCC targets to preserve richer information in whispered and noisy speech, then used smoothing and component selection to make the higher-dimensional representation practical."
          },
          {
            type: "paragraph",
            content: "The takeaway: changing what information a model receives can sometimes solve a problem before adding model capacity. This led me to ask the inverse question: if we already have a large model, how much of its computation does a task actually need? This led to my work on early-exit representations in [CLASSIFICATION OF TYPICAL AND ATYPICAL DISFLUENCIES](#speech-reps)."
          }
        ]
      }
    },
    {
      id: "speech-reps",
      number: "05",
      title: "TOWARDS CLASSIFICATION OF TYPICAL AND ATYPICAL DISFLUENCIES: A SELF-SUPERVISED REPRESENTATION APPROACH",
      metadata: "INTERSPEECH 2025",
      teaser: "I studied whether the final representation of a self-supervised speech model is necessarily the most useful one for a downstream task. Across Wav2Vec2.0, HuBERT, WavLM, and TERA, HuBERT’s fifth layer reached an F1 of 0.97 and outperformed its final representation, showing that deeper computation was not automatically more useful for the task. The work also involved IIITH-TISA, a 10-hour Indian-English stuttered-speech corpus that I helped build.",
      result: "PUBLISHED — INTERSPEECH 2025",
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
            content: "HuBERT's fifth layer reached a peak F1 of 0.97 and outperformed the final representation, showing that useful task information can emerge well before the encoder's endpoint. Later layers are not automatically better for every task. The work also involved IIITH-TISA, a 10-hour Indian-English dataset containing recordings from 30 persons who stutter and 3,251 annotated clips.\n\nOnce we know what computation a model actually needs, the next challenge is executing that computation reliably across diverse hardware. This engineering reality drove my work on the [SNAPLITE RUNTIME](#snaplite)."
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

  engineeringLeadership: [
    {
      id: "waveform",
      number: "07",
      title: "WAVEFORM-WIZARD",
      articleTitle: "WAVEFORM-WIZARD",
      metadata: [
        "ICASSP 2025 SHOW & TELL",
        "OPEN-SOURCE SPEECH ANALYSIS AND VISUALIZATION TOOL"
      ],
      teaser: "I led a team of six undergraduates in building Waveform-Wizard, a Python-based replacement for our lab's MATLAB speech-analysis workflow. The project brought waveform, spectral, pitch, and formant analyses into a unified application with linked views, multi-file comparison, and portable installers. We presented the tool at ICASSP 2025 Show & Tell.",
      result: "PRESENTED — ICASSP 2025 SHOW & TELL",
      link: "/publications/Icassp_Show_and_tell.pdf",
      article: {
        intro: "I led a team of six undergraduates in building Waveform-Wizard, a Python-based replacement for our lab's [MATLAB](#matlab) speech-analysis workflow. The goal was to make the analysis stack easier to use, extend, and distribute without requiring a MATLAB license.\n\nThe system provides waveform analysis, [zero-time windowing spectrograms](#zero-time-windowing-spectrograms), [spectral flatness](#spectral-flatness), [S-transform](#s-transform), [Constant-Q](#constant-q) analysis, [formant](#formant) visualization, [pitch](#pitch) analysis, [Gammatone](#gammatone) analysis, and [voice activity detection](#voice-activity-detection).\n\nIt also includes multiple-file comparison, dynamically linked analysis panes, save/resume via a custom workflow format, PDF/PNG/SVG export, and automated Windows and Ubuntu packaging.",
        sections: [
          {
            type: "heading",
            content: "ENGINEERING"
          },
          {
            type: "paragraph",
            content: "The project transitioned the lab's workflow from MATLAB into a standalone Python application using NumPy, [SciPy](#scipy), [LibROSA](#librosa), and a [PyQt5](#pyqt5) graphical interface. This involved carefully mapping existing MATLAB functionality to their Python equivalents and implementing custom signal processing routines where direct library replacements were unavailable."
          },
          {
            type: "figure",
            caption: "Waveform-Wizard Interactive Dashboard",
            visual: "ww-dashboard"
          },
          {
            type: "heading",
            content: "TEAM AND DELIVERY"
          },
          {
            type: "paragraph",
            content: "I led a team of six undergraduate researchers in developing and packaging the application. We successfully presented the resulting tool at the ICASSP 2025 Show & Tell session. The source code and our presentation details are available through the project links."
          },
          {
            type: "heading",
            content: "CONCLUSION"
          },
          {
            type: "paragraph",
            content: "The project gave me experience turning an internal research workflow into a reusable software tool, including interface design, analysis integration, packaging, and cross-platform delivery."
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
