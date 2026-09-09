/**
 * HUB 0.2 // DEMO SHOWCASE
 * Client script: showcases project demos and repositories.
 * Pure typography, zero CV/contact clutter, zero dependencies.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      desc: 'data visualisation of global energy production and GDP, including carbon intensity and decoupling.',
      links: [
        { label: 'demo', url: 'energy-and-gdp/' },
        { label: 'code', url: 'https://github.com/joe/energy-and-gdp' }
      ]
    },
    {
      id: 'stock-picker',
      title: 'quant equities & spike predictor',
      desc: 'momentum and volatility spike forecasting using historical WRDS feeds with analytical leaderboards.',
      links: [
        { label: 'code', url: 'https://github.com/joe/stock_picker_game' }
      ]
    },
    {
      id: 'renewables-costing',
      title: 'renewable storage valuation (psh)',
      desc: 'capital budgeting & LCOE model comparing micro pumped storage hydro vs battery storage.',
      links: [
        { label: 'code', url: 'https://github.com/joe/renewables_costing' }
      ]
    },
    {
      id: 'data-extraction',
      title: 'corporate sustainability (esrs) nlp',
      desc: 'document AI pipeline extracting physical metrics and units from corporate filings for CSRD compliance.',
      links: [
        { label: 'code', url: 'https://github.com/joe/data_extractionv2' }
      ]
    }
  ];

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
          <span>projects &amp; demos</span>
        </div>
        <div class="footer-right">
          <a href="https://github.com" target="_blank" rel="noopener">github.com</a>
        </div>
      </footer>
    `;

    document.body.appendChild(container);
    bindEvents();
  }

  function bindEvents() {
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

    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(!isDark);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
