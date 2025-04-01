(async function() {
    const repo = "rankrise.site"; // Replace this!
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/articles`);
    const files = await response.json();

    files.forEach(file => {
        if (file.name.endsWith('.html')) {
            const title = file.name.replace('.html', '').replace(/-/g, ' ');
            addArticle(title, "Read more...", "General", file.path);
        }
    });
})();
