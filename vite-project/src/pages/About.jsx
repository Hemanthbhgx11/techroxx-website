import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const [team, setTeam] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/team.json')
            .then(res => {
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
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
            <style>{`
                /* --- ABOUT HERO SECTION --- */
                .about-hero {
                    position: relative;
                    width: 100%;
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(-45deg, #f1f5f9, #ffedd5, #f8fafc, #ffedd5, #f1f5f9) !important;
                    background-size: 400% 400% !important;
                    animation: liquidMesh 20s ease infinite !important;
                    overflow: hidden;
                    padding-top: 120px;
                    padding-bottom: 80px; /* added substantial bottom padding to completely prevent button overlap */
                    border-bottom: 1px solid rgba(234, 88, 12, 0.08);
                }
                html[data-theme='dark'] .about-hero {
                    background: linear-gradient(-45deg, #0f172a, #2a120a, #1e293b, #2a120a, #0f172a) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .about-hero-glow-1 {
                    position: absolute;
                    top: -20%;
                    left: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                }
                .about-hero-glow-2 {
                    position: absolute;
                    bottom: -15%;
                    right: -10%;
                    width: 700px;
                    height: 700px;
                    background: radial-gradient(circle, rgba(100, 116, 139, 0.15) 0%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                }
                .about-hero-content {
                    max-width: 850px;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;
                    z-index: 10;
                }
                .hero-badge {
                    display: inline-block;
                    background: rgba(234, 88, 12, 0.08);
                    border: 1px solid rgba(234, 88, 12, 0.2);
                    color: var(--primary-brand);
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 25px;
                }
                html[data-theme='dark'] .hero-badge {
                    background: rgba(234, 88, 12, 0.12);
                    border: 1px solid rgba(234, 88, 12, 0.3);
                    color: var(--primary-brand);
                }
                .about-hero-title {
                    font-family: var(--font-head);
                    font-size: 3.8rem;
                    font-weight: 900;
                    line-height: 1.1;
                    letter-spacing: -1px;
                    margin-bottom: 25px;
                    color: var(--primary-brand);
                }
                html[data-theme='dark'] .about-hero-title {
                    color: #a5b4fc;
                }
                .about-hero-desc {
                    font-size: 1.05rem;
                    color: var(--text-muted);
                    line-height: 1.7;
                    margin-bottom: 40px;
                    max-width: 760px;
                    margin-left: auto;
                    margin-right: auto;
                }
                html[data-theme='dark'] .about-hero-desc {
                    color: #94a3b8;
                }
                .hero-action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }

                /* --- WHO WE ARE INTRO --- */
                .about-intro-section {
                    padding: 80px 0;
                }
                .about-intro-wrapper {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 50px;
                    align-items: center;
                }
                .intro-lead {
                    font-size: 1.15rem;
                    font-weight: 500;
                    color: var(--secondary-blue);
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .intro-body {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    line-height: 1.75;
                }
                .about-intro-visual {
                    position: relative;
                }
                .visual-box {
                    position: relative;
                    background: var(--bg-card);
                    border: var(--glass-border);
                    border-radius: 20px;
                    padding: 40px 30px;
                    box-shadow: var(--card-shadow);
                    overflow: hidden;
                    text-align: center;
                }
                .glowing-border-element {
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 4px;
                    background: linear-gradient(90deg, var(--primary-brand), var(--secondary-blue));
                }
                .visual-icon {
                    font-size: 2.8rem;
                    color: var(--secondary-blue);
                    margin-bottom: 20px;
                }
                .visual-content h4 {
                    font-family: var(--font-head);
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 12px;
                }
                .visual-content p {
                    font-size: 0.88rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                }

                /* --- ECOSYSTEM HUB --- */
                .ecosystem-hub-section {
                    padding: 80px 0;
                    background: var(--bg-panel);
                }
                .section-pretitle {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--secondary-blue);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    display: inline-block;
                    margin-bottom: 10px;
                }
                .ecosystem-columns-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
                    gap: 30px;
                    margin-top: 40px;
                }
                .ecosystem-col-glass {
                    background: var(--bg-card);
                    border: var(--glass-border);
                    border-radius: 20px;
                    padding: 35px 30px;
                    box-shadow: var(--card-shadow);
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                }
                .ecosystem-col-glass:hover {
                    transform: translateY(-8px);
                    border-color: rgba(234, 88, 12, 0.3);
                }
                .col-indicator-bar {
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 5px;
                }
                .blue-glow { background: var(--secondary-blue); }
                .red-glow { background: var(--primary-brand); }
                .purple-glow { background: var(--primary-brand); }
                
                .col-header-wrap {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 15px;
                }
                .col-icon-box {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    background: rgba(234, 88, 12, 0.08);
                    color: var(--secondary-blue);
                    font-size: 1.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ecosystem-col-glass h3 {
                    font-family: var(--font-head);
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: var(--text-main);
                }
                .col-teaser {
                    font-size: 0.88rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    margin-bottom: 30px;
                }
                .ecosystem-subcards {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    flex-grow: 1;
                }
                .ecosystem-subcard {
                    background: var(--bg-panel);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 14px;
                    padding: 20px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .ecosystem-subcard:hover {
                    border-color: rgba(234, 88, 12, 0.2);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
                }
                .ecosystem-subcard h5 {
                    font-family: var(--font-head);
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 8px;
                }
                .ecosystem-subcard p {
                    font-size: 0.82rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    margin-bottom: 12px;
                }
                .ecosystem-action-link {
                    font-family: var(--font-head);
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--secondary-blue);
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: gap 0.2s;
                }
                .ecosystem-action-link:hover {
                    color: var(--primary-brand);
                    gap: 10px;
                }

                /* --- MEET OUR TEAM SECTION & SPOTLIGHTS --- */
                .team-card {
                    background: var(--bg-panel);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(220, 38, 38, 0.12);
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
                    border-color: var(--primary-brand);
                    box-shadow: 0 20px 45px rgba(234, 88, 12, 0.15);
                }

                .team-img-wrapper {
                    position: relative;
                    width: 100%;
                    height: 250px;
                    overflow: hidden;
                    transition: all 0.4s ease;
                }
                .team-card:hover .team-img-wrapper {
                    transform: scale(1.05);
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
                    background: rgba(234, 88, 12, 0.05);
                    border: 1px solid rgba(234, 88, 12, 0.08);
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

                /* --- CEO Spotlight Section Styles --- */
                .ceo-spotlight-container {
                    display: grid;
                    grid-template-columns: 1fr 1.6fr;
                    gap: 50px;
                    align-items: center;
                    margin: 50px 0;
                    padding: 40px;
                    background: linear-gradient(135deg, rgba(234, 88, 12, 0.03), rgba(100, 116, 139, 0.03));
                    border: 1px solid rgba(234, 88, 12, 0.08);
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
                
                .ceo-card-column {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .ceo-img-card {
                    position: relative;
                    width: 300px;
                    height: 400px;
                    border-radius: 24px;
                    overflow: hidden;
                    background: linear-gradient(135deg, rgba(234, 88, 12, 0.2), rgba(100, 116, 139, 0.2));
                    border: 2px solid rgba(234, 88, 12, 0.15);
                    box-shadow: 0 15px 35px rgba(234, 88, 12, 0.2);
                    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
                }
                .ceo-img-card:hover {
                    border-color: var(--primary-brand);
                    box-shadow: 0 20px 45px rgba(234, 88, 12, 0.35);
                    transform: scale(1.02);
                }
                
                .ceo-avatar-bg {
                    position: absolute;
                    top: 15%;
                    left: 15%;
                    width: 70%;
                    height: 70%;
                    background: radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%);
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
                    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                }
                
                .ceo-text-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 25px 20px 20px;
                    background: linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0.7) 60%, transparent 100%);
                    z-index: 2;
                    text-align: center;
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
                    background: var(--primary-brand);
                    border-color: var(--primary-brand);
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 0 15px rgba(234, 88, 12, 0.5);
                }
                
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
                    background: rgba(234, 88, 12, 0.1);
                    border: 1px solid rgba(234, 88, 12, 0.2);
                    border-radius: 30px;
                    color: var(--primary-brand);
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
                    border: 1px solid rgba(234, 88, 12, 0.15);
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
                
                .modal-close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: var(--bg-dark);
                    border: var(--glass-border);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                }
                .modal-close-btn:hover {
                    background: var(--primary-brand);
                    color: white;
                    border-color: var(--primary-brand);
                    transform: rotate(90deg);
                }

                .modal-body-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    min-height: 480px;
                }
                @media (max-width: 768px) {
                    .modal-body-layout {
                        grid-template-columns: 1fr;
                    }
                    .modal-image-pane {
                        display: none;
                    }
                }
                
                .modal-image-pane {
                    position: relative;
                    background: #000;
                    overflow: hidden;
                }
                
                .modal-image-pane-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(100, 116, 139, 0.1));
                    z-index: 0;
                }
                
                .modal-profile-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: relative;
                    z-index: 1;
                }
                
                .modal-info-pane {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: var(--bg-card);
                }
                @media (max-width: 768px) {
                    .modal-info-pane {
                        padding: 30px 20px;
                    }
                }
                
                .modal-badge-role {
                    display: inline-block;
                    align-self: flex-start;
                    background: rgba(234, 88, 12, 0.08);
                    color: var(--primary-brand);
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding: 4px 12px;
                    border-radius: 30px;
                    margin-bottom: 12px;
                }
                
                .modal-member-name {
                    font-family: var(--font-head);
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: var(--text-main);
                    margin: 0 0 5px 0;
                }
                
                .modal-member-role {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--secondary-blue);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0 0 20px 0;
                }
                
                .modal-bio-section {
                    margin-bottom: 25px;
                    border-left: 3px solid var(--primary-brand);
                    padding-left: 15px;
                }
                
                .modal-bio-text {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: var(--text-muted);
                    margin: 0;
                }
                
                .modal-extra-details {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 30px;
                    border-top: var(--glass-border);
                    padding-top: 20px;
                }
                
                .detail-row {
                    display: flex;
                    font-size: 0.85rem;
                }
                
                .detail-lbl {
                    width: 90px;
                    color: var(--text-muted);
                    font-weight: 600;
                }
                
                .detail-val {
                    color: var(--text-main);
                    font-weight: 700;
                }
                
                .modal-action-bar {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                .btn-social-large {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: white;
                    background: #0077b5;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .btn-social-large:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 119, 181, 0.3);
                }

                /* --- TOUR GUIDANCE FOOTER --- */
                .about-footer-tour {
                    padding: 40px 0 100px 0;
                }
                .tour-card-glowing {
                    position: relative;
                    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
                    border: 1px solid rgba(234, 88, 12, 0.12);
                    border-radius: 24px;
                    padding: 50px 40px;
                    overflow: hidden;
                    text-align: center;
                    box-shadow: var(--card-shadow);
                }
                html[data-theme='dark'] .tour-card-glowing {
                    background: linear-gradient(135deg, #111827 0%, #1e1510 100%);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
                .tour-glow-circle {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(234, 88, 12, 0.06) 0%, transparent 60%);
                    filter: blur(30px);
                    pointer-events: none;
                }
                html[data-theme='dark'] .tour-glow-circle {
                    background: radial-gradient(circle, rgba(100, 116, 139, 0.12) 0%, transparent 60%);
                }
                .tour-content {
                    position: relative;
                    z-index: 2;
                }
                .tour-content h3 {
                    font-family: var(--font-head);
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 12px;
                }
                html[data-theme='dark'] .tour-content h3 {
                    color: white;
                }
                .tour-content p {
                    font-size: 0.98rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                    max-width: 700px;
                    margin: 0 auto 30px auto;
                }
                html[data-theme='dark'] .tour-content p {
                    color: #94a3b8;
                }
                .tour-btn-row {
                    display: flex;
                    justify-content: center;
                }

                /* --- RESPONSIVE MEDIA ADAPTATION --- */
                @media (max-width: 1024px) {
                    .about-hero-title { font-size: 3.2rem; }
                    .about-intro-wrapper { grid-template-columns: 1fr; gap: 40px; }
                    .visual-box { max-width: 500px; margin: 0 auto; }
                }
                @media (max-width: 768px) {
                    .about-hero-title { font-size: 2.6rem; }
                    .about-hero-desc { font-size: 0.95rem; }
                    .hero-action-buttons { flex-direction: column; width: 100%; max-width: 300px; margin: 0 auto; gap: 15px; }
                    .hero-action-buttons a, .hero-action-buttons button, .hero-action-buttons .btn { width: 100%; margin: 0 !important; }
                    .tour-btn-row { flex-direction: column; max-width: 300px; margin: 0 auto; gap: 15px; }
                    .tour-btn-row a { width: 100%; margin: 0 !important; }
                    .stats-grid { grid-template-columns: 1fr 1fr; gap: 15px; }
                    .premium-leader-card { width: 100%; max-width: 340px; }
                }
            `}</style>
        </>
    );
};

export default About;
