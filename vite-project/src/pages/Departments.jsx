import React from 'react';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
    const navigate = useNavigate();

    return (
        <section className="section-padding departments animate-enter">
            <div className="container">
                <h2 className="section-title">Departments</h2>
                <p className="section-subtitle">Specialized Training Tracks</p>
                <div className="dept-grid staggered-fade-in">
                    <div className="dept-card" onClick={() => navigate('/departments/computing')}>
                        <div className="dept-header">
                            <i className="fas fa-laptop-code dept-icon"></i>
                            <div>
                                <div className="dept-title">Dept. of Computing</div>
                                <div className="dept-subtitle">CSE / MCA / BCA / B.Com</div>
                            </div>
                        </div>
                        <div className="dept-body">
                            <ul className="dept-list">
                                <li>AI / Machine Learning (ML)</li>
                                <li>Deep Learning & Computer Vision</li>
                                <li>Generative & Agentic AI</li>
                                <li>Python, Java, C++</li>
                                <li>MERN / Full Stack Dev</li>
                                <li>DSA (Data Structures)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="dept-card" onClick={() => navigate('/departments/electra')}>
                        <div className="dept-header">
                            <i className="fas fa-bolt dept-icon"></i>
                            <div>
                                <div className="dept-title">Dept. of Electra</div>
                                <div className="dept-subtitle">ECE / EEE / EIE</div>
                            </div>
                        </div>
                        <div className="dept-body">
                            <ul className="dept-list">
                                <li>Internet of Things (IoT)</li>
                                <li>Embedded Systems</li>
                                <li>Microcontrollers & Sensors</li>
                                <li>PCB Design & Prototyping</li>
                                <li>Real-Time Hardware Projects</li>
                            </ul>
                        </div>
                    </div>
                    <div className="dept-card" onClick={() => navigate('/departments/arts-management')}>
                        <div className="dept-header">
                            <i className="fas fa-chart-line dept-icon"></i>
                            <div>
                                <div className="dept-title">Arts & Management</div>
                                <div className="dept-subtitle">Business & Analytics</div>
                            </div>
                        </div>
                        <div className="dept-body">
                            <ul className="dept-list">
                                <li>Product Management with AI</li>
                                <li>HR Mgmt + Data Analytics</li>
                                <li>Basics of SAP & ERP</li>
                                <li>Business Analytics</li>
                                <li>Digital Workplace Tools</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Departments;
