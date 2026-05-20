(function () {
  var STORAGE_KEY = 'vt-theme';
  var DARK = 'dark-mode';

  var css = document.createElement('style');
  css.textContent = `
/* ═══════════════════════════════════════════════════════════
   VT Markets — Dark Mode (design.md tokens)
   Activated by body.dark-mode
   ═══════════════════════════════════════════════════════════ */

/* ── Page background (incl. browser chrome bg) ──────────── */
html:has(body.dark-mode) { background: #121212; }
body.dark-mode,
body.dark-mode .page {
  background: #121212;
}

/* ── Top navigation bar ─────────────────────────────────── */
body.dark-mode .tn {
  background: rgba(29,29,33,0.85);
  border-bottom-color: rgba(255,255,255,0.08);
  box-shadow: 0 1px 0 rgba(255,255,255,0.04);
}

/* ── Logo swap ──────────────────────────────────────────── */
body.dark-mode .tn-logo-light { display: none !important; }
body.dark-mode .tn-logo-dark  { display: block !important; }

/* ── Ticker strip ───────────────────────────────────────── */
body.dark-mode .ti { border-right-color: #2D3033; }
body.dark-mode .ti:hover { background: #26262B; }
body.dark-mode .ti-s { color: #FFFFFF; }

/* ── Top-right account area ─────────────────────────────── */
body.dark-mode .tn-acct:hover { background: #26262B; }
body.dark-mode .tn-acct-txt { color: #FFFFFF; }
body.dark-mode .tn-acct svg path { stroke: #C2C7D0; }
body.dark-mode .tn-acct-menu { background: #26262B; box-shadow: 0 8px 32px rgba(0,0,0,.5); }
body.dark-mode .tn-acct-item { color: #FFFFFF; }
body.dark-mode .tn-acct-item:hover { background: #34343B; }
body.dark-mode .tn-acct-item .tn-acct-check path { stroke: #00F0FF; }
body.dark-mode .tn-deposit { background: #0A36C7; }
body.dark-mode .tn-ic { opacity: 1; }
body.dark-mode .tn-ic-img:not(.tn-ic-theme) {
  filter: brightness(0) invert(1) opacity(0.75);
}
body.dark-mode .tn-ic:hover .tn-ic-img:not(.tn-ic-theme) {
  filter: brightness(0) invert(1) opacity(1);
}


/* ── Left watchlist panel ───────────────────────────────── */
body.dark-mode .pl {
  background: #1D1D21;
}
body.dark-mode .pl-markettab { border-bottom-color: #2D3033; }
body.dark-mode .pl-mt { color: #7A8699; }
body.dark-mode .pl-mt.active { color: #FFFFFF; }

body.dark-mode .pl-search {
  border-color: #2D3033;
  background: #26262B;
}
body.dark-mode .pl-search input { color: #FFFFFF; }
body.dark-mode .pl-search input::placeholder { color: #515867; }
body.dark-mode .pl-search svg circle,
body.dark-mode .pl-search svg path { stroke: #515867; }

body.dark-mode .pl-wltabs-wrap { border-bottom-color: #2D3033; }
body.dark-mode .wltab { color: #7A8699; }
body.dark-mode .wltab.active { color: #00F0FF; border-bottom-color: #00F0FF; }

body.dark-mode .pl-colhdr { border-bottom-color: #2D3033; }
body.dark-mode .plh { color: #C2C7D0; }
body.dark-mode .plh svg path { stroke: #C2C7D0; }

body.dark-mode .mrow { background: #1D1D21; }
body.dark-mode .mrow:nth-child(even) { background: #26262B; }
body.dark-mode .mrow:hover,
body.dark-mode .mrow.active { background: rgba(10,54,199,0.12); }
body.dark-mode .sym-n { color: #FFFFFF; }
body.dark-mode .sym-s { color: #7A8699; }
body.dark-mode .sym-s.dark { color: #C2C7D0; }
body.dark-mode .mrow-sell,
body.dark-mode .mrow-buy { color: #FFFFFF; }
body.dark-mode .mrow-spread { color: #7A8699; }

/* ── Center overview bar ────────────────────────────────── */
body.dark-mode .co {
  background: #1D1D21;
  border-bottom: 1px solid #2D3033;
}
body.dark-mode .co-sym-n { color: #FFFFFF; }
body.dark-mode .co-sym-s { color: #7A8699; }
body.dark-mode .co-sl { color: #7A8699; }
body.dark-mode .co-sv { color: #C2C7D0; }
body.dark-mode .co-menu span { background: #515867; }
body.dark-mode .co-dot { background: #515867; }

/* ── Center chart card ──────────────────────────────────── */
body.dark-mode .cc {
  background: #1D1D21;
}
body.dark-mode .cc-l1tabs { border-bottom-color: #2D3033; }
body.dark-mode .cc-l1tab { color: #7A8699; }
body.dark-mode .cc-l1tab.active { color: #00F0FF; border-bottom-color: #00F0FF; }

body.dark-mode .cc-toolbar { background: #1D1D21; }
body.dark-mode .tf3-btn { color: #7A8699; }
body.dark-mode .tf3-btn:hover:not(.active) { background: rgba(0,240,255,0.08); color: #00F0FF; }
body.dark-mode .tf3-btn.active { background: rgba(0,240,255,0.08); color: #00F0FF; }

body.dark-mode .cc-ind-ic:hover,
body.dark-mode .cc-ind-ic.active { background: rgba(0,240,255,0.08); }
body.dark-mode .cc-ind-ic:hover svg path,
body.dark-mode .cc-ind-ic:hover svg rect { stroke: #00F0FF; }
body.dark-mode .cc-ind-ic:hover svg [fill="#7A8699"] { fill: #00F0FF; }
body.dark-mode .cc-depth { color: #7A8699; }

body.dark-mode .cc-tools {
  background: #1D1D21;
  border-right-color: #2D3033;
}
body.dark-mode .cc-tool:hover { background: #26262B; }
body.dark-mode .cc-tool svg,
body.dark-mode .cc-tools img {
  filter: brightness(0) invert(0.75);
}

body.dark-mode .cc-canvas,
body.dark-mode .cc-chart-col { background: #1D1D21; }

body.dark-mode .cc-xaxis { border-top-color: #2D3033; }
body.dark-mode .cc-xaxis-lbl { color: #7A8699; }
body.dark-mode .cc-range { border-top-color: #1A1A1E; }
body.dark-mode .cc-range-btn { color: #7A8699; }
body.dark-mode .cc-range-btn:hover { background: #26262B; color: #FFFFFF; }
body.dark-mode .cc-range-btn.active { color: #00F0FF; }
body.dark-mode .cc-range-cal:hover { background: #26262B; }
body.dark-mode .cc-range-cal svg path,
body.dark-mode .cc-range-cal svg rect { stroke: #C2C7D0; }
body.dark-mode .cc-range-clock { color: #C2C7D0; }
body.dark-mode .cc-range-r .cc-range-btn.active { color: #ff8a3d; }
body.dark-mode .cc-yaxis {
  border-left-color: #2D3033;
}
body.dark-mode .cc-yaxis span { color: #7A8699; }

/* Dropdowns inside chart */
body.dark-mode .cc-ind-dropdown {
  background: #26262B;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}
body.dark-mode .cc-ind-item:hover,
body.dark-mode .cc-chk-item:hover { background: #34343B; }
body.dark-mode .cc-ind-item-txt { color: #C2C7D0; }
body.dark-mode .cc-ind-item.sel .cc-ind-item-txt { color: #00F0FF; }
body.dark-mode .cc-chk-txt { color: #C2C7D0; }
body.dark-mode .cc-chk-item.checked .cc-chk-txt { color: #00F0FF; }
/* Dark mode: replace brand-blue checkbox image with green via CSS filter */
body.dark-mode .cc-chk-item.checked .cc-chk-box {
  filter: brightness(0) saturate(100%) invert(58%) sepia(96%) saturate(414%) hue-rotate(102deg) brightness(96%) contrast(102%);
}
body.dark-mode .cc-chk-divider { background: #2D3033; }

/* Info panel (chart Info tab) */
body.dark-mode .cc-info { background: #1D1D21; }
body.dark-mode .cc-info-title { color: #FFFFFF; }
body.dark-mode .cc-info-lbl { color: #7A8699; }
body.dark-mode .cc-info-val { color: #C2C7D0; }

/* Order bar overlay on chart */
body.dark-mode .ob {
  background: #26262B;
  border-color: #2D3033;
}
body.dark-mode .ob-e { background: #26262B; border-right-color: #2D3033; }
body.dark-mode .ob-mid {
  background: #26262B;
  border-left-color: #2D3033;
  border-right-color: #2D3033;
}
body.dark-mode .ob-mid-l,
body.dark-mode .ob-mid-v { color: #FFFFFF; }
body.dark-mode .ob-c {
  background: #26262B;
  border-left-color: #2D3033;
}
body.dark-mode .ob-c svg path { stroke: #7A8699; }

/* ── Right order panel ──────────────────────────────────── */
body.dark-mode .rp {
  background: #1D1D21;
}
body.dark-mode .rp-spread {
  background: #1D1D21;
  border-color: #2D3033;
  color: #7A8699;
}
body.dark-mode .rp-buy { background: #26262B; }
body.dark-mode .rp-buy .rp-sv,
body.dark-mode .rp-buy .rp-sl { color: #C2C7D0; }

body.dark-mode .rp-countdown { color: #515867; }
body.dark-mode .rp-slider {
  background: linear-gradient(to right, #00b565 57%, #ff2c40 57%);
}
body.dark-mode .rp-slider::-webkit-slider-thumb {
  background: #26262B;
  border-color: #515867;
}

body.dark-mode .rp-otabs { border-bottom-color: #2D3033; }
body.dark-mode .rotab { color: #7A8699; }
body.dark-mode .rotab.active { color: #00F0FF; border-bottom-color: #00F0FF; }

body.dark-mode .rp-input-box {
  border-color: #2D3033;
  background: #26262B;
}
body.dark-mode .rp-input-box.error { border-color: #FF2C40; }
body.dark-mode .rp-input-box.filled {
  background: #34343B;
  border-color: #34343B;
}
body.dark-mode .rp-market-fill {
  background: #26262B;
  color: #515867;
}
body.dark-mode .rp-input-lbl { color: #7A8699; }
body.dark-mode .rp-input-lbl.grey { color: #515867; }
body.dark-mode .rp-input-val { color: #FFFFFF; }
body.dark-mode .rp-stepper,
body.dark-mode .rp-step { background: #34343B; }
body.dark-mode .rp-step { border-color: #2D3033; color: #7A8699; }
body.dark-mode .rp-step:hover { background: #3D3D44; }
body.dark-mode .rp-unit-drop {
  color: #FFFFFF;
  border-left-color: #2D3033;
}
body.dark-mode .rp-unit-dropdown {
  background: #26262B;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
body.dark-mode .rp-unit-item {
  color: #FFFFFF;
  border-bottom-color: #2D3033;
}
body.dark-mode .rp-unit-item:hover {
  background: #34343B;
}
body.dark-mode .rp-hint { color: #515867; }
body.dark-mode .rp-cb-lbl { color: #FFFFFF; }

body.dark-mode .rp-range-track { background: #34343B; }
body.dark-mode .rp-range-dot { background: #34343B; }
body.dark-mode .rp-range-tick { background: #515867; }
body.dark-mode .rp-range-tick.filled { background: #00F0FF; }
body.dark-mode .rp-range-fill { background: #00F0FF; }
body.dark-mode .rp-range-thumb { background: #00F0FF; }
body.dark-mode .rp-range-thumb.dragging { box-shadow: 0 0 0 4px rgba(0,240,255,.2); }
body.dark-mode .rp-range-dot.active { background: #00F0FF; }
body.dark-mode .rp-range-labels .rp-rl-0,
body.dark-mode .rp-range-labels .rp-rl-max { color: #515867; }

body.dark-mode .rp-tpsl-tooltip {
  background: #C2C7D0;
  color: #121212;
}
body.dark-mode .rp-info { border-top-color: #2D3033; }
body.dark-mode .rp-ilbl { color: #7A8699; }
body.dark-mode .rp-ival { color: #C2C7D0; }

/* Inline border overrides inside .rp inputs */
body.dark-mode .rp-input-box [style*="border-right: 1px solid #e8e9ea"],
body.dark-mode .rp-input-box [style*="border-right:1px solid #e8e9ea"],
body.dark-mode .rp-input-box [style*="border-left: 1px solid #e8e9ea"],
body.dark-mode .rp-input-box [style*="border-left:1px solid #e8e9ea"] {
  border-color: #2D3033 !important;
}

/* ── Assets panel ───────────────────────────────────────── */
body.dark-mode .ap {
  background: #1D1D21;
}
body.dark-mode .ap-hdr { border-bottom-color: #2D3033; }
body.dark-mode .ap-title { color: #FFFFFF; }
body.dark-mode .ap-lbl {
  color: #7A8699;
  text-decoration-color: #7A8699;
}
body.dark-mode .ap-val { color: #C2C7D0; }
body.dark-mode .ap-hdr span[style*="color:#1e1e1e"] { color: #C2C7D0 !important; }

/* ── Bottom positions panel ─────────────────────────────── */
body.dark-mode .pb {
  background: #1D1D21;
}
body.dark-mode .pb-tabs { border-bottom-color: #2D3033; }
body.dark-mode .ptab { color: #7A8699; }
body.dark-mode .ptab.active { color: #00F0FF; border-bottom-color: #00F0FF; }

body.dark-mode .pb-hide { color: #C2C7D0; }
body.dark-mode .pb-hide input[type="checkbox"]{background:#1D1D21;border-color:#2D3033;}
body.dark-mode .pb-hide input[type="checkbox"]:checked{background:#00b565;border-color:#00b565;}
body.dark-mode .pb-closeall {
  background: #26262B;
  border-color: #2D3033;
  color: #C2C7D0;
}
body.dark-mode .pb-closeall svg path { stroke: #C2C7D0; }

body.dark-mode .pb-hdr {
  border-bottom-color: #2D3033;
  color: #7A8699;
}
body.dark-mode .ph { color: #7A8699; }
body.dark-mode .ph.bold { color: #C2C7D0; }

body.dark-mode .prow {
  border-bottom-color: #2D3033;
  color: #C2C7D0;
}
body.dark-mode .prow:hover { background: rgba(10,54,199,0.08); }
body.dark-mode .pd { color: #C2C7D0; }
body.dark-mode .pd-time { color: #7A8699; }

body.dark-mode .btn-cb {
  background: #26262B;
  color: #C2C7D0;
  border: 1px solid #2D3033;
}
body.dark-mode .btn-cb:hover { background: #34343B; }

/* Right close panel */
body.dark-mode .pb-rpanel {
  background: #1D1D21;
  border-left-color: #2D3033;
}
body.dark-mode .pb-rpanel-hdr { border-bottom-color: #2D3033; }
body.dark-mode .pb-rpanel-row { border-bottom-color: #2D3033; }
body.dark-mode .pb-rph { color: #7A8699; }
body.dark-mode .pb-rph.bold { color: #C2C7D0; }
body.dark-mode .pb-input-sm {
  background: #26262B;
  border-color: #2D3033;
  color: #C2C7D0;
}

/* ── Signal bar ─────────────────────────────────────────── */
body.dark-mode .sb {
  background: #1D1D21;
  border-top-color: #2D3033;
}

/* ── Guide tooltip ──────────────────────────────────────── */
body.dark-mode .guide-tooltip {
  background: #26262B;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}
body.dark-mode .guide-tooltip-title { color: #FFFFFF; }
body.dark-mode .guide-tooltip-desc { color: #C2C7D0; }
body.dark-mode .guide-tooltip-progress { color: #7A8699; }
body.dark-mode .guide-btn-skip { color: #7A8699; }
body.dark-mode .guide-btn-skip:hover { background: #34343B; color: #FFFFFF; }

/* ── Scrollbar ──────────────────────────────────────────── */
body.dark-mode ::-webkit-scrollbar-thumb { background: #515867; }

/* ── SVG icons — inline strokes fallback ────────────────── */
body.dark-mode .co-sym-ic img,
body.dark-mode .cc-l1tabs-r img,
body.dark-mode .cc-ind-ic img {
  filter: brightness(0) invert(0.65);
}
body.dark-mode .cc-ind-ic:hover > img,
body.dark-mode .cc-ind-ic.active > img {
  filter: brightness(0) saturate(100%) invert(86%) sepia(43%) saturate(2845%) hue-rotate(132deg) brightness(105%);
}
`;
  document.head.appendChild(css);

  function isDark() {
    return document.body.classList.contains(DARK);
  }

  var LIGHT_CHART = { bg:'#fff',        grid:'#f0f1f3', label:'#7a8699', crosshair:'#adb5bd', priceLabelBg:'#282d34', priceLabelTxt:'#fff'    };
  var DARK_CHART  = { bg:'#1D1D21',     grid:'#2D3033', label:'#7A8699', crosshair:'#515867', priceLabelBg:'#26262B', priceLabelTxt:'#C2C7D0' };

  function syncChart(dark) {
    var tc = window.tvChartColors;
    if (!tc) return;
    var src = dark ? DARK_CHART : LIGHT_CHART;
    Object.assign(tc, src);
    if (typeof window.tvRedraw === 'function') window.tvRedraw();
  }

  function applyTheme(dark) {
    document.body.classList.toggle(DARK, dark);
    syncChart(dark);
    var logo = document.getElementById('tnLogoImg');
    if (logo) logo.src = dark ? 'images/vtlogodark.png' : 'images/vtlogo.png';
  }

  applyTheme(false);

  window.toggleTheme = function () {
    applyTheme(!isDark());
  };

  /* ── Click detection via capture phase ──────────────────────
     transform:scale() on position:fixed moves layout hit-testing
     out of reach when viewport < 1920px. Instead we listen on
     document in capture phase (fires before any overlay handler)
     and compare clientX/Y against the icon's visual bounding rect.
  ────────────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    if (e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom) {
      e.stopPropagation();
      applyTheme(!isDark());
    }
  }, true /* capture */);
})();
