import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo_techroxx.jpg';
import { loadGlobalData } from '../utils/dataLoader';

// Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Home = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [introStage, setIntroStage] = useState(0);
    const [bgIndex, setBgIndex] = useState(0);

    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        setLoading(true);
        loadGlobalData()
            .then(data => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // normalize today date

                // Filter events that are active and date is today or in the future
                const activeUpcoming = data.events
                    .filter(e => e.status === 'active' && new Date(e.date) >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date) || a.priority - b.priority);
                
                setEvents(activeUpcoming);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading events in Home:", err);
                setLoading(false);
            });
    }, []);

    // Cinematic Intro Timers
    useEffect(() => {
        // Stage 0: Blank screen. After 500ms, proceed to Stage 1 (Logo & Name reveal)
        const timer1 = setTimeout(() => {
            setIntroStage(1);
        }, 500);

        // After 3200ms, proceed to Stage 2 (Fade out/slide-up splash screen)
        const timer2 = setTimeout(() => {
            setIntroStage(2);
        }, 3200);

        // After 4000ms, remove splash screen completely
        const timer3 = setTimeout(() => {
            setShowIntro(false);
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    // Toggle body class during splash screen intro to hide Navbar/Footer globally
    useEffect(() => {
        if (showIntro) {
            document.body.classList.add('intro-active');
        } else {
            document.body.classList.remove('intro-active');
        }
        return () => {
            document.body.classList.remove('intro-active');
        };
    }, [showIntro]);

    // Hero Action Orbit Buttons (High-Contrast, Easily Understandable Professional Tech Images)
    const allHeroButtons = [
        {
            id: 1,
            title: 'Services',
            path: '/services',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
        },
        {
            id: 2,
            title: 'Learn',
            path: '/learn',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
        },
        {
            id: 3,
            title: 'Careers',
            path: '/careers',
            image: 'https://images.unsplash.com/photo-1521737711867-e3b904737c88?q=80&w=1200&auto=format&fit=crop'
        },
        {
            id: 4,
            title: 'Events',
            path: '/contact',
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop'
        },
        {
            id: 5,
            title: 'Join Us',
            path: '/contact',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
        }
    ];

    // Background Auto-Cycle when not hovered
    useEffect(() => {
        if (isHovered || showIntro) return;

        const cycleInterval = setInterval(() => {
            setBgIndex((prevIndex) => (prevIndex + 1) % allHeroButtons.length);
        }, 5000);

        return () => {
            clearInterval(cycleInterval);
        };
    }, [isHovered, showIntro]);


    const taglines = [
        "Bridging Academics to Industry Through Innovation & Real-World Skills",
        "Where Learning Meets Real-World Innovation",
        "Building Skilled Talent for Future Industries",
        "Empowering Young Minds to Create Real Impact",
        "From Academic Knowledge to Industry Excellence",
        "Innovate • Build • Solve • Lead",
        "One Ecosystem. Endless Possibilities.",
        "Technology • Innovation • Employability • Impact"
    ];

    const whatWeDoData = [
        { title: "Industry-oriented Training", desc: "Gain practical skills directly mapped to modern industry needs.", icon: <><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></> },
        { title: "Real-world Project Development", desc: "Build portfolios that prove your ability to execute complex ideas.", icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></> },
        { title: "AI & Emerging Tech", desc: "Master AI, IoT, Programming and digital transformation tools.", icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></> },
        { title: "Innovation Programs", desc: "Participate in hackathons, incubators, and startup collaborations.", icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> },
        { title: "Technical Services", desc: "We provide dedicated R&D and tech solutions for businesses.", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 9.36l-6.9 6.9a2.12 2.12 0 0 1-3-3l6.9-6.9a6 6 0 0 1 9.36-7.94l-3.79 3.79a1 1 0 0 0-1.4 0Z" /> },
        { title: "Employability & Skills", desc: "Dedicated programs focused purely on securing your tech career.", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></> }
    ];

    const whyData = [
        { title: "Practical over Theory", desc: "Stop memorizing, start building. Real exposure to industry tools.", icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
        { title: "Industry Collaboration", desc: "Work closely with tech startups and established companies.", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
        { title: "Impactful Projects", desc: "Don't just write code, solve a real-world societal problem.", icon: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></> },
        { title: "Execution & Leadership", desc: "Develop the mindset needed to become a future tech leader.", icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /> }
    ];

    const networkNodes = [
        { text: "Students", x: -200, y: -100 },
        { text: "Industries", x: 200, y: -150 },
        { text: "Startups", x: -150, y: 150 },
        { text: "Technology", x: 180, y: 100 },
        { text: "Innovation", x: 0, y: -220 },
        { text: "Employability", x: 0, y: 200 },
    ];



    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', overflow: 'hidden', position: 'relative' }}>
            {showIntro && (
                <div className={`cinematic-splash-screen stage-${introStage}`}>
                    <div className="splash-cosmic-bg">
                        <div className="splash-aurora aurora-red"></div>
                        <div className="splash-aurora aurora-blue"></div>
                        
                        {/* High-speed radial warp starfield */}
                        {[...Array(18)].map((_, i) => {
                            const angle = (i / 18) * 2 * Math.PI;
                            const distance = 300 + Math.random() * 250;
                            const tx = `${Math.cos(angle) * distance}px`;
                            const ty = `${Math.sin(angle) * distance}px`;
                            const delay = `${Math.random() * 2.5}s`;
                            const duration = `${2 + Math.random() * 2}s`;
                            const size = `${2 + Math.random() * 3}px`;
                            
                            const starStyle = {
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: size,
                                height: size,
                                background: '#ffffff',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #ffffff, 0 0 4px #ffffff',
                                opacity: 0,
                                zIndex: 2,
                                '--tx': tx,
                                '--ty': ty,
                                animation: `warpStar ${duration} linear infinite`,
                                animationDelay: delay,
                            };

                            return <div key={i} style={starStyle} />;
                        })}
                    </div>
                    
                    <div className="splash-content-container">
                        {/* Concentric mechanical hologram rings spinning behind text */}
                        <div className="splash-holo-rings">
                            <div className="holo-ring hr-1"></div>
                            <div className="holo-ring hr-2"></div>
                            <div className="holo-ring hr-3"></div>
                        </div>

                        {/* Cinematic Text Reveal - No solid logo image */}
                        <h1 className="splash-title">
                            <span className="splash-word-tech">Tech</span>
                            <span className="splash-word-roxx">Roxx</span>
                        </h1>
                        
                        <div className="splash-sub-bar">
                            <span className="splash-pill">ECOSYSTEM</span>
                            <div className="splash-loading-laser"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. HERO SECTION REDESIGN */}
            <section className="hero-ecosystem" style={{ position: 'relative' }}>

                {/* Floating Antigravity Particle Field */}
                <div className="antigravity-particles-container">
                    <div className="antigravity-particle p1"></div>
                    <div className="antigravity-particle p2"></div>
                    <div className="antigravity-particle p3"></div>
                    <div className="antigravity-particle p4"></div>
                    <div className="antigravity-particle p5"></div>
                    <div className="antigravity-particle p6"></div>
                    <div className="antigravity-particle p7"></div>
                    <div className="antigravity-particle p8"></div>
                </div>

                {/* Floating Aurora Mesh Gradients (Google & Antigravity style) */}
                <div className="aurora-orb aurora-1"></div>
                <div className="aurora-orb aurora-2"></div>
                <div className="aurora-orb aurora-3"></div>

                {/* Full-Section Atmospheric Background Overlay */}
                <div className="hero-gradient-overlay"></div>

                <div className="hero-split-container container">

                    {/* LEFT SIDE: ORBITAL ANIMATION */}
                    <div className="hero-orbit-side">
                        <div className="hero-orbit-wrapper">
                            {/* Radial Target Radar & Shockwave SVG */}
                            <svg viewBox="0 0 600 600" width="100%" height="100%" style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 5 }}>
                                <defs>
                                    <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="var(--primary-brand)" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="var(--primary-brand)" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                                
                                {/* Futuristic Concentric Hologram Dashboard Rings */}
                                <circle cx="300" cy="250" r="75" className="hero-telemetry-ring-1" stroke="rgba(234, 88, 12, 0.08)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
                                <circle cx="300" cy="250" r="145" className="hero-telemetry-ring-2" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" strokeDasharray="8 8" fill="none" />
                                <circle cx="300" cy="250" r="215" className="hero-telemetry-ring-3" stroke="rgba(234, 88, 12, 0.04)" strokeWidth="1.5" strokeDasharray="2 12" fill="none" />

                                {/* High-Tech Monospace Telemetry Digital Readouts */}
                                <text x="50" y="60" fill="rgba(100, 116, 139, 0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">SYS.LOCK: SECURE</text>
                                <text x="50" y="80" fill="rgba(234, 88, 12, 0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">SLING.TENSION: SNAP</text>
                                <text x="430" y="60" fill="rgba(100, 116, 139, 0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">MOTOR.SWEEP: 360°</text>
                                <text x="430" y="80" fill="rgba(234, 88, 12, 0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">PWR.DRIVE: 840W</text>

                                {/* Telemetry Platform Scale Ticks */}
                                <line x1="125" y1="246" x2="125" y2="254" stroke="rgba(234, 88, 12, 0.25)" strokeWidth="1.5" />
                                <line x1="212" y1="247" x2="212" y2="253" stroke="rgba(234, 88, 12, 0.15)" strokeWidth="1" />
                                <line x1="300" y1="246" x2="300" y2="254" stroke="rgba(234, 88, 12, 0.25)" strokeWidth="1.5" />
                                <line x1="387" y1="247" x2="387" y2="253" stroke="rgba(234, 88, 12, 0.15)" strokeWidth="1" />
                                <line x1="475" y1="246" x2="475" y2="254" stroke="rgba(234, 88, 12, 0.25)" strokeWidth="1.5" />
                            </svg>

                            {/* Central Static Logo positioned at (300, 250) */}
                            <div className="orbit-center-logo">
                                <img src={logo} alt="Techroxx Ecosystem" />
                            </div>

                            {/* Smooth continuous rotating orbit container */}
                            <div className="rotating-orbit-container">
                                {allHeroButtons.map((btn, index) => {
                                    const total = allHeroButtons.length;
                                    const angle = (index / total) * (2 * Math.PI) - (Math.PI / 2);
                                    const radiusPercent = 32; // 32% of 600px is 192px orbit radius
                                    const x = Math.cos(angle) * radiusPercent;
                                    const y = Math.sin(angle) * radiusPercent;

                                    const circleStyle = {
                                        position: 'absolute',
                                        left: `calc(50% + ${x}%)`,
                                        top: `calc(41.67% + ${y}%)`,
                                    };

                                    const themeClass = `glow-${btn.title.toLowerCase().replace(' ', '-')}`;
                                    const isActive = index === bgIndex;

                                    return (
                                        <div 
                                            key={btn.id}
                                            className={`orbit-circle-node ${isActive ? 'active' : ''} ${themeClass}`}
                                            style={circleStyle}
                                            onMouseEnter={() => {
                                                setBgIndex(index);
                                                setIsHovered(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsHovered(false);
                                            }}
                                            onClick={() => navigate(btn.path)}
                                        >
                                            <div className="orbit-circle-glass">
                                                <i className={
                                                    btn.title === 'Services' ? 'fas fa-cogs' :
                                                    btn.title === 'Learn' ? 'fas fa-graduation-cap' :
                                                    btn.title === 'Careers' ? 'fas fa-briefcase' :
                                                    btn.title === 'Events' ? 'fas fa-calendar-alt' :
                                                    'fas fa-user-plus'
                                                }></i>
                                            </div>
                                            <span className="orbit-circle-label">{btn.title}</span>
                                        </div>
                                    );
                                })}
                            </div>               
                        </div>
                    </div>

                    {/* RIGHT SIDE: TEXT CONTENT */}
                    <div className="hero-text-side">
                        <div className="premium-hero-card">
                            <div className="hero-context-pill">
                                <span className="pill-badge">ECOSYSTEM</span>
                                <span className="pill-text">Bridging Academics to Industry</span>
                            </div>

                            <h1 className="hero-title-main">
                                <span className="text-tech">Tech</span> <span className="text-roxx">Roxx</span>
                            </h1>
                            <h3 className="hero-motto">
                                <span className="motto-word">Learn</span> 
                                <span className="motto-dot">•</span> 
                                <span className="motto-word">Build</span> 
                                <span className="motto-dot">•</span> 
                                <span className="motto-word">Innovate</span>
                            </h3>

                            <div className="hero-desc-premium-container">
                                <p className="hero-desc-p-premium">
                                    Transforming Knowledge into Innovation by Empowering Industries, Students, and Communities with Technology, Skilled Manpower, Smart Solutions, Employability, and Real-World Impact.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 2. ABOUT / ECOSYSTEM SECTION */}
            <section className="section-padding" style={{ position: 'relative' }}>
                <div className="container split-layout">
                    <div>
                        <h2 className="section-title" style={{ textAlign: 'left' }}>About Ecosystem</h2>
                        <p className="section-subtitle" style={{ textAlign: 'left' }}>Bridging Academics & Industry</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '20px', lineHeight: 1.8 }}>
                            At Techroxx, our mission is to bridge the gap between academics and industry by transforming students, innovators, and passionate individuals into highly skilled, future-ready professionals. We empower youth and organizations with practical knowledge, real-time project experience, emerging technologies, and industry-focused training that prepares them for real-world challenges.
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '20px', lineHeight: 1.8 }}>
                            We believe education and innovation should go beyond theory. That’s why Techroxx focuses on hands-on learning, innovation, teamwork, employability, and problem-solving through advanced domains such as Artificial Intelligence (AI), Internet of Things (IoT), Software Development, Automation, Digital Technologies, and Future Skills.
                        </p>
                        <div className="glass-panel" style={{ padding: '30px', marginTop: '30px', borderLeft: '4px solid var(--secondary-orange)' }}>
                            <p style={{ color: 'var(--primary-navy)', fontWeight: 600, margin: 0, fontSize: '1.05rem', lineHeight: 1.8 }}>
                                Our ecosystem connects talent, technology, industries, and innovation, helping individuals gain confidence, technical expertise, creativity, leadership, and professional growth needed to thrive in modern industries, startups, and evolving digital ecosystems.
                            </p>
                        </div>
                    </div>
                    <div className="about-image-container">
                        <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                            alt="Techroxx Ecosystem Lab" 
                            className="premium-about-image"
                        />
                    </div>
                </div>
            </section>

            {/* FEATURED VIDEO SHOWCASE SECTION */}
            <section className="section-padding" style={{ position: 'relative', borderTop: '1px solid rgba(220, 38, 38, 0.08)', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '50px', flexWrap: 'wrap' }}>
                    
                    {/* Left: Static Text */}
                    <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '5px' }}>Ecosystem in Action</h2>
                        <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '25px' }}>Watch Our Practical Training & Hackathons</p>
                        
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '20px' }}>
                            Experience the vibrant atmosphere of the Tech Roxx training labs. We prioritize direct practical training over static theory, encouraging students to design, prototype, and route their own hardware systems.
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: 600 }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', marginRight: '5px' }}></i> Hands-On Prototyping Labs
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: 600 }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--secondary-blue)', marginRight: '5px' }}></i> 36-Hour Sprints & Hackathons
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: 600 }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', marginRight: '5px' }}></i> Expert Mentors from Core Industries
                            </div>
                        </div>

                        <button onClick={() => navigate('/gallery')} className="btn btn-primary">
                            <i className="fas fa-images" style={{ marginRight: '8px' }}></i> View Photo Gallery
                        </button>
                    </div>

                    {/* Right: Premium Responsive YouTube Iframe with zIndex safety */}
                    <div style={{ flex: '1 1 400px', maxWidth: '550px', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(220, 38, 38, 0.1)', position: 'relative', zIndex: 1 }}>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                            <iframe 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                                src="https://www.youtube.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV" 
                                title="Tech Roxx Ecosystem Tour" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. WHAT WE DO SECTION */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-dark) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">What We Do</h2>
                    <p className="section-subtitle">Empowering Through Tech & Innovation</p>

                    <div className="feature-grid">
                        {whatWeDoData.map((item, idx) => (
                            <div key={idx} className="glass-panel tilt-card" style={{ padding: '30px' }}>
                                <div className="feature-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '30px', height: '30px', stroke: 'var(--accent-brand)', transition: '0.3s' }}>
                                        {item.icon}
                                    </svg>
                                </div>
                                <h3 style={{ color: 'var(--primary-navy)', marginBottom: '10px', fontSize: '1.2rem', fontWeight: 700 }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <button onClick={() => navigate('/services')} className="btn btn-primary">Explore All Services</button>
                    </div>
                </div>
            </section>

            {/* DYNAMIC UPCOMING EVENTS & SPRINTS SECTION */}
            <section className="section-padding" style={{ position: 'relative' }}>
                <div className="container">
                    <h2 className="section-title">Ecosystem Events & Sprints</h2>
                    <p className="section-subtitle">Live Challenges, Tech Hackathons & Hands-On Workshops</p>

                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-panel skeleton-pulse" style={{ height: '350px', borderRadius: '16px', backgroundColor: 'rgba(124, 58, 237, 0.03)' }}></div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '50px 30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <i className="fas fa-calendar-times" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '15px' }}></i>
                            <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>No active programs available</h4>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto 0' }}>All current events are completed. Stay tuned! New innovative challenges will be posted soon.</p>
                        </div>
                    ) : (
                        <div className="swiper-container-wrapper" style={{ padding: '20px 0', overflow: 'hidden' }}>
                            <Swiper
                                modules={[EffectCoverflow, Pagination, Autoplay]}
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'auto'}
                                coverflowEffect={{
                                    rotate: 15,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1.5,
                                    slideShadows: false,
                                }}
                                autoplay={{
                                    delay: 4500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{ clickable: true }}
                                style={{ paddingBottom: '50px' }}
                            >
                                {events.map(event => (
                                    <SwiperSlide key={event.id} style={{ width: '320px', background: 'transparent' }}>
                                        <div className="swiper-event-card glass-panel" style={{ 
                                            background: 'var(--bg-panel)', 
                                            borderRadius: '16px', 
                                            overflow: 'hidden', 
                                            border: 'var(--glass-border)',
                                            boxShadow: 'var(--card-shadow)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            transition: 'transform 0.3s, box-shadow 0.3s'
                                        }}>
                                            {/* Image with strict 16:9 aspect ratio and Cover sizing */}
                                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                                                <img 
                                                    src={event.image} 
                                                    alt={event.title} 
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600";
                                                    }}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'linear-gradient(135deg, #ef4444, #3b82f6)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    {event.category}
                                                </div>
                                            </div>

                                            {/* Card Details */}
                                            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                    <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        <i className="fas fa-calendar-alt" style={{ marginRight: '6px' }}></i>
                                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <span style={{ 
                                                        background: event.department === 'cse' ? 'rgba(59, 130, 246, 0.1)' : event.department === 'ece' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(124, 58, 237, 0.1)', 
                                                        color: event.department === 'cse' ? '#3b82f6' : event.department === 'ece' ? '#f97316' : '#ef4444', 
                                                        fontSize: '0.72rem', 
                                                        fontWeight: 800, 
                                                        padding: '4px 10px', 
                                                        borderRadius: '6px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {event.department === 'cse' ? 'CSE' : event.department === 'ece' ? 'ECE' : 'Arts & Mgmt'}
                                                    </span>
                                                </div>
                                                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 700, minHeight: '52px', marginBottom: '10px', lineHeight: 1.4 }}>{event.title}</h4>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, flex: 1 }}>{event.description}</p>
                                                <button 
                                                    onClick={() => navigate('/contact')}
                                                    className="btn btn-primary" 
                                                    style={{ width: '100%', padding: '8px 0', fontSize: '0.85rem', marginTop: '20px', textAlign: 'center' }}
                                                >
                                                    Register Now
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
                
                {/* Active Swiper Slide Dimming Styles */}
                <style>{`
                    .swiper-slide {
                        transition: opacity 0.3s, transform 0.3s;
                        opacity: 0.4;
                    }
                    .swiper-slide-active {
                        opacity: 1 !important;
                        transform: scale(1.05);
                    }
                    .swiper-pagination-bullet-active {
                        background: linear-gradient(135deg, #ef4444, #3b82f6) !important;
                        width: 24px !important;
                        border-radius: 5px !important;
                    }
                    @keyframes skeleton-pulse {
                        0% { opacity: 0.6; }
                        50% { opacity: 0.3; }
                        100% { opacity: 0.6; }
                    }
                    .skeleton-pulse {
                        animation: skeleton-pulse 1.5s infinite ease-in-out;
                    }
                `}</style>
            </section>

            {/* 4. VISION & MISSION SECTION */}
            <section className="section-padding" style={{ position: 'relative' }}>
                <div className="container">
                    <div className="vm-grid">
                        <div className="glass-panel vm-card" style={{ borderTop: '4px solid var(--accent-brand)' }}>
                            <h3><i className="fas fa-eye" style={{ color: 'var(--accent-brand)' }}></i> Vision</h3>
                            <p>
                                "To create a generation of innovative, skilled, and energetic professionals who can solve real-world problems, contribute to technological advancement, and become the driving force behind future industries and innovation ecosystems."
                            </p>
                        </div>
                        <div className="glass-panel vm-card" style={{ borderTop: '4px solid var(--secondary-orange)' }}>
                            <h3><i className="fas fa-bullseye" style={{ color: 'var(--secondary-orange)' }}></i> Mission</h3>
                            <p>
                                "To nurture talent with practical exposure, industry experience, advanced technologies, employability skills, and innovation-driven learning while building a strong bridge between academics, industries, and society."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. WHY TECHROXX SECTION */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-dark) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">Why Techroxx?</h2>
                    <p className="section-subtitle">The Ecosystem Advantage</p>

                    <div className="timeline-grid">
                        {whyData.map((item, idx) => (
                            <div key={idx} className="glass-panel tilt-card timeline-item">
                                <div className="timeline-icon">
                                    <svg viewBox="0 0 24 24" fill="var(--primary-navy)" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                                        {item.icon}
                                    </svg>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 700 }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. ECOSYSTEM NETWORK MAP SECTION */}
            <section className="section-padding" style={{ overflow: 'hidden' }}>
                <div className="container">
                    <h2 className="section-title">Techroxx Ecosystem</h2>
                    <p className="section-subtitle">A Connected Digital Network</p>

                    <div className="ecosystem-network-map">
                        <div className="network-center">
                            <span style={{ color: 'var(--primary-navy)', fontWeight: 800, fontFamily: 'var(--font-head)', letterSpacing: '1px' }}>TECHROXX</span>
                        </div>

                        {networkNodes.map((node, idx) => {
                            const nodeX = isMobile ? node.x * 0.50 : node.x;
                            const nodeY = isMobile ? node.y * 0.50 : node.y;
                            return (
                                <React.Fragment key={idx}>
                                    {/* Connection Line SVG */}
                                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                                        <line
                                            x1="50%" y1="50%"
                                            x2={`calc(50% + ${nodeX}px)`}
                                            y2={`calc(50% + ${nodeY}px)`}
                                            stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1" strokeDasharray="4 4"
                                        />
                                    </svg>
                                    {/* Node Button */}
                                    <div
                                        className="network-node"
                                        style={{ transform: `translate(${nodeX}px, ${nodeY}px)` }}
                                    >
                                        {node.text}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7. TAGLINES MARQUEE SECTION */}
            <section className="marquee-container">
                <div className="marquee-content">
                    {/* Double the array for seamless infinite scroll */}
                    {[...taglines, ...taglines].map((tagline, idx) => (
                        <div key={idx} className="marquee-item">
                            {tagline}
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. CO-INNOVATION PARTNERS SECTION */}
            <section className="homepage-partners-section" style={{ padding: '80px 0 100px', background: 'var(--bg-dark)', borderTop: '1px solid rgba(220, 38, 38, 0.08)', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle background glow */}
                <div className="aurora-orb aurora-partners" style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.07) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <h2 className="section-title">Collaborative Partners</h2>
                    <p className="section-subtitle">Driving Innovation and Empowering Engineers Together</p>
                    
                    <div className="partners-logo-wrapper" style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                        <a 
                            href="https://www.taskveda.in/" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="taskveda-partner-link glass-panel"
                            style={{
                                display: 'inline-flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '35px 70px',
                                borderRadius: '24px',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                                background: 'rgba(9, 13, 22, 0.45)',
                                backdropFilter: 'blur(16px)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                textDecoration: 'none'
                            }}
                        >
                            {/* High Tech Taskveda Text/Icon Logo */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div className="taskveda-icon-glow" style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #ef4444, #f97316)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '1.6rem',
                                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                                    transition: 'transform 0.6s ease'
                                }}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <span style={{
                                    fontSize: '2.4rem',
                                    fontWeight: 900,
                                    letterSpacing: '1px',
                                    background: 'linear-gradient(135deg, #ffffff 40%, #a1a1aa 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontFamily: 'var(--font-head)'
                                }}>
                                    task<span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>veda</span>
                                </span>
                            </div>
                            <span style={{
                                marginTop: '15px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '2.5px'
                            }}>
                                Active Technology Partner
                            </span>
                        </a>
                    </div>
                </div>
                <style>{`
                    .taskveda-partner-link:hover {
                        transform: translateY(-8px) scale(1.02);
                        border-color: #ef4444 !important;
                        box-shadow: 0 20px 40px rgba(239, 68, 68, 0.18) !important;
                        background: rgba(9, 13, 22, 0.65) !important;
                    }
                    .taskveda-partner-link:hover .taskveda-icon-glow {
                        transform: rotate(360deg);
                    }
                `}</style>
            </section>

        </div>
    );
};

export default Home;
