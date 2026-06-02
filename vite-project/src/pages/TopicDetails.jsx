import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topicDetailData, departmentData } from '../data/constants';

const TopicDetails = () => {
    const { slug, id, topicId } = useParams();
    const navigate = useNavigate();
    const list = topicDetailData[topicId];
    
    const activeSlug = slug || id;
    const deptKey = activeSlug === 'cse' ? 'computing' : (activeSlug === 'ece' ? 'electra' : activeSlug);
    
    // Find topic name from departmentData if needed
    let topicName = topicId;
    const dept = departmentData[deptKey];
    if (dept) {
        const tech = dept.technologies.find(t => t.id === topicId);
        if (tech) topicName = tech.name;
    }

    if (!list) {
        return (
            <section className="section-padding" style={{ background: 'var(--bg-dark)', textAlign: 'center' }}>
                <div className="container">
                    <h2>Topic not found</h2>
                    <button className="btn btn-primary" onClick={() => navigate(`/services/${activeSlug}`)} style={{ marginTop: '20px' }}>Back to Department</button>
                </div>
            </section>
        );
    }

    return (
        <section className="section-padding animate-enter" style={{ background: 'var(--bg-dark)' }}>
            <div className="container">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => navigate(`/services/${activeSlug}`)}>
                        <i className="fas fa-arrow-left"></i> Back to Department
                    </button>
                    <h2 className="section-title" style={{ marginBottom: 0, fontSize: '1.8rem', textAlign: 'right' }}>{topicName}</h2>
                </div>
                <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Curriculum Highlights</h4>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {list.map((topic, idx) => (
                            <li key={idx} style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', color: 'var(--text-muted)', fontSize: '1.1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--secondary-blue)', marginRight: '15px', marginTop: '5px' }}></i> {topic}
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button onClick={() => navigate('/contact')} className="btn btn-primary">Enroll in this Track</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopicDetails;
