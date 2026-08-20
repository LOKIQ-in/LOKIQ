document.getElementById('year').textContent = new Date().getFullYear();

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
