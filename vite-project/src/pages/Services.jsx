import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultancyData } from '../data/constants';
import { loadGlobalData } from '../utils/dataLoader';

const Services = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadGlobalData()
            .then(data => {
                setDepartments(data.departments);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Training Programs list - Placement Guide has been moved to /guides!
    const trainingPrograms = [
        { id: 'workshops', icon: 'fa-chalkboard-teacher', text: 'Workshops', desc: 'Participate in hands-on practical masterclasses led by industry mentors.' },
        { id: 'webservices', icon: 'fa-globe', text: 'Web Services & Portfolio', desc: 'Accelerate your digital footprint with custom portfolio development and hosting services.' },
        { id: 'webinars', icon: 'fa-video', text: 'Webinars', desc: 'Join online sessions covering trending tech subjects, career roadmaps, and tool integrations.' },
        { id: 'hackathons', icon: 'fa-code', text: 'Hackathons', desc: 'Collaborate in real-time building coding prototypes solving physical user problems.' },
        { id: 'meetups', icon: 'fa-users', text: 'Meetups', desc: 'Connect with developers and electronics innovators in local community gatherings.' },
        { id: 'projects', icon: 'fa-project-diagram', text: 'Real-Time Projects', desc: 'Elevate your portfolio with real production-grade corporate hardware and software solutions.' },
        { id: 'internships', icon: 'fa-briefcase', text: 'Internship Assist', desc: 'Gain access to premium verified internship openings and application coaching.' },
        { id: 'roadmaps', icon: 'fa-map-signs', text: 'Industry Roadmaps', desc: 'Follow structured curriculum paths mapped to top technical positions.' },
        { id: 'certifications', icon: 'fa-certificate', text: 'Certifications', desc: 'Earn verified credentials proving your expertise across emerging sectors.' },
        { id: 'job-architect', icon: 'fa-user-tie', text: 'Job Architect', desc: 'Get expert guidance to mold your career architecture and land top technical roles.' }
    ];

    if (error) {
        return (
            <section className="section-padding animate-enter" style={{ background: 'var(--bg-dark)', textAlign: 'center' }}>
                <div className="container">
                    <h2 className="section-title">Failed to load services</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Something went wrong while retrieving our dynamic catalog. Please try again later.</p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>Retry</button>
                </div>
            </section>
        );
    }

    return (
        <>
            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200')` }}>
                <div className="container" style={{ width: '100%' }}>
                    <div className="page-header-content">
                        <h1 className="page-header-title">Our Services</h1>
                        <p className="page-header-desc">Explore comprehensive career training tracks, specialized learning domains, and corporate technical consultancies.</p>
                    </div>
                </div>
            </div>
            <section className="section-padding programs animate-enter" style={{ paddingTop: '60px' }}>
                <div className="container">
                    {/* 1. SERVICES BY DOMAIN / DEPARTMENTS SECTION (TOP) */}
                <div style={{ marginBottom: '60px' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800 }}>Services by Domain</h3>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '35px', fontSize: '0.95rem' }}>Select a specialized technical domain to explore learning focus areas and dynamic events</p>
                    
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-panel" style={{ height: '180px', padding: '30px', position: 'relative', overflow: 'hidden' }}>
                                    <div className="skeleton-pulse" style={{ height: '30px', width: '60%', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '4px', marginBottom: '15px' }}></div>
                                    <div className="skeleton-pulse" style={{ height: '15px', width: '90%', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '4px', marginBottom: '10px' }}></div>
                                    <div className="skeleton-pulse" style={{ height: '15px', width: '80%', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '4px' }}></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }} className="staggered-fade-in">
                            {departments.map(dept => (
                                <div 
                                    key={dept.id} 
                                    className="glass-panel tilt-card" 
                                    onClick={() => navigate(`/services/${dept.slug}`)}
                                    style={{ 
                                        padding: '35px 30px', 
                                        borderRadius: '16px', 
                                        cursor: 'pointer',
                                        border: '1px solid rgba(220, 38, 38, 0.08)',
                                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
                                        background: 'var(--bg-panel)',
                                        backdropFilter: 'blur(16px)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '100%'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minHeight: '100px', marginBottom: '15px' }}>
                                            <div style={{ 
                                                width: '50px', 
                                                height: '50px', 
                                                background: 'linear-gradient(135deg, #ef4444, #3b82f6, #ef4444)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.2)',
                                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                                color: 'white'
                                            }}>
                                                <i className={`fas ${dept.icon}`} style={{ fontSize: '1.3rem' }}></i>
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>{dept.name}</h4>
                                                <p style={{ color: 'var(--secondary-blue)', fontWeight: 600, fontSize: '0.8rem', margin: '3px 0 0', letterSpacing: '0.3px', lineHeight: 1.3 }}>{dept.tagline}</p>
                                            </div>
                                        </div>
                                        <hr style={{ border: 0, height: '1.5px', background: 'linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)', margin: '15px 0' }} />
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>{dept.description}</p>
                                    </div>
                                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-blue)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="explore-domain-link">
                                        Explore Domain <i className="fas fa-arrow-right" style={{ transition: 'transform 0.3s' }}></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. TRAINING PROGRAMS SECTION */}
                <h3 style={{ textAlign: 'center', margin: '40px 0 25px', fontSize: '1.5rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, borderTop: '1px solid rgba(0, 0, 0, 0.05)', paddingTop: '40px' }}>Training Programs</h3>
                <div className="program-grid staggered-fade-in">
                    {trainingPrograms.map(item => (
                        <div key={item.id} className="neon-card" onClick={() => item.id === 'job-architect' ? navigate('/services/job-architect') : navigate(`/services/programs/${item.id}`)} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '210px', height: '100%' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minHeight: '50px', marginBottom: '10px' }}>
                                    <i className={`fas ${item.icon} neon-icon`} style={{ fontSize: '1.4rem', color: 'var(--secondary-blue)', margin: 0 }}></i>
                                    <div className="neon-text" style={{ fontSize: '1rem', fontWeight: 700 }}>{item.text}</div>
                                </div>
                                <hr style={{ border: 0, height: '1.5px', background: 'linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)', margin: '12px 0' }} />
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginTop: '5px' }}>{item.desc}</p>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary-blue)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '15px' }} className="explore-details-link">
                                Explore Details <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem', transition: 'transform 0.3s' }}></i>
                            </div>
                            
                            {/* Added Ribbon For Popular Items */}
                            {item.id === 'internships' && (
                                <div className="ribbon-wrapper">
                                    <div className="ribbon">POPULAR</div>
                                </div>
                            )}
                            {item.id === 'job-architect' && (
                                <div className="ribbon-wrapper">
                                    <div className="ribbon" style={{backgroundColor: '#ef4444'}}>NEW</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 3. CONSULTANCY SERVICES SECTION */}
                <h3 style={{ textAlign: 'center', margin: '60px 0 25px', fontSize: '1.5rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, borderTop: '1px solid rgba(0, 0, 0, 0.05)', paddingTop: '40px' }}>Consultancy Services</h3>
                <div className="consultancy-grid staggered-fade-in">
                    {Object.entries(consultancyData).map(([key, data]) => (
                        <div 
                            key={key} 
                            className="consultancy-card" 
                            onClick={() => navigate(`/services/consultancy/${key}`)} 
                            style={{ 
                                background: 'var(--bg-panel)', 
                                borderRadius: '16px', 
                                border: '1px solid rgba(220, 38, 38, 0.1)', 
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                textAlign: 'left'
                            }}
                        >
                            <div>
                                <i className={`fas ${data.icon} consultancy-icon`} style={{ color: 'var(--primary-brand)', fontSize: '2rem', marginBottom: '15px', display: 'block' }}></i>
                                <h3 className="consultancy-title" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', minHeight: '55px', marginBottom: '10px' }}>{data.title}</h3>
                                <hr style={{ border: 0, height: '1.5px', background: 'linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)', margin: '15px 0' }} />
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{data.content}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-brand)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '20px' }} className="consult-expert-link">
                                Contact Expert <i className="fas fa-arrow-right" style={{ transition: 'transform 0.3s' }}></i>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/services/programs/projects')}>
                        <i className="fas fa-project-diagram" style={{ marginRight: '10px' }}></i> View Projects
                    </button>
                </div>
            </div>

            {/* Custom Styles and Micro-Animations */}
            <style>{`
                @keyframes skeleton-pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 0.3; }
                    100% { opacity: 0.6; }
                }
                .skeleton-pulse {
                    animation: skeleton-pulse 1.5s infinite ease-in-out;
                }
                
                /* Premium Card Hovers & Alignments */
                .tilt-card, .neon-card, .consultancy-card {
                    background: var(--glass-bg) !important;
                    backdrop-filter: blur(16px) !important;
                    border: var(--glass-border) !important;
                    box-shadow: var(--card-shadow) !important;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease !important;
                    border-radius: 16px !important;
                }
                .tilt-card:hover, .neon-card:hover, .consultancy-card:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    box-shadow: var(--card-hover-shadow) !important;
                    border-color: #3b82f6 !important;
                    background: var(--bg-panel) !important;
                }
                
                .explore-domain-link i,
                .explore-details-link i,
                .consult-expert-link i {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                
                .tilt-card:hover .explore-domain-link i,
                .neon-card:hover .explore-details-link i,
                .consultancy-card:hover .consult-expert-link i {
                    transform: translateX(6px) !important;
                }
            `}</style>
        </section>
        </>
    );
};

export default Services;
