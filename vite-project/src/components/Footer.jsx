import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo_techroxx.webp';

const Footer = () => {
    const location = useLocation();
    const hasSidebar = location.pathname.startsWith('/learn/') && location.pathname !== '/learn';

    return (
        <footer className={hasSidebar ? 'has-sidebar' : ''}>
            <div className="container">
                <div className="footer-content">
                    <div>
                        <Link to="/" className="footer-logo-btn no-underline">
                            <img src={logo} alt="Techroxx Technology and Innovation Ecosystem logo" className="h-[35px] align-middle mr-2.5 rounded-md border-2 border-white" loading="lazy" /> TECH ROXX
                        </Link>
                        <p className="opacity-90 mt-3.5">Transforming Students Into Future Leaders.</p>
                    </div>
                    <div>
                        <h4 className="text-white mb-3.5 text-[1.1rem] font-bold">Explore</h4>
                        <ul className="footer-links">
                            <li><Link to="/about" className="footer-btn">About</Link></li>
                            <li><Link to="/learn" className="footer-btn">Learn</Link></li>
                            <li><Link to="/services" className="footer-btn">Programs</Link></li>
                            <li><Link to="/gallery" className="footer-btn">Gallery</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white mb-3.5 text-[1.1rem] font-bold">Contact</h4>
                        <ul className="footer-links">
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-2.5 w-5 text-center"></i> Hyderabad, India
                            </li>
                            <li>
                                <a href="tel:+917659906008">
                                    <i className="fas fa-phone mr-2.5 w-5 text-center"></i> +91 7659906008
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info.e@techroxx.in">
                                    <i className="fas fa-envelope mr-2.5 w-5 text-center"></i> info.e@techroxx.in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[rgba(255,255,255,0.1)] pt-6 mt-6">
                    <div>&copy; {new Date().getFullYear()} Tech Roxx. All Rights Reserved.</div>
                    <div className="flex gap-4 text-sm opacity-80">
                        <Link to="/privacy-policy" className="hover:text-[var(--primary-brand)] transition-colors">Privacy Policy</Link>
                        <span>|</span>
                        <Link to="/terms-of-service" className="hover:text-[var(--primary-brand)] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
