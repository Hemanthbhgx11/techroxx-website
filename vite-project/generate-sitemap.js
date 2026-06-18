import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://techroxx.in';

// Helper to convert names to slugs
const toSlug = (name) => {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

const generateSitemap = async () => {
    const urls = [
        { loc: '/', changefreq: 'daily', priority: '1.0' },
        { loc: '/about', changefreq: 'weekly', priority: '0.8' },
        { loc: '/services', changefreq: 'weekly', priority: '0.9' },
        { loc: '/services/job-roles', changefreq: 'monthly', priority: '0.7' },
        { loc: '/services/job-architect', changefreq: 'monthly', priority: '0.7' },
        { loc: '/learn', changefreq: 'daily', priority: '0.8' },
        { loc: '/learn/placement-guide', changefreq: 'weekly', priority: '0.8' },
        { loc: '/careers', changefreq: 'daily', priority: '0.8' },
        { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
        { loc: '/gallery', changefreq: 'weekly', priority: '0.7' },
        { loc: '/events', changefreq: 'daily', priority: '0.9' }
    ];

    // 1. Add Department Pages
    try {
        const deptsPath = path.join(__dirname, 'public', 'data', 'departments.json');
        if (fs.existsSync(deptsPath)) {
            const depts = JSON.parse(fs.readFileSync(deptsPath, 'utf8'));
            depts.forEach(dept => {
                if (dept.slug) {
                    urls.push({ loc: `/services/${dept.slug}`, changefreq: 'weekly', priority: '0.8' });
                }
            });
        }
    } catch (e) {
        console.error('Error parsing departments for sitemap:', e);
    }

    // 2. Add Event Pages
    try {
        const eventsPath = path.join(__dirname, 'public', 'data', 'events.json');
        if (fs.existsSync(eventsPath)) {
            const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
            events.forEach(evt => {
                if (evt.slug) {
                    urls.push({ loc: `/events/${evt.slug}`, changefreq: 'weekly', priority: '0.8' });
                }
            });
        }
    } catch (e) {
        console.error('Error parsing events for sitemap:', e);
    }

    // 3. Add Team Members / Careers profile Pages
    let internIds = [];
    
    // Attempt Google Sheets fetch for live intern profiles
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
                if (rawData?.table?.rows && rawData?.table?.cols) {
                    const cols = rawData.table.cols;
                    const rows = rawData.table.rows;
                    
                    // find internId column index
                    const internIdIdx = cols.findIndex(c => c.label === 'internId' || c.label === 'Intern ID' || c.id === 'B' || c.label === 'empId');
                    if (internIdIdx !== -1) {
                        rows.forEach(row => {
                            if (row.c && row.c[internIdIdx] && row.c[internIdIdx].v) {
                                const id = String(row.c[internIdIdx].v).trim();
                                if (id && !internIds.includes(id)) {
                                    internIds.push(id);
                                }
                            }
                        });
                    }
                }
            }
        }
    } catch (e) {
        console.warn('Network issue fetching live interns for sitemap, falling back to local list:', e.message);
    }

    // Fallback/Local parse from team.json
    try {
        const teamPath = path.join(__dirname, 'public', 'data', 'team.json');
        if (fs.existsSync(teamPath)) {
            const team = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
            team.forEach(member => {
                // Add team members
                if (member.name) {
                    urls.push({ loc: `/team/${toSlug(member.name)}`, changefreq: 'monthly', priority: '0.5' });
                }
                // Check if they are intern
                if (member.isIntern && member.empId) {
                    if (!internIds.includes(member.empId)) {
                        internIds.push(member.empId);
                    }
                }
            });
        }
    } catch (e) {
        console.error('Error parsing team.json for sitemap:', e);
    }

    // Add collected intern career profiles
    internIds.forEach(id => {
        urls.push({ loc: `/careers/${id}`, changefreq: 'weekly', priority: '0.6' });
    });

    // Write XML sitemap
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const xmlFooter = `\n</urlset>`;
    
    const xmlBody = urls.map(url => {
        return `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    }).join('\n');

    const sitemapContent = `${xmlHeader}\n${xmlBody}${xmlFooter}`;
    
    const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemapContent, 'utf8');
    console.log(`Sitemap successfully written to ${outputPath} with ${urls.length} URLs.`);
};

generateSitemap();
