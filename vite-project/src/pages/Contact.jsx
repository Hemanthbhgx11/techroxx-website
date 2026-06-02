import React from 'react';

const Contact = () => {
    return (
        <>
            <div className="page-header-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200')` }}>
                <div className="container" style={{ width: '100%' }}>
                    <div className="page-header-content">
                        <h1 className="page-header-title">Join The Ecosystem</h1>
                        <p className="page-header-desc">Connect with us on social media or reach out directly for course syllabus, training schedules, and support.</p>
                    </div>
                </div>
            </div>
            <section className="section-padding community animate-enter" style={{ paddingTop: '60px' }}>
                <div className="container">
                    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '30px', fontSize: '1.1rem' }}>
                    For inquiries, pricing, and details, reach us directly at <br />
                    <strong style={{ color: 'var(--secondary-blue)', fontSize: '1.3rem' }}>+91 9550251208</strong>
                </p>
                <div className="social-grid">
                    <a href="tel:+919550251208" className="social-btn" style={{ borderColor: 'var(--secondary-blue)', color: 'var(--secondary-blue)' }}>
                        <i className="fas fa-phone-alt"></i> Call Us
                    </a>
                    <a href="https://www.instagram.com/tech_roxx.ig" target="_blank" rel="noreferrer" className="social-btn ig">
                        <i className="fab fa-instagram"></i> Instagram
                    </a>
                    <a href="https://www.linkedin.com/in/tech-roxxln/" target="_blank" rel="noreferrer" className="social-btn li">
                        <i className="fab fa-linkedin"></i> LinkedIn
                    </a>
                    <a href="https://youtube.com/@techroxxyt" target="_blank" rel="noreferrer" className="social-btn yt">
                        <i className="fab fa-youtube"></i> YouTube
                    </a>
                    <a href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" target="_blank" rel="noreferrer" className="social-btn wa">
                        <i className="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        </section>
        </>
    );
};

export default Contact;
