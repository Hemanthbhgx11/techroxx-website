import { useEffect, useState } from 'react';
import '../styles/pages/EventDetails.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loadGlobalData } from '../utils/dataLoader';
import { AchievementPortal, ParticipantExperiences, parsePerformersJSON } from '../components/AchievementPortal';

const EventDetails = () => {
    const { eventSlug } = useParams();
    const navigate = useNavigate();
    
    // States
    const [event, setEvent] = useState(null);
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [specificMetrics, setSpecificMetrics] = useState(null);
    const [performers, setPerformers] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxCaption, setLightboxCaption] = useState('');
    const [copiedShare, setCopiedShare] = useState(false);
    const [failedImages, setFailedImages] = useState({});

    useEffect(() => {
        setLoading(true);
        loadGlobalData()
            .then(data => {
                const allEvents = data.events || [];
                const found = allEvents.find(e => e.slug === eventSlug);
                
                if (found) {
                    setEvent(found);
                    
                    // Filter related events
                    const related = allEvents.filter(
                        e => e.id !== found.id && 
                        (e.status === 'upcoming' || e.status === 'ongoing')
                    ).slice(0, 3);
                    setRelatedEvents(related);

                    // Load gallery images for this event slug
                    const allGallery = data.eventGallery || [];
                    const filteredGallery = allGallery.filter(img => img.eventSlug === eventSlug);
                    setGalleryImages(filteredGallery);

                    // Load event-specific metrics
                    const allMetrics = data.eventMetrics || {};
                    const specific = allMetrics.eventSpecific?.find(m => m.eventSlug === eventSlug);
                    setSpecificMetrics(specific || null);

                    // SEO Structured Data Injection
                    injectSEO(found, specific);
                } else {
                    setEvent(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading event details:", err);
                setLoading(false);
            });

        // Cleanup SEO
        return () => {
            const existingSchema = document.getElementById('event-jsonld-schema');
            if (existingSchema) existingSchema.remove();
        };
    }, [eventSlug]);

    useEffect(() => {
        if (!event || !event.sheetId) {
            setPerformers([]);
            return;
        }
        
        const cacheKey = `techroxx_performers_${event.slug}`;
        const cached = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(`${cacheKey}_time`);
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (cached && cachedTime && (Date.now() - parseInt(cachedTime) < oneDay)) {
            try {
                setPerformers(JSON.parse(cached));
                return;
            } catch (e) {
                console.error("Error parsing cached performers", e);
            }
        }
        
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${event.sheetId}/gviz/tq?tqx=out:json`;
        fetch(sheetUrl)
            .then(res => res.text())
            .then(text => {
                const parsed = parsePerformersJSON(text, event.title);
                if (parsed && parsed.length > 0) {
                    setPerformers(parsed);
                    localStorage.setItem(cacheKey, JSON.stringify(parsed));
                    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
                }
            })
            .catch(err => {
                console.error("Error fetching performers sheet data:", err);
                if (cached) {
                    try {
                        setPerformers(JSON.parse(cached));
                    } catch(e) {}
                }
            });
    }, [event]);

    const injectSEO = (evt, metrics) => {
        document.title = evt.seoTitle || `${evt.title} | Techroxx Ecosystem`;
        
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
            descMeta = document.createElement('meta');
            descMeta.name = "description";
            document.head.appendChild(descMeta);
        }
        descMeta.content = evt.seoDescription || evt.description;

        const existingSchema = document.getElementById('event-jsonld-schema');
        if (existingSchema) existingSchema.remove();

        const schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Event",
                    "@id": `https://techroxx.in/events/${evt.slug}#event`,
                    "name": evt.title,
                    "description": evt.description,
                    "startDate": evt.date,
                    "eventStatus": evt.status === 'upcoming' ? "https://schema.org/EventScheduled" : "https://schema.org/EventCompleted",
                    "eventAttendanceMode": evt.mode === 'online' ? "https://schema.org/OnlineEventAttendanceMode" : (evt.mode === 'hybrid' ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode"),
                    "location": evt.mode === 'online' ? {
                        "@type": "VirtualLocation",
                        "url": "https://techroxx.in/events"
                    } : {
                        "@type": "Place",
                        "name": evt.venue || "Techroxx Hyderabad Lab",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Hyderabad",
                            "addressRegion": "Telangana",
                            "addressCountry": "IN"
                        }
                    },
                    "image": [
                        evt.image ? `https://techroxx.in${evt.image}` : "https://techroxx.in/sdc.jpg"
                    ],
                    "organizer": {
                        "@type": "Organization",
                        "name": evt.organizer || "Techroxx Ecosystem",
                        "url": "https://techroxx.in"
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "@id": `https://techroxx.in/events/${evt.slug}#breadcrumb`,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://techroxx.in/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Events Portfolio",
                            "item": "https://techroxx.in/events"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": evt.title,
                            "item": `https://techroxx.in/events/${evt.slug}`
                        }
                    ]
                }
            ]
        };

        const script = document.createElement('script');
        script.id = 'event-jsonld-schema';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `${event?.title} by Techroxx. Explore outcomes, metrics and achievements portal:`;
        
        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        } else if (platform === 'x') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setCopiedShare(true);
            setTimeout(() => setCopiedShare(false), 2000);
        }
    };

    const handleImageError = (id) => {
        setFailedImages(prev => ({ ...prev, [id]: true }));
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

    if (!event) {
        return (
            <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
                <i className="fas fa-calendar-times" style={{ fontSize: '3rem', color: 'var(--primary-brand)', marginBottom: '20px' }}></i>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Event Not Found</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '25px', textAlign: 'center', maxWidth: '400px' }}>
                    The event page you are looking for might have been moved, deleted, or has a typo in the link.
                </p>
                <button onClick={() => navigate('/events')} className="btn btn-primary">
                    Back to Events Hub
                </button>
            </div>
        );
    }

    const isCompleted = event.status === 'completed';
    const isOngoing = event.status === 'ongoing';
    const isUpcoming = event.status === 'upcoming';
    const isArchived = event.status === 'archived';

    const renderWhyOrganizeIcon = (iconStr) => {
        switch (iconStr) {
            case '🤝':
                return (
                    <svg style={{ width: '2.2rem', height: '2.2rem', margin: '0 auto 12px', color: 'var(--primary-brand)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                );
            case '💡':
                return (
                    <svg style={{ width: '2.2rem', height: '2.2rem', margin: '0 auto 12px', color: '#eab308' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m0 0h.01m-9.071-.75A8.962 8.962 0 013 12c0-2.28.85-4.362 2.25-5.963a8.966 8.966 0 018.963-2.287 8.966 8.966 0 015.537 5.537 8.966 8.966 0 01-2.287 8.963c-1.601 1.4-3.683 2.25-5.963 2.25a8.962 8.962 0 01-2.25-.282zM12 8.25v3.75m0 0H8.25m3.75 0h3.75" />
                    </svg>
                );
            case '💻':
                return (
                    <svg style={{ width: '2.2rem', height: '2.2rem', margin: '0 auto 12px', color: '#3b82f6' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                );
            case '👥':
                return (
                    <svg style={{ width: '2.2rem', height: '2.2rem', margin: '0 auto 12px', color: '#10b981' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', padding: '120px 0 80px', position: 'relative', overflow: 'hidden', color: 'var(--text-main)' }}>
            
            {/* Ambient glows */}
            <div className="details-glow-orb glow-red"></div>
            <div className="details-glow-orb glow-blue"></div>

            <div className="container">
                {/* Back button */}
                <div style={{ marginBottom: '25px', position: 'relative', zIndex: 1 }}>
                    <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}>
                        <i className="fas fa-arrow-left"></i> Back to Events Hub
                    </Link>
                </div>

                {/* 1. HERO SECTION */}
                <div className="details-layout" style={{ marginBottom: '40px' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div className="details-banner-wrapper">
                            <img src={event.image} alt={event.title} className="details-banner" />
                            <span className="details-badge">{event.category}</span>
                            
                            {/* Online Bootcamp Badge */}
                            {event.mode === 'online' && (
                                <span style={{ 
                                    position: 'absolute', 
                                    top: '20px', 
                                    right: '20px', 
                                    background: 'rgba(59, 130, 246, 0.95)', 
                                    color: 'white', 
                                    fontSize: '0.72rem', 
                                    fontWeight: 800, 
                                    padding: '6px 12px', 
                                    borderRadius: '10px', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.8px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"></path>
                                    </svg>
                                    Online {event.category}
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 5px', lineHeight: 1.2 }}>
                                    {event.title}
                                </h1>
                                <span style={{ 
                                    display: 'inline-block', 
                                    padding: '4px 10px', 
                                    borderRadius: '6px', 
                                    fontSize: '0.72rem', 
                                    fontWeight: 800, 
                                    textTransform: 'uppercase',
                                    background: isCompleted ? 'rgba(34, 197, 94, 0.12)' : (isOngoing ? 'rgba(59, 130, 246, 0.12)' : 'rgba(234, 88, 12, 0.12)'),
                                    color: isCompleted ? '#22c55e' : (isOngoing ? '#3b82f6' : 'var(--primary-brand)')
                                }}>
                                    ● {event.status}
                                </span>
                            </div>

                            {/* Impact Score Display */}
                            {event.impactScore && (
                                <div style={{ background: 'rgba(234, 88, 12, 0.05)', border: '1px solid rgba(234, 88, 12, 0.15)', padding: '12px 20px', borderRadius: '16px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary-brand)' }}>{event.impactScore}/100</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ecosystem Impact</div>
                                </div>
                            )}
                        </div>

                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '25px' }}>
                            {event.description}
                        </p>
                    </div>

                    {/* RIGHT COLUMN: HERO SIDEBAR METRICS */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div className="sidebar-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>CURRICULUM SPEC</span>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-main)', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                                    {event.eventId || `TRX-EVT-${event.id.toString().padStart(3, '0')}`}
                                </span>
                            </div>

                            <div className="meta-list">
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-clock"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>DURATION</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>{event.duration || '7 Days'}</div>
                                    </div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-laptop-house"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>MODE & VENUE</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>
                                            {event.mode === 'online' ? 'Online Bootcamp' : (event.venue || 'Techroxx Lab')}
                                        </div>
                                    </div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-users"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>REGISTRATIONS</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>{event.registrationCount ? `${event.registrationCount}+ Enrolled` : '500+ Enrolled'}</div>
                                    </div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-user-shield"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ORGANIZATION</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>{event.organizer || 'Techroxx Ecosystem'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Share Platform */}
                            <div style={{ marginBottom: '25px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '15px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>SHARE PROGRAM</div>
                                <div className="share-links-container">
                                    <button onClick={() => handleShare('linkedin')} className="share-btn"><i className="fab fa-linkedin-in" style={{ color: '#0077b5' }}></i> Link</button>
                                    <button onClick={() => handleShare('whatsapp')} className="share-btn"><i className="fab fa-whatsapp" style={{ color: '#22c55e' }}></i> Send</button>
                                    <button onClick={() => handleShare('x')} className="share-btn"><i className="fab fa-x-twitter"></i> Post</button>
                                    <button onClick={() => handleShare('copy')} className="share-btn">
                                        <i className="fas fa-copy"></i> {copiedShare ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic CTAs */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <a 
                                    href={event.primaryCTA?.link || "/contact"} 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '12px 0', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', textAlign: 'center' }}
                                >
                                    <i className="fas fa-user-plus"></i> {event.primaryCTA?.label || 'Join Future Cohorts'}
                                </a>
                                {event.secondaryCTA && (
                                    <a 
                                        href={event.secondaryCTA.link} 
                                        className="btn btn-secondary" 
                                        style={{ width: '100%', padding: '12px 0', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'white', textAlign: 'center' }}
                                    >
                                        <i className="fas fa-handshake"></i> {event.secondaryCTA.label}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. ABOUT THE EVENT */}
                {event.about && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644M21.964 11.678a1.012 1.012 0 010 .644M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a18.903 18.903 0 0019.928 0M2.036 11.678a18.903 18.903 0 0119.928 0" />
                                </svg>
                                PROGRAM OVERVIEW
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                About {event.title}
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                            <div className="org-cta-card">
                                <h4 style={{ color: 'var(--primary-brand)' }}><i className="fas fa-compass" style={{ marginRight: '8px' }}></i> Core Vision</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                                    {event.about.vision}
                                </p>
                            </div>
                            <div className="org-cta-card">
                                <h4 style={{ color: '#3b82f6' }}><i className="fas fa-graduation-cap" style={{ marginRight: '8px' }}></i> Learning Methodology</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                                    {event.about.methodology}
                                </p>
                            </div>
                            <div className="org-cta-card">
                                <h4 style={{ color: '#10b981' }}><i className="fas fa-chart-line" style={{ marginRight: '8px' }}></i> Industry Relevance</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {event.about.relevance}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* 3. LEARNING JOURNEY TIMELINE */}
                {event.journeySteps && event.journeySteps.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
                                </svg>
                                BOOTCAMP ROADMAP
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                The Learning Journey
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                A structured day-by-day curriculum mapping outlining active technical benchmarks.
                            </p>
                        </div>
                        
                        {event.journeySteps[0]?.bullets ? (
                            /* Detailed Day Timeline Cards (Syllabus Roadmap) - 2 Columns */
                            <div className="journey-steps-grid">
                                {event.journeySteps.map((step, sIdx) => (
                                    <div key={sIdx} style={{ background: 'var(--bg-panel)', border: 'var(--glass-border)', borderRadius: '24px', padding: '30px', boxShadow: 'var(--card-shadow)' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-brand)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                                            {step.label} Session - BOOTCAMP MODULE
                                        </span>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 15px' }}>
                                            {step.title}
                                        </h3>
                                        {step.bullets && step.bullets.length > 0 && (
                                            <div>
                                                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '10px' }}>
                                                    Technical Agenda:
                                                </h4>
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {step.bullets.map((bullet, bIdx) => (
                                                        <li key={bIdx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                                            <svg style={{ width: '1rem', height: '1rem', color: '#22c55e', marginRight: '6px', flexShrink: 0, marginTop: '3px' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                                            </svg>
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Fallback Horizontal Timeline Track */
                            <div className="journey-timeline">
                                <div className="journey-timeline-track"></div>
                                <div className="journey-timeline-steps">
                                    {event.journeySteps.map((step, sIdx) => (
                                        <div key={sIdx} className="journey-step completed">
                                            <div className="journey-icon-circle">
                                                {sIdx + 1}
                                            </div>
                                            <span className="journey-title" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)' }}>{step.label}</span>
                                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '5px 0 0', lineHeight: 1.3, maxWidth: '100px' }}>{step.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* 4. TECHNOLOGIES COVERED */}
                {event.technologies && event.technologies.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 1121 17.25l-5.83-5.83m-3.75 3.75a3.75 3.75 0 11-5.3-5.3m5.3 5.3l-5.83-5.83m.96-.96L15 3v5c0 .6-.4 1-1 1h-5a1 1 0 01-1-1V3L4.17 6.83m4.83.17h.01"></path>
                                </svg>
                                VERIFIED SKILLS
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Technologies & Concepts Covered
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                            {event.technologies.map((tech, idx) => (
                                <div key={idx} className="sponsor-badge" style={{ background: 'var(--bg-panel)', border: 'var(--glass-border)', padding: '12px 24px', fontSize: '0.92rem', borderRadius: '16px' }}>
                                    <svg style={{ width: '1rem', height: '1rem', color: 'var(--primary-brand)', marginRight: '8px' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>{tech}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. WHAT PARTICIPANTS BUILT */}
                {event.studentProjects && event.studentProjects.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-2.2 2.2m2.2-2.2l-3.5 3.5a6 6 0 01-3.14 1.53l-2.28.38a.75.75 0 01-.86-.86l.38-2.28a6 6 0 011.53-3.14l3.5-3.5m0 0l1.8-1.8a2.23 2.23 0 013.14 0l1.8 1.8a2.23 2.23 0 010 3.14l-1.8 1.8zm0 0l-3.5-3.5m9-1.5a4.89 4.89 0 00-6 0m6 0a4.89 4.89 0 010 6m-9-9a4.89 4.89 0 00-6 0m6 0a4.89 4.89 0 010 6"></path>
                                </svg>
                                CAPSTONE ARTIFACTS
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                What Participants Built
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                Preview of live application links, workflows, and student portfolio designs.
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                            {event.studentProjects.map((proj, idx) => (
                                <div key={idx} className="related-card" style={{ cursor: 'default' }}>
                                    <img src={proj.image} alt={proj.title} className="related-img" />
                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 800, margin: '0 0 8px' }}>{proj.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{proj.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 6. PROGRAM IMPACT DASHBOARD */}
                {specificMetrics && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ 
                            background: 'var(--bg-panel)', 
                            border: 'var(--glass-border)', 
                            borderRadius: '24px', 
                            padding: '30px 40px', 
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
                                Program Impact Dashboard
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '20px', textAlign: 'center' }}>
                                {[
                                    { value: specificMetrics.participants, label: 'Enrolled' },
                                    { value: specificMetrics.completionCount || 120, label: 'Graduated' },
                                    { value: specificMetrics.projects, label: 'Projects Built' },
                                    { value: `${specificMetrics.hours}h`, label: 'Learning Hours' },
                                    { value: specificMetrics.colleges, label: 'Institutions' },
                                    { value: specificMetrics.mentors, label: 'Mentors' },
                                    { value: specificMetrics.partners, label: 'Ecosystem Partners' }
                                ].map(m => (
                                    <div key={m.label} style={{ borderRight: '1px solid rgba(255,255,255,0.05)', padding: '5px 0' }} className="impact-box">
                                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary-brand)' }}>{m.value}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: '6px' }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 7. HALL OF EXCELLENCE GRID INJECTION */}
                {event.sheetId && performers.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <AchievementPortal performers={performers} />
                    </section>
                )}

                {/* 8. PARTICIPANT EXPERIENCES (REVIEWS) */}
                {event.sheetId && performers.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <ParticipantExperiences 
                            performers={performers} 
                            eventSlug={event.slug} 
                            eventName={event.title} 
                        />
                    </section>
                )}

                {/* 9. SUCCESS STORIES / TRANSFORMATION STORIES */}
                {isCompleted && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94M3.75 20.25h16.5"></path>
                                </svg>
                                SUCCESS PATHWAYS
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Transformation Stories
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                Tracking student progression from absolute raw baselines to fully certified AI builders.
                            </p>
                        </div>

                        <div className="transformation-stories">
                            {[
                                {
                                    student: "Sreenidhi CS Student",
                                    before: "Basic Python loops, zero API interface knowledge, unoptimized resumes.",
                                    journey: "Explored prompt formats, variables boundaries, and IBM/Google cloud certification badges.",
                                    building: "Built travel assistant applications using Gemini API and Overleaf resume layouts.",
                                    badges: "Graduated with 4 ecosystem verified badges and deployed portfolio.",
                                    outcome: "Boosted candidate ATS resume parser rankings and active developer profile presence."
                                },
                                {
                                    student: "Gitam Engineering Candidate",
                                    before: "High-level theoretical AI awareness, zero git version controls, minimal portfolio presence.",
                                    journey: "Mastered data modeling pipelines, Agentic UiPath processes, and RAG pipelines.",
                                    building: "Constructed dynamic portfolio pages with embedded AI assistants.",
                                    badges: "Graduated with 7 certificates and dynamic badges on IBM SkillsBuild.",
                                    outcome: "Launched live web elements, optimized Linkedin profile reach, and scored as top performer."
                                }
                            ].map((story, sIdx) => (
                                <div key={sIdx} className="transformation-card">
                                    <h4 style={{ margin: '0 0 20px', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800 }}>{story.student}</h4>
                                    <div className="timeline-path">
                                        <div className="timeline-node">
                                            <span className="timeline-lbl">Before Joining</span>
                                            <p className="timeline-text">{story.before}</p>
                                        </div>
                                        <div className="timeline-node">
                                            <span className="timeline-lbl">Learning Journey</span>
                                            <p className="timeline-text">{story.journey}</p>
                                        </div>
                                        <div className="timeline-node">
                                            <span className="timeline-lbl">Project Development</span>
                                            <p className="timeline-text">{story.building}</p>
                                        </div>
                                        <div className="timeline-node">
                                            <span className="timeline-lbl">Portfolio Developed</span>
                                            <p className="timeline-text">{story.badges}</p>
                                        </div>
                                        <div className="timeline-node active">
                                            <span className="timeline-lbl" style={{ color: 'var(--primary-brand)', fontWeight: 800 }}>Career Progress</span>
                                            <p className="timeline-text" style={{ color: 'var(--text-main)', fontWeight: 600 }}>{story.outcome}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 10. SESSION SLIDES & REPORTS (DOCUMENT RESOURCE SHOWCASE) */}
                {event.documents && event.documents.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-16.25v16.25"></path>
                                </svg>
                                EVENT RESOURCES
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Session Slides & Reports
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                Access official bootcamp presentations, session resources, and the complete Ignite AI 2026 report.
                            </p>
                        </div>
                        
                        <div className="documents-grid">
                            {event.documents.map((doc, idx) => (
                                <div key={idx} className="document-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div className="doc-icon-wrapper">
                                            {doc.type === 'PPTX' ? (
                                                <svg style={{ width: '24px', height: '24px', color: 'var(--primary-brand)' }} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 10h-2v4h-2v-4H9V11h7v2z" />
                                                </svg>
                                            ) : (
                                                <svg style={{ width: '24px', height: '24px', color: 'var(--primary-brand)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                            )}
                                        </div>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary-brand)', background: 'rgba(234,88,12,0.08)', padding: '3px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>
                                            {doc.type}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800, margin: '15px 0 8px', lineHeight: 1.35 }}>
                                        {doc.name}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 20px', flex: 1 }}>
                                        {doc.desc}
                                    </p>
                                    
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <button 
                                            onClick={() => setSelectedDocument(doc)} 
                                            className="btn btn-sm-pt" 
                                            style={{ flex: 1, padding: '10px 0', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                                        >
                                            <svg style={{ width: '0.85rem', height: '0.85rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zm1.5 1.5h13.5v13.5H5.25V5.25zm4.5 4.5h4.5v4.5H9.75v-4.5z" />
                                            </svg>
                                            View Fullscreen
                                        </button>
                                        <a 
                                            href={doc.file} 
                                            download 
                                            className="btn btn-sm-rs" 
                                            style={{ padding: '10px 15px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                                            title="Download File"
                                        >
                                            <i className="fas fa-download"></i>
                                        </a>
                                    </div>
                                    
                                    <div className="doc-meta">
                                        <span>Size: {doc.size || 'Unknown'}</span>
                                        {doc.featured && <span style={{ color: '#eab308', fontWeight: 700 }}>★ Featured</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 11. MENTORS & SPEAKERS SHOWCASE */}
                {event.mentors && event.mentors.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                                </svg>
                                EXPERT GUIDANCE
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Mentors & Speakers
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            {event.mentors.map((m, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '15px', background: 'var(--bg-panel)', border: 'var(--glass-border)', padding: '20px', borderRadius: '18px', alignItems: 'center' }}>
                                    <img 
                                        src={m.photo || "/logo_techroxx.webp"} 
                                        alt={m.name} 
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--glass-border)' }}
                                    />
                                    <div>
                                        <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.98rem', fontWeight: 800 }}>{m.name}</h4>
                                        {m.role && <p style={{ margin: '2px 0 0', color: 'var(--primary-brand)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.role}</p>}
                                        {m.organization && <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.78rem' }}>{m.organization}</p>}
                                        {m.linkedin && m.linkedin !== "https://linkedin.com/in/" && (
                                            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', color: '#0077b5', fontSize: '0.85rem', marginTop: '6px' }}>
                                                <i className="fab fa-linkedin"></i> Verified Profile
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 12. PARTNERS CREDIBILITY LAYER */}
                {event.partnerLogos && event.partnerLogos.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                                </svg>
                                COLLABORATIVE ECOSYSTEM
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Community & Ecosystem Partners
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                Academic institutions, support communities, and cloud technology partners validating our bootcamp credentials.
                            </p>
                        </div>
                        <div className="partner-logos-grid">
                            {event.partnerLogos.map((pl, idx) => (
                                <div key={idx} className="partner-logo-card">
                                    <img 
                                        src={pl.logo} 
                                        alt={pl.name} 
                                        className="partner-logo-img" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/logo_techroxx.webp";
                                        }}
                                    />
                                    <h4 className="partner-logo-name">{pl.name}</h4>
                                    <p className="partner-logo-type">{pl.type}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 13. FUTURE OPPORTUNITIES */}
                {event.futureOpportunities && event.futureOpportunities.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.205.654l2.266 1.133a9 9 0 006.205.654l2.266-.566V4.147l-2.266.567a9 9 0 01-6.205-.654l-2.266-1.133a9 9 0 00-6.205-.654l-2.266.567v10.87zm0 0V9"></path>
                                </svg>
                                NEXT STEPS
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Future Opportunities
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                Career gateways, advanced sprints, and research group openings open for successful graduates.
                            </p>
                        </div>
                        <div className="org-cta-grid">
                            {event.futureOpportunities.map((opt, idx) => (
                                <div key={idx} className="org-cta-card">
                                    <h4>{opt.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 20px' }}>
                                        {opt.desc}
                                    </p>
                                    <button onClick={() => navigate(opt.link)} className="btn btn-sm-pt" style={{ width: '100%', padding: '10px 0', border: 'none', cursor: 'pointer' }}>Explore Opportunity ➔</button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 14. FINAL RECOGNITION BANNER */}
                <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1 }}>
                    <div className="celebrating-banner">
                        <div className="celebrating-banner-grid">
                            <div>
                                <h3 className="celebrating-title">Celebrating Learning, Innovation & Growth</h3>
                                <p className="celebrating-message">
                                    Ignite AI 2026 represents the spirit of the Techroxx Ecosystem — learning by building, collaborating, innovating, and creating real-world impact through technology. These performers represent the future generation of innovators, builders, and leaders emerging from the Techroxx Ecosystem.
                                </p>
                            </div>
                            <div className="celebrating-signature-block">
                                <img 
                                    src="/logo_techroxx.webp" 
                                    alt="Techroxx Management" 
                                    className="ceo-photo"
                                />
                                <h4 className="ceo-name">Techroxx Management</h4>
                                <p className="ceo-role">Techroxx Ecosystem</p>
                            </div>
                        </div>
                        <img src="/icons.svg" className="org-seal" alt="Verification Seal" />
                    </div>
                </section>

                {/* 15. WHY WE ORGANIZE EVENTS */}
                {event.whyWeOrganize && event.whyWeOrganize.length > 0 && (
                    <section style={{ marginBottom: '60px', position: 'relative', zIndex: 1, borderTop: '1px solid var(--glass-border)', paddingTop: '50px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.75M12 19.25V21M3 12h1.75m14.5 0H21m-2.916-6.084l-1.237 1.237M7.153 16.847l-1.237 1.237m0-10.93l1.237 1.237m9.694 9.694l1.237 1.237M12 7a5 5 0 100 10 5 5 0 000-10z" />
                                </svg>
                                OUR PURPOSE
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                                Why We Organize Events
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '600px', margin: '8px auto 0' }}>
                                Fostering talent and innovation is at the heart of the Techroxx community.
                            </p>
                        </div>
                        
                        <div className="why-organize-grid">
                            {event.whyWeOrganize.map((item, idx) => (
                                <div key={idx} className="why-organize-card">
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {renderWhyOrganizeIcon(item.icon)}
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 16. CORPORATE COLLABORATION CTA BANNER */}
                <section className="corporate-cta-section" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="corporate-cta-card">
                        <h2 className="corporate-title">Empower Your Organization Through Techroxx</h2>
                        <p className="corporate-desc">
                            Partner with us to host hackathons, customize bootcamps, recruit certified talent, or drive innovation within your institution or corporate ecosystem. Let's build the future together.
                        </p>
                        <div className="corporate-buttons">
                            <a href="/contact?subject=corporate-discussion" className="btn-corp btn-corp-primary">
                                <i className="fas fa-calendar-alt"></i> Schedule a Discussion
                            </a>
                            <a href="/contact?subject=partnership" className="btn-corp btn-corp-secondary">
                                <i className="fas fa-handshake"></i> Partner With Techroxx
                            </a>
                            <a href="/contact?subject=event-inquiry" className="btn-corp btn-corp-tertiary">
                                <i className="fas fa-envelope"></i> Contact Event Team
                            </a>
                        </div>
                    </div>
                </section>

                {/* RELATED EVENTS SECTION */}
                {relatedEvents.length > 0 && (
                    <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '60px', position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '30px' }}>
                            Related Sprints & Events
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {relatedEvents.map(re => (
                                <div key={re.id} className="related-card" onClick={() => navigate(`/events/${re.slug}`)}>
                                    <img src={re.image} alt={re.title} className="related-img" />
                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <span style={{ color: 'var(--primary-brand)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                                            {re.category}
                                        </span>
                                        <h3 style={{ fontSize: '1.08rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '8px', lineHeight: 1.35 }}>
                                            {re.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, flex: 1, margin: 0 }}>
                                            {re.description}
                                        </p>
                                        <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 700, marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            Learn More <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Lightbox Gallery Viewer Modal */}
            {lightboxImage && (
                <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
                    <button className="lightbox-close" onClick={() => setLightboxImage(null)}>✕</button>
                    <div className="lightbox-img-wrapper" onClick={e => e.stopPropagation()}>
                        <img src={lightboxImage} alt="Fullscreen View" className="lightbox-img" />
                    </div>
                    {lightboxCaption && <p className="lightbox-caption">{lightboxCaption}</p>}
                </div>
            )}

            {/* Document Viewer Modal */}
            {selectedDocument && (
                <div className="lightbox-overlay" onClick={() => setSelectedDocument(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedDocument(null)}>✕</button>
                    <div className="doc-modal-content" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800 }}>
                                {selectedDocument.name}
                            </h3>
                            <a href={selectedDocument.file} download className="btn btn-sm-rs" style={{ fontSize: '0.8rem', padding: '6px 12px', textDecoration: 'none' }}>
                                <i className="fas fa-download"></i> Download File
                            </a>
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <iframe 
                                src={selectedDocument.file.toLowerCase().endsWith('.pdf') 
                                    ? selectedDocument.file 
                                    : `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + selectedDocument.file)}&embedded=true`
                                }
                                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px', backgroundColor: 'var(--bg-dark)' }} 
                                title={selectedDocument.name}
                            />
                            <div style={{ position: 'absolute', bottom: '15px', right: '15px', zIndex: 10 }}>
                                <a href={selectedDocument.file} target="_blank" rel="noopener noreferrer" className="btn btn-sm-pt" style={{ fontSize: '0.75rem', padding: '6px 12px', textDecoration: 'none', background: 'rgba(0,0,0,0.6)' }}>
                                    Open in New Tab <i className="fas fa-external-link-alt" style={{ marginLeft: '4px' }}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
