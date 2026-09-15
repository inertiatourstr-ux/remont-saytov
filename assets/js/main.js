(() => {
  'use strict';

  /* ---------- меню на телефоне ---------- */
  const topbar = document.querySelector('.topbar');
  const burger = topbar.querySelector('.burger');
  const nav = document.getElementById('nav');

  const setMenu = (open) => {
    topbar.classList.toggle('is-menu', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };
  burger.addEventListener('click', () => setMenu(!topbar.classList.contains('is-menu')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', (e) => { if (!topbar.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- аккордеоны: открыт максимум один пункт ---------- */
  document.querySelectorAll('[data-acc]').forEach((group) => {
    const items = [...group.querySelectorAll('.acc')];
    const setItem = (item, open) => {
      const btn = item.querySelector('.acc__btn');
      const sign = item.querySelector('.acc__sign');
      btn.setAttribute('aria-expanded', String(open));
      item.querySelector('.acc__panel').hidden = !open;
      sign.textContent = open ? sign.dataset.open : sign.dataset.closed;
    };
    items.forEach((item) => {
      item.querySelector('.acc__btn').addEventListener('click', (e) => {
        const open = e.currentTarget.getAttribute('aria-expanded') !== 'true';
        items.forEach((it) => setItem(it, it === item && open));
      });
    });
  });

  /* ---------- кейсы: стрелки, свайп, высота по активному слайду ---------- */
  const viewport = document.querySelector('.cases__viewport');
  if (viewport) {
    const track = viewport.querySelector('.cases__track');
    const slides = [...track.children];
    const num = document.querySelector('[data-case-num]');
    let idx = 0;

    const fitHeight = () => { viewport.style.height = slides[idx].offsetHeight + 'px'; };
    const go = (i) => {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(calc(${-100 * idx}% - ${24 * idx}px))`;
      num.textContent = String(idx + 1).padStart(2, '0');
      slides.forEach((s, k) => {
        s.setAttribute('aria-hidden', String(k !== idx));
        s.inert = k !== idx;
      });
      fitHeight();
    };

    document.querySelector('[data-case="prev"]').addEventListener('click', () => go(idx - 1));
    document.querySelector('[data-case="next"]').addEventListener('click', () => go(idx + 1));

    let x0 = null, y0 = null;
    viewport.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });

    if ('ResizeObserver' in window) new ResizeObserver(fitHeight).observe(track);
    else addEventListener('resize', fitHeight);
    go(0);
  }

  /* ---------- заявка: открываем личный Telegram с уже набранным сообщением ---------- */
  const TG_USER = 'Webfusiondigital';
  const form = document.getElementById('lead-form');
  if (form) {
    const ok = document.getElementById('lead-ok');
    const msg = form.querySelector('.lead__msg');
    const urlInput = form.elements.url;

    urlInput.addEventListener('input', () => {
      if (urlInput.value.trim()) { urlInput.removeAttribute('aria-invalid'); msg.textContent = ''; }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const site = urlInput.value.trim();
      if (!site) {
        urlInput.setAttribute('aria-invalid', 'true');
        msg.textContent = 'Укажите адрес сайта — без него не сможем сделать аудит.';
        urlInput.focus();
        return;
      }

      const contact = form.elements.contact.value.trim();
      const problem = form.elements.problem.value.trim();
      const text = [
        'Здравствуйте! Нужен экспресс-аудит сайта.',
        'Сайт: ' + site,
        contact && 'Контакт: ' + contact,
        problem && 'Что случилось: ' + problem
      ].filter(Boolean).join('\n');
      const link = `https://t.me/${TG_USER}?text=${encodeURIComponent(text)}`;

      // запасной путь: если Telegram не подставит текст, его можно вставить из буфера
      try { navigator.clipboard.writeText(text).catch(() => {}); } catch (_) {}

      ok.querySelector('[data-sent-url]').textContent = site;
      ok.querySelector('[data-tg-link]').href = link;
      form.hidden = true;
      ok.hidden = false;

      const win = window.open(link, '_blank');
      if (win) win.opener = null;
      else location.href = link; // встроенные браузеры (Instagram, VK) блокируют новые окна
    });
  }

  /* ---------- cookie-баннер ---------- */
  const cookie = document.getElementById('cookie');
  if (cookie) {
    let accepted = false;
    try { accepted = localStorage.getItem('cookie-ok') === '1'; } catch (_) {}
    cookie.hidden = accepted;
    cookie.querySelector('[data-cookie-ok]').addEventListener('click', () => {
      cookie.hidden = true;
      try { localStorage.setItem('cookie-ok', '1'); } catch (_) {}
    });
  }
})();
