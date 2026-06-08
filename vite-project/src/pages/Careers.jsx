import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Helper to map Google Sheet JSON columns case-insensitively with no substring collision bugs
const mapJSONHeaders = (cols) => {
    // Replace slashes with spaces to prevent boundary match issues
    const headers = cols.map(c => (c.label || '').trim().toLowerCase().replace(/\//g, ' '));
    
    // Finds column index matching key terms without partial substring overlap collisions
    const findHeader = (terms, exactOnly = false) => {
        return headers.findIndex(h => {
            if (exactOnly) {
                return terms.some(t => h === t);
            }
            return terms.some(t => h === t || h.includes(t));
        });
    };

    const socialPhotoIdx = findHeader(['social photo', 'social media', 'high-resolution', 'introduction']);
    const passportPhotoIdx = findHeader(['passport size', 'id badge', 'passport photo']);
    const genericPhotoIdx = findHeader(['photo', 'image', 'picture']);
    const finalImageIdx = socialPhotoIdx >= 0 ? socialPhotoIdx : (passportPhotoIdx >= 0 ? passportPhotoIdx : genericPhotoIdx);

    return {
        internId: findHeader(['intern id', 'id', 'intern_id', 'member id'], true),
        name: findHeader(['full name', 'full legal name', 'name', 'legal name']),
        email: findHeader(['email', 'email address']),
        role: findHeader(['role', 'role/position', 'designation', 'domain', 'position you are joining']),
        department: findHeader(['department', 'dept']),
        image: finalImageIdx,
        linkedin: findHeader(['linkedin', 'linkedin profile url', 'linkedin profile', 'linkedin url']),
        github: findHeader(['github', 'github url', 'github profile']),
        portfolio: findHeader(['portfolio', 'portfolio url', 'website', 'personal url']),
        status: findHeader(['status', 'intern status']),
        bio: findHeader(['bio', 'about', 'biography', 'about me', 'introduce yourself']),
        skills: findHeader(['skills', 'expertise', 'skillsets']),
        batch: findHeader(['batch', 'cohort']),
        joiningDate: findHeader(['date of joining', 'joining date', 'start date', 'joining_date']),
        visibility: findHeader(['visibility', 'profile visibility', 'show profile']),
        university: findHeader(['college', 'university', 'college/university attended', 'institution'])
    };
};

// Helper to transform Google Drive view links to direct thumbnail image URLs
const transformDriveUrl = (url) => {
    if (!url) return '';
    
    // Split by comma in case Google Forms uploaded multiple files in the same cell, and take the first link
    const firstUrl = url.split(',')[0].trim();
    
    if (firstUrl.includes('drive.google.com')) {
        let fileId = '';
        
        // Matches open?id=... or uc?id=... or any other query param id=...
        const idMatch = firstUrl.match(/[?&]id=([^&,\s]+)/);
        if (idMatch) {
            fileId = idMatch[1];
        } else {
            // Matches file/d/.../view or file/d/.../edit etc.
            const dMatch = firstUrl.match(/\/file\/d\/([^\/?&,\s]+)/);
            if (dMatch) {
                fileId = dMatch[1];
            }
        }
        
        if (fileId) {
            return `https://lh3.googleusercontent.com/d/${fileId}?cb=2`;
        }
    }
    return firstUrl;
};

// Helper to derive department from role text when the department column is missing in the sheet
const deriveDepartment = (roleStr) => {
    if (!roleStr) return 'General';
    const lower = roleStr.toLowerCase();
    if (lower.includes('hardware') || lower.includes('pcb') || lower.includes('electronics')) {
        return 'Hardware Engineering';
    }
    if (lower.includes('embedded') || lower.includes('iot') || lower.includes('robotics')) {
        return 'Ecosystem R&D';
    }
    if (lower.includes('software') || lower.includes('web') || lower.includes('developer') || lower.includes('sde') || lower.includes('platform')) {
        return 'Platform Engineering';
    }
    if (lower.includes('machine learning') || lower.includes('ml') || lower.includes('gen ai') || lower.includes('generative') || lower.includes('ai')) {
        return 'Advanced Tech Hub';
    }
    if (lower.includes('hr') || lower.includes('resource') || lower.includes('talent')) {
        return 'HR & Talent';
    }
    if (lower.includes('content') || lower.includes('writing') || lower.includes('creative') || lower.includes('media')) {
        return 'Creative & AI Hub';
    }
    if (lower.includes('marketing') || lower.includes('strategy') || lower.includes('analyst') || lower.includes('business')) {
        return 'Marketing & Strategy';
    }
    return 'General';
};

// Parser to extract dynamic intern rows from Google Sheet Viz API output
const parseGoogleSheetJSON = (jsonText) => {
    try {
        const startIdx = jsonText.indexOf('{');
        const endIdx = jsonText.lastIndexOf('}');
        if (startIdx === -1 || endIdx === -1) return [];

        const rawData = JSON.parse(jsonText.substring(startIdx, endIdx + 1));
        if (!rawData || !rawData.table || !rawData.table.cols || !rawData.table.rows) return [];

        const cols = rawData.table.cols;
        const rows = rawData.table.rows;
        const headersMap = mapJSONHeaders(cols);

        const list = [];
        for (const row of rows) {
            if (!row || !row.c) continue;

            const getValue = (idx) => {
                if (idx < 0 || idx >= row.c.length || !row.c[idx]) return '';
                // Check if it is a date object value from Google Sheet
                const val = row.c[idx].v;
                if (val === null || val === undefined) return '';
                if (typeof val === 'string' && val.startsWith('Date(')) {
                    // Try parsing Date(2026,5,7) format
                    const match = val.match(/Date\((\d+),(\d+),(\d+)\)/);
                    if (match) {
                        const yr = parseInt(match[1]);
                        const mo = parseInt(match[2]) + 1; // Month index starts at 0 in sheets Viz API
                        const dy = parseInt(match[3]);
                        return `${dy}/${mo}/${yr}`;
                    }
                }
                return String(val).trim();
            };

            const name = getValue(headersMap.name);
            const rawInternId = getValue(headersMap.internId);
            const email = getValue(headersMap.email);
            const role = getValue(headersMap.role);
            const rawDepartment = getValue(headersMap.department);
            const rawImage = getValue(headersMap.image);
            const image = transformDriveUrl(rawImage);
            const rawLinkedin = getValue(headersMap.linkedin);
            const linkedin = rawLinkedin ? (
                (rawLinkedin.startsWith('http://') || rawLinkedin.startsWith('https://'))
                ? rawLinkedin
                : `https://www.linkedin.com/in/${rawLinkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, '').replace(/^\/+|\/+$/g, '')}`
            ) : '';
            const github = getValue(headersMap.github);
            const portfolio = getValue(headersMap.portfolio);
            const status = headersMap.status >= 0 ? getValue(headersMap.status) : 'Active';
            const bio = getValue(headersMap.bio);
            const skills = getValue(headersMap.skills);
            const batch = headersMap.batch >= 0 ? getValue(headersMap.batch) : 'Batch 2026';
            const rawJoiningDate = getValue(headersMap.joiningDate);
            const visibility = headersMap.visibility >= 0 ? getValue(headersMap.visibility) : 'Show';
            const university = headersMap.university >= 0 ? getValue(headersMap.university) : '';

            if (!name) continue;

            // Stable ID fallback hashing name/email to prevent ID recreation page reload crashes
            const internId = rawInternId || (email 
                ? `TR-INT-${email.split('@')[0].toUpperCase().replace(/[^A-Z0-9]/g, '')}`
                : `TR-INT-${name.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 8)}`);

            const department = rawDepartment || deriveDepartment(role);
            const joiningDate = rawJoiningDate || getValue(0).split(' ')[0]; // Onboarding Date fallback

            list.push({
                name,
                internId,
                email,
                role: role || 'Intern',
                department,
                image,
                linkedin,
                github,
                portfolio,
                status,
                bio,
                skills,
                batch,
                joiningDate,
                visibility,
                university
            });
        }

        // Filter: Active status and profile visibility is Show
        const activeList = list.filter(item => {
            const isActive = item.status.trim().toLowerCase() === 'active';
            const isVisible = item.visibility.trim().toLowerCase() !== 'hide' && item.visibility.trim().toLowerCase() !== 'private';
            return isActive && isVisible;
        });

        // Prevent duplicates (by internId)
        const uniqueList = [];
        const seen = new Set();
        for (const item of activeList) {
            const key = item.internId.trim();
            if (!seen.has(key)) {
                seen.add(key);
                uniqueList.push(item);
            }
        }

        // Newest submissions are appended at the bottom, so reverse to sort newest first
        return uniqueList.reverse();
    } catch (e) {
        console.error("Error parsing Google Sheet JSON:", e);
        return [];
    }
};

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
    const { profileId } = useParams();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState(defaultJobOpenings);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [failedImages, setFailedImages] = useState({});

    // Dynamic Sheet Interns State
    const [interns, setInterns] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

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

    // Load from cache first, then fetch Google Sheet Viz JSON
    useEffect(() => {
        // 1. Try to load from localStorage cache first
        try {
            const cached = localStorage.getItem('techroxx_talent_directory_v2');
            if (cached) {
                setInterns(JSON.parse(cached));
            }
        } catch (e) {
            console.warn("Failed to read from localStorage cache:", e);
        }

        // 2. Fetch fresh JSON from Google Sheet
        const sheetId = "1TrsfS_gtt_9x8gA9QOLi4dJRlagl8ZhCo6UC9Fj5LyQ";
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

        fetch(sheetUrl)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch Google Sheet JSON");
                return res.text();
            })
            .then(text => {
                const parsed = parseGoogleSheetJSON(text);
                if (parsed && parsed.length > 0) {
                    setInterns(parsed);
                    try {
                        localStorage.setItem('techroxx_talent_directory_v2', JSON.stringify(parsed));
                    } catch (e) {
                        console.warn("Failed to write to localStorage cache:", e);
                    }
                }
            })
            .catch(err => {
                console.error("Google Sheet dynamic load failed. Operating on local cache.", err);
            });
    }, []);

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

    // Derive unique departments and roles from loaded interns
    const uniqueDepts = [...new Set(interns.map(i => i.department).filter(Boolean))].sort();
    const uniqueRoles = [...new Set(interns.map(i => i.role).filter(Boolean))].sort();

    // Filter interns
    const filteredInterns = interns.filter(intern => {
        const query = searchQuery.toLowerCase();
        const name = (intern.name || '').toLowerCase();
        const id = (intern.internId || '').toLowerCase();
        const role = (intern.role || '').toLowerCase();
        const dept = (intern.department || '').toLowerCase();
        const skills = (intern.skills || '').toLowerCase();
        const bio = (intern.bio || '').toLowerCase();
        
        const matchesSearch = 
            name.includes(query) ||
            id.includes(query) ||
            role.includes(query) ||
            dept.includes(query) ||
            skills.includes(query) ||
            bio.includes(query);
            
        const matchesDept = !selectedDept || intern.department === selectedDept;
        const matchesRole = !selectedRole || intern.role === selectedRole;
        
        return matchesSearch && matchesDept && matchesRole;
    });

    // Render beautiful initials placeholder with specialized color theme gradients by domain
    const renderInitialsAvatar = (intern, isLarge = false) => {
        const initials = getInitials(intern.name);
        let gradient = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
        const teamLower = (intern.role || intern.department || '').toLowerCase();

        if (teamLower.includes('machine learning') || teamLower.includes('ml')) {
            gradient = 'linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-navy) 100%)';
        } else if (teamLower.includes('generative ai') || teamLower.includes('gen ai')) {
            gradient = 'linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-navy) 100%)';
        } else if (teamLower.includes('software') || teamLower.includes('web') || teamLower.includes('dev')) {
            gradient = 'linear-gradient(135deg, #64748b 0%, #334155 100%)';
        } else if (teamLower.includes('analyst') || teamLower.includes('data')) {
            gradient = 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';
        } else if (teamLower.includes('hr') || teamLower.includes('talent')) {
            gradient = 'linear-gradient(135deg, var(--primary-brand) 0%, var(--secondary-blue) 100%)';
        } else if (teamLower.includes('content') || teamLower.includes('writing')) {
            gradient = 'linear-gradient(135deg, var(--primary-brand) 0%, #ffedd5 100%)';
        } else if (teamLower.includes('embedded') || teamLower.includes('hardware') || teamLower.includes('pcb')) {
            gradient = 'linear-gradient(135deg, var(--primary-brand) 0%, #7c2d12 100%)';
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
                fontSize: isLarge ? '3.5rem' : '1.4rem',
                fontFamily: 'var(--font-head)',
                textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                letterSpacing: '0.5px'
            }}>
                {initials}
            </div>
        );
    };

    // Early return for individual profile subview
    if (profileId) {
        const intern = interns.find(i => String(i.internId).trim() === String(profileId).trim());
        
        if (!intern) {
            return (
                <div style={{ background: 'var(--bg-dark)', minHeight: '80vh', padding: '100px 0', display: 'flex', alignItems: 'center' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4.5rem', color: 'var(--primary-brand)', marginBottom: '25px', filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.3))' }}>
                            <i className="fas fa-user-slash"></i>
                        </div>
                        <h2 style={{ color: 'var(--text-main)', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-head)', marginBottom: '15px' }}>Profile Not Found</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 35px', lineHeight: 1.6 }}>
                            The intern profile you requested does not exist, is inactive, or has visibility restrictions.
                        </p>
                        <button 
                            onClick={() => navigate('/careers')} 
                            className="profile-back-btn"
                        >
                            <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i> Return to Directory
                        </button>
                    </div>
                </div>
            );
        }

        // Parse skills comma separated string to tags array
        const skillsList = intern.skills 
            ? intern.skills.split(',').map(s => s.trim()).filter(Boolean) 
            : [];

        // Image fallback setup
        const lastFour = intern.internId ? intern.internId.slice(-4).toUpperCase() : '';
        let imageUrl = '';
        if (intern.image && (intern.image.startsWith('http') || intern.image.startsWith('/') || intern.image.startsWith('data:'))) {
            imageUrl = intern.image;
        } else if (lastFour) {
            imageUrl = `/assets/images/interns/${lastFour}.jpg`;
        }
        const hasImage = imageUrl && !failedImages[intern.internId];

        return (
            <div className="px-4 md:px-8 py-6 md:py-10" style={{ background: 'var(--bg-dark)', minHeight: '85vh', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.05)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.04)', filter: 'blur(100px)', pointerEvents: 'none' }}></div>

                <div className="container max-w-[960px] mx-auto px-4">
                    <button 
                        onClick={() => navigate('/careers')} 
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900/80 hover:bg-[#ea580c] text-white font-bold rounded-full border border-red-500/15 hover:border-[#ea580c] transition-all duration-300 hover:-translate-x-1 hover:shadow-lg hover:shadow-red-500/25 cursor-pointer mb-5 text-sm"
                    >
                        <i className="fas fa-arrow-left"></i> Back to Intern Directory
                    </button>

                    <div className="relative bg-[var(--bg-panel)] border border-[var(--primary-brand)]/20 rounded-3xl overflow-hidden shadow-2xl z-10 animate-enter">
                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
                            <div className="md:col-span-5 relative bg-slate-950 overflow-hidden flex items-center justify-center h-[280px] md:h-auto md:min-h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ea580c]/10 to-slate-500/10 z-0"></div>
                                {hasImage ? (
                                    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                                        {/* Blurred background glow to fill space premium-style */}
                                        <img 
                                            src={imageUrl} 
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
                                        />
                                        {/* Crisp foreground image displaying full content without vertical cropping */}
                                        <img 
                                            src={imageUrl} 
                                            alt={`${intern.name} - ${intern.role}`} 
                                            onError={() => handleImageError(intern.internId)}
                                            className="w-full h-full object-contain relative z-10 p-2 transition-all duration-700 hover:scale-[1.02]"
                                        />
                                    </div>
                                ) : (
                                    renderInitialsAvatar(intern, true)
                                )}
                            </div>
                            
                            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-[var(--bg-card)]/30">
                                <span className="inline-block self-start bg-[var(--primary-brand)]/8 text-[var(--primary-brand)] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">Active Intern</span>
                                <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[var(--primary-brand)]/10 to-[var(--primary-brand)]/3 border border-[var(--primary-brand)]/20 border-l-4 border-l-[var(--primary-brand)] px-5 py-3 rounded-xl mb-3 leading-tight w-full block">
                                    <span className="text-[var(--text-main)] drop-shadow-[0_2px_8px_rgba(234,88,12,0.1)]">
                                        {intern.name}
                                    </span>
                                </h1>
                                <h4 className="text-xs md:text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">{intern.role}</h4>
                                
                                <div className="bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] border-l-4 border-l-[var(--primary-brand)] p-4 md:p-5 rounded-xl mb-4">
                                    <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                                        {intern.bio || "This intern is currently scaling up their technical profiles. A professional biography will be uploaded shortly as onboarding milestones are completed."}
                                    </p>
                                </div>
                                
                                <div className="bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] p-4 md:p-5 rounded-xl mb-4">
                                    <h5 className="text-xs font-black text-[var(--text-main)] uppercase tracking-wider mb-3">Skills & Expertise</h5>
                                    {skillsList.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {skillsList.map((skill, idx) => (
                                                <span key={idx} className="text-[10px] md:text-xs font-bold text-[var(--text-main)] bg-[var(--bg-panel)] border border-[var(--glass-border)] px-2.5 py-1.5 rounded-md hover:border-[var(--primary-brand)] hover:bg-[var(--primary-brand)]/5 transition-all duration-300 hover:-translate-y-[1px]">{skill}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs font-medium italic text-[var(--text-muted)]">Skills list is compiling from onboarding registration forms.</p>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center justify-between text-xs md:text-sm p-3.5 bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] rounded-xl hover:bg-[var(--primary-brand)]/5 hover:border-[var(--primary-brand)]/20 transition-all duration-300">
                                        <span className="text-[var(--text-muted)] font-semibold flex items-center gap-2"><i className="fas fa-id-card text-[var(--primary-brand)] text-sm"></i> Intern ID:</span>
                                        <span className="bg-[var(--primary-brand)]/8 text-[var(--primary-brand)] px-2.5 py-1 rounded-md text-xs font-bold">{intern.internId}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs md:text-sm p-3.5 bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] rounded-xl hover:bg-[var(--primary-brand)]/5 hover:border-[var(--primary-brand)]/20 transition-all duration-300">
                                        <span className="text-[var(--text-muted)] font-semibold flex items-center gap-2"><i className="fas fa-sitemap text-[var(--primary-brand)] text-sm"></i> Department:</span>
                                        <span className="bg-[var(--primary-brand)]/8 text-[var(--primary-brand)] px-2.5 py-1 rounded-md text-xs font-bold">{intern.department}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs md:text-sm p-3.5 bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] rounded-xl hover:bg-[var(--primary-brand)]/5 hover:border-[var(--primary-brand)]/20 transition-all duration-300">
                                        <span className="text-[var(--text-muted)] font-semibold flex items-center gap-2"><i className="fas fa-users text-[var(--primary-brand)] text-sm"></i> Batch:</span>
                                        <span className="bg-[var(--primary-brand)]/8 text-[var(--primary-brand)] px-2.5 py-1 rounded-md text-xs font-bold">{intern.batch}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs md:text-sm p-3.5 bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] rounded-xl hover:bg-[var(--primary-brand)]/5 hover:border-[var(--primary-brand)]/20 transition-all duration-300">
                                        <span className="text-[var(--text-muted)] font-semibold flex items-center gap-2"><i className="fas fa-calendar-alt text-[var(--primary-brand)] text-sm"></i> Joined:</span>
                                        <span className="bg-[var(--primary-brand)]/8 text-[var(--primary-brand)] px-2.5 py-1 rounded-md text-xs font-bold">{intern.joiningDate || 'N/A'}</span>
                                    </div>
                                    {intern.university && (
                                        <div className="sm:col-span-2 flex items-center justify-between text-xs md:text-sm p-3.5 bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] rounded-xl hover:bg-[var(--primary-brand)]/5 hover:border-[var(--primary-brand)]/20 transition-all duration-300">
                                            <span className="text-[var(--text-muted)] font-semibold flex items-center gap-2"><i className="fas fa-graduation-cap text-[var(--primary-brand)] text-sm"></i> College:</span>
                                            <span className="bg-[var(--primary-brand)]/8 text-[var(--primary-brand)] px-2.5 py-1 rounded-md text-xs font-bold">{intern.university}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-wrap gap-2.5 mt-2">
                                    {intern.linkedin ? (
                                        <a href={intern.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0077b5]/15 text-[#0077b5] border border-[#0077b5]/20 hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#0077b5]/10">
                                            <i className="fab fa-linkedin-in"></i> LinkedIn
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--bg-dark)]/30 text-[var(--text-muted)]/50 border border-[var(--glass-border)] cursor-not-allowed opacity-60"><i className="fab fa-linkedin-in"></i> LinkedIn</span>
                                    )}

                                    {intern.github ? (
                                        <a href={intern.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-white/5 text-[var(--text-main)] border border-[var(--glass-border)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                            <i className="fab fa-github"></i> GitHub
                                        </a>
                                    ) : null}

                                    {intern.portfolio ? (
                                        <a href={intern.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/20 hover:bg-[#3b82f6] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#3b82f6]/10">
                                            <i className="fas fa-globe"></i> Portfolio
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Modal Detail Overlay Form Box - Extremely high z-index avoids navbar disturbance */}
            {selectedJob && (
                <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
                    <div className="modal-content-wrapper glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: showApplyForm ? '600px' : '820px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        
                        {/* 1. Modal Pinned Header */}
                        <div className="modal-header">
                            <div>
                                <span className="modal-badge-role" style={{ display: 'inline-block', background: 'rgba(234, 88, 12, 0.08)', color: 'var(--primary-brand)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
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
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px', background: 'var(--bg-dark)', padding: '20px', borderRadius: '16px', border: 'var(--glass-border)' }}>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '3px' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: 'var(--primary-brand)' }}></i>{selectedJob.location}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '3px' }}><i className="fas fa-clock" style={{ marginRight: '6px', color: 'var(--secondary-blue)' }}></i>{selectedJob.duration}</div>
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
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, borderBottom: 'var(--glass-border)', paddingBottom: '6px', marginBottom: '12px' }}>
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
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, borderBottom: 'var(--glass-border)', paddingBottom: '6px', marginBottom: '12px' }}>
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
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, borderBottom: 'var(--glass-border)', paddingBottom: '6px', marginBottom: '12px' }}>
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
                                            style={{ flex: '1 1 120px', padding: '12px', background: 'var(--bg-dark)', border: 'var(--glass-border)', color: 'var(--text-main)' }}
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
                                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--primary-brand)', fontWeight: 700, letterSpacing: '1px' }}>SYS.PORTAL: RECRUITING</span>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-brand)', boxShadow: '0 0 10px var(--primary-brand)' }}></span>
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
                                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '15px', background: 'rgba(100, 116, 139, 0.1)', color: 'var(--secondary-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{job.dept}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-brand)' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '5px' }}></i> {job.location}</span>
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

                    {/* Search & Filter Controls */}
                    <div className="directory-filters-bar">
                        <div className="filter-input-group">
                            <i className="fas fa-search filter-search-icon"></i>
                            <input 
                                type="text" 
                                placeholder="Search interns by name, ID, skills..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="filter-search-input"
                            />
                        </div>
                        <div className="filter-select-group">
                            <div className="select-wrapper">
                                <i className="fas fa-sitemap select-icon"></i>
                                <select 
                                    value={selectedDept} 
                                    onChange={(e) => setSelectedDept(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">All Departments</option>
                                    {uniqueDepts.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="select-wrapper">
                                <i className="fas fa-tag select-icon"></i>
                                <select 
                                    value={selectedRole} 
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">All Roles</option>
                                    {uniqueRoles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        {filteredInterns.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-panel)', borderRadius: '20px', border: '1px dashed rgba(239, 68, 68, 0.2)', marginTop: '30px' }}>
                                <i className="fas fa-users-slash" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '15px' }}></i>
                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontFamily: 'var(--font-head)', marginBottom: '8px' }}>
                                    {interns.length === 0 ? 'Intern profiles will be updated soon.' : 'No Profiles Match Your Filters'}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                                    {interns.length === 0 
                                        ? 'Our onboarding portal is compiling profile documents. Check back shortly.' 
                                        : 'Try adjusting your search terms or clearing your category filters.'}
                                </p>
                                {interns.length > 0 && (
                                    <button 
                                        onClick={() => { setSearchQuery(''); setSelectedDept(''); setSelectedRole(''); }} 
                                        className="btn btn-secondary" 
                                        style={{ marginTop: '15px', padding: '8px 20px', fontSize: '0.85rem' }}
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            Object.entries(
                                filteredInterns.reduce((acc, intern) => {
                                    const role = intern.role || 'Other Cohort';
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
                                                roleName.toLowerCase().includes('embedded') || roleName.toLowerCase().includes('h/w') || roleName.toLowerCase().includes('hardware') ? 'fas fa-microchip' :
                                                roleName.toLowerCase().includes('software') || roleName.toLowerCase().includes('dev') || roleName.toLowerCase().includes('web') ? 'fas fa-code' :
                                                roleName.toLowerCase().includes('hr') || roleName.toLowerCase().includes('talent') || roleName.toLowerCase().includes('onboarding') ? 'fas fa-users-cog' :
                                                roleName.toLowerCase().includes('content') || roleName.toLowerCase().includes('writing') ? 'fas fa-pen-nib' :
                                                roleName.toLowerCase().includes('analyst') || roleName.toLowerCase().includes('marketing') ? 'fas fa-chart-line' : 'fas fa-user-graduate'
                                            }></i> {roleName}
                                        </span>
                                        <span className="intern-count-tag">{roleInterns.length} Active {roleInterns.length === 1 ? 'Intern' : 'Interns'}</span>
                                    </div>
                                    
                                    <div className="interns-grid">
                                        {roleInterns.map((intern, i) => {
                                            const lastFour = intern.internId ? intern.internId.slice(-4).toUpperCase() : '';
                                            let imageUrl = '';
                                            if (intern.image && (intern.image.startsWith('http') || intern.image.startsWith('/') || intern.image.startsWith('data:'))) {
                                                imageUrl = intern.image;
                                            } else if (lastFour) {
                                                imageUrl = `/assets/images/interns/${lastFour}.jpg`;
                                            }
                                            const hasImage = imageUrl && !failedImages[intern.internId];

                                            return (
                                                <div 
                                                    key={i} 
                                                    className="intern-card animate-enter"
                                                    onClick={() => navigate(`/careers/${intern.internId}`)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="intern-card-glow"></div>
                                                    <div className="intern-avatar-wrapper">
                                                        {hasImage ? (
                                                            <img 
                                                                src={imageUrl} 
                                                                alt={intern.name} 
                                                                onError={() => handleImageError(intern.internId)}
                                                                className="intern-photo-img"
                                                            />
                                                        ) : (
                                                            renderInitialsAvatar(intern)
                                                        )}
                                                        <div className="intern-hover-overlay">
                                                            <span className="overlay-view-profile">View Profile <i className="fas fa-chevron-right"></i></span>
                                                        </div>
                                                    </div>
                                                    
                                                    <hr className="intern-divider" />
                                                    
                                                    <div className="intern-card-info">
                                                        <h4 className="intern-card-name">{intern.name}</h4>
                                                        <div className="intern-id-badge">
                                                            <span className="id-label">Intern ID:</span>
                                                            <span className="id-val">{intern.internId || 'TR-2026-N/A'}</span>
                                                        </div>
                                                        <div className="intern-card-role">{intern.role}</div>
                                                        
                                                        <div className="intern-card-socials-row">
                                                            {intern.linkedin && (
                                                                <a 
                                                                    href={intern.linkedin} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer" 
                                                                    className="intern-card-social-icon linkedin"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <i className="fab fa-linkedin-in"></i>
                                                                </a>
                                                            )}
                                                            {intern.github && (
                                                                <a 
                                                                    href={intern.github} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer" 
                                                                    className="intern-card-social-icon github"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <i className="fab fa-github"></i>
                                                                </a>
                                                            )}
                                                            {intern.portfolio && (
                                                                <a 
                                                                    href={intern.portfolio} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer" 
                                                                    className="intern-card-social-icon portfolio"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <i className="fas fa-globe"></i>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
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
                    border-color: var(--primary-brand) !important;
                    box-shadow: 0 20px 40px rgba(234, 88, 12, 0.15) !important;
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
                    border: 1px solid rgba(234, 88, 12, 0.15); 
                    color: var(--text-main); 
                    outline: none; 
                    fontSize: 0.9rem;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .careers-form-input:focus {
                    border-color: var(--primary-brand);
                    box-shadow: 0 0 10px rgba(234, 88, 12, 0.15);
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
                    border-bottom: 1px solid rgba(234, 88, 12, 0.08);
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
                    color: var(--primary-brand);
                }
                
                .intern-count-tag {
                    font-size: 0.75rem;
                    font-weight: 700;
                    background: rgba(100, 116, 139, 0.1);
                    color: var(--secondary-blue);
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
                    border: 1px solid rgba(234, 88, 12, 0.1);
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
                    background: radial-gradient(circle, rgba(234, 88, 12, 0.03) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                
                .intern-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--primary-brand);
                    box-shadow: 0 15px 35px rgba(234, 88, 12, 0.15);
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
                    background: linear-gradient(to right, transparent, rgba(234, 88, 12, 0.25), transparent);
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
                    color: var(--secondary-blue);
                    font-weight: 700;
                }
                
                .intern-card-role {
                    font-size: 0.75rem;
                    color: var(--primary-brand);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 12px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                }
                
                /* --- Directory Filter Controls --- */
                .directory-filters-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-top: 30px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                
                .filter-input-group {
                    position: relative;
                    flex: 1 1 300px;
                }
                
                .filter-search-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    pointer-events: none;
                }
                
                .filter-search-input {
                    width: 100%;
                    padding: 12px 15px 12px 42px;
                    border-radius: 30px;
                    background: var(--bg-panel);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    color: var(--text-main);
                    outline: none;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                }
                
                .filter-search-input:focus {
                    border-color: var(--primary-brand);
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.15);
                    background: var(--bg-card);
                }
                
                .filter-select-group {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                    flex: 1 1 auto;
                    justify-content: flex-end;
                }
                
                .select-wrapper {
                    position: relative;
                    min-width: 180px;
                    flex: 1 1 180px;
                }
                
                .select-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--primary-brand);
                    font-size: 0.85rem;
                    pointer-events: none;
                }
                
                .filter-select {
                    width: 100%;
                    padding: 12px 35px 12px 40px;
                    border-radius: 30px;
                    background: var(--bg-panel);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    color: var(--text-main);
                    outline: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    appearance: none;
                    -webkit-appearance: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                }
                
                .filter-select:focus {
                    border-color: var(--primary-brand);
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.15);
                }
                
                .select-wrapper::after {
                    content: '\f0d7';
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    position: absolute;
                    right: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                    pointer-events: none;
                    font-size: 0.8rem;
                }

                /* --- Card Avatar Overlay --- */
                .intern-hover-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(9, 13, 22, 0.75);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .intern-avatar-wrapper:hover .intern-hover-overlay {
                    opacity: 1;
                }
                
                .overlay-view-profile {
                    color: #ffffff;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transform: translateY(5px);
                    transition: transform 0.3s ease;
                }
                
                .intern-avatar-wrapper:hover .overlay-view-profile {
                    transform: translateY(0);
                }

                /* --- Card Social Row --- */
                .intern-card-socials-row {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 5px;
                }
                
                .intern-card-social-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(234, 88, 12, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .intern-card-social-icon:hover {
                    transform: translateY(-2px);
                    border-color: var(--primary-brand);
                    color: var(--primary-brand);
                    box-shadow: 0 4px 10px rgba(234, 88, 12, 0.15);
                }
                
                .intern-card-social-icon.linkedin:hover {
                    background: rgba(0, 119, 181, 0.1);
                    color: #0077b5;
                    border-color: #0077b5;
                }
                
                .intern-card-social-icon.github:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #ffffff;
                    border-color: #ffffff;
                }
                
                .intern-card-social-icon.portfolio:hover {
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                    border-color: #3b82f6;
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
                    border: 1px solid rgba(234, 88, 12, 0.15);
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
                    border-bottom: var(--glass-border);
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
                    border-top: var(--glass-border);
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
                    background: var(--bg-dark);
                    border: var(--glass-border);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    z-index: 10;
                }
                .modal-close-btn:hover {
                    background: var(--primary-brand);
                    color: white;
                    border-color: var(--primary-brand);
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
