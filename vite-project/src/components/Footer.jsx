import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo_techroxx.webp';
import { Sparkles, Target, Briefcase, Cpu } from 'lucide-react';

const Footer = () => {
    const location = useLocation();
    const hasSidebar = location.pathname.startsWith('/learn/') && location.pathname !== '/learn';

    return (
        <footer className={`bg-[var(--bg-primary)] border-t border-[var(--border)] pt-20 pb-8 ${hasSidebar ? 'ml-0 md:ml-64' : ''}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    <div className="md:col-span-5">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6">
                            <img src={logo} alt="Techroxx" className="h-10 w-10 object-contain rounded-md" loading="lazy" />
                            <span className="text-2xl font-black font-heading text-[var(--text-main)] tracking-wider">TECH ROXX</span>
                        </Link>
                        <p className="text-[var(--text-muted)] text-base mb-8 max-w-sm leading-relaxed">
                            A premium technology ecosystem bridging the gap between academic learning and industry execution. We build the builders of tomorrow.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-[var(--text-main)] font-bold mb-6 uppercase tracking-wider text-sm">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">Our Story</Link></li>
                            <li><Link to="/services" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">Capabilities</Link></li>
                            <li><Link to="/events" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">Events & Sprints</Link></li>
                            <li><Link to="/gallery" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">Community</Link></li>
                        </ul>
                    </div>
                    
                    <div className="md:col-span-4">
                        <h4 className="text-[var(--text-main)] font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 text-[var(--primary-brand)]"><i className="fas fa-map-marker-alt"></i></div>
                                <span className="text-[var(--text-muted)]">Hyderabad, India<br/>Innovation Hub</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="text-[var(--primary-brand)]"><i className="fas fa-phone"></i></div>
                                <a href="tel:+917659906008" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">+91 7659906008</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="text-[var(--primary-brand)]"><i className="fas fa-envelope"></i></div>
                                <a href="mailto:info.e@techroxx.in" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">info.e@techroxx.in</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[var(--text-muted)] text-sm">&copy; {new Date().getFullYear()} Tech Roxx. All Rights Reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <Link to="/privacy-policy" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="text-[var(--text-muted)] hover:text-[var(--primary-brand)] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
