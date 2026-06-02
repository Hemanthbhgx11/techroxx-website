import { useParams, useNavigate } from 'react-router-dom';
import { consultancyData } from '../data/constants';

const ConsultancyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedData = consultancyData[id];

    if (!selectedData) {
        return (
            <section className="section-padding" style={{ background: 'var(--bg-dark)', textAlign: 'center' }}>
                <div className="container">
                    <h2>Consultancy Service not found</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/services')} style={{ marginTop: '20px' }}>Back to Services</button>
                </div>
            </section>
        );
    }

    return (
        <section className="section-padding animate-enter">
            <div className="container">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => navigate('/services')}>
                        <i className="fas fa-arrow-left"></i> Back to Services
                    </button>
                    <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Details</h2>
                </div>
                <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <i className={`fas ${selectedData.icon}`} style={{ fontSize: '4rem', color: 'var(--text-main)', marginBottom: '20px' }}></i>
                    <h3 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', marginBottom: '20px' }}>{selectedData.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 30px auto' }}>
                        {selectedData.content}
                    </p>
                    <a href="tel:+917659906008" className="btn btn-primary">
                        <i className="fas fa-phone-alt" style={{ marginRight: '10px' }}></i> Contact Expert
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ConsultancyDetails;
