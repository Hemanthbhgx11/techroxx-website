import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo_techroxx.jpg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
    const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

    useEffect(() => {
        const applyTheme = (currentTheme) => {
            let activeTheme = currentTheme;
            if (currentTheme === 'system') {
                activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.setAttribute('data-theme', activeTheme);
        };

        applyTheme(theme);
        localStorage.setItem('theme', theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, [theme]);

    useEffect(() => {
        if (!isThemeDropdownOpen) return;
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.theme-toggle-container')) {
                setIsThemeDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isThemeDropdownOpen]);

    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                    <img src={logo} alt="Tech Roxx" style={{ height: '40px', borderRadius: '8px' }} />
                    TECH ROXX
                </Link>
                <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li className={location.pathname === '/about' ? 'active' : ''}>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    </li>
                    <li className={location.pathname.startsWith('/learn') ? 'active' : ''}>
                        <Link to="/learn" onClick={() => setIsMenuOpen(false)}>Learn</Link>
                    </li>
                    <li className={location.pathname.startsWith('/services') ? 'active' : ''}>
                        <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    </li>
                    <li className={location.pathname === '/careers' ? 'active' : ''}>
                        <Link to="/careers" onClick={() => setIsMenuOpen(false)}>Careers</Link>
                    </li>
                    <li className={location.pathname === '/gallery' ? 'active' : ''}>
                        <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    </li>
                    
                    {/* Premium Theme Selector Dropdown */}
                    <li className="theme-toggle-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <button className="theme-btn" onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: '0.3s' }}>
                            {theme === 'light' && <i className="fas fa-sun" style={{ color: '#f59e0b' }}></i>}
                            {theme === 'dark' && <i className="fas fa-moon" style={{ color: '#3b82f6' }}></i>}
                            {theme === 'system' && <i className="fas fa-desktop"></i>}
                        </button>
                        {isThemeDropdownOpen && (
                            <ul className="theme-dropdown" style={{ position: 'absolute', top: '45px', right: '-10px', background: 'var(--bg-panel)', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '10px', padding: '6px 0', width: '120px', boxShadow: 'var(--card-shadow)', zIndex: 1100, listStyle: 'none', margin: 0 }}>
                                <li onClick={() => { setTheme('light'); setIsThemeDropdownOpen(false); }} className={`theme-dropdown-item ${theme === 'light' ? 'active-theme' : ''}`} style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                                    <i className="fas fa-sun" style={{ width: '16px', color: '#f59e0b' }}></i> Light
                                </li>
                                <li onClick={() => { setTheme('dark'); setIsThemeDropdownOpen(false); }} className={`theme-dropdown-item ${theme === 'dark' ? 'active-theme' : ''}`} style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                                    <i className="fas fa-moon" style={{ width: '16px', color: '#3b82f6' }}></i> Dark
                                </li>
                                <li onClick={() => { setTheme('system'); setIsThemeDropdownOpen(false); }} className={`theme-dropdown-item ${theme === 'system' ? 'active-theme' : ''}`} style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                                    <i className="fas fa-desktop" style={{ width: '16px' }}></i> System
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ marginLeft: '10px' }}>Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
