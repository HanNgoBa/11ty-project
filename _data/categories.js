module.exports = async function () {
    try {
        const response = await fetch('http://headless-project.py-media.com/wp-json/wp/v2/categories');

        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

        const categories = await response.json();
        console.log(`DEBUG: Fetched ${categories.length} categories.`);
        return categories;
    } catch (error) {
        console.error("DEBUG: Error fetching categories:", error);

        // Fallback data for testing if API fails
        return [
            { name: 'Fallback Cat 1', slug: 'fallback-1', count: 1 },
            { name: 'Fallback Cat 2', slug: 'fallback-2', count: 1 }
        ];
    }
};
