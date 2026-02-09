module.exports = async function() {
    try {
        // Lấy danh sách bài viết (mặc định 10 bài, bạn có thể thêm per_page=100)
        const url = 'http://headless-project.py-media.com/wp-json/wp/v2/posts?_embed';
        const response = await fetch(url);
        const posts = await response.json();
        
        console.log(`DEBUG: Đã fetch ${posts.length} bài viết.`);
        return posts;
    } catch (error) {
        console.error("Lỗi fetch posts:", error);
        return [];
    }
};