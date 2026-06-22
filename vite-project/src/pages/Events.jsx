import React, { useState, useEffect } from 'react';
import '../styles/pages/Events.css';
import { useNavigate } from 'react-router-dom';
import { loadGlobalData } from '../utils/dataLoader';

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        setLoading(true);
        loadGlobalData()
            .then(data => {
                const allEvents = data.events || [];
                // Sort by date descending
                allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
                setEvents(allEvents);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading events database:", err);
                setLoading(false);
            });
    }, []);

    const handleCardClick = (slug) => {
        navigate(`/events/${slug}`);
    };

    if (loading) {
        return (
            <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '4px solid transparent', borderTopColor: 'var(--primary-brand)', animation: 'spin 1s linear infinite' }}></div>
                    <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: '4px solid transparent', borderBottomColor: '#3b82f6', animation: 'spin 1.5s linear infinite' }}></div>
                </div>
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Filter events
    const filteredEvents = events.filter(e => {
        if (activeFilter === 'All') return true;
        return e.category?.toLowerCase() === activeFilter.toLowerCase();
    });

    const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
    const completedEvents = filteredEvents.filter(e => e.status === 'completed' || e.status === 'archived');

    return (
        <div className="events-page" style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', overflow: 'hidden', position: 'relative', color: 'var(--text-main)', fontFamily: "'Inter', sans-serif" }}>

            {/* Background Ambient Glows */}
            <div className="events-glow-orb glow-orb-orange"></div>
            <div className="events-glow-orb glow-orb-slate"></div>

            {/* PAGE HEADER BANNER */}
            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200')` }}>
                <div className="container" style={{ width: '100%' }}>
                    <div className="page-header-content">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.15)', border: '1px solid rgba(234, 88, 12, 0.4)', color: '#ea580c', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            TECHROXX EVENTS
                        </span>
                        <h1 className="page-header-title">Ecosystem Event Portfolio</h1>
                        <p className="page-header-desc">Empowering student communities, developers, and institutions through hands-on hackathons, masterclasses, and bootcamps.</p>
                    </div>
                </div>
            </div>

            {/* INTRO DETAILS AND PORTFOLIO FILTER */}
            <section style={{ position: 'relative', paddingTop: '40px', paddingBottom: '10px' }}>
                <div className="container">
                    <div style={{
                        padding: '30px 35px',
                        borderRadius: '24px',
                        marginBottom: '40px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--bg-panel)',
                        boxShadow: 'var(--card-shadow)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, margin: 0, maxWidth: '600px' }}>
                            Explore our comprehensive list of active workshops, hackathons, and certified bootcamps. Select any concluded event to view its Hall of Excellence, transformation stories, and participant certificates.
                        </p>

                        {/* Filter pills */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['All', 'Bootcamp', 'Workshop', 'Hackathon', 'Webinar', 'Masterclass'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        background: activeFilter === filter ? 'var(--primary-brand)' : 'transparent',
                                        border: `1px solid ${activeFilter === filter ? 'var(--primary-brand)' : 'rgba(255,255,255,0.08)'}`,
                                        color: activeFilter === filter ? 'white' : 'var(--text-muted)',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {filter}s
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* UPCOMING EVENTS */}
            {upcomingEvents.length > 0 && (
                <section style={{ position: 'relative', paddingBottom: '60px' }}>
                    <div className="container">
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 5px' }}>Upcoming Sessions</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Register and secure your slots for upcoming technical sprints.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                            {upcomingEvents.map(evt => (
                                <article
                                    key={evt.id}
                                    className="portfolio-card"
                                    onClick={() => handleCardClick(evt.slug)}
                                >
                                    <div className="portfolio-card-img-wrapper">
                                        <img src={evt.image} alt={evt.title} className="portfolio-card-img" />
                                        <span className="portfolio-card-category">{evt.category}</span>
                                    </div>
                                    <div className="portfolio-card-content">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--primary-brand)', fontWeight: 800, textTransform: 'uppercase' }}>
                                                {evt.mode} ● {evt.venue?.split(' ')[0]}
                                            </span>
                                            <span style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 700 }}>
                                                {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <h3 className="portfolio-card-title">{evt.title}</h3>
                                        <p className="portfolio-card-desc">{evt.description}</p>
                                        <div className="portfolio-card-footer">
                                            <span className="portfolio-learn-more">Register Now ➔</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* COMPLETED PROGRAMS */}
            {completedEvents.length > 0 && (
                <section style={{ position: 'relative', paddingBottom: '80px', borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
                    <div className="container">
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 5px' }}>Concluded Ecosystem Programs</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Review outcomes, student scorecards, and certificates for completed sessions.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                            {completedEvents.map(evt => (
                                <article
                                    key={evt.id}
                                    className="portfolio-card completed-program"
                                    onClick={() => handleCardClick(evt.slug)}
                                >
                                    <div className="portfolio-card-img-wrapper">
                                        <img src={evt.image} alt={evt.title} className="portfolio-card-img" />
                                        <span className="portfolio-card-category" style={{ background: '#475569' }}>{evt.category}</span>
                                    </div>
                                    <div className="portfolio-card-content">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                                                {evt.mode} Completed
                                            </span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                                                {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <h3 className="portfolio-card-title">{evt.title}</h3>
                                        <p className="portfolio-card-desc">{evt.description}</p>
                                        <div className="portfolio-card-footer">
                                            <span className="portfolio-learn-more" style={{ color: 'var(--text-main)' }}>View Hall of Excellence ➔</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* B2B ORGANIZER CTA PANEL */}
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
                                Corporate Collaboration
                            </span>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '15px', marginTop: 0 }}>
                                Organize Your Next Event With Techroxx
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '35px' }}>
                                Whether you are a startup, company, educational institution, brand, community, or NGO, Techroxx can help you plan, host, promote, and execute professional technical events that engage the right audience and drive meaningful connections.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                                    Schedule a Discussion
                                </button>
                                <button onClick={() => navigate('/contact')} className="btn" style={{ border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '12px 28px', fontSize: '0.95rem', background: 'transparent' }}>
                                    Partner With Techroxx
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
