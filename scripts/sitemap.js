import { SitemapStream, streamToPromise } from 'sitemap'
import {globby} from "globby";
import * as fs from "node:fs";
import path from "node:path";

// Helper function to turn PascalCase/camelCase into kebab-case-urls
const toKebabCase = (str) =>
    str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

async function createSitemap() {
    const sitemapEntries = [];

    // Static Pages
    const pages = await globby([
        'src/pages/**/*.jsx',
        'src/pages/**/*.tsx',
    ]);

    pages.forEach((filePath) => {
        // Avoid admin paths
        if (filePath.includes("admin")) return;

        // Avoid template pages
        if (filePath.includes("blog")) return;
        if (filePath.includes("project")) return;

        // 1. Get just the file name without extension (e.g., "Home" or "AboutUs")
        let fileName = path.basename(filePath, path.extname(filePath));

        console.log(filePath);

        if (fileName === "PageNotFound") fileName = "404"

        // 2. Format the name for a clean URL
        let cleanPath = toKebabCase(fileName);

        // 3. Convert home or index files directly to the root path
        if (cleanPath === 'home' || cleanPath === 'index') {
            cleanPath = '';
        }

        const url = `/${cleanPath}`;

        let priority = 0;
        switch(cleanPath) {
            case "":
                priority = 0.8;
                break;
            case "about":
                priority = 0.7;
                break;
            case "login" | "logout":
                priority = 0.1;
                break;
            default:
                priority = 0.7;
                break;
        }

        sitemapEntries.push({
            url: url,
            changefreq: 'weekly',
            priority: priority,
            category: "static"
        });
    });

    // API Pages

    // Posts
    try {
        const postsResponse = await fetch(process.env.VITE_API_BASE_URL + "/posts", {});

        const posts = await postsResponse.json();

        posts.forEach(post => {
            sitemapEntries.push({
                url: "/blog/" + post.slug,
                changefreq: 'weekly',
                priority: 0.5,
                category: "posts",
            });
        })
    } catch (error) {
        console.error(error);
    }

    // Projects
    try {
        const postsResponse = await fetch(process.env.VITE_API_BASE_URL + "/projects", {});

        const projects = await postsResponse.json();

        projects.forEach(project => {
            sitemapEntries.push({
                url: "/projects/" + project.slug,
                changefreq: 'weekly',
                priority: 0.5,
                category: "projects"
            });
        })
    } catch (error) {
        console.error(error);
    }

    sitemapEntries.sort((a, b) => {
        if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
        }
        // Sub-sorting: alphabetically organizes URLs within the same category
        return a.url.localeCompare(b.url);
    });

    const smStream = new SitemapStream({hostname: "https://christianmoloci.com"});

    sitemapEntries.forEach(entry => {
        // Strip out the internal tracking 'category' field before writing to XML
        const { category, ...cleanEntry } = entry;
        smStream.write(cleanEntry);
    });

    smStream.end()

    const sitemapOutput = await streamToPromise(smStream).then((data) => data.toString());
    fs.writeFileSync('./public/sitemap.xml', sitemapOutput);

    console.log('✅ sitemap.xml successfully generated in the public folder!');
}

await createSitemap();