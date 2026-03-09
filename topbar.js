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
  `;
  document.head.appendChild(style);

  /* ── Build HTML ──────────────────────────────────────────── */
  const html = `
    <header class="topbar">
      <div class="topbar-btn-outline topbar-webtrader">Webtrader+</div>
      <div class="topbar-btn-outline topbar-deposit">Deposit</div>
      <div class="topbar-icon-btn" title="Coupons"><img src="images/imgCoupons.svg" width="20" height="20" alt="Coupons" /></div>
      <div class="topbar-icon-btn" title="Language"><img src="images/imgIcoLanguage.svg" width="20" height="20" alt="Language" /></div>
      <div class="topbar-icon-btn" title="Price Alert"><img src="images/imgFrame.svg" width="20" height="20" alt="Price Alert" /></div>
      <div class="topbar-avatar" title="Profile"><img src="images/img7.png" width="32" height="32" alt="Profile" /></div>
      <div class="topbar-toggle">
        <div class="topbar-toggle-btn active">Client</div>
        <div class="topbar-toggle-btn">IB</div>
      </div>
    </header>`;

  const root = document.getElementById('topbar-root');
  root.innerHTML = html;

  /* ── Attach behaviour ────────────────────────────────────── */
  document.querySelectorAll('.topbar-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.topbar-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();
