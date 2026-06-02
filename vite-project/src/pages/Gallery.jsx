import React, { useState, useEffect } from 'react';

const videoHighlights = [
    {
        id: 1,
        title: "IoT & Smart Systems Workshop Highlights",
        embedUrl: "https://www.youtube.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV",
        desc: "Hands-on student prototypes showcasing IoT telemetry, microcontrollers, and cloud databases."
    },
    {
        id: 2,
        title: "Robotics Hackathon Prototype Showcases",
        embedUrl: "https://www.youtube.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV",
        desc: "A compilation of autonomous robotics projects built during our annual ecosystem challenge."
    },
    {
        id: 3,
        title: "Advanced VLSI and PCB Routing Masterclass",
        embedUrl: "https://www.youtube.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV",
        desc: "Watch our expert mentors guide students in KiCad layouts, routing design, and circuit fabrication."
    }
];

const getFallbackBio = (name, role) => {
    const lowerRole = role ? role.toLowerCase() : '';
    if (lowerRole.includes('project manager')) {
        return `${name} manages critical technology initiatives at TechRoxx with dedication and expertise. He excels at roadmap planning, milestone tracking, and guiding cross-functional hardware and software teams to deliver premium production-ready prototypes.`;
    }
    if (lowerRole.includes('outreach manager')) {
        return `${name} leads strategic partnerships, educational outreach, and institutional alliances for TechRoxx. He is committed to expanding our technology ecosystem's reach and fostering connections across active student and engineering communities.`;
    }
    if (lowerRole.includes('content creator') || lowerRole.includes('media') || lowerRole.includes('outreach')) {
        return `${name} is the creative force behind TechRoxx's digital media and educational showcases. He translates complex engineering telemetry, circuit routings, and microcontroller workshops into highly accessible, premium visual content.`;
    }
    if (lowerRole.includes('mentor') || lowerRole.includes('lead')) {
        return `${name} provides deep technical guidance to our students and interns. With rich domain experience in advanced circuit design, VLSI routing, and PCB layouts, he bridges the gap between academic theory and physical hardware engineering.`;
    }
    if (lowerRole.includes('operations')) {
        return `${name} orchestrates day-to-day workshop logistics, operational flows, and training programs at TechRoxx. Her structured leadership ensures all events run perfectly and students receive a seamless training experience.`;
    }
    if (lowerRole.includes('founder') || lowerRole.includes('ceo')) {
        return `${name} is the driving visionary behind TechRoxx. He has established a premiere technology ecosystem dedicated to hands-on VLSI routing, IoT, AI integration, and professional engineering mentorship.`;
    }
    return `${name} is a key contributor to the TechRoxx ecosystem, dedicating skills and expertise to accelerate core technical programs, student training systems, and hands-on prototype challenges.`;
};

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeGroup, setActiveGroup] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch('/data/gallery.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load gallery data');
                return res.json();
            })
            .then(data => {
                setGallery(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading gallery resources:', err);
                setError(true);
                setLoading(false);
            });
    }, []);

    const categories = ['all', 'event', 'training', 'achievement', 'project'];

    const getCategoryLabel = (cat) => {
        switch (cat) {
            case 'all': return 'All';
            case 'event': return 'Events';
            case 'training': return 'Training';
            case 'achievement': return 'Achievements';
            case 'project': return 'Projects';
            default: return cat.charAt(0).toUpperCase() + cat.slice(1);
        }
    };

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop';
    };

    // Group images by title
    const groupedGalleryMap = {};
    gallery.forEach(item => {
        if (!groupedGalleryMap[item.title]) {
            groupedGalleryMap[item.title] = {
                title: item.title,
                category: item.category,
                images: []
            };
        }
        groupedGalleryMap[item.title].images.push(item);
    });

    const groupedGalleryArray = Object.values(groupedGalleryMap);

    const filteredGroups = activeFilter === 'all'
        ? groupedGalleryArray
        : groupedGalleryArray.filter(group => group.category === activeFilter);

    if (error) {
        return (
            <section className="section-padding gallery-page animate-enter" style={{ background: 'var(--bg-dark)', minHeight: '80vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ fontSize: '3.5rem', color: '#ef4444', marginBottom: '20px' }}>
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <h2 className="section-title">Failed to load dynamic database</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '15px auto 25px' }}>
                        Something went wrong while fetching our dynamic team or gallery resources.
                    </p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Connection</button>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Premium Lightbox Slideshow Overlay */}
            {activeGroup && (
                <div className="modal-backdrop" onClick={() => setActiveGroup(null)}>
                    <div className="modal-content-wrapper glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', background: 'rgba(9, 13, 22, 0.95)', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <button className="modal-close-btn" onClick={() => setActiveGroup(null)} aria-label="Close lightbox" style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}>
                            <i className="fas fa-times"></i>
                        </button>
                        
                        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px', maxHeight: '55vh', overflow: 'hidden', borderRadius: '16px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            {/* Left Navigation Arrow */}
                            {activeGroup.images.length > 1 && (
                                <button 
                                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + activeGroup.images.length) % activeGroup.images.length)}
                                    style={{ position: 'absolute', left: '15px', background: 'rgba(9, 13, 22, 0.75)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                                    className="nav-arrow-btn"
                                >
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                            )}
                            
                            {/* Current Image */}
                            <img 
                                src={activeGroup.images[activeImageIndex].image} 
                                alt={activeGroup.title} 
                                style={{ maxWidth: '100%', maxHeight: '55vh', objectFit: 'contain', display: 'block' }}
                                onError={handleImageError}
                            />

                            {/* Right Navigation Arrow */}
                            {activeGroup.images.length > 1 && (
                                <button 
                                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % activeGroup.images.length)}
                                    style={{ position: 'absolute', right: '15px', background: 'rgba(9, 13, 22, 0.75)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                                    className="nav-arrow-btn"
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            )}
                        </div>

                        {/* Caption & Controls */}
                        <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 5px 0', fontFamily: 'var(--font-head)' }}>{activeGroup.title}</h3>
                            <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {getCategoryLabel(activeGroup.category)}
                            </span>
                            {activeGroup.images.length > 1 && (
                                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                    Photo {activeImageIndex + 1} of {activeGroup.images.length}
                                </div>
                            )}
                            
                            {/* Thumbnail Previews */}
                            {activeGroup.images.length > 1 && (
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '15px', overflowX: 'auto', padding: '5px', maxWidth: '100%' }}>
                                    {activeGroup.images.map((img, idx) => (
                                        <div 
                                            key={img.id} 
                                            onClick={() => setActiveImageIndex(idx)}
                                            style={{ 
                                                width: '50px', 
                                                height: '38px', 
                                                borderRadius: '6px', 
                                                overflow: 'hidden', 
                                                border: idx === activeImageIndex ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)', 
                                                opacity: idx === activeImageIndex ? 1 : 0.4, 
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                flexShrink: 0
                                            }}
                                            className="lightbox-thumb"
                                        >
                                            <img src={img.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="thumb" onError={handleImageError} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200')`, height: 'auto', minHeight: '380px', padding: '40px 0' }}>
                <div className="container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
                    <div className="page-header-content" style={{ flex: '1 1 500px', maxWidth: '650px' }}>
                        <h1 className="page-header-title">Ecosystem Gallery</h1>
                        <p className="page-header-desc" style={{ marginBottom: '20px' }}>A visual showcase of live challenges, Hackathon prototypes, workshops, and ecosystem achievements.</p>
                        <a href="https://youtube.com/@techroxxyt" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
                            <i className="fab fa-youtube" style={{ marginRight: '8px' }}></i> Subscribe to Channel
                        </a>
                    </div>
                    
                    {/* Latest YouTube Video Iframe on the right */}
                    <div className="latest-video-banner-wrapper" style={{ flex: '1 1 400px', maxWidth: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)', border: '2px solid rgba(239, 68, 68, 0.25)', position: 'relative', zIndex: 1 }}>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                            <iframe 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                                src="https://www.youtube.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV" 
                                title="Latest Tech Roxx Video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* 1. ECOSYSTEM GALLERY SECTION */}
            <section className="section-padding gallery-page animate-enter" style={{ background: 'var(--bg-dark)', paddingTop: '60px' }}>
                <div className="container">
                    
                    
                    {/* Filters */}
                    <div className="gallery-filters" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {categories.map((cat, idx) => (
                            <button 
                                key={idx} 
                                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '30px',
                                    border: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: activeFilter === cat ? 'linear-gradient(135deg, #ef4444, #ef4444)' : 'var(--bg-panel)',
                                    color: activeFilter === cat ? 'white' : 'var(--text-muted)',
                                    border: '1px solid rgba(220, 38, 38, 0.08)',
                                    boxShadow: activeFilter === cat ? '0 4px 15px rgba(124, 58, 237, 0.3)' : 'none'
                                }}
                            >
                                {getCategoryLabel(cat)}
                            </button>
                        ))}
                    </div>

                    {/* SKELETON PULSE OR CONTENT */}
                    {loading ? (
                        <div className="gallery-grid">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="gallery-item skeleton-pulse" style={{ height: '220px', borderRadius: '16px', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}></div>
                            ))}
                        </div>
                    ) : filteredGroups.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '50px 30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <i className="fas fa-images" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '15px' }}></i>
                            <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>No gallery assets found</h4>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto 0' }}>We are currently updating our database catalog. Check back soon for beautiful tech showcases!</p>
                        </div>
                    ) : (
                        <div className="gallery-grid staggered-fade-in">
                            {filteredGroups.map(group => {
                                const coverItem = group.images[0];
                                const hasVideo = group.images.some(img => img.isVideo);
                                return (
                                    <div 
                                        key={group.title} 
                                        className="gallery-item"
                                        onClick={() => {
                                            setActiveGroup(group);
                                            setActiveImageIndex(0);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="gallery-img-wrapper">
                                            {group.images.length > 1 && (
                                                <div className="gallery-count-badge" style={{ position: 'absolute', top: '15px', right: '15px', padding: '6px 12px', background: 'rgba(9, 13, 22, 0.75)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '20px', zIndex: 3, backdropFilter: 'blur(8px)', letterSpacing: '0.5px' }}>
                                                    <i className="fas fa-images" style={{ marginRight: '6px', color: '#ef4444' }}></i> {group.images.length} Photos
                                                </div>
                                            )}
                                            <img 
                                                src={coverItem.image} 
                                                alt={group.title} 
                                                loading="lazy"
                                                onError={handleImageError}
                                            />
                                            {hasVideo && (
                                                <div className="play-icon-overlay" style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    fontSize: '3rem',
                                                    color: 'white',
                                                    opacity: 0.85,
                                                    pointerEvents: 'none',
                                                    zIndex: 2,
                                                    textShadow: '0 0 20px rgba(0,0,0,0.5)'
                                                }}>
                                                    <i className="fas fa-play-circle"></i>
                                                </div>
                                            )}
                                            <div className="gallery-overlay">
                                                <h4>{group.title}</h4>
                                                <span className="gallery-category">
                                                    {getCategoryLabel(group.category)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* 3. YOUTUBE VIDEO SHOWCASE SECTION */}
            <section className="section-padding video-showcase-section" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(220, 38, 38, 0.08)' }}>
                <div className="container">
                    <h2 className="section-title">Video Highlights</h2>
                    <p className="section-subtitle">Watch Our Students and Mentors in Action</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }} className="staggered-fade-in">
                        {videoHighlights.map(video => (
                            <div key={video.id} className="glass-panel video-card animate-enter" style={{ 
                                padding: '20px', 
                                borderRadius: '16px', 
                                border: '1px solid rgba(220, 38, 38, 0.08)',
                                background: 'var(--bg-panel)',
                                backdropFilter: 'blur(16px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                <div>
                                    <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '1px solid rgba(220, 38, 38, 0.05)', marginBottom: '15px', position: 'relative', zIndex: 1 }}>
                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                            <iframe 
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                                                src={video.embedUrl} 
                                                title={video.title} 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: '0 0 8px' }}>{video.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{video.desc}</p>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-blue)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Watch Video <i className="fas fa-play" style={{ fontSize: '0.7rem' }}></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Custom Premium Styles and Hover Animations */}
            <style>{`
                /* Grid Configurations */
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px !important;
                    margin-top: 30px;
                }
                
                /* Gallery Item Layout */
                .gallery-item {
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    aspect-ratio: 4/3;
                    border: 1px solid rgba(220, 38, 38, 0.12);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.04);
                    background: var(--bg-panel);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease;
                }
                .gallery-item:hover {
                    transform: translateY(-5px);
                    border-color: #ef4444;
                    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.12);
                }
                .gallery-img-wrapper {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                .gallery-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .gallery-item:hover img {
                    transform: scale(1.1);
                }
                
                /* Gallery Description Slide-up Overlay */
                .gallery-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 25px;
                    background: linear-gradient(to top, rgba(7, 27, 59, 0.95) 0%, rgba(7, 27, 59, 0.4) 60%, transparent 100%);
                    color: white;
                    opacity: 0;
                    transform: translateY(15px);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                    transform: translateY(0);
                }
                .gallery-overlay h4 {
                    margin: 0 0 5px;
                    font-size: 1.15rem;
                    font-weight: 800;
                    font-family: var(--font-head);
                    letter-spacing: 0.5px;
                }
                .gallery-category {
                    font-size: 0.72rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #ef4444;
                    display: inline-block;
                }

                /* Premium Team Glassmorphism Card styling */
                .team-card {
                    background: var(--bg-panel);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(220, 38, 38, 0.12);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
                    box-shadow: 0 10px 32px 0 rgba(0, 0, 0, 0.05);
                    border-radius: 24px;
                    overflow: hidden;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease;
                }
                .team-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    border-color: #ef4444;
                    box-shadow: 0 20px 45px rgba(239, 68, 68, 0.15);
                }

                /* Rectangular Portrait Wrapper */
                .team-img-wrapper {
                    position: relative;
                    width: 100%;
                    height: 300px;
                    overflow: hidden;
                    border-bottom: 2px solid rgba(220, 38, 38, 0.06);
                    transition: all 0.4s ease;
                }
                .team-card:hover .team-img-wrapper {
                    border-color: transparent;
                    box-shadow: none;
                    transform: scale(1.08);
                }

                /* Dynamic Socials Dark Fade-in Overlay */
                .team-socials {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(7, 27, 59, 0.82);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    opacity: 0;
                    transition: all 0.4s ease;
                    border-radius: 50%;
                }
                .team-card:hover .team-socials {
                    opacity: 1;
                }
                .team-socials a {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #ef4444;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.05rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateY(15px);
                }
                .team-card:hover .team-socials a {
                    transform: translateY(0);
                }
                .team-socials a:hover {
                    background: white;
                    color: #111111;
                    box-shadow: 0 0 15px white;
                    transform: scale(1.1);
                }

                /* Video card style hovers */
                .video-card {
                    background: var(--bg-panel) !important;
                    backdrop-filter: blur(16px) !important;
                    border: 1px solid rgba(220, 38, 38, 0.08) !important;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05) !important;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease !important;
                }
                .video-card:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    border-color: #ef4444 !important;
                    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.12) !important;
                    background: var(--bg-card) !important;
                }

                /* Filter Buttons Hover Effects */
                .filter-btn {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                .filter-btn:hover {
                    transform: translateY(-2px);
                    border-color: #ef4444 !important;
                    color: #ef4444 !important;
                }

                /* Skeleton pulse */
                @keyframes skeleton-pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 0.3; }
                    100% { opacity: 0.6; }
                }
                .skeleton-pulse {
                    animation: skeleton-pulse 1.5s infinite ease-in-out;
                }

                /* --- CEO Spotlight Section Styles --- */
                .ceo-spotlight-container {
                    display: grid;
                    grid-template-columns: 1fr 1.6fr;
                    gap: 50px;
                    align-items: center;
                    margin: 50px 0;
                    padding: 40px;
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.03), rgba(59, 130, 246, 0.03));
                    border: 1px solid rgba(220, 38, 38, 0.08);
                    border-radius: 32px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
                }
                @media (max-width: 991px) {
                    .ceo-spotlight-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 40px;
                        padding: 30px 20px;
                    }
                }
                
                /* CEO Card Column */
                .ceo-card-column {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                /* CEO Portrait Card */
                .ceo-img-card {
                    position: relative;
                    width: 300px;
                    height: 400px;
                    border-radius: 24px;
                    overflow: hidden;
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(59, 130, 246, 0.2));
                    border: 2px solid rgba(239, 68, 68, 0.15);
                    box-shadow: 0 15px 35px rgba(239, 68, 68, 0.2);
                    animation: float 4s ease-in-out infinite;
                    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
                }
                .ceo-img-card:hover {
                    border-color: #ef4444;
                    box-shadow: 0 20px 45px rgba(239, 68, 68, 0.35);
                    transform: scale(1.02);
                }
                
                .ceo-avatar-bg {
                    position: absolute;
                    top: 15%;
                    left: 15%;
                    width: 70%;
                    height: 70%;
                    background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
                    z-index: 0;
                    border-radius: 50%;
                    filter: blur(20px);
                }
                
                .ceo-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: relative;
                    z-index: 1;
                    /* Fades out the background at the bottom and isolates the portrait */
                    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                }
                
                /* Overlay Gradient at the bottom */
                .ceo-text-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 25px 20px 20px;
                    background: linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0.7) 60%, transparent 100%);
                    z-index: 2;
                    text-align: center;
                    // border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .ceo-name {
                    font-family: var(--font-head);
                    font-size: 1.35rem;
                    font-weight: 900;
                    color: #ffffff !important;
                    margin: 0 0 5px 0;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
                    letter-spacing: 0.5px;
                }
                
                .ceo-role-overlay {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #ef4444;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 12px;
                }
                
                .ceo-social-links {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                }
                
                .ceo-social-links a {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                
                .ceo-social-links a:hover {
                    background: #ef4444;
                    border-color: #ef4444;
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
                }
                
                /* Vision Column styling */
                .ceo-vision-column {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                }
                @media (max-width: 991px) {
                    .ceo-vision-column {
                        align-items: center;
                        text-align: center;
                    }
                }
                
                .vision-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: 30px;
                    color: #ef4444;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                    letter-spacing: 1px;
                }
                
                .vision-title {
                    font-family: var(--font-head);
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: var(--text-main);
                    line-height: 1.3;
                    margin: 0 0 15px 0;
                }
                
                .vision-quote {
                    font-size: 0.98rem;
                    line-height: 1.6;
                    color: var(--text-muted);
                    font-style: italic;
                    margin-bottom: 25px;
                    position: relative;
                }
                
                .vision-details {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    width: 100%;
                }
                
                .vision-detail-item {
                    display: flex;
                    gap: 15px;
                    align-items: flex-start;
                }
                @media (max-width: 991px) {
                    .vision-detail-item {
                        text-align: left;
                    }
                }
                
                .detail-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(59, 130, 246, 0.1));
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ef4444;
                    font-size: 1.1rem;
                    flex-shrink: 0;
                }
                
                .detail-text {
                    display: flex;
                    flex-direction: column;
                }
                
                .detail-text strong {
                    font-size: 0.95rem;
                    color: var(--text-main);
                    font-weight: 700;
                    margin-bottom: 2px;
                }
                
                .detail-text span {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                }
                
                /* Core Team Section Headings */
                .core-team-heading {
                    font-family: var(--font-head);
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--text-main);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 15px;
                    border-left: 4px solid #ef4444;
                    padding-left: 15px;
                }
                
                /* --- Styled Horizontal Separator --- */
                .premium-divider {
                    border: none;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.25) 20%, rgba(59, 130, 246, 0.25) 50%, rgba(239, 68, 68, 0.25) 80%, transparent);
                    margin: 60px 0;
                    position: relative;
                    overflow: visible;
                }
                .premium-divider::after {
                    content: "✦";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--bg-dark);
                    padding: 0 20px;
                    color: #ef4444;
                    font-size: 1.1rem;
                }
                
                /* --- Interns Section Styling --- */
                .intern-role-group {
                    margin-top: 30px;
                }
                
                .intern-role-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(220, 38, 38, 0.08);
                    margin-bottom: 25px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .intern-role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: var(--text-main);
                    font-family: var(--font-head);
                }
                
                .intern-role-badge i {
                    color: #ef4444;
                }
                
                .intern-count-tag {
                    font-size: 0.75rem;
                    font-weight: 700;
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                    padding: 4px 12px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .interns-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                }
                
                /* Intern Card layout */
                .intern-card {
                    position: relative;
                    background: var(--bg-panel);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(220, 38, 38, 0.1);
                    border-radius: 20px;
                    padding: 25px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease;
                }
                
                .intern-card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                
                .intern-card:hover {
                    transform: translateY(-5px);
                    border-color: #ef4444;
                    box-shadow: 0 15px 35px rgba(239, 68, 68, 0.15);
                }
                
                .intern-card:hover .intern-card-glow {
                    opacity: 1;
                }
                
                /* Intern Card Avatar */
                .intern-avatar-wrapper {
                    position: relative;
                    width: 75px;
                    height: 75px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid rgba(220, 38, 38, 0.15);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                    flex-shrink: 0;
                    z-index: 1;
                    transition: transform 0.4s ease, border-color 0.4s ease;
                }
                .intern-card:hover .intern-avatar-wrapper {
                    border-color: #ef4444;
                    transform: scale(1.05);
                }
                
                .intern-avatar-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                /* Intern Card Info */
                .intern-card-info {
                    display: flex;
                    flex-direction: column;
                    z-index: 1;
                    flex: 1;
                }
                
                .intern-card-name {
                    font-family: var(--font-head);
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: var(--text-main);
                    margin: 0 0 4px 0;
                    line-height: 1.2;
                }
                
                .intern-id-badge {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin-bottom: 5px;
                }
                
                .id-label {
                    font-size: 0.72rem;
                    color: var(--text-muted);
                    font-weight: 600;
                }
                
                .id-val {
                    font-size: 0.75rem;
                    color: #3b82f6;
                    font-weight: 700;
                }
                
                .intern-card-role {
                    font-size: 0.75rem;
                    color: #ef4444;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }
                
                /* Social icons inside Intern card */
                .intern-card-socials {
                    display: flex;
                    gap: 8px;
                }
                
                .intern-social-link {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: rgba(220, 38, 38, 0.05);
                    border: 1px solid rgba(220, 38, 38, 0.08);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    transition: all 0.3s ease;
                }
                
                .intern-social-link:hover {
                    color: white;
                    transform: translateY(-2px);
                }
                .intern-social-link.linkedin:hover {
                    background: #0077b5;
                    border-color: #0077b5;
                }
                 .intern-social-link.github:hover {
                    background: #24292e;
                    border-color: #24292e;
                }
                
                /* --- Inline Card Socials for Core Leadership --- */
                .team-card {
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease !important;
                }
                .team-card-socials-inline {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 5px;
                }
                .inline-social-link {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(239, 68, 68, 0.05);
                    border: 1px solid rgba(239, 68, 68, 0.08);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                .inline-social-link:hover {
                    color: white;
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }
                .inline-social-link.linkedin:hover {
                    background: #0077b5;
                    border-color: #0077b5;
                    box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
                }
                .inline-social-link.github:hover {
                    background: #24292e;
                    border-color: #24292e;
                    box-shadow: 0 4px 12px rgba(36, 41, 46, 0.3);
                }
                
                /* --- Glassmorphic Modal Backdrop & Wrapper --- */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(9, 13, 22, 0.75);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    animation: fadeIn 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-content-wrapper {
                    position: relative;
                    background: var(--bg-panel);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    border-radius: 24px;
                    width: 100%;
                    max-width: 820px;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
                    animation: scaleUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    z-index: 100000;
                }
                
                @keyframes scaleUp {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                
                /* Close Button */
                .modal-close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: var(--text-main);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                    z-index: 10;
                    transition: all 0.3s ease;
                }
                
                .modal-close-btn:hover {
                    background: #ef4444;
                    color: white;
                    border-color: #ef4444;
                    transform: rotate(90deg) scale(1.1);
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
                }
                
                /* Modal Layout grid split */
                .modal-body-layout {
                    display: grid;
                    grid-template-columns: 1.1fr 1.6fr;
                    min-height: 480px;
                }
                
                @media (max-width: 768px) {
                    .modal-body-layout {
                        grid-template-columns: 1fr;
                        min-height: auto;
                    }
                }
                
                /* Image Pane Left Column */
                .modal-image-pane {
                    position: relative;
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(59, 130, 246, 0.15));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-right: 1px solid rgba(239, 68, 68, 0.1);
                }
                @media (max-width: 768px) {
                    .modal-image-pane {
                        height: 280px;
                        border-right: none;
                        border-bottom: 1px solid rgba(239, 68, 68, 0.1);
                    }
                }
                
                .modal-image-pane-bg {
                    position: absolute;
                    width: 140%;
                    height: 140%;
                    background: radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 60%);
                    z-index: 0;
                    filter: blur(30px);
                }
                
                .modal-profile-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: relative;
                    z-index: 1;
                    transition: transform 0.6s ease;
                }
                .modal-content-wrapper:hover .modal-profile-img {
                    transform: scale(1.03);
                }
                
                /* Info Pane Right Column */
                .modal-info-pane {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: left;
                }
                @media (max-width: 480px) {
                    .modal-info-pane {
                        padding: 25px;
                    }
                }
                
                .modal-badge-role {
                    display: inline-flex;
                    align-self: flex-start;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.25);
                    border-radius: 20px;
                    color: #ef4444;
                    font-size: 0.72rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    letter-spacing: 0.5px;
                }
                
                .modal-member-name {
                    font-family: var(--font-head);
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: var(--text-main);
                    margin: 0 0 5px 0;
                    line-height: 1.2;
                }
                
                .modal-member-role {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #3b82f6;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 22px;
                }
                
                .modal-bio-section {
                    background: rgba(255, 255, 255, 0.03);
                    border-left: 3px solid #ef4444;
                    padding: 15px 20px;
                    border-radius: 4px 12px 12px 4px;
                    margin-bottom: 25px;
                }
                
                .modal-bio-text {
                    font-size: 0.92rem;
                    line-height: 1.6;
                    color: var(--text-muted);
                    font-style: italic;
                    margin: 0;
                }
                
                .modal-extra-details {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 30px;
                    border-bottom: 1px solid rgba(220, 38, 38, 0.08);
                    padding-bottom: 20px;
                }
                
                .detail-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .detail-lbl {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--text-main);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .detail-lbl i {
                    color: #ef4444;
                    width: 14px;
                }
                
                .detail-val {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }
                
                .modal-action-bar {
                    display: flex;
                    width: 100%;
                }
                
                .btn-social-large {
                    width: 100%;
                    text-align: center;
                    padding: 12px 24px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 12px;
                    color: white !important;
                    transition: all 0.3s ease;
                }
                .btn-social-large.linkedin {
                    background: #0077b5;
                    border: 1px solid #0077b5;
                    box-shadow: 0 4px 15px rgba(0, 119, 181, 0.3);
                }
                .btn-social-large.linkedin:hover {
                    background: #00669c;
                    border-color: #00669c;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 119, 181, 0.45);
                }
            `}</style>

        </>
    );
};

export default Gallery;
