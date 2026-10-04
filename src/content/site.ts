export const siteContent = {
  identity: {
    name: "ANIRUDH BOCHA",
    heroEyebrow: "SAMSUNG RESEARCH INDIA · ML SYSTEMS",
    heroHeadline: "EFFICIENT MACHINE LEARNING SYSTEMS.",
    heroParagraphs: [
      "I’m a Machine Learning Engineer at [Samsung Research India](https://research.samsung.com/sri), where I work on making machine learning more efficient across training, inference, and systems. My work spans on-device LLMs, heterogeneous execution, quantization, memory-efficient training, continual adaptation, and adaptive inference. More broadly, I’m interested in understanding what information, computation, and state a model actually needs for a task, and how that work can be reduced, reused, or adapted as models and workloads change.",
      "I’ve explored these questions at different levels of the stack: from representations and computation depth to optimization, memory, runtimes, scheduling, and accelerator execution. More recently, I’ve also been studying how computation can be reused across models during inference and how models can adapt their computation to the workload. These problems have led me toward a broader interest in designing ML algorithms and systems together rather than treating model efficiency and system efficiency as separate problems.",
      "I first became interested in these questions through speech research at [IIIT Hyderabad](https://www.iiit.ac.in/). In Prof. Anil Kumar Vuppala’s Speech Processing Lab, I studied how different representations and intermediate layers affected task performance, finding that more information and deeper computation were not always more useful. That perspective has stayed with me as my work has moved from speech representations to model optimization, efficient execution, and adaptive ML systems."
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
            content: "v = x V_r\ncoeff_i = Z_i v\nŷ_i = y + ε(coeff_i U_r^T)"
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
            content: "Deploying the optimization on real NPU hardware exposed constraints that GPU simulation did not show. Full-rank perturbations were unsafe at the accelerator dispatch level. Rank changed the relative efficiency of CPU and NPU execution. Subspace refresh had to be reformulated around batched accelerator-friendly computation. The resulting system reached 92.0% SST-2 accuracy on real Hexagon hardware, close to the 92.7% full-LoRA baseline, while showing that the hardware affected not only execution strategy but the optimization representation itself.\\n\\nThis work solves the backward-state memory constraint. A separate challenge in heterogeneous inference is how to efficiently reuse context when computation moves between models. This led to my work on [CROSS-VOCABULARY SPECULATIVE DECODING](#hybrid)."
          }
        ]
      }
    },
    {
      id: "hybrid",
      number: "03",
      category: "CURRENT RESEARCH",
      title: "CROSS-VOCABULARY SPECULATIVE DECODING",
      articleTitle: "CROSS-VOCABULARY SPECULATIVE DECODING AS BOTH ACCELERATOR AND HANDOFF MECHANISM",
      metadata: [
        "Cloud GPU",
        "1.394× wall-clock speedup",
        "2.797× server compute reduction"
      ],
      heroQuestion: "How can computation already performed by a small device model remain useful when control moves to a larger model?",
      homepageSummary: "A small model can handle easier requests locally while a larger server model takes over when more capability is needed, but a conventional handoff throws away computation the smaller model has already performed. I use speculative decoding itself as the handoff: the local model’s draft is translated into the larger model’s vocabulary and verified in a single batched pass, allowing the larger model to reuse the work instead of starting from the full context again. In the current cloud-GPU setup, this reduced wall-clock time by 1.394× and server compute by 2.797× without changing the output under greedy decoding.",
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

  systemsDeployment: [
    {
      id: "snaplite",
      number: "04",
      title: "SNAPLITE RUNTIME",
      metadata: "SAMSUNG RESEARCH INDIA · 2024",
      teaser: "During my Samsung Research internship, I worked on SnapLite, Samsung’s on-device deployment runtime supporting more than 200 production vision, speech, and text models. I helped unify CPU, GPU, and NPU deployment around a common LiteRT-based path while retaining accelerator-specific optimizations, working across model conversion, runtime dispatch, compiled artifacts, caching, and fallback behavior. The resulting changes reduced representative first-inference latency by 10× on GPU.",
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
    }
  ],

  researchFoundations: [
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
            content: "The takeaway: representation design can improve performance before adding model complexity."
          }
        ]
      }
    }
  ],

  engineeringLeadership: [
    {
      id: "waveform",
      number: "07",
      title: "WAVEFORM-WIZARD: A FREE TOOL FOR SPECTRO-TEMPORAL VISUALIZATION OF SPEECH",
      metadata: "ICASSP 2025 SHOW & TELL",
      teaser: "I led a team of six undergraduates in building Waveform-Wizard, an open-source Python replacement for our lab’s MATLAB speech-analysis workflow. We brought waveform, spectral, pitch, formant, and other analyses into one application with linked views, multi-file comparison, workflow persistence, and portable installers for Windows and Ubuntu. We presented the tool at ICASSP 2025 Show & Tell.",
      result: "PRESENTED — ICASSP 2025 SHOW & TELL",
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
