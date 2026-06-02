import { useEffect, useState, Fragment } from 'react';
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

const staticStars = [
    { id: 0, tx: '420px', ty: '0px', delay: '0.5s', duration: '3.2s', size: '3.5px' },
    { id: 1, tx: '328px', ty: '119px', delay: '1.2s', duration: '2.4s', size: '2.1px' },
    { id: 2, tx: '390px', ty: '327px', delay: '0.2s', duration: '3.8s', size: '4.0px' },
    { id: 3, tx: '155px', ty: '268px', delay: '1.8s', duration: '2.1s', size: '2.5px' },
    { id: 4, tx: '80px', ty: '453px', delay: '0.9s', duration: '3.5s', size: '3.1px' },
    { id: 5, tx: '-66px', ty: '374px', delay: '2.1s', duration: '2.8s', size: '2.3px' },
    { id: 6, tx: '-265px', ty: '459px', delay: '0.4s', duration: '3.9s', size: '4.2px' },
    { id: 7, tx: '-252px', ty: '212px', delay: '1.5s', duration: '2.2s', size: '2.7px' },
    { id: 8, tx: '-451px', ty: '164px', delay: '0.7s', duration: '3.6s', size: '3.3px' },
    { id: 9, tx: '-360px', ty: '0px', delay: '2.3s', duration: '2.6s', size: '2.2px' },
    { id: 10, tx: '-470px', ty: '-171px', delay: '0.1s', duration: '3.7s', size: '3.8px' },
    { id: 11, tx: '-245px', ty: '-205px', delay: '1.9s', duration: '2.3s', size: '2.6px' },
    { id: 12, tx: '-225px', ty: '-390px', delay: '0.8s', duration: '3.4s', size: '3.2px' },
    { id: 13, tx: '-67px', ty: '-384px', delay: '2.0s', duration: '2.9s', size: '2.4px' },
    { id: 14, tx: '90px', ty: '-512px', delay: '0.3s', duration: '4.0s', size: '4.5px' },
    { id: 15, tx: '170px', ty: '-294px', delay: '1.6s', duration: '2.5s', size: '2.8px' },
    { id: 16, tx: '360px', ty: '-302px', delay: '0.6s', duration: '3.3s', size: '3.0px' },
    { id: 17, tx: '347px', ty: '-126px', delay: '2.2s', duration: '2.7s', size: '2.1px' }
];

const Home = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [introStage, setIntroStage] = useState(0);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const [hoveredIndex, setHoveredIndex] = useState(null);
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

    const stars = isMobile ? staticStars.slice(0, 8) : staticStars;



    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', overflow: 'hidden', position: 'relative' }}>
            {showIntro && (
                <div className={`cinematic-splash-screen stage-${introStage}`}>
                    <div className="splash-cosmic-bg">
                        <div className="splash-aurora aurora-red"></div>
                        <div className="splash-aurora aurora-blue"></div>
                        
                        {/* High-speed radial warp starfield */}
                        {stars.map((star) => {
                            const starStyle = {
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: star.size,
                                height: star.size,
                                background: '#ffffff',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #ffffff, 0 0 4px #ffffff',
                                opacity: 0,
                                zIndex: 2,
                                '--tx': star.tx,
                                '--ty': star.ty,
                                animation: `warpStar ${star.duration} linear infinite`,
                                animationDelay: star.delay,
                            };

                            return <div key={star.id} style={starStyle} />;
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



                {/* Floating Aurora Mesh Gradients (Google & Antigravity style) removed to avoid lag and rendering artifacts */}

                {/* Full-Section Atmospheric Background Overlay */}
                <div className="hero-gradient-overlay"></div>

                <div className="hero-split-container container">

                    {/* Mobile-only Context Pill (Renders above the logo on mobile) */}
                    <div className="hero-context-pill mobile-only-pill">
                        <span className="pill-badge">ECOSYSTEM</span>
                        <span className="pill-text">Bridging Academics to Industry</span>
                    </div>

                    {/* LEFT SIDE: ORBITAL ANIMATION */}
                    <div className="hero-orbit-side">
                        <div className="hero-orbit-wrapper">


                            {/* Decorative Concentric Rings */}
                            <div className="hero-orbit-ring ring-outer"></div>
                            <div className="hero-orbit-ring ring-middle"></div>
                            <div className="hero-orbit-ring ring-inner"></div>

                             {/* Central Static Logo positioned at (300, 300) -> 50% Top */}
                            <div className="orbit-center-logo">
                                <img src={logo} alt="Techroxx Ecosystem" />
                            </div>

                            {/* SVG Overlay for Neon Connector Lines */}
                            <svg className="hero-orbit-svg-overlay" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Group 1: Services */}
                                <g className={`svg-group-1 ${hoveredIndex === 0 ? 'hovered' : ''}`}>
                                    <line x1="300" y1="300" x2="500" y2="300" className="orbit-connector orbit-connector-line conn-line-1" />
                                </g>

                                {/* Group 2: Learn */}
                                <g className={`svg-group-2 ${hoveredIndex === 1 ? 'hovered' : ''}`}>
                                    <line x1="300" y1="300" x2="500" y2="300" className="orbit-connector orbit-connector-line conn-line-2" />
                                </g>

                                {/* Group 3: Careers */}
                                <g className={`svg-group-3 ${hoveredIndex === 2 ? 'hovered' : ''}`}>
                                    <line x1="300" y1="300" x2="500" y2="300" className="orbit-connector orbit-connector-line conn-line-3" />
                                </g>

                                {/* Group 4: Events */}
                                <g className={`svg-group-4 ${hoveredIndex === 3 ? 'hovered' : ''}`}>
                                    <line x1="300" y1="300" x2="500" y2="300" className="orbit-connector orbit-connector-line conn-line-4" />
                                </g>

                                {/* Group 5: Join Us */}
                                <g className={`svg-group-5 ${hoveredIndex === 4 ? 'hovered' : ''}`}>
                                    <line x1="300" y1="300" x2="500" y2="300" className="orbit-connector orbit-connector-line conn-line-5" />
                                </g>
                            </svg>

                            {/* Smooth continuous rotating orbit container */}
                            <div className="rotating-orbit-container">
                                {allHeroButtons.map((btn, index) => {
                                    const themeClass = `glow-${btn.title.toLowerCase().replace(' ', '-')}`;
                                    const orbitClass = `node-orbit-${index + 1}`;

                                    return (
                                        <div 
                                            key={btn.id}
                                            className={`orbit-circle-node ${orbitClass} ${hoveredIndex === index ? 'hovered' : ''} ${themeClass}`}
                                            onMouseEnter={() => {
                                                setHoveredIndex(index);
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredIndex(null);
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
                            <div className="hero-context-pill desktop-only-pill">
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

                    {/* Event Request Call to Action Banner */}
                    <div className="glass-panel event-request-cta" style={{
                        marginTop: '50px',
                        padding: '40px 30px',
                        borderRadius: '24px',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                        background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.45), rgba(220, 38, 38, 0.05))',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative glow elements */}
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                        
                        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#f87171',
                                padding: '6px 14px',
                                borderRadius: '30px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                marginBottom: '15px'
                            }}>
                                <i className="fas fa-bullhorn"></i> Host Techroxx Event
                            </span>
                            
                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                fontFamily: 'var(--font-head)',
                                color: 'var(--text-main)',
                                marginBottom: '15px',
                                letterSpacing: '0.5px'
                            }}>
                                Organize an Event at Your Campus or Organization
                            </h3>
                            
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '1.02rem',
                                lineHeight: 1.7,
                                marginBottom: '25px'
                            }}>
                                Bring the energy of Techroxx workshops, live hackathons, and certified hands-on skill sprints to your college or company. Partner with us to empower your peers and developers with real-world industry training.
                            </p>
                            
                            <button 
                                onClick={() => setIsEventModalOpen(true)}
                                className="btn btn-primary"
                                style={{
                                    padding: '12px 28px',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.25)',
                                    transition: 'transform 0.3s, box-shadow 0.3s'
                                }}
                            >
                                <i className="fas fa-calendar-plus" style={{ fontSize: '1.05rem' }}></i> Request For Event
                            </button>
                        </div>
                    </div>
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
                                <Fragment key={idx}>
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
                                </Fragment>
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
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .contact-modal-link:hover {
                        background: rgba(255, 255, 255, 0.08) !important;
                        border-color: rgba(239, 68, 68, 0.3) !important;
                        transform: translateY(-2px);
                    }
                `}</style>
            </section>

            {/* Event Request Overlay Modal */}
            {isEventModalOpen && (
                <div 
                    className="modal-overlay" 
                    onClick={() => setIsEventModalOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(5, 7, 12, 0.85)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        animation: 'fadeIn 0.3s ease-out'
                    }}
                >
                    <div 
                        className="modal-card glass-panel" 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '90%',
                            maxWidth: '480px',
                            background: 'rgba(9, 13, 22, 0.95)',
                            borderRadius: '24px',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            boxShadow: '0 20px 50px rgba(239, 68, 68, 0.15)',
                            padding: '40px 30px',
                            position: 'relative',
                            animation: 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        {/* Close button */}
                        <button 
                            onClick={() => setIsEventModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                zIndex: 10
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #ef4444, #3b82f6)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.8rem',
                                marginBottom: '20px',
                                boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
                            }}>
                                <i className="fas fa-paper-plane"></i>
                            </div>

                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                fontFamily: 'var(--font-head)',
                                color: 'var(--text-main)',
                                marginBottom: '10px'
                            }}>
                                Request a Techroxx Event
                            </h3>
                            
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem',
                                lineHeight: 1.6,
                                marginBottom: '30px'
                            }}>
                                Connect with our event coordination team directly via WhatsApp or email to discuss hosting hackathons, sprints, or workshops at your organization.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                                {/* WhatsApp Option */}
                                <a 
                                    href="https://wa.me/917659906008?text=Hello%20Techroxx,%20we%20want%20to%20request%20an%20event%20at%20our%20campus/organization." 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="contact-modal-link"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '16px 20px',
                                        borderRadius: '14px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ color: '#25D366', fontSize: '1.4rem' }}><i className="fab fa-whatsapp"></i></div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>WhatsApp Chat</div>
                                        <div style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>+91 7659906008</div>
                                    </div>
                                </a>

                                {/* Email Option */}
                                <a 
                                    href="mailto:info.e@techroxx.in?subject=Techroxx Event Request" 
                                    className="contact-modal-link"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '16px 20px',
                                        borderRadius: '14px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ color: '#ef4444', fontSize: '1.3rem' }}><i className="fas fa-envelope"></i></div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</div>
                                        <div style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>info.e@techroxx.in</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;
