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

// Growth chart bars: set target height/y from data-h, trigger on load
const chartBars = document.querySelectorAll('.chart-bars rect');
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    chartBars.forEach(rect => {
      const h = parseFloat(rect.getAttribute('data-h'));
      rect.style.height = h + 'px';
      rect.style.y = (130 - h) + 'px';
    });
  });
});

// Particle network background in hero
(() => {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COUNT = 46;
  const MAX_DIST = 130;

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }
  function init(){
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
  }
  function tick(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.strokeStyle = `rgba(46,134,235,${(1 - dist / MAX_DIST) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.fillStyle = 'rgba(95,182,245,0.55)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resize();
  init();
  if (!prefersReduced) requestAnimationFrame(tick);
  window.addEventListener('resize', () => { resize(); init(); });
})();

// Work video cards: click to play/pause
document.querySelectorAll('.work-video-thumb').forEach(thumb => {
  const video = thumb.querySelector('.work-video');
  if (!video) return;

  video.addEventListener('loadeddata', () => video.classList.add('is-ready'));
  video.addEventListener('error', () => thumb.classList.add('video-missing'));

  thumb.addEventListener('click', () => {
    if (video.classList.contains('video-missing')) return;
    if (video.paused) {
      document.querySelectorAll('.work-video').forEach(v => { if (v !== video) v.pause(); });
      video.play();
      thumb.classList.add('is-playing');
    } else {
      video.pause();
      thumb.classList.remove('is-playing');
    }
  });
  video.addEventListener('ended', () => thumb.classList.remove('is-playing'));
});

