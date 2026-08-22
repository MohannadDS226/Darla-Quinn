// 1.2 / 6 — cinematic lyric choreography.
// This is intentionally a site-side visual sequence rather than a Spotify lyrics API sync.
(function buildLyricChoreography(){
  const experience = document.querySelector('.song-experience');
  const panel = document.querySelector('.song-player-panel');
  if (!experience || !panel || document.querySelector('.lyric-stage')) return;

  const quote = panel.querySelector('.song-quote');
  if (quote) quote.style.display = 'none';

  const lyricStage = document.createElement('div');
  lyricStage.className = 'lyric-stage';
  lyricStage.setAttribute('aria-label','Cinematic lyric moment');
  lyricStage.innerHTML = `
    <div class="lyric-stage-topline">
      <span>Lyric moment</span>
      <span class="lyric-stage-status">Visual sequence</span>
    </div>
    <div class="lyric-window" aria-live="polite">
      <p class="lyric-line is-active">The version of me you knew</p>
      <p class="lyric-line">Before the cracks ran through</p>
      <p class="lyric-line">Maybe I don't miss you</p>
      <p class="lyric-line">Maybe I miss</p>
      <p class="lyric-line lyric-line-final">the version of me you knew</p>
    </div>
    <div class="lyric-progress" aria-hidden="true"><span></span></div>
    <div class="lyric-controls">
      <button class="lyric-start" type="button"><span class="lyric-start-icon">▶</span><span class="lyric-start-label">Play lyric moment</span></button>
      <button class="lyric-reset" type="button" aria-label="Restart lyric moment">↺</button>
      <span class="lyric-note">A cinematic lyric sequence alongside Spotify playback</span>
    </div>`;

  const meta = panel.querySelector('.song-meta-line');
  if (meta) meta.insertAdjacentElement('beforebegin', lyricStage);
  else panel.appendChild(lyricStage);

  const style = document.createElement('style');
  style.textContent = `
    .lyric-stage{margin:30px 0 32px;padding:27px 0 4px;border-top:1px solid rgba(248,244,236,.17);border-bottom:1px solid rgba(248,244,236,.17)}
    .lyric-stage-topline{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:20px;color:rgba(248,244,236,.42);font-size:9px;text-transform:uppercase;letter-spacing:.19em}
    .lyric-stage-status{color:#c9ae86}
    .lyric-window{position:relative;min-height:172px;display:flex;align-items:center;overflow:visible}
    .lyric-line{position:absolute;inset:auto 0;margin:0;font-family:"Playfair Display",serif;font-size:clamp(34px,4.25vw,72px);font-weight:500;line-height:1.01;letter-spacing:-.042em;color:rgba(248,244,236,.14);opacity:0;transform:translateY(22px);filter:blur(8px);transition:opacity .75s ease,transform 1s cubic-bezier(.22,1,.36,1),filter .9s ease,color .75s ease}
    .lyric-line.is-active{opacity:1;transform:translateY(0);filter:blur(0);color:#f8f4ec}
    .lyric-line.is-past{opacity:.16;transform:translateY(-18px);filter:blur(2px);color:rgba(248,244,236,.45)}
    .lyric-line-final{font-style:italic;color:#c9ae86}
    .lyric-line-final.is-active{color:#d8c19c}
    .lyric-progress{height:1px;background:rgba(248,244,236,.12);overflow:hidden;margin:5px 0 19px}
    .lyric-progress span{display:block;height:100%;width:0;background:linear-gradient(90deg,#c9ae86,#f4ebdd);transform-origin:left}
    .lyric-stage.is-playing .lyric-progress span{animation:lyricTimeline 24s linear forwards}
    @keyframes lyricTimeline{from{width:0}to{width:100%}}
    .lyric-controls{display:flex;align-items:center;gap:12px;min-height:52px;padding-bottom:17px}
    .lyric-start,.lyric-reset{appearance:none;border:1px solid rgba(248,244,236,.24);background:rgba(248,244,236,.045);color:#f8f4ec;height:40px;cursor:pointer;transition:background .3s ease,border-color .3s ease,transform .35s cubic-bezier(.22,1,.36,1)}
    .lyric-start{display:inline-flex;align-items:center;gap:9px;padding:0 15px;font-family:"DM Sans",sans-serif;font-size:9px;text-transform:uppercase;letter-spacing:.14em}
    .lyric-reset{width:40px;font-size:17px}
    .lyric-start:hover,.lyric-reset:hover{background:rgba(201,174,134,.11);border-color:rgba(201,174,134,.5);transform:translateY(-1px)}
    .lyric-start-icon{font-size:9px;color:#c9ae86}
    .lyric-note{margin-left:auto;max-width:290px;text-align:right;color:rgba(248,244,236,.36);font-size:9px;line-height:1.45;letter-spacing:.06em}
    @media(max-width:900px){.lyric-window{min-height:145px}.lyric-line{font-size:clamp(32px,9vw,56px)}.lyric-controls{flex-wrap:wrap}.lyric-note{flex-basis:100%;max-width:none;margin:2px 0 0;text-align:left}.lyric-stage{margin-top:28px}}
    @media(max-width:560px){.lyric-window{min-height:132px}.lyric-line{font-size:clamp(30px,10vw,48px)}.lyric-stage-topline{font-size:8px}.lyric-start{padding:0 12px}}
    @media(prefers-reduced-motion:reduce){.lyric-line{transition:none;filter:none}.lyric-progress span{animation:none!important}.lyric-stage.is-playing .lyric-progress span{width:100%}}
  `;
  document.head.appendChild(style);

  const lines = [...lyricStage.querySelectorAll('.lyric-line')];
  const startButton = lyricStage.querySelector('.lyric-start');
  const resetButton = lyricStage.querySelector('.lyric-reset');
  const startLabel = lyricStage.querySelector('.lyric-start-label');
  const startIcon = lyricStage.querySelector('.lyric-start-icon');
  const status = lyricStage.querySelector('.lyric-stage-status');
  let timers = [];
  let playing = false;

  // Designed as an elegant 24 second lyric vignette. Exact song-sync can be added later
  // when an approved timing source/playback integration is available.
  const cues = [0, 4700, 9200, 14100, 18100];

  function clearTimers(){ timers.forEach(clearTimeout); timers = []; }
  function showLine(index){
    lines.forEach((line,i)=>{
      line.classList.toggle('is-active', i === index);
      line.classList.toggle('is-past', i < index);
    });
  }
  function resetSequence(){
    clearTimers();
    playing = false;
    lyricStage.classList.remove('is-playing');
    // Force restartable progress animation.
    const progress = lyricStage.querySelector('.lyric-progress span');
    if (progress) { progress.style.animation = 'none'; void progress.offsetWidth; progress.style.animation = ''; }
    showLine(0);
    startLabel.textContent = 'Play lyric moment';
    startIcon.textContent = '▶';
    status.textContent = 'Visual sequence';
  }
  function playSequence(){
    resetSequence();
    playing = true;
    lyricStage.classList.add('is-playing');
    startLabel.textContent = 'Lyric moment playing';
    startIcon.textContent = '♪';
    status.textContent = 'Now revealing';
    cues.slice(1).forEach((time,offset)=>timers.push(setTimeout(()=>showLine(offset+1),time)));
    timers.push(setTimeout(()=>{
      playing = false;
      startLabel.textContent = 'Replay lyric moment';
      startIcon.textContent = '↺';
      status.textContent = 'Moment complete';
    },24000));
  }

  startButton.addEventListener('click',()=> playing ? resetSequence() : playSequence());
  resetButton.addEventListener('click',resetSequence);
  resetSequence();
})();
