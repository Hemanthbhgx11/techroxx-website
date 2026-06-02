import { useParams, useNavigate } from 'react-router-dom';
import { programData, placementCompanies } from '../data/constants';

const ProgramDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <section className="section-padding animate-enter">
            <div className="container">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => navigate('/services')}>
                        <i className="fas fa-arrow-left"></i> Back to Services
                    </button>
                    <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>
                        {id === 'placement' ? 'Placement Guide' : id.charAt(0).toUpperCase() + id.slice(1) + ' Details'}
                    </h2>
                </div>
                <div className="detail-list">
                    {id === 'placement' ? (
                        <>
                            <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-muted)' }}>Explore career pages of top companies categorized by industry.</p>
                            
                            <div style={{ marginBottom: '40px', textAlign: 'center', padding: '30px', background: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ color: 'var(--text-main)', marginBottom: '20px', fontFamily: 'var(--font-head)' }}>Explore More Opportunities</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                                    <a href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderColor: '#25D366', color: '#25D366', fontSize: '0.9rem', padding: '8px 18px' }}>
                                        <i className="fab fa-whatsapp"></i> Join WhatsApp Community
                                    </a>
                                    <button onClick={() => navigate('/services/job-roles')} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '8px 18px' }}>
                                        <i className="fas fa-briefcase"></i> Understand the Roles
                                    </button>
                                </div>
                            </div>
                            
                            {Object.entries(placementCompanies).map(([category, companies]) => (
                                <div key={category}>
                                    <h3 style={{ color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginTop: '30px', marginBottom: '20px' }}>{category}</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                                        {companies.map((company, idx) => (
                                            <div key={idx} style={{ background: 'var(--bg-panel)', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '5px' }}>{company.name}</h4>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px' }}>{company.role}</p>
                                                </div>
                                                <a href={company.link} target="_blank" rel="noreferrer" className="btn" style={{ textAlign: 'center', background: 'var(--bg-panel)', color: 'var(--secondary-blue)', border: '1px solid var(--secondary-blue)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', width: '100%' }}>
                                                    Visit Career Page <i className="fas fa-external-link-alt" style={{ marginLeft: '5px' }}></i>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {(programData[id] || []).map((item, idx) => (
                                <div key={idx} className="detail-item" onClick={() => item.link ? window.open(item.link, '_blank') : alert("Registration opening soon!")} style={{ cursor: 'pointer' }}>
                                    <div className="detail-info">
                                        <h3>{item.title} {item.link && <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em', marginLeft: '5px' }}></i>}</h3>
                                        <p>{item.desc}</p>
                                        <span style={{ color: 'var(--secondary-blue)', fontSize: '0.8rem', marginTop: '5px', display: 'block' }}>
                                            <i className="far fa-calendar-alt"></i> {item.date}
                                        </span>
                                    </div>
                                    <div className="detail-action">
                                        <i className="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            ))}
                            {(!programData[id] || programData[id].length === 0) && <p style={{ textAlign: 'center', color: '#777' }}>No active programs in this category at the moment.</p>}
                            
                            <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', borderTop: '1px solid #e2e8f0' }}>
                                <h3 style={{ color: 'var(--text-main)', marginBottom: '15px', fontFamily: 'var(--font-head)' }}>
                                    {id === 'workshops' ? "Want to organize a Workshop?" : id === 'internships' ? "Join our Community for Updates" : "Ask for Details and Pricing"}
                                </h3>
                                <a href={id === 'internships' ? "https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" : "tel:+917659906008"} target={id === 'internships' ? "_blank" : "_self"} rel="noreferrer" className="btn btn-primary" style={id === 'internships' ? { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 14px', borderColor: '#25D366', color: '#25D366' } : { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 14px' }}>
                                    <i className={`fab ${id === 'internships' ? "fa-whatsapp" : "fa-phone-alt"}`}></i>
                                    {id === 'workshops' ? "Ask for a Workshop" : id === 'internships' ? "Join WhatsApp Community" : "Call for Details"}
                                </a>
                                <p style={{ marginTop: '15px', color: 'var(--secondary-blue)', fontSize: '1rem', fontWeight: 'bold' }}>
                                    {id !== 'internships' && 'Contact: 7659906008'}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProgramDetails;
