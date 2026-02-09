// Fetch posts from WordPress API
async function fetchPosts() {
    const url = 'http://headless-project.py-media.com/wp-json/wp/v2/posts?_embed&per_page=12';

    try {
        const response = await fetch(url);
        const posts = await response.json();
        console.log('Fetched posts:', posts);
        renderPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        document.querySelector('.posts-grid').innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

// Render posts to the grid
function renderPosts(posts) {
    const postsGrid = document.querySelector('.posts-grid');

    if (!posts || posts.length === 0) {
        postsGrid.innerHTML = '<p>No posts found.</p>';
        return;
    }

    postsGrid.innerHTML = posts.map(post => {
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400';
        const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || '';
        const author = post._embedded?.author?.[0]?.name || 'Unknown';
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return `
            <article class="post-card">
                <div class="post-image">
                    <img src="${featuredImage}" alt="${post.title.rendered}">
                    ${category ? `<span class="category-badge">${category}</span>` : ''}
                </div>
                <div class="post-content">
                    <h3><a href="/post/${post.slug}/">${post.title.rendered}</a></h3>
                    <div class="excerpt">
                        ${post.excerpt.rendered}
                    </div>
                    <div class="meta">
                        <span class="author">by <strong>${author}</strong></span>
                        <span class="date">${date}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});


