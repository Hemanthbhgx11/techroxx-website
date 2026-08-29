import { useEffect, useState, Fragment, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, UserPlus, Briefcase, ArrowRight, Settings, CheckCircle2, Calendar, Cpu, Rocket } from 'lucide-react';
import logo from '../img/logo_techroxx.webp';
import { loadGlobalData } from '../utils/dataLoader';
import { ParticipantExperiences, parsePerformersJSON } from '../components/AchievementPortal';
import {
    HeroArcEcosystem,
    CosmicSmokeCanvas,
    EcosystemDetailModal,
    EcosystemOverviewDrawer
} from '../components/HeroArcEcosystem';
import '../styles/pages/EventDetails.css';


// Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
    const [eventMetrics, setEventMetrics] = useState({ eventsOrganized: 0, participantsReached: 0 });
    const [gallery, setGallery] = useState([]);
    const [performers, setPerformers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(() => {
        // Track intro session state so it only runs once per website load session
        const hasRunIntro = sessionStorage.getItem('techroxx_intro_played');
        return !hasRunIntro;
    });
    const [introStage, setIntroStage] = useState(() => {
        const hasRunIntro = sessionStorage.getItem('techroxx_intro_played');
        return hasRunIntro ? 2 : 0;
    });
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedHeroNode, setSelectedHeroNode] = useState(null);
    const [isOverviewDrawerOpen, setIsOverviewDrawerOpen] = useState(false);
    const [hoveredHeroNodeId, setHoveredHeroNodeId] = useState(null);

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 991);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Orbit Animation Gyroscope & Event Listeners
    const heroRef = useRef(null);
    const arcPathRef = useRef(null);
    const [computedNodes, setComputedNodes] = useState([
        { title: 'Services', x: 120, y: 240, pct: 0.0, delay: '0s' },
        { title: 'Learn', x: 444, y: 150, pct: 0.25, delay: '0.4s' },
        { title: 'Careers', x: 768, y: 80, pct: 0.50, delay: '0.8s' },
        { title: 'Events', x: 1092, y: 150, pct: 0.75, delay: '1.2s' },
        { title: 'Join Us', x: 1416, y: 240, pct: 1.0, delay: '1.6s' }
    ]);

    useLayoutEffect(() => {
        if (arcPathRef.current && typeof arcPathRef.current.getTotalLength === 'function') {
            const path = arcPathRef.current;
            const totalLen = path.getTotalLength();
            const percentages = [0.0, 0.25, 0.50, 0.75, 1.0];
            const titles = ['Services', 'Learn', 'Careers', 'Events', 'Join Us'];
            const delays = ['0s', '0.4s', '0.8s', '1.2s', '1.6s'];

            const computed = percentages.map((pct, idx) => {
                const pt = path.getPointAtLength(totalLen * pct);
                return {
                    title: titles[idx],
                    x: pt.x,
                    y: pt.y,
                    pct,
                    delay: delays[idx]
                };
            });

            setComputedNodes(computed);
        }
    }, []);
    useEffect(() => {
        const heroEl = heroRef.current;
        const handleMouseMove = (e) => {
            if (isMobile) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = heroEl.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            // Adjust CSS custom variables for gyroscope layers
            heroEl.style.setProperty('--gyro-x-outer', `${x * 35}px`);
            heroEl.style.setProperty('--gyro-y-outer', `${y * 35}px`);
            heroEl.style.setProperty('--gyro-x-mid', `${x * -18}px`);
            heroEl.style.setProperty('--gyro-y-mid', `${y * -18}px`);
            heroEl.style.setProperty('--gyro-x-inner', `${x * 8}px`);
            heroEl.style.setProperty('--gyro-y-inner', `${y * 8}px`);
        };

        if (heroEl) {
            heroEl.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (heroEl) {
                heroEl.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [isMobile]);

    useEffect(() => {
        loadGlobalData()
            .then(data => {
                // Filter events that are upcoming or ongoing
                const activeUpcoming = (data.events || [])
                    .filter(e => e.status === 'upcoming' || e.status === 'ongoing')
                    .sort((a, b) => new Date(a.date) - new Date(b.date) || a.priority - b.priority);

                if (activeUpcoming.length > 0) {
                    setEvents(activeUpcoming);
                } else {
                    const pastEvents = (data.events || [])
                        .filter(e => e.status === 'completed')
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
                    setEvents(pastEvents);
                }
                if (data.eventMetrics) {
                    setEventMetrics(data.eventMetrics);
                }

                // Fetch from the updated gallery.json (excluding videos)
                fetch('/data/gallery.json')
                    .then(res => {
                        if (!res.ok) throw new Error('Failed to load gallery.json');
                        return res.json();
                    })
                    .then(galleryData => {
                        const imagesOnly = (galleryData || []).filter(item => !item.isVideo);
                        setGallery(imagesOnly);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error("Error loading gallery.json in Home:", err);
                        // Fallback to eventGallery if it fails
                        setGallery(data.eventGallery || []);
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error("Error loading events in Home:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const sheetId = '1zsORrfEIWBAZWVrCgNPw_HofDLnMdVb6PUhQSfaPB3E';
        const cacheKey = `techroxx_performers_ignite-ai-2026`;
        const cached = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(`${cacheKey}_time`);
        const oneDay = 24 * 60 * 60 * 1000;

        if (cached && cachedTime && (Date.now() - parseInt(cachedTime) < oneDay)) {
            try {
                setPerformers(JSON.parse(cached));
                return;
            } catch (e) {
                console.error("Error parsing cached performers on Home", e);
            }
        }

        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
        fetch(sheetUrl)
            .then(res => res.text())
            .then(text => {
                const parsed = parsePerformersJSON(text, "Ignite AI 2026");
                if (parsed && parsed.length > 0) {
                    setPerformers(parsed);
                    localStorage.setItem(cacheKey, JSON.stringify(parsed));
                    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
                }
            })
            .catch(err => {
                console.error("Error fetching performers sheet data on Home:", err);
                if (cached) {
                    try {
                        setPerformers(JSON.parse(cached));
                    } catch (e) { }
                }
            });
    }, []);

    // Cinematic Intro Timers
    useEffect(() => {
        if (!showIntro) return;

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
            sessionStorage.setItem('techroxx_intro_played', 'true');
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [showIntro]);

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

            {/* 1. TECH ROXX 3D COSMIC ECOSYSTEM HERO SECTION */}
            <section className="relative w-full overflow-hidden bg-[var(--bg-dark)] transition-colors duration-500">
                <CosmicSmokeCanvas />
                <HeroArcEcosystem
                    onSelectNode={(node) => navigate(node.path || '/services')}
                    onExploreEcosystem={() => navigate('/services')}
                    activeNodeId={selectedHeroNode ? selectedHeroNode.id : null}
                    onNodeHover={(nodeId) => setHoveredHeroNodeId(nodeId)}
                />
            </section>

            <EcosystemDetailModal
                node={selectedHeroNode}
                onClose={() => setSelectedHeroNode(null)}
                onNavigate={(path) => {
                    setSelectedHeroNode(null);
                    navigate(path);
                }}
            />

            <EcosystemOverviewDrawer
                isOpen={isOverviewDrawerOpen}
                onClose={() => setIsOverviewDrawerOpen(false)}
                onSelectNode={(node) => {
                    setIsOverviewDrawerOpen(false);
                    setSelectedHeroNode(node);
                }}
            />

            
            {/* 1. ABOUT TECHROXX */}
            <section className="w-full py-20 md:py-32 px-6 bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-[var(--primary-brand)] font-bold tracking-widest uppercase text-sm mb-4 block">About TechRoxx</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6 font-heading leading-tight">Bridging the Gap Between Academics and Industry</h2>
                        <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
                            Techroxx is a premium technology ecosystem that empowers students, professionals, and institutions with real-world skills, industry exposure, and impactful innovations. We don't just teach technology—we build the builders.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/about')} className="bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-hover)] text-white px-8 py-3 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(212,71,6,0.3)] hover:shadow-[0_0_30px_rgba(212,71,6,0.5)]">Our Story</button>
                            <button onClick={() => navigate('/contact')} className="bg-transparent border-2 border-[var(--border)] text-[var(--text-main)] hover:border-[var(--primary-brand)] px-8 py-3 rounded-lg font-bold transition-colors">Join Us</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[var(--surface-primary)] p-6 rounded-2xl border border-[var(--border)]">
                            <div className="text-[var(--primary-brand)] mb-3"><Sparkles size={28} /></div>
                            <h3 className="text-[var(--text-main)] font-bold mb-2">Innovation</h3>
                            <p className="text-[var(--text-muted)] text-sm">Pioneering solutions to real-world problems.</p>
                        </div>
                        <div className="bg-[var(--surface-primary)] p-6 rounded-2xl border border-[var(--border)] sm:translate-y-8">
                            <div className="text-[var(--primary-brand)] mb-3"><Target size={28} /></div>
                            <h3 className="text-[var(--text-main)] font-bold mb-2">Practical Skills</h3>
                            <p className="text-[var(--text-muted)] text-sm">Project-based learning over theory.</p>
                        </div>
                        <div className="bg-[var(--surface-primary)] p-6 rounded-2xl border border-[var(--border)]">
                            <div className="text-[var(--primary-brand)] mb-3"><UserPlus size={28} /></div>
                            <h3 className="text-[var(--text-main)] font-bold mb-2">Mentorship</h3>
                            <p className="text-[var(--text-muted)] text-sm">Guided by industry veterans.</p>
                        </div>
                        <div className="bg-[var(--surface-primary)] p-6 rounded-2xl border border-[var(--border)] sm:translate-y-8">
                            <div className="text-[var(--primary-brand)] mb-3"><Briefcase size={28} /></div>
                            <h3 className="text-[var(--text-main)] font-bold mb-2">Employability</h3>
                            <p className="text-[var(--text-muted)] text-sm">Direct pathways to tech careers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. WHAT WE DO (CAPABILITIES) */}
            <section className="w-full py-24 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[var(--primary-brand)] font-bold tracking-widest uppercase text-sm mb-4 block">Our Capabilities</span>
                        <h2 className="text-4xl font-black text-[var(--text-main)] mb-6 font-heading">A Complete Technology Ecosystem</h2>
                        <p className="text-[var(--text-muted)] text-lg">We provide a comprehensive suite of programs and services designed to accelerate technical growth and industry readiness.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 flex flex-col gap-2">
                            {whatWeDoData.map((item, idx) => (
                                <button 
                                    key={idx}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onClick={() => setHoveredIndex(idx)}
                                    className={`text-left px-6 py-4 rounded-xl font-bold transition-all ${hoveredIndex === idx || (hoveredIndex === null && idx === 0) ? 'bg-[var(--primary-brand)] text-white shadow-lg' : 'bg-[var(--surface-primary)] text-[var(--text-main)] border border-[var(--border)] hover:border-[var(--primary-brand)]'}`}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                        <div className="lg:col-span-2 bg-[var(--surface-primary)] rounded-2xl border border-[var(--border)] p-10 flex flex-col justify-center min-h-[300px]">
                            {(() => {
                                const activeItem = whatWeDoData[hoveredIndex !== null ? hoveredIndex : 0];
                                return (
                                    <div className="animate-fade-in" key={activeItem.title}>
                                        <div className="w-16 h-16 bg-[rgba(212,71,6,0.1)] rounded-2xl flex items-center justify-center text-[var(--primary-brand)] mb-6">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                {activeItem.icon}
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-bold text-[var(--text-main)] mb-4 font-heading">{activeItem.title}</h3>
                                        <p className="text-[var(--text-muted)] text-xl leading-relaxed mb-8">{activeItem.desc}</p>
                                        <button onClick={() => navigate('/services')} className="text-[var(--primary-brand)] font-bold flex items-center gap-2 hover:gap-4 transition-all w-max">
                                            Explore Capability <ArrowRight size={20} />
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FEATURED EVENT */}
            <section className="w-full py-24 px-6 bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[var(--surface-primary)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-12 flex flex-col justify-center">
                            <span className="inline-block bg-[rgba(212,71,6,0.1)] text-[var(--primary-brand)] font-bold px-4 py-1.5 rounded-full text-sm mb-6 w-max uppercase tracking-wider">Featured Program</span>
                            <h2 className="text-4xl font-black text-[var(--text-main)] mb-4 font-heading leading-tight">Ignite AI 2026</h2>
                            <p className="text-[var(--text-muted)] text-lg mb-8">A 4-week intensive bootcamp focused on building real-world AI applications, mastering prompt engineering, and deploying machine learning models.</p>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-[var(--text-muted)] text-sm mb-1 uppercase font-bold tracking-wider">Format</div>
                                    <div className="text-[var(--text-main)] font-bold flex items-center gap-2"><Settings size={16}/> Hybrid</div>
                                </div>
                                <div>
                                    <div className="text-[var(--text-muted)] text-sm mb-1 uppercase font-bold tracking-wider">Status</div>
                                    <div className="text-[var(--success)] font-bold flex items-center gap-2"><CheckCircle2 size={16}/> Enrollment Open</div>
                                </div>
                            </div>
                            <button onClick={() => navigate('/events')} className="bg-[var(--text-main)] text-[var(--bg-primary)] hover:bg-white px-8 py-4 rounded-xl font-bold transition-all text-center w-full sm:w-max shadow-lg">
                                Secure Your Spot
                            </button>
                        </div>
                        <div className="md:w-1/2 relative min-h-[300px]">
                            <img src="https://images.unsplash.com/photo-1591453006520-1a89c97b8ce8?q=80&w=1200&auto=format&fit=crop" alt="Ignite AI Bootcamp" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. UPCOMING EVENTS */}
            <section className="w-full py-24 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border)] overflow-hidden">
                <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-[var(--primary-brand)] font-bold tracking-widest uppercase text-sm mb-4 block">Calendar</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] font-heading">Ecosystem Events & Sprints</h2>
                        <p className="text-[var(--text-muted)] mt-2 text-lg">Join our upcoming workshops, hackathons, and technical sprints.</p>
                    </div>
                    <button onClick={() => navigate('/events')} className="hidden sm:flex text-[var(--primary-brand)] font-bold items-center gap-2 hover:gap-3 transition-all mb-2">
                        View All <ArrowRight size={16} />
                    </button>
                </div>
                
                <div className="max-w-7xl mx-auto">
                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {events.length > 0 ? events.map((event, idx) => (
                            <div key={idx} className="snap-start shrink-0 w-[300px] sm:w-[350px] bg-[var(--surface-primary)] rounded-2xl border border-[var(--border)] overflow-hidden group cursor-pointer hover:border-[var(--primary-brand)] transition-colors" onClick={() => navigate(`/events/${event.id}`)}>
                                <div className="h-48 relative overflow-hidden">
                                    <img src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800'} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-[var(--bg-primary)] text-[var(--text-main)] text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-[var(--border)]">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-[var(--primary-brand)] text-xs font-bold uppercase tracking-wider mb-2">{event.type || 'Workshop'}</div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 line-clamp-1">{event.title}</h3>
                                    <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">{event.shortDescription || 'Join us for this exciting technical event.'}</p>
                                    <div className="flex justify-between items-center text-sm font-semibold text-[var(--text-main)] border-t border-[var(--border)] pt-4 mt-auto">
                                        <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><Calendar size={14}/> {event.location || 'Hybrid'}</span>
                                        <span className="text-[var(--primary-brand)] group-hover:translate-x-1 transition-transform">Details &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="w-full text-center py-16 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface-primary)]">
                                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">No Upcoming Events</h3>
                                <p>Check back soon for new workshops and sprints.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 5. TECHNOLOGY EXPERTISE */}
            <section className="w-full py-24 px-6 bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[var(--primary-brand)] font-bold tracking-widest uppercase text-sm mb-4 block">Core Competencies</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-6 font-heading">Technology Expertise</h2>
                        <p className="text-[var(--text-muted)] text-lg">We specialize in the technologies driving the future of the digital economy.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-colors group">
                            <Cpu size={32} className="text-[var(--text-main)] group-hover:text-[var(--primary-brand)] transition-colors mb-6" />
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Artificial Intelligence</h3>
                            <ul className="space-y-3 text-[var(--text-muted)] text-sm font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Machine Learning</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Generative AI & LLMs</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Computer Vision</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Prompt Engineering</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-colors group">
                            <Rocket size={32} className="text-[var(--text-main)] group-hover:text-[var(--primary-brand)] transition-colors mb-6" />
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Web & Cloud</h3>
                            <ul className="space-y-3 text-[var(--text-muted)] text-sm font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Full-Stack Dev</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Cloud Architecture</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> DevOps & CI/CD</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Microservices</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-colors group">
                            <Target size={32} className="text-[var(--text-main)] group-hover:text-[var(--primary-brand)] transition-colors mb-6" />
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Data & Analytics</h3>
                            <ul className="space-y-3 text-[var(--text-muted)] text-sm font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Data Engineering</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Big Data Processing</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Business Intelligence</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Predictive Analytics</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-colors group">
                            <Settings size={32} className="text-[var(--text-main)] group-hover:text-[var(--primary-brand)] transition-colors mb-6" />
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Automation</h3>
                            <ul className="space-y-3 text-[var(--text-muted)] text-sm font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> RPA Systems</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> IoT Integrations</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Workflow Optimization</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-brand)]"></div> Edge Computing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6 & 7. TESTIMONIALS AND COMMUNITY MOMENTS (Handled by ParticipantExperiences) */}
            <div className="bg-[var(--bg-secondary)] border-y border-[var(--border)]">
                <ParticipantExperiences performers={performers} />
            </div>

            {/* 8. TECHROXX ECOSYSTEM INTEGRATION DECK */}
            <section className="w-full py-24 px-6 bg-[var(--bg-primary)] relative overflow-hidden">
                {/* Background Ambient Glow Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[rgba(234,88,12,0.06)] blur-[120px] pointer-events-none rounded-full" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block bg-[rgba(234,88,12,0.1)] text-[var(--primary-brand)] font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">Our Network</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] mb-6 font-heading leading-tight">The TechRoxx Ecosystem</h2>
                        <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                            We sit at the intersection of talent, industry, and innovation, connecting all key stakeholders into one unified, high-impact digital platform.
                        </p>
                    </div>

                    {/* Architectural Nexus Command Banner */}
                    <div className="bg-[var(--surface-primary)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 mb-12 shadow-xl flex flex-wrap justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#f97316] text-white flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.35)] shrink-0">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] font-heading">Ecosystem Nexus Core</h3>
                                <p className="text-[var(--text-muted)] text-sm">Unified growth pathway connecting talent directly to market opportunities.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-t sm:border-t-0 sm:border-l border-[var(--border)] pt-4 sm:pt-0 sm:pl-8">
                            <div className="text-center sm:text-left">
                                <div className="text-2xl font-black text-[var(--primary-brand)] font-heading">10,000+</div>
                                <div className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">Engineers & Learners</div>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-2xl font-black text-[var(--primary-brand)] font-heading">50+</div>
                                <div className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">Industry Partners</div>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-2xl font-black text-[var(--primary-brand)] font-heading">100%</div>
                                <div className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">Skill Execution</div>
                            </div>
                        </div>
                    </div>

                    {/* 4 Interactive Ecosystem Pillar Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* Pillar 1: Students & Learners */}
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(234,88,12,0.1)] text-[var(--primary-brand)] group-hover:bg-[var(--primary-brand)] group-hover:text-white transition-all flex items-center justify-center">
                                        <Cpu size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border)]">Talent Pipeline</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 font-heading">Students & Learners</h3>
                                <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
                                    Transforming academic foundation into industry readiness through hands-on project sprints, AI tools, and technical mentorship.
                                </p>
                                <ul className="space-y-2.5 mb-8 text-xs font-semibold text-[var(--text-muted)]">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Project Portfolio Building</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Real-World Tooling Exposure</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Industry Mentor Guidance</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => navigate('/learn')} className="w-full py-3 px-4 rounded-xl border border-[var(--border)] text-[var(--text-main)] font-bold text-xs hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all flex items-center justify-center gap-2">
                                Learn Programs <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Pillar 2: Industry Enterprises */}
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(234,88,12,0.1)] text-[var(--primary-brand)] group-hover:bg-[var(--primary-brand)] group-hover:text-white transition-all flex items-center justify-center">
                                        <Briefcase size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border)]">Corporate Hiring</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 font-heading">Industry & Hiring</h3>
                                <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
                                    Connecting businesses directly to verified technical talent trained on modern stacks, frameworks, and engineering practices.
                                </p>
                                <ul className="space-y-2.5 mb-8 text-xs font-semibold text-[var(--text-muted)]">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Pre-Vetted Candidate Pipeline</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Custom Enterprise Upskilling</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Direct Project Sponsorship</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => navigate('/careers')} className="w-full py-3 px-4 rounded-xl border border-[var(--border)] text-[var(--text-main)] font-bold text-xs hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all flex items-center justify-center gap-2">
                                Partner with Us <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Pillar 3: Startups & Venture Labs */}
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(234,88,12,0.1)] text-[var(--primary-brand)] group-hover:bg-[var(--primary-brand)] group-hover:text-white transition-all flex items-center justify-center">
                                        <Rocket size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border)]">R&D Acceleration</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 font-heading">Startups & Ventures</h3>
                                <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
                                    Accelerating product development and prototyping for early-stage ventures with high-velocity engineering support.
                                </p>
                                <ul className="space-y-2.5 mb-8 text-xs font-semibold text-[var(--text-muted)]">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>MVP Architecture & Build</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>AI & Automation Integration</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Hackathon Product Incubator</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => navigate('/services')} className="w-full py-3 px-4 rounded-xl border border-[var(--border)] text-[var(--text-main)] font-bold text-xs hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all flex items-center justify-center gap-2">
                                Explore R&D Services <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Pillar 4: Technology & Innovation */}
                        <div className="bg-[var(--surface-primary)] p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--primary-brand)] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(234,88,12,0.1)] text-[var(--primary-brand)] group-hover:bg-[var(--primary-brand)] group-hover:text-white transition-all flex items-center justify-center">
                                        <Target size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border)]">Emerging Tech</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 font-heading">Tech & Innovation</h3>
                                <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
                                    Driving cutting-edge initiatives across Artificial Intelligence, Cloud Infrastructure, and Data Engineering.
                                </p>
                                <ul className="space-y-2.5 mb-8 text-xs font-semibold text-[var(--text-muted)]">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>GenAI & LLM Solutions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Cloud Microservices & DevOps</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[var(--primary-brand)] shrink-0" />
                                        <span>Data & Analytics Pipelines</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => navigate('/services')} className="w-full py-3 px-4 rounded-xl border border-[var(--border)] text-[var(--text-main)] font-bold text-xs hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all flex items-center justify-center gap-2">
                                Tech Capabilities <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. COLLABORATIVE PARTNERS */}
            <section className="w-full py-20 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[var(--text-muted)] font-bold tracking-widest uppercase text-sm">Trusted By Industry Leaders</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3 bg-[var(--surface-primary)] px-8 py-4 rounded-xl border border-[var(--border)]">
                            <Sparkles className="text-[var(--primary-brand)]" size={24} />
                            <span className="text-2xl font-black text-[var(--text-main)] font-heading">TaskVeda</span>
                        </div>
                        <div className="flex items-center gap-3 bg-[var(--surface-primary)] px-8 py-4 rounded-xl border border-[var(--border)]">
                            <Target className="text-[var(--primary-brand)]" size={24} />
                            <span className="text-2xl font-black text-[var(--text-main)] font-heading">Nextenti</span>
                        </div>
                        <div className="flex items-center gap-3 bg-[var(--surface-primary)] px-8 py-4 rounded-xl border border-[var(--border)]">
                            <Briefcase className="text-[var(--primary-brand)]" size={24} />
                            <span className="text-2xl font-black text-[var(--text-main)] font-heading">EdTech Partners</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. FINAL CTA */}
            <section className="w-full py-24 px-6 bg-[var(--primary-brand)] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 font-heading leading-tight drop-shadow-md">Build skills. Create solutions.<br/>Join the ecosystem.</h2>
                    <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium max-w-2xl mx-auto">Take the next step in your technology journey with TechRoxx.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigate('/services')} className="bg-[var(--bg-primary)] text-[var(--text-main)] hover:bg-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Explore Programs
                        </button>
                        <button onClick={() => navigate('/contact')} className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all">
                            Partner with Us
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;