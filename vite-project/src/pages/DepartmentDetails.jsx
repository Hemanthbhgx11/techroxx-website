import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadGlobalData } from '../utils/dataLoader';

// Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const DepartmentDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState(null);
    const [domains, setDomains] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        setLoading(true);
        loadGlobalData()
            .then(data => {
                const foundDept = data.departments.find(d => d.slug === slug);
                if (!foundDept) {
                    setDepartment(null);
                    setLoading(false);
                    return;
                }

                setDepartment(foundDept);

                // Filter domains
                const deptDomains = data.domains.filter(d => d.department === slug);
                setDomains(deptDomains);

                // Filter events: status is active AND date is upcoming
                const today = new Date();
                today.setHours(0, 0, 0, 0); // normalize today

                const activeUpcomingEvents = data.events
                    .filter(e => e.department === slug && e.status === "active" && new Date(e.date) >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date) || a.priority - b.priority);

                setEvents(activeUpcomingEvents);
                setFilteredEvents(activeUpcomingEvents);
                setSelectedCategory('All');
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading department data:', err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    // Handle Category Filter changes
    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(e => e.category.toLowerCase() === category.toLowerCase());
            setFilteredEvents(filtered);
        }
    };

    // Render skeleton pulses when loading
    if (loading) {
        return (
            <section className="section-padding animate-enter" style={{ background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="skeleton-pulse" style={{ height: '50px', width: '30%', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', marginBottom: '20px' }}></div>
                    <div className="skeleton-pulse" style={{ height: '350px', width: '100%', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', marginBottom: '40px' }}></div>
                    <div className="skeleton-pulse" style={{ height: '150px', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '16px' }}></div>
                </div>
                <style>{`
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
        );
    }

    // Render Clean Route Validation: If invalid slug, show "Department Not Found"
    if (error || !department) {
        return (
            <section className="section-padding animate-enter" style={{ background: 'var(--bg-dark)', textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ fontSize: '4rem', color: 'var(--primary-brand)', marginBottom: '20px' }}>
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h2 className="section-title" style={{ background: 'none', WebkitTextFillColor: 'var(--text-main)' }}>Department Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '15px auto 30px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        The specialized training track you are trying to view does not exist or has been relocated.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/services')}>
                        <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i> Back to Services
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="section-padding animate-enter" style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
            <div className="container">
                
                {/* BACK BUTTON */}
                <div style={{ marginBottom: '30px' }}>
                    <button className="back-btn" onClick={() => navigate('/services')} style={{ border: '1px solid rgba(220, 38, 38, 0.1)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', background: 'var(--bg-panel)', transition: '0.3s' }}>
                        <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Back to Services
                    </button>
                </div>

                {/* 1. HERO SECTION */}
                <div className="glass-panel" style={{ 
                    padding: '50px 40px', 
                    borderRadius: '24px', 
                    marginBottom: '50px', 
                    position: 'relative', 
                    overflow: 'hidden',
                    border: '1px solid rgba(220, 38, 38, 0.12)',
                    background: 'var(--bg-panel)',
                    boxShadow: '0 10px 40px -10px rgba(220, 38, 38, 0.08)'
                }}>
                    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                    <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            background: 'linear-gradient(135deg, #ef4444, #3b82f6, #ef4444)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(220, 38, 38, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: 'white'
                        }}>
                            <i className={`fas ${department.icon}`} style={{ fontSize: '1.6rem' }}></i>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{department.name}</h2>
                            <p style={{ color: '#3b82f6', fontWeight: 700, margin: '5px 0 0', fontSize: '1rem', letterSpacing: '0.5px' }}>{department.tagline}</p>
                        </div>
                    </div>
                    
                    {/* Beautiful Premium Gradient Divider */}
                    <hr style={{ border: 0, height: '1.5px', background: 'linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)', margin: '25px 0' }} />
                    
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '800px', margin: 0 }}>{department.about}</p>
                </div>
 
                {/* 2. DOMAINS SECTION */}
                <div style={{ marginBottom: '60px' }}>
                    <h3 className="section-title" style={{ textAlign: 'left', marginBottom: '10px', fontSize: '1.6rem' }}>Domains & Learning Areas</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.95rem' }}>Specialized educational subsets and hands-on modules in this track</p>
                    
                    {domains.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Content will be updated soon</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                            {domains.map((dom, idx) => (
                                <div key={idx} className="glass-panel tilt-card" style={{ 
                                    padding: '30px', 
                                    borderRadius: '16px', 
                                    border: '1px solid rgba(220, 38, 38, 0.08)', 
                                    background: 'var(--bg-panel)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%'
                                }}>
                                    <div>
                                        <h4 style={{ color: '#3b82f6', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', minHeight: '52px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '8px', height: '8px', background: 'var(--primary-brand)', borderRadius: '50%', flexShrink: 0 }}></span>
                                            {dom.domain}
                                        </h4>
                                        <hr style={{ border: 0, height: '1.5px', background: 'linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)', margin: '12px 0' }} />
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{dom.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. PROGRAMS & EVENTS SECTION WITH SWIPER */}
                <div style={{ marginBottom: '60px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h3 className="section-title" style={{ textAlign: 'left', marginBottom: '10px', fontSize: '1.6rem' }}>Programs & Events</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Upcoming competitive sprints, hands-on hackathons, and certified workshops</p>
                        </div>
                        
                        {/* Category Filter Pills (Bonus UX) */}
                        {events.length > 0 && (
                            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-panel)', border: '1px solid rgba(220, 38, 38, 0.08)', padding: '5px', borderRadius: '30px', flexWrap: 'wrap' }}>
                                {['All', 'Hackathon', 'Workshop', 'Webinar'].map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => handleCategoryFilter(cat)}
                                        style={{ 
                                            padding: '6px 16px', 
                                            borderRadius: '20px', 
                                            border: 'none', 
                                            fontSize: '0.85rem', 
                                            fontWeight: 600, 
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            background: selectedCategory === cat ? 'linear-gradient(135deg, #ef4444, #3b82f6)' : 'transparent',
                                            color: selectedCategory === cat ? 'white' : 'var(--text-muted)'
                                        }}
                                    >
                                        {cat}s
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {filteredEvents.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <i className="fas fa-calendar-times" style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '10px' }}></i>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>No active programs available</p>
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
                                {filteredEvents.map(event => (
                                    <SwiperSlide key={event.id} style={{ width: '320px', background: 'transparent' }}>
                                        <div className="swiper-event-card glass-panel" style={{ 
                                            background: 'var(--bg-panel)', 
                                            borderRadius: '16px', 
                                            overflow: 'hidden', 
                                            border: '1px solid rgba(220, 38, 38, 0.12)',
                                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
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
                                                <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    <i className="fas fa-calendar-alt" style={{ marginRight: '6px' }}></i>
                                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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

                {/* 4. INFO TABS SECTION */}
                <div>
                    <h3 className="section-title" style={{ textAlign: 'left', marginBottom: '25px', fontSize: '1.6rem' }}>Ecosystem Quick Info</h3>
                    
                    {/* Tab Navigation */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', pb: '10px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'about', label: 'About Department', icon: 'fa-info-circle' },
                            { id: 'learn', label: 'What You Will Learn', icon: 'fa-graduation-cap' },
                            { id: 'careers', label: 'Career Opportunities', icon: 'fa-briefcase' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '12px 20px',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-head)',
                                    color: activeTab === tab.id ? '#3b82f6' : 'var(--text-muted)',
                                    borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
                                    transition: '0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <i className={`fas ${tab.icon}`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Contents Panel */}
                    <div className="glass-panel" style={{ 
                        padding: '35px 30px', 
                        borderRadius: '16px', 
                        border: '1px solid rgba(220, 38, 38, 0.08)', 
                        background: 'var(--bg-panel)',
                        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.05)',
                        minHeight: '120px'
                    }}>
                        {activeTab === 'about' && (
                            <div className="animate-enter">
                                <h4 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '12px' }}>Track Overview</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{department.about}</p>
                            </div>
                        )}
                        {activeTab === 'learn' && (
                            <div className="animate-enter">
                                <h4 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '12px' }}>Curriculum & Focus Areas</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{department.learn}</p>
                            </div>
                        )}
                        {activeTab === 'careers' && (
                            <div className="animate-enter">
                                <h4 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '12px' }}>Industry Job Placement Roles</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{department.careers}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Custom Active Swiper Slide Dimming Styles */}
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
                
                /* Premium Card Hovers & Alignments */
                .tilt-card {
                    background: var(--bg-panel) !important;
                    backdrop-filter: blur(16px) !important;
                    border: 1px solid rgba(220, 38, 38, 0.12) !important;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05) !important;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease !important;
                    border-radius: 16px !important;
                }
                .tilt-card:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    box-shadow: 0 15px 35px rgba(220, 38, 38, 0.12) !important;
                    border-color: #3b82f6 !important;
                    background: var(--bg-card) !important;
                }
            `}</style>
        </section>
    );
};

export default DepartmentDetails;
