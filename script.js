/**
 * ============================================================================
 * HUB 0.2 // UTILITARIAN TECH CLIENT ENGINE
 * Dynamically mounts the entire DOM tree into a zero-markup index.html.
 * Pure monochrome, brutalist grid architecture, zero dependencies.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // PROJECT DOSSIER REPOSITORY DATA
  // --------------------------------------------------------------------------
  const PROJECTS = [
    {
      ref: '01',
      id: 'energy-and-gdp',
      title: 'global energy & gdp observatory',
      domain: 'Macro / Spatial',
      category: 'ENERGY',
      stack: 'Vanilla JS · D3.js · MapLibre GL · Client Zero-Build',
      status: 'ONLINE',
      tagline: '10-year interactive decoupling analysis of sovereign GDP from carbon intensity across 50+ sovereign grids.',
      architecture: 'Zero-build client-side analytical platform utilizing D3.js and MapLibre GL for topological geo-data visualization without runtime build chains.',
      methodology: 'Multi-source empirical harmonization of World Bank, IEA, and sovereign electricity grid telemetry covering 2014–2024.',
      highlights: 'Sub-100ms choropleth transitions, zero server dependencies, responsive vector map rasterization with topological path projection.',
      metrics: [
        { label: 'SOVEREIGN GRIDS', value: '50+' },
        { label: 'TIMESPAN', value: '2014-2024' },
        { label: 'RUNTIME OVERHEAD', value: '0.00 kB' }
      ],
      links: [
        { label: '[DEMO / APPLICATION]', url: 'energy-and-gdp/' },
        { label: '[GITHUB / REPO]', url: 'https://github.com/joe/energy-and-gdp' }
      ],
      cloneCmd: 'git clone https://github.com/joe/energy-and-gdp.git'
    },
    {
      ref: '02',
      id: 'stock-picker',
      title: 'quant equities & spike predictor',
      domain: 'Quant / Time-Series',
      category: 'QUANT',
      stack: 'R (data.table, zoo) · Python · WRDS Feeds · R Markdown',
      status: 'VERIFIED',
      tagline: 'Systematic momentum and volatility spike forecasting validated on historical WRDS feeds.',
      architecture: 'High-frequency volatility estimation engine integrating GARCH modeling, automated survivorship-bias adjustments, and cross-sectional rank scoring.',
      methodology: 'Wharton Research Data Services (WRDS) CRSP and Compustat daily trading records with rolling factor decomposition.',
      highlights: 'Automated R Markdown analytical dossiers, signal backtesting matrix, custom downside risk attribution and drawdown stress tests.',
      metrics: [
        { label: 'UNIVERSE SIZE', value: '10,000+ EQUITIES' },
        { label: 'RESOLUTION', value: 'DAILY EOD' },
        { label: 'FACTOR MODEL', value: 'MOMENTUM / VOL' }
      ],
      links: [
        { label: '[GITHUB / REPO]', url: 'https://github.com/joe/stock_picker_game' }
      ],
      cloneCmd: 'git clone https://github.com/joe/stock_picker_game.git'
    },
    {
      ref: '03',
      id: 'renewables-costing',
      title: 'renewable storage valuation (psh)',
      domain: 'Finance / Infrastructure',
      category: 'ENERGY',
      stack: 'Python · numpy-financial · LaTeX Publication · Matplotlib',
      status: 'MODEL',
      tagline: '50-year capital budgeting & LCOE model comparing micro pumped storage hydro vs battery storage.',
      architecture: 'Comprehensive discounted cash flow (DCF) engine computing levelized cost of storage (LCOS), cyclic degradation curves, and round-trip efficiency economics.',
      methodology: 'Monte Carlo dispatch simulation against wholesale nodal electricity pricing distributions across 50-year infrastructure lifecycle.',
      highlights: 'Automated LaTeX publication compiler, parametric sensitivity surfaces on discount rate vs capex inflation, asset replacement scheduling.',
      metrics: [
        { label: 'MODEL HORIZON', value: '50 YEARS' },
        { label: 'STORAGE ASSET', value: 'MICRO PSH vs BESS' },
        { label: 'DISPATCH', value: 'MONTE CARLO' }
      ],
      links: [
        { label: '[GITHUB / REPO]', url: 'https://github.com/joe/renewables_costing' }
      ],
      cloneCmd: 'git clone https://github.com/joe/renewables_costing.git'
    },
    {
      ref: '04',
      id: 'data-extraction',
      title: 'corporate sustainability (esrs) nlp',
      domain: 'NLP / Document AI',
      category: 'NLP',
      stack: 'Python · PyMuPDF (fitz) · quantulum3 · Streamlit · Pandas',
      status: 'DEPLOYED',
      tagline: 'Document AI pipeline harvesting physical metrics and units from 200+ page corporate filings for CSRD compliance.',
      architecture: 'Layout-aware spatial text & tabular extraction pipeline with regex and transformer hybrid entity recognition for metric/unit pairing.',
      methodology: 'Targeted entity normalization aligned with European Sustainability Reporting Standards (ESRS) E1 climate change disclosures.',
      highlights: 'Quantulum automated unit normalization, bounding-box provenance audit trail, Streamlit operational review cockpit for analyst verification.',
      metrics: [
        { label: 'DOSSIER LENGTH', value: '200+ PAGES' },
        { label: 'STANDARD', value: 'CSRD / ESRS E1' },
        { label: 'EXTRACTION', value: 'BOUNDING-BOX PROVENANCE' }
      ],
      links: [
        { label: '[GITHUB / REPO]', url: 'https://github.com/joe/data_extractionv2' }
      ],
      cloneCmd: 'git clone https://github.com/joe/data_extractionv2.git'
    }
  ];

  // --------------------------------------------------------------------------
  // PLAIN-TEXT CV MANIFEST
  // --------------------------------------------------------------------------
  const CV_RAW = `================================================================================
JOE // CURRICULUM VITAE
QUANTITATIVE ANALYTICS & SYSTEMS ARCHITECTURE
Email: contact@example.com | GitHub: github.com/joe | Web: portfolio-site
================================================================================

[EXECUTIVE PROFILE]
Specialized in quantitative financial modeling, energy systems economics, and
high-performance analytical software. Proven capability delivering zero-build
data observatories, algorithmic equity models on institutional feeds (WRDS),
and layout-aware document extraction pipelines for regulatory compliance.

[CORE COMPETENCIES & DOMAINS]
- Quantitative Finance: Momentum modeling, volatility forecasting, GARCH, WRDS CRSP.
- Energy Economics: Capital budgeting (DCF), LCOE / LCOS modeling, PSH vs BESS.
- Document AI & NLP: Spatial PDF parsing, entity extraction, CSRD/ESRS harmonization.
- Utilitarian Systems: Zero-build client architectures, D3.js visualization, clean APIs.

[SELECTED PROJECT DOSSIERS]

01. GLOBAL ENERGY & GDP OBSERVATORY (2014-2024)
    Stack: Vanilla JS, D3.js, MapLibre GL, Zero-Build Architecture.
    - Designed 10-year interactive decoupling analytical platform analyzing GDP vs carbon
      intensity across 50+ sovereign grids.
    - Engineered sub-100ms choropleth vector transitions and coordinate reprojections
      with zero client-side package bundler overhead.

02. QUANT EQUITIES & VOLATILITY SPIKE PREDICTOR
    Stack: R (data.table, zoo), Python, WRDS Historical Feeds, R Markdown.
    - Constructed systematic equity forecasting model backtested on CRSP/Compustat feeds.
    - Implemented cross-sectional factor ranking and automated Markdown leaderboard generation.

03. RENEWABLE STORAGE VALUATION (50-YEAR MICRO PSH MODEL)
    Stack: Python (NumPy, SciPy), numpy-financial, LaTeX publication pipeline.
    - Developed 50-year capital expenditure and DCF model evaluating micro pumped storage
      hydroelectric infrastructure versus lithium-ion utility battery storage.
    - Programmed Monte Carlo wholesale price dispatch simulation and automated LaTeX reporting.

04. CORPORATE SUSTAINABILITY (ESRS) DOCUMENT AI PIPELINE
    Stack: Python, PyMuPDF, quantulum3, Streamlit, Pandas.
    - Built spatial parser extracting physical quantities, GHG emission metrics, and unit
      pairings from 200+ page CSRD corporate disclosures.
    - Automated unit conversions and audit-proof bounding-box coordinates for analysts.

[TECHNICAL STACK]
Languages:    Python, R, JavaScript (ES6+), SQL, C, LaTeX, Bash.
Libraries:    D3.js, MapLibre GL, data.table, NumPy, SciPy, PyMuPDF, Streamlit.
Databases:    PostgreSQL, DuckDB, SQLite.
Telemetry:    WRDS (CRSP, Compustat), IEA World Energy Feeds, Coinbase Spot API.

================================================================================
[END OF RECORD]
`;

  // --------------------------------------------------------------------------
  // DOM MOUNTING & HTML TEMPLATING ENGINE
  // --------------------------------------------------------------------------
  function mountDOM() {
    const root = document.createElement('main');
    root.className = 'hub-root';
    root.id = 'hub-root';

    root.innerHTML = `
      <!-- MASTHEAD SYSTEM GRID -->
      <header class="masthead-grid">
        <div class="masthead-cell">
          <div class="system-tag">SYSTEM: PORTFOLIO // HUB 0.2</div>
          <div class="masthead-title">
            <span class="operator">joe</span>
            <span class="domain">quantitative analytics + systems</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-item">STATUS: <strong>ONLINE</strong></span>
            <span class="telemetry-item">NODE: <strong>CLIENT-DOM</strong></span>
            <span class="telemetry-item">UPTIME: <strong id="session-uptime">00:00</strong></span>
          </div>
        </div>
        <div class="masthead-cell">
          <div class="telemetry-row">
            <span class="system-tag">SYS TELEMETRY</span>
            <span class="telemetry-item" id="utc-clock">UTC 00:00:00</span>
          </div>
          <div class="header-actions">
            <a href="https://github.com" target="_blank" rel="noopener" class="btn">[GITHUB]</a>
            <button id="btn-open-cv" class="btn">[CV // VIEW]</button>
            <a href="mailto:contact@example.com" class="btn">[CONTACT]</a>
            <button id="btn-toggle-theme" class="btn">[THEME: DARK]</button>
          </div>
          <div class="telemetry-row keyboard-guide">
            <span>SHORTCUTS: [T] THEME · [C] CV · [X] EXPAND · [1-4] ROW</span>
          </div>
        </div>
      </header>

      <!-- TOOLBAR & FILTER MATRIX -->
      <div class="toolbar-grid">
        <div class="filters-group">
          <span class="filter-label">// FILTER:</span>
          <button class="btn active" data-filter="ALL">[ALL: 04]</button>
          <button class="btn" data-filter="QUANT">[QUANT]</button>
          <button class="btn" data-filter="ENERGY">[ENERGY]</button>
          <button class="btn" data-filter="NLP">[NLP / AI]</button>
        </div>
        <div class="toolbar-controls">
          <span class="item-count-label" id="filter-count">SHOWING 4 OF 4</span>
          <button id="btn-toggle-all" class="btn btn-subtle">[X // EXPAND ALL]</button>
        </div>
      </div>

      <!-- WORK DOSSIER MATRIX -->
      <section class="work-section">
        <div class="work-matrix" id="work-matrix">
          <!-- Column Headers -->
          <div class="matrix-col-headers">
            <div class="col-th">REF</div>
            <div class="col-th">PROJECT // REPOSITORY</div>
            <div class="col-th">DOMAIN</div>
            <div class="col-th">PRIMARY STACK</div>
            <div class="col-th">DISPATCH</div>
          </div>
          <!-- Rows injected dynamically -->
          <div id="matrix-rows-container"></div>
        </div>
      </section>

      <!-- SYSTEM FOOTER GRID -->
      <footer class="system-footer">
        <div class="footer-cell">
          <span>SPEC: UTILITARIAN TECH · VERSION 0.2</span>
          <span>HAIRLINE: 1PX MONOCHROME</span>
        </div>
        <div class="footer-cell">
          <div class="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener">[GITHUB]</a>
            <a href="#" id="footer-cv-link">[CV RAW]</a>
            <a href="mailto:contact@example.com">[DISPATCH EMAIL]</a>
          </div>
          <span id="footer-timestamp">LOCAL SYNCED</span>
        </div>
      </footer>

      <!-- PLAIN-TEXT CV MODAL FRAME -->
      <div id="cv-modal" class="modal-overlay hidden" role="dialog" aria-modal="true">
        <div class="modal-frame">
          <div class="modal-header">
            <span class="modal-title">DOSSIER // CURRICULUM VITAE [RAW MONOSPACE]</span>
            <div class="modal-controls">
              <button id="btn-copy-cv" class="btn">[COPY RAW]</button>
              <button id="btn-close-cv" class="btn">[ESC // CLOSE]</button>
            </div>
          </div>
          <div class="modal-body">
            <pre class="cv-pre" id="cv-content"></pre>
          </div>
        </div>
      </div>

      <!-- TRANSIENT FEEDBACK TOAST -->
      <div id="toast" class="toast-notice" role="status"></div>
    `;

    document.body.appendChild(root);
  }

  // --------------------------------------------------------------------------
  // RENDER PROJECT ROWS
  // --------------------------------------------------------------------------
  let currentFilter = 'ALL';
  let allExpanded = false;

  function renderRows() {
    const container = document.getElementById('matrix-rows-container');
    if (!container) return;

    const filtered = PROJECTS.filter(p => currentFilter === 'ALL' || p.category === currentFilter);
    
    // Update count label
    const countEl = document.getElementById('filter-count');
    if (countEl) countEl.textContent = `SHOWING ${filtered.length} OF ${PROJECTS.length}`;

    container.innerHTML = filtered.map(item => `
      <article class="work-row ${allExpanded ? 'expanded' : ''}" id="row-${item.id}" data-id="${item.id}">
        <div class="row-summary" tabindex="0" role="button" aria-expanded="${allExpanded ? 'true' : 'false'}">
          <div class="cell cell-ref">${item.ref}</div>
          <div class="cell cell-title">
            <span class="expand-indicator">▶</span>
            <span>${item.title}</span>
          </div>
          <div class="cell cell-domain">${item.domain}</div>
          <div class="cell cell-stack">${item.stack}</div>
          <div class="cell cell-actions">
            ${item.links.map(l => `<a href="${l.url}" class="btn" target="_blank" rel="noopener" onclick="event.stopPropagation()">${l.label}</a>`).join('')}
          </div>
        </div>

        <!-- EXPANDABLE TECHNICAL BLUEPRINT -->
        <div class="row-spec-drawer">
          <div class="spec-grid">
            <div class="spec-main">
              <div class="spec-tagline">${item.tagline}</div>
              <div class="spec-subsections">
                <div class="spec-block">
                  <span class="spec-block-label">// ARCHITECTURE & REASONING</span>
                  <span class="spec-block-content">${item.architecture}</span>
                </div>
                <div class="spec-block">
                  <span class="spec-block-label">// EMPIRICAL DATA & HARMONIZATION</span>
                  <span class="spec-block-content">${item.methodology}</span>
                </div>
                <div class="spec-block">
                  <span class="spec-block-label">// BENCHMARKS & KEY DELIVERABLES</span>
                  <span class="spec-block-content">${item.highlights}</span>
                </div>
              </div>
            </div>

            <div class="spec-side">
              <div class="spec-metrics">
                <span class="spec-block-label">// SPEC PARAMETERS</span>
                ${item.metrics.map(m => `
                  <div class="metric-row">
                    <span class="metric-k">${m.label}</span>
                    <span class="metric-v">${m.value}</span>
                  </div>
                `).join('')}
              </div>

              <div class="spec-terminal">
                <div class="terminal-header">// TERMINAL CLONE</div>
                <div class="terminal-cmd">${item.cloneCmd}</div>
                <button class="btn btn-subtle btn-copy-cmd" data-cmd="${item.cloneCmd}" style="margin-top: 4px;">[COPY CLONE CMD]</button>
              </div>

              <div class="spec-links-bar">
                ${item.links.map(l => `<a href="${l.url}" class="btn" target="_blank" rel="noopener">${l.label}</a>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    bindRowEvents();
  }

  // --------------------------------------------------------------------------
  // ROW INTERACTION BINDINGS
  // --------------------------------------------------------------------------
  function bindRowEvents() {
    const rows = document.querySelectorAll('.work-row');
    rows.forEach(row => {
      const summary = row.querySelector('.row-summary');
      if (summary) {
        summary.addEventListener('click', () => {
          row.classList.toggle('expanded');
          const isExp = row.classList.contains('expanded');
          summary.setAttribute('aria-expanded', isExp ? 'true' : 'false');
        });

        summary.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            row.classList.toggle('expanded');
          }
        });
      }
    });

    // Copy command buttons inside drawer
    const copyCmdBtns = document.querySelectorAll('.btn-copy-cmd');
    copyCmdBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) copyToClipboard(cmd, 'COMMAND COPIED TO CLIPBOARD');
      });
    });
  }

  // --------------------------------------------------------------------------
  // CLIPBOARD & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'COPIED TO CLIPBOARD');
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'COPIED TO CLIPBOARD');
    } catch (err) {
      showToast('COPY FAILED');
    }
    document.body.removeChild(ta);
  }

  // --------------------------------------------------------------------------
  // TELEMETRY CLOCKS & TIMERS
  // --------------------------------------------------------------------------
  let sessionStart = Date.now();

  function initClocks() {
    const utcEl = document.getElementById('utc-clock');
    const uptimeEl = document.getElementById('session-uptime');

    function update() {
      const now = new Date();
      if (utcEl) {
        const hh = String(now.getUTCHours()).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        const ss = String(now.getUTCSeconds()).padStart(2, '0');
        utcEl.textContent = `UTC ${hh}:${mm}:${ss}`;
      }

      if (uptimeEl) {
        const elapsedSecs = Math.floor((Date.now() - sessionStart) / 1000);
        const mins = String(Math.floor(elapsedSecs / 60)).padStart(2, '0');
        const secs = String(elapsedSecs % 60).padStart(2, '0');
        uptimeEl.textContent = `${mins}:${secs}`;
      }
    }

    update();
    setInterval(update, 1000);
  }

  // --------------------------------------------------------------------------
  // THEME MANAGEMENT (MONOCHROME LIGHT / INVERTED DARK)
  // --------------------------------------------------------------------------
  function initTheme() {
    const themeBtn = document.getElementById('btn-toggle-theme');
    const savedTheme = localStorage.getItem('hub_theme');
    
    function setTheme(dark) {
      if (dark) {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '[THEME: LIGHT]';
        localStorage.setItem('hub_theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.textContent = '[THEME: DARK]';
        localStorage.setItem('hub_theme', 'light');
      }
    }

    // Default to light (or stored preference)
    const isDark = savedTheme === 'dark';
    setTheme(isDark);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentlyDark = document.body.classList.contains('dark-mode');
        setTheme(!currentlyDark);
      });
    }

    return setTheme;
  }

  // --------------------------------------------------------------------------
  // CV MODAL CONTROLLER
  // --------------------------------------------------------------------------
  function initCvModal() {
    const modal = document.getElementById('cv-modal');
    const openBtn = document.getElementById('btn-open-cv');
    const footerLink = document.getElementById('footer-cv-link');
    const closeBtn = document.getElementById('btn-close-cv');
    const copyBtn = document.getElementById('btn-copy-cv');
    const cvPre = document.getElementById('cv-content');

    if (cvPre) cvPre.textContent = CV_RAW;

    function openModal(e) {
      if (e) e.preventDefault();
      if (modal) modal.classList.remove('hidden');
    }

    function closeModal() {
      if (modal) modal.classList.add('hidden');
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (footerLink) footerLink.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyToClipboard(CV_RAW, 'RAW CV COPIED TO CLIPBOARD');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    return { open: openModal, close: closeModal };
  }

  // --------------------------------------------------------------------------
  // FILTERS & GLOBAL CONTROLS
  // --------------------------------------------------------------------------
  function initControls() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'ALL';
        renderRows();
      });
    });

    const toggleAllBtn = document.getElementById('btn-toggle-all');
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        allExpanded = !allExpanded;
        toggleAllBtn.textContent = allExpanded ? '[X // COLLAPSE ALL]' : '[X // EXPAND ALL]';
        const rows = document.querySelectorAll('.work-row');
        rows.forEach(r => {
          if (allExpanded) {
            r.classList.add('expanded');
          } else {
            r.classList.remove('expanded');
          }
          const sum = r.querySelector('.row-summary');
          if (sum) sum.setAttribute('aria-expanded', allExpanded ? 'true' : 'false');
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function initShortcuts(cvController, setTheme) {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const key = e.key;

      if (key === 'Escape') {
        cvController.close();
      } else if (key === 't' || key === 'T' || key === 'i' || key === 'I') {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(!isDark);
      } else if (key === 'c' || key === 'C') {
        const modal = document.getElementById('cv-modal');
        if (modal && modal.classList.contains('hidden')) {
          cvController.open();
        } else {
          cvController.close();
        }
      } else if (key === 'x' || key === 'X') {
        const toggleAllBtn = document.getElementById('btn-toggle-all');
        if (toggleAllBtn) toggleAllBtn.click();
      } else if (key >= '1' && key <= '4') {
        const index = parseInt(key, 10) - 1;
        const rows = document.querySelectorAll('.work-row');
        if (rows[index]) {
          const summary = rows[index].querySelector('.row-summary');
          if (summary) summary.click();
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    mountDOM();
    renderRows();
    initClocks();
    const setTheme = initTheme();
    const cvController = initCvModal();
    initControls();
    initShortcuts(cvController, setTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
