document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('posts');
  if (!container) return;

  const inlineDataElement = document.getElementById('post-data');
  let inlinePosts = null;

  if (inlineDataElement) {
    try {
      inlinePosts = JSON.parse(inlineDataElement.textContent.trim() || '[]');
    } catch (error) {
      console.warn('Inline post data could not be parsed.', error);
    }
  }

  const renderPosts = (posts) => {
    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<p class="loading">No posts available yet. Check back soon!</p>';
      return;
    }

    container.innerHTML = '';

    posts.forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <img class="thumb" src="${post.thumbnail}" alt="${post.title}">
        <div class="post-info">
          <h2><a href="${post.link}">${post.title}</a></h2>
          <div class="date">${post.date}</div>
          <p>${post.summary}</p>
        </div>
      `;
      container.appendChild(card);
    });
  };

  const showLoading = () => {
    container.innerHTML = '<p class="loading">Loading posts…</p>';
  };

  const showError = () => {
    container.innerHTML = '<p class="error">Could not load posts. Please try again later.</p>';
  };

  const tryInlinePosts = () => {
    if (Array.isArray(inlinePosts) && inlinePosts.length > 0) {
      renderPosts(inlinePosts);
      return true;
    }
    return false;
  };

  const hasInline = tryInlinePosts();

  if (hasInline) {
    // Inline posts are already rendered, no need to fetch.
    return;
  }

  showLoading();

  // If the page is opened directly from the file system, browsers block fetch and there is no inline data.
  if (window.location.protocol === 'file:') {
    showError();
    return;
  }

  const postsUrl = new URL('posts.json', document.baseURI).toString();

  fetch(postsUrl, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((posts) => {
      renderPosts(posts);
    })
    .catch((err) => {
      console.error('Failed to load posts.json', err);
      if (!tryInlinePosts()) {
        showError();
      }
    });
});
