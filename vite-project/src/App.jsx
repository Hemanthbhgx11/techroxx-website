import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Keep critical, small, or initial views synchronously imported to avoid initial loading flicker
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Lazy load large/heavy pages
const DepartmentDetails = lazy(() => import('./pages/DepartmentDetails'));
const TopicDetails = lazy(() => import('./pages/TopicDetails'));
const Services = lazy(() => import('./pages/Services'));
const ProgramDetails = lazy(() => import('./pages/ProgramDetails'));
const ConsultancyDetails = lazy(() => import('./pages/ConsultancyDetails'));
const JobRoles = lazy(() => import('./pages/JobRoles'));
const JobArchitect = lazy(() => import('./pages/JobArchitect'));
const Careers = lazy(() => import('./pages/Careers'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Learn = lazy(() => import('./pages/Learn'));
const Events = lazy(() => import('./pages/Events'));
const EventDetails = lazy(() => import('./pages/EventDetails'));

// Standard premium glassmorphic loader
const LoadingFallback = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%',
        position: 'relative'
    }}>
        <div style={{
            position: 'relative',
            width: '64px',
            height: '64px'
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '4px solid transparent',
                borderTopColor: 'var(--primary-brand)',
                animation: 'spin 1s linear infinite'
            }}></div>
            <div style={{
                position: 'absolute',
                inset: '8px',
                borderRadius: '50%',
                border: '4px solid transparent',
                borderBottomColor: 'var(--secondary-blue)',
                animation: 'spin 1.5s linear infinite'
            }}></div>
        </div>
        <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

const App = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingFallback />}>
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
                        <Route path="careers/:profileId" element={<Careers />} />
                        <Route path="partners" element={<Navigate to="/careers" replace />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="gallery" element={<Gallery />} />
                        <Route path="events" element={<Events />} />
                        <Route path="events/:eventSlug" element={<EventDetails />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
