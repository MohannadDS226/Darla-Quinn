(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMain=!!document.querySelector('.site-header');
  const isMerch=!!document.querySelector('.merch-header');
  const wordSelectors=['.hero-copy h1','.shop-heading h2','.store-note h2','.card-copy h2','.product-top h3','.bag-head h2','.modal-copy h2','.related-head h3','.press-intro h2','.press-stat h3','.press-quote p','.press-contact h3','.live-intro h2','.live-copy h3','.live-list-head h3','.live-empty h4','.letters-copy h2','.letters-card h3'];
  const blockSelectors=['.hero-copy .kicker','.hero-copy .deck','.shop-cta','.card-copy>span','.card-copy p','.card-copy strong','.shop-heading .kicker','.shop-heading>p','.product-info p','.store-note .kicker','.store-note-grid p','.modal-copy .kicker','.modal-price','.modal-description','.modal-note','.press-intro .section-kicker','.press-deck','.press-stat p','.press-stat small','.press-contact .section-kicker','.press-note','.live-intro .section-kicker','.live-deck','.live-copy .section-kicker','.live-copy>p:not(.section-kicker)','.live-status','.live-actions','.live-list-head p','.letters-copy .section-kicker','.letters-copy>p:last-child','.letters-card>p','.letters-meta','.letters-rule p'];

  function loadCss(href,key){if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset[key]='1';document.head.appendChild(l)}
  function loadScript(src,key){if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.defer=true;s.dataset[key]='1';document.head.appendChild(s)}

  if(isMain)loadCss('live.css','dqLive');
  if(isMerch)loadCss('merch-mobile-parallax.css','dqMerchMobileParallax');
  loadCss('polish.css','dqPolish');

  if(isMain){
    const framing=document.createElement('style');
    framing.textContent=`
      .portrait-break picture{display:block;width:100%;height:100%}
      .portrait-break picture img{width:100%;height:100%;object-fit:cover;object-position:center 22%}
      @media(max-width:767px){.portrait-break picture img{object-position:center 18%}.portrait-caption{gap:18px;align-items:flex-end}}
    `;
    document.head.appendChild(framing);
  }

  function cleanPublicCopy(){
    if(!isMain)return;
    const quote=document.querySelector('.press-quote p');
    if(quote)quote.textContent='The story is still being written.';
    const quoteMeta=document.querySelector('.press-quote span');
    if(quoteMeta)quoteMeta.textContent='Independent artist · songwriter';
    const featuredNote=document.querySelector('.press-ledger .press-stat:nth-child(2) small');
    if(featuredNote)featuredNote.textContent="Listed first among the current releases on Darla Quinn's official site.";
    const ig=document.querySelector('.instagram-profile-copy');
    if(ig)ig.innerHTML='<strong>darla.quinn.2001</strong><span>Singer-songwriter</span><span>Storytelling through music</span><span>Official Instagram updates</span>';
    document.querySelectorAll('a[target="_blank"]').forEach(a=>a.setAttribute('rel','noopener noreferrer'));
  }

  function splitWords(el){
    if(!el||el.dataset.typoReady)return;
    el.dataset.typoReady='1';let i=0;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{const frag=document.createDocumentFragment();node.nodeValue.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(part));return}const outer=document.createElement('span');outer.className='typo-word';const inner=document.createElement('span');inner.className='typo-word-inner';inner.style.setProperty('--word-i',i++);inner.textContent=part;outer.appendChild(inner);frag.appendChild(outer)});node.parentNode.replaceChild(frag,node)});
    el.classList.add('typo-reveal');if(reduced)el.classList.add('typo-live');
  }
  function prepare(root=document){wordSelectors.forEach(sel=>root.querySelectorAll(sel).forEach(splitWords));blockSelectors.forEach(sel=>root.querySelectorAll(sel).forEach(el=>{if(el.dataset.typoBlock)return;el.dataset.typoBlock='1';el.classList.add('typo-block');if(reduced)el.classList.add('typo-live')}))}
  let observer;
  if(!reduced)observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('typo-live');observer.unobserve(e.target)}}),{threshold:.16,rootMargin:'0px 0px -8% 0px'});
  function observe(root=document){if(reduced)return;root.querySelectorAll('.typo-reveal,.typo-block').forEach(el=>{if(!el.dataset.typoObserved){el.dataset.typoObserved='1';observer.observe(el)}})}
  function refresh(root=document){prepare(root);observe(root)}
  window.DQTypography={refresh};

  function injectLive(){
    const press=document.getElementById('press');if(!press||document.getElementById('live'))return;
    const nav=document.querySelector('.site-header nav');
    if(nav&&!nav.querySelector('a[href="#live"]')){const link=document.createElement('a');link.href='#live';link.textContent='Live';const pressLink=nav.querySelector('a[href="#press"]');nav.insertBefore(link,pressLink||null)}
    const section=document.createElement('section');section.className='live-section';section.id='live';section.setAttribute('aria-labelledby','live-title');
    section.innerHTML=`<div class="live-intro reveal"><div><p class="section-kicker">Live / Performances</p><h2 id="live-title">Songs in<br><em>the room.</em></h2></div><p class="live-deck">Built for the moments where the songs leave the headphones: intimate rooms, stripped-back sets and performances that keep the words at the centre.</p></div><div class="live-stage reveal"><div class="live-visual"><img src="assets/artist/darla-quinn-live.webp" alt="Darla Quinn live performance" loading="lazy" decoding="async"><div class="live-caption"><span>Live, close and honest.</span><span>Acoustic performance</span></div></div><div class="live-copy"><p class="section-kicker">Upcoming dates</p><h3>No public dates announced yet.</h3><p>No verified public performance dates are currently listed. When a date is announced, this space is ready for city, venue and ticket details.</p><div class="live-status"><i></i><span>Watch this space</span></div><div class="live-actions"><a class="live-button primary" href="https://www.instagram.com/darla.quinn.2001/" target="_blank" rel="noopener noreferrer">Follow for updates ↗</a><a class="live-button" href="mailto:Darla.Quinn.2001@gmail.com?subject=Live%20booking%20enquiry">Live booking ↗</a></div></div></div><div class="live-list reveal"><div class="live-list-head"><h3>Upcoming.</h3><p>New dates can drop straight into this ledger as soon as they are officially announced.</p></div><div class="live-empty"><span>Status</span><h4>Next performance to be announced.</h4><a href="https://www.darlaquinn.com/" target="_blank" rel="noopener noreferrer">Official updates ↗</a></div></div>`;
    press.parentNode.insertBefore(section,press);refresh(section);
  }

  const start=()=>{
    cleanPublicCopy();
    if(isMain)injectLive();
    refresh();
    requestAnimationFrame(()=>document.querySelectorAll('.hero-copy .typo-reveal,.hero-copy .typo-block').forEach((el,i)=>setTimeout(()=>el.classList.add('typo-live'),120+i*90)));
    const mo=new MutationObserver(muts=>{let needs=false;muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)needs=true}));if(needs)refresh()});mo.observe(document.body,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();

  if(isMain)loadScript('mailing.js','dqMailing');
  if(isMerch)loadScript('merch-mobile-parallax.js','dqMerchMobileParallax');
  loadScript('polish.js','dqPolish');
})();