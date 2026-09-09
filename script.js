/**
 * HUB 0.2 // UTILITARIAN TECH
 * Clean client script: zero default HTML, no fluff, no fake telemetry.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      desc: '10-year interactive decoupling analysis of GDP from carbon intensity across 50+ electricity grids. Zero-build vanilla JS + D3.',
      links: [
        { label: 'demo', url: 'energy-and-gdp/' },
        { label: 'code', url: 'https://github.com/joe/energy-and-gdp' }
      ]
    },
    {
      id: 'stock-picker',
      title: 'quant equities & spike predictor',
      desc: 'Systematic momentum and volatility spike forecasting validated on historical WRDS feeds with automated analytical leaderboards.',
      links: [
        { label: 'code', url: 'https://github.com/joe/stock_picker_game' }
      ]
    },
    {
      id: 'renewables-costing',
      title: 'renewable storage valuation (psh)',
      desc: '50-year capital budgeting & LCOE model comparing micro pumped storage hydro vs battery storage. Python + LaTeX.',
      links: [
        { label: 'code', url: 'https://github.com/joe/renewables_costing' }
      ]
    },
    {
      id: 'data-extraction',
      title: 'corporate sustainability (esrs) nlp',
      desc: 'Document AI pipeline harvesting physical metrics and units from 200+ page corporate filings for CSRD compliance. Streamlit + PyMuPDF.',
      links: [
        { label: 'code', url: 'https://github.com/joe/data_extractionv2' }
      ]
    }
  ];

  const CV_TEXT = `joe
quantitative analytics + systems
contact@example.com · github.com/joe

focus
quantitative equities, empirical finance, energy project finance,
document ai & unstructured nlp, zero-overhead analytical software.

projects
01. global energy & gdp observatory (2014-2024)
    vanilla js, d3.js, maplibre gl. client-side zero-build.
02. quant equities & spike predictor
    r (dplyr, data.table, zoo), python, wrds historical feeds.
03. renewable storage valuation (50-year psh model)
    python (numpy-financial), dcf / lcoe, latex publication.
04. corporate sustainability (esrs) document ai
    python, pymupdf, quantulum3, streamlit.

stack
python, r, javascript, swift, sql, c.
`;

  function mount() {
    const container = document.createElement('div');
    container.className = 'hub-container';

    container.innerHTML = `
      <header class="masthead">
        <div class="identity">
          <h1 class="name">joe</h1>
          <div class="discipline">quantitative analytics + systems</div>
        </div>
        <nav class="nav">
          <a href="https://github.com" target="_blank" rel="noopener" class="btn">github</a>
          <button id="btn-cv" class="btn">cv</button>
          <a href="mailto:contact@example.com" class="btn">contact</a>
          <button id="btn-theme" class="btn">dark</button>
        </nav>
      </header>

      <main class="projects">
        ${PROJECTS.map(p => `
          <article class="project-item" id="${p.id}">
            <div class="project-header">
              <h2 class="project-title">${p.title}</h2>
              <div class="project-actions">
                ${p.links.map(l => `<a href="${l.url}" class="btn" target="_blank" rel="noopener">${l.label}</a>`).join('')}
              </div>
            </div>
            <p class="project-desc">${p.desc}</p>
          </article>
        `).join('')}
      </main>

      <footer class="footer">
        <div class="footer-left">
          <span>joe</span>
          <span>·</span>
          <span>quantitative analytics + systems</span>
        </div>
        <div class="footer-right">
          <a href="mailto:contact@example.com">contact@example.com</a>
        </div>
      </footer>

      <div id="cv-modal" class="modal hidden" role="dialog" aria-modal="true">
        <div class="modal-dialog">
          <div class="modal-bar">
            <span>curriculum vitae</span>
            <div class="modal-actions">
              <button id="btn-copy-cv" class="btn">copy</button>
              <button id="btn-close-cv" class="btn">close</button>
            </div>
          </div>
          <div class="modal-body">
            <pre class="cv-pre" id="cv-content">${CV_TEXT}</pre>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    bindEvents();
  }

  function bindEvents() {
    // Theme toggle
    const themeBtn = document.getElementById('btn-theme');
    const savedTheme = localStorage.getItem('hub_theme');
    
    function applyTheme(isDark) {
      if (isDark) {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = 'light';
        localStorage.setItem('hub_theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.textContent = 'dark';
        localStorage.setItem('hub_theme', 'light');
      }
    }

    applyTheme(savedTheme === 'dark');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(!isDark);
      });
    }

    // CV Modal
    const modal = document.getElementById('cv-modal');
    const openCvBtn = document.getElementById('btn-cv');
    const closeCvBtn = document.getElementById('btn-close-cv');
    const copyCvBtn = document.getElementById('btn-copy-cv');

    function openModal() {
      if (modal) modal.classList.remove('hidden');
    }

    function closeModal() {
      if (modal) modal.classList.add('hidden');
    }

    if (openCvBtn) openCvBtn.addEventListener('click', openModal);
    if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (copyCvBtn) {
      copyCvBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(CV_TEXT).then(() => {
            copyCvBtn.textContent = 'copied';
            setTimeout(() => { copyCvBtn.textContent = 'copy'; }, 1500);
          });
        }
      });
    }

    // Keyboard shortcuts: ESC to close modal, T to toggle theme, C for CV
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 't' || e.key === 'T') {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(!isDark);
      }
      if (e.key === 'c' || e.key === 'C') {
        if (modal && modal.classList.contains('hidden')) {
          openModal();
        } else {
          closeModal();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
