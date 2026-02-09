module.exports = async function () {
    console.log("Fetching posts from WordPress API...");
    try {
        // Node 18+ có sẵn fetch, không cần import node-fetch
        const response = await fetch('http://headless-project.py-media.com/wp-json/wp/v2/posts?_embed&per_page=12');
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};