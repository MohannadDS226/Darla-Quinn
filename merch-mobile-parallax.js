(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq=window.matchMedia('(max-width: 900px)');
  const zone=document.querySelector('.stacked-zone');
  const track=document.getElementById('merch-track');
  if(!zone||!track)return;

  let cards=[];
  let ticking=false;

  function refreshCards(){
    cards=[...track.querySelectorAll('.merch-card')];
    zone.style.setProperty('--dq-mobile-card-count',Math.max(1,cards.length));
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

  function update(){
    if(reduced||!mq.matches){clearMobile();return;}
    refreshCards();
    if(!cards.length)return;
    zone.classList.add('dq-mobile-parallax');

    const rect=zone.getBoundingClientRect();
    const scrollable=Math.max(1,zone.offsetHeight-window.innerHeight);
    const progress=Math.min(1,Math.max(0,-rect.top/scrollable));
    const position=progress*Math.max(0,cards.length-1);
    const nearest=Math.round(position);

    cards.forEach((card,index)=>{
      const d=index-position;
      const ad=Math.abs(d);
      const side=d===0?0:(d>0?1:-1);
      const clamped=Math.min(ad,2.25);
      const x=side*Math.min(ad,1.25)*18;
      const y=Math.min(ad,1.8)*4.8;
      const z=-clamped*125;
      const scale=1-Math.min(ad,1.8)*0.085;
      const rotateY=-side*Math.min(ad,1.35)*8.5;
      const rotateZ=side*Math.min(ad,1.5)*1.15;
      const blur=Math.min(ad,1.8)*5.2;
      const opacity=ad>2.15?0:Math.max(.12,1-ad*.42);

      card.style.transform=`translate3d(calc(-50% + ${x}vw),calc(-50% + ${y}vh),${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      card.style.filter=`blur(${blur}px) saturate(${Math.max(.72,1-ad*.12)})`;
      card.style.opacity=String(opacity);
      card.style.zIndex=String(100-Math.round(ad*10));
      card.style.visibility=ad>2.15?'hidden':'visible';
      card.classList.toggle('dq-mobile-front',index===nearest&&ad<.58);
    });

    const progressFill=document.getElementById('collection-progress-fill');
    if(progressFill)progressFill.style.transform=`scaleX(${progress})`;
  }

  function requestUpdate(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{update();ticking=false});
  }

  const mo=new MutationObserver(()=>{refreshCards();requestUpdate()});
  mo.observe(track,{childList:true});
  refreshCards();
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate,{passive:true});
  window.addEventListener('load',requestUpdate);
  mq.addEventListener?.('change',requestUpdate);
  requestUpdate();
})();
