import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide1 from '../assets/hero-slide-1.png';
import slide2 from '../assets/hero-slide-2.png';
import slide3 from '../assets/hero-slide-3.png';

const ORIGINAL_SLIDES = [slide1, slide2, slide3];
// Clone last at beginning and first at end for infinite loop
const SLIDES = [ORIGINAL_SLIDES[2], ...ORIGINAL_SLIDES, ORIGINAL_SLIDES[0]];

export const HomeHero = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const transitionTimeoutRef = useRef(null);

    // Active dot indicator calculation
    const getActiveDot = () => {
        if (currentIndex === 0 || currentIndex === 3) return 2; // Image 3
        if (currentIndex === 4 || currentIndex === 1) return 0; // Image 1
        if (currentIndex === 2) return 1; // Image 2
        return 0;
    };

    const activeDot = getActiveDot();

    // Next slide handler
    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionEnabled(true);
        setCurrentIndex((prev) => prev + 1);
    };

    // Previous slide handler
    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionEnabled(true);
        setCurrentIndex((prev) => prev - 1);
    };

    // Dot click handler
    const handleDotClick = (dotIdx) => {
        if (isTransitioning) return;
        const targetIndex = dotIdx + 1;
        if (targetIndex === currentIndex) return;
        setIsTransitioning(true);
        setTransitionEnabled(true);
        setCurrentIndex(targetIndex);
    };

    // Handle seamless infinite loop jump when transition completes
    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return;
        setIsTransitioning(false);

        if (currentIndex === SLIDES.length - 1) {
            // Reached clone of Image 1 at end -> jump to real Image 1 (index 1)
            setTransitionEnabled(false);
            setCurrentIndex(1);
        } else if (currentIndex === 0) {
            // Reached clone of Image 3 at start -> jump to real Image 3 (index 3)
            setTransitionEnabled(false);
            setCurrentIndex(ORIGINAL_SLIDES.length);
        }
    };

    // Re-enable transition after seamless position snap
    useEffect(() => {
        if (!transitionEnabled) {
            const raf1 = requestAnimationFrame(() => {
                const raf2 = requestAnimationFrame(() => {
                    setTransitionEnabled(true);
                });
                transitionTimeoutRef.current = raf2;
            });
            return () => {
                cancelAnimationFrame(raf1);
                if (transitionTimeoutRef.current) {
                    cancelAnimationFrame(transitionTimeoutRef.current);
                }
            };
        }
    }, [transitionEnabled]);

    // Autoplay: horizontally slides every 5 seconds, paused on hover
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [isHovered, currentIndex, isTransitioning]);

    return (
        <section
            className="w-full bg-[#000000] relative overflow-hidden flex flex-col lg:flex-row min-h-[560px] lg:h-[calc(100vh-80px)] lg:min-h-[640px] lg:max-h-[820px] select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ==========================================
                LEFT SIDE: STATIC CONTENT (NEVER MOVES)
               ========================================== */}
            <div className="w-full lg:w-[48%] xl:w-[46%] bg-[#000000] z-10 relative flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-20 lg:pr-8 py-16 lg:py-0">
                <div className="max-w-xl">
                    {/* Eyebrow */}
                    <div className="mb-4">
                        <span className="text-[#FF5500] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase block">
                            TECH ROXX ECOSYSTEM
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black text-white leading-[1.1] tracking-tight mb-6">
                        Bridging <span style={{ color: '#FF5500' }}>Technology</span>,<br />
                        <span style={{ color: '#FF5500' }}>Talent</span> &amp; Innovation
                    </h1>

                    {/* Description */}
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-normal">
                        A unified ecosystem connecting students, professionals, and industries through practical learning, enterprise innovation, and real-world engineering projects.
                    </p>

                    {/* CTA Button */}
                    <div>
                        <button
                            onClick={() => navigate('/services')}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF5500] text-white font-bold text-base hover:bg-[#e04b00] transition-all duration-300 shadow-[0_4px_20px_rgba(255,85,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,85,0,0.55)] cursor-pointer group"
                        >
                            <span>Explore Programs</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono">→</span>
                        </button>
                    </div>
                </div>

                {/* Diagonal Slanted Separation (Desktop Only) */}
                <div
                    className="hidden lg:block absolute top-0 bottom-0 pointer-events-none z-20"
                    style={{
                        left: 'calc(100% - 2px)',
                        width: '72px',
                        height: '100%',
                        background: '#000000',
                        clipPath: 'polygon(0 0, 72px 0, 0 100%)',
                    }}
                />
            </div>

            {/* ==========================================
                RIGHT SIDE: HORIZONTAL IMAGE CAROUSEL
               ========================================== */}
            <div className="w-full lg:w-[55%] xl:w-[56%] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 h-[400px] sm:h-[480px] lg:h-full z-0 overflow-hidden relative">
                {/* Horizontal Image Track */}
                <div
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: transitionEnabled
                            ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
                            : 'none',
                    }}
                >
                    {SLIDES.map((slideSrc, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: '100%',
                                height: '100%',
                                flexShrink: 0,
                                position: 'relative',
                            }}
                        >
                            <img
                                src={slideSrc}
                                alt={`Tech Roxx slide ${idx}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                }}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                {/* Circular Carousel Controls */}
                <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#000000]/70 hover:bg-[#FF5500] text-white border border-white/20 hover:border-[#FF5500] transition-colors duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.6)] group"
                >
                    <ChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#000000]/70 hover:bg-[#FF5500] text-white border border-white/20 hover:border-[#FF5500] transition-colors duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.6)] group"
                >
                    <ChevronRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                {/* Pagination Indicators */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                    {[0, 1, 2].map((dotIdx) => {
                        const isActive = activeDot === dotIdx;
                        return (
                            <button
                                key={dotIdx}
                                onClick={() => handleDotClick(dotIdx)}
                                aria-label={`Go to image ${dotIdx + 1}`}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${
                                    isActive
                                        ? 'w-3.5 h-3.5 bg-[#FF5500] shadow-[0_0_8px_#FF5500]'
                                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                                }`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
