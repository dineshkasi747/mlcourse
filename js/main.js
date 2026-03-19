// main.js - to build
/* ================================================================
   ML-LEARN · MAIN.JS
   Handles: sidebar, theme, search, progress tracker,
            TOC spy, copy buttons, Pyodide runner, nav
   ================================================================ */

'use strict';

/* ── Topic Index (all 63 pages) ─────────────────────────────── */
const TOPICS = [
  /* Phase 1 — Data Collection */
  { id:'csv-loading',          title:'CSV Loading',               phase:'Data Collection',   phaseId:1, file:'topics/phase1-data-collection/csv-loading.html' },
  { id:'json-loading',         title:'JSON Loading',              phase:'Data Collection',   phaseId:1, file:'topics/phase1-data-collection/json-loading.html' },
  { id:'sql-loading',          title:'SQL Loading',               phase:'Data Collection',   phaseId:1, file:'topics/phase1-data-collection/sql-loading.html' },
  { id:'api-fetching',         title:'API Fetching',              phase:'Data Collection',   phaseId:1, file:'topics/phase1-data-collection/api-fetching.html' },
  { id:'web-scraping',         title:'Web Scraping',              phase:'Data Collection',   phaseId:1, file:'topics/phase1-data-collection/web-scraping.html' },
  /* Phase 2 — EDA */
  { id:'data-types',           title:'Data Types',                phase:'EDA',               phaseId:2, file:'topics/phase2-eda/data-types.html' },
  { id:'univariate-analysis',  title:'Univariate Analysis',       phase:'EDA',               phaseId:2, file:'topics/phase2-eda/univariate-analysis.html' },
  { id:'bivariate-analysis',   title:'Bivariate Analysis',        phase:'EDA',               phaseId:2, file:'topics/phase2-eda/bivariate-analysis.html' },
  { id:'multivariate-analysis',title:'Multivariate Analysis',     phase:'EDA',               phaseId:2, file:'topics/phase2-eda/multivariate-analysis.html' },
  { id:'pandas-profiling',     title:'Pandas Profiling',          phase:'EDA',               phaseId:2, file:'topics/phase2-eda/pandas-profiling.html' },
  /* Phase 3 — Data Cleaning */
  { id:'missing-values-types', title:'Missing Value Types',       phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/missing-values-types.html' },
  { id:'complete-case-analysis',title:'Complete Case Analysis',   phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/complete-case-analysis.html' },
  { id:'simple-imputation',    title:'Simple Imputation',         phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/simple-imputation.html' },
  { id:'knn-imputer',          title:'KNN Imputer',               phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/knn-imputer.html' },
  { id:'mice-iterative-imputer',title:'MICE / Iterative Imputer', phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/mice-iterative-imputer.html' },
  { id:'missing-indicator',    title:'Missing Indicator',         phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/missing-indicator.html' },
  { id:'outliers-zscore',      title:'Outliers — Z-Score',        phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/outliers-zscore.html' },
  { id:'outliers-iqr',         title:'Outliers — IQR',            phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/outliers-iqr.html' },
  { id:'winsorization',        title:'Winsorization',             phase:'Data Cleaning',     phaseId:3, file:'topics/phase3-data-cleaning/winsorization.html' },
  /* Phase 4 — Feature Engineering */
  { id:'standardization',      title:'Standardization',           phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/standardization.html' },
  { id:'normalization',        title:'Normalization',             phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/normalization.html' },
  { id:'minmax-scaling',       title:'MinMax Scaling',            phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/minmax-scaling.html' },
  { id:'robust-scaling',       title:'Robust Scaling',            phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/robust-scaling.html' },
  { id:'ordinal-encoding',     title:'Ordinal Encoding',          phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/ordinal-encoding.html' },
  { id:'label-encoding',       title:'Label Encoding',            phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/label-encoding.html' },
  { id:'onehot-encoding',      title:'One-Hot Encoding',          phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/onehot-encoding.html' },
  { id:'target-encoding',      title:'Target Encoding',           phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/target-encoding.html' },
  { id:'log-transform',        title:'Log Transform',             phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/log-transform.html' },
  { id:'boxcox-transform',     title:'Box-Cox Transform',         phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/boxcox-transform.html' },
  { id:'yeo-johnson-transform',title:'Yeo-Johnson Transform',     phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/yeo-johnson-transform.html' },
  { id:'binning-discretization',title:'Binning & Discretization', phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/binning-discretization.html' },
  { id:'feature-construction', title:'Feature Construction',      phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/feature-construction.html' },
  { id:'feature-splitting',    title:'Feature Splitting',         phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/feature-splitting.html' },
  { id:'datetime-features',    title:'Datetime Features',         phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/datetime-features.html' },
  { id:'mixed-variables',      title:'Mixed Variables',           phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/mixed-variables.html' },
  { id:'column-transformer',   title:'Column Transformer',        phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/column-transformer.html' },
  { id:'ml-pipelines',         title:'ML Pipelines',              phase:'Feature Engineering', phaseId:4, file:'topics/phase4-feature-engineering/ml-pipelines.html' },
  /* Phase 5 — Feature Selection */
  { id:'curse-of-dimensionality',title:'Curse of Dimensionality', phase:'Feature Selection', phaseId:5, file:'topics/phase5-feature-selection/curse-of-dimensionality.html' },
  { id:'filter-methods',       title:'Filter Methods',            phase:'Feature Selection', phaseId:5, file:'topics/phase5-feature-selection/filter-methods.html' },
  { id:'wrapper-methods',      title:'Wrapper Methods',           phase:'Feature Selection', phaseId:5, file:'topics/phase5-feature-selection/wrapper-methods.html' },
  { id:'embedded-methods',     title:'Embedded Methods',          phase:'Feature Selection', phaseId:5, file:'topics/phase5-feature-selection/embedded-methods.html' },
  { id:'pca',                  title:'PCA',                       phase:'Feature Selection', phaseId:5, file:'topics/phase5-feature-selection/pca.html' },
  /* Algorithms — Regression */
  { id:'simple-linear-regression',  title:'Simple Linear Regression',   phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/simple-linear-regression.html' },
  { id:'multiple-linear-regression',title:'Multiple Linear Regression',  phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/multiple-linear-regression.html' },
  { id:'gradient-descent',          title:'Gradient Descent',            phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/gradient-descent.html' },
  { id:'polynomial-regression',     title:'Polynomial Regression',       phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/polynomial-regression.html' },
  { id:'ridge-regression',          title:'Ridge Regression',            phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/ridge-regression.html' },
  { id:'lasso-regression',          title:'Lasso Regression',            phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/lasso-regression.html' },
  { id:'elasticnet-regression',     title:'ElasticNet Regression',       phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/elasticnet-regression.html' },
  { id:'regression-metrics',        title:'Regression Metrics',          phase:'Regression',  phaseId:'r', file:'topics/algorithms/regression/regression-metrics.html' },
  /* Algorithms — Classification */
  { id:'logistic-regression',   title:'Logistic Regression',    phase:'Classification', phaseId:'r', file:'topics/algorithms/classification/logistic-regression.html' },
  { id:'softmax-regression',    title:'Softmax Regression',     phase:'Classification', phaseId:'r', file:'topics/algorithms/classification/softmax-regression.html' },
  { id:'naive-bayes',           title:'Naive Bayes',            phase:'Classification', phaseId:'r', file:'topics/algorithms/classification/naive-bayes.html' },
  { id:'knn',                   title:'K-Nearest Neighbors',    phase:'Classification', phaseId:'r', file:'topics/algorithms/classification/knn.html' },
  { id:'svm',                   title:'Support Vector Machine', phase:'Classification', phaseId:'r', file:'topics/algorithms/classification/svm.html' },
  { id:'classification-metrics',title:'Classification Metrics', phase:'Classification', phaseId:'r', file:'topics/algorithms/classification/classification-metrics.html' },
  /* Algorithms — Trees */
  { id:'entropy',              title:'Entropy',                 phase:'Decision Trees', phaseId:'r', file:'topics/algorithms/trees/entropy.html' },
  { id:'information-gain',     title:'Information Gain',        phase:'Decision Trees', phaseId:'r', file:'topics/algorithms/trees/information-gain.html' },
  { id:'gini-impurity',        title:'Gini Impurity',           phase:'Decision Trees', phaseId:'r', file:'topics/algorithms/trees/gini-impurity.html' },
  { id:'decision-tree',        title:'Decision Tree',           phase:'Decision Trees', phaseId:'r', file:'topics/algorithms/trees/decision-tree.html' },
  { id:'regression-tree',      title:'Regression Tree',         phase:'Decision Trees', phaseId:'r', file:'topics/algorithms/trees/regression-tree.html' },
  { id:'tree-hyperparameters', title:'Tree Hyperparameters',    phase:'Decision Trees', phaseId:'r', file:'topics/algorithms/trees/tree-hyperparameters.html' },
  /* Algorithms — Ensembles */
  { id:'ensemble-theory',      title:'Ensemble Theory',         phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/ensemble-theory.html' },
  { id:'voting-classifier',    title:'Voting Classifier',       phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/voting-classifier.html' },
  { id:'bagging',              title:'Bagging',                 phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/bagging.html' },
  { id:'random-forest',        title:'Random Forest',           phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/random-forest.html' },
  { id:'adaboost',             title:'AdaBoost',                phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/adaboost.html' },
  { id:'gradient-boosting',    title:'Gradient Boosting',       phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/gradient-boosting.html' },
  { id:'xgboost',              title:'XGBoost',                 phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/xgboost.html' },
  { id:'stacking-blending',    title:'Stacking & Blending',     phase:'Ensembles', phaseId:'r', file:'topics/algorithms/ensembles/stacking-blending.html' },
  /* Algorithms — Unsupervised */
  { id:'kmeans',               title:'K-Means Clustering',      phase:'Unsupervised', phaseId:'r', file:'topics/algorithms/unsupervised/kmeans.html' },
  { id:'hierarchical',         title:'Hierarchical Clustering', phase:'Unsupervised', phaseId:'r', file:'topics/algorithms/unsupervised/hierarchical.html' },
  { id:'dbscan',               title:'DBSCAN',                  phase:'Unsupervised', phaseId:'r', file:'topics/algorithms/unsupervised/dbscan.html' },
  /* Real World */
  { id:'imbalanced-data',          title:'Imbalanced Data',         phase:'Real World', phaseId:'r', file:'topics/algorithms/realworld/imbalanced-data.html' },
  { id:'cross-validation',         title:'Cross Validation',        phase:'Real World', phaseId:'r', file:'topics/algorithms/realworld/cross-validation.html' },
  { id:'hyperparameter-tuning',    title:'Hyperparameter Tuning',   phase:'Real World', phaseId:'r', file:'topics/algorithms/realworld/hyperparameter-tuning.html' },
  { id:'overfitting-underfitting',  title:'Overfitting & Underfitting', phase:'Real World', phaseId:'r', file:'topics/algorithms/realworld/overfitting-underfitting.html' },
  /* Projects */
  { id:'house-price',      title:'House Price Prediction',  phase:'Projects', phaseId:'p', file:'topics/algorithms/projects/house-price.html' },
  { id:'titanic',          title:'Titanic Survival',        phase:'Projects', phaseId:'p', file:'topics/algorithms/projects/titanic.html' },
  { id:'customer-churn',   title:'Customer Churn',          phase:'Projects', phaseId:'p', file:'topics/algorithms/projects/customer-churn.html' },
  { id:'spam-detection',   title:'Spam Detection',          phase:'Projects', phaseId:'p', file:'topics/algorithms/projects/spam-detection.html' },
  { id:'fraud-detection',  title:'Fraud Detection',         phase:'Projects', phaseId:'p', file:'topics/algorithms/projects/fraud-detection.html' },
];

/* ── Sidebar phase config ───────────────────────────────────── */
const PHASES = [
  { id:1,   label:'Data Collection',      dot:'phase-1', topics: TOPICS.filter(t=>t.phaseId===1) },
  { id:2,   label:'EDA',                  dot:'phase-2', topics: TOPICS.filter(t=>t.phaseId===2) },
  { id:3,   label:'Data Cleaning',        dot:'phase-3', topics: TOPICS.filter(t=>t.phaseId===3) },
  { id:4,   label:'Feature Engineering',  dot:'phase-4', topics: TOPICS.filter(t=>t.phaseId===4) },
  { id:5,   label:'Feature Selection',    dot:'phase-5', topics: TOPICS.filter(t=>t.phaseId===5) },
  { id:'r', label:'Algorithms',           dot:'phase-r', topics: TOPICS.filter(t=>t.phaseId==='r') },
  { id:'p', label:'Projects',             dot:'phase-p', topics: TOPICS.filter(t=>t.phaseId==='p') },
];

/* ── Progress (localStorage) ────────────────────────────────── */
const Progress = {
  KEY: 'mllearn_completed',

  getAll() {
    try { return new Set(JSON.parse(localStorage.getItem(this.KEY) || '[]')); }
    catch { return new Set(); }
  },

  save(set) {
    try { localStorage.setItem(this.KEY, JSON.stringify([...set])); }
    catch {}
  },

  toggle(id) {
    const set = this.getAll();
    set.has(id) ? set.delete(id) : set.add(id);
    this.save(set);
    return set.has(id);
  },

  isComplete(id) { return this.getAll().has(id); },

  count() { return this.getAll().size; },

  pct() { return Math.round((this.count() / TOPICS.length) * 100); },
};

/* ── Theme ───────────────────────────────────────────────────── */
const Theme = {
  KEY: 'mllearn_theme',

  current() {
    return localStorage.getItem(this.KEY) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.KEY, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  },

  toggle() {
    this.apply(this.current() === 'dark' ? 'light' : 'dark');
  },
};

/* ── Sidebar ─────────────────────────────────────────────────── */
const Sidebar = {
  open: true,

  build() {
    const nav = document.getElementById('sb-nav');
    if (!nav) return;
    const completed = Progress.getAll();
    const currentId = document.body.dataset.topicId;

    nav.innerHTML = PHASES.map(phase => {
      const items = phase.topics.map(t => {
        const isDone = completed.has(t.id);
        const isActive = t.id === currentId;
        const depth = window.location.pathname.split('/').filter(Boolean).length;
        const prefix = depth <= 1 ? '' : '../'.repeat(depth - 1);
        return `<a class="sb-link${isActive ? ' active' : ''}${isDone ? ' done' : ''}"
                   href="${prefix}${t.file}"
                   data-id="${t.id}">${t.title}</a>`;
      }).join('');

      const num = typeof phase.id === 'number' ? phase.id : phase.label.charAt(0);
      return `
        <div class="sb-phase${phase.id === 1 ? ' open' : ''}" data-phase="${phase.id}">
          <button class="sb-phase-btn" onclick="Sidebar.togglePhase(this)">
            <span class="sb-phase-dot ${phase.dot}">${num}</span>
            <span class="sb-phase-label">${phase.label}</span>
            <span class="sb-phase-chevron">▶</span>
          </button>
          <div class="sb-items">${items}</div>
        </div>`;
    }).join('');
  },

  togglePhase(btn) {
    const phase = btn.closest('.sb-phase');
    const items = phase.querySelector('.sb-items');
    const isOpen = phase.classList.contains('open');

    if (isOpen) {
      items.style.maxHeight = items.scrollHeight + 'px';
      requestAnimationFrame(() => {
        items.style.maxHeight = '0';
        phase.classList.remove('open');
      });
    } else {
      phase.classList.add('open');
      items.style.maxHeight = items.scrollHeight + 'px';
      setTimeout(() => { items.style.maxHeight = ''; }, 350);
    }
  },

  toggle() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    const overlay = document.getElementById('sb-overlay');
    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      const isOpen = sidebar.classList.contains('open');
      sidebar.classList.toggle('open', !isOpen);
      sidebar.classList.toggle('closed', isOpen);
      overlay && overlay.classList.toggle('show', !isOpen);
    } else {
      this.open = !this.open;
      sidebar.classList.toggle('closed', !this.open);
      main && main.classList.toggle('full', !this.open);
    }
  },

  closeOnMobile() {
    if (window.innerWidth <= 900) {
      document.getElementById('sidebar')?.classList.remove('open');
      document.getElementById('sidebar')?.classList.add('closed');
      document.getElementById('sb-overlay')?.classList.remove('show');
    }
  },

  updateProgress() {
    const fill = document.getElementById('sb-bar-fill');
    const label = document.getElementById('sb-progress-label');
    if (fill) fill.style.width = Progress.pct() + '%';
    if (label) label.textContent = `${Progress.count()} / ${TOPICS.length}`;
  },
};

/* ── Search ──────────────────────────────────────────────────── */
const Search = {
  input: null,
  results: null,

  init() {
    this.input = document.getElementById('search-input');
    this.results = document.getElementById('search-results');
    if (!this.input) return;

    this.input.addEventListener('input', () => this.query(this.input.value.trim()));
    this.input.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.clear();
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.tb-search')) this.clear();
    });

    // Keyboard shortcut: / or Ctrl+K
    document.addEventListener('keydown', e => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== this.input) {
        e.preventDefault();
        this.input.focus();
      }
    });
  },

  query(q) {
    if (!q || q.length < 2) { this.clear(); return; }

    const lower = q.toLowerCase();
    const hits = TOPICS.filter(t =>
      t.title.toLowerCase().includes(lower) ||
      t.phase.toLowerCase().includes(lower)
    ).slice(0, 8);

    if (!hits.length) { this.clear(); return; }

    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth <= 1 ? '' : '../'.repeat(depth - 1);

    this.results.innerHTML = hits.map(t => {
      const hi = t.title.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
      return `<a class="sr-item" href="${prefix}${t.file}">
        ${hi}
        <span class="sr-phase">${t.phase}</span>
      </a>`;
    }).join('');

    this.results.classList.add('show');
  },

  clear() {
    if (this.results) this.results.classList.remove('show');
    if (this.input) this.input.value = '';
  },
};

/* ── TOC Spy ─────────────────────────────────────────────────── */
const TOCSpy = {
  init() {
    const tocLinks = document.querySelectorAll('.toc-item a');
    if (!tocLinks.length) return;

    const sections = [...document.querySelectorAll('.section[id]')];
    if (!sections.length) return;

    const topbar = document.getElementById('topbar');
    const offset = (topbar?.offsetHeight || 52) + 30;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.toc-item a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, {
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    });

    sections.forEach(s => observer.observe(s));
  },
};

/* ── Copy Buttons ────────────────────────────────────────────── */
function initCopyButtons() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const pre = btn.closest('.code-block')?.querySelector('pre');
      if (!pre) return;
      const text = pre.innerText || pre.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        btn.classList.add('ok');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 2000);
      } catch {
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });
}

/* ── Mark Complete Button ────────────────────────────────────── */
function initCompleteBtn() {
  const btn = document.getElementById('complete-btn');
  if (!btn) return;
  const id = document.body.dataset.topicId;
  if (!id) return;

  const update = () => {
    const done = Progress.isComplete(id);
    btn.classList.toggle('completed', done);
    btn.innerHTML = done
      ? '<span class="check">✓</span> Completed'
      : '<span class="check">○</span> Mark Complete';
  };

  update();

  btn.addEventListener('click', () => {
    Progress.toggle(id);
    update();
    Sidebar.updateProgress();
    Sidebar.build();
    updateHomeProgress();
  });
}

/* ── Pyodide Runner ──────────────────────────────────────────── */
const Pyodide = {
  instance: null,
  loading: false,

  async load() {
    if (this.instance) return this.instance;
    if (this.loading) {
      // Wait for existing load
      while (this.loading) await new Promise(r => setTimeout(r, 100));
      return this.instance;
    }

    this.loading = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
    document.head.appendChild(script);

    await new Promise((res, rej) => {
      script.onload = res;
      script.onerror = rej;
    });

    this.instance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
    });

    // Pre-install common packages
    await this.instance.loadPackage(['numpy', 'pandas', 'scikit-learn', 'matplotlib']);
    this.loading = false;
    return this.instance;
  },

  async run(code, outputEl) {
    outputEl.textContent = '⟳ Loading Python runtime…';
    outputEl.className = 'run-output';

    let py;
    try {
      py = await this.load();
    } catch {
      outputEl.textContent = '✗ Failed to load Pyodide. Check your connection.';
      outputEl.className = 'run-output error';
      return;
    }

    outputEl.textContent = '⟳ Running…';

    try {
      // Capture stdout
      py.runPython(`
import sys, io
_buf = io.StringIO()
sys.stdout = _buf
`);
      py.runPython(code);
      py.runPython('sys.stdout = sys.__stdout__');
      const out = py.runPython('_buf.getvalue()');
      outputEl.textContent = out || '(no output)';
      outputEl.className = 'run-output';
    } catch (err) {
      py.runPython('import sys; sys.stdout = sys.__stdout__').catch(() => {});
      outputEl.textContent = '✗ ' + (err.message || String(err));
      outputEl.className = 'run-output error';
    }
  },
};

function initRunButtons() {
  document.querySelectorAll('.run-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const box = btn.closest('.run-box');
      if (!box) return;
      const code = box.dataset.code || box.querySelector('pre')?.innerText || '';
      const output = box.querySelector('.run-output');
      if (!output || !code) return;

      btn.disabled = true;
      btn.textContent = '⟳ Running…';

      await Pyodide.run(code, output);

      btn.disabled = false;
      btn.innerHTML = '▶ Run';
    });
  });
}

/* ── Home page progress update ───────────────────────────────── */
function updateHomeProgress() {
  const fill = document.getElementById('home-progress-fill');
  const label = document.getElementById('home-progress-label');
  const completed = Progress.count();
  const total = TOPICS.length;

  if (fill) fill.style.width = Progress.pct() + '%';
  if (label) label.textContent = `${completed} of ${total} topics completed`;

  // Update stat card
  const statEl = document.getElementById('stat-completed');
  if (statEl) statEl.textContent = completed;

  // Update roadmap topic chips
  const completed_set = Progress.getAll();
  document.querySelectorAll('.rp-topic').forEach(chip => {
    const id = chip.dataset.id;
    if (id) chip.classList.toggle('done', completed_set.has(id));
  });
}

/* ── Roadmap accordion (home page) ──────────────────────────── */
function initRoadmap() {
  document.querySelectorAll('.rp-header').forEach(header => {
    header.addEventListener('click', () => {
      const phase = header.closest('.roadmap-phase');
      phase.classList.toggle('open');
    });
  });
}

/* ── Smooth scroll for TOC links ─────────────────────────────── */
function initTOCLinks() {
  document.querySelectorAll('.toc-item a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = (document.getElementById('topbar')?.offsetHeight || 52) + 16;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

/* ── Prev / Next navigation ──────────────────────────────────── */
function initPrevNext() {
  const id = document.body.dataset.topicId;
  if (!id) return;

  const idx = TOPICS.findIndex(t => t.id === id);
  if (idx === -1) return;

  const prevEl = document.getElementById('prev-card');
  const nextEl = document.getElementById('next-card');
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = depth <= 1 ? '' : '../'.repeat(depth - 1);

  if (prevEl && idx > 0) {
    const prev = TOPICS[idx - 1];
    prevEl.href = prefix + prev.file;
    prevEl.querySelector('.pn-title').textContent = prev.title;
    prevEl.querySelector('.pn-dir').textContent = '← Previous';
  } else if (prevEl) {
    prevEl.style.visibility = 'hidden';
  }

  if (nextEl && idx < TOPICS.length - 1) {
    const next = TOPICS[idx + 1];
    nextEl.href = prefix + next.file;
    nextEl.querySelector('.pn-title').textContent = next.title;
    nextEl.querySelector('.pn-dir').textContent = 'Next →';
  } else if (nextEl) {
    nextEl.style.visibility = 'hidden';
  }
}

/* ── Topbar title update ─────────────────────────────────────── */
function updateTopbarTitle() {
  const el = document.getElementById('tb-title');
  if (!el) return;
  const id = document.body.dataset.topicId;
  if (id) {
    const t = TOPICS.find(t => t.id === id);
    if (t) el.textContent = t.title;
  }
}

/* ── Page fade-in ────────────────────────────────────────────── */
function initPageEnter() {
  const content = document.getElementById('content');
  if (content) {
    content.style.opacity = '0';
    requestAnimationFrame(() => {
      content.style.transition = 'opacity 0.3s ease';
      content.style.opacity = '1';
    });
  }
}

/* ── Global Init ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  Theme.apply(Theme.current());

  // Sidebar
  Sidebar.build();
  Sidebar.updateProgress();

  // Open current phase in sidebar
  const currentId = document.body.dataset.topicId;
  if (currentId) {
    const t = TOPICS.find(t => t.id === currentId);
    if (t) {
      const phaseEl = document.querySelector(`.sb-phase[data-phase="${t.phaseId}"]`);
      if (phaseEl && !phaseEl.classList.contains('open')) {
        phaseEl.classList.add('open');
      }
    }
  }

  // Mobile overlay close
  document.getElementById('sb-overlay')?.addEventListener('click', () => {
    Sidebar.closeOnMobile();
  });

  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => Theme.toggle());

  // Sidebar toggle
  document.getElementById('sb-toggle')?.addEventListener('click', () => Sidebar.toggle());

  // Search
  Search.init();

  // TOC
  TOCSpy.init();
  initTOCLinks();

  // Code copy
  initCopyButtons();

  // Mark complete
  initCompleteBtn();

  // Run buttons
  initRunButtons();

  // Prev / Next
  initPrevNext();

  // Topbar title
  updateTopbarTitle();

  // Home
  updateHomeProgress();
  initRoadmap();

  // Fade in
  initPageEnter();
});

/* ── Expose globals needed by inline onclick handlers ─────────── */
window.Sidebar = Sidebar;
window.Theme = Theme;
window.MLLearn = { TOPICS, Progress };