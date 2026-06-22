import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        // 1. Synchronous Title & Description defaults
        let title = "Techroxx Ecosystem | Innovation, Employability, Technology & Industry Solutions";
        let desc = "Techroxx is a technology ecosystem that bridges academics and industry by empowering students, professionals, organizations, and communities through innovation, employability, industry collaboration, technology services, events, mentorship, and real-world solutions.";

        switch (location.pathname) {
            case '/':
                title = "Techroxx Ecosystem | Bridging Industry, Innovation, Talent & Technology";
                break;
            case '/about':
                title = "About Techroxx Ecosystem | Leadership, Vision & Mission";
                desc = "Meet the leaders behind Techroxx, Mr. Hemanth Goud Burra (CEO & Founder). Discover how we bridge academics, industry innovation, and employability platforms.";
                break;
            case '/departments':
                title = "Departments & Academic Tracks | Techroxx Ecosystem";
                desc = "Explore our specialized innovation tracks in Computing (CSE), Electronics (ECE/EEE), and Business Management disciplines.";
                break;
            case '/services':
                title = "Ecosystem Services, R&D & Consultancy | Techroxx";
                desc = "Transforming organizations through technical R&D, corporate consultancy, student internships, hardware hackathons, and technology services.";
                break;
            case '/gallery':
                title = "Ecosystem Gallery & Project Showcases | Techroxx";
                desc = "Explore visual proof of student PCB layouts, hackathon prototypes, speaking webinar events, and professional achievements inside the Techroxx community.";
                break;
            case '/events':
                title = "Ecosystem Events | Hackathons, Sprints & Code Workshops";
                desc = "Join Techroxx ecosystem challenges, ESP32 telemetry hackathons, cloud bootcamps, and business webinars. Partner with us to coordinate technical sprints.";
                break;
            case '/learn':
                title = "Employability Directory & Placement pathways | Techroxx";
                desc = "Access verified corporate recruitment pathways, job alerts, placement support, and guidebooks mapped for student careers.";
                break;
            case '/contact':
                title = "Connect with Techroxx Ecosystem | Partner or Enroll";
                desc = "Get in touch for student enrollment, corporate consultancy, real estate, or to request hackathons and workshops at your campus.";
                break;
            default:
                if (location.pathname.startsWith('/departments/')) {
                    const deptSlug = location.pathname.substring(13);
                    title = `${deptSlug.toUpperCase()} Department details & Curriculum | Techroxx`;
                } else if (location.pathname.startsWith('/services/programs/')) {
                    title = "Academic Programs | Techroxx Ecosystem";
                } else if (location.pathname.startsWith('/learn/')) {
                    title = "Placement Guide & Career Support | Techroxx";
                } else if (location.pathname.startsWith('/events/')) {
                    title = "Event Overview & Outcomes | Techroxx Events";
                } else if (location.pathname.startsWith('/careers/')) {
                    title = "Intern Professional Portfolio | Techroxx Careers";
                }
                break;
        }

        // Update Document Title and Meta Tags
        document.title = title;
        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", desc);

        const updateMeta = (prop, content) => {
            let el = document.querySelector(`meta[property='${prop}']`) || document.querySelector(`meta[name='${prop}']`);
            if (!el) {
                el = document.createElement('meta');
                if (prop.startsWith('og:')) el.setAttribute('property', prop);
                else el.name = prop;
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        updateMeta("og:title", title);
        updateMeta("og:description", desc);
        updateMeta("og:url", `https://techroxx.in${location.pathname}`);
        updateMeta("og:image", "https://techroxx.in/logo_techroxx.webp");
        updateMeta("og:type", "website");

        // 3. Dynamic Google AdSense Script Injection (Only for specific pages: /learn, /events, /careers, /gallery)
        const adRoutes = ['/learn', '/events', '/careers', '/gallery'];
        const matchesAdRoute = adRoutes.some(route => 
            location.pathname === route || location.pathname.startsWith(route + '/')
        );

        const ADSENSE_PUB_ID = "ca-pub-2173144997531852";
        let adScript = document.getElementById("techroxx-adsense-script");

        if (matchesAdRoute) {
            if (!adScript) {
                adScript = document.createElement('script');
                adScript.id = "techroxx-adsense-script";
                adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
                adScript.async = true;
                adScript.crossOrigin = "anonymous";
                adScript.onload = () => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        console.warn("AdSense push error on load:", e);
                    }
                };
                document.head.appendChild(adScript);
            } else {
                // If script is already loaded, trigger a push to scan the new page content/URL
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.warn("AdSense push error on navigation:", e);
                }
            }
        } else {
            // Remove the script tag when navigating to non-ad pages
            if (adScript) {
                adScript.remove();
            }
            // Clean up any dynamic Auto Ads components/containers placed outside the React root
            try {
                const autoPlaced = document.querySelectorAll('.google-auto-placed, ins.adsbygoogle, iframe[name^="google_ads"]');
                autoPlaced.forEach(el => el.remove());
                
                // Clean up vignette ad body locks or overlays
                document.body.style.overflow = "";
                const vignettes = document.querySelectorAll('ins[data-vignette-loaded="true"], .google-ad-vignette-container');
                vignettes.forEach(el => el.remove());
            } catch (e) {
                console.warn("Error cleaning up AdSense elements:", e);
            }
        }


        // Helper to inject JSON-LD script
        const injectSchemaScript = (data) => {
            let script = document.getElementById("techroxx-jsonld-schema");
            if (script) script.remove();
            script = document.createElement('script');
            script.type = "application/ld+json";
            script.id = "techroxx-jsonld-schema";
            script.text = JSON.stringify(data);
            document.head.appendChild(script);
        };

        // Asynchronously fetch additional details for rich structured data
        const fetchAndGenerateSchema = async () => {
            let finalSchema = [];

            // 1. Organization Schema (always present as background entity)
            const orgSchema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Techroxx Ecosystem",
                "url": "https://techroxx.in",
                "logo": "https://techroxx.in/logo_techroxx.webp",
                "founder": {
                    "@type": "Person",
                    "name": "Hemanth Goud Burra"
                },
                "description": "Techroxx is a technology ecosystem focused on innovation, employability, industry collaboration, technology services, talent development, events, mentorship, and real-world problem solving.",
                "sameAs": [
                    "https://www.instagram.com/hemanth_bhg_x11/",
                    "https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T"
                ]
            };
            finalSchema.push(orgSchema);

            // 2. Specific Page Schemas
            if (location.pathname === "/") {
                finalSchema.push({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Techroxx Ecosystem",
                    "url": "https://techroxx.in",
                    "description": desc
                });
            } else if (location.pathname === "/about") {
                const founderPerson = {
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Hemanth Goud Burra",
                    "jobTitle": "CEO & Founder",
                    "worksFor": { "@type": "Organization", "name": "Techroxx Ecosystem" },
                    "image": "https://techroxx.in/assets/images/team/hemanth.webp",
                    "sameAs": [
                        "https://linkedin.com/in/hemanth-burra-0824b2169",
                        "https://www.instagram.com/hemanth_bhg_x11/"
                    ]
                };
                const cooPerson = {
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Srikanth",
                    "jobTitle": "COO",
                    "worksFor": { "@type": "Organization", "name": "Techroxx Ecosystem" },
                    "image": "https://techroxx.in/assets/images/team/srikanth.webp"
                };
                finalSchema.push(founderPerson, cooPerson);

                // ImageObject schemas for founder/coo photos
                finalSchema.push({
                    "@context": "https://schema.org",
                    "@type": "ImageObject",
                    "contentUrl": "https://techroxx.in/assets/images/team/hemanth.webp",
                    "caption": "Hemanth Goud Burra, CEO & Founder of Techroxx"
                }, {
                    "@context": "https://schema.org",
                    "@type": "ImageObject",
                    "contentUrl": "https://techroxx.in/assets/images/team/srikanth.webp",
                    "caption": "Srikanth, COO of Techroxx"
                });
            } else if (location.pathname === "/contact") {
                finalSchema.push({
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact Techroxx Ecosystem",
                    "url": "https://techroxx.in/contact",
                    "description": "Get in touch with Techroxx for course enrollment, R&D sponsorships, workshops requests, and corporate training consultations."
                });
            } else if (location.pathname === "/gallery") {
                try {
                    const response = await fetch('/data/gallery.json');
                    if (response.ok) {
                        const galleryItems = await response.json();
                        galleryItems.slice(0, 10).forEach(item => {
                            finalSchema.push({
                                "@context": "https://schema.org",
                                "@type": "ImageObject",
                                "contentUrl": item.image.startsWith('http') ? item.image : `https://techroxx.in${item.image}`,
                                "name": item.title || "Techroxx Ecosystem Gallery",
                                "description": item.description || "Project showcase, hackathon sprint, or academic achievement at Techroxx"
                            });
                        });
                    }
                } catch (e) {
                    console.warn("Failed to generate ImageObject schemas for gallery page:", e);
                }
            } else if (location.pathname.startsWith('/events/')) {
                const eventSlug = location.pathname.substring(8);
                try {
                    const response = await fetch('/data/events.json');
                    if (response.ok) {
                        const eventsList = await response.json();
                        const activeEvent = eventsList.find(e => e.slug === eventSlug);
                        if (activeEvent) {
                            // Update title & description with rich event meta
                            document.title = `${activeEvent.title} | Techroxx Events`;
                            updateMeta("og:title", `${activeEvent.title} | Techroxx Events`);
                            updateMeta("og:description", activeEvent.description);
                            if (activeEvent.image) {
                                const imgUrl = activeEvent.image.startsWith('http') ? activeEvent.image : `https://techroxx.in${activeEvent.image}`;
                                updateMeta("og:image", imgUrl);
                                // ImageObject Schema
                                finalSchema.push({
                                    "@context": "https://schema.org",
                                    "@type": "ImageObject",
                                    "contentUrl": imgUrl,
                                    "caption": activeEvent.title
                                });
                            }

                            // Event Schema
                            finalSchema.push({
                                "@context": "https://schema.org",
                                "@type": "Event",
                                "name": activeEvent.title,
                                "description": activeEvent.description,
                                "startDate": activeEvent.date,
                                "eventStatus": activeEvent.status === 'upcoming' ? "https://schema.org/EventScheduled" : "https://schema.org/EventCompleted",
                                "eventAttendanceMode": activeEvent.mode === 'online' ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
                                "location": activeEvent.mode === 'online' ? {
                                    "@type": "VirtualLocation",
                                    "url": `https://techroxx.in/events/${activeEvent.slug}`
                                } : {
                                    "@type": "Place",
                                    "name": activeEvent.venue || "Techroxx Hyderabad Lab",
                                    "address": {
                                        "@type": "PostalAddress",
                                        "addressLocality": "Hyderabad",
                                        "addressRegion": "Telangana",
                                        "addressCountry": "IN"
                                    }
                                },
                                "organizer": {
                                    "@type": "Organization",
                                    "name": activeEvent.organizer || "Techroxx Ecosystem",
                                    "url": "https://techroxx.in"
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.warn("Failed to generate Event Schema for event:", eventSlug, e);
                }
            } else if (location.pathname.startsWith('/careers/')) {
                const profileId = location.pathname.substring(9);
                if (profileId) {
                    try {
                        const sheetId = "1TrsfS_gtt_9x8gA9QOLi4dJRlagl8ZhCo6UC9Fj5LyQ";
                        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
                        const res = await fetch(sheetUrl);
                        if (res.ok) {
                            const text = await res.text();
                            const startIdx = text.indexOf('{');
                            const endIdx = text.lastIndexOf('}');
                            if (startIdx !== -1 && endIdx !== -1) {
                                const rawData = JSON.parse(text.substring(startIdx, endIdx + 1));
                                const rows = rawData?.table?.rows || [];
                                const cols = rawData?.table?.cols || [];
                                const nameIdx = cols.findIndex(c => c.label === 'name' || c.label === 'Name');
                                const idIdx = cols.findIndex(c => c.label === 'internId' || c.label === 'empId' || c.id === 'B');
                                const roleIdx = cols.findIndex(c => c.label === 'role' || c.label === 'Role');
                                const linkedinIdx = cols.findIndex(c => c.label === 'linkedin' || c.label === 'Linkedin');
                                const imageIdx = cols.findIndex(c => c.label === 'image' || c.label === 'Image');
                                
                                const getRowVal = (row, idx) => {
                                    if (idx < 0 || !row.c || !row.c[idx]) return '';
                                    return String(row.c[idx].v || '').trim();
                                };

                                const activeRow = rows.find(r => getRowVal(r, idIdx) === profileId);
                                if (activeRow) {
                                    const name = getRowVal(activeRow, nameIdx);
                                    const role = getRowVal(activeRow, roleIdx);
                                    const linkedin = getRowVal(activeRow, linkedinIdx);
                                    const image = getRowVal(activeRow, imageIdx);

                                    document.title = `${name} | ${role} Portfolio | Techroxx Careers`;
                                    updateMeta("og:title", `${name} | ${role} Portfolio | Techroxx Careers`);

                                    const personSchema = {
                                        "@context": "https://schema.org",
                                        "@type": "Person",
                                        "name": name,
                                        "jobTitle": role,
                                        "worksFor": { "@type": "Organization", "name": "Techroxx Ecosystem", "url": "https://techroxx.in" }
                                    };
                                    if (linkedin) personSchema.sameAs = [linkedin];
                                    if (image) personSchema.image = image;
                                    finalSchema.push(personSchema);
                                    
                                    // Add ImageObject Schema for intern photo
                                    if (image) {
                                        finalSchema.push({
                                            "@context": "https://schema.org",
                                            "@type": "ImageObject",
                                            "contentUrl": image,
                                            "caption": `${name} - ${role}`
                                        });
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.warn("Failed to generate Person Schema for intern:", profileId, e);
                    }
                }
            } else {
                finalSchema.push({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": title,
                    "description": desc,
                    "url": `https://techroxx.in${location.pathname}`
                });
            }

            injectSchemaScript(finalSchema);
        };

        fetchAndGenerateSchema();
    }, [location.pathname]);

    return (
        <>
            <div className="backdrop-waves"></div>
            <Navbar />
            <main className="relative">
                <Outlet />
            </main>
            <ChatWidget />
            <Footer />
        </>
    );
};

export default Layout;
