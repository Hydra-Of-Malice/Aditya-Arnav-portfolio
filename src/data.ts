export const portfolioData = {
  personalInfo: {
    name: "Aditya Arnav",
    title: "AI Software Engineer",
    subtitle: "Computer Science Engineering (Business Systems), VIT Vellore",
    email: "mr.aditya30112003@gmail.com",
    github: "https://github.com/Hydra-Of-Malice",
    linkedin: "https://linkedin.com/in/aditya-arnav-76a0222a1",
    leetcode: "https://leetcode.com/HydraOfMalice", // Example link based on username
    location: "Bangalore",
    aboutText: "I am an AI/ML Software Engineer with a passion for building scalable intelligence systems. Currently studying at VIT Vellore, I specialize in developing production-ready microservices, implementing real-time AI pipelines, and orchestrating multi-agent systems."
  },
  education: [
    {
      institution: "VIT Vellore",
      degree: "B.Tech CSE (Business Systems)",
      period: "2023–2027",
      gpa: "CGPA 8.77"
    },
    {
      institution: "White Leaf Bhavana",
      degree: "Class XII",
      period: "2022",
      gpa: "86%"
    },
    {
      institution: "Delhi Public School Patna",
      degree: "Class X",
      period: "2020",
      gpa: "95%"
    }
  ],
  experience: [
    {
      company: "Zapper Edge LLC",
      role: "AI Software Eng. Intern",
      period: "May 2026–Present",
      descriptionPoints: [
        "Architected production AI Meeting Intelligence platform using FastAPI microservices, Faster-Whisper, and Azure OpenAI.",
        "Implemented real-time multilingual transcription, speaker diarization, and LLM summaries via Google Meet/Zoom bots (Playwright, WebRTC).",
        "Engineered Redis async pipeline with PostgreSQL, Docker Compose, Nginx.",
        "Delivered action-item extraction, Azure AI Foundry integration, and zero-downtime deployments."
      ]
    },
    {
      company: "BlankSage",
      role: "Software Development Intern",
      period: "May 2026–Jun 2026",
      descriptionPoints: [
        "Delivered User Settings module and document-export engine in Go + React/TypeScript with WorkOS 2FA.",
        "Standardized Go REST API error handling.",
        "Drove Goose migrations and GitHub Actions CI/CD improvements."
      ]
    },
    {
      company: "E Soft Technologies",
      role: "Software Intern",
      period: "Jun 2025–Jul 2025",
      descriptionPoints: [
        "Built Django hotel workflow management platform with SQL backend.",
        "Integrated OpenCV pipeline for automated occupancy verification."
      ]
    }
  ],
  research: [
    {
      title: "Trust-Aware Hierarchical Multi-Pipeline Inference Orchestration System",
      status: "Published 2026",
      date: "Ref 20264102479",
      description: "Co-Inventor, VIT IPR Cell. Distributed AI orchestration framework with adaptive trust modelling and consensus verification across multi-agent inference systems."
    },
    {
      title: "Secure Glide",
      status: "Published 2026",
      date: "Ref 202641068231",
      description: "Co-Inventor. ESP32-based anti-theft vehicle security system with real-time intrusion detection and IoT monitoring."
    }
  ],
  projects: [
    {
      title: "Meeting Intelligence Platform",
      techStack: ["FastAPI", "Whisper", "Azure OpenAI", "Redis", "Docker", "PostgreSQL", "Playwright"],
      description: "AI meeting platform with live transcription, diarization, summaries, automated Meet/Teams bots.",
      githubLink: "https://github.com/Hydra-Of-Malice/meeting-intelligence-placeholder"
    },
    {
      title: "ORQUIS — AI Executive Analytics Platform",
      techStack: ["Azure OpenAI", "RAG", "FastAPI", "React", "PostgreSQL", "Pandas", "Docker"],
      description: "Converts Excel/CSV data into dashboards, insights, and PPT reports.",
      githubLink: "https://github.com/Hydra-Of-Malice/orquis-placeholder"
    },
    {
      title: "Biomedical Waste Detection",
      techStack: ["YOLOv8", "React", "Flask", "OpenCV"],
      description: "Custom YOLOv8 on 1,500+ images, 91% accuracy, full-stack deployment.",
      githubLink: "https://github.com/Hydra-Of-Malice/biomedical-waste-placeholder"
    },
    {
      title: "Customer Analytics Framework",
      techStack: ["KMeans", "FP-Growth", "HMM", "Random Forest", "Scikit-learn"],
      description: "8-model ML pipeline over 10,000+ records.",
      githubLink: "https://github.com/Hydra-Of-Malice/customer-analytics-placeholder"
    },
    {
      title: "AI Teacher — Multi-Document RAG",
      techStack: ["FAISS", "LangChain", "Node.js", "MongoDB", "React"],
      description: "Citation-grounded Q&A assistant with real-time chat.",
      githubLink: "https://github.com/Hydra-Of-Malice/ai-teacher-placeholder"
    }
  ],
  skills: {
    "Languages": ["Python", "Java", "C", "C++", "Go", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Bash"],
    "Backend": ["FastAPI", "Django", "Spring Boot", "Flask", "Node.js", "Express", "REST", "GraphQL"],
    "Frontend": ["React", "Vite", "Next.js", "Tailwind CSS", "Bootstrap", "Material UI"],
    "AI/ML": ["LLMs", "RAG", "LangChain", "FAISS", "Whisper", "Faster-Whisper", "OpenAI", "Azure OpenAI", "Anthropic", "Gemini", "Prompt Engineering", "Embeddings", "Vector Search", "Agentic AI", "Transformers", "Scikit-learn", "TensorFlow", "PyTorch", "XGBoost", "HMM", "KMeans", "FP-Growth", "YOLO", "OpenCV", "NLP", "CV"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
    "Cloud": ["AWS (S3, EC2, IAM, Lambda)", "Azure AI Foundry", "GCP"],
    "DevOps": ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Nginx", "Linux", "WSL"],
    "Tools": ["Git", "Postman", "Playwright", "Figma", "Jira", "VS Code", "Slack"],
    "Licences": ["Licensed Drone Pilot (DGCA-approved)"]
  }
};
