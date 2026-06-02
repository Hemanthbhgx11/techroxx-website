/**
 * Central Data Loader for Techroxx
 * Uses Promise.all to fetch core JSON files concurrently and handles caching.
 */

let cachedData = null;

export const loadGlobalData = async () => {
    if (cachedData) {
        return cachedData;
    }

    try {
        const [departments, domains, events] = await Promise.all([
            fetch('/data/departments.json').then(res => {
                if (!res.ok) throw new Error('Failed to load departments');
                return res.json();
            }),
            fetch('/data/domains.json').then(res => {
                if (!res.ok) throw new Error('Failed to load domains');
                return res.json();
            }),
            fetch('/data/events.json').then(res => {
                if (!res.ok) throw new Error('Failed to load events');
                return res.json();
            })
        ]);

        cachedData = { departments, domains, events };
        return cachedData;
    } catch (error) {
        console.error('Error fetching global datasets:', error);
        throw error;
    }
};

export const clearDataLoaderCache = () => {
    cachedData = null;
};
