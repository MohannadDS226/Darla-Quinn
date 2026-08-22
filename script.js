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

const BRAND = {
  monogram: 'https://res.cloudinary.com/vysyrabp/image/upload/v1787341587/darla-quinn/dq-monogram.png',
  wordmark: 'https://res.cloudinary.com/vysyrabp/image/upload/v1787341579/darla-quinn/header-logo.png',
  favicon: 'https://res.cloudinary.com/vysyrabp/image/upload/v1787341604/darla-quinn/favicon-64.png',
  signature: 'assets/brand/DarlaQuinn_Signature_MutedGold_Transparent.png'
};

function applyBrandAssets() {
  document.querySelectorAll('link[rel="icon"]').forEach((link) => {
    link.href = BRAND.favicon + '?v=2';
    link.type = 'image/png';
  });
  document.querySelectorAll('link[rel="apple-touch-icon"]').forEach((link) => {
    link.href = BRAND.favicon + '?v=2';
  });

  const preloaderMark = document.querySelector('.preloader-monogram');
  if (preloaderMark) preloaderMark.src = BRAND.monogram;

  const lockup = document.querySelector('.brand-lockup');
  if (lockup) {
    lockup.innerHTML = `<img class="brand-wordmark" src="${BRAND.wordmark}" alt="Darla Quinn" />`;
  }

  const heroSignature = document.querySelector('.hero-signature');
  if (heroSignature && !heroSignature.classList.contains('hero-signature-asset')) {
    const sig = document.createElement('img');
    sig.className = 'hero-signature hero-signature-asset';
    sig.src = BRAND.signature;
    sig.alt = '';
    sig.setAttribute('aria-hidden', 'true');
    heroSignature.replaceWith(sig);
  }

  const closing = document.querySelector('.closing-brand');
  if (closing) {
    closing.innerHTML = `<img class="closing-monogram" src="${BRAND.monogram}" alt="" aria-hidden="true" /><span>DARLA QUINN</span>`;
  }

  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    footerBrand.innerHTML = `<img class="footer-wordmark" src="${BRAND.wordmark}" alt="Darla Quinn" /><p>Independent singer-songwriter<br>Storytelling through music</p>`;
  }
}
applyBrandAssets();

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
  @media (max-width: 900px) { .hero-media { background-position: 57% 0% !important; } }
`;
document.head.appendChild(heroComposition);

const brandStyles = document.createElement('style');
brandStyles.textContent = `
  :root { --brand-gold:#c9ae86; --brand-cream:#f4ebdd; --brand-ink:#171512; }

  .brand-lockup {
    display:block;
    width:clamp(180px, 16vw, 290px);
    line-height:0;
  }
  .brand-lockup .brand-wordmark {
    width:100% !important;
    height:auto !important;
    max-width:none !important;
    display:block;
    border-radius:0 !important;
    box-shadow:none !important;
    transition:opacity .35s ease, transform .55s cubic-bezier(.22,1,.36,1);
  }
  .brand-lockup:hover .brand-wordmark { opacity:.84; transform:translateX(3px); }

  .preloader-monogram {
    width:74px !important;
    height:auto !important;
    aspect-ratio:auto !important;
    margin:0 auto 16px;
    border-radius:0 !important;
    box-shadow:none !important;
    animation:markBreath 1.8s ease-in-out infinite;
  }
  @keyframes markBreath { 0%,100%{transform:scale(.96);opacity:.72} 50%{transform:scale(1);opacity:1} }

  .hero-signature-asset {
    width:clamp(260px, 30vw, 560px) !important;
    height:auto !important;
    right:4.5vw !important;
    top:15vh !important;
    transform:translateZ(0) !important;
    object-fit:contain;
    image-rendering:auto;
    backface-visibility:hidden;
    will-change:clip-path,opacity;
  }

  .closing-brand {
    display:flex;
    align-items:center;
    gap:18px;
    margin-bottom:32px;
    opacity:.82;
  }
  .closing-brand .closing-monogram {
    width:58px !important;
    height:auto !important;
    border-radius:0 !important;
  }
  .closing-brand span { font-size:11px; letter-spacing:.28em; font-weight:600; }

  .footer-brand {
    display:flex;
    flex-direction:column;
    gap:16px;
    align-items:flex-start;
    max-width:420px;
  }
  .footer-brand .footer-wordmark {
    width:clamp(210px,22vw,360px) !important;
    height:auto !important;
    border-radius:0 !important;
  }
  .footer-brand p { margin:0; }

  .featured::before {
    content:"DQ";
    position:absolute;
    inset:auto 3vw 2vw auto;
    font-family:"Playfair Display",serif;
    font-size:clamp(90px,14vw,230px);
    line-height:.7;
    color:rgba(248,244,236,.035);
    pointer-events:none;
  }
  .featured { position:relative; overflow:hidden; }

  @media (max-width:900px){
    .brand-lockup { width:150px; }
    .preloader-monogram { width:58px !important; }
    .hero-signature-asset { width:230px !important; top:13vh !important; right:18px !important; }
    .closing-brand .closing-monogram { width:44px !important; }
    .footer-brand .footer-wordmark { width:230px !important; }
  }
  @media (prefers-reduced-motion: reduce){ .preloader-monogram{animation:none} }
`;
document.head.appendChild(brandStyles);

const typeStyles = document.createElement('style');
typeStyles.textContent = `
  :root { --ease-song: cubic-bezier(.22,1,.36,1); }
  .type-clip { overflow: hidden; display: block; padding:.14em 0 .12em; margin:-.14em 0 -.12em; }
  .type-clip > .type-inner { display:inline-block; transform:translateY(116%) rotate(2deg); opacity:0; filter:blur(7px); transition:transform 1.15s var(--ease-song),opacity .75s ease,filter 1s ease; will-change:transform,opacity,filter; }
  .type-clip.type-in > .type-inner { transform:translateY(0) rotate(0); opacity:1; filter:blur(0); }
  .hero .eyebrow,.hero .hero-deck,.hero .hero-actions,.hero .scroll-cue { opacity:0; transform:translateY(14px); transition:opacity .85s ease,transform .95s var(--ease-song),letter-spacing 1s var(--ease-song); }
  body.type-ready .hero .eyebrow { opacity:1; transform:none; transition-delay:.42s; letter-spacing:.24em; }
  body.type-ready .hero .hero-deck { opacity:1; transform:none; transition-delay:.55s; }
  body.type-ready .hero .hero-actions { opacity:1; transform:none; transition-delay:.68s; }
  body.type-ready .hero .scroll-cue { opacity:1; transform:none; transition-delay:.9s; }
  .hero-signature { opacity:0; clip-path:inset(0 100% 0 0); transition:opacity 1.4s ease .7s,clip-path 1.8s var(--ease-song) .7s!important; }
  body.type-ready .hero-signature { opacity:.28; clip-path:inset(0 0 0 0); }
  .type-title { overflow:visible; padding:.12em 0 .14em; margin:-.12em 0 -.14em; }
  .type-title .type-title-inner { display:inline-block; transform:translateY(108%); opacity:.12; filter:blur(4px); transition:transform 1.05s var(--ease-song),opacity .72s ease,filter .9s ease; }
  .type-title.type-in .type-title-inner { transform:translateY(0); opacity:1; filter:blur(0); }
  .manifesto-word { display:inline-block; opacity:.12; transform:translateY(.25em); filter:blur(2px); transition:opacity .55s ease,transform .72s var(--ease-song),filter .7s ease; }
  .manifesto-copy.type-in .manifesto-word { opacity:1; transform:translateY(0); filter:blur(0); }
  .section-kicker.type-kicker { opacity:0; transform:translateX(-14px); letter-spacing:.32em; transition:opacity .7s ease,transform .85s var(--ease-song),letter-spacing 1s var(--ease-song); }
  .section-kicker.type-kicker.type-in { opacity:1; transform:none; letter-spacing:.18em; }
  .lyric-band:not(.type-in) p { opacity:.08; transform:scale(.965); filter:blur(5px); }
  .lyric-band.type-in p { opacity:1; transform:scale(1); filter:blur(0); }
  .release-item h3 { transition:transform .5s var(--ease-song),font-style .3s ease,letter-spacing .5s ease; }
  .release-item:hover h3 { transform:translateX(10px); font-style:italic; letter-spacing:-.01em; }
  nav a { position:relative; }
  nav a::after { content:''; position:absolute; left:0; right:0; bottom:-5px; height:1px; background:currentColor; transform:scaleX(0); transform-origin:right; transition:transform .45s var(--ease-song); }
  nav a:hover::after { transform:scaleX(1); transform-origin:left; }
  @media (prefers-reduced-motion: reduce){ .type-clip>.type-inner,.type-title .type-title-inner,.manifesto-word,.section-kicker.type-kicker,.hero-signature,.hero .eyebrow,.hero .hero-deck,.hero .hero-actions,.hero .scroll-cue{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important;transition:none!important} }
`;
document.head.appendChild(typeStyles);

const instagramStyles = document.createElement('style');
instagramStyles.textContent = `
  .instagram-news {
    background:#eee4d8;
    color:var(--ink);
    padding:110px 1.8vw 120px;
    overflow:hidden;
  }
  .instagram-news-heading { padding:0 0 58px; }
  .instagram-news-heading .section-kicker { margin-left:.2vw; }
  .instagram-news-heading h2 {
    margin:0;
    font-family:"Playfair Display",serif;
    font-weight:500;
    font-size:clamp(78px,10vw,170px);
    line-height:.82;
    letter-spacing:-.055em;
  }
  .instagram-news-frame {
    border:1px solid rgba(23,21,18,.17);
    padding:58px 4.2vw 0;
    min-height:640px;
  }
  .instagram-profile {
    width:min(560px,100%);
    margin:0 auto 38px;
    display:grid;
    grid-template-columns:64px 1fr auto;
    gap:18px;
    align-items:start;
  }
  .instagram-profile > img {
    width:64px !important;
    height:64px !important;
    border-radius:50%;
    object-fit:cover;
    object-position:center 18%;
  }
  .instagram-profile-copy { display:flex; flex-direction:column; gap:2px; font-size:13px; line-height:1.28; }
  .instagram-profile-copy strong { font-family:"Playfair Display",serif; font-size:27px; font-weight:500; margin-bottom:7px; letter-spacing:-.03em; }
  .instagram-profile-copy span { color:rgba(23,21,18,.72); }
  .instagram-open { align-self:center; font-size:11px; letter-spacing:.12em; text-transform:uppercase; white-space:nowrap; border-bottom:1px solid rgba(23,21,18,.32); padding-bottom:4px; }
  .instagram-carousel-wrap { position:relative; margin:0 -1px; }
  .instagram-carousel {
    display:grid;
    grid-auto-flow:column;
    grid-auto-columns:minmax(280px, 25%);
    overflow-x:auto;
    scroll-snap-type:x mandatory;
    scroll-behavior:smooth;
    scrollbar-width:none;
  }
  .instagram-carousel::-webkit-scrollbar { display:none; }
  .instagram-card {
    position:relative;
    aspect-ratio:1/1.03;
    overflow:hidden;
    scroll-snap-align:start;
    border-right:1px solid rgba(238,228,216,.42);
    background:#d8cec2;
  }
  .instagram-card img { width:100%; height:100%; object-fit:cover; transition:transform .7s var(--ease-song), filter .5s ease; filter:saturate(.82) contrast(1.02); }
  .instagram-card:hover img { transform:scale(1.035); filter:saturate(.96) contrast(1.03); }
  .instagram-card.crop-close img { object-position:53% 13%; transform:scale(1.32); }
  .instagram-card.crop-close:hover img { transform:scale(1.36); }
  .instagram-card.crop-wide img { object-position:38% 14%; }
  .instagram-play {
    position:absolute;
    left:50%; top:50%; transform:translate(-50%,-50%);
    width:38px; height:38px;
    display:grid; place-items:center;
    border-radius:50%;
    background:rgba(244,235,221,.78);
    backdrop-filter:blur(8px);
    color:var(--ink);
    font-size:11px;
    padding-left:2px;
  }
  .instagram-arrow {
    position:absolute;
    z-index:4;
    top:50%;
    transform:translateY(-50%);
    width:64px;
    height:64px;
    border:0;
    border-radius:50%;
    background:rgba(248,244,236,.94);
    color:var(--ink);
    font-size:27px;
    cursor:pointer;
    box-shadow:0 12px 32px rgba(23,21,18,.08);
    transition:transform .35s var(--ease-song),background .25s ease;
  }
  .instagram-arrow:hover { transform:translateY(-50%) scale(1.05); background:#fffaf3; }
  .instagram-prev { left:18px; }
  .instagram-next { right:18px; }
  @media (max-width:900px){
    .instagram-news { padding:84px 18px 88px; }
    .instagram-news-heading { padding-bottom:42px; }
    .instagram-news-heading h2 { font-size:clamp(64px,18vw,112px); }
    .instagram-news-frame { padding:34px 18px 0; min-height:0; }
    .instagram-profile { grid-template-columns:52px 1fr; gap:14px; margin-bottom:28px; }
    .instagram-profile > img { width:52px !important; height:52px !important; }
    .instagram-profile-copy strong { font-size:22px; }
    .instagram-open { grid-column:2; justify-self:start; margin-top:8px; }
    .instagram-carousel { grid-auto-columns:78%; }
    .instagram-arrow { width:48px; height:48px; font-size:21px; }
    .instagram-prev { left:8px; }
    .instagram-next { right:8px; }
  }
`;
document.head.appendChild(instagramStyles);

function wrapTitle(el) {
  if (!el || el.dataset.typeWrapped) return;
  el.dataset.typeWrapped = 'true';
  const html = el.innerHTML;
  el.innerHTML = `<span class="type-title-inner">${html}</span>`;
  el.classList.add('type-title');
}
function splitManifesto(el) {
  if (!el || el.dataset.typeWrapped) return;
  el.dataset.typeWrapped='true';
  const words=el.textContent.trim().split(/\s+/);
  el.innerHTML=words.map((word,i)=>`<span class="manifesto-word" style="transition-delay:${Math.min(i*24,620)}ms">${word}</span>`).join(' ');
}

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) heroTitle.innerHTML = `<span class="type-clip"><span class="type-inner">Stories for the</span></span><span class="type-clip"><span class="type-inner"><em>in-between.</em></span></span>`;
splitManifesto(document.querySelector('.manifesto-copy'));
document.querySelectorAll('.section-heading h2,.featured h2,.listening-room h2,.closing-cta h2').forEach(wrapTitle);
document.querySelectorAll('.section-kicker').forEach(el=>el.classList.add('type-kicker'));

const typeObserver = new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(!entry.isIntersecting)return; entry.target.classList.add('type-in'); typeObserver.unobserve(entry.target); }); },{threshold:.18,rootMargin:'0px 0px -7% 0px'});
document.querySelectorAll('.type-title,.type-kicker,.manifesto-copy,.lyric-band').forEach(el=>typeObserver.observe(el));

const instagramCarousel = document.getElementById('instagram-carousel');
const instagramPrev = document.querySelector('.instagram-prev');
const instagramNext = document.querySelector('.instagram-next');
if (instagramCarousel && instagramPrev && instagramNext) {
  const slideInstagram = (direction) => {
    const card = instagramCarousel.querySelector('.instagram-card');
    const amount = card ? card.getBoundingClientRect().width * (window.innerWidth > 900 ? 2 : 1) : instagramCarousel.clientWidth * .8;
    instagramCarousel.scrollBy({ left: direction * amount, behavior:'smooth' });
  };
  instagramPrev.addEventListener('click', () => slideInstagram(-1));
  instagramNext.addEventListener('click', () => slideInstagram(1));
}

const preloader=document.getElementById('preloader');
const minimumLoaderTime=1550;
const loaderStartedAt=performance.now();
function startHeroTypography(){ document.body.classList.add('type-ready'); document.querySelectorAll('.hero .type-clip').forEach((el,i)=>window.setTimeout(()=>el.classList.add('type-in'),120+i*135)); }
function revealSite(){ if(!preloader||preloader.dataset.done==='true')return; preloader.dataset.done='true'; const elapsed=performance.now()-loaderStartedAt; const wait=Math.max(0,minimumLoaderTime-elapsed); window.setTimeout(()=>{ preloader.classList.add('is-leaving'); document.body.classList.remove('is-loading'); window.setTimeout(startHeroTypography,180); window.setTimeout(()=>preloader.remove(),700); },wait); }
if(!preloader){startHeroTypography();} else if(document.readyState==='complete'){revealSite();} else {window.addEventListener('load',revealSite,{once:true});window.setTimeout(revealSite,3200);}
