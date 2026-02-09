const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Date filter
    eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
        return DateTime.fromISO(dateObj).toFormat(format);
    });
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
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
