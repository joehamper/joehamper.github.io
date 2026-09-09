/**
 * HUB 0.2 // DEMO SHOWCASE
 * Client script: showcases project demos with responsive technical dot grid
 * and frosted backdrop-filter glass panels.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      desc: 'data visualisation of global energy production and GDP, including carbon intensity and decoupling.',
      image: 'assets/energy-and-gdp-preview.png',
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
    // 1. Fixed Parallax Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.appendChild(canvas);

    // 2. Foreground Container
    const container = document.createElement('div');
    container.className = 'hub-container';

    container.innerHTML = `
      <header class="masthead">
        <div class="identity">
          <h1 class="name">joe</h1>
          <div class="discipline">quantitative analytics + systems</div>
        </div>
        <nav class="nav">
          <a href="https://github.com/joehamper" target="_blank" rel="noopener" class="btn">github</a>
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
            ${p.image ? `
              <div class="project-preview">
                <a href="${p.links[0].url}" target="_blank" rel="noopener" class="preview-link" title="Open ${p.title} Demo">
                  <img src="${p.image}" alt="${p.title} interactive preview" class="preview-img">
                </a>
              </div>
            ` : ''}
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
          <a href="https://github.com/joehamper" target="_blank" rel="noopener">github.com/joehamper</a>
        </div>
      </footer>
    `;

    document.body.appendChild(container);

    bindEvents();
    initDotGridParallax(canvas);
  }

  // --------------------------------------------------------------------------
  // THEME & SHORTCUT EVENTS
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

  // --------------------------------------------------------------------------
  // VISIBLE TECHNICAL DOT GRID PARALLAX ENGINE
  // --------------------------------------------------------------------------
  function initDotGridParallax(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Technical grid parameters
    const GRID_SIZE = 32; // pixel pitch between dots
    const MAJOR_MULT = 4; // every 4th grid point is a crosshair

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY || 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY || 0;
    });

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / width) - 0.5;
      targetMouseY = (e.clientY / height) - 0.5;
    });

    resize();

    function draw() {
      // Smooth lerp mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.body.classList.contains('dark-mode');
      const dotColor = isDark ? 'rgba(240, 240, 240, 0.22)' : 'rgba(0, 0, 0, 0.22)';
      const crossColor = isDark ? 'rgba(240, 240, 240, 0.38)' : 'rgba(0, 0, 0, 0.38)';

      // Parallax translation
      const shiftX = (mouseX * 30) % GRID_SIZE;
      const shiftY = ((mouseY * 30) - (scrollY * 0.2)) % GRID_SIZE;

      const startX = -GRID_SIZE + shiftX;
      const startY = -GRID_SIZE + shiftY;

      // Draw dot matrix & coordinate crosshairs
      for (let x = startX; x < width + GRID_SIZE; x += GRID_SIZE) {
        for (let y = startY; y < height + GRID_SIZE; y += GRID_SIZE) {
          const gridCol = Math.round((x - shiftX) / GRID_SIZE);
          const gridRow = Math.round((y - shiftY) / GRID_SIZE);

          const isMajor = (gridCol % MAJOR_MULT === 0) && (gridRow % MAJOR_MULT === 0);

          if (isMajor) {
            // Crisp crosshair '+' at major coordinate intervals
            ctx.strokeStyle = crossColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          } else {
            // Clean circular dot
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(x, y, 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
