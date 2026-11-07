/* ============================================================
   Structured content — English + Chinese
   Every project lives in PROJECTS and belongs to one CATEGORY
   (a "door"). Each project gets its own detail screen at
   #/project/<id>.
   ============================================================ */

const ROLES = {
  en: ["AI/LLM Engineer", "Backend Developer", "Full-Stack Builder", "RAG Architect", "Agentic AI Dev"],
  zh: ["AI/大模型工程师", "后端开发工程师", "全栈开发者", "RAG 架构师", "智能体 AI 开发"]
};

const SKILLS = [
  { en: "Languages", zh: "编程语言", items: ["Python", "SQL", "TypeScript", "JavaScript"] },
  { en: "Backend", zh: "后端", items: ["Django & DRF", "FastAPI", "Flask", "WebSockets", "REST APIs", "Celery & Redis"] },
  { en: "AI / LLM", zh: "AI / 大模型", items: ["RAG & Agentic AI", "LangChain", "LlamaIndex", "Fine-Tuning (LoRA/DoRA)", "PEFT / Transformers", "Prompt Engineering", "ChromaDB · FAISS", "vLLM / Ollama"] },
  { en: "Frontend", zh: "前端", items: ["React", "Next.js", "Tailwind CSS", "Streamlit"] },
  { en: "ML / Data", zh: "机器学习 / 数据", items: ["TensorFlow / Keras", "spaCy", "Scikit-Learn", "NumPy & Pandas"] },
  { en: "Cloud / DevOps", zh: "云与运维", items: ["AWS (S3, Lambda, Glue)", "Docker & Compose", "PostgreSQL", "Snowflake"] },
  { en: "AI Dev Tools", zh: "AI 开发工具", items: ["Claude Code", "MCP Servers", "Git & GitHub"] }
];

const EXPERIENCE = [
  {
    year: "2026", date: "Mar 2026 – Jul 2026",
    company: "Obsidian Realm Technologies", location: { en: "Guangzhou, China", zh: "中国 · 广州" },
    role: { en: "AI Engineer", zh: "AI 工程师" },
    bullets: {
      en: [
        "Designed and deployed LLM-based RAG and agentic AI solutions using Python, FastAPI, LangChain, and LlamaIndex",
        "Built document processing, chunking, embedding, and retrieval pipelines for knowledge-based AI applications",
        "Deployed local/open-source models via Ollama and vLLM, optimizing GPU utilization and inference performance",
        "Developed backend APIs integrating AI models with existing applications, databases, and third-party services"
      ],
      zh: [
        "使用 Python、FastAPI、LangChain 与 LlamaIndex 设计并部署基于大模型的 RAG 与智能体式 AI 解决方案",
        "为知识型 AI 应用构建文档处理、分块、嵌入与检索管道",
        "通过 Ollama 与 vLLM 部署本地/开源模型，优化 GPU 利用率与推理性能",
        "开发后端 API，将 AI 模型与现有应用、数据库及第三方服务集成"
      ]
    }
  },
  {
    year: "2025", date: "Jun 2025 – Jan 2026",
    company: "QubitDance", location: { en: "Chengdu, China", zh: "中国 · 成都" },
    role: { en: "Backend Developer", zh: "后端开发工程师" },
    bullets: {
      en: [
        "Developed microservices architecture with Django and DRF for scalable backend solutions",
        "Designed RESTful APIs and containerized services with Docker for portable environments",
        "Implemented JWT authentication, role-based access control, and query optimization to reduce latency"
      ],
      zh: [
        "使用 Django 与 DRF 构建微服务架构，支撑可扩展的后端方案",
        "设计 RESTful API，并使用 Docker 将服务容器化，保证环境可移植",
        "实现 JWT 身份认证、基于角色的访问控制与查询优化，降低延迟"
      ]
    }
  },
  {
    year: "2022", date: "Oct 2022 – Jun 2025",
    company: "Techmate Technologies", location: { en: "Remote", zh: "远程" },
    role: { en: "Python Developer", zh: "Python 开发工程师" },
    bullets: {
      en: [
        "Automated ETL pipelines using Python/Pandas, integrated with AWS and Snowflake",
        "Implemented Stripe/PayPal payment gateways for e-commerce solutions",
        "Built Streamlit dashboards with real-time data sync and geospatial validation via HereAPI"
      ],
      zh: [
        "使用 Python/Pandas 自动化 ETL 管道，并与 AWS、Snowflake 集成",
        "为电商解决方案集成 Stripe、PayPal 支付网关",
        "构建具备实时数据同步的 Streamlit 仪表盘，并通过 HereAPI 进行地理空间校验"
      ]
    }
  },
  {
    year: "2021", date: "Nov 2021 – Oct 2022",
    company: "Code Embeded", location: { en: "Remote", zh: "远程" },
    role: { en: "Python Django Developer", zh: "Python Django 开发工程师" },
    bullets: {
      en: [
        "Developed scalable Django web applications with RESTful APIs using DRF",
        "Implemented JWT authentication and role-based access control systems"
      ],
      zh: [
        "使用 DRF 开发具备 RESTful API 的可扩展 Django 应用",
        "实现 JWT 身份认证与角色权限控制系统"
      ]
    }
  }
];

/* ---------------- DOORS (project categories) ---------------- */
const CATEGORIES = [
  {
    id: "ai", color: "#3d6fd1",
    plaque: { en: "GEN AI", zh: "生成式 AI" },
    name: { en: "Generative AI Systems", zh: "生成式 AI 系统" },
    tagline: { en: "RAG, agents, voice and fine-tuned LLMs", zh: "RAG、智能体、语音与微调大模型" }
  },
  {
    id: "fullstack", color: "#5e9e74",
    plaque: { en: "FULL STACK", zh: "全栈" },
    name: { en: "Full-Stack Products", zh: "全栈产品" },
    tagline: { en: "API design to polished UI", zh: "从 API 设计到精致界面" }
  },
  {
    id: "backend", color: "#c8622f",
    plaque: { en: "BACKEND", zh: "后端" },
    name: { en: "Backend & Microservices", zh: "后端与微服务" },
    tagline: { en: "Payments, tenants, roles — at scale", zh: "支付、多租户、权限 — 可规模化" }
  },
  {
    id: "data", color: "#8a4fb3",
    plaque: { en: "DATA OPS", zh: "数据运维" },
    name: { en: "Data & Automation", zh: "数据与自动化" },
    tagline: { en: "ETL that removes the manual work", zh: "让人工处理消失的 ETL" }
  }
];

/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  /* ===== NEW: VoiceForge ===== */
  {
    id: "voiceforge", cat: "ai", also: ["fullstack"], isNew: true,
    name: "VoiceForge",
    tag: { en: "Local Multi-User AI Voice & Video Studio", zh: "本地多用户 AI 语音与视频工作室" },
    tech: ["Python", "FastAPI", "PostgreSQL", "WebSockets", "React", "TypeScript", "Tailwind", "Ollama", "ONNX Runtime", "FFmpeg", "Whisper", "Wav2Lip"],
    desc: {
      en: "A fully offline, multi-user AI studio for streaming voice chat, voice cloning and AI video generation — running entirely on local models on CPU.",
      zh: "完全离线的多用户 AI 工作室，支持流式语音对话、声音克隆与 AI 视频生成 — 全部基于本地模型在 CPU 上运行。"
    },
    bullets: {
      en: [
        "Runs entirely on local models (Ollama, Whisper, Pocket TTS) on CPU — no cloud APIs, no GPU required",
        "Streams LLM replies over WebSockets with sentence-level TTS, so audio starts before the full reply is written",
        "Postgres job queue (SKIP LOCKED + LISTEN/NOTIFY) handles heavy video jobs without needing Redis",
        "AI video pipelines for narrated explainer videos with Whisper-aligned captions and Wav2Lip lip-synced avatars",
        "JWT auth, React + TypeScript frontend, and Docker Compose deployment"
      ],
      zh: [
        "完全基于本地模型（Ollama、Whisper、Pocket TTS）在 CPU 上运行 — 无云端 API，无需 GPU",
        "通过 WebSocket 流式返回大模型回复，并按句合成语音，回复尚未写完音频即可开始播放",
        "基于 Postgres 的任务队列（SKIP LOCKED + LISTEN/NOTIFY）处理繁重的视频任务，无需 Redis",
        "构建 AI 视频管道：生成带 Whisper 对齐字幕的讲解视频，以及 Wav2Lip 口型同步的数字人",
        "JWT 认证、React + TypeScript 前端与 Docker Compose 部署"
      ]
    },
    flow: ["Mic / Text", "Whisper ASR", "Ollama LLM", "Sentence TTS", "WebSocket", "Browser"],
    metrics: [
      { v: "0", l: { en: "cloud API calls", zh: "云端 API 调用" } },
      { v: "CPU", l: { en: "only — no GPU needed", zh: "即可运行，无需 GPU" } },
      { v: "3", l: { en: "studios: chat · clone · video", zh: "工作室：对话 · 克隆 · 视频" } }
    ]
  },

  /* ===== NEW: PlotForge ===== */
  {
    id: "plotforge", cat: "ai", also: ["fullstack"], isNew: true,
    name: "PlotForge",
    tag: { en: "Scientific Chart Generation SaaS", zh: "科研图表生成 SaaS 平台" },
    tech: ["Python", "Django", "DRF", "Matplotlib", "Plotly", "Pandas", "SciPy", "Stripe", "Docker", "Next.js", "React", "TypeScript", "Tailwind", "TanStack Query", "Zustand"],
    desc: {
      en: "A full-stack SaaS where researchers paste or upload data and get publication-quality charts from 390+ chart types, with journal colour sets and figure sizes in inches.",
      zh: "全栈 SaaS 平台：研究人员粘贴或上传数据，即可从 390 多种图表类型中生成可直接发表的图表，支持期刊配色与英寸级图幅尺寸。"
    },
    bullets: {
      en: [
        "390+ chart types — volcano plots, Kaplan-Meier curves, heatmaps, phylogenetic trees — with journal colour sets",
        "Plugin-based chart registry in Django: each chart is one class, so a single endpoint validates, charges credits, renders and auto-refunds on failure",
        "Idempotent credit wallet with Stripe/PayPal checkout and a full admin area",
        "Next.js + TypeScript frontend with a searchable chart gallery and a chart editor with demo data and live settings",
        "JWT auth with Google sign-in and token refresh, light/dark themes, and a public landing page"
      ],
      zh: [
        "390 多种图表类型 — 火山图、Kaplan-Meier 生存曲线、热图、系统发育树 — 并内置期刊配色",
        "在 Django 中设计插件式图表注册表：每种图表是一个类，单一接口即可完成校验、扣费、渲染，失败时自动退款",
        "幂等的积分钱包，集成 Stripe/PayPal 支付与完整的管理后台",
        "Next.js + TypeScript 前端，提供可搜索的图表库，以及带示例数据与实时参数的图表编辑器",
        "支持 Google 登录与令牌刷新的 JWT 认证、明暗主题以及公开落地页"
      ]
    },
    flow: ["Paste / Upload", "Validate", "Charge credits", "Render plugin", "Export figure"],
    metrics: [
      { v: "390+", l: { en: "chart types", zh: "种图表类型" } },
      { v: "1", l: { en: "endpoint for every chart", zh: "个接口覆盖所有图表" } },
      { v: "Auto", l: { en: "refund on render failure", zh: "渲染失败自动退款" } }
    ]
  },

  {
    id: "guardpipe", cat: "ai",
    name: "GuardPipe",
    tag: { en: "Open-Source AI Guardrails Middleware", zh: "开源 AI 安全防护中间件" },
    links: [
      { label: "PyPI", url: "https://pypi.org/project/guardpipe/" },
      { label: { en: "Live demo", zh: "在线演示" }, url: "https://huggingface.co/spaces/hassanButt/guardpipe-demo" }
    ],
    tech: ["Python", "Pydantic", "FastAPI", "LangChain", "LlamaIndex", "OpenAI SDK", "Anthropic SDK", "Gradio"],
    desc: {
      en: "Published guardpipe on PyPI — security middleware that checks every prompt and response going in and out of an LLM for injection, jailbreaks, PII, and toxic content.",
      zh: "在 PyPI 上发布的 guardpipe 安全中间件，对每一次进出大模型的提示词与响应进行检测，识别提示注入、越狱攻击、PII 与有害内容。"
    },
    bullets: {
      en: [
        "Built and published guardpipe on PyPI, catching prompt injection, jailbreak attempts, PII, and toxic content on every request",
        "One-line integration for OpenAI, Anthropic, Ollama, LangChain, LlamaIndex, FastAPI, Flask, and Django via a single guard.wrap(client) call",
        "Included role-based access control, rate limiting, and audit logging, making it usable in real production apps rather than just demos",
        "Deployed an interactive Hugging Face Space demo letting users test the guardrails live in-browser against real prompt injection, PII, and jailbreak attempts"
      ],
      zh: [
        "构建并发布 guardpipe 到 PyPI，可检测每次请求中的提示注入、越狱攻击、PII 与有害内容",
        "为 OpenAI、Anthropic、Ollama、LangChain、LlamaIndex、FastAPI、Flask、Django 提供一行代码集成，仅需调用 guard.wrap(client)",
        "内置角色权限控制、速率限制与审计日志，可用于真实生产环境而不仅是演示",
        "部署交互式 Hugging Face Space 演示，用户可在浏览器中实时测试防护效果，涵盖真实的提示注入、PII 与越狱攻击场景"
      ]
    },
    flow: ["Prompt", "Injection / jailbreak scan", "PII + toxicity", "LLM", "Response guard", "App"],
    metrics: [
      { v: "1", l: { en: "line to wrap any client", zh: "行代码接入任意客户端" } },
      { v: "8", l: { en: "framework integrations", zh: "种框架集成" } },
      { v: "PyPI", l: { en: "published package", zh: "已发布的开源包" } }
    ]
  },
  {
    id: "ragforge", cat: "ai",
    name: "RAGForge",
    tag: { en: "Multi-Agent Local RAG Framework", zh: "多智能体本地 RAG 框架" },
    tech: ["Python", "LlamaIndex", "Ollama", "ChromaDB", "FAISS", "BM25", "RAGAS", "SQLite"],
    desc: {
      en: "Fully offline, multi-agent RAG framework orchestrating 6 specialized agents for end-to-end pipeline automation — document ingestion through answer evaluation.",
      zh: "完全离线的多智能体 RAG 框架，编排 6 个专职智能体，实现从文档处理到答案评估的端到端管道自动化。"
    },
    bullets: {
      en: [
        "12 chunking strategies and 12 retrieval strategies (hybrid, RRF, auto-merging, query fusion) — runtime-selectable via CLI",
        "Dual vector store support (ChromaDB, FAISS) with automatic index reuse/caching to avoid redundant re-embedding",
        "SQLite-based experiment logging for systematic A/B comparison across configurations",
        "RAGAS evaluation (faithfulness, relevancy, context precision/recall) using local LLMs as judges — zero cloud API dependency"
      ],
      zh: [
        "12 种分块策略与 12 种检索策略（混合检索、RRF、自动合并、查询融合），均可通过 CLI 在运行时切换",
        "支持双向量存储（ChromaDB、FAISS），并自动复用/缓存索引，避免重复嵌入计算",
        "基于 SQLite 的实验日志系统，用于跨配置的系统化 A/B 对比",
        "集成 RAGAS 评估体系（忠实度、相关性、上下文精确率/召回率），以本地大模型作为评审 — 完全无需云端 API"
      ]
    },
    flow: ["Ingest", "Chunk ×12", "Embed", "Retrieve ×12", "Generate", "RAGAS eval"],
    metrics: [
      { v: "6", l: { en: "specialized agents", zh: "个专职智能体" } },
      { v: "12 × 12", l: { en: "chunking × retrieval strategies", zh: "分块 × 检索策略" } },
      { v: "0", l: { en: "cloud dependency", zh: "云端依赖" } }
    ]
  },
  {
    id: "pixelrag", cat: "ai",
    name: "PixelRAG Hybrid",
    tag: { en: "Visual RAG — Screenshot-Based Retrieval", zh: "视觉 RAG — 基于截图的检索系统" },
    tech: ["Python", "LLaVA", "Ollama", "LlamaIndex", "ChromaDB", "FAISS", "Qwen3", "SQLite"],
    desc: {
      en: "Visual RAG pipeline that screenshots websites, extracts text via the LLaVA vision model, and answers questions using LlamaIndex + Ollama — no HTML parsing involved.",
      zh: "视觉 RAG 管道：对网页截图后，通过 LLaVA 视觉模型提取文本内容，并结合 LlamaIndex + Ollama 进行问答 — 完全不依赖 HTML 解析。"
    },
    bullets: {
      en: [
        "Renders web pages as screenshots (CDP headless Chrome) instead of parsing HTML — eliminating 40%+ content loss from traditional scrapers",
        "LLaVA:7b via Ollama transcribes screenshot tiles into structured text, reading JS-rendered content pixel-by-pixel",
        "Sentence Window chunking with dual ChromaDB/FAISS support",
        "3-stage incremental pipeline (render → transcribe → index) with SQLite flags enabling resume-on-failure",
        "Fully local/offline — zero cloud API calls; all models run via Ollama on local hardware"
      ],
      zh: [
        "通过 CDP 无头 Chrome 将网页渲染为截图而非解析 HTML，减少传统爬虫 40% 以上的内容丢失",
        "通过 Ollama 部署 LLaVA:7b 视觉模型，将截图图块转录为结构化文本，逐像素处理 JS 渲染内容",
        "采用 Sentence Window 分块，并同时支持 ChromaDB/FAISS",
        "设计三阶段增量管道（渲染 → 转录 → 索引），配合 SQLite 状态标记支持失败恢复",
        "完全本地离线部署 — 零云端 API 调用，所有模型均通过 Ollama 在本地硬件运行"
      ]
    },
    flow: ["URL", "Headless Chrome", "Screenshot tiles", "LLaVA:7b", "Index", "Answer"],
    metrics: [
      { v: "40%+", l: { en: "less content lost vs scrapers", zh: "内容丢失更少（对比传统爬虫）" } },
      { v: "3", l: { en: "resumable pipeline stages", zh: "个可恢复的管道阶段" } },
      { v: "0", l: { en: "cloud API calls", zh: "云端 API 调用" } }
    ]
  },
  {
    id: "agentforge", cat: "ai", also: ["fullstack"],
    name: "AgentForge",
    tag: { en: "Multi-Tenant Agentic RAG Platform", zh: "多租户智能体 RAG 平台" },
    tech: ["Python", "Django", "DRF", "LlamaIndex", "Ollama", "ChromaDB", "Celery", "Redis", "Docker"],
    desc: {
      en: "Platform where each user creates AI agents backed by their own private PDF knowledge bases, with full tenant isolation and a JWT-secured REST API.",
      zh: "每位用户都可基于自己私有的 PDF 知识库创建 AI 智能体的平台，具备完整租户隔离与 JWT 安全的 REST API。"
    },
    bullets: {
      en: [
        "LlamaIndex ReActAgent autonomously decides whether to retrieve from ChromaDB or answer from parametric knowledge",
        "Incremental vector indexing and background PDF ingestion via Celery + Redis for non-blocking agent readiness",
        "Fully local LLM stack (Ollama + LLaMA3/Mistral) with zero cloud dependency for privacy-first deployments",
        "Full stack containerized with Docker Compose (Django, Celery, Redis, ChromaDB, PostgreSQL) for one-command setup"
      ],
      zh: [
        "基于 LlamaIndex ReActAgent，让大模型自主判断是从 ChromaDB 检索还是直接依靠自身知识回答",
        "通过 Celery + Redis 实现增量向量索引与后台 PDF 处理，保证智能体非阻塞、近实时可用",
        "完全本地化的大模型技术栈（Ollama + LLaMA3/Mistral），零云依赖，适合注重隐私的部署场景",
        "使用 Docker Compose 对整套服务容器化（Django、Celery、Redis、ChromaDB、PostgreSQL），一条命令即可部署"
      ]
    },
    flow: ["Tenant", "Upload PDFs", "Celery ingest", "ChromaDB", "ReActAgent", "Answer"],
    metrics: [
      { v: "ReAct", l: { en: "agent decides when to retrieve", zh: "智能体自主决定何时检索" } },
      { v: "1", l: { en: "command to deploy", zh: "条命令即可部署" } },
      { v: "0", l: { en: "cloud dependency", zh: "云端依赖" } }
    ]
  },
  {
    id: "sentinelrag", cat: "ai",
    name: "SentinelRAG",
    tag: { en: "Local Guarded RAG System", zh: "本地安全防护型 RAG 系统" },
    tech: ["Python", "LlamaIndex", "Ollama", "ChromaDB", "FastAPI", "RAGAS", "DeepEval"],
    desc: {
      en: "A fully local, agentic RAG system with hybrid retrieval, structure-preserving OCR, deduplication, and a security guardrails layer.",
      zh: "完全本地化的智能体式 RAG 系统，具备混合检索、结构保留式 OCR、文档去重机制以及安全防护层。"
    },
    bullets: {
      en: [
        "Fully local agentic pipeline (LlamaIndex Workflows + Ollama) using hybrid dense + BM25 retrieval fused via RRF",
        "3-layer deduplication (file-hash, MinHash, embedding similarity) with a persistent cross-session registry",
        "Structure-preserving OCR routes tables/images per PDF page through a vision-language model into Markdown",
        "Guardrails layer (prompt-injection detection, PII redaction, RBAC) plus LLM-as-judge hallucination guard with auto-regeneration"
      ],
      zh: [
        "完全本地的智能体式管道（LlamaIndex Workflows + Ollama），采用混合密集检索 + BM25，并通过 RRF 融合结果",
        "三层去重系统（文件哈希、MinHash、嵌入相似度），配合持久化注册表实现跨会话去重",
        "结构保留式 OCR，将 PDF 中的表格/图像交由视觉语言模型处理并转换为 Markdown",
        "安全防护层（提示注入检测、PII 脱敏、RBAC）加上大模型评审幻觉防护机制，支持自动重新生成答案"
      ]
    },
    flow: ["PDF", "VLM OCR", "3-layer dedup", "Hybrid + RRF", "Guardrails", "Judge"],
    metrics: [
      { v: "3", l: { en: "dedup layers", zh: "层去重" } },
      { v: "RRF", l: { en: "dense + BM25 fusion", zh: "密集 + BM25 融合" } },
      { v: "Auto", l: { en: "regenerate on hallucination", zh: "幻觉时自动重新生成" } }
    ]
  },
  {
    id: "finetune", cat: "ai",
    name: { en: "LLM Fine-Tuning Pipeline", zh: "大模型微调流水线" },
    tag: { en: "LoRA / DoRA on Qwen3-4B", zh: "基于 Qwen3-4B 的 LoRA / DoRA 微调" },
    tech: ["Python", "PEFT", "Transformers", "Qwen3", "GGUF", "Ollama", "PyTorch"],
    desc: {
      en: "End-to-end fine-tuning pipeline for Qwen3-4B-Instruct on custom PDF datasets — data prep through local deployment.",
      zh: "面向 Qwen3-4B-Instruct 的端到端微调流水线，基于自定义 PDF 数据集，覆盖从数据准备到本地部署的全流程。"
    },
    bullets: {
      en: [
        "Implemented DoRA (Weight-Decomposed Low-Rank Adaptation) alongside standard LoRA, toggled via config flag",
        "PDF-to-training-data script that chunks, cleans, and formats documents into instruction-following pairs",
        "Exported merged models to GGUF format for quantized, hardware-efficient local deployment",
        "Validated inference quality locally via Ollama — a complete fine-tune-to-deployment loop with no cloud GPU"
      ],
      zh: [
        "在标准 LoRA 基础上实现 DoRA（权重分解低秩适配），可通过配置开关切换",
        "编写 PDF 转训练数据脚本，对文档进行分块、清洗并格式化为指令跟随数据对",
        "将合并后的模型导出为 GGUF 格式，用于量化后的高效本地部署",
        "通过 Ollama 在本地验证推理质量 — 完整实现从微调到部署的闭环，无需云端 GPU"
      ]
    },
    flow: ["PDFs", "Instruction pairs", "LoRA / DoRA", "Merge", "GGUF", "Ollama"],
    metrics: [
      { v: "4B", l: { en: "Qwen3-Instruct base", zh: "Qwen3-Instruct 基座" } },
      { v: "2", l: { en: "adapters: LoRA · DoRA", zh: "种适配器：LoRA · DoRA" } },
      { v: "GGUF", l: { en: "quantized export", zh: "量化导出" } }
    ]
  },
  {
    id: "voiceai", cat: "ai",
    name: { en: "Real-Time Voice AI System", zh: "实时语音 AI 系统" },
    tag: { en: "ASR → LLM → TTS Pipeline", zh: "ASR → 大模型 → TTS 全链路" },
    tech: ["Python", "SenseVoice", "Ollama", "vLLM", "IndexTTS", "FastAPI", "WebSockets", "Docker"],
    desc: {
      en: "Production multi-service voice AI pipeline on a Tesla V100S GPU server, integrating ASR, LLM inference, and TTS via vLLM.",
      zh: "运行在 Tesla V100S GPU 服务器上的生产级多服务语音 AI 管道，集成语音识别、大模型推理与基于 vLLM 的语音合成。"
    },
    bullets: {
      en: [
        "FastAPI orchestration layer manages the full ASR → LLM → TTS flow, coordinating 3 tmux-managed microservices",
        "Sentence-level response chunking with a TTSSequenceManager streams ordered, low-latency audio to clients",
        "SQLite-backed conversation memory for multi-turn sessions",
        "Converted IndexTTS 1.5 from ModelScope to vLLM/HuggingFace format for high-speed speech synthesis",
        "Tuned GPU memory utilization to 25%, running TTS alongside Ollama within a 32GB VRAM budget"
      ],
      zh: [
        "基于 FastAPI 构建编排层，管理完整的 ASR → 大模型 → TTS 流程，协调 3 个通过 tmux 管理的微服务",
        "实现句子级响应分块与 TTSSequenceManager，向客户端流式返回有序、低延迟的音频",
        "基于 SQLite 的对话记忆，支持多轮会话",
        "将 IndexTTS 1.5 从 ModelScope 格式转换为 vLLM/HuggingFace 格式，实现高速语音合成",
        "将 GPU 显存占用调优至 25%，使 TTS 与 Ollama 在 32GB 显存预算内共存运行"
      ]
    },
    flow: ["Mic", "SenseVoice ASR", "Qwen3 (Ollama)", "Chunker", "IndexTTS (vLLM)", "Speaker"],
    metrics: [
      { v: "V100S", l: { en: "Tesla GPU server", zh: "Tesla GPU 服务器" } },
      { v: "25%", l: { en: "GPU memory for TTS", zh: "TTS 显存占用" } },
      { v: "32GB", l: { en: "shared VRAM budget", zh: "共享显存预算" } }
    ]
  },
  {
    id: "voiceassistant", cat: "ai",
    name: { en: "Local AI Voice Assistant", zh: "本地 AI 语音助手" },
    tag: { en: "Privacy-First Voice Cloning Assistant", zh: "隐私优先的语音克隆助手" },
    tech: ["Python", "Flask", "Ollama", "FunASR", "Pocket TTS", "FFmpeg"],
    desc: {
      en: "A fully local, privacy-first voice assistant combining a locally-hosted LLM, speech-to-text, and voice-cloning TTS — with zero dependency on cloud APIs.",
      zh: "完全本地化、隐私优先的语音助手，集成本地大模型、语音识别与声音克隆语音合成 — 完全不依赖云端 API。"
    },
    bullets: {
      en: [
        "Integrated a locally-hosted LLM (Ollama), speech-to-text (FunASR), and voice-cloning TTS (Kyutai Pocket TTS) with zero cloud dependency",
        "Real-time voice cloning: users record a short in-browser sample, converted into a reusable speaker embedding to personalize all future TTS output",
        "Built a Flask REST API (/api/chat, /api/clone-voice, /api/use-voice, /api/voices) with a browser client using MediaRecorder for live mic capture",
        "Solved cross-platform audio compatibility with an ffmpeg-based pipeline decoding browser WebM/Opus audio, with no system-wide ffmpeg install required"
      ],
      zh: [
        "集成本地部署的大模型（Ollama）、语音识别（FunASR）与声音克隆语音合成（Kyutai Pocket TTS），完全不依赖云端",
        "实现实时声音克隆：用户在浏览器中录制简短语音样本，转换为可复用的说话人嵌入，用于个性化后续所有语音合成输出",
        "构建 Flask REST API（/api/chat、/api/clone-voice、/api/use-voice、/api/voices），并使用 MediaRecorder 实现浏览器端实时录音的客户端",
        "通过基于 ffmpeg 的转换管道解决跨平台音频格式兼容问题，可解码浏览器录制的 WebM/Opus 音频，无需系统级安装 ffmpeg"
      ]
    },
    flow: ["MediaRecorder", "FFmpeg decode", "FunASR", "Ollama", "Pocket TTS", "Cloned voice"],
    metrics: [
      { v: "4", l: { en: "REST endpoints", zh: "个 REST 接口" } },
      { v: "1", l: { en: "short sample to clone a voice", zh: "段短样本即可克隆声音" } },
      { v: "0", l: { en: "cloud dependency", zh: "云端依赖" } }
    ]
  },
  {
    id: "taskflowai", cat: "fullstack", period: "Jun 2025 – Present",
    name: "TaskFlowAI",
    tag: { en: "Task Management Platform", zh: "任务管理平台" },
    tech: ["Python", "Django", "PostgreSQL", "JWT", "LangChain", "RAG"],
    desc: {
      en: "A modular Django backend for task and project management with a custom user model, role-based permissions and AI-assisted task insights.",
      zh: "模块化的 Django 任务与项目管理后端，具备自定义用户模型、基于角色的权限以及 AI 辅助任务洞察。"
    },
    bullets: {
      en: [
        "Modular apps (accounts, project, task) with a custom user model and role-based access",
        "Role-based permissions restricting project/task operations to Admin and Member roles",
        "Optimized PostgreSQL performance with indexes and select_related queries",
        "Integrated LangChain and RAG for AI-assisted task insights"
      ],
      zh: [
        "模块化应用（accounts、project、task），配合自定义用户模型与角色权限",
        "基于角色的权限控制，区分管理员与成员对项目/任务的操作",
        "通过索引与 select_related 查询优化 PostgreSQL 性能",
        "集成 LangChain 与 RAG，提供 AI 辅助任务洞察"
      ]
    },
    flow: ["Accounts", "Projects", "Tasks", "RBAC", "RAG insights"],
    metrics: [
      { v: "3", l: { en: "modular Django apps", zh: "个模块化 Django 应用" } },
      { v: "RBAC", l: { en: "Admin / Member", zh: "管理员 / 成员" } }
    ]
  },
  {
    id: "mbizz", cat: "fullstack", period: "Jul 2024 – Nov 2024",
    name: "M-Bizz",
    tag: { en: "AI Marketing Bots", zh: "AI 营销机器人" },
    tech: ["Python", "Django", "FastAPI", "LangChain", "OpenAI", "RAG", "Pandas", "Firebase", "PostgreSQL"],
    desc: {
      en: "Conversational AI chatbots built with LangChain and OpenAI GPT models on a scalable backend, integrated into business workflows.",
      zh: "基于 LangChain 与 OpenAI GPT 模型构建、运行于可扩展后端并融入业务流程的对话式 AI 机器人。"
    },
    bullets: {
      en: [
        "Conversational AI chatbots built with LangChain + OpenAI for business workflow integration",
        "RAG-based retrieval for domain-specific knowledge responses",
        "NLP preprocessing pipelines (Pandas) for cleaner inputs",
        "Firebase integration for real-time data sync and storage"
      ],
      zh: [
        "基于 LangChain 与 OpenAI 构建对话式 AI 机器人，融入业务流程",
        "采用 RAG 检索技术提供领域知识回答",
        "基于 Pandas 的 NLP 预处理管道，提升输入数据质量",
        "集成 Firebase，实现实时数据同步与存储"
      ]
    },
    flow: ["Customer", "NLP preprocess", "RAG", "GPT", "Firebase"],
    metrics: [
      { v: "RAG", l: { en: "domain knowledge", zh: "领域知识" } },
      { v: "Live", l: { en: "Firebase sync", zh: "Firebase 实时同步" } }
    ]
  },
  {
    id: "flaskbot", cat: "fullstack",
    name: { en: "Flask NLP Chatbot", zh: "Flask NLP 聊天机器人" },
    tag: { en: "Maintenance & Enhancement", zh: "维护与功能增强" },
    tech: ["Python", "Flask", "Stripe", "OpenAI", "Redis"],
    desc: {
      en: "Took over an existing production Flask chatbot — hardened it, monetized it with subscriptions and made it faster.",
      zh: "接手已上线的 Flask 聊天机器人 — 加固系统、接入订阅实现商业化并提升响应速度。"
    },
    bullets: {
      en: [
        "Debugged and hardened an existing production Flask chatbot",
        "Added Stripe subscriptions for monetization",
        "Implemented role-based access control for user management",
        "Introduced response caching to reduce latency"
      ],
      zh: [
        "修复并加固已有的生产环境 Flask 聊天机器人",
        "新增 Stripe 订阅功能实现商业化",
        "实现基于角色的访问控制以管理用户权限",
        "引入响应缓存机制以降低延迟"
      ]
    },
    flow: ["User", "RBAC", "Cache", "OpenAI", "Stripe billing"],
    metrics: [
      { v: "Stripe", l: { en: "subscriptions added", zh: "订阅功能上线" } },
      { v: "Redis", l: { en: "response cache", zh: "响应缓存" } }
    ]
  },
  {
    id: "xnft", cat: "backend",
    name: "X-NFT",
    tag: { en: "NFT & Collection Microservice", zh: "NFT 与藏品管理微服务" },
    tech: ["Python", "Django", "DRF", "PostgreSQL", "Pydantic", "Docker"],
    desc: {
      en: "A Django/DRF microservice for NFT and collection management, wired to a Solidity blockchain service — OpenSea-style browsing on top.",
      zh: "用于 NFT 与藏品管理的 Django/DRF 微服务，对接 Solidity 区块链服务，并提供类似 OpenSea 的浏览体验。"
    },
    bullets: {
      en: [
        "Multi-tenant microservice for NFT and collection management with RBAC",
        "Integrated with a Solidity blockchain service for mint, buy, transfer, and burn",
        "OpenSea-style advanced search, filter and sort for NFTs and collections",
        "Built with Django, DRF, and Pydantic for robust data validation"
      ],
      zh: [
        "具备角色权限的多租户 NFT 与藏品管理微服务",
        "与 Solidity 区块链服务集成，支持铸造、购买、转让与销毁",
        "提供类似 OpenSea 的高级搜索、筛选与排序",
        "基于 Django、DRF 与 Pydantic 构建，保障数据校验的稳健性"
      ]
    },
    flow: ["Client", "DRF API", "Validate (Pydantic)", "Chain service", "Mint / Transfer / Burn"],
    metrics: [
      { v: "4", l: { en: "on-chain operations", zh: "种链上操作" } },
      { v: "RBAC", l: { en: "multi-tenant", zh: "多租户" } }
    ]
  },
  {
    id: "payuni", cat: "backend",
    name: "PayUni",
    tag: { en: "E-commerce Payment Microservice", zh: "电商支付微服务" },
    tech: ["Python", "Django", "DRF", "PostgreSQL", "JWT", "Docker"],
    desc: {
      en: "A multi-tenant e-commerce microservice with dynamic merchant roles and crypto + fiat payments through a dedicated payment service.",
      zh: "多租户电商微服务，支持商户动态角色，并通过独立支付服务支持加密货币与法币支付。"
    },
    bullets: {
      en: [
        "Multi-tenant e-commerce backend with dynamic role management for merchants",
        "Crypto and fiat payments via a separate payment microservice",
        "Full exception handling across payment workflows",
        "JWT-based authentication across all endpoints"
      ],
      zh: [
        "多租户电商后端，支持商户动态角色管理",
        "通过独立支付微服务支持加密货币与法币支付",
        "支付流程具备完整的异常处理",
        "所有接口均采用 JWT 身份验证"
      ]
    },
    flow: ["Merchant", "Catalog", "Order", "Payment service", "Crypto / Fiat"],
    metrics: [
      { v: "2", l: { en: "payment rails: crypto · fiat", zh: "种支付通道：加密 · 法币" } },
      { v: "Dynamic", l: { en: "merchant roles", zh: "商户角色" } }
    ]
  },
  {
    id: "apify", cat: "backend",
    name: "APIFY",
    tag: { en: "API Marketplace Platform", zh: "API 交易市场平台" },
    tech: ["Python", "Django", "DRF", "Alipay", "WeChat Pay", "PostgreSQL", "JWT"],
    desc: {
      en: "A RapidAPI-style marketplace with API, version, endpoint and pricing management, demand-and-offer purchasing and group buys.",
      zh: "类似 RapidAPI 的 API 交易市场，支持 API、版本、接口与定价管理，以及需求/报价采购与拼团购买。"
    },
    bullets: {
      en: [
        "API / version / endpoint / pricing management for providers",
        "Demand-and-offer purchasing flow between buyers and providers",
        "Group purchase for shared API subscriptions",
        "Alipay and WeChat Pay through an existing payment microservice"
      ],
      zh: [
        "为提供方提供 API / 版本 / 接口 / 定价管理",
        "买卖双方之间的需求与报价采购流程",
        "支持共享 API 订阅的拼团购买",
        "通过现有支付微服务集成支付宝与微信支付"
      ]
    },
    flow: ["Provider", "API versions", "Pricing", "Group buy", "Alipay / WeChat Pay"],
    metrics: [
      { v: "2", l: { en: "regional wallets", zh: "种区域支付" } },
      { v: "Group", l: { en: "shared subscriptions", zh: "拼团订阅" } }
    ]
  },
  {
    id: "asifmolbio", cat: "backend", period: "Nov 2024 – Present",
    name: { en: "AsifMolBio Lead Platform", zh: "AsifMolBio 获客平台" },
    tag: { en: "Django + Dual Payment Gateways", zh: "Django + 双支付网关" },
    tech: ["Python", "Django", "DRF", "PostgreSQL", "PayPal", "Stripe", "AWS S3"],
    desc: {
      en: "A Django/DRF backend with JWT auth, dual PayPal/Stripe payments, S3 media storage and a full admin dashboard for content control.",
      zh: "具备 JWT 认证、PayPal/Stripe 双支付、S3 媒体存储与完整内容管理后台的 Django/DRF 后端。"
    },
    bullets: {
      en: [
        "Django/DRF backend with JWT auth and dual payment gateway integration (PayPal + Stripe)",
        "AWS S3 media storage for scalable content handling",
        "Optimized PostgreSQL queries via Django ORM — 40% faster API responses",
        "Admin dashboard for full CRUD content control"
      ],
      zh: [
        "具备 JWT 认证的 Django/DRF 后端，集成 PayPal 与 Stripe 双支付网关",
        "基于 AWS S3 的媒体存储，支持可扩展的内容管理",
        "通过 Django ORM 优化 PostgreSQL 查询，API 响应速度提升 40%",
        "完整 CRUD 内容管理后台"
      ]
    },
    flow: ["Visitor", "Lead", "Checkout", "PayPal / Stripe", "S3 media", "Admin"],
    metrics: [
      { v: "40%", l: { en: "faster API responses", zh: "API 响应提速" } },
      { v: "2", l: { en: "payment gateways", zh: "个支付网关" } }
    ]
  },
  {
    id: "mdexam", cat: "backend", period: "Apr 2023 – Jul 2023",
    name: "MD-EXAM",
    tag: { en: "Pharmacy Management System", zh: "药房管理系统" },
    tech: ["Python", "Django", "MongoDB", "Djongo", "PyMongo", "ShipStation API"],
    desc: {
      en: "A Django pharmacy management system on MongoDB with role-based access and automated shipping through ShipStation.",
      zh: "基于 MongoDB 的 Django 药房管理系统，具备角色权限并通过 ShipStation 实现自动化发货。"
    },
    bullets: {
      en: [
        "Django pharmacy system using Djongo/PyMongo for MongoDB integration",
        "Role-based access for Super Admin and Staff",
        "Automated shipping label generation through the ShipStation API",
        "Daily sync command that auto-updates order statuses"
      ],
      zh: [
        "使用 Djongo/PyMongo 集成 MongoDB 的 Django 药房系统",
        "区分超级管理员与员工的角色权限",
        "通过 ShipStation API 自动生成运单标签",
        "每日同步命令自动更新订单状态"
      ]
    },
    flow: ["Order", "MongoDB", "ShipStation label", "Daily sync", "Status"],
    metrics: [
      { v: "Daily", l: { en: "automatic status sync", zh: "自动同步订单状态" } },
      { v: "Auto", l: { en: "shipping labels", zh: "自动生成运单" } }
    ]
  },
  {
    id: "etcdashboard", cat: "data", period: "Dec 2024 – Jun 2025",
    name: { en: "ETC Dashboard", zh: "ETC 数据看板" },
    tag: { en: "Streamlit + Snowflake ETL", zh: "Streamlit + Snowflake ETL" },
    tech: ["Python", "Streamlit", "Snowflake", "AWS S3", "AgGrid", "JWT"],
    desc: {
      en: "A secure Streamlit dashboard with JWT auth and RBAC as the frontend for real-time, ETL-processed data.",
      zh: "具备 JWT 认证与 RBAC 的安全 Streamlit 看板，作为实时 ETL 数据的可视化前端。"
    },
    bullets: {
      en: [
        "Streamlit dashboard with JWT auth and role-based access control",
        "Snowflake-integrated ETL pipelines feeding real-time visualizations",
        "Interactive AgGrid tables running on Snowflake data",
        "Cut manual data handling by 90%"
      ],
      zh: [
        "具备 JWT 认证与角色权限控制的 Streamlit 看板",
        "与 Snowflake 集成的 ETL 管道驱动实时可视化",
        "基于 Snowflake 数据的交互式 AgGrid 表格",
        "人工数据处理工作量降低 90%"
      ]
    },
    flow: ["S3", "ETL", "Snowflake", "AgGrid", "Dashboard"],
    metrics: [
      { v: "90%", l: { en: "less manual data handling", zh: "人工处理减少" } },
      { v: "RBAC", l: { en: "JWT-secured", zh: "JWT 安全" } }
    ]
  },
  {
    id: "transport", cat: "data",
    name: { en: "Transport Survey Automation", zh: "交通调查自动化系统" },
    tag: { en: "ETL & Geospatial Automation", zh: "ETL 与地理空间自动化" },
    tech: ["Python", "Pandas", "NumPy", "HERE API", "AWS S3"],
    desc: {
      en: "Pandas ETL pipelines for large-scale transport survey data, enriched with HERE routing for geospatial accuracy.",
      zh: "面向大规模交通调查数据的 Pandas ETL 管道，结合 HERE 路线服务提升地理空间准确性。"
    },
    bullets: {
      en: [
        "Pandas-based ETL pipelines for large-scale transport survey data",
        "Enriched with HERE Routing API for geospatial validation",
        "Automated data storage and retrieval via AWS S3",
        "Reduced manual data cleaning effort by 70%"
      ],
      zh: [
        "基于 Pandas 的 ETL 管道，处理大规模交通调查数据",
        "结合 HERE 路线 API 进行地理空间校验",
        "通过 AWS S3 实现数据存储与检索自动化",
        "人工数据清理工作量降低 70%"
      ]
    },
    flow: ["Survey CSV", "Pandas clean", "HERE routing", "Validate", "S3"],
    metrics: [
      { v: "70%", l: { en: "less manual cleaning", zh: "人工清理减少" } },
      { v: "Geo", l: { en: "validated routes", zh: "路线校验" } }
    ]
  },
  {
    id: "lstm", cat: "data",
    name: { en: "LSTM Text Generation", zh: "LSTM 文本生成" },
    tag: { en: "Self-Learning NLP Project", zh: "自学 NLP 项目" },
    tech: ["Python", "TensorFlow", "Keras", "LSTM", "Pandas", "NumPy"],
    desc: {
      en: "An LSTM language model trained on 9,000+ New York Times headlines that generates headline-style text.",
      zh: "基于 9000 余条纽约时报标题训练、可生成标题风格文本的 LSTM 语言模型。"
    },
    bullets: {
      en: [
        "LSTM language model trained on 9,000+ NYT headlines",
        "Generates news-headline-style text using N-gram sequences",
        "Built with TensorFlow and Keras",
        "Self-directed project exploring sequence generation"
      ],
      zh: [
        "基于 9000 余条纽约时报标题训练的 LSTM 语言模型",
        "通过 N-gram 序列生成新闻标题风格文本",
        "使用 TensorFlow 与 Keras 实现",
        "自主研究项目，探索序列生成技术"
      ]
    },
    flow: ["Headlines", "Tokenize", "N-grams", "LSTM", "Generate"],
    metrics: [
      { v: "9K+", l: { en: "training headlines", zh: "条训练标题" } }
    ]
  }
];

// a project can live behind more than one door (primary `cat` + optional `also`)
PROJECTS.forEach((p) => { p.cats = [p.cat].concat(p.also || []); });
