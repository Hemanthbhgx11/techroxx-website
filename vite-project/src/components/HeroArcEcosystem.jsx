import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Settings,
  GraduationCap,
  Briefcase,
  Calendar,
  UserPlus,
  ArrowRight,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle2,
  Send,
  Target,
  BookOpen,
  Cpu,
  Rocket,
  Code,
  Cloud,
  Image as ImageIcon
} from 'lucide-react';

// Custom Hook to track theme changes dynamically
export const useActiveTheme = () => {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current);
    };

    updateTheme();
    const observer = new MutationObserver(() => updateTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
};

// Icon Renderer Helper
const iconMap = {
  Settings,
  GraduationCap,
  Briefcase,
  Calendar,
  UserPlus,
  ArrowRight,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle2,
  Send,
  Target,
  BookOpen,
  Cpu,
  Rocket,
  Image: ImageIcon
};

export const Icon = ({ name, className = "w-5 h-5" }) => {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} />;
};

// Data Structure for Ecosystem Nodes
export const ECOSYSTEM_NODES = [
  {
    id: 'services',
    name: 'SERVICES',
    shortLabel: 'Enterprise & R&D',
    iconName: 'Settings',
    color: '#ff6200',
    accentColor: '#ff8a00',
    tagline: 'Custom Software, AI Integration & Digital Transformation',
    description: 'We empower enterprises and high-growth startups with battle-tested engineering, scalable cloud infrastructure, and frontier AI research solutions tailored to modern industry demands.',
    highlights: [
      'Enterprise AI & Machine Learning Systems',
      'Full-Scale Cloud Architecture & DevOps Automation',
      'High-Performance Web & Mobile App Ecosystems',
      'Technical Consulting & Academic-to-Commercial R&D'
    ],
    stats: [
      { label: 'Client Projects Delivered', value: '140+' },
      { label: 'Industry Partners', value: '45+' },
      { label: 'Uptime SLA', value: '99.99%' }
    ],
    actionLabel: 'Request Enterprise Consultation',
    path: '/services'
  },
  {
    id: 'learn',
    name: 'LEARN',
    shortLabel: 'Academy & Tracks',
    iconName: 'GraduationCap',
    color: '#ff7700',
    accentColor: '#ffaa33',
    tagline: 'Next-Gen Practical Tech Education for Future Innovators',
    description: 'Bridge the gap between theoretical curriculum and practical tech mastery through hands-on bootcamps, project-based curriculums, and direct mentorship from senior engineers.',
    highlights: [
      'Interactive Full-Stack Web3 & Modern React Tracks',
      'Applied Generative AI & Deep Learning Masterclasses',
      'Embedded Systems, IoT & Robotics Hardware Labs',
      'Industry-Standard Code Reviews & Portfolio Building'
    ],
    stats: [
      { label: 'Students Enrolled', value: '12,500+' },
      { label: 'Course Completion Rate', value: '94%' },
      { label: 'Practical Project Hours', value: '450k+' }
    ],
    actionLabel: 'Explore Learning Programs',
    path: '/learn'
  },
  {
    id: 'careers',
    name: 'CAREERS',
    shortLabel: 'Talent & Hiring',
    iconName: 'Briefcase',
    color: '#ff5500',
    accentColor: '#ff3700',
    tagline: 'Direct Pipeline to High-Impact Tech Roles & Internships',
    description: 'Connect directly with top tech companies, venture-backed startups, and innovation labs seeking passionate developers, data scientists, and creative technologists.',
    highlights: [
      'Guaranteed Fast-Track Interviews with Partner Companies',
      'Paid Summer & Semester Engineering Internships',
      'Personalized Resume, System Design & Live Mock Interviews',
      'Alumni Referral Network spanning Tier-1 Global Tech Giants'
    ],
    stats: [
      { label: 'Talent Placed', value: '1,850+' },
      { label: 'Average Starting Package', value: '$85k+' },
      { label: 'Hiring Partners', value: '120+' }
    ],
    actionLabel: 'View Active Openings',
    path: '/careers'
  },
  {
    id: 'events',
    name: 'EVENTS',
    shortLabel: 'Summits & Hacks',
    iconName: 'Calendar',
    color: '#a855f7',
    accentColor: '#c084fc',
    tagline: 'Global Hackathons, Tech Summits & Live Code Sprints',
    description: 'Participate in high-energy weekend hackathons, interactive technical workshops, and global conferences connecting minds across borders.',
    highlights: [
      'Annual TECH ROXX Global Innovation Summit',
      'Bi-Weekly 48-Hour Rapid Prototyping Hackathons',
      'Keynote Sessions with Silicon Valley & Tech Pioneers',
      '$150,000+ Distributed in Community Innovation Bounties'
    ],
    stats: [
      { label: 'Events Hosted', value: '80+' },
      { label: 'Hackathon Participants', value: '25,000+' },
      { label: 'Bounties Awarded', value: '$250K+' }
    ],
    actionLabel: 'Register for Next Hackathon',
    path: '/contact'
  },
  {
    id: 'join',
    name: 'JOIN US',
    shortLabel: 'Global Community',
    iconName: 'UserPlus',
    color: '#3b82f6',
    accentColor: '#60a5fa',
    tagline: 'Join a Vibrant Network of 50,000+ Builders Worldwide',
    description: 'Become part of a forward-thinking collective. Collaborate on open-source repositories, gain peer feedback, join localized campus chapters, and grow your tech network.',
    highlights: [
      'Access to 24/7 Global Discord & Developer Hub',
      'Campus Ambassador & Chapter Leadership Opportunities',
      'Weekly Project Showcases with Live Investor Feedback',
      'Exclusive Access to Beta Tech Frameworks & Swag'
    ],
    stats: [
      { label: 'Community Members', value: '52,000+' },
      { label: 'Active Chapters', value: '64 Universities' },
      { label: 'Open-Source Commits', value: '18,000+' }
    ],
    actionLabel: 'Join the TECH ROXX Community',
    path: '/contact'
  },
  {
    id: 'gallery',
    name: 'GALLERY',
    shortLabel: 'Highlights & Media',
    iconName: 'Image',
    color: '#ec4899',
    accentColor: '#f472b6',
    tagline: 'Visual Journey of TechRoxx Events, Summits & Workshops',
    description: 'Explore photos, video highlights, keynotes, and memorable moments from our global tech hackathons, workshops, and community gatherings.',
    highlights: [
      'High-Resolution Summit & Hackathon Photo Albums',
      'Keynote Recording Archives & Tech Demo Sprints',
      'Student Innovation Showcases & Award Ceremonies',
      'Interactive Media Archive & Behind-the-Scenes'
    ],
    stats: [
      { label: 'Photos Uploaded', value: '2,400+' },
      { label: 'Event Captures', value: '50+' },
      { label: 'Community Views', value: '120k+' }
    ],
    actionLabel: 'Explore TechRoxx Gallery',
    path: '/gallery'
  }
];

// --- 1. COSMIC SMOKE CANVAS BACKDROP ---
export const CosmicSmokeCanvas = () => {
  const theme = useActiveTheme();
  const isLight = theme === 'light';

  return (
    <div id="cosmic-smoke-canvas-container" className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-colors duration-500 ${isLight ? 'bg-[#f8fafc]' : 'bg-[#030408]'}`}>
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{
          background: isLight ? `
            radial-gradient(ellipse 85% 70% at 50% 100%, rgba(234, 88, 12, 0.16) 0%, rgba(147, 51, 234, 0.1) 45%, transparent 80%),
            radial-gradient(circle 600px at 15% 95%, rgba(249, 115, 22, 0.2), transparent 70%),
            radial-gradient(circle 700px at 5% 80%, rgba(251, 146, 60, 0.15), transparent 60%),
            radial-gradient(circle 600px at 85% 95%, rgba(168, 85, 247, 0.18), transparent 70%),
            radial-gradient(circle 700px at 95% 80%, rgba(99, 102, 241, 0.15), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 50%, #ffffff 0%, #f1f5f9 100%)
          ` : `
            radial-gradient(ellipse 85% 70% at 50% 100%, rgba(255, 85, 0, 0.45) 0%, rgba(147, 51, 234, 0.35) 45%, transparent 80%),
            radial-gradient(circle 600px at 15% 95%, rgba(255, 68, 0, 0.65), transparent 70%),
            radial-gradient(circle 700px at 5% 80%, rgba(255, 110, 0, 0.5), transparent 60%),
            radial-gradient(circle 600px at 85% 95%, rgba(168, 85, 247, 0.6), transparent 70%),
            radial-gradient(circle 700px at 95% 80%, rgba(99, 102, 241, 0.5), transparent 60%),
            radial-gradient(circle 400px at 50% 10%, rgba(255, 110, 0, 0.12), transparent 70%),
            radial-gradient(ellipse 90% 70% at 50% 50%, #080b14 0%, #030408 100%)
          `
        }}
      />
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isLight ? 'opacity-15' : 'opacity-25'}`}
        style={{
          backgroundImage: isLight ? `
            linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)
          ` : `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, black 100%)'
        }}
      />
      {/* VIBRANT BOTTOM COSMIC SMOKE GLOW ORBS */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${isLight ? 'bg-[#ea580c]/15' : 'bg-[#F2630A]/30'}`} />
      <div className={`absolute bottom-2 left-1/4 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${isLight ? 'bg-[#7C3AED]/10' : 'bg-[#7C3AED]/20'}`} />
      <div className={`absolute bottom-2 right-1/4 translate-x-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${isLight ? 'bg-[#7C3AED]/10' : 'bg-[#7C3AED]/20'}`} />
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full blur-xs pointer-events-none ${isLight ? 'bg-[#ea580c]' : 'bg-white'}`} />
    </div>
  );
};

// --- 2. HERO ARC & ECOSYSTEM INTERFACE ---
export const HeroArcEcosystem = ({ onSelectNode, onExploreEcosystem, activeNodeId, onNodeHover }) => {
  const theme = useActiveTheme();
  const isLight = theme === 'light';

  return (
    <section className={`hero ${isLight ? 'hero-light' : 'hero-dark'}`} id="home">
      <style>{`
        :root {
          --bg-hero: #05060A;
          --bg-surface: #0c0e17;
          --bg-elevated: #131724;
          --border-subtle: rgba(255, 255, 255, 0.08);
          --border-accent: rgba(212, 71, 6, 0.4);
          --text-primary: #F1F3F9;
          --text-secondary: #94A0B8;
          --text-muted: #4F596F;
          --c-orange: #D44706;
          --c-orange-bright: #FF7833;
          --c-purple: #8B5CF6;
          --c-gold: #FBBF24;
          --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-heading: 'Syne', sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        .hero-light {
          --bg-hero: #F8FAFC;
          --bg-surface: #F1F5F9;
          --bg-elevated: #E2E8F0;
          --border-subtle: rgba(15, 23, 42, 0.1);
          --border-accent: rgba(212, 71, 6, 0.5);
          --text-primary: #0F172A;
          --text-secondary: #475569;
          --text-muted: #64748B;
        }

        .hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4.5rem 1.5rem;
          overflow: hidden;
          background: var(--bg-hero);
          font-family: var(--font-body);
          transition: background 0.3s ease;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 30%, rgba(212, 71, 6, 0.12), transparent 50%),
            radial-gradient(circle at 20% 70%, rgba(139, 92, 246, 0.08), transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(212, 71, 6, 0.06), transparent 45%);
          pointer-events: none;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black, transparent 75%);
          pointer-events: none;
        }

        .hero-light .hero-grid {
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
        }

        .hero-orbs {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* Unified Hero Stage: Centered in the middle of the screen */
        .hero-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          z-index: 5;
        }

        /* Trajectory SVG: Centered in the middle with the hero content */
        .trajectory-art {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1040px;
          max-width: 98vw;
          height: auto;
          pointer-events: none;
          z-index: 1;
          opacity: 0.95;
        }

        .pulse-dot {
          animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        /* Rotating Concentric Cosmic Rings: Centered in the middle */
        .hero-cosmic-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
          opacity: 0.28;
        }

        @media (max-width: 768px) {
          .hero-cosmic-rings {
            width: 330px;
            height: 330px;
          }
        }

        .eco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.14);
          pointer-events: none;
        }

        .hero-light .eco-ring {
          border-color: rgba(15, 23, 42, 0.15);
        }

        .eco-ring-1 {
          width: 380px;
          height: 380px;
          animation: spin 45s linear infinite;
        }

        .eco-ring-2 {
          width: 520px;
          height: 520px;
          animation: spin-reverse 55s linear infinite;
          border-style: dotted;
          border-color: rgba(255, 120, 51, 0.28);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        /* Hero Content: Centered in the middle with tight, cohesive spacing */
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.6rem;
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        /* CINEMATIC TECH ROXX MASTER TITLE */
        .hero-title {
          font-family: var(--font-heading), 'Syne', sans-serif !important;
          font-size: clamp(2.8rem, 7vw, 4.5rem) !important;
          font-weight: 800 !important;
          line-height: 0.95 !important;
          letter-spacing: -0.025em !important;
          margin: 0 !important;
          text-align: center !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.24em !important;
          text-transform: uppercase !important;
          user-select: none !important;
        }

        /* TECH: Solid Vibrant Orange (NO GRADIENT) with Ambient Backlight */
        .hero-brand-tech {
          color: #FF5500 !important;
          font-size: inherit !important;
          font-weight: 900 !important;
          line-height: inherit !important;
          background: none !important;
          -webkit-text-fill-color: #FF5500 !important;
          display: inline-block !important;
          letter-spacing: -0.025em !important;
          text-shadow: 0 0 38px rgba(255, 85, 0, 0.45), 0 2px 10px rgba(255, 85, 0, 0.3) !important;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-brand-tech:hover {
          transform: scale(1.03);
        }

        /* ROXX: Solid Pure Black (NO GRADIENT) with Dual-Theme Mastery */
        .hero-brand-roxx {
          color: #000000 !important;
          font-size: inherit !important;
          font-weight: 900 !important;
          line-height: inherit !important;
          background: none !important;
          -webkit-text-fill-color: #000000 !important;
          display: inline-block !important;
          letter-spacing: -0.025em !important;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.16) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* In Dark Theme: Pure Black with Razor Cyber-White Contour Rim */
        .hero-dark .hero-brand-roxx {
          color: #05070E !important;
          -webkit-text-fill-color: #05070E !important;
          -webkit-text-stroke: 2px #FFFFFF !important;
          filter: drop-shadow(0 0 22px rgba(255, 255, 255, 0.28)) !important;
        }

        /* In Light Theme: Solid Razor Jet Black */
        .hero-light .hero-brand-roxx {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          -webkit-text-stroke: 0px transparent !important;
        }

        .hero-brand-roxx:hover {
          transform: scale(1.03);
        }

        /* Large Prominent Orange Ecosystem Pill (Without Any SVG or Logo) */
        .hero-ecosystem-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.48rem 2.2rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF4500 0%, #FF5A00 45%, #FF7700 100%);
          color: #FFFFFF !important;
          font-family: var(--font-heading), sans-serif;
          font-weight: 800;
          font-size: clamp(0.88rem, 1.5vw, 1.02rem);
          letter-spacing: 0.16em;
          text-indent: 0.16em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(255, 85, 0, 0.45), 0 0 35px rgba(255, 85, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          margin: 0 !important;
          user-select: none;
          text-decoration: none;
        }

        .hero-ecosystem-pill:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 32px rgba(255, 85, 0, 0.62), 0 0 45px rgba(255, 85, 0, 0.38), inset 0 1px 1px rgba(255, 255, 255, 0.5);
          color: #FFFFFF !important;
        }

        .hero-ecosystem-pill:active {
          transform: scale(0.98);
        }

        /* Subtitle: Bridging Industry, Innovation, Talent & Technology */
        .hero-subtitle {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(1.05rem, 2.2vw, 1.38rem);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin: 0 auto !important;
          max-width: 720px;
          text-align: center;
          opacity: 0.96;
        }

        .hero-subtitle-highlight {
          color: #FF5500;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(255, 85, 0, 0.4);
        }

        /* Motto: LEARN • BUILD • INNOVATE (No Pill Container, Aesthetic Spacing) */
        .hero-motto {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          font-family: var(--font-heading), sans-serif;
          font-weight: 800;
          font-size: clamp(0.82rem, 1.6vw, 0.96rem);
          letter-spacing: 0.36em;
          text-indent: 0.36em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin: 0 auto !important;
          background: none !important;
          border: none !important;
          padding: 0 !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          user-select: none;
        }

        .motto-word {
          color: var(--text-primary);
          transition: all 0.25s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .motto-word:hover {
          color: #FF5500;
          text-shadow: 0 0 16px rgba(255, 85, 0, 0.55);
        }

        .motto-diamond {
          color: #FF5500;
          font-size: 0.8em;
          filter: drop-shadow(0 0 8px rgba(255, 85, 0, 0.85));
        }

        /* Narrative Paragraph */
        .hero-desc {
          font-size: clamp(0.92rem, 1.6vw, 1.05rem);
          line-height: 1.55;
          color: var(--text-secondary);
          max-width: 630px;
          margin: 0 auto !important;
          text-align: center;
        }

        .hero-desc-lead {
          color: var(--text-primary);
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1.25rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 2.2rem;
          background: linear-gradient(135deg, #FF4500 0%, #FF6000 50%, #FF7A29 100%);
          color: #FFFFFF !important;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 22px rgba(255, 85, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          cursor: pointer;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(255, 85, 0, 0.58), inset 0 1px 0 rgba(255, 255, 255, 0.4);
          color: #FFFFFF !important;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 2.2rem;
          background: var(--bg-surface);
          color: var(--text-primary) !important;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .btn-secondary:hover {
          border-color: rgba(255, 85, 0, 0.6);
          background: var(--bg-elevated);
          transform: translateY(-2px);
          color: var(--text-primary) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12), 0 0 15px rgba(255, 85, 0, 0.15);
        }

        /* Desktop Floating Symmetrical Orbit Nodes */
        .hero-orbit-node {
          position: absolute;
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.55rem 1.1rem 0.55rem 0.6rem;
          border-radius: 9999px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-orbit-node:hover {
          transform: scale(1.08) translateY(-2px);
          border-color: var(--c-orange-bright);
          box-shadow: 0 0 25px rgba(255, 120, 51, 0.45);
        }

        .hero-orbit-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-light .hero-orbit-icon-wrap {
          background: rgba(15, 23, 42, 0.05);
          border-color: rgba(15, 23, 42, 0.1);
        }

        .hero-orbit-orange .hero-orbit-icon-wrap {
          color: var(--c-orange-bright);
          border-color: rgba(255, 120, 51, 0.3);
        }

        .hero-orbit-purple .hero-orbit-icon-wrap {
          color: #A78BFA;
          border-color: rgba(167, 139, 250, 0.3);
        }

        .hero-orbit-orange:hover {
          border-color: var(--c-orange-bright);
        }

        .hero-orbit-purple:hover {
          border-color: #A78BFA;
          box-shadow: 0 0 25px rgba(167, 139, 250, 0.35);
        }

        /* Desktop Symmetrical Wing Positions */
        @media (min-width: 1024px) {
          .hero-orbit-node-0 {
            top: 25%;
            left: max(3.5%, calc(50% - 540px));
            animation: float-node-1 6s ease-in-out infinite;
          }
          .hero-orbit-node-1 {
            bottom: 23%;
            left: max(4.5%, calc(50% - 500px));
            animation: float-node-2 7s ease-in-out infinite;
          }
          .hero-orbit-node-2 {
            top: 25%;
            right: max(3.5%, calc(50% - 540px));
            animation: float-node-2 6.5s ease-in-out infinite;
          }
          .hero-orbit-node-3 {
            bottom: 23%;
            right: max(4.5%, calc(50% - 500px));
            animation: float-node-1 7.5s ease-in-out infinite;
          }
        }

        @keyframes float-node-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes float-node-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }

        /* Mobile Orbit Nodes (Clean Chip Flow) */
        .hero-mobile-orbits {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
          margin-top: 1.25rem;
          width: 100%;
          max-width: 440px;
        }

        .hero-mobile-orbit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.42rem 0.85rem;
          border-radius: 9999px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          font-size: 0.78rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.2s ease;
        }

        .hero-mobile-orbit-btn:active {
          transform: scale(0.96);
        }

        @media (max-width: 991px) {
          .hero {
            padding: 5rem 1.25rem 2.5rem;
          }
          .hero-content {
            gap: 1rem;
          }
          .hero-desc {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-orbs" />

      {/* UNIFIED HERO STAGE: Locks Trajectory Arc, Rings, and Text to the exact same center */}
      <div className="hero-stage">
        {/* ROTATING CONCENTRIC COSMIC RINGS IN BACKGROUND */}
        <div className="hero-cosmic-rings" aria-hidden="true">
        <div className="eco-ring eco-ring-1" />
        <div className="eco-ring eco-ring-2" />
      </div>

      {/* TRAJECTORY ART SVG */}
      <svg className="trajectory-art" viewBox="0 0 1000 560" aria-hidden="true">
        <defs>
          <linearGradient id="trajectory-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D44706" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FF7833" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFA028" stopOpacity="1" />
            <stop offset="75%" stopColor="#FF7833" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D44706" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="trajectory-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D44706" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#FF7833" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="65%" stopColor="#FF7833" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="arrow-shaft-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D44706" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#FF7833" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="1" />
          </linearGradient>

          <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* COLOR FILLED ARC RIBBON */}
        <path
          className="trajectory-arc-fill"
          d="M 55 405 C 235 68, 765 68, 945 405 C 765 92, 235 92, 55 405 Z"
          fill="url(#trajectory-fill)"
          stroke="url(#trajectory-line)"
          strokeWidth="1.5"
          filter="url(#arc-glow)"
          style={{ opacity: isLight ? 0.92 : 0.98 }}
        />

        {/* ARROW SHAFT (VERTICAL LASER TAPER) */}
        <path
          d="M 498 455 L 502 455 L 501.5 120 L 498.5 120 Z"
          fill="url(#arrow-shaft-grad)"
          filter="url(#arc-glow)"
        />

        {/* DISTINCT ARROWHEAD AS BEFORE (POINTING UPWARDS AT THE APEX) */}
        <polygon
          points="500,80 487,118 496,113 498,122 502,122 504,113 513,118"
          fill="#FF7833"
          stroke="#FBBF24"
          strokeWidth="1.5"
          filter="url(#arc-glow)"
        />

        {/* APEX GLOW & PULSE */}
        <circle cx="500" cy="80" r="4.5" fill="#FBBF24" />
        <circle cx="500" cy="80" r="14" fill="#FF7833" opacity="0.35" className="pulse-dot" />
      </svg>


      {/* HERO MAIN CONTENT (CENTERED ALIGNMENT) */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-brand-tech">TECH</span>
          <span className="hero-brand-roxx">ROXX</span>
        </h1>

        <button
          type="button"
          onClick={onExploreEcosystem}
          className="hero-ecosystem-pill"
        >
          Ecosystem
        </button>
        <div className="hero-motto">
          <span className="motto-word">LEARN</span>
          <span className="motto-diamond">•</span>
          <span className="motto-word">BUILD</span>
          <span className="motto-diamond">•</span>
          <span className="motto-word">INNOVATE</span>
        </div>
        <h2 className="hero-subtitle">
          Bridging Industry, Innovation, Talent &amp;{' '}
          <span className="hero-subtitle-highlight">Technology</span>
        </h2>

        <p className="hero-desc">
          A unified ecosystem connecting <span className="hero-desc-lead">students</span>, <span className="hero-desc-lead">professionals</span>, and <span className="hero-desc-lead">industries</span> through practical learning, enterprise innovation, and real-world engineering projects.
        </p>

        <div className="hero-actions">
          <button
            onClick={onExploreEcosystem}
            className="btn-primary"
            type="button"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const node = ECOSYSTEM_NODES.find(n => n.id === 'events');
              if (node && onSelectNode) onSelectNode(node);
              else window.location.href = '/events';
            }}
            className="btn-secondary"
            type="button"
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};

// --- 3. MODALS & DRAWERS ---
export const EcosystemDetailModal = ({ node, onClose, onNavigate }) => {
  if (!node) return null;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student / Learner', interest: node.name });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setFormSubmitted(true);
    setTimeout(() => { setFormSubmitted(false); onClose(); }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090c16] border border-[#ff6200]/40 p-6 sm:p-8 text-white">
        <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center">
          <Icon name="X" className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-4 pr-12">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 shrink-0" style={{ borderColor: node.color, background: `${node.color}22` }}>
            <Icon name="Sparkles" className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#ff8800]">{node.shortLabel}</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-0.5">{node.name}</h2>
            <p className="text-sm text-gray-300">{node.tagline}</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-gray-300 text-sm leading-relaxed">
          {node.description}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {node.stats.map((stat, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-black font-heading text-[#ffaa33]">{stat.value}</span>
              <span className="text-[11px] text-gray-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-mono-tech uppercase text-gray-400 font-bold mb-3">Core Modules & Capabilities</h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {node.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-200">
                <Icon name="CheckCircle2" className="w-4 h-4 shrink-0 mt-0.5 text-[#ff6200]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          {formSubmitted ? (
            <div className="p-6 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/40 text-center">
              <h4 className="font-heading font-bold text-lg text-white">Application Received!</h4>
              <p className="text-xs text-gray-300 mt-1">Our coordinator will contact you at <span className="text-[#ffaa33]">{formData.email}</span>.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <Icon name="Rocket" className="w-4 h-4 text-[#ff7700]" />
                <span>{node.actionLabel}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:border-[#ff6200] focus:outline-none" />
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:border-[#ff6200] focus:outline-none" />
              </div>
              <div className="flex justify-between items-center gap-3 pt-2">
                {node.path && onNavigate ? (
                  <button type="button" onClick={() => onNavigate(node.path)} className="text-xs text-[#ffaa33] hover:underline flex items-center gap-1 font-semibold">
                    <span>Go to {node.name} Page</span>
                    <Icon name="ChevronRight" className="w-3.5 h-3.5" />
                  </button>
                ) : <div />}
                <div className="flex gap-2">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-gray-400 hover:text-white">Cancel</button>
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5500] hover:bg-[#ff6600] text-white text-xs font-bold shadow-[0_0_20px_rgba(255,85,0,0.5)]">
                    <span>Submit Inquiry</span>
                    <Icon name="Send" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* MOBILE ONLY: HORIZONTAL NODES */}
      <div className="absolute bottom-8 w-full z-40 md:hidden px-4">
        <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {ECOSYSTEM_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => onSelectNode(node)}
              className="snap-center shrink-0 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-xs text-white font-heading font-bold uppercase backdrop-blur-md hover:bg-white/10 transition-colors shadow-lg"
            >
              {node.shortLabel}
            </button>
          ))}
        </div>
        <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
};

export const EcosystemOverviewDrawer = ({ isOpen, onClose, onSelectNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090c17] border border-[#ff6200]/40 text-white p-6 sm:p-10">
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center">
          <Icon name="X" className="w-5 h-5" />
        </button>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff8800] text-xs font-mono-tech font-bold uppercase mb-3">
            <Icon name="Sparkles" className="w-3.5 h-3.5" />
            <span>THE TECH ROXX BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight">Bridging Academics to <span className="text-[#ff6200]">Industry</span></h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300">TECH ROXX unifies talent, mentorship, and commercial deployments into an interactive loop.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <Icon name="BookOpen" className="w-6 h-6 text-[#ffaa33] mb-4" />
            <span className="text-xs font-mono-tech text-[#ffaa33] uppercase">Phase 01</span>
            <h3 className="text-xl font-heading font-bold mt-1">Academics & Talent</h3>
            <p className="text-xs text-gray-300 mt-2">60+ partner universities engaged in verified project labs and AI masterclasses.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#ff5500]/15 to-transparent border border-[#ff6200]/50">
            <Icon name="Cpu" className="w-6 h-6 text-[#ff9900] mb-4" />
            <span className="text-xs font-mono-tech text-[#ffaa44] uppercase">Phase 02</span>
            <h3 className="text-xl font-heading font-bold mt-1">Real-World Sprints</h3>
            <p className="text-xs text-gray-200 mt-2">Hands-on commercial sprints where learners solve production tickets.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <Icon name="Rocket" className="w-6 h-6 text-[#60a5fa] mb-4" />
            <span className="text-xs font-mono-tech text-[#60a5fa] uppercase">Phase 03</span>
            <h3 className="text-xl font-heading font-bold mt-1">Enterprise Hiring</h3>
            <p className="text-xs text-gray-300 mt-2">Direct placement into global engineering teams and venture seed grants.</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xs font-mono-tech uppercase text-gray-400 font-bold mb-4">Explore All 5 Dedicated Tracks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ECOSYSTEM_NODES.map((node) => (
              <button key={node.id} onClick={() => { onClose(); onSelectNode(node); }} className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-[#ff6200] text-left transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-[#ff8800] font-bold">{node.name}</span>
                  <Icon name="ArrowRight" className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-300 mt-2 font-medium">{node.shortLabel}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE ONLY: HORIZONTAL NODES */}
      <div className="absolute bottom-8 w-full z-40 md:hidden px-4">
        <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {ECOSYSTEM_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => onSelectNode(node)}
              className="snap-center shrink-0 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-xs text-white font-heading font-bold uppercase backdrop-blur-md hover:bg-white/10 transition-colors shadow-lg"
            >
              {node.shortLabel}
            </button>
          ))}
        </div>
        <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
};
