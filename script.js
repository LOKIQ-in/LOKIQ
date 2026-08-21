document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header shrink on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

// Gentle reveal-on-scroll for cards
const revealTargets = document.querySelectorAll('.service-card, .work-card, .process-step, .contact-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});

// Count-up animation for hero stats
const statEls = document.querySelectorAll('.stat-num[data-count]');
const countUp = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 900;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statsIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statEls.forEach(countUp);
      statsIo.disconnect();
    }
  });
}, { threshold: 0.4 });
if (statEls.length) statsIo.observe(document.querySelector('.hero-stats'));

