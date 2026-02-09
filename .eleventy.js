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

const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  
  // Đăng ký filter "postDate" để sửa lỗi "filter not found"
  eleventyConfig.addFilter("postDate", (dateObj) => {
    // Chuyển đổi ngày từ WordPress sang định dạng đẹp
    return DateTime.fromISO(dateObj).setLocale("vi").toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    },
    htmlTemplateEngine: "njk"
  };
};
