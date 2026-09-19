import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo_techroxx.webp';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={isScrolled ? 'scrolled' : ''}>
            <div className="nav-container">
                <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                    <img src={logo} alt="Techroxx Technology and Innovation Ecosystem logo" className="h-11" style={{borderRadius:'50%'}} fetchpriority="high" />
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
                    <li className={location.pathname.startsWith('/events') ? 'active' : ''}>
                        <Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link>
                    </li>
                    <li className={location.pathname === '/careers' ? 'active' : ''}>
                        <Link to="/careers" onClick={() => setIsMenuOpen(false)}>Careers</Link>
                    </li>
                    <li className={location.pathname === '/gallery' ? 'active' : ''}>
                        <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    </li>
                    

                    <li>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="btn btn-outline btn-primary ml-2.5">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
