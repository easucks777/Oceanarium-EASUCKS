// Elements
const faunaList = document.getElementById('fauna-list');
const openFauna = document.getElementById('openFauna');
const closeFauna = document.getElementById('closeFauna');
const backToTop = document.getElementById('backToTop');

// Open fauna popup
openFauna.addEventListener('click', (e) => {
  e.preventDefault();
  faunaList.style.display = 'block';
  faunaList.setAttribute('aria-hidden','false');
  // focus close button for accessibility
  closeFauna && closeFauna.focus();
});

// Close fauna popup by cross
closeFauna.addEventListener('click', () => {
  faunaList.style.display = 'none';
  faunaList.setAttribute('aria-hidden','true');
  openFauna.focus();
});

// Smooth scroll to target when clicking a fauna link, then close popup
document.querySelectorAll('.fauna-scroll a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close popup after a short delay to allow user to see movement start
      faunaList.style.display = 'none';
      faunaList.setAttribute('aria-hidden','true');
    }
  });
});

// Back-to-top visibility
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});

// Smooth back-to-top
backToTop.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
});

// Close fauna popup if user presses Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && faunaList.style.display === 'block') {
    faunaList.style.display = 'none';
    faunaList.setAttribute('aria-hidden','true');
    openFauna.focus();
  }
});

// Поиск по списку рыб
const faunaSearch = document.getElementById('faunaSearch');
if (faunaSearch) {
  faunaSearch.addEventListener('input', () => {
    const filter = faunaSearch.value.toLowerCase();
    document.querySelectorAll('.fauna-scroll li').forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(filter) ? '' : 'none';
    });
  });
}