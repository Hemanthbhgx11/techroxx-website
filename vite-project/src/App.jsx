import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import DepartmentDetails from './pages/DepartmentDetails';
import TopicDetails from './pages/TopicDetails';
import Services from './pages/Services';
import ProgramDetails from './pages/ProgramDetails';
import ConsultancyDetails from './pages/ConsultancyDetails';
import JobRoles from './pages/JobRoles';
import JobArchitect from './pages/JobArchitect';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Learn from './pages/Learn';

// Note: Main CSS is now handled in main.jsx via imports
// and data is centralized in src/data/constants.js

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="departments" element={<Navigate to="/services" replace />} />
                    <Route path="departments/:id" element={<Navigate to="/services" replace />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/:slug" element={<DepartmentDetails />} />
                    <Route path="services/:slug/topic/:topicId" element={<TopicDetails />} />
                    <Route path="services/programs/:id" element={<ProgramDetails />} />
                    <Route path="services/consultancy/:id" element={<ConsultancyDetails />} />
                    <Route path="services/job-roles" element={<JobRoles />} />
                    <Route path="services/job-architect" element={<JobArchitect />} />
                    <Route path="learn" element={<Learn />} />
                    <Route path="learn/:slug" element={<Learn />} />
                    <Route path="careers" element={<Careers />} />
                    <Route path="partners" element={<Navigate to="/careers" replace />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="gallery" element={<Gallery />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
