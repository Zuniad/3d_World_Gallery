const fs = require('fs');
const path = require('path');

// Load landmarks
const landmarksData = fs.readFileSync('src/data/landmarksData.ts', 'utf8');
const landmarksMatch = landmarksData.match(/export const LANDMARKS: Landmark\[\] = (\[[\s\S]*?\]);/);
const landmarks = JSON.parse(landmarksMatch[1]);

// Load chapters
const chapters = [
  { num: 1, id: 'singapore', country: 'Singapore', cc: 'SG', start: 1, end: 9, tagline: 'Equatorial Garden City & Maritime Crossroads', intro: 'Where the South China Sea gathers colonial trading quays, lush rain-trees, and glass towers crowned by sky gardens.' },
  { num: 2, id: 'japan', country: 'Japan', cc: 'JP', start: 10, end: 18, tagline: 'Ancient Shrines, Cedar Groves & Alpine Silence', intro: 'Centuries of timber carpentry, moss-covered temple paths, vermilion torii, and snow-capped volcanic ridges.' },
  { num: 3, id: 'italy', country: 'Italy', cc: 'IT', start: 19, end: 27, tagline: 'Sun-Drenched Stone, Marble Domes & Venetian Lagoons', intro: 'Terracotta pantiles warmed by two thousand summers, arched loggias, and cypress shadows falling across quiet piazzas.' },
  { num: 4, id: 'france', country: 'France', cc: 'FR', start: 28, end: 36, tagline: 'Limestone Mansards, Tidal Abbeys & Lavender Fields', intro: 'Wrought-iron balconies catching morning Seine light, Gothic flying buttresses, and sea winds whipping past granite promontories.' },
  { num: 5, id: 'india', country: 'India', cc: 'IN', start: 37, end: 45, tagline: 'Carved Sandstone, Sacred River Steps & Spice Coasts', intro: 'Monolithic granite boulders resting on ancient riverbeds, marble domes floating at dawn, and fragrant temple courtyards.' },
  { num: 6, id: 'united-states', country: 'United States', cc: 'US', start: 46, end: 54, tagline: 'Canyon Strata, Granite Monoliths & Suspension Spans', intro: 'Two billion years of exposed red earth, towering Pacific sequoias, and cathedrals of riveted suspension steel.' },
  { num: 7, id: 'switzerland', country: 'Switzerland', cc: 'CH', start: 55, end: 63, tagline: 'Granite Horns, Alpine Meadows & Medieval Timber', intro: 'Glacial cirques carved above pine-scented valleys, timber-covered bridges spanning clear alpine torrents, and sheer limestone walls.' },
  { num: 8, id: 'egypt', country: 'Egypt', cc: 'EG', start: 64, end: 72, tagline: 'Desert Monoliths, Papyrus Columns & Eternal Waters', intro: 'Golden limestone rising from desert sands, papyrus columns reflected in the Nile, and sunken rock-cut tombs enduring through millennia.' },
  { num: 9, id: 'united-kingdom', country: 'United Kingdom', cc: 'GB', start: 73, end: 81, tagline: 'Weathered Ashlar, Moorland Ridges & Gothic Spires', intro: 'Ancient standing stones beneath scudding northern clouds, iron bridges echoing over the Thames, and castle crags towering above coastal firths.' },
  { num: 10, id: 'new-zealand', country: 'New Zealand', cc: 'NZ', start: 82, end: 90, tagline: 'Glacial Fjords, Alpine Passes & Native Ferns', intro: 'Sheer granite cliffs plummeting into dark southern waters, turquoise glacial lakes reflecting snow fields, and rolling emerald valleys.' },
  { num: 11, id: 'turkey', country: 'Turkey', cc: 'TR', start: 91, end: 99, tagline: 'Byzantine Domes, Tufa Spires & Bosphorus Straits', intro: 'Pencil-thin minarets punctuating the Golden Horn skyline, fairy chimneys carved by volcanic ash, and marble porticos echoing ancient assemblies.' },
  { num: 12, id: 'indonesia', country: 'Indonesia', cc: 'ID', start: 100, end: 108, tagline: 'Volcanic Calderas, Stone Stupas & Equatorial Reefs', intro: 'Volcanic andesite stupas emerging from morning jungle mist, wave-beaten sea shrines perched on craggy promontories, and stepped rice terraces.' }
];

// Pages array for sketchbook
const PAGES = [
  {
    file: 'plates/cover.svg',
    title: 'Atlas of Elsewhere',
    place: 'Frontispiece & Cover',
    chapter: 0,
    chapterTitle: 'Opening Cover',
    country: 'World',
    countryCode: 'ATLAS',
    plateNumber: 0,
    coordinates: 'Global Meridians',
    classification: 'Opening Folio',
    description: 'A sketchbook of places, passages, and little discoveries collected during journeys around the world.',
    notes: 'Opening edition covering twelve chapters across Europe, Asia, Africa, the Americas, and Oceania.'
  },
  ...landmarks.map(l => ({
    file: l.illustrationFile,
    title: l.title,
    place: l.place,
    chapter: l.chapterNumber,
    chapterTitle: `Chapter ${String(l.chapterNumber).padStart(2, '0')} — ${l.country.toUpperCase()}`,
    country: l.country,
    countryCode: l.countryCode,
    plateNumber: l.plateNumber,
    coordinates: l.coordinates,
    classification: l.subjectClassification,
    description: l.description,
    notes: l.culturalNotes
  }))
];

// Now build the complete public/landing-pages/meng-to-sketchbook.html
const htmlContent = `<!doctype html>
<html lang="en">
<head>
<script>
function __threeuiStorageImage(...args){
  const image=new Image(...args);
  const property=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");
  Object.defineProperty(image,"src",{
    configurable:true,
    get(){return property.get.call(this)},
    set(value){
      try{
        const url=new URL(value,document.baseURI);
        if(this.crossOrigin===null&&(url.href.startsWith("https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/")||url.origin===new URL(document.baseURI).origin)) {
          this.crossOrigin="anonymous";
        }
      }catch{}
      property.set.call(this,value);
    }
  });
  return image;
}
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Atlas of Elsewhere — Global Travel Sketchbook</title>
<meta name="description" content="A sketchbook of places, passages, and little discoveries — an interactive world travel journal across 12 countries and 108 illustrated plates.">
<style>
@font-face{
  font-family:'Instrument Serif';font-style:normal;font-weight:400;font-display:block;
  src:url(meng-to-sketchbook/instrument-serif.woff2) format('woff2'),
      url(https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/embedded/60c06664b5a95c7de6cc3e00d1f9034d78bd1e40b564016b241674449a067d4d.woff2) format('woff2');
}
@font-face{
  font-family:'Instrument Serif';font-style:italic;font-weight:400;font-display:block;
  src:url(meng-to-sketchbook/instrument-serif-italic.woff2) format('woff2'),
      url(https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/embedded/6ee678c33f388dd7ba59700ebea635deb98821baafd817b09891f7927177f702.woff2) format('woff2');
}
@font-face{
  font-family:'Newsreader';font-style:normal;font-weight:200 600;font-display:swap;
  src:url(meng-to-sketchbook/newsreader.woff2) format('woff2'),
      url(https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/dcec2e68141a33903e3b6cc1/newsreader.woff2) format('woff2');
}

:root{
  --paper:#ece7dc;
  --aged-parchment:#e5d6bd;
  --ink:#2b2721;
  --ink-soft:rgba(43,39,33,.58);
  --ink-faint:rgba(43,39,33,.36);
  --hairline:rgba(43,39,33,.14);
  --earth:#9a6a3e;
  --terracotta:#b8755c;
  --botanical:#69775a;
  --ocean-blue:#7f9fa6;
  --display:'Instrument Serif',"New York",Georgia,'Times New Roman',serif;
  --font:'Newsreader',"New York",Georgia,'Times New Roman',serif;
  --track-caps:.24em;
  --track-nav:.06em;
}

*{box-sizing:border-box}
html,body{margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{
  font-family:var(--font);font-weight:400;background:var(--paper);color:var(--ink);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
a{color:inherit;text-decoration:none}
button{font:inherit}
::selection{background:rgba(184,117,92,.25);color:var(--ink)}

.wash{
  position:fixed;inset:0;z-index:-2;pointer-events:none;
  background:url(meng-to-sketchbook/bg-wash.jpg) center top / cover no-repeat,
             url(https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/339abd2c649a11f725af9114/bg-wash.jpg) center top / cover no-repeat;
  opacity:.85;
}
.wash:after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(236,231,220,.25) 0%,rgba(236,231,220,.72) 58%,var(--paper) 88%);
}

.page{position:relative;width:100%;min-height:100vh;display:flex;flex-direction:column}

/* Top Header */
.top{
  padding:28px 48px 16px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--hairline);position:relative;z-index:10;
  backdrop-filter:blur(6px);background:rgba(236,231,220,0.65);
}
.brand{display:flex;flex-direction:column;gap:3px}
.brand-title{font-family:var(--display);font-size:28px;letter-spacing:1px;font-weight:400;color:var(--ink)}
.brand-sub{font-size:14px;font-style:italic;color:var(--ink-soft);letter-spacing:0.02em}

.top nav{display:flex;align-items:center;gap:28px;font-size:14px;letter-spacing:var(--track-caps);text-transform:uppercase}
.top nav a{color:var(--ink-soft);transition:color .2s ease}
.top nav a:hover{color:var(--ink)}

/* Chapter Bar */
.chapter-bar-wrap{
  padding:12px 48px;border-bottom:1px solid var(--hairline);background:rgba(236,231,220,0.45);
  display:flex;align-items:center;gap:12px;overflow-x:auto;scrollbar-width:none;
}
.chapter-bar-wrap::-webkit-scrollbar{display:none}
.chapter-bar-label{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);white-space:nowrap}
.ch-btn{
  background:transparent;border:1px solid var(--hairline);padding:5px 12px;border-radius:20px;
  font-size:12px;letter-spacing:1px;cursor:pointer;color:var(--ink-soft);transition:all .18s ease;white-space:nowrap;
}
.ch-btn:hover{border-color:var(--ink);color:var(--ink)}
.ch-btn.active{background:var(--ink);color:var(--paper);border-color:var(--ink)}

/* Hero Section with 3D Sketchbook */
.hero{
  position:relative;padding:32px 24px 64px;display:flex;flex-direction:column;align-items:center;
  min-height:86vh;justify-content:center;
}
.botany{position:absolute;pointer-events:none;z-index:1;max-width:320px;opacity:.9}
.botany.l{top:20px;left:0}
.botany.r{top:20px;right:0}

.chapter-badge-wrap{margin-bottom:18px;text-align:center;z-index:2}
.ch-banner{
  display:inline-block;padding:4px 16px;border-radius:14px;background:rgba(43,39,33,0.06);
  border:1px solid var(--hairline);font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--ink-soft);
}
.ch-desc-note{font-size:15px;font-style:italic;color:var(--ink-soft);margin-top:6px;max-width:680px}

/* 3D Sketchbook Stage */
.sb-wrap{position:relative;width:100%;max-width:1120px;margin:0 auto;z-index:2}
.sb-stage{
  position:relative;display:flex;align-items:center;justify-content:center;
  perspective:1800px;touch-action:none;user-select:none;
}
.sb-arrow{
  position:absolute;top:50%;transform:translateY(-50%);z-index:20;background:transparent;border:0;
  cursor:pointer;color:var(--ink);opacity:.6;padding:16px 8px;transition:all .2s ease;
}
.sb-arrow:hover{opacity:1;transform:translateY(-50%) scale(1.1)}
.sb-arrow.left{left:-24px}
.sb-arrow.right{right:-24px}

.sb-3d{
  position:relative;width:100%;aspect-ratio:1760/1240;max-height:760px;
  transform-style:preserve-3d;
  transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--zoom,1));
  transition:transform .08s ease-out;
}
.sb-tilt{position:absolute;inset:0;transform-style:preserve-3d}

/* Cast shadows */
.sb-cast{position:absolute;inset:4% 3% -3% 3%;pointer-events:none;border-radius:12px}
.sb-cast.ambient{box-shadow:0 30px 60px rgba(43,39,33,.22), 0 10px 24px rgba(43,39,33,.12)}
.sb-cast.contact{box-shadow:0 6px 14px rgba(43,39,33,.18)}
.sb-cast.hair{box-shadow:0 1px 3px rgba(43,39,33,.25)}

/* Book and Paper */
.sb-book{position:absolute;inset:0;background:var(--paper);border-radius:4px;overflow:hidden}
.sb-full{position:absolute;inset:0;overflow:hidden}
.sb-full img{width:100%;height:100%;object-fit:contain;display:block}

.sb-half{position:absolute;top:0;bottom:0;width:50%;overflow:hidden}
.sb-half.left{left:0}
.sb-half.right{right:0}
.sb-half-img{position:absolute;top:0;height:100%;width:200%;max-width:none}
.sb-half-img.left{left:0}
.sb-half-img.right{right:0}

.gutter-shade{position:absolute;top:0;bottom:0;width:60px;pointer-events:none}
.gutter-shade.left{right:0;background:linear-gradient(90deg,transparent,rgba(43,39,33,.14))}
.gutter-shade.right{left:0;background:linear-gradient(-90deg,transparent,rgba(43,39,33,.14))}

.sb-zone{position:absolute;top:0;bottom:0;width:50%;background:transparent;border:0;cursor:pointer;z-index:15}
.sb-zone.sb-prev{left:0}
.sb-zone.sb-next{right:0}

/* Curled Leaf & 18 Strips Chain */
.curl{
  position:absolute;top:0;bottom:0;width:calc(var(--bw) * var(--span));
  transform-style:preserve-3d;pointer-events:none;z-index:10;
}
.curl.next{right:calc(var(--bw) * 0.5);transform-origin:right center}
.curl.prev{left:calc(var(--bw) * 0.5);transform-origin:left center}
.strip{
  position:absolute;top:0;bottom:0;left:0;width:calc(100% / var(--n));
  transform-style:preserve-3d;transform-origin:left center;
  transform:rotateY(var(--td));
}
.strip>.strip{left:100%}
.face{
  position:absolute;inset:0;backface-visibility:hidden;
  background-size:var(--bw) 100%;background-repeat:no-repeat;
}
.face.back{transform:rotateY(180deg)}
.face .sh{position:absolute;inset:0;background:#000;opacity:var(--a1,0);pointer-events:none}
.face .gl{position:absolute;inset:0;background:#fff;opacity:calc(var(--lit,0) * 0.12);pointer-events:none}

/* Magnifying Loupe */
.loupe{
  position:absolute;width:var(--lr,210px);height:var(--lr,210px);top:0;left:0;
  border-radius:50%;pointer-events:auto;cursor:grab;z-index:25;
  display:none;touch-action:none;
}
.loupe.on{display:block}
.loupe.held{cursor:grabbing}
.loupe .ring{
  position:absolute;inset:0;border-radius:50%;
  border:6px solid #4a3e31;box-shadow:0 12px 28px rgba(0,0,0,.38), inset 0 0 10px rgba(0,0,0,.45);
}
.loupe .grip{
  position:absolute;width:14px;height:70px;background:linear-gradient(90deg,#2b231a,#534536,#2b231a);
  bottom:-64px;right:-18px;transform:rotate(-45deg);border-radius:4px;box-shadow:0 8px 16px rgba(0,0,0,.3);
}
.zoomwrap{
  position:absolute;inset:0;pointer-events:none;z-index:24;overflow:hidden;
  mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;
}
.zoominner{position:absolute;inset:0;width:100%;height:100%;transform-origin:0 0}

/* Tools bar */
.sb-captions{text-align:center;margin-top:16px;min-height:38px;position:relative}
.sb-caption{
  margin:0;font-family:var(--display);font-size:30px;letter-spacing:.01em;color:var(--ink);
  transition:opacity .2s ease;
}
.sb-caption.sub{font-size:16px;font-family:var(--font);font-style:italic;color:var(--terracotta);margin-top:4px}
.sb-caption.live{position:absolute;left:0;right:0;top:0}

.sb-tools{
  display:flex;align-items:center;justify-content:center;gap:12px;margin-top:14px;
}
.tool{
  background:rgba(236,231,220,.8);border:1px solid var(--hairline);border-radius:24px;
  padding:6px 14px;font-size:13px;display:flex;align-items:center;gap:6px;cursor:pointer;
  color:var(--ink);transition:all .18s ease;box-shadow:0 2px 6px rgba(43,39,33,.08);
}
.tool:hover{border-color:var(--ink);background:var(--paper)}
.tool:disabled{opacity:.4;cursor:default}
.zoom-read{font-size:13px;font-family:var(--display);letter-spacing:1px;min-width:44px;text-align:center}
.tool-sep{width:1px;height:18px;background:var(--hairline);margin:0 4px}
.sb-hint{text-align:center;font-size:13px;font-style:italic;color:var(--ink-soft);margin-top:10px}
.sb-hint.gone{opacity:0;pointer-events:none}

/* Section divider rule */
.rule{width:100%;max-width:1120px;height:1px;background:var(--hairline);margin:32px auto}
.rule.short{max-width:540px}

/* Editorial Plates Index */
.plates-section{max-width:1120px;margin:0 auto;padding:0 24px 64px}
.index-header{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:20px}
.index-title{font-family:var(--display);font-size:36px;font-weight:400;margin:0}
.search-box{display:flex;align-items:center;gap:8px;background:rgba(236,231,220,.8);border:1px solid var(--hairline);border-radius:20px;padding:6px 16px}
.search-box input{background:transparent;border:0;outline:none;font-family:var(--font);font-size:15px;color:var(--ink);width:220px}
.search-box input::placeholder{color:var(--ink-faint);font-style:italic}

.plate-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;list-style:none;padding:0;margin:0}
.plate-item{
  background:rgba(247,242,232,.7);border:1px solid var(--hairline);border-radius:8px;padding:12px 16px;
  cursor:pointer;transition:all .18s ease;display:flex;flex-direction:column;gap:4px;text-align:left;
}
.plate-item:hover{border-color:var(--ink);transform:translateY(-2px);box-shadow:0 6px 14px rgba(43,39,33,.08)}
.plate-item.active{border-color:var(--terracotta);background:rgba(236,231,220,.95);box-shadow:0 0 0 1.5px var(--terracotta)}
.plate-meta{display:flex;justify-content:space-between;font-size:12px;letter-spacing:1px;color:var(--terracotta)}
.plate-title{font-family:var(--display);font-size:19px;color:var(--ink);margin:0}
.plate-place{font-size:13px;font-style:italic;color:var(--ink-soft);margin:0}

/* Footer */
.foot{text-align:center;padding:48px 24px;border-top:1px solid var(--hairline);font-size:14px;color:var(--ink-soft)}
</style>
</head>
<body>
<div class="wash" aria-hidden="true"></div>
<main class="page">
  <header class="top">
    <div class="brand">
      <span class="brand-title">ATLAS OF ELSEWHERE</span>
      <span class="brand-sub">A sketchbook of places, passages, and little discoveries</span>
    </div>
    <nav>
      <a href="#sketchbook">Sketchbook</a>
      <a href="#index">Plates Index</a>
      <a href="#about">Curator’s Note</a>
    </nav>
  </header>

  <!-- Country Chapters Navigation Bar -->
  <div class="chapter-bar-wrap" role="navigation" aria-label="Country Chapters">
    <span class="chapter-bar-label">Chapters:</span>
    <button class="ch-btn active" data-ch="0">Cover</button>
    ${chapters.map(c => `<button class="ch-btn" data-ch="${c.num}" title="${c.tagline}">${c.cc} • ${c.country}</button>`).join('')}
  </div>

  <section id="sketchbook" class="hero">
    <img crossorigin="anonymous" class="botany l" src="meng-to-sketchbook/botany-left.png" alt="" aria-hidden="true" onerror="this.src='https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/339abd2c649a11f725af9114/botany-left.png'">
    <img crossorigin="anonymous" class="botany r" src="meng-to-sketchbook/botany-right.png" alt="" aria-hidden="true" onerror="this.src='https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/339abd2c649a11f725af9114/botany-right.png'">

    <!-- Dynamic Chapter Banner -->
    <div class="chapter-badge-wrap">
      <span class="ch-banner" id="chBanner">FOLIO INTRODUCTION</span>
      <div class="ch-desc-note" id="chTagline">12 Geographic Chapters · 108 Illustrated Plates Collected Worldwide</div>
    </div>

    <div class="sb-wrap" id="sbWrap">
      <div class="sb-stage" id="sbStage">
        <button class="sb-arrow left" id="sbLeft" aria-label="Previous plate">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
            <polyline points="11,3 3,22 11,41" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="sb-3d" id="sb3d">
          <div class="sb-tilt" id="sbTilt">
            <div class="sb-cast ambient" aria-hidden="true"></div>
            <div class="sb-cast contact" aria-hidden="true"></div>
            <div class="sb-cast hair" aria-hidden="true"></div>
            <div class="sb-book" id="sbBook"></div>
          </div>
          <div class="zoomwrap" id="zoomWrap" aria-hidden="true"><div class="zoominner" id="zoomInner"></div></div>
          <div class="loupe" id="loupe" aria-label="Magnifier glass" title="Drag to inspect drawings"><span class="grip"></span><span class="ring"><span class="lens" id="loupeLens"><span class="mag" id="loupeMag"></span></span></span></div>
        </div>

        <button class="sb-arrow right" id="sbRight" aria-label="Next plate">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
            <polyline points="3,3 11,22 3,41" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="sb-captions" id="sbCaptions"></div>

      <div class="sb-tools" role="group" aria-label="view controls">
        <button class="tool" id="zOut" aria-label="zoom out">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8.6" cy="8.6" r="5.6"/><path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8"/></svg>
          Zoom Out
        </button>
        <span class="zoom-read" id="zRead">100%</span>
        <button class="tool" id="zIn" aria-label="zoom in">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8.6" cy="8.6" r="5.6"/><path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8"/></svg>
          Zoom In
        </button>
        <span class="tool-sep" aria-hidden="true"></span>
        <button class="tool" id="resetZoomBtn" aria-label="reset zoom">Reset (100%)</button>
        <span class="tool-sep" aria-hidden="true"></span>
        <button class="tool" id="loupeBtn" aria-label="toggle magnifier" aria-pressed="true">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8.8" cy="8.8" r="5.8"/><path d="M13 13l4.4 4.4"/></svg>
          Magnifier Loupe
        </button>
      </div>
      <p class="sb-hint" id="sbHint">Drag paper edge to curl · Drag magnifying glass across illustrations · Double-click to reset zoom</p>
    </div>
  </section>

  <div class="rule" aria-hidden="true"></div>

  <!-- Editorial Plates Index -->
  <section id="index" class="plates-section">
    <div class="index-header">
      <div>
        <h2 class="index-title">Editorial Plates Index</h2>
        <p style="margin:4px 0 0;font-size:15px;color:var(--ink-soft);font-style:italic">108 architectural studies, landscape drawings, and field notes across 12 countries</p>
      </div>
      <div class="search-box">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8.6" cy="8.6" r="5.6"/><path d="M12.8 12.8 17.4 17.4"/></svg>
        <input type="text" id="searchInput" placeholder="Search landmark, country, plate...">
      </div>
    </div>
    <ul class="plate-grid" id="plateGrid"></ul>
  </section>

  <footer class="foot">
    <p><strong>ATLAS OF ELSEWHERE</strong> — An interactive world travel journal.<br>Rendered in ThreeUI physical paper shaders & vector plate reproductions.</p>
  </footer>
</main>

<script>
/* =====================================================================
   ATLAS OF ELSEWHERE — Full 108-Plate Global Travel Sketchbook Engine
   Preserves original 18-strip curl arc, spring physics, and loupe.
   ===================================================================== */
const Q = new URLSearchParams(location.search);
const DIR = 'meng-to-sketchbook/';

const CHAPTER_INFO = ${JSON.stringify(chapters)};

const PAGES = ${JSON.stringify(PAGES)};
PAGES.forEach(p => { p.url = DIR + p.file; });
const M = PAGES.length;

const wrap = document.getElementById('sbWrap');
const stage = document.getElementById('sbStage');
const sb3d = document.getElementById('sb3d');
const book = document.getElementById('sbBook');
const capBox = document.getElementById('sbCaptions');
const hint = document.getElementById('sbHint');
const chBanner = document.getElementById('chBanner');
const chTagline = document.getElementById('chTagline');
const plateGrid = document.getElementById('plateGrid');
const searchInput = document.getElementById('searchInput');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------ the turning leaf */
const N = 18;            /* strips — smooth curve */
const SPAN = 0.449;      /* gutter to outer page edge */
const BETA = 0.60;       /* peak curl arc */
let idx = 0, turn = null;
let strips = [];

function el(t, c) { const e = document.createElement(t); if(c) e.className = c; return e; }

function imgEl(i, side) {
  const im = new __threeuiStorageImage();
  im.className = 'sb-half-img ' + side;
  im.draggable = false;
  im.alt = PAGES[i].title;
  im.src = PAGES[i].url;
  return im;
}

function halfEl(pos, i) {
  const d = el('div', 'sb-half ' + pos);
  d.appendChild(imgEl(i, pos));
  d.appendChild(el('div', 'gutter-shade ' + pos));
  return d;
}

function buildCurl(dir, from, to) {
  strips = [];
  const c = el('div', 'curl ' + dir);
  c.style.setProperty('--n', N);
  c.style.setProperty('--span', SPAN);
  let host = c;
  for(let i=0; i<N; i++) {
    const s = el('div', 'strip');
    s.style.setProperty('--i', i);
    const gut = 'calc(var(--bw) * 0.5)';
    const sw = 'calc(var(--bw) * ' + SPAN + ' / ' + N + ')';
    const A = 'calc(-1 * (' + gut + ' + ' + i + ' * ' + sw + '))';
    const B = 'calc(' + (i + 1) + ' * ' + sw + ' - ' + gut + ')';
    const f = el('div', 'face front'), b = el('div', 'face back');
    const dress = (e, url, px) => {
      e.style.backgroundImage = 'url(' + url + ')';
      e.style.backgroundPositionX = px;
    };
    dress(f, PAGES[from].url, dir === 'next' ? A : B);
    dress(b, PAGES[to].url,   dir === 'next' ? B : A);
    f.appendChild(el('div', 'sh')); f.appendChild(el('div', 'gl'));
    b.appendChild(el('div', 'sh')); b.appendChild(el('div', 'gl'));
    s.appendChild(f); s.appendChild(b);
    if(i === N - 1) s.classList.add('edge');
    host.appendChild(s); host = s;
    strips.push(s);
  }
  return c;
}

function applyTurn(t) {
  const th = Math.PI * t;
  const beta = BETA * Math.sin(Math.PI * t);
  const D = 180 / Math.PI;
  const tt = th + beta, td = 2 * beta / N;
  sb3d.style.setProperty('--tt', (tt * D).toFixed(2) + 'deg');
  sb3d.style.setProperty('--td', (td * D).toFixed(3) + 'deg');
  sb3d.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));
  fadeCaption(t);
  for(let i=0; i<strips.length; i++) {
    const l1 = Math.abs(Math.cos(tt - i * td));
    const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
    const st = strips[i].style;
    st.setProperty('--lit', l1.toFixed(3));
    st.setProperty('--a1', ((1 - l1) * 0.62).toFixed(3));
    st.setProperty('--a2', ((1 - l2) * 0.62).toFixed(3));
  }
}

function paint() {
  book.textContent = '';
  if(!turn) {
    const f = el('div', 'sb-full');
    const im = new __threeuiStorageImage();
    im.src = PAGES[idx].url;
    im.alt = PAGES[idx].title;
    im.draggable = false;
    f.appendChild(im);
    book.appendChild(f);
    sb3d.style.setProperty('--shade', '0');
  } else {
    const next = turn.dir === 'next';
    book.appendChild(halfEl('left', next ? turn.from : turn.to));
    book.appendChild(halfEl('right', next ? turn.to : turn.from));
    book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
    applyTurn(turn.t);
  }
  const a = el('button', 'sb-zone sb-prev'), b = el('button', 'sb-zone sb-next');
  a.setAttribute('aria-label', 'previous page');
  b.setAttribute('aria-label', 'next page');
  book.appendChild(a); book.appendChild(b);
  layout();
  caption();
  updateChapterBadge();
  highlightActivePlate();
  notifyParent();
  if(typeof syncZoomLayer === 'function') syncZoomLayer();
  if(typeof placeLoupe === 'function') placeLoupe();
}

let capOut = null, capIn = null;
function caption() {
  capBox.textContent = '';
  capOut = capIn = null;
  const curr = PAGES[idx];
  if(turn) {
    capOut = el('p', 'sb-caption live'); capOut.textContent = PAGES[turn.from].title; capBox.appendChild(capOut);
    capIn = el('p', 'sb-caption live'); capIn.textContent = PAGES[turn.to].title; capBox.appendChild(capIn);
    fadeCaption(turn.t);
  } else {
    const p = el('p', 'sb-caption');
    p.textContent = curr.plateNumber === 0 ? curr.title : 'Plate ' + String(curr.plateNumber).padStart(3, '0') + ' — ' + curr.title;
    capBox.appendChild(p);
    const sub = el('p', 'sb-caption sub');
    sub.textContent = curr.plateNumber === 0 ? curr.place : curr.place + ' · ' + curr.country + (curr.coordinates ? ' (' + curr.coordinates + ')' : '');
    capBox.appendChild(sub);
  }
}

function fadeCaption(t) {
  if(!capOut || !capIn) return;
  const out = 1 - Math.max(0, Math.min(1, (t - 0.10) / 0.28));
  const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.30));
  capOut.style.opacity = out.toFixed(3);
  capIn.style.opacity = inn.toFixed(3);
}

function layout() {
  sb3d.style.setProperty('--bw', book.clientWidth + 'px');
}
addEventListener('resize', layout);

/* ------------------------------------------------------ spring loop */
let spring = null;
function animateTo(target, onDone, stiff, damp) {
  spring = { kind: 'spring', v: 0, target: target, done: onDone, k: stiff || 150, c: damp || 22 };
  kick();
}

let raf = null, last = 0;
function tick(now) {
  raf = null;
  const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
  last = now;
  if(spring && turn) {
    const s = spring;
    const x = turn.t - s.target;
    s.v += (-s.k * x - s.c * s.v) * dt;
    turn.t += s.v * dt;
    if(Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
      turn.t = s.target; spring = null;
      applyTurn(turn.t);
      const d = s.done; d && d();
    } else applyTurn(turn.t);
  }
  viewSpring();
  const lmoved = loupeEase();
  if((spring || viewActive || lmoved) && raf === null) raf = requestAnimationFrame(tick);
}

function kick() {
  if(raf === null) { last = performance.now(); raf = requestAnimationFrame(tick); }
}

/* ------------------------------------------- tilt + zoom of the book */
const TILT_X = 4.5, TILT_Y = 7;
const ZOOM_MIN = 0.85, ZOOM_MAX = 1.6;
const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
let viewActive = false;
let lastZ = 1;

function applyView() {
  sb3d.style.setProperty('--rx', view.rx.toFixed(2) + 'deg');
  sb3d.style.setProperty('--ry', view.ry.toFixed(2) + 'deg');
  sb3d.style.setProperty('--zoom', view.z.toFixed(3));
  if(view.z !== lastZ) { lastZ = view.z; if(typeof placeLoupe === 'function') placeLoupe(); }
}

function viewSpring() {
  const e = 0.14;
  let moved = false;
  for(const [k, t] of [['rx', 'trx'], ['ry', 'try_'], ['z', 'tz']]) {
    const d = view[t] - view[k];
    if(Math.abs(d) > 0.0006) { view[k] += d * e; moved = true; }
    else view[k] = view[t];
  }
  if(moved) applyView();
  viewActive = moved;
  return moved;
}

function setView(rx, ry, z) {
  view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
  view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
  view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
  viewActive = true; kick();
  if(typeof syncZoom === 'function') syncZoom();
}

function tiltTo(cx, cy) {
  if(drag) return;
  const r = book.getBoundingClientRect();
  if(!r.width) return;
  const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width/2)) / (r.width * 0.62)));
  const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height/2)) / (r.height * 0.9)));
  setView(-ny * TILT_X, nx * TILT_Y, view.tz);
}

addEventListener('pointermove', e => {
  if(e.pointerType === 'touch') return;
  tiltTo(e.clientX, e.clientY);
}, { passive: true });
addEventListener('pointerout', e => { if(!e.relatedTarget) setView(0, 0, view.tz); });
stage.addEventListener('dblclick', () => setView(0, 0, 1));

/* ------------------------------------------------------- pointer work */
let drag = null;
function bookRect() { return book.getBoundingClientRect(); }
function hideHint() { hint.classList.add('gone'); }

stage.addEventListener('pointerdown', e => {
  if(e.button !== 0) return;
  e.preventDefault();
  const onBook = e.target.closest('.sb-zone');
  stage.setPointerCapture(e.pointerId);
  hideHint();
  if(!onBook) return;
  const r = bookRect();
  const dir = (e.clientX - r.left) / r.width > 0.5 ? 'next' : 'prev';
  startTurn(dir, 0);
  drag = { dir: dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
});

stage.addEventListener('pointermove', e => {
  if(!drag) return;
  const dx = e.clientX - drag.x0;
  drag.moved = Math.max(drag.moved, Math.abs(dx));
  const raw = (drag.dir === 'next' ? -dx : dx) / (drag.w * 0.62);
  const t = Math.max(0, Math.min(1, raw));
  const now = performance.now();
  drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
  drag.tPrev = now;
  if(turn) { turn.t = t; applyTurn(t); }
});

function endDrag() {
  if(!drag) return;
  const d = drag; drag = null;
  if(!turn) return;
  if(d.moved < 6) { commit(); return; }
  const go = turn.t > 0.42 || d.vel > 1.1;
  if(go) commit(); else cancel();
}

stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);

/* ------------------------------------------------------ turn control */
function startTurn(dir, t) {
  spring = null;
  if(turn) { idx = turn.to; turn = null; }
  if(typeof shoveLoupe === 'function') shoveLoupe(dir);
  const from = idx;
  turn = { dir: dir, from: from, to: dir === 'next' ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
  paint();
}

function commit() {
  if(!turn) return;
  if(REDUCED) { idx = turn.to; turn = null; paint(); return; }
  animateTo(1, () => { idx = turn.to; turn = null; paint(); }, 170, 26);
  kick();
}

function cancel() {
  if(!turn) return;
  animateTo(0, () => { turn = null; paint(); }, 150, 24);
  kick();
}

function step(dir) {
  if(turn) { idx = turn.to; turn = null; }
  startTurn(dir, 0);
  commit();
}

function goTo(i) {
  if(i === idx) return;
  if(turn) { idx = turn.to; turn = null; }
  idx = Math.max(0, Math.min(M - 1, i));
  paint();
}

document.getElementById('sbLeft').onclick = () => step('prev');
document.getElementById('sbRight').onclick = () => step('next');

addEventListener('keydown', e => {
  if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const t = e.target;
  if(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
  e.preventDefault();
  hideHint();
  step(e.key === 'ArrowRight' ? 'next' : 'prev');
});

/* --------------------------------------------------- loupe + controls */
const loupe = document.getElementById('loupe');
const zRead = document.getElementById('zRead');
const loupeBtn = document.getElementById('loupeBtn');
const zInBtn = document.getElementById('zIn'), zOutBtn = document.getElementById('zOut');
const resetZoomBtn = document.getElementById('resetZoomBtn');
const MAG = 2.3;
let loupeOn = true, lx = null, ly = null, lgrab = null, lTarget = null;

function loupeSize() { return Math.round(Math.max(165, Math.min(262, book.clientWidth * 0.235))); }
function bookBox() { return { x: 0, y: 0, w: book.clientWidth, h: book.clientHeight }; }

function restLoupe() {
  const b = bookBox();
  lx = b.x + b.w * 0.88; ly = b.y + b.h * 0.855;
  placeLoupe();
}

const zoomWrap = document.getElementById('zoomWrap');
const zoomInner = document.getElementById('zoomInner');

function syncZoomLayer() {
  zoomInner.textContent = '';
  for(const c of book.children) {
    if(c.classList.contains('sb-zone')) continue;
    zoomInner.appendChild(c.cloneNode(true));
  }
}

function placeLoupe() {
  if(lx === null) return;
  const B = bookBox(), bw = B.w, bh = B.h;
  if(!bw) return;
  const R = loupeSize() / 2, bez = R * 2 * 0.058;
  loupe.style.setProperty('--lr', R * 2 + 'px');
  loupe.style.transform = 'translate3d(' + (lx - R).toFixed(1) + 'px,' + (ly - R).toFixed(1) + 'px,0)';
  if(loupeOn) loupe.classList.add('on');
  const z = view.z, cx = bw / 2, cy = bh / 2;
  const x0 = cx + (bw * .051 - cx) * z, x1 = cx + (bw * .949 - cx) * z;
  const y0 = cy + (bh * .218 - cy) * z, y1 = cy + (bh * .782 - cy) * z;
  const nx = Math.max(x0, Math.min(lx, x1));
  const ny = Math.max(y0, Math.min(ly, y1));
  const inside = (lx > x0 && lx < x1 && ly > y0 && ly < y1)
    ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
    : -Math.hypot(lx - nx, ly - ny);
  const k = Math.max(0, Math.min(1, (inside + R * 0.30) / (R * 0.55)));
  zoomWrap.style.opacity = (loupeOn ? k : 0).toFixed(3);
  if(k <= 0.002) return;
  const r = (R - bez).toFixed(1);
  const mask = 'radial-gradient(circle ' + r + 'px at ' + lx.toFixed(1) + 'px ' + ly.toFixed(1) + 'px,#000 calc(100% - 1px),transparent 100%)';
  zoomWrap.style.webkitMaskImage = mask;
  zoomWrap.style.maskImage = mask;
  const px = cx + (lx - cx) / z, py = cy + (ly - cy) / z, s = MAG * z;
  zoomInner.style.transform = 'translate(' + (lx - px * s).toFixed(1) + 'px,' + (ly - py * s).toFixed(1) + 'px) scale(' + s.toFixed(4) + ')';
}

function shoveLoupe(dir) {
  if(!loupeOn || lx === null || lgrab) return;
  const b = bookBox();
  lTarget = { x: b.x + b.w * (dir === 'next' ? 0.12 : 0.88), y: b.y + b.h * 0.855 };
  kick();
}

function loupeEase() {
  if(!lTarget) return false;
  if(lgrab) { lTarget = null; return false; }
  const dx = lTarget.x - lx, dy = lTarget.y - ly;
  if(Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) { lx = lTarget.x; ly = lTarget.y; lTarget = null; placeLoupe(); return false; }
  lx += dx * 0.17; ly += dy * 0.17; placeLoupe();
  return true;
}

loupe.addEventListener('pointerdown', e => {
  if(!loupeOn || e.button !== 0) return;
  e.preventDefault(); e.stopPropagation();
  lTarget = null;
  lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx, ly0: ly };
  loupe.classList.add('held');
  loupe.setPointerCapture(e.pointerId);
  hideHint();
});

loupe.addEventListener('pointermove', e => {
  if(!lgrab) return;
  const b = bookBox(), R = loupeSize() / 2;
  lx = Math.max(b.x - R * 0.7, Math.min(b.x + b.w + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx)));
  ly = Math.max(b.y - R * 0.7, Math.min(b.y + b.h + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy)));
  placeLoupe();
});

function dropLoupe() { lgrab = null; loupe.classList.remove('held'); }
loupe.addEventListener('pointerup', dropLoupe);
loupe.addEventListener('pointercancel', dropLoupe);

loupeBtn.onclick = () => {
  loupeOn = !loupeOn;
  loupeBtn.setAttribute('aria-pressed', String(loupeOn));
  loupe.classList.toggle('on', loupeOn);
  if(loupeOn && lx === null) restLoupe();
};

function syncZoom() {
  zRead.textContent = Math.round(view.tz * 100) + '%';
  zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
  zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
}

zInBtn.onclick = () => { setView(view.trx, view.try_, view.tz * 1.16); hideHint(); };
zOutBtn.onclick = () => { setView(view.trx, view.try_, view.tz / 1.16); hideHint(); };
resetZoomBtn.onclick = () => { setView(0, 0, 1); hideHint(); };

/* ------------------------------------------------ Chapter & Plates sync */
function updateChapterBadge() {
  const curr = PAGES[idx];
  const chNum = curr.chapter;
  document.querySelectorAll('.ch-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.ch, 10) === chNum);
  });
  if(chNum === 0) {
    chBanner.textContent = 'FOLIO INTRODUCTION';
    chTagline.textContent = '12 Geographic Chapters · 108 Illustrated Plates Collected Worldwide';
  } else {
    const ch = CHAPTER_INFO.find(c => c.num === chNum);
    chBanner.textContent = 'CHAPTER ' + String(chNum).padStart(2, '0') + ' — ' + (ch ? ch.country.toUpperCase() : curr.country.toUpperCase());
    chTagline.textContent = ch ? ch.tagline + ' · ' + ch.intro : curr.description;
  }
}

// Chapter Bar button events
document.querySelectorAll('.ch-btn').forEach(btn => {
  btn.onclick = () => {
    const ch = parseInt(btn.dataset.ch, 10);
    if(ch === 0) { goTo(0); }
    else {
      // Find start plate of chapter
      const targetIdx = PAGES.findIndex(p => p.chapter === ch);
      if(targetIdx !== -1) goTo(targetIdx);
    }
  };
});

/* ------------------------------------------------ Render Plate Grid Index */
function renderPlateGrid(items) {
  plateGrid.textContent = '';
  items.forEach(p => {
    const li = el('li', 'plate-item' + (PAGES.indexOf(p) === idx ? ' active' : ''));
    li.dataset.idx = PAGES.indexOf(p);
    const meta = el('div', 'plate-meta');
    meta.innerHTML = '<span>' + (p.plateNumber === 0 ? 'COVER' : 'PLATE ' + String(p.plateNumber).padStart(3, '0')) + '</span><span>' + p.countryCode + '</span>';
    const tit = el('h3', 'plate-title'); tit.textContent = p.title;
    const plc = el('p', 'plate-place'); plc.textContent = p.place;
    li.appendChild(meta); li.appendChild(tit); li.appendChild(plc);
    li.onclick = () => {
      goTo(parseInt(li.dataset.idx, 10));
      document.getElementById('sketchbook').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    plateGrid.appendChild(li);
  });
}

function highlightActivePlate() {
  plateGrid.querySelectorAll('.plate-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.idx, 10) === idx);
  });
}

renderPlateGrid(PAGES);

searchInput.oninput = (e) => {
  const q = e.target.value.trim().toLowerCase();
  if(!q) { renderPlateGrid(PAGES); return; }
  const filtered = PAGES.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.country.toLowerCase().includes(q) ||
    p.place.toLowerCase().includes(q) ||
    String(p.plateNumber) === q ||
    String(p.plateNumber).padStart(3, '0').includes(q)
  );
  renderPlateGrid(filtered);
};

/* ------------------------------------------------ Parent Message Sync */
function notifyParent() {
  try {
    const p = PAGES[idx];
    window.parent.postMessage({
      type: 'SKETCHBOOK_PAGE_CHANGED',
      pageIndex: idx,
      plateNumber: p.plateNumber,
      title: p.title,
      place: p.place,
      chapter: p.chapter,
      country: p.country,
      coordinates: p.coordinates,
      description: p.description
    }, '*');
  } catch(e){}
}

window.addEventListener('message', (e) => {
  if(!e.data || typeof e.data !== 'object') return;
  if(e.data.type === 'GO_TO_PLATE') {
    const targetIdx = PAGES.findIndex(p => p.plateNumber === e.data.plateNumber);
    if(targetIdx !== -1) goTo(targetIdx);
  } else if(e.data.type === 'SET_CHAPTER') {
    const targetIdx = PAGES.findIndex(p => p.chapter === e.data.chapterNumber);
    if(targetIdx !== -1) goTo(targetIdx);
  } else if(e.data.type === 'NEXT_PLATE') {
    step('next');
  } else if(e.data.type === 'PREV_PLATE') {
    step('prev');
  } else if(e.data.type === 'SET_ZOOM') {
    setView(view.trx, view.try_, e.data.zoom);
  } else if(e.data.type === 'TOGGLE_LOUPE') {
    loupeOn = e.data.on !== undefined ? e.data.on : !loupeOn;
    loupe.classList.toggle('on', loupeOn);
  }
});

/* ------------------------------------------------ Boot */
(async function boot() {
  idx = Q.has('shot') ? (parseInt(Q.get('shot'), 10) || 0) % M : (Q.has('plate') ? parseInt(Q.get('plate'), 10) : 0);
  paint();
  applyView();
  syncZoom();
  restLoupe();
  document.body.dataset.ready = '1';
  // Preload immediate adjacent plates
  const toPreload = [idx, (idx + 1) % M, (idx - 1 + M) % M];
  toPreload.forEach(i => {
    const im = new __threeuiStorageImage();
    im.src = PAGES[i].url;
  });
})();
</script>
</body>
</html>`;

fs.writeFileSync('public/landing-pages/meng-to-sketchbook.html', htmlContent, 'utf8');
console.log('Successfully written upgraded public/landing-pages/meng-to-sketchbook.html with', PAGES.length, 'pages.');

