import { useEffect, useState } from 'react';
import '../styles/pages/About.css';
import { Link } from 'react-router-dom';
import { loadTeamData } from '../utils/dataLoader';

const About = () => {
    const [team, setTeam] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeamData()
            .then(data => {
                setTeam(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching team inside About:', err);
                setLoading(false);
            });
    }, []);

    const ceoMember = team.find(member => member.isCeo || member.role.toLowerCase().includes('ceo'));
    const cooMember = team.find(member => member.isCoo || member.role.toLowerCase().includes('coo'));
    const coreTeam = team.filter(member => !member.isCeo && !member.isCoo && !member.isIntern && !member.role.toLowerCase().includes('ceo') && !member.role.toLowerCase().includes('coo') && !member.role.toLowerCase().includes('intern'));

    // JSON-LD Structured Schema for search engines to index core team images under techroxx query
    const teamSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Tech Roxx - Leadership & Team",
        "description": "Meet the leadership and core engineering team behind Tech Roxx Hyderabad, bridging the gap between academia and corporate environments.",
        "publisher": {
            "@type": "Organization",
            "name": "Tech Roxx",
            "url": "https://techroxx.in"
        },
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": team.map((member, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "item": {
                    "@type": "Person",
                    "name": member.name,
                    "jobTitle": member.role,
                    "image": `https://techroxx.in${member.image}`,
                    "worksFor": {
                        "@type": "Organization",
                        "name": "Tech Roxx"
                    }
                }
            }))
        }
    };

    const getSocialIcon = (key) => {
        switch (key) {
            case 'linkedin': return 'fab fa-linkedin-in';
            case 'twitter': return 'fab fa-twitter';
            case 'github': return 'fab fa-github';
            case 'instagram': return 'fab fa-instagram';
            default: return 'fas fa-link';
        }
    };

    const handleImageError = (e, name = '') => {
        e.target.onerror = null;
        if (name.toLowerCase().includes('hemanth')) {
            e.target.src = '/assets/images/team/hemanth.jpg';
        } else {
            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop';
        }
    };

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

    return (
        <>
            <script type="application/ld+json">
                {JSON.stringify(teamSchema)}
            </script>
            {/* Modal Detail Overlay Box */}
            {selectedMember && (
                <div className="modal-backdrop" onClick={() => setSelectedMember(null)}>
                    <div className="modal-content-wrapper glass-panel" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedMember(null)} aria-label="Close details">
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="modal-body-layout">
                            <div className="modal-image-pane">
                                <div className="modal-image-pane-bg"></div>
                                <img 
                                    src={selectedMember.image} 
                                    alt={`${selectedMember.name} - ${selectedMember.role} at Tech Roxx Hyderabad`} 
                                    onError={(e) => handleImageError(e, selectedMember.name)}
                                    className="modal-profile-img"
                                />
                            </div>
                            <div className="modal-info-pane">
                                <span className="modal-badge-role">Core Leader Profile</span>
                                <h2 className="modal-member-name">{selectedMember.name}</h2>
                                <h4 className="modal-member-role">{selectedMember.role}</h4>
                                
                                <div className="modal-bio-section">
                                    <p className="modal-bio-text">
                                        {selectedMember.bio || getFallbackBio(selectedMember.name, selectedMember.role)}
                                    </p>
                                </div>
                                
                                <div className="modal-extra-details">
                                    <div className="detail-row">
                                        <span className="detail-lbl"><i className="fas fa-envelope"></i> Email:</span>
                                        <span className="detail-val">{selectedMember.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@techroxx.in</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-lbl"><i className="fas fa-map-marker-alt"></i> Location:</span>
                                        <span className="detail-val">TechRoxx HQ, India</span>
                                    </div>
                                </div>
                                
                                <div className="modal-action-bar">
                                    {Object.entries(selectedMember.socials || {}).map(([key, url]) => (
                                        url ? (
                                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`btn btn-social-large ${key}`} onClick={(e) => e.stopPropagation()}>
                                                <i className={getSocialIcon(key)}></i> Connect on {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </a>
                                        ) : null
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STUNNING PARALLAX HERO SECTION */}
            <div className="about-hero">
                <div className="about-hero-glow-1"></div>
                <div className="about-hero-glow-2"></div>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="about-hero-content">
                        <span className="hero-badge">Pioneering Next-Gen Learning</span>
                        <h1 className="about-hero-title">The Tech Roxx Ecosystem</h1>
                        <p className="about-hero-desc">
                            We are a premier technical training and career development academy, designed to bridge the gap between academic education and industry performance. Through state-of-the-art labs, real-time industrial projects, and elite mentorship, we prepare students for engineering dominance.
                        </p>
                        <div className="hero-action-buttons">
                            <a href="#ecosystem-hub" className="btn btn-primary">Explore Our Ecosystem</a>
                            <Link to="/contact" className="btn btn-secondary" style={{ marginLeft: '15px' }}>Enroll Today</Link>
                        </div>
                    </div>
                </div>
            </div>



            {/* WHO WE ARE - VALUES & MISSION */}
            <section className="about-intro-section" id="who-we-are">
                <div className="container">
                    <div className="about-intro-wrapper">
                        <div className="about-intro-text">
                            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 15px 0' }}>Our Core Mission</h2>
                            <p className="intro-lead">
                                At Tech Roxx, we do not teach theory; we build competencies. Our educational philosophy revolves around continuous practical engagement, experimental labs, and direct industry alignment.
                            </p>
                            <p className="intro-body">
                                Students from Computing, Electronics, and Business disciplines join Tech Roxx to escape passive textbook studying. Here, they engage in **Vibe Coding** with AI assistants, build cloud-connected IoT home automation nodes, design production-grade printed circuit boards (PCBs), and master international university admissions processes. We provide the ecosystem that powers professional technical success.
                            </p>
                        </div>
                        <div className="about-intro-visual">
                            <div className="visual-box">
                                <div className="glowing-border-element"></div>
                                <div className="visual-content">
                                    <i className="fas fa-cubes visual-icon"></i>
                                    <h4>360° Academic & Advisory Support</h4>
                                    <p>From programming foundations to securing study-abroad visas, we handle the entire trajectory of student growth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE COMPLETE TECH ROXX ECOSYSTEM HUB */}
            <section className="ecosystem-hub-section" id="ecosystem-hub">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="section-pretitle">Interactive Services Directory</span>
                        <h2 className="section-title">An Interconnected Technical Network</h2>
                        <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
                            Tech Roxx integrates three major pillars: advanced academic training, corporate development programs, and multi-sector consultancy. Explore each wing and navigate to its dedicated page below.
                        </p>
                    </div>

                    <div className="ecosystem-columns-container">
                        
                        {/* PILLAR 1: ACADEMIC DEPARTMENTS */}
                        <div className="ecosystem-col-glass">
                            <div className="col-indicator-bar blue-glow"></div>
                            <div className="col-header-wrap">
                                <div className="col-icon-box"><i className="fas fa-graduation-cap"></i></div>
                                <h3>Academic Departments</h3>
                            </div>
                            <p className="col-teaser">Rigorous training curricula mapping core engineering paths directly to corporate engineering tasks.</p>
                            
                            <div className="ecosystem-subcards">
                                <div className="ecosystem-subcard">
                                    <h5>Computing & Systems (CSE / MCA / BCA)</h5>
                                    <p>Master Python syntax, Data Structures (DSA), AI/ML modeling, Computer Vision, Generative AI (LLMs, RAG, autonomous agents), MERN Full Stack, and AI-assisted programming (Vibe Coding).</p>
                                    <Link to="/services/computing" className="ecosystem-action-link">Explore Computing Tracks <i className="fas fa-arrow-right"></i></Link>
                                </div>
                                <div className="ecosystem-subcard">
                                    <h5>Electra Engineering (ECE / EEE / EIE)</h5>
                                    <p>Connect physical devices to the cloud. Focuses on Internet of Things (IoT) protocols, Embedded Systems (Arduino, ESP32), Microcontrollers & Sensors, and EDA PCB Design.</p>
                                    <Link to="/services/electra" className="ecosystem-action-link">Explore Electra Tracks <i className="fas fa-arrow-right"></i></Link>
                                </div>
                                <div className="ecosystem-subcard">
                                    <h5>Arts, Management & Analytics</h5>
                                    <p>Equip yourself with digital corporate tools. Covers Product Management with AI, HR Management + Data Analytics, Business Analytics, and SAP ERP ecosystems.</p>
                                    <Link to="/services/arts-management" className="ecosystem-action-link">Explore Management Tracks <i className="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        {/* PILLAR 2: ECOSYSTEM PROGRAMS */}
                        <div className="ecosystem-col-glass">
                            <div className="col-indicator-bar red-glow"></div>
                            <div className="col-header-wrap">
                                <div className="col-icon-box"><i className="fas fa-laptop-code"></i></div>
                                <h3>Ecosystem Programs</h3>
                            </div>
                            <p className="col-teaser">Ongoing career events, community gatherings, hackathons, and placement pipelines to launch careers.</p>
                            
                            <div className="ecosystem-subcards">
                                <div className="ecosystem-subcard">
                                    <h5>Placement Assistance Guide</h5>
                                    <p>Unlock structured job listings, resume mapping, and placement preparation for Tier-1 Product giants (Google, Qualcomm, Amazon) and Tier-2 Service firms (TCS, Infosys).</p>
                                    <Link to="/services/programs/placement" className="ecosystem-action-link">Open Placement Guide <i className="fas fa-arrow-right"></i></Link>
                                </div>
                                <div className="ecosystem-subcard">
                                    <h5>Internship Assistance Program</h5>
                                    <p>Acquire internship credentials by working on real-world projects in collaboration with corporate networks with active WhatsApp group updates.</p>
                                    <Link to="/services/programs/internships" className="ecosystem-action-link">Open Internship Details <i className="fas fa-arrow-right"></i></Link>
                                </div>
                                <div className="ecosystem-subcard">
                                    <h5>Workshops, Hackathons & Webinars</h5>
                                    <p>Learn new skills rapidly through community-wide webinars, hands-on weekend hackathons, and past events showcases (such as our Instagram IoT workshops).</p>
                                    <Link to="/services" className="ecosystem-action-link">Explore All Events <i className="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        {/* PILLAR 3: CONSULTANCY WING */}
                        <div className="ecosystem-col-glass">
                            <div className="col-indicator-bar purple-glow"></div>
                            <div className="col-header-wrap">
                                <div className="col-icon-box"><i className="fas fa-handshake"></i></div>
                                <h3>Consultancy Wings</h3>
                            </div>
                            <p className="col-teaser">Specialized professional advisory divisions, visa processing units, and industrial R&D solutions.</p>
                            
                            <div className="ecosystem-subcards">
                                <div className="ecosystem-subcard">
                                    <h5>Foreign Education Counselling</h5>
                                    <p>Complete advising for school and college admissions abroad, university profile matching, visa processing, and international scholarship applications.</p>
                                    <Link to="/services/consultancy/foreign-education" className="ecosystem-action-link">Open Study Abroad Advising <i className="fas fa-arrow-right"></i></Link>
                                </div>
                                <div className="ecosystem-subcard">
                                    <h5>Real Estate & Admissions Mapping</h5>
                                    <p>Expert advisory for buying, selling, and investing in high-yield properties, along with college admissions guidance for professional engineering courses.</p>
                                    <Link to="/services" className="ecosystem-action-link">Explore Domestic Consulting <i className="fas fa-arrow-right"></i></Link>
                                </div>
                                <div className="ecosystem-subcard">
                                    <h5>R&D, STEM Initiatives & Product Sales</h5>
                                    <p>Providing innovation labs setups for startups, STEM curriculum programs, and sales channel optimization analysis.</p>
                                    <Link to="/services" className="ecosystem-action-link">Explore R&D Initiatives <i className="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* MEET OUR TEAM SECTION */}
            <section className="section-padding team-section" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(234, 88, 12, 0.08)' }}>
                <div className="container">
                    <h2 className="section-title">Meet Our Team</h2>
                    <p className="section-subtitle">The Visionaries & Innovators Behind Tech Roxx</p>
                    
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginTop: '40px' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="gallery-item skeleton-pulse" style={{ height: '280px', borderRadius: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}></div>
                            ))}
                        </div>
                    ) : team.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '45px 30px', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(234, 88, 12, 0.1)', marginTop: '40px' }}>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Leadership profile is currently updating.</p>
                        </div>
                    ) : (
                        <>
                            {/* CEO Spotlight Block */}
                            {ceoMember && (
                                <div className="ceo-spotlight-container">
                                    <div className="ceo-card-column animate-enter">
                                        <div className="ceo-img-card">
                                            <div className="ceo-avatar-bg"></div>
                                            <img 
                                                src={ceoMember.image} 
                                                alt={`${ceoMember.name} - CEO & Founder at Tech Roxx Hyderabad`} 
                                                loading="lazy"
                                                onError={(e) => handleImageError(e, ceoMember.name)}
                                                className="ceo-image"
                                            />
                                            <div className="ceo-text-overlay">
                                                <h3 className="ceo-name">{ceoMember.name}</h3>
                                                <div className="ceo-role-overlay">{ceoMember.role}</div>
                                                <div className="ceo-social-links">
                                                    {Object.entries(ceoMember.socials || {}).map(([key, url]) => (
                                                        url ? (
                                                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" title={key.toUpperCase()}>
                                                                <i className={getSocialIcon(key)}></i>
                                                            </a>
                                                        ) : null
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ceo-vision-column animate-enter">
                                        <div className="vision-badge">
                                            <i className="fas fa-quote-left"></i> Leader's Vision
                                        </div>
                                        <h3 className="vision-title">Empowering the Next Generation of Hardware & Software Engineers</h3>
                                        <p className="vision-quote">
                                            "At TechRoxx, our mission is to build a premier technology learning ecosystem that connects deep-tech theory with rigorous, real-world hardware and software prototyping. We are empowering young engineers to build, fail, iterate, and ultimately create outstanding technology solutions."
                                        </p>
                                        <div className="vision-details">
                                            <div className="vision-detail-item">
                                                <div className="detail-icon"><i className="fas fa-microchip"></i></div>
                                                <div className="detail-text">
                                                    <strong>Advanced Hardware Ecosystems</strong>
                                                    <span>Nurturing talent in high-speed VLSI, PCB routing, advanced microcontrollers, and IoT architectures.</span>
                                                </div>
                                            </div>
                                            <div className="vision-detail-item">
                                                <div className="detail-icon"><i className="fas fa-brain"></i></div>
                                                <div className="detail-text">
                                                    <strong>AI & Emerging Technologies</strong>
                                                    <span>Integrating Generative AI and Machine Learning models to solve critical, large-scale telemetry problems.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* COO Spotlight Block */}
                            {cooMember && (
                                <div className="ceo-spotlight-container" style={{ marginTop: '40px', background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.03), rgba(100, 116, 139, 0.03))' }}>
                                    <div className="ceo-card-column animate-enter">
                                        <div className="ceo-img-card" style={{ borderColor: 'rgba(100, 116, 139, 0.15)', boxShadow: '0 15px 35px rgba(100, 116, 139, 0.2)' }}>
                                            <div className="ceo-avatar-bg" style={{ background: 'radial-gradient(circle, rgba(100, 116, 139, 0.3) 0%, transparent 70%)' }}></div>
                                            <img 
                                                src={cooMember.image} 
                                                alt={`${cooMember.name} - COO at Tech Roxx Hyderabad`} 
                                                loading="lazy"
                                                onError={(e) => handleImageError(e, cooMember.name)}
                                                className="ceo-image"
                                            />
                                            <div className="ceo-text-overlay">
                                                <h3 className="ceo-name">{cooMember.name}</h3>
                                                <div className="ceo-role-overlay">{cooMember.role}</div>
                                                <div className="ceo-social-links">
                                                    {Object.entries(cooMember.socials || {}).map(([key, url]) => (
                                                        url ? (
                                                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" title={key.toUpperCase()}>
                                                                <i className={getSocialIcon(key)}></i>
                                                            </a>
                                                        ) : null
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ceo-vision-column animate-enter">
                                        <div className="vision-badge" style={{ background: 'rgba(234, 88, 12, 0.15)', color: 'var(--primary-brand)', border: '1px solid rgba(234, 88, 12, 0.25)' }}>
                                            <i className="fas fa-quote-left"></i> Operational Vision
                                        </div>
                                        <h3 className="vision-title" style={{ color: 'var(--primary-brand)' }}>Driving Operational & Scaling Excellence</h3>
                                        <p className="vision-quote">
                                            "Operations and execution are the core engines of technology delivery. At TechRoxx, we ensure every program, workshop, and training sprint runs with standard-grade professional rigour, transforming students into highly capable, future-ready professionals."
                                        </p>
                                        <div className="vision-details">
                                            <div className="vision-detail-item">
                                                <div className="detail-icon" style={{ background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-brand)' }}><i className="fas fa-running"></i></div>
                                                <div className="detail-text">
                                                    <strong>Operational & Training Sprints</strong>
                                                    <span>Directing program execution, active hackathons, and intensive engineering bootcamps.</span>
                                                </div>
                                            </div>
                                            <div className="vision-detail-item">
                                                <div className="detail-icon" style={{ background: 'rgba(100, 116, 139, 0.1)', color: 'var(--secondary-blue)' }}><i className="fas fa-graduation-cap"></i></div>
                                                <div className="detail-text">
                                                    <strong>Corporate Placement Portals</strong>
                                                    <span>Linking student portfolios directly with hiring industries and corporate networks for rapid recruitment.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Core Team Grid */}
                            {coreTeam.length > 0 && (
                                <div style={{ marginTop: '60px' }}>
                                    <h3 className="core-team-heading" style={{ borderLeft: '4px solid var(--primary-brand)', paddingLeft: '15px' }}>Our Core Team</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginTop: '25px' }}>
                                        {coreTeam.map(member => (
                                            <div key={member.id} className="team-card" onClick={() => setSelectedMember(member)} style={{ cursor: 'pointer', background: 'var(--bg-panel)', border: '1px solid rgba(234,88,12,0.1)', borderRadius: '24px', overflow: 'hidden', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.3s' }}>
                                                <div className="team-img-wrapper" style={{ width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                                                    <img 
                                                        src={member.image} 
                                                        alt={`${member.name} - ${member.role} at Tech Roxx Hyderabad`} 
                                                        loading="lazy"
                                                        onError={(e) => handleImageError(e, member.name)}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="team-info" style={{ marginTop: '15px', textAlign: 'center', width: '100%' }}>
                                                    <h3 className="team-name" style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.15rem', margin: '0 0 5px' }}>{member.name}</h3>
                                                    <div className="team-role" style={{ color: 'var(--secondary-blue)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>{member.role}</div>
                                                    <div className="team-card-socials-inline" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                        {Object.entries(member.socials || {}).map(([key, url]) => (
                                                            url ? (
                                                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`inline-social-link ${key}`} title={key.toUpperCase()} onClick={(e) => e.stopPropagation()} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.08)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'all 0.3s' }}>
                                                                    <i className={getSocialIcon(key)}></i>
                                                                </a>
                                                            ) : null
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* DETAILED INTERACTIVE TOUR REDIRECT FOOTER */}
            <section className="about-footer-tour">
                <div className="container">
                    <div className="tour-card-glowing">
                        <div className="tour-glow-circle"></div>
                        <div className="tour-content">
                            <h3>Need Guided Support?</h3>
                            <p>Interact with our smart NLP Chatbot in the bottom-right corner! Simply type your questions or click our quick replies to get navigated around the campus ecosystem instantly.</p>
                            <div className="tour-btn-row">
                                <Link to="/services" className="btn btn-primary">Browse All Courses</Link>
                                <Link to="/contact" className="btn btn-secondary" style={{ marginLeft: '15px' }}>Contact Tech Roxx</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGH-END EMBEDDED COMPONENT STYLES */}
            
        </>
    );
};

export default About;
