# Court to Clinic Website

## Adding a New Blog Post

1. **Create the article page.**
   - Duplicate one of the existing files in the `posts/` directory (for example, copy `posts/post1.html`).
   - Rename the copy to match your new post, such as `posts/post4.html`.
   - Open the new file and update the `<title>`, `<meta name="description">`, on-page heading, byline, and article content with your new story. Keep the "Back to Home" link at the top so readers can return to the homepage easily.
2. **Add a thumbnail image (optional but recommended).**
   - Place a new image in the `images/` folder and note its filename. Square or landscape images around 1200 × 800 work well with the existing layout.
3. **Link the post from the homepage.**
   - Open `index.html` and add a new `<article class="post-card">` block inside the `.post-list` section. You can copy an existing block and update:
     - the `<img>` `src` attribute so it points to your new thumbnail in `images/`
     - the `<a href>` attribute so it points to your new post HTML file
     - the visible title, date, and summary text.
4. **(Optional) Update `posts.json`.**
   - If you also want external tools to read your post list, add a matching entry to `posts.json` using the same title, excerpt, date, and link.
5. **Publish the changes.**
   - Commit the new HTML and any images, then push the updates to GitHub so GitHub Pages can rebuild the site.

That is all you need—once the new post card exists on `index.html`, visitors can click through to the new article page and read the full content.

## Updating SEO Settings

- The site now includes canonical URLs, Open Graph tags, Twitter cards, and structured data that point to `https://courttoclinic.com/`. If you publish the site to a different domain (like GitHub Pages), update the URLs in `index.html`, `about.html`, `contact.html`, and the files inside `posts/` so they match your live domain.
- After publishing, submit `https://courttoclinic.com/sitemap.xml` (or the equivalent for your domain) to Google Search Console and Bing Webmaster Tools so search engines discover new articles faster.
