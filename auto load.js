// Auto-load articles from the /articles/ folder
(async function() {
    try {
        // Fetch list of articles from GitHub
        const repo = "rankrise.site"; // REPLACE THIS
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/articles`);
        const files = await response.json();

        // Process each HTML file
        for (const file of files) {
            if (file.name.endsWith('.html')) {
                // Get clean title (e.g., "lahore-history.html" → "Lahore History")
                const title = file.name
                    .replace('.html', '')
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());

                // Fetch article content to extract preview
                const articleResponse = await fetch(file.download_url);
                const articleHTML = await articleResponse.text();
                
                // Extract first paragraph as preview
                const parser = new DOMParser();
                const doc = parser.parseFromString(articleHTML, 'text/html');
                const firstParagraph = doc.querySelector('p')?.textContent || "Read more...";

                // Add to homepage
                addArticle(title, firstParagraph, "General", file.path);
            }
        }
    } catch (error) {
        console.error("Failed to load articles:", error);
    }
})();
