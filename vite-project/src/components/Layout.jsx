import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const Layout = () => {
    const location = useLocation();

    // Basic SEO handler mapping routes to titles
    useEffect(() => {
        let title = "Tech Roxx | AI, VLSI, IoT & Full Stack Training Institute in Hyderabad";
        let desc = "Tech Roxx Hyderabad offers industry-ready training for CS, ECE, EEE & Bio-Medical students. Master AI, VLSI, Embedded Systems, IoT, Full Stack Dev & Pharma IT.";

        switch (location.pathname) {
            case '/about':
                title = "About Tech Roxx | Leadership & Vision";
                desc = "Meet the leaders behind Tech Roxx, Mr. Hemanth Goud Burra and Mr. Keerthi Shiva Prasad. We bridge the gap between academics and industry.";
                break;
            case '/departments':
                title = "Departments & Courses | Tech Roxx";
                desc = "Explore specialized tracks in Computing (CSE), Electronics (ECE/EEE), and Arts & Management.";
                break;
            case '/services':
                title = "Services, Workshops & Consultancy | Tech Roxx";
                desc = "We offer Workshops, Internships, Hackathons, and specialized Consultancy in Real Estate, Foreign Education, and R&D.";
                break;
            case '/partners':
                title = "Our Partners & Collaborations | Tech Roxx";
                desc = "Tech Roxx partners with industry organizations to provide real-time projects and student internships.";
                break;
            case '/gallery':
                title = "Gallery | Tech Roxx Ecosystem";
                desc = "Explore the Tech Roxx ecosystem through photos and videos. See our team, achievements, and project showcases.";
                break;
            case '/learn':
                title = "Learn | Tech Roxx Interactive Academy";
                desc = "Master next-gen engineering courses and professional coding guides offered by Tech Roxx. Explore paid and free learning plans.";
                break;
            case '/contact':
                title = "Join Tech Roxx Community | Contact Us";
                desc = "Contact Tech Roxx for enrollment, pricing, and course details. Join our WhatsApp community for regular job updates.";
                break;
            default:
                if (location.pathname.startsWith('/departments/')) {
                    title = "Course Details | Tech Roxx Courses";
                } else if (location.pathname.startsWith('/services/programs/')) {
                    title = "Programs | Tech Roxx";
                }
                break;
        }

        document.title = title;
        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", desc);
    }, [location.pathname]);

    return (
        <>
            {/* Backdrop waves removed to prevent performance lag and rendering artifacts */}
            <div className="backdrop-waves"></div>

            <Navbar />
            <main style={{ position: 'relative' }}>
                <Outlet />
            </main>
            <ChatWidget />
            <Footer />
        </>
    );
};

export default Layout;
