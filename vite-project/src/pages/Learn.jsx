import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { placementCompanies } from '../data/constants';

// Dynamic categories extraction directly from keys of placementCompanies data structure
const categories = ['All Categories', ...Object.keys(placementCompanies)];

// Directory catalog containing verified Placement Directory data
const ecomCatalog = [
    {
        type: 'guide',
        category: 'Careers & Recruitment',
        slug: 'placement-guide',
        title: 'Placement Directory',
        difficulty: 'Directory',
        chapters: Object.values(placementCompanies).flat().length,
        price: 'Free',
        isPaid: false,
        description: 'Explore direct recruitment portals, official careers pages, and job application pathways for top companies across all industries.',
        features: ['Direct HR Portal Links', 'Multi-Sector Coverage', 'Daily Recruitment Updates'],
        content: "<h3>Corporate Career Directory & Application Pathways</h3><p>Access the official job application and career portals of leading companies in various sectors. To receive real-time updates on active drives and job postings, join our community.</p>"
    }
];

const Learn = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Active Selection Reading State
    const [selectedGuide, setSelectedGuide] = useState(null);
    
    // Catalog Filtering States
    const [catalogSearch, setCatalogSearch] = useState('');
    
    // Sidebar Reading States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeBranch, setActiveBranch] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState(''); // Placement directories search

    // Synchronize selected guide during render phase to avoid cascading renders
    if (slug) {
        const active = ecomCatalog.find(g => g.slug === slug);
        if (active) {
            if (selectedGuide !== active) {
                setSelectedGuide(active);
            }
        } else {
            if (selectedGuide !== null) {
                setSelectedGuide(null);
            }
        }
    } else {
        if (selectedGuide !== null) {
            setSelectedGuide(null);
        }
    }

    // Handle Item Selection Click from Catalog
    const handleItemClick = (item) => {
        navigate(`/learn/${item.slug}`);
    };

    // Filter Ecom Catalog Items
    const filteredCatalog = ecomCatalog.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(catalogSearch.toLowerCase()) || 
            item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(catalogSearch.toLowerCase());
        return matchesSearch;
    });

    const getCourseIcon = (slug) => {
        return { icon: 'fas fa-briefcase', color: 'var(--primary-brand)' };
    };

    return (
        <>
            {selectedGuide && (
                <style>{`
                    @media (min-width: 993px) {
                        footer {
                            margin-left: 320px !important;
                            transition: margin-left 0.3s ease;
                        }
                    }
                `}</style>
            )}

            {!selectedGuide ? (
                /* --- SECTION A: HIGH-END E-COMMERCE LEARNING CATALOG --- */
                <section className="section-padding learn-catalog-page animate-enter" style={{ background: 'var(--bg-dark)', padding: '120px 0 80px 0' }}>
                    
                    {/* Parallax style top banner */}
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
                                    <i className="fas fa-graduation-cap"></i> Tech Roxx Careers
                                </span>
                                <h1 className="page-header-title" style={{ fontSize: '3.2rem', fontWeight: 900, marginBottom: '15px', color: '#ffffff' }}>Placement Career Directory</h1>
                                <p className="page-header-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6 }}>
                                    Explore direct career and recruitment portals of top companies across multiple industries. Secure your future with verified industry linkages.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container" style={{ marginTop: '50px' }}>
                        
                        {/* W3Schools style catalog controls panel */}
                        <div className="catalog-control-panel glass-panel" style={{ display: 'flex', gap: '20px', background: 'var(--bg-card)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {/* Search */}
                            <div className="catalog-search-wrapper" style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--text-muted)' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search directories..." 
                                    value={catalogSearch}
                                    onChange={(e) => setCatalogSearch(e.target.value)}
                                    className="catalog-search-input"
                                    style={{ width: '100%', padding: '12px 15px 12px 42px', borderRadius: '10px', border: 'var(--glass-border)', outline: 'none', background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                                />
                            </div>
                        </div>

                        {/* E-Commerce Cards Grid */}
                        {filteredCatalog.length === 0 ? (
                            <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', border: 'var(--glass-border)', borderRadius: '24px', marginTop: '30px' }}>
                                <i className="fas fa-search-minus" style={{ fontSize: '3rem', color: 'var(--primary-brand)', marginBottom: '15px' }}></i>
                                <h3 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800 }}>No Directory Found</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto' }}>Please adjust your search keywords.</p>
                            </div>
                        ) : (
                            <div className="ecom-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
                                {filteredCatalog.map(item => {
                                    const { icon, color } = getCourseIcon(item.slug);
                                    return (
                                        <div 
                                            key={item.slug} 
                                            className="ecom-catalog-card"
                                            style={{
                                                background: 'var(--bg-card)',
                                                border: 'var(--glass-border)',
                                                borderRadius: '20px',
                                                padding: '30px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: 'var(--card-shadow)',
                                                transition: 'transform 0.3s ease, border-color 0.3s ease'
                                            }}
                                        >
                                            <div className="card-decor-glow" style={{ position: 'absolute', top: '-10px', right: '-10px', width: '130px', height: '130px', background: `radial-gradient(circle, rgba(234, 88, 12, 0.06) 0%, transparent 70%)`, filter: 'blur(10px)', pointerEvents: 'none' }}></div>
                                            
                                            {/* Header Tags */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                                <span style={{ 
                                                    background: 'rgba(234, 88, 12, 0.08)',
                                                    color: 'var(--primary-brand)',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 800,
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    Directory 📖
                                                </span>
                                                <span style={{ background: 'rgba(100, 116, 139, 0.1)', color: 'var(--secondary-blue)', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                                                    Free 🎁
                                                </span>
                                            </div>

                                            {/* Title & Info */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-dark)', border: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: color }}>
                                                    <i className={icon}></i>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-head)', margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.category}</span>
                                                </div>
                                            </div>

                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>{item.description}</p>

                                            {/* Feature Checks */}
                                            <ul style={{ padding: 0, listStyle: 'none', margin: '0 0 25px 0', display: 'grid', gap: '8px' }}>
                                                {item.features.slice(0, 3).map((f, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                                        <i className="fas fa-check" style={{ color: 'var(--primary-brand)', fontSize: '0.72rem' }}></i> {f}
                                                    </li>
                                                ))}
                                            </ul>
 
                                            {/* Price and Action button */}
                                            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary-brand)', fontFamily: 'var(--font-head)' }}>Free</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>
                                                        {item.chapters} Companies Listed
                                                    </span>
                                                </div>
 
                                                <button
                                                    onClick={() => handleItemClick(item)}
                                                    className="btn"
                                                    style={{
                                                        background: 'var(--secondary-blue)',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '10px 20px',
                                                        borderRadius: '30px',
                                                        fontWeight: 700,
                                                        fontSize: '0.82rem',
                                                        cursor: 'pointer',
                                                        transition: '0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <i className="fas fa-folder-open"></i> Open Directory
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
 
                    {/* CSS Rules specifically for Card Hover Lifting */}
                    <style>{`
                        .ecom-catalog-card:hover {
                            transform: translateY(-6px);
                            border-color: var(--primary-brand) !important;
                            box-shadow: var(--card-hover-shadow) !important;
                        }
                    `}</style>
                </section>
            ) : (
                /* --- SECTION B: INTERACTIVE READING WORKSPACE (PRESERVED W3SCHOOLS PANEL WITH DYNAMIC CURRICULUM SIDEBAR) --- */
                <>
                    {isSidebarOpen && (
                        <div 
                            className="sidebar-overlay"
                            onClick={() => setIsSidebarOpen(false)}
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 900, background: 'rgba(0,0,0,0.4)', display: 'none' }}
                        />
                    )}
                    
                    <div className="guides-layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
                        {/* Sidebar Navigator Index */}
                        <div className={`guides-sidebar-panel ${isSidebarOpen ? 'open' : 'collapsed'}`} style={{ width: '320px', background: 'var(--bg-panel)', borderRight: 'var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '100px 20px 20px 20px', position: 'fixed', height: '100vh', top: 0, left: 0, zIndex: 950, transition: 'transform 0.3s ease' }}>
                            <button 
                                onClick={() => navigate('/learn')}
                                className="sidebar-dashboard-back"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '12px 15px', borderRadius: '8px', border: 'var(--glass-border)', background: 'var(--bg-dark)', color: 'var(--text-main)', cursor: 'pointer', fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, transition: '0.2s', marginBottom: '25px' }}
                            >
                                <i className="fas fa-th-large"></i> Back to Catalog Directory
                            </button>

                            {selectedGuide.slug === 'placement-guide' && (
                                /* Placement directories index */
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
                                        {categories.map(category => {
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
                            )}
                        </div>

                        {/* Right Content Reading Area */}
                        <div className="guides-content-area" style={{ flex: 1, paddingLeft: '320px', transition: 'padding-left 0.3s ease' }}>
                            <div className="guides-main-container" style={{ padding: '120px 40px 80px 40px', maxWidth: '1000px', margin: '0 auto' }}>
                                
                                {/* Breadcrumb back navigation link */}
                                <div 
                                    className="reading-back-breadcrumb" 
                                    onClick={() => navigate('/learn')} 
                                    style={{ marginBottom: '25px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s' }}
                                >
                                    <i className="fas fa-th-large"></i> Back to Hub Catalog
                                </div>

                                <div className="mobile-toggle-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <button 
                                        onClick={() => navigate('/learn')}
                                        className="back-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'none', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <i className="fas fa-th-large"></i> Back to Hub
                                    </button>
                                    
                                    {/* Mobile Sidebar Toggle */}
                                    <button 
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="back-btn mobile-only-toggle-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'none', gap: '8px', alignItems: 'center', fontWeight: 700, fontSize: '0.8rem' }}
                                    >
                                        <i className={`fas ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'}`}></i>
                                        {isSidebarOpen ? 'Close Menu' : 'Sectors'}
                                    </button>
                                </div>

                                {/* Reading Panel Area */}
                                <div 
                                    className="glass-panel guides-reading-pane animate-enter" 
                                    style={{ background: 'var(--bg-panel)', borderRadius: '24px', border: 'var(--glass-border)', padding: '45px', boxShadow: 'var(--card-shadow)', minHeight: '400px' }}
                                >
                                    <div className="animate-enter guide-content-render">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                            <span style={{ background: 'rgba(234, 88, 12, 0.08)', color: 'var(--primary-brand)', fontSize: '0.78rem', fontWeight: 800, padding: '5px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {selectedGuide.category}
                                            </span>
                                            <span className="catalog-difficulty-badge directory">
                                                {selectedGuide.difficulty}
                                            </span>
                                        </div>

                                        {/* Static directory / placement lists */}
                                        <div className="static-guide-content-reader">
                                            <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', margin: '15px 0 25px', borderBottom: '1px solid rgba(234, 88, 12, 0.1)', paddingBottom: '15px' }}>
                                                {selectedGuide.title}
                                            </h1>
                                            
                                            <div 
                                                dangerouslySetInnerHTML={{ __html: selectedGuide.content }} 
                                                className="html-article-body"
                                                style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.02rem' }}
                                            />

                                            {selectedGuide.slug === 'placement-guide' && (
                                                <div style={{ marginTop: '30px' }} className="animate-enter">
                                                    {/* Placement Success Dashboard Banner */}
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

                                                    {/* Company Directory List */}
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
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Desktop Responsive Layout overrides for Reader Workspace */}
                    <style>{`
                        @media (max-width: 992px) {
                            .guides-sidebar-panel {
                                transform: translateX(-100%);
                            }
                            .guides-sidebar-panel.open {
                                transform: translateX(0);
                            }
                            .sidebar-overlay {
                                display: block !important;
                            }
                            .guides-content-area {
                                padding-left: 0 !important;
                            }
                            .mobile-only-toggle-btn {
                                display: flex !important;
                            }
                            .back-btn {
                                display: flex !important;
                            }
                            .guides-main-container {
                                padding: 100px 20px 60px 20px !important;
                            }
                            .guides-reading-pane {
                                padding: 30px 20px !important;
                                border-radius: 16px !important;
                            }
                        }
                        @media (max-width: 600px) {
                            .guides-main-container {
                                padding: 80px 10px 40px 10px !important;
                            }
                            .guides-reading-pane {
                                padding: 25px 15px !important;
                                border-radius: 12px !important;
                            }
                            .reading-back-breadcrumb {
                                margin-bottom: 15px !important;
                            }
                        }
                    `}</style>
                </>
            )}
        </>
    );
};

export default Learn;
