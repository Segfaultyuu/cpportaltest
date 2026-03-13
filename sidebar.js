(function () {
  /* ── Inject CSS ─────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .sidebar {
      position: fixed; left: 0; top: 0; bottom: 0;
      width: 240px; background: #fff;
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      z-index: 100; overflow: hidden;
      transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
    }
    .sidebar.collapsed { width: 64px; }
    .sidebar-logo {
      padding: 18px 20px; display: flex; align-items: center;
      border-bottom: 1px solid var(--border);
      height: 60px; flex-shrink: 0; overflow: hidden;
    }
    .logo-wrap {
      overflow: hidden; width: 129px; height: 24px;
      transition: width 0.25s cubic-bezier(0.4,0,0.2,1); flex-shrink: 0;
    }
    .sidebar.collapsed .logo-wrap { width: 34px; }
    .logo-wrap img { height: 24px; width: auto; display: block; }
    .sidebar-nav {
      flex: 1; padding: 8px; display: flex; flex-direction: column;
      gap: 2px; overflow-y: auto; overflow-x: hidden;
    }
    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 0 12px; height: 52px; border-radius: 8px;
      font-size: 16px; font-weight: 500; color: #282d34;
      background: #ffffff; cursor: pointer;
      transition: background 0.15s, color 0.15s;
      text-decoration: none; white-space: nowrap;
      flex-shrink: 0; position: relative;
    }
    .nav-item:hover { background: #f9f9f9; color: #282d34; }
    .nav-item:active { background: #f9f9f9; color: #282d34; -webkit-tap-highlight-color: transparent; }
    .nav-item.active, .nav-item.active:active { background: #e8f1ff; color: #0a36c7; font-weight: 700; }
    .nav-item, .nav-item * { -webkit-tap-highlight-color: transparent; outline: none; }
    .nav-icon {
      display: flex; align-items: center; justify-content: center;
      width: 20px; height: 20px; flex-shrink: 0;
    }
    .nav-icon img { width: 20px; height: 20px; display: block; }
    .nav-icon .icon-sel { display: none; }
    .nav-item.active .nav-icon .icon-def { display: none; }
    .nav-item.active .nav-icon .icon-sel { display: block; }
    .nav-label { flex: 1; overflow: hidden; }
    .badge-new {
      font-size: 9px; font-weight: 700; color: #fff;
      background: var(--blue); border-radius: 2px;
      padding: 2px 4px; line-height: 1; flex-shrink: 0;
    }
    .submenu-arrow {
      flex-shrink: 0; color: var(--text-tertiary);
      transition: transform 0.2s; width: 16px; height: 16px;
    }
    .nav-item.submenu-open .submenu-arrow { transform: rotate(180deg); }
    .nav-divider { height: 1px; background: var(--border); margin: 6px 0; flex-shrink: 0; }
    .submenu {
      overflow: hidden; max-height: 0;
      transition: max-height 0.3s ease;
      display: flex; flex-direction: column;
    }
    .submenu.open { max-height: 500px; }
    .submenu-item {
      display: flex; align-items: center; height: 44px;
      padding: 0 12px 0 42px; font-size: 14px; font-weight: 500;
      color: #282d34; text-decoration: none; border-radius: 6px;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap; cursor: pointer; flex-shrink: 0;
    }
    .submenu-item:hover { background: #f9f9f9; color: #282d34; }
    .submenu-item.active { color: var(--blue); font-weight: 600; }
    .sidebar.collapsed .nav-label { display: none; }
    .sidebar.collapsed .badge-new { display: none; }
    .sidebar.collapsed .submenu-arrow { display: none; }
    .sidebar.collapsed .submenu { display: none; }
    .sidebar.collapsed .nav-divider { margin: 6px 8px; }
    .sidebar.collapsed .nav-item { justify-content: center; padding: 0; width: 48px; margin: 0 auto; }
    .sidebar.collapsed .collapse-label { display: none; }
    .nav-tooltip { display: none; }
    #sidebar-tooltip {
      position: fixed;
      background: #ffffff; color: #282d34;
      font-family: Roboto; font-size: 16px; font-style: normal; font-weight: 500;
      height: 48px; padding: 0 12px;
      display: flex; justify-content: center; align-items: center;
      border-radius: 8px; white-space: nowrap;
      pointer-events: none; opacity: 0; z-index: 9999; transition: opacity 0.1s;
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    }
    #sidebar-tooltip.visible { opacity: 1; }

    /* ── Mobile overlay sidebar ──────────────────────────── */
    .sidebar-overlay {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.35); z-index: 99;
    }
    .sidebar-overlay.visible { display: block; }

    /* ── Mobile menu header (hidden on desktop) ───────────── */
    .mobile-menu-header {
      display: none; flex-direction: column;
      background: #fff; flex-shrink: 0;
    }
    .mobile-close-row {
      display: flex; align-items: center; justify-content: flex-end;
      padding: 10px 16px; height: 44px;
    }
    .mobile-close-btn {
      width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
      border: none; background: transparent; cursor: pointer; color: #282d34; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .mobile-user-row {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 16px 12px; cursor: pointer;
    }
    .mobile-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .mobile-user-info { flex: 1; min-width: 0; }
    .mobile-user-name { font-size: 18px; font-weight: 600; color: #282d34; display: flex; align-items: center; gap: 6px; }
    .mobile-user-nick { font-size: 14px; font-weight: 400; color: #7a8699; }
    .mobile-user-id { font-size: 13px; font-weight: 500; color: #7a8699; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
    .mobile-toggle-wrap {
      margin: 4px 16px 14px; background: #f9f9f9; border-radius: 12px;
      padding: 4px; display: flex; height: 40px;
    }
    .mobile-toggle-btn {
      flex: 1; height: 32px; border-radius: 8px; border: none; cursor: pointer;
      font-size: 14px; font-weight: 400; color: #7a8699; background: transparent;
      transition: background 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .mobile-toggle-btn.active { background: #e8f1ff; font-weight: 600; color: #0a36c7; }

    /* ── Mobile footer rows (hidden on desktop) ───────────── */
    .mobile-lang-row, .mobile-logout-row {
      display: none; align-items: center; gap: 12px; padding: 0 16px;
      font-size: 16px; font-weight: 500; color: #282d34;
      cursor: pointer; flex-shrink: 0; white-space: nowrap;
      -webkit-tap-highlight-color: transparent;
    }
    .mobile-lang-row { height: 56px; border-top: 1px solid #f4f5f6; }
    .mobile-logout-row { height: 64px; border-top: 1px solid #f4f5f6; color: #0a36c7; }
    .mobile-lang-flag { width: 24px; height: 24px; flex-shrink: 0; }

    /* ── Mobile bottom tab bar ────────────────────────────── */
    .mobile-tabbar {
      display: none; position: fixed; bottom: 0; left: 0; right: 0;
      height: 64px; background: #fff;
      border-top: 1px solid var(--border); z-index: 101;
    }
    .tabbar-item {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 3px;
      font-size: 11px; font-weight: 500; color: #7a8699;
      text-decoration: none; cursor: pointer;
      border: none; background: transparent; padding: 8px 0;
      -webkit-tap-highlight-color: transparent; outline: none;
    }
    .tabbar-item.active { color: #0a36c7; }
    .tabbar-item img { width: 22px; height: 22px; display: block; }
    .tabbar-icon { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        width: 100% !important; overflow-y: auto; overflow-x: hidden;
        z-index: 102;
      }
      .sidebar.mobile-open { transform: translateX(0); }
      .sidebar.collapsed { width: 100% !important; }
      .sidebar-logo { display: none; }
      .sidebar .nav-icon { display: none !important; }
      .sidebar .nav-item { padding: 0 16px; height: 56px; border-radius: 0; gap: 0; }
      .sidebar .nav-item.active, .sidebar .nav-item.active:active { border-radius: 0; }
      .sidebar .nav-divider { display: none; }
      .sidebar .sidebar-nav { flex: none; overflow: visible; padding: 0; }
      .sidebar-bottom { display: none; }
      .mobile-menu-header { display: flex; }
      .mobile-lang-row { display: flex; }
      .mobile-logout-row { display: flex; }
      .mobile-tabbar { display: flex; }
      #sidebar-tooltip { display: none !important; }
    }

    .nav-flyout {
      position: fixed; left: 64px;
      background: rgba(255,255,255,0.97); backdrop-filter: blur(10px);
      border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      width: 210px; padding: 4px 0; z-index: 200;
      display: none; border: 1px solid var(--border);
    }
    .nav-flyout.visible { display: block; }
    .flyout-title {
      font-size: 16px; font-weight: 600; color: var(--text-primary);
      padding: 12px 16px; border-bottom: 1px solid var(--border);
    }
    .flyout-item {
      display: flex; align-items: center; height: 48px; padding: 0 16px;
      font-size: 14px; font-weight: 500; color: var(--text-primary);
      text-decoration: none; cursor: pointer; transition: background 0.15s;
    }
    .flyout-item:hover { background: #f9f9f9; }
    .flyout-item.active { background: #e8f1ff; color: #0a36c7; font-weight: 600; }
    .sidebar-bottom { padding: 8px; border-top: 1px solid var(--border); flex-shrink: 0; }
  `;
  document.head.appendChild(style);

  /* ── Detect active page ──────────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    if (href === 'index.html' && (page === 'index.html' || page === '')) return true;
    if (href === 'account.html' && page === 'account.html') return true;
    if (href === 'funds.html' && page === 'funds.html') return true;
    return false;
  }

  function icon(def, sel, label) {
    return `<span class="nav-icon">
      <img class="icon-def" src="images/${def}" alt="${label}" />
      <img class="icon-sel" src="images/${sel}" alt="${label}" />
    </span>`;
  }

  function navItem(href, iconDef, iconSel, label, tooltip, extra) {
    const active = isActive(href) ? ' active' : '';
    return `
      <a class="nav-item${active}" href="${href}">
        ${icon(iconDef, iconSel, label)}
        <span class="nav-label">${label}</span>
        ${extra || ''}
        <span class="nav-tooltip">${tooltip || label}</span>
      </a>`;
  }

  function navGroup(id, iconDef, iconSel, label, tooltip, badge, submenuItems) {
    const badgeHtml = badge ? `<span class="badge-new">${badge}</span>` : '';
    const arrow = `<svg class="submenu-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;
    return `
      <div class="nav-item has-submenu" id="nav-${id}" data-flyout="flyout-${id}">
        ${icon(iconDef, iconSel, label)}
        <span class="nav-label">${label}</span>
        ${badgeHtml}${arrow}
        <span class="nav-tooltip">${tooltip || label}</span>
      </div>
      <div class="submenu" id="sub-${id}">
        ${submenuItems.map(t => `<a class="submenu-item" href="#">${t}</a>`).join('')}
      </div>`;
  }

  /* ── Build HTML ──────────────────────────────────────────── */
  const tabActive = (href) => isActive(href) ? ' active' : '';
  const tabIcon   = (def, sel, href) => `<img src="images/${isActive(href) ? sel : def}" alt="" />`;

  const html = `
    <aside class="sidebar" id="sidebar">
      <div class="mobile-menu-header">
        <div class="mobile-close-row">
          <button class="mobile-close-btn" id="mobile-close-btn" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
            </svg>
          </button>
        </div>
        <div class="mobile-user-row">
          <img src="images/img7.png" class="mobile-avatar" alt="User" />
          <div class="mobile-user-info">
            <div class="mobile-user-name">User Name <span class="mobile-user-nick">Nickname</span></div>
            <div class="mobile-user-id">User ID: 24429</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7a8699" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
        </div>
        <div class="mobile-toggle-wrap">
          <button class="mobile-toggle-btn active" id="m-client-btn">Client</button>
          <button class="mobile-toggle-btn" id="m-ib-btn">IB</button>
        </div>
      </div>
      <div class="sidebar-logo">
        <div class="logo-wrap"><img src="images/logo.png" alt="Logo" /></div>
      </div>
      <nav class="sidebar-nav">
        ${navItem('index.html',   'Home.png',           'Home-selected.png',           'Home',         'Home')}
        ${navItem('account.html', 'Account.png',        'Account-selected.png',        'Account',      'Account')}
        ${navItem('funds.html',   'Funds.png',          'Fund-selected.png',           'Funds',        'Funds')}
        ${navGroup('wallet',      'Wallet.png',         'Wallet-selected.png',         'VT-Wallet',    'VT-Wallet',    'NEW',
            ['Discover','Deposit funds','Withdraw funds','Transfer between accounts','Payment details','Transaction history'])}
        ${navGroup('copytrading', 'Copy trading.png',   'Copy trading-selected.png',   'Copy Trading', 'Copy Trading', 'NEW',
            ['Overview','My portfolios','Signal providers'])}
        <div class="nav-divider"></div>
        ${navItem('#', 'Coupons.png',  'Coupon-selected.png',   'Promotion',    'Promotion')}
        ${navItem('#', 'ClubBleu.png', 'Clubbleu-selected.png', 'ClubBleu Pass','ClubBleu')}
        <div class="nav-divider"></div>
        ${navItem('#', 'Profile.png',  'Profile-selected.png',  'Profile',   'Profile')}
        ${navGroup('tools', 'Tool.png', 'Tool-selected.png', 'Tools', 'Tools', '',
            ['Trading tools','Analysis','Economic calendar'])}
        ${navItem('#', 'Download.png', 'Download-selected.png', 'Downloads', 'Downloads')}
        ${navItem('#', 'Support.png',  'Support-selected.png',  'Support',   'Support')}
      </nav>
      <div class="mobile-lang-row" id="mobile-lang-row">
        <img src="images/imgIcoLanguage.svg" class="mobile-lang-flag" alt="Language" />
        <span style="flex:1">English</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7a8699" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
      </div>
      <div class="mobile-logout-row" id="mobile-logout-row">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 3H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4M14 15l4-5-4-5M18 10H8"/>
        </svg>
        <span>Logout</span>
      </div>
      <div class="sidebar-bottom">
        <div class="nav-item" id="collapse-btn">
          <span class="nav-icon"><img id="collapse-icon" src="images/Collapse.png" alt="Collapse" /></span>
          <span class="nav-label collapse-label" style="font-size:14px;color:var(--text-secondary);">Collapse</span>
          <span class="nav-tooltip">Expand</span>
        </div>
      </div>
    </aside>

    <div class="mobile-tabbar" id="mobile-tabbar">
      <a class="tabbar-item${tabActive('index.html')}" href="index.html">
        ${tabIcon('Home.png','Home-selected.png','index.html')}
        <span>Home</span>
      </a>
      <a class="tabbar-item${tabActive('account.html')}" href="account.html">
        ${tabIcon('Account.png','Account-selected.png','account.html')}
        <span>Accounts</span>
      </a>
      <a class="tabbar-item" href="#">
        <img src="images/Coupons.png" alt="" />
        <span>Promotions</span>
      </a>
      <a class="tabbar-item${tabActive('funds.html')}" href="funds.html">
        ${tabIcon('Funds.png','Fund-selected.png','funds.html')}
        <span>Funds</span>
      </a>
      <button class="tabbar-item" id="tabbar-more">
        <span class="tabbar-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <line x1="4" y1="6" x2="18" y2="6"/><line x1="4" y1="11" x2="18" y2="11"/><line x1="4" y1="16" x2="18" y2="16"/>
          </svg>
        </span>
        <span>More</span>
      </button>
    </div>

    <div class="nav-flyout" id="flyout-wallet">
      <div class="flyout-title">VT-Wallet</div>
      <a class="flyout-item" href="#">Deposit funds</a>
      <a class="flyout-item" href="#">Withdraw funds</a>
      <a class="flyout-item" href="#">Transfer between accounts</a>
      <a class="flyout-item" href="#">Payment details</a>
      <a class="flyout-item" href="#">Transaction history</a>
    </div>
    <div class="nav-flyout" id="flyout-copytrading">
      <div class="flyout-title">Copy Trading</div>
      <a class="flyout-item" href="#">Overview</a>
      <a class="flyout-item" href="#">My portfolios</a>
      <a class="flyout-item" href="#">Signal providers</a>
    </div>
    <div class="nav-flyout" id="flyout-tools">
      <div class="flyout-title">Tools</div>
      <a class="flyout-item" href="#">Trading tools</a>
      <a class="flyout-item" href="#">Analysis</a>
      <a class="flyout-item" href="#">Economic calendar</a>
    </div>`;

  const root = document.getElementById('sidebar-root');
  root.innerHTML = html;

  /* ── Attach behaviour ────────────────────────────────────── */
  const sidebar  = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapse-btn');
  let flyoutTimer;

  /* ── Global tooltip (body-level, avoids stacking context) ── */
  const globalTip = document.createElement('div');
  globalTip.id = 'sidebar-tooltip';
  document.body.appendChild(globalTip);

  /* ── Mobile overlay ──────────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function mobileSidebarOpen() {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('visible');
  }
  function mobileSidebarClose() {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('visible');
  }
  document.addEventListener('sidebar-mobile-toggle', () => {
    sidebar.classList.contains('mobile-open') ? mobileSidebarClose() : mobileSidebarOpen();
  });
  overlay.addEventListener('click', mobileSidebarClose);

  /* ── Mobile close button ─────────────────────────────────── */
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', mobileSidebarClose);

  /* ── Mobile Client/IB toggle (syncs with topbar) ─────────── */
  document.querySelectorAll('.mobile-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mobile-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = btn.textContent.trim();
      document.querySelectorAll('.topbar-toggle-btn').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === label);
      });
    });
  });

  /* ── Tab bar More button ─────────────────────────────────── */
  const tabbarMore = document.getElementById('tabbar-more');
  if (tabbarMore) tabbarMore.addEventListener('click', mobileSidebarOpen);

  document.querySelectorAll('.nav-item:not(.has-submenu)').forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (!sidebar.classList.contains('collapsed')) return;
      const tipEl = item.querySelector('.nav-tooltip');
      if (!tipEl) return;
      const rect = item.getBoundingClientRect();
      globalTip.textContent = tipEl.textContent;
      globalTip.style.left = (rect.right + 10) + 'px';
      globalTip.style.top  = (rect.top + rect.height / 2) + 'px';
      globalTip.style.transform = 'translateY(-50%)';
      globalTip.classList.add('visible');
    });
    item.addEventListener('mouseleave', () => globalTip.classList.remove('visible'));
  });

  function hideAllFlyouts() {
    document.querySelectorAll('.nav-flyout').forEach(f => f.classList.remove('visible'));
  }

  collapseBtn.addEventListener('click', () => {
    const isCollapsing = !sidebar.classList.contains('collapsed');
    sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed');
    const tip = collapseBtn.querySelector('.nav-tooltip');
    if (tip) tip.textContent = isCollapsing ? 'Expand' : 'Collapse';
    const icon = document.getElementById('collapse-icon');
    if (icon) icon.src = isCollapsing ? 'images/collapseOn.png' : 'images/Collapse.png';
    if (isCollapsing) {
      document.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.nav-item.submenu-open').forEach(n => n.classList.remove('submenu-open'));
      hideAllFlyouts();
    }
  });

  document.querySelectorAll('.nav-item.has-submenu').forEach(item => {
    item.addEventListener('click', () => {
      if (sidebar.classList.contains('collapsed')) return;
      const submenuId = item.id.replace('nav-', 'sub-');
      const submenu   = document.getElementById(submenuId);
      if (!submenu) return;
      const isOpen = submenu.classList.contains('open');
      document.querySelectorAll('.submenu.open').forEach(s => { if (s !== submenu) s.classList.remove('open'); });
      document.querySelectorAll('.nav-item.submenu-open').forEach(n => { if (n !== item) n.classList.remove('submenu-open'); });
      submenu.classList.toggle('open', !isOpen);
      item.classList.toggle('submenu-open', !isOpen);
    });

    const flyoutId = item.dataset.flyout;
    const flyout   = flyoutId && document.getElementById(flyoutId);
    if (flyout) {
      item.addEventListener('mouseenter', () => {
        if (!sidebar.classList.contains('collapsed')) return;
        clearTimeout(flyoutTimer);
        flyout.style.top = item.getBoundingClientRect().top + 'px';
        hideAllFlyouts();
        flyout.classList.add('visible');
      });
      const startHide = () => { flyoutTimer = setTimeout(() => flyout.classList.remove('visible'), 120); };
      item.addEventListener('mouseleave', startHide);
      flyout.addEventListener('mouseenter', () => clearTimeout(flyoutTimer));
      flyout.addEventListener('mouseleave', startHide);
    }
  });
})();
