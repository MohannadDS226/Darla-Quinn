const products=[
{id:1,name:'Midnight Signature Hoodie',category:'apparel',price:68,badge:'Featured',desc:'Heavyweight black hoodie with signature branding and a polished artist-store finish.'},
{id:2,name:'Ivory Signature Tee',category:'apparel',price:36,badge:'Essential',desc:'Soft ivory tee with restrained signature artwork and a clean everyday silhouette.'},
{id:3,name:'Afterglow Wine Hoodie',category:'apparel',price:72,badge:'New',desc:'Deep wine fleece with monogram details, warm metallic accents and a relaxed oversized fit.'},
{id:4,name:'DQ Monogram Cap',category:'accessories',price:32,badge:'Best seller',desc:'Classic black cap embroidered with the DQ monogram for an understated daily piece.'},
{id:5,name:'Ivory Lounge Pants',category:'apparel',price:54,badge:'New',desc:'Soft ivory sweatpants with discreet DQ detailing and a relaxed off-duty shape.'},
{id:6,name:"Player's Pick Set",category:'studio',price:18,badge:'Player essential',desc:'A collectible set of branded guitar picks designed for both play and display.'},
{id:7,name:'Ivory Monogram Sweatshirt',category:'apparel',price:62,badge:'Essential',desc:'Clean crewneck sweatshirt with subtle front monogram and signature back artwork.'},
{id:8,name:'DQ Varsity Jacket',category:'apparel',price:95,badge:'Statement piece',desc:'Premium varsity-inspired jacket with bold identity work and a collectible finish.'},
{id:9,name:'Signature Canvas Tote',category:'accessories',price:34,badge:'Everyday',desc:'Structured canvas tote with signature artwork and enough room for the everyday essentials.'},
{id:10,name:'DQ Knit Beanie',category:'accessories',price:26,badge:'Essential',desc:'Ribbed black beanie finished with a small embroidered DQ monogram.'},
{id:11,name:'In-Between Long Sleeve',category:'apparel',price:46,badge:'New',desc:'Washed charcoal long sleeve with quiet signature placement and sleeve typography.'},
{id:12,name:'Studio Mug & Pick Keychain',category:'studio',price:22,badge:'Gift set',desc:'A matte black mug paired with a guitar-pick keychain for desk, studio or rehearsal days.'},
{id:13,name:'After Hours Joggers',category:'apparel',price:58,badge:'Limited',desc:'Washed black wide-leg joggers with lyric details, celestial marks and distressed artwork.'},
{id:14,name:'In-Between Joggers',category:'apparel',price:58,badge:'Limited',desc:'Relaxed black joggers with handwritten lines, monogram art and softly weathered graphics.'},
{id:15,name:'Version Joggers',category:'apparel',price:58,badge:'Limited',desc:'Graphic fleece joggers carrying fragments of the emotional world around the songs.'},
{id:16,name:'Writing Room Joggers',category:'apparel',price:58,badge:'Limited',desc:'Black joggers with sketchbook-style flourishes, small stars and lyric-led artwork.'},
{id:17,name:'Midnight Wide-Leg Pants',category:'apparel',price:58,badge:'New',desc:'Wide-leg black lounge pants with elegant cream artwork and a softer, fashion-led finish.'},
{id:18,name:'Ivory Crew Socks',category:'accessories',price:16,badge:'Everyday',desc:'Soft ribbed crew socks with black and muted-gold DQ identity details.'},
{id:19,name:'Gold Monogram Phone Case',category:'accessories',price:28,badge:'New',desc:'Black and ivory phone case finished with gold linework and the DQ monogram.'},
{id:20,name:"Songwriter's Notebook",category:'studio',price:24,badge:'Studio essential',desc:'A premium notebook for lyrics, melodies, fragments and the ideas that arrive between songs.'},
{id:21,name:'Limited Edition Cassette Box',category:'collectors',price:48,badge:'Collector piece',desc:'A nostalgic cassette-style presentation set designed as a display-worthy keepsake.'},
{id:22,name:'Signature Luxe Tote',category:'accessories',price:42,badge:'New',desc:'Elevated structured tote with black trim, signature artwork and polished gold hardware.'},
{id:23,name:'DQ Silk Scarf',category:'accessories',price:42,badge:'Signature piece',desc:'Soft black and ivory scarf built from the monogram, signature and star motif system.'},
{id:24,name:'Leather Guitar Strap',category:'studio',price:55,badge:'Player essential',desc:'Premium black leather guitar strap with cream panels, gold hardware and DQ branding.'},
{id:25,name:'The In-Between Collector Piece',category:'collectors',price:40,badge:'Limited',desc:'A final collectible from the first merch drop, designed to sit naturally inside the wider visual world.'}
];

const featureIds=[1,3,6,8,20,21,23,24];
const track=document.getElementById('merch-track');
const grid=document.getElementById('shop-grid');
const zone=document.querySelector('.stacked-zone');
const progressFill=document.getElementById('collection-progress-fill');

const money=n=>`£${n}`;
const imagePath=id=>`assets/Merch/${id}.png`;

featureIds.forEach(id=>{
 const p=products.find(x=>x.id===id);
 const card=document.createElement('article');
 card.className='merch-card';
 card.innerHTML=`<div class="product-stage"><img src="${imagePath(p.id)}" alt="${p.name}" ${p.id<4?'fetchpriority="high"':'loading="lazy"'} /></div><div class="card-copy"><span>${p.badge}</span><h2>${p.name}</h2><p>${p.desc}</p><strong>${money(p.price)}</strong></div>`;
 track.appendChild(card);
});

products.forEach(p=>{
 const card=document.createElement('article');
 card.className='product-card';
 card.dataset.category=p.category;
 card.innerHTML=`<div class="product-image"><span class="badge">${p.badge}</span><img src="${imagePath(p.id)}" alt="${p.name}" loading="lazy" /></div><div class="product-info"><div class="product-top"><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div><p>${p.desc}</p><div class="product-actions"><button class="add-bag" type="button" data-id="${p.id}">Add to bag</button><button class="view-product" type="button" data-id="${p.id}">View piece</button></div></div>`;
 grid.appendChild(card);
});

const cards=[...document.querySelectorAll('.merch-card')];
function updateParallax(){
 if(!zone||!track||window.innerWidth<=900)return;
 const rect=zone.getBoundingClientRect();
 const scrollable=zone.offsetHeight-window.innerHeight;
 const progress=Math.min(1,Math.max(0,-rect.top/scrollable));
 const maxX=Math.max(0,track.scrollWidth-window.innerWidth);
 track.style.transform=`translate3d(${-progress*maxX}px,0,0)`;
 if(progressFill)progressFill.style.transform=`scaleX(${progress})`;
 cards.forEach(card=>{
  const center=card.getBoundingClientRect().left+card.offsetWidth/2;
  const delta=(center-window.innerWidth/2)/window.innerWidth;
  const stage=card.querySelector('.product-stage');
  if(stage)stage.style.transform=`translate3d(${delta*-42}px,${Math.abs(delta)*12}px,0) rotate(${delta*-1.4}deg)`;
 });
}
let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{updateParallax();ticking=false;});},{passive:true});
window.addEventListener('resize',updateParallax);window.addEventListener('load',updateParallax);updateParallax();

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;
 document.querySelectorAll('.product-card').forEach(card=>card.hidden=f!=='all'&&card.dataset.category!==f);
}));

let bag=[];
try{bag=JSON.parse(localStorage.getItem('dq-merch-bag')||'[]')}catch(e){bag=[]}
const bagEl=document.getElementById('bag'),backdrop=document.getElementById('bag-backdrop'),bagItems=document.getElementById('bag-items'),bagCount=document.getElementById('bag-count'),bagTotal=document.getElementById('bag-total'),bagEmpty=document.getElementById('bag-empty');
function saveBag(){localStorage.setItem('dq-merch-bag',JSON.stringify(bag));renderBag()}
function renderBag(){
 bagItems.innerHTML='';
 let total=0;
 bag.forEach((id,index)=>{const p=products.find(x=>x.id===id);if(!p)return;total+=p.price;const item=document.createElement('div');item.className='bag-item';item.innerHTML=`<img src="${imagePath(p.id)}" alt="${p.name}" /><div><h4>${p.name}</h4><small>${money(p.price)}</small></div><button class="remove-item" type="button" data-index="${index}" aria-label="Remove ${p.name}">×</button>`;bagItems.appendChild(item)});
 bagCount.textContent=bag.length;bagTotal.textContent=money(total);bagEmpty.style.display=bag.length?'none':'block';
 document.querySelectorAll('.remove-item').forEach(b=>b.onclick=()=>{bag.splice(Number(b.dataset.index),1);saveBag()});
}
function openBag(){bagEl.classList.add('open');bagEl.setAttribute('aria-hidden','false');backdrop.classList.add('show')}
function closeBag(){bagEl.classList.remove('open');bagEl.setAttribute('aria-hidden','true');backdrop.classList.remove('show')}
document.getElementById('bag-trigger').onclick=openBag;document.getElementById('bag-close').onclick=closeBag;backdrop.onclick=closeBag;
document.addEventListener('click',e=>{const add=e.target.closest('.add-bag');if(add){bag.push(Number(add.dataset.id));saveBag();openBag()}const view=e.target.closest('.view-product');if(view){const p=products.find(x=>x.id===Number(view.dataset.id));if(p){document.querySelector('.shop-heading').scrollIntoView({behavior:'smooth'});setTimeout(()=>alert(`${p.name}\n${p.desc}\n${money(p.price)}`),350)}}});
document.getElementById('checkout').onclick=()=>{const note=document.getElementById('checkout-note');note.textContent='This store UI is ready, but payment processing is intentionally not connected on the unofficial study.';note.style.color='#4d2729'};
renderBag();