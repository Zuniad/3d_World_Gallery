# PRODUCTION-GRADE IMPLEMENTATION PROMPT
## MengToSketchbookLandingPage — Global Travel Sketchbook Edition

### 1. ROLE AND OBJECTIVE

Act as a senior creative frontend engineer, Three.js/WebGL integration specialist, interaction designer, and visual storytelling developer.

You are working inside an existing application that uses ThreeUI. Your task is to extend the existing `MengToSketchbookLandingPage` component into a premium, multi-country interactive travel sketchbook showcasing the world's most iconic places through hand-drawn architectural illustrations, botanical sketches, cultural details, and editorial travel notes.

**The original ThreeUI implementation is the source of truth.** This is an extension of an existing component, not a recreation.

The final experience should feel like opening a beautifully crafted physical travel journal containing illustrated pages collected during journeys around the world.

The design must combine:

- Authentic paper textures and botanical backgrounds.
- Hand-drawn landmark illustrations and architectural studies.
- Realistic curled-page transitions and paper shadows.
- Interactive magnifying glass with drag, hover, and zoom behavior.
- Country navigation, landmark indexes, and editorial annotations.
- Responsive layouts, accessible interactions, and production-grade performance.

### 2. MANDATORY SOURCE INTEGRITY

Before editing the project, retrieve and read the complete registered source bundle.

**Canonical HTML**

https://threeui.com/landing-pages/meng-to-sketchbook.html

**Complete registered source bundle**

https://threeui.com/source-code/meng-to-sketchbook-landing-page.json

Use the exact source associated with revision SHA-256 prefix `e0330548b1ac`.

Retrieve and preserve the registered source files:

- `src/shaders/landing-pages/LandingPages.tsx`
- `src/shaders/landing-pages/pageTypography.ts`
- `src/shaders/landing-pages/pageRecipes.ts`
- `src/shaders/landing-pages/LandingPageFrame.tsx`
- `public/landing-pages/meng-to-sketchbook.html`
- `src/shaders/threeui.css`

Preserve every original binary asset byte-for-byte, including the paper background, botanical illustrations, Singapore landmark illustrations, and supplied font files.

Verify asset hashes against the provided manifest. Do not redraw, replace, regenerate, or substitute existing assets.

If the complete source bundle cannot be retrieved, stop and report the exact retrieval failure. Do not recreate the original from screenshots, documentation, or visual references.

### 3. EXISTING COMPONENT INTEGRATION

Preserve this configured usage and its properties:

```tsx
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <MengToSketchbookLandingPage
        headingFont="instrument-serif"
        bodyFont="newsreader"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#2b2721"
        headingSize={30}
        bodySize={20}
        headingLetterSpacing={0.010}
      />
    </div>
  );
}
```

Use the installed ThreeUI package and the original implementation in the destination project.

Do not embed the ThreeUI documentation page in an iframe. Do not use a screenshot as the page background. Do not replace the component with a separately fabricated HTML replica.

Preserve the original paper rendering, typography controls, page recipes, shader behavior, motion, component lifecycle, and responsive layout.

If the package component does not expose the required country or landmark data, inspect its actual implementation and extend the smallest appropriate layer using backward-compatible changes. Do not assume undocumented component props exist.

### 4. CREATIVE DIRECTION: A WORLD TRAVELER'S SKETCHBOOK

Create an editorial travel journal titled:

**ATLAS OF ELSEWHERE**

Subtitle: *A sketchbook of places, passages, and little discoveries.*

The visual identity should feel handcrafted, cultured, tactile, and quietly luxurious.

Use warm ivory paper, faded ink, graphite outlines, delicate watercolor washes, botanical decorations, pencil annotations, and subtle archival markings.

Suggested palette:

- Paper: `#F3EBDD`
- Aged parchment: `#E5D6BD`
- Ink brown: `#2B2721`
- Botanical green: `#69775A`
- Muted terracotta: `#B8755C`
- Faded ocean blue: `#7F9FA6`
- Pencil gray: `#898176`

Typography:

- Instrument Serif for editorial headlines and landmark titles.
- Newsreader for descriptive copy, travel notes, and annotations.
- Small uppercase labels for country codes, plate numbers, coordinates, and archival metadata.

Use the configured font assets wherever available. Preserve their original loading and fallback behavior.

Avoid generic dashboard styling, oversized rounded cards, excessive glassmorphism, neon colors, and conventional travel-booking website layouts.

### 5. GLOBAL COLLECTION: COUNTRIES AND LANDMARKS

Extend the original Singapore collection into a curated, data-driven international collection.

Organize the collection into geographic chapters. Each landmark must have its own individual illustration, editorial entry, and selectable index item.

#### CHAPTER 01 — SINGAPORE

<AsyncImageGroup query={["Singapore Marina Bay Sands architectural travel sketch watercolor","Singapore Merlion Park hand drawn travel journal illustration","Singapore Gardens by the Bay botanical architectural sketch"]} aspectRatio="5:4" layout="bento" size="lg"/>

1. Marina Bay Sands
2. Merlion Park
3. Gardens by the Bay
4. Singapore River
5. Buddha Tooth Relic Temple
6. Lau Pa Sat
7. Joo Chiat shophouses
8. Singapore Botanic Gardens
9. Marina Bay skyline

Retain all nine original Singapore plates and their exact supplied assets wherever they correspond to these locations.

#### CHAPTER 02 — JAPAN

<AsyncImageGroup query={["Kyoto Kiyomizu dera temple traditional ink travel sketch","Mount Fuji Japanese watercolor sketch cherry blossoms","Tokyo Tokyo Tower architectural travel journal illustration"]} aspectRatio="5:4" layout="bento" size="lg"/>

1. Mount Fuji
2. Fushimi Inari Shrine, Kyoto
3. Kiyomizu-dera, Kyoto
4. Tokyo Tower
5. Himeji Castle
6. Itsukushima Shrine
7. Arashiyama Bamboo Grove
8. Osaka Castle
9. Shibuya Crossing

Illustration style: delicate architectural ink lines, pale indigo washes, muted vermilion accents, cherry blossoms, and restrained Japanese travel-journal annotations.

#### CHAPTER 03 — ITALY

<AsyncImageGroup query={["Colosseum Rome architectural pencil watercolor travel sketch","Venice Grand Canal watercolor sketch travel journal","Florence Duomo hand drawn architectural illustration"]} aspectRatio="5:4" layout="bento" size="lg"/>

1. Colosseum, Rome
2. Grand Canal, Venice
3. Florence Cathedral
4. Leaning Tower of Pisa
5. Cinque Terre
6. Trevi Fountain
7. Pantheon, Rome
8. Amalfi Coast
9. Rialto Bridge

Illustration style: warm terracotta, sun-faded ochre, stone-gray architectural lines, olive branches, and Mediterranean watercolor washes.

#### CHAPTER 04 — FRANCE

<AsyncImageGroup query={["Eiffel Tower Paris ink watercolor travel sketch","Mont Saint Michel architectural travel journal illustration","Louvre Pyramid Paris pencil architectural sketch"]} aspectRatio="5:4" layout="bento" size="lg"/>

1. Eiffel Tower, Paris
2. Louvre Museum
3. Mont Saint-Michel
4. Notre-Dame Cathedral
5. Palace of Versailles
6. Arc de Triomphe
7. French Riviera
8. Strasbourg old town
9. Lavender fields of Provence

Illustration style: graphite architecture, faded blue-gray skies, muted lavender, fine botanical borders, and elegant French editorial annotations.

#### CHAPTER 05 — INDIA

<AsyncImageGroup query={["Taj Mahal Agra hand drawn architectural watercolor sketch","Hampi stone temple ruins travel journal illustration","Varanasi ghats Ganges river ink watercolor sketch"]} aspectRatio="5:4" layout="bento" size="lg"/>

1. Taj Mahal, Agra
2. Hawa Mahal, Jaipur
3. Gateway of India, Mumbai
4. India Gate, New Delhi
5. Hampi monuments
6. Varanasi ghats
7. Meenakshi Amman Temple, Madurai
8. Konark Sun Temple
9. Kerala backwaters

Illustration style: sandstone ochre, indigo, muted saffron, botanical greens, detailed stonework, and natural watercolor textures.

#### CHAPTER 06 — UNITED STATES

<AsyncImageGroup query={["Statue of Liberty New York vintage ink travel sketch","Golden Gate Bridge San Francisco watercolor architectural sketch","Grand Canyon geological pencil watercolor travel journal illustration"]} aspectRatio="5:4" layout="bento" size="lg"/>

1. Statue of Liberty
2. Golden Gate Bridge
3. Grand Canyon
4. Yosemite Valley
5. Central Park, New York
6. Monument Valley
7. Brooklyn Bridge
8. Antelope Canyon
9. Mount Rushmore

Illustration style: sepia field notes, geological pencil marks, faded blue skies, earthy desert washes, and vintage national-park journal details.

#### CHAPTER 07 — SWITZERLAND

1. Matterhorn
2. Chapel Bridge, Lucerne
3. Lauterbrunnen Valley
4. Lake Geneva
5. Jungfraujoch
6. Zermatt village
7. Rhine Falls
8. Château de Chillon
9. Bern Old Town

Illustration style: fine mountain contours, cold blue-gray washes, evergreen botanical details, and delicate alpine architectural studies.

#### CHAPTER 08 — EGYPT

1. Great Pyramid of Giza
2. Great Sphinx of Giza
3. Karnak Temple
4. Abu Simbel
5. Valley of the Kings
6. Luxor Temple
7. Nile River landscapes
8. Philae Temple
9. Egyptian Museum, Cairo

Illustration style: warm desert ochre, mineral blue, architectural linework, sand-textured paper, and restrained historical annotations.

#### CHAPTER 09 — UNITED KINGDOM

1. Big Ben and the Palace of Westminster
2. Tower Bridge, London
3. Edinburgh Castle
4. Stonehenge
5. Roman Baths, Bath
6. Tower of London
7. St Paul's Cathedral
8. Lake District
9. Glenfinnan Viaduct

Illustration style: muted green countryside, weathered stone, soft gray skies, graphite architecture, and botanical field notes.

#### CHAPTER 10 — NEW ZEALAND

1. Milford Sound
2. Aoraki / Mount Cook
3. Hobbiton movie set
4. Lake Tekapo
5. Auckland Sky Tower
6. Wai-O-Tapu geothermal landscape
7. Queenstown
8. Tongariro Alpine Crossing
9. Cathedral Cove

Illustration style: alpine greens, glacial blues, soft mist, topographical linework, and delicate native botanical motifs.

#### CHAPTER 11 — TURKEY

1. Hagia Sophia, Istanbul
2. Blue Mosque, Istanbul
3. Cappadocia
4. Pamukkale
5. Ephesus
6. Galata Tower
7. Topkapi Palace
8. Mount Nemrut
9. Bosphorus waterfront

Illustration style: warm limestone, faded turquoise, dusty rose, domed architectural silhouettes, and detailed historic street studies.

#### CHAPTER 12 — INDONESIA

1. Borobudur
2. Prambanan
3. Tanah Lot
4. Uluwatu Temple
5. Mount Bromo
6. Tegallalang rice terraces
7. Komodo National Park
8. Raja Ampat
9. Jakarta Old Town

Illustration style: tropical botanical studies, volcanic landscapes, muted emerald greens, volcanic gray, and ocean-blue watercolor washes.

These twelve chapters create a curated initial collection of 108 landmark entries.

Implement the collection as structured data rather than 108 separately hardcoded page components. Additional countries and landmarks must be straightforward to add.

### 6. IMPORTANT: ILLUSTRATION ASSET STRATEGY

The original Singapore assets must remain unchanged.

For every new landmark, create or source a dedicated illustration that fits the original sketchbook's artistic direction. Do not reuse one generic landmark image across different destinations.

Preferred asset order:

1. Existing verified source assets.
2. Original commissioned or generated illustrations.
3. Properly licensed image assets that can legally be redistributed.
4. A graceful, designed missing-illustration state until the correct asset is available.

Generated or newly sourced illustrations must never be presented as original historical sketches or verified archival documents.

Each landmark record should support:

- Unique landmark identifier.
- Country and region.
- Display title.
- Short editorial description.
- Illustration path.
- Optional detail image.
- Optional coordinates.
- Optional cultural or architectural notes.
- Chapter and plate number.
- Descriptive image alternative text.

Keep large image files optimized and load them only when needed. Generate responsive AVIF/WebP variants for newly created assets where appropriate, while preserving original source files.

### 7. INTERACTIVE SKETCHBOOK EXPERIENCE

#### A. Opening cover

Build upon the original cover and first-page behavior.

The opening view should display:

- ATLAS OF ELSEWHERE.
- A sketchbook subtitle.
- A small handwritten-style travel annotation.
- A delicate botanical illustration.
- A visible instruction such as “Open the sketchbook to begin.”
- A subtle indicator of the current chapter and total collection size.

Use the original interaction system and existing animations wherever possible.

#### B. Realistic page turning

Preserve the original curled-page behavior, paper deformation, shadows, shader effects, and transitions.

Extend navigation so users can turn between landmark plates and country chapters.

Requirements:

- Forward and backward page turns.
- Correct page order.
- Consistent paper alignment and shadows.
- No overlapping pages after rapid interaction.
- No blank frames during transitions.
- Correct restoration of page state after resizing.
- Reduced-motion behavior for users who request it.

Do not simulate page turns using an unrelated CSS slideshow if the original implementation already provides the intended effect.

#### C. Draggable magnifying glass

Preserve the original magnifying-glass interaction.

Users must be able to drag the magnifier over an illustration to inspect details such as:

- Architectural ornamentation.
- Window patterns.
- Temple carvings.
- Mountain contours.
- Botanical linework.
- Handwritten annotations.

The magnifier must remain aligned with the pointer, respect viewport boundaries, and behave correctly on touchscreens.

Prevent dragging the magnifier from accidentally triggering a page turn or landmark selection.

Provide accessible zoom controls for users who cannot perform precise dragging.

#### D. Zoom controls

Implement or preserve:

- Zoom in.
- Zoom out.
- Reset zoom.
- Current zoom indication.
- Keyboard-operable controls.

Keep zoom behavior consistent with the existing implementation. Avoid introducing a second competing camera or transform system.

#### E. Editorial index

Create an editorial index that fits the sketchbook rather than looking like a conventional web directory.

Include:

- Country chapter index.
- Country name and short introduction.
- Landmark plate numbers.
- Landmark titles.
- Search by country or landmark.
- Current selection indicator.
- Clear active-state styling.
- Previous and next landmark navigation.

Selecting a landmark should navigate to its corresponding plate and synchronize the page position, chapter selection, active index entry, and current landmark metadata.

The index must support all 108 initial landmark entries without displaying all illustrations simultaneously.

#### F. Chapter transitions

When a user moves between countries, retain the physical-journal metaphor.

Show a small editorial chapter divider with the country name, chapter number, and a brief introductory note.

Use the existing divider and paper assets when appropriate. Newly created chapter artwork should be separate from the canonical source assets.

Country selection must update the actual collection rather than merely changing a decorative label.

### 8. EDITORIAL LANDMARK CONTENT

Every plate should feel like a page from a thoughtful travel journal.

Example:

**PLATE 001 — SINGAPORE**

*Marina Bay Sands*

“Three sculptural towers rise above the waterfront, joined by a sky park that reshapes the city's silhouette. At dusk, glass, water, and warm light become one continuous study of reflections.”

Include subtle metadata where available:

- Country and region.
- Chapter and plate number.
- Approximate coordinates.
- Architectural or natural subject classification.
- Short travel observation.
- Illustration credit or source attribution when required.

Keep descriptions concise and visually balanced. Do not invent historical dates, cultural facts, geographic coordinates, or citations.

### 9. ARCHITECTURE AND IMPLEMENTATION

Follow the repository's existing architecture and coding conventions.

Before making changes:

1. Inspect the package manifest and lockfile.
2. Inspect the existing component and related source files.
3. Identify how page recipes, typography, shaders, asset paths, and state are managed.
4. Confirm the existing runtime and build tooling.
5. Map the new country data onto the existing page architecture.

Prefer the smallest maintainable extension.

Separate concerns where the source architecture permits:

- Landmark collection data.
- Country chapter metadata.
- Illustration asset manifests.
- Search and selection logic.
- Page navigation state.
- Editorial index presentation.
- Accessible control behavior.

Do not refactor unrelated components or replace the project's framework.

Avoid unnecessary dependencies. Reuse the installed libraries and the component's existing interaction mechanisms.

Do not add undocumented props to `MengToSketchbookLandingPage` unless they are genuinely implemented and typed in the project.

If the installed package does not expose a supported extension point, make the required backward-compatible source change in the appropriate component layer rather than silently ignoring the requested functionality.

### 10. RESPONSIVE BEHAVIOR

Desktop:

- Large, immersive open-sketchbook presentation.
- Clear paper edges and page curvature.
- Editorial index alongside or around the active spread.
- Precise pointer interactions.

Tablet:

- Maintain legible two-page or single-page layouts as appropriate.
- Keep the index accessible without crowding the illustrations.
- Support touch gestures.

Mobile:

- Prefer a single-page reading experience where necessary.
- Maintain the original paper texture and visual identity.
- Provide large touch targets.
- Support swipe navigation without accidental browser navigation.
- Keep the magnifier and zoom controls usable.
- Avoid horizontal overflow.

Recalculate page geometry after viewport changes. Clean up event listeners and observers when components unmount.

### 11. ACCESSIBILITY

Implement:

- Semantic buttons and navigation.
- Keyboard-accessible landmark selection.
- Clear focus indicators.
- Descriptive image alternative text.
- Sufficient text contrast.
- Reduced-motion support.
- Accessible names for zoom and page controls.
- Touch-friendly control sizing.
- Search input labels and empty-result messages.

Ensure the magnifying glass is an enhancement rather than the only way to inspect an illustration.

### 12. PERFORMANCE AND STABILITY

Target a production-ready experience on ordinary modern laptops and mobile devices.

Requirements:

- Lazy-load off-screen landmark illustrations.
- Avoid loading all 108 large illustrations at startup.
- Prevent unnecessary component rerenders.
- Dispose of resources that the implementation owns.
- Preserve the original shader and animation lifecycle.
- Avoid duplicate animation loops.
- Avoid unnecessary large dependencies.
- Prevent layout shifts while images load.
- Keep navigation responsive during asset loading.
- Handle missing or failed image requests gracefully.
- Use stable landmark identifiers and predictable navigation state.

Respect the destination project's existing asset pipeline, build process, and browser support requirements.

### 13. VISUAL QUALITY REQUIREMENTS

The finished experience should look like a real physical sketchbook translated into an interactive digital object.

Prioritize:

- Fine paper grain.
- Naturally aged paper tones.
- Delicate ink outlines.
- Subtle watercolor bleeding.
- Realistic paper curvature.
- Natural shadows between sheets.
- Restrained botanical decoration.
- Consistent illustration scale.
- Thoughtful editorial spacing.
- Beautiful landmark-specific artwork.

Avoid:

- Generic travel cards.
- Stock-photo grids replacing the sketchbook.
- Repeated landmark illustrations.
- Fake paper curl made from unrelated transforms.
- Excessive animation.
- Unnecessary loading screens.
- Unverified historical claims.
- Broken image placeholders.
- Replacing the supplied Singapore artwork.

### 14. REQUIRED VALIDATION

After implementation, run the existing project checks and verify the actual rendered application in a browser.

Do not claim completion merely because the code compiles.

Validate:

1. The exact ThreeUI component and configured props are used.
2. The canonical source was retrieved and preserved.
3. Original asset hashes match the supplied manifest.
4. The opening cover renders correctly.
5. Forward and backward page turns work.
6. The magnifying glass can be dragged.
7. Zoom in, zoom out, and reset work.
8. All twelve country chapters are selectable.
9. Landmark search returns the correct entries.
10. Selecting a landmark opens the correct illustration and metadata.
11. Navigation remains synchronized with the editorial index.
12. Rapid page navigation does not corrupt page state.
13. Mobile and tablet layouts remain usable.
14. Reduced-motion preferences are respected.
15. No console errors or failed critical asset requests occur.

Use the browser tooling available in the existing development environment. If automated browser testing is unavailable, perform the closest available visual and interaction checks and clearly report the limitation.

Do not fabricate screenshots, test results, asset hashes, or successful browser verification.

### 15. FINAL DELIVERABLES

Deliver the implementation directly in the existing destination project.

Provide:

- The list of modified and added files.
- Confirmation of whether the original source and assets were verified.
- The final country and landmark data structure.
- A summary of completed interactions.
- Build and test results.
- Browser verification results.
- Any remaining missing illustrations or unsupported interactions.
- Exact commands to run the project locally.

**Final acceptance criterion:** The application must preserve the authentic ThreeUI sketchbook implementation while transforming its Singapore-only editorial collection into a polished, navigable, multi-country illustrated travel atlas. Source integrity, functioning interactions, and verified implementation take precedence over visual imitation.
