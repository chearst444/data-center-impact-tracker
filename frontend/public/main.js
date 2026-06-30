/* ============================================================
   Main Page — Meeting Tracker filter + search
   Pure vanilla JS. No build step. Edit findings directly in
   index.html (data-category, data-text attributes).
   ============================================================ */

(function () {
  const tracker = document.querySelector('[data-testid="meeting-tracker"]');
  if (!tracker) return;

  const search = tracker.querySelector('[data-testid="tracker-search"]');
  const buttons = tracker.querySelectorAll('[data-testid^="filter-btn-"]');
  const findings = tracker.querySelectorAll('.finding');
  const empty = tracker.querySelector('[data-testid="no-results"]');

  let activeCategory = 'All';

  function applyFilter() {
    const q = (search.value || '').trim().toLowerCase();
    let shown = 0;
    findings.forEach((el) => {
      const cat = el.dataset.category;
      const text = (el.dataset.text || el.textContent).toLowerCase();
      const matchCat = activeCategory === 'All' || cat === activeCategory;
      const matchQuery = !q || text.includes(q);
      const show = matchCat && matchQuery;
      el.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    empty.style.display = shown === 0 ? '' : 'none';
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      applyFilter();
    });
  });

  search.addEventListener('input', applyFilter);

  // Initial state
  applyFilter();
})();
