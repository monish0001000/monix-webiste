import { CategoryDetail } from '../types';

export const WHY_CHOOSE_US = [
  {
    icon: "Sparkles",
    title: "Modern Designs",
    desc: "Apple-level clean, pixel-perfect glassmorphism UIs with luxury white & gold aesthetics.",
  },
  {
    icon: "BadgeIndianRupee",
    title: "Affordable Pricing",
    desc: "Transparent packages starting from ₹4,999* with zero hidden costs or extra charges.",
  },
  {
    icon: "Cpu",
    title: "AI Powered Workflow",
    desc: "Automated coding pipelines, smart AI algorithms, and next-gen integration.",
  },
  {
    icon: "Clock",
    title: "On-Time Delivery",
    desc: "Strict project milestones with guaranteed on-time launch commitments.",
  },
  {
    icon: "Headphones",
    title: "Professional Support",
    desc: "1-Month free technical post-launch support & ongoing maintenance assistance.",
  },
  {
    icon: "Smile",
    title: "Customer Satisfaction",
    desc: "100% revision commitment until your vision is perfectly materialized.",
  },
  {
    icon: "ShieldCheck",
    title: "Secure Development",
    desc: "Enterprise-grade SSL encryption, XSS/CSRF protections, and secure headers.",
  },
  {
    icon: "Search",
    title: "SEO Friendly",
    desc: "Rank high on Google with schema markup, fast page speed, and dynamic open graph tags.",
  },
  {
    icon: "Smartphone",
    title: "Mobile Optimized",
    desc: "Flawless performance across desktops, laptops, tablets, and mobile devices.",
  },
  {
    icon: "Layers",
    title: "Latest Technologies",
    desc: "Built using Next.js 16, TypeScript, React 19, Tailwind CSS v4, and modern cloud platforms.",
  },
];

export const WEB_CATEGORIES = [
  "Corporate Website", "Business Website", "Portfolio", "Landing Page",
  "College Website", "School Website", "Hospital Website", "Restaurant Website",
  "Hotel Website", "Travel Website", "NGO Website", "Real Estate Website",
  "Event Website", "Blog Website", "News Portal", "Admin Dashboard",
  "Admin Panel", "CRM System", "ERP System", "Booking System",
  "Educational Portal", "Membership Website", "AI Powered Website", "E-Commerce Website",
  "Marketplace Website", "Custom Web Applications"
];

export const MOBILE_CATEGORIES = [
  "Android Apps", "iOS Apps", "Flutter Apps", "React Native Apps",
  "Business Apps", "Food Delivery Apps", "Hospital & Telemedicine Apps", "Education & eLearning Apps",
  "Booking & Ticketing Apps", "Finance & Fintech Apps", "Travel & Tourism Apps", "Inventory Management Apps",
  "CRM Mobile Apps", "ERP Mobile Apps", "AI Applications", "Chat & Messaging Apps",
  "Productivity & Task Apps", "E-Commerce Shopping Apps", "Portfolio Apps", "Social Networking Apps",
  "Healthcare & Fitness Apps", "Custom Mobile Applications"
];

export const INTERNSHIP_PROGRAMS = [
  "AI Full Stack Development", "Cyber Security & Ethical Hacking", "AI & Machine Learning",
  "AI Data Science", "Prompt Engineering & GenAI", "Python Development",
  "React & Next.js Frontend", "Flutter Mobile Apps", "Cloud Computing (AWS/GCP)",
  "DevOps Engineering", "Java Full Stack", "C++ System Programming",
  "Blockchain Technologies", "IoT & Embedded Systems", "UI/UX Product Design",
  "Digital Marketing & SEO"
];

export const PROJECT_CATEGORIES = [
  "College Final Year Major Projects",
  "Mini Projects for CS / IT / ECE",
  "IEEE Standard AI & Cloud Projects",
  "Artificial Intelligence & Machine Learning Projects"
];

export const PROCESS_TIMELINE = [
  { step: "01", title: "Discovery", desc: "Understanding client goals, scope, target audience, and business requirements." },
  { step: "02", title: "Planning", desc: "Architecture design, tech stack selection, wireframing, and project roadmap." },
  { step: "03", title: "Design", desc: "Luxury UI/UX prototyping with responsive white-and-gold visual components." },
  { step: "04", title: "Development", desc: "Writing clean, scalable, type-safe Next.js & React code with AI acceleration." },
  { step: "05", title: "Testing", desc: "Rigorous quality assurance, cross-browser testing, security audits & speed tuning." },
  { step: "06", title: "Launch", desc: "Domain setup, SSL configuration, cloud deployment, and live going." },
  { step: "07", title: "Support", desc: "1 Month free post-launch support, updates, and maintenance guidance." },
];

export const FAQS = [
  {
    q: "What is the starting price for a website development project?",
    a: "Our website packages start from ₹4,999*. The exact price depends upon specific project features, pages, e-commerce integration, and custom functionality required."
  },
  {
    q: "How long does it take to develop a custom website or mobile application?",
    a: "A standard business website usually takes 5 to 10 working days. Custom mobile applications and complex AI web portals typically take 2 to 4 weeks based on milestone scope."
  },
  {
    q: "Is MONIX Software Solutions a Govt of India registered company?",
    a: "Yes! MONIX Software Solutions is officially registered under the Government of India MSME (Micro, Small and Medium Enterprises) framework, guaranteeing authentic and legal operations."
  },
  {
    q: "Are the AI Internship programs suitable for college students?",
    a: "Absolutely! Our AI Internship programs are 100% online, mentorship-driven, and designed specifically for B.E, B.Tech, B.Sc, BCA, MCA, and Diploma students looking to work on real industry projects."
  },
  {
    q: "Do you provide certificates and source code for academic projects?",
    a: "Yes, for all academic projects (College Final Year, Mini, IEEE, AI), we provide complete source code, installation support, project documentation, presentation ppt, and verifiable completion certificates."
  },
  {
    q: "What post-launch support do you offer for web and mobile apps?",
    a: "Every project includes 1 month of free post-launch technical support, minor content updates, hosting guidance, and bug fixes."
  }
];

// Rich detailed category templates generator for deep category detail view
export const CATEGORY_DETAILS_MAP: Record<string, CategoryDetail> = {
  "E-Commerce Website": {
    id: "e-commerce-website",
    title: "E-Commerce Website Development",
    parentService: "web",
    subtitle: "High-converting online store with payment gateway, inventory management, and AI product recommendations.",
    overview: "Build a modern, high-performance online store tailored to turn visitors into repeat buyers. Includes multi-currency support, order tracking, razor-sharp checkout, and mobile optimization.",
    priceTag: "Starting from ₹9,999*",
    features: [
      "Custom Shopping Cart & Fast One-Page Checkout",
      "Integrated Payment Gateways (Razorpay, PhonePe, UPI, Stripe)",
      "Admin Dashboard for Products, Orders & Customers",
      "Coupon Codes, Discounts & Automated Invoices",
      "SEO Friendly Product Pages & Schema Markup",
      "100% Mobile & Tablet Responsive Layout"
    ],
    benefits: [
      "Sell 24/7 nationwide without geographical boundaries",
      "Automated order notifications via WhatsApp/Email",
      "High loading speed under 1.2 seconds for low bounce rates"
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Stripe/Razorpay API", "Supabase/PostgreSQL"],
    process: ["Requirement & Product Cataloging", "Store UX Design", "Payment & Courier Integration", "Load Testing", "Launch & Training"],
    deliverables: ["Full Source Code", "Admin Control Credentials", "User Manual & Training", "1 Year SSL & Hosting Guidance"]
  },
  "AI Powered Website": {
    id: "ai-powered-website",
    title: "AI-Powered Website Development",
    parentService: "web",
    subtitle: "Next-gen web applications with integrated Gemini AI, smart chatbots, and automated workflows.",
    overview: "Elevate your digital footprint with artificial intelligence. We build custom web apps featuring AI content generation, automated customer support bots, predictive search, and personalized user feeds.",
    priceTag: "Starting from ₹12,999*",
    features: [
      "Gemini / OpenAI API Integration",
      "Automated AI Customer Support Chatbot",
      "Automated AI Content & Recommendation Engine",
      "Voice Search & Multilingual AI Translation",
      "Real-time Data Analytics Dashboard"
    ],
    benefits: [
      "Automate 80% of repetitive customer support queries",
      "Differentiate your brand with cutting-edge tech leadership",
      "Personalized customer experiences increasing sales conversion"
    ],
    technologies: ["Next.js", "TypeScript", "Google Gemini API", "Tailwind v4", "Node.js Server Actions"],
    process: ["AI Model Selection & Architecture", "UI Design & Prompt Engineering", "API Proxy Security Setup", "Testing & Fine-Tuning", "Deployment"],
    deliverables: ["Secured Server API Proxy", "Custom Prompt Workflows", "Documentation & Maintenance Guide"]
  },
  "AI Full Stack Development": {
    id: "ai-full-stack",
    title: "AI Full Stack Development Internship",
    parentService: "internship",
    subtitle: "100% Online • Mentorship Driven • Govt MSME Certified • Real Industry Capstone Projects.",
    overview: "Master full-stack web development integrated with modern Generative AI. Build production-grade applications using React, Next.js, Node.js, and Gemini API under the guidance of senior software architects.",
    duration: "4 Weeks / 8 Weeks Options",
    features: [
      "Live Hands-on Coding Sessions",
      "Real-world Portfolio Capstone Project",
      "Verifiable MSME Govt Registered Internship Certificate",
      "Resume Building & Mock Interview Mentorship",
      "Source Code Access & Github Portfolio Review"
    ],
    benefits: [
      "Gain real industry experience using AI tools",
      "Stand out in job placements with a live deployed project",
      "1-on-1 mentorship from lead software engineers"
    ],
    technologies: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4", "Node.js", "Gemini API", "Git & Github"],
    process: ["Fundamentals & Modern Tooling", "Frontend Design", "Backend & AI API Integration", "Capstone Project Building", "Certification & Career Guidance"],
    deliverables: ["Verifiable Internship Certificate", "LOR (Letter of Recommendation)", "Live Deployed Project Link", "GitHub Code Repository"]
  },
  "College Final Year Major Projects": {
    id: "college-final-year-major-projects",
    title: "College Final Year Major Academic Projects",
    parentService: "projects",
    subtitle: "Turnkey Final Year Major Projects for CSE, IT, ECE, AI/DS Students with Full Documentation & Viva Prep.",
    overview: "Get high-scoring, industry-relevant major projects tailored to university requirements. Includes working source code, database, PPT slides, base IEEE research paper, project report, and video tutorial.",
    priceTag: "Custom Budget Friendly Pricing",
    features: [
      "100% Working Tested Source Code",
      "Comprehensive Project Report (PDF/Word format)",
      "Viva Voce Question & Answer Guide",
      "Free Remote Installation Support via AnyDesk / TeamViewer",
      "Custom Feature Additions & Enhancements Available"
    ],
    benefits: [
      "Score top grades with unique, non-plagiarized project architecture",
      "Complete confidence during final university oral viva exams",
      "Step-by-step guidance on how the code works"
    ],
    technologies: ["Python", "Machine Learning", "React", "Node.js", "Flutter", "Android", "Cloud"],
    process: ["Topic Selection & Synopsis Submission", "System Architecture & Coding", "Report & PPT Generation", "Code Explanation & Viva Demo", "Final Submission Support"],
    deliverables: ["Full Source Code ZIP", "Complete Documentation Report", "Presentation PPT", "Synopsis Document", "Installation Manual"]
  }
};
