const fs = require('fs');
const path = require('path');

const mainCssPath = path.join(__dirname, 'src', 'styles', 'main.css');
const homeCssPath = path.join(__dirname, 'src', 'styles', 'home-ecosystem.css');
const servicesPath = path.join(__dirname, 'src', 'pages', 'Services.jsx');
const deptPath = path.join(__dirname, 'src', 'pages', 'DepartmentDetails.jsx');
const homePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
const galleryPath = path.join(__dirname, 'src', 'pages', 'Gallery.jsx');
const guidesPath = path.join(__dirname, 'src', 'pages', 'Guides.jsx');

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
    // Variables override
    [`--bg-dark: #f8fafc;`, `--bg-dark: #09090b;`],
    [`--bg-panel: #ffffff;`, `--bg-panel: #111111;`],
    [`--bg-card: #ffffff;`, `--bg-card: #18181b;`],
    [`--primary-navy: #0f172a;`, `--primary-navy: #f8fafc;`],
    [`--accent-brand: #f97316;`, `--accent-brand: #3b82f6;`],
    [`--secondary-orange: #f97316;`, `--secondary-orange: #dc2626;`],
    [`--futuristic-purple: #7c3aed;`, `--futuristic-purple: #3b82f6;`],
    [`--neon-purple: #9333ea;`, `--neon-purple: #2563eb;`],
    [`--glass-bg: rgba(255, 255, 255, 0.7);`, `--glass-bg: rgba(17, 17, 19, 0.75);`],
    [`--text-main: #0f172a;`, `--text-main: #f4f4f5;`],
    [`--text-muted: #475569;`, `--text-muted: #a1a1aa;`],
    [`--glass-border: 1px solid rgba(0, 0, 0, 0.05);`, `--glass-border: 1px solid rgba(220, 38, 38, 0.15);`],
    [`--card-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);`, `--card-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);`],
    [`--card-hover-shadow: 0 10px 40px 0 rgba(234, 88, 12, 0.15);`, `--card-hover-shadow: 0 10px 40px 0 rgba(220, 38, 38, 0.2);`],
    
    // Gradient rules
    [`linear-gradient(90deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(270deg, #ef4444, #f97316, #7c3aed, #3b82f6, #ef4444)`, `linear-gradient(270deg, #ef4444, #3b82f6, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(135deg, #ef4444, #f97316)`, `linear-gradient(135deg, #dc2626, #3b82f6)`],
    [`linear-gradient(135deg, #7c3aed, #3b82f6)`, `linear-gradient(135deg, #3b82f6, #dc2626)`],
    [`linear-gradient(135deg, rgba(124, 58, 237, 0.03), rgba(234, 88, 12, 0.03))`, `linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(220, 38, 38, 0.05))`],
    [`linear-gradient(60deg, var(--secondary-blue), #ffffff, var(--primary-red), #ffffff, var(--secondary-blue))`, `linear-gradient(60deg, var(--secondary-blue), #111111, var(--primary-red), #111111, var(--secondary-blue))`],
    
    // Light Background overrides
    [`background: linear-gradient(135deg, #ffffff 0%, #f3e8ff 50%, #eff6ff 100%);`, `background: linear-gradient(135deg, rgba(220, 38, 38, 0.04) 0%, transparent 25%, rgba(59, 130, 246, 0.03) 50%, transparent 75%, rgba(220, 38, 38, 0.04) 100%), #09090b;`],
    [`background: linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop')`, `background: linear-gradient(rgba(9, 9, 11, 0.90), rgba(0, 0, 0, 0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop')`],
    [`background: rgba(255, 255, 255, 0.8);`, `background: rgba(24, 24, 27, 0.7);`],
    [`background: #ffffff;`, `background: #111111;`],
    [`background: rgba(255, 255, 255, 0.9);`, `background: rgba(24, 24, 27, 0.75);`],
    [`background: rgba(255, 255, 255, 0.75);`, `background: rgba(24, 24, 27, 0.75);`],
    [`background: rgba(255, 255, 255, 0.85);`, `background: rgba(18, 18, 24, 0.85);`],
    [`border: 1px solid rgba(234, 88, 12, 0.08);`, `border: 1px solid rgba(220, 38, 38, 0.15);`],
    [`box-shadow: 0 10px 30px rgba(234, 88, 12, 0.05);`, `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);`],
    [`box-shadow: 0 20px 40px rgba(234, 88, 12, 0.12);`, `box-shadow: 0 20px 40px rgba(220, 38, 220, 0.2);`],
    [`box-shadow: 0 20px 40px rgba(234, 88, 12, 0.15);`, `box-shadow: 0 20px 40px rgba(220, 38, 220, 0.2);`],
    [`border: 1px solid rgba(234, 88, 12, 0.1);`, `border: 1px solid rgba(220, 38, 38, 0.15);`],
    [`box-shadow: 0 8px 25px rgba(234, 88, 12, 0.05);`, `box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);`],
    [`border: 1px solid rgba(124, 58, 237, 0.1);`, `border: 1px solid rgba(220, 38, 38, 0.15);`],
    [`box-shadow: 0 8px 25px rgba(124, 58, 237, 0.05);`, `box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);`],
    [`border-bottom: 1px solid rgba(124, 58, 237, 0.2);`, `border-bottom: 1px solid rgba(220, 38, 38, 0.2);`],
    [`box-shadow: 0 10px 30px -5px rgba(124, 58, 237, 0.15);`, `box-shadow: 0 10px 30px -5px rgba(220, 38, 220, 0.1);`],
    [`background: radial-gradient(circle at 10% 20%, rgba(234, 88, 12, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(15, 23, 42, 0.03) 0%, transparent 40%);`, `background: radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.06) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 40%);`],
    [`box-shadow: 0 0 30px rgba(234, 88, 12, 0.4);`, `box-shadow: 0 0 30px rgba(220, 38, 38, 0.4);`],
    [`border-color: var(--secondary-blue);`, `border-color: #3b82f6;`],
    [`border: 3px solid var(--secondary-blue);`, `border: 3px solid #3b82f6;`],
    [`color: var(--secondary-blue);`, `color: #3b82f6;`],
    [`color: var(--futuristic-purple);`, `color: #3b82f6;`],
    [`border-color: var(--futuristic-purple);`, `border-color: #3b82f6;`],
    [`box-shadow: 0 15px 35px rgba(124, 58, 237, 0.15);`, `box-shadow: 0 15px 35px rgba(220, 38, 220, 0.15);`],
    [`box-shadow: 0 15px 35px rgba(234, 88, 12, 0.15);`, `box-shadow: 0 15px 35px rgba(220, 38, 220, 0.15);`],
    [`mask-composite: xor;`, `mask-mask-composite: exclude;`],
    
    // Gallery Page background override in main.css
    [`.gallery-page { background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);`, `.gallery-page { background: #09090b;`],
    [`background: linear-gradient(135deg, var(--primary-brand), #c2410c);`, `background: linear-gradient(135deg, #dc2626, #3b82f6);`],
    [`box-shadow: 0 8px 20px rgba(234, 88, 12, 0.2);`, `box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);`],
    
    // Chat window additions
    [`background: linear-gradient(90deg, #ea580c, #f97316);`, `background: linear-gradient(90deg, #dc2626, #3b82f6);`],
    [`box-shadow: 0 4px 10px rgba(234, 88, 12, 0.4);`, `box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);`],
    [`box-shadow: 0 6px 15px rgba(234, 88, 12, 0.5);`, `box-shadow: 0 6px 15px rgba(220, 38, 38, 0.4);`],
    
    // Footer Dark styling
    [`background: linear-gradient(135deg, #1e1b4b, #0f172a);`, `background: linear-gradient(180deg, #111111 0%, #000000 100%); border-top: 1px solid rgba(220, 38, 38, 0.15);`],

    // Add background strips to body definition
    [`line-height: 1.6; \r\n    display: flex; \r\n    flex-direction: column; \r\n    min-height: 100vh; \r\n}`, `line-height: 1.6; \r\n    display: flex; \r\n    flex-direction: column; \r\n    min-height: 100vh; \r\n    position: relative;\r\n}\r\nbody::before {\r\n    content: "";\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: \r\n        repeating-linear-gradient(45deg, rgba(220, 38, 38, 0.015) 0px, rgba(220, 38, 38, 0.015) 2px, transparent 2px, transparent 15px),\r\n        repeating-linear-gradient(-45deg, rgba(59, 130, 246, 0.01) 0px, rgba(59, 130, 246, 0.01) 2px, transparent 2px, transparent 15px);\r\n    pointer-events: none;\r\n    z-index: 1;\r\n}`],
    [`line-height: 1.6; \n    display: flex; \n    flex-direction: column; \n    min-height: 100vh; \n}`, `line-height: 1.6; \n    display: flex; \n    flex-direction: column; \n    min-height: 100vh; \n    position: relative;\n}\nbody::before {\n    content: "";\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: \n        repeating-linear-gradient(45deg, rgba(220, 38, 38, 0.015) 0px, rgba(220, 38, 38, 0.015) 2px, transparent 2px, transparent 15px),\n        repeating-linear-gradient(-45deg, rgba(59, 130, 246, 0.01) 0px, rgba(59, 130, 246, 0.01) 2px, transparent 2px, transparent 15px);\n    pointer-events: none;\n    z-index: 1;\n}`]
];

// 2. Replacements for home-ecosystem.css
const homeCssReplacements = [
    [`background: linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #f3e8ff 100%);`, `background: linear-gradient(135deg, rgba(220, 38, 38, 0.04) 0%, transparent 40%, rgba(59, 130, 246, 0.03) 70%, transparent 100%), #09090b;`],
    [`background: #ffffff;`, `background: #111111;`],
    [`background: rgba(255, 255, 255, 0.7);`, `background: rgba(24, 24, 27, 0.7);`],
    [`background: rgba(255, 255, 255, 0.8);`, `background: rgba(24, 24, 27, 0.75);`],
    [`background: rgba(255, 255, 255, 0.75);`, `background: rgba(24, 24, 27, 0.75);`],
    [`background: rgba(255, 255, 255, 0.95);`, `background: rgba(30, 30, 35, 0.95);`],
    [`border: 1px solid rgba(124, 58, 237, 0.15);`, `border: 1px solid rgba(220, 38, 38, 0.15);`],
    [`border: 2px solid rgba(124, 58, 237, 0.2);`, `border: 2px solid rgba(220, 38, 38, 0.2);`],
    [`box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);`, `box-shadow: 0 0 30px rgba(220, 38, 38, 0.3);`],
    [`stroke="var(--futuristic-purple)"`, `stroke="#3b82f6"`],
    [`stroke="var(--primary-brand)"`, `stroke="#dc2626"`],
    [`fill="var(--bg-panel)"`, `fill="#111111"`],
    [`stroke="var(--futuristic-purple)"`, `stroke="#3b82f6"`],
    [`linear-gradient(to right, rgba(124, 58, 237, 0.5), transparent)`, `linear-gradient(to right, rgba(220, 38, 38, 0.5), transparent)`],
    [`background: linear-gradient(to right, #ef4444, #f97316, #7c3aed, #3b82f6);`, `background: linear-gradient(to right, #ef4444, #3b82f6, #ef4444);`],
    [`color: var(--futuristic-purple);`, `color: #3b82f6;`],
    [`border-color: var(--secondary-blue);`, `border-color: #3b82f6;`],
    [`box-shadow: 0 15px 35px rgba(124, 58, 237, 0.15);`, `box-shadow: 0 15px 35px rgba(220, 38, 220, 0.15);`],
    [`background: var(--bg-panel);`, `background: #111111;`],
    [`background: var(--bg-card);`, `background: #18181b;`],
    [`color: var(--primary-navy);`, `color: #f4f4f5;`],
    [`background: var(--glass-bg);`, `background: rgba(17, 17, 19, 0.75);`],
    [`border-color: var(--futuristic-purple) !important;`, `border-color: #3b82f6 !important;`],
    [`box-shadow: 0 15px 35px rgba(124, 58, 237, 0.12) !important;`, `box-shadow: 0 15px 35px rgba(220, 38, 220, 0.12) !important;`],
    [`background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);`, `background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);`],
    [`background: linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);`, `background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);`],
    [`border: 1px solid rgba(124, 58, 237, 0.2);`, `border: 1px solid rgba(220, 38, 38, 0.2);`],
    [`border: 1px solid rgba(234, 88, 12, 0.2);`, `border: 1px solid rgba(220, 38, 38, 0.2);`],
    [`background: #f8fafc;`, `background: #09090b;`],
    [`color: #0f172a;`, `color: #f4f4f5;`],
    [`background: #0f172a;`, `background: #18181b;`],
    [`background: #071B3B;`, `background: #111111;`],
    [`stroke="#0ea5e9"`, `stroke="#3b82f6"`],
    [`stroke="#FF6B00"`, `stroke="#dc2626"`],
    [`fill="#FF6B00"`, `fill="#dc2626"`],
    [`fill="#0ea5e9"`, `fill="#3b82f6"`],
    [`line-width="2"`, `stroke-width="2"`],
    [`stroke="#FF6B00" strokeWidth="2" strokeOpacity="0.5"`, `stroke="#dc2626" strokeWidth="2" strokeOpacity="0.5"`],
    [`stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.5"`, `stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5"`],
    [`stroke="rgba(14, 165, 233, 0.3)"`, `stroke="rgba(59, 130, 246, 0.3)"`],
    [`background: #f1f5f9;`, `background: #18181b;`],
    [`background: var(--bg-dark);`, `background: #09090b;`]
];

// 3. Replacements for Services.jsx
const servicesReplacements = [
    [`rgba(255, 255, 255, 0.75)`, `rgba(24, 24, 27, 0.75)`],
    [`rgba(255, 255, 255, 0.8)`, `rgba(24, 24, 27, 0.8)`],
    [`rgba(255, 255, 255, 0.95)`, `rgba(30, 30, 35, 0.95)`],
    [`rgba(124, 58, 237, 0.15)`, `rgba(220, 38, 38, 0.15)`],
    [`rgba(124, 58, 237, 0.05)`, `rgba(0, 0, 0, 0.3)`],
    [`rgba(124, 58, 237, 0.12)`, `rgba(220, 38, 38, 0.12)`],
    [`var(--futuristic-purple)`, `#3b82f6`],
    [`rgba(124, 58, 237, 0.2)`, `rgba(220, 38, 38, 0.2)`],
    [`#ffffff`, `#111111`],
    [`rgba(239, 68, 68, 0.1)`, `rgba(220, 38, 38, 0.1)`],
    [`background: 'rgba(255, 255, 255, 0.75)'`, `background: 'rgba(24, 24, 27, 0.75)'`],
    [`background: '#ffffff'`, `background: '#111111'`],
    [`rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2), rgba(124, 58, 237, 0.2), rgba(59, 130, 246, 0.2)`, `#ef4444, #3b82f6, #ef4444`],
    [`linear-gradient(90deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(135deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(135deg, #ef4444, #3b82f6, #ef4444)`]
];

// 4. Replacements for DepartmentDetails.jsx
const deptReplacements = [
    [`linear-gradient(90deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(135deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(135deg, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(135deg, #ef4444, #f97316)`, `linear-gradient(135deg, #ef4444, #3b82f6)`],
    [`rgba(255, 255, 255, 0.8)`, `rgba(24, 24, 27, 0.8)`],
    [`rgba(255, 255, 255, 0.7)`, `rgba(24, 24, 27, 0.7)`],
    [`rgba(255, 255, 255, 0.6)`, `rgba(18, 18, 24, 0.65)`],
    [`rgba(255, 255, 255, 0.95)`, `rgba(30, 30, 35, 0.95)`],
    [`#ffffff`, `#111111`],
    [`rgba(124, 58, 237, 0.15)`, `rgba(220, 38, 38, 0.15)`],
    [`rgba(124, 58, 237, 0.1)`, `rgba(220, 38, 38, 0.1)`],
    [`rgba(124, 58, 237, 0.35)`, `rgba(220, 38, 38, 0.35)`],
    [`rgba(124, 58, 237, 0.05)`, `rgba(0, 0, 0, 0.3)`],
    [`rgba(124, 58, 237, 0.02)`, `rgba(0, 0, 0, 0.1)`],
    [`rgba(124, 58, 237, 0.2)`, `rgba(220, 38, 38, 0.2)`],
    [`rgba(59, 130, 246, 0.08)`, `rgba(59, 130, 246, 0.15)`],
    [`var(--futuristic-purple)`, `#3b82f6`],
    [`var(--secondary-blue)`, `#3b82f6`],
    [`border: '1px solid rgba(124, 58, 237, 0.15)'`, `border: '1px solid rgba(220, 38, 38, 0.15)'`],
    [`border: '1px solid rgba(124, 58, 237, 0.2)'`, `border: '1px solid rgba(220, 38, 38, 0.2)'`],
    [`border: '1px solid rgba(124, 58, 237, 0.1)'`, `border: '1px solid rgba(220, 38, 38, 0.1)'`],
    [`boxShadow: '0 10px 40px -10px rgba(124, 58, 237, 0.1)'`, `boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'`],
    [`boxShadow: '0 4px 20px rgba(124, 58, 237, 0.02)'`, `boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'`],
    [`boxShadow: '0 4px 25px rgba(0, 0, 0, 0.01)'`, `boxShadow: '0 4px 25px rgba(0, 0, 0, 0.3)'`],
    [`background: 'rgba(255, 255, 255, 0.8)'`, `background: 'rgba(24, 24, 27, 0.8)'`],
    [`background: 'rgba(255, 255, 255, 0.7)'`, `background: 'rgba(24, 24, 27, 0.7)'`],
    [`background: 'rgba(255, 255, 255, 0.6)'`, `background: 'rgba(18, 18, 24, 0.65)'`],
    [`background: '#ffffff'`, `background: '#111111'`],
    [`linear-gradient(135deg, #ef4444, #f97316)`, `linear-gradient(135deg, #ef4444, #3b82f6)`]
];

// 5. Replacements for Home.jsx
const homeReplacements = [
    [`linear-gradient(135deg, #ef4444, #f97316)`, `linear-gradient(135deg, #ef4444, #3b82f6)`],
    [`background: 'white'`, `background: '#111111'`],
    [`rgba(124, 58, 237, 0.15)`, `rgba(220, 38, 38, 0.15)`],
    [`rgba(124, 58, 237, 0.03)`, `rgba(0, 0, 0, 0.2)`],
    [`var(--futuristic-purple)`, `#3b82f6`],
    [`var(--secondary-blue)`, `#3b82f6`],
    [`background: 'rgba(124, 58, 237, 0.1)'`, `background: 'rgba(220, 38, 38, 0.15)'`],
    [`color: '#7c3aed'`, `color: '#ef4444'`], // Arts tag text color -> red
    [`'#7c3aed'`, `'#ef4444'`], // Arts tag text color
    [`rgba(255, 255, 255, 0.75)`, `rgba(24, 24, 27, 0.75)`],
    [`rgba(255, 255, 255, 0.8)`, `rgba(24, 24, 27, 0.8)`],
    [`rgba(255, 255, 255, 0.95)`, `rgba(30, 30, 35, 0.95)`],
    [`#ffffff`, `#111111`],
    [`linear-gradient(135deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(135deg, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(90deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)`]
];

// 6. Replacements for Gallery.jsx
const galleryReplacements = [
    [`rgba(255, 255, 255, 0.75)`, `rgba(24, 24, 27, 0.75)`],
    [`rgba(255, 255, 255, 0.8)`, `rgba(24, 24, 27, 0.8)`],
    [`rgba(255, 255, 255, 0.95)`, `rgba(30, 30, 35, 0.95)`],
    [`rgba(124, 58, 237, 0.15)`, `rgba(220, 38, 38, 0.15)`],
    [`rgba(124, 58, 237, 0.05)`, `rgba(0, 0, 0, 0.3)`],
    [`rgba(124, 58, 237, 0.04)`, `rgba(0, 0, 0, 0.2)`],
    [`rgba(124, 58, 237, 0.1)`, `rgba(220, 38, 38, 0.1)`],
    [`rgba(124, 58, 237, 0.03)`, `rgba(0, 0, 0, 0.2)`],
    [`linear-gradient(135deg, #3b82f6, #7c3aed)`, `linear-gradient(135deg, #ef4444, #3b82f6)`],
    [`rgba(255, 255, 255, 0.7)`, `rgba(18, 18, 24, 0.75)`],
    [`#3b82f6`, `#ef4444`], // filter hover color or overlay text
    [`color: '#3b82f6'`, `color: '#ef4444'`],
    [`#071b3b`, `#111111`]
];

// 7. Replacements for Guides.jsx
const guidesReplacements = [
    [`rgba(255, 255, 255, 0.75)`, `rgba(24, 24, 27, 0.75)`],
    [`rgba(255, 255, 255, 0.8)`, `rgba(24, 24, 27, 0.8)`],
    [`rgba(255, 255, 255, 0.95)`, `rgba(30, 30, 35, 0.95)`],
    [`#ffffff`, `#111111`],
    [`rgba(124, 58, 237, 0.15)`, `rgba(220, 38, 38, 0.15)`],
    [`rgba(124, 58, 237, 0.05)`, `rgba(0, 0, 0, 0.3)`],
    [`rgba(124, 58, 237, 0.08)`, `rgba(0, 0, 0, 0.3)`],
    [`rgba(124, 58, 237, 0.02)`, `rgba(0, 0, 0, 0.1)`],
    [`rgba(124, 58, 237, 0.1)`, `rgba(220, 38, 38, 0.1)`],
    [`rgba(124, 58, 237, 0.2)`, `rgba(220, 38, 38, 0.2)`],
    [`var(--futuristic-purple)`, `#3b82f6`],
    [`var(--secondary-blue)`, `#3b82f6`],
    [`#7c3aed`, `#ef4444`],
    [`linear-gradient(135deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(135deg, #ef4444, #3b82f6, #ef4444)`],
    [`linear-gradient(90deg, #ef4444, #f97316, #7c3aed, #3b82f6)`, `linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)`]
];

// Perform replacements
updateFile(mainCssPath, mainCssReplacements);
updateFile(homeCssPath, homeCssReplacements);
updateFile(servicesPath, servicesReplacements);
updateFile(deptPath, deptReplacements);
updateFile(homePath, homeReplacements);
updateFile(galleryPath, galleryReplacements);
updateFile(guidesPath, guidesReplacements);

console.log('All color replacements completed successfully!');
