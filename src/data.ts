export type Project = {
  title: string;
  blurb: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  year: string;
  featured?: boolean;
  /** Headline outcome rendered as a stat on the card. */
  metric?: { value: string; label: string };
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  /** Short label used by the timeline rail, e.g. "Present". */
  tag?: string;
  location?: string;
  stack: string[];
  descriptionPoints: string[];
};

export const portfolioData = {
  personalInfo: {
    name: "Aditya Arnav",
    initials: "AA",
    title: "AI Software Engineer",
    subtitle: "Computer Science Engineering (Business Systems), VIT Vellore",
    email: "mr.aditya30112003@gmail.com",
    github: "https://github.com/Hydra-Of-Malice",
    linkedin: "https://linkedin.com/in/aditya-arnav-76a0222a1",
    leetcode: "https://leetcode.com/HydraOfMalice",
    location: "Bangalore, India",
    timezone: "Asia/Kolkata",
    /** Rotated under the hero headline. */
    roles: [
      "real-time AI pipelines",
      "multi-agent orchestration",
      "production microservices",
      "retrieval-augmented systems",
    ],
    aboutText:
      "I'm an AI/ML software engineer who likes the unglamorous half of intelligence work — the queues, the retries, the p99 latency, the thing that has to keep running at 3am. Currently at VIT Vellore, building production microservices, real-time inference pipelines and multi-agent systems that survive contact with real users.",
  },

  /** Rendered as the table of contents in the hero, in this order. */
  navLinks: [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Patents", href: "#research" },
    { name: "Stack", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ],

  stats: [
    { value: 3, suffix: "", decimals: 0, label: "Engineering internships" },
    { value: 2, suffix: "", decimals: 0, label: "Patents published" },
    { value: 8.77, suffix: "", decimals: 2, label: "CGPA at VIT Vellore" },
    { value: 15, suffix: "+", decimals: 0, label: "Shipped projects" },
  ],

  /** Rendered as a looping strip under the hero. */
  marquee: [
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "Go",
    "PostgreSQL",
    "Redis",
    "Docker",
    "PyTorch",
    "LangChain",
    "Whisper",
    "Azure OpenAI",
    "YOLOv8",
    "Nginx",
    "GitHub Actions",
  ],

  education: [
    {
      institution: "VIT Vellore",
      degree: "B.Tech, Computer Science Engineering (Business Systems)",
      period: "2023 — 2027",
      gpa: "CGPA 8.77",
      note: "Coursework across distributed systems, machine learning, DBMS and operating systems.",
    },
    {
      institution: "White Leaf Bhavana",
      degree: "Class XII — CBSE",
      period: "2022",
      gpa: "86%",
    },
    {
      institution: "Delhi Public School, Patna",
      degree: "Class X — CBSE",
      period: "2020",
      gpa: "95%",
    },
  ],

  experience: [
    {
      company: "Zapper Edge LLC",
      role: "AI Software Engineering Intern",
      period: "May 2026 — Present",
      tag: "Present",
      stack: ["FastAPI", "Faster-Whisper", "Azure OpenAI", "Redis", "Playwright"],
      descriptionPoints: [
        "Architected a production AI meeting-intelligence platform on FastAPI microservices with Faster-Whisper and Azure OpenAI.",
        "Shipped real-time multilingual transcription, speaker diarization and LLM summaries through Google Meet / Zoom bots built on Playwright and WebRTC.",
        "Engineered the async Redis pipeline backing it, with PostgreSQL, Docker Compose and Nginx.",
        "Delivered action-item extraction, Azure AI Foundry integration and zero-downtime deployments.",
      ],
    },
    {
      company: "BlankSage",
      role: "Software Development Intern",
      period: "May 2026 — Jun 2026",
      stack: ["Go", "React", "TypeScript", "WorkOS", "Goose"],
      descriptionPoints: [
        "Built the User Settings module and document-export engine in Go and React/TypeScript, including WorkOS-backed 2FA.",
        "Standardised error handling across the Go REST API surface.",
        "Drove Goose migrations and tightened the GitHub Actions CI/CD pipeline.",
      ],
    },
    {
      company: "E Soft Technologies",
      role: "Software Intern",
      period: "Jun 2025 — Jul 2025",
      stack: ["Django", "SQL", "OpenCV"],
      descriptionPoints: [
        "Built a Django hotel workflow-management platform on a SQL backend.",
        "Integrated an OpenCV pipeline for automated occupancy verification.",
      ],
    },
  ] satisfies Experience[],

  research: [
    {
      title: "Trust-Aware Hierarchical Multi-Pipeline Inference Orchestration System",
      status: "Published 2026",
      reference: "Ref 20264102479",
      role: "Co-Inventor · VIT IPR Cell",
      description:
        "A distributed AI orchestration framework with adaptive trust modelling and consensus verification across multi-agent inference systems.",
    },
    {
      title: "Secure Glide",
      status: "Published 2026",
      reference: "Ref 202641068231",
      role: "Co-Inventor",
      description:
        "An ESP32-based anti-theft vehicle security system with real-time intrusion detection and IoT monitoring.",
    },
  ],

  projects: [
    {
      title: "Meeting Intelligence Platform",
      blurb: "Live transcription, diarization and summaries for every meeting.",
      description:
        "An end-to-end meeting AI stack: bots join Meet and Teams calls, stream audio through Faster-Whisper, diarize speakers, and hand transcripts to an LLM for summaries and action items.",
      techStack: ["FastAPI", "Whisper", "Azure OpenAI", "Redis", "Docker", "PostgreSQL", "Playwright"],
      githubLink: "https://github.com/Hydra-Of-Malice/meeting-intelligence-placeholder",
      year: "2026",
      featured: true,
      metric: { value: "Real-time", label: "streaming transcription" },
    },
    {
      title: "ORQUIS — AI Executive Analytics",
      blurb: "Spreadsheets in, boardroom deck out.",
      description:
        "A RAG-backed analytics platform that turns raw Excel and CSV exports into dashboards, written insight and generated PPT reports for executive review.",
      techStack: ["Azure OpenAI", "RAG", "FastAPI", "React", "PostgreSQL", "Pandas", "Docker"],
      githubLink: "https://github.com/Hydra-Of-Malice/orquis-placeholder",
      year: "2026",
      featured: true,
      metric: { value: "CSV → PPT", label: "automated reporting" },
    },
    {
      title: "Biomedical Waste Detection",
      blurb: "Custom YOLOv8 detection for hazardous waste sorting.",
      description:
        "A custom YOLOv8 model trained on 1,500+ annotated images, wrapped in a Flask API and a React operator console for live camera inference.",
      techStack: ["YOLOv8", "React", "Flask", "OpenCV"],
      githubLink: "https://github.com/Hydra-Of-Malice/biomedical-waste-placeholder",
      year: "2025",
      metric: { value: "91%", label: "detection accuracy" },
    },
    {
      title: "Customer Analytics Framework",
      blurb: "Eight models, one segmentation pipeline.",
      description:
        "An ensemble pipeline combining KMeans segmentation, FP-Growth basket analysis, HMM sequence modelling and Random Forest scoring over 10,000+ customer records.",
      techStack: ["KMeans", "FP-Growth", "HMM", "Random Forest", "Scikit-learn"],
      githubLink: "https://github.com/Hydra-Of-Malice/customer-analytics-placeholder",
      year: "2025",
      metric: { value: "10k+", label: "records modelled" },
    },
    {
      title: "AI Teacher — Multi-Document RAG",
      blurb: "Answers that cite their sources.",
      description:
        "A citation-grounded Q&A assistant over multi-document corpora, using FAISS retrieval and LangChain orchestration behind a real-time chat interface.",
      techStack: ["FAISS", "LangChain", "Node.js", "MongoDB", "React"],
      githubLink: "https://github.com/Hydra-Of-Malice/ai-teacher-placeholder",
      year: "2025",
      metric: { value: "Grounded", label: "citation-backed answers" },
    },
  ] satisfies Project[],

  skills: {
    Languages: ["Python", "Java", "C", "C++", "Go", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Bash"],
    Backend: ["FastAPI", "Django", "Spring Boot", "Flask", "Node.js", "Express", "REST", "GraphQL"],
    Frontend: ["React", "Vite", "Next.js", "Tailwind CSS", "Bootstrap", "Material UI"],
    "AI / ML": [
      "LLMs",
      "RAG",
      "LangChain",
      "FAISS",
      "Whisper",
      "Faster-Whisper",
      "OpenAI",
      "Azure OpenAI",
      "Anthropic",
      "Gemini",
      "Prompt Engineering",
      "Embeddings",
      "Vector Search",
      "Agentic AI",
      "Transformers",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "XGBoost",
      "HMM",
      "KMeans",
      "FP-Growth",
      "YOLO",
      "OpenCV",
      "NLP",
      "CV",
    ],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
    Cloud: ["AWS (S3, EC2, IAM, Lambda)", "Azure AI Foundry", "GCP"],
    DevOps: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Nginx", "Linux", "WSL"],
    Tools: ["Git", "Postman", "Playwright", "Figma", "Jira", "VS Code", "Slack"],
    Licences: ["Licensed Drone Pilot (DGCA-approved)"],
  } as Record<string, string[]>,
};
