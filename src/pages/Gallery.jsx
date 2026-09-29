import { useState, useEffect } from 'react';
import { loadGalleryData } from '../utils/dataLoader';
import '../styles/pages/Gallery.css';

const videoHighlights = [
    {
        id: 1,
        title: "IoT & Smart Systems Workshop Highlights",
        embedUrl: "https://www.youtube-nocookie.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV",
        desc: "Hands-on student prototypes showcasing IoT telemetry, microcontrollers, and cloud databases."
    },
    {
        id: 2,
        title: "Robotics Hackathon Prototype Showcases",
        embedUrl: "https://www.youtube-nocookie.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV",
        desc: "A compilation of autonomous robotics projects built during our annual ecosystem challenge."
    },
    {
        id: 3,
        title: "Advanced VLSI and PCB Routing Masterclass",
        embedUrl: "https://www.youtube-nocookie.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV",
        desc: "Watch our expert mentors guide students in KiCad layouts, routing design, and circuit fabrication."
    }
];

const instagramHighlights = [
    {
        id: 1,
        title: "Embedded Systems Skill Sprint",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
        link: "https://www.instagram.com/tech_roxx.ig",
        desc: "Check out our latest hands-on workshop session on ESP32, firmware architecture, and PCB Routing!"
    },
    {
        id: 2,
        title: "36-Hour Hackathon Recap",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600",
        link: "https://www.instagram.com/tech_roxx.ig",
        desc: "Watch the highlights, coding sessions, and final prototypes from our IoT developmental sprint."
    },
    {
        id: 3,
        title: "Cohort Success & Placements",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
        link: "https://www.instagram.com/tech_roxx.ig",
        desc: "Hear directly from our cohort interns about their skill journeys and interview preparation at Techroxx."
    }
];

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeGroup, setActiveGroup] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        loadGalleryData()
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

    // JSON-LD Structured Schema for Gallery Search Indexing
    const gallerySchema = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Tech Roxx Ecosystem Gallery - Projects, Workshops & Events",
        "description": "Visual showcase of live hackathons, IoT prototype challenges, VLSI routing workshops, and student celebrations at Tech Roxx Hyderabad.",
        "url": "https://techroxx.in/gallery",
        "publisher": {
            "@type": "Organization",
            "name": "Tech Roxx",
            "url": "https://techroxx.in"
        },
        "image": groupedGalleryArray.map(group => `https://techroxx.in${group.images[0]?.image}`).filter(Boolean)
    };

    if (error) {
        return (
            <section className="section-padding gallery-page animate-enter" style={{ background: 'var(--bg-dark)', minHeight: '80vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ fontSize: '3.5rem', color: 'var(--primary-brand)', marginBottom: '20px' }}>
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
            <script type="application/ld+json">
                {JSON.stringify(gallerySchema)}
            </script>
            {/* Premium Lightbox Slideshow Overlay */}
            {activeGroup && (
                <div className="modal-backdrop" onClick={() => setActiveGroup(null)}>
                    <div className="modal-content-wrapper glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', background: 'var(--bg-panel)', border: 'var(--glass-border)', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <button className="modal-close-btn" onClick={() => setActiveGroup(null)} aria-label="Close lightbox" style={{ background: 'var(--bg-dark)', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}>
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
                                alt={`${activeGroup.title} - Tech Roxx Hyderabad Gallery`} 
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
                            <span style={{ fontSize: '0.75rem', color: 'var(--primary-brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
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
                                                border: idx === activeImageIndex ? '2px solid var(--primary-brand)' : '1px solid rgba(234, 88, 12, 0.12)', 
                                                opacity: idx === activeImageIndex ? 1 : 0.4, 
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                flexShrink: 0
                                            }}
                                            className="lightbox-thumb"
                                        >
                                            <img src={img.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`${activeGroup.title} thumbnail`} onError={handleImageError} />
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
                                src="https://www.youtube-nocookie.com/embed/-GoJ2HaVWrw?si=EchHfI1-cENR13KV" 
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
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: activeFilter === cat ? 'linear-gradient(135deg, var(--primary-brand), var(--primary-brand))' : 'var(--bg-panel)',
                                    color: activeFilter === cat ? 'white' : 'var(--text-muted)',
                                    border: '1px solid rgba(234, 88, 12, 0.08)',
                                    boxShadow: activeFilter === cat ? '0 4px 15px rgba(234, 88, 12, 0.3)' : 'none'
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
                        <div className="glass-panel" style={{ padding: '50px 30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(234, 88, 12, 0.1)' }}>
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
                                                    <i className="fas fa-images" style={{ marginRight: '6px', color: 'var(--primary-brand)' }}></i> {group.images.length} Photos
                                                </div>
                                            )}
                                            <img 
                                                src={coverItem.image} 
                                                alt={`${group.title} - Tech Roxx Hyderabad Gallery`} 
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

            {/* 4. INSTAGRAM HIGHLIGHTS SECTION */}
            <section className="section-padding instagram-showcase-section" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(220, 38, 38, 0.08)', paddingBottom: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Instagram Highlights</h2>
                    <p className="section-subtitle">Catch Our Reels, Student Stories & Tech Updates</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }} className="staggered-fade-in">
                        {instagramHighlights.map(post => (
                            <a 
                                key={post.id} 
                                href={post.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="glass-panel instagram-card animate-enter" 
                                style={{ 
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
                                    zIndex: 1,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div>
                                    <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '15px', position: 'relative', aspectRatio: '16/9' }}>
                                        <img 
                                            src={post.imageUrl} 
                                            alt={post.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                            className="insta-post-img"
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            left: '15px',
                                            background: 'rgba(9, 13, 22, 0.75)',
                                            backdropFilter: 'blur(4px)',
                                            color: '#f43f5e',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                        }}>
                                            <i className="fab fa-instagram"></i>
                                        </div>
                                    </div>
                                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: '0 0 8px', textDecoration: 'none' }}>{post.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{post.desc}</p>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-orange)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    View on Instagram <i className="fas fa-external-link-alt" style={{ fontSize: '0.75rem' }}></i>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                
                
            </section>



            {/* Custom Premium Styles and Hover Animations */}
            

        </>
    );
};

export default Gallery;
