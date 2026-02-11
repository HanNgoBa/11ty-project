const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw") {
    if (!src) return "";

    // Cấu hình việc lưu trữ
    let metadata = await Image(src, {
        widths: [800], // Ông có thể resize ảnh tại đây để tối ưu
        formats: ["webp", "jpeg"], // Tự động convert sang webp cho nhẹ
        urlPath: "/img/", // Đường dẫn trên web sau khi build
        outputDir: "./_site/img/", // Thư mục vật lý lưu ảnh
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };

    // Trả về HTML tag <img> với link đã được nội bộ hóa
    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
    // Date filter
    eleventyConfig.addFilter("postDate", (dateObj, format = "MMMM d, yyyy") => {
        return DateTime.fromISO(dateObj).toFormat(format);
    });
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    });

    eleventyConfig.addCollection("pagedPostsByCat", function (collectionApi) {
        // const posts = collectionApi.getAll()[0].data.posts;
        // const posts = collectionApi.getFilteredByTag("post");
        const allItems = collectionApi.getAll();
        const itemWithData = allItems.find(item => item?.data);
        const posts = itemWithData ? itemWithData.data?.posts : [];
        const pageSize = 2;
        let catMap = {};

        // 1. Group posts by category
        posts.forEach(post => {
            if (post.categories && post.categories.nodes) {
                post.categories.nodes.forEach(cat => {
                    if (!catMap[cat.slug]) {
                        catMap[cat.slug] = {
                            name: cat.name,
                            slug: cat.slug,
                            posts: []
                        };
                    }
                    catMap[cat.slug].posts.push(post);
                });
            }
        });

        // 2. Chunk posts within each category into pages
        let pagedCategories = [];
        Object.values(catMap).forEach(cat => {
            const totalPages = Math.ceil(cat.posts.length / pageSize);
            for (let i = 0; i < totalPages; i++) {
                pagedCategories.push({
                    name: cat.name,
                    slug: cat.slug,
                    posts: cat.posts.slice(i * pageSize, (i + 1) * pageSize),
                    pageNumber: i,
                    totalPages: totalPages
                });
            }
        });

        return pagedCategories;
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            data: "_data"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };

};


