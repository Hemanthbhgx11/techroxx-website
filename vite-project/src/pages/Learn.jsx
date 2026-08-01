import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { placementCompanies } from '../data/constants';
import { COURSES } from '../data/coursesIndex';
import { marked } from 'marked';
import '../styles/pages/Learn.css';

// Categories for placement directory
const placementCategories = ['All Categories', ...Object.keys(placementCompanies)];

// Image Mapping Helper for Course Cards
const getCourseImage = (id) => {
    switch(id) {
        case 'placement-guide': 
            return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600';
        case 'html': 
            return 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600';
        case 'esp32-telemetry': 
            return 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600';
        case 'pcb-design': 
            return 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600';
        case 'agentic-ai': 
            return 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600';
        case 'mern-fullstack': 
            return 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=600';
        default: 
            return 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600';
    }
};

const Learn = () => {
    const { courseId, chapterSlug } = useParams();
    const navigate = useNavigate();

    // Catalog filtering
    const [catalogSearch, setCatalogSearch] = useState('');
    
    // Placement directory states
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeBranch, setActiveBranch] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');

    // Quiz evaluation states
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    // Reset quiz state when chapter changes
    useEffect(() => {
        setSelectedAnswer(null);
        setQuizSubmitted(false);
    }, [courseId, chapterSlug]);

    // Handle course/lesson routing defaults
    useEffect(() => {
        if (courseId && courseId !== 'placement-guide') {
            const course = COURSES[courseId];
            if (course && !chapterSlug) {
                // If course specified but no chapter slug, redirect to first chapter
                navigate(`/learn/${courseId}/${course.chapters[0].slug}`, { replace: true });
            }
        }
    }, [courseId, chapterSlug, navigate]);

    // Helper for icons and colors
    const getCourseIcon = (id, slug) => {
        if (id === 'placement-guide') return { icon: 'fas fa-briefcase', color: 'var(--primary-brand)' };
        const course = COURSES[id];
        if (course) return { icon: course.icon, color: course.color };
        return { icon: 'fas fa-book', color: 'var(--primary-brand)' };
    };

    // Calculate dynamic next/previous navigation chapters
    const getPrevAndNext = () => {
        if (!courseId || courseId === 'placement-guide') return { prev: null, next: null };
        const course = COURSES[courseId];
        if (!course) return { prev: null, next: null };
        
        const idx = course.chapters.findIndex(c => c.slug === chapterSlug);
        return {
            prev: idx > 0 ? course.chapters[idx - 1] : null,
            next: idx < course.chapters.length - 1 ? course.chapters[idx + 1] : null
        };
    };

    const { prev: prevChapter, next: nextChapter } = getPrevAndNext();

    // Launcher for standalone sandbox compiler
    const handleTryItYourself = (sandboxCode) => {
        if (!sandboxCode) return;
        localStorage.setItem('sandbox_starter_code', sandboxCode.html);
        window.open('/learn/sandbox', '_blank');
    };

    // Filter catalog items
    const allCatalogItems = [
        {
            id: 'placement-guide',
            type: 'guide',
            category: 'Careers & Recruitment',
            title: 'Placement Directory',
            difficulty: 'Directory',
            price: 'Free',
            description: 'Explore direct recruitment portals, official careers pages, and job application pathways for top companies across all industries.',
            features: ['Direct HR Portal Links', 'Multi-Sector Coverage', 'Daily Recruitment Updates'],
            chaptersCount: Object.values(placementCompanies).flat().length,
            unitLabel: 'Companies Listed'
        },
        ...Object.entries(COURSES).map(([id, val]) => ({
            id: id,
            type: 'course',
            category: val.category,
            title: val.title,
            difficulty: val.chapters[0]?.difficulty || 'Tutorial',
            price: 'Free',
            description: val.description,
            features: val.chapters.map(c => c.title),
            chaptersCount: val.chapters.length,
            unitLabel: 'Chapters'
        }))
    ];

    const filteredCatalog = allCatalogItems.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(catalogSearch.toLowerCase()) || 
            item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(catalogSearch.toLowerCase());
        return matchesSearch;
    });

    const isTutorialMode = courseId && courseId !== 'placement-guide';
    const activeCourse = isTutorialMode ? COURSES[courseId] : null;
    const activeChapter = activeCourse ? activeCourse.chapters.find(c => c.slug === chapterSlug) : null;

    // Markdown loading and rendering state
    const [markdownHtml, setMarkdownHtml] = useState('');
    const [isLoadingMarkdown, setIsLoadingMarkdown] = useState(false);

    useEffect(() => {
        if (isTutorialMode && activeChapter) {
            setIsLoadingMarkdown(true);
            setMarkdownHtml('');
            
            // Try fetching from public/tutorials/:courseId/:chapterSlug.md
            fetch(`/tutorials/${courseId}/${chapterSlug}.md`)
                .then(res => {
                    if (res.ok) {
                        return res.text();
                    }
                    throw new Error('Markdown file not found');
                })
                .then(text => {
                    // Convert raw markdown text to HTML using marked
                    const html = marked.parse(text);
                    setMarkdownHtml(html);
                    setIsLoadingMarkdown(false);
                })
                .catch(err => {
                    // Fallback to static html content
                    setMarkdownHtml(activeChapter.content || '');
                    setIsLoadingMarkdown(false);
                });
        }
    }, [courseId, chapterSlug, activeChapter, isTutorialMode]);

    return (
        <>
            {!courseId ? (
                /* --- SECTION A: HUB / LEARNING CATALOG --- */
                <section className="section-padding learn-catalog-page animate-enter" style={{ background: 'var(--bg-dark)', padding: '120px 0 80px 0' }}>
                    <div className="page-header-banner" style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200')`,
                        height: 'auto',
                        minHeight: '340px',
                        padding: '65px 0',
                        marginTop: '0px'
                    }}>
                        <div className="container" style={{ width: '100%' }}>
                            <div className="page-header-content" style={{ maxWidth: '800px' }}>
                                <span className="learning-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.12)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                                    <i className="fas fa-graduation-cap"></i> Tech Roxx Learn Hub
                                </span>
                                <h1 className="page-header-title" style={{ fontSize: '3.2rem', fontWeight: 900, marginBottom: '15px', color: '#ffffff' }}>Learning & Directory Portal</h1>
                                <p className="page-header-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6 }}>
                                    Master industry-aligned technical curricula, test your skills, and leverage direct career recruitment directories mapped for high-performance engineers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container" style={{ marginTop: '50px' }}>
                        <div className="catalog-control-panel glass-panel" style={{ display: 'flex', gap: '20px', background: 'var(--bg-card)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <div className="catalog-search-wrapper" style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--text-muted)' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search directories & tutorials..." 
                                    value={catalogSearch}
                                    onChange={(e) => setCatalogSearch(e.target.value)}
                                    className="catalog-search-input"
                                    style={{ width: '100%', padding: '12px 15px 12px 42px', borderRadius: '10px', border: 'var(--glass-border)', outline: 'none', background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                                />
                            </div>
                        </div>

                        {filteredCatalog.length === 0 ? (
                            <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', border: 'var(--glass-border)', borderRadius: '24px', marginTop: '30px' }}>
                                <i className="fas fa-search-minus" style={{ fontSize: '3rem', color: 'var(--primary-brand)', marginBottom: '15px' }}></i>
                                <h2 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', margin: '0 0 10px 0' }}>No Results Found</h2>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto' }}>Please adjust your search keywords.</p>
                            </div>
                        ) : (
                            <div className="ecom-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
                                {filteredCatalog.map(item => {
                                    return (
                                        <div 
                                            key={item.id} 
                                            className="ecom-catalog-card"
                                            style={{
                                                background: 'var(--bg-card)',
                                                border: 'var(--glass-border)',
                                                borderRadius: '20px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: 'var(--card-shadow)',
                                                transition: 'transform 0.3s ease, border-color 0.3s ease'
                                            }}
                                        >
                                            {/* Cover Image Header */}
                                            <div className="card-image-wrapper" style={{
                                                height: '180px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderRadius: '20px 20px 0 0'
                                            }}>
                                                <img 
                                                    src={getCourseImage(item.id)} 
                                                    alt={item.title} 
                                                    className="card-banner-img"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease'
                                                    }}
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%)',
                                                    transition: 'background 0.3s ease'
                                                }} className="card-image-overlay" />
                                                
                                                {/* Floating Type Tag (No Emojis) */}
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '15px',
                                                    left: '15px',
                                                    background: item.type === 'guide' ? 'rgba(234, 88, 12, 0.85)' : 'rgba(16, 185, 129, 0.85)',
                                                    backdropFilter: 'blur(4px)',
                                                    color: 'white',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 800,
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {item.type === 'guide' ? 'Directory' : 'Tutorial'}
                                                </span>

                                                {/* Hovered Heading Title overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '15px',
                                                    left: '20px',
                                                    right: '20px',
                                                    transition: 'transform 0.3s ease'
                                                }} className="card-title-container">
                                                    <h3 style={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 900,
                                                        color: '#ffffff',
                                                        fontFamily: 'var(--font-head)',
                                                        margin: 0,
                                                        lineHeight: 1.3
                                                    }} className="card-title-text">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Details & Contents */}
                                            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
                                                    {item.description}
                                                </p>

                                                <ul style={{ padding: 0, listStyle: 'none', margin: '0 0 25px 0', display: 'grid', gap: '8px' }}>
                                                    {item.features.slice(0, 3).map((f, i) => (
                                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                                            <i className="fas fa-check" style={{ color: 'var(--primary-brand)', fontSize: '0.72rem' }}></i> {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                                
                                                <div style={{ borderTop: 'var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Free Access</span>
                                                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-brand)', display: 'block', fontFamily: 'var(--font-head)' }}>
                                                            {item.chaptersCount} {item.unitLabel}
                                                        </span>
                                                    </div>
                    
                                                    <button
                                                        onClick={() => navigate(item.type === 'guide' ? '/learn/placement-guide' : `/learn/${item.id}`)}
                                                        className="btn btn-orange"
                                                        style={{
                                                            background: 'var(--primary-brand)',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '10px 22px',
                                                            borderRadius: '30px',
                                                            fontWeight: 700,
                                                            fontSize: '0.82rem',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)'
                                                        }}
                                                    >
                                                        <i className={item.type === 'guide' ? 'fas fa-folder-open' : 'fas fa-book-open'}></i> {item.type === 'guide' ? 'Open Directory' : 'Start Learning'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                /* --- SECTION B: INTERACTIVE READING WORKSPACE / DETAIL VIEWS --- */
                <>
                    {isSidebarOpen && (
                        <div 
                            className="sidebar-overlay"
                            onClick={() => setIsSidebarOpen(false)}
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 900, background: 'rgba(0,0,0,0.4)', display: 'none' }}
                        />
                    )}
                    
                    <div className="guides-layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
                        {/* Syllabus Sidebar Navigator */}
                        <div className={`guides-sidebar-panel ${isSidebarOpen ? 'open' : 'collapsed'}`} style={{ width: '320px', background: 'var(--bg-panel)', borderRight: 'var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '100px 20px 20px 20px', position: 'fixed', height: '100vh', top: 0, left: 0, zIndex: 950, transition: 'transform 0.3s ease' }}>
                            <button 
                                onClick={() => navigate('/learn')}
                                className="sidebar-dashboard-back"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '12px 15px', borderRadius: '8px', border: 'var(--glass-border)', background: 'var(--bg-dark)', color: 'var(--text-main)', cursor: 'pointer', fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, transition: '0.2s', marginBottom: '25px' }}
                            >
                                <i className="fas fa-th-large"></i> Back to Catalog Hub
                            </button>

                            {courseId === 'placement-guide' ? (
                                /* Placement Directory Sidebar contents */
                                <div className="sidebar-index-container animate-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '15px' }}>Directory Search</h4>
                                    <div style={{ position: 'relative', marginBottom: '25px' }}>
                                        <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                                        <input 
                                            type="text"
                                            placeholder="Search companies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ width: '100%', padding: '10px 15px 10px 35px', borderRadius: '8px', border: 'var(--glass-border)', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-main)', background: 'var(--bg-dark)' }}
                                        />
                                    </div>

                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '12px' }}>Sectors / Categories</h4>
                                    <ul className="sidebar-chapters-list" style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                                        {placementCategories.map(category => {
                                            const isActive = activeBranch === category;
                                            return (
                                                <li key={category} style={{ marginBottom: '6px' }}>
                                                    <div 
                                                        onClick={() => {
                                                            setActiveBranch(category);
                                                            setIsSidebarOpen(false);
                                                        }}
                                                        style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s', background: isActive ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.05), rgba(100, 116, 139, 0.05))' : 'transparent', borderLeft: isActive ? '3px solid var(--primary-brand)' : '3px solid transparent', color: isActive ? 'var(--primary-brand)' : 'var(--text-muted)' }}
                                                    >
                                                        <i className="fas fa-filter" style={{ marginRight: '8px', fontSize: '0.72rem', opacity: 0.7 }}></i>
                                                        {category}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                /* Interactive Course Chapter Syllabus Sidebar contents */
                                <div className="sidebar-index-container animate-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                                    {activeCourse && (
                                        <>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: activeCourse.color }}>
                                                    <i className={activeCourse.icon}></i>
                                                </div>
                                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{activeCourse.title}</h3>
                                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{activeCourse.category}</span>
                                                </div>
                                            </div>

                                            <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '12px' }}>Syllabus Chapters</h4>
                                            <ul className="sidebar-chapters-list" style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                                                {activeCourse.chapters.map((chapter) => {
                                                    const isActive = chapter.slug === chapterSlug;
                                                    return (
                                                        <li key={chapter.slug} style={{ marginBottom: '6px' }}>
                                                            <div 
                                                                onClick={() => {
                                                                    navigate(`/learn/${courseId}/${chapter.slug}`);
                                                                    setIsSidebarOpen(false);
                                                                }}
                                                                style={{ 
                                                                    padding: '10px 14px', 
                                                                    borderRadius: '8px', 
                                                                    cursor: 'pointer', 
                                                                    fontSize: '0.85rem', 
                                                                    fontWeight: isActive ? 800 : 600, 
                                                                    transition: '0.2s', 
                                                                    background: isActive ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.05), rgba(100, 116, 139, 0.05))' : 'transparent', 
                                                                    borderLeft: isActive ? `3px solid ${activeCourse.color}` : '3px solid transparent', 
                                                                    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between'
                                                                }}
                                                            >
                                                                <span>{chapter.title}</span>
                                                                {isActive && <i className="fas fa-play" style={{ fontSize: '0.65rem', color: activeCourse.color }}></i>}
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Content Workspace Area */}
                        <div className="guides-content-area" style={{ flex: 1, paddingLeft: '320px', transition: 'padding-left 0.3s ease' }}>
                            <div className="guides-main-container" style={{ padding: '120px 40px 80px 40px', maxWidth: '1000px', margin: '0 auto' }}>
                                
                                {/* Breadcrumbs navigation */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                    <div 
                                        className="reading-back-breadcrumb" 
                                        onClick={() => navigate('/learn')} 
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s' }}
                                    >
                                        <i className="fas fa-th-large"></i> Learn Hub
                                        {activeCourse && (
                                            <>
                                                <i className="fas fa-chevron-right" style={{ fontSize: '0.68rem', opacity: 0.6 }}></i>
                                                <span style={{ color: activeCourse.color }}>{activeCourse.title}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="mobile-toggle-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <button 
                                        onClick={() => navigate('/learn')}
                                        className="back-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'none', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <i className="fas fa-th-large"></i> Hub
                                    </button>
                                    
                                    <button 
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="back-btn mobile-only-toggle-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'none', gap: '8px', alignItems: 'center', fontWeight: 700, fontSize: '0.8rem' }}
                                    >
                                        <i className={`fas ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'}`}></i>
                                        {isSidebarOpen ? 'Close Menu' : 'Syllabus'}
                                    </button>
                                </div>

                                {/* Reading Panel */}
                                <div 
                                    className="glass-panel guides-reading-pane animate-enter" 
                                    style={{ background: 'var(--bg-panel)', borderRadius: '24px', border: 'var(--glass-border)', padding: '45px', boxShadow: 'var(--card-shadow)', minHeight: '400px' }}
                                >
                                    {courseId === 'placement-guide' ? (
                                        /* RENDER: Placement Directory */
                                        <div className="animate-enter guide-content-render">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                                <span style={{ background: 'rgba(234, 88, 12, 0.08)', color: 'var(--primary-brand)', fontSize: '0.78rem', fontWeight: 800, padding: '5px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    Careers & Recruitment
                                                </span>
                                                <span className="catalog-difficulty-badge directory">
                                                    Directory
                                                </span>
                                            </div>

                                            <div className="static-guide-content-reader">
                                                <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', margin: '15px 0 25px', borderBottom: '1px solid rgba(234, 88, 12, 0.1)', paddingBottom: '15px' }}>
                                                    Placement Directory
                                                </h2>
                                                
                                                <div className="html-article-body" style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.02rem' }}>
                                                    <h3>Corporate Career Directory & Application Pathways</h3>
                                                    <p>Access the official job application and career portals of leading companies in various sectors. To receive real-time updates on active drives and job postings, join our community.</p>
                                                </div>

                                                <div style={{ marginTop: '30px' }} className="animate-enter">
                                                    <div style={{ marginBottom: '45px', padding: '35px', background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.03), rgba(100, 116, 139, 0.03))', borderRadius: '20px', border: '1px solid rgba(234, 88, 12, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 30px rgba(0, 0, 0, 0.02)', position: 'relative', overflow: 'hidden' }}>
                                                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(100, 116, 139, 0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>
                                                        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>

                                                        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <i className="fas fa-rocket" style={{ color: 'var(--primary-brand)' }}></i> Placement Success Portal
                                                        </h3>
                                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '25px', lineHeight: 1.6 }}>
                                                            Unlock your career potential with daily job alerts, official recruiting coordinates, and domain guides mapped for corporate recruitment.
                                                        </p>
                                                        
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                                            <a 
                                                                href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" 
                                                                target="_blank" 
                                                                rel="noreferrer" 
                                                                className="wa-glow-btn"
                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--primary-brand)', color: 'white', fontSize: '0.9rem', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 15px rgba(234, 88, 12, 0.35)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                            >
                                                                <i className="fab fa-whatsapp" style={{ fontSize: '1.25rem' }}></i> Join WhatsApp Community
                                                            </a>

                                                            <button 
                                                                onClick={() => navigate('/services/job-roles')}
                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--bg-panel)', color: 'var(--secondary-blue)', border: '1px solid rgba(100, 116, 139, 0.3)', fontSize: '0.9rem', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.02)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                                className="roles-nav-btn"
                                                            >
                                                                <i className="fas fa-briefcase"></i> Understand the Roles
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                                                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                                            Corporate Recruitment Directories
                                                        </h3>
                                                    </div>

                                                    {(() => {
                                                        const filteredCategories = Object.entries(placementCompanies).filter(([category]) => {
                                                            if (activeBranch === 'All Categories') return true;
                                                            return category === activeBranch;
                                                        });

                                                        return filteredCategories.map(([category, companies]) => {
                                                            const filteredCompanies = companies.filter(c => 
                                                                c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                                c.role.toLowerCase().includes(searchQuery.toLowerCase())
                                                            );

                                                            if (filteredCompanies.length === 0) return null;

                                                            return (
                                                                <div key={category} style={{ marginBottom: '40px' }} className="animate-enter">
                                                                    <h4 style={{ color: 'var(--primary-brand)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                        <i className="fas fa-building" style={{ opacity: 0.8 }}></i> {category}
                                                                    </h4>
                                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
                                                                        {filteredCompanies.map((c, i) => (
                                                                            <a 
                                                                                key={i} 
                                                                                href={c.link} 
                                                                                target="_blank" 
                                                                                rel="noreferrer" 
                                                                                className="glass-panel"
                                                                                style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-card)', border: 'var(--glass-border)', display: 'block', transition: 'transform 0.2s, border-color 0.2s', textDecoration: 'none' }}
                                                                            >
                                                                                <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '4px' }}>{c.name}</div>
                                                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.role}</div>
                                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--primary-brand)', marginTop: '10px', fontWeight: 700 }}>
                                                                                    Visit Careers <i className="fas fa-external-link-alt" style={{ fontSize: '0.62rem' }}></i>
                                                                                </span>
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* RENDER: Course Tutorial Reader */
                                        activeChapter ? (
                                            <div className="animate-enter guide-content-render">
                                                {/* Header Badges */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                                    <span style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', fontSize: '0.78rem', fontWeight: 800, padding: '5px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        {activeCourse.category}
                                                    </span>
                                                    <span className="catalog-difficulty-badge">
                                                        {activeChapter.difficulty || 'Beginner'}
                                                    </span>
                                                </div>

                                                {/* Article Content */}
                                                <div className="static-guide-content-reader">
                                                    <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', margin: '15px 0 25px', borderBottom: `1px solid ${activeCourse.color}1e`, paddingBottom: '15px' }}>
                                                        {activeChapter.title}
                                                    </h2>
                                                    
                                                    <div 
                                                        dangerouslySetInnerHTML={{ __html: markdownHtml }} 
                                                        className="html-article-body"
                                                        style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.02rem' }}
                                                    />

                                                    {/* Custom Styles for injected HTML elements */}
                                                    <style>{`
                                                        .html-article-body h3 {
                                                            font-size: 1.45rem;
                                                            margin-top: 30px;
                                                            margin-bottom: 12px;
                                                            color: var(--text-main);
                                                            font-family: var(--font-head);
                                                        }
                                                        .html-article-body h4 {
                                                            font-size: 1.15rem;
                                                            margin-top: 25px;
                                                            margin-bottom: 8px;
                                                            color: var(--text-main);
                                                            font-family: var(--font-head);
                                                        }
                                                        .html-article-body p {
                                                            margin-bottom: 20px;
                                                        }
                                                        .html-article-body ul, .html-article-body ol {
                                                            margin-bottom: 20px;
                                                            padding-left: 24px;
                                                        }
                                                        .html-article-body li {
                                                            margin-bottom: 8px;
                                                        }
                                                        .html-article-body pre {
                                                            background: #0f172a;
                                                            color: #38bdf8;
                                                            padding: 18px;
                                                            border-radius: 10px;
                                                            overflow-x: auto;
                                                            font-family: Consolas, monospace;
                                                            font-size: 0.92rem;
                                                            margin: 20px 0;
                                                            border: 1px solid #334155;
                                                        }
                                                        .info-note {
                                                            background: rgba(234, 88, 12, 0.05);
                                                            border-left: 4px solid var(--primary-brand);
                                                            padding: 15px 20px;
                                                            border-radius: 4px 10px 10px 4px;
                                                            margin: 25px 0;
                                                            color: var(--text-muted);
                                                        }
                                                    `}</style>

                                                    {/* Sandbox / "Try It Yourself" Action */}
                                                    {activeChapter.sandbox && (
                                                        <div style={{
                                                            marginTop: '30px',
                                                            background: 'rgba(30, 41, 59, 0.5)',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                                            borderRadius: '16px',
                                                            padding: '24px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '15px'
                                                        }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <i className="fas fa-laptop-code" style={{ color: activeCourse.color }}></i> Try It Yourself Example
                                                                </h4>
                                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interactive Sandbox</span>
                                                            </div>
                                                            <pre style={{
                                                                background: '#090d16',
                                                                color: '#34d399',
                                                                padding: '15px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.85rem',
                                                                fontFamily: 'Consolas, monospace',
                                                                margin: 0,
                                                                overflowX: 'auto',
                                                                border: '1px solid rgba(255,255,255,0.05)'
                                                            }}>
                                                                <code>{activeChapter.sandbox.html.slice(0, 240)}...</code>
                                                            </pre>
                                                            <div>
                                                                <button
                                                                    onClick={() => handleTryItYourself(activeChapter.sandbox)}
                                                                    style={{
                                                                        background: activeCourse.color,
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        padding: '10px 20px',
                                                                        borderRadius: '8px',
                                                                        fontWeight: 700,
                                                                        cursor: 'pointer',
                                                                        transition: '0.2s',
                                                                        fontSize: '0.82rem',
                                                                        boxShadow: `0 4px 12px ${activeCourse.color}33`
                                                                    }}
                                                                >
                                                                    Try It Yourself <i className="fas fa-external-link-alt" style={{ marginLeft: '6px', fontSize: '0.72rem' }}></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Interactive Checkpoint Quiz */}
                                                    {activeChapter.quiz && (
                                                        <div style={{
                                                            marginTop: '45px',
                                                            background: 'var(--bg-card)',
                                                            border: '1px solid rgba(255,255,255,0.08)',
                                                            borderRadius: '16px',
                                                            padding: '30px',
                                                            boxShadow: 'var(--card-shadow)'
                                                        }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(234, 88, 12, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-brand)' }}>
                                                                    <i className="fas fa-question-circle"></i>
                                                                </div>
                                                                <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)' }}>Test Yourself (Quick Checkpoint)</h4>
                                                            </div>

                                                            <p style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '18px', fontSize: '1.02rem' }}>
                                                                {activeChapter.quiz.question}
                                                            </p>

                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                                                {activeChapter.quiz.options.map((option, oIdx) => {
                                                                    let btnStyle = {
                                                                        width: '100%',
                                                                        textAlign: 'left',
                                                                        padding: '14px 20px',
                                                                        borderRadius: '10px',
                                                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                                                        background: 'var(--bg-dark)',
                                                                        color: 'var(--text-muted)',
                                                                        cursor: quizSubmitted ? 'default' : 'pointer',
                                                                        fontSize: '0.9rem',
                                                                        fontWeight: 600,
                                                                        transition: '0.2s',
                                                                        outline: 'none'
                                                                    };

                                                                    if (selectedAnswer === oIdx) {
                                                                        btnStyle.border = `1px solid ${activeCourse.color}`;
                                                                        btnStyle.background = `${activeCourse.color}0a`;
                                                                        btnStyle.color = 'var(--text-main)';
                                                                    }

                                                                    if (quizSubmitted) {
                                                                        if (oIdx === activeChapter.quiz.answer) {
                                                                            btnStyle.border = '1px solid #10b981';
                                                                            btnStyle.background = 'rgba(16, 185, 129, 0.08)';
                                                                            btnStyle.color = '#10b981';
                                                                        } else if (selectedAnswer === oIdx) {
                                                                            btnStyle.border = '1px solid #ef4444';
                                                                            btnStyle.background = 'rgba(239, 68, 68, 0.08)';
                                                                            btnStyle.color = '#f87171';
                                                                        }
                                                                    }

                                                                    return (
                                                                        <button
                                                                            key={oIdx}
                                                                            disabled={quizSubmitted}
                                                                            onClick={() => setSelectedAnswer(oIdx)}
                                                                            style={btnStyle}
                                                                        >
                                                                            <span style={{ marginRight: '10px', opacity: 0.6 }}>{String.fromCharCode(65 + oIdx)}.</span> {option}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>

                                                            {!quizSubmitted ? (
                                                                <button
                                                                    disabled={selectedAnswer === null}
                                                                    onClick={() => setQuizSubmitted(true)}
                                                                    style={{
                                                                        background: 'var(--secondary-blue)',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        padding: '10px 24px',
                                                                        borderRadius: '8px',
                                                                        fontWeight: 700,
                                                                        cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                                                                        opacity: selectedAnswer === null ? 0.5 : 1,
                                                                        fontSize: '0.85rem',
                                                                        transition: '0.2s'
                                                                    }}
                                                                >
                                                                    Submit Answer
                                                                </button>
                                                            ) : (
                                                                <div className="animate-enter" style={{
                                                                    borderTop: '1px solid rgba(255,255,255,0.06)',
                                                                    paddingTop: '20px',
                                                                    marginTop: '15px'
                                                                }}>
                                                                    {selectedAnswer === activeChapter.quiz.answer ? (
                                                                        <div style={{ color: '#10b981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                                            <i className="fas fa-check-circle"></i> Correct Answer!
                                                                        </div>
                                                                    ) : (
                                                                        <div style={{ color: '#f87171', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                                            <i className="fas fa-times-circle"></i> Incorrect Answer
                                                                        </div>
                                                                    )}
                                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                                                                        <strong>Explanation:</strong> {activeChapter.quiz.explanation}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Sequential Next/Prev Buttons Navigation (W3Schools style) */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: '50px',
                                                    borderTop: 'var(--glass-border)',
                                                    paddingTop: '25px'
                                                }}>
                                                    {prevChapter ? (
                                                        <button
                                                            onClick={() => navigate(`/learn/${courseId}/${prevChapter.slug}`)}
                                                            style={{
                                                                background: 'var(--bg-panel)',
                                                                border: 'var(--glass-border)',
                                                                color: 'var(--text-main)',
                                                                padding: '10px 20px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                fontWeight: 700,
                                                                fontSize: '0.85rem',
                                                                transition: '0.2s',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px'
                                                            }}
                                                        >
                                                            <i className="fas fa-chevron-left"></i> Previous Chapter
                                                        </button>
                                                    ) : <div />}

                                                    {nextChapter ? (
                                                        <button
                                                            onClick={() => navigate(`/learn/${courseId}/${nextChapter.slug}`)}
                                                            style={{
                                                                background: activeCourse.color,
                                                                border: 'none',
                                                                color: 'white',
                                                                padding: '10px 24px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                fontWeight: 700,
                                                                fontSize: '0.85rem',
                                                                transition: '0.2s',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                boxShadow: `0 4px 12px ${activeCourse.color}33`
                                                            }}
                                                        >
                                                            Next Chapter <i className="fas fa-chevron-right"></i>
                                                        </button>
                                                    ) : <div />}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                                <h2>Chapter not found</h2>
                                                <button className="btn btn-primary" onClick={() => navigate('/learn')} style={{ marginTop: '20px' }}>Back to Catalog</button>
                                            </div>
                                        )
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Learn;
