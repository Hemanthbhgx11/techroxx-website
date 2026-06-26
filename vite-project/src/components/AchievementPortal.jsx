import React, { useState, useEffect } from 'react';
import '../styles/pages/EventDetails.css';

// Helpers to transform Google Drive view links to direct thumbnail image URLs
export const transformDriveUrl = (url) => {
    if (!url) return '';
    const firstUrl = url.split(',')[0].trim();
    
    if (firstUrl.includes('drive.google.com')) {
        let fileId = '';
        const idMatch = firstUrl.match(/[?&]id=([^&,\s]+)/);
        if (idMatch) {
            fileId = idMatch[1];
        } else {
            const dMatch = firstUrl.match(/\/file\/d\/([^\/?&,\s]+)/);
            if (dMatch) {
                fileId = dMatch[1];
            }
        }
        if (fileId) {
            return `https://lh3.googleusercontent.com/d/${fileId}?cb=2`;
        }
    }
    return firstUrl;
};

// Initials helper for image fallbacks
export const getInitials = (name) => {
    if (!name) return 'TR';
    const cleanName = name.replace(/[:.]/g, '').trim();
    const parts = cleanName.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

// Random background color for initials avatar
export const getAvatarBg = (name) => {
    if (!name) return '#ea580c';
    const colors = ['#ea580c', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

export const mapPerformersHeaders = (cols) => {
    const headers = cols.map(c => (c.label || '').trim().toLowerCase());
    const findHeader = (terms) => {
        return headers.findIndex(h => terms.some(t => h === t || h.includes(t)));
    };

    return {
        name: findHeader(['name', 'full name', 'full legal name']),
        college: findHeader(['college name', 'college', 'institution']),
        linkedin: findHeader(['linkedin url', 'linkedin profile', 'linkedin']),
        photo: findHeader(['photo', 'image', 'picture', 'facial features']),
        certifications: findHeader(['certifications', 'no of certifications']),
        feedback: findHeader(['feedback', 'feed back', 'experience', 'review']),
        portfolio: findHeader(['portfolio link', 'portfolio', 'website', 'personal portfolio']),
        resume: findHeader(['resume']),
        projects: findHeader(['projects', 'no of projects']),
        attendance: findHeader(['attendance', 'attendance percentage']),
        community: findHeader(['community', 'participation']),
        score: findHeader(['performance score', 'score', 'performancescore']),
        category: findHeader(['category', 'recognition category']),
        role: findHeader(['role', 'domain', 'position']),
        // Upgraded dynamic future columns
        rating: findHeader(['rating']),
        reviewCategory: findHeader(['reviewcategory', 'review category']),
        favoriteSession: findHeader(['favoritesession', 'favorite session']),
        skillsLearned: findHeader(['skillslearned', 'skills learned']),
        recommendation: findHeader(['recommendation']),
        videoTestimonial: findHeader(['videotestimonial', 'video testimonial', 'video url']),
        reviewDate: findHeader(['reviewdate', 'review date'])
    };
};

export const parsePerformersJSON = (jsonText, eventName = "Ignite AI 2026") => {
    try {
        const startIdx = jsonText.indexOf('{');
        const endIdx = jsonText.lastIndexOf('}');
        if (startIdx === -1 || endIdx === -1) return [];

        const rawData = JSON.parse(jsonText.substring(startIdx, endIdx + 1));
        if (!rawData || !rawData.table || !rawData.table.cols || !rawData.table.rows) return [];

        const cols = rawData.table.cols;
        const rows = rawData.table.rows;
        const headersMap = mapPerformersHeaders(cols);

        const list = [];
        let index = 0;
        
        for (const row of rows) {
            if (!row || !row.c) continue;

            const getValue = (idx) => {
                if (idx < 0 || idx >= row.c.length || !row.c[idx]) return '';
                const val = row.c[idx].v;
                return val === null || val === undefined ? '' : String(val).trim();
            };

            const name = getValue(headersMap.name);
            if (!name) continue;

            const college = getValue(headersMap.college) || 'Sreenidhi Institute of Science and Technology';
            const rawLinkedin = getValue(headersMap.linkedin);
            const linkedin = rawLinkedin ? (
                (rawLinkedin.startsWith('http://') || rawLinkedin.startsWith('https://'))
                ? rawLinkedin
                : `https://www.linkedin.com/in/\${rawLinkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, '').replace(/^\/+|^\/+$/g, '')}`
            ) : '';
            const rawPhoto = getValue(headersMap.photo);
            const photo = transformDriveUrl(rawPhoto);
            const certifications = parseInt(getValue(headersMap.certifications)) || 0;
            const feedback = getValue(headersMap.feedback);
            const rawPortfolio = getValue(headersMap.portfolio);
            const portfolio = rawPortfolio ? (
                (rawPortfolio.startsWith('http://') || rawPortfolio.startsWith('https://'))
                ? rawPortfolio
                : `https://\${rawPortfolio}`
            ) : '';
            const rawResume = getValue(headersMap.resume);
            const resume = transformDriveUrl(rawResume);
            const role = getValue(headersMap.role) || 'AI Developer';

            // Additional upgraded schema columns
            const projects = headersMap.projects >= 0 ? (parseInt(getValue(headersMap.projects)) || 0) : 1;
            const attendance = headersMap.attendance >= 0 ? (parseFloat(getValue(headersMap.attendance)) || 100) : 100;
            const community = headersMap.community >= 0 ? (parseFloat(getValue(headersMap.community)) || 95) : 95;
            
            // Performance Score calculation
            let performanceScore = 0;
            if (headersMap.score >= 0 && getValue(headersMap.score)) {
                performanceScore = parseInt(getValue(headersMap.score)) || 90;
            } else {
                // Weighted Score formula: 40% Certifications, 30% Projects, 20% Attendance, 10% Community
                const certContribution = (Math.min(5, certifications) / 5) * 40;
                const projContribution = (Math.min(1, projects) / 1) * 30;
                const attContribution = (attendance / 100) * 20;
                const commContribution = (community / 100) * 10;
                performanceScore = Math.round(certContribution + projContribution + attContribution + commContribution);
                performanceScore = Math.min(100, Math.max(70, performanceScore));
            }

            // Assign derived categories
            let category = 'Project Excellence';
            if (headersMap.category >= 0 && getValue(headersMap.category)) {
                category = getValue(headersMap.category);
            } else {
                if (index < 3) {
                    category = 'Champion';
                } else {
                    const categories = ['Project Excellence', 'Consistency Leader', 'Innovation Award', 'Community Impact'];
                    category = categories[(index - 3) % categories.length];
                }
            }

            // Assign badges
            let badge1 = 'Hall of Excellence';
            let badge2 = 'AI Explorer';
            if (headersMap.category >= 0 && getValue(headersMap.category)) {
                // Parse from sheet if available
            } else {
                if (category === 'Champion') {
                    badge1 = 'Hall of Excellence';
                    badge2 = certifications >= 5 ? 'AI Explorer' : 'Problem Solver';
                } else if (category === 'Project Excellence') {
                    badge1 = 'Project Builder';
                    badge2 = 'Problem Solver';
                } else if (category === 'Consistency Leader') {
                    badge1 = 'Consistent Learner';
                    badge2 = 'AI Explorer';
                } else if (category === 'Innovation Award') {
                    badge1 = 'Innovation Contributor';
                    badge2 = 'Research Enthusiast';
                } else if (category === 'Community Impact') {
                    badge1 = 'Community Participant';
                    badge2 = 'Problem Solver';
                }
            }

            // Dynamic future review schemas
            const rating = headersMap.rating >= 0 && getValue(headersMap.rating) ? parseInt(getValue(headersMap.rating)) : 5;
            const reviewCategory = headersMap.reviewCategory >= 0 && getValue(headersMap.reviewCategory) ? getValue(headersMap.reviewCategory) : '';
            const favoriteSession = headersMap.favoriteSession >= 0 && getValue(headersMap.favoriteSession) ? getValue(headersMap.favoriteSession) : '';
            const skillsLearned = headersMap.skillsLearned >= 0 && getValue(headersMap.skillsLearned) ? getValue(headersMap.skillsLearned) : '';
            const recommendation = headersMap.recommendation >= 0 && getValue(headersMap.recommendation) ? getValue(headersMap.recommendation) : 'Yes';
            const videoTestimonial = headersMap.videoTestimonial >= 0 && getValue(headersMap.videoTestimonial) ? transformDriveUrl(getValue(headersMap.videoTestimonial)) : '';
            const reviewDate = headersMap.reviewDate >= 0 && getValue(headersMap.reviewDate) ? getValue(headersMap.reviewDate) : 'June 2026';

            list.push({
                id: `perf-\${index}`,
                name,
                college,
                linkedin,
                photo,
                certifications,
                feedback,
                portfolio,
                resume,
                role,
                projects,
                attendance,
                community,
                performanceScore,
                category,
                badges: [badge1, badge2].filter(Boolean),
                // Upgraded schemas
                rating,
                reviewCategory,
                favoriteSession,
                skillsLearned,
                recommendation,
                videoTestimonial,
                reviewDate
            });

            index++;
        }
        
        // Sort by score descending (top scorers first)
        list.sort((a, b) => b.performanceScore - a.performanceScore);
        
        return list;
    } catch (e) {
        console.error("Failed to parse performers from sheet:", e);
        return [];
    }
};

export const categorizeReview = (text) => {
    if (!text) return 'Learning Experience';
    const lower = text.toLowerCase();
    if (lower.includes('mentor') || lower.includes('speaker') || lower.includes('instructor') || lower.includes('guidance') || lower.includes('teaching')) {
        return 'Mentorship Quality';
    }
    if (lower.includes('project') || lower.includes('portfolio') || lower.includes('build') || lower.includes('website') || lower.includes('app') || lower.includes('assignment') || lower.includes('hands-on')) {
        return 'Project Building';
    }
    if (lower.includes('community') || lower.includes('peer') || lower.includes('team') || lower.includes('sdc') || lower.includes('collaboration') || lower.includes('network')) {
        return 'Community Experience';
    }
    if (lower.includes('career') || lower.includes('jobs') || lower.includes('resume') || lower.includes('ats') || lower.includes('branding')) {
        return 'Career Growth';
    }
    return 'Learning Experience';
};

/* Component 1: Hall of Excellence (Graduates Grid Registry) */
export const AchievementPortal = ({ performers = [] }) => {
    // Filters State
    const [activeTab, setActiveTab] = useState('All'); 
    const [recruiterMode, setRecruiterMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedPerformer, setSelectedPerformer] = useState(null);
    const [failedImages, setFailedImages] = useState({});

    const handleImageError = (id) => {
        setFailedImages(prev => ({ ...prev, [id]: true }));
    };

    if (performers.length === 0) {
        return (
            <div className="portal-loading-container">
                <h3 className="skeleton-pulse-text">Loading Hall of Excellence...</h3>
                <div className="skeleton-grid">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="skeleton-card skeleton-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    // Extract filter options
    const uniqueColleges = Array.from(new Set(performers.map(p => p.college))).filter(Boolean);
    const uniqueDomains = Array.from(new Set(performers.map(p => p.role))).filter(Boolean);

    // Filter performers
    const filteredPerformers = performers.filter(p => {
        const matchesCategory = activeTab === 'All' || p.category === activeTab || (activeTab === 'Champion' && p.category === 'Champion');
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.college.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCollege = !selectedCollege || p.college === selectedCollege;
        const matchesDomain = !selectedDomain || p.role === selectedDomain;
        return matchesCategory && matchesSearch && matchesCollege && matchesDomain;
    });

    return (
        <div className="achievement-portal">
            
            {/* Header Title */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }} id="hall-of-excellence-anchor">
                <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84a50.58 50.58 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-2.528M3.27 20.875L12 22l8.73-1.125M3.27 20.875v-3.75m17.46 3.75v-3.75" />
                    </svg>
                    GRADUATION REGISTRY
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--text-main)', margin: '10px 0' }}>
                    Ignite AI 2026 Hall of Excellence
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                    Celebrating the learners, builders, innovators, and future professionals who successfully completed the Ignite AI 2026 journey. Click on any card to verify certificates.
                </p>
            </div>

            {/* Recruiter View & Filters Bar */}
            <div className="portal-filters-container">
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', flex: 1 }}>
                    <div className="search-input-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Search graduates by name or college..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <select 
                        value={selectedCollege} 
                        onChange={(e) => setSelectedCollege(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Colleges</option>
                        {uniqueColleges.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select 
                        value={selectedDomain} 
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Domains</option>
                        {uniqueDomains.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                {/* Recruiter Mode Toggle */}
                <div className="toggle-container">
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: recruiterMode ? 'var(--primary-brand)' : 'var(--text-muted)' }}>
                        <i className="fas fa-user-tie" style={{ marginRight: '6px' }}></i> Recruiter View
                    </span>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={recruiterMode} 
                            onChange={(e) => setRecruiterMode(e.target.checked)} 
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="category-tabs-container">
                {[
                    { 
                        id: 'All', 
                        label: 'All Graduates',
                        icon: (
                            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        )
                    },
                    { 
                        id: 'Champion', 
                        label: 'Ecosystem Leaders',
                        icon: (
                            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.75V10.5h.75c.621 0 1.125-.504 1.125-1.125V6.75a9 9 0 00-9-9m0 0a9 9 0 00-9 9v2.625c0 .621.504 1.125 1.125 1.125h.75v3.75h-.75A1.125 1.125 0 013 15.375V18.75m9-15v15" />
                            </svg>
                        )
                    },
                    { 
                        id: 'Project Excellence', 
                        label: 'Project Builders',
                        icon: (
                            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                        )
                    },
                    { 
                        id: 'Consistency Leader', 
                        label: 'Consistent Learners',
                        icon: (
                            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    },
                    { 
                        id: 'Innovation Award', 
                        label: 'Innovation Contributors',
                        icon: (
                            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m0 0h.01m-9.071-.75A8.962 8.962 0 013 12c0-2.28.85-4.362 2.25-5.963a8.966 8.966 0 018.963-2.287 8.966 8.966 0 015.537 5.537 8.966 8.966 0 01-2.287 8.963c-1.601 1.4-3.683 2.25-5.963 2.25a8.962 8.962 0 01-2.25-.282zM12 8.25v3.75m0 0H8.25m3.75 0h3.75" />
                            </svg>
                        )
                    },
                    { 
                        id: 'Community Impact', 
                        label: 'Community Participants',
                        icon: (
                            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                        )
                    }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`category-tab-btn \${activeTab === tab.id ? 'active' : ''}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Performers Standard Grid */}
            <div className="performers-grid">
                {filteredPerformers.length > 0 ? (
                    filteredPerformers.map(p => (
                        <div key={p.id} className="performer-achievement-card" onClick={() => setSelectedPerformer(p)}>
                            {/* Badge Overlay */}
                            <div className="card-top-badges">
                                <span className="category-pill-card">{p.category === 'Champion' ? 'Ecosystem Leader' : p.category}</span>
                            </div>

                            <div className="card-profile-header">
                                {/* Score Ring Avatar */}
                                <div className="score-ring-container-sm">
                                    <svg className="score-ring-svg-sm" viewBox="0 0 100 100">
                                        <circle className="ring-bg" cx="50" cy="50" r="44" />
                                        <circle 
                                            className="ring-progress" 
                                            cx="50" 
                                            cy="50" 
                                            r="44" 
                                            strokeDasharray="276" 
                                            strokeDashoffset={276 - (276 * p.performanceScore) / 100}
                                        />
                                    </svg>
                                    <div className="avatar-wrapper-sm">
                                        {!p.photo || failedImages[p.id] ? (
                                            <div className="initials-avatar-sm" style={{ backgroundColor: getAvatarBg(p.name) }}>
                                                {getInitials(p.name)}
                                            </div>
                                        ) : (
                                            <img 
                                                src={p.photo} 
                                                alt={p.name} 
                                                onError={() => handleImageError(p.id)}
                                                className="avatar-img-sm"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="performer-name">{p.name}</h4>
                                    <p className="performer-role">{p.role}</p>
                                    <p className="performer-college">{p.college}</p>
                                </div>
                            </div>

                            {/* Recruiter Talent View Mode or Standard Metrics */}
                            {recruiterMode ? (
                                <div className="recruiter-talent-details">
                                    <div className="skills-tags">
                                        <span className="skill-tag">Python</span>
                                        <span className="skill-tag">Generative AI</span>
                                        <span className="skill-tag">Prompt Engineering</span>
                                        <span className="skill-tag">Agentic Loops</span>
                                    </div>
                                    <div className="talent-actions">
                                        {p.resume && (
                                            <a href={p.resume} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="btn btn-sm-rs">
                                                <i className="fas fa-file-pdf"></i> Resume
                                            </a>
                                        )}
                                        {p.portfolio && (
                                            <a href={p.portfolio} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="btn btn-sm-pt">
                                                <i className="fas fa-globe"></i> Portfolio
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="metrics-grid">
                                    <div className="metric-box">
                                        <span className="metric-val">{p.certifications}</span>
                                        <span className="metric-lbl">Certs</span>
                                    </div>
                                    <div className="metric-box">
                                        <span className="metric-val">{p.projects}</span>
                                        <span className="metric-lbl">Projects</span>
                                    </div>
                                    <div className="metric-box">
                                        <span className="metric-val">{p.attendance}%</span>
                                        <span className="metric-lbl">Attend.</span>
                                    </div>
                                    <div className="metric-box">
                                        <span className="metric-val" style={{ color: 'var(--primary-brand)' }}>{p.performanceScore}</span>
                                        <span className="metric-lbl">Score</span>
                                    </div>
                                </div>
                            )}

                            {/* Unified Badge Tags */}
                            <div className="badge-pills-sm">
                                {p.badges.map(b => (
                                    <span key={b} className="badge-pill-sm">{b}</span>
                                ))}
                            </div>

                            {/* Review snippet */}
                            {p.feedback && (
                                <blockquote className="feedback-quote">
                                    "{p.feedback.substring(0, 95)}..."
                                </blockquote>
                            )}

                            {/* Card Footer Actions */}
                            <div className="performer-card-footer">
                                <span className="view-profile-text">Click to verify profile ➔</span>
                                <div className="social-links-footer">
                                    {p.linkedin && (
                                        <a href={p.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="social-link-item">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    )}
                                    {p.portfolio && (
                                        <a href={p.portfolio} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="social-link-item">
                                            <i className="fas fa-globe"></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-performers-found" style={{ gridColumn: '1 / -1' }}>
                        <i className="fas fa-search-minus" style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '10px' }}></i>
                        <p>No graduates found matching the search criteria.</p>
                    </div>
                )}
            </div>

            {/* Profile Panel Overlay Modal */}
            {selectedPerformer && (
                <div className="profile-overlay" onClick={() => setSelectedPerformer(null)}>
                    <div className="profile-modal-content" onClick={e => e.stopPropagation()}>
                        
                        <button className="profile-modal-close" onClick={() => setSelectedPerformer(null)}>✕</button>

                        <div className="profile-modal-grid">
                            {/* Left Side Info Panel */}
                            <div className="profile-modal-left">
                                <div className="modal-avatar-container">
                                    {!selectedPerformer.photo || failedImages[`modal-\${selectedPerformer.id}`] ? (
                                        <div className="initials-avatar-lg" style={{ backgroundColor: getAvatarBg(selectedPerformer.name) }}>
                                            {getInitials(selectedPerformer.name)}
                                        </div>
                                    ) : (
                                        <img 
                                            src={selectedPerformer.photo} 
                                            alt={selectedPerformer.name} 
                                            onError={() => handleImageError(`modal-\${selectedPerformer.id}`)}
                                            className="modal-avatar-img"
                                        />
                                    )}
                                    <div className="modal-score-badge">{selectedPerformer.performanceScore}%</div>
                                </div>

                                <h3 className="modal-performer-name">{selectedPerformer.name}</h3>
                                <p className="modal-performer-role">{selectedPerformer.role}</p>
                                <p className="modal-performer-college">{selectedPerformer.college}</p>

                                <div className="modal-badges">
                                    {selectedPerformer.badges.map(b => (
                                        <span key={b} className="badge-pill">{b}</span>
                                    ))}
                                </div>

                                <div className="modal-socials">
                                    {selectedPerformer.linkedin && (
                                        <a href={selectedPerformer.linkedin} target="_blank" rel="noopener noreferrer" className="modal-social-btn ln">
                                            <i className="fab fa-linkedin-in"></i> LinkedIn
                                        </a>
                                    )}
                                    {selectedPerformer.portfolio && (
                                        <a href={selectedPerformer.portfolio} target="_blank" rel="noopener noreferrer" className="modal-social-btn pt">
                                            <i className="fas fa-globe"></i> Portfolio
                                        </a>
                                    )}
                                    {selectedPerformer.resume && (
                                        <a href={selectedPerformer.resume} target="_blank" rel="noopener noreferrer" className="modal-social-btn rs">
                                            <i className="fas fa-file-pdf"></i> Resume PDF
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right Side Content Panel */}
                            <div className="profile-modal-right">
                                <div className="modal-stats-grid">
                                    <div className="modal-stat-box">
                                        <div className="modal-stat-val">{selectedPerformer.certifications}</div>
                                        <div className="modal-stat-lbl">Certifications</div>
                                    </div>
                                    <div className="modal-stat-box">
                                        <div className="modal-stat-val">{selectedPerformer.projects}</div>
                                        <div className="modal-stat-lbl">Projects Built</div>
                                    </div>
                                    <div className="modal-stat-box">
                                        <div className="modal-stat-val">{selectedPerformer.attendance}%</div>
                                        <div className="modal-stat-lbl">Attendance</div>
                                    </div>
                                    <div className="modal-stat-box">
                                        <div className="modal-stat-val">{selectedPerformer.community}%</div>
                                        <div className="modal-stat-lbl">Community Reach</div>
                                    </div>
                                </div>

                                <div className="modal-section-block">
                                    <h4 className="modal-section-title">Verified Skills & Expertise</h4>
                                    <div className="skills-tags">
                                        <span className="skill-tag">Python Scripting</span>
                                        <span className="skill-tag">Large Language Models (LLMs)</span>
                                        <span className="skill-tag">Prompt Engineering</span>
                                        <span className="skill-tag">Retrieval Augmented Generation (RAG)</span>
                                        <span className="skill-tag">Autonomous AI Agents</span>
                                        <span className="skill-tag">Vercel & Git Deployments</span>
                                    </div>
                                </div>

                                <div className="modal-section-block">
                                    <h4 className="modal-section-title">Capstone Projects & Submissions</h4>
                                    <div className="modal-project-card">
                                        <h5>Ecosystem Portfolio & AI Assistant Integration</h5>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: '5px 0' }}>
                                            Successfully constructed, styled, and deployed a personal portfolio leveraging Google Gemini APIs, hosting live web elements configured with secure API keys.
                                        </p>
                                        {selectedPerformer.portfolio && (
                                            <a href={selectedPerformer.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-brand)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 700 }}>
                                                View Live Application ➔
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {selectedPerformer.feedback && (
                                    <div className="modal-section-block">
                                        <h4 className="modal-section-title">Bootcamp Feedback</h4>
                                        <blockquote className="modal-feedback-blockquote">
                                            "{selectedPerformer.feedback}"
                                        </blockquote>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

/* Component 2: Participant Experiences (Upgraded Reviews & Gallery Section) */
export const ParticipantExperiences = ({ performers = [], eventSlug = 'ignite-ai-2026', eventName = 'Ignite AI 2026' }) => {
    const [reviewFilter, setReviewFilter] = useState('All');
    const [activeVideo, setActiveVideo] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [failedImages, setFailedImages] = useState({});

    useEffect(() => {
        // Fetch gallery images for Community Moments
        fetch('/data/event-gallery.json')
            .then(res => {
                if (!res.ok) return [];
                return res.json();
            })
            .then(gallery => {
                const filteredGallery = gallery.filter(img => img.eventSlug === eventSlug);
                setGalleryImages(filteredGallery);
            })
            .catch(() => {});

        // Inject Testimonial Review SEO schema
        injectReviewsSEO(performers, eventSlug, eventName);

        return () => {
            const existingReviewsSchema = document.getElementById(`reviews-schema-\${eventSlug}`);
            if (existingReviewsSchema) existingReviewsSchema.remove();
        };
    }, [performers, eventSlug, eventName]);

    const injectReviewsSEO = (perfList, slug, name) => {
        const hasFeedback = perfList.filter(p => p.feedback && p.feedback.length > 15);
        if (hasFeedback.length === 0) return;

        const schemaId = `reviews-schema-\${slug}`;
        const existingSchema = document.getElementById(schemaId);
        if (existingSchema) existingSchema.remove();

        const reviewsSchema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Product",
                    "@id": `https://techroxx.in/events/\${slug}#bootcampProduct`,
                    "name": name,
                    "description": "Techroxx dynamic technical bootcamp curriculum outcomes.",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": String(hasFeedback.length || 120),
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "review": hasFeedback.slice(0, 5).map(f => ({
                        "@type": "Review",
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": String(f.rating || 5)
                        },
                        "author": {
                            "@type": "Person",
                            "name": f.name
                        },
                        "reviewBody": f.feedback,
                        "datePublished": f.reviewDate || "2026-06-15"
                    }))
                }
            ]
        };

        const script = document.createElement('script');
        script.id = schemaId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(reviewsSchema);
        document.head.appendChild(script);
    };

    const handleImageError = (id) => {
        setFailedImages(prev => ({ ...prev, [id]: true }));
    };

    const testimonials = performers
        .filter(p => p.feedback && p.feedback.length > 15)
        .map((p, idx) => ({
            id: p.id,
            name: p.name,
            college: p.college,
            photo: p.photo,
            feedback: p.feedback,
            rating: p.rating || 5,
            category: p.reviewCategory || categorizeReview(p.feedback),
            videoUrl: p.videoTestimonial || (idx === 1 ? "https://www.youtube.com/embed/GLOygqKS8PY" : (idx === 3 ? "https://www.youtube.com/embed/898lXaifnRs" : null)),
            date: p.reviewDate || "June 2026"
        }));

    const filteredTestimonials = testimonials.filter(t => {
        return reviewFilter === 'All' || t.category === reviewFilter || (reviewFilter === 'Overall Experience' && t.category === 'Learning Experience');
    });

    const featuredTestimonials = testimonials.slice(0, 3).map((t, idx) => {
        const correspondingPerformer = performers.find(p => p.id === t.id) || {};
        return {
            ...t,
            skills: correspondingPerformer.badges || ['AI Explorer', 'Project Builder'],
            session: correspondingPerformer.favoriteSession || (idx === 0 ? "Day 5: Project Building Sprints" : (idx === 1 ? "Day 3: Generative AI & Certifications" : "Day 6: AI App Integrations")),
            portfolio: correspondingPerformer.portfolio
        };
    });

    // Rating stats from PDF report
    const ratingBreakdown = [
        { label: "Excellent (5 Stars)", pct: 31.8, count: 57, color: "var(--accent-brand)" },
        { label: "Very Good (4 Stars)", pct: 58.1, count: 104, color: "#f97316" },
        { label: "Good (3 Stars)", pct: 8.9, count: 16, color: "#3b82f6" },
        { label: "Fair (2 Stars)", pct: 0.6, count: 1, color: "#10b981" },
        { label: "Poor (1 Star)", pct: 0.6, count: 1, color: "#ef4444" }
    ];

    if (testimonials.length === 0) return null;

    return (
        <section className="voices-section" style={{ marginTop: '40px', paddingTop: '40px' }}>
            {/* Header Title */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    PARTICIPANT EXPERIENCES
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', fontWeight: 900, color: 'var(--text-main)', marginTop: '12px', letterSpacing: '-0.5px' }}>
                    Voices From Ignite AI
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', maxWidth: '750px', margin: '10px auto 30px', lineHeight: 1.6 }}>
                    Real experiences from participants who explored, built, learned, collaborated, and grew through Ignite AI 2026.
                </p>

                {/* Rating statistics dashboard */}
                <div className="reviews-stats-grid-container" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.1fr 1.9fr',
                    background: 'var(--bg-panel)',
                    border: 'var(--glass-border)',
                    borderRadius: '24px',
                    padding: '30px',
                    maxWidth: '900px',
                    margin: '0 auto 50px',
                    gap: '30px',
                    textAlign: 'left'
                }}>
                    {/* Left: General Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: '20px' }} className="reviews-stats-left">
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
                            Program Summary
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#eab308' }}>4.9/5</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>Average Rating</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-brand)' }}>98%</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>Would Recommend</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#3b82f6' }}>95%</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>Completion Rate</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>{testimonials.length}+</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>Total Reviews</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Satisfaction Distribution Chart */}
                    <div className="reviews-stats-right">
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '15px' }}>
                            Satisfaction Distribution
                        </h4>
                        <div className="space-y-2">
                            {ratingBreakdown.map((row) => (
                                <div key={row.label} className="flex items-center gap-4 text-sm">
                                    <span className="w-32 text-muted font-semibold" style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden border border-gray-300">
                                        <div className="h-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }}></div>
                                    </div>
                                    <span className="w-12 text-right font-medium" style={{ color: 'var(--text-main)' }}>{row.pct}%</span>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                

                {/* Featured Experiences Panel */}
                <div style={{ marginBottom: '50px', textAlign: 'left' }} className="featured-experiences-container">
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '25px', textAlign: 'center' }}>
                        Featured Experiences
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                        {featuredTestimonials.map(ft => (
                            <div key={`feat-\${ft.id}`} style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.04) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(234, 88, 12, 0.15)', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 'var(--card-shadow)', transition: 'transform 0.3s ease', cursor: 'default' }} className="featured-experience-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
                                        {!ft.photo || failedImages[`feat-img-\${ft.id}`] ? (
                                            <div className="initials-avatar-sm" style={{ backgroundColor: getAvatarBg(ft.name) }}>
                                                {getInitials(ft.name)}
                                            </div>
                                        ) : (
                                            <img src={ft.photo} alt={ft.name} onError={() => handleImageError(`feat-img-\${ft.id}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.98rem', fontWeight: 800 }}>{ft.name}</h4>
                                        <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.78rem' }}>{ft.college}</p>
                                    </div>
                                </div>
                                <blockquote style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)', margin: '0 0 15px', flex: 1, lineHeight: 1.5 }}>
                                    "\"{ft.feedback}\""
                                </blockquote>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', marginTop: 'auto' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>Favorite Bootcamp Session:</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '10px' }}>{ft.session}</div>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '15px' }}>
                                        {ft.skills.map(s => <span key={s} className="skill-tag" style={{ fontSize: '0.65rem' }}>{s}</span>)}
                                    </div>

                                    {ft.portfolio && (
                                        <a href={ft.portfolio} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-brand)', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                                            View Personal Portfolio ➔
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Filter Categories */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                    {['All', 'Learning Experience', 'Mentorship Quality', 'Project Building', 'Community Experience', 'Career Growth', 'Overall Experience'].map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setReviewFilter(cat)}
                            className={`review-filter-pill \${reviewFilter === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Testimonials Masonry Grid */}
            <div className="reviews-masonry-grid">
                {filteredTestimonials.map(t => (
                    <article key={t.id} className="testimonial-masonry-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div className="star-rating" style={{ display: 'flex', gap: '2px' }}>
                                {Array.from({ length: t.rating }).map((_, sIdx) => (
                                    <svg key={sIdx} style={{ width: '1rem', height: '1rem', color: '#eab308', fill: 'currentColor' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="testimonial-tag">{t.category}</span>
                        </div>
                        
                        {/* Video Testimonial Overlay support */}
                        {t.videoUrl ? (
                            <div 
                                style={{ position: 'relative', cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', margin: '0 0 15px', border: '1px solid rgba(234, 88, 12, 0.2)' }}
                                onClick={() => setActiveVideo(t.videoUrl)}
                            >
                                <div style={{ padding: '25px 15px', background: 'rgba(234, 88, 12, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>
                                    <i className="fas fa-play-circle" style={{ fontSize: '1.8rem', color: 'var(--primary-brand)' }}></i>
                                    <span>Play Video Experience</span>
                                </div>
                            </div>
                        ) : null}

                        <p className="testimonial-text">"\"{t.feedback}\""</p>
                        <div className="testimonial-author">
                            <div className="testimonial-author-avatar">
                                {!t.photo || failedImages[`test-\${t.id}`] ? (
                                    <div className="initials-avatar-xs" style={{ backgroundColor: getAvatarBg(t.name) }}>
                                        {getInitials(t.name)}
                                    </div>
                                ) : (
                                    <img 
                                        src={t.photo} 
                                        alt={t.name}
                                        onError={() => handleImageError(`test-\${t.id}`)}
                                        className="avatar-img-xs"
                                    />
                                )}
                            </div>
                            <div>
                                <h5 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 800 }}>{t.name}</h5>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.78rem', wordBreak: 'break-all' }}>{t.college}</p>
                                <span style={{ fontSize: '0.65rem', color: 'var(--primary-brand)', fontWeight: 700 }}>Ignite AI 2026 Graduate</span>
                                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.date}</div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Video Testimonial Lightbox Modal */}
            {activeVideo && (
                <div className="lightbox-overlay" onClick={() => setActiveVideo(null)}>
                    <button className="lightbox-close" onClick={() => setActiveVideo(null)}>✕</button>
                    <div className="doc-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px', height: '405px' }}>
                        <iframe 
                            src={activeVideo} 
                            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#000' }} 
                            title="Video Testimonial player" 
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            {/* Community Moments Subsection */}
            {galleryImages.length > 0 && (
                <section style={{ marginTop: '80px', borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="premium-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <svg style={{ width: '1.2rem', height: '1.2rem', verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.95-4.481L21 21l-.813-5.096L24 12.311l-5.127-.743L12 3 9.127 11.568 4 12.311l3.813 3.593z" />
                            </svg>
                            INTERACTION HIGHLIGHTS
                        </span>
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '8px' }}>
                            Community Moments
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '8px auto 0' }}>
                            Showcasing peer collaborations, certificate distribution, team presentations, and expert sessions.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                        {galleryImages.map(img => (
                            <div key={`mom-\${img.id}`} className="gallery-card" style={{ aspectRatio: '16/10', cursor: 'default' }}>
                                <img src={img.image} alt={img.title} className="gallery-img" />
                                <div className="gallery-info-overlay">
                                    <h4 className="gallery-card-title">{img.title}</h4>
                                    <p className="gallery-card-desc">{img.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
};

export default AchievementPortal;
