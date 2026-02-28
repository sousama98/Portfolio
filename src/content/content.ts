import { withBasePath } from "@/lib/withBasePath";

export type ZoneId =
  | "home"
  | "education"
  | "experience"
  | "projects"
  | "certifications"
  | "contact"
  | "thank-you"
  | "inventory";

export type BadgeId =
  | "team-lead"
  | "db-optimizer"
  | "prod-builder"
  | "home-explorer"
  | "secret-room"
  | "gallery-sleuth"
  | "konami-master";

export type ZoneContent = {
  id: ZoneId;
  name: string;
  mission: string;
  exploration: string;
  victory: string;
  position: [number, number];
  color: string;
};

export type BadgeContent = {
  id: BadgeId;
  title: string;
  description: string;
  unlockedBy: string;
};

export type WorkExperience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  skills: string[];
};

export type CertificationShowcaseItem = {
  title: string;
  issuer: string;
  description: string;
  date: string;
  logoSrc?: string;
  badge?: string;
};

export type ContactMethod = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

export type PreferredRole = {
  title: string;
  description: string;
};

export type EducationDetail = {
  level: "undergrad" | "grad";
  title: string;
  subtitle: string;
  university: string;
  logoSrc: string;
  degree: string;
  duration: string;
  gpaLabel: string;
  gpaValue: string;
  keyCourses: string[];
  certifications: string[];
  extracurriculars?: string[];
};

export type ProjectDetail = {
  title: string;
  description: string;
  problemSolved: string;
  technicalApproach: string[];
  keyLearnings: string;
  techTags: string[];
};

export const galleryImages = [
  "Product launch war-room with cross-functional leads",
  "Live customer workshop and process mapping session",
  "Design sprint board with user journeys",
  "Architecture sketch for multi-tenant platform",
  "Demo day with stakeholder Q&A",
  "Volunteer mentoring and coaching session",
  "Hackathon prototype on sustainable logistics",
  "Award night: innovation category finalist",
];

export const zones: ZoneContent[] = [
  {
    id: "home",
    name: "Home",
    mission: "Initialize the quest, discover controls, and inspect the wall gallery.",
    exploration:
      "You enter the base camp where each framed memory reflects a milestone. Interact with highlighted frames to reveal context behind key moments.",
    victory:
      "You unlock the orientation badge and gain the first map markers for all level portals.",
    position: [0, 0],
    color: "#14b8a6",
  },
  {
    id: "education",
    name: "Education",
    mission: "Trace academic foundations that shaped product and engineering thinking.",
    exploration:
      "Walk through the timeline tablets to inspect coursework, projects, and practical labs that anchored problem-solving discipline.",
    victory:
      "You unlock the scholarship insight and gain a clearer view of specialization depth.",
    position: [-9, -2],
    color: "#0d9488",
  },
  {
    id: "experience",
    name: "Experience",
    mission: "Decode leadership and execution patterns from real delivery environments.",
    exploration:
      "Each station represents a role. Open the station to inspect scope, tools, and team dynamics across milestones.",
    victory:
      "You earn the field-operator badge and unlock impact snapshots.",
    position: [8, -3],
    color: "#0891b2",
  },
  {
    id: "projects",
    name: "Projects",
    mission: "Complete project quests and study design-to-production decisions.",
    exploration:
      "Enter each quest gate to inspect architecture choices, constraints, and validation strategy.",
    victory:
      "You unlock production-builder status with repeatable playbooks.",
    position: [-10, 8],
    color: "#06b6d4",
  },
  {
    id: "certifications",
    name: "Certifications",
    mission: "Collect verifiable credentials tied to practical capability.",
    exploration:
      "Inspect badges grouped by cloud, product, and leadership disciplines.",
    victory:
      "You unlock certified-strategist status and bonus credibility points.",
    position: [10, 8],
    color: "#22d3ee",
  },
  {
    id: "contact",
    name: "Contact",
    mission: "Open communication channels and collaboration routes.",
    exploration:
      "Use the contact terminal to find direct links and preferred collaboration formats.",
    victory:
      "You unlock alliance mode and gain direct outreach options.",
    position: [0, 12],
    color: "#0ea5a8",
  },
  {
    id: "thank-you",
    name: "Thank You",
    mission: "Thanks For Visiting , hOPE YOU HAVE A FUN TIME.",
    exploration: "\"Love the way you live , live the way you love\"",
    victory: "Quest complete. Thank you for playing.",
    position: [0, -12],
    color: "#0284c7",
  },
  {
    id: "inventory",
    name: "Inventory Hub",
    mission: "Review unlocked badges, secrets, and achievements.",
    exploration:
      "Open inventory from HUD at any time to track progression and hidden findings.",
    victory:
      "You master the progression loop and become a certified explorer.",
    position: [14, 0],
    color: "#0f766e",
  },
];

export const badges: BadgeContent[] = [
  {
    id: "team-lead",
    title: "Led 5+ Team Projects",
    description: "Directed multiple squads across product, design, and engineering delivery.",
    unlockedBy: "Visit Experience zone",
  },
  {
    id: "db-optimizer",
    title: "Optimized Database by 40%",
    description: "Reworked indexing and query strategies to reduce load and latency.",
    unlockedBy: "Visit Projects zone",
  },
  {
    id: "prod-builder",
    title: "Shipped 3 Production Apps",
    description: "Launched and maintained user-facing systems with measurable outcomes.",
    unlockedBy: "Visit Certifications zone",
  },
  {
    id: "home-explorer",
    title: "Explorer",
    description: "Found 3 hidden secrets spread across the world.",
    unlockedBy: "Collect all easter eggs",
  },
  {
    id: "secret-room",
    title: "Backstage Pass",
    description: "Discovered the hidden room behind the northern ridge.",
    unlockedBy: "Enter secret room",
  },
  {
    id: "gallery-sleuth",
    title: "Gallery Sleuth",
    description: "Found the hidden artifact behind a gallery frame.",
    unlockedBy: "Click hidden object in Home gallery",
  },
  {
    id: "konami-master",
    title: "Konami Master",
    description: "Unlocked the classic code and revealed a personal easter egg.",
    unlockedBy: "Input Konami code",
  },
];

export const educationTimeline = [
  {
    period: "2016 - 2020",
    title: "B.Tech in Computer Science",
    detail: "Focus on software systems, data engineering, and applied machine learning.",
  },
  {
    period: "2020 - 2021",
    title: "Postgraduate Program in Product Management",
    detail: "Built go-to-market strategy, experimentation, and roadmap rigor.",
  },
  {
    period: "2023",
    title: "Leadership Accelerator",
    detail: "Conflict resolution, cross-team facilitation, and strategic planning labs.",
  },
];

export const educationDetails: EducationDetail[] = [
  {
    level: "undergrad",
    title: "Undergraduate",
    subtitle: "Bachelor's Degree",
    university: "KIIT University",
    logoSrc: withBasePath("/assets/logos/kiit.png"),
    degree: "B.Tech in Electronics and Computer Engineering",
    duration: "August 2017 - May 2021",
    gpaLabel: "CGPA",
    gpaValue: "8.5/10.0",
    keyCourses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
    ],
    certifications: [
      "Introduction to Cloud Computing",
      "Python Programming with Data Science",
    ],
    extracurriculars: [
      "Sports Club Member - Organized Football competitions",
      "Music Society - Co-Ordinator at Korus Music",
      "Founder - Udbhab Theatrical Group",
    ],
  },
  {
    level: "grad",
    title: "Graduate",
    subtitle: "Master's Degree",
    university: "Indiana University",
    logoSrc: withBasePath("/assets/logos/indiana.webp"),
    degree: "Master of Science in Information Systems",
    duration: "May 2024 - Dec 2025",
    gpaLabel: "GPA",
    gpaValue: "3.525/4.0",
    keyCourses: [
      "IT Strategy",
      "Cloud Computing & Architecture",
      "Machine Learning & AI",
      "Data Analytics & Visualization",
      "Enterprise Systems & Strategy",
      "Software Product Development",
      "Product Management",
    ],
    certifications: [
      "AWS Academy Graduate - AWS Academy Cloud Foundations",
      "Generative AI Engineer (Databricks)",
      "Level up LLM applications development with LangChain and OpenAI",
    ],
  },
];

export const experiences: WorkExperience[] = [
  {
    company: "auntEDNA.ai",
    role: "Product Analyst",
    period: "January 2026 - Present",
    summary:
      "At auntEDNA.ai, I drive product strategy and execution for athlete-focused solutions, bridging user needs with technical feasibility to accelerate product-market fit and revenue growth.",
    achievements: [
      "Accelerated 0-1 product delivery by 30%, measured by time from concept to first release, by scoping a focused MVP that balanced athlete needs, website integrity requirements, and engineering feasibility.",
      "Developed an end-to-end go-to-market strategy, defining target segment prioritization, pricing logic, and expansion sequencing, outlining a credible revenue scale path from ~$1M to $100M ARR over 5-7 years.",
      "Increased early stage athlete satisfaction by 25%, measured through pilot feedback scores and usage consistency, by prioritizing features grounded in real athlete workflows rather than internal assumptions.",
    ],
    skills: [
      "Product Strategy",
      "Go-to-Market",
      "MVP Development",
      "User Research",
      "Pricing Strategy",
      "Roadmap Planning",
      "Stakeholder Management",
      "Data Analysis",
    ],
  },
  {
    company: "Mphasis",
    role: "Data Science Intern",
    period: "May 2025 - August 2025",
    summary:
      "At Mphasis, I worked at the intersection of AI engineering, cloud architecture, and data analytics, building production-grade systems that directly supported enterprise vendor risk workflows.",
    achievements: [
      "Built TracyAI, an AI-powered Vendor Risk Management platform that automated third-party risk assessments end-to-end, reducing analyst evaluation time by ~75% through multimodal data processing, embeddings, and LLM-driven extraction.",
      "Engineered a multimodal RAG pipeline on Amazon Bedrock using Python, AWS (S3, Glue, SageMaker, Bedrock), Hugging Face, and LangChain/LangGraph to enable intelligent search and reasoning across text, tables, and images, improving data integration efficiency by ~60%.",
      "Fine-tuned LLMs and implemented Titan embeddings to extract structured insights from large unstructured vendor datasets, cutting month-long processing cycles to under 7 days while improving consistency and accuracy.",
      "Designed executive KPI dashboards (Power BI, Tableau) backed by Snowflake and Python pipelines to surface vendor scores, risk flags, and model outputs in near real-time, improving decision speed by ~40%.",
      "Automated model deployment and data workflows with CI/CD, Docker, and GitHub, improving release frequency by ~40% and increasing production reliability.",
      "Implemented monitoring and observability for data and model health and optimized inference cost/performance across AWS services.",
      "Collaborated with cross-functional ML, data engineering, and product teams to ship features rapidly and ensure alignment on scalability, governance, and system performance.",
    ],
    skills: [
      "Python",
      "AWS (S3, EC2, Lambda)",
      "SageMaker",
      "Amazon Bedrock",
      "Hugging Face",
      "LangChain / LangGraph",
      "Titan embeddings",
      "RAG pipelines",
      "Snowflake",
      "Databricks",
      "Power BI / Tableau",
      "Docker / CI-CD",
      "Monitoring & Observability",
    ],
  },
  {
    company: "Accenture",
    role: "Consultant / Full Stack Engineering",
    period: "May 2021 - April 2024",
    summary:
      "At Accenture, I operated as a full-stack engineer building scalable, production-grade applications for enterprise clients across operations, analytics, and cloud modernization.",
    achievements: [
      "Engineered responsive, user-centric frontends using Angular, TypeScript, and HTML/CSS, integrating with Python backend services to improve usability and task completion rates by ~50%.",
      "Developed and optimized Power BI dashboards connected to SQL-based operational datasets, enabling KPI visibility across business units and boosting analytics-driven outcomes by ~30%.",
      "Built and tested RESTful APIs and integrated them with backend databases to support scalable workflows, reducing turnaround times by ~20% through SQL-based diagnostics and trend analysis.",
      "Led knowledge-sharing and internal training for new engineers, mentoring teammates through biweekly workshops on Angular, Python, Git, dashboarding, and API best practices.",
      "Drove cloud migration of enterprise datasets and applications to AWS and Azure, leveraging CI/CD, Docker, and GitHub workflows to reduce hosting costs by ~25% and improve platform reliability by ~35%.",
      "Collaborated cross-functionally with product owners, data engineers, and cloud architects to deliver features on tight timelines and ensure alignment across UX, backend logic, analytics requirements, and infrastructure.",
    ],
    skills: [
      "Angular",
      "TypeScript",
      "HTML/CSS",
      "Python",
      "REST APIs",
      "AWS",
      "Azure",
      "Docker",
      "Git / GitHub",
      "CI/CD pipelines",
      "SQL",
      "Power BI",
      "Tableau",
      "Databricks",
      "Jira / Confluence",
      "Kubernetes",
      "Scikit-learn",
      "Regression Analysis",
      "KPI Modeling",
    ],
  },
];

export const projectQuests = [
  {
    name: "Quest: Pulseboard",
    stack: "Next.js, Node.js, PostgreSQL, Redis",
    summary: "A real-time executive dashboard with role-based collaboration.",
    result: "Improved decision latency by 35% for operations teams.",
  },
  {
    name: "Quest: Atlas Sync",
    stack: "TypeScript, GraphQL, Kafka, Docker",
    summary: "Cross-system data synchronization engine with replay support.",
    result: "Reduced data drift incidents by 62%.",
  },
  {
    name: "Quest: Mentora",
    stack: "React Native, Firebase, Python",
    summary: "Mentorship matching and progress tracking app for students.",
    result: "Reached 9k+ signups in first 6 months.",
  },
];

export const projectDetails: ProjectDetail[] = [
  {
    title: "Premium Subscriber Conversion Prediction",
    description:
      "This initiative centers on developing a data-driven engine capable of forecasting freemium-to-premium conversion behavior across a user base of more than 58,000 records. Leveraging R, the project integrates exploratory data analysis, causal inference, and advanced machine-learning methodologies to deliver actionable insights for customer lifecycle optimization.",
    problemSolved:
      "Provided data-backed predictions of conversion probability to help teams target high-value users, personalize onboarding flows, and optimize resource allocation for subscription growth.",
    technicalApproach: [
      "Data Engineering & Exploration - Cleaned, transformed, and validated a dataset of 58k+ user interactions. Performed EDA and causal inference checks to surface real drivers of conversion.",
      "Feature Strategy - Engineered features from engagement intensity, session timing, activity breadth, and demographics. Applied feature selection and used oversampling (SMOTE) to address class imbalance.",
      "Model Development - Built and tuned Logistic Regression, Random Forest, and Gradient Boosting (GBM/XGBoost) models using cross-validation, grid search, and threshold optimization.",
      "Evaluation & Insights - Benchmarked models, derived user-behavior clusters, and produced actionable levers for product and marketing teams.",
    ],
    keyLearnings:
      "Deepened expertise in classification workflows and ensemble techniques, strengthened causal analysis practices, gained hands-on experience with balancing and hyperparameter tuning, and improved translating analytics into business recommendations.",
    techTags: [
      "R (tidyverse, caret, randomForest, xgboost)",
      "Machine Learning (Classification & Clustering)",
      "Causal Inference & Statistical Modeling",
    ],
  },
  {
    title: "Seoul Bike Sharing Demand Analysis",
    description:
      "This project focuses on building an intelligent forecasting engine to predict daily bike rental demand across 8,700+ records from the Seoul public bike system. Using a Python-based analytics pipeline integrated with a relational database, the initiative delivers high-fidelity predictions that support capacity planning, resource allocation, and operational optimization for urban mobility services.",
    problemSolved:
      "Provided a data-driven demand prediction model to enable better fleet distribution, maintenance scheduling, and strategic planning, reducing overstocking and underresourcing across stations.",
    technicalApproach: [
      "Data Pipeline & Engineering - Ingested and managed data through a relational database; executed Python-based wrangling and preprocessing; conducted EDA to evaluate environmental, temporal, and behavioral factors.",
      "Feature Development & Preparation - Engineered features for temperature, humidity, time-of-day, holidays, and wind speed; handled outliers, normalization, and rigorous validation.",
      "Predictive Modeling - Implemented Linear Regression, Random Forest Regression, and Gradient Boosting models; optimized via hyperparameter tuning and cross-validation with evaluation on RMSE, MAE, and R².",
      "Insights & Deliverables - Produced analytical reports, identified peak-hour trends, and delivered recommendations for station-level planning and system optimization.",
    ],
    keyLearnings:
      "Strengthened Python analytics and regression modeling skills, improved database integration workflows, and enhanced data storytelling to turn model outputs into actionable operational guidance.",
    techTags: [
      "Python (pandas, NumPy, scikit-learn)",
      "SQL / Relational Databases",
      "Regression & Predictive Analytics",
    ],
  },
  {
    title: "PwC Capstone Consultant: Building Process-Specific Models with Human Knowledge",
    description:
      "A 13-week capstone blueprint combining explainable AI, process mining, and human-in-the-loop feedback to build process-specific, transparent AI models for enterprise workflows.",
    problemSolved:
      "Addresses enterprise adoption barriers such as lack of transparency, misalignment with domain expertise, and fragmented event-log data by designing a human-aligned machine intelligence framework that balances performance with operational constraints.",
    technicalApproach: [
      "Research Foundations - Deep-dive into Explainable AI (XAI), process mining from event logs, and SME feedback frameworks to form a rigorous blueprint.",
      "Blueprint Architecture - Structured 13-week roadmap across four pillars: Data Understanding & Event Log Assessment; Model Development & Explainability Integration; Human-Knowledge Integration Cycles; Governance, Monitoring & Scalability.",
      "Implementation Strategy - Recommended tooling for process mining and XAI visualization, model training cycles adapted to process maturity, and a monitoring plan for transparency and drift detection.",
    ],
    keyLearnings:
      "Advanced XAI and process-mining knowledge, strengthened design of human-in-the-loop systems, and improved ability to translate technical research into enterprise-ready operational frameworks.",
    techTags: [
      "Explainable AI (XAI) Frameworks",
      "Process Mining & Event-Log Analytics",
      "Human-in-the-Loop Feedback Systems",
    ],
  },
];

export const certifications = [
  "AWS Certified Solutions Architect - Associate",
  "Google Professional Data Engineer",
  "Scrum Product Owner Certified (SPOC)",
  "Meta Front-End Developer Certificate",
];

export const certificationShowcase: CertificationShowcaseItem[] = [
  {
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    description:
      "Validates foundational knowledge of AI, ML, and generative AI concepts and AWS AI services.",
    date: "January 2025",
    logoSrc: withBasePath("/assets/logos/aws.png"),
  },
  {
    title: "AWS Academy Graduate",
    issuer: "AWS Academy Cloud Foundations",
    description:
      "Comprehensive training in cloud computing concepts, AWS core services, security, architecture, and pricing.",
    date: "2025",
    logoSrc: withBasePath("/assets/logos/aws.png"),
  },
  {
    title: "Generative AI Engineer",
    issuer: "Databricks",
    description:
      "Expertise in building and deploying generative AI applications using Databricks platform and LLMs.",
    date: "2025",
    logoSrc: withBasePath("/assets/logos/Databricks.png"),
  },
  {
    title: "LangChain & OpenAI",
    issuer: "Level up LLM applications development",
    description:
      "Advanced training in building production-ready LLM applications using LangChain framework and OpenAI APIs.",
    date: "2025",
    badge: "🔗",
  },
  {
    title: "Cloud Computing",
    issuer: "Introduction to Cloud Computing",
    description:
      "Foundational understanding of cloud computing models, services, and deployment strategies.",
    date: "2020",
    badge: "☁️",
  },
  {
    title: "Python Programming",
    issuer: "Python Programming with Data Science",
    description:
      "Comprehensive Python programming skills with focus on data science libraries and applications.",
    date: "2020",
    badge: "🐍",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:soursama@iu.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sour-samanta/" },
  { label: "GitHub", href: "https://github.com/sousama98" },
  { label: "Phone", href: "tel:+18126793078" },
];

export const contactMethods: ContactMethod[] = [
  {
    icon: "📧",
    label: "Email",
    value: "soursama@iu.edu",
    href: "mailto:soursama@iu.edu",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/sour-samanta/",
    href: "https://www.linkedin.com/in/sour-samanta/",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/sousama98",
    href: "https://github.com/sousama98",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+1 (812) 679-3078",
    href: "tel:+18126793078",
  },
];

export const preferredRoles: PreferredRole[] = [
  {
    title: "Data Science",
    description: "Modeling, experimentation, and production ML workflows.",
  },
  {
    title: "Data Analytics",
    description: "Self-serve BI, dashboards, and stakeholder-driven insights.",
  },
  {
    title: "Technology Consulting",
    description: "Strategy, vendor selection, and cloud-native solution design.",
  },
  {
    title: "Product Management",
    description: "Roadmaps, prioritization, and delivering measurable outcomes.",
  },
];

export const easterEggTidbits = {
  gallery: "Fun fact: I compose short theatre background scores on weekends.",
  room: "Travel log: favorite route so far is San Francisco to Seattle by rail.",
  konami: "Hidden mode: I once built a game-jam app in 48 hours with live polls.",
};
