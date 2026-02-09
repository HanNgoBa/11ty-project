const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async function () {
    console.log("Fetching posts from WordPress API...");
    try {
        const response = await fetch('http://headless-project.py-media.com/wp-json/wp/v2/posts?_embed&per_page=12');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        console.log(`Fetched ${posts.length} posts.`);
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};
