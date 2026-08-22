(()=>{
  const header=document.querySelector('.site-header,.merch-header');
  if(!header)return;
  const nav=header.querySelector('nav');
  if(!nav||header.querySelector('.mobile-nav-toggle'))return;

  const toggle=document.createElement('button');
  toggle.className='mobile-nav-toggle';
  toggle.type='button';
  toggle.setAttribute('aria-label','Open menu');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-controls','mobile-primary-nav');
  toggle.innerHTML='<span></span>';
  nav.id=nav.id||'mobile-primary-nav';

  const overlay=document.createElement('div');
  overlay.className='mobile-nav-overlay';
  overlay.setAttribute('aria-hidden','true');

  header.appendChild(toggle);
  document.body.appendChild(overlay);

  const focusables=()=>[...nav.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.offsetParent!==null);
  const isOpen=()=>toggle.getAttribute('aria-expanded')==='true';
  const setOpen=(open,{restoreFocus=false}={})=>{
    document.body.classList.toggle('mobile-nav-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    overlay.setAttribute('aria-hidden',String(!open));
    if(window.innerWidth<=900)nav.setAttribute('aria-hidden',String(!open));else nav.removeAttribute('aria-hidden');
    if(open){requestAnimationFrame(()=>focusables()[0]?.focus({preventScroll:true}));}
    else if(restoreFocus){toggle.focus({preventScroll:true});}
  };
  const close=opts=>setOpen(false,opts);

  if(window.innerWidth<=900)nav.setAttribute('aria-hidden','true');

  toggle.addEventListener('click',()=>setOpen(!isOpen(),{restoreFocus:isOpen()}));
  overlay.addEventListener('click',()=>close());
  nav.addEventListener('click',e=>{
    const target=e.target.closest('a,button');
    if(target&&window.innerWidth<=900)close();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&isOpen()){e.preventDefault();close({restoreFocus:true});return;}
    if(e.key!=='Tab'||!isOpen()||window.innerWidth>900)return;
    const items=focusables();if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();toggle.focus();}
    else if(!e.shiftKey&&document.activeElement===toggle){e.preventDefault();first.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();toggle.focus();}
  });
  window.addEventListener('resize',()=>{
    if(window.innerWidth>900){close();nav.removeAttribute('aria-hidden');}
    else if(!isOpen())nav.setAttribute('aria-hidden','true');
  },{passive:true});
})();
