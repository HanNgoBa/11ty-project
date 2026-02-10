module.exports = async function () {
    const query = `{
        categories {
            nodes {
                name
                slug
                uri
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
        const categories = result.data.categories.nodes;

        console.log(`DEBUG: Đã lấy ${categories.length} categories.`);
        return categories;
    } catch (error) {
        console.error("Lỗi rồi:", error);
        return [{ name: 'Fallback', slug: 'fallback' }];
    }
};