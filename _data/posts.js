// module.exports = async function () {
//     console.log("Fetching posts from WordPress API...");
//     try {
//         // Node 18+ có sẵn fetch, không cần import node-fetch
//         const response = await fetch('http://headless-project.py-media.com/wp-json/wp/v2/posts?_embed&per_page=12');
//         if (!response.ok) {
//             throw new Error(`Failed to fetch: ${response.status}`);
//         }
//         const posts = await response.json();
//         return posts;
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         return [];
//     }
// };

module.exports = async function () {
    const query = `{
        posts {
            nodes {
            title
            slug
            date
            featuredImage {
                node {
                sourceUrl
                altText
                }
            }
            excerpt
            categories {
                nodes {
                categoryId
                slug
                name
                }
            }
            }
        }
    }`;
    try {
        const response = await fetch('http://headless-project.py-media.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const result = await response.json();
        // Trả về mảng nodes y hệt như mảng posts bên REST
        const posts = result.data.posts.nodes;

        console.log(`DEBUG: Đã lấy ${posts.length} posts.`);
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

}