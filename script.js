/**
 * HUB 0.2 // DEMO SHOWCASE
 * Client script: showcases project demos with collapsible glassmorphic tiles,
 * dual light/dark preview screenshots, and a static technical dot matrix background.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      desc: 'data visualisation of global energy production and GDP, including carbon intensity and decoupling.',
      imageLight: 'assets/energy-and-gdp-preview.png',
      imageDark: 'assets/energy-and-gdp-preview-dark.png',
      links: [
        { label: 'demo', url: 'energy-and-gdp/' },
        { label: 'code', url: 'https://github.com/joehamper/energy-and-gdp' }
      ]
    },
    {
      id: 'stock-picker',
      title: 'quant equities & spike predictor',
      desc: 'momentum and volatility spike forecasting using historical WRDS feeds with analytical leaderboards.',
      links: [
        { label: 'code', url: 'https://github.com/joehamper/stock_picker_game' }
      ]
    },
    {
      id: 'renewables-costing',
      title: 'renewable storage valuation (psh)',
      desc: 'capital budgeting & LCOE model comparing micro pumped storage hydro vs battery storage.',
      links: [
        { label: 'code', url: 'https://github.com/joehamper/renewables_costing' }
      ]
    },
    {
      id: 'data-extraction',
      title: 'corporate sustainability (esrs) nlp',
      desc: 'document AI pipeline extracting physical metrics and units from corporate filings for CSRD compliance.',
      links: [
        { label: 'code', url: 'https://github.com/joehamper/data_extractionv2' }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // DOM MOUNTING
  // --------------------------------------------------------------------------
  function mount() {
    // 1. Static Dot Matrix Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.appendChild(canvas);

    // 2. Foreground Glass Container
    const container = document.createElement('div');
    container.className = 'hub-container';

    container.innerHTML = `
      <header class="masthead">
        <div class="identity">
          <h1 class="name">joseph hamper</h1>
          <div class="discipline">quantitative analytics + systems</div>
        </div>
        <nav class="nav">
          <button id="btn-toggle-all" class="btn btn-toggle">+ expand all</button>
          <a href="https://github.com/joehamper" target="_blank" rel="noopener" class="btn">github</a>
          <button id="btn-theme" class="btn">dark</button>
        </nav>
      </header>

      <main class="projects">
        ${PROJECTS.map(p => `
          <article class="project-item" id="${p.id}">
            <div class="project-header" tabindex="0" role="button" aria-expanded="false">
              <div class="header-left">
                <span class="toggle-indicator">+</span>
                <h2 class="project-title">${p.title}</h2>
              </div>
              <div class="project-actions">
                ${p.links.map(l => `<a href="${l.url}" class="btn" target="_blank" rel="noopener" onclick="event.stopPropagation()">${l.label}</a>`).join('')}
              </div>
            </div>
            <div class="project-body">
              <p class="project-desc">${p.desc}</p>
              ${(p.imageLight && p.imageDark) ? `
                <div class="project-preview">
                  <a href="${p.links[0].url}" target="_blank" rel="noopener" class="preview-link" title="Open ${p.title} Demo">
                    <img src="${p.imageLight}" alt="${p.title} light preview" class="preview-img img-light">
                    <img src="${p.imageDark}" alt="${p.title} dark preview" class="preview-img img-dark">
                  </a>
                </div>
              ` : ''}
            </div>
          </article>
        `).join('')}
      </main>

      <footer class="footer">
        <div class="footer-left">
          <span>quantitative analytics + systems</span>
        </div>
        <div class="footer-right">
          <a href="https://github.com/joehamper" target="_blank" rel="noopener">github.com/joehamper</a>
        </div>
      </footer>
    `;

    document.body.appendChild(container);

    bindEvents();
    initStaticDotGrid(canvas);
  }

  // --------------------------------------------------------------------------
  // EVENT BINDINGS (COLLAPSIBLE SECTIONS & THEME)
  // --------------------------------------------------------------------------
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
      // Re-render static dot matrix for theme color
      const canvas = document.getElementById('bg-canvas');
      if (canvas && canvas._renderGrid) canvas._renderGrid();
    }

    applyTheme(savedTheme === 'dark');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(!isDark);
      });
    }

    // Individual collapsible project tiles (collapsed by default)
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
      const header = item.querySelector('.project-header');
      const indicator = item.querySelector('.toggle-indicator');

      function toggle() {
        const isExp = item.classList.toggle('expanded');
        if (indicator) indicator.textContent = isExp ? '−' : '+';
        if (header) header.setAttribute('aria-expanded', isExp ? 'true' : 'false');
        updateGlobalToggleLabel();
      }

      if (header) {
        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        });
      }
    });

    // Global [+ expand all] / [- collapse all] button
    const toggleAllBtn = document.getElementById('btn-toggle-all');
    function updateGlobalToggleLabel() {
      if (!toggleAllBtn) return;
      const anyCollapsed = Array.from(projectItems).some(item => !item.classList.contains('expanded'));
      toggleAllBtn.textContent = anyCollapsed ? '+ expand all' : '− collapse all';
    }

    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const anyCollapsed = Array.from(projectItems).some(item => !item.classList.contains('expanded'));
        projectItems.forEach(item => {
          const indicator = item.querySelector('.toggle-indicator');
          const header = item.querySelector('.project-header');
          if (anyCollapsed) {
            item.classList.add('expanded');
            if (indicator) indicator.textContent = '−';
            if (header) header.setAttribute('aria-expanded', 'true');
          } else {
            item.classList.remove('expanded');
            if (indicator) indicator.textContent = '+';
            if (header) header.setAttribute('aria-expanded', 'false');
          }
        });
        updateGlobalToggleLabel();
      });
    }

    // Keyboard shortcut [T] for theme
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(!isDark);
      }
    });
  }

  // --------------------------------------------------------------------------
  // STATIC TECHNICAL DOT MATRIX BACKGROUND (NO PARALLAX, 0% CPU IDLE)
  // --------------------------------------------------------------------------
  function initStaticDotGrid(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_SIZE = 32;
    const MAJOR_MULT = 4;

    function renderGrid() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.body.classList.contains('dark-mode');
      const dotColor = isDark ? 'rgba(240, 240, 240, 0.22)' : 'rgba(0, 0, 0, 0.22)';
      const crossColor = isDark ? 'rgba(240, 240, 240, 0.38)' : 'rgba(0, 0, 0, 0.38)';

      for (let x = 0; x <= width; x += GRID_SIZE) {
        for (let y = 0; y <= height; y += GRID_SIZE) {
          const gridCol = Math.round(x / GRID_SIZE);
          const gridRow = Math.round(y / GRID_SIZE);

          const isMajor = (gridCol % MAJOR_MULT === 0) && (gridRow % MAJOR_MULT === 0);

          if (isMajor) {
            // Coordinate crosshair '+'
            ctx.strokeStyle = crossColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          } else {
            // Technical dot
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(x, y, 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();
    }

    canvas._renderGrid = renderGrid;
    window.addEventListener('resize', renderGrid);
    renderGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
