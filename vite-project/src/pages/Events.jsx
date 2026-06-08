import React, { useState } from 'react';

const Events = () => {
    // State to handle the document viewer modal
    const [viewDoc, setViewDoc] = useState(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Advanced ECE Masterclass day-by-day technical curriculum
    const eceSessions = [
        {
            day: 1,
            title: "Introduction to Electronics Engineering & Career Paths",
            youtubeUrl: "https://www.youtube.com/embed/898lXaifnRs",
            bullets: [
                "Detailed overview of VLSI Design, PCB Fabrication, and Embedded Systems.",
                "Exploration of the historical evolution of modern semiconductor platforms.",
                "Bridging the critical gap between college curriculums and high-scale consumer electronics roles.",
                "Practical roadmaps for entry-level engineering placements."
            ]
        },
        {
            day: 2,
            title: "OS Concepts & C++ in Electronics",
            youtubeUrl: "https://www.youtube.com/embed/GLOygqKS8PY",
            bullets: [
                "The evolution from physical mechanical switches to resident monitors and modern kernels.",
                "Hardware efficiency landmarks and the design of Hardware Abstraction Layers (HAL) in UNIX.",
                "Real-Time Operating Systems (RTOS) vs. traditional General Purpose Operating Systems.",
                "Memory constraints & specialized language subsets in high-stakes environments (MISRA & JSF C++)."
            ]
        },
        {
            day: 3,
            title: "Electric Vehicle Architecture, Embedded Systems & IoT",
            youtubeUrl: "https://www.youtube.com/embed/VvtpEUjdk-I",
            bullets: [
                "C++ register-level direct control parameters for medical and aerospace electronics.",
                "Electric Vehicle powertrain, Electronic Control Units (ECUs), and Battery Management Systems (BMS).",
                "Four-layer IoT stack analysis: Perception, Network, Processing, and Application.",
                "Contrast of industrial IoT application protocols: MQTT vs. HTTP."
            ]
        },
        {
            day: 4,
            title: "Basic Electronics Components & Circuit Analysis for VLSI",
            youtubeUrl: "https://www.youtube.com/embed/Ys-j8PXDTqk",
            bullets: [
                "Visual flow analogies representing electrical Voltage, Current, and Resistance.",
                "Working mechanics and design characteristics of Resistors, Capacitors, and Transistors.",
                "Applying Kirchhoff's Voltage Law (KVL) and Current Law (KCL) for chip architectures.",
                "Simulating analog circuits virtually to model wave shapes under alternative frequencies."
            ]
        },
        {
            day: 5,
            title: "Digital Electronics Concepts & Simulations",
            youtubeUrl: "https://www.youtube.com/embed/XgPCTKjjYCk",
            bullets: [
                "Binary logic systems as the foundational baseline for microprocessors and hardware logic.",
                "Evaluating truth tables, Boolean Algebra, and De Morgan’s Theorems.",
                "Practical demonstration using simulation environments like Logisim and TinkerCAD.",
                "Debugging logic routing waveforms virtualized inside GTKWave prior to layout generation."
            ]
        },
        {
            day: 6,
            title: "Combinational & Sequential Circuits for VLSI",
            youtubeUrl: "https://www.youtube.com/embed/jpV25DvsQlY",
            bullets: [
                "Combinational Logic architectures relying entirely on current input cycles (Adders, MUX).",
                "Sequential Logic systems tracking historical memory registers locked with synchronized clocks.",
                "Practical simulation and wiring diagrams of Adders, Multipliers, Multiplexers, and Flip-Flops.",
                "Scaling gates up into complete Arithmetic Logic Units (ALUs) and hardware register blocks."
            ]
        },
        {
            day: 7,
            title: "Linux & Programming Basics",
            youtubeUrl: "https://www.youtube.com/embed/ZneX5EC5um0",
            bullets: [
                "Mastery of the Linux Terminal as the standardized platform for premium industrial EDA tools.",
                "Contrast between direct memory pointer management in low-level C programming.",
                "Deploying High-level Python automated scripting engines for rapid system level testing.",
                "Optimizing compiler pipelines to bridge the interface between developer logic and machine code."
            ]
        },
        {
            day: 8,
            title: "HDL Programming - Verilog Hardware Architectures",
            youtubeUrl: "https://www.youtube.com/embed/9khVsCcSHTk",
            bullets: [
                "Differentiating physical RTL hardware design from traditional soft application execution.",
                "Configuring modular hierarchies with custom input/output port communications.",
                "Defining physical electronic hardware behaviors targetable for ASICs and FPGA arrays.",
                "Structuring comprehensive testing verification frameworks using hardware test benches."
            ]
        },
        {
            day: 9,
            title: "RTL Logic Families & EDA Tools Essentials",
            youtubeUrl: "https://www.youtube.com/embed/CaL3QzJcYmk",
            bullets: [
                "Diving deep into Register Transfer Level logic as the key abstraction for semiconductor design.",
                "Evaluating structural demand parameters in today's multi-billion dollar foundry services.",
                "Schematic capturing inside premium EDA platforms: KiCad, EasyEDA Pro, and Flux AI.",
                "Transitioning circuit models seamlessly into hardware-routeable layout blueprints."
            ]
        },
        {
            day: 10,
            title: "PCB Design Fundamentals",
            youtubeUrl: "https://www.youtube.com/embed/dqoF7qm1sOw",
            bullets: [
                "Structural anatomy of PCB substrates (Fr4, Rigids, Flexible boards).",
                "Directing high-speed routing traces while actively mitigating electromagnetic interference.",
                "The mechanical and physical utility of Copper Vias, Solder Masks, and Silkscreens.",
                "Industrial manufacturing checklists, panelization steps, and design-for-manufacturability."
            ]
        }
    ];

    // Ignite AI 2026 flagship day-by-day curriculum mapping
    const igniteSessions = [
        {
            day: 1,
            title: "AI Fundamentals & Personal Branding",
            bullets: [
                "Detailed anatomy of Large Language Models (LLMs) and advanced Prompt Engineering architectures.",
                "Setting global system guardrails, variable constraints, and structured output formatting.",
                "Assigned Practical: 'BRAND ME 2026' - Designing a personal product launch using Canva AI and Copilot.",
                "Public Deployment: Constructing professional branding portfolios shared live onto student LinkedIn profiles."
            ]
        },
        {
            day: 2,
            title: "AI-Optimized Career Positioning & ATS Resume Architecture",
            bullets: [
                "Reverse-engineering job postings to identify technical keyword densities required by HR filters.",
                "Anatomy of automated Applicant Tracking Systems (ATS) parsing algorithms and ranking formulas.",
                "Overleaf LaTeX template layouts for premium machine readability vs. rich graphic design templates.",
                "Assigned Practical: Compilation and verification of an ATS-compliant resume and personal portfolio website."
            ]
        },
        {
            day: 3,
            title: "Enterprise AI & Multimodal Generation",
            bullets: [
                "Exploring Enterprise AI frameworks, cloud architecture platforms (AWS, Azure, GCP), and ERP/CRM automation.",
                "Multi-modal generative structures capturing and compiling media via Google Gemini and Imagen.",
                "Introduction to Retrieval-Augmented Generation (RAG) pipelines designed to reduce agentic hallucinations.",
                "Credential validation: Completing IBM SkillsBuild and Google Cloud Skills Boost certifications."
            ]
        },
        {
            day: 4,
            title: "Machine Learning Fundamentals to MLOps",
            bullets: [
                "Comparing traditional deterministic algorithms with modern data-driven statistical learning weights.",
                "Curriculum coverage: Supervised, Unsupervised, and Reinforcement models alongside data engineering loops.",
                "Evaluating accuracy metrics using Precision-Recall, F1-Scores, and overfitting/underfitting curves.",
                "Deep Learning architectures, multi-layered Artificial Neural Networks, and computer vision deployment pipelines."
            ]
        },
        {
            day: 5,
            title: "Agentic AI & Intelligent Automation",
            bullets: [
                "Moving beyond static chatbots into active autonomous agents (Perception, Planning, Memory, Action loops).",
                "Establishing short/long-term context memories using vector stores and dynamic database integrations.",
                "RPA (Robotic Process Automation) architectures using UiPath, Power Automate, n8n, and Make.",
                "Role Specialization: Simulating multi-agent collaborative frameworks (Researchers, Writers, and Analysts)."
            ]
        },
        {
            day: "6 & 7",
            title: "AI Application Development, Future Tech & Capstone Presentation",
            bullets: [
                "Building functional applications with Python, OpenAI APIs, Google AI Studio, CrewAI, and LangGraph.",
                "Comprehensive overview of India's National AI Mission, local GPU compute clusters, and physical robotics.",
                "Detailed 8-stage Industry Project Development Lifecycle walkthrough (from scoping to live product scaling).",
                "Graduation: Live Capstone project presentations evaluated by an industry executive review panel."
            ]
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', overflow: 'hidden', position: 'relative', color: 'var(--text-main)', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800;900&display=swap');

                :root {
                    --bg-dark: #f8fafc; /* Slate White Background */
                    --bg-panel: #ffffff; /* Pure White Panels */
                    --glass-border: rgba(15, 23, 42, 0.1); /* Subtle dark border */
                    --text-main: #0f172a; /* Slate Black Text */
                    --text-muted: #475569; /* Slate Muted Text */
                    --primary-brand: #ea580c; /* Orange Elements */
                    --primary-brand-light: rgba(234, 88, 12, 0.1);
                    --card-shadow: 0 15px 35px -10px rgba(15, 23, 42, 0.08);
                }

                * { box-sizing: border-box; }
                
                h1, h2, h3, h4, h5, h6, .montserrat-heading {
                    font-family: 'Montserrat', sans-serif;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .section-padding { padding: 100px 0; }
                .section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; text-align: center; letter-spacing: -0.5px; color: var(--text-main); }
                .section-subtitle { color: var(--text-muted); text-align: center; margin-bottom: 50px; font-size: 1.15rem; }

                .events-glow-orb {
                    position: absolute;
                    width: 550px;
                    height: 550px;
                    border-radius: 50%;
                    filter: blur(120px);
                    z-index: 0;
                    pointer-events: none;
                }
                .glow-orb-orange {
                    top: -100px;
                    right: -50px;
                    background: radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%);
                }
                .glow-orb-slate {
                    bottom: -150px;
                    left: -100px;
                    background: radial-gradient(circle, rgba(15, 23, 42, 0.08) 0%, transparent 70%);
                }

                /* Custom ECE Section styling */
                .ece-unit-card {
                    background: var(--bg-panel);
                    border: 1px solid var(--glass-border);
                    border-radius: 20px;
                    padding: 28px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: var(--card-shadow);
                }
                .ece-unit-card:hover {
                    transform: translateY(-6px);
                    border-color: var(--primary-brand);
                    box-shadow: 0 15px 35px rgba(234, 88, 12, 0.15);
                }
                
                /* Large direct watch recordings grid */
                .recordings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
                    gap: 40px;
                }
                @media (max-width: 991px) {
                    .recordings-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .yt-session-card {
                    display: flex;
                    flex-direction: column;
                    background: var(--bg-panel);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 30px;
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                    height: 100%;
                    box-shadow: var(--card-shadow);
                }
                .yt-session-card:hover {
                    border-color: var(--primary-brand);
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(234, 88, 12, 0.12);
                }

                /* Clean Ignite Session Card */
                .ignite-session-card {
                    display: flex;
                    flex-direction: column;
                    background: var(--bg-panel);
                    border: 1px solid var(--glass-border);
                    border-radius: 20px;
                    padding: 28px;
                    transition: transform 0.3s ease, border-color 0.3s ease;
                    height: 100%;
                    box-shadow: var(--card-shadow);
                }
                .ignite-session-card:hover {
                    border-color: var(--text-main);
                    transform: translateY(-4px);
                    box-shadow: 0 15px 30px rgba(15, 23, 42, 0.1);
                }
                
                .btn {
                    padding: 12px 28px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 700;
                    font-family: 'Inter', sans-serif;
                    transition: all 0.3s ease;
                }
                .btn-primary {
                    background: var(--primary-brand);
                    color: white;
                    border: none;
                }
                .btn-primary:hover {
                    background: #c2410c;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(234, 88, 12, 0.25);
                }

                /* Categories grid used for "Why We Organize Events" */
                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                    margin-top: 40px;
                }
                .category-card {
                    background: var(--bg-panel);
                    border: 1px solid var(--glass-border);
                    padding: 35px;
                    border-radius: 24px;
                    box-shadow: var(--card-shadow);
                    transition: all 0.3s ease;
                }
                .category-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--primary-brand);
                    box-shadow: 0 15px 30px rgba(234, 88, 12, 0.12);
                }

                /* Document view overlay */
                .lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(8px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .doc-modal-content {
                    width: 95vw;
                    height: 94vh;
                    background: var(--bg-panel);
                    border-radius: 20px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
                    display: flex;
                    flex-direction: column;
                }
            `}</style>

            {/* Background Ambient Glows */}
            <div className="events-glow-orb glow-orb-orange"></div>
            <div className="events-glow-orb glow-orb-slate"></div>

            {/* 1. PAGE HEADER BANNER */}
            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200')`, marginTop: '70px', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <svg 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 1.2,
                        opacity: 0.15
                    }} 
                    viewBox="0 0 1000 300" 
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="banner-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    <g stroke="url(#banner-line-grad)" strokeWidth="2">
                        <line x1="50" y1="50" x2="200" y2="120" strokeDasharray="4,4" />
                        <line x1="200" y1="120" x2="350" y2="80" />
                        <line x1="350" y1="80" x2="500" y2="180" strokeDasharray="2,2" />
                        <line x1="500" y1="180" x2="680" y2="90" />
                        <line x1="680" y1="90" x2="850" y2="160" />
                        <line x1="850" y1="160" x2="950" y2="70" strokeDasharray="4,4" />
                    </g>
                    <g fill="#ea580c">
                        <circle cx="50" cy="50" r="5" />
                        <circle cx="350" cy="80" r="5.5" />
                        <circle cx="680" cy="90" r="5.5" />
                        <circle cx="950" cy="70" r="5" />
                    </g>
                    <g fill="#0f172a">
                        <circle cx="200" cy="120" r="5.5" />
                        <circle cx="500" cy="180" r="6.5" />
                        <circle cx="850" cy="160" r="5.5" />
                    </g>
                </svg>
                
                {/* Fixed Overlay: Darkened background wash to make the white text pop */}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 1.5 }}></div>
                
                <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2, padding: '120px 24px' }}>
                    <div className="page-header-content" style={{textAlign: 'center'}}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.15)', border: '1px solid rgba(234, 88, 12, 0.4)', color: '#ea580c', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 
                            TECHROXX HUB
                        </span>
                        {/* Fixed Text Colors: Overridden to white for high contrast */}
                        <h1 style={{ fontSize: '3.5rem', margin: '0 0 20px 0', fontWeight: 900, color: '#ffffff' }}>Events That Create Impact</h1>
                        <p style={{ fontSize: '1.3rem', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>Connecting Industries, Talent, Innovation, and Communities Through Meaningful Experiences.</p>
                    </div>
                </div>
            </div>

            {/* INTRO ABOUT BOX BELOW HERO */}
            <section style={{ position: 'relative', paddingTop: '40px', paddingBottom: '10px' }}>
                <div className="container">
                    <div style={{ 
                        padding: '45px 35px', 
                        borderRadius: '28px', 
                        marginBottom: '10px', 
                        position: 'relative', 
                        overflow: 'hidden',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--bg-panel)',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                            Techroxx organizes workshops, hackathons, bootcamps, competitions, webinars, community programs, and industry-driven events that help people learn, connect, innovate, and grow.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '25px' }}>
                            <button onClick={() => scrollToSection('ece-masterclass')} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                                Explore Masterclass
                            </button>
                            <button onClick={() => scrollToSection('ignite-ai-highlights')} className="btn" style={{ border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '12px 28px', fontSize: '0.95rem', background: 'transparent' }}>
                                View Ignite AI Highlights
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ADVANCED ECE MASTERCLASS SECTION */}
            <section id="ece-masterclass" style={{ position: 'relative', padding: '100px 0 80px', borderTop: '1px solid var(--glass-border)', background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-panel) 100%)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-brand-light)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '18px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                            15-Day Intensive Program
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.2, marginTop: 0 }}>
                            Advanced ECE Masterclass
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
                            A comprehensive industry readiness track designed to bridge academic theory and industrial application in electronics, embedded programming, IoT, and VLSI systems.
                        </p>
                    </div>

                    {/* Syllabus Grid */}
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '30px', textAlign: 'center', letterSpacing: '0.5px' }}>Course Syllabus</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '80px' }}>
                        {[
                            { unit: '01', title: 'Core OS, Embedded Programming, and EV Basics', items: ['Operating System Foundations', 'C++ for Embedded Systems (Performance & Control)', 'Python for Embedded Systems (Prototyping & Automation)', 'Nominal Electric Vehicle (EV) Architecture'] },
                            { unit: '02', title: 'Connectivity – IoT Protocols & Hardware Interfacing', items: ['Local Hardware Communication (Wired)', 'IoT Network Architecture', 'Wireless Protocols', 'IoT Application Protocols & Cloud Scripting'] },
                            { unit: '03', title: 'Silicon Logic - Digital Fundamentals & VHDL/Verilog', items: ['Digital Logic Recap', 'Introduction to Hardware Description Languages (HDL)', 'Register-Transfer Level (RTL) Design (Front-End)', 'VLSI/ASIC Design Flow Overview (Back-End)'] },
                            { unit: '04', title: 'Productization - PCB Design & Manufacturing', items: ['Introduction to PCB Design & CAD Tools', 'Schematic Anatomy & Architecture', 'Advanced PCB Routing Techniques', 'Manufacturing, Panelization, and Fabrication'] }
                        ].map((u, i) => (
                            <div key={i} className="ece-unit-card">
                                <div className="montserrat-heading" style={{ fontSize: '2rem', color: 'var(--text-main)', fontWeight: 900, marginBottom: '12px', opacity: 0.9 }}>{u.unit}<span style={{color: 'var(--primary-brand)'}}>.</span></div>
                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '15px', minHeight: '44px', marginTop: 0 }}>{u.title}</h4>
                                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {u.items.map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                                            <span style={{ color: 'var(--primary-brand)', fontSize: '0.75rem', marginTop: '3px' }}>❯</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Video Recordings Grid */}
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '30px', textAlign: 'center', letterSpacing: '0.5px' }}>Direct Masterclass Recordings</h3>
                    <div className="recordings-grid">
                        {eceSessions.map((sess) => (
                            <div key={sess.day} className="yt-session-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--primary-brand)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px' }}>Day {sess.day} Session</span>
                                    {sess.youtubeUrl && (
                                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-brand)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-brand)', display: 'inline-block' }}></span> LIVE RECORDING
                                        </span>
                                    )}
                                </div>
                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px', lineHeight: 1.3, marginTop: 0 }}>{sess.title}</h4>
                                
                                <div style={{ marginBottom: '24px', flex: 1 }}>
                                    <h5 style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Core Syllabus Covered:</h5>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {sess.bullets.map((bullet, index) => (
                                            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                                                <span style={{ color: 'var(--primary-brand)', fontSize: '0.8rem', marginTop: '2px' }}>⚡</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {sess.youtubeUrl ? (
                                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                        <iframe 
                                            src={sess.youtubeUrl} 
                                            title={sess.title}
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', padding: '50px 0', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.02)', border: '1px dashed rgba(15, 23, 42, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                        ⏸ Recording Processing (EDA Tools Sandbox Upload)
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. IGNITE AI 2026 — EVENT CONTENT HIGHLIGHTS */}
            <section id="ignite-ai-highlights" style={{ position: 'relative', padding: '100px 0 80px', borderTop: '1px solid var(--glass-border)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-brand-light)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '18px' }}>
                            🔥 Flagship Event
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.2, marginTop: 0 }}>
                            Ignite AI 2026 — Event Highlights
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                            A 7-day intensive bootcamp co-hosted by SDC SNIST & Tech Roxx. Moving beyond high-level theory into strict, practical execution, empowering students to build and deploy robust AI solutions.
                        </p>
                    </div>

                    {/* SDC Prominent Centerpiece Showcase */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '70px' }}>
                        <div style={{ 
                            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.03), rgba(15, 23, 42, 0.03))', 
                            border: '1px solid rgba(15, 23, 42, 0.08)', 
                            padding: '45px 35px', 
                            borderRadius: '32px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            maxWidth: '1000px', 
                            width: '100%', 
                            textAlign: 'center',
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            <div style={{ width: '100%', marginBottom: '30px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                <img 
                                    src="/sdc.jpg" 
                                    alt="SDC SNIST Student Developers Community x Tech Roxx" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        maxHeight: '450px', 
                                        objectFit: 'contain',
                                        background: '#f8fafc',
                                        display: 'block'
                                    }} 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "sdc.jpg";
                                    }}
                                />
                            </div>

                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px', marginTop: 0 }}>
                                Student Developers Community (SDC SNIST)
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '30px', lineHeight: 1.6, maxWidth: '750px' }}>
                                Fostering Innovation, technical leadership, and collaborative engineering in strategic alignment with Tech Roxx (MSME, Govt of India). Leading instruction powered by Mr. Hemanth Goud Burra (Founder & CEO, Tech Roxx).
                            </p>
                            
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a href="https://www.instagram.com/sdc.snist/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '12px 28px', borderRadius: '30px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(220, 39, 67, 0.25)' }}>
                                    Connect on Instagram
                                </a>
                                <a href="https://www.linkedin.com/company/sdc-snist-student-chapter/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{ color: 'white', background: '#0077b5', padding: '12px 28px', borderRadius: '30px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(0, 119, 181, 0.25)' }}>
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '70px' }}>
                        {[
                            { icon: '📅', value: '7', label: 'Full Days' },
                            { icon: '👥', value: '70+', label: 'Participants' },
                            { icon: '⭐', value: '10/10', label: 'Top Rating' },
                            { icon: '🧠', value: 'AI & ML & Computer Science', label: 'Core Focus' },
                            { icon: '🏆', value: 'Live', label: 'Project Demos' },
                            { icon: '📜', value: '100%', label: 'Certified' },
                        ].map(({ icon, value, label }) => (
                            <div key={label} style={{ background: 'var(--bg-panel)', border: `1px solid var(--glass-border)`, borderTop: `4px solid var(--primary-brand)`, borderRadius: '20px', padding: '28px 20px', textAlign: 'center', transition: 'transform 0.3s ease', boxShadow: 'var(--card-shadow)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '12px', display: 'block', filter: 'grayscale(0.2)' }}>{icon}</div>
                                <div className="montserrat-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>{value}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '8px' }}>{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Day-by-Day Content Cards */}
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '30px', textAlign: 'center', letterSpacing: '0.5px' }}>Ignite AI Session Details</h3>
                    <div className="recordings-grid">
                        {igniteSessions.map((sess) => (
                            <div key={sess.day} className="ignite-session-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--primary-brand)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px' }}>Day {sess.day} Session</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        BOOTCAMP MODULE
                                    </span>
                                </div>
                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px', lineHeight: 1.3, marginTop: 0 }}>{sess.title}</h4>
                                
                                <div style={{ marginBottom: '8px', flex: 1 }}>
                                    <h5 style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Technical Agenda:</h5>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {sess.bullets.map((bullet, index) => (
                                            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                                                <span style={{ color: 'var(--primary-brand)', fontSize: '0.8rem', marginTop: '2px' }}>✓</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. ABOUT TECHROXX EVENTS */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-panel) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">Why We Organize Events</h2>
                    <p className="section-subtitle">Bridging The Academic-Industry Divide Through Action</p>

                    <div className="categories-grid">
                        <div className="category-card">
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', marginTop: 0 }}>Connect Industry & Talent</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>Bringing corporate mentors, developers, startup founders, and hiring directors face-to-face with top engineering students.</p>
                        </div>
                        <div className="category-card">
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', marginTop: 0 }}>Encourage Innovation</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>Creating environments where students are forced to think outside classrooms, prototyping solutions to messy, raw challenges.</p>
                        </div>
                        <div className="category-card">
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', marginTop: 0 }}>Promote Active Learning</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>Replacing static blackboard slideshows with live code compilers, electronics routing tools, and direct server deployments.</p>
                        </div>
                        <div className="category-card">
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', marginTop: 0 }}>Build Communities</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>Fostering peer-to-peer sharing circles where code modules are checked, hardware boards analyzed, and launch ideas shared.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. EVENT DOCUMENTS & RESOURCES */}
            <section id="event-documents" style={{ position: 'relative', padding: '100px 0', borderTop: '1px solid var(--glass-border)', background: 'linear-gradient(180deg, var(--bg-panel) 0%, rgba(234, 88, 12, 0.02) 100%)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.05)', border: '1px solid rgba(15, 23, 42, 0.1)', color: 'var(--text-main)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '18px' }}>
                            📁 Event Resources
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px', marginTop: 0 }}>
                            Session Slides & Reports
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
                            View official session presentations and comprehensive reports directly from the platform.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                        {[
                            {
                                name: 'Day 1 — SDC × Tech Roxx Session',
                                file: '/assets/DAY 1 SDC.pptx',
                                type: 'PPTX',
                                icon: '📊',
                                desc: 'Kickoff presentation covering AI foundations, environment setup, and team formation.',
                                size: '~12 MB'
                            },
                            {
                                name: 'Day 2 — SDC × Tech Roxx Session',
                                file: '/assets/Day 2 SDC.pdf',
                                type: 'PDF',
                                icon: '📄',
                                desc: 'Deep learning & neural network architectures with hands-on model training guides.',
                                size: '~20 MB'
                            },
                            {
                                name: 'Day 3 — Ignite AI 2026',
                                file: '/assets/DAY 3 SDC x Tech Roxx Ignite AI 2026.pdf',
                                type: 'PDF',
                                icon: '📄',
                                desc: 'Generative AI, LLMs, prompt engineering and RAG system implementation guide.',
                                size: '~14 MB'
                            },
                            {
                                name: 'Day 4 — Ignite AI 2026',
                                file: '/assets/ignite AI day 4 SDC x Tech Roxx.pdf',
                                type: 'PDF',
                                icon: '📄',
                                desc: 'Agentic AI systems, LangChain, CrewAI frameworks and autonomous agent patterns.',
                                size: '~23 MB'
                            },
                            {
                                name: 'Day 5 — Ignite AI 2026',
                                file: '/assets/DAY 5 SDC x Tech Roxx Ignite AI 2026.pdf',
                                type: 'PDF',
                                icon: '📄',
                                desc: 'AI product development, cloud deployment and UX/safety considerations for AI apps.',
                                size: '~14 MB'
                            },
                            {
                                name: 'Day 6 — Ignite AI 2026',
                                file: '/assets/day 6 SDC x Techroxx.in ignite ai.pdf',
                                type: 'PDF',
                                icon: '📄',
                                desc: 'Demo day presentations, judging rubrics and award ceremony documentation.',
                                size: '~19 MB'
                            },
                            {
                                name: 'Official Ignite AI 2026 Report',
                                file: '/assets/Report On IGNITE AI 2026.pdf',
                                type: 'PDF',
                                icon: '📋',
                                desc: 'Comprehensive event report covering outcomes, participant feedback, and key metrics.',
                                size: '~9 MB',
                                featured: true
                            },
                        ].map(({ name, file, type, icon, desc, size, featured }) => (
                            <div key={name} style={{ background: featured ? `linear-gradient(135deg, rgba(234, 88, 12, 0.05) 0%, var(--bg-panel) 100%)` : 'var(--bg-panel)', border: `1px solid ${featured ? 'rgba(234, 88, 12, 0.3)' : 'var(--glass-border)'}`, borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease, border-color 0.3s ease', boxShadow: 'var(--card-shadow)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--primary-brand)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = featured ? 'rgba(234, 88, 12, 0.3)' : 'var(--glass-border)'; }}>
                                {featured && (
                                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'var(--primary-brand-light)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', fontSize: '0.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        Featured
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.04)', border: `1px solid rgba(15, 23, 42, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.6rem' }}>
                                        {icon}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 800, background: 'var(--primary-brand-light)', color: 'var(--primary-brand)', padding: '3px 8px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{type}</span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{size}</span>
                                        </div>
                                        <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, wordBreak: 'break-word' }}>{name}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                                
                                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                    <button 
                                        onClick={() => setViewDoc(file)} 
                                        style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, background: 'var(--text-main)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.25s ease', outline: 'none' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-brand)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--text-main)'; }}
                                    >
                                        👁 View Document Fullscreen
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Document Viewer Modal Overlay */}
            {viewDoc && (
                <div className="lightbox-overlay" onClick={() => setViewDoc(null)}>
                    <div className="doc-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div style={{ background: 'var(--bg-panel)', padding: '18px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 800 }}>Document Viewer</h3>
                            <button 
                                onClick={() => setViewDoc(null)} 
                                style={{ background: 'rgba(15, 23, 42, 0.05)', border: '1px solid rgba(15, 23, 42, 0.1)', color: 'var(--text-main)', padding: '8px 18px', borderRadius: '8px', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 800, transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-brand)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary-brand)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.05)'; e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)'; }}
                            >
                                CLOSE ✕
                            </button>
                        </div>
                        <iframe 
                            src={viewDoc} 
                            style={{ width: '100%', height: '100%', border: 'none', flex: 1, backgroundColor: '#f1f5f9' }} 
                            title="Interactive Document Viewer" 
                        />
                    </div>
                </div>
            )}

            {/* 6. FINAL INQUIRY B2B CTA */}
            <section id="partner-inquiry" className="section-padding" style={{ position: 'relative', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-panel)' }}>
                <div className="container">
                    <div className="corporate-cta-banner">
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(15, 23, 42, 0.05)',
                                border: '1px solid rgba(15, 23, 42, 0.1)',
                                color: 'var(--text-main)',
                                padding: '6px 14px',
                                borderRadius: '30px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                marginBottom: '20px'
                            }}>
                                🏢 Corporate Collaboration
                            </span>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '15px', marginTop: 0 }}>
                                Organize Your Next Event With Techroxx
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '35px' }}>
                                Whether you are a startup, company, educational institution, brand, community, or NGO, Techroxx can help you plan, host, promote, and execute professional technical events that engage the right audience and drive meaningful connections.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                <button className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                                    Schedule a Discussion
                                </button>
                                <button className="btn" style={{ border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '12px 28px', fontSize: '0.95rem', background: 'transparent' }}>
                                    Partner With Techroxx
                                </button>
                                <button className="btn" style={{ border: '1px solid var(--glass-border)', color: 'var(--text-main)', background: 'var(--bg-dark)', padding: '12px 28px', fontSize: '0.95rem' }}>
                                    Contact Event Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
