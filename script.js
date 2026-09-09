/**
 * HUB 0.2 // DEMO SHOWCASE
 * Client script: showcases project demos with subtle ASCII parallax background
 * and frosted backdrop-filter foreground elements.
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
    initParallax(canvas);
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
  // SUBTLE SPARSE ASCII PARALLAX ENGINE
  // --------------------------------------------------------------------------
  function initParallax(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // ASCII characters: sparse technical glyphs
    const GLYPHS = ['+', '·', '×', '0', '1', ':', '¬', '°', '/', '_', '•', '~', '|', '^'];
    
    // Generate sparse points distributed across normalized canvas coordinates
    const NUM_CHARS = 55;
    const particles = [];

    for (let i = 0; i < NUM_CHARS; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        depth: 0.15 + Math.random() * 0.85, // parallax depth factor
        opacity: 0.08 + Math.random() * 0.14,
        size: Math.random() > 0.6 ? 14 : 12
      });
    }

    // Parallax mouse & scroll state
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

    // Render loop with smooth easing
    function draw() {
      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.body.classList.contains('dark-mode');
      const baseColor = isDark ? '240, 240, 240' : '0, 0, 0';

      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Parallax shift calculation based on individual depth
        const shiftX = mouseX * 60 * p.depth;
        const shiftY = (mouseY * 60 * p.depth) - ((scrollY * 0.12 * p.depth) % height);

        let posX = (p.x * width) + shiftX;
        let posY = (p.y * height) + shiftY;

        // Wrap around viewport edges
        if (posX < 0) posX += width;
        if (posX > width) posX -= width;
        if (posY < 0) posY += height;
        if (posY > height) posY -= height;

        ctx.font = `${p.size}px "GohuFont", monospace`;
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
        ctx.fillText(p.char, posX, posY);
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
