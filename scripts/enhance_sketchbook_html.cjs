const fs = require('fs');

let html = fs.readFileSync('public/landing-pages/meng-to-sketchbook.html', 'utf8');

// 1. Update commit function with guaranteed finish timeout
html = html.replace(
  /function commit\(\) \{\s*if\(!turn\) return;\s*if\(REDUCED\) \{ idx = turn\.to; turn = null; paint\(\); return; \}\s*animateTo\(1, \(\) => \{ idx = turn\.to; turn = null; paint\(\); \}, 170, 26\);\s*kick\(\);\s*\}/,
  `function commit() {
  if(!turn) return;
  const targetTo = turn.to;
  if(REDUCED) { idx = targetTo; turn = null; paint(); return; }
  let finished = false;
  const finish = () => {
    if(finished) return;
    finished = true;
    idx = targetTo;
    turn = null;
    paint();
  };
  animateTo(1, finish, 180, 26);
  setTimeout(finish, 380); // Safety guarantee against dropped frames
  kick();
}`
);

// 2. Enhance message listener and expose window.sketchbook
html = html.replace(
  /window\.addEventListener\('message', \(e\) => \{[\s\S]*?\}\);/,
  `window.sketchbook = {
  goTo: function(targetIdx) {
    if(typeof targetIdx !== 'number' || targetIdx < 0 || targetIdx >= M) return;
    if(turn) { idx = turn.to; turn = null; }
    idx = targetIdx;
    paint();
  },
  step: function(dir) {
    step(dir);
  },
  getIdx: function() { return idx; },
  PAGES: PAGES
};

window.addEventListener('message', (e) => {
  if(!e.data || typeof e.data !== 'object') return;
  if(e.data.type === 'GO_TO_PLATE') {
    const targetIdx = PAGES.findIndex(p => p.plateNumber === e.data.plateNumber);
    if(targetIdx !== -1) window.sketchbook.goTo(targetIdx);
  } else if(e.data.type === 'GO_TO_PAGE_INDEX') {
    window.sketchbook.goTo(e.data.pageIndex);
  } else if(e.data.type === 'SET_CHAPTER') {
    const targetIdx = PAGES.findIndex(p => p.chapter === e.data.chapterNumber);
    if(targetIdx !== -1) window.sketchbook.goTo(targetIdx);
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
});`
);

fs.writeFileSync('public/landing-pages/meng-to-sketchbook.html', html, 'utf8');
console.log('Enhanced public/landing-pages/meng-to-sketchbook.html with reliable controls & window API.');
