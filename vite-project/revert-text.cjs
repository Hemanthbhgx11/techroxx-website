const fs = require('fs');
const path = require('path');

const mainCssPath = path.join(__dirname, 'src', 'styles', 'main.css');
const homeCssPath = path.join(__dirname, 'src', 'styles', 'home-ecosystem.css');
const servicesPath = path.join(__dirname, 'src', 'pages', 'Services.jsx');
const deptPath = path.join(__dirname, 'src', 'pages', 'DepartmentDetails.jsx');
const homePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
const galleryPath = path.join(__dirname, 'src', 'pages', 'Gallery.jsx');
const guidesPath = path.join(__dirname, 'src', 'pages', 'Guides.jsx');
const layoutPath = path.join(__dirname, 'src', 'components', 'Layout.jsx');

// Helper to replace content in file
function updateFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [target, replacement] of replacements) {
        content = content.split(target).join(replacement);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated: ${filePath}`);
    } else {
        console.log(`No changes needed or matched: ${filePath}`);
    }
}

// 1. Replacements for main.css
const mainCssReplacements = [
    // Variables override to Light Mode
    [`--bg-dark: #09090b;`, `--bg-dark: #f8fafc;`],
    [`--bg-panel: #111111;`, `--bg-panel: #ffffff;`],
    [`--bg-card: #18181b;`, `--bg-card: #ffffff;`],
    [`--primary-navy: #f8fafc;`, `--primary-navy: #0f172a;`],
    [`--glass-bg: rgba(17, 17, 19, 0.75);`, `--glass-bg: rgba(255, 255, 255, 0.75);`],
    [`--text-main: #f4f4f5;`, `--text-main: #0f172a;`],
    [`--text-muted: #a1a1aa;`, `--text-muted: #475569;`],
    [`--glass-border: 1px solid rgba(220, 38, 38, 0.15);`, `--glass-border: 1px solid rgba(220, 38, 38, 0.12);`],
    [`--card-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);`, `--card-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);`],
    [`--card-hover-shadow: 0 10px 40px 0 rgba(220, 38, 38, 0.2);`, `--card-hover-shadow: 0 10px 40px 0 rgba(220, 38, 38, 0.08);`],
    
    // Background overrides
    [`background: linear-gradient(135deg, rgba(220, 38, 38, 0.04) 0%, transparent 25%, rgba(59, 130, 246, 0.03) 50%, transparent 75%, rgba(220, 38, 38, 0.04) 100%), #09090b;`, `background: #f8fafc;`],
    [`background: linear-gradient(rgba(9, 9, 11, 0.90), rgba(0, 0, 0, 0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop')`, `background: linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop')`],
    [`background: rgba(24, 24, 27, 0.7);`, `background: rgba(255, 255, 255, 0.75);`],
    [`background: #111111;`, `background: #ffffff;`],
    [`background: rgba(24, 24, 27, 0.75);`, `background: rgba(255, 255, 255, 0.75);`],
    [`background: rgba(18, 18, 24, 0.85);`, `background: rgba(255, 255, 255, 0.85);`],
    [`border: 1px solid rgba(220, 38, 38, 0.15);`, `border: 1px solid rgba(220, 38, 38, 0.12);`],
    [`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);`, `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);`],
    [`border: 1px solid rgba(220, 38, 38, 0.15);`, `border: 1px solid rgba(220, 38, 38, 0.12);`],
    [`box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);`, `box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);`],
    [`border-bottom: 1px solid rgba(220, 38, 38, 0.2);`, `border-bottom: 1px solid rgba(220, 38, 38, 0.12);`],
    [`box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.1);`, `box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.05);`],
    [`background: #111111;`, `background: #ffffff;`],
    
    // Page filter overrides
    [`.gallery-page { background: #09090b;`, `.gallery-page { background: transparent;`],
    [`background: linear-gradient(135deg, #dc2626, #3b82f6);`, `background: linear-gradient(135deg, #ef4444, #3b82f6);`],
    [`box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);`, `box-shadow: 0 8px 20px rgba(220, 38, 38, 0.1);`],
    
    // Chat window overrides
    [`background: linear-gradient(90deg, #dc2626, #3b82f6);`, `background: linear-gradient(90deg, #ef4444, #3b82f6);`],
    [`box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);`, `box-shadow: 0 4px 10px rgba(220, 38, 38, 0.15);`],
    [`box-shadow: 0 6px 15px rgba(220, 38, 38, 0.4);`, `box-shadow: 0 6px 15px rgba(220, 38, 38, 0.2);`],
    
    // Footer Light/Muted gradient styling
    [`background: linear-gradient(180deg, #111111 0%, #000000 100%); border-top: 1px solid rgba(220, 38, 38, 0.15);`, `background: linear-gradient(135deg, #0f172a, #1e1b4b); border-top: 1px solid rgba(220, 38, 38, 0.15);`],
    [`color: rgba(255,255,255,0.9);`, `color: rgba(255,255,255,0.9);`],
    [`border-top: 1px solid rgba(255,255,255,0.2);`, `border-top: 1px solid rgba(255,255,255,0.2);`],
    
    // Revert body pseudo grid and insert dynamic backdrop waves styling
    [`body::before {\n    content: "";\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: \n        repeating-linear-gradient(45deg, rgba(220, 38, 38, 0.015) 0px, rgba(220, 38, 38, 0.015) 2px, transparent 2px, transparent 15px),\n        repeating-linear-gradient(-45deg, rgba(59, 130, 246, 0.01) 0px, rgba(59, 130, 246, 0.01) 2px, transparent 2px, transparent 15px);\n    pointer-events: none;\n    z-index: 1;\n}`, `/* Backdrop wave styles */\n.backdrop-waves {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    z-index: -1;\n    overflow: hidden;\n    pointer-events: none;\n    background: #f8fafc;\n}\n.wave {\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(120px);\n    opacity: 0.14;\n    transition: all 1s ease;\n}\n.wave-1 {\n    top: -15%;\n    right: -10%;\n    width: 650px;\n    height: 650px;\n    background: radial-gradient(circle, #ef4444 0%, #3b82f6 100%);\n    animation: waveFlow1 25s infinite alternate ease-in-out;\n}\n.wave-2 {\n    bottom: -15%;\n    left: -10%;\n    width: 750px;\n    height: 750px;\n    background: radial-gradient(circle, #3b82f6 0%, #ef4444 100%);\n    animation: waveFlow2 30s infinite alternate ease-in-out;\n}\n.wave-3 {\n    top: 35%;\n    left: 20%;\n    width: 450px;\n    height: 450px;\n    background: radial-gradient(circle, #ef4444 0%, rgba(59, 130, 246, 0.5) 100%);\n    animation: waveFlow3 20s infinite alternate ease-in-out;\n}\n@keyframes waveFlow1 {\n    0% { transform: translate(0, 0) scale(1) rotate(0deg); }\n    100% { transform: translate(-100px, 80px) scale(1.15) rotate(180deg); }\n}\n@keyframes waveFlow2 {\n    0% { transform: translate(0, 0) scale(1) rotate(0deg); }\n    100% { transform: translate(120px, -60px) scale(0.9) rotate(-180deg); }\n}\n@keyframes waveFlow3 {\n    0% { transform: translate(0, 0) scale(1); }\n    100% { transform: translate(-60px, -60px) scale(1.2); }\n}`]
];

// 2. Replacements for home-ecosystem.css
const homeCssReplacements = [
    [`background: linear-gradient(135deg, rgba(220, 38, 38, 0.04) 0%, transparent 40%, rgba(59, 130, 246, 0.03) 70%, transparent 100%), #09090b;`, `background: transparent;`],
    [`background: #111111;`, `background: #ffffff;`],
    [`background: rgba(24, 24, 27, 0.7);`, `background: rgba(255, 255, 255, 0.75);`],
    [`background: rgba(24, 24, 27, 0.75);`, `background: rgba(255, 255, 255, 0.75);`],
    [`background: rgba(30, 30, 35, 0.95);`, `background: rgba(255, 255, 255, 0.95);`],
    [`background: #111111;`, `background: #ffffff;`],
    [`background: #18181b;`, `background: #ffffff;`],
    [`color: #f4f4f5;`, `color: #0f172a;`],
    [`background: rgba(17, 17, 19, 0.75);`, `background: rgba(255, 255, 255, 0.75);`],
    [`background: #09090b;`, `background: transparent;`]
];

// 3. Replacements for Services.jsx
const servicesReplacements = [
    [`rgba(24, 24, 27, 0.75)`, `rgba(255, 255, 255, 0.75)`],
    [`rgba(24, 24, 27, 0.8)`, `rgba(255, 255, 255, 0.8)`],
    [`rgba(30, 30, 35, 0.95)`, `rgba(255, 255, 255, 0.95)`],
    [`rgba(220, 38, 38, 0.15)`, `rgba(220, 38, 38, 0.12)`],
    [`rgba(0, 0, 0, 0.3)`, `rgba(0, 0, 0, 0.05)`],
    [`rgba(220, 38, 38, 0.12)`, `rgba(220, 38, 38, 0.08)`],
    [`#111111`, `#ffffff`],
    [`background: 'rgba(24, 24, 27, 0.75)'`, `background: 'rgba(255, 255, 255, 0.75)'`],
    [`background: '#111111'`, `background: '#ffffff'`]
];

// 4. Replacements for DepartmentDetails.jsx
const deptReplacements = [
    [`rgba(24, 24, 27, 0.8)`, `rgba(255, 255, 255, 0.8)`],
    [`rgba(24, 24, 27, 0.7)`, `rgba(255, 255, 255, 0.7)`],
    [`rgba(18, 18, 24, 0.65)`, `rgba(255, 255, 255, 0.6)`],
    [`rgba(30, 30, 35, 0.95)`, `rgba(255, 255, 255, 0.95)`],
    [`#111111`, `#ffffff`],
    [`rgba(220, 38, 38, 0.15)`, `rgba(220, 38, 38, 0.12)`],
    [`rgba(220, 38, 38, 0.1)`, `rgba(220, 38, 38, 0.08)`],
    [`rgba(220, 38, 38, 0.35)`, `rgba(220, 38, 38, 0.25)`],
    [`rgba(0, 0, 0, 0.3)`, `rgba(0, 0, 0, 0.05)`],
    [`rgba(0, 0, 0, 0.1)`, `rgba(0, 0, 0, 0.02)`],
    [`rgba(220, 38, 38, 0.2)`, `rgba(220, 38, 38, 0.1)`],
    [`boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'`, `boxShadow: '0 10px 40px -10px rgba(220, 38, 38, 0.1)'`],
    [`boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'`, `boxShadow: '0 4px 20px rgba(220, 38, 38, 0.02)'`],
    [`boxShadow: '0 4px 25px rgba(0, 0, 0, 0.3)'`, `boxShadow: '0 4px 25px rgba(0, 0, 0, 0.01)'`],
    [`background: 'rgba(24, 24, 27, 0.8)'`, `background: 'rgba(255, 255, 255, 0.8)'`],
    [`background: 'rgba(24, 24, 27, 0.7)'`, `background: 'rgba(255, 255, 255, 0.7)'`],
    [`background: 'rgba(18, 18, 24, 0.65)'`, `background: 'rgba(255, 255, 255, 0.6)'`],
    [`background: '#111111'`, `background: '#ffffff'`]
];

// 5. Replacements for Home.jsx
const homeReplacements = [
    [`background: '#111111'`, `background: 'white'`],
    [`rgba(220, 38, 38, 0.15)`, `rgba(220, 38, 38, 0.1)`],
    [`rgba(0, 0, 0, 0.2)`, `rgba(124, 58, 237, 0.03)`],
    [`background: 'rgba(220, 38, 38, 0.15)'`, `background: 'rgba(220, 38, 38, 0.1)'`],
    [`rgba(24, 24, 27, 0.75)`, `rgba(255, 255, 255, 0.75)`],
    [`rgba(24, 24, 27, 0.8)`, `rgba(255, 255, 255, 0.8)`],
    [`rgba(30, 30, 35, 0.95)`, `rgba(255, 255, 255, 0.95)`],
    [`#111111`, `#ffffff`]
];

// 6. Replacements for Gallery.jsx
const galleryReplacements = [
    [`rgba(24, 24, 27, 0.75)`, `rgba(255, 255, 255, 0.75)`],
    [`rgba(24, 24, 27, 0.8)`, `rgba(255, 255, 255, 0.8)`],
    [`rgba(30, 30, 35, 0.95)`, `rgba(255, 255, 255, 0.95)`],
    [`rgba(220, 38, 38, 0.15)`, `rgba(220, 38, 38, 0.12)`],
    [`rgba(0, 0, 0, 0.3)`, `rgba(0, 0, 0, 0.05)`],
    [`rgba(0, 0, 0, 0.2)`, `rgba(0, 0, 0, 0.04)`],
    [`rgba(220, 38, 38, 0.1)`, `rgba(220, 38, 38, 0.08)`],
    [`rgba(18, 18, 24, 0.75)`, `rgba(255, 255, 255, 0.7)`]
];

// 7. Replacements for Guides.jsx
const guidesReplacements = [
    [`rgba(24, 24, 27, 0.75)`, `rgba(255, 255, 255, 0.75)`],
    [`rgba(24, 24, 27, 0.8)`, `rgba(255, 255, 255, 0.8)`],
    [`rgba(30, 30, 35, 0.95)`, `rgba(255, 255, 255, 0.95)`],
    [`#111111`, `#ffffff`],
    [`rgba(220, 38, 38, 0.15)`, `rgba(220, 38, 38, 0.12)`],
    [`rgba(0, 0, 0, 0.3)`, `rgba(0, 0, 0, 0.05)`],
    [`rgba(0, 0, 0, 0.1)`, `rgba(0, 0, 0, 0.02)`],
    [`rgba(220, 38, 38, 0.1)`, `rgba(220, 38, 38, 0.08)`],
    [`rgba(220, 38, 38, 0.2)`, `rgba(220, 38, 38, 0.1)`]
];

// 8. Inject Backdrop waves markup globally into Layout.jsx
const layoutReplacements = [
    [`    return (\n        <>\n            <Navbar />`, `    return (\n        <>\n            {/* Wave like strip with dusty flow and blur backdrop */}\n            <div className="backdrop-waves">\n                <div className="wave wave-1"></div>\n                <div className="wave wave-2"></div>\n                <div className="wave wave-3"></div>\n            </div>\n\n            <Navbar />`],
    [`    return (\r\n        <>\r\n            <Navbar />`, `    return (\r\n        <>\r\n            {/* Wave like strip with dusty flow and blur backdrop */}\r\n            <div className="backdrop-waves">\r\n                <div className="wave wave-1"></div>\r\n                <div className="wave wave-2"></div>\r\n                <div className="wave wave-3"></div>\r\n            </div>\r\n\r\n            <Navbar />`],
    [`            <main>`, `            <main style={{ position: 'relative', zIndex: 10 }}>`]
];

// Perform replacements
updateFile(mainCssPath, mainCssReplacements);
updateFile(homeCssPath, homeCssReplacements);
updateFile(servicesPath, servicesReplacements);
updateFile(deptPath, deptReplacements);
updateFile(homePath, homeReplacements);
updateFile(galleryPath, galleryReplacements);
updateFile(guidesPath, guidesReplacements);
updateFile(layoutPath, layoutReplacements);

console.log('All Light Theme reverting and Backdrop Wave animations completed successfully!');
