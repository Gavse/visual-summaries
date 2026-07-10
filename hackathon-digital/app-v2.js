const projectsRoot = document.querySelector('.projects');

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

projectsRoot.innerHTML = window.PROJECTS.map(project => {
  const winnerClass = project.classes.includes('winner-1') ? ' winner-1' :
                      project.classes.includes('winner-2') ? ' winner-2' :
                      project.classes.includes('winner-3') ? ' winner-3' : '';
  const rank = project.rank ? `<span class="rank-badge ${esc(project.rankClass)}">${esc(project.rank)}</span>` : '';
  return `<article class="project-card${winnerClass}" id="${esc(project.id)}">
    <div class="card-head">
      <div class="title-row">
        <div class="project-index">${esc(project.index)}</div>
        <div class="title-wrap">
          <h2 class="project-title">${esc(project.title)}</h2>
          ${rank}
        </div>
      </div>
      <div class="summary-line">
        <p class="summary">${esc(project.summary)}</p>
        <button class="expand-btn" type="button" aria-expanded="false"><span>קראו עוד</span><span class="arrow">⌄</span></button>
      </div>
    </div>
    <div class="details-wrap"><div class="details-inner"><div class="details">
      <section class="section"><h3 class="section-title">הצורך</h3><p>${esc(project.need)}</p></section>
      <section class="section"><h3 class="section-title">איך המערכת עובדת</h3><p>${esc(project.how)}</p></section>
    </div></div></div>
  </article>`;
}).join('');

document.querySelectorAll('.project-card').forEach(card => {
  const button = card.querySelector('.expand-btn');
  button.addEventListener('click', () => {
    const open = !card.classList.contains('is-open');
    card.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('span:first-child').textContent = open ? 'סגירה' : 'קראו עוד';
  });
});
