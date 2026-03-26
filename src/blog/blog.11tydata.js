export default {
  layout: "layouts/post.njk",
  tags: "posts",
  eleventyComputed: {
    permalink(data) {
      return `/blog/${data.page.fileSlug}/index.html`;
    },
    canonicalUrl(data) {
      return `${data.metadata.siteUrl}/blog/${data.page.fileSlug}/`;
    },
    ogTitle(data) {
      return data.title;
    },
    ogDescription(data) {
      return data.description;
    },
    ogType: "article",
  },
};
