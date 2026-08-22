const track=document.getElementById('merch-track');
const archive=document.getElementById('archive-grid');
const zone=document.querySelector('.stacked-zone');
const counter=document.getElementById('counter-current');
const progressFill=document.getElementById('collection-progress-fill');

const names=['Archive 01','Archive 02','Archive 03','Archive 04','Archive 05','Archive 06','Archive 07','Archive 08','Archive 09','Archive 10','Archive 11','Archive 12','Archive 13','Archive 14','Archive 15','Archive 16','Archive 17','Archive 18','Archive 19','Archive 20','Archive 21','Archive 22','Archive 23','Archive 24','Archive 25'];
const descriptors=['Apparel concept','Apparel concept','Apparel concept','Accessory concept','Apparel concept','Collectible concept','Accessory concept','Apparel concept','Apparel concept','Accessory concept','Apparel concept','Accessory concept','Apparel concept','Apparel concept','Accessory concept','Collectible concept','Apparel concept','Apparel concept','Accessory concept','Studio object','Collectible concept','Accessory concept','Accessory concept','Accessory concept','Studio object'];

for(let i=1;i<=25;i++){
  const number=String(i).padStart(2,'0');
  const card=document.createElement('article');
  card.className='merch-card';
  card.innerHTML=`<div class="product-stage"><img src="assets/Merch/${i}.png" alt="Darla Quinn merch concept ${number}" loading="${i<4?'eager':'lazy'}" /></div><div class="card-copy"><span>${number} / ${descriptors[i-1]}</span><h2>${names[i-1]}</h2><p>Part of the Darla Quinn concept collection, developed as a premium visual extension of the artist identity.</p><small>Concept only</small></div>`;
  track.appendChild(card);

  const item=document.createElement('div');
  item.className='archive-item';
  item.innerHTML=`<img src="assets/Merch/${i}.png" alt="Darla Quinn merch archive ${number}" loading="lazy" /><div class="archive-meta"><span>${number}</span><span>${descriptors[i-1]}</span></div>`;
  archive.appendChild(item);
}

const cards=[...document.querySelectorAll('.merch-card')];
function updateParallax(){
  if(!zone||!track||window.innerWidth<=900)return;
  const rect=zone.getBoundingClientRect();
  const scrollable=zone.offsetHeight-window.innerHeight;
  const progress=Math.min(1,Math.max(0,-rect.top/scrollable));
  const maxX=Math.max(0,track.scrollWidth-window.innerWidth);
  track.style.transform=`translate3d(${-progress*maxX}px,0,0)`;
  if(progressFill)progressFill.style.transform=`scaleX(${progress})`;
  let closest=0,min=Infinity;
  cards.forEach((card,i)=>{
    const center=card.getBoundingClientRect().left+card.offsetWidth/2;
    const delta=(center-window.innerWidth/2)/window.innerWidth;
    const stage=card.querySelector('.product-stage');
    if(stage)stage.style.transform=`translate3d(${delta*-42}px,${Math.abs(delta)*12}px,0) rotate(${delta*-1.4}deg)`;
    const distance=Math.abs(delta);
    if(distance<min){min=distance;closest=i;}
  });
  if(counter)counter.textContent=String(closest+1).padStart(2,'0');
}

let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{updateParallax();ticking=false;});},{passive:true});
window.addEventListener('resize',updateParallax);
window.addEventListener('load',updateParallax);
updateParallax();