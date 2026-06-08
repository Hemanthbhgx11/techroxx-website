import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadGlobalData } from '../utils/dataLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [completedEvents, setCompletedEvents] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [activeGalleryCategory, setActiveGalleryCategory] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGlobalData()
            .then(data => {
                setEvents(data.events || []);
                setGallery(data.eventGallery || []);
                setFilteredGallery(data.eventGallery || []);
                setTestimonials(data.eventTestimonials || []);
                
                // Categorize events by status
                const upcoming = (data.events || []).filter(
                    e => e.status === 'upcoming' || e.status === 'ongoing'
                ).sort((a, b) => new Date(a.date) - new Date(b.date) || a.priority - b.priority);
                
                const completed = (data.events || []).filter(
                    e => e.status === 'completed'
                ).sort((a, b) => new Date(b.date) - new Date(a.date)); // newest completed first
                
                setUpcomingEvents(upcoming);
                setCompletedEvents(completed);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading events page data:", err);
                setLoading(false);
            });
    }, []);

    // Filter gallery
    useEffect(() => {
        if (activeGalleryCategory === 'all') {
            setFilteredGallery(gallery);
        } else {
            setFilteredGallery(gallery.filter(item => item.category === activeGalleryCategory));
        }
    }, [activeGalleryCategory, gallery]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Static event categories
    const categories = [
        { icon: 'fa-laptop-code', title: 'Hackathons', desc: '36-hour sprint challenges solving real-world corporate or societal problems with software and AI agents.' },
        { icon: 'fa-tools', title: 'Workshops', desc: 'Intensive hands-on skill-development sessions focusing on MERN, firmware, cloud architectures, and hardware.' },
        { icon: 'fa-rocket', title: 'Bootcamps', desc: 'Multi-day immersion schedules that take students from total beginners to industry-ready deployers.' },
        { icon: 'fa-globe', title: 'Webinars', desc: 'Global broadcasts hosting industry leaders to discuss emerging trends like Agentic AI, VLSI, and IoT networks.' },
        { icon: 'fa-comments', title: 'Tech Talks', desc: 'Interactive, focus-driven technical sharing sessions for architects, developers, and aspiring engineers.' },
        { icon: 'fa-trophy', title: 'Competitions', desc: 'Hardware prototyping tournaments, firmware optimizations, and business pitch contests with rewards.' },
        { icon: 'fa-users', title: 'Community Meetups', desc: 'In-person local events designed to exchange thoughts, share project repositories, and network.' },
        { icon: 'fa-briefcase', title: 'Industry Connect Programs', desc: 'Exclusive networking structures linking students with startups, CTOs, and hiring managers.' }
    ];

    // Static services for organizations
    const services = [
        { icon: 'fa-calendar-check', title: 'Event Planning', desc: 'Full custom curriculum mapping, timeline scheduling, resource arrangement, and structure coordination.' },
        { icon: 'fa-tasks', title: 'Event Management', desc: 'End-to-end hardware provisioning, registration tracking, mentor coordination, and logistics execution.' },
        { icon: 'fa-bullhorn', title: 'Event Promotion', desc: 'Multi-channel student outreach, social campaigns, community broadcasts, and visual poster distribution.' },
        { icon: 'fa-eye', title: 'Brand Visibility', desc: 'Showcase your tech stack, APIs, or dev platforms to hundreds of developers and prospective hires.' },
        { icon: 'fa-link', title: 'Community Outreach', desc: 'Direct access to thousands of passionate engineering minds and digital creators across colleges.' },
        { icon: 'fa-user-graduate', title: 'Talent Engagement', desc: 'Evaluate students in real-time through coding tests, prototype runs, and group sprints.' },
        { icon: 'fa-university', title: 'Campus Connect Programs', desc: 'Host hackathons or expert seminars directly at partner engineering colleges and departments.' },
        { icon: 'fa-user-check', title: 'Recruitment Campaigns', desc: 'Targeted hiring events designed to source, screen, and interview candidates within a weekend.' },
        { icon: 'fa-handshake', title: 'Sponsorship Opportunities', desc: 'Support innovative challenges to build goodwill and sponsor awards for top engineering talent.' },
        { icon: 'fa-ad', title: 'Product Promotions', desc: 'Introduce your brand or cloud platform to prospective startup founders and tech students.' }
    ];

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
            {/* Inline Page Styling to ensure design consistency and prevent global style pollution */}
            <style>{`
                .events-hero-section {
                    position: relative;
                    padding: 140px 0 100px;
                    border-bottom: 1px solid rgba(239, 68, 68, 0.05);
                }
                .events-glow-orb {
                    position: absolute;
                    width: 450px;
                    height: 450px;
                    border-radius: 50%;
                    filter: blur(100px);
                    z-index: 0;
                    pointer-events: none;
                }
                .glow-orb-red {
                    top: -100px;
                    right: -50px;
                    background: radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%);
                }
                .glow-orb-blue {
                    bottom: -150px;
                    left: -100px;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
                }
                .events-split {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 60px;
                    align-items: center;
                }
                @media (max-width: 991px) {
                    .events-split {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 40px;
                    }
                }
                .events-hero-image-wrapper {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                }
                .events-hero-image {
                    width: 100%;
                    height: 420px;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .events-hero-image-wrapper:hover .events-hero-image {
                    transform: scale(1.03);
                }

                /* Swiper Slider Overrides */
                .swiper-container-wrapper .swiper-slide {
                    transition: opacity 0.4s, transform 0.4s;
                    opacity: 0.35;
                }
                .swiper-container-wrapper .swiper-slide-active {
                    opacity: 1 !important;
                    transform: scale(1.03);
                }
                .swiper-event-card {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-radius: 20px;
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    box-shadow: var(--card-shadow);
                    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                }
                .swiper-event-card:hover {
                    border-color: #ef4444;
                    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.15);
                }
                .swiper-event-card img {
                    width: 100%;
                    aspect-ratio: 16/9;
                    object-fit: cover;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                /* General Grid Styles */
                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                    margin-top: 40px;
                }
                .category-card {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: var(--card-shadow);
                    transition: all 0.3s ease;
                }
                .category-card:hover {
                    transform: translateY(-5px);
                    border-color: #ef4444;
                    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.1);
                    background: var(--bg-card);
                }
                .category-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    background: rgba(239, 68, 68, 0.08);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ef4444;
                    font-size: 1.3rem;
                    margin-bottom: 20px;
                    transition: all 0.3s ease;
                }
                .category-card:hover .category-icon {
                    background: #ef4444;
                    color: white;
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.35);
                    transform: scale(1.05);
                }

                /* Services (B2B) grid */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 30px;
                    margin-top: 40px;
                }
                .service-card {
                    display: flex;
                    gap: 20px;
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    padding: 25px;
                    border-radius: 18px;
                    transition: all 0.3s ease;
                }
                .service-card:hover {
                    border-color: #3b82f6;
                    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.1);
                    transform: translateY(-3px);
                }
                .service-icon-box {
                    width: 44px;
                    height: 44px;
                    border-radius: 10px;
                    background: rgba(59, 130, 246, 0.08);
                    border: 1px solid rgba(59, 130, 246, 0.15);
                    color: #3b82f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.15rem;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }
                .service-card:hover .service-icon-box {
                    background: #3b82f6;
                    color: white;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.35);
                }

                /* Timeline History styles */
                .timeline-container {
                    position: relative;
                    max-width: 900px;
                    margin: 50px auto 0;
                    padding-left: 30px;
                }
                .timeline-container::before {
                    content: '';
                    position: absolute;
                    left: 9px;
                    top: 10px;
                    bottom: 10px;
                    width: 2px;
                    background: linear-gradient(to bottom, #ef4444, #3b82f6);
                    opacity: 0.3;
                }
                .timeline-item {
                    position: relative;
                    margin-bottom: 40px;
                }
                .timeline-dot {
                    position: absolute;
                    left: -30px;
                    top: 6px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--bg-dark);
                    border: 3px solid #ef4444;
                    z-index: 2;
                    transition: transform 0.3s ease, border-color 0.3s ease;
                }
                .timeline-item:hover .timeline-dot {
                    transform: scale(1.2);
                    border-color: #3b82f6;
                }
                .timeline-card {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-radius: 16px;
                    padding: 25px;
                    display: grid;
                    grid-template-columns: 150px 1fr;
                    gap: 25px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                @media (max-width: 600px) {
                    .timeline-card {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }
                }
                .timeline-card:hover {
                    border-color: #ef4444;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    transform: translateX(5px);
                }
                .timeline-img {
                    width: 100%;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                /* Gallery filter buttons */
                .gallery-filter-bar {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-bottom: 35px;
                }
                .gallery-filter-btn {
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: var(--text-muted);
                    font-size: 0.88rem;
                    font-weight: 600;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .gallery-filter-btn.active, .gallery-filter-btn:hover {
                    background: #ef4444;
                    border-color: #ef4444;
                    color: white;
                    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.25);
                }
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 20px;
                }
                .gallery-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    aspect-ratio: 4/3;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    cursor: pointer;
                }
                .gallery-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .gallery-card:hover .gallery-img {
                    transform: scale(1.05);
                }
                .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(9, 13, 22, 0.85) 0%, transparent 80%);
                    opacity: 0;
                    display: flex;
                    align-items: flex-end;
                    padding: 20px;
                    transition: opacity 0.3s ease;
                }
                .gallery-card:hover .gallery-overlay {
                    opacity: 1;
                }

                /* Lightbox */
                .lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(9, 13, 22, 0.9);
                    backdrop-filter: blur(8px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                }
                .lightbox-img {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                }

                /* Count Up section */
                .metrics-section {
                    background: linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-dark) 100%);
                    border-top: 1px solid rgba(239, 68, 68, 0.05);
                    border-bottom: 1px solid rgba(239, 68, 68, 0.05);
                }
                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 30px;
                    text-align: center;
                }
                .metric-value {
                    font-size: 2.8rem;
                    font-weight: 800;
                    font-family: var(--font-head);
                    background: linear-gradient(135deg, #ef4444, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 5px;
                }

                /* Testimonial slider */
                .testimonial-card {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    padding: 35px;
                    border-radius: 20px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .testimonial-user {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-top: 20px;
                }
                .testimonial-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #ef4444;
                }

                /* Corporate B2B CTA Banner */
                .corporate-cta-banner {
                    margin-top: 60px;
                    padding: 60px 40px;
                    border-radius: 30px;
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    background: linear-gradient(135deg, rgba(9, 13, 22, 0.7) 0%, rgba(59, 130, 246, 0.05) 100%);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .corporate-cta-banner::before {
                    content: '';
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
                    pointer-events: none;
                }
            `}</style>

            {/* Background Ambient Glows */}
            <div className="events-glow-orb glow-orb-red"></div>
            <div className="events-glow-orb glow-orb-blue"></div>

            {/* 1. PAGE HEADER BANNER (Matching other pages) */}
            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200')`, marginTop: '70px', position: 'relative' }}>
                {/* SVG network connections overlay */}
                <svg 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 1.2,
                        opacity: 0.28
                    }} 
                    viewBox="0 0 1000 300" 
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="banner-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#64748b" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    <g stroke="url(#banner-line-grad)" strokeWidth="1">
                        <line x1="50" y1="50" x2="200" y2="120" strokeDasharray="4,4" className="network-line-pulse" />
                        <line x1="200" y1="120" x2="350" y2="80" className="network-line-pulse" />
                        <line x1="350" y1="80" x2="500" y2="180" strokeDasharray="2,2" className="network-line-pulse" />
                        <line x1="500" y1="180" x2="680" y2="90" className="network-line-pulse" />
                        <line x1="680" y1="90" x2="850" y2="160" className="network-line-pulse" />
                        <line x1="850" y1="160" x2="950" y2="70" strokeDasharray="4,4" className="network-line-pulse" />
                        
                        <line x1="200" y1="120" x2="150" y2="250" opacity="0.4" stroke="#64748b" />
                        <line x1="500" y1="180" x2="450" y2="280" opacity="0.4" stroke="#ea580c" />
                        <line x1="680" y1="90" x2="720" y2="220" opacity="0.4" stroke="#64748b" />
                    </g>
                    <g fill="#ea580c">
                        <circle cx="50" cy="50" r="4.5" className="network-node-glow" />
                        <circle cx="350" cy="80" r="5" className="network-node-glow" />
                        <circle cx="680" cy="90" r="5" className="network-node-glow" />
                        <circle cx="950" cy="70" r="4.5" className="network-node-glow" />
                    </g>
                    <g fill="#64748b">
                        <circle cx="200" cy="120" r="5" className="network-node-glow" />
                        <circle cx="500" cy="180" r="6" className="network-node-glow" />
                        <circle cx="850" cy="160" r="5" className="network-node-glow" />
                    </g>
                </svg>
                <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                    <div className="page-header-content">
                        <span className="learning-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.12)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-head)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                            <i className="fas fa-calendar-alt"></i> TECHROXX HUB
                        </span>
                        <h1 className="page-header-title" style={{ fontFamily: 'var(--font-head)' }}>Events That Create Impact</h1>
                        <p className="page-header-desc" style={{ fontFamily: 'var(--font-body)' }}>Connecting Industries, Talent, Innovation, and Communities Through Meaningful Experiences.</p>
                    </div>
                </div>
            </div>

            {/* INTRO ABOUT BOX BELOW HERO */}
            <section style={{ position: 'relative', paddingTop: '40px', paddingBottom: '10px' }}>
                <div className="container">
                    <div className="glass-panel" style={{ 
                        padding: '40px 30px', 
                        borderRadius: '24px', 
                        marginBottom: '10px', 
                        position: 'relative', 
                        overflow: 'hidden',
                        border: '1px solid rgba(239, 68, 68, 0.12)',
                        background: 'var(--bg-panel)',
                        boxShadow: '0 10px 40px -10px rgba(239, 68, 68, 0.08)'
                    }}>
                        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                            Techroxx organizes workshops, hackathons, bootcamps, competitions, webinars, community programs, and industry-driven events that help people learn, connect, innovate, and grow.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '25px' }}>
                            <button onClick={() => scrollToSection('partner-inquiry')} className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.88rem' }}>
                                Organize an Event With Us
                            </button>
                            <button onClick={() => scrollToSection('partner-inquiry')} className="btn" style={{ border: '1px solid rgba(255, 255, 255, 0.15)', color: 'var(--text-main)', padding: '10px 24px', fontSize: '0.88rem' }}>
                                Partner With Techroxx
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. UPCOMING EVENTS SECTION */}
            <section className="section-padding" style={{ position: 'relative' }}>
                <div className="container">
                    <h2 className="section-title">Upcoming Events</h2>
                    <p className="section-subtitle">Reserve Your Spot In Our Upcoming Challenges & Workshops</p>

                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-panel skeleton-pulse" style={{ height: '350px', borderRadius: '16px', backgroundColor: 'rgba(124, 58, 237, 0.03)' }}></div>
                            ))}
                        </div>
                    ) : upcomingEvents.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '50px 30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <i className="fas fa-calendar-times" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '15px' }}></i>
                            <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>No upcoming events scheduled</h4>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto 0' }}>All current programs are completed. Stay tuned! New developer challenges will be announced shortly.</p>
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
                                    rotate: 10,
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
                                {upcomingEvents.map(event => (
                                    <SwiperSlide key={event.id} style={{ width: '330px', background: 'transparent' }}>
                                        <div className="swiper-event-card" onClick={() => navigate(`/events/${event.slug}`)}>
                                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                                                <img 
                                                    src={event.image} 
                                                    alt={event.title} 
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600";
                                                    }}
                                                />
                                                <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'linear-gradient(135deg, #ef4444, #3b82f6)', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    {event.category}
                                                </div>
                                            </div>
                                            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                    <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        <i className="fas fa-calendar-alt" style={{ marginRight: '6px' }}></i>
                                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <span style={{ 
                                                        background: event.mode === 'online' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                                                        color: event.mode === 'online' ? '#3b82f6' : '#ef4444', 
                                                        fontSize: '0.7rem', 
                                                        fontWeight: 800, 
                                                        padding: '3px 8px', 
                                                        borderRadius: '6px',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {event.mode}
                                                    </span>
                                                </div>
                                                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, minHeight: '52px', marginBottom: '10px', lineHeight: 1.35 }}>{event.title}</h4>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, flex: 1 }}>{event.description}</p>
                                                
                                                <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                                    View Event Details <i className="fas fa-arrow-right"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. ABOUT TECHROXX EVENTS */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-dark) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">Why We Organize Events</h2>
                    <p className="section-subtitle">Bridging The Academic-Industry Divide Through Action</p>

                    <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-users-class"></i></div>
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Connect Industry & Talent</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Bringing corporate mentors, developers, startup founders, and hiring directors face-to-face with top engineering students.</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-lightbulb"></i></div>
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Encourage Innovation</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Creating environments where students are forced to think outside classrooms, prototyping solutions to messy, raw challenges.</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-graduation-cap"></i></div>
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Promote Active Learning</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Replacing static blackboard slideshows with live code compilers, electronics routing tools, and direct server deployments.</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-comments-alt"></i></div>
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Build Communities</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Fostering peer-to-peer sharing circles where code modules are checked, hardware boards analyzed, and launch ideas shared.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EVENT CATEGORIES */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">Event Categories</h2>
                    <p className="section-subtitle">Explore Our Specialized Ecosystem Action Tracks</p>

                    <div className="categories-grid">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="category-card">
                                <div className="category-icon">
                                    <i className={`fas ${cat.icon}`}></i>
                                </div>
                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '10px' }}>{cat.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. EVENT SERVICES FOR ORGANIZATIONS */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-panel) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">Partner With Techroxx</h2>
                    <p className="section-subtitle">Professional Planning, Promotion, & Execution Services For Organizations</p>

                    <div className="services-grid">
                        {services.map((srv, idx) => (
                            <div key={idx} className="service-card">
                                <div className="service-icon-box">
                                    <i className={`fas ${srv.icon}`}></i>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>{srv.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>{srv.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* 6. EVENT HISTORY (completed events) */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">Our Event Journey</h2>
                    <p className="section-subtitle">Chronological History of Completed Techroxx Ecosystem Challenges</p>

                    {completedEvents.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', borderRadius: '16px' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No completed historical events found.</p>
                        </div>
                    ) : (
                        <div className="timeline-container">
                            {completedEvents.map(event => (
                                <div key={event.id} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-card" onClick={() => navigate(`/events/${event.slug}`)}>
                                        <div>
                                            <img src={event.image} alt={event.title} className="timeline-img" />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{event.category}</span>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '6px' }}>{event.title}</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{event.description}</p>
                                            <span style={{ fontSize: '0.78rem', color: '#3b82f6', fontWeight: 700, marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                                View Outcomes & Details <i className="fas fa-chevron-right"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 7. EVENT GALLERY */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-dark) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">Event Gallery</h2>
                    <p className="section-subtitle">Visual Highlights From Hackathons, Workshops, And Activities</p>

                    <div className="gallery-filter-bar">
                        {['all', 'hackathon', 'workshop', 'webinar', 'community'].map(cat => (
                            <button 
                                key={cat} 
                                className={`gallery-filter-btn ${activeGalleryCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveGalleryCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}s
                            </button>
                        ))}
                    </div>

                    {filteredGallery.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', borderRadius: '16px' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No photos available in this category.</p>
                        </div>
                    ) : (
                        <div className="gallery-grid">
                            {filteredGallery.map(item => (
                                <div key={item.id} className="gallery-card" onClick={() => setLightboxImage(item)}>
                                    <img src={item.image} alt={item.title} className="gallery-img" />
                                    <div className="gallery-overlay">
                                        <div style={{ color: 'white' }}>
                                            <span style={{ fontSize: '0.7rem', background: '#ef4444', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 800 }}>{item.category}</span>
                                            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '8px 0 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{item.title}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
                    <button style={{ position: 'absolute', top: '20px', right: '30px', background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}>×</button>
                    <div onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', maxWidth: '800px' }}>
                        <img src={lightboxImage.image} alt={lightboxImage.title} className="lightbox-img" />
                        <h3 style={{ color: 'white', marginTop: '15px', fontWeight: 700 }}>{lightboxImage.title}</h3>
                        <span style={{ color: '#ef4444', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>{lightboxImage.category}</span>
                    </div>
                </div>
            )}

            {/* 9. TESTIMONIALS */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">Ecosystem Feedback</h2>
                    <p className="section-subtitle">What Participants, Partners, And Speakers Say About Techroxx Events</p>

                    {testimonials.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', borderRadius: '16px' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No testimonials available.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
                            {testimonials.map(t => (
                                <div key={t.id} className="testimonial-card">
                                    <div style={{ display: 'flex', gap: '5px', color: '#f59e0b', marginBottom: '15px' }}>
                                        {[...Array(t.rating)].map((_, i) => (
                                            <i key={i} className="fas fa-star"></i>
                                        ))}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1, fontStyle: 'italic' }}>
                                        "{t.feedback}"
                                    </p>
                                    <div className="testimonial-user">
                                        <img src={t.image} alt={t.name} className="testimonial-avatar" />
                                        <div>
                                            <h4 style={{ color: 'var(--text-main)', fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>{t.name}</h4>
                                            <span style={{ color: '#ef4444', fontSize: '0.78rem', fontWeight: 700 }}>{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 10. IGNITE AI 2026 — EVENT CONTENT HIGHLIGHTS */}
            <section id="ignite-ai-highlights" style={{ position: 'relative', padding: '100px 0 80px', borderTop: '1px solid rgba(234, 88, 12, 0.08)' }}>
                <div className="container">
                    {/* Section Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.12)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '18px' }}>
                            <i className="fas fa-fire"></i> Flagship Event · SDC × Tech Roxx
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.2 }}>
                            Ignite AI 2026 — Event Highlights
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
                            A 6-day intensive AI bootcamp co-hosted by SDC & Tech Roxx, covering cutting-edge AI tools, hands-on sessions, and real-world problem-solving sprints.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '60px' }}>
                        {[
                            { icon: 'fa-calendar-day', value: '6', label: 'Full Days', color: '#ea580c' },
                            { icon: 'fa-users', value: '200+', label: 'Participants', color: '#3b82f6' },
                            { icon: 'fa-chalkboard-teacher', value: '12+', label: 'Expert Sessions', color: '#10b981' },
                            { icon: 'fa-brain', value: 'AI & ML', label: 'Core Focus', color: '#a855f7' },
                            { icon: 'fa-trophy', value: 'Live', label: 'Project Demos', color: '#f59e0b' },
                            { icon: 'fa-certificate', value: '100%', label: 'Certified', color: '#06b6d4' },
                        ].map(({ icon, value, label, color }) => (
                            <div key={label} style={{ background: 'var(--bg-panel)', border: `1px solid ${color}25`, borderTop: `3px solid ${color}`, borderRadius: '16px', padding: '22px 16px', textAlign: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 35px ${color}20`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <i className={`fas ${icon}`} style={{ fontSize: '1.4rem', color, marginBottom: '10px', display: 'block' }}></i>
                                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'var(--font-head)', lineHeight: 1 }}>{value}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '6px' }}>{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Day-by-Day Content Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {[
                            {
                                day: 'Day 1', title: 'Foundations of AI & Kickoff',
                                icon: 'fa-rocket', color: '#ea580c',
                                points: ['Introduction to AI/ML landscape', 'Setting up AI development environments', 'Hands-on: First ML model training', 'Team formation & problem statement reveal']
                            },
                            {
                                day: 'Day 2', title: 'Deep Learning & Neural Nets',
                                icon: 'fa-brain', color: '#3b82f6',
                                points: ['CNN & RNN architecture deep-dive', 'Training image classification models', 'Overfitting prevention techniques', 'Live coding: Custom neural network build']
                            },
                            {
                                day: 'Day 3', title: 'Generative AI & LLMs',
                                icon: 'fa-magic', color: '#a855f7',
                                points: ['How Large Language Models work', 'Prompt engineering masterclass', 'Building with OpenAI & HuggingFace APIs', 'RAG architecture implementation']
                            },
                            {
                                day: 'Day 4', title: 'Agentic AI & Automation',
                                icon: 'fa-cogs', color: '#10b981',
                                points: ['Multi-agent system design patterns', 'LangChain & CrewAI frameworks', 'Building autonomous AI agents', 'Tool use, memory & planning loops']
                            },
                            {
                                day: 'Day 5', title: 'AI Product Development',
                                icon: 'fa-layer-group', color: '#f59e0b',
                                points: ['End-to-end AI product architecture', 'Integrating AI into web apps', 'Deployment on cloud platforms', 'User experience & AI safety considerations']
                            },
                            {
                                day: 'Day 6', title: 'Demo Day & Graduation',
                                icon: 'fa-trophy', color: '#06b6d4',
                                points: ['Final project presentations', 'Live judging panel evaluation', 'Awards & recognition ceremony', 'Certificate distribution & networking']
                            },
                        ].map(({ day, title, icon, color, points }) => (
                            <div key={day} style={{ background: 'var(--bg-panel)', border: '1px solid var(--glass-border)', borderRadius: '18px', padding: '24px', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease, border-color 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${color}50`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${color}, transparent)` }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className={`fas ${icon}`} style={{ color, fontSize: '1.1rem' }}></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{day}</div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>{title}</div>
                                    </div>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {points.map((pt, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                            <i className="fas fa-check-circle" style={{ color, fontSize: '0.75rem', marginTop: '3px', flexShrink: 0 }}></i>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. EVENT DOCUMENTS & RESOURCES */}
            <section id="event-documents" style={{ position: 'relative', padding: '80px 0 100px', borderTop: '1px solid rgba(59, 130, 246, 0.08)', background: 'linear-gradient(180deg, transparent 0%, rgba(234,88,12,0.02) 100%)' }}>
                <div className="container">
                    {/* Section Header */}
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '6px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '18px' }}>
                            <i className="fas fa-folder-open"></i> Event Resources
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px' }}>
                            Session Slides & Reports
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
                            Download official session presentations and comprehensive reports from the Ignite AI 2026 bootcamp.
                        </p>
                    </div>

                    {/* Documents Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
                        {[
                            {
                                name: 'Day 1 — SDC × Tech Roxx Session',
                                file: '/assets/DAY 1 SDC.pptx',
                                type: 'PPTX',
                                icon: 'fa-file-powerpoint',
                                color: '#ea580c',
                                iconBg: 'rgba(234,88,12,0.12)',
                                desc: 'Kickoff presentation covering AI foundations, environment setup, and team formation.',
                                size: '~12 MB'
                            },
                            {
                                name: 'Day 2 — SDC × Tech Roxx Session',
                                file: '/assets/Day 2 SDC.pdf',
                                type: 'PDF',
                                icon: 'fa-file-pdf',
                                color: '#ef4444',
                                iconBg: 'rgba(239,68,68,0.12)',
                                desc: 'Deep learning & neural network architectures with hands-on model training guides.',
                                size: '~20 MB'
                            },
                            {
                                name: 'Day 3 — Ignite AI 2026',
                                file: '/assets/DAY 3 SDC x Tech Roxx Ignite AI 2026.pdf',
                                type: 'PDF',
                                icon: 'fa-file-pdf',
                                color: '#a855f7',
                                iconBg: 'rgba(168,85,247,0.12)',
                                desc: 'Generative AI, LLMs, prompt engineering and RAG system implementation guide.',
                                size: '~14 MB'
                            },
                            {
                                name: 'Day 4 — Ignite AI 2026',
                                file: '/assets/ignite AI day 4 SDC x Tech Roxx.pdf',
                                type: 'PDF',
                                icon: 'fa-file-pdf',
                                color: '#10b981',
                                iconBg: 'rgba(16,185,129,0.12)',
                                desc: 'Agentic AI systems, LangChain, CrewAI frameworks and autonomous agent patterns.',
                                size: '~23 MB'
                            },
                            {
                                name: 'Day 5 — Ignite AI 2026',
                                file: '/assets/DAY 5 SDC x Tech Roxx Ignite AI 2026.pdf',
                                type: 'PDF',
                                icon: 'fa-file-pdf',
                                color: '#f59e0b',
                                iconBg: 'rgba(245,158,11,0.12)',
                                desc: 'AI product development, cloud deployment and UX/safety considerations for AI apps.',
                                size: '~14 MB'
                            },
                            {
                                name: 'Day 6 — Ignite AI 2026',
                                file: '/assets/day 6 SDC x Techroxx.in ignite ai.pdf',
                                type: 'PDF',
                                icon: 'fa-file-pdf',
                                color: '#06b6d4',
                                iconBg: 'rgba(6,182,212,0.12)',
                                desc: 'Demo day presentations, judging rubrics and award ceremony documentation.',
                                size: '~19 MB'
                            },
                            {
                                name: 'Official Ignite AI 2026 Report',
                                file: '/assets/Report On IGNITE AI 2026.pdf',
                                type: 'PDF',
                                icon: 'fa-file-alt',
                                color: '#3b82f6',
                                iconBg: 'rgba(59,130,246,0.12)',
                                desc: 'Comprehensive event report covering outcomes, participant feedback, and key metrics.',
                                size: '~9 MB',
                                featured: true
                            },
                        ].map(({ name, file, type, icon, color, iconBg, desc, size, featured }) => (
                            <div key={name} style={{ background: featured ? `linear-gradient(135deg, rgba(59,130,246,0.06) 0%, var(--bg-panel) 100%)` : 'var(--bg-panel)', border: `1px solid ${featured ? 'rgba(59,130,246,0.25)' : 'var(--glass-border)'}`, borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${color}18`; e.currentTarget.style.borderColor = `${color}40`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = featured ? 'rgba(59,130,246,0.25)' : 'var(--glass-border)'; }}>
                                {featured && (
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', fontSize: '0.6rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        Featured
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: iconBg, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className={`fas ${icon}`} style={{ fontSize: '1.4rem', color }}></i>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                            <span style={{ fontSize: '0.6rem', fontWeight: 800, background: `${color}18`, color, padding: '2px 7px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{type}</span>
                                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>{size}</span>
                                        </div>
                                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3, wordBreak: 'break-word' }}>{name}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                    <a href={file} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 700, background: `${color}15`, color, border: `1px solid ${color}25`, textDecoration: 'none', transition: 'all 0.25s ease' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.color = color; }}>
                                        <i className="fas fa-eye"></i> View
                                    </a>
                                    <a href={file} download style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)', textDecoration: 'none', transition: 'all 0.25s ease' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                                        <i className="fas fa-download"></i> Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. FINAL INQUIRY B2B CTA */}
            <section id="partner-inquiry" className="section-padding" style={{ position: 'relative', borderTop: '1px solid rgba(59, 130, 246, 0.08)' }}>
                <div className="container">
                    <div className="corporate-cta-banner">
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(59, 130, 246, 0.12)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                color: '#60a5fa',
                                padding: '6px 14px',
                                borderRadius: '30px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                marginBottom: '20px'
                            }}>
                                <i className="fas fa-building"></i> Corporate Collaboration
                            </span>
                            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '15px' }}>
                                Organize Your Next Event With Techroxx
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '35px' }}>
                                Whether you are a startup, company, educational institution, brand, community, or NGO, Techroxx can help you plan, host, promote, and execute professional technical events that engage the right audience and drive meaningful connections.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem', background: '#3b82f6', borderColor: '#3b82f6', boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)' }}>
                                    Schedule a Discussion
                                </button>
                                <button onClick={() => navigate('/contact')} className="btn" style={{ border: '1px solid rgba(255, 255, 255, 0.15)', color: 'var(--text-main)', padding: '12px 28px', fontSize: '0.95rem' }}>
                                    Partner With Techroxx
                                </button>
                                <button onClick={() => navigate('/contact')} className="btn" style={{ border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', background: 'rgba(59, 130, 246, 0.03)', padding: '12px 28px', fontSize: '0.95rem' }}>
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
