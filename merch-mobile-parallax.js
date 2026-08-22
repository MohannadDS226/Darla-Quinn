(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq=window.matchMedia('(max-width: 900px)');
  const zone=document.querySelector('.stacked-zone');
  const track=document.getElementById('merch-track');
  if(!zone||!track)return;

  let cards=[];
  let targetPosition=0;
  let renderPosition=0;
  let raf=0;
  let touching=false;
  let touchStartX=0,touchStartY=0,touchStartPosition=0;
  let horizontalGesture=false;

  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));

  function refreshCards(){
    cards=[...track.querySelectorAll('.merch-card')];
    zone.style.setProperty('--dq-mobile-card-count',Math.max(1,cards.length));
  }

  function maxPosition(){return Math.max(0,cards.length-1)}

  function scrollPosition(){
    const scrollable=Math.max(1,zone.offsetHeight-window.innerHeight);
    const top=zone.getBoundingClientRect().top;
    const progress=clamp(-top/scrollable,0,1);
    return progress*maxPosition();
  }

  function clearMobile(){
    zone.classList.remove('dq-mobile-parallax');
    cards.forEach(card=>{
      card.classList.remove('dq-mobile-front');
      card.style.removeProperty('transform');
      card.style.removeProperty('filter');
      card.style.removeProperty('opacity');
      card.style.removeProperty('z-index');
      card.style.removeProperty('visibility');
    });
  }

  function paint(position){
    if(reduced||!mq.matches){clearMobile();return}
    if(!cards.length)return;
    zone.classList.add('dq-mobile-parallax');
    const nearest=Math.round(position);

    cards.forEach((card,index)=>{
      const d=index-position;
      const ad=Math.abs(d);
      if(ad>1.65){
        card.style.visibility='hidden';
        card.style.opacity='0';
        card.classList.remove('dq-mobile-front');
        return;
      }

      const side=d===0?0:(d>0?1:-1);
      const depth=Math.min(ad,1.5);
      const x=side*depth*17;
      const y=depth*3.2;
      const z=-depth*112;
      const scale=1-depth*.072;
      const rotateY=-side*depth*7;
      const rotateZ=side*depth*.8;
      const blur=ad<.35?0:Math.min(2.1,(ad-.35)*1.9);
      const opacity=Math.max(.34,1-depth*.40);

      card.style.visibility='visible';
      card.style.transform=`translate3d(calc(-50% + ${x}vw),calc(-50% + ${y}vh),${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      card.style.filter=blur?`blur(${blur}px)`:'none';
      card.style.opacity=String(opacity);
      card.style.zIndex=String(100-Math.round(ad*10));
      card.classList.toggle('dq-mobile-front',index===nearest&&ad<.48);
    });

    const fill=document.getElementById('collection-progress-fill');
    if(fill)fill.style.transform=`scaleX(${maxPosition()?position/maxPosition():0})`;
  }

  function animate(){
    raf=0;
    const ease=touching?.38:.20;
    renderPosition+= (targetPosition-renderPosition)*ease;
    if(Math.abs(targetPosition-renderPosition)<.001)renderPosition=targetPosition;
    paint(renderPosition);
    if(Math.abs(targetPosition-renderPosition)>.001)raf=requestAnimationFrame(animate);
  }

  function schedule(){if(!raf)raf=requestAnimationFrame(animate)}

  function syncFromScroll(){
    if(reduced||!mq.matches||touching)return;
    targetPosition=scrollPosition();
    schedule();
  }

  function scrollToCard(index){
    index=clamp(index,0,maxPosition());
    targetPosition=index;
    schedule();
    const scrollable=Math.max(1,zone.offsetHeight-window.innerHeight);
    const zoneTop=window.scrollY+zone.getBoundingClientRect().top;
    const y=zoneTop+(maxPosition()?index/maxPosition():0)*scrollable;
    window.scrollTo({top:y,behavior:'smooth'});
  }

  track.addEventListener('touchstart',e=>{
    if(!mq.matches||reduced||!e.touches[0])return;
    touching=true;horizontalGesture=false;
    touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY;
    touchStartPosition=renderPosition;
    targetPosition=renderPosition;
  },{passive:true});

  track.addEventListener('touchmove',e=>{
    if(!touching||!mq.matches||reduced||!e.touches[0])return;
    const dx=e.touches[0].clientX-touchStartX;
    const dy=e.touches[0].clientY-touchStartY;
    if(!horizontalGesture&&Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)*1.15)horizontalGesture=true;
    if(!horizontalGesture)return;
    e.preventDefault();
    const sensitivity=Math.max(150,window.innerWidth*.52);
    targetPosition=clamp(touchStartPosition-dx/sensitivity,0,maxPosition());
    schedule();
  },{passive:false});

  track.addEventListener('touchend',()=>{
    if(!touching)return;
    const wasHorizontal=horizontalGesture;
    touching=false;horizontalGesture=false;
    if(wasHorizontal)scrollToCard(Math.round(targetPosition));
    else syncFromScroll();
  },{passive:true});

  track.addEventListener('touchcancel',()=>{
    touching=false;horizontalGesture=false;syncFromScroll();
  },{passive:true});

  const mo=new MutationObserver(()=>{refreshCards();targetPosition=renderPosition=scrollPosition();paint(renderPosition)});
  mo.observe(track,{childList:true});
  refreshCards();
  renderPosition=targetPosition=scrollPosition();
  paint(renderPosition);

  window.addEventListener('scroll',syncFromScroll,{passive:true});
  window.addEventListener('resize',()=>{refreshCards();targetPosition=renderPosition=scrollPosition();paint(renderPosition)},{passive:true});
  window.addEventListener('load',()=>{targetPosition=renderPosition=scrollPosition();paint(renderPosition)});
  mq.addEventListener?.('change',()=>{targetPosition=renderPosition=scrollPosition();paint(renderPosition)});
})();
