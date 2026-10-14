const fs = require('fs');

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1240" width="1760" height="1240">
  <defs>
    <linearGradient id="coverPaper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F7F2E8"/>
      <stop offset="50%" stop-color="#EEE5D5"/>
      <stop offset="100%" stop-color="#E2D6C0"/>
    </linearGradient>
    <linearGradient id="crease" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.0"/>
      <stop offset="48%" stop-color="#2b2721" stop-opacity="0.16"/>
      <stop offset="50%" stop-color="#1a1714" stop-opacity="0.26"/>
      <stop offset="52%" stop-color="#2b2721" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#2b2721" stop-opacity="0.12"/>
    </radialGradient>
  </defs>

  <!-- Background Paper -->
  <rect x="0" y="0" width="1760" height="1240" fill="url(#coverPaper)"/>
  <rect x="0" y="0" width="1760" height="1240" fill="url(#vignette)"/>

  <!-- Ornate Archival Borders -->
  <rect x="36" y="36" width="1688" height="1168" fill="none" stroke="#2B2721" stroke-opacity="0.2" stroke-width="1.8"/>
  <rect x="48" y="48" width="1664" height="1144" fill="none" stroke="#B8755C" stroke-opacity="0.35" stroke-width="0.9" stroke-dasharray="8 4"/>

  <!-- Corner Florentine Accents -->
  <g fill="none" stroke="#B8755C" stroke-width="1.2" opacity="0.65">
    <path d="M 60,60 L 110,60 M 60,60 L 60,110 M 70,70 L 100,70 M 70,70 L 70,100"/>
    <path d="M 1700,60 L 1650,60 M 1700,60 L 1700,110 M 1690,70 L 1660,70 M 1690,70 L 1690,100"/>
    <path d="M 60,1180 L 110,1180 M 60,1180 L 60,1130 M 70,1170 L 100,1170 M 70,1170 L 70,1140"/>
    <path d="M 1700,1180 L 1650,1180 M 1700,1180 L 1700,1130 M 1690,1170 L 1660,1170 M 1690,1170 L 1690,1140"/>
  </g>

  <!-- Center Crease -->
  <rect x="850" y="0" width="60" height="1240" fill="url(#crease)"/>

  <!-- LEFT SPREAD: Frontispiece & Archival Inscription -->
  <g transform="translate(140, 160)">
    <text x="0" y="40" font-family="'Instrument Serif', Georgia, serif" font-size="16" letter-spacing="5" fill="#2B2721" opacity="0.6">ARCHIVAL REPERTORY • VOL. I</text>
    
    <text x="0" y="110" font-family="'Instrument Serif', Georgia, serif" font-size="42" fill="#2B2721" letter-spacing="-0.5">Field Inscription</text>
    <line x1="0" y1="140" x2="580" y2="140" stroke="#2B2721" stroke-opacity="0.18" stroke-width="1"/>

    <foreignObject x="0" y="180" width="580" height="360">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Newsreader', Georgia, serif; font-size: 24px; font-style: italic; line-height: 1.7; color: #2B2721; opacity: 0.88; text-align: justify;">
        “We sketch not to capture the monument, but the hour it gave us — the angle of morning light on stone, the sound of water below the bridge, the quiet between arrival and departure. Across twelve countries, these pages gather what remains when the journey ends.”
      </div>
    </foreignObject>

    <!-- Botanical Wreath illustration on left -->
    <g transform="translate(290, 640)" fill="none" stroke="#69775A" stroke-linecap="round" stroke-linejoin="round" opacity="0.75">
      <circle cx="0" cy="0" r="80" stroke-width="1.2" stroke-dasharray="6 4"/>
      <path d="M 0,-80 Q 20,-100 40,-80 Q 20,-60 0,-80" fill="#69775A" fill-opacity="0.25" stroke-width="1"/>
      <path d="M 80,0 Q 100,20 80,40 Q 60,20 80,0" fill="#69775A" fill-opacity="0.25" stroke-width="1"/>
      <path d="M 0,80 Q -20,100 -40,80 Q -20,60 0,80" fill="#69775A" fill-opacity="0.25" stroke-width="1"/>
      <path d="M -80,0 Q -100,-20 -80,-40 Q -60,-20 -80,0" fill="#69775A" fill-opacity="0.25" stroke-width="1"/>
      <text x="0" y="6" text-anchor="middle" font-family="'Instrument Serif', serif" font-size="14" letter-spacing="3" fill="#B8755C">FOLIO</text>
    </g>

    <text x="290" y="800" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="15" letter-spacing="3" fill="#2B2721" opacity="0.6">SINGAPORE • JAPAN • ITALY • FRANCE • INDIA • USA</text>
    <text x="290" y="825" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="15" letter-spacing="3" fill="#2B2721" opacity="0.6">SWITZERLAND • EGYPT • UK • NEW ZEALAND • TURKEY • INDONESIA</text>
  </g>

  <!-- RIGHT SPREAD: Title Page -->
  <g transform="translate(1000, 160)">
    <text x="280" y="80" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="18" letter-spacing="6" fill="#B8755C">AN ILLUSTRATED COMPENDIUM</text>
    
    <!-- Grand Title -->
    <text x="280" y="190" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="68" font-weight="400" fill="#2B2721" letter-spacing="-1">ATLAS OF</text>
    <text x="280" y="265" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="68" font-weight="400" fill="#2B2721" letter-spacing="-1">ELSEWHERE</text>

    <!-- Subtitle -->
    <text x="280" y="330" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-style="italic" font-size="26" fill="#B8755C">A sketchbook of places, passages, and little discoveries.</text>

    <!-- Decorative Central Rosette -->
    <g transform="translate(280, 470)" fill="none" stroke="#2B2721" opacity="0.6">
      <line x1="-180" y1="0" x2="180" y2="0" stroke-width="1.2"/>
      <circle cx="0" cy="0" r="28" stroke-width="1.5" fill="#EEE5D5"/>
      <circle cx="0" cy="0" r="20" stroke-width="0.8" stroke-dasharray="3 2"/>
      <polygon points="0,-16 4,0 0,16 -4,0" fill="#B8755C" stroke="none"/>
      <polygon points="-16,0 0,4 16,0 0,-4" fill="#2B2721" stroke="none"/>
    </g>

    <!-- Edition Metadata -->
    <text x="280" y="580" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="18" letter-spacing="4" fill="#2B2721" opacity="0.75">FIRST COMPLETE EDITION</text>
    <text x="280" y="615" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-size="20" fill="#2B2721" opacity="0.85">12 Geographic Chapters · 108 Hand-Drawn Plates</text>

    <!-- Call to action button motif -->
    <g transform="translate(280, 740)">
      <rect x="-190" y="-32" width="380" height="64" rx="32" fill="#2B2721" fill-opacity="0.06" stroke="#2B2721" stroke-opacity="0.3" stroke-width="1.5"/>
      <text x="0" y="9" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="22" letter-spacing="3" fill="#2B2721">OPEN THE SKETCHBOOK</text>
    </g>

    <text x="280" y="840" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-style="italic" font-size="16" fill="#2B2721" opacity="0.6">Turn the page rightward or drag the paper curl to explore</text>
  </g>
</svg>`;

fs.writeFileSync("public/landing-pages/meng-to-sketchbook/plates/cover.svg", coverSvg, "utf8");
console.log("Generated cover.svg successfully.");
