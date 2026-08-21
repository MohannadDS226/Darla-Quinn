const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const header = document.querySelector('.site-header');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.transform = y > lastY && y > 120 ? 'translateY(-110%)' : 'translateY(0)';
  header.style.transition = 'transform .35s ease';
  lastY = y;
}, { passive: true });

// Hero composition override: keep the visual emphasis on Darla's face and performance.
const heroComposition = document.createElement('style');
heroComposition.textContent = `
  .hero-media {
    background-position: 58% 0% !important;
    animation: heroDriftFace 18s ease-in-out infinite alternate !important;
  }

  @keyframes heroDriftFace {
    from { transform: scale(1.03) translateY(0); }
    to { transform: scale(1.055) translateY(0); }
  }

  @media (max-width: 900px) {
    .hero-media {
      background-position: 57% 0% !important;
    }
  }
`;
document.head.appendChild(heroComposition);

const preloader = document.getElementById('preloader');
const minimumLoaderTime = 1550;
const loaderStartedAt = performance.now();

function revealSite() {
  if (!preloader || preloader.dataset.done === 'true') return;
  preloader.dataset.done = 'true';
  const elapsed = performance.now() - loaderStartedAt;
  const wait = Math.max(0, minimumLoaderTime - elapsed);

  window.setTimeout(() => {
    preloader.classList.add('is-leaving');
    document.body.classList.remove('is-loading');
    window.setTimeout(() => preloader.remove(), 700);
  }, wait);
}

if (document.readyState === 'complete') {
  revealSite();
} else {
  window.addEventListener('load', revealSite, { once: true });
  window.setTimeout(revealSite, 3200);
}
