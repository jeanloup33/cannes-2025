document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const toggle = document.querySelector('#nav-toggle'); // Changé de .nav-toggle à #nav-toggle
  const menu = document.querySelector('#mobile-menu'); // Changé de .navmenu à #mobile-menu
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('hidden', !open); // Utilise menu au lieu de menus
      document.body.classList.toggle('overflow-hidden', open);
    };
    setOpen(false);
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('header')) setOpen(false);
    });
    menu.addEventListener('click', e => { // Utilise menu au lieu de menus.forEach
      if (e.target.closest('a')) setOpen(false);
    });
  }

  // Smooth anchor scrolling with offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        const y = document.querySelector(id).getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Countdown to 2025-09-13T20:00:00 local
  const target = new Date('2025-09-13T20:00:00');
  const el = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-mins]'),
    secs: document.querySelector('[data-secs]')
  };
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000*60*60*24)); diff -= d * 86400000;
    const h = Math.floor(diff / (1000*60*60)); diff -= h * 3600000;
    const m = Math.floor(diff / (1000*60)); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    if (el.days) el.days.textContent = pad(d);
    if (el.hours) el.hours.textContent = pad(h);
    if (el.mins) el.mins.textContent = pad(m);
    if (el.secs) el.secs.textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);

  // Fake form submit (remplacez par votre backend si besoin)
  const form = document.querySelector('#form');
  const status = document.querySelector('#status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Envoi en cours...';
      try {
        await new Promise(r => setTimeout(r, 1000));
        status.textContent = 'Merci ! Nous revenons vers vous rapidement.';
        form.reset();
      } catch (err) {
        status.textContent = 'Oups, une erreur est survenue. Réessayez.';
      }
    });
  }
});
