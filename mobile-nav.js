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

  const setOpen=open=>{
    document.body.classList.toggle('mobile-nav-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    overlay.setAttribute('aria-hidden',String(!open));
  };
  const close=()=>setOpen(false);

  toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
  overlay.addEventListener('click',close);
  nav.addEventListener('click',e=>{
    const target=e.target.closest('a,button');
    if(target&&window.innerWidth<=900&&!target.classList.contains('bag-trigger'))close();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  window.addEventListener('resize',()=>{if(window.innerWidth>900)close()},{passive:true});
})();
