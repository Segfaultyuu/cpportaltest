(function () {
  /* ── Inject CSS ─────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .topbar {
      position: fixed; top: 0; left: 240px; right: 0;
      height: 60px; background: rgba(255,255,255,0.45);
      backdrop-filter: blur(12px); border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: flex-end;
      padding: 0 24px; gap: 20px; z-index: 90;
      transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body.sidebar-collapsed .topbar { left: 64px; }

    .topbar-hamburger {
      display: none; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 8px; cursor: pointer;
      border: none; background: transparent; margin-right: auto;
      color: var(--text-secondary); transition: background 0.15s;
    }
    .topbar-hamburger:hover { background: var(--bg-2); }

    .topbar-mobile-logo {
      display: none; align-items: center;
      margin-right: auto; height: 24px;
    }
    .topbar-mobile-logo img { height: 24px; width: auto; }

    .topbar-brand {
      display: none; align-items: center; height: 24px; flex-shrink: 0;
    }
    .topbar-brand img { height: 24px; width: auto; }

    .topbar-btn-outline {
      display: flex; align-items: center; justify-content: center;
      height: 36px; padding: 0 14px; border-radius: 8px;
      font-size: 13px; font-weight: 500; cursor: pointer;
      white-space: nowrap; transition: background 0.15s; border: none;
    }

    .topbar-webtrader { background: var(--blue-light); color: var(--blue); }

    .topbar-deposit {
      background: linear-gradient(-74deg, #0a36c7 4%, #1e68f6 105%);
      color: #fff; font-weight: 600;
    }

    /* IB-only: account switcher + theme toggle */
    body.ib-mode .topbar .topbar-webtrader,
    body.ib-mode .topbar .topbar-deposit,
    body.ib-mode .topbar .topbar-webtrader-mobile { display: none !important; }
    body:not(.ib-mode) .topbar-acct-switcher,
    body:not(.ib-mode) .topbar-theme-toggle { display: none !important; }

    .topbar-acct-switcher {
      display: flex; align-items: center; gap: 8px;
      height: 36px; padding: 0 14px;
      border: 1px solid var(--border); border-radius: 8px;
      background: #fff; cursor: pointer; flex-shrink: 0;
      font-size: 13px; font-weight: 500; color: var(--text-primary);
      position: relative;
    }
    .topbar-acct-switcher:hover { border-color: var(--blue); }
    .topbar-acct-flag { width: 18px; height: 18px; border-radius: 50%; background-size: cover; background-position: center; flex-shrink: 0; }
    .topbar-acct-caret { color: var(--text-secondary); flex-shrink: 0; }
    .topbar-acct-menu {
      display: none; position: absolute; top: calc(100% + 8px); right: 0;
      min-width: 280px; background: #fff;
      border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.16);
      padding: 6px 0; z-index: 300;
    }
    .topbar-acct-menu.open { display: block; }
    .topbar-acct-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; cursor: pointer; font-size: 13px; color: var(--text-primary);
    }
    .topbar-acct-item:hover { background: var(--bg-2); }
    .topbar-acct-item .topbar-acct-check { margin-left: auto; color: var(--blue); visibility: hidden; flex-shrink: 0; }
    .topbar-acct-item.active .topbar-acct-check { visibility: visible; }

    .topbar-theme-toggle {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 8px; cursor: pointer; color: var(--text-primary);
      border: none; background: transparent; transition: background 0.15s;
    }
    .topbar-theme-toggle:hover { background: var(--bg-2); }
    .topbar-theme-toggle .sun { display: none; }
    body.dark-mode .topbar-theme-toggle .moon { display: none; }
    body.dark-mode .topbar-theme-toggle .sun { display: block; }

    .topbar-icon-btn {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 8px; cursor: pointer; color: var(--text-secondary);
      transition: background 0.15s; border: none; background: transparent;
    }

    .topbar-icon-btn:hover { background: var(--bg-2); }

    .topbar-lang-wrap { position: relative; }

    .topbar-lang-dropdown {
      display: none; position: absolute; top: calc(100% + 10px); right: 0;
      width: 220px; max-height: 420px; overflow-y: auto;
      background: #fff; border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
      z-index: 300;
    }
    .topbar-lang-dropdown.open { display: block; }

    .topbar-lang-dropdown::-webkit-scrollbar { width: 4px; }
    .topbar-lang-dropdown::-webkit-scrollbar-track { background: transparent; }
    .topbar-lang-dropdown::-webkit-scrollbar-thumb { background: #e8e9ea; border-radius: 2px; }

    .topbar-lang-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 16px; cursor: pointer; transition: background 0.12s;
      border-bottom: 1px solid #f4f5f6;
    }
    .topbar-lang-item:last-child { border-bottom: none; }
    .topbar-lang-item:hover { background: #f4f6f9; }
    .topbar-lang-item.active { background: #e8f1ff; }
    .topbar-lang-flag { font-size: 18px; line-height: 1; flex-shrink: 0; }
    .topbar-lang-name { font-size: 14px; font-weight: 500; color: #282d34; flex: 1; }
    .topbar-lang-check { flex-shrink: 0; color: #0a36c7; }
    .topbar-lang-item:not(.active) .topbar-lang-check { display: none; }

    .topbar-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; overflow: hidden; border: none; padding: 0;
    }

    .topbar-avatar img { width: 32px; height: 32px; object-fit: cover; display: block; border-radius: 50%; }

    .topbar-toggle {
      display: flex; background: #ffffff; border-radius: 12px;
      padding: 4px; gap: 0; height: 40px; width: 136px; flex-shrink: 0;
    }

    .topbar-toggle-btn {
      height: 32px; width: 64px; padding: 0 16px; border-radius: 8px;
      font-size: 14px; font-weight: 400; cursor: pointer;
      transition: background 0.15s;
      display: flex; align-items: center; justify-content: center;
      white-space: nowrap; border: none; background: transparent;
    }

    .topbar-toggle-btn.active { background: var(--blue-light); font-weight: 600; color: var(--blue); }
    .topbar-toggle-btn:not(.active) { color: var(--text-secondary); }

    .topbar-download {
      display: none; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 8px; cursor: pointer;
      border: none; background: transparent;
      color: var(--text-primary, #282d34);
    }
    .topbar-download:hover { background: var(--bg-2); }
    .topbar-download svg { display: block; }

    .topbar-right-icons { display: flex; align-items: center; gap: 16px; }

    .topbar-webtrader-mobile {
      display: none; align-items: center; justify-content: center;
      padding: 0 8px; height: 36px; border-radius: 8px;
      border: none; cursor: pointer; flex-shrink: 0;
      background: var(--Background-Background-bg-Blue, #E8F1FF);
      color: #0A36C7; font-size: 13px; font-weight: 500; white-space: nowrap;
    }

    .topbar-avatar-wrap { position: relative; }

    .topbar-dropdown {
      display: none; position: fixed; top: 68px; right: 24px;
      width: 320px; background: #fff; border-radius: 10px;
      box-shadow: 8px 8px 30px 0px rgba(0,0,0,0.1);
      z-index: 200; overflow: hidden;
    }
    .topbar-dropdown.open { display: block; }

    .topbar-dd-header {
      display: flex; align-items: center; gap: 16px;
      padding: 24px 24px 20px; cursor: pointer;
    }
    .topbar-dd-header:hover { background: var(--bg-2); }
    .topbar-dd-av {
      width: 48px; height: 48px; border-radius: 50%;
      overflow: hidden; flex-shrink: 0;
    }
    .topbar-dd-av img { width: 48px; height: 48px; object-fit: cover; display: block; }
    .topbar-dd-info { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
    .topbar-dd-name { font-size: 18px; font-weight: 600; color: #282d34; }
    .topbar-dd-nick { font-size: 13px; color: var(--text-secondary); }
    .topbar-dd-uid { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); }
    .topbar-dd-uid svg { cursor: pointer; opacity: 0.7; flex-shrink: 0; }
    .topbar-dd-arrow { color: var(--text-secondary); flex-shrink: 0; }

    .topbar-dd-divider { height: 1px; background: var(--border); }

    .topbar-dd-item {
      display: flex; align-items: center; gap: 12px;
      height: 64px; padding: 0 24px;
      cursor: pointer; transition: background 0.15s;
    }
    .topbar-dd-item:hover { background: #f4f6f9; }
    .topbar-dd-item--active { background: #E8F1FF; }
    .topbar-dd-item--active:hover { background: #dae8ff; }
    .topbar-dd-icon {
      width: 24px; height: 24px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: var(--text-secondary);
    }
    .topbar-dd-label { font-size: 16px; font-weight: 500; color: #282d34; }

    @media (max-width: 768px) {
      .topbar { left: 0 !important; padding: 0 16px; gap: 10px; }
      .topbar-hamburger { display: flex !important; }
      .topbar-webtrader { display: none !important; }
      .topbar-deposit { display: none !important; }
      .topbar-toggle { display: none !important; }
      .topbar-mobile-logo { display: none !important; }
      .topbar-brand { display: none !important; }
      .topbar-avatar { display: none !important; }
      .topbar-avatar-wrap { display: none !important; }
      .topbar-right-icons { flex: 1; justify-content: flex-end; gap: 12px; }
      .topbar-lang-wrap { display: none !important; }
      .topbar-webtrader-mobile { display: flex !important; }
      .topbar-download { display: flex !important; }
      .topbar-dropdown { display: none !important; }
      body.ib-mode .topbar-acct-switcher {
        height: 32px; padding: 0 10px; gap: 6px;
        font-size: 12px; max-width: 180px;
      }
      body.ib-mode .topbar-acct-switcher #topbar-acct-label {
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;
      }
      body.ib-mode .topbar-acct-flag { width: 16px; height: 16px; }
      body.ib-mode .topbar-icon-btn[title="Coupons"],
      body.ib-mode .topbar-download { display: none !important; }
    }

    /* ── Dark theme (toggled via topbar-theme-toggle) ───────── */
    body.dark-mode .topbar {
      background: rgba(29,29,33,0.85);
      border-bottom-color: #2D3033;
    }
    body.dark-mode .topbar-hamburger { color: #C2C7D0; }
    body.dark-mode .topbar-hamburger:hover { background: #26262B; }
    body.dark-mode .topbar-icon-btn { color: #C2C7D0; }
    body.dark-mode .topbar-icon-btn:hover { background: #26262B; }
    body.dark-mode .topbar-icon-btn img,
    body.dark-mode .topbar-language img { filter: invert(0.85) hue-rotate(180deg); }
    body.dark-mode .topbar-download { color: #C2C7D0; }
    body.dark-mode .topbar-download:hover { background: #26262B; color: #FFFFFF; }
    body.dark-mode .topbar-acct-switcher {
      background: #26262B; border-color: #2D3033; color: #FFFFFF;
    }
    body.dark-mode .topbar-acct-switcher:hover { border-color: #00F0FF; }
    body.dark-mode .topbar-acct-caret { color: #C2C7D0; }
    body.dark-mode .topbar-acct-menu {
      background: #26262B; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    body.dark-mode .topbar-acct-item { color: #FFFFFF; }
    body.dark-mode .topbar-acct-item:hover { background: #34343B; }
    body.dark-mode .topbar-acct-item .topbar-acct-check { color: #00F0FF; }
    body.dark-mode .topbar-theme-toggle { color: #FFFFFF; }
    body.dark-mode .topbar-theme-toggle:hover { background: #26262B; }
    body.dark-mode .topbar-lang-dropdown {
      background: #26262B;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
    }
    body.dark-mode .topbar-lang-dropdown::-webkit-scrollbar-thumb { background: #34343B; }
    body.dark-mode .topbar-lang-item { color: #FFFFFF; border-bottom-color: #2D3033; }
    body.dark-mode .topbar-lang-item:hover { background: #34343B; }
    body.dark-mode .topbar-lang-item.active { background: rgba(0,240,255,0.10); color: #00F0FF; }
    body.dark-mode .topbar-lang-item .topbar-lang-check { color: #00F0FF; }
    body.dark-mode .topbar-toggle { background: #26262B; }
    body.dark-mode .topbar-toggle-btn:not(.active) { color: #C2C7D0; }
    body.dark-mode .topbar-toggle-btn.active {
      background: rgba(0,240,255,0.10); color: #00F0FF;
    }
    body.dark-mode .topbar-dropdown {
      background: #26262B; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    body.dark-mode .topbar-dd-item:hover { background: #34343B; }
    body.dark-mode .topbar-dd-item--active { background: rgba(0,240,255,0.10); }
    body.dark-mode .topbar-dd-item--active:hover { background: rgba(0,240,255,0.18); }
    body.dark-mode .topbar-dd-icon { color: #C2C7D0; }
    body.dark-mode .topbar-dd-label { color: #FFFFFF; }
    body.dark-mode .topbar-webtrader { background: rgba(0,240,255,0.10); color: #00F0FF; }
  `;
  document.head.appendChild(style);

  /* ── Build HTML ──────────────────────────────────────────── */
  const html = `
    <header class="topbar">
      <div class="topbar-brand"><img src="images/vtlogo.png" alt="VT Markets" /></div>
      <button class="topbar-hamburger" id="topbar-hamburger" aria-label="Menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/>
        </svg>
      </button>
      <div class="topbar-mobile-logo"><img src="images/logo.png" alt="Logo" /></div>
      <div class="topbar-btn-outline topbar-webtrader">Webtrader+</div>
      <div class="topbar-btn-outline topbar-deposit">Deposit</div>
      <div class="topbar-right-icons">
        <button class="topbar-webtrader-mobile">Webtrader+</button>
        <div class="topbar-acct-switcher" id="topbar-acct-btn">
          <div class="topbar-acct-flag" style="background-image:url('images/country-flag.png');"></div>
          <span id="topbar-acct-label">123134 (1,234.56 USD)</span>
          <svg class="topbar-acct-caret" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div class="topbar-acct-menu" id="topbar-acct-menu">
            <div class="topbar-acct-item active" data-acct="123134">
              <div class="topbar-acct-flag" style="background-image:url('images/country-flag.png');"></div>
              <span>123134 (1,234.56 USD)</span>
              <svg class="topbar-acct-check" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="topbar-acct-item" data-acct="987654">
              <div class="topbar-acct-flag" style="background-image:url('images/country-flag.png');"></div>
              <span>987654 (12,540.00 USD)</span>
              <svg class="topbar-acct-check" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="topbar-acct-item" data-acct="456789">
              <div class="topbar-acct-flag" style="background-image:url('images/country-flag.png');"></div>
              <span>456789 (820.45 JPY)</span>
              <svg class="topbar-acct-check" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </div>
        <div class="topbar-icon-btn" title="Coupons"><img src="images/imgCoupons.svg" width="20" height="20" alt="Coupons" /></div>
        <div class="topbar-lang-wrap">
          <div class="topbar-icon-btn topbar-language" id="topbar-lang-btn" title="Language"><img src="images/imgIcoLanguage.svg" width="20" height="20" alt="Language" /></div>
          <div class="topbar-lang-dropdown" id="topbar-lang-dropdown">
            <div class="topbar-lang-item active" data-lang="en"><span class="topbar-lang-flag">🇬🇧</span><span class="topbar-lang-name">English</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="zh-cn"><span class="topbar-lang-flag">🇨🇳</span><span class="topbar-lang-name">简体中文</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="zh-tw"><span class="topbar-lang-flag">🇭🇰</span><span class="topbar-lang-name">繁體中文</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="fr"><span class="topbar-lang-flag">🇫🇷</span><span class="topbar-lang-name">Français</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="ko"><span class="topbar-lang-flag">🇰🇷</span><span class="topbar-lang-name">한국어</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="ja"><span class="topbar-lang-flag">🇯🇵</span><span class="topbar-lang-name">日本語</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="th"><span class="topbar-lang-flag">🇹🇭</span><span class="topbar-lang-name">ภาษาไทย</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="vi"><span class="topbar-lang-flag">🇻🇳</span><span class="topbar-lang-name">Tiếng Việt</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="es"><span class="topbar-lang-flag">🇪🇸</span><span class="topbar-lang-name">Español (Intl.)</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="pt"><span class="topbar-lang-flag">🇵🇹</span><span class="topbar-lang-name">Português (Intl.)</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="de"><span class="topbar-lang-flag">🇩🇪</span><span class="topbar-lang-name">Deutsch</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="id"><span class="topbar-lang-flag">🇮🇩</span><span class="topbar-lang-name">Bahasa Indonesia</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="ar"><span class="topbar-lang-flag">🇦🇪</span><span class="topbar-lang-name">عربي</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="ru"><span class="topbar-lang-flag">🇷🇺</span><span class="topbar-lang-name">Русский</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="mn"><span class="topbar-lang-flag">🇲🇳</span><span class="topbar-lang-name">Монгол</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="km"><span class="topbar-lang-flag">🇰🇭</span><span class="topbar-lang-name">ខ្មែរ</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="nl"><span class="topbar-lang-flag">🇳🇱</span><span class="topbar-lang-name">Nederlands</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="it"><span class="topbar-lang-flag">🇮🇹</span><span class="topbar-lang-name">Italian</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="ms"><span class="topbar-lang-flag">🇲🇾</span><span class="topbar-lang-name">Malaysia</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="tl"><span class="topbar-lang-flag">🇵🇭</span><span class="topbar-lang-name">Tagalog</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="uz"><span class="topbar-lang-flag">🇺🇿</span><span class="topbar-lang-name">Uzbekistan</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="es-br"><span class="topbar-lang-flag">🇧🇷</span><span class="topbar-lang-name">Español (Brasil)</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="pt-br"><span class="topbar-lang-flag">🇧🇷</span><span class="topbar-lang-name">Português (Brasil)</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="tr"><span class="topbar-lang-flag">🇹🇷</span><span class="topbar-lang-name">Turkish</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="pl"><span class="topbar-lang-flag">🇵🇱</span><span class="topbar-lang-name">Polski</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="fa"><span class="topbar-lang-flag">🇮🇷</span><span class="topbar-lang-name">فارسی</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="hi"><span class="topbar-lang-flag">🇮🇳</span><span class="topbar-lang-name">हिंदी</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
            <div class="topbar-lang-item" data-lang="sv"><span class="topbar-lang-flag">🇸🇪</span><span class="topbar-lang-name">Sweden</span><svg class="topbar-lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 8 6 12 14 4"/></svg></div>
          </div>
        </div>
        <div class="topbar-icon-btn" title="Price Alert"><img src="images/imgFrame.svg" width="20" height="20" alt="Price Alert" /></div>
        <button class="topbar-download" title="Download" onclick="window.location.href='downloads.html'">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3.5v11.5"/>
            <path d="M7 10.5l5 5 5-5"/>
            <path d="M4 17.5v1.2A1.8 1.8 0 0 0 5.8 20.5h12.4a1.8 1.8 0 0 0 1.8-1.8v-1.2"/>
          </svg>
        </button>
        <button class="topbar-theme-toggle" id="topbar-theme-toggle" title="Theme">
          <svg class="sun" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.6" stroke="currentColor" stroke-width="1.6" fill="none"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 1.5v2.2"/><path d="M10 16.3v2.2"/><path d="M1.5 10h2.2"/><path d="M16.3 10h2.2"/><path d="M3.9 3.9l1.6 1.6"/><path d="M14.5 14.5l1.6 1.6"/><path d="M3.9 16.1l1.6-1.6"/><path d="M14.5 5.5l1.6-1.6"/></g></svg>
          <svg class="moon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.5 11.8A6.8 6.8 0 018.2 3.5a.5.5 0 00-.62-.62A8 8 0 1017.12 12.42a.5.5 0 00-.62-.62z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/></svg>
        </button>
      </div>
      <div class="topbar-avatar-wrap" id="topbar-avatar-wrap">
        <div class="topbar-avatar" id="topbar-avatar" title="Profile"><img src="images/img7.png" width="32" height="32" alt="Profile" /></div>
        <div class="topbar-dropdown" id="topbar-dropdown">
          <div class="topbar-dd-header" onclick="window.location.href=document.body.classList.contains('ib-mode')?'ib-profile.html':'profile.html'">
            <div class="topbar-dd-av"><img src="images/img7.png" alt="Profile" /></div>
            <div class="topbar-dd-info">
              <div class="topbar-dd-name">User Name</div>
              <div class="topbar-dd-nick">Nickname</div>
              <div class="topbar-dd-uid">
                <span>User ID: 123456</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </div>
            </div>
            <svg class="topbar-dd-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>
          </div>
          <div class="topbar-dd-divider"></div>
          <div class="topbar-dd-item">
            <div class="topbar-dd-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h2M15 13h2M5 17a4 4 0 0 1 8 0"/></svg></div>
            <span class="topbar-dd-label">Verification</span>
          </div>
          <div class="topbar-dd-item" onclick="window.location.href='downloads.html'">
            <div class="topbar-dd-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 14l4 4 4-4"/></svg></div>
            <span class="topbar-dd-label">Download</span>
          </div>
          <div class="topbar-dd-item">
            <div class="topbar-dd-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></div>
            <span class="topbar-dd-label">Log out</span>
          </div>
        </div>
      </div>
      <div class="topbar-toggle">
        <div class="topbar-toggle-btn active">Client</div>
        <div class="topbar-toggle-btn">IB</div>
      </div>
    </header>`;

  const root = document.getElementById('topbar-root');
  root.innerHTML = html;

  /* ── Set initial active state based on current page ─────── */
  const _pg = location.pathname.split('/').pop() || 'index.html';
  if (_pg.startsWith('ib-')) {
    document.body.classList.add('ib-mode');
    root.querySelectorAll('.topbar-toggle-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase() === 'ib');
    });
  }

  /* ── IB account switcher ─────────────────────────────────── */
  const acctBtn = document.getElementById('topbar-acct-btn');
  const acctMenu = document.getElementById('topbar-acct-menu');
  const acctLabel = document.getElementById('topbar-acct-label');
  if (acctBtn && acctMenu) {
    acctBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      acctMenu.classList.toggle('open');
    });
    acctMenu.querySelectorAll('.topbar-acct-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        acctMenu.querySelectorAll('.topbar-acct-item').forEach(x => x.classList.remove('active'));
        item.classList.add('active');
        const txt = item.querySelector('span');
        if (txt && acctLabel) acctLabel.textContent = txt.textContent;
        acctMenu.classList.remove('open');
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#topbar-acct-btn')) acctMenu.classList.remove('open');
    });
  }

  /* ── IB theme toggle ─────────────────────────────────────── */
  const themeBtn = document.getElementById('topbar-theme-toggle');
  if (themeBtn) {
    /* restore saved theme */
    if (sessionStorage.getItem('ib-theme') === 'dark') document.body.classList.add('dark-mode');
    themeBtn.addEventListener('click', () => {
      const dark = document.body.classList.toggle('dark-mode');
      sessionStorage.setItem('ib-theme', dark ? 'dark' : 'light');
    });
  }

  /* ── Dark-mode → leaving ClubElite guard ─────────────────── */
  /* Only ib-clubelite.html has dark-mode styling.            */
  /* If user is in dark mode and navigates elsewhere, prompt  */
  /* and switch back to light mode for the destination page.  */
  (function () {
    const DARK_PAGES = ['ib-clubelite.html'];

    function isDarkPage(href) {
      if (!href) return false;
      try {
        const u = new URL(href, location.href);
        if (u.origin !== location.origin) return false;
        const file = u.pathname.split('/').pop() || 'index.html';
        return DARK_PAGES.includes(file);
      } catch (_) { return false; }
    }

    function isInternalNav(href) {
      if (!href) return false;
      if (href.startsWith('#')) return false;
      if (href.startsWith('javascript:')) return false;
      try {
        const u = new URL(href, location.href);
        return u.origin === location.origin && /\.html?$/.test(u.pathname);
      } catch (_) { return false; }
    }

    function ensureModal() {
      let modal = document.getElementById('dark-leave-modal');
      if (modal) return modal;
      const css = document.createElement('style');
      css.textContent = `
        #dark-leave-modal {
          position: fixed; inset: 0; z-index: 10000;
          display: none; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.45);
          font-family: 'Roboto', sans-serif;
        }
        #dark-leave-modal.open { display: flex; }
        #dark-leave-modal .dlm-card {
          width: 420px; max-width: calc(100vw - 32px);
          background: #fff; color: #282d34;
          border-radius: 16px; padding: 28px 24px 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.32);
        }
        #dark-leave-modal .dlm-title {
          font-size: 18px; font-weight: 700; margin-bottom: 8px;
        }
        #dark-leave-modal .dlm-msg {
          font-size: 14px; line-height: 22px; color: #7a8699;
          margin-bottom: 24px;
        }
        #dark-leave-modal .dlm-actions {
          display: flex; justify-content: flex-end; gap: 12px;
        }
        #dark-leave-modal .dlm-btn {
          height: 40px; padding: 0 18px; border-radius: 8px;
          font-family: 'Roboto', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer; border: 0;
        }
        #dark-leave-modal .dlm-btn.ghost {
          background: #f4f5f6; color: #282d34;
        }
        #dark-leave-modal .dlm-btn.ghost:hover { background: #e8e9ea; }
        #dark-leave-modal .dlm-btn.primary {
          background: #0a36c7; color: #fff;
        }
        #dark-leave-modal .dlm-btn.primary:hover { background: #2f5ad2; }
      `;
      document.head.appendChild(css);

      modal = document.createElement('div');
      modal.id = 'dark-leave-modal';
      modal.innerHTML = `
        <div class="dlm-card" role="dialog" aria-modal="true" aria-labelledby="dlm-title">
          <div class="dlm-title" id="dlm-title">Switching to light mode</div>
          <div class="dlm-msg">Dark mode in progress, will change to light mode for now.</div>
          <div class="dlm-actions">
            <button type="button" class="dlm-btn ghost" data-action="cancel">Cancel</button>
            <button type="button" class="dlm-btn primary" data-action="confirm">Continue</button>
          </div>
        </div>`;
      document.body.appendChild(modal);
      return modal;
    }

    function promptLeaveDark(proceed) {
      const modal = ensureModal();
      modal.classList.add('open');
      const cleanup = () => {
        modal.classList.remove('open');
        modal.removeEventListener('click', onClick);
        document.removeEventListener('keydown', onKey);
      };
      const onClick = (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn && e.target !== modal) return;
        const action = btn ? btn.dataset.action : 'cancel';
        cleanup();
        if (action === 'confirm') {
          document.body.classList.remove('dark-mode');
          sessionStorage.setItem('ib-theme', 'light');
          proceed();
        }
      };
      const onKey = (e) => {
        if (e.key === 'Escape') { cleanup(); }
      };
      modal.addEventListener('click', onClick);
      document.addEventListener('keydown', onKey);
    }

    // Intercept link clicks
    document.addEventListener('click', (e) => {
      if (!document.body.classList.contains('dark-mode')) return;
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!isInternalNav(href)) return;
      if (isDarkPage(href)) return; // staying on a dark-supported page
      if (a.target && a.target !== '_self') return;
      e.preventDefault();
      e.stopPropagation();
      promptLeaveDark(() => { window.location.href = a.href; });
    }, true);

    // Intercept the IB ↔ Client toggle (it triggers programmatic navigation)
    document.querySelectorAll('.topbar-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (!document.body.classList.contains('dark-mode')) return;
        const mode = btn.textContent.trim().toLowerCase();
        const target = mode === 'ib' ? 'ib-dashboard.html' : 'index.html';
        if (DARK_PAGES.includes(target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        promptLeaveDark(() => { btn.click(); });
      }, true);
    });
  })();

  /* ── Attach behaviour ────────────────────────────────────── */
  document.getElementById('topbar-hamburger').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('sidebar-mobile-toggle'));
  });

  document.querySelectorAll('.topbar-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.textContent.trim().toLowerCase(); // 'client' or 'ib'
      const pg = location.pathname.split('/').pop() || 'index.html';
      const needsNav = (mode === 'ib' && !pg.startsWith('ib-')) || (mode === 'client' && pg.startsWith('ib-'));

      document.querySelectorAll('.topbar-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.dispatchEvent(new CustomEvent('topbar-mode-change', { detail: { mode } }));

      if (needsNav) {
        // Show full-page loader
        const label = mode === 'ib' ? 'Switching to IB' : 'Switching to Client';
        const loader = document.createElement('div');
        loader.id = 'mode-switch-loader';
        loader.innerHTML = `
          <div class="msl-inner">
            <div class="msl-spinner"></div>
            <div class="msl-text">${label}</div>
          </div>`;
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
          #mode-switch-loader {
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(6px);
            display: flex; align-items: center; justify-content: center;
            animation: mslFadeIn 0.18s ease;
          }
          @keyframes mslFadeIn { from { opacity: 0; } to { opacity: 1; } }
          .msl-inner {
            display: flex; flex-direction: column; align-items: center; gap: 20px;
          }
          .msl-spinner {
            width: 44px; height: 44px; border-radius: 50%;
            border: 3px solid #e8f1ff;
            border-top-color: #0a36c7;
            animation: mslSpin 0.7s linear infinite;
          }
          @keyframes mslSpin { to { transform: rotate(360deg); } }
          .msl-text {
            font-family: 'Roboto', sans-serif;
            font-size: 16px; font-weight: 600; color: #282d34;
            letter-spacing: 0.01em;
          }
        `;
        document.head.appendChild(loaderStyle);
        document.body.appendChild(loader);

        setTimeout(() => {
          if (mode === 'ib') {
            window.location.href = 'ib-dashboard.html';
          } else {
            window.location.href = 'index.html';
          }
        }, 600);
      }
    });
  });

  /* ── Avatar dropdown ─────────────────────────────────────── */
  const avatarWrap = document.getElementById('topbar-avatar-wrap');
  const avatarBtn  = document.getElementById('topbar-avatar');
  const dropdown   = document.getElementById('topbar-dropdown');

  avatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!avatarWrap.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdown.classList.remove('open');
  });

  /* ── Language dropdown ───────────────────────────────────── */
  const langBtn      = document.getElementById('topbar-lang-btn');
  const langDropdown = document.getElementById('topbar-lang-dropdown');
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.remove('open');
    langDropdown.classList.toggle('open');
  });

  document.querySelectorAll('.topbar-lang-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.topbar-lang-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      langDropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target) && e.target !== langBtn) {
      langDropdown.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') langDropdown.classList.remove('open');
  });
})();
