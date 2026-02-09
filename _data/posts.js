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