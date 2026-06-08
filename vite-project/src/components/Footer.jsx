import { Link } from 'react-router-dom';
import logo from '../img/logo_techroxx.jpg';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div>
                        <Link to="/" className="footer-logo-btn no-underline">
                            <img src={logo} alt="Tech Roxx" className="h-[35px] align-middle mr-2.5 rounded-md border-2 border-white" /> TECH ROXX
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
                <div className="copyright">
                    &copy; {new Date().getFullYear()} Tech Roxx. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
