/**
 * HUB 0.2 // DEMO SHOWCASE
 * Client script: unified project ledger snapped to 32px grid,
 * year and stack metadata on collapsed tiles, and connected dot grid canvas.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      year: '2024',
      stack: 'vanilla js · d3.js · maplibre gl',
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
      year: '2023',
      stack: 'r · python · wrds feeds',
      desc: 'momentum and volatility spike forecasting using historical WRDS feeds with analytical leaderboards.',
      links: [
        { label: 'code', url: 'https://github.com/joehamper/stock_picker_game' }
      ]
    },
    {
      id: 'renewables-costing',
      title: 'renewable storage valuation (psh)',
      year: '2023',
      stack: 'python · numpy-financial · latex',
      desc: 'capital budgeting & LCOE model comparing micro pumped storage hydro vs battery storage.',
      links: [
        { label: 'code', url: 'https://github.com/joehamper/renewables_costing' }
      ]
    },
    {
      id: 'data-extraction',
      title: 'corporate sustainability (esrs) nlp',
      year: '2024',
      stack: 'python · pymupdf · quantulum3',
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
    // 1. Static Dot Matrix Canvas with Connected Grid Squares
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.appendChild(canvas);

    // 2. Foreground Grid-Snapped Container
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

      <!-- UNIFIED PROJECT LEDGER -->
      <main class="projects-ledger">
        ${PROJECTS.map(p => `
          <article class="project-row" id="${p.id}">
            <div class="project-header" tabindex="0" role="button" aria-expanded="false">
              <div class="header-meta-group">
                <span class="toggle-indicator">+</span>
                <div class="title-and-stack">
                  <h2 class="project-title">${p.title}</h2>
                  <span class="project-stack">${p.stack}</span>
                </div>
              </div>
              <div class="header-right">
                <span class="project-year">${p.year}</span>
                <div class="project-actions">
                  ${p.links.map(l => `<a href="${l.url}" class="btn" target="_blank" rel="noopener" onclick="event.stopPropagation()">${l.label}</a>`).join('')}
                </div>
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
    initConnectedGridCanvas(canvas);
  }

  // --------------------------------------------------------------------------
  // EVENT BINDINGS (COLLAPSIBLE LEDGER & THEME)
  // --------------------------------------------------------------------------
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

    // Individual collapsible project rows (collapsed by default)
    const projectRows = document.querySelectorAll('.project-row');
    projectRows.forEach(row => {
      const header = row.querySelector('.project-header');
      const indicator = row.querySelector('.toggle-indicator');

      function toggle() {
        const isExp = row.classList.toggle('expanded');
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

    // Global [+ expand all] / [− collapse all] button
    const toggleAllBtn = document.getElementById('btn-toggle-all');
    function updateGlobalToggleLabel() {
      if (!toggleAllBtn) return;
      const anyCollapsed = Array.from(projectRows).some(row => !row.classList.contains('expanded'));
      toggleAllBtn.textContent = anyCollapsed ? '+ expand all' : '− collapse all';
    }

    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const anyCollapsed = Array.from(projectRows).some(row => !row.classList.contains('expanded'));
        projectRows.forEach(row => {
          const indicator = row.querySelector('.toggle-indicator');
          const header = row.querySelector('.project-header');
          if (anyCollapsed) {
            row.classList.add('expanded');
            if (indicator) indicator.textContent = '−';
            if (header) header.setAttribute('aria-expanded', 'true');
          } else {
            row.classList.remove('expanded');
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
  // CONNECTED DOT GRID BACKGROUND (DOT MATRIX + SPARSE CONNECTING SQUARES)
  // --------------------------------------------------------------------------
  function initConnectedGridCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_SIZE = 32;
    const MAJOR_MULT = 4;

    // Generate fixed sparse connecting square definitions
    let sparseBoxes = [];
    function generateSparseBoxes(cols, rows) {
      sparseBoxes = [];
      const count = Math.floor((cols * rows) / 85); // elegant sparse distribution
      for (let i = 0; i < count; i++) {
        const col = Math.floor(Math.random() * (cols - 2));
        const row = Math.floor(Math.random() * (rows - 2));
        const size = Math.random() > 0.75 ? 2 : 1; // 1x1 or 2x2 grid squares
        sparseBoxes.push({ col, row, size });
      }
    }

    function renderGrid() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      if (sparseBoxes.length === 0) {
        generateSparseBoxes(cols, rows);
      }

      const isDark = document.body.classList.contains('dark-mode');
      const dotColor = isDark ? 'rgba(240, 240, 240, 0.22)' : 'rgba(0, 0, 0, 0.22)';
      const crossColor = isDark ? 'rgba(240, 240, 240, 0.38)' : 'rgba(0, 0, 0, 0.38)';
      const boxColor = isDark ? 'rgba(240, 240, 240, 0.16)' : 'rgba(0, 0, 0, 0.16)';

      // 1. Draw sparse connecting squares (lines connecting dots)
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = 1;
      sparseBoxes.forEach(b => {
        const bx = b.col * GRID_SIZE;
        const by = b.row * GRID_SIZE;
        const bw = b.size * GRID_SIZE;
        const bh = b.size * GRID_SIZE;
        ctx.strokeRect(bx, by, bw, bh);
      });

      // 2. Draw dots and major crosshairs
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * GRID_SIZE;
          const y = r * GRID_SIZE;

          const isMajor = (c % MAJOR_MULT === 0) && (r % MAJOR_MULT === 0);

          if (isMajor) {
            ctx.strokeStyle = crossColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          } else {
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
    window.addEventListener('resize', () => {
      sparseBoxes = [];
      renderGrid();
    });
    renderGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
