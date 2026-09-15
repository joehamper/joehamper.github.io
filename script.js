/**
 * HUB 0.2 // DEMO SHOWCASE
 * Client script: unified project ledger snapped to 32px grid,
 * year 2026 for map project, and fast Conway Game of Life CA background.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      year: '2026',
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
      id: 'renewables-costing',
      title: 'renewable storage valuation (psh)',
      year: '2025',
      stack: 'python · numpy-financial · latex',
      desc: 'capital budgeting & multi-decadal valuation framework comparing modular micro-psh, strategic 200mw pumped hydro, and utility bess under dynamic market saturation.',
      image: 'assets/psh-roi-trajectory.png',
      links: [
        { label: 'pdf', url: 'assets/psh_costing.pdf' },
        { label: 'code', url: 'https://github.com/joehamper/renewables_costing' }
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
      id: 'emissions-matrix',
      title: 'corporate emissions & energy matrix',
      year: '2026',
      stack: 'python · agy · vanilla js',
      desc: 'multi-pass extraction pipeline converting unstructured corporate sustainability filings and heterogeneous reporting units (tCO2e, PJ, GWh) into a standardized emissions & energy panel.',
      image: 'assets/emissions-matrix-preview.png',
      links: [
        { label: 'code', url: 'https://github.com/joehamper/data_extractionv2' }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // DOM MOUNTING
  // --------------------------------------------------------------------------
  function mount() {
    // 1. Conway's Game of Life Cellular Automata Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.appendChild(canvas);

    // 2. Foreground Grid-Snapped Container
    const container = document.createElement('div');
    container.className = 'hub-container';

    container.innerHTML = `
      <header class="masthead">
        <div class="identity">
          <h1 class="name">Joseph Hamper</h1>
          <div class="discipline">Quantitative Analytics + Systems</div>
          <p class="header-bio">A collection of small coding projects I have worked on in my spare time, spanning quantitative analytics, energy storage systems, and data tools.</p>
        </div>
        <nav class="nav">
          <button id="btn-toggle-all" class="btn btn-toggle">Expand All</button>
          <a href="https://github.com/joehamper" target="_blank" rel="noopener" class="btn">GitHub</a>
          <button id="btn-theme" class="btn">Dark</button>
        </nav>
      </header>

      <!-- CLEAN PROJECT LIST -->
      <section class="projects-section">
        <div class="section-heading">
          <h2 class="section-title">projects</h2>
        </div>
        <main class="projects-ledger">
          ${PROJECTS.map(p => `
            <article class="project-row" id="${p.id}">
              <div class="project-header" tabindex="0" role="button" aria-expanded="false">
                <div class="project-title-group">
                  <span class="square-bullet" aria-hidden="true"></span>
                  <span class="project-title">${p.title}</span>
                </div>
                <div class="project-header-right">
                  <span class="project-year">${p.year}</span>
                  <span class="toggle-arrow" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 2.5v7m0 0l-3.5-3.5m3.5 3.5l3.5-3.5"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div class="project-body">
                <div class="project-meta-bar">
                  <span class="project-stack">${p.stack}</span>
                </div>
                <p class="project-desc">${p.desc}</p>
                <div class="project-actions">
                  ${p.links.map(l => `<a href="${l.url}" class="btn" target="_blank" rel="noopener">${l.label}</a>`).join('')}
                </div>
                ${(p.imageLight && p.imageDark) ? `
                  <div class="project-preview">
                    <a href="${p.links[0].url}" target="_blank" rel="noopener" class="preview-link" title="Open ${p.title}">
                      <img src="${p.imageLight}" alt="${p.title} light preview" class="preview-img img-light">
                      <img src="${p.imageDark}" alt="${p.title} dark preview" class="preview-img img-dark">
                    </a>
                  </div>
                ` : (p.image ? `
                  <div class="project-preview">
                    <a href="${p.links[0].url}" target="_blank" rel="noopener" class="preview-link" title="Open ${p.title}">
                      <img src="${p.image}" alt="${p.title} preview" class="preview-img">
                    </a>
                  </div>
                ` : '')}
              </div>
            </article>
          `).join('')}
        </main>
      </section>
    `;

    document.body.appendChild(container);

    // 3. Discreet Background CA Iterator Button
    const iterateBtn = document.createElement('button');
    iterateBtn.id = 'btn-iterate';
    iterateBtn.className = 'btn btn-iterate';
    iterateBtn.title = 'Iterate background cellular automata [i]';
    iterateBtn.textContent = 'iterate';
    document.body.appendChild(iterateBtn);

    bindEvents();
    initLifeGridCanvas(canvas);
  }

  // --------------------------------------------------------------------------
  // EVENT BINDINGS (COLLAPSIBLE LEDGER & THEME)
  // --------------------------------------------------------------------------
  function bindEvents() {
    const themeBtn = document.getElementById('btn-theme');
    const iterateBtn = document.getElementById('btn-iterate');
    const savedTheme = localStorage.getItem('hub_theme');
    
    function applyTheme(isDark) {
      if (isDark) {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = 'Light';
        localStorage.setItem('hub_theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.textContent = 'Dark';
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

    function triggerIteration() {
      const canvas = document.getElementById('bg-canvas');
      if (canvas && canvas._iterate) {
        canvas._iterate();
      }
    }

    if (iterateBtn) {
      iterateBtn.addEventListener('click', triggerIteration);
    }

    // Individual collapsible project rows
    const projectRows = document.querySelectorAll('.project-row');
    projectRows.forEach(row => {
      const header = row.querySelector('.project-header');

      function toggle() {
        const isExp = row.classList.toggle('expanded');
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

    // Global [Expand All] / [Collapse All] button
    const toggleAllBtn = document.getElementById('btn-toggle-all');
    function updateGlobalToggleLabel() {
      if (!toggleAllBtn) return;
      const anyCollapsed = Array.from(projectRows).some(row => !row.classList.contains('expanded'));
      toggleAllBtn.textContent = anyCollapsed ? 'Expand All' : 'Collapse All';
    }

    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const anyCollapsed = Array.from(projectRows).some(row => !row.classList.contains('expanded'));
        projectRows.forEach(row => {
          const header = row.querySelector('.project-header');
          if (anyCollapsed) {
            row.classList.add('expanded');
            if (header) header.setAttribute('aria-expanded', 'true');
          } else {
            row.classList.remove('expanded');
            if (header) header.setAttribute('aria-expanded', 'false');
          }
        });
        updateGlobalToggleLabel();
      });
    }

    // Keyboard shortcuts: [T] for theme, [I] for iterate
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(!isDark);
      } else if (e.key === 'i' || e.key === 'I') {
        triggerIteration();
      }
    });
  }

  // --------------------------------------------------------------------------
  // ULTRA-FAST CELLULAR AUTOMATA (GAME OF LIFE) BACKGROUND GENERATOR
  // Runs 35 generations in ~0.2ms before initial paint. No animation loop.
  // --------------------------------------------------------------------------
  function initLifeGridCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_SIZE = 32;
    let lifeState = null;

    function getClearBounds(cols, rows) {
      const bounds = [];
      const masthead = document.querySelector('.masthead');
      if (masthead) {
        const r = masthead.getBoundingClientRect();
        bounds.push({
          minC: Math.max(0, Math.floor(r.left / GRID_SIZE) - 1),
          maxC: Math.min(cols - 1, Math.ceil(r.right / GRID_SIZE)),
          minR: Math.max(0, Math.floor(r.top / GRID_SIZE) - 1),
          maxR: Math.min(rows - 1, Math.ceil(r.bottom / GRID_SIZE))
        });
      }

      const projects = document.querySelector('.projects-section');
      if (projects) {
        const r = projects.getBoundingClientRect();
        bounds.push({
          minC: Math.max(0, Math.floor(r.left / GRID_SIZE) - 1),
          maxC: Math.min(cols - 1, Math.ceil(r.right / GRID_SIZE)),
          minR: Math.max(0, Math.floor(r.top / GRID_SIZE) - 1),
          maxR: Math.min(rows - 1, Math.ceil(r.bottom / GRID_SIZE))
        });
      }
      return bounds;
    }

    function isInClearZone(c, r, bounds) {
      if (r < 5) return true;
      for (let i = 0; i < bounds.length; i++) {
        const b = bounds[i];
        if (c >= b.minC && c <= b.maxC && r >= b.minR && r <= b.maxR) {
          return true;
        }
      }
      return false;
    }

    function computeLifeState(cols, rows) {
      const size = cols * rows;
      let grid = new Uint8Array(size);
      let next = new Uint8Array(size);
      const clearBounds = getClearBounds(cols, rows);

      // Seed sparsely (~14% random probability), keeping masthead and projects section clear
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid[r * cols + c] = isInClearZone(c, r, clearBounds) ? 0 : (Math.random() < 0.14 ? 1 : 0);
        }
      }

      // Run 32 generations of Conway B3/S23 rules (takes < 0.3ms)
      const generations = 32;
      for (let gen = 0; gen < generations; gen++) {
        for (let r = 0; r < rows; r++) {
          const rPrev = (r === 0 ? rows - 1 : r - 1) * cols;
          const rCurr = r * cols;
          const rNext = (r === rows - 1 ? 0 : r + 1) * cols;

          for (let c = 0; c < cols; c++) {
            if (isInClearZone(c, r, clearBounds)) {
              next[rCurr + c] = 0;
              continue;
            }

            const cPrev = c === 0 ? cols - 1 : c - 1;
            const cNext = c === cols - 1 ? 0 : c + 1;

            const neighbors =
              grid[rPrev + cPrev] + grid[rPrev + c] + grid[rPrev + cNext] +
              grid[rCurr + cPrev]                  + grid[rCurr + cNext] +
              grid[rNext + cPrev] + grid[rNext + c] + grid[rNext + cNext];

            const idx = rCurr + c;
            const alive = grid[idx];

            if (alive === 1) {
              next[idx] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
              next[idx] = (neighbors === 3) ? 1 : 0;
            }
          }
        }
        let temp = grid;
        grid = next;
        next = temp;
      }

      return grid;
    }

    function stepLifeState(cols, rows) {
      if (!lifeState || lifeState.length !== cols * rows) {
        lifeState = computeLifeState(cols, rows);
        return;
      }

      const size = cols * rows;
      let next = new Uint8Array(size);
      let aliveCount = 0;
      const clearBounds = getClearBounds(cols, rows);

      for (let r = 0; r < rows; r++) {
        const rPrev = (r === 0 ? rows - 1 : r - 1) * cols;
        const rCurr = r * cols;
        const rNext = (r === rows - 1 ? 0 : r + 1) * cols;

        for (let c = 0; c < cols; c++) {
          if (isInClearZone(c, r, clearBounds)) {
            next[rCurr + c] = 0;
            continue;
          }

          const cPrev = c === 0 ? cols - 1 : c - 1;
          const cNext = c === cols - 1 ? 0 : c + 1;

          const neighbors =
            lifeState[rPrev + cPrev] + lifeState[rPrev + c] + lifeState[rPrev + cNext] +
            lifeState[rCurr + cPrev]                        + lifeState[rCurr + cNext] +
            lifeState[rNext + cPrev] + lifeState[rNext + c] + lifeState[rNext + cNext];

          const idx = rCurr + c;
          const alive = lifeState[idx];

          if (alive === 1) {
            if (neighbors === 2 || neighbors === 3) {
              next[idx] = 1;
              aliveCount++;
            } else {
              next[idx] = 0;
            }
          } else {
            if (neighbors === 3) {
              next[idx] = 1;
              aliveCount++;
            } else {
              next[idx] = 0;
            }
          }
        }
      }

      // If all cells died out, reseed sparsely
      if (aliveCount === 0) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (!isInClearZone(c, r, clearBounds) && Math.random() < 0.12) {
              next[r * cols + c] = 1;
            }
          }
        }
      }

      lifeState = next;
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

      if (!lifeState || lifeState.length !== cols * rows) {
        lifeState = computeLifeState(cols, rows);
      }

      const isDark = document.body.classList.contains('dark-mode');
      // Faint green hue matching the title highlight
      const squareStroke = isDark ? 'rgba(144, 238, 144, 0.26)' : 'rgba(74, 150, 74, 0.28)';
      const squareFill = isDark ? 'rgba(144, 238, 144, 0.04)' : 'rgba(144, 238, 144, 0.06)';

      // 1. Draw Conway Game of Life surviving cells as hairline squares
      ctx.strokeStyle = squareStroke;
      ctx.fillStyle = squareFill;
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (lifeState[r * cols + c] === 1) {
            const x = c * GRID_SIZE;
            const y = r * GRID_SIZE;
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
            ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
          }
        }
      }

      ctx.restore();
    }

    function iterate() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;
      stepLifeState(cols, rows);
      renderGrid();
    }

    canvas._renderGrid = renderGrid;
    canvas._iterate = iterate;

    window.addEventListener('resize', () => {
      lifeState = null;
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
