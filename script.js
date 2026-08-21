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
  .brand-lockup { display:flex; align-items:center; gap:10px; color:inherit; }
  .brand-lockup img { width:34px; height:34px; flex:0 0 auto; border-radius:8px; box-shadow:0 0 0 1px rgba(244,235,221,.12); }
  .brand-words { display:grid; line-height:.76; font-family:"Playfair Display",serif; font-size:18px; letter-spacing:.04em; }
  .brand-words span:last-child { margin-left:7px; }
  .brand-lockup:hover .brand-words { letter-spacing:.08em; }
  .brand-words { transition:letter-spacing .45s cubic-bezier(.22,1,.36,1); }

  .preloader-monogram { width:72px; height:72px; margin:0 auto 18px; border-radius:16px; box-shadow:0 18px 50px rgba(0,0,0,.22); animation:markBreath 1.8s ease-in-out infinite; }
  @keyframes markBreath { 0%,100%{transform:scale(.97);opacity:.82} 50%{transform:scale(1);opacity:1} }

  .closing-brand { display:flex; align-items:center; gap:14px; margin-bottom:28px; opacity:.72; }
  .closing-brand img { width:46px; height:46px; border-radius:10px; }
  .closing-brand span { font-size:11px; letter-spacing:.28em; font-weight:600; }

  .footer-brand { display:flex; gap:16px; align-items:flex-start; }
  .footer-brand img { width:58px; height:58px; border-radius:13px; }
  .footer-logo { display:block; font-family:"Playfair Display",serif; font-size:26px; letter-spacing:.05em; color:var(--cream); margin-top:1px; }

  .featured::before { content:"DQ"; position:absolute; inset:auto 3vw 2vw auto; font-family:"Playfair Display",serif; font-size:clamp(90px,14vw,230px); line-height:.7; color:rgba(248,244,236,.035); pointer-events:none; }
  .featured { position:relative; overflow:hidden; }

  @media (max-width:900px){
    .brand-lockup img{width:30px;height:30px}
    .brand-words{font-size:15px}
    .footer-brand img{width:48px;height:48px}
    .footer-logo{font-size:22px}
    .preloader-monogram{width:60px;height:60px}
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
  body.type-ready .hero-signature { opacity:1; clip-path:inset(0 0 0 0); }
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

const preloader=document.getElementById('preloader');
const minimumLoaderTime=1550;
const loaderStartedAt=performance.now();
function startHeroTypography(){ document.body.classList.add('type-ready'); document.querySelectorAll('.hero .type-clip').forEach((el,i)=>window.setTimeout(()=>el.classList.add('type-in'),120+i*135)); }
function revealSite(){ if(!preloader||preloader.dataset.done==='true')return; preloader.dataset.done='true'; const elapsed=performance.now()-loaderStartedAt; const wait=Math.max(0,minimumLoaderTime-elapsed); window.setTimeout(()=>{ preloader.classList.add('is-leaving'); document.body.classList.remove('is-loading'); window.setTimeout(startHeroTypography,180); window.setTimeout(()=>preloader.remove(),700); },wait); }
if(!preloader){startHeroTypography();} else if(document.readyState==='complete'){revealSite();} else {window.addEventListener('load',revealSite,{once:true});window.setTimeout(revealSite,3200);}
