/**
 * Central Data Loader for Techroxx
 * Uses Promise.all to fetch core JSON files concurrently and handles caching.
 */

let cachedData = null;

// Helper to convert standard Google Drive share links to direct raw image download links
const convertDriveUrl = (url) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (cleanUrl.includes('drive.google.com')) {
        const fileIdMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/) || 
                            cleanUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
        }
    }
    return cleanUrl;
};

// Custom robust CSV parser to map spreadsheet rows to structured objects
const parseCSVEvents = (text) => {
    const lines = text.split(/\r?\n/);
    if (lines.length === 0) return [];
    
    // Helper to parse a single CSV line respecting double quotes
    const parseLine = (line) => {
        const row = [];
        let inQuotes = false;
        let cell = '';
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                row.push(cell.trim());
                cell = '';
            } else {
                cell += char;
            }
        }
        row.push(cell.trim());
        return row;
    };

    const headers = parseLine(lines[0]);
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const rowValues = parseLine(line);
        const rowObject = {};
        headers.forEach((header, index) => {
            rowObject[header] = rowValues[index] || '';
        });
        result.push(rowObject);
    }

    // Map columns dynamically to support fallback values for missing details
    return result.map((row, index) => {
        const title = row['Event Name'] || row['title'] || '';
        const slug = row['slug'] || row['Slug'] || title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        
        const parseList = (val) => {
            if (!val) return [];
            const sep = val.includes(';') ? ';' : ',';
            return val.split(sep).map(x => x.replace(/^["']|["']$/g, '').trim()).filter(Boolean);
        };

        let status = (row['Status'] || row['status'] || 'upcoming').toLowerCase();
        if (status === 'planned' || status === 'confirmed') status = 'upcoming';

        const rawImage = row['Image'] || row['image'] || row['Image Link'] || row['imageLink'] || row['Image URL'] || row['imageURL'] || '';
        let image = convertDriveUrl(rawImage);
        if (!image) {
            const cat = (row['Category'] || row['category'] || '').toLowerCase();
            if (cat.includes('hackathon')) {
                image = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop';
            } else if (cat.includes('workshop')) {
                image = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop';
            } else {
                image = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop';
            }
        }

        return {
            id: index + 1,
            eventId: row['Event ID'] || row['eventId'] || `EVT-${index + 1}`,
            department: row['department'] || row['Department'] || 'cse',
            title: title,
            slug: slug,
            description: row['Description'] || row['description'] || '',
            date: row['Start Date'] || row['date'] || '',
            endDate: row['End Date'] || '',
            category: row['Category'] || row['category'] || 'Workshop',
            image: image,
            status: status,
            priority: parseInt(row['priority'] || row['Priority'] || '1') || 1,
            venue: row['Location'] || row['venue'] || row['Venue'] || 'Online',
            mode: (row['mode'] || row['Mode'] || (row['Location']?.toLowerCase() === 'online' ? 'online' : 'offline')).toLowerCase(),
            registrationLink: row['registrationLink'] || row['Registration Link'] || '/contact',
            organizer: row['Organizer'] || row['organizer'] || 'Techroxx',
            sponsors: parseList(row['Sponsors'] || row['sponsors']),
            partners: parseList(row['Partners'] || row['partners']),
            outcomes: parseList(row['Outcomes'] || row['outcomes']),
            contactEmail: row['Contact Email'] || ''
        };
    });
};

export const loadGlobalData = async () => {
    if (cachedData) {
        return cachedData;
    }

    try {
        const [departments, domains, events, eventGallery, eventTestimonials, eventMetrics] = await Promise.all([
            fetch('/data/departments.json').then(res => {
                if (!res.ok) throw new Error('Failed to load departments');
                return res.json();
            }),
            fetch('/data/domains.json').then(res => {
                if (!res.ok) throw new Error('Failed to load domains');
                return res.json();
            }),
            fetch('https://docs.google.com/spreadsheets/d/1S0zwIgpoJ79gN9OZNV5Kw20YnVxFMgWyHw4HCNG4pME/export?format=csv')
                .then(async res => {
                    if (!res.ok) throw new Error('Failed to load Google Sheet');
                    const csvText = await res.text();
                    return parseCSVEvents(csvText);
                })
                .catch(err => {
                    console.warn("Failed to load live Google Sheets events, falling back to local events.json:", err);
                    return fetch('/data/events.json').then(res => {
                        if (!res.ok) throw new Error('Failed to load fallback events');
                        return res.json();
                    });
                }),
            fetch('/data/event-gallery.json').then(res => {
                if (!res.ok) return [];
                return res.json();
            }).catch(() => []),
            fetch('/data/event-testimonials.json').then(res => {
                if (!res.ok) return [];
                return res.json();
            }).catch(() => []),
            fetch('/data/event-metrics.json').then(res => {
                if (!res.ok) return {};
                return res.json();
            }).catch(() => ({}))
        ]);

        cachedData = { departments, domains, events, eventGallery, eventTestimonials, eventMetrics };
        return cachedData;
    } catch (error) {
        console.error('Error fetching global datasets:', error);
        throw error;
    }
};

export const clearDataLoaderCache = () => {
    cachedData = null;
};
