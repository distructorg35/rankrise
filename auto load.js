// Zero-config auto-loader (put this in /js/auto-load.js)
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Auto-load articles
    try {
        const articles = await loadArticles();
        articles.forEach(file => {
            const title = formatTitle(file);
            addArticle(title, "Read more →", "General", `/articles/${file}`);
        });
    } catch (error) {
        addArticle("Breaking News", "New articles coming soon!", "Updates", "#");
    }

    // 2. Auto-link contact page
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) contactBtn.href = "contact.us.html";

    // Helper functions
    async function loadArticles() {
        const response = await fetch('/articles/?nocache=' + Date.now());
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return Array.from(doc.querySelectorAll('a[href$=".html"]'))
                   .map(link => link.href.split('/').pop())
                   .filter(name => !name.startsWith('.'));
    }

    function formatTitle(filename) {
        return filename
            .replace('.html', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
});
