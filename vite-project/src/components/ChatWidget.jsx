import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentData, topicDetailData } from '../data/constants';

const ChatWidget = () => {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    // Initial welcome message with premium clickable quick-replies
    const initialMessage = {
        text: "Hello! Welcome to <strong>Tech Roxx</strong> 🚀 I am your professional NLP assistant.<br/>" +
              "Founded by <strong>Mr. Hemanth Goud Burra</strong> (CEO & Founder), Tech Roxx integrates three major pillars: Academic Training in Computing, Electra, and Business disciplines; Career Programs (Placement & Internships); and Consultancy Wings (Foreign Education & Real Estate).<br/><br/>" +
              "How can I assist you today?<br/>" +
              "<div class='chat-quick-replies'>" +
              "<button class='chat-quick-reply-btn' data-query='Explore Courses'>Explore Tracks 🎓</button>" +
              "<button class='chat-quick-reply-btn' data-query='About Tech Roxx'>About Us 🏢</button>" +
              "<button class='chat-quick-reply-btn' data-query='Consultancy Services'>Consulting 🤝</button>" +
              "<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>WhatsApp Group 💬</button>" +
              "<button class='chat-quick-reply-btn' data-query='Contact Info'>Contact Info 📞</button>" +
              "</div>",
        sender: "bot"
    };

    const [chatMessages, setChatMessages] = useState([initialMessage]);
    const [chatInput, setChatInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, isChatOpen]);

    // Cleanup text to normalize keywords matching
    const cleanText = (text) => {
        return text.toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g,"")
            .replace(/\s+/g," ")
            .trim();
    };

    // Advanced NLP Intent Scorer
    const getIntent = (cleanedText) => {
        const intents = {
            greeting: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "hola", "start"],
            thanks: ["thanks", "thank you", "thank", "appreciate", "awesome", "great", "cool", "helpful"],
            goodbye: ["bye", "goodbye", "exit", "close", "see you", "stop", "quit"],
            about: ["who", "what is", "about", "founder", "leaders", "hemanth", "company", "institute", "organization", "academy", "tech roxx", "techroxx"],
            team: ["team", "staff", "coo", "srikanth", "members", "people", "employees", "outreach", "manager", "prudhvi", "praveen", "teja", "aashrith"],
            contact: ["contact", "phone", "number", "email", "address", "call", "reach", "support", "location", "map", "office", "mobile", "helpdesk", "cell"],
            whatsapp: ["whatsapp", "group", "join", "community", "wa", "link", "chat"],
            courses: ["course", "courses", "classes", "train", "training", "trainings", "study", "learning", "learn", "curriculum", "syllabus", "topic", "topics", "subject", "subjects", "education", "fees", "fee", "price", "pricing", "cost"],
            consultancy: ["consult", "consultancy", "consulting", "advise", "guidance", "real estate", "admissions", "admission", "college", "university", "foreign", "study abroad", "stem", "research", "r&d", "sales", "selling"],
            internship: ["internship", "internships", "intern", "interns", "work"],
            placement: ["placement", "placements", "job", "jobs", "hire", "recruit", "recruiter", "recruiters", "career", "careers", "resume", "cv", "placement guide", "placement help"],
            events: ["workshop", "workshops", "hackathon", "hackathons", "meetup", "meetups", "webinar", "webinars", "event", "events", "past", "upcoming"],
            gallery: ["gallery", "photos", "photo", "video", "videos", "images", "image", "pictures", "picture", "clips", "reel", "reels", "highlights"]
        };

        let maxIntent = "unknown";
        let maxScore = 0;

        for (let intent in intents) {
            let score = 0;
            intents[intent].forEach(kw => {
                if (cleanedText.includes(kw)) {
                    score += kw.split(" ").length * 2.0;
                }
            });
            if (score > maxScore) {
                maxScore = score;
                maxIntent = intent;
            }
        }
        return { intent: maxIntent, score: maxScore };
    };

    // Advanced NLP Entity Extractor
    const getEntity = (cleanedText) => {
        const techs = {
            "foundations": ["foundations", "python", "java", "c++", "linux", "git", "github", "oop"],
            "dsa": ["dsa", "data structures", "algorithms", "stacks", "queues", "trees", "graphs", "recursion", "dynamic programming"],
            "ai-ml": ["ai/ml", "machine learning", "ml", "pandas", "numpy", "scikit", "predictive models", "supervised", "unsupervised"],
            "dl-cv": ["deep learning", "dl", "computer vision", "cv", "opencv", "cnn", "tensorflow", "pytorch", "yolo"],
            "gen-ai": ["generative ai", "gen ai", "llm", "rag", "vector db", "prompt engineering", "agents", "autonomous agents"],
            "full-stack": ["full stack", "mern", "web development", "app development", "react", "node", "express", "mongodb", "javascript", "html", "css"],
            "ai-web-dev": ["vibe coding", "ai assisted coding", "low code", "ai ui/ux", "ai-assisted"],
            "industry-4.0": ["industry 4.0", "capstone", "saas product", "innovation lab"],
            "iot": ["iot", "internet of things", "smart home", "mqtt", "coap", "edge ai"],
            "embedded": ["embedded", "embedded systems", "microcontroller", "esp32", "arduino", "stm32", "rtos", "firmware"],
            "sensors": ["sensors", "sensor", "actuator", "actuators", "calibration"],
            "pcb": ["pcb", "pcb design", "printed circuit", "kicad", "eagle", "schematic"],
            "hardware-projects": ["hardware projects", "real-time hardware", "hw-sw"]
        };

        for (let techKey in techs) {
            for (let keyword of techs[techKey]) {
                if (cleanedText.includes(keyword)) {
                    return { type: "technology", value: techKey };
                }
            }
        }

        const depts = {
            "computing": ["computing", "cse", "mca", "bca", "computer science", "bcom"],
            "electra": ["electra", "ece", "eee", "eie", "electronics", "electrical", "hardware"],
            "arts-management": ["arts", "management", "business", "analytics", "mba", "bba"]
        };

        for (let deptKey in depts) {
            for (let keyword of depts[deptKey]) {
                if (cleanedText.includes(keyword)) {
                    return { type: "department", value: deptKey };
                }
            }
        }

        const consultancies = {
            "real-estate": ["real estate", "property", "buying selling", "investing in property"],
            "admissions": ["admissions", "admission guidance", "college admission", "school admission"],
            "foreign-education": ["foreign education", "study abroad", "abroad", "visa processing", "university selection", "scholarship assistance"],
            "product-sales": ["product sales", "sales assistance", "product sale", "market trends"],
            "r-and-d": ["r&d", "research and development", "innovation"],
            "stem": ["stem", "stem initiatives", "science technology engineering math"]
        };

        for (let cKey in consultancies) {
            for (let keyword of consultancies[cKey]) {
                if (cleanedText.includes(keyword)) {
                    return { type: "consultancy", value: cKey };
                }
            }
        }
        return null;
    };

    // Processor for handling queries (both typed & clicked)
    const handleSendQuery = (textQuery) => {
        if (!textQuery.trim()) return;

        // Add user text
        setChatMessages(prev => [...prev, { text: textQuery, sender: 'user' }]);

        // Generate response using client-side NLP pipeline
        setTimeout(() => {
            const cleaned = cleanText(textQuery);
            const entity = getEntity(cleaned);
            const intentObj = getIntent(cleaned);

            let replyHTML = "";
            let shouldNavigate = null;

            // 1. Process technologies
            if (entity && entity.type === 'technology') {
                const techKey = entity.value;
                let foundTech = null;
                let deptName = "";
                let deptKey = "";

                for (let dk in departmentData) {
                    const t = departmentData[dk].technologies.find(tech => tech.id === techKey);
                    if (t) {
                        foundTech = t;
                        deptName = departmentData[dk].title;
                        deptKey = dk;
                        break;
                    }
                }

                if (foundTech) {
                    const topics = topicDetailData[techKey] || [];
                    const topicListHTML = topics.slice(0, 8).map(topic => `<li>${topic}</li>`).join("");

                    replyHTML = `<strong>${foundTech.name}</strong><br/>` +
                                `${foundTech.desc}<br/><br/>` +
                                (topicListHTML ? `<strong>Key Topics Covered:</strong><ul>${topicListHTML}</ul>` : "") +
                                `<br/>I am opening the <strong>${deptName}</strong> page for you! 🚀` +
                                `<div class='chat-quick-replies'>` +
                                `<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>Join WhatsApp 💬</button>` +
                                `<button class='chat-quick-reply-btn' data-query='Contact Info'>Contact Us 📞</button>` +
                                `</div>`;
                    shouldNavigate = `/services/${deptKey}`;
                }
            }
            // 2. Process departments
            else if (entity && entity.type === 'department') {
                const deptKey = entity.value;
                const dept = departmentData[deptKey];

                if (dept) {
                    const techList = dept.technologies.slice(0, 4).map(t => `<li>${t.name}</li>`).join("");

                    replyHTML = `<strong>${dept.title}</strong><br/>` +
                                `Providing professional tracks in <strong>${dept.subtitle}</strong>.<br/>` +
                                `<ul>${techList}</ul><br/>` +
                                `Opening the <strong>${dept.title}</strong> page for you! 🚀` +
                                `<div class='chat-quick-replies'>` +
                                `<button class='chat-quick-reply-btn' data-query='Contact Info'>Contact Us 📞</button>` +
                                `<button class='chat-quick-reply-btn' data-query='Explore Courses'>All Courses 🎓</button>` +
                                `</div>`;
                    shouldNavigate = `/services/${deptKey}`;
                }
            }
            // 3. Process consultancies
            else if (entity && entity.type === 'consultancy') {
                const cKey = entity.value;
                
                // Fetch the title directly since we know the mapping
                let title = cKey.replace("-", " ").toUpperCase();
                let desc = "Expert consultancy services and solutions.";
                
                if (cKey === "foreign-education") {
                    title = "Foreign Education Services";
                    desc = "Complete university selection, visa processing, and scholarship assistance.";
                } else if (cKey === "real-estate") {
                    title = "Real Estate Consulting";
                    desc = "Professional buying, selling, and property investment guidance.";
                } else if (cKey === "admissions") {
                    title = "Admissions Guidance";
                    desc = "Comprehensive mapping and guidance for school and college admissions.";
                }

                replyHTML = `<strong>${title}</strong><br/>` +
                            `${desc}<br/><br/>` +
                            `Opening details for <strong>${title}</strong>... 🚀` +
                            `<div class='chat-quick-replies'>` +
                            `<button class='chat-quick-reply-btn' data-query='Contact Info'>Consultant Contact 📞</button>` +
                            `<button class='chat-quick-reply-btn' data-query='Consultancy Services'>All Consultancies 🤝</button>` +
                            `</div>`;
                shouldNavigate = `/services/consultancy/${cKey}`;
            }
            // 4. Intent matching fallback
            else {
                const intent = intentObj.intent;

                switch (intent) {
                    case 'greeting':
                        replyHTML = `Hello! Welcome to Tech Roxx! 😊 How can I help you today?` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Explore Courses'>Explore Courses 🎓</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Placement Guide'>Placement Support 💼</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Contact Info'>Contact Info 📞</button>` +
                                    `</div>`;
                        break;

                    case 'thanks':
                        replyHTML = `You're very welcome! Let me know if you need anything else. 👍` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Explore Courses'>Explore Courses 🎓</button>` +
                                    `</div>`;
                        break;

                    case 'goodbye':
                        replyHTML = `Goodbye! Thank you for visiting Tech Roxx. Have a wonderful day! 👋`;
                        break;

                    case 'about':
                        replyHTML = `<strong>Tech Roxx</strong> is an interconnected technical network based in Hyderabad, designed to bridge the gap between academia and corporate environments.<br/><br/>` +
                                    `Founded by <strong>Mr. Hemanth Goud Burra</strong> (CEO & Founder), Tech Roxx integrates three major pillars:<br/>` +
                                    `• <strong>Academic Departments:</strong> Computing (Python, DSA, AI/ML, Generative AI, Full Stack MERN, Vibe Coding), Electra (IoT, Embedded Systems, PCB Design), and Arts & Management.<br/>` +
                                    `• <strong>Ecosystem Programs:</strong> Placement Assistance and Internship Programs.<br/>` +
                                    `• <strong>Consultancy Wings:</strong> Foreign Education counseling, Real Estate, and R&D support.<br/><br/>` +
                                    `Opening the <strong>About Us</strong> page for you to view our team, leadership, and gallery... 🏢`;
                        shouldNavigate = `/about`;
                        break;

                    case 'team':
                        replyHTML = `<strong>Tech Roxx Leadership & Team:</strong><br/>` +
                                    `• <strong>CEO & Founder:</strong> Mr. Hemanth Goud Burra<br/>` +
                                    `• <strong>COO:</strong> Mr. Srikanth<br/>` +
                                    `• <strong>Project Manager:</strong> Thirupathi Aashrith<br/>` +
                                    `• <strong>Operations Manager:</strong> Prudhvi Sai<br/>` +
                                    `• <strong>Outreach Manager:</strong> Muchapotula Prudhvi<br/>` +
                                    `• <strong>Content Manager:</strong> Valluri Praveen<br/>` +
                                    `• <strong>Content Leader:</strong> Ravi Teja<br/><br/>` +
                                    `Redirecting you to the <strong>About Us</strong> page to view our full team details! 🏢`;
                        shouldNavigate = `/about`;
                        break;

                    case 'contact':
                        replyHTML = `<strong>Contact Tech Roxx:</strong><br/>` +
                                    `• <strong>Mobile / WhatsApp:</strong> +91 7659906008<br/>` +
                                    `• <strong>CEO & Founder:</strong> Mr. Hemanth Goud Burra<br/>` +
                                    `• <strong>Email:</strong> info.e@techroxx.in<br/><br/>` +
                                    `Redirecting you to the <strong>Contact Us</strong> page for address, maps, and enrollment forms! 📞` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>WhatsApp Community 💬</button>` +
                                    `</div>`;
                        shouldNavigate = `/contact`;
                        break;

                    case 'whatsapp':
                        replyHTML = `<strong>Tech Roxx WhatsApp Community:</strong><br/>` +
                                    `Join our active WhatsApp channel for regular job updates, placement guides, internship alerts, and workshop updates!<br/><br/>` +
                                    `<a href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-top:5px; background:#25D366; color:white; padding:8px 16px; border-radius:20px; font-weight:bold; font-size:0.8rem; text-decoration:none;"><i class="fab fa-whatsapp"></i> Join WhatsApp Group Now</a>` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Placement Guide'>Placement Support 💼</button>` +
                                    `</div>`;
                        break;

                    case 'courses':
                        replyHTML = `<strong>Explore Tech Roxx Courses:</strong><br/>` +
                                    `We offer training tracks in multiple advanced disciplines:<br/>` +
                                    `• <strong>Computing:</strong> Python, DSA, AI/ML, Generative AI, Full Stack (MERN), Vibe Coding.<br/>` +
                                    `• <strong>Electra:</strong> IoT, Embedded, PCB Design, Sensors.<br/>` +
                                    `• <strong>Arts & Management:</strong> PM with AI, HR Analytics, SAP ERP, Business Analytics.<br/><br/>` +
                                    `I am opening the <strong>Services & Courses</strong> page for you! 🎓` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Dept of Computing'>Computing 💻</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Dept of Electra'>Electra ⚡</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Consultancy Services'>Consulting Services 🤝</button>` +
                                    `</div>`;
                        shouldNavigate = `/services`;
                        break;

                    case 'consultancy':
                        replyHTML = `<strong>Tech Roxx Consultancy:</strong><br/>` +
                                    `We provide consulting and project advisory in:<br/>` +
                                    `• Real Estate Investment & Advisory<br/>` +
                                    `• College & School Admissions Mapping<br/>` +
                                    `• Foreign Education (University admissions, Visas, Scholarships)<br/>` +
                                    `• R&D Support & Innovation Labs<br/>` +
                                    `• STEM Initiatives & Sales Support<br/><br/>` +
                                    `Redirecting you to our Services page to explore further...` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Contact Info'>Consultant Hotline 📞</button>` +
                                    `</div>`;
                        shouldNavigate = `/services`;
                        break;

                    case 'internship':
                        replyHTML = `<strong>Internships at Tech Roxx:</strong><br/>` +
                                    `We offer regular internship and job alerts in collaboration with local corporate partners.<br/><br/>` +
                                    `Let me open the <strong>Internships</strong> details page for you... 🚀` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>Join WhatsApp 💬</button>` +
                                    `</div>`;
                        shouldNavigate = `/services/programs/internships`;
                        break;

                    case 'placement':
                        replyHTML = `<strong>Placement Program & Support:</strong><br/>` +
                                    `We offer comprehensive career services including resume review, corporate training, and job alerts for both Product (Tier-1) and Service (Tier-2) companies.<br/><br/>` +
                                    `Redirecting to the <strong>Placement Directory</strong>...` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>WhatsApp Channel 💬</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Placement Guide'>Placement Directory 📖</button>` +
                                    `</div>`;
                        shouldNavigate = `/learn/placement-guide`;
                        break;

                    case 'events':
                        replyHTML = `<strong>Workshops & Tech Meetups:</strong><br/>` +
                                    `Watch highlight reels of our IoT workshops, or get pricing details for upcoming Webinars and Hackathons by speaking with an advisor.<br/><br/>` +
                                    `Opening our <strong>Programs</strong> services page... 🚀` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>Get Alerts 💬</button>` +
                                    `</div>`;
                        shouldNavigate = `/services`;
                        break;

                    case 'gallery':
                        replyHTML = `<strong>Tech Roxx Media Gallery:</strong><br/>` +
                                    `Explore our visual ecosystem! View reels, photos, and highlights of our team, students, and events.<br/><br/>` +
                                    `Opening the <strong>Gallery</strong> page for you! 📸`;
                        shouldNavigate = `/gallery`;
                        break;

                    default:
                        replyHTML = `I'm sorry, I couldn't find a direct match for that query. 😅<br/><br/>` +
                                    `I can help you navigate or get information on:<br/>` +
                                    `• <strong>Syllabus/Courses:</strong> Python, DSA, AI/ML, Full Stack, IoT, Embedded systems.<br/>` +
                                    `• <strong>Careers:</strong> Placements, WhatsApp Job Updates, Internships.<br/>` +
                                    `• <strong>Services:</strong> Consulting, Admissions, Foreign Education.<br/>` +
                                    `• <strong>Info:</strong> Contact details, leadership, locations.<br/><br/>` +
                                    `Please rephrase your query or select a quick option below:` +
                                    `<div class='chat-quick-replies'>` +
                                    `<button class='chat-quick-reply-btn' data-query='Explore Courses'>Explore Courses 🎓</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Placement Guide'>Placement Support 💼</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Join WhatsApp Community'>WhatsApp 💬</button>` +
                                    `<button class='chat-quick-reply-btn' data-query='Contact Info'>Contact Us 📞</button>` +
                                    `</div>`;
                        break;
                }
            }

            // Append response message
            setChatMessages(prev => [...prev, { text: replyHTML, sender: 'bot' }]);

            // Handle page navigation
            if (shouldNavigate) {
                setTimeout(() => {
                    navigate(shouldNavigate);
                }, 800);
            }
        }, 800);
    };

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        const msg = chatInput;
        setChatInput('');
        handleSendQuery(msg);
    };

    // Click handler for catching clicks on the quick reply buttons using event delegation
    const handleMessagesClick = (e) => {
        const button = e.target.closest('.chat-quick-reply-btn');
        if (button) {
            const query = button.getAttribute('data-query');
            if (query) {
                handleSendQuery(query);
            }
        }
    };

    return (
        <div className="chat-widget">
            {isChatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-title"><i className="fas fa-robot"></i> Tech Roxx Assistant</div>
                        <button className="chat-close" onClick={() => setIsChatOpen(false)}><i className="fas fa-times"></i></button>
                    </div>
                    <div className="chat-messages" onClick={handleMessagesClick}>
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.sender === 'bot' ? 'msg-bot' : 'msg-user'}`} dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input-area">
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="Ask me anything..." 
                            value={chatInput} 
                            onChange={(e) => setChatInput(e.target.value)} 
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="chat-send" onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            )}
            <button className="chat-toggle-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
                <i className="fas fa-comment-dots"></i>
            </button>
        </div>
    );
};

export default ChatWidget;
