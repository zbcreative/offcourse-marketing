import path from "path";

function dirnameFromPageUrl(pageUrl) {
  let clean = String(pageUrl || "/").replace(/^\/+/, "");
  clean = clean.replace(/\/index\.html$/i, "").replace(/\/$/, "");
  if (!clean) return ".";
  return clean;
}

function toSiteFilePath(targetPath) {
  const clean = String(targetPath || "/").trim();
  const noLead = clean.replace(/^\/+/, "").replace(/\/$/, "");
  if (!noLead) return "index.html";
  if (/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(noLead)) {
    return noLead;
  }
  if (noLead.startsWith("assets/")) {
    return noLead;
  }
  return `${noLead}/index.html`.replace(/\/+/g, "/");
}

function relativePathFromPage(pageUrl, targetPath) {
  const fromDir = dirnameFromPageUrl(pageUrl);
  const toFile = toSiteFilePath(targetPath);
  let rel = path.posix.relative(fromDir, toFile).replace(/\\/g, "/");
  if (rel === "") rel = ".";
  return rel;
}

function pageUrlFromOutputPath(outputPath, siteRoot) {
  const rel = path.relative(siteRoot, outputPath).replace(/\\/g, "/");
  const dir = path.posix.dirname(rel);
  if (dir === ".") return "/";
  return "/" + dir + "/";
}

export default function (eleventyConfig) {
  /** Must match dir.output below (used by relative-hrefs transform). */
  const siteRoot = path.resolve(process.cwd(), "docs");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("jsonScript", (obj) =>
    JSON.stringify(obj).replace(/</g, "\\u003c")
  );

  eleventyConfig.addFilter("readingTimeMinutes", (html) => {
    const text = String(html).replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("postDate", (dateObj) =>
    new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("dateIso", (dateObj) =>
    new Date(dateObj).toISOString()
  );

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().slice(0, 10)
  );

  /** Root-absolute hrefs break on file:// and non-root deploys; rewrite after templates. */
  eleventyConfig.addTransform("relative-hrefs", function (htmlContent, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return htmlContent;
    const pageUrl = pageUrlFromOutputPath(outputPath, siteRoot);
    return htmlContent.replace(
      /href="(\/[^"#?]*)([#?][^"]*)?"/g,
      (full, pathPart, hash) => {
        if (pathPart.startsWith("//")) return full;
        const rel = relativePathFromPage(pageUrl, pathPart);
        return `href="${rel}${hash || ""}"`;
      }
    );
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "docs",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
