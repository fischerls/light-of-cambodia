document.documentElement.classList.add('js');

// sticky nav state
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('mobile-menu');
toggle.addEventListener('click', () => {
  const open = menu.hidden;
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

// scroll reveals (content is visible without JS; this only enhances)
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// guarantee visibility even if the observer never fires (headless, print, odd embeds)
setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')), 2500);

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- stories carousel (homepage) ---------- */
(() => {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;
  const track = root.querySelector('[data-carousel-track]');
  const slides = [...root.querySelectorAll('.carousel-slide')];
  const controls = root.querySelector('[data-carousel-controls]');
  const dotWrap = root.querySelector('[data-carousel-dots]');
  if (slides.length < 2) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;
  let paused = false;

  const dots = slides.map((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'carousel-dot';
    b.setAttribute('aria-label', `Show story ${i + 1} of ${slides.length}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotWrap.append(b);
    return b;
  });

  function go(next) {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, i) => {
      const on = i === index;
      s.inert = !on;
      s.setAttribute('aria-hidden', String(!on));
    });
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
  }
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  function restart() {
    clearInterval(timer);
    if (reduced || paused) return;
    timer = setInterval(() => { if (!paused && !document.hidden) next(); }, 5500);
  }

  root.querySelector('[data-carousel-prev]').addEventListener('click', () => { prev(); restart(); });
  root.querySelector('[data-carousel-next]').addEventListener('click', () => { next(); restart(); });
  root.addEventListener('mouseenter', () => { paused = true; });
  root.addEventListener('mouseleave', () => { paused = false; restart(); });
  root.addEventListener('focusin', () => { paused = true; });
  root.addEventListener('focusout', () => { if (!root.contains(document.activeElement)) { paused = false; restart(); } });
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft') { prev(); restart(); }
  });

  controls.hidden = false;
  go(0);
  restart();
})();

/* ---------- prayer request form ---------- */
(() => {
  const form = document.getElementById('prayer-form');
  if (!form) return;
  const status = document.getElementById('pf-status');
  const loadedAt = document.getElementById('pf-loaded-at');
  const submit = form.querySelector('button[type="submit"]');
  loadedAt.value = String(Date.now());

  // Cloudflare Turnstile renders only once a site key is set here.
  const TURNSTILE_SITEKEY = '';
  if (TURNSTILE_SITEKEY) {
    const mount = document.getElementById('pf-turnstile');
    mount.className = 'cf-turnstile';
    mount.dataset.sitekey = TURNSTILE_SITEKEY;
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    document.head.append(s);
  }

  const say = (msg, state) => { status.textContent = msg; status.dataset.state = state; };

  // no-JS submissions come back here via redirect
  const sent = new URLSearchParams(location.search).get('sent');
  if (sent === '1') say("Thank you for trusting us with this. We're honored to carry it with you.", 'ok');
  if (sent === 'error') say('Something went wrong sending that. Please email lightofcambodia.loc@gmail.com and we will pray with you.', 'error');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const message = form.message.value.trim();
    if (!message) {
      say('Please tell us what to pray for before sending.', 'error');
      form.message.focus();
      return;
    }
    submit.disabled = true;
    say('Sending…', '');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      loadedAt.value = String(Date.now());
      say("Thank you for trusting us with this. We're honored to carry it with you.", 'ok');
    } catch (err) {
      say('Something went wrong sending that. Please email lightofcambodia.loc@gmail.com and we will pray with you.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
})();
