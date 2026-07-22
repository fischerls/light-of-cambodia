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
