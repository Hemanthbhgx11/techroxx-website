import React, { useState, useEffect, useRef } from 'react';
// --- FIXED IMPORTS ---
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import leader from './img/hemanth_burra.jpg';

import logo from './img/logo_techroxx.jpg';
// --- DATA STORES ---

const programData = {
    'workshops': [
        { 
            title: "IoT Workshop Highlights", 
            desc: "Watch the highlights of our successful IoT workshop! Click to view on Instagram.", 
            date: "Past Event",
            link: "https://www.instagram.com/reel/DRFlttsCrDj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        }
    ],
    'webservices': [
        { title: "KSP Publishers", desc: "Our previous design for KSP Publishers.", date: "Live Project", link: "https://ksp-publishers.vercel.app/" },
        { title: "Portfolio Design 1", desc: "A sample personal portfolio design.", date: "Live Project", link: "https://portfolio-pied-six-10e9y1cn8c.vercel.app/" },
        { title: "Portfolio Design 2", desc: "Advanced portfolio design showcase.", date: "Live Project", link: "https://hemanthgoudburra-portfolio.vercel.app/" },
        { title: "HR Assist", desc: "HR Management System Project.", date: "Live Project", link: "https://hr-assist-omega.vercel.app/" }
    ],
    'webinars': [{ title: "Upcoming Webinars", desc: "For more details and pricing contact us on mobile 9550251208", date: "Contact Us" }],
    'hackathons': [{ title: "Upcoming Hackathons", desc: "For more details and pricing contact us on mobile 9550251208", date: "Contact Us" }],
    'meetups': [{ title: "Community Meetups", desc: "For more details and pricing contact us on mobile 9550251208", date: "Contact Us" }],
    'projects': [{ title: "Real-Time Projects", desc: "For more details and pricing contact us on mobile 9550251208", date: "Contact Us" }],
    'internships': [{ title: "Internship Assistance", desc: "We post regular internship and job updates exclusively in our WhatsApp Community. Join now to stay updated!", date: "Ongoing Updates", link: "https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" }],
    'placement': [{ title: "Placement Guide", desc: "Get regular job alerts and placement updates in our dedicated WhatsApp Community. Join now!", date: "Ongoing Updates", link: "https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" }],
    'roadmaps': [{ title: "Industry Roadmaps", desc: "For more details and pricing contact us on mobile 9550251208", date: "Contact Us" }],
    'certifications': [{ title: "Certification Programs", desc: "For more details and pricing contact us on mobile 9550251208", date: "Contact Us" }]
};

const consultancyData = {
    'real-estate': { title: 'Real Estate Consultancy', icon: 'fa-home', content: 'We provide expert advice on buying, selling, and investing in property. Our team helps you navigate the complex real estate market with confidence.' },
    'admissions': { title: 'Admissions Guidance', icon: 'fa-university', content: 'Get comprehensive guidance for school and college admission processes. We help students select the right institutions.' },
    'foreign-education': { title: 'Foreign Education', icon: 'fa-globe-americas', content: 'Dreaming of studying abroad? We offer end-to-end services including university selection, visa processing, scholarship assistance.' },
    'product-sales': { title: 'Product Sale Assistance', icon: 'fa-shopping-cart', content: 'Boost your product sales with our strategic assistance. We analyze market trends and optimize your sales channels.' },
    'r-and-d': { title: 'R&D Support', icon: 'fa-flask', content: 'Innovation is key to growth. We provide Research and Development support for startups and established companies.' },
    'stem': { title: 'STEM Initiatives', icon: 'fa-atom', content: 'We offer specialized consultancy for Science, Technology, Engineering, and Mathematics initiatives.' }
};

const departmentData = {
    'computing': {
        title: "Dept. of Computing",
        subtitle: "CSE / MCA / BCA / B.Com",
        bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", 
        technologies: [
            { id: "foundations", name: "PROGRAMMING & COMPUTING FOUNDATIONS", desc: "Master the core syntax, OOP concepts, and essential tools like Git & Linux." },
            { id: "dsa", name: "DATA STRUCTURES & ALGORITHMS (DSA)", desc: "Ace technical interviews with optimization, trees, graphs, and dynamic programming." },
            { id: "ai-ml", name: "AI / MACHINE LEARNING", desc: "Build predictive models using Python, Scikit-learn, and statistical analysis." },
            { id: "dl-cv", name: "DEEP LEARNING & COMPUTER VISION", desc: "Create vision-based apps with CNNs, TensorFlow, PyTorch, and OpenCV." },
            { id: "gen-ai", name: "GENERATIVE & AGENTIC AI", desc: "Explore LLMs, RAG, autonomous agents, and prompt engineering." },
            { id: "full-stack", name: "FULL STACK WEB & APP DEVELOPMENT", desc: "Build complete MERN applications and mobile apps with React Native." },
            { id: "ai-web-dev", name: "WEB / APP DEVELOPMENT USING AI (VIBE CODING)", desc: "Accelerate development using AI tools for UI/UX, coding, and automation." },
            { id: "industry-4.0", name: "INDUSTRY 4.0 CAPSTONE & INNOVATION LAB", desc: "Build real-world systems combining AI, IoT, and SaaS products." }
        ]
    },
    'electra': {
        title: "Dept. of Electra",
        subtitle: "ECE / EEE / EIE",
        bgImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop",
        technologies: [
            { id: "iot", name: "Internet of Things (IoT)", desc: "Connect physical devices to the cloud. Learn about MQTT, HTTP protocols, and smart home automation." },
            { id: "embedded", name: "Embedded Systems", desc: "Program microcontrollers like Arduino, STM32, and ESP32 for dedicated tasks." },
            { id: "sensors", name: "Microcontrollers & Sensors", desc: "Hands-on experience interfacing various sensors (temperature, motion, etc.) with actuators." },
            { id: "pcb", name: "PCB Design & Prototyping", desc: "Design professional printed circuit boards using tools like KiCad or Eagle and bring prototypes to life." },
            { id: "hardware-projects", name: "Real-Time Hardware Projects", desc: "Work on industry-relevant hardware projects tackling real-world problems." }
        ]
    },
    'arts-management': {
        title: "Arts & Management",
        subtitle: "Business & Analytics",
        bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        technologies: [
            { id: "pm-ai", name: "Product Management with AI", desc: "Learn to manage the product lifecycle from ideation to launch, augmented by AI tools." },
            { id: "hr-analytics", name: "HR Mgmt + Data Analytics", desc: "Modernize HR practices using data analytics to make informed decisions about talent management." },
            { id: "sap-erp", name: "Basics of SAP & ERP", desc: "Get introduced to Enterprise Resource Planning systems and SAP modules used in large corporations." },
            { id: "biz-analytics", name: "Business Analytics", desc: "Use statistical methods and technologies to analyze historical data and improve strategic decision-making." },
            { id: "digital-tools", name: "Digital Workplace Tools", desc: "Master modern collaboration and productivity suites essential for the corporate environment." }
        ]
    }
};

const topicDetailData = {
    "foundations": [ "Python fundamentals", "Object Oriented Programming", "File handling", "Java basics", "C++ basics", "Linux fundamentals", "Git & GitHub", "Debugging practices" ],
    "dsa": [ "Time & space complexity", "Arrays, strings, linked lists", "Stacks and queues", "Recursion", "Trees, BSTs", "Hashing", "Graphs (BFS, DFS)", "Greedy algorithms", "Dynamic programming", "Interview problem solving" ],
    "ai-ml": [ "Python for data science", "NumPy, Pandas, Matplotlib", "Statistics & probability", "Linear algebra", "Supervised learning", "Unsupervised learning", "Model evaluation", "Feature engineering", "Scikit-learn", "ML projects" ],
    "dl-cv": [ "Neural networks", "Backpropagation", "CNNs", "Transfer learning", "TensorFlow & PyTorch", "OpenCV basics", "Image processing", "YOLO basics", "Face recognition", "Video analytics" ],
    "gen-ai": [ "LLM fundamentals", "Prompt engineering", "Text/image generation", "GANs", "Diffusion models", "Autonomous agents", "Tool-using AI", "Memory & planning", "RAG", "Vector DBs" ],
    "full-stack": [ "HTML, CSS, JS", "MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Auth & Authz", "MERN apps", "Mobile app basics" ],
    "ai-web-dev": [ "AI-assisted coding", "Prompt-based generation", "AI Architecture design", "AI UI/UX", "AI API integration", "Chatbots", "Recommendation systems", "Voice apps", "Backend automation", "Low-code + AI" ],
    "industry-4.0": [ "AI + IoT systems", "Smart automation", "Robots and drones", "AI SaaS products", "Cyber-physical systems", "System scalability", "Product lifecycle", "Deployment", "Technical pitching" ],
    "iot": [ "IoT architecture", "Sensors & actuators", "Microcontrollers (ESP32)", "MQTT, HTTP, CoAP", "Wi-Fi, Bluetooth, LoRa", "Cloud platforms", "Real-time monitoring", "IoT security", "Smart home cases", "Edge AI basics" ],
    "embedded": [ "System architecture", "Microcontroller internals", "Embedded C/C++", "GPIO, timers, interrupts", "UART, I2C, SPI", "RTOS basics", "Power management", "Debugging", "Firmware design", "Deployment" ],
    "sensors": [ "Arduino, ESP32 arch", "Digital/Analog I/O", "ADC/DAC", "Sensor interfacing", "Actuators", "Calibration", "Interrupt handling", "Wireless networks", "Low-power design", "Data acquisition" ],
    "pcb": [ "Design workflow", "Schematic design", "KiCad / Eagle", "Power supply", "Signal integrity", "PCB design layers", "Footprints", "DRC/ERC", "Fabrication process", "Testing" ],
    "hardware-projects": [ "Problem definition", "HW-SW co-design", "Sensor automation", "IoT embedded systems", "Data processing", "Device-cloud comms", "Power efficiency", "Industrial apps", "Prototyping", "Documentation" ],
    "pm-ai": [ "Product lifecycle", "Market research", "AI ideation", "PRD writing", "Roadmapping", "Agile & Scrum", "Data-driven decisions", "Product analytics", "UX collaboration", "Go-to-market" ],
    "hr-analytics": [ "Modern HR systems", "Data collection", "Talent analytics", "Performance metrics", "Workforce planning", "Predictive analytics", "AI in recruitment", "Engagement analysis", "Dashboards", "Data privacy" ],
    "sap-erp": [ "ERP intro", "Business integration", "SAP ecosystem", "Modules (FI, CO, MM)", "Master data", "Implementation lifecycle", "Process mapping", "Analytics", "Cloud ERP", "Industry cases" ],
    "biz-analytics": [ "Fundamentals", "Data types", "Analytics types", "Statistical analysis", "Visualization", "Tools", "KPIs", "Forecasting", "BI dashboards", "Data strategy" ],
    "digital-tools": [ "Digital transformation", "Collaboration tools", "Productivity suites", "Project management", "Cloud storage", "Automation", "AI assistants", "Cybersecurity", "Remote work", "Digital etiquette" ]
};
const placementCompanies = {
    "CS & IT (Product & Services)": [
        { name: "Google", role: "Product-Based (Tier 1)", link: "https://careers.google.com" },
        { name: "Microsoft", role: "Product-Based (Tier 1)", link: "https://careers.microsoft.com" },
        { name: "Amazon", role: "Product-Based (Tier 1)", link: "https://amazon.jobs" },
        { name: "Apple", role: "Product-Based (Tier 1)", link: "https://apple.com/careers" },
        { name: "Meta (Facebook)", role: "Product-Based (Tier 1)", link: "https://metacareers.com" },
        { name: "Netflix", role: "Product-Based (Tier 1)", link: "https://jobs.netflix.com" },
        { name: "Adobe", role: "Product-Based (Tier 1)", link: "https://adobe.com/careers" },
        { name: "Salesforce", role: "Product-Based (Tier 1)", link: "https://salesforce.com/company/careers" },
        { name: "Oracle", role: "Product-Based (Tier 1)", link: "https://oracle.com/corporate/careers" },
        { name: "Cisco", role: "Product-Based (Tier 1)", link: "https://jobs.cisco.com" },
        { name: "Intel", role: "Product-Based (Tier 1)", link: "https://jobs.intel.com" },
        { name: "NVIDIA", role: "Product-Based (Tier 1)", link: "https://nvidia.com/en-us/about-nvidia/careers" },
        { name: "Uber", role: "Product-Based (Tier 1)", link: "https://uber.com/us/en/careers" },
        { name: "Atlassian", role: "Product-Based (Tier 1)", link: "https://atlassian.com/company/careers" },
        { name: "SAP", role: "Product-Based (Tier 1)", link: "https://sap.com/careers" },
        { name: "TCS", role: "Service-Based (Tier 2)", link: "https://tcs.com/careers" },
        { name: "Infosys", role: "Service-Based (Tier 2)", link: "https://infosys.com/careers" },
        { name: "Wipro", role: "Service-Based (Tier 2)", link: "https://careers.wipro.com" },
        { name: "Accenture", role: "Service-Based (Tier 2)", link: "https://accenture.com/in-en/careers" },
        { name: "Cognizant", role: "Service-Based (Tier 2)", link: "https://cognizant.com/careers" },
        { name: "Capgemini", role: "Service-Based (Tier 2)", link: "https://capgemini.com/careers" },
        { name: "HCL Tech", role: "Service-Based (Tier 2)", link: "https://hcltech.com/careers" },
        { name: "IBM", role: "Service-Based (Tier 2)", link: "https://ibm.com/employment" },
        { name: "Tech Mahindra", role: "Service-Based (Tier 2)", link: "https://careers.techmahindra.com" },
        { name: "LTIMindtree", role: "Service-Based (Tier 2)", link: "https://ltimindtree.com/careers" },
        { name: "Deloitte (Tech)", role: "Service-Based (Tier 2)", link: "https://deloitte.com/careers" },
        { name: "Zoho", role: "Product-Based (Tier 2)", link: "https://zoho.com/careers" },
        { name: "Flipkart", role: "Product-Based (Tier 2)", link: "https://flipkartcareers.com" },
        { name: "Paytm", role: "Product-Based (Tier 2)", link: "https://paytm.com/careers" },
        { name: "Zomato / Swiggy", role: "Product-Based (Tier 2)", link: "https://zomato.com/careers" }
    ],
    "Electronics & Electrical (ECE/EEE)": [
        { name: "Texas Instruments", role: "Semiconductors & VLSI", link: "https://careers.ti.com" },
        { name: "Qualcomm", role: "Semiconductors & VLSI", link: "https://qualcomm.com/company/careers" },
        { name: "AMD", role: "Semiconductors & VLSI", link: "https://amd.com/en/corporate/careers" },
        { name: "NXP Semiconductors", role: "Semiconductors & VLSI", link: "https://nxp.com/careers" },
        { name: "Analog Devices", role: "Semiconductors & VLSI", link: "https://analog.com/careers" },
        { name: "Micron Technology", role: "Semiconductors & VLSI", link: "https://micron.com/careers" },
        { name: "Samsung Semiconductor", role: "Semiconductors & VLSI", link: "https://samsung-semiconductor-usa.com" },
        { name: "Broadcom", role: "Semiconductors & VLSI", link: "https://broadcom.com/careers" },
        { name: "MediaTek", role: "Semiconductors & VLSI", link: "https://mediatek.com/careers" },
        { name: "Synopsys", role: "Semiconductors & VLSI", link: "https://synopsys.com/careers" },
        { name: "Cadence Design Systems", role: "Semiconductors & VLSI", link: "https://cadence.com/careers" },
        { name: "Western Digital", role: "Semiconductors & VLSI", link: "https://westerndigital.com/careers" },
        { name: "STMicroelectronics", role: "Semiconductors & VLSI", link: "https://st.com/content/st_com/en/careers" },
        { name: "Rambus", role: "Semiconductors & VLSI", link: "https://rambus.com/careers" },
        { name: "Applied Materials", role: "Semiconductors & VLSI", link: "https://appliedmaterials.com/careers" },
        { name: "Siemens", role: "Core Electrical & Power", link: "https://siemens.com/careers" },
        { name: "ABB", role: "Core Electrical & Power", link: "https://careers.abb" },
        { name: "Schneider Electric", role: "Core Electrical & Power", link: "https://se.com/careers" },
        { name: "GE (General Electric)", role: "Core Electrical & Power", link: "https://jobs.gecareers.com" },
        { name: "Bosch", role: "Core Electrical & Power", link: "https://bosch.in/careers" },
        { name: "Honeywell", role: "Core Electrical & Power", link: "https://careers.honeywell.com" },
        { name: "Havells", role: "Core Electrical & Power", link: "https://havells.com/careers" },
        { name: "Tata Power", role: "Core Electrical & Power", link: "https://tatapower.com/careers" },
        { name: "Adani Power", role: "Core Electrical & Power", link: "https://adanipower.com/careers" },
        { name: "NTPC (Govt)", role: "Core Electrical & Power", link: "https://ntpc.co.in/careers" },
        { name: "Power Grid Corp", role: "Core Electrical & Power", link: "https://powergrid.in/careers" },
        { name: "Bharat Electronics (BEL)", role: "Core Electrical & Power", link: "https://bel-india.in" },
        { name: "Crompton Greaves", role: "Core Electrical & Power", link: "https://crompton.co.in/careers" },
        { name: "V-Guard", role: "Core Electrical & Power", link: "https://vguard.in/careers" },
        { name: "Bajaj Electricals", role: "Core Electrical & Power", link: "https://bajajelectricals.com/careers" }
    ],
    "Mechanical Engineering": [
        { name: "Tata Motors", role: "Automotive", link: "https://tatamotors.com/careers" },
        { name: "Mahindra & Mahindra", role: "Automotive", link: "https://mahindra.com/careers" },
        { name: "Maruti Suzuki", role: "Automotive", link: "https://marutisuzuki.com/corporate/careers" },
        { name: "Ashok Leyland", role: "Automotive", link: "https://ashokleyland.com/careers" },
        { name: "Hero MotoCorp", role: "Automotive", link: "https://heromotocorp.com/en-in/careers" },
        { name: "Bajaj Auto", role: "Automotive", link: "https://bajajauto.com/careers" },
        { name: "TVS Motor", role: "Automotive", link: "https://tvsmotor.com/careers" },
        { name: "Royal Enfield", role: "Automotive", link: "https://royalenfield.com/careers" },
        { name: "Toyota Kirloskar", role: "Automotive", link: "https://toyotabharat.com/careers" },
        { name: "Hyundai India", role: "Automotive", link: "https://hyundai.com/in/en/connect-to-us/careers" },
        { name: "Honda Cars/Bikes", role: "Automotive", link: "https://hondacarindia.com/careers" },
        { name: "MRF Tyres", role: "Automotive", link: "https://mrftyres.com/careers" },
        { name: "Apollo Tyres", role: "Automotive", link: "https://apollotyres.com/careers" },
        { name: "CEAT", role: "Automotive", link: "https://ceat.com/careers" },
        { name: "Schaeffler", role: "Automotive", link: "https://schaeffler.com/careers" },
        { name: "L&T (Larsen & Toubro)", role: "Manufacturing & Aerospace", link: "https://larsentoubro.com/careers" },
        { name: "Boeing", role: "Manufacturing & Aerospace", link: "https://jobs.boeing.com" },
        { name: "Airbus", role: "Manufacturing & Aerospace", link: "https://airbus.com/careers" },
        { name: "GE Aviation", role: "Manufacturing & Aerospace", link: "https://geaviation.com/careers" },
        { name: "Rolls-Royce", role: "Manufacturing & Aerospace", link: "https://rolls-royce.com/careers" },
        { name: "Thermax", role: "Manufacturing", link: "https://thermaxglobal.com/careers" },
        { name: "Godrej & Boyce", role: "Manufacturing", link: "https://godrej.com/careers" },
        { name: "Kirloskar", role: "Manufacturing", link: "https://kirloskargroup.com" },
        { name: "Cummins", role: "Manufacturing", link: "https://cummins.com/careers" },
        { name: "JCB", role: "Manufacturing", link: "https://jcb.com/en-in/careers" },
        { name: "Caterpillar", role: "Manufacturing", link: "https://caterpillar.com/careers" },
        { name: "John Deere", role: "Manufacturing", link: "https://deere.com/careers" },
        { name: "BHEL (Govt)", role: "Manufacturing", link: "https://bhel.com/careers" },
        { name: "SAIL (Steel Authority)", role: "Manufacturing", link: "https://sail.co.in/careers" },
        { name: "Jindal Steel & Power", role: "Manufacturing", link: "https://jindalsteelpower.com/careers" }
    ],
    "Civil Engineering & Construction": [
        { name: "L&T Construction", role: "Infrastructure & EPC", link: "https://lntecc.com" },
        { name: "Tata Projects", role: "Infrastructure & EPC", link: "https://tataprojects.com/careers" },
        { name: "Shapoorji Pallonji", role: "Infrastructure & EPC", link: "https://shapoorjipallonji.com/careers" },
        { name: "GMR Group", role: "Infrastructure & EPC", link: "https://gmrgroup.in/careers" },
        { name: "HCC (Hindustan Const.)", role: "Infrastructure & EPC", link: "https://hccindia.com/careers" },
        { name: "Afcons Infrastructure", role: "Infrastructure & EPC", link: "https://afcons.com/careers" },
        { name: "Gammon India", role: "Infrastructure & EPC", link: "https://gammonindia.com/careers" },
        { name: "NCC (Nagarjuna)", role: "Infrastructure & EPC", link: "https://ncclimited.com/careers" },
        { name: "Dilip Buildcon", role: "Infrastructure & EPC", link: "https://dilipbuildcon.com/careers" },
        { name: "Ashoka Buildcon", role: "Infrastructure & EPC", link: "https://ashokabuildcon.com/careers" },
        { name: "KEC International", role: "Infrastructure & EPC", link: "https://kecrpg.com/careers" },
        { name: "Kalpataru Power", role: "Infrastructure & EPC", link: "https://kalpatarupower.com" },
        { name: "JMC Projects", role: "Infrastructure & EPC", link: "https://jmcprojects.com/careers" },
        { name: "Simplex Infrastructures", role: "Infrastructure & EPC", link: "https://simplexinfra.com" },
        { name: "Punj Lloyd", role: "Infrastructure & EPC", link: "https://punjlloyd.com" },
        { name: "DLF", role: "Real Estate", link: "https://dlf.in/careers" },
        { name: "Godrej Properties", role: "Real Estate", link: "https://godrejproperties.com/careers" },
        { name: "Sobha Developers", role: "Real Estate", link: "https://sobha.com/careers" },
        { name: "Prestige Group", role: "Real Estate", link: "https://prestigeconstructions.com/careers" },
        { name: "Brigade Group", role: "Real Estate", link: "https://brigadegroup.com/careers" },
        { name: "Lodha Group", role: "Real Estate", link: "https://lodhagroup.in/careers" },
        { name: "Oberoi Realty", role: "Real Estate", link: "https://oberoirealty.com/careers" },
        { name: "Raheja Developers", role: "Real Estate", link: "https://raheja.com/careers" },
        { name: "Puravankara", role: "Real Estate", link: "https://puravankara.com/careers" },
        { name: "Omaxe", role: "Real Estate", link: "https://omaxe.com/careers" },
        { name: "NBCC (Govt)", role: "Real Estate", link: "https://nbccindia.in" },
        { name: "RITES (Railways)", role: "Infrastructure", link: "https://rites.com/careers" },
        { name: "IRCON", role: "Infrastructure", link: "https://ircon.org" },
        { name: "Engineers India Ltd (EIL)", role: "Infrastructure", link: "https://engineersindia.com" },
        { name: "Jaypee Group", role: "Infrastructure", link: "https://jalindia.com/careers" }
    ],
    "Pharmaceutical Industry": [
        { name: "Sun Pharma", role: "Top Indian Giant", link: "https://sunpharma.com/careers" },
        { name: "Dr. Reddy's Labs", role: "Top Indian Giant", link: "https://drreddys.com/careers" },
        { name: "Cipla", role: "Top Indian Giant", link: "https://cipla.com/careers" },
        { name: "Lupin", role: "Top Indian Giant", link: "https://lupin.com/careers" },
        { name: "Aurobindo Pharma", role: "Top Indian Giant", link: "https://aurobindo.com/careers" },
        { name: "Zydus Lifesciences", role: "Top Indian Giant", link: "https://zyduslife.com/careers" },
        { name: "Torrent Pharma", role: "Top Indian Giant", link: "https://torrentpharma.com/careers" },
        { name: "Alkem Labs", role: "Top Indian Giant", link: "https://alkemlabs.com/careers" },
        { name: "Glenmark", role: "Top Indian Giant", link: "https://glenmarkpharma.com/careers" },
        { name: "Biocon", role: "Top Indian Giant", link: "https://biocon.com/careers" },
        { name: "Divi's Labs", role: "Top Indian Giant", link: "https://divislabs.com/careers" },
        { name: "Mankind Pharma", role: "Top Indian Giant", link: "https://mankindpharma.com/careers" },
        { name: "Piramal Pharma", role: "Top Indian Giant", link: "https://piramal.com/careers" },
        { name: "Wockhardt", role: "Top Indian Giant", link: "https://wockhardt.com/careers" },
        { name: "Jubilant Pharmova", role: "Top Indian Giant", link: "https://jubilantpharmova.com" },
        { name: "Pfizer", role: "Global MNC", link: "https://pfizer.com/careers" },
        { name: "GlaxoSmithKline (GSK)", role: "Global MNC", link: "https://gsk.com/careers" },
        { name: "Novartis", role: "Global MNC", link: "https://novartis.com/careers" },
        { name: "Sanofi", role: "Global MNC", link: "https://sanofi.com/careers" },
        { name: "Abbott", role: "Global MNC", link: "https://abbott.com/careers" },
        { name: "AstraZeneca", role: "Global MNC", link: "https://astrazeneca.com/careers" },
        { name: "Johnson & Johnson", role: "Global MNC", link: "https://careers.jnj.com" },
        { name: "Roche", role: "Global MNC", link: "https://roche.com/careers" },
        { name: "Merck", role: "Global MNC", link: "https://merck.com/careers" },
        { name: "Novo Nordisk", role: "Global MNC", link: "https://novonordisk.com/careers" },
        { name: "Bayer", role: "Global MNC", link: "https://bayer.com/careers" },
        { name: "Bristol Myers Squibb", role: "Global MNC", link: "https://bms.com/careers" },
        { name: "Teva Pharmaceuticals", role: "Global MNC", link: "https://tevapharm.com/careers" },
        { name: "Amgen", role: "Global MNC", link: "https://amgen.com/careers" },
        { name: "Viatris (Mylan)", role: "Global MNC", link: "https://viatris.com/careers" }
    ],
    "Business & Marketing (BBA/MBA)": [
        { name: "McKinsey & Co", role: "Consulting & Finance", link: "https://mckinsey.com/careers" },
        { name: "BCG", role: "Consulting & Finance", link: "https://bcg.com/careers" },
        { name: "Bain & Company", role: "Consulting & Finance", link: "https://bain.com/careers" },
        { name: "Deloitte", role: "Consulting & Finance", link: "https://deloitte.com/careers" },
        { name: "PwC", role: "Consulting & Finance", link: "https://pwc.com/careers" },
        { name: "EY (Ernst & Young)", role: "Consulting & Finance", link: "https://ey.com/careers" },
        { name: "KPMG", role: "Consulting & Finance", link: "https://kpmg.com/careers" },
        { name: "Goldman Sachs", role: "Consulting & Finance", link: "https://goldmansachs.com/careers" },
        { name: "JP Morgan Chase", role: "Consulting & Finance", link: "https://jpmorganchase.com/careers" },
        { name: "Morgan Stanley", role: "Consulting & Finance", link: "https://morganstanley.com/careers" },
        { name: "HDFC Bank", role: "Consulting & Finance", link: "https://hdfcbank.com/careers" },
        { name: "ICICI Bank", role: "Consulting & Finance", link: "https://icicicareers.com" },
        { name: "Axis Bank", role: "Consulting & Finance", link: "https://axisbank.com/careers" },
        { name: "Kotak Mahindra", role: "Consulting & Finance", link: "https://kotak.com/careers" },
        { name: "American Express", role: "Consulting & Finance", link: "https://americanexpress.com/careers" },
        { name: "HUL (Unilever)", role: "FMCG & General Mgmt", link: "https://hul.co.in/careers" },
        { name: "P&G", role: "FMCG & General Mgmt", link: "https://pgcareers.com" },
        { name: "Nestle", role: "FMCG & General Mgmt", link: "https://nestle.com/jobs" },
        { name: "ITC Limited", role: "FMCG & General Mgmt", link: "https://itcportal.com/careers" },
        { name: "Dabur", role: "FMCG & General Mgmt", link: "https://dabur.com/careers" },
        { name: "Marico", role: "FMCG & General Mgmt", link: "https://marico.com/careers" },
        { name: "Coca-Cola", role: "FMCG & General Mgmt", link: "https://coca-colacompany.com/careers" },
        { name: "PepsiCo", role: "FMCG & General Mgmt", link: "https://pepsicojobs.com" },
        { name: "Mondelez (Cadbury)", role: "FMCG & General Mgmt", link: "https://mondelez international" },
        { name: "Britannia", role: "FMCG & General Mgmt", link: "https://britannia.co.in/careers" },
        { name: "Tata Admin Services", role: "FMCG & General Mgmt", link: "https://tata.com" },
        { name: "Reliance Industries", role: "FMCG & General Mgmt", link: "https://ril.com/careers" },
        { name: "Adani Group", role: "FMCG & General Mgmt", link: "https://adani.com/careers" },
        { name: "Aditya Birla Group", role: "FMCG & General Mgmt", link: "https://adityabirla.com/careers" },
        { name: "Asian Paints", role: "FMCG & General Mgmt", link: "https://asianpaints.com/careers" }
    ]
};

const jobRolesData = {
    "Computer Science & IT": [
        { role: "Software Engineer", desc: "The core builder. They write the logic that makes software work (e.g., algorithms) and handle the full Software Development Life Cycle (SDLC).", skills: "Coding (Java/Python/C++), SDLC, Debugging", degree: "B.Tech CS/IT" },
        { role: "Web Developer", desc: "Builds websites. Frontend uses React/Vue for visuals. Backend uses Node.js/Django for server logic. Full Stack handles both.", skills: "React/Vue, Node.js/Django, SQL", degree: "B.Tech CS/IT or BCA" },
        { role: "Mobile App Developer", desc: "Builds for smartphones using Swift (iOS) or Kotlin (Android). Optimizes for battery and touch interfaces.", skills: "Swift, Kotlin, Java, React Native", degree: "B.Tech CS/IT" },
        { role: "Data Scientist", desc: "Applies machine learning algorithms to massive data sets to predict future trends like stock prices.", skills: "Machine Learning, Python, Statistics", degree: "M.Tech or Data Science degree" },
        { role: "Data Analyst", desc: "Finds trends in past data using SQL and creates dashboards to report business performance.", skills: "SQL, PowerBI, Tableau", degree: "B.Tech or B.Sc Statistics" },
        { role: "DevOps Engineer", desc: "The automation expert bridging code and deployment. Ensures seamless updates using tools like Docker.", skills: "Docker, Kubernetes, CI/CD", degree: "B.Tech CS" },
        { role: "Cloud Architect", desc: "Designs cloud infrastructure on AWS, Azure, or Google Cloud, balancing cost, speed, and reliability.", skills: "AWS, Azure, Google Cloud Architecture", degree: "Certifications + Experience" },
        { role: "Cybersecurity Analyst", desc: "Monitors networks for suspicious activity, configures firewalls, and responds to incidents.", skills: "Network Security, Firewalls, Ethical Hacking", degree: "B.Tech + Certifications" },
        { role: "Network Engineer", desc: "Configures routers, switches, and VPNs to ensure connectivity.", skills: "Routers, Switches, Networking Protocols", degree: "B.Tech CS/ECE" },
        { role: "Database Administrator", desc: "Ensures data is stored efficiently, backed up, and retrievable.", skills: "SQL, Database Management, Backup/Recovery", degree: "B.Tech CS/IT" },
        { role: "System Administrator", desc: "Manages user accounts, software updates, and physical servers.", skills: "Active Directory, Server Administration", degree: "B.Tech or Diploma" },
        { role: "UI/UX Designer", desc: "UI picks colors/fonts. UX decides layout for intuition.", skills: "Figma, Adobe XD, User Research", degree: "Design Degree or Portfolio" },
        { role: "QA Engineer / Tester", desc: "Finds bugs before the customer does. Automated testers write scripts for speed.", skills: "Selenium, Manual Testing, Scripting", degree: "B.Tech CS/IT" },
        { role: "Game Developer", desc: "Creates interactive entertainment using physics engines and graphics rendering.", skills: "Unity, Unreal Engine, C++/C#", degree: "B.Tech CS/Game Dev" },
        { role: "AI/ML Engineer", desc: "Trains neural networks to recognize images or understand language.", skills: "Neural Networks, Python, TensorFlow", degree: "M.Tech AI/ML" },
        { role: "Blockchain Developer", desc: "Builds decentralized apps (dApps) and smart contracts.", skills: "Solidity, Ethereum, Smart Contracts", degree: "B.Tech CS" },
        { role: "Site Reliability Engineer", desc: "Software engineers tasked with operations work to keep uptime high.", skills: "Automation, Cloud Infrastructure, Scripting", degree: "B.Tech CS" },
        { role: "Product Manager (Tech)", desc: "Decides what features to build based on user research and business goals.", skills: "Product Strategy, User Research, Agile", degree: "MBA or Tech background" },
        { role: "Technical Support Engineer", desc: "First line of defense for customer issues; debugs user logs.", skills: "Troubleshooting, Communication, Linux/Windows", degree: "B.Tech or BCA" },
        { role: "Penetration Tester", desc: "Ethical hacker paid to break into systems to find and report holes.", skills: "Ethical Hacking, Network Security", degree: "Certifications (CEH)" }
    ],
    "Electronics & Electrical": [
        { role: "Embedded Systems Engineer", desc: "Writes low-level code for non-computer devices like car dashboards.", skills: "C/C++, Microcontrollers, RTOS", degree: "B.Tech ECE/EEE" },
        { role: "VLSI Design Engineer", desc: "Designs internal logic of microchips at the transistor level.", skills: "Verilog, VHDL, Digital Logic", degree: "M.Tech VLSI" },
        { role: "PCB Design Engineer", desc: "Routes copper tracks on green boards to connect components.", skills: "PCB Layout, Signal Integrity, Circuit Design", degree: "B.Tech ECE" },
        { role: "Power Systems Engineer", desc: "Analyzes electrical grids to ensure stability under load.", skills: "Load Flow Analysis, Grid Stability", degree: "B.Tech EEE" },
        { role: "Control Systems Engineer", desc: "Designs the 'brain' of industrial machines for precise movement.", skills: "Control Theory, MATLAB, Robotics", degree: "B.Tech EEE/Instrumentation" },
        { role: "Instrumentation Engineer", desc: "Selects and maintains sensors in factories.", skills: "Sensors, Process Control, Calibration", degree: "B.Tech Instrumentation" },
        { role: "Telecommunications Engineer", desc: "Designs networks for voice and data, optimizing signal strength.", skills: "Wireless Comm, Fiber Optics, Network Design", degree: "B.Tech ECE" },
        { role: "RF Engineer", desc: "Focuses on wireless signals like Wi-Fi, Bluetooth, and Radar.", skills: "Antennas, RF Circuit Design", degree: "B.Tech ECE/Telecom" },
        { role: "Signal Processing Engineer", desc: "Modifies signals for noise cancellation or image enhancement.", skills: "DSP, Image Processing, MATLAB", degree: "M.Tech Signal Processing" },
        { role: "Electrical Design Engineer", desc: "Creates electrical blueprints for buildings or machines.", skills: "AutoCAD Electrical, Circuit Analysis", degree: "B.Tech EEE" },
        { role: "Maintenance Engineer", desc: "Troubleshoots electrical circuits to keep factory machines running.", skills: "Troubleshooting, Circuit Repair, Safety", degree: "B.Tech EEE" },
        { role: "SCADA Engineer", desc: "Sets up central computer systems to monitor factories.", skills: "SCADA Systems, PLC Programming, HMI", degree: "B.Tech EEE/Instrumentation" },
        { role: "Robotics Engineer", desc: "Combines electronics, mechanics, and code to build robots.", skills: "Robotics, Actuators, Sensors, Coding", degree: "M.Tech Robotics" },
        { role: "Test Engineer", desc: "Checks if hardware prototypes work as expected using tools.", skills: "Oscilloscopes, Multimeters, Testing Protocols", degree: "B.Tech ECE/EEE" },
        { role: "Solar Energy Engineer", desc: "Designs photovoltaic systems and connects them to the grid.", skills: "PV System Design, Inverters", degree: "B.Tech EEE/Renewable Energy" },
        { role: "Lighting Design Engineer", desc: "Designs LED drivers and lighting layouts for efficiency.", skills: "Optics, LED Technology, Lighting Layouts", degree: "B.Tech EEE" },
        { role: "Biomedical Engineer", desc: "Designs medical hardware like Pacemakers or MRI machines.", skills: "Medical Electronics, Human Biology", degree: "B.Tech Biomedical" },
        { role: "FPGA Engineer", desc: "Works with chips that can be rewired using code.", skills: "FPGA Architecture, VHDL/Verilog", degree: "M.Tech VLSI/Embedded" },
        { role: "Hardware Architect", desc: "Decides components for new devices like cameras and batteries.", skills: "System Architecture, Component Selection", degree: "Senior Role (B.Tech/M.Tech)" },
        { role: "Field Service Engineer", desc: "Installs complex equipment at client sites and trains users.", skills: "Installation, Troubleshooting, Communication", degree: "B.Tech/Diploma" }
    ],
    "Mechanical Engineering": [
        { role: "Mechanical Design Engineer", desc: "Creates 3D models of parts and ensures they fit together.", skills: "CAD (SolidWorks/CATIA), Tolerance Analysis", degree: "B.Tech Mechanical" },
        { role: "HVAC Engineer", desc: "Designs climate control systems by calculating thermal loads.", skills: "HVAC Design, Thermodynamics, Ductwork", degree: "B.Tech Mechanical" },
        { role: "Automotive Engineer", desc: "Specializes in car chassis, powertrain, or aerodynamics.", skills: "Automotive Systems, Chassis Design", degree: "B.Tech Automobile/Mechanical" },
        { role: "Manufacturing Engineer", desc: "Designs the process of making things efficiently.", skills: "Manufacturing Processes, CNC, Assembly Line", degree: "B.Tech Manufacturing/Mechanical" },
        { role: "Aerospace Engineer", desc: "Designs aircraft with focus on aerodynamics and safety.", skills: "Aerodynamics, Composites, Safety Standards", degree: "B.Tech Aerospace" },
        { role: "Thermal Engineer", desc: "Manages heat in electronics and engines.", skills: "Heat Transfer, Cooling Systems", degree: "B.Tech Mechanical" },
        { role: "Mechatronics Engineer", desc: "Builds systems with mechanical parts controlled by electronics.", skills: "Electronics, Mechanics, Control Systems", degree: "B.Tech Mechatronics" },
        { role: "Piping Engineer", desc: "Designs pipe networks for refineries handling high pressure.", skills: "Piping Design, Fluid Mechanics", degree: "B.Tech Mechanical/Chemical" },
        { role: "Material Engineer", desc: "Selects best materials based on strength and cost.", skills: "Material Science, Metallurgy", degree: "B.Tech Materials/Mechanical" },
        { role: "Hydraulics Engineer", desc: "Uses pressurized fluid for heavy machinery force.", skills: "Hydraulics, Fluid Power Systems", degree: "B.Tech Mechanical" },
        { role: "Maintenance Planner", desc: "Predicts breakdowns and schedules preventative maintenance.", skills: "Maintenance Planning, Reliability Eng", degree: "B.Tech Mechanical" },
        { role: "QA Engineer", desc: "Inspects products to ensure they match design drawings.", skills: "Metrology, CMM, Quality Control", degree: "B.Tech Mechanical" },
        { role: "CAD Technician", desc: "Turns sketches into standardized technical drawings.", skills: "Drafting, CAD Software", degree: "Diploma/B.Tech" },
        { role: "Production Manager", desc: "Manages factory workers, shifts, and output targets.", skills: "Production Management, Leadership", degree: "B.Tech + MBA" },
        { role: "Tooling Engineer", desc: "Designs tools like molds for manufacturing.", skills: "Tool Design, Mold Making", degree: "B.Tech Mechanical" },
        { role: "NVH Engineer", desc: "Reduces engine noise and rattling in cars.", skills: "Vibration Analysis, Acoustics", degree: "M.Tech" },
        { role: "Marine Engineer", desc: "Works on ship engines and power generation.", skills: "Marine Systems, Engine Maintenance", degree: "B.Tech Marine" },
        { role: "Packaging Engineer", desc: "Designs containers to survive shipping.", skills: "Packaging Design, Material Science", degree: "B.Tech" },
        { role: "Process Engineer", desc: "Optimizes industrial workflows to reduce waste.", skills: "Process Optimization, Lean Manufacturing", degree: "B.Tech Mechanical/Industrial" },
        { role: "R&D Engineer", desc: "Builds prototypes to test new ideas.", skills: "Prototyping, Innovation, Testing", degree: "M.Tech/PhD" }
    ],
    "Civil & Construction": [
        { role: "Structural Engineer", desc: "Calculates loads to decide steel and concrete thickness.", skills: "Structural Analysis, Concrete/Steel Design", degree: "M.Tech Structural" },
        { role: "Site Engineer", desc: "Ensures construction follows blueprints and checks materials.", skills: "Site Supervision, Blueprint Reading", degree: "B.Tech Civil" },
        { role: "Geotechnical Engineer", desc: "Tests soil strength to recommend foundations.", skills: "Soil Mechanics, Foundation Engineering", degree: "M.Tech Geotechnical" },
        { role: "Transportation Engineer", desc: "Designs traffic flow, stoplights, and highway curves.", skills: "Traffic Engineering, Road Design", degree: "M.Tech Transportation" },
        { role: "Water Resources Engineer", desc: "Manages water flow, flood defenses, and drains.", skills: "Hydrology, Fluid Mechanics", degree: "M.Tech Water Resources" },
        { role: "Environmental Engineer", desc: "Designs waste treatment and pollution control systems.", skills: "Environmental Science, Waste Management", degree: "B.Tech Environmental/Civil" },
        { role: "Construction Manager", desc: "Manages budget, schedule, subcontractors, and clients.", skills: "Project Management, Budgeting", degree: "B.Tech Civil + MBA" },
        { role: "Quantity Surveyor", desc: "Calculates materials and labor needed to price a project.", skills: "Cost Estimation, Quantity Surveying", degree: "B.Tech Civil" },
        { role: "Surveyor", desc: "Measures land boundaries and elevations precisely.", skills: "Total Station, GPS, Land Surveying", degree: "Diploma/B.Tech" },
        { role: "Urban Planner", desc: "Designs city layouts and zoning.", skills: "Urban Planning, Zoning Laws", degree: "M.Plan" },
        { role: "Highway Engineer", desc: "Focuses on pavement design and road geometry.", skills: "Pavement Design, Highway Engineering", degree: "M.Tech Highway" },
        { role: "Bridge Engineer", desc: "Specializes in long-span structures and aerodynamics.", skills: "Bridge Design, Structural Dynamics", degree: "M.Tech Structural" },
        { role: "Coastal Engineer", desc: "Designs structures to protect coasts from erosion.", skills: "Coastal Engineering, Fluid Dynamics", degree: "M.Tech Marine/Coastal" },
        { role: "Estimator", desc: "Guesses project costs before starting for bidding.", skills: "Cost Analysis, Bidding Strategy", degree: "B.Tech Civil" },
        { role: "Safety Officer (HSE)", desc: "Enforces safety rules on construction sites.", skills: "Safety Regulations, Risk Assessment", degree: "Safety Certification" },
        { role: "BIM Modeler", desc: "Creates 'Digital Twins' of buildings to spot clashes.", skills: "Revit, BIM", degree: "B.Tech Civil/Architecture" },
        { role: "Facade Engineer", desc: "Focuses on the building skin (glass, cladding).", skills: "Facade Design, Material Science", degree: "Specialized Master's" },
        { role: "Hydrologist", desc: "Studies rainfall and river flows to predict floods.", skills: "Hydrology, Data Analysis", degree: "M.Tech/M.Sc" },
        { role: "Material Testing Engineer", desc: "Crushes concrete/steel to prove strength.", skills: "Lab Testing, Material Properties", degree: "B.Tech Civil" },
        { role: "Municipal Engineer", desc: "Maintains public infrastructure for a city.", skills: "Public Works, Maintenance Management", degree: "B.Tech Civil" }
    ],
    "Pharmaceutical": [
        { role: "Pharmacist", desc: "Reviews prescriptions, dispenses drugs, advises patients.", skills: "Pharmacology, Patient Care", degree: "B.Pharm/Pharm.D" },
        { role: "Sales Representative", desc: "Visits clinics to explain drug benefits to doctors.", skills: "Sales, Communication, Product Knowledge", degree: "B.Pharm/B.Sc" },
        { role: "Medical Science Liaison", desc: "Discusses deep science and trials with key opinion leaders.", skills: "Scientific Communication, Clinical Data", degree: "Pharm.D/PhD" },
        { role: "Clinical Research Associate", desc: "Monitors clinical trials for ethical/scientific compliance.", skills: "Clinical Trials, GCP, Protocols", degree: "Life Sciences Degree" },
        { role: "Regulatory Affairs Specialist", desc: "Compiles data for FDA/EMA drug approval.", skills: "Regulatory Compliance, Documentation", degree: "M.Pharm/M.Sc" },
        { role: "Quality Control Chemist", desc: "Tests raw materials and pills for purity.", skills: "Lab Testing, Chemical Analysis", degree: "B.Sc/M.Sc Chemistry" },
        { role: "Quality Assurance Manager", desc: "Audits processes to ensure no errors were made.", skills: "QA Processes, Documentation, Auditing", degree: "M.Pharm/M.Sc" },
        { role: "Formulation Scientist", desc: "Figures out how to turn molecules into stable pills/creams.", skills: "Formulation, Chemistry", degree: "M.Pharm Pharmaceutics" },
        { role: "Pharmacovigilance Officer", desc: "Monitors reports of side effects for drug safety.", skills: "Drug Safety, Data Analysis", degree: "B.Pharm/M.Pharm" },
        { role: "R&D Scientist", desc: "Synthesizes new molecules to find cures.", skills: "Organic Chemistry, Synthesis, Research", degree: "PhD/M.Pharm" },
        { role: "Production Executive", desc: "Oversees large-scale drug manufacturing.", skills: "Manufacturing, GMP", degree: "B.Pharm" },
        { role: "Drug Inspector", desc: "Inspects facilities for illegal/sub-standard drugs.", skills: "Law Enforcement, Pharma Regulations", degree: "Govt Exam + B.Pharm" },
        { role: "Medical Writer", desc: "Writes reports for regulators or articles for journals.", skills: "Technical Writing, Medical Knowledge", degree: "Life Sciences/Pharma" },
        { role: "Biostatistician", desc: "Analyzes clinical trial results.", skills: "Statistics, Data Analysis, SAS", degree: "M.Sc Statistics" },
        { role: "Analytical Chemist", desc: "Figures out substance composition using machines.", skills: "HPLC, GC, Analytical Chemistry", degree: "M.Sc Analytical Chem" },
        { role: "Supply Chain Manager", desc: "Manages drug flow, especially 'Cold Chain'.", skills: "Logistics, Cold Chain Management", degree: "MBA/B.Pharm" },
        { role: "Clinical Data Manager", desc: "Cleans and manages patient data from trials.", skills: "Data Management, SQL", degree: "Life Sciences/IT" },
        { role: "Microbiologist", desc: "Ensures sterility by testing for bacteria/mold.", skills: "Microbiology, Sterility Testing", degree: "M.Sc Microbiology" },
        { role: "Toxicologist", desc: "Determines safe drug doses by studying poisons.", skills: "Toxicology, Safety Assessment", degree: "PhD/M.Sc" },
        { role: "Patent Analyst", desc: "Checks databases to prevent patent infringement.", skills: "IP Law, Database Search", degree: "Pharma/Law" }
    ],
    "Business & Marketing": [
        { role: "Marketing Manager", desc: "Decides Product, Price, Place, Promotion. Owns budget.", skills: "Marketing Strategy, Budgeting", degree: "MBA Marketing" },
        { role: "Sales Manager", desc: "Manages sales team, targets, and negotiations.", skills: "Sales Leadership, Negotiation", degree: "MBA Sales/Marketing" },
        { role: "Brand Manager", desc: "Ensures consistent brand identity and emotion.", skills: "Branding, Communication", degree: "MBA" },
        { role: "Digital Marketing Specialist", desc: "Runs ads, optimizes SEO, manages newsletters.", skills: "SEO, SEM, Social Media Marketing", degree: "Certification/BBA" },
        { role: "Business Analyst", desc: "Finds inefficiencies and proposes fixes.", skills: "Data Analysis, Process Improvement", degree: "BBA/MBA" },
        { role: "Financial Analyst", desc: "Forecasts spending and income to build models.", skills: "Financial Modeling, Excel", degree: "MBA Finance/CFA" },
        { role: "HR Manager", desc: "Handles hiring, payroll, and conflict resolution.", skills: "HR Management, Communication", degree: "MBA HR" },
        { role: "Operations Manager", desc: "Ensures smooth day-to-day business operations.", skills: "Operations Management, Logistics", degree: "MBA Operations" },
        { role: "Supply Chain Manager", desc: "Sources materials and negotiates prices.", skills: "Supply Chain, Negotiation", degree: "MBA Supply Chain" },
        { role: "Project Manager", desc: "Ensures goals are met on time and budget.", skills: "Project Management, Agile, Leadership", degree: "PMP/MBA" },
        { role: "Accountant", desc: "Tracks money, taxes, and balances books.", skills: "Accounting, Tax Law, Excel", degree: "B.Com/CA" },
        { role: "Investment Banker", desc: "Helps raise money (IPO) or buy companies (M&A).", skills: "Financial Analysis, Valuation", degree: "MBA Finance" },
        { role: "Management Consultant", desc: "Solves difficult problems for other companies.", skills: "Problem Solving, Strategy", degree: "MBA" },
        { role: "Product Manager (Non-Tech)", desc: "Decides attributes for physical goods like shampoo.", skills: "Product Lifecycle, Market Research", degree: "MBA" },
        { role: "PR Specialist", desc: "Gets press coverage and manages reputation.", skills: "Public Relations, Communication", degree: "BA Communication" },
        { role: "Market Research Analyst", desc: "Runs surveys to ask customers what they want.", skills: "Data Analysis, Survey Design", degree: "Marketing/Statistics" },
        { role: "Recruiter", desc: "Finds and convinces candidates to apply.", skills: "Sourcing, Interviewing", degree: "HR/Any Degree" },
        { role: "Business Development Manager", desc: "Finds partnership opportunities.", skills: "Sales, Networking, Strategy", degree: "MBA" },
        { role: "Risk Manager", desc: "Identifies risks and creates mitigation plans.", skills: "Risk Assessment, Analysis", degree: "Finance/Risk Mgmt" },
        { role: "CEO / Founder", desc: "Responsible for vision, culture, and survival.", skills: "Leadership, Strategy, Resilience", degree: "Any/Experience" }
    ]
};

const css = `
/* --- CORE VARIABLES --- */
:root {
    --bg-dark: #ffffff;      
    --bg-panel: #f8fafc;     
    --bg-card: #ffffff;      
    
    --primary-red: #0f172a;  /* Dark Navy */
    --secondary-blue: #ea580c; /* Orange Accent */
    
    --text-main: #0f172a;    
    --text-muted: #64748b;   
    
    --font-head: 'Montserrat', sans-serif;
    --font-body: 'Inter', sans-serif;
    --glass-border: 1px solid #e2e8f0; 
    --nav-height: 80px;
    
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --card-hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* --- ANIMATIONS --- */
@keyframes slideDown { 
    from { transform: translateX(-50%) translateY(-100%); opacity: 0; } 
    to { transform: translateX(-50%) translateY(0); opacity: 1; } 
}

@keyframes fadeInUp { 
    from { opacity: 0; transform: translateY(30px); } 
    to { opacity: 1; transform: translateY(0); } 
}

@keyframes gradientText { 
    0% { background-position: 0% 50%; } 
    50% { background-position: 100% 50%; } 
    100% { background-position: 0% 50%; } 
}

@keyframes float { 
    0% { transform: translateY(0px); } 
    50% { transform: translateY(-10px); } 
    100% { transform: translateY(0px); } 
}

@keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(234, 88, 12, 0); }
    100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); }
}

@keyframes borderFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes ribbonWave {
    0%, 100% { transform: rotate(45deg) scale(1); }
    50% { transform: rotate(45deg) scale(1.05); }
}

/* Utility Class for Animations */
.animate-enter {
    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* Staggered Animation Delay for Grid Items */
.staggered-fade-in > div {
    opacity: 0;
    animation: fadeInUp 0.5s ease-out forwards;
}
.staggered-fade-in > div:nth-child(1) { animation-delay: 0.1s; }
.staggered-fade-in > div:nth-child(2) { animation-delay: 0.2s; }
.staggered-fade-in > div:nth-child(3) { animation-delay: 0.3s; }
.staggered-fade-in > div:nth-child(4) { animation-delay: 0.4s; }
.staggered-fade-in > div:nth-child(5) { animation-delay: 0.5s; }
.staggered-fade-in > div:nth-child(6) { animation-delay: 0.6s; }
.staggered-fade-in > div:nth-child(7) { animation-delay: 0.7s; }
.staggered-fade-in > div:nth-child(8) { animation-delay: 0.8s; }

* { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
body { background-color: var(--bg-dark); color: var(--text-main); font-family: var(--font-body); overflow-x: hidden; line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; }
a { text-decoration: none; color: inherit; transition: 0.3s; }
ul { list-style: none; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.section-padding { padding: 120px 0 80px 0; min-height: 80vh; }
.section-title { font-family: var(--font-head); font-size: 2rem; text-align: center; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; background: linear-gradient(90deg, #ea580c, #475569); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; }
.section-subtitle { text-align: center; color: var(--secondary-blue); font-size: 1rem; margin-bottom: 2.5rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }

.btn { display: inline-block; padding: 6px 16px; font-family: var(--font-head); font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 4px; cursor: pointer; position: relative; overflow: hidden; z-index: 1; transition: 0.3s; }
.btn-primary { background: transparent; color: var(--primary-red); border: 2px solid var(--primary-red); box-shadow: none; }
.btn-primary:hover { background: var(--primary-red); color: white; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3); transform: translateY(-2px); }
.btn-secondary { background: transparent; color: var(--secondary-blue); border: 2px solid var(--secondary-blue); margin-left: 15px; }
.btn-secondary:hover { background: var(--secondary-blue); color: white; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3); transform: translateY(-2px); }
.btn-orange { background: transparent; color: #ea580c; border: 2px solid #ea580c; margin-left: 15px; }
.btn-orange:hover { background: #ea580c; color: white; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3); transform: translateY(-2px); }

/* --- FLOATING GLASS NAVIGATION (Full Width Island) --- */
nav { 
    position: fixed; 
    top: 20px; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 95%; /* Make it span mostly full width */
    max-width: 1200px; /* Cap width for large screens */
    z-index: 1000; 
    background: rgba(255, 255, 255, 0.8); /* Frosted Glass Base */
    backdrop-filter: blur(20px); 
    -webkit-backdrop-filter: blur(20px); 
    border: 1px solid rgba(255, 255, 255, 0.7); 
    border-radius: 16px; /* Slightly less rounded corners for bar look */
    padding: 10px 30px; 
    height: 70px; 
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0,0,0,0.05); 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; /* Navbar Entrance Animation */
}

.nav-container { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    height: 100%; 
    width: 100%; 
}

.logo { 
    font-family: var(--font-head); 
    font-size: 1.3rem; 
    font-weight: 800; 
    color: var(--text-main); 
    display: flex; 
    align-items: center; 
    gap: 12px; 
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.3s;
}

.logo:hover { transform: scale(1.03); }

.nav-links { 
    display: flex; 
    gap: 30px; 
    align-items: center; 
    margin: 0;
    padding: 0;
}

/* Updated Selector to not affect dropdown items */
.nav-links > li { 
    cursor: pointer; 
    font-size: 0.9rem; 
    font-weight: 600; 
    position: relative; 
    color: var(--text-muted); 
    transition: 0.3s; 
    display: flex;
    align-items: center;
    height: 100%;
}

.nav-links > li:hover, .nav-links > li.active { 
    color: var(--secondary-blue); 
    transform: translateY(-2px); /* Subtle lift effect */
}

/* Dropdown Styles - REMOVED AS REQUESTED */

.mobile-toggle { 
    display: none; 
    font-size: 1.4rem; 
    cursor: pointer; 
    color: var(--text-main); 
}

/* HERO */
/* Removed circuit-overlay style */
.hero { height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; background: linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop'); background-size: cover; background-position: center; background-attachment: fixed; }
.hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; background: radial-gradient(circle at 10% 20%, rgba(234, 88, 12, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(15, 23, 42, 0.03) 0%, transparent 40%); }
.hero-content { position: relative; z-index: 2; padding: 20px; max-width: 900px; animation: fadeInUp 1s ease-out forwards; }
.hero-logo-img { width: 120px; height: auto; border-radius: 15px; box-shadow: 0 0 30px rgba(234, 88, 12, 0.4); animation: float 3s ease-in-out infinite; margin-bottom: 20px;}
.hero h1 { font-family: var(--font-head); font-size: 3rem; font-weight: 900; line-height: 1.1; margin-bottom: 1rem; text-transform: uppercase; color: var(--text-main); }
.hero h1 span { 
    display: block; 
    font-size: 1.2rem; 
    margin-top: 15px; 
    letter-spacing: 3px; 
    white-space: nowrap;
    /* Animated Gradient Text - Orange Theme */
    background: linear-gradient(270deg, #ea580c, #fb923c, #f59e0b, #ea580c); 
    background-size: 300% 300%; 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
    animation: gradientText 4s ease infinite; 
}
.hero p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }

/* ABOUT */
.about { background: var(--bg-panel); position: relative; }
.about-text { text-align: center; max-width: 800px; margin: 0 auto 3rem auto; font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; }
.highlight-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 3rem; }
.highlight-card { background: var(--bg-card); border: var(--glass-border); padding: 25px; text-align: center; border-radius: 10px; transition: 0.4s; position: relative; overflow: hidden; box-shadow: var(--card-shadow); }
.highlight-card:hover { transform: translateY(-10px) scale(1.02); background: white; box-shadow: 0 20px 40px -5px rgba(0,0,0,0.1); border-color: var(--secondary-blue); }
.highlight-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, var(--secondary-blue), transparent); }
.highlight-icon { font-size: 2rem; color: var(--secondary-blue); margin-bottom: 15px; }
.highlight-title { font-family: var(--font-head); font-size: 1.1rem; margin-bottom: 10px; font-weight: 700; color: var(--text-main); }
.highlight-card p { font-size: 0.9rem; color: var(--text-muted); }

/* LEADERSHIP */
.leader-flex { display: flex; justify-content: center; flex-wrap: wrap; gap: 40px; margin-top: 40px; }
.leader-card { background: white; width: 300px; border-radius: 15px; padding: 30px; text-align: center; border: 1px solid #e2e8f0; position: relative; box-shadow: var(--card-shadow); transition: 0.3s; }
.leader-card:hover { transform: translateY(-10px); box-shadow: var(--card-hover-shadow); }
.leader-card::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 50%; height: 2px; background: var(--secondary-blue); }
.leader-img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px auto; display: block; border: 3px solid var(--secondary-blue); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.leader-name { font-family: var(--font-head); font-size: 1.1rem; margin-bottom: 5px; font-weight: 700; color: var(--text-main); }
.leader-role { color: var(--secondary-blue); font-size: 0.85rem; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; }
.leader-social a { color: var(--text-muted); font-size: 1.1rem; margin: 0 5px; }
.leader-social a:hover { color: var(--secondary-blue); }
.leader-phone { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 15px; display: block; }
.leader-phone:hover { color: var(--secondary-blue); }

/* DEPARTMENTS */
/* Removed background-image radial gradient pattern */
.departments { background: var(--bg-dark); }
.dept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.dept-card { background: var(--bg-card); border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; transition: 0.3s; position: relative; cursor: pointer; box-shadow: var(--card-shadow); }
.dept-card:hover { border-color: var(--secondary-blue); box-shadow: 0 15px 30px -5px rgba(234, 88, 12, 0.15); transform: translateY(-5px); }
.dept-header { background: #f8fafc; padding: 25px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 15px; }
.dept-icon { font-size: 1.8rem; color: var(--secondary-blue); background: rgba(234, 88, 12, 0.1); padding: 10px; border-radius: 8px; }
.dept-title { font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
.dept-subtitle { font-size: 0.8rem; color: var(--text-muted); margin-top: 3px; }
.dept-body { padding: 20px 25px; }
.dept-list li { margin-bottom: 10px; padding-left: 18px; position: relative; color: var(--text-muted); font-size: 0.9rem; }
.dept-list li::before { content: '>'; position: absolute; left: 0; color: var(--secondary-blue); font-weight: bold; }

/* SERVICES & PROGRAMS */
.programs { background: var(--bg-panel); }
.program-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }

.neon-card { 
    background: white; 
    border: 1px solid #e2e8f0; 
    padding: 30px 20px; 
    text-align: center; 
    border-radius: 8px; 
    transition: 0.3s; 
    cursor: pointer; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.05); 
    position: relative;
    overflow: hidden; /* Important for the ribbon borders */
}

/* Moving Border Animation */
.neon-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 8px;
    padding: 2px;
    background: linear-gradient(60deg, var(--secondary-blue), #ffffff, var(--primary-red), #ffffff, var(--secondary-blue));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    background-size: 300% 300%;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
    pointer-events: none;
}

.neon-card:hover::after {
    opacity: 1;
    animation: borderFlow 2s linear infinite;
}

.neon-card:hover { border-color: transparent; box-shadow: 0 10px 25px -5px rgba(234, 88, 12, 0.15); transform: translateY(-8px) scale(1.02); }
.neon-icon { font-size: 1.8rem; color: var(--text-main); margin-bottom: 15px; transition: 0.3s; }
.neon-card:hover .neon-icon { color: var(--secondary-blue); transform: scale(1.1); }
.neon-text { font-family: var(--font-head); font-size: 0.95rem; letter-spacing: 0.5px; font-weight: 600; color: var(--text-main); }

/* Ribbon Corner Style */
.ribbon-wrapper {
    width: 85px;
    height: 88px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    right: -3px;
    z-index: 10;
}

.ribbon {
    font-family: var(--font-head);
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    transform: rotate(45deg);
    position: relative;
    padding: 7px 0;
    left: -5px;
    top: 15px;
    width: 120px;
    background-color: var(--secondary-blue);
    color: #fff;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    animation: ribbonWave 3s infinite ease-in-out;
}

.ribbon::before, .ribbon::after {
    content: "";
    border-top: 3px solid #b45309; /* Darker Orange */
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    position: absolute;
    bottom: -3px;
}

.ribbon::before { left: 0; }
.ribbon::after { right: 0; }

/* CONSULTANCY */
.consultancy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 3rem; }
.consultancy-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center; transition: 0.3s; position: relative; overflow: hidden; cursor: pointer; box-shadow: var(--card-shadow); }
.consultancy-card:hover { border-color: var(--secondary-blue); box-shadow: 0 15px 30px -5px rgba(0,0,0,0.1); transform: translateY(-8px); }
.consultancy-icon { font-size: 2.2rem; color: var(--secondary-blue); margin-bottom: 15px; }
.consultancy-title { font-family: var(--font-head); font-size: 1.15rem; margin-bottom: 10px; font-weight: 700; color: var(--text-main); }
.consultancy-card p { color: var(--text-muted); font-size: 0.9rem; }

/* COMMUNITY & CONTACT */
.community { background: var(--bg-panel); border-top: 1px solid #e2e8f0; }
.social-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 2rem; }
.social-btn { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border-radius: 6px; min-width: 160px; transition: 0.3s; border: 1px solid #e2e8f0; color: var(--text-main); box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-size: 0.85rem; cursor: pointer; }
.social-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.social-btn.ig:hover { border-color: #E1306C; color: #E1306C; }
.social-btn.li:hover { border-color: #0077b5; color: #0077b5; }
.social-btn.yt:hover { border-color: #FF0000; color: #FF0000; }
.social-btn.wa:hover { border-color: #25D366; color: #25D366; }

/* DETAILS PAGE */
.detail-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 10px; }
.back-btn { background: white; color: var(--text-muted); border: 1px solid #cbd5e1; padding: 5px 12px; border-radius: 5px; cursor: pointer; font-family: var(--font-body); font-size: 0.8rem; transition: 0.3s; display: flex; align-items: center; gap: 8px; }
.back-btn:hover { color: var(--secondary-blue); border-color: var(--secondary-blue); transform: translateX(-5px); }
.detail-list { display: grid; gap: 20px; }
.detail-item { background: white; border: 1px solid #e2e8f0; padding: 25px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; transition: 0.3s; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }
.detail-item:hover { border-color: var(--secondary-blue); transform: translateX(10px); box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
.detail-info h3 { font-family: var(--font-head); font-size: 1.1rem; margin-bottom: 5px; color: var(--text-main); font-weight: 700; }
.detail-info p { color: var(--text-muted); font-size: 0.9rem; }
.detail-action { color: var(--secondary-blue); font-size: 1.2rem; }

/* CHATBOT */
.chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 2000; font-family: var(--font-body); }
.chat-toggle-btn { background: var(--secondary-blue); color: white; width: 50px; height: 50px; border-radius: 50%; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(234, 88, 12, 0.4); font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: 0.3s; animation: pulseGlow 2s infinite; }
.chat-toggle-btn:hover { transform: scale(1.1); box-shadow: 0 6px 15px rgba(234, 88, 12, 0.5); }
.chat-window { position: absolute; bottom: 80px; right: 0; width: 350px; height: 450px; background: white; backdrop-filter: blur(10px); border: 1px solid #e2e8f0; border-radius: 15px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); animation: fadeInUp 0.3s ease-out; }
.chat-header { background: linear-gradient(90deg, #ea580c, #f97316); padding: 15px; display: flex; align-items: center; justify-content: space-between; color: white; }
.chat-title { font-family: var(--font-head); font-size: 1rem; display: flex; align-items: center; gap: 10px; font-weight: 700; }
.chat-close { background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; }
.chat-messages { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f8fafc; }
.message { max-width: 80%; padding: 10px 15px; border-radius: 10px; font-size: 0.9rem; line-height: 1.4; }
.msg-bot { align-self: flex-start; background: white; border: 1px solid #e2e8f0; border-left: 3px solid var(--secondary-blue); color: var(--text-main); }
.msg-user { align-self: flex-end; background: var(--secondary-blue); color: white; border-bottom-right-radius: 2px; }
.chat-input-area { padding: 15px; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; background: white; }
.chat-input { flex: 1; background: #f1f5f9; border: 1px solid #cbd5e1; color: var(--text-main); padding: 10px; border-radius: 5px; font-family: var(--font-body); outline: none; }
.chat-input:focus { border-color: var(--secondary-blue); background: white; }
.chat-send { background: var(--secondary-blue); color: white; border: none; padding: 0 12px; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 0.9rem; }

/* FOOTER - ORANGE THEME */
footer { 
    background: linear-gradient(135deg, #fb923c, #ea580c); 
    padding: 40px 0 20px 0; 
    border-top: none; 
    font-size: 0.85rem; 
    color: rgba(255,255,255,0.9); 
    margin-top: auto; 
}
.footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 30px; }
.footer-links li { margin-bottom: 10px; }
.footer-links a, .footer-btn { color: rgba(255,255,255,0.9); transition: 0.3s; background: none; border: none; padding: 0; font: inherit; cursor: pointer; }
.footer-links a:hover, .footer-btn:hover { color: white; transform: translateX(5px); display: inline-block; }
.footer-links i { color: white !important; margin-right: 8px; }
.copyright { text-align: center; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px; color: rgba(255,255,255,0.8); }

.footer-logo-btn {
    font-family: var(--font-head); 
    color: white; 
    font-size: 1.3rem; 
    margin-bottom: 15px; 
    display: inline-block; 
    font-weight: 800; 
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
    .hero h1 { font-size: 3rem; }
    .dept-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    .nav-links { display: none; flex-direction: column; position: absolute; top: 70px; left: 50%; transform: translateX(-50%); width: 95%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); border-radius: 20px; padding: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.5); }
    .nav-links.active { display: flex; }
    .mobile-toggle { display: block; }
    nav { min-width: auto; width: 90%; justify-content: space-between; padding: 10px 25px; }
    .nav-links > li { flex-direction: column; align-items: center; }
}
@media (max-width: 768px) {
    .hero h1 { font-size: 2.5rem; }
    .section-title { font-size: 2rem; }
    .dept-grid { display: flex; flex-direction: column; gap: 20px; }
    .dept-card { width: 100%; }
    .dept-header { flex-direction: column; text-align: center; }
    .detail-item { flex-direction: column; align-items: flex-start; gap: 15px; }
    .detail-action { align-self: flex-end; }
}
`;
const App = () => {
    // State Management
    const [view, setView] = useState('home'); // home, about, departments, services, partners, contact
    const [subView, setSubView] = useState(null); // 'program-details', 'dept-details', 'topic-details', 'consultancy-details', 'job-roles', 'job-architect'
    const [selectedData, setSelectedData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

// Job Architect State
    const [jaSkillsInput, setJaSkillsInput] = useState('');
    const [jaSuggestedSections, setJaSuggestedSections] = useState([]);
    const [jaSuggestedProjects, setJaSuggestedProjects] = useState([]);
    const [jaIsLoading, setJaIsLoading] = useState(false);
    const [jaError, setJaError] = useState(null);
    // FIX 1: Removed unused 'user' variable to fix deployment error
    const [, setUser] = useState(null);

    // Chatbot State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([{ text: "Hello! Welcome to Tech Roxx. I can help you with course details, enrollment, or contacting our team. How can I assist you today?", sender: "bot" }]);
    const [chatInput, setChatInput] = useState("");
    const messagesEndRef = useRef(null);

    // Initialize Firebase (standard environment setup)
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyA0DHeXs6cRXKtgrbkRa37AkOzSNcuwwIo",
            authDomain: "techroxx-backend.firebaseapp.com",
            projectId: "techroxx-backend",
            storageBucket: "techroxx-backend.firebasestorage.app",
            messagingSenderId: "1055193333388",
            appId: "1:1055193333388:web:309af723dd8eebf1f205a9",
            measurementId: "G-4JJMD6DWMY"
        };

        try {
            // Initialize Firebase directly using the imported modules
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            
            signInAnonymously(auth).catch((error) => {
                console.error("Auth Error:", error);
            });
            onAuthStateChanged(auth, (u) => setUser(u));
        } catch (e) {
            console.error("Firebase initialization error:", e);
        }
    }, []);

    // --- 1. SEO OPTIMIZATION ENGINE ---
    useEffect(() => {
        let title = "Tech Roxx | AI, VLSI, IoT & Full Stack Training Institute in Hyderabad";
        let desc = "Tech Roxx Hyderabad offers industry-ready training for CS, ECE, EEE & Bio-Medical students. Master AI, VLSI, Embedded Systems, IoT, Full Stack Dev & Pharma IT.";

        if (subView) {
            if (subView === 'program-details') {
                title = `${selectedId.charAt(0).toUpperCase() + selectedId.slice(1)} Programs | Tech Roxx`;
                desc = `Explore our ${selectedId} training programs and workshops. Hands-on learning and placement support available.`;
            } else if (subView === 'dept-details' && selectedData) {
                title = `${selectedData.title} | Tech Roxx Courses`;
                desc = `Specialized training in ${selectedData.subtitle}. Learn ${selectedData.technologies.map(t => t.name).join(', ')}.`;
            } else if (subView === 'job-roles') {
                title = "Tech Job Roles & Skills Guide | Tech Roxx";
                desc = "Understand key job roles in IT, VLSI, and Core industries. See required skills and degrees for top placement.";
            } else if (subView === 'job-architect') {
                title = "Job Architect - AI Resume Assistant | Tech Roxx";
                desc = "Get expert resume advice and project ideas tailored to your skills using our AI-powered Job Architect tool.";
            }
        } else {
            switch(view) {
                case 'about':
                    title = "About Tech Roxx | Leadership & Vision";
                    desc = "Meet the leaders behind Tech Roxx, Mr. Hemanth Goud Burra and Mr. Keerthi Shiva Prasad. We bridge the gap between academics and industry.";
                    break;
                case 'departments':
                    title = "Departments & Courses | Tech Roxx";
                    desc = "Explore specialized tracks in Computing (CSE), Electronics (ECE/EEE), and Arts & Management.";
                    break;
                case 'services':
                    title = "Services, Workshops & Consultancy | Tech Roxx";
                    desc = "We offer Workshops, Internships, Hackathons, and specialized Consultancy in Real Estate, Foreign Education, and R&D.";
                    break;
                case 'partners':
                    title = "Our Partners & Collaborations | Tech Roxx";
                    desc = "Tech Roxx partners with organizations like Taskveda to provide real-time projects and student internships.";
                    break;
                case 'contact':
                    title = "Join Tech Roxx Community | Contact Us";
                    desc = "Contact Tech Roxx for enrollment, pricing, and course details. Join our WhatsApp community for regular job updates.";
                    break;
                default:
                    break;
            }
        }

        document.title = title;
        // Update meta description
        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", desc);

    }, [view, subView, selectedData, selectedId]);

    // Load FontAwesome for specific brand icons
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    // Scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, isChatOpen]);

    // Navigation Handler
    const handleNav = (targetView) => {
        setView(targetView);
        setSubView(null);
        setSelectedData(null);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    // Sub-view Handlers
    const openProgramDetails = (category) => {
        setSubView('program-details');
        setSelectedId(category);
        window.scrollTo(0, 0);
    };

    const openDepartmentPage = (deptId) => {
        setSubView('dept-details');
        setSelectedData(departmentData[deptId]);
        window.scrollTo(0, 0);
    };

    const openTopicPage = (topicId, topicName) => {
        setSubView('topic-details');
        setSelectedData({ id: topicId, name: topicName, list: topicDetailData[topicId] });
        window.scrollTo(0, 0);
    };

    const openConsultancyPage = (serviceId) => {
        setSubView('consultancy-details');
        setSelectedData(consultancyData[serviceId]);
        window.scrollTo(0, 0);
    };

    const openJobRolesPage = () => {
        setSubView('job-roles');
        window.scrollTo(0, 0);
    };

    const openJobArchitect = () => {
        setSubView('job-architect');
        window.scrollTo(0, 0);
    };

    // --- JOB ARCHITECT LOGIC ---
    const generateResumeSuggestions = async () => {
        setJaIsLoading(true);
        setJaError(null);

        if (!jaSkillsInput.trim()) {
            setJaError("Please provide your skills to help the assistant generate tailored advice.");
            setJaIsLoading(false);
            return;
        }

        try {
            const prompt = `
            Analyze these skills and provide expert resume advice:
            1. Impactful resume sections for this profile (name, description, and strategic reason).
            2. 3-5 high-impact project ideas (name, description, and key skills demonstrated).

            Skills: ${jaSkillsInput}

            Respond strictly in valid JSON format:
            {
              "suggestedResumeSections": [{"sectionName": "", "description": "", "reason": ""}],
              "suggestedProjects": [{"projectName": "", "description": "", "skillsShowcased": [""]}]
            }
            `;

            // Note: apiKey is set to empty string as the environment injects it at runtime
// Note: apiKey is set to empty string as the environment injects it at runtime
const apiKey = "AIzaSyBJkMchMk_hjaphuiixwILz4Wk1Yjzoihk"; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (text) {
                const data = JSON.parse(text);
                setJaSuggestedSections(data.suggestedResumeSections || []);
                setJaSuggestedProjects(data.suggestedProjects || []);
            } else {
                throw new Error("No suggestions returned.");
            }
        } catch (err) {
            setJaError("Failed to generate suggestions. Please check your input or try again later.");
            console.error(err);
        } finally {
            setJaIsLoading(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Description copied!");
        });
    };

    // --- 2. IMPROVED CHATBOT LOGIC ---
    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        const userMsg = chatInput.trim();
        setChatMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setChatInput("");
        
        setTimeout(() => {
            const input = userMsg.toLowerCase();
            let response = "";
            let action = null;

            // -- GREETINGS --
            if (input.match(/^(hi|hello|hey|greetings|start)/)) {
                response = "Hi! I'm the Tech Roxx Assistant. How can I help you?<br><br>• <a href='#' onclick='return false;' style='color:var(--secondary-blue); font-weight:bold'>View Departments</a><br>• <a href='#' onclick='return false;' style='color:var(--secondary-blue); font-weight:bold'>Placement Guide</a><br>• <a href='#' onclick='return false;' style='color:var(--secondary-blue); font-weight:bold'>Contact Us</a>";
            }
            
            // -- NAVIGATION SHORTCUTS --
            else if (input.includes('department') || input.includes('course') || input.includes('syllabus')) {
                response = "Navigating you to our Departments... We offer tracks in Computing, Electronics, and Management.";
                action = () => handleNav('departments');
            }
            else if (input.includes('service') || input.includes('workshop') || input.includes('intern')) {
                response = "Check out our Services page for Workshops, Internships, and Real-Time Projects.";
                action = () => handleNav('services');
            }
            else if (input.includes('contact') || input.includes('phone') || input.includes('call') || input.includes('location')) {
                response = "You can join us via the form below or call us directly at <strong>+91 9550251208</strong>.";
                action = () => handleNav('contact');
            }
            else if (input.includes('about') || input.includes('ceo') || input.includes('team')) {
                response = "Learn more about our leadership and vision on the About page.";
                action = () => handleNav('about');
            }

            // -- SPECIFIC DATA LOOKUPS --
            else {
                let found = false;

                // 1. Search Job Roles
                for (const [, roles] of Object.entries(jobRolesData)) { // Removed unused key 'category'
                    for (const role of roles) {
                        if (input.includes(role.role.toLowerCase()) || (input.includes(role.role.split(' ')[0].toLowerCase()) && input.includes('developer'))) {
                            response = `<strong>${role.role}</strong>:<br>${role.desc}<br><br><strong>Key Skills:</strong> ${role.skills}<br><strong>Degree:</strong> ${role.degree}`;
                            found = true; break;
                        }
                    }
                    if (found) break;
                }

                // 2. Search Placement Companies
                if (!found) {
                    // FIX 2: Removed unused 'category' variable in loop to fix deployment error
                    for (const [catName, companies] of Object.entries(placementCompanies)) {
                        for (const company of companies) {
                            if (input.includes(company.name.toLowerCase())) {
                                response = `Yes! <strong>${company.name}</strong> is one of the top companies we target in our <em>${catName}</em> placement guide.<br><br>They typically hire for: ${company.role}.`;
                                action = () => openProgramDetails('placement');
                                found = true; break;
                            }
                        }
                        if (found) break;
                    }
                }

                // 3. Search Topics
                if (!found) {
                    const topicMap = {
                        'python': 'foundations', 'java': 'foundations', 'c++': 'foundations', 'git': 'foundations',
                        'dsa': 'dsa', 'algorithms': 'dsa', 'structures': 'dsa',
                        'ai': 'ai-ml', 'ml': 'ai-ml', 'machine learning': 'ai-ml',
                        'deep learning': 'dl-cv', 'vision': 'dl-cv', 'cnn': 'dl-cv',
                        'gen ai': 'gen-ai', 'llm': 'gen-ai', 'gpt': 'gen-ai',
                        'web': 'full-stack', 'react': 'full-stack', 'node': 'full-stack', 'full stack': 'full-stack',
                        'iot': 'iot', 'arduino': 'sensors', 'esp32': 'iot',
                        'embedded': 'embedded', 'pcb': 'pcb', 'hardware': 'hardware-projects',
                        'product': 'pm-ai', 'hr': 'hr-analytics', 'sap': 'sap-erp', 'analytics': 'biz-analytics'
                    };
                    for (const [keyword, id] of Object.entries(topicMap)) {
                        if (input.includes(keyword)) {
                            const topics = topicDetailData[id]?.slice(0, 4).join(", ");
                            response = `Yes, we cover <strong>${keyword.toUpperCase()}</strong>! <br>Some key topics include: ${topics}, and more.<br>Redirecting you to the curriculum...`;
                            // Map topic back to department is hard without extra data, so we send to departments
                            action = () => handleNav('departments'); 
                            found = true; break;
                        }
                    }
                }

                // 4. Default Fallback
                if (!found) {
                    response = "I'm not sure about that. Try one of these links:";
                    // We will append buttons in the render logic or just text links here
                    response += "<br><br>• <a href='#' onclick='return false;' style='color:var(--secondary-blue)'>Browse Courses</a><br>• <a href='#' onclick='return false;' style='color:var(--secondary-blue)'>View Job Roles</a><br>• <a href='#' onclick='return false;' style='color:var(--secondary-blue)'>Contact Support</a>";
                }
            }

            setChatMessages(prev => [...prev, { text: response, sender: 'bot' }]);
            
            // Execute Navigation Action if any
            if (action) {
                setTimeout(action, 1500); // Small delay for user to read message
            }

        }, 800);
    };
    return (
        <div className="app-container">
            <style>{css}</style>
            
            {/* NAVIGATION */}
            <nav>
                <div className="nav-container">
                    <div className="logo" onClick={() => handleNav('home')}>
                        <img src={logo} alt="Tech Roxx Logo" style={{ height: '35px', width: 'auto', borderRadius: '6px' }} /> TECH ROXX
                    </div>
                    <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li className={view === 'home' ? 'active' : ''} onClick={() => handleNav('home')}>Home</li>
                        <li className={view === 'departments' ? 'active' : ''} onClick={() => handleNav('departments')}>Departments</li>
                        <li className={view === 'services' ? 'active' : ''} onClick={() => handleNav('services')}>Services</li>
                        <li className={view === 'about' ? 'active' : ''} onClick={() => handleNav('about')}>About</li>
                        <li className={view === 'partners' ? 'active' : ''} onClick={() => handleNav('partners')}>Partners</li>
                        <li className={view === 'contact' ? 'active' : ''} onClick={() => handleNav('contact')} style={{ color: 'var(--secondary-blue)', fontWeight: 700 }}>Join Now</li>
                    </ul>
                </div>
            </nav>

            <main style={{ marginTop: '100px', minHeight: 'calc(100vh - 80px - 200px)' }}>
                {/* --- VIEWS --- */}

                {/* HOME */}
                {view === 'home' && !subView && (
                    <section className="hero">
                        <div className="hero-bg"></div>
                        <div className="hero-content">
                            <h1>Tech Roxx <span>Learn. Build. Innovate.</span></h1>
                            <p>Empowering students across all domains with AI, IoT, Programming & Future Skills.</p>
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button onClick={() => handleNav('services')} className="btn btn-primary">Explore Programs</button>
                                <button onClick={() => handleNav('contact')} className="btn btn-secondary" style={{ marginLeft: 0 }}>Join Community</button>
                                <button onClick={() => openProgramDetails('placement')} className="btn" style={{ border: '2px solid #0f172a', color: '#0f172a', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                    Placement Guide <i className="fas fa-bullseye" style={{ marginLeft: '5px', fontSize: '0.8em' }}></i>
                                </button>
                                <button onClick={() => handleNav('partners')} className="btn" style={{ border: '2px solid #16a34a', color: '#16a34a', boxShadow: '0 0 10px rgba(22, 163, 74, 0.2)' }}>
                                    Our Friendly Organisations <i className="fas fa-handshake" style={{ marginLeft: '5px', fontSize: '0.8em' }}></i>
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* ABOUT - Now visible on Home as well */}
                {((view === 'home' || view === 'about') && !subView) && (
                    <section className="section-padding about animate-enter" id="about">
                        <div className="container">
                            <h2 className="section-title">Who We Are</h2>
                            <p className="section-subtitle">Bridging Academics & Industry</p>
                            <p className="about-text">
                                Tech Roxx is a futuristic learning platform empowering students with hands-on training in AI, IoT, Programming, Embedded Systems, Product Management, and Career Development. We bridge the gap between academics and industry through real-time projects, workshops, mentorship, and placement assistance.
                            </p>
                            <div className="highlight-grid staggered-fade-in">
                                <div className="highlight-card">
                                    <i className="fas fa-microchip highlight-icon"></i>
                                    <h3 className="highlight-title">Future-Ready Skills</h3>
                                    <p>Master the latest tools in AI, IoT, and Cloud Computing.</p>
                                </div>
                                <div className="highlight-card">
                                    <i className="fas fa-tools highlight-icon"></i>
                                    <h3 className="highlight-title">Hands-On Learning</h3>
                                    <p>Don't just learn theory. Build real prototypes and applications.</p>
                                </div>
                                <div className="highlight-card">
                                    <i className="fas fa-user-tie highlight-icon"></i>
                                    <h3 className="highlight-title">Industry Mentorship</h3>
                                    <p>Learn directly from experts working in top tech companies.</p>
                                </div>
                            </div>

                            <div style={{ marginTop: '80px' }}>
                                <h2 className="section-title">Leadership</h2>
                                <p className="section-subtitle">Visionaries Behind Tech Roxx</p>
                                <div className="leader-flex">
                                    <div className="leader-card">
                                        <img src={leader} alt="Mr. Hemanth Goud Burra" className="leader-img" />
                                        <div className="leader-name">Mr. Hemanth Goud Burra</div>
                                        <div className="leader-role">CEO</div>
                                        <a href="tel:+919550251208" className="leader-phone"><i className="fas fa-phone-alt"></i> +91 9550251208</a>
                                        <div className="leader-social">
                                            <a href="https://www.instagram.com/hemanth_bhg_x11/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                    <div className="leader-card">
                                        <img src="./img/KSP.jpg" alt="Mr. Keerthi Shiva Prasad" className="leader-img" />
                                        <div className="leader-name">Mr. Keerthi Shiva Prasad</div>
                                        <div className="leader-role">COO</div>
                                        <a href="tel:+919347808586" className="leader-phone"><i className="fas fa-phone-alt"></i> +91 9347808586</a>
                                        <div className="leader-social">
                                            <a href="https://www.instagram.com/keerthi_shiva_prasad" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* DEPARTMENTS */}
                {view === 'departments' && !subView && (
                    <section className="section-padding departments animate-enter">
                        <div className="container">
                            <h2 className="section-title">Departments</h2>
                            <p className="section-subtitle">Specialized Training Tracks</p>
                            <div className="dept-grid staggered-fade-in">
                                <div className="dept-card" onClick={() => openDepartmentPage('computing')}>
                                    <div className="dept-header">
                                        <i className="fas fa-laptop-code dept-icon"></i>
                                        <div>
                                            <div className="dept-title">Dept. of Computing</div>
                                            <div className="dept-subtitle">CSE / MCA / BCA / B.Com</div>
                                        </div>
                                    </div>
                                    <div className="dept-body">
                                        <ul className="dept-list">
                                            <li>AI / Machine Learning (ML)</li>
                                            <li>Deep Learning & Computer Vision</li>
                                            <li>Generative & Agentic AI</li>
                                            <li>Python, Java, C++</li>
                                            <li>MERN / Full Stack Dev</li>
                                            <li>DSA (Data Structures)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dept-card" onClick={() => openDepartmentPage('electra')}>
                                    <div className="dept-header">
                                        <i className="fas fa-bolt dept-icon"></i>
                                        <div>
                                            <div className="dept-title">Dept. of Electra</div>
                                            <div className="dept-subtitle">ECE / EEE / EIE</div>
                                        </div>
                                    </div>
                                    <div className="dept-body">
                                        <ul className="dept-list">
                                            <li>Internet of Things (IoT)</li>
                                            <li>Embedded Systems</li>
                                            <li>Microcontrollers & Sensors</li>
                                            <li>PCB Design & Prototyping</li>
                                            <li>Real-Time Hardware Projects</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dept-card" onClick={() => openDepartmentPage('arts-management')}>
                                    <div className="dept-header">
                                        <i className="fas fa-chart-line dept-icon"></i>
                                        <div>
                                            <div className="dept-title">Arts & Management</div>
                                            <div className="dept-subtitle">Business & Analytics</div>
                                        </div>
                                    </div>
                                    <div className="dept-body">
                                        <ul className="dept-list">
                                            <li>Product Management with AI</li>
                                            <li>HR Mgmt + Data Analytics</li>
                                            <li>Basics of SAP & ERP</li>
                                            <li>Business Analytics</li>
                                            <li>Digital Workplace Tools</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* SERVICES */}
                {view === 'services' && !subView && (
                    <section className="section-padding programs animate-enter">
                        <div className="container">
                            <h2 className="section-title">Our Services</h2>
                            <p className="section-subtitle">Comprehensive Career Support & Expert Consultancy</p>
                            
                            <h3 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.5rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)' }}>Training Programs</h3>
                            <div className="program-grid staggered-fade-in">
                                {[
                                    {id: 'workshops', icon: 'fa-chalkboard-teacher', text: 'Workshops'},
                                    {id: 'webservices', icon: 'fa-globe', text: 'Web Services & Portfolio'},
                                    {id: 'webinars', icon: 'fa-video', text: 'Webinars'},
                                    {id: 'hackathons', icon: 'fa-code', text: 'Hackathons'},
                                    {id: 'meetups', icon: 'fa-users', text: 'Meetups'},
                                    {id: 'projects', icon: 'fa-project-diagram', text: 'Real-Time Projects'},
                                    {id: 'internships', icon: 'fa-briefcase', text: 'Internship Assist'},
                                    {id: 'placement', icon: 'fa-bullseye', text: 'Placement Guide'},
                                    {id: 'roadmaps', icon: 'fa-map-signs', text: 'Industry Roadmaps'},
                                    {id: 'certifications', icon: 'fa-certificate', text: 'Certifications'},
                                    {id: 'job-architect', icon: 'fa-user-tie', text: 'Job Architect'}
                                ].map(item => (
                                    <div key={item.id} className="neon-card" onClick={() => item.id === 'job-architect' ? openJobArchitect() : openProgramDetails(item.id)}>
                                        <i className={`fas ${item.icon} neon-icon`}></i>
                                        <div className="neon-text">{item.text}</div>
                                        {/* Added Ribbon For Popular Items */}
                                        {(item.id === 'internships' || item.id === 'placement') && (
                                            <div className="ribbon-wrapper">
                                                <div className="ribbon">POPULAR</div>
                                            </div>
                                        )}
                                        {item.id === 'job-architect' && (
                                            <div className="ribbon-wrapper">
                                                <div className="ribbon" style={{backgroundColor: '#ea580c'}}>NEW</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <h3 style={{ textAlign: 'center', margin: '60px 0 30px', fontSize: '1.5rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>Consultancy Services</h3>
                            <div className="consultancy-grid staggered-fade-in">
                                {Object.entries(consultancyData).map(([key, data]) => (
                                    <div key={key} className="consultancy-card" onClick={() => openConsultancyPage(key)}>
                                        <i className={`fas ${data.icon} consultancy-icon`}></i>
                                        <h3 className="consultancy-title">{data.title}</h3>
                                        <p>{data.content}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                                <button className="btn btn-primary" onClick={() => openProgramDetails('projects')}>
                                    <i className="fas fa-project-diagram" style={{ marginRight: '10px' }}></i> View Projects
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* PARTNERS */}
                {view === 'partners' && !subView && (
                    <section className="section-padding about animate-enter">
                        <div className="container">
                            <h2 className="section-title">Our Friendly Organisations</h2>
                            <p className="section-subtitle">Collaborating for a Better Future</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '50px' }}>
                                <a href="https://www.taskveda.in/" target="_blank" rel="noreferrer" className="btn btn-orange" style={{ marginLeft: 0, padding: '20px 40px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="fas fa-check-circle" style={{ fontSize: '1.5rem' }}></i> Taskveda
                                </a>
                            </div>
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '50px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                                We are proud to partner with organizations that share our vision of empowering students and driving innovation.
                            </p>
                        </div>
                    </section>
                )}

                {/* CONTACT */}
                {view === 'contact' && !subView && (
                    <section className="section-padding community animate-enter">
                        <div className="container">
                            <h2 className="section-title">Join The Community</h2>
                            <p className="section-subtitle">Connect with us on Social Media</p>
                            <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '30px', fontSize: '1.1rem' }}>
                                For inquiries, pricing, and details, reach us directly at <br />
                                <strong style={{ color: 'var(--secondary-blue)', fontSize: '1.3rem' }}>+91 9550251208</strong>
                            </p>
                            <div className="social-grid">
                                <a href="tel:+919550251208" className="social-btn" style={{ borderColor: 'var(--secondary-blue)', color: 'var(--secondary-blue)' }}>
                                    <i className="fas fa-phone-alt"></i> Call Us
                                </a>
                                <a href="https://www.instagram.com/tech_roxx.ig" target="_blank" rel="noreferrer" className="social-btn ig">
                                    <i className="fab fa-instagram"></i> Instagram
                                </a>
                                <a href="https://www.linkedin.com/in/tech-roxxln/" target="_blank" rel="noreferrer" className="social-btn li">
                                    <i className="fab fa-linkedin"></i> LinkedIn
                                </a>
                                <a href="https://youtube.com/@techroxxyt" target="_blank" rel="noreferrer" className="social-btn yt">
                                    <i className="fab fa-youtube"></i> YouTube
                                </a>
                                <a href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" target="_blank" rel="noreferrer" className="social-btn wa">
                                    <i className="fab fa-whatsapp"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- SUB VIEWS (DETAILS) --- */}

                {/* JOB ARCHITECT SUB VIEW */}
                {subView === 'job-architect' && (
                    <section className="section-padding animate-enter">
                        <div className="container">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => handleNav('services')}>
                                    <i className="fas fa-arrow-left"></i> Back to Services
                                </button>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Job Architect</h2>
                                    <span style={{fontSize:'0.7rem', padding:'2px 6px', background:'#ea580c', color:'white', borderRadius:'4px', fontWeight:'bold', textTransform:'uppercase'}}>Beta</span>
                                </div>
                            </div>

                            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                                    <h3 style={{color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '10px'}}>AI Resume Assistant</h3>
                                    <p style={{color: 'var(--text-muted)'}}>Enter your skills below to receive industry-standard resume architecture and project roadmaps tailored for you.</p>
                                </div>

                                <div style={{background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)'}}>
                                    <div style={{marginBottom: '20px'}}>
                                        <label style={{display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', textTransform: 'uppercase'}}>Your Skillset</label>
                                        <textarea 
                                            value={jaSkillsInput}
                                            onChange={(e) => setJaSkillsInput(e.target.value)}
                                            placeholder="e.g. AI, Machine Learning, Python, Full Stack Development, IoT..."
                                            style={{width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '120px', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', resize: 'vertical'}}
                                        />
                                    </div>
                                    <button 
                                        onClick={generateResumeSuggestions}
                                        disabled={jaIsLoading}
                                        className="btn btn-primary" 
                                        style={{width: '100%', padding: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}
                                    >
                                        {jaIsLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Analyzing Skills...
                                            </>
                                        ) : "Get Expert Suggestions"}
                                    </button>
                                    {jaError && <p style={{color: 'red', marginTop: '15px', textAlign: 'center', fontSize: '0.9rem'}}>{jaError}</p>}
                                </div>

                                {(jaSuggestedSections.length > 0 || jaSuggestedProjects.length > 0) && (
                                    <div className="animate-enter" style={{marginTop: '40px'}}>
                                        {/* Resume Sections */}
                                        <div style={{marginBottom: '40px'}}>
                                            <h3 style={{color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.3rem'}}>Recommended Resume Sections</h3>
                                            <div style={{display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
                                                {jaSuggestedSections.map((item, idx) => (
                                                    <div key={idx} style={{background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}}>
                                                        <h4 style={{color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold'}}>{item.sectionName}</h4>
                                                        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.5'}}>{item.description}</p>
                                                        <div style={{fontSize: '0.8rem', color: '#ea580c', fontWeight: '600', textTransform: 'uppercase'}}>Strategic Reason:</div>
                                                        <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic'}}>{item.reason}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Projects */}
                                        <div>
                                            <h3 style={{color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.3rem'}}>Showcase Projects</h3>
                                            <div style={{display: 'grid', gap: '20px'}}>
                                                {jaSuggestedProjects.map((proj, idx) => (
                                                    <div key={idx} onClick={() => handleCopy(proj.description)} style={{background: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--secondary-blue)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative'}}>
                                                        <i className="fas fa-copy" style={{position: 'absolute', top: '20px', right: '20px', color: '#cbd5e1'}}></i>
                                                        <h4 style={{color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'bold'}}>{proj.projectName}</h4>
                                                        <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '15px', lineHeight: '1.6'}}>{proj.description}</p>
                                                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                                                            {proj.skillsShowcased.map((skill, sIdx) => (
                                                                <span key={sIdx} style={{background: '#f1f5f9', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase'}}>{skill}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p style={{textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.85rem'}}>Click on a project card to copy the description.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* PROGRAM DETAILS */}
                {subView === 'program-details' && (
                    <section className="section-padding animate-enter">
                        <div className="container">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => handleNav('services')}>
                                    <i className="fas fa-arrow-left"></i> Back to Services
                                </button>
                                <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>
                                    {selectedId === 'placement' ? 'Placement Guide' : selectedId.charAt(0).toUpperCase() + selectedId.slice(1) + ' Details'}
                                </h2>
                            </div>
                            <div className="detail-list">
                                {selectedId === 'placement' ? (
                                    <>
                                        <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-muted)' }}>Explore career pages of top companies categorized by industry.</p>
                                        
                                        {/* MOVED TO TOP: Explore More Opportunities */}
                                        <div style={{ marginBottom: '40px', textAlign: 'center', padding: '30px', background: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <h3 style={{ color: 'var(--text-main)', marginBottom: '20px', fontFamily: 'var(--font-head)' }}>Explore More Opportunities</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                                                <a href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderColor: '#25D366', color: '#25D366', fontSize: '0.9rem', padding: '8px 18px' }}>
                                                    <i className="fab fa-whatsapp"></i> Join WhatsApp Community
                                                </a>
                                                <button onClick={openJobRolesPage} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '8px 18px' }}>
                                                    <i className="fas fa-briefcase"></i> Understand the Roles
                                                </button>
                                            </div>
                                        </div>

                                        {Object.entries(placementCompanies).map(([category, companies]) => (
                                            <div key={category}>
                                                <h3 style={{ color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginTop: '30px', marginBottom: '20px' }}>{category}</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                                                    {companies.map((company, idx) => (
                                                        <div key={idx} style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                            <div>
                                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '5px' }}>{company.name}</h4>
                                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px' }}>{company.role}</p>
                                                            </div>
                                                            <a href={company.link} target="_blank" rel="noreferrer" className="btn" style={{ textAlign: 'center', background: 'var(--bg-panel)', color: 'var(--secondary-blue)', border: '1px solid var(--secondary-blue)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', width: '100%' }}>
                                                                Visit Career Page <i className="fas fa-external-link-alt" style={{ marginLeft: '5px' }}></i>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {(programData[selectedId] || []).map((item, idx) => (
                                            <div key={idx} className="detail-item" onClick={() => item.link ? window.open(item.link, '_blank') : alert("Registration opening soon!")} style={{ cursor: 'pointer' }}>
                                                <div className="detail-info">
                                                    <h3>{item.title} {item.link && <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em', marginLeft: '5px' }}></i>}</h3>
                                                    <p>{item.desc}</p>
                                                    <span style={{ color: 'var(--secondary-blue)', fontSize: '0.8rem', marginTop: '5px', display: 'block' }}>
                                                        <i className="far fa-calendar-alt"></i> {item.date}
                                                    </span>
                                                </div>
                                                <div className="detail-action">
                                                    <i className="fas fa-chevron-right"></i>
                                                </div>
                                            </div>
                                        ))}
                                        {(!programData[selectedId] || programData[selectedId].length === 0) && <p style={{ textAlign: 'center', color: '#777' }}>No active programs in this category at the moment.</p>}
                                        
                                        <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', borderTop: '1px solid #e2e8f0' }}>
                                            <h3 style={{ color: 'var(--text-main)', marginBottom: '15px', fontFamily: 'var(--font-head)' }}>
                                                {selectedId === 'workshops' ? "Want to organize a Workshop?" : selectedId === 'internships' ? "Join our Community for Updates" : "Ask for Details and Pricing"}
                                            </h3>
                                            <a href={selectedId === 'internships' ? "https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" : "tel:+919550251208"} target={selectedId === 'internships' ? "_blank" : "_self"} rel="noreferrer" className="btn btn-primary" style={selectedId === 'internships' ? { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 14px', borderColor: '#25D366', color: '#25D366' } : { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 14px' }}>
                                                <i className={`fab ${selectedId === 'internships' ? "fa-whatsapp" : "fa-phone-alt"}`}></i>
                                                {selectedId === 'workshops' ? "Ask for a Workshop" : selectedId === 'internships' ? "Join WhatsApp Community" : "Call for Details"}
                                            </a>
                                            <p style={{ marginTop: '15px', color: 'var(--secondary-blue)', fontSize: '1rem', fontWeight: 'bold' }}>
                                                {selectedId !== 'internships' && 'Contact: 9550251208'}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* CONSULTANCY DETAILS */}
                {subView === 'consultancy-details' && selectedData && (
                    <section className="section-padding animate-enter">
                        <div className="container">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => handleNav('services')}>
                                    <i className="fas fa-arrow-left"></i> Back to Services
                                </button>
                                <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Details</h2>
                            </div>
                            <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <i className={`fas ${selectedData.icon}`} style={{ fontSize: '4rem', color: 'var(--text-main)', marginBottom: '20px' }}></i>
                                <h3 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', marginBottom: '20px' }}>{selectedData.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 30px auto' }}>
                                    {selectedData.content}
                                </p>
                                <a href="tel:+919550251208" className="btn btn-primary">
                                    <i className="fas fa-phone-alt" style={{ marginRight: '10px' }}></i> Contact Expert
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* DEPARTMENT DETAILS */}
                {subView === 'dept-details' && selectedData && (
                    <section className="section-padding animate-enter" style={{ 
                        background: selectedData.bgImage ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url('${selectedData.bgImage}')` : 'var(--bg-dark)',
                        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
                    }}>
                        <div className="container">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => handleNav('departments')}>
                                    <i className="fas fa-arrow-left"></i> Back to Departments
                                </button>
                                <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Details</h2>
                            </div>
                            <p style={{ textAlign: 'center', color: 'var(--secondary-blue)', marginBottom: '40px', fontSize: '1.2rem', fontWeight: 600 }}>{selectedData.title} - {selectedData.subtitle}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                {selectedData.technologies.map(tech => (
                                    <div key={tech.id} onClick={() => openTopicPage(tech.id, tech.name)} style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'left', cursor: 'pointer', transition: '0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }} className="dept-tech-card">
                                        <h3 style={{ color: 'var(--secondary-blue)', marginBottom: '10px', fontSize: '1.1rem' }}>{tech.name}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{tech.desc}</p>
                                        <div style={{ marginTop: '15px', color: 'var(--primary-red)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            View Topics <i className="fas fa-arrow-right" style={{ marginLeft: '5px' }}></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* TOPIC DETAILS */}
                {subView === 'topic-details' && selectedData && (
                    <section className="section-padding animate-enter" style={{ background: 'var(--bg-dark)' }}>
                        <div className="container">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => handleNav('departments')}>
                                    <i className="fas fa-arrow-left"></i> Back to Departments
                                </button>
                                <h2 className="section-title" style={{ marginBottom: 0, fontSize: '1.8rem', textAlign: 'right' }}>{selectedData.name}</h2>
                            </div>
                            <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Curriculum Highlights</h4>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {selectedData.list?.map((topic, idx) => (
                                        <li key={idx} style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', color: 'var(--text-muted)', fontSize: '1.1rem', display: 'flex', alignItems: 'flex-start' }}>
                                            <i className="fas fa-check-circle" style={{ color: 'var(--secondary-blue)', marginRight: '15px', marginTop: '5px' }}></i> {topic}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                    <button onClick={() => handleNav('contact')} className="btn btn-primary">Enroll in this Track</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* JOB ROLES */}
                {subView === 'job-roles' && (
                    <section className="section-padding animate-enter" style={{ background: 'var(--bg-panel)' }}>
                        <div className="container">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => openProgramDetails('placement')}>
                                    <i className="fas fa-arrow-left"></i> Back to Guide
                                </button>
                                <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Job Roles & Skills</h2>
                            </div>
                            <div>
                                {Object.entries(jobRolesData).map(([category, roles]) => (
                                    <div key={category}>
                                        <h3 style={{ color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginTop: '40px', marginBottom: '20px' }}>{category}</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                            {roles.map((role, idx) => (
                                                <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '10px', fontWeight: '700' }}>{role.role}</h4>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', lineHeight: 1.5 }}>{role.desc}</p>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '5px' }}>
                                                        <strong>Skills:</strong> <span style={{ color: 'var(--secondary-blue)' }}>{role.skills}</span>
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                                                        <strong>Degree:</strong> {role.degree}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* CHAT WIDGET */}
            <div className="chat-widget">
                {isChatOpen && (
                    <div className="chat-window">
                        <div className="chat-header">
                            <div className="chat-title"><i className="fas fa-robot"></i> Tech Roxx Bot</div>
                            <button className="chat-close" onClick={() => setIsChatOpen(false)}><i className="fas fa-times"></i></button>
                        </div>
                        <div className="chat-messages">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.sender === 'bot' ? 'msg-bot' : 'msg-user'}`} dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="chat-input-area">
                            <input 
                                type="text" 
                                className="chat-input" 
                                placeholder="Type a message..." 
                                value={chatInput} 
                                onChange={(e) => setChatInput(e.target.value)} 
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button className="chat-send" onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                )}
                <button className="chat-toggle-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
                    <i className="fas fa-comment-dots"></i>
                </button>
            </div>

            {/* FOOTER */}
            {/* FIX 3: Replaced <a href="#"> with <button> to fix accessible link errors */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div>
                            <button className="footer-logo-btn" onClick={() => handleNav('home')}>
                                <img src={logo} alt="Tech Roxx" style={{ height: '35px', verticalAlign: 'middle', marginRight: '10px', borderRadius: '6px', border: '2px solid white' }} /> TECH ROXX
                            </button>
                            <p style={{ opacity: 0.9 }}>Transforming Students Into Future Leaders.</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>Explore</h4>
                            <ul className="footer-links">
                                <li><button className="footer-btn" onClick={() => handleNav('about')}>About</button></li>
                                <li><button className="footer-btn" onClick={() => handleNav('departments')}>Departments</button></li>
                                <li><button className="footer-btn" onClick={() => handleNav('services')}>Programs</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>Contact</h4>
                            <ul className="footer-links">
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i> Hyderabad, India
                                </li>
                                <li>
                                    <a href="tel:+919550251208">
                                        <i className="fas fa-phone" style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i> +91 9550251208
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info.e@techroxx.in">
                                        <i className="fas fa-envelope" style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i> info.e@techroxx.in
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright">
                        &copy; 2024 Tech Roxx. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
