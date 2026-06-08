import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loadGlobalData } from '../utils/dataLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const EventDetails = () => {
    const { eventSlug } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        loadGlobalData()
            .then(data => {
                const allEvents = data.events || [];
                const found = allEvents.find(e => e.slug === eventSlug);
                
                if (found) {
                    setEvent(found);
                    // Filter related events: same department or category, excluding current event
                    const related = allEvents.filter(
                        e => e.id !== found.id && 
                        (e.status === 'upcoming' || e.status === 'ongoing')
                    ).slice(0, 3);
                    setRelatedEvents(related);
                } else {
                    setEvent(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading event details:", err);
                setLoading(false);
            });
    }, [eventSlug]);

    if (loading) {
        return (
            <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <div className="skeleton-pulse" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444' }}></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
                <i className="fas fa-calendar-times" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '20px' }}></i>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-head)' }}>Event Not Found</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '25px', textAlign: 'center', maxWidth: '400px' }}>
                    The event page you are looking for might have been moved, deleted, or has a typo in the link.
                </p>
                <button onClick={() => navigate('/events')} className="btn btn-primary">
                    Back to Events Hub
                </button>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                .details-glow-orb {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    filter: blur(120px);
                    z-index: 0;
                    pointer-events: none;
                }
                .glow-red {
                    top: -100px;
                    left: -100px;
                    background: radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%);
                }
                .glow-blue {
                    bottom: -100px;
                    right: -100px;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
                }
                .details-layout {
                    display: grid;
                    grid-template-columns: 1.6fr 0.9fr;
                    gap: 50px;
                }
                @media (max-width: 991px) {
                    .details-layout {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                }
                .details-banner-wrapper {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid rgba(239, 68, 68, 0.1);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                    margin-bottom: 30px;
                }
                .details-banner {
                    width: 100%;
                    height: 400px;
                    object-fit: cover;
                }
                @media (max-width: 600px) {
                    .details-banner {
                        height: 250px;
                    }
                }
                .details-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: linear-gradient(135deg, #ef4444, #3b82f6);
                    color: white;
                    font-size: 0.78rem;
                    font-weight: 800;
                    padding: 6px 14px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                }
                .sidebar-card {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-radius: 24px;
                    padding: 30px;
                    box-shadow: var(--card-shadow);
                    position: sticky;
                    top: 100px;
                }
                .meta-list {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    margin-bottom: 30px;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    padding-bottom: 12px;
                }
                .meta-item:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }
                .meta-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 8px;
                    background: rgba(239, 68, 68, 0.08);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    color: #ef4444;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    flex-shrink: 0;
                }
                .outcome-item {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                    margin-bottom: 12px;
                }
                .outcome-check {
                    color: #22c55e;
                    font-size: 1rem;
                    margin-top: 3px;
                }
                .sponsor-badge {
                    display: inline-flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 8px 18px;
                    border-radius: 30px;
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: var(--text-main);
                    gap: 8px;
                }
                .related-card {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: var(--card-shadow);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .related-card:hover {
                    border-color: #ef4444;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.12);
                }
                .related-img {
                    width: 100%;
                    aspect-ratio: 16/9;
                    object-fit: cover;
                }
            `}</style>

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

                <div className="details-layout">
                    {/* LEFT COLUMN: MAIN CONTENT */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div className="details-banner-wrapper">
                            <img src={event.image} alt={event.title} className="details-banner" />
                            <span className="details-badge">{event.category}</span>
                        </div>

                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', marginBottom: '15px' }}>
                            {event.title}
                        </h1>

                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '35px' }}>
                            {event.description}
                        </p>

                        {/* Outcomes Section */}
                        {event.outcomes && event.outcomes.length > 0 && (
                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px', borderLeft: '4px solid #ef4444', paddingLeft: '12px' }}>
                                    What You Will Achieve
                                </h3>
                                <div style={{ background: 'var(--bg-panel)', border: 'var(--glass-border)', padding: '25px', borderRadius: '16px' }}>
                                    {event.outcomes.map((outcome, idx) => (
                                        <div key={idx} className="outcome-item">
                                            <i className="fas fa-check-circle outcome-check"></i>
                                            <span style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: 1.5 }}>{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sponsors & Partners Section */}
                        {((event.sponsors && event.sponsors.length > 0) || (event.partners && event.partners.length > 0)) && (
                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px', borderLeft: '4px solid #3b82f6', paddingLeft: '12px' }}>
                                    Sponsors & Collaborative Partners
                                </h3>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    {event.sponsors && event.sponsors.map((sp, idx) => (
                                        <div key={`sp-${idx}`} className="sponsor-badge">
                                            <i className="fas fa-award" style={{ color: '#ef4444' }}></i>
                                            <span>{sp}</span>
                                            <span style={{ fontSize: '0.68rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 800 }}>Sponsor</span>
                                        </div>
                                    ))}
                                    {event.partners && event.partners.map((pt, idx) => (
                                        <div key={`pt-${idx}`} className="sponsor-badge">
                                            <i className="fas fa-handshake" style={{ color: '#3b82f6' }}></i>
                                            <span>{pt}</span>
                                            <span style={{ fontSize: '0.68rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 800 }}>Partner</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: SIDEBAR */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div className="sidebar-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>EVENT ID</span>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-main)', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                                    {event.eventId || `TRX-EVT-${event.id.toString().padStart(3, '0')}`}
                                </span>
                            </div>

                            <div className="meta-list">
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-calendar-alt"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>DATE</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>
                                            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-map-marker-alt"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>VENUE</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>{event.venue || 'Techroxx Hyderabad Lab'}</div>
                                    </div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-laptop-house"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>MODE</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700, textTransform: 'capitalize' }}>{event.mode || 'offline'}</div>
                                    </div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-icon"><i className="fas fa-user-shield"></i></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ORGANIZER</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 700 }}>{event.organizer || 'Techroxx Ecosystem'}</div>
                                    </div>
                                </div>
                            </div>

                            {event.status === 'completed' ? (
                                <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '12px' }}>
                                    <i className="fas fa-check-double" style={{ color: '#22c55e', fontSize: '1.5rem', marginBottom: '10px' }}></i>
                                    <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}>Event Completed</div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '5px 0 0', lineHeight: 1.4 }}>This program has already concluded. Keep checking back or contact us to coordinate next sprints!</p>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => navigate(event.registrationLink || '/contact')} 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '14px 0', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.25)' }}
                                >
                                    <i className="fas fa-user-plus"></i> Register For Event
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RELATED EVENTS SECTION */}
                {relatedEvents.length > 0 && (
                    <section style={{ marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '60px', position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '30px' }}>
                            Related Sprints & Events
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {relatedEvents.map(re => (
                                <div key={re.id} className="related-card" onClick={() => navigate(`/events/${re.slug}`)}>
                                    <img src={re.image} alt={re.title} className="related-img" />
                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <span style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                                            {re.category}
                                        </span>
                                        <h4 style={{ fontSize: '1.08rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '8px', lineHeight: 1.35 }}>
                                            {re.title}
                                        </h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, flex: 1, margin: 0 }}>
                                            {re.description}
                                        </p>
                                        <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 700, marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            Learn More <i className="fas fa-chevron-right text-[0.7rem]"></i>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
