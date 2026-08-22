(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq=window.matchMedia('(max-width: 900px)');
  const zone=document.querySelector('.stacked-zone');
  const track=document.getElementById('merch-track');
  if(!zone||!track)return;

  let cards=[];
  let raf=0;
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));

  function refreshCards(){
    cards=[...track.querySelectorAll('.merch-card')];
    if(mq.matches&&!reduced)zone.classList.add('dq-mobile-parallax');
    else zone.classList.remove('dq-mobile-parallax');
  }

  function clearTransforms(){
    cards.forEach(card=>{
      card.style.removeProperty('transform');
      card.style.removeProperty('opacity');
      card.style.removeProperty('filter');
      card.style.removeProperty('z-index');
    });
  }

  function paint(){
    raf=0;
    if(reduced||!mq.matches){clearTransforms();return;}

    const trackRect=track.getBoundingClientRect();
    const viewportCenter=trackRect.left+track.clientWidth/2;
    let nearestIndex=0;
    let nearestDist=Infinity;

    cards.forEach((card,index)=>{
      const r=card.getBoundingClientRect();
      const center=r.left+r.width/2;
      const raw=(center-viewportCenter)/Math.max(1,track.clientWidth*.78);
      const d=clamp(raw,-1.6,1.6);
      const ad=Math.abs(d);

      if(ad<nearestDist){nearestDist=ad;nearestIndex=index;}

      const x=-d*18;
      const y=ad*10;
      const scale=1-Math.min(ad,1.3)*.085;
      const rotateY=d*-9;
      const rotateZ=d*1.15;
      const opacity=Math.max(.38,1-ad*.36);
      const blur=ad>.35?Math.min(1.15,(ad-.35)*1.15):0;

      card.style.transform=`translate3d(${x}px,${y}px,0) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      card.style.opacity=String(opacity);
      card.style.filter=blur?`blur(${blur}px)`:'none';
      card.style.zIndex=String(100-Math.round(ad*10));
    });

    cards.forEach((card,index)=>card.classList.toggle('dq-mobile-front',index===nearestIndex));

    const fill=document.getElementById('collection-progress-fill');
    if(fill){
      const max=Math.max(1,track.scrollWidth-track.clientWidth);
      fill.style.transform=`scaleX(${clamp(track.scrollLeft/max,0,1)})`;
    }
  }

  function schedule(){if(!raf)raf=requestAnimationFrame(paint)}

  refreshCards();
  schedule();

  track.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',()=>{refreshCards();schedule()},{passive:true});
  window.addEventListener('load',schedule);
  mq.addEventListener?.('change',()=>{refreshCards();schedule()});

  const mo=new MutationObserver(()=>{refreshCards();schedule()});
  mo.observe(track,{childList:true});
})();
