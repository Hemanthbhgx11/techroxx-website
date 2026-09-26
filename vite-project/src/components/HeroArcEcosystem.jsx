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

// --- 1. COSMIC SMOKE CANVAS BACKDROP (LIGHT/CLEAN AMBIENCE) ---
export const CosmicSmokeCanvas = () => {
  return null;
};

// --- 2. HERO ARC & ECOSYSTEM INTERFACE ---
export const HeroArcEcosystem = ({ onSelectNode, onExploreEcosystem, activeNodeId, onNodeHover }) => {
  const theme = useActiveTheme();
  const isLight = theme === 'light';

  return (
    <section className={`hero ${isLight ? 'hero-light' : 'hero-dark'}`} id="home">
      <style>{`
        :root {
          --bg-hero: #FFFFFF;
          --text-primary: #0A0F1D;
          --text-secondary: #475569;
          --text-muted: #64748B;
          --c-orange: #FF5500;
          --c-orange-bright: #FF6E1A;
          --c-purple: #8B5CF6;
          --c-gold: #FBBF24;
          --font-body: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          --font-heading: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6.5rem 1.5rem 4rem;
          overflow: hidden;
          background: #FFFFFF;
          font-family: var(--font-body);
        }

        /* Clean Background Plate with Subtle Horizon & Platforms */
        .hero-bg {
          position: absolute;
          inset: 0;
          background: url('/images/hero-clean-plate.png') center bottom / cover no-repeat;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial Vignette to guarantee 100% white, high-contrast typography center */
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle 900px at 50% 46%, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.76) 55%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Faint Peripheral Grid */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at 50% 50%, transparent 35%, black 85%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 35%, black 85%);
          pointer-events: none;
          z-index: 1;
        }

        /* Subtle Ambient Glows */
        .hero-ambient-glows {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .ambient-apex {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 85, 0, 0.08) 0%, transparent 70%);
          filter: blur(40px);
        }

        .ambient-purple {
          display: none;
        }

        .ambient-blue {
          display: none;
        }

        /* Side Technical Micro-Annotations */
        .hero-side-annotation {
          position: absolute;
          display: none;
          flex-direction: column;
          gap: 0.35rem;
          font-family: var(--font-heading), 'Space Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          line-height: 1.6;
          color: #64748B;
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
          z-index: 6;
        }

        @media (min-width: 1280px) {
          .hero-side-annotation {
            display: flex;
          }
          .hero-annotation-tl {
            top: 20%;
            left: 5%;
          }
          .hero-annotation-bl {
            bottom: 18%;
            left: 5%;
          }
          .hero-annotation-tr {
            top: 20%;
            right: 5%;
            text-align: right;
            align-items: flex-end;
          }
          .hero-annotation-br {
            bottom: 18%;
            right: 5%;
            text-align: right;
            align-items: flex-end;
          }
        }

        .annotation-dash {
          width: 16px;
          height: 2px;
          background: #FF5500;
          border-radius: 2px;
          margin-bottom: 0.4rem;
        }

        /* Unified Central Hero Stage */
        .hero-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          z-index: 5;
        }

        /* Trajectory SVG Art */
        .trajectory-art {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1040px;
          max-width: 98vw;
          height: auto;
          pointer-events: none;
          z-index: 2;
          opacity: 0.96;
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

        /* Rotating Concentric Cosmic Rings */
        .hero-cosmic-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 520px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
          opacity: 0.22;
        }

        @media (max-width: 768px) {
          .hero-cosmic-rings {
            width: 320px;
            height: 320px;
          }
        }

        .eco-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .eco-ring-1 {
          width: 400px;
          height: 400px;
          border: 1px dashed rgba(15, 23, 42, 0.16);
          animation: spin 65s linear infinite;
        }

        .eco-ring-2 {
          width: 540px;
          height: 540px;
          border: 1px dotted rgba(255, 85, 0, 0.24);
          animation: spin-reverse 75s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        /* Hero Content: Centered in the middle */
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.65rem;
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        /* Master Title */
        .hero-title {
          font-family: 'Arial Black', Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
          margin: 0 !important;
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.04em !important;
          text-transform: uppercase !important;
          user-select: none !important;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.95)) drop-shadow(0 8px 20px rgba(10, 15, 29, 0.16)) !important;
        }

        .hero-title-row {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.14em !important;
          font-size: clamp(3.2rem, 7.6vw, 5.4rem) !important;
          font-weight: 900 !important;
          line-height: 1 !important;
          letter-spacing: -0.015em !important;
        }

        /* TECH: Solid Vibrant Orange - Crisp Separation, No Blurry Glow */
        .hero-brand-tech {
          color: #FF5500 !important;
          font-weight: 900 !important;
          line-height: inherit !important;
          background: none !important;
          -webkit-text-fill-color: #FF5500 !important;
          display: inline-block !important;
          letter-spacing: -0.015em !important;
          text-shadow: none !important;
        }

        /* ROXX: Solid Deep Dark Navy */
        .hero-brand-roxx {
          color: #0A0F1D !important;
          font-weight: 900 !important;
          line-height: inherit !important;
          background: none !important;
          -webkit-text-fill-color: #0A0F1D !important;
          display: inline-block !important;
          letter-spacing: -0.015em !important;
          text-shadow: none !important;
        }

        /* ECOSYSTEM.: Solid Dark ECOSY + Crisp Orange Outlined STEM. */
        .hero-ecosystem-title {
          display: inline-flex !important;
          align-items: baseline !important;
          justify-content: center !important;
          font-family: 'Arial Black', Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
          font-size: clamp(2.8rem, 6.7vw, 4.9rem) !important;
          font-weight: 900 !important;
          letter-spacing: 0.02em !important;
          text-transform: uppercase !important;
          line-height: 1 !important;
          user-select: none !important;
          margin: 0.15rem auto 0.45rem auto !important;
          text-align: center !important;
        }

        .eco-solid {
          color: #0A0F1D !important;
          -webkit-text-fill-color: #0A0F1D !important;
          display: inline-block !important;
        }

        .eco-outline {
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
          -webkit-text-stroke: clamp(2.2px, 0.055em, 3.2px) #FF5500 !important;
          display: inline-block !important;
        }

        .eco-dot {
          color: #FF5500 !important;
          -webkit-text-fill-color: #FF5500 !important;
          -webkit-text-stroke: 0 !important;
          display: inline-block !important;
          margin-left: 0.03em !important;
        }

        /* Motto: LEARN • BUILD • INNOVATE */
        .hero-motto {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          font-weight: 700;
          font-size: clamp(0.78rem, 1.4vw, 0.92rem);
          letter-spacing: 0.28em;
          text-indent: 0.28em;
          text-transform: uppercase;
          color: #64748B;
          margin: 0.6rem auto 0.4rem auto !important;
          user-select: none;
        }

        .motto-word {
          color: #64748B;
          transition: color 0.25s ease;
        }

        .motto-word:hover {
          color: #FF5500;
        }

        .motto-dot {
          color: #FF5500;
          font-size: 1.1em;
          filter: drop-shadow(0 0 6px rgba(255, 85, 0, 0.6));
        }

        /* Subtitle / Main Headline */
        .hero-subtitle {
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          font-size: clamp(1.35rem, 2.7vw, 1.95rem) !important;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -0.015em;
          color: #0A0F1D;
          margin: 0.4rem auto 0.25rem auto !important;
          max-width: 820px;
          text-align: center;
        }

        .hero-subtitle-highlight {
          color: #FF5500;
          font-weight: 800;
        }

        /* Narrative Paragraph */
        .hero-desc {
          font-size: clamp(0.92rem, 1.35vw, 1.05rem) !important;
          line-height: 1.6 !important;
          color: #475569 !important;
          max-width: 680px;
          margin: 0.35rem auto 0 !important;
          text-align: center;
        }

        /* CTA Buttons */
        .hero-actions {
          display: flex;
          gap: 1.1rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1.35rem;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 2.2rem;
          background: linear-gradient(135deg, #FF5500 0%, #FF6E1A 100%);
          color: #FFFFFF !important;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(255, 85, 0, 0.35);
          cursor: pointer;
          border: none;
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(255, 85, 0, 0.48);
          color: #FFFFFF !important;
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 2.2rem;
          background: #FFFFFF;
          color: #0A0F1D !important;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .hero-btn-secondary:hover {
          border-color: #FF5500;
          color: #FF5500 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 991px) {
          .hero {
            padding: 5rem 1.25rem 3rem;
          }
          .hero-content {
            gap: 0.85rem;
          }
          .hero-desc {
            max-width: 100%;
          }
        }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="hero-bg" />
      <div className="hero-bg-overlay" />
      <div className="hero-grid" />
      
      <div className="hero-ambient-glows">
        <div className="ambient-apex" />
        <div className="ambient-purple" />
        <div className="ambient-blue" />
      </div>

      {/* SIDE TECHNICAL MICRO-ANNOTATIONS (Desktop art-direction) */}
      <div className="hero-side-annotation hero-annotation-tl" aria-hidden="true">
        <div className="annotation-dash" />
        <span>PEOPLE</span>
        <span>IDEAS</span>
        <span>INDUSTRY</span>
        <span>IMPACT</span>
      </div>

      <div className="hero-side-annotation hero-annotation-bl" aria-hidden="true">
        <div className="annotation-dash" />
        <span>A BRIGHTER</span>
        <span>TECH TOMORROW</span>
      </div>

      <div className="hero-side-annotation hero-annotation-tr" aria-hidden="true">
        <div className="annotation-dash" />
        <span>SKILLS</span>
        <span>OPPORTUNITIES</span>
        <span>COLLABORATION</span>
        <span>GROWTH</span>
      </div>

      <div className="hero-side-annotation hero-annotation-br" aria-hidden="true">
        <div className="annotation-dash" />
        <span>BUILDING</span>
        <span>A CONNECTED</span>
        <span>TOMORROW</span>
      </div>

      {/* UNIFIED HERO STAGE */}
      <div className="hero-stage">
        {/* ROTATING CONCENTRIC COSMIC RINGS IN BACKGROUND */}
        <div className="hero-cosmic-rings" aria-hidden="true">
          <div className="eco-ring eco-ring-1" />
          <div className="eco-ring eco-ring-2" />
        </div>

        {/* TRAJECTORY ART SVG - COMPLETE SOLID ORANGE, NO GRADIENT */}
        <svg className="trajectory-art" viewBox="0 0 1000 560" aria-hidden="true">
          <defs>
            <filter id="refined-arc-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* COLOR FILLED ARC RIBBON - 100% SOLID ORANGE */}
          <path
            className="trajectory-arc-fill"
            d="M 55 405 C 235 68, 765 68, 945 405 C 765 92, 235 92, 55 405 Z"
            fill="#FF5500"
            stroke="#FF5500"
            strokeWidth="1.5"
            filter="url(#refined-arc-glow)"
          />

          {/* ARROW SHAFT (VERTICAL LASER TAPER) */}
          <path
            d="M 498 440 L 502 440 L 501.5 120 L 498.5 120 Z"
            fill="#FF5500"
            filter="url(#refined-arc-glow)"
          />

          {/* DISTINCT ARROWHEAD (POINTING UPWARDS AT THE APEX) */}
          <polygon
            points="500,80 487,118 496,113 498,122 502,122 504,113 513,118"
            fill="#FF5500"
            stroke="#FF5500"
            strokeWidth="1.5"
            filter="url(#refined-arc-glow)"
          />

          {/* APEX GLOW & PULSE */}
          <circle cx="500" cy="80" r="4.5" fill="#FF5500" />
          <circle cx="500" cy="80" r="14" fill="#FF5500" opacity="0.35" className="pulse-dot" />
        </svg>

        {/* HERO MAIN CONTENT (CENTERED ALIGNMENT) */}
        <div className="hero-content">
          <h1 className="hero-title">
            <div className="hero-title-row">
              <span className="hero-brand-tech">TECH</span>
              <span className="hero-brand-roxx">ROXX</span>
            </div>
            
            {/* ECOSYSTEM: Two-Tone Split Typography (Solid Dark ECOSY + Orange Outlined STEM.) */}
            <div className="hero-ecosystem-title" aria-label="ECOSYSTEM.">
              <span className="eco-solid">ECOSY</span>
              <span className="eco-outline">STEM</span>
              <span className="eco-dot">.</span>
            </div>
          </h1>

          {/* MOTTO */}
          <div className="hero-motto">
            <span className="motto-word">LEARN</span>
            <span className="motto-dot">•</span>
            <span className="motto-word">BUILD</span>
            <span className="motto-dot">•</span>
            <span className="motto-word">INNOVATE</span>
          </div>

          {/* IMPACTFUL CAPTION */}
          <h2 className="hero-subtitle">
            One Ecosystem for Every Step<br />
            of Your <span className="hero-subtitle-highlight">Professional Journey.</span>
          </h2>

          {/* SUPPORTING DESCRIPTION */}
          <p className="hero-desc">
            Learn, create, work, grow and turn ideas into real-world impact — all in one connected ecosystem.
          </p>

          {/* CALL TO ACTION BUTTONS */}
          <div className="hero-actions">
            <button
              onClick={onExploreEcosystem}
              className="hero-btn-primary group"
              type="button"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                const node = ECOSYSTEM_NODES.find(n => n.id === 'events');
                if (node && onSelectNode) onSelectNode(node);
                else window.location.href = '/events';
              }}
              className="hero-btn-secondary"
              type="button"
            >
              <Calendar className="w-4 h-4 text-[#FF5500]" />
              <span>View Events</span>
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
