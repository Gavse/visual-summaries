const root = document.getElementById('projects');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[ch]);
}

fetch('projects.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load project data');
    return response.json();
  })
  .then(projects => {
    projects.forEach((p, index) => {
      const article = document.createElement('article');
      article.className = `project ${p.rank ? `winner-${index + 1}` : ''}`;

      const rank = p.rank
        ? `<span class="rank">${escapeHtml(p.rank)}</span>`
        : '';

      article.innerHTML = `
        <div class="project-heading">
          <div class="project-number">${index + 1}</div>
          <div class="heading-copy">
            <h2><bdi>${escapeHtml(p.title)}</bdi></h2>
            ${rank}
          </div>
        </div>

        <details>
          <summary class="summary-row">
            <span class="summary">${escapeHtml(p.summary)}</span>
            <span class="read-more">קראו עוד</span>
          </summary>
          <div class="details-body">
            <section class="details-section">
              <h3>הצורך</h3>
              <p>${escapeHtml(p.need)}</p>
            </section>
            <section class="details-section">
              <h3>איך המערכת עובדת</h3>
              <p>${escapeHtml(p.how)}</p>
            </section>
          </div>
        </details>
      `;
      root.appendChild(article);
    });
  })
  .catch(error => {
    root.innerHTML = '<p class="load-error">לא ניתן לטעון את תוכן העמוד.</p>';
    console.error(error);
  });
