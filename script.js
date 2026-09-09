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
          <h1 class="name">joseph hamper</h1>
          <div class="discipline">quantitative analytics + systems</div>
          <p class="header-bio">a collection of small coding projects i have worked on in my spare time, spanning quantitative analytics, energy storage systems, and data tools.</p>
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

    function computeLifeState(cols, rows) {
      const size = cols * rows;
      let grid = new Uint8Array(size);
      let next = new Uint8Array(size);

      // Seed sparsely (~14% random probability), keeping the top rows clear for masthead
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid[r * cols + c] = (r < 5) ? 0 : (Math.random() < 0.14 ? 1 : 0);
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
            if (r < 5) {
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

      for (let r = 0; r < rows; r++) {
        const rPrev = (r === 0 ? rows - 1 : r - 1) * cols;
        const rCurr = r * cols;
        const rNext = (r === rows - 1 ? 0 : r + 1) * cols;

        for (let c = 0; c < cols; c++) {
          if (r < 5) {
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
        for (let r = 5; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (Math.random() < 0.12) next[r * cols + c] = 1;
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
      const dotColor = isDark ? 'rgba(240, 240, 240, 0.20)' : 'rgba(0, 0, 0, 0.20)';
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

      // 2. Draw clean, subtle dot matrix (no plus signs)
      ctx.fillStyle = dotColor;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          ctx.arc(c * GRID_SIZE, r * GRID_SIZE, 1.0, 0, Math.PI * 2);
          ctx.fill();
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
