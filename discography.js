// 2/6 — Editorial discography refinement.
(function buildDiscography(){
  const section = document.querySelector('.releases');
  if (!section || section.dataset.discographyReady === 'true') return;
  section.dataset.discographyReady = 'true';
  section.id = 'discography';

  const spotify = 'https://open.spotify.com/artist/5qFlrFooOTan8kPcKyqt5p';
  const artwork = 'https://static.wixstatic.com/media/e1328f_91e2859a01d5470eb3ee7e9a2453bb87~mv2.png/v1/fill/w_1200,h_1200,al_c,q_94,enc_auto/Darla.png';

  section.innerHTML = `
    <div class="discography-head">
      <div class="discography-head-copy">
        <p class="section-kicker">Discography / selected songs</p>
        <h2>A catalogue of<br><em>small truths.</em></h2>
      </div>
      <div class="discography-head-note">
        <span>Five songs. Five little worlds.</span>
        <p>Start anywhere. Each one opens somewhere different.</p>
        <a href="${spotify}" target="_blank" rel="noreferrer">Explore all music on Spotify ↗</a>
      </div>
    </div>

    <div class="discography-grid">
      <a class="disc-card disc-card-featured" href="${spotify}" target="_blank" rel="noreferrer" aria-label="Listen to The Version of Me You Knew on Spotify">
        <div class="disc-art"><img src="${artwork}" alt="The Version of Me You Knew artwork" loading="lazy" /></div>
        <div class="disc-card-overlay"></div>
        <span class="disc-number">01</span>
        <div class="disc-card-copy"><small>Featured release · 2026</small><h3>The Version of Me You Knew</h3><span class="disc-listen">Listen ↗</span></div>
      </a>

      <a class="disc-card disc-card-type disc-tone-1" href="${spotify}" target="_blank" rel="noreferrer" aria-label="Listen to The Promise on Spotify">
        <img class="disc-monogram" src="https://res.cloudinary.com/vysyrabp/image/upload/v1787341587/darla-quinn/dq-monogram.png" alt="" aria-hidden="true" />
        <span class="disc-number">02</span><div class="disc-card-copy"><small>Song</small><h3>The Promise</h3><span class="disc-listen">Listen ↗</span></div>
      </a>

      <a class="disc-card disc-card-type disc-tone-2" href="${spotify}" target="_blank" rel="noreferrer" aria-label="Listen to Half-Light on Spotify">
        <span class="disc-orbit" aria-hidden="true"></span><span class="disc-number">03</span><div class="disc-card-copy"><small>Song</small><h3>Half-Light</h3><span class="disc-listen">Listen ↗</span></div>
      </a>

      <a class="disc-card disc-card-type disc-tone-3" href="${spotify}" target="_blank" rel="noreferrer" aria-label="Listen to Breathe In on Spotify">
        <span class="disc-lines" aria-hidden="true"></span><span class="disc-number">04</span><div class="disc-card-copy"><small>Song</small><h3>Breathe In</h3><span class="disc-listen">Listen ↗</span></div>
      </a>

      <a class="disc-card disc-card-wide disc-tone-4" href="${spotify}" target="_blank" rel="noreferrer" aria-label="Listen to You Always Know What I Need on Spotify">
        <div class="disc-wide-ghost" aria-hidden="true">YOU ALWAYS KNOW</div>
        <span class="disc-number">05</span><div class="disc-card-copy"><small>Song</small><h3>You Always Know<br><em>(What I Need)</em></h3><span class="disc-listen">Listen ↗</span></div>
      </a>
    </div>`;

  const style = document.createElement('style');
  style.textContent = `
    .releases[data-discography-ready="true"]{background:#f0eadf;padding:130px 7vw 145px;overflow:hidden}
    .discography-head{display:grid;grid-template-columns:1.35fr .65fr;gap:8vw;align-items:end;margin-bottom:72px}
    .discography-head h2{margin:0;font-family:"Playfair Display",serif;font-weight:500;font-size:clamp(58px,7.8vw,126px);line-height:.9;letter-spacing:-.045em}
    .discography-head h2 em{font-weight:500}
    .discography-head-note{max-width:430px;padding-bottom:8px}
    .discography-head-note>span{display:block;font-family:"Playfair Display",serif;font-size:clamp(24px,2.1vw,34px);line-height:1.2;margin-bottom:15px}
    .discography-head-note p{color:#6d655d;line-height:1.65;margin:0 0 23px;font-size:14px}
    .discography-head-note a{display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.11em;border-bottom:1px solid rgba(23,21,18,.32);padding-bottom:5px}

    .discography-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:minmax(240px,auto);gap:14px}
    .disc-card{position:relative;overflow:hidden;min-height:390px;color:#f8f4ec;border:1px solid rgba(23,21,18,.08);isolation:isolate;transform:translateY(26px);opacity:0;transition:transform 1s cubic-bezier(.22,1,.36,1),opacity .8s ease,box-shadow .55s ease}
    .disc-card.disc-in{transform:none;opacity:1}
    .disc-card:hover{box-shadow:0 30px 70px rgba(23,21,18,.13)}
    .disc-card-featured{grid-column:span 7;grid-row:span 2;min-height:660px}
    .disc-card-type{grid-column:span 5}
    .disc-card-wide{grid-column:span 12;min-height:360px}
    .disc-art,.disc-art img{position:absolute;inset:0;width:100%;height:100%}
    .disc-art img{object-fit:cover;filter:saturate(.8) contrast(1.03);transition:transform 1.25s cubic-bezier(.22,1,.36,1),filter .7s ease}
    .disc-card-featured:hover .disc-art img{transform:scale(1.035);filter:saturate(.95) contrast(1.03)}
    .disc-card-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,12,10,.05) 20%,rgba(15,12,10,.15) 48%,rgba(15,12,10,.82) 100%)}
    .disc-number{position:absolute;top:22px;left:24px;z-index:3;font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.7}
    .disc-card-copy{position:absolute;z-index:3;left:26px;right:26px;bottom:25px;display:grid;grid-template-columns:1fr auto;gap:9px 20px;align-items:end}
    .disc-card-copy small{grid-column:1/-1;font-size:9px;letter-spacing:.17em;text-transform:uppercase;opacity:.62}
    .disc-card-copy h3{margin:0;font-family:"Playfair Display",serif;font-weight:500;font-size:clamp(34px,3.5vw,62px);line-height:.94;letter-spacing:-.035em;max-width:92%}
    .disc-card-copy h3 em{font-weight:500}
    .disc-listen{font-size:10px;text-transform:uppercase;letter-spacing:.13em;white-space:nowrap;transform:translateX(0);transition:transform .45s cubic-bezier(.22,1,.36,1)}
    .disc-card:hover .disc-listen{transform:translateX(7px)}

    .disc-tone-1{background:linear-gradient(145deg,#4d2729,#76504e)}
    .disc-tone-2{background:linear-gradient(145deg,#282421,#6b6259)}
    .disc-tone-3{background:linear-gradient(145deg,#89766b,#4a3f39)}
    .disc-tone-4{background:linear-gradient(112deg,#171512 0%,#382d2b 52%,#76504e 100%)}
    .disc-monogram{position:absolute!important;width:72%!important;height:auto!important;right:-13%;top:-11%;opacity:.07;filter:brightness(4);transition:transform 1.1s cubic-bezier(.22,1,.36,1),opacity .6s ease}
    .disc-tone-1:hover .disc-monogram{transform:rotate(4deg) scale(1.035);opacity:.105}
    .disc-orbit{position:absolute;width:330px;height:330px;border:1px solid rgba(248,244,236,.13);border-radius:50%;right:-70px;top:-88px;transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
    .disc-orbit::after{content:"";position:absolute;width:13px;height:13px;border-radius:50%;background:#c9ae86;left:31px;bottom:69px;box-shadow:0 0 42px rgba(201,174,134,.48)}
    .disc-tone-2:hover .disc-orbit{transform:rotate(18deg) scale(1.04)}
    .disc-lines{position:absolute;inset:0;background:repeating-linear-gradient(112deg,transparent 0 33px,rgba(248,244,236,.045) 34px 35px);transform:scale(1.08);transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
    .disc-tone-3:hover .disc-lines{transform:scale(1.12) translateX(8px)}
    .disc-wide-ghost{position:absolute;white-space:nowrap;left:6%;top:48%;transform:translateY(-50%);font-family:"Playfair Display",serif;font-size:clamp(70px,11vw,190px);letter-spacing:-.06em;opacity:.035;transition:opacity .5s ease,transform 1s cubic-bezier(.22,1,.36,1)}
    .disc-card-wide:hover .disc-wide-ghost{opacity:.055;transform:translateY(-50%) translateX(12px)}
    .disc-card-wide .disc-card-copy h3{font-size:clamp(48px,6vw,95px)}

    @media(max-width:900px){
      .releases[data-discography-ready="true"]{padding:96px 24px 105px}
      .discography-head{grid-template-columns:1fr;gap:28px;margin-bottom:50px}
      .discography-head-note{max-width:620px}
      .discography-grid{grid-template-columns:1fr;gap:12px}
      .disc-card,.disc-card-featured,.disc-card-type,.disc-card-wide{grid-column:auto;grid-row:auto;min-height:470px}
      .disc-card-featured{min-height:560px}
      .disc-card-wide{min-height:430px}
      .disc-card-copy{left:20px;right:20px;bottom:21px}
      .disc-card-copy h3,.disc-card-wide .disc-card-copy h3{font-size:clamp(39px,10vw,66px);max-width:95%}
      .disc-monogram{width:88%!important;right:-22%;top:-8%}
    }
    @media(max-width:560px){
      .discography-head h2{font-size:clamp(54px,17vw,82px)}
      .disc-card{min-height:410px}.disc-card-featured{min-height:500px}.disc-card-wide{min-height:390px}
      .disc-card-copy{grid-template-columns:1fr}.disc-listen{margin-top:4px}
    }
    @media(prefers-reduced-motion:reduce){.disc-card{opacity:1!important;transform:none!important;transition:none!important}.disc-art img,.disc-monogram,.disc-orbit,.disc-lines,.disc-wide-ghost{transition:none!important}}
  `;
  document.head.appendChild(style);

  const cards = section.querySelectorAll('.disc-card');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const card = entry.target;
      const index = Array.from(cards).indexOf(card);
      window.setTimeout(()=>card.classList.add('disc-in'), Math.max(0,index)*90);
      observer.unobserve(card);
    });
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  cards.forEach(card=>observer.observe(card));
})();