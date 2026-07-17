/* ============================================================
   Structured content — English + Chinese
   ============================================================ */

const STREAM_LINES = {
  en: [
    "retrieval-augmented generation",
    "agentic AI workflows",
    "LoRA / DoRA fine-tuning",
    "local inference: Ollama + vLLM",
    "Django · DRF · FastAPI backends"
  ],
  zh: [
    "检索增强生成 RAG",
    "智能体式 AI 工作流",
    "LoRA / DoRA 微调",
    "本地推理：Ollama + vLLM",
    "Django · DRF · FastAPI 后端"
  ]
};

const SKILLS = [
  {
    en: "Languages &amp; Web", zh: "语言与网络",
    items: ["Python", "SQL", "BeautifulSoup", "Requests"]
  },
  {
    en: "AI / LLM", zh: "AI / 大模型",
    items: ["RAG & Agentic AI", "LLM Fine-Tuning (LoRA/DoRA)", "Prompt Engineering", "vLLM / Ollama Inference", "ChromaDB"]
  },
  {
    en: "Frameworks", zh: "开发框架",
    items: ["Django & DRF", "FastAPI", "Flask", "LangChain", "LlamaIndex & Ollama", "Tkinter & PyQT5"]
  },
  {
    en: "Backend Tools", zh: "后端工具",
    items: ["Django ORM", "SQLAlchemy", "Pydantic", "JWT Auth", "Celery & Redis"]
  },
  {
    en: "ML / NLP", zh: "机器学习 / NLP",
    items: ["TensorFlow / Keras", "PEFT / Transformers", "spaCy & FastText", "Scikit-Learn"]
  },
  {
    en: "Data Science", zh: "数据科学",
    items: ["Numpy & Pandas", "Matplotlib & Seaborn", "Streamlit"]
  },
  {
    en: "Cloud / DevOps", zh: "云与运维",
    items: ["AWS (S3, Lambda, Glue, Athena)", "Docker & Docker Compose", "Snowflake", "Locust (Load Testing)"]
  }
];

const EXPERIENCE = [
  {
    date: "Jun 2025 – Jan 2026",
    company: "QubitDance", location: { en: "Chengdu, China", zh: "中国 · 成都" },
    role: { en: "Backend Developer", zh: "后端开发工程师" },
    bullets: {
      en: [
        "Developed and maintained microservices architecture with Django and DRF for scalable backend solutions",
        "Designed RESTful APIs for seamless microservice communication with frontend and DevOps teams",
        "Containerized Django apps using Docker for consistent, portable environments",
        "Implemented JWT authentication and role-based access control",
        "Optimized database queries to enhance performance and reduce latency"
      ],
      zh: [
        "使用 Django 与 DRF 构建并维护微服务架构，支撑可扩展的后端方案",
        "与前端及 DevOps 团队协作设计 RESTful API，实现微服务间无缝通信",
        "使用 Docker 对 Django 应用进行容器化，保证环境一致性与可移植性",
        "实现 JWT 身份认证与基于角色的访问控制",
        "优化数据库查询，提升系统性能并降低延迟"
      ]
    }
  },
  {
    date: "Oct 2022 – Jun 2025",
    company: "Techmate Technologies", location: { en: "Remote", zh: "远程" },
    role: { en: "Python Developer", zh: "Python 开发工程师" },
    bullets: {
      en: [
        "Automated ETL processes for large datasets using Python and Pandas",
        "Developed data processing pipelines integrated with AWS and Snowflake",
        "Implemented payment gateways (Stripe, PayPal) for e-commerce solutions",
        "Developed Streamlit dashboards with real-time data synchronization",
        "Implemented geospatial data validation using HereAPI and AWS S3"
      ],
      zh: [
        "使用 Python 与 Pandas 自动化大规模数据集的 ETL 流程",
        "开发与 AWS、Snowflake 集成的数据处理管道",
        "为电商解决方案集成 Stripe、PayPal 支付网关",
        "开发具备实时数据同步能力的 Streamlit 仪表盘",
        "使用 HereAPI 与 AWS S3 实现地理空间数据校验"
      ]
    }
  },
  {
    date: "Nov 2021 – Oct 2022",
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

// Featured, larger AI/LLM projects
const FEATURED_PROJECTS = [
  {
    name: "RAGForge",
    tag: { en: "Multi-Agent Local RAG System", zh: "多智能体本地 RAG 系统" },
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
    }
  },
  {
    name: "PixelRAG Hybrid",
    tag: { en: "Visual RAG — Screenshot-Based Retrieval", zh: "视觉 RAG — 基于截图的检索系统" },
    tech: ["Python", "PixelRAG", "LLaVA", "Ollama", "LlamaIndex", "ChromaDB", "FAISS", "Qwen3"],
    desc: {
      en: "Visual RAG pipeline that screenshots websites, extracts text via the LLaVA vision model, and answers questions using LlamaIndex + Ollama — no HTML parsing involved.",
      zh: "视觉 RAG 管道：对网页截图后，通过 LLaVA 视觉模型提取文本内容，并结合 LlamaIndex + Ollama 进行问答 — 完全不依赖 HTML 解析。"
    },
    bullets: {
      en: [
        "Renders web pages as screenshots instead of parsing HTML — eliminating 40%+ content loss from traditional scrapers",
        "LLaVA:7b via Ollama transcribes screenshot tiles into structured text, reading JS-rendered content pixel-by-pixel",
        "3-stage incremental pipeline (render → transcribe → index) with SQLite flags enabling resume-on-failure",
        "Deployed fully local/offline — zero cloud API calls; all models run via Ollama on local hardware"
      ],
      zh: [
        "将网页渲染为截图而非解析 HTML，减少传统爬虫 40% 以上的内容丢失",
        "通过 Ollama 部署 LLaVA:7b 视觉模型，将截图图块转录为结构化文本，逐像素处理 JS 渲染内容",
        "设计三阶段增量管道（渲染 → 转录 → 索引），配合 SQLite 状态标记支持失败恢复",
        "完全本地离线部署 — 零云端 API 调用，所有模型均通过 Ollama 在本地硬件运行"
      ]
    }
  },
  {
    name: "AgentForge",
    tag: { en: "Multi-Tenant Agentic RAG Platform", zh: "多租户智能体 RAG 平台" },
    tech: ["Python", "Django", "DRF", "LlamaIndex", "Ollama", "ChromaDB", "Celery", "Docker"],
    desc: {
      en: "Open-source platform where each user creates AI agents backed by their own private PDF knowledge bases, with full tenant isolation and a JWT-secured REST API.",
      zh: "开源平台，每位用户都可基于自己私有的 PDF 知识库创建 AI 智能体，具备完整租户隔离与 JWT 安全的 REST API。"
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
    }
  },
  {
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
    }
  },
  {
    name: { en: "Real-Time Voice AI System", zh: "实时语音 AI 系统" },
    tag: { en: "ASR → LLM → TTS Pipeline", zh: "ASR → 大模型 → TTS 全链路" },
    tech: ["Python", "SenseVoice", "Ollama", "vLLM", "IndexTTS", "FastAPI", "Docker"],
    desc: {
      en: "Production multi-service voice AI pipeline on a Tesla V100S GPU server, integrating ASR, LLM inference, and TTS via vLLM.",
      zh: "运行在 Tesla V100S GPU 服务器上的生产级多服务语音 AI 管道，集成语音识别、大模型推理与基于 vLLM 的语音合成。"
    },
    bullets: {
      en: [
        "FastAPI orchestration layer manages the full ASR → LLM → TTS flow, coordinating 3 tmux-managed microservices",
        "Sentence-level response chunking with a TTSSequenceManager streams ordered, low-latency audio to clients",
        "Converted IndexTTS 1.5 from ModelScope to vLLM/HuggingFace format for high-speed speech synthesis",
        "Tuned GPU memory utilization to 25%, running TTS alongside Ollama within a 32GB VRAM budget"
      ],
      zh: [
        "基于 FastAPI 构建编排层，管理完整的 ASR → 大模型 → TTS 流程，协调 3 个通过 tmux 管理的微服务",
        "实现句子级响应分块与 TTSSequenceManager，向客户端流式返回有序、低延迟的音频",
        "将 IndexTTS 1.5 从 ModelScope 格式转换为 vLLM/HuggingFace 格式，实现高速语音合成",
        "将 GPU 显存占用调优至 25%，使 TTS 与 Ollama 在 32GB 显存预算内共存运行"
      ]
    }
  },
  {
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
    }
  },
];

// Smaller / backend-focused projects
const MORE_PROJECTS = [
  {
    name: "X-NFT",
    tag: { en: "NFT & Collection Microservice", zh: "NFT 与藏品管理微服务" },
    tech: ["Django", "DRF", "PostgreSQL", "Pydantic"],
    desc: { en: "Multi-tenant NFT/Collection microservice integrated with a Solidity blockchain service for mint, buy, transfer, and burn — with OpenSea-style search and filtering.", zh: "多租户 NFT/藏品微服务，与 Solidity 区块链服务集成，支持铸造、购买、转让与销毁，并提供类似 OpenSea 的搜索与筛选功能。" }
  },
  {
    name: "PayUni",
    tag: { en: "E-commerce Payment Microservice", zh: "电商支付微服务" },
    tech: ["Django", "DRF", "PostgreSQL", "JWT"],
    desc: { en: "Multi-tenant e-commerce microservice with dynamic merchant roles and crypto + fiat payment support via a dedicated payment microservice.", zh: "多租户电商微服务，支持商户自定义角色，并通过独立支付微服务提供加密货币与法币支付支持。" }
  },
  {
    name: "APIFY",
    tag: { en: "API Marketplace Platform", zh: "API 交易市场平台" },
    tech: ["Django", "DRF", "Alipay", "WeChat Pay", "PostgreSQL"],
    desc: { en: "RapidAPI-style marketplace with API/version/pricing management, demand postings, group purchases, and Alipay/WeChat Pay integration.", zh: "类似 RapidAPI 的市场平台，支持 API/版本/定价管理、需求发布、拼团购买，并集成支付宝与微信支付。" }
  },
  {
    name: { en: "Transport Survey Automation", zh: "交通调查自动化系统" },
    tag: { en: "ETL & Geospatial Automation", zh: "ETL 与地理空间自动化" },
    tech: ["Python", "Pandas", "HERE API", "AWS S3"],
    desc: { en: "Pandas-based ETL pipelines with HERE Routing API enrichment — reduced manual data cleaning effort by 70%.", zh: "基于 Pandas 的 ETL 管道，结合 HERE 路线 API 进行数据增强，人工数据清理工作量降低 70%。" }
  },
  {
    name: { en: "ETC Dashboard", zh: "ETC 数据看板" },
    tag: { en: "Streamlit + Snowflake ETL", zh: "Streamlit + Snowflake ETL" },
    tech: ["Streamlit", "Snowflake", "AWS S3", "AgGrid", "JWT"],
    desc: { en: "Secure real-time ETL dashboard with role-based access and AgGrid tables over Snowflake — cut manual data handling by 90%.", zh: "安全的实时 ETL 数据看板，具备角色权限控制与基于 Snowflake 的 AgGrid 表格，人工数据处理工作量降低 90%。" }
  },
  {
    name: { en: "AsifMolBio Lead Platform", zh: "AsifMolBio 获客平台" },
    tag: { en: "Django + Dual Payment Gateways", zh: "Django + 双支付网关" },
    tech: ["Django", "DRF", "PostgreSQL", "PayPal", "Stripe", "AWS S3"],
    desc: { en: "Django/DRF backend with dual payment gateways, S3 media handling, and a full admin dashboard — cut API response times by 40%.", zh: "Django/DRF 后端，集成双支付网关与 S3 媒体管理，配备完整管理后台，API 响应时间降低 40%。" }
  },
  {
    name: "TaskFlowAI",
    tag: { en: "Task Management Platform", zh: "任务管理平台" },
    tech: ["Django", "PostgreSQL", "JWT", "LangChain", "RAG"],
    desc: { en: "Modular Django task/project management backend with custom RBAC (Admin/Member) and optimized ORM queries.", zh: "模块化的 Django 任务/项目管理后端，具备自定义角色权限（管理员/成员）与优化的 ORM 查询。" }
  },
  {
    name: "M-Bizz",
    tag: { en: "AI Marketing Bots", zh: "AI 营销机器人" },
    tech: ["Django", "LangChain", "OpenAI", "RAG", "Firebase"],
    desc: { en: "Conversational AI chatbots using LangChain + OpenAI with RAG for domain-specific knowledge and NLP preprocessing pipelines.", zh: "基于 LangChain 与 OpenAI 的对话式 AI 机器人，结合 RAG 提供领域知识，并配备 NLP 预处理管道。" }
  },
  {
    name: { en: "LSTM Text Generation", zh: "LSTM 文本生成" },
    tag: { en: "Self-Learning NLP Project", zh: "自学 NLP 项目" },
    tech: ["TensorFlow", "Keras", "LSTM", "Pandas"],
    desc: { en: "LSTM language model trained on 9,000+ NYT headlines to generate news-headline-style text via N-gram sequences.", zh: "基于 9000 余条纽约时报标题训练的 LSTM 语言模型，通过 N-gram 序列生成新闻标题风格文本。" }
  },
  {
    name: { en: "Flask NLP Chatbot", zh: "Flask NLP 聊天机器人" },
    tag: { en: "Maintenance & Enhancement", zh: "维护与功能增强" },
    tech: ["Flask", "Stripe", "OpenAI"],
    desc: { en: "Debugged and hardened an existing Flask chatbot, added Stripe subscriptions, RBAC, and response caching to cut latency.", zh: "修复并加固已有的 Flask 聊天机器人，新增 Stripe 订阅、角色权限控制，并通过响应缓存降低延迟。" }
  },
  {
    name: "MD-EXAM",
    tag: { en: "Pharmacy Management System", zh: "药房管理系统" },
    tech: ["Django", "MongoDB", "Djongo", "ShipStation API"],
    desc: { en: "Django pharmacy system with MongoDB via Djongo, ShipStation label automation, and daily order-status sync.", zh: "基于 Djongo 集成 MongoDB 的 Django 药房系统，自动生成 ShipStation 运单标签，并每日同步订单状态。" }
  }
];
