(function () {
  function pageKey() {
    return 'cl:' + location.pathname;
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(pageKey()) || '{}'); } catch { return {}; }
  }

  function save(state) {
    try { localStorage.setItem(pageKey(), JSON.stringify(state)); } catch {}
  }

  function init() {
    const boxes = document.querySelectorAll('.task-list-item input[type="checkbox"]');
    if (!boxes.length) return;

    const state = load();

    boxes.forEach(function (cb, i) {
      cb.removeAttribute('disabled');
      cb.style.cursor = 'pointer';
      if (state[i]) cb.checked = true;

      cb.addEventListener('change', function () {
        const s = load();
        s[i] = cb.checked;
        save(s);
      });
    });

    // Reset button
    const content = document.getElementById('content');
    if (!content) return;

    const btn = document.createElement('button');
    btn.textContent = 'Reset checklist';
    btn.style.cssText = [
      'margin-top:1.5rem',
      'padding:0.4rem 1rem',
      'font-size:0.8rem',
      'font-family:inherit',
      'background:transparent',
      'color:var(--text-muted,#9090a8)',
      'border:1px solid var(--border,rgba(255,255,255,0.07))',
      'border-radius:5px',
      'cursor:pointer',
      'transition:color 0.15s,border-color 0.15s',
    ].join(';');

    btn.addEventListener('mouseenter', function () {
      btn.style.color = 'var(--accent,#4f8ef7)';
      btn.style.borderColor = 'var(--accent-border,rgba(79,142,247,0.35))';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.color = 'var(--text-muted,#9090a8)';
      btn.style.borderColor = 'var(--border,rgba(255,255,255,0.07))';
    });
    btn.addEventListener('click', function () {
      save({});
      boxes.forEach(function (cb) { cb.checked = false; });
    });

    content.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
