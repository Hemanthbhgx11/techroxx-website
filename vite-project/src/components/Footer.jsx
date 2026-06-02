import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo_techroxx.jpg';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div>
                        <Link to="/" className="footer-logo-btn" style={{ textDecoration: 'none' }}>
                            <img src={logo} alt="Tech Roxx" style={{ height: '35px', verticalAlign: 'middle', marginRight: '10px', borderRadius: '6px', border: '2px solid white' }} /> TECH ROXX
                        </Link>
                        <p style={{ opacity: 0.9, marginTop: '15px' }}>Transforming Students Into Future Leaders.</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>Explore</h4>
                        <ul className="footer-links">
                            <li><Link to="/about" className="footer-btn">About</Link></li>
                            <li><Link to="/learn" className="footer-btn">Learn</Link></li>
                            <li><Link to="/services" className="footer-btn">Programs</Link></li>
                            <li><Link to="/gallery" className="footer-btn">Gallery</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>Contact</h4>
                        <ul className="footer-links">
                            <li style={{ display: 'flex', alignItems: 'center' }}>
                                <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i> Hyderabad, India
                            </li>
                            <li>
                                <a href="tel:+919550251208">
                                    <i className="fas fa-phone" style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i> +91 9550251208
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info.e@techroxx.in">
                                    <i className="fas fa-envelope" style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i> info.e@techroxx.in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    &copy; {new Date().getFullYear()} Tech Roxx. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
