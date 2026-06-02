import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jobRolesData } from '../data/constants';

const JobRoles = () => {
    const navigate = useNavigate();

    return (
        <section className="section-padding animate-enter" style={{ background: 'var(--bg-panel)' }}>
            <div className="container">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => navigate('/services/programs/placement')}>
                        <i className="fas fa-arrow-left"></i> Back to Guide
                    </button>
                    <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Job Roles & Skills</h2>
                </div>
                <div>
                    {Object.entries(jobRolesData).map(([category, roles]) => (
                        <div key={category}>
                            <h3 style={{ color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginTop: '40px', marginBottom: '20px' }}>{category}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                {roles.map((role, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-panel)', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                        <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '10px', fontWeight: '700' }}>{role.role}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', lineHeight: 1.5 }}>{role.desc}</p>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '5px' }}>
                                            <strong>Skills:</strong> <span style={{ color: 'var(--secondary-blue)' }}>{role.skills}</span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                                            <strong>Degree:</strong> {role.degree}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobRoles;
