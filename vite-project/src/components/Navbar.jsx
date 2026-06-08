import { useState, useEffect } from 'react';
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
                    <img src={logo} alt="Tech Roxx" className="h-10 rounded-lg" />
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
                    
                    {/* Premium Theme Selector Dropdown */}
                    <li className={`theme-toggle-container relative flex items-center ${isThemeDropdownOpen ? 'z-[1200]' : 'z-[1]'}`}>
                        <button className="theme-btn bg-transparent border-none text-[var(--text-muted)] text-[1.1rem] cursor-pointer flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300" onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}>
                            {theme === 'light' && <i className="fas fa-sun text-[#f59e0b]"></i>}
                            {theme === 'dark' && <i className="fas fa-moon text-[var(--secondary-blue)]"></i>}
                            {theme === 'system' && <i className="fas fa-desktop"></i>}
                        </button>
                        {isThemeDropdownOpen && (
                            <ul className="theme-dropdown">
                                <li onClick={() => { setTheme('light'); setIsThemeDropdownOpen(false); }} className={`theme-dropdown-item ${theme === 'light' ? 'active-theme' : ''}`}>
                                    <i className="fas fa-sun w-4 text-[#f59e0b]"></i> Light
                                    {theme === 'light' && <i className="fas fa-check ml-auto text-[0.75rem]"></i>}
                                </li>
                                <li onClick={() => { setTheme('dark'); setIsThemeDropdownOpen(false); }} className={`theme-dropdown-item ${theme === 'dark' ? 'active-theme' : ''}`}>
                                    <i className="fas fa-moon w-4 text-[var(--secondary-blue)]"></i> Dark
                                    {theme === 'dark' && <i className="fas fa-check ml-auto text-[0.75rem]"></i>}
                                </li>
                                <li onClick={() => { setTheme('system'); setIsThemeDropdownOpen(false); }} className={`theme-dropdown-item ${theme === 'system' ? 'active-theme' : ''}`}>
                                    <i className="fas fa-desktop w-4 text-[var(--text-muted)]"></i> System
                                    {theme === 'system' && <i className="fas fa-check ml-auto text-[0.75rem]"></i>}
                                </li>
                             </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="btn btn-primary ml-2.5">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
