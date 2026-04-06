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
    .submenu.open { max-height: 500px; flex-shrink: 0; }
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

    /* ── IB Sidebar Nav ─────────────────────────────────────── */
    .client-nav { display: flex; }
    .ib-nav { display: none; flex-direction: column; gap: 2px; padding: 8px;
      flex: 1; overflow-y: auto; overflow-x: hidden; }
    body.ib-mode .client-nav { display: none !important; }
    body.ib-mode .ib-nav { display: flex !important; }

    /* IB icons use CSS variables for color */
    .ib-nav { --stroke-0: #282d34; --fill-0: #282d34; }
    .ib-nav .nav-item.active { --stroke-0: #0a36c7; --fill-0: #0a36c7; }

    /* icon-def/icon-sel swap for icons with different filled/outlined shapes */
    .ib-nav .nav-icon .icon-sel { display: none; }
    .ib-nav .nav-item.active .nav-icon .icon-def { display: none; }
    .ib-nav .nav-item.active .nav-icon .icon-sel { display: block; }

    /* VTrade composite icon */
    .ib-vtrade-icon { position: relative; width: 20px; height: 20px;
      display: block; flex-shrink: 0; }
    .ib-vtrade-main { position: absolute; width: 12.883px; height: 12.46px;
      left: 3.56px; top: 5.77px; }
    .ib-vtrade-s1 { position: absolute; width: 6px; height: 6px; left: 7px; top: 2px; }
    .ib-vtrade-s2 { position: absolute; width: 6px; height: 6px; left: 12.5px; top: 10.5px; }
    .ib-vtrade-s3 { position: absolute; width: 6px; height: 6px; left: 1.5px; top: 10.5px; }

    /* IB collapsed state */
    .sidebar.collapsed .ib-nav { padding: 8px 0; }

    @media (max-width: 768px) {
      .ib-nav { overflow: visible; padding: 0; flex: none; }
      .ib-nav .nav-icon { display: none !important; }
      .ib-nav .nav-item { padding: 0 16px; height: 56px; border-radius: 0; gap: 0; }
      .ib-nav .nav-item.active, .ib-nav .nav-item.active:active { border-radius: 0; }
      .ib-nav .nav-divider { display: none; }
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
    if (href === 'wallet.html' && page === 'wallet.html') return true;
    if (href === 'withdraw.html' && page === 'withdraw.html') return true;
    if (href === 'deposit.html' && page === 'deposit.html') return true;
    if (href === 'copy-trading.html' && page === 'copy-trading.html') return true;
    if (href === 'copy-trading-portfolios.html' && page === 'copy-trading-portfolios.html') return true;
    if (href === 'copy-trading-providers.html' && page === 'copy-trading-providers.html') return true;
    if (href === 'promotion.html' && page === 'promotion.html') return true;
    if (href === 'downloads.html' && page === 'downloads.html') return true;
    if (href === 'tools.html' && page === 'tools.html') return true;
    if (href === 'protradertools.html' && page === 'protradertools.html') return true;
    if (href === 'technicalanalysis.html' && page === 'technicalanalysis.html') return true;
    if (href === 'protraderplatform.html' && page === 'protraderplatform.html') return true;
    if (href === 'nvc.html' && page === 'nvc.html') return true;
    if (href === 'analysisiq.html' && page === 'analysisiq.html') return true;
    if (href === 'transactionhistory.html' && (page === 'transactionhistory.html' || page === 'fundhistory.html')) return true;
    if (href === 'earn.html' && page === 'earn.html') return true;
    if (href === 'profile.html' && page === 'profile.html') return true;
    if (href === 'clubbleu.html' && page === 'clubbleu.html') return true;
    if (href === 'support.html' && page === 'support.html') return true;
    return false;
  }

  const walletPages = ['wallet.html', 'withdraw.html', 'deposit.html', 'transactionhistory.html', 'fundhistory.html'];
  const copyTradingPages = ['copy-trading.html', 'copy-trading-portfolios.html', 'copy-trading-providers.html'];
  const toolsPages = ['tools.html', 'protradertools.html', 'technicalanalysis.html', 'protraderplatform.html', 'nvc.html', 'analysisiq.html'];

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

  function navGroup(id, iconDef, iconSel, label, tooltip, badge, submenuItems, groupPages) {
    const badgeHtml = badge ? `<span class="badge-new">${badge}</span>` : '';
    const arrow = `<svg class="submenu-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;
    const groupActive = groupPages && groupPages.includes(page) ? ' active' : '';
    const itemsHtml = submenuItems.map(t => {
      const href = typeof t === 'object' ? t.href : '#';
      const lbl  = typeof t === 'object' ? t.label : t;
      const active = isActive(href) ? ' active' : '';
      return `<a class="submenu-item${active}" href="${href}">${lbl}</a>`;
    }).join('');
    return `
      <div class="nav-item has-submenu${groupActive}" id="nav-${id}" data-flyout="flyout-${id}">
        ${icon(iconDef, iconSel, label)}
        <span class="nav-label">${label}</span>
        ${badgeHtml}${arrow}
        <span class="nav-tooltip">${tooltip || label}</span>
      </div>
      <div class="submenu" id="sub-${id}">
        ${itemsHtml}
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
      <nav class="sidebar-nav client-nav" id="client-sidebar-nav">
        ${navItem('index.html',   'Home.png',           'Home-selected.png',           'Home',         'Home')}
        ${navItem('account.html', 'Account.png',        'Account-selected.png',        'Account',      'Account')}
        ${navItem('funds.html',   'Funds.png',          'Fund-selected.png',           'Funds',        'Funds')}
        ${navGroup('wallet',      'Wallet.png',         'Wallet-selected.png',         'VT-Wallet',    'VT-Wallet',    'NEW',
            [
              { label: 'Overview',                    href: 'wallet.html'    },
              { label: 'Deposit funds',               href: 'deposit.html'   },
              { label: 'Withdraw funds',              href: 'withdraw.html'  },
              { label: 'Transfer',                    href: 'funds.html?tab=transfer' },
              { label: 'History',                      href: 'fundhistory.html' }
            ], walletPages)}
        <a class="nav-item${page === 'earn.html' ? ' active' : ''}" href="earn.html" data-tooltip="Earn">
          <span class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <!-- stem -->
              <line x1="10" y1="17" x2="10" y2="9"/>
              <!-- left leaf -->
              <path d="M10 13 C9 12 5.5 11.5 5.5 8 C8 8 10 10.5 10 13Z"/>
              <!-- right leaf -->
              <path d="M10 10.5 C11 9.5 14.5 9 14.5 5.5 C12 5.5 10 8 10 10.5Z"/>
              <!-- ground line -->
              <line x1="7" y1="17" x2="13" y2="17"/>
            </svg>
          </span>
          <span class="nav-label">Earn</span>
          <span class="nav-tooltip">Earn</span>
        </a>
        ${navGroup('copytrading', 'Copy trading.png',   'Copy trading-selected.png',   'Copy Trading', 'Copy Trading', 'NEW',
            [
              { label: 'Overview',          href: 'copy-trading.html'            },
              { label: 'My portfolios',     href: 'copy-trading-portfolios.html' },
              { label: 'Signal providers',  href: 'copy-trading-providers.html'  }
            ], copyTradingPages)}
        <div class="nav-divider"></div>
        ${navItem('promotion.html', 'Coupons.png',  'Coupon-selected.png',   'Promotion',    'Promotion')}
        ${navItem('clubbleu.html', 'ClubBleu.png', 'Clubbleu-selected.png', 'ClubBleu Pass','ClubBleu')}
        <div class="nav-divider"></div>
        ${navItem('profile.html', 'Profile.png',  'Profile-selected.png',  'Profile',   'Profile')}
        ${navGroup('tools', 'Tool.png', 'Tool-selected.png', 'Tools', 'Tools', '',
            [
              { label: 'ProTrader Tools',            href: 'protradertools.html' },
              { label: 'Technical Analysis',         href: 'technicalanalysis.html' },
              { label: 'ProTrader Platform',         href: 'protraderplatform.html' },
              { label: 'Notional Volume Calculator', href: 'nvc.html'    },
              { label: 'Acuity AnalysisIQ',          href: 'analysisiq.html' },
              { label: 'Daily Newsletter',           href: 'tools.html' }
            ], toolsPages)}
        ${navItem('downloads.html', 'Download.png', 'Download-selected.png', 'Downloads', 'Downloads')}
        ${navItem('support.html', 'Support.png',  'Support-selected.png',  'Support',   'Support')}
      </nav>
      <nav class="ib-nav" id="ib-sidebar-nav">
        <a class="nav-item${page === 'ib-dashboard.html' ? ' active' : ''}" href="ib-dashboard.html">
          <span class="nav-icon">
            <svg class="icon-def" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3.5" width="5.321" height="5.321" rx="1.077" stroke="#282d34" stroke-width="1.3"/>
              <rect x="11.68" y="3.5" width="5.321" height="5.321" rx="1.077" stroke="#282d34" stroke-width="1.3"/>
              <rect x="3" y="12.18" width="5.321" height="5.321" rx="1.077" stroke="#282d34" stroke-width="1.3"/>
              <rect x="11.68" y="12.18" width="5.321" height="5.321" rx="1.077" stroke="#282d34" stroke-width="1.3"/>
            </svg>
            <svg class="icon-sel" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3.5" width="5.321" height="5.321" rx="1.077" fill="#0a36c7" stroke="#0a36c7" stroke-width="1.3"/>
              <rect x="11.68" y="3.5" width="5.321" height="5.321" rx="1.077" fill="#0a36c7" stroke="#0a36c7" stroke-width="1.3"/>
              <rect x="3" y="12.18" width="5.321" height="5.321" rx="1.077" fill="#0a36c7" stroke="#0a36c7" stroke-width="1.3"/>
              <rect x="11.68" y="12.18" width="5.321" height="5.321" rx="1.077" fill="#0a36c7" stroke="#0a36c7" stroke-width="1.3"/>
            </svg>
          </span>
          <span class="nav-label">Dashboard</span>
          <span class="nav-tooltip">Dashboard</span>
        </a>
        <a class="nav-item${page === 'ib-report.html' ? ' active' : ''}" href="ib-report.html">
          <span class="nav-icon">
            <svg class="icon-def" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 2.59961H15.5C16.2732 2.59961 16.9004 3.2268 16.9004 4V16C16.9004 16.7732 16.2732 17.4004 15.5 17.4004H4.5C3.7268 17.4004 3.09961 16.7732 3.09961 16V4C3.09961 3.2268 3.7268 2.59961 4.5 2.59961Z" stroke="#282D34" stroke-width="1.2"/>
              <path d="M7 7H13" stroke="#282D34" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M7 10.3334H10.3333" stroke="#282D34" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <svg class="icon-sel" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 4C2.5 2.89543 3.39543 2 4.5 2H15.5C16.6046 2 17.5 2.89543 17.5 4V16C17.5 17.1046 16.6046 18 15.5 18H4.5C3.39543 18 2.5 17.1046 2.5 16V4Z" fill="#0a36c7"/>
              <path d="M7 7H13" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M7 10.3334H10.3333" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="nav-label">IB Report</span>
          <span class="nav-tooltip">IB Report</span>
        </a>
        <a class="nav-item${page === 'ib-multilevel.html' ? ' active' : ''}" href="ib-multilevel.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 16 15.0001" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 10.5996C1.00294 10.5996 0.599609 11.0029 0.599609 11.5C0.599609 11.9971 1.00294 12.4004 1.5 12.4004C1.99706 12.4004 2.40039 11.9971 2.40039 11.5C2.40039 11.0029 1.99706 10.5996 1.5 10.5996Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M14.5 10.5996C14.0029 10.5996 13.5996 11.0029 13.5996 11.5C13.5996 11.9971 14.0029 12.4004 14.5 12.4004C14.9971 12.4004 15.4004 11.9971 15.4004 11.5C15.4004 11.0029 14.9971 10.5996 14.5 10.5996Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <mask id="ib-ml-mask" fill="white"><rect x="3" width="10" height="10" rx="1"/></mask>
              <rect x="3" width="10" height="10" rx="1" stroke="var(--stroke-0,#282D34)" stroke-width="2.4" mask="url(#ib-ml-mask)"/>
              <path d="M13.4999 10.5001L11.9999 9.00008" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M2 10.9999L3.5 9.49994" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M8 10V12.5" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M8 12.5997C8.49706 12.5997 8.90039 13.003 8.90039 13.5001C8.90039 13.9971 8.49706 14.4005 8 14.4005C7.50294 14.4005 7.09961 13.9971 7.09961 13.5001C7.09961 13.003 7.50294 12.5997 8 12.5997Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M7 6H9" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="nav-label">Multi-Level IB</span>
          <span class="nav-tooltip">Multi-Level IB</span>
        </a>
        <div class="nav-divider"></div>
        <a class="nav-item${page === 'ib-resource-hub.html' ? ' active' : ''}" href="ib-resource-hub.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7826 14.4019C17.5955 14.735 17.3157 14.9927 16.9727 15.1469L11.5726 17.6546C11.0729 17.8868 10.5371 18.0033 10.0004 18.0033C9.46377 18.0033 8.92713 17.8868 8.42742 17.6546L3.02076 15.1437C2.68515 14.9927 2.40455 14.7358 2.21746 14.4019C2.05089 14.1057 2.15673 13.7306 2.45377 13.5641C2.74917 13.3991 3.12499 13.5034 3.29156 13.8004C3.34982 13.9046 3.42859 13.9777 3.53198 14.0236L8.94682 16.5378C9.60737 16.8447 10.3943 16.8447 11.054 16.5378L16.4615 14.0269C16.5722 13.9768 16.651 13.9038 16.7093 13.7996C16.875 13.5025 17.25 13.3975 17.5471 13.5633C17.8433 13.7307 17.9491 14.1057 17.7826 14.4019ZM17.5471 10.0168C17.25 9.85106 16.875 9.95529 16.7093 10.2532C16.651 10.3574 16.5722 10.4304 16.4615 10.4804L11.054 12.9913C10.3943 13.2982 9.60737 13.2982 8.94682 12.9913L3.53198 10.4771C3.42941 10.4312 3.35064 10.3582 3.29238 10.254C3.12581 9.95691 2.74998 9.85271 2.45458 10.0176C2.15836 10.1842 2.05251 10.5592 2.21826 10.8554C2.40535 11.1894 2.68516 11.4462 3.02159 11.5972L8.42824 14.1081C8.92796 14.3403 9.4646 14.4568 10.0012 14.4568C10.5379 14.4568 11.0737 14.3403 11.5734 14.1081L16.9735 11.6005C17.3165 11.4462 17.5971 11.1894 17.7842 10.8554C17.9491 10.5576 17.8433 10.1826 17.5471 10.0168ZM2 6.4556C2 5.75895 2.39221 5.1452 3.02404 4.85226L8.42824 2.34709C9.42686 1.8843 10.5723 1.8843 11.5718 2.34709L16.976 4.85226C17.6078 5.1452 18 5.75977 18 6.4556C18 7.15144 17.6078 7.76604 16.976 8.05898L11.5718 10.5641C11.0729 10.7955 10.5362 10.9112 9.99959 10.9112C9.46294 10.9112 8.92713 10.7955 8.42742 10.5641L3.02324 8.05898C2.39223 7.76604 2 7.15226 2 6.4556ZM3.23083 6.4556C3.23083 6.53602 3.25299 6.80844 3.54182 6.94301L8.946 9.44817C9.61639 9.75916 10.3853 9.75834 11.054 9.44817L16.4582 6.94301C16.747 6.80926 16.7692 6.53602 16.7692 6.4556C16.7692 6.37519 16.747 6.10277 16.4582 5.9682L11.054 3.46304C10.7192 3.30795 10.359 3.23 9.99959 3.23C9.64018 3.23 9.28078 3.30795 8.94517 3.46304L3.541 5.9682C3.25298 6.10277 3.23083 6.37519 3.23083 6.4556Z" fill="var(--fill-0,#282D34)"/>
            </svg>
          </span>
          <span class="nav-label">IB Resource Hub</span>
          <span class="nav-tooltip">IB Resource Hub</span>
        </a>
        <a class="nav-item${page === 'ib-clubelite.html' ? ' active' : ''}" href="ib-clubelite.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.72461C9.09914 2.72461 10.1847 3.43962 11.0264 4.78613C11.8627 6.1243 12.4004 8.01032 12.4004 10.125C12.4004 12.2397 11.8627 14.1257 11.0264 15.4639C10.1847 16.8104 9.09914 17.5254 8 17.5254C6.90086 17.5254 5.81526 16.8104 4.97363 15.4639C4.13728 14.1257 3.59961 12.2397 3.59961 10.125C3.59961 8.01032 4.13728 6.1243 4.97363 4.78613C5.81526 3.43962 6.90086 2.72461 8 2.72461Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M8 2.62509C9.31804 2.62492 10.4992 2.62505 11.4999 2.62505C14.2614 2.62505 16.4999 5.84094 16.4999 10.2592C16.4999 14.6775 14.3954 17.625 11.634 17.625C10.6408 17.625 9.36568 17.625 8 17.625" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M11.5 5.125H15" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M13 10.125H16.5" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M11.5 15.125L15.5 15.125" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
            </svg>
          </span>
          <span class="nav-label">ClubElite</span>
          <span class="nav-tooltip">ClubElite</span>
        </a>
        <div class="nav-item has-submenu" id="ib-nav-vtrade" data-flyout="ib-flyout-vtrade">
          <span class="nav-icon">
            <span class="ib-vtrade-icon">
              <svg class="ib-vtrade-main" viewBox="0 0 14.0828 13.66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4828 6.61859C13.4828 3.87162 11.7632 1.52627 9.34187 0.600162M0.6 6.61859C0.6 3.87162 2.31951 1.52627 4.74088 0.600162M11.1823 11.5528C10.0626 12.4934 8.61815 13.06 7.04138 13.06C5.4646 13.06 4.02016 12.4934 2.90049 11.5528" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="ib-vtrade-s1" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="2.4" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="ib-vtrade-s2" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 0.599609C4.32548 0.599609 5.40039 1.67452 5.40039 3C5.40039 4.32548 4.32548 5.40039 3 5.40039C1.67452 5.40039 0.599609 4.32548 0.599609 3C0.599609 1.67452 1.67452 0.599609 3 0.599609Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="ib-vtrade-s3" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 0.599609C4.32548 0.599609 5.40039 1.67452 5.40039 3C5.40039 4.32548 4.32548 5.40039 3 5.40039C1.67452 5.40039 0.599609 4.32548 0.599609 3C0.599609 1.67452 1.67452 0.599609 3 0.599609Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </span>
          <span class="nav-label">VTrade</span>
          <span class="nav-tooltip">VTrade</span>
          <svg class="submenu-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>
        </div>
        <div class="submenu" id="ib-sub-vtrade">
          <a class="submenu-item" href="#">Become a Provider</a>
          <a class="submenu-item" href="#">Become a Follower</a>
          <a class="submenu-item${page === 'ib-vtrade-login.html' ? ' active' : ''}" href="ib-vtrade-login.html">Login to VTrade</a>
        </div>
        <a class="nav-item${page === 'ib-account-report.html' ? ' active' : ''}" href="ib-account-report.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.49967 2.58289C11.0183 2.58289 12.2495 3.81425 12.2497 5.33289C12.2497 6.85167 11.0185 8.08289 9.49967 8.08289C7.98105 8.08269 6.74967 6.85155 6.74967 5.33289C6.74984 3.81438 7.98116 2.58309 9.49967 2.58289Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.16667"/>
              <path d="M9.42205 10L9.42202 9.4H9.42205V10ZM3.04314 15.8096L2.46508 15.6488L2.46508 15.6488L3.04314 15.8096ZM10.9924 17.2812L11.5618 17.0923C11.6225 17.2752 11.5917 17.4762 11.4789 17.6324C11.3661 17.7887 11.1851 17.8812 10.9924 17.8812V17.2812ZM12.0929 10.6084L12.3642 10.0732C12.5284 10.1564 12.6453 10.3104 12.6813 10.4909C12.7174 10.6715 12.6686 10.8585 12.5489 10.9984L12.0929 10.6084ZM9.42205 10L9.42207 10.6C7.54655 10.6001 6.25876 11.4189 5.35233 12.4939C4.43054 13.587 3.90604 14.9463 3.6212 15.9704L3.04314 15.8096L2.46508 15.6488C2.77197 14.5455 3.35579 13 4.43496 11.7203C5.52948 10.4223 7.13528 9.40009 9.42202 9.4L9.42205 10ZM3.04314 15.8096L3.62121 15.9703C3.52787 16.306 3.7742 16.6813 4.24041 16.6813V17.2812V17.8812C3.10029 17.8812 2.12805 16.8608 2.46508 15.6488L3.04314 15.8096ZM4.24041 17.2812V16.6813H10.9924V17.2812V17.8812H4.24041V17.2812ZM10.9924 17.2812L10.4229 17.4702C9.88021 15.8346 9.38881 12.8466 11.637 10.2184L12.0929 10.6084L12.5489 10.9984C10.7041 13.1551 11.0732 15.6197 11.5618 17.0923L10.9924 17.2812ZM12.0929 10.6084L11.8217 11.1436C11.1608 10.8086 10.3712 10.6 9.42205 10.6V10V9.4C10.5548 9.4 11.5309 9.65089 12.3642 10.0732L12.0929 10.6084Z" fill="var(--stroke-0,#282D34)"/>
              <path d="M14.7347 12.7028H15.2646C15.6975 12.7028 16.0601 12.9832 16.1093 13.355C16.1441 13.6237 16.4234 13.8193 16.7368 13.7867C17.0486 13.7567 17.2727 13.5148 17.2379 13.2461C17.1357 12.4622 16.4317 11.8576 15.5507 11.7474V11.4891C15.5507 11.2191 15.2963 11 14.983 11C14.6696 11 14.4153 11.2191 14.4153 11.4891V11.7526C13.4729 11.8857 12.75 12.5861 12.75 13.4346C12.75 13.8174 12.8991 14.1918 13.1678 14.4839C13.4373 14.7833 13.8218 14.9998 14.2533 15.0937L15.4704 15.3539C15.8497 15.4368 16.1146 15.7289 16.1146 16.0641C16.1146 16.2585 16.026 16.4417 15.8648 16.5807C15.7036 16.7196 15.4909 16.7958 15.2653 16.7958H14.7354C14.3025 16.7958 13.9399 16.5154 13.8907 16.1437C13.8559 15.875 13.5735 15.678 13.2632 15.7119C12.9513 15.7419 12.7273 15.9839 12.7621 16.2526C12.8628 17.0267 13.5501 17.6274 14.4153 17.7481V18.0109C14.4153 18.2809 14.6696 18.5 14.983 18.5C15.2963 18.5 15.5507 18.2809 15.5507 18.0109V17.7513C15.9708 17.6985 16.3606 17.538 16.6672 17.2739C17.0426 16.9504 17.25 16.5213 17.25 16.0654C17.25 15.2815 16.6331 14.5994 15.7467 14.4063L14.5296 14.1461C14.3418 14.1056 14.1821 14.015 14.0618 13.8826C13.9482 13.7587 13.8854 13.5996 13.8854 13.4359C13.8854 13.0315 14.2661 12.7028 14.7347 12.7028Z" fill="var(--fill-0,#282D34)"/>
            </svg>
          </span>
          <span class="nav-label">Account Report</span>
          <span class="nav-tooltip">Account Report</span>
        </a>
        <div class="nav-divider"></div>
        <a class="nav-item${page === 'ib-client-report.html' ? ' active' : ''}" href="ib-client-report.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.49967 2.58289C11.0183 2.58289 12.2495 3.81425 12.2497 5.33289C12.2497 6.85167 11.0185 8.08289 9.49967 8.08289C7.98105 8.08269 6.74967 6.85155 6.74967 5.33289C6.74984 3.81438 7.98116 2.58309 9.49967 2.58289Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.16667"/>
              <path d="M9.42205 10L9.42202 9.4H9.42205V10ZM3.04314 15.8096L2.46508 15.6488L2.46508 15.6488L3.04314 15.8096ZM10.9924 17.2812L11.5618 17.0923C11.6225 17.2752 11.5917 17.4762 11.4789 17.6324C11.3661 17.7887 11.1851 17.8812 10.9924 17.8812V17.2812ZM12.0929 10.6084L12.3642 10.0732C12.5284 10.1564 12.6453 10.3104 12.6813 10.4909C12.7174 10.6715 12.6686 10.8585 12.5489 10.9984L12.0929 10.6084ZM9.42205 10L9.42207 10.6C7.54655 10.6001 6.25876 11.4189 5.35233 12.4939C4.43054 13.587 3.90604 14.9463 3.6212 15.9704L3.04314 15.8096L2.46508 15.6488C2.77197 14.5455 3.35579 13 4.43496 11.7203C5.52948 10.4223 7.13528 9.40009 9.42202 9.4L9.42205 10ZM3.04314 15.8096L3.62121 15.9703C3.52787 16.306 3.7742 16.6813 4.24041 16.6813V17.2812V17.8812C3.10029 17.8812 2.12805 16.8608 2.46508 15.6488L3.04314 15.8096ZM4.24041 17.2812V16.6813H10.9924V17.2812V17.8812H4.24041V17.2812ZM10.9924 17.2812L10.4229 17.4702C9.88021 15.8346 9.38881 12.8466 11.637 10.2184L12.0929 10.6084L12.5489 10.9984C10.7041 13.1551 11.0732 15.6197 11.5618 17.0923L10.9924 17.2812ZM12.0929 10.6084L11.8217 11.1436C11.1608 10.8086 10.3712 10.6 9.42205 10.6V10V9.4C10.5548 9.4 11.5309 9.65089 12.3642 10.0732L12.0929 10.6084Z" fill="var(--stroke-0,#282D34)"/>
              <path d="M14 13V15.5" stroke="var(--stroke-0,#282D34)" stroke-width="1.16667" stroke-linecap="round"/>
              <path d="M16 16.5L16 11M18 12.5V15.5" stroke="var(--stroke-0,#282D34)" stroke-width="1.16667" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="nav-label">Client Report</span>
          <span class="nav-tooltip">Client Report</span>
        </a>
        <a class="nav-item${page === 'ib-funds.html' ? ' active' : ''}" href="ib-funds.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 2.59961H15.5C16.2732 2.59961 16.9004 3.2268 16.9004 4V16C16.9004 16.7732 16.2732 17.4004 15.5 17.4004H4.5C3.7268 17.4004 3.09961 16.7732 3.09961 16V4C3.09961 3.2268 3.7268 2.59961 4.5 2.59961Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.2"/>
              <path d="M8 6H12" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M9.86417 9.68027H10.3352C10.72 9.68027 11.0423 9.92954 11.086 10.26C11.117 10.4988 11.3653 10.6727 11.6438 10.6437C11.921 10.6171 12.1202 10.402 12.0892 10.1632C11.9984 9.46636 11.3727 8.92898 10.5895 8.83101V8.60145C10.5895 8.36145 10.3634 8.16667 10.0849 8.16667C9.8063 8.16667 9.58023 8.36145 9.58023 8.60145V8.83568C8.74255 8.95394 8.1 9.57654 8.1 10.3307C8.1 10.671 8.23255 11.0038 8.47141 11.2635C8.71093 11.5296 9.05274 11.722 9.43625 11.8055L10.5182 12.0368C10.8552 12.1105 11.0908 12.3702 11.0908 12.6681C11.0908 12.8409 11.012 13.0038 10.8687 13.1273C10.7254 13.2507 10.5363 13.3185 10.3358 13.3185H9.86484C9.47998 13.3185 9.1577 13.0693 9.11396 12.7388C9.08301 12.5 8.83204 12.3249 8.55618 12.3551C8.27897 12.3817 8.07982 12.5968 8.11077 12.8356C8.20026 13.5237 8.81118 14.0577 9.58023 14.165V14.3986C9.58023 14.6386 9.8063 14.8333 10.0849 14.8333C10.3634 14.8333 10.5895 14.6386 10.5895 14.3986V14.1679C10.9629 14.1209 11.3094 13.9783 11.5819 13.7435C11.9156 13.4559 12.1 13.0745 12.1 12.6693C12.1 11.9724 11.5516 11.3661 10.7637 11.1945L9.68183 10.9632C9.51497 10.9272 9.373 10.8467 9.26602 10.729C9.1651 10.6189 9.10925 10.4774 9.10925 10.3319C9.10925 9.97246 9.44768 9.68027 9.86417 9.68027Z" fill="var(--fill-0,#282D34)"/>
            </svg>
          </span>
          <span class="nav-label">Funds</span>
          <span class="nav-tooltip">Funds</span>
        </a>
        <a class="nav-item${page === 'ib-profile.html' ? ' active' : ''}" href="ib-profile.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.49967 2.58289C11.0183 2.58289 12.2495 3.81425 12.2497 5.33289C12.2497 6.85167 11.0185 8.08289 9.49967 8.08289C7.98105 8.08269 6.74967 6.85155 6.74967 5.33289C6.74984 3.81438 7.98116 2.58309 9.49967 2.58289Z" stroke="var(--stroke-0,#282D34)" stroke-width="1.16667"/>
              <path d="M9.42205 10L9.42202 9.4H9.42205V10ZM3.04314 15.8096L2.46508 15.6488L2.46508 15.6488L3.04314 15.8096ZM10.9924 17.2812L11.5618 17.0923C11.6225 17.2752 11.5917 17.4762 11.4789 17.6324C11.3661 17.7887 11.1851 17.8812 10.9924 17.8812V17.2812ZM12.0929 10.6084L12.3642 10.0732C12.5284 10.1564 12.6453 10.3104 12.6813 10.4909C12.7174 10.6715 12.6686 10.8585 12.5489 10.9984L12.0929 10.6084ZM9.42205 10L9.42207 10.6C7.54655 10.6001 6.25876 11.4189 5.35233 12.4939C4.43054 13.587 3.90604 14.9463 3.6212 15.9704L3.04314 15.8096L2.46508 15.6488C2.77197 14.5455 3.35579 13 4.43496 11.7203C5.52948 10.4223 7.13528 9.40009 9.42202 9.4L9.42205 10ZM3.04314 15.8096L3.62121 15.9703C3.52787 16.306 3.7742 16.6813 4.24041 16.6813V17.2812V17.8812C3.10029 17.8812 2.12805 16.8608 2.46508 15.6488L3.04314 15.8096ZM4.24041 17.2812V16.6813H10.9924V17.2812V17.8812H4.24041V17.2812ZM10.9924 17.2812L10.4229 17.4702C9.88021 15.8346 9.38881 12.8466 11.637 10.2184L12.0929 10.6084L12.5489 10.9984C10.7041 13.1551 11.0732 15.6197 11.5618 17.0923L10.9924 17.2812ZM12.0929 10.6084L11.8217 11.1436C11.1608 10.8086 10.3712 10.6 9.42205 10.6V10V9.4C10.5548 9.4 11.5309 9.65089 12.3642 10.0732L12.0929 10.6084Z" fill="var(--stroke-0,#282D34)"/>
              <path d="M16 11L16.8499 12.8302L18.8532 13.0729L17.3752 14.4468L17.7634 16.4271L16 15.446L14.2366 16.4271L14.6248 14.4468L13.1468 13.0729L15.1501 12.8302L16 11Z" stroke="var(--stroke-0,#282D34)" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="nav-label">IB Profile</span>
          <span class="nav-tooltip">IB Profile</span>
        </a>
        <div class="nav-divider"></div>
        <a class="nav-item${page === 'ib-referral-links.html' ? ' active' : ''}" href="ib-referral-links.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1333 5.86667L5.86667 10.1333" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.7647 8.94118L13.6471 7.05882C14.9466 5.75933 14.9466 3.65243 13.6471 2.35294C12.3476 1.05345 10.2407 1.05345 8.94118 2.35294L7.05882 4.23529M4.23529 7.05882L2.35294 8.94118C1.05345 10.2407 1.05345 12.3476 2.35294 13.6471C3.65243 14.9466 5.75933 14.9466 7.05882 13.6471L8.94118 11.7647" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="nav-label">Referral Links</span>
          <span class="nav-tooltip">Referral Links</span>
        </a>
        <a class="nav-item${page === 'ib-campaign-links.html' ? ' active' : ''}" href="ib-campaign-links.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1333 5.86667L5.86667 10.1333" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.7647 8.94118L13.6471 7.05882C14.9466 5.75933 14.9466 3.65243 13.6471 2.35294C12.3476 1.05345 10.2407 1.05345 8.94118 2.35294L7.05882 4.23529M4.23529 7.05882L2.35294 8.94118C1.05345 10.2407 1.05345 12.3476 2.35294 13.6471C3.65243 14.9466 5.75933 14.9466 7.05882 13.6471L8.94118 11.7647" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M13.2498 15.0016V11.5012M2.7502 4.50041V1M1 2.7502H4.50041M11.4996 13.2514H15" stroke="var(--stroke-0,#282D34)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="nav-label">Campaign Links</span>
          <span class="nav-tooltip">Campaign Links</span>
        </a>
        <a class="nav-item${page === 'ib-contact-us.html' ? ' active' : ''}" href="ib-contact-us.html">
          <span class="nav-icon">
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7334 11C17.7332 9.49056 16.5095 8.2666 15 8.2666V7.06738C17.1722 7.06738 18.9334 8.82782 18.9336 11C18.9336 13.1723 17.1723 14.9336 15 14.9336V13.7334C16.5096 13.7334 17.7334 12.5096 17.7334 11Z" fill="var(--fill-0,#282D34)"/>
              <path d="M1.06738 11C1.06756 8.82793 2.82794 7.06756 5 7.06738V8.2666C3.49068 8.26678 2.26678 9.49067 2.2666 11C2.2666 12.5095 3.49057 13.7332 5 13.7334V14.9336C2.82783 14.9334 1.06738 13.1722 1.06738 11Z" fill="var(--fill-0,#282D34)"/>
              <path d="M14.4004 12.334V7.66699C14.4004 5.23694 12.43 3.2666 10 3.2666C7.56995 3.2666 5.59961 5.23694 5.59961 7.66699V14.334C5.59943 14.6652 5.33126 14.9336 5 14.9336C4.66874 14.9336 4.40057 14.6652 4.40039 14.334V7.66699C4.40039 4.5742 6.90721 2.06738 10 2.06738C13.0928 2.06738 15.5996 4.5742 15.5996 7.66699V12.334C15.5994 15.4266 13.0927 17.9336 10 17.9336C9.66874 17.9336 9.40057 17.6652 9.40039 17.334C9.40039 17.0026 9.66863 16.7334 10 16.7334C12.4299 16.7334 14.4002 14.7639 14.4004 12.334Z" fill="var(--fill-0,#282D34)"/>
            </svg>
          </span>
          <span class="nav-label">Contact Us</span>
          <span class="nav-tooltip">Contact Us</span>
        </a>
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
      <a class="flyout-item${page === 'wallet.html' ? ' active' : ''}" href="wallet.html">Overview</a>
      <a class="flyout-item${page === 'deposit.html' ? ' active' : ''}" href="deposit.html">Deposit funds</a>
      <a class="flyout-item${page === 'withdraw.html' ? ' active' : ''}" href="withdraw.html">Withdraw funds</a>
      <a class="flyout-item" href="#">Transfer between accounts</a>
      <a class="flyout-item${(page === 'transactionhistory.html' || page === 'fundhistory.html') ? ' active' : ''}" href="fundhistory.html">History</a>
    </div>
    <div class="nav-flyout" id="flyout-copytrading">
      <div class="flyout-title">Copy Trading</div>
      <a class="flyout-item${page === 'copy-trading.html' ? ' active' : ''}" href="copy-trading.html">Overview</a>
      <a class="flyout-item${page === 'copy-trading-portfolios.html' ? ' active' : ''}" href="copy-trading-portfolios.html">My portfolios</a>
      <a class="flyout-item${page === 'copy-trading-providers.html' ? ' active' : ''}" href="copy-trading-providers.html">Signal providers</a>
    </div>
    <div class="nav-flyout" id="ib-flyout-vtrade">
      <div class="flyout-title">VTrade</div>
      <a class="flyout-item" href="#">Become a Provider</a>
      <a class="flyout-item" href="#">Become a Follower</a>
      <a class="flyout-item${page === 'ib-vtrade-login.html' ? ' active' : ''}" href="ib-vtrade-login.html">Login to VTrade</a>
    </div>
    <div class="nav-flyout" id="flyout-tools">
      <div class="flyout-title">Tools</div>
      <a class="flyout-item${page === 'protradertools.html' ? ' active' : ''}" href="protradertools.html">ProTrader Tools</a>
      <a class="flyout-item${page === 'technicalanalysis.html' ? ' active' : ''}" href="technicalanalysis.html">Technical Analysis</a>
      <a class="flyout-item${page === 'protraderplatform.html' ? ' active' : ''}" href="protraderplatform.html">ProTrader Platform</a>
      <a class="flyout-item${page === 'nvc.html' ? ' active' : ''}" href="nvc.html">Notional Volume Calculator</a>
      <a class="flyout-item${page === 'analysisiq.html' ? ' active' : ''}" href="analysisiq.html">Acuity AnalysisIQ</a>
      <a class="flyout-item${page === 'tools.html' ? ' active' : ''}" href="tools.html">Daily Newsletter</a>
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

  /* ── IB / Client mode switching ─────────────────────────── */
  function applyIbMode(mode) {
    document.body.classList.toggle('ib-mode', mode === 'ib');
    // Sync topbar toggle buttons
    document.querySelectorAll('.topbar-toggle-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase() === mode);
    });
    // Sync mobile toggle buttons
    document.querySelectorAll('.mobile-toggle-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase() === mode);
    });
  }

  document.addEventListener('topbar-mode-change', e => {
    applyIbMode(e.detail.mode);
  });

  // Auto-apply IB mode when on an IB page
  if (page.startsWith('ib-')) {
    setTimeout(() => {
      applyIbMode('ib');
    }, 0);
  }

  /* ── Mobile Client/IB toggle (syncs with topbar) ─────────── */
  document.querySelectorAll('.mobile-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.textContent.trim().toLowerCase();
      const pg = location.pathname.split('/').pop() || 'index.html';
      const needsNav = (mode === 'ib' && !pg.startsWith('ib-')) || (mode === 'client' && pg.startsWith('ib-'));

      applyIbMode(mode);
      document.dispatchEvent(new CustomEvent('topbar-mode-change', { detail: { mode } }));

      if (needsNav) {
        const label = mode === 'ib' ? 'Switching to IB' : 'Switching to Client';
        const loader = document.createElement('div');
        loader.id = 'mob-mode-switch-loader';
        loader.innerHTML = `<div class="mmsl-inner"><div class="mmsl-spinner"></div><div class="mmsl-text">${label}</div></div>`;
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
          #mob-mode-switch-loader {
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(6px);
            display: flex; align-items: center; justify-content: center;
            animation: mmslFadeIn 0.18s ease;
          }
          @keyframes mmslFadeIn { from { opacity: 0; } to { opacity: 1; } }
          .mmsl-inner { display: flex; flex-direction: column; align-items: center; gap: 20px; }
          .mmsl-spinner {
            width: 44px; height: 44px; border-radius: 50%;
            border: 3px solid #e8f1ff; border-top-color: #0a36c7;
            animation: mmslSpin 0.7s linear infinite;
          }
          @keyframes mmslSpin { to { transform: rotate(360deg); } }
          .mmsl-text {
            font-family: 'Roboto', sans-serif;
            font-size: 16px; font-weight: 600; color: #282d34; letter-spacing: 0.01em;
          }`;
        document.head.appendChild(loaderStyle);
        document.body.appendChild(loader);
        setTimeout(() => {
          window.location.href = mode === 'ib' ? 'ib-dashboard.html' : 'index.html';
        }, 600);
      }
    });
  });

  /* ── Tab bar More button ─────────────────────────────────── */
  const tabbarMore = document.getElementById('tabbar-more');
  if (tabbarMore) tabbarMore.addEventListener('click', mobileSidebarOpen);

  function attachTooltip(item) {
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
  }

  document.querySelectorAll('.nav-item:not(.has-submenu)').forEach(attachTooltip);
  document.querySelectorAll('.ib-nav .nav-item').forEach(attachTooltip);

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

  // IB nav item click — set active (submenu items handled by global has-submenu handler)
  document.querySelectorAll('.ib-nav .nav-item:not(.has-submenu)').forEach(item => {
    item.addEventListener('click', e => {
      const href = item.getAttribute('href');
      if (!href || href === '#') e.preventDefault();
      document.querySelectorAll('.ib-nav .nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // IB VTrade flyout (collapsed state)
  const ibVtradeNav    = document.getElementById('ib-nav-vtrade');
  const ibVtradeFlyout = document.getElementById('ib-flyout-vtrade');
  if (ibVtradeNav && ibVtradeFlyout) {
    let ibFlyoutTimer;
    ibVtradeNav.addEventListener('mouseenter', () => {
      if (!sidebar.classList.contains('collapsed')) return;
      clearTimeout(ibFlyoutTimer);
      ibVtradeFlyout.style.top = ibVtradeNav.getBoundingClientRect().top + 'px';
      hideAllFlyouts();
      ibVtradeFlyout.classList.add('visible');
    });
    const ibStartHide = () => { ibFlyoutTimer = setTimeout(() => ibVtradeFlyout.classList.remove('visible'), 120); };
    ibVtradeNav.addEventListener('mouseleave', ibStartHide);
    ibVtradeFlyout.addEventListener('mouseenter', () => clearTimeout(ibFlyoutTimer));
    ibVtradeFlyout.addEventListener('mouseleave', ibStartHide);
  }

  // Auto-open wallet submenu on wallet sub-pages
  if (walletPages.includes(page)) {
    const walletSubmenu = document.getElementById('sub-wallet');
    const walletNav     = document.getElementById('nav-wallet');
    if (walletSubmenu) walletSubmenu.classList.add('open');
    if (walletNav)     walletNav.classList.add('submenu-open');
  }

  // Auto-open copy trading submenu on copy trading sub-pages
  if (copyTradingPages.includes(page)) {
    const ctSubmenu = document.getElementById('sub-copytrading');
    const ctNav     = document.getElementById('nav-copytrading');
    if (ctSubmenu) ctSubmenu.classList.add('open');
    if (ctNav)     ctNav.classList.add('submenu-open');
  }

  // Auto-open tools submenu on tools sub-pages
  if (toolsPages.includes(page)) {
    const toolsSubmenu = document.getElementById('sub-tools');
    const toolsNav     = document.getElementById('nav-tools');
    if (toolsSubmenu) toolsSubmenu.classList.add('open');
    if (toolsNav)     toolsNav.classList.add('submenu-open');
  }

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
