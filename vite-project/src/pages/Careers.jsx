import { useState, useEffect } from 'react';

// Static cohort interns compiled directly from public/data/data.pdf (45 interns)
const internsData = [
  { name: "Akshaya Kondamwar", team: "Machine Learning (ML)", internId: "TRCM26AKKO", linkedin: "https://www.linkedin.com/in/akshaya-kondamwar18" },
  { name: "Hruthika Patalay", team: "Machine Learning (ML)", internId: "TRCM26HRPA", linkedin: "https://www.linkedin.com/in/hruthika-patalay-1991ab31b/" },
  { name: "Farzana Mohammad", team: "Machine Learning (ML)", internId: "TRCM26FAMO", linkedin: "https://www.linkedin.com/in/farzana-mohammad-149240359" },
  { name: "Prathyusha S", team: "Machine Learning (ML)", internId: "TRCM26PRST", linkedin: "https://www.linkedin.com/in/prathyusha-sunkari-alpatla-7130a332a/" },
  { name: "M. Dhanush Vardhan Chary", team: "Machine Learning (ML)", internId: "TRCM26DHCH", linkedin: "" },
  { name: "Dhanvi Annam", team: "Generative AI (Gen AI)", internId: "TRCG26DHAN", linkedin: "https://www.linkedin.com/in/dhanvi-annam/" },
  { name: "Manichandana T", team: "Generative AI (Gen AI)", internId: "TRCG26MATH", linkedin: "https://www.linkedin.com/in/thondurumanichandana" },
  { name: "PSSL Kathyayani", team: "Generative AI (Gen AI)", internId: "TRCG26PSKA", linkedin: "https://www.linkedin.com/in/psslkatyayani" },
  { name: "Akshitha Thummuru", team: "Generative AI (Gen AI)", internId: "TRCG26AKTH", linkedin: "https://www.linkedin.com/in/akshitha-thummuru" },
  { name: "Akshaya D", team: "Generative AI (Gen AI)", internId: "TRCG26AKDO", linkedin: "https://www.linkedin.com/in/doddikindi-akshaya-51102b2bb?utm_source=share_via&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Naina Rao D", team: "Generative AI (Gen AI)", internId: "TRCG26NADA", linkedin: "https://www.linkedin.com/in/d-naina/" },
  { name: "Akhila D", team: "Generative AI (Gen AI)", internId: "TRCG26AKDA", linkedin: "https://www.linkedin.com/in/akhila-dabbikar-232729329?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Taruni U", team: "Generative AI (Gen AI)", internId: "TRCG26TAUT", linkedin: "" },
  { name: "Sreenivasulu S", team: "Software Dev (S/W)", internId: "TRCS26SRSA", linkedin: "https://www.linkedin.com/in/srinivasulu-sachu-b292952a5" },
  { name: "Manikanta Reddy S", team: "Software Dev (S/W)", internId: "TRCS26MARE", linkedin: "https://www.linkedin.com/in/manikantareddysaragari" },
  { name: "Shashanth Goud T", team: "Software Dev (S/W)", internId: "TRCS26SHTA", linkedin: "https://www.linkedin.com/in/shashanth-talla-06b2473a2?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Harish Kumar B", team: "Software Dev (S/W)", internId: "TRCS26HABA", linkedin: "https://www.linkedin.com/in/bandaru-harish-kumar-473989340?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Yogeshwar V", team: "Software Dev (S/W)", internId: "TRCS26YOVA", linkedin: "" },
  { name: "Tejas Kandula", team: "Software Dev (S/W)", internId: "TRCS26TEKA", linkedin: "" },
  { name: "Tanmai Bosle", team: "Analyst and Tech", internId: "TRCD26TABO", linkedin: "https://www.linkedin.com/in/tanmai-bosle-2089ba3a2" },
  { name: "Srinipa Ajja", team: "Analyst and Tech", internId: "TRCD26SRAJ", linkedin: "https://www.linkedin.com/in/srinipa-ajja-60819532a/" },
  { name: "Varsha Chatla", team: "HR & Talent Accel.", internId: "TRCH26VACH", linkedin: "https://www.linkedin.com/in/sri-varsha-chatla-8b695a325?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  { name: "Rishitha Reddy N", team: "HR & Talent Accel.", internId: "TRCH26RINA", linkedin: "https://www.linkedin.com/in/n-rishitha-reddy-ab07a9325" },
  { name: "Madhulatha Reddy R", team: "HR & Talent Accel.", internId: "TRCH26MARA", linkedin: "https://www.linkedin.com/in/madhulatha12" },
  { name: "Durga Agarwal", team: "HR & Talent Accel.", internId: "TRCH26DUAG", linkedin: "" },
  { name: "Hasini Idha", team: "HR & Talent Accel.", internId: "TRCH26HAID", linkedin: "" },
  { name: "Barukunti Bhavya Sri", team: "Content Team", internId: "TRCC26BABA", linkedin: "https://www.linkedin.com/in/barukunti-bhavyasri-6b9b1837a" },
  { name: "Belli Anjali", team: "Content Team", internId: "TRCC26BEAN", linkedin: "https://www.linkedin.com/in/anjali-belli-36bbb4394" },
  { name: "Yarrabotu Ranith Reddy", team: "Content Team", internId: "TRCC26YARA", linkedin: "https://www.linkedin.com/in/ranith-reddy-64a794340?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Bethala Yeshwitha", team: "Embedded H/W Interns", internId: "TRCE26BEYE", linkedin: "https://www.linkedin.com/in/bethala-yeshwitha" },
  { name: "Boddu.Nandhini", team: "Embedded H/W Interns", internId: "TRCE26BONA", linkedin: "https://www.linkedin.com/in/nandhini-bold-768363367" },
  { name: "Dasoju Saikrishna", team: "Embedded H/W Interns", internId: "TRCE26DASA", linkedin: "https://www.linkedin.com/in/dasoju-saikrishna-a23342395?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Gurram Sowmya", team: "Embedded H/W Interns", internId: "TRCE26GUSO", linkedin: "https://www.linkedin.com/in/sowmya-g-3b4578328" },
  { name: "Kamuni Navya", team: "Embedded H/W Interns", internId: "TRCE26KANA", linkedin: "https://www.linkedin.com/in/kamuni-navya-270478395?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Navya Nirudu", team: "Embedded H/W Interns", internId: "TRCE26NANI", linkedin: "https://www.linkedin.com/in/navya-nirudu-33634433a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Nerella Saraswathi:", team: "Embedded H/W Interns", internId: "TRCE26NESA", linkedin: "https://www.linkedin.com/in/saraswati-nerella" },
  { name: "Sathwika Reddy", team: "Embedded H/W Interns", internId: "TRCE26SARE", linkedin: "https://www.linkedin.com/in/sathwika-reddy04" },
  { name: "VAKKALAGADDA RAJ KIRAN", team: "Embedded H/W Interns", internId: "TRCE26VARA", linkedin: "https://www.linkedin.com/in/raj-kiran-chintu-7555" },
  { name: "Akula Manikanta", team: "Embedded H/W Interns", internId: "TRCE26AKMA", linkedin: "https://www.linkedin.com/in/mani-akula-246b34366?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Guntoju Srikanth", team: "Embedded H/W Interns", internId: "TRCE26GUSR", linkedin: "https://in.linkedin.com/in/guntoju-srikanth-7211943ab" },
  { name: "Hipparga Aishwarya", team: "Embedded H/W Interns", internId: "TRCE26HIAI", linkedin: "https://www.linkedin.com/in/aishwarya-hipparga-4988ba3a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Karike Ashwini", team: "Embedded H/W Interns", internId: "TRCE26KAAS", linkedin: "https://www.linkedin.com/in/ashwini-karike-383a38384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Madapana Mohini", team: "Embedded H/W Interns", internId: "TRCE26MAMO", linkedin: "https://www.linkedin.com/in/mohini-madapana" },
  { name: "Rongali mohan", team: "Embedded H/W Interns", internId: "TRCE26ROMO", linkedin: "https://www.linkedin.com/in/mohan-rongali-457917301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_a" },
  { name: "Sathwik bapuram", team: "Embedded H/W Interns", internId: "TRCE26SABA", linkedin: "https://www.linkedin.com/in/sathwik-bapuram?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
];

// Fallback / Initial pre-populated JDs parsed from public/data/1.txt (11 JDs currently offered)
const defaultJobOpenings = [
  {
    id: 1,
    title: "Content Writing & SEO Strategist",
    dept: "Marketing & Strategy",
    type: "Remote Internship",
    location: "Fully Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students from any year",
    desc: "Create clear technical documentation, deep-dive editorial posts, and high-impact social media content utilizing modern SEO strategies.",
    responsibilities: [
      "Technical & Project Writing: Create clear, comprehensive Product and Project Documentation to support ongoing initiatives and R&D.",
      "Deep-Dive Editorial: Research and craft 1,500+ word blog posts that establish industry authority.",
      "Multi-Channel Social Media: Create high-impact, engaging content for Instagram, LinkedIn, and Twitter/X.",
      "SEO & Strategy: Execute Search Intent (SI) writing and leverage data analytics to optimize content performance.",
      "Visual Innovation: Utilize visual prompting (AI tools) to generate assets and write compelling video annotations and captions.",
      "Corporate Communications: Draft professional newsletters, specialized Job Descriptions (JDs), and internal communications."
    ],
    requirements: [
      "Freshers: Looking for their first big break to build a robust portfolio and gain technical writing experience.",
      "Experienced Creators: Looking to pivot into tech, refine their SEO skills, or gain specific MNC certifications.",
      "The Self-Starter: Comfortable working independently in a remote, fast-paced environment."
    ],
    perks: [
      "Global MNC Certifications: Fully sponsored and guided completion of industry-recognized certifications from Google Skillshop, Snapchat, and LinkedIn Learning.",
      "Career Acceleration: Dedicated guidance in professional resume writing and profile optimization.",
      "Premium Portfolio: Get published and credited on professional platforms to showcase results to future employers.",
      "Mentorship: Learn the 'why' and 'how' behind data-driven content from experienced business leaders."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 2,
    title: "Multimedia & AI Content Creator",
    dept: "Creative & AI Hub",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students from any year",
    desc: "Produce viral short-form reels and long-form YouTube productions using advanced AI generative models like Veo 3 and CapCut.",
    responsibilities: [
      "Short-Form Viral Content: Conceptualize, shoot/source, and edit highly engaging Instagram Reels and YouTube Shorts designed for high retention and shareability.",
      "Long-Form YouTube Production: Handle end-to-end video making for our main YouTube channel, including pacing, b-roll integration, and sound design.",
      "Cutting-Edge AI Video Creation: Act as our AI Director by utilizing advanced generative models like Veo 3 (and other available text-to-video/image-to-video platforms) to create futuristic, high-quality visual sequences.",
      "Graphic Design & Branding: Design eye-catching posters, digital banners, and thumbnails that align with Techroxx's modern, tech-forward brand identity.",
      "Visual Strategy: Collaborate with the editorial team to ensure all written content is paired with the perfect visual assets."
    ],
    requirements: [
      "The Editor: Proficient in video editing software (e.g., Premiere Pro, DaVinci Resolve, CapCut) with a strong sense of timing and audio-visual syncing.",
      "The Designer: Skilled in graphic design tools (e.g., Photoshop, Illustrator, Canva) with a sharp eye for typography and layout.",
      "The AI Prompt Engineer: Experience or strong interest in visual prompting for AI video and image generation.",
      "The Trend-Spotter: Someone who intimately understands the algorithms, audio trends, and visual styles of YouTube and Instagram."
    ],
    perks: [
      "Next-Gen Portfolio: Build a diverse, credited portfolio featuring traditional graphic design and advanced AI-generated video campaigns.",
      "Global MNC Certifications: Guided completion of industry-recognized certifications (e.g., Google Skillshop, LinkedIn Learning).",
      "Expert Career Coaching: Expert guidance on portfolio presentation and resume writing."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 3,
    title: "Human Resources (HR) Internship",
    dept: "HR & Talent",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students from any year and any field of graduation",
    desc: "Support talent acquisition, draft descriptions, shortlist candidate resumes, coordinate remote interviews, and employee engagement.",
    responsibilities: [
      "Talent Acquisition Support: Assist in drafting job descriptions, posting roles on various platforms, and sourcing potential candidates.",
      "Screen Screening & Coordination: Review applications, shortlist resumes, and help schedule and coordinate interviews with technical teams.",
      "Onboarding Processes: Support the seamless onboarding of new interns and team members, ensuring all necessary documentation and introductions are completed.",
      "Employee Engagement: Brainstorm and help implement remote engagement initiatives to foster a positive and collaborative team culture.",
      "Data Management: Maintain and update organized internal databases, tracking applicant statuses and team records."
    ],
    requirements: [
      "Currently enrolled in or recently graduated from any degree program at a recognized university (No prior experience required).",
      "Excellent written and verbal communication skills.",
      "Strong interpersonal abilities with a naturally collaborative and empathetic mindset.",
      "High level of organization, attention to detail, and ability to manage multiple tasks.",
      "Bonus Qualifications: Familiarity with professional networking platforms (e.g., LinkedIn), Google Workspace, or student council involvement."
    ],
    perks: [
      "Recruitment Skills: Hands-on guidance in modern recruitment practices, candidate communication, and HR administration.",
      "Soft Skills Growth: Development of core soft skills, including negotiation, professional communication, and conflict resolution.",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 4,
    title: "Hardware Engineering Intern (Electronics & PCB)",
    dept: "Hardware Engineering",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "3rd-Year ECE & EEE Students",
    desc: "Simulate electrical circuits, route Printed Circuit Boards (PCBs) for IoT applications, and manage CAD component integration.",
    responsibilities: [
      "Circuit Design & Simulation: Assist in designing, simulating, and troubleshooting electrical and electronic circuits for various projects.",
      "PCB Layouts: Learn to create, review, and optimize Printed Circuit Board (PCB) designs for IoT and embedded applications, ensuring proper routing and signal integrity.",
      "Architectural Planning & Simulation: Support structural planning and component integration utilizing CAD platforms like Tinkercad, KiCad, or EasyEDA.",
      "Project Development: Collaborate on the conceptualization and deployment of physical hardware required for IoT and robotics systems."
    ],
    requirements: [
      "Currently enrolled in the 3rd year of a B.Tech/B.E. program in ECE or EEE.",
      "Solid understanding of core theoretical electronics (analog/digital circuits, basic RF/antenna principles).",
      "Bonus Qualifications: Familiarity with simulation software (Tinkercad), PCB design tools (KiCad, EasyEDA Pro), or academic projects involving robotics assembly."
    ],
    perks: [
      "Elite Certifications: Opportunity and guidance to earn highly valued certifications from top organizations, including NVIDIA (core electronics/hardware) and IBM (Quantum Computing basics).",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 5,
    title: "Embedded Software Intern (IoT & Robotics)",
    dept: "Ecosystem R&D",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "3rd-Year ECE & EEE Students",
    desc: "Write embedded C/C++ firmware, interface microcontrollers (Arduino/ESP32) with sensors, and learn ROS robot architectures.",
    responsibilities: [
      "Embedded Software Development: Write, test, and debug basic embedded firmware (using C/C++) to interface with hardware components, sensors, and microcontrollers (e.g., ESP32, Arduino).",
      "IoT Integration: Assist in programming communication protocols to allow hardware to interact with web services and data platforms.",
      "Systems Interfacing: Develop scripts and software logic to bridge the gap between low-level hardware and high-level operating systems.",
      "Project Development: Collaborate on the conceptualization, software architecture, and deployment of IoT and robotics-focused projects."
    ],
    requirements: [
      "Currently enrolled in the 3rd year of a B.Tech/B.E. program in ECE or EEE.",
      "Solid understanding of core theoretical IoT concepts and microcontroller architecture.",
      "Basic knowledge of programming languages used in embedded systems: C, C++, and Python.",
      "Preferred Qualifications: Experience or strong familiarity with ROS (Robot Operating System) is a major advantage; Git version control."
    ],
    perks: [
      "Elite Certifications: Opportunity and guidance to earn certifications from NVIDIA (Deep Learning) and IBM (Quantum Computing basics).",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 6,
    title: "Digital Marketing & Business Development",
    dept: "Marketing & Strategy",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students from any year and any field of graduation",
    desc: "Drive social media campaigns, establish corporate LinkedIn branding networks, and analyze quantitative post analytics.",
    responsibilities: [
      "Digital & Social Media Marketing: Execute marketing campaigns across various platforms, with a strong emphasis on driving engagement and professional branding on LinkedIn.",
      "Content Collaboration: Collaborate closely with the content creation team to brainstorm compelling copy and campaigns, maintaining a futuristic brand aesthetic.",
      "Business Development: Assist in identifying growth opportunities, generating leads, and researching industry trends to support expansion goals.",
      "SEO & Strategy: Implement foundational SEO strategies to improve online visibility and optimize digital content.",
      "Analytics & Reporting: Track post performance, analyze audience engagement, and adjust strategies to maximize reach."
    ],
    requirements: [
      "Solid understanding of digital marketing fundamentals and social media algorithms (especially LinkedIn).",
      "Excellent written and verbal communication skills with a flair for copywriting.",
      "Bonus Qualifications: Basic familiarity with SEO principles, social media management tools, or prior professional page administration."
    ],
    perks: [
      "MNC Certifications: Guided completion of certifications from elite institutions like Google Digital Garage and HubSpot Academy.",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 7,
    title: "Software Development (SDE) & Web Developer",
    dept: "Platform Engineering",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students currently enrolled in or recently graduated",
    desc: "Develop modern web applications using React JS, integrate Firebase/Supabase backends, and build code with generative AI frameworks.",
    responsibilities: [
      "Application Development: Assist in building and maintaining web applications using React JS and modern JavaScript.",
      "Backend Integration: Work with Node.js and Backend-as-a-Service (BaaS) platforms like Firebase and Supabase.",
      "AI-Assisted Coding: Utilize AI tools to accelerate software development, debug code, and optimize architectures.",
      "Project Execution: Participate in agile project management workflows to deliver software modules on time."
    ],
    requirements: [
      "Solid foundational programming skills in JavaScript (JS), React JS, and Node.js.",
      "Basic understanding of NoSQL databases and backend concepts.",
      "Familiarity with AI-assisted coding tools (e.g., GitHub Copilot, ChatGPT).",
      "Strong problem-solving skills and a proactive approach to debugging."
    ],
    perks: [
      "MERN Stack Mastery: Comprehensive hands-on training to transition into a full MERN stack developer.",
      "SDE Best Practices: Real-world experience in Software Development Engineering methodologies, code reviews, and version control.",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 8,
    title: "Data Analyst Intern",
    dept: "Platform Engineering",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students currently enrolled in or recently graduated",
    desc: "Clean and manipulate datasets using Python, NumPy, and Pandas, execute exploratory analysis, and generate reports.",
    responsibilities: [
      "Data Processing: Clean, manipulate, and process datasets using Python, NumPy, and Pandas.",
      "Exploratory Data Analysis (EDA): Conduct thorough EDA to identify trends, anomalies, and patterns within provided datasets.",
      "Reporting: Assist in generating comprehensive reports to support business decision-making."
    ],
    requirements: [
      "Proficiency in Python programming.",
      "Solid understanding and hands-on experience with core data libraries: NumPy and Pandas.",
      "Strong analytical mindset and mathematical aptitude."
    ],
    perks: [
      "Advanced Visualization: Hands-on training in building interactive dashboards using PowerBI and Tableau.",
      "Advanced EDA Tools: Specialized training in R programming for statistical computing and analytical modeling.",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 9,
    title: "Machine Learning (ML) Intern",
    dept: "Advanced Tech Hub",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students currently enrolled in or recently graduated",
    desc: "Build machine learning models with Scikit-learn, perform Seaborn analytics visualizations, and evaluate training algorithms.",
    responsibilities: [
      "Model Building: Develop and test basic machine learning models using Scikit-learn.",
      "Data Visualization: Use tools like Seaborn and Pandas to visualize model performance and data distributions.",
      "Algorithm Testing: Assist in the evaluation and tuning of algorithms for accuracy and efficiency."
    ],
    requirements: [
      "Strong proficiency in Python, NumPy, and Pandas.",
      "Practical experience implementing standard algorithms using Scikit-learn.",
      "Familiarity with data visualization libraries (e.g., Seaborn, Matplotlib).",
      "Solid foundation in probability, statistics, and linear algebra."
    ],
    perks: [
      "Advanced Tuning Frameworks: Hands-on training in complex ensemble methods, hyperparameter tuning, and deep learning basics.",
      "Computer Vision Principles: Practical exposure to building models that process and analyze visual data (images/video).",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 10,
    title: "Generative AI (Gen AI) Intern",
    dept: "Advanced Tech Hub",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students currently enrolled in or recently graduated",
    desc: "Integrate LLMs via Google AI Studio and Ollama, engineer robust prompting profiles, and deploy agent orchestration.",
    responsibilities: [
      "LLM Integration: Work with Google AI Studio and local models via Ollama to generate, test, and refine AI outputs.",
      "Prompt Engineering: Design and optimize prompts for various foundational models to achieve highly accurate and context-aware results.",
      "Tool Deployment: Utilize advanced frameworks (e.g., Anti-gravity tools/environments) to support AI workflows."
    ],
    requirements: [
      "Proficiency in Python programming.",
      "Solid understanding of core Generative AI concepts and Large Language Model (LLM) architectures.",
      "Hands-on experience with Google AI Studio and Ollama.",
      "Eagerness to experiment with cutting-edge AI orchestration frameworks."
    ],
    perks: [
      "Agentic Frameworks: Intensive training on building multi-agent systems using LangChain and LangGraph.",
      "RAG Architecture: Hands-on experience developing Retrieval-Augmented Generation (RAG) pipelines to ground AI responses.",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  },
  {
    id: 11,
    title: "Marketing Analyst Intern (Data & Strategy)",
    dept: "Marketing & Strategy",
    type: "Remote Internship",
    location: "Remote",
    stipend: "Unpaid",
    duration: "1 Month",
    eligibility: "Students currently enrolled in or recently graduated",
    desc: "Process sentiment and review analysis pipelines utilizing Python libraries, and execute data-driven strategy logistics.",
    responsibilities: [
      "Campaign Management & Analysis: Assist in tracking, managing, and optimizing digital marketing campaigns.",
      "Review & Sentiment Analysis: Utilize Python (NumPy, Pandas) and Gen AI tools to scrape, process, and analyze customer reviews.",
      "Data-Driven Strategy: Provide actionable insights to the marketing team based on quantitative data analysis."
    ],
    requirements: [
      "Proficiency in Python, with a strong grasp of NumPy and Pandas for data manipulation.",
      "Familiarity with utilizing Gen AI tools for marketing copy, ideation, and basic sentiment analysis.",
      "Understanding of core digital marketing principles and campaign management.",
      "Excellent communication skills to translate data findings into marketing strategies."
    ],
    perks: [
      "Data Engineering Foundations: Training on how to build data pipelines and infrastructure that support marketing analytics.",
      "Operations Logistics Strategy: Unique exposure to the analytics behind supply chain operations and business logistics.",
      "Official Internship Certificate of Completion from Tech Roxx."
    ],
    applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
  }
];

// Parser function to dynamically parse JDs from 1.txt in the data folder
const parseJDs = (text) => {
    const lines = text.split('\n');
    const jobs = [];
    let currentJob = null;
    let currentSection = ''; // 'intro', 'responsibilities', 'requirements', 'perks'

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        // remove zero-width space or other invisible chars
        line = line.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
        if (!line) continue;

        // Check if line starts with a number like "1. ", "🎨 2. ", "👥 3. "
        const jobHeaderMatch = line.match(/^(?:[^\d\n]*\s*)?(\d+)\.\s*(.+)$/i);
        if (jobHeaderMatch) {
            if (currentJob) {
                // compile basic desc from responsibilities if missing
                if (currentJob.responsibilities.length > 0 && !currentJob.desc) {
                    currentJob.desc = currentJob.responsibilities[0].split(':')[1]?.trim() || currentJob.responsibilities[0];
                }
                jobs.push(currentJob);
            }
            const id = parseInt(jobHeaderMatch[1], 10);
            let rawTitle = jobHeaderMatch[2].trim();
            // remove trailing parenthetical details if any to keep display clean
            const title = rawTitle.replace(/\s*\(Remote Internship\)|\s*\(Electronics & PCB\)|\s*\(IoT & Robotics\)|\s*\(MERN & AI Integration\)|\s*\(Social Media & B2B\)|\s*\(Advanced ML & CV\)|\s*\(LLMs & Agentic Workflows\)|\s*\(Data & Strategy\)/i, '').trim();
            
            // Deduce department
            let dept = "Marketing & Strategy";
            const titleLower = title.toLowerCase();
            if (titleLower.includes('hardware') || titleLower.includes('pcb') || titleLower.includes('vlsi')) {
                dept = "Hardware Engineering";
            } else if (titleLower.includes('embedded') || titleLower.includes('iot') || titleLower.includes('robotics')) {
                dept = "Ecosystem R&D";
            } else if (titleLower.includes('software') || titleLower.includes('web') || titleLower.includes('developer')) {
                dept = "Platform Engineering";
            } else if (titleLower.includes('machine learning') || titleLower.includes('ml') || titleLower.includes('gen ai') || titleLower.includes('generative')) {
                dept = "Advanced Tech Hub";
            } else if (titleLower.includes('hr') || titleLower.includes('resource') || titleLower.includes('talent')) {
                dept = "HR & Talent";
            } else if (titleLower.includes('content') || titleLower.includes('writing') || titleLower.includes('editor')) {
                dept = "Creative & AI Hub";
            }

            currentJob = {
                id,
                title: title,
                dept: dept,
                type: "Remote Internship",
                location: "Remote",
                stipend: "Unpaid",
                duration: "1 Month",
                eligibility: "Students from any year",
                desc: "",
                responsibilities: [],
                requirements: [],
                perks: [],
                applyLink: "https://forms.gle/4qHRqjjyjCLPufTTA"
            };
            currentSection = 'intro';
            continue;
        }

        if (!currentJob) continue;

        // Parse key attributes
        const lowerLine = line.toLowerCase();
        if (lowerLine.startsWith('*position:*')) {
            currentJob.position = line.replace(/^\*position:\*/i, '').trim().replace(/\*/g, '');
            continue;
        }
        if (lowerLine.startsWith('*location:*')) {
            currentJob.location = line.replace(/^\*location:\*/i, '').trim().replace(/\*/g, '');
            continue;
        }
        if (lowerLine.startsWith('*stipend:*')) {
            currentJob.stipend = line.replace(/^\*stipend:\*/i, '').trim().replace(/\*/g, '');
            continue;
        }
        if (lowerLine.startsWith('*duration:*')) {
            currentJob.duration = line.replace(/^\*duration:\*/i, '').trim().replace(/\*/g, '');
            continue;
        }
        if (lowerLine.startsWith('*eligibility:*')) {
            currentJob.eligibility = line.replace(/^\*eligibility:\*/i, '').trim().replace(/\*/g, '');
            continue;
        }

        if (lowerLine.includes('responsibilities')) {
            currentSection = 'responsibilities';
            continue;
        }
        if (lowerLine.includes('requirements') || lowerLine.includes('candidate profiles') || lowerLine.includes('eligibility')) {
            currentSection = 'requirements';
            continue;
        }
        if (lowerLine.includes('perks & outcomes') || lowerLine.includes('perks')) {
            currentSection = 'perks';
            continue;
        }

        // Parse lists
        if (line.includes('forms.gle') || line.includes('Apply Here') || line.includes('application link') || line.toLowerCase().includes('apply')) {
            continue;
        }

        if (line.startsWith('*') && line.endsWith('*')) {
            // inline format bold lines - ignored
        } else if (line.startsWith('*') || line.startsWith('👉') || line.startsWith('-')) {
            let cleanLine = line.replace(/^[*👉-]\s*/u, '').trim().replace(/\*/g, '');
            if (currentSection === 'responsibilities') {
                currentJob.responsibilities.push(cleanLine);
            } else if (currentSection === 'requirements') {
                currentJob.requirements.push(cleanLine);
            } else if (currentSection === 'perks') {
                currentJob.perks.push(cleanLine);
            }
        } else {
            let cleanLine = line.trim().replace(/\*/g, '');
            if (currentSection === 'responsibilities') {
                currentJob.responsibilities.push(cleanLine);
            } else if (currentSection === 'requirements') {
                currentJob.requirements.push(cleanLine);
            } else if (currentSection === 'perks') {
                currentJob.perks.push(cleanLine);
            }
        }
    }

    if (currentJob) {
        if (currentJob.responsibilities.length > 0 && !currentJob.desc) {
            currentJob.desc = currentJob.responsibilities[0].split(':')[1]?.trim() || currentJob.responsibilities[0];
        }
        jobs.push(currentJob);
    }
    return jobs;
};

// Initials extractor helper
const getInitials = (name) => {
    if (!name) return 'TR';
    const cleanName = name.replace(/[:.]/g, '').trim();
    const parts = cleanName.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    
    const firstInitial = parts[0].charAt(0).toUpperCase();
    const secondInitial = parts[1].charAt(0).toUpperCase();
    return firstInitial + secondInitial;
};

const Careers = () => {
    const [jobs, setJobs] = useState(defaultJobOpenings);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [failedImages, setFailedImages] = useState({});

    const handleImageError = (id) => {
        setFailedImages(prev => ({
            ...prev,
            [id]: true
        }));
    };
    
    // Quick apply form data (No phone number field is declared or tracked for secure candidate details)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: '',
        coverLetter: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Dynamically fetch and parse 1.txt on mount to enable live updates
    useEffect(() => {
        fetch('/data/1.txt')
            .then(res => {
                if (res.ok) return res.text();
                throw new Error("Local 1.txt file not found");
            })
            .then(text => {
                const parsedJobs = parseJDs(text);
                if (parsedJobs && parsedJobs.length > 0) {
                    setJobs(parsedJobs);
                }
            })
            .catch(err => {
                console.warn("Using pre-populated local JDs as dynamic load failed:", err);
            });
    }, []);

    const handleOpenJD = (job) => {
        setSelectedJob(job);
        setShowApplyForm(false);
        setSubmitted(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate premium cloud API submission
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setSelectedJob(null);
                setShowApplyForm(false);
                setSubmitted(false);
            }, 3500);
        }, 1500);
    };

    const getSocialIcon = (key) => {
        switch (key) {
            case 'linkedin': return 'fab fa-linkedin-in';
            case 'twitter': return 'fab fa-twitter';
            case 'github': return 'fab fa-github';
            case 'instagram': return 'fab fa-instagram';
            default: return 'fas fa-link';
        }
    };

    // Render beautiful initials placeholder with specialized color theme gradients by domain
    const renderInitialsAvatar = (intern) => {
        const initials = getInitials(intern.name);
        let gradient = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
        const teamLower = intern.team.toLowerCase();

        if (teamLower.includes('machine learning') || teamLower.includes('ml')) {
            gradient = 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)';
        } else if (teamLower.includes('generative ai') || teamLower.includes('gen ai')) {
            gradient = 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)';
        } else if (teamLower.includes('software')) {
            gradient = 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)';
        } else if (teamLower.includes('analyst') || teamLower.includes('data')) {
            gradient = 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)';
        } else if (teamLower.includes('hr') || teamLower.includes('talent')) {
            gradient = 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)';
        } else if (teamLower.includes('content')) {
            gradient = 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)';
        } else if (teamLower.includes('embedded')) {
            gradient = 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)';
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.4rem',
                fontFamily: 'var(--font-head)',
                textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                letterSpacing: '0.5px'
            }}>
                {initials}
            </div>
        );
    };

    return (
        <>
            {/* Modal Detail Overlay Form Box - Extremely high z-index avoids navbar disturbance */}
            {selectedJob && (
                <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
                    <div className="modal-content-wrapper glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: showApplyForm ? '600px' : '820px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        
                        {/* 1. Modal Pinned Header */}
                        <div className="modal-header">
                            <div>
                                <span className="modal-badge-role" style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                    {showApplyForm ? 'Quick Application' : 'Internship Track Offer'}
                                </span>
                                <h2 style={{ color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 5px 0', fontFamily: 'var(--font-head)', lineHeight: 1.2 }}>
                                    {selectedJob.title}
                                </h2>
                                <h4 style={{ color: 'var(--secondary-blue)', fontSize: '0.9rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {showApplyForm ? 'Omitted phone details for security' : selectedJob.dept}
                                </h4>
                            </div>
                            <button className="modal-close-btn" onClick={() => setSelectedJob(null)} aria-label="Close modal">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        {/* 2. Modal Scrollable Body */}
                        <div className="modal-body">
                            {!showApplyForm ? (
                                // Full JD Layout Body
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                    {/* Metrics Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '3px' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: '#ef4444' }}></i>{selectedJob.location}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '3px' }}><i className="fas fa-clock" style={{ marginRight: '6px', color: '#3b82f6' }}></i>{selectedJob.duration}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stipend</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '3px' }}><i className="fas fa-wallet" style={{ marginRight: '6px', color: '#10b981' }}></i>{selectedJob.stipend}</div>
                                        </div>
                                        {selectedJob.eligibility && (
                                            <div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Eligibility</div>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '3px' }}><i className="fas fa-user-graduate" style={{ marginRight: '6px', color: '#f59e0b' }}></i>{selectedJob.eligibility}</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* JD text content sections */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                        {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                                            <div>
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px', marginBottom: '12px' }}>
                                                    Key Responsibilities
                                                </h3>
                                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {selectedJob.responsibilities.map((resp, i) => (
                                                        <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            {resp}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                                            <div>
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px', marginBottom: '12px' }}>
                                                    Candidate Requirements
                                                </h3>
                                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {selectedJob.requirements.map((req, i) => (
                                                        <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedJob.perks && selectedJob.perks.length > 0 && (
                                            <div>
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px', marginBottom: '12px' }}>
                                                    Perks & Career Outcomes
                                                </h3>
                                                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {selectedJob.perks.map((perk, i) => (
                                                        <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            {perk}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                // Quick Apply Form Layout Body
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {!submitted ? (
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div className="form-group">
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    value={formData.name} 
                                                    onChange={handleInputChange} 
                                                    required 
                                                    placeholder="Enter your full name" 
                                                    className="careers-form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    value={formData.email} 
                                                    onChange={handleInputChange} 
                                                    required 
                                                    placeholder="name@university.edu" 
                                                    className="careers-form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Resume Link (Google Drive / OneDrive / GitHub)</label>
                                                <input 
                                                    type="url" 
                                                    name="resume" 
                                                    value={formData.resume} 
                                                    onChange={handleInputChange} 
                                                    required 
                                                    placeholder="https://drive.google.com/..." 
                                                    className="careers-form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Brief Note to Recruiter</label>
                                                <textarea 
                                                    name="coverLetter" 
                                                    value={formData.coverLetter} 
                                                    onChange={handleInputChange} 
                                                    rows="3" 
                                                    placeholder="Tell us why you are a great fit for this track..." 
                                                    className="careers-form-input"
                                                    style={{ resize: 'vertical' }}
                                                ></textarea>
                                            </div>
                                        </form>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '50%',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                border: '2px solid #10b981',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#10b981',
                                                fontSize: '2rem',
                                                margin: '0 auto 20px',
                                                boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                                            }}>
                                                <i className="fas fa-check"></i>
                                            </div>
                                            <h2 style={{ color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 10px 0', fontFamily: 'var(--font-head)' }}>Transmission Successful</h2>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto' }}>
                                                Thank you, <strong>{formData.name}</strong>! Your application has been logged and compiled in our candidate database. We will review your profile and reach out shortly.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            {!showApplyForm ? (
                                // JD Apply buttons
                                <div style={{ display: 'flex', width: '100%', gap: '15px' }}>
                                    <a
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSdYN28XX-UcjK2d5rRNk8KqjauKb16ZpqE7XitrO8rWwGgRoA/viewform?usp=header"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 25px', fontSize: '0.9rem', fontWeight: 700, width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                                    >
                                        Apply For This Internship <i className="fas fa-external-link-alt" style={{ fontSize: '0.85rem' }}></i>
                                    </a>
                                </div>
                            ) : (
                                // Form Action buttons
                                !submitted && (
                                    <div style={{ display: 'flex', width: '100%', gap: '15px' }}>
                                        <button 
                                            type="button" 
                                            onClick={() => setShowApplyForm(false)}
                                            className="btn btn-secondary" 
                                            style={{ flex: '1 1 120px', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-main)' }}
                                        >
                                            Back to JD
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={handleSubmit}
                                            className="btn btn-primary" 
                                            disabled={submitting}
                                            style={{ flex: '2 1 200px', padding: '12px', background: submitting ? 'rgba(239, 68, 68, 0.4)' : '' }}
                                        >
                                            {submitting ? (
                                                <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Transmitting...</>
                                            ) : (
                                                <><i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Submit Application</>
                                            )}
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                    </div>
                </div>
            )}

            {/* Page Header Banner */}
            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200')`, height: 'auto', minHeight: '380px', padding: '40px 0' }}>
                <div className="container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
                    <div className="page-header-content" style={{ flex: '1 1 500px', maxWidth: '650px' }}>
                        <h1 className="page-header-title">Careers & Internships</h1>
                        <p className="page-header-desc" style={{ marginBottom: '20px' }}>Join a premier technology learning ecosystem. We are bridging academics and industry by empowering young minds in advanced hardware design, VLSI layouts, embedded networks, and real-world intelligence tracks.</p>
                        <a href="#jobs-list" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                            <i className="fas fa-search" style={{ marginRight: '8px' }}></i> Search Opportunities
                        </a>
                    </div>
                    
                    {/* Visual dashboard element on the right */}
                    <div className="glass-panel" style={{
                        flex: '1 1 400px',
                        maxWidth: '500px',
                        width: '100%',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        zIndex: 1,
                        padding: '25px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(16px)',
                        border: '2px solid rgba(239, 68, 68, 0.35)',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', paddingBottom: '10px' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, letterSpacing: '1px' }}>SYS.PORTAL: RECRUITING</span>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }}></span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="fas fa-laptop-code" style={{ color: '#ef4444', width: '16px' }}></i>
                                    <span><strong>Active Internships:</strong> 11 Specialized Tracks</span>
                                </div>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="fas fa-graduation-cap" style={{ color: '#ef4444', width: '16px' }}></i>
                                    <span><strong>Cohort Setup:</strong> Experience-Based Program</span>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: 1.6, borderTop: '1px solid rgba(239, 68, 68, 0.12)', paddingTop: '10px', marginTop: '5px' }}>
                                // Direct industry partnerships pipeline. Empowering engineering students through structured prototypes milestones.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Opportunities Section */}
            <section id="jobs-list" className="section-padding gallery-page animate-enter" style={{ background: 'var(--bg-dark)', paddingTop: '60px' }}>
                <div className="container">
                    <h2 className="section-title">Active Opportunities</h2>
                    <p className="section-subtitle">Select a Track to Accelerate Your Technical Career</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '40px' }}>
                        {jobs.map(job => (
                            <div key={job.id} className="glass-panel job-card" style={{
                                padding: '30px',
                                borderRadius: '20px',
                                border: '1px solid rgba(239, 68, 68, 0.1)',
                                background: 'var(--bg-panel)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>
                                <div className="job-card-glow" style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.02) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }}></div>
                                
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '15px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{job.dept}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '5px' }}></i> {job.location}</span>
                                    </div>
                                    
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-head)', margin: '0 0 10px 0', lineHeight: 1.3 }}>{job.title}</h3>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{job.type} • {job.stipend}</div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>{job.desc}</p>
                                </div>
                                
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleOpenJD(job)}
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    View Full JD & Apply <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intern Spotlight Section */}
            <section className="section-padding team-section" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(220, 38, 38, 0.08)' }}>
                <div className="container">
                    <h2 className="section-title">Interns Spotlight</h2>
                    <p className="section-subtitle">Our Talented Intern Cohort Grouped by Domain</p>

                    <div style={{ marginTop: '20px' }}>
                        {Object.entries(
                            internsData.reduce((acc, intern) => {
                                const role = intern.team || 'Other Cohort';
                                if (!acc[role]) acc[role] = [];
                                acc[role].push(intern);
                                return acc;
                            }, {})
                        ).map(([roleName, roleInterns]) => (
                            <div key={roleName} className="intern-role-group" style={{ marginBottom: '45px' }}>
                                <div className="intern-role-header">
                                    <span className="intern-role-badge">
                                        <i className={
                                            roleName.toLowerCase().includes('ml') || roleName.toLowerCase().includes('ai') ? 'fas fa-brain' :
                                            roleName.toLowerCase().includes('embedded') || roleName.toLowerCase().includes('h/w') ? 'fas fa-microchip' :
                                            roleName.toLowerCase().includes('software') || roleName.toLowerCase().includes('dev') ? 'fas fa-code' :
                                            roleName.toLowerCase().includes('hr') || roleName.toLowerCase().includes('talent') ? 'fas fa-users-cog' :
                                            roleName.toLowerCase().includes('content') ? 'fas fa-pen-nib' :
                                            roleName.toLowerCase().includes('analyst') ? 'fas fa-chart-line' : 'fas fa-user-graduate'
                                        }></i> {roleName}
                                    </span>
                                    <span className="intern-count-tag">{roleInterns.length} Active {roleInterns.length === 1 ? 'Intern' : 'Interns'}</span>
                                </div>
                                
                                <div className="interns-grid">
                                    {roleInterns.map((intern, i) => {
                                        const lastFour = intern.internId ? intern.internId.slice(-4).toUpperCase() : '';
                                        const hasImage = lastFour && !failedImages[intern.internId];
                                        const imagePath = `/assets/images/interns/${lastFour}.jpg`;

                                        return (
                                            <div key={i} className="intern-card animate-enter">
                                                <div className="intern-card-glow"></div>
                                                <div className="intern-avatar-wrapper">
                                                    {hasImage ? (
                                                        <img 
                                                            src={imagePath} 
                                                            alt={intern.name} 
                                                            onError={() => handleImageError(intern.internId)}
                                                            className="intern-photo-img"
                                                        />
                                                    ) : (
                                                        renderInitialsAvatar(intern)
                                                    )}
                                                </div>
                                                
                                                <hr className="intern-divider" />
                                                
                                                <div className="intern-card-info">
                                                    <h4 className="intern-card-name">{intern.name}</h4>
                                                    <div className="intern-id-badge">
                                                        <span className="id-label">Intern ID:</span>
                                                        <span className="id-val">{intern.internId || 'TR-2026-N/A'}</span>
                                                    </div>
                                                    <div className="intern-card-role">{intern.team}</div>
                                                    {intern.linkedin && (
                                                        <div className="intern-card-socials">
                                                            <a href={intern.linkedin} target="_blank" rel="noopener noreferrer" className="intern-social-link linkedin">
                                                                <i className={getSocialIcon('linkedin')}></i> LinkedIn
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Embedded CSS */}
            <style>{`
                /* Job card hovers */
                .job-card {
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease !important;
                }
                .job-card:hover {
                    transform: translateY(-8px) scale(1.01);
                    border-color: #ef4444 !important;
                    box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15) !important;
                    background-color: var(--bg-card) !important;
                }
                .job-card:hover .job-card-glow {
                    opacity: 1;
                }
                
                /* Form Inputs */
                .careers-form-input {
                    width: 100%; 
                    padding: 10px 15px; 
                    border-radius: 10px; 
                    background: var(--bg-dark); 
                    border: 1px solid rgba(239, 68, 68, 0.15); 
                    color: var(--text-main); 
                    outline: none; 
                    fontSize: 0.9rem;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .careers-form-input:focus {
                    border-color: #ef4444;
                    box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);
                }

                /* --- Interns Section Styling --- */
                .intern-role-group {
                    margin-top: 30px;
                }
                
                .intern-role-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(220, 38, 38, 0.08);
                    margin-bottom: 25px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .intern-role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: var(--text-main);
                    font-family: var(--font-head);
                }
                
                .intern-role-badge i {
                    color: #ef4444;
                }
                
                .intern-count-tag {
                    font-size: 0.75rem;
                    font-weight: 700;
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                    padding: 4px 12px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .interns-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                }
                
                /* Intern Card layout */
                .intern-card {
                    position: relative;
                    background: var(--bg-panel);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(220, 38, 38, 0.1);
                    border-radius: 20px;
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
                }
                
                .intern-card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                
                .intern-card:hover {
                    transform: translateY(-8px);
                    border-color: #ef4444;
                    box-shadow: 0 15px 35px rgba(239, 68, 68, 0.15);
                }
                
                .intern-card:hover .intern-card-glow {
                    opacity: 1;
                }
                
                /* Intern Card Avatar */
                .intern-avatar-wrapper {
                    position: relative;
                    width: 85px;
                    height: 85px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2.5px solid rgba(220, 38, 38, 0.15);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    flex-shrink: 0;
                    z-index: 1;
                    transition: transform 0.4s ease, border-color 0.4s ease;
                }
                .intern-card:hover .intern-avatar-wrapper {
                    border-color: #ef4444;
                    transform: scale(1.08);
                }

                .intern-photo-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    transition: transform 0.4s ease;
                }
                .intern-card:hover .intern-photo-img {
                    transform: scale(1.08);
                }

                /* Sleek separated divider */
                .intern-divider {
                    width: 100%;
                    border: none;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(239, 68, 68, 0.25), transparent);
                    margin: 18px 0;
                    z-index: 1;
                }
                
                /* Intern Card Info */
                .intern-card-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 1;
                    width: 100%;
                    overflow: hidden;
                }
                
                .intern-card-name {
                    font-family: var(--font-head);
                    font-size: 1.15rem;
                    font-weight: 850;
                    color: var(--text-main);
                    margin: 0 0 5px 0;
                    line-height: 1.2;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                }
                
                .intern-id-badge {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    margin-bottom: 6px;
                }
                
                .id-label {
                    font-size: 0.72rem;
                    color: var(--text-muted);
                    font-weight: 600;
                }
                
                .id-val {
                    font-size: 0.75rem;
                    color: #3b82f6;
                    font-weight: 700;
                }
                
                .intern-card-role {
                    font-size: 0.75rem;
                    color: #ef4444;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 12px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                }
                
                /* Social icons inside Intern card */
                .intern-card-socials {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                
                .intern-social-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 16px;
                    border-radius: 30px;
                    background: rgba(0, 119, 181, 0.08);
                    border: 1px solid rgba(0, 119, 181, 0.15);
                    color: #0077b5;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .intern-social-link:hover {
                    background: #0077b5;
                    color: white;
                    border-color: #0077b5;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 119, 181, 0.25);
                }

                /* --- Glassmorphic Modal Backdrop & Wrapper --- */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(9, 13, 22, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 10000000 !important; /* Excludes navbar disturbance completely */
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding: 40px 20px;
                    overflow-y: auto;
                    animation: fadeIn 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-content-wrapper {
                    position: relative;
                    background: var(--bg-panel);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    border-radius: 24px;
                    width: 100%;
                    max-width: 820px;
                    max-height: calc(100vh - 80px);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
                    animation: scaleUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                
                @keyframes scaleUp {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                
                .modal-header {
                    padding: 30px 40px 20px 40px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    position: relative;
                    flex-shrink: 0;
                }
                
                .modal-body {
                    overflow-y: auto;
                    flex: 1;
                    padding: 30px 40px;
                }
                
                .modal-footer {
                    padding: 20px 40px 30px 40px;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                    flex-shrink: 0;
                    display: flex;
                    width: 100%;
                }
                
                /* Close Button */
                .modal-close-btn {
                    position: absolute;
                    top: 30px;
                    right: 40px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    z-index: 10;
                }
                .modal-close-btn:hover {
                    background: #ef4444;
                    color: white;
                    border-color: #ef4444;
                    transform: rotate(90deg);
                }

                @media (max-width: 600px) {
                    .modal-backdrop {
                        padding: 10px 10px;
                    }
                    .modal-content-wrapper {
                        max-height: calc(100vh - 20px);
                        border-radius: 16px;
                    }
                    .modal-header {
                        padding: 20px 20px 15px 20px;
                    }
                    .modal-body {
                        padding: 20px 20px;
                    }
                    .modal-footer {
                        padding: 15px 20px 20px 20px;
                    }
                    .modal-close-btn {
                        top: 15px;
                        right: 15px;
                        width: 32px;
                        height: 32px;
                        font-size: 0.85rem;
                    }
                    .modal-header h2 {
                        padding-right: 40px !important;
                        font-size: 1.25rem !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Careers;
