import { useState } from 'react';
import '../styles/pages/Learn.css';
import { useParams, useNavigate } from 'react-router-dom';
import { placementCompanies } from '../data/constants';

// Dynamic categories extraction directly from keys of placementCompanies data structure
const categories = ['All Categories', ...Object.keys(placementCompanies)];

// Directory catalog containing verified Placement Directory data
const ecomCatalog = [
    {
        type: 'guide',
        category: 'Careers & Recruitment',
        slug: 'placement-guide',
        title: 'Placement Directory',
        difficulty: 'Directory',
        chapters: Object.values(placementCompanies).flat().length,
        price: 'Free',
        isPaid: false,
        description: 'Explore direct recruitment portals, official careers pages, and job application pathways for top companies across all industries.',
        features: ['Direct HR Portal Links', 'Multi-Sector Coverage', 'Daily Recruitment Updates'],
        content: "<h3>Corporate Career Directory & Application Pathways</h3><p>Access the official job application and career portals of leading companies in various sectors. To receive real-time updates on active drives and job postings, join our community.</p>"
    },
    {
        type: 'article',
        category: 'Embedded & IoT',
        slug: 'iot-telemetry-esp32-guide',
        title: 'ESP32 Telemetry & IoT Architecture Guide',
        difficulty: 'Technical Guide',
        chapters: 5,
        price: 'Free',
        isPaid: false,
        description: 'A deep-dive technical article explaining ESP32 architecture, sensor interfacing, edge processing, and MQTT telemetry pipelines.',
        features: ['ESP32 Peripherals Details', 'MQTT vs HTTP Analysis', 'Power Optimization Tips'],
        content: `
            <h3>Introduction to Embedded IoT & Telemetry</h3>
            <p>In the modern industrial landscape, Internet of Things (IoT) technologies are shifting from simple remote-control utilities to sophisticated, real-time telemetry pipelines. At the core of many of these embedded designs lies the ESP32 microcontroller, a low-cost, low-power system-on-a-chip (SoC) featuring integrated Wi-Fi and dual-mode Bluetooth. Understanding how to build reliable telemetry architectures with the ESP32 is an essential skill for modern electronics and software developers.</p>
            
            <h3>Anatomy of the ESP32 for Telemetry</h3>
            <p>The ESP32 is powered by a Tensilica Xtensa Dual-Core 32-bit LX6 microprocessor, operating at speeds up to 240 MHz. It contains 520 KB of internal SRAM and is typically paired with 4 MB or 8 MB of external flash memory. For telemetry applications, the ESP32 offers an abundant array of peripherals, including:</p>
            <ul>
                <li><strong>Analog-to-Digital Converters (ADC):</strong> Two 12-bit SAR ADCs supporting up to 18 channels, used to read analog sensors.</li>
                <li><strong>Digital-to-Analog Converters (DAC):</strong> Two 8-bit DAC channels for generating analog signals.</li>
                <li><strong>I2C, SPI, and UART Interfaces:</strong> Serial communication protocols essential for communicating with digital sensors and modules.</li>
                <li><strong>Pulse Width Modulation (PWM):</strong> LED PWM and Motor PWM channels for actuator control.</li>
            </ul>
            
            <h3>Designing the Telemetry Pipeline</h3>
            <p>A typical IoT telemetry pipeline consists of three main stages: Data Acquisition, Edge Processing, and Cloud Transmission. Let's explore how to design each stage for maximum reliability.</p>
            
            <h4>1. Data Acquisition & Sensor Interfacing</h4>
            <p>To collect environmental or industrial metrics, the ESP32 is interfaced with digital or analog sensors. Digital sensors using I2C (like the BME280 for temperature, humidity, and pressure) are preferred because they handle calibration on-board and are less susceptible to electrical noise. When routing I2C lines, pull-up resistors (typically 4.7kΩ) must be connected to the SDA and SCL lines to ensure stable logic transitions.</p>
            
            <h4>2. Edge Processing & Filtering</h4>
            <p>Raw sensor readings are often noisy. Before transmitting data, it is best practice to apply lightweight digital filters on the edge. A simple moving average filter or a complementary filter can smooth out signal spikes without consuming significant memory or CPU cycles. Edge processing also includes threshold checking: if a critical threshold is breached (e.g., temperature exceeding 75°C), the ESP32 can trigger an immediate alert instead of waiting for the next scheduled transmission interval.</p>
            
            <h4>3. Transmission Protocols: MQTT vs. HTTP</h4>
            <p>For data transmission, Message Queuing Telemetry Transport (MQTT) is the industry standard. Unlike HTTP, which is a heavy request-response protocol, MQTT is a lightweight publish-subscribe protocol designed for constrained networks. It uses a persistent TCP connection, keeping headers extremely small (often just 2 bytes), which conserves power and bandwidth. If your telemetry system requires strict delivery guarantees, MQTT supports three Levels of Quality of Service (QoS):</p>
            <ul>
                <li><strong>QoS 0 (At most once):</strong> The message is delivered according to the best efforts of the underlying network. No acknowledgment is sent.</li>
                <li><strong>QoS 1 (At least once):</strong> The message is guaranteed to arrive, but duplicate messages may be received.</li>
                <li><strong>QoS 2 (Exactly once):</strong> The message is guaranteed to arrive exactly once using a four-step handshake, ideal for critical telemetry data.</li>
            </ul>
            
            <h3>Handling Network Interruptions & Power Management</h3>
            <p>In real-world deployments, Wi-Fi connections will drop. To prevent data loss during network outages, the ESP32 can store telemetry records in its non-volatile SPI Flash File System (SPIFFS) or on an external micro-SD card. Once the connection is re-established, the queued data is flushed to the cloud broker.</p>
            <p>For battery-powered nodes, power optimization is critical. The ESP32 supports multiple sleep modes: Active, Modem-sleep, Light-sleep, and Deep-sleep. In Deep-sleep mode, the CPU and most peripherals are powered down, leaving only the Ultra-Low-Power (ULP) co-processor active. Power consumption drops from 240mA during transmission to less than 15µA. The ESP32 can be programmed to wake up at regular intervals (e.g., every 15 minutes) using the internal RTC timer, read sensors, publish telemetry, and return to deep sleep.</p>
        `
    },
    {
        type: 'article',
        category: 'VLSI & Electronics',
        slug: 'pcb-layout-design-guide',
        title: 'Advanced PCB Layout & Signal Integrity Guide',
        difficulty: 'Technical Guide',
        chapters: 4,
        price: 'Free',
        isPaid: false,
        description: 'A professional guide detailing multi-layer board stackups, return paths, impedance matching, and decoupling techniques.',
        features: ['Layer Stackup Principles', 'Signal Reflection Avoidance', 'Power Integrity Decoupling'],
        content: `
            <h3>Foundations of PCB Layout Design</h3>
            <p>Printed Circuit Board (PCB) design is the bridge that connects schematic diagrams with physical electronic hardware. As system frequencies rise and components shrink, laying out a board becomes as much about physics and wave propagation as it is about connecting copper traces. Designing a high-performance PCB requires strict adherence to signal integrity, power integrity, and thermal management principles.</p>
            
            <h3>Stackup Selection and Return Paths</h3>
            <p>For modern microcontroller-based circuits operating above a few Megahertz, a simple 2-layer board is often insufficient. A 4-layer board is the standard entry point, providing dedicated ground and power planes. A typical 4-layer stackup consists of:</p>
            <ul>
                <li><strong>Layer 1 (Top):</strong> High-speed signals, component pads.</li>
                <li><strong>Layer 2:</strong> Solid Ground Plane (GND).</li>
                <li><strong>Layer 3:</strong> Power Plane (VCC) or signal routing.</li>
                <li><strong>Layer 4 (Bottom):</strong> Slow signals, test points, auxiliary routes.</li>
            </ul>
            <p>A solid ground plane directly beneath the signal layer is critical because high-frequency signals follow the path of least <em>inductance</em>, not least resistance. The return current will naturally flow in the ground plane directly below the signal trace. If the ground plane is interrupted by cuts or routing tracks, the return current must detour around the obstacle, creating a large loop area. This loop increases parasitic inductance, which acts as a loop antenna, generating electromagnetic interference (EMI) and causing signal distortion.</p>
            
            <h3>Impedance Control & High-Speed Signal Integrity</h3>
            <p>When routing high-speed lines (such as USB differential pairs, Ethernet tracks, or DDR memory lines), the traces must be treated as transmission lines. The characteristic impedance of these lines must match the source and load impedance (typically 50Ω single-ended or 90Ω/100Ω differential) to prevent signal reflections.</p>
            <p>Characteristic impedance is determined by trace width, dielectric thickness (distance to the reference plane), copper thickness, and the dielectric constant of the FR4 board material. Designers use microstrip or stripline calculators to calculate the exact track widths. To preserve signal integrity:</p>
            <ul>
                <li><strong>Avoid 90-degree bends:</strong> Right-angle corners cause a sudden increase in trace width, which changes the characteristic impedance and creates signal reflections. Use two 45-degree bends or smooth curves instead.</li>
                <li><strong>Minimize Vias:</strong> Vias add parasitic capacitance and inductance (typically 1-2pF and 1-2nH), which disrupts impedance control. Keep high-speed traces on a single layer as much as possible.</li>
                <li><strong>Differential Routing:</strong> Differential pairs must be routed parallel to each other with constant spacing. Any length mismatch between the positive and negative traces will cause phase shift, converting differential signals into common-mode noise.</li>
            </ul>
            
            <h3>Decoupling and Power Integrity</h3>
            <p>Integrated circuits require clean power. When a CPU switch occurs, it draws rapid spikes of current from the power supply. If the power supply cannot deliver this current instantly, the voltage will sag, causing digital glitches. To solve this, decoupling capacitors (typically 0.1µF and 10nF ceramic capacitors) are placed close to every IC power pin.</p>
            <p>These capacitors act as localized charge reservoirs. For maximum efficiency, they must be placed directly next to the IC pin, with the trace running from the capacitor pad directly into the pin before going to a via. This minimizes the parasitic inductance of the trace and via connection.</p>
        `
    },
    {
        type: 'article',
        category: 'Artificial Intelligence',
        slug: 'agentic-ai-multi-agent-workflows',
        title: 'Enterprise Agentic AI & Orchestration Workflows',
        difficulty: 'Research Guide',
        chapters: 4,
        price: 'Free',
        isPaid: false,
        description: 'An in-depth article outlining cognitive agentic design patterns, tool integration, and orchestration (CrewAI vs LangGraph).',
        features: ['Agent Components Guide', 'Multi-Agent Collaboration', 'LangGraph vs CrewAI'],
        content: `
            <h3>Understanding Agentic AI & Autonomy</h3>
            <p>The AI landscape is rapidly evolving from passive, instruction-following chatbots into autonomous agentic architectures. While traditional Large Language Models (LLMs) operate on a simple input-output prompt cycle, Agentic AI introduces loops, memory registers, tool interfaces, and planning mechanisms that enable models to act as independent decision-makers. Rather than simply writing code or drafting emails, an AI agent can analyze a problem, formulate a plan, invoke APIs, check the results, and iteratively correct its course until the objective is achieved.</p>
            
            <h3>Components of an AI Agent</h3>
            <p>An enterprise-grade AI agent is built upon four foundational pillars:</p>
            <ol>
                <li><strong>Core Brain (LLM):</strong> The reasoning engine responsible for planning, decision-making, and parsing information. Models with high reasoning capabilities (like GPT-4, Claude 3.5 Sonnet, or Gemini 1.5 Pro) are preferred.</li>
                <li><strong>Memory Systems:</strong> Memory allows agents to persist context across interactions. This is divided into <em>short-term memory</em> (context window during execution) and <em>long-term memory</em> (vector databases using Retrieval-Augmented Generation to store and fetch historical logs).</li>
                <li><strong>Tool Integration:</strong> Tools extend the agent's capabilities beyond text processing. By wrapping external systems in standardized API interfaces, agents can write and run python scripts, query databases, browse the web, and execute shell commands.</li>
                <li><strong>Planning Frameworks:</strong> Structuring how the agent breaks down complex objectives. Techniques like ReAct (Reasoning and Acting) prompt the model to generate thoughts, actions, and observations sequentially to solve goals step-by-step.</li>
            </ol>
            
            <h3>Multi-Agent Collaborative Workflows</h3>
            <p>For complex business applications, a single agent often struggles with context drift and error propagation. The industry standard has shifted toward Multi-Agent Systems (MAS). In a collaborative multi-agent architecture, specialized agents with distinct prompts, tools, and roles work together, much like a software development team.</p>
            <p>For example, a multi-agent content generation pipeline might include:</p>
            <ul>
                <li><strong>Researcher Agent:</strong> Equipped with search tools to fetch accurate facts and statistics from verified online sources.</li>
                <li><strong>Writer Agent:</strong> Specialized in organizing information, drafting clean copy, and maintaining tone.</li>
                <li><strong>Editor/Reviewer Agent:</strong> Evaluates the draft against strict facts and formatting guidelines, sending feedback back to the writer if errors are detected.</li>
            </ul>
            <p>By dividing labor, each agent stays highly focused, leading to significantly lower hallucination rates, greater accuracy, and predictable, scalable execution.</p>
            
            <h3>Enterprise Orchestration Frameworks: CrewAI vs. LangGraph</h3>
            <p>Developers rely on orchestration frameworks to build and manage multi-agent workflows. The two most popular frameworks are CrewAI and LangGraph:</p>
            <ul>
                <li><strong>CrewAI:</strong> A high-level, role-based framework that makes it easy to define agents, tasks, and tools. It operates on a hierarchical or sequential flow, making it ideal for standard business workflows (like marketing pipelines, research aggregation, or report generation).</li>
                <li><strong>LangGraph:</strong> A lower-level, graph-based framework built by the LangChain team. It models workflows as cyclic graphs (nodes represent agents/tools, edges represent control flows). LangGraph provides absolute control over states, loops, and human-in-the-loop steps, making it the preferred choice for complex, non-linear applications (like code debuggers, customer service routers, or autonomous agents).</li>
            </ul>
        `
    },
    {
        type: 'article',
        category: 'Software Engineering',
        slug: 'mern-fullstack-career-strategies',
        title: 'MERN Stack Development & Production Optimization',
        difficulty: 'Career Guide',
        chapters: 4,
        price: 'Free',
        isPaid: false,
        description: 'A comprehensive career strategy guide for MERN developers, covering MongoDB indexing, Node security, and React caching.',
        features: ['MongoDB Aggregations', 'Node Caching & Security', 'Portfolio Design Strategy'],
        content: `
            <h3>The Evolving Full-Stack Landscape</h3>
            <p>The role of the Full-Stack Software Engineer is undergoing a massive transformation. Driven by the rise of AI-assisted coding, cloud-native deployments, and serverless architectures, the modern stack requires developers to possess deep architectural knowledge alongside traditional coding fluency. For developers using the popular MERN (MongoDB, Express, React, Node.js) stack, standing out in the competitive job market of 2026 requires moving beyond basic CRUD tutorials and mastering production-grade engineering principles.</p>
            
            <h3>Mastering the Core MERN Stack</h3>
            <p>A true MERN developer must understand the full lifecycle of data, from client state management to the database disk storage engine. Let's break down the critical skills required across each layer of the stack.</p>
            
            <h4>1. Database Optimization (MongoDB)</h4>
            <p>Too many beginners treat MongoDB as a simple JSON bin. In production, unoptimized database queries lead to high latency and database crashes. Developers must master:</p>
            <ul>
                <li><strong>Indexing:</strong> Using compound indexes, partial indexes, and text indexes to ensure queries scan the minimum number of documents. Understanding how to analyze query performance using <code>explain()</code> is a mandatory skill.</li>
                <li><strong>Aggregation Pipelines:</strong> Performing complex data transformations, lookups, and aggregations directly in the database cluster instead of loading thousands of documents into Node.js memory.</li>
                <li><strong>Data Modeling:</strong> Deciding when to embed documents (1-to-few relations) versus when to reference them (1-to-many/many-to-many relations) to avoid document size limits and optimize read performance.</li>
            </ul>
            
            <h4>2. Scalable Backend Design (Node.js & Express)</h4>
            <p>Your backend serves as the traffic controller for your application. Building a secure and scalable API requires:</p>
            <ul>
                <li><strong>Rate Limiting & Security:</strong> Implementing middleware (like <code>express-rate-limit</code> and <code>helmet</code>) to protect endpoints from brute-force attacks and cross-site scripting (XSS).</li>
                <li><strong>Structured Error Handling:</strong> Creating a centralized error-handling middleware that catches synchronous and asynchronous exceptions, logging them to a service (like Winston or Sentry) while returning clean, user-friendly responses.</li>
                <li><strong>Caching:</strong> Integrating Redis to cache frequent, slow database queries (like homepage configurations or user profiles) to drastically reduce database load.</li>
            </ul>
            
            <h4>3. Responsive & Optimized Frontend (React)</h4>
            <p>On the client side, user experience and performance dictate site success. Core React capabilities include:</p>
            <ul>
                <li><strong>State Management:</strong> Selecting the right tool (Zustand, Redux Toolkit, or Context API) based on state complexity and rendering performance.</li>
                <li><strong>Core Web Vitals Optimization:</strong> Lazy-loading pages and heavy libraries using <code>React.lazy</code> and <code>Suspense</code> to minimize initial bundle size and speed up Largest Contentful Paint (LCP).</li>
                <li><strong>API Integration:</strong> Using libraries like TanStack Query (React Query) to handle automatic caching, background fetching, pagination, and state synchronization with the backend.</li>
            </ul>
            
            <h3>Building a Portfolio That Hiring Managers Love</h3>
            <p>In 2026, standard portfolios featuring clone apps (like Netflix or Spotify clones) are routinely ignored by hiring managers. To prove your capability:</p>
            <ul>
                <li><strong>Solve a Real Problem:</strong> Build an app that actual users are using. Even a small app with 50 active users shows you understand deployment, user feedback, and bug fixing.</li>
                <li><strong>Showcase System Architecture:</strong> Include a system architecture diagram in your GitHub README showing how data flows between React, Node.js, Redis, MongoDB, and your cloud servers.</li>
                <li><strong>Implement Automated Testing:</strong> Include unit tests (using Jest or Vitest) and integration tests (using Playwright or Cypress). This immediately signals that you write maintainable, enterprise-ready code.</li>
            </ul>
        `
    }
];

const Learn = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Active Selection Reading State
    const [selectedGuide, setSelectedGuide] = useState(null);
    
    // Catalog Filtering States
    const [catalogSearch, setCatalogSearch] = useState('');
    
    // Sidebar Reading States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeBranch, setActiveBranch] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState(''); // Placement directories search

    // Synchronize selected guide during render phase to avoid cascading renders
    if (slug) {
        const active = ecomCatalog.find(g => g.slug === slug);
        if (active) {
            if (selectedGuide !== active) {
                setSelectedGuide(active);
            }
        } else {
            if (selectedGuide !== null) {
                setSelectedGuide(null);
            }
        }
    } else {
        if (selectedGuide !== null) {
            setSelectedGuide(null);
        }
    }

    // Handle Item Selection Click from Catalog
    const handleItemClick = (item) => {
        navigate(`/learn/${item.slug}`);
    };

    // Filter Ecom Catalog Items
    const filteredCatalog = ecomCatalog.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(catalogSearch.toLowerCase()) || 
            item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(catalogSearch.toLowerCase());
        return matchesSearch;
    });

    const getCourseIcon = (slug) => {
        if (slug.includes('esp32')) return { icon: 'fas fa-microchip', color: 'var(--primary-brand)' };
        if (slug.includes('pcb')) return { icon: 'fas fa-project-diagram', color: 'var(--secondary-blue)' };
        if (slug.includes('agentic')) return { icon: 'fas fa-brain', color: '#10b981' };
        if (slug.includes('mern')) return { icon: 'fas fa-code', color: '#ec4899' };
        return { icon: 'fas fa-briefcase', color: 'var(--primary-brand)' };
    };

    return (
        <>
            {!selectedGuide ? (
                /* --- SECTION A: HIGH-END E-COMMERCE LEARNING CATALOG --- */
                <section className="section-padding learn-catalog-page animate-enter" style={{ background: 'var(--bg-dark)', padding: '120px 0 80px 0' }}>
                    
                    {/* Parallax style top banner */}
                    <div className="page-header-banner" style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200')`,
                        height: 'auto',
                        minHeight: '340px',
                        padding: '65px 0',
                        marginTop: '0px'
                    }}>
                        <div className="container" style={{ width: '100%' }}>
                            <div className="page-header-content" style={{ maxWidth: '800px' }}>
                                <span className="learning-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.12)', border: '1px solid rgba(234, 88, 12, 0.3)', color: 'var(--primary-brand)', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                                    <i className="fas fa-graduation-cap"></i> Tech Roxx Careers
                                </span>
                                <h1 className="page-header-title" style={{ fontSize: '3.2rem', fontWeight: 900, marginBottom: '15px', color: '#ffffff' }}>Placement Career Directory</h1>
                                <p className="page-header-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6 }}>
                                    Explore direct career and recruitment portals of top companies across multiple industries. Secure your future with verified industry linkages.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container" style={{ marginTop: '50px' }}>
                        
                        {/* W3Schools style catalog controls panel */}
                        <div className="catalog-control-panel glass-panel" style={{ display: 'flex', gap: '20px', background: 'var(--bg-card)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {/* Search */}
                            <div className="catalog-search-wrapper" style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--text-muted)' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search directories..." 
                                    value={catalogSearch}
                                    onChange={(e) => setCatalogSearch(e.target.value)}
                                    className="catalog-search-input"
                                    style={{ width: '100%', padding: '12px 15px 12px 42px', borderRadius: '10px', border: 'var(--glass-border)', outline: 'none', background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                                />
                            </div>
                        </div>

                        {/* E-Commerce Cards Grid */}
                        {filteredCatalog.length === 0 ? (
                            <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', border: 'var(--glass-border)', borderRadius: '24px', marginTop: '30px' }}>
                                <i className="fas fa-search-minus" style={{ fontSize: '3rem', color: 'var(--primary-brand)', marginBottom: '15px' }}></i>
                                <h2 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', margin: '0 0 10px 0' }}>No Directory Found</h2>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto' }}>Please adjust your search keywords.</p>
                            </div>
                        ) : (
                            <div className="ecom-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
                                {filteredCatalog.map(item => {
                                    const { icon, color } = getCourseIcon(item.slug);
                                    return (
                                        <div 
                                            key={item.slug} 
                                            className="ecom-catalog-card"
                                            style={{
                                                background: 'var(--bg-card)',
                                                border: 'var(--glass-border)',
                                                borderRadius: '20px',
                                                padding: '30px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: 'var(--card-shadow)',
                                                transition: 'transform 0.3s ease, border-color 0.3s ease'
                                            }}
                                        >
                                            <div className="card-decor-glow" style={{ position: 'absolute', top: '-10px', right: '-10px', width: '130px', height: '130px', background: `radial-gradient(circle, rgba(234, 88, 12, 0.06) 0%, transparent 70%)`, filter: 'blur(10px)', pointerEvents: 'none' }}></div>
                                            
                                            {/* Header Tags */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                                <span style={{ 
                                                    background: 'rgba(234, 88, 12, 0.08)',
                                                    color: 'var(--primary-brand)',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 800,
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {item.type === 'article' ? 'Article 📝' : 'Directory 📖'}
                                                </span>
                                                <span style={{ background: 'rgba(100, 116, 139, 0.1)', color: 'var(--secondary-blue)', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                                                    Free 🎁
                                                </span>
                                            </div>

                                            {/* Title & Info */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-dark)', border: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: color }}>
                                                    <i className={icon}></i>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-head)', margin: 0, lineHeight: 1.3 }}>{item.title}</h2>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.category}</span>
                                                </div>
                                            </div>

                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>{item.description}</p>

                                            {/* Feature Checks */}
                                            <ul style={{ padding: 0, listStyle: 'none', margin: '0 0 25px 0', display: 'grid', gap: '8px' }}>
                                                {item.features.slice(0, 3).map((f, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                                        <i className="fas fa-check" style={{ color: 'var(--primary-brand)', fontSize: '0.72rem' }}></i> {f}
                                                    </li>
                                                ))}
                                            </ul>
 
                                            {/* Price and Action button */}
                                            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary-brand)', fontFamily: 'var(--font-head)' }}>Free</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>
                                                        {item.type === 'article' ? `${item.chapters} Sections` : `${item.chapters} Companies Listed`}
                                                    </span>
                                                </div>
 
                                                <button
                                                    onClick={() => handleItemClick(item)}
                                                    className="btn"
                                                    style={{
                                                        background: 'var(--secondary-blue)',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '10px 20px',
                                                        borderRadius: '30px',
                                                        fontWeight: 700,
                                                        fontSize: '0.82rem',
                                                        cursor: 'pointer',
                                                        transition: '0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <i className={item.type === 'article' ? 'fas fa-book-open' : 'fas fa-folder-open'}></i> {item.type === 'article' ? 'Read Article' : 'Open Directory'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
 
                    {/* CSS Rules specifically for Card Hover Lifting */}
                    
                </section>
            ) : (
                /* --- SECTION B: INTERACTIVE READING WORKSPACE (PRESERVED W3SCHOOLS PANEL WITH DYNAMIC CURRICULUM SIDEBAR) --- */
                <>
                    {isSidebarOpen && (
                        <div 
                            className="sidebar-overlay"
                            onClick={() => setIsSidebarOpen(false)}
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 900, background: 'rgba(0,0,0,0.4)', display: 'none' }}
                        />
                    )}
                    
                    <div className="guides-layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
                        {/* Sidebar Navigator Index */}
                        <div className={`guides-sidebar-panel ${isSidebarOpen ? 'open' : 'collapsed'}`} style={{ width: '320px', background: 'var(--bg-panel)', borderRight: 'var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '100px 20px 20px 20px', position: 'fixed', height: '100vh', top: 0, left: 0, zIndex: 950, transition: 'transform 0.3s ease' }}>
                            <button 
                                onClick={() => navigate('/learn')}
                                className="sidebar-dashboard-back"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '12px 15px', borderRadius: '8px', border: 'var(--glass-border)', background: 'var(--bg-dark)', color: 'var(--text-main)', cursor: 'pointer', fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, transition: '0.2s', marginBottom: '25px' }}
                            >
                                <i className="fas fa-th-large"></i> Back to Catalog Directory
                            </button>

                            {selectedGuide.slug === 'placement-guide' && (
                                /* Placement directories index */
                                <div className="sidebar-index-container animate-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '15px' }}>Directory Search</h4>
                                    <div style={{ position: 'relative', marginBottom: '25px' }}>
                                        <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                                        <input 
                                            type="text"
                                            placeholder="Search companies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ width: '100%', padding: '10px 15px 10px 35px', borderRadius: '8px', border: 'var(--glass-border)', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-main)', background: 'var(--bg-dark)' }}
                                        />
                                    </div>

                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '12px' }}>Sectors / Categories</h4>
                                    <ul className="sidebar-chapters-list" style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                                        {categories.map(category => {
                                            const isActive = activeBranch === category;
                                            return (
                                                <li key={category} style={{ marginBottom: '6px' }}>
                                                    <div 
                                                        onClick={() => {
                                                            setActiveBranch(category);
                                                            setIsSidebarOpen(false);
                                                        }}
                                                        style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s', background: isActive ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.05), rgba(100, 116, 139, 0.05))' : 'transparent', borderLeft: isActive ? '3px solid var(--primary-brand)' : '3px solid transparent', color: isActive ? 'var(--primary-brand)' : 'var(--text-muted)' }}
                                                    >
                                                        <i className="fas fa-filter" style={{ marginRight: '8px', fontSize: '0.72rem', opacity: 0.7 }}></i>
                                                        {category}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right Content Reading Area */}
                        <div className="guides-content-area" style={{ flex: 1, paddingLeft: '320px', transition: 'padding-left 0.3s ease' }}>
                            <div className="guides-main-container" style={{ padding: '120px 40px 80px 40px', maxWidth: '1000px', margin: '0 auto' }}>
                                
                                {/* Breadcrumb back navigation link */}
                                <div 
                                    className="reading-back-breadcrumb" 
                                    onClick={() => navigate('/learn')} 
                                    style={{ marginBottom: '25px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s' }}
                                >
                                    <i className="fas fa-th-large"></i> Back to Hub Catalog
                                </div>

                                <div className="mobile-toggle-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <button 
                                        onClick={() => navigate('/learn')}
                                        className="back-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'none', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <i className="fas fa-th-large"></i> Back to Hub
                                    </button>
                                    
                                    {/* Mobile Sidebar Toggle */}
                                    <button 
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="back-btn mobile-only-toggle-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'none', gap: '8px', alignItems: 'center', fontWeight: 700, fontSize: '0.8rem' }}
                                    >
                                        <i className={`fas ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'}`}></i>
                                        {isSidebarOpen ? 'Close Menu' : 'Sectors'}
                                    </button>
                                </div>

                                {/* Reading Panel Area */}
                                <div 
                                    className="glass-panel guides-reading-pane animate-enter" 
                                    style={{ background: 'var(--bg-panel)', borderRadius: '24px', border: 'var(--glass-border)', padding: '45px', boxShadow: 'var(--card-shadow)', minHeight: '400px' }}
                                >
                                    <div className="animate-enter guide-content-render">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                            <span style={{ background: 'rgba(234, 88, 12, 0.08)', color: 'var(--primary-brand)', fontSize: '0.78rem', fontWeight: 800, padding: '5px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {selectedGuide.category}
                                            </span>
                                            <span className="catalog-difficulty-badge directory">
                                                {selectedGuide.difficulty}
                                            </span>
                                        </div>

                                        {/* Static directory / placement lists */}
                                        <div className="static-guide-content-reader">
                                            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', margin: '15px 0 25px', borderBottom: '1px solid rgba(234, 88, 12, 0.1)', paddingBottom: '15px' }}>
                                                {selectedGuide.title}
                                            </h2>
                                            
                                            <div 
                                                dangerouslySetInnerHTML={{ __html: selectedGuide.content }} 
                                                className="html-article-body"
                                                style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.02rem' }}
                                            />

                                            {selectedGuide.slug === 'placement-guide' && (
                                                <div style={{ marginTop: '30px' }} className="animate-enter">
                                                    {/* Placement Success Dashboard Banner */}
                                                    <div style={{ marginBottom: '45px', padding: '35px', background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.03), rgba(100, 116, 139, 0.03))', borderRadius: '20px', border: '1px solid rgba(234, 88, 12, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 30px rgba(0, 0, 0, 0.02)', position: 'relative', overflow: 'hidden' }}>
                                                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(100, 116, 139, 0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>
                                                        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>

                                                        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <i className="fas fa-rocket" style={{ color: 'var(--primary-brand)' }}></i> Placement Success Portal
                                                        </h3>
                                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '25px', lineHeight: 1.6 }}>
                                                            Unlock your career potential with daily job alerts, official recruiting coordinates, and domain guides mapped for corporate recruitment.
                                                        </p>
                                                        
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                                            <a 
                                                                href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" 
                                                                target="_blank" 
                                                                rel="noreferrer" 
                                                                className="wa-glow-btn"
                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--primary-brand)', color: 'white', fontSize: '0.9rem', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 15px rgba(234, 88, 12, 0.35)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                            >
                                                                <i className="fab fa-whatsapp" style={{ fontSize: '1.25rem' }}></i> Join WhatsApp Community
                                                            </a>

                                                            <button 
                                                                onClick={() => navigate('/services/job-roles')}
                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--bg-panel)', color: 'var(--secondary-blue)', border: '1px solid rgba(100, 116, 139, 0.3)', fontSize: '0.9rem', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.02)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                                className="roles-nav-btn"
                                                            >
                                                                <i className="fas fa-briefcase"></i> Understand the Roles
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Company Directory List */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                                                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                                            Corporate Recruitment Directories
                                                        </h3>
                                                    </div>

                                                    {(() => {
                                                        const filteredCategories = Object.entries(placementCompanies).filter(([category]) => {
                                                            if (activeBranch === 'All Categories') return true;
                                                            return category === activeBranch;
                                                        });

                                                        return filteredCategories.map(([category, companies]) => {
                                                            const filteredCompanies = companies.filter(c => 
                                                                c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                                c.role.toLowerCase().includes(searchQuery.toLowerCase())
                                                            );

                                                            if (filteredCompanies.length === 0) return null;

                                                            return (
                                                                <div key={category} style={{ marginBottom: '40px' }} className="animate-enter">
                                                                    <h4 style={{ color: 'var(--primary-brand)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                        <i className="fas fa-building" style={{ opacity: 0.8 }}></i> {category}
                                                                    </h4>
                                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
                                                                        {filteredCompanies.map((c, i) => (
                                                                            <a 
                                                                                key={i} 
                                                                                href={c.link} 
                                                                                target="_blank" 
                                                                                rel="noreferrer" 
                                                                                className="glass-panel"
                                                                                style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-card)', border: 'var(--glass-border)', display: 'block', transition: 'transform 0.2s, border-color 0.2s', textDecoration: 'none' }}
                                                                            >
                                                                                <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '4px' }}>{c.name}</div>
                                                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.role}</div>
                                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--primary-brand)', marginTop: '10px', fontWeight: 700 }}>
                                                                                    Visit Careers <i className="fas fa-external-link-alt" style={{ fontSize: '0.62rem' }}></i>
                                                                                </span>
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Desktop Responsive Layout overrides for Reader Workspace */}
                    
                </>
            )}
        </>
    );
};

export default Learn;
