import React, { useState } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';

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
  return (
    <div id="cosmic-smoke-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030408]">
      <div 
        className="absolute inset-0 w-full h-full opacity-100"
        style={{
          background: `
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
        className="absolute inset-0 w-full h-full opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, black 100%)'
        }}
      />
      {/* VIBRANT BOTTOM COSMIC SMOKE GLOW ORBS */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-[#F2630A]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-2 left-1/4 -translate-x-1/2 w-96 h-48 rounded-full bg-[#7C3AED]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-2 right-1/4 translate-x-1/2 w-96 h-48 rounded-full bg-[#7C3AED]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white blur-xs pointer-events-none" />
    </div>
  );
};

// --- 2. HERO ARC & ECOSYSTEM INTERFACE ---
export const HeroArcEcosystem = ({ onSelectNode, onExploreEcosystem, activeNodeId, onNodeHover }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodeIndexMap = { services: '01', learn: '02', careers: '03', events: '04', join: '05', gallery: '06' };
  
  // Left Wing forming '<' chevron: LEARN (top), SERVICES (middle apex), CAREERS (bottom)
  // Right Wing forming '>' chevron: EVENTS (top), JOIN US (middle apex), GALLERY (bottom)
  const nodeConfigMap = {
    learn: { num: '02', posClass: 'top-[16%] left-[6%] xs:left-[8%] sm:left-[13%] md:left-[16%]' },
    services: { num: '01', posClass: 'top-[48%] left-[2%] xs:left-[3%] sm:left-[4%] md:left-[5%]' },
    careers: { num: '03', posClass: 'top-[80%] left-[6%] xs:left-[8%] sm:left-[13%] md:left-[16%]' },

    events: { num: '04', posClass: 'top-[16%] right-[6%] xs:right-[8%] sm:right-[13%] md:right-[16%]' },
    join: { num: '05', posClass: 'top-[48%] right-[2%] xs:right-[3%] sm:right-[4%] md:right-[5%]' },
    gallery: { num: '06', posClass: 'top-[80%] right-[6%] xs:right-[8%] sm:right-[13%] md:right-[16%]' }
  };

  return (
    <div className="relative w-full h-[100dvh] max-h-screen flex flex-col items-center justify-center pt-12 sm:pt-20 pb-4 px-2 sm:px-6 z-10 select-none overflow-hidden">
      
      {/* LAYER 1A: DESKTOP SVG ARC & SHINING LINE (FULL-BLEED SEMI-SPHERE TOUCHING DESKTOP EDGES) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:flex items-center justify-center pt-6 sm:pt-16">
        <div className="relative w-full max-w-full h-full max-h-[860px] flex items-center justify-center px-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 680" preserveAspectRatio="none">
            <defs>
              <filter id="glow-super-bright" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feGaussianBlur stdDeviation="18" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="taperedArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff4400" stopOpacity="0.75" />
                <stop offset="15%" stopColor="#ff7700" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#ff9900" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="65%" stopColor="#ff9900" stopOpacity="1" />
                <stop offset="85%" stopColor="#ff7700" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#ff4400" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="taperedLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="5%" stopColor="#ffee88" stopOpacity="1" />
                <stop offset="25%" stopColor="#ff9900" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#ff6600" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ff4400" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="coreLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#ffeebb" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffaa44" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Full-Bleed Radiant Desktop Semi-Circle Arc Path Touching Screen Edges */}
            <g id="semi-circle-arc-desktop" transform="translate(0, 68)">
              <path d="M -40 540 A 540 440 0 0 1 1040 540 A 540 420 0 0 0 -40 540 Z" fill="url(#taperedArcGrad)" filter="url(#glow-super-bright)" />
              <path d="M -40 540 A 540 439 0 0 1 1040 540" fill="none" stroke="#ff7700" strokeWidth="7" strokeOpacity="0.75" filter="url(#glow-super-bright)" />
              <path d="M -40 540 A 540 437 0 0 1 1040 540" fill="none" stroke="#ffbb00" strokeWidth="4" strokeOpacity="0.95" filter="url(#glow-super-bright)" />
              <path d="M -40 540 A 540 435 0 0 1 1040 540" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeOpacity="1" filter="url(#glow-super-bright)" />
            </g>

            <g id="shining-line-desktop">
              <path d="M 500 90 Q 508 118 508 145 L 501.8 660 L 498.2 660 L 492 145 Q 492 118 500 90 Z" fill="#ff6600" opacity="0.35" filter="url(#glow-super-bright)" />
              <path d="M 500 92 Q 506 118 506 143 L 501.1 660 L 498.9 660 L 494 143 Q 494 118 500 92 Z" fill="url(#taperedLineGrad)" filter="url(#glow-super-bright)" />
              <path d="M 500 93 Q 502.5 118 502.5 143 L 500.5 650 L 499.5 650 L 497.5 143 Q 497.5 118 500 93 Z" fill="url(#coreLineGrad)" opacity="0.95" />
            </g>
          </svg>
        </div>
      </div>

      {/* LAYER 1B: MOBILE SVG ARC & SHINING LINE (PERFECT UN-DISTORTED SEMI-CIRCLE DOME) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex md:hidden items-center justify-center pt-4">
        <div className="relative w-full max-w-full h-full max-h-[720px] flex items-center justify-center px-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow-super-bright-mobile" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur1" />
                <feGaussianBlur stdDeviation="15" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="taperedArcGradMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff4400" stopOpacity="0.75" />
                <stop offset="15%" stopColor="#ff7700" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#ff9900" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="65%" stopColor="#ff9900" stopOpacity="1" />
                <stop offset="85%" stopColor="#ff7700" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#ff4400" stopOpacity="0.75" />
              </linearGradient>
            </defs>

            {/* Pristine Perfect Geometric Semi-Circle Mobile Dome */}
            <g id="semi-circle-arc-mobile" transform="translate(0, 45)">
              <path d="M -10 480 A 510 420 0 0 1 1010 480 A 510 400 0 0 0 -10 480 Z" fill="url(#taperedArcGradMobile)" filter="url(#glow-super-bright-mobile)" />
              <path d="M -10 480 A 510 419 0 0 1 1010 480" fill="none" stroke="#ff7700" strokeWidth="6" strokeOpacity="0.75" filter="url(#glow-super-bright-mobile)" />
              <path d="M -10 480 A 510 417 0 0 1 1010 480" fill="none" stroke="#ffbb00" strokeWidth="3.5" strokeOpacity="0.95" filter="url(#glow-super-bright-mobile)" />
              <path d="M -10 480 A 510 415 0 0 1 1010 480" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="1" filter="url(#glow-super-bright-mobile)" />
            </g>

            <g id="shining-line-mobile">
              <path d="M 500 80 Q 508 108 508 135 L 501.8 580 L 498.2 580 L 492 135 Q 492 108 500 80 Z" fill="#ff6600" opacity="0.35" filter="url(#glow-super-bright-mobile)" />
              <path d="M 500 82 Q 506 108 506 133 L 501.1 580 L 498.9 580 L 494 133 Q 494 108 500 82 Z" fill="url(#taperedLineGrad)" filter="url(#glow-super-bright-mobile)" />
              <path d="M 500 83 Q 502.5 108 502.5 133 L 500.5 570 L 499.5 570 L 497.5 133 Q 497.5 108 500 83 Z" fill="url(#coreLineGrad)" opacity="0.95" />
            </g>
          </svg>
        </div>
      </div>

      {/* LAYER 2: CLEAN CRYSTAL COSMIC BACKDROP (NO ARTIFICIAL BLUR OR DARK OVERLAY SPOTS) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(ellipse 90% 30% at 50% 0%, rgba(3, 4, 8, 0.4) 0%, transparent 100%),
            radial-gradient(ellipse 90% 30% at 50% 100%, rgba(3, 4, 8, 0.2) 0%, transparent 100%)
          `
        }}
      />

      {/* LAYER 3: 6 ECOSYSTEM BOX DISPLAYS IN BULMA HERO CHEVRON LAYOUT */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-30 hidden md:block">
        {ECOSYSTEM_NODES.map((node, index) => {
          const cfg = nodeConfigMap[node.id] || { num: '01', posClass: 'top-10 left-10' };

          return (
            <div
              key={node.id}
              className={`absolute ${cfg.posClass} pointer-events-auto flex flex-col items-center group transition-all duration-300`}
            >
              <button
                onClick={() => onSelectNode(node)}
                style={{ '--node-delay': `${index * 0.1}s` }}
                className="hero-node-animate relative text-left cursor-pointer pointer-events-auto transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none"
              >
                <div className="hero-bulma-card-box relative rounded-2xl bg-[#090c1a]/92 backdrop-blur-xl border border-[#ff6200]/55 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(255,98,0,0.25)] group-hover:border-[#ff8800] group-hover:shadow-[0_12px_40px_rgba(255,98,0,0.5)] group-hover:bg-[#0e142c]/95 transition-all duration-300 w-48 sm:w-56 md:w-60 lg:w-64">
                  {/* Icon Box with Gradient Accent */}
                  <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff8800] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,85,0,0.5)] group-hover:scale-110 transition-transform">
                    <div className="w-full h-full rounded-[10px] bg-[#090c17] flex items-center justify-center">
                      <Icon name={node.iconName} className="w-5 h-5 text-[#ffaa33] group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-heading font-black text-xs sm:text-sm text-white tracking-wider group-hover:text-[#ffaa33] transition-colors truncate">
                        {node.name}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-300 font-medium line-clamp-1 leading-snug">
                      {node.shortLabel}
                    </p>
                  </div>

                  {/* Direct Arrow Indicator */}
                  <div className="shrink-0 text-gray-400 group-hover:text-[#ff8800] group-hover:translate-x-1 transition-all">
                    <Icon name="ChevronRight" className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* SCOPED UNBREAKABLE RESPONSIVE PADDING & MARGIN CSS STYLES + ENTRY ANIMATIONS */}
      <style>{`
        @keyframes heroFadeInScale {
          0% { opacity: 0; transform: scale(0.94) translateY(22px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes nodePopIn {
          0% { opacity: 0; transform: scale(0.4) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .hero-title-animate {
          animation: heroFadeInScale 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-motto-animate {
          animation: heroFadeInScale 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }
        .hero-pill-animate {
          animation: heroFadeInScale 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .hero-desc-animate {
          animation: heroFadeInScale 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
          opacity: 0;
        }
        .hero-btn-animate {
          animation: heroFadeInScale 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
        }
        .hero-node-animate {
          animation: nodePopIn 0.75s cubic-bezier(0.16, 1, 0.3, 1) var(--node-delay, 0s) forwards;
          opacity: 0;
        }

        .hero-bulma-card-box {
          padding: 12px 16px !important;
          margin: 4px !important;
          gap: 12px !important;
          display: flex !important;
          align-items: center !important;
        }
        @media (max-width: 640px) {
          .hero-bulma-card-box {
            padding: 8px 12px !important;
            margin: 2px !important;
            gap: 8px !important;
          }
        }
        .hero-mobile-bulma-card {
          padding: 10px 14px !important;
          margin: 0 4px !important;
          gap: 10px !important;
          display: flex !important;
          align-items: center !important;
        }

        .hero-cyber-pill-badge {
          padding: 7px 20px !important;
          margin-top: 14px !important;
          margin-bottom: 14px !important;
          display: inline-flex !important;
          align-items: center !important;
        }
        @media (max-width: 640px) {
          .hero-cyber-pill-badge {
            padding: 5px 12px !important;
            margin-top: 8px !important;
            margin-bottom: 8px !important;
          }
        }
        .hero-pill-inner-tag {
          padding: 3px 10px !important;
          display: inline-flex !important;
          align-items: center !important;
        }
        @media (max-width: 640px) {
          .hero-pill-inner-tag {
            padding: 2px 7px !important;
          }
        }
        .hero-description-paragraph {
          padding-left: 10px !important;
          padding-right: 10px !important;
          margin-top: 10px !important;
          margin-bottom: 14px !important;
          line-height: 1.6 !important;
        }
        @media (max-width: 640px) {
          .hero-description-paragraph {
            padding-left: 6px !important;
            padding-right: 6px !important;
            margin-top: 6px !important;
            margin-bottom: 10px !important;
          }
        }
        .hero-cta-explore-btn {
          padding: 12px 34px !important;
          margin-top: 14px !important;
          margin-bottom: 8px !important;
          display: inline-flex !important;
          align-items: center !important;
        }
        @media (max-width: 640px) {
          .hero-cta-explore-btn {
            padding: 8px 22px !important;
            margin-top: 8px !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>

      {/* LAYER 4: CENTER HERO TEXT & CTA (NON-OVERLAPPING RESPONSIVE SCOPED CONTAINER) */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center max-w-[92vw] xs:max-w-[90vw] sm:max-w-xl md:max-w-lg lg:max-w-xl xl:max-w-2xl px-2 sm:px-4 pointer-events-auto my-auto pt-10 sm:pt-28 pb-4 transform translate-y-[3%] sm:translate-y-[9%]">
        
        {/* Main Title: TECH ROXX */}
        <h1 className="hero-title-animate flex items-center justify-center font-heading font-black text-6xl xs:text-7xl sm:text-7xl md:text-6xl lg:text-6xl xl:text-7xl tracking-tight leading-[0.95] mb-3 sm:mb-6">
          <span className="text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)]">TECH</span>
          <span className="ml-2.5 xs:ml-3.5 sm:ml-5 bg-gradient-to-r from-[#ff5500] via-[#ff6600] to-[#ff8800] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(255,98,0,0.7)]">ROXX</span>
        </h1>

        {/* Motto: LEARN • BUILD • INNOVATE */}
        <div className="hero-motto-animate mb-3 sm:mb-5 flex items-center justify-center text-xs xs:text-sm sm:text-base font-heading font-extrabold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.5em] uppercase text-gray-100">
          <span>LEARN</span>
          <span className="mx-2 sm:mx-4 text-[#ff6200] font-black text-xs sm:text-base drop-shadow-[0_0_10px_rgba(255,98,0,0.8)]">•</span>
          <span>BUILD</span>
          <span className="mx-2 sm:mx-4 text-[#ff6200] font-black text-xs sm:text-base drop-shadow-[0_0_10px_rgba(255,98,0,0.8)]">•</span>
          <span>INNOVATE</span>
        </div>

        {/* RESPONSIVE CYBER CORE ECOSYSTEM BADGE PILL */}
        <div 
          style={{ 
            background: 'linear-gradient(135deg, rgba(13, 18, 36, 0.95) 0%, rgba(22, 29, 54, 0.95) 50%, rgba(13, 18, 36, 0.95) 100%)',
            border: '1px solid rgba(255, 98, 0, 0.65)',
            boxShadow: '0 0 20px rgba(255, 98, 0, 0.3), inset 0 0 10px rgba(255, 98, 0, 0.15)'
          }}
          className="hero-pill-animate hero-cyber-pill-badge gap-2 xs:gap-2.5 sm:gap-3 rounded-full backdrop-blur-2xl text-gray-100 max-w-[92vw] sm:max-w-none"
        >
          <div 
            style={{ 
              background: 'linear-gradient(90deg, #ff5500 0%, #ff8800 100%)',
              boxShadow: '0 0 12px rgba(255, 85, 0, 0.6)'
            }}
            className="hero-pill-inner-tag gap-1 rounded-full text-white font-mono-tech text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>ECOSYSTEM</span>
          </div>
          
          <span 
            className="tracking-wider sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-100 font-heading font-extrabold uppercase truncate"
          >
            BRIDGING ACADEMICS TO INDUSTRY
          </span>
        </div>

        {/* Description Paragraph */}
        <p className="hero-desc-animate hero-description-paragraph max-w-[280px] xs:max-w-[340px] sm:max-w-xl text-xs xs:text-sm sm:text-base text-gray-300/90 font-normal">
          Hands-on training, real-world projects, and professional mentorship that turn students into industry-ready engineers.
        </p>

        {/* Primary CTA Button (Redirects to /services) */}
        <div className="hero-btn-animate flex items-center justify-center">
          <button
            onClick={onExploreEcosystem}
            style={{ 
              background: 'linear-gradient(90deg, #ff5500 0%, #ff6600 50%, #ff8800 100%)',
              boxShadow: '0 0 30px rgba(255, 85, 0, 0.65)'
            }}
            className="hero-cta-explore-btn group relative gap-2 xs:gap-2.5 sm:gap-3 rounded-full text-white text-xs xs:text-sm sm:text-base font-heading font-extrabold tracking-wider sm:tracking-[0.2em] uppercase hover:scale-105 transition-all duration-300 transform cursor-pointer focus:outline-none"
          >
            <span>EXPLORE PROGRAMS & JOIN US</span>
            <Icon name="ArrowRight" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1.5 transition-all" />
          </button>
        </div>
      </div>

      {/* MOBILE ONLY: BULMA TECH BOX CARDS */}
      <div className="absolute bottom-6 w-full z-40 md:hidden px-3">
        <div className="flex overflow-x-auto gap-3 pb-3 snap-x hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {ECOSYSTEM_NODES.map((node, index) => (
            <button
              key={node.id}
              onClick={() => onSelectNode(node)}
              className="hero-mobile-bulma-card snap-center shrink-0 text-left bg-[#090c1a]/95 border border-[#ff6200]/60 rounded-2xl backdrop-blur-xl hover:bg-[#0e142c] transition-all shadow-[0_8px_25px_rgba(0,0,0,0.8)] w-48 active:scale-95 cursor-pointer pointer-events-auto"
            >
              <div className="flex items-center gap-2.5">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-[#ff6200]/20 border border-[#ff6200]/40 flex items-center justify-center text-[#ffaa33]">
                  <Icon name={node.iconName} className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-heading font-black text-xs text-white uppercase tracking-wider truncate">{node.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-300 truncate mt-0.5">{node.shortLabel}</span>
                </div>
              </div>
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
