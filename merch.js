const products=[
{id:1,name:'Midnight Signature Hoodie',category:'apparel',price:68,badge:'Featured',desc:'Heavyweight black hoodie with signature branding and a polished artist-store finish.',material:'Heavyweight brushed cotton',fit:'Relaxed oversized',detail:'Signature front / statement back'},
{id:2,name:'Ivory Signature Tee',category:'apparel',price:36,badge:'Essential',desc:'Soft ivory tee with restrained signature artwork and a clean everyday silhouette.',material:'Premium combed cotton',fit:'Relaxed unisex',detail:'Muted-gold signature print'},
{id:3,name:'Afterglow Wine Hoodie',category:'apparel',price:72,badge:'New',desc:'Deep wine fleece with monogram details, warm metallic accents and a relaxed oversized fit.',material:'Heavy brushed fleece',fit:'Relaxed oversized',detail:'DQ monogram / gold accents'},
{id:4,name:'DQ Monogram Cap',category:'accessories',price:32,badge:'Best seller',desc:'Classic black cap embroidered with the DQ monogram for an understated daily piece.',material:'Structured cotton twill',fit:'Adjustable',detail:'DQ embroidery / signature accents'},
{id:5,name:'Ivory Lounge Pants',category:'apparel',price:54,badge:'New',desc:'Soft ivory sweatpants with discreet DQ detailing and a relaxed off-duty shape.',material:'Soft brushed fleece',fit:'Relaxed straight leg',detail:'Minimal DQ placement'},
{id:6,name:"Player's Pick Set",category:'studio',price:18,badge:'Player essential',desc:'A collectible set of branded guitar picks designed for both play and display.',material:'Premium guitar picks / metal tin',fit:'One size',detail:'Monogram / signature / wordmark designs'},
{id:7,name:'Ivory Monogram Sweatshirt',category:'apparel',price:62,badge:'Essential',desc:'Clean crewneck sweatshirt with subtle front monogram and signature back artwork.',material:'Premium loopback cotton',fit:'Relaxed',detail:'Monogram front / signature back'},
{id:8,name:'DQ Varsity Jacket',category:'apparel',price:95,badge:'Statement piece',desc:'Premium varsity-inspired jacket with bold identity work and a collectible finish.',material:'Wool-touch body / contrast sleeves',fit:'Classic varsity',detail:'Embroidered identity details'},
{id:9,name:'Signature Canvas Tote',category:'accessories',price:34,badge:'Everyday',desc:'Structured canvas tote with signature artwork and enough room for the everyday essentials.',material:'Heavy cotton canvas',fit:'One size',detail:'Signature front / DQ detail'},
{id:10,name:'DQ Knit Beanie',category:'accessories',price:26,badge:'Essential',desc:'Ribbed black beanie finished with a small embroidered DQ monogram.',material:'Soft rib knit',fit:'One size',detail:'Embroidered DQ monogram'},
{id:11,name:'In-Between Long Sleeve',category:'apparel',price:46,badge:'New',desc:'Washed charcoal long sleeve with quiet signature placement and sleeve typography.',material:'Washed heavyweight jersey',fit:'Relaxed',detail:'Sleeve typography / signature mark'},
{id:12,name:'Studio Mug & Pick Keychain',category:'studio',price:22,badge:'Gift set',desc:'A matte black mug paired with a guitar-pick keychain for desk, studio or rehearsal days.',material:'Ceramic / enamel-finish charm',fit:'One size',detail:'Two-piece studio set'},
{id:13,name:'After Hours Wide-Leg Joggers',category:'apparel',price:58,badge:'Limited',desc:'Washed black wide-leg joggers with handwritten reflections, butterfly artwork and celestial marks.',material:'Heavy washed fleece',fit:'Wide leg',detail:'Lyric script / butterfly / star graphics'},
{id:14,name:'Remembered Joggers',category:'apparel',price:58,badge:'Limited',desc:'Relaxed black joggers with handwritten reflections, a distressed butterfly and luminous star details.',material:'Soft heavyweight fleece',fit:'Relaxed cuffed leg',detail:'Handwritten lines / butterfly / DQ identity'},
{id:15,name:'Version of Me Joggers',category:'apparel',price:58,badge:'Limited',desc:'Graphic black joggers carrying the emotional language of The Version of Me You Knew in a softer editorial treatment.',material:'Heavy brushed fleece',fit:'Relaxed cuffed leg',detail:'Lyric fragments / butterfly / monogram'},
{id:16,name:'Writing Room Joggers',category:'apparel',price:58,badge:'Limited',desc:'Black joggers with sketchbook-style flourishes, burgundy floral artwork and intimate handwritten details.',material:'Soft washed fleece',fit:'Relaxed cuffed leg',detail:'Florals / handwritten notes / star marks'},
{id:17,name:'In-Between Wide-Leg Pants',category:'apparel',price:58,badge:'New',desc:'Wide-leg black lounge pants with cream typography, butterfly artwork and a clean fashion-led silhouette.',material:'Heavy drape fleece',fit:'Wide leg',detail:'Cream signature graphics / DQ monogram'},
{id:18,name:'Still Writing Joggers',category:'apparel',price:58,badge:'New',desc:'Faded-black joggers with a crescent charm, handwritten in-between linework and a sweeping botanical graphic.',material:'Heavy washed fleece',fit:'Relaxed adjustable cuff',detail:'Moon charm / script / botanical artwork'},
{id:19,name:'Ivory Crew Socks',category:'accessories',price:16,badge:'Everyday',desc:'Soft ribbed ivory crew socks with black and muted-gold DQ identity details.',material:'Cotton-rich rib knit',fit:'One size',detail:'DQ monogram / wordmark / signature'},
{id:20,name:'Gold Monogram Phone Case',category:'accessories',price:28,badge:'New',desc:'Black and ivory phone case finished with polished gold linework, the DQ monogram and signature detail.',material:'Protective gloss shell',fit:'Selected phone sizes',detail:'Gold DQ monogram / signature panel'},
{id:21,name:"Songwriter's Notebook",category:'studio',price:24,badge:'Studio essential',desc:'A premium black notebook for lyrics, melodies, fragments and the ideas that arrive between songs.',material:'Leather-look cover / uncoated pages',fit:'A5',detail:'Gold wordmark / signature belly band'},
{id:22,name:'Limited Edition Cassette Box',category:'collectors',price:48,badge:'Collector piece',desc:'A cassette-style presentation set with custom packaging, track card and display-ready collector details.',material:'Rigid presentation box / cassette shell',fit:'Limited edition',detail:'Cassette / track card / collector packaging'},
{id:23,name:'Signature Luxe Tote',category:'accessories',price:42,badge:'New',desc:'Elevated structured ivory tote with black trim, signature artwork, scarf detail and polished gold hardware.',material:'Structured canvas / leather-look trim',fit:'One size',detail:'Signature art / scarf / gold DQ charm'},
{id:24,name:'DQ Silk Scarf',category:'accessories',price:42,badge:'Signature piece',desc:'Soft black and ivory silk-touch scarf built from the monogram, signature and star motif system.',material:'Silk-touch twill',fit:'One size',detail:'All-over DQ motif / signature border'},
{id:25,name:'Leather Guitar Strap',category:'studio',price:55,badge:'Player essential',desc:'Premium black leather-look guitar strap with cream panels, gold hardware and Darla Quinn branding.',material:'Padded leather-look finish',fit:'Adjustable',detail:'Cream panels / gold hardware / DQ end tabs'}
];

const featureIds=[1,3,6,8,20,21,22,23,24,25];
const track=document.getElementById('merch-track');
const grid=document.getElementById('shop-grid');
const zone=document.querySelector('.stacked-zone');
const progressFill=document.getElementById('collection-progress-fill');
const money=n=>`£${n}`;
const imagePath=id=>`assets/Merch/${id}.png`;
const categoryLabel=c=>({apparel:'Apparel',accessories:'Accessories',collectors:'Collector piece',studio:'Studio essential'}[c]||c);

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
bag=bag.map(item=>typeof item==='number'?{id:item,size:null}:item).filter(item=>item&&products.some(p=>p.id===item.id));
const bagEl=document.getElementById('bag'),backdrop=document.getElementById('bag-backdrop'),bagItems=document.getElementById('bag-items'),bagCount=document.getElementById('bag-count'),bagTotal=document.getElementById('bag-total'),bagEmpty=document.getElementById('bag-empty');
function saveBag(){localStorage.setItem('dq-merch-bag',JSON.stringify(bag));renderBag()}
function renderBag(){
 bagItems.innerHTML='';
 let total=0;
 bag.forEach((entry,index)=>{const p=products.find(x=>x.id===entry.id);if(!p)return;total+=p.price;const item=document.createElement('div');item.className='bag-item';item.innerHTML=`<img src="${imagePath(p.id)}" alt="${p.name}" /><div><h4>${p.name}</h4><small>${money(p.price)}${entry.size?` · ${entry.size}`:''}</small></div><button class="remove-item" type="button" data-index="${index}" aria-label="Remove ${p.name}">×</button>`;bagItems.appendChild(item)});
 bagCount.textContent=bag.length;bagTotal.textContent=money(total);bagEmpty.style.display=bag.length?'none':'block';
 document.querySelectorAll('.remove-item').forEach(b=>b.onclick=()=>{bag.splice(Number(b.dataset.index),1);saveBag()});
}
function openBag(){closeModal();bagEl.classList.add('open');bagEl.setAttribute('aria-hidden','false');backdrop.classList.add('show');document.body.classList.add('modal-lock')}
function closeBag(){bagEl.classList.remove('open');bagEl.setAttribute('aria-hidden','true');backdrop.classList.remove('show');if(!modal.classList.contains('open'))document.body.classList.remove('modal-lock')}
document.getElementById('bag-trigger').onclick=openBag;document.getElementById('bag-close').onclick=closeBag;backdrop.onclick=closeBag;

const modal=document.getElementById('product-modal');
const modalBackdrop=document.getElementById('modal-backdrop');
const modalClose=document.getElementById('modal-close');
const modalImage=document.getElementById('modal-image');
const modalBadge=document.getElementById('modal-badge');
const modalCategory=document.getElementById('modal-category');
const modalTitle=document.getElementById('modal-title');
const modalPrice=document.getElementById('modal-price');
const modalDescription=document.getElementById('modal-description');
const modalSpecs=document.getElementById('modal-specs');
const modalOptions=document.getElementById('modal-options');
const relatedGrid=document.getElementById('related-grid');
const qtyValue=document.getElementById('qty-value');
const modalAdd=document.getElementById('modal-add');
let activeProduct=null,activeSize=null,activeQty=1;

function renderRelated(p){
 relatedGrid.innerHTML='';
 let related=products.filter(x=>x.id!==p.id&&x.category===p.category).slice(0,3);
 if(related.length<3)related=[...related,...products.filter(x=>x.id!==p.id&&!related.some(r=>r.id===x.id)).slice(0,3-related.length)];
 related.forEach(r=>{const el=document.createElement('button');el.type='button';el.className='related-card';el.dataset.id=r.id;el.innerHTML=`<img src="${imagePath(r.id)}" alt="${r.name}" loading="lazy"/><h4>${r.name}</h4><span>${money(r.price)}</span>`;relatedGrid.appendChild(el)});
}
function openModal(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 closeBag();activeProduct=p;activeQty=1;activeSize=p.category==='apparel'?'M':null;qtyValue.textContent='1';
 modalImage.src=imagePath(p.id);modalImage.alt=p.name;modalBadge.textContent=p.badge;modalCategory.textContent=categoryLabel(p.category);modalTitle.textContent=p.name;modalPrice.textContent=money(p.price);modalDescription.textContent=p.desc;
 modalSpecs.innerHTML=`<div><span>Material</span><strong>${p.material}</strong></div><div><span>Fit / format</span><strong>${p.fit}</strong></div><div><span>Detail</span><strong>${p.detail}</strong></div>`;
 if(p.category==='apparel'){
  modalOptions.innerHTML=`<div class="option-label">Select size</div><div class="size-options">${['XS','S','M','L','XL'].map(s=>`<button class="size-btn${s==='M'?' active':''}" type="button" data-size="${s}">${s}</button>`).join('')}</div>`;
 }else if(p.id===20){
  activeSize='iPhone 15 Pro';modalOptions.innerHTML=`<div class="option-label">Select case</div><div class="size-options">${['iPhone 15 Pro','iPhone 15','iPhone 14 Pro'].map((s,i)=>`<button class="size-btn${i===0?' active':''}" type="button" data-size="${s}">${s.replace('iPhone ','')}</button>`).join('')}</div>`;
 }else modalOptions.innerHTML='<div class="option-label">One size / collector format</div>';
 renderRelated(p);
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');modalBackdrop.classList.add('show');document.body.classList.add('modal-lock');modal.scrollTop=0;
}
function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalBackdrop.classList.remove('show');if(!bagEl.classList.contains('open'))document.body.classList.remove('modal-lock')}
modalClose.onclick=closeModal;modalBackdrop.onclick=closeModal;
document.getElementById('qty-minus').onclick=()=>{activeQty=Math.max(1,activeQty-1);qtyValue.textContent=activeQty};
document.getElementById('qty-plus').onclick=()=>{activeQty=Math.min(9,activeQty+1);qtyValue.textContent=activeQty};
modalOptions.addEventListener('click',e=>{const btn=e.target.closest('.size-btn');if(!btn)return;modalOptions.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeSize=btn.dataset.size});
relatedGrid.addEventListener('click',e=>{const card=e.target.closest('.related-card');if(card)openModal(Number(card.dataset.id))});
modalAdd.onclick=()=>{if(!activeProduct)return;for(let i=0;i<activeQty;i++)bag.push({id:activeProduct.id,size:activeSize});saveBag();closeModal();openBag()};

document.addEventListener('click',e=>{
 const add=e.target.closest('.add-bag');if(add){const p=products.find(x=>x.id===Number(add.dataset.id));bag.push({id:p.id,size:p.category==='apparel'?'M':p.id===20?'iPhone 15 Pro':null});saveBag();openBag()}
 const view=e.target.closest('.view-product');if(view)openModal(Number(view.dataset.id));
 const image=e.target.closest('.product-image');if(image){const card=image.closest('.product-card');const viewBtn=card&&card.querySelector('.view-product');if(viewBtn)openModal(Number(viewBtn.dataset.id))}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeBag()}});
document.getElementById('checkout').onclick=()=>{const note=document.getElementById('checkout-note');note.textContent='This store UI is ready, but payment processing is intentionally not connected on the unofficial study.';note.style.color='#4d2729'};
renderBag();