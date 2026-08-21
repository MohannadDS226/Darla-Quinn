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
    .hero-media { background-position: 57% 0% !important; }
  }
`;
document.head.appendChild(heroComposition);

// -----------------------------------------------------------------------------
// Darla Quinn — cinematic typography motion system
// Quiet, lyrical movement rather than generic website animation.
// -----------------------------------------------------------------------------
const typeStyles = document.createElement('style');
typeStyles.textContent = `
  :root { --ease-song: cubic-bezier(.22,1,.36,1); }

  .type-clip { overflow: hidden; display: block; padding-bottom: .08em; margin-bottom: -.08em; }
  .type-clip > .type-inner {
    display: inline-block;
    transform: translateY(116%) rotate(2deg);
    opacity: 0;
    filter: blur(7px);
    transition: transform 1.15s var(--ease-song), opacity .75s ease, filter 1s ease;
    will-change: transform, opacity, filter;
  }
  .type-clip.type-in > .type-inner {
    transform: translateY(0) rotate(0);
    opacity: 1;
    filter: blur(0);
  }

  .hero .type-clip:nth-of-type(2) > .type-inner { transition-delay: .12s; }
  .hero .type-clip:nth-of-type(3) > .type-inner { transition-delay: .22s; }

  .hero .eyebrow,
  .hero .hero-deck,
  .hero .hero-actions,
  .hero .scroll-cue {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity .85s ease, transform .95s var(--ease-song), letter-spacing 1s var(--ease-song);
  }
  body.type-ready .hero .eyebrow { opacity: 1; transform: none; transition-delay: .42s; letter-spacing: .24em; }
  body.type-ready .hero .hero-deck { opacity: 1; transform: none; transition-delay: .55s; }
  body.type-ready .hero .hero-actions { opacity: 1; transform: none; transition-delay: .68s; }
  body.type-ready .hero .scroll-cue { opacity: 1; transform: none; transition-delay: .9s; }

  .hero-signature {
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    transition: opacity 1.4s ease .7s, clip-path 1.8s var(--ease-song) .7s !important;
  }
  body.type-ready .hero-signature { opacity: 1; clip-path: inset(0 0 0 0); }

  .type-title {
    overflow: hidden;
  }
  .type-title .type-title-inner {
    display: inline-block;
    transform: translateY(108%);
    opacity: .12;
    filter: blur(4px);
    transition: transform 1.05s var(--ease-song), opacity .72s ease, filter .9s ease;
  }
  .type-title.type-in .type-title-inner {
    transform: translateY(0);
    opacity: 1;
    filter: blur(0);
  }

  .manifesto-word {
    display: inline-block;
    opacity: .12;
    transform: translateY(.25em);
    filter: blur(2px);
    transition: opacity .55s ease, transform .72s var(--ease-song), filter .7s ease;
  }
  .manifesto-copy.type-in .manifesto-word {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  .section-kicker.type-kicker {
    opacity: 0;
    transform: translateX(-14px);
    letter-spacing: .32em;
    transition: opacity .7s ease, transform .85s var(--ease-song), letter-spacing 1s var(--ease-song);
  }
  .section-kicker.type-kicker.type-in {
    opacity: 1;
    transform: none;
    letter-spacing: .18em;
  }

  .lyric-band p {
    transform-origin: center;
    transition: transform 1.5s var(--ease-song), opacity 1.1s ease, filter 1.2s ease;
  }
  .lyric-band:not(.type-in) p { opacity: .08; transform: scale(.965); filter: blur(5px); }
  .lyric-band.type-in p { opacity: 1; transform: scale(1); filter: blur(0); }
  .lyric-band span {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity .8s ease .5s, transform .9s var(--ease-song) .5s;
  }
  .lyric-band.type-in span { opacity: 1; transform: none; }

  .release-item h3 {
    transition: transform .5s var(--ease-song), font-style .3s ease, letter-spacing .5s ease;
  }
  .release-item:hover h3 { transform: translateX(10px); font-style: italic; letter-spacing: -.01em; }
  .release-item span:first-child { transition: transform .45s var(--ease-song), opacity .45s ease; }
  .release-item:hover span:first-child { transform: rotate(-8deg) scale(1.12); opacity: .55; }

  .journal-card h3 { transition: letter-spacing .55s var(--ease-song), transform .55s var(--ease-song); }
  .journal-card:hover h3 { letter-spacing: -.045em; transform: translateY(-3px); }

  .wordmark {
    position: relative;
    transition: letter-spacing .55s var(--ease-song), opacity .35s ease;
  }
  .wordmark:hover { letter-spacing: .26em; }

  nav a { position: relative; }
  nav a::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: -5px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform .45s var(--ease-song);
  }
  nav a:hover::after { transform: scaleX(1); transform-origin: left; }

  .button { position: relative; overflow: hidden; }
  .button::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 2px;
    background: currentColor;
    transform: translateX(-102%);
    transition: transform .55s var(--ease-song);
  }
  .button:hover::after { transform: translateX(0); }

  .marquee div { transition: letter-spacing .8s var(--ease-song); }
  .marquee:hover div { letter-spacing: .38em; }

  .portrait-caption span {
    display: inline-block;
    transition: transform .75s var(--ease-song), letter-spacing .75s var(--ease-song);
  }
  .portrait-break:hover .portrait-caption span:first-child { transform: translateX(10px); letter-spacing: .02em; }
  .portrait-break:hover .portrait-caption span:last-child { transform: translateX(-10px); letter-spacing: .02em; }

  @media (max-width: 900px) {
    .hero .eyebrow, .hero .hero-deck, .hero .hero-actions { transition-duration: .7s; }
    .wordmark:hover { letter-spacing: .18em; }
  }

  @media (prefers-reduced-motion: reduce) {
    .type-clip > .type-inner,
    .type-title .type-title-inner,
    .manifesto-word,
    .section-kicker.type-kicker,
    .lyric-band p,
    .lyric-band span,
    .hero-signature,
    .hero .eyebrow,
    .hero .hero-deck,
    .hero .hero-actions,
    .hero .scroll-cue {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
      clip-path: none !important;
      transition: none !important;
    }
  }
`;
document.head.appendChild(typeStyles);

function wrapTitle(el) {
  if (!el || el.dataset.typeWrapped) return;
  el.dataset.typeWrapped = 'true';
  const html = el.innerHTML;
  el.innerHTML = `<span class="type-title-inner">${html}</span>`;
  el.classList.add('type-title');
}

function splitManifesto(el) {
  if (!el || el.dataset.typeWrapped) return;
  el.dataset.typeWrapped = 'true';
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((word, i) => `<span class="manifesto-word" style="transition-delay:${Math.min(i * 24, 620)}ms">${word}</span>`).join(' ');
}

// Hero gets a bespoke two-line reveal matching the editorial line break.
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  heroTitle.innerHTML = `
    <span class="type-clip"><span class="type-inner">Stories for the</span></span>
    <span class="type-clip"><span class="type-inner"><em>in-between.</em></span></span>
  `;
}

splitManifesto(document.querySelector('.manifesto-copy'));

document.querySelectorAll('.section-heading h2, .featured h2, .listening-room h2, .closing-cta h2').forEach(wrapTitle);
document.querySelectorAll('.section-kicker').forEach((el) => el.classList.add('type-kicker'));

const typeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('type-in');
    typeObserver.unobserve(entry.target);
  });
}, { threshold: 0.18, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.type-title, .type-kicker, .manifesto-copy, .lyric-band').forEach((el) => typeObserver.observe(el));

// Gentle typography parallax: the marquee responds subtly to scrolling.
const marqueeTrack = document.querySelector('.marquee div');
let marqueeRAF = null;
window.addEventListener('scroll', () => {
  if (!marqueeTrack || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (marqueeRAF) return;
  marqueeRAF = requestAnimationFrame(() => {
    marqueeTrack.style.setProperty('--scroll-shift', `${Math.min(window.scrollY * .018, 24)}px`);
    marqueeRAF = null;
  });
}, { passive: true });

const preloader = document.getElementById('preloader');
const minimumLoaderTime = 1550;
const loaderStartedAt = performance.now();

function startHeroTypography() {
  document.body.classList.add('type-ready');
  document.querySelectorAll('.hero .type-clip').forEach((el, i) => {
    window.setTimeout(() => el.classList.add('type-in'), 120 + i * 135);
  });
}

function revealSite() {
  if (!preloader || preloader.dataset.done === 'true') return;
  preloader.dataset.done = 'true';
  const elapsed = performance.now() - loaderStartedAt;
  const wait = Math.max(0, minimumLoaderTime - elapsed);

  window.setTimeout(() => {
    preloader.classList.add('is-leaving');
    document.body.classList.remove('is-loading');
    window.setTimeout(startHeroTypography, 180);
    window.setTimeout(() => preloader.remove(), 700);
  }, wait);
}

if (!preloader) {
  startHeroTypography();
} else if (document.readyState === 'complete') {
  revealSite();
} else {
  window.addEventListener('load', revealSite, { once: true });
  window.setTimeout(revealSite, 3200);
}
