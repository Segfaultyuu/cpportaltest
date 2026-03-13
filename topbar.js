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

    .topbar-icon-btn {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 8px; cursor: pointer; color: var(--text-secondary);
      transition: background 0.15s; border: none; background: transparent;
    }

    .topbar-icon-btn:hover { background: var(--bg-2); }

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
    }
    .topbar-download:hover { background: var(--bg-2); }

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
      .topbar-right-icons { flex: 1; justify-content: flex-end; gap: 16px; }
      .topbar-language { display: none !important; }
      .topbar-webtrader-mobile { display: flex !important; }
      .topbar-download { display: flex !important; }
      .topbar-dropdown { display: none !important; }
    }
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
        <div class="topbar-icon-btn" title="Coupons"><img src="images/imgCoupons.svg" width="20" height="20" alt="Coupons" /></div>
        <div class="topbar-icon-btn topbar-language" title="Language"><img src="images/imgIcoLanguage.svg" width="20" height="20" alt="Language" /></div>
        <div class="topbar-icon-btn" title="Price Alert"><img src="images/imgFrame.svg" width="20" height="20" alt="Price Alert" /></div>
        <button class="topbar-download" title="Download"><img src="images/download.png" width="24" height="24" alt="Download" /></button>
      </div>
      <div class="topbar-avatar-wrap" id="topbar-avatar-wrap">
        <div class="topbar-avatar" id="topbar-avatar" title="Profile"><img src="images/img7.png" width="32" height="32" alt="Profile" /></div>
        <div class="topbar-dropdown" id="topbar-dropdown">
          <div class="topbar-dd-header">
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
          <div class="topbar-dd-item">
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

  /* ── Attach behaviour ────────────────────────────────────── */
  document.getElementById('topbar-hamburger').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('sidebar-mobile-toggle'));
  });

  document.querySelectorAll('.topbar-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.topbar-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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
})();
