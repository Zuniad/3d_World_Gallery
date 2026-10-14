const fs = require('fs');
const path = require('path');

// Raw data for all 108 landmarks
const RAW_LANDMARKS = [
  // CHAPTER 1: SINGAPORE (1-9) - using verified original binary PNG assets
  {
    plate: 1, ch: 1, c: 'Singapore', cc: 'SG', r: 'Bayfront',
    t: 'Marina Bay Sands', p: 'Bayfront',
    coords: '1.2838° N, 103.8591° E', class: 'Modern Waterfront',
    desc: 'Three sculptural towers rise above the waterfront, joined by a sky park that reshapes the city’s silhouette. At dusk, glass, water, and warm light become one continuous study of reflections.',
    notes: 'Engineered by Moshe Safdie; cantilevered SkyPark spans 340 meters across the triad.',
    file: 'marina-bay-sands.png',
    alt: 'Watercolor and ink architectural sketch of Marina Bay Sands towers over Singapore bay.'
  },
  {
    plate: 2, ch: 1, c: 'Singapore', cc: 'SG', r: 'Merlion Park',
    t: 'The Merlion', p: 'Merlion Park',
    coords: '1.2868° N, 103.8545° E', class: 'Civic Monument',
    desc: 'The mythical guardian of the Lion City spouts cool water towards the open harbour. Salt breeze and morning spray mist the stone promenade.',
    notes: 'Designed by Kwan Sai Kheong and sculpted by Lim Nang Seng in 1972; height 8.6 meters.',
    file: 'merlion.png',
    alt: 'Pen and watercolor travel sketch of the Singapore Merlion statue overlooking the harbour.'
  },
  {
    plate: 3, ch: 1, c: 'Singapore', cc: 'SG', r: 'Marina South',
    t: 'Gardens by the Bay', p: 'Supertree Grove',
    coords: '1.2816° N, 103.8636° E', class: 'Botanical Architecture',
    desc: 'Enormous vertical gardens clad in bromeliads, ferns, and orchids reach toward the tropical canopy, laced by aerial skyways.',
    notes: 'Eighteen Supertrees ranging from 25 to 50 meters, harvesting rainwater and venting conservatory air.',
    file: 'gardens-by-the-bay.png',
    alt: 'Botanical and architectural study of Supertree Grove at Gardens by the Bay.'
  },
  {
    plate: 4, ch: 1, c: 'Singapore', cc: 'SG', r: 'Central Business District',
    t: 'Singapore River', p: 'Boat Quay',
    coords: '1.2882° N, 103.8493° E', class: 'Historic Maritime',
    desc: 'Old bumboats glide through the historic belly of the city, flanked by preserved red-tile godowns that now hum with riverside chatter.',
    notes: 'The lifeline of early Singapore trade; restored godowns stand before modern glass high-rises.',
    file: 'singapore-river.png',
    alt: 'Ink and wash field drawing of wooden bumboats moored along the Singapore River quay.'
  },
  {
    plate: 5, ch: 1, c: 'Singapore', cc: 'SG', r: 'Chinatown',
    t: 'Buddha Tooth Relic Temple', p: 'Chinatown',
    coords: '1.2814° N, 103.8443° E', class: 'Sacred Architecture',
    desc: 'Richly lacquered Tang-style timber bracket sets and crimson balconies rise majestically above South Bridge Road, scenting the air with sandalwood incense.',
    notes: 'Completed in 2007; designed after Tang dynasty architectural treatises and mandala geometry.',
    file: 'buddha-tooth.png',
    alt: 'Detailed architectural drawing of the Buddha Tooth Relic Temple in Chinatown.'
  },
  {
    plate: 6, ch: 1, c: 'Singapore', cc: 'SG', r: 'Downtown Core',
    t: 'Lau Pa Sat', p: 'Raffles Quay',
    coords: '1.2807° N, 103.8504° E', class: 'Victorian Cast-Iron',
    desc: 'Filigreed Victorian cast-iron arches and clock tower stand resolute amidst banking skyscrapers, filling the evening air with charcoal smoke and satay spices.',
    notes: 'Pre-fabricated Scottish cast iron designed by James MacRitchie in 1894; octagonal plan.',
    file: 'lau-pa-sat.png',
    alt: 'Architectural sketch of the octagonal cast-iron market pavilion of Lau Pa Sat.'
  },
  {
    plate: 7, ch: 1, c: 'Singapore', cc: 'SG', r: 'Katong',
    t: 'Joo Chiat Shophouses', p: 'Katong',
    coords: '1.3106° N, 103.9015° E', class: 'Peranakan Vernacular',
    desc: 'A joyful parade of pastel stucco, ceramic tile friezes, and timber louvered shutters celebrating the intricate craft of Straits Chinese craftsmen.',
    notes: 'Built in the late 1920s; characteristic eclectic blend of Chinese, Malay, and European motifs.',
    file: 'joo-chiat.png',
    alt: 'Delicate watercolor of ornamental Peranakan shophouse facades along Koon Seng Road.'
  },
  {
    plate: 8, ch: 1, c: 'Singapore', cc: 'SG', r: 'Tanglin',
    t: 'Botanic Gardens', p: 'Tanglin',
    coords: '1.3138° N, 103.8159° E', class: 'UNESCO Botanical Heritage',
    desc: 'Verdant colonial bandstands, giant fan palms, and heritage rain-trees whose winding boughs support curtains of epiphytic moss and orchids.',
    notes: 'Founded in 1859 by an agri-horticultural society; UNESCO World Heritage Site.',
    file: 'botanic-gardens.png',
    alt: 'Botanical field illustration of the Victorian Bandstand nestled in lush tropical trees.'
  },
  {
    plate: 9, ch: 1, c: 'Singapore', cc: 'SG', r: 'The Bay',
    t: 'Marina Bay Skyline', p: 'The Bay',
    coords: '1.2850° N, 103.8560° E', class: 'Urban Panorama',
    desc: 'A panoramic ink sweep encompassing the old colonial customs house, financial spires, the lotus-inspired ArtScience Museum, and the shimmering bay.',
    notes: 'A fifty-year transformation from shallow mudflat to world-famous architectural lagoon.',
    file: 'marina-bay-skyline.png',
    alt: 'Panoramic ink and wash sketch of the full Marina Bay architectural skyline.'
  },

  // CHAPTER 2: JAPAN (10-18)
  {
    plate: 10, ch: 2, c: 'Japan', cc: 'JP', r: 'Honshu',
    t: 'Mount Fuji', p: 'Lake Kawaguchi',
    coords: '35.3606° N, 138.7274° E', class: 'Stratovolcano & Sacred Peak',
    desc: 'A symmetrical volcanic cone capped with perennial white snow, mirrored in still lake waters through early morning cedar mist.',
    notes: 'Revered as a sacred kami since the Jomon period; rising 3,776 meters above the Suruga Bay.',
    file: 'plates/jp-mount-fuji.svg',
    alt: 'Delicate ink and pale indigo wash sketch of Mount Fuji behind cherry blossom branches.'
  },
  {
    plate: 11, ch: 2, c: 'Japan', cc: 'JP', r: 'Kyoto',
    t: 'Fushimi Inari Shrine', p: 'Inari Mountain',
    coords: '34.9671° N, 135.7727° E', class: 'Shinto Shrine Complex',
    desc: 'Thousands of vermilion torii gates snake up the forested slopes of Mount Inari, casting deep red shadows across stone fox statues.',
    notes: 'Founded in 711 AD; dedicated to the Shinto deity of rice, agriculture, and prosperity.',
    file: 'plates/jp-fushimi-inari.svg',
    alt: 'Restrained ink drawing of the winding vermilion torii tunnel in Kyoto.'
  },
  {
    plate: 12, ch: 2, c: 'Japan', cc: 'JP', r: 'Kyoto',
    t: 'Kiyomizu-dera', p: 'Higashiyama',
    coords: '34.9949° N, 135.7850° E', class: 'Historic Timber Temple',
    desc: 'A massive timber veranda jutting out over the forested gorge without a single nail, floating atop hundreds of keyaki wood pillars.',
    notes: 'Originally founded in 778 AD; present main hall reconstructed in 1633 under Tokugawa Iemitsu.',
    file: 'plates/jp-kiyomizu-dera.svg',
    alt: 'Traditional Japanese ink and wash architectural study of the wooden Kiyomizu-dera veranda.'
  },
  {
    plate: 13, ch: 2, c: 'Japan', cc: 'JP', r: 'Tokyo',
    t: 'Tokyo Tower', p: 'Minato',
    coords: '35.6586° N, 139.7454° E', class: 'Communications Spire',
    desc: 'Lattice-work steel finished in international orange and white, glowing against the twilight Tokyo haze as neon avenues ignite below.',
    notes: 'Completed in 1958; inspired by the Eiffel Tower, standing 332.9 meters tall.',
    file: 'plates/jp-tokyo-tower.svg',
    alt: 'Architectural line sketch of Tokyo Tower in orange and white ink over city rooftops.'
  },
  {
    plate: 14, ch: 2, c: 'Japan', cc: 'JP', r: 'Hyogo',
    t: 'Himeji Castle', p: 'Himeji',
    coords: '34.8394° N, 134.6939° E', class: 'Feudal Castle Keep',
    desc: 'Known as the White Heron for its brilliant plaster walls and curving gables, crowned by curved eaves that resemble wings taking flight.',
    notes: 'Extensive surviving 17th-century castle complex of 83 buildings; UNESCO World Heritage Site.',
    file: 'plates/jp-himeji-castle.svg',
    alt: 'Fine line study of the multi-tiered white gables of Himeji Castle.'
  },
  {
    plate: 15, ch: 2, c: 'Japan', cc: 'JP', r: 'Hiroshima',
    t: 'Itsukushima Shrine', p: 'Miyajima Island',
    coords: '34.2958° N, 132.3196° E', class: 'Floating Shinto Shrine',
    desc: 'At high tide, the vermilion grand torii seems to float directly on the Seto Inland Sea, framed by sacred camphor trees and granite peaks.',
    notes: 'Current 16-meter-tall gate built in 1875 from rot-resistant camphor wood; founded in 593 AD.',
    file: 'plates/jp-itsukushima-shrine.svg',
    alt: 'Watercolor sketch of the floating torii gate at Miyajima reflecting in calm tidewater.'
  },
  {
    plate: 16, ch: 2, c: 'Japan', cc: 'JP', r: 'Kyoto',
    t: 'Arashiyama Bamboo Grove', p: 'Sagano',
    coords: '35.0167° N, 135.6713° E', class: 'Botanical Forest Path',
    desc: 'Towering green bamboo stalks filtering celestial daylight into emerald shafts, rustling with every breath of mountain wind.',
    notes: 'Designated one of the "100 Soundscapes of Japan" by the Ministry of the Environment.',
    file: 'plates/jp-arashiyama-bamboo.svg',
    alt: 'Delicate bamboo forest ink sketch with vertical brush strokes and dappled light.'
  },
  {
    plate: 17, ch: 2, c: 'Japan', cc: 'JP', r: 'Osaka',
    t: 'Osaka Castle', p: 'Chuo-ku',
    coords: '34.6873° N, 135.5262° E', class: 'Fortified Main Keep',
    desc: 'Gold-leaf shachihoko sea dragons gleam atop turquoise eaves, perched over massive dry-stone moat ramparts constructed of giant granite blocks.',
    notes: 'Originally constructed by Toyotomi Hideyoshi in 1583; fortress ramparts survive intact.',
    file: 'plates/jp-osaka-castle.svg',
    alt: 'Pencil and watercolor architectural plate of Osaka Castle and stone moat.'
  },
  {
    plate: 18, ch: 2, c: 'Japan', cc: 'JP', r: 'Tokyo',
    t: 'Shibuya Crossing', p: 'Shibuya',
    coords: '35.6595° N, 139.7004° E', class: 'Urban Intersection',
    desc: 'A synchronized human tide flowing simultaneously across diagonal zebra stripes, surrounded by towering digital screens and railway viaducts.',
    notes: 'The busiest pedestrian intersection in the world, with up to 3,000 pedestrians per green light.',
    file: 'plates/jp-shibuya-crossing.svg',
    alt: 'Rapid graphite and wash study of pedestrian crosscurrents at Shibuya Crossing.'
  },

  // CHAPTER 3: ITALY (19-27)
  {
    plate: 19, ch: 3, c: 'Italy', cc: 'IT', r: 'Lazio',
    t: 'Colosseum', p: 'Rome',
    coords: '41.8902° N, 12.4922° E', class: 'Roman Amphitheatre',
    desc: 'Weathered travertine arches stack four storeys high, scarred by centuries of sun, earthquakes, and lime gatherers under a warm Roman sky.',
    notes: 'Inaugurated in 80 AD under Emperor Titus; constructed of travertine stone, tuff, and brick-faced concrete.',
    file: 'plates/it-colosseum.svg',
    alt: 'Graphite and warm ochre watercolor sketch of the Colosseum amphitheatre.'
  },
  {
    plate: 20, ch: 3, c: 'Italy', cc: 'IT', r: 'Veneto',
    t: 'Grand Canal', p: 'Venice',
    coords: '45.4371° N, 12.3326° E', class: 'Lagoon Waterway',
    desc: 'Gothic palace facades with pointed arches and marble balconies line the shimmering green waterway, punctuated by striped mooring poles.',
    notes: 'Ancient river branch winding 3.8 kilometers through Venice in a graceful reverse-S curve.',
    file: 'plates/it-grand-canal.svg',
    alt: 'Warm terracotta and teal wash travel sketch of Venetian palazzi along the Grand Canal.'
  },
  {
    plate: 21, ch: 3, c: 'Italy', cc: 'IT', r: 'Tuscany',
    t: 'Florence Cathedral', p: 'Piazza del Duomo',
    coords: '43.7731° N, 11.2560° E', class: 'Renaissance Dome & Basilica',
    desc: 'Brunelleschi’s revolutionary terracotta herringbone dome crowns a polychrome marble facade of white Carrara, green Prato, and pink Maremma.',
    notes: 'Engineered by Filippo Brunelleschi without centering timber; consecrated in 1436.',
    file: 'plates/it-florence-cathedral.svg',
    alt: 'Architectural pencil drawing of Santa Maria del Fiore dome and Giotto campanile.'
  },
  {
    plate: 22, ch: 3, c: 'Italy', cc: 'IT', r: 'Tuscany',
    t: 'Leaning Tower of Pisa', p: 'Piazza dei Miracoli',
    coords: '43.7230° N, 10.3966° E', class: 'Romanesque Campanile',
    desc: 'Eight tiers of open blind arcades crafted in pristine white marble, defying gravity across the lush green Campo dei Miracoli.',
    notes: 'Began tilting during construction in 1178 due to soft alluvial subsoil; stabilized at 3.97 degrees.',
    file: 'plates/it-pisa-tower.svg',
    alt: 'Delicate marble study of the leaning bell tower of Pisa against Tuscan blue sky.'
  },
  {
    plate: 23, ch: 3, c: 'Italy', cc: 'IT', r: 'Liguria',
    t: 'Cinque Terre', p: 'Manarola',
    coords: '44.1068° N, 9.7288° E', class: 'Coastal Cliff Village',
    desc: 'Pastel-washed houses cling precipitously to black jagged cliffs above turquoise Mediterranean surf, terraced with dry-stone vineyard walls.',
    notes: 'Five medieval villages founded on the steep Ligurian coastline; UNESCO World Heritage Site.',
    file: 'plates/it-cinque-terre.svg',
    alt: 'Sun-faded pastel watercolor sketch of colorful cliffside houses over Manarola harbour.'
  },
  {
    plate: 24, ch: 3, c: 'Italy', cc: 'IT', r: 'Lazio',
    t: 'Trevi Fountain', p: 'Rome',
    coords: '41.9009° N, 12.4833° E', class: 'Baroque Fountain Monument',
    desc: 'Oceanus surges forward on a shell chariot guided by sea horses, water cascading over carved travertine boulders into a sapphire pool.',
    notes: 'Designed by Nicola Salvi; terminus of the ancient Acqua Vergine aqueduct built in 19 BC.',
    file: 'plates/it-trevi-fountain.svg',
    alt: 'Baroque architectural sketch of the Trevi Fountain showing Oceanus and rock cascades.'
  },
  {
    plate: 25, ch: 3, c: 'Italy', cc: 'IT', r: 'Lazio',
    t: 'Pantheon', p: 'Rome',
    coords: '41.8986° N, 12.4769° E', class: 'Ancient Roman Rotunda',
    desc: 'An immense unreinforced concrete dome pierced by a 9-meter open oculus, through which a single shaft of celestial light sweeps across marble pavements.',
    notes: 'Commissioned by Marcus Agrippa and rebuilt by Hadrian c. 126 AD; still the world’s largest unreinforced concrete dome.',
    file: 'plates/it-pantheon.svg',
    alt: 'Pencil and wash architectural study of the Pantheon portico columns and pediment.'
  },
  {
    plate: 26, ch: 3, c: 'Italy', cc: 'IT', r: 'Campania',
    t: 'Amalfi Coast', p: 'Positano',
    coords: '40.6281° N, 14.4850° E', class: 'Vertical Coastal Landscape',
    desc: 'Lemon groves and whitewashed villas cascade down limestone ravines toward pebble beaches, scented with sea salt and blossoming jasmine.',
    notes: 'A dramatic coastal stretch known since Roman times for maritime power and cliff terracing.',
    file: 'plates/it-amalfi-coast.svg',
    alt: 'Coastal watercolor wash of Positano cliff villas and terracotta rooflines.'
  },
  {
    plate: 27, ch: 3, c: 'Italy', cc: 'IT', r: 'Veneto',
    t: 'Rialto Bridge', p: 'Venice',
    coords: '45.4380° N, 12.3358° E', class: 'Istrian Stone Arch Bridge',
    desc: 'A bold single stone arch spanning the Grand Canal, lined with twin rows of shops under a sheltering gabled arcade of gleaming Istrian stone.',
    notes: 'Designed by Antonio da Ponte; completed in 1591, resting on 12,000 submerged wooden pilings.',
    file: 'plates/it-rialto-bridge.svg',
    alt: 'Graphite and watercolor plate of the Rialto Bridge spanning Venetian gondolas.'
  },

  // CHAPTER 4: FRANCE (28-36)
  {
    plate: 28, ch: 4, c: 'France', cc: 'FR', r: 'Île-de-France',
    t: 'Eiffel Tower', p: 'Paris',
    coords: '48.8584° N, 2.2945° E', class: 'Puddle-Iron Lattice Monument',
    desc: 'Four parabolic wrought-iron arches taper gracefully toward the Parisian sky, capturing the changing silver light of the Seine basin.',
    notes: 'Engineered by Gustave Eiffel for the 1889 Exposition Universelle; height 330 meters.',
    file: 'plates/fr-eiffel-tower.svg',
    alt: 'Fine graphite architectural sketch of the Eiffel Tower lattice arches.'
  },
  {
    plate: 29, ch: 4, c: 'France', cc: 'FR', r: 'Île-de-France',
    t: 'Louvre Museum', p: 'Cour Napoléon',
    coords: '48.8606° N, 2.3376° E', class: 'Palatial Glass & Stone Complex',
    desc: 'I.M. Pei’s geometric glass pyramid reflects classical Renaissance mansards and stone pilasters in still fountain basins.',
    notes: 'Former medieval fortress and royal palace transformed into the world’s most visited museum.',
    file: 'plates/fr-louvre-pyramid.svg',
    alt: 'Ink and wash drawing of the glass Louvre Pyramid framed by classical palace wings.'
  },
  {
    plate: 30, ch: 4, c: 'France', cc: 'FR', r: 'Normandy',
    t: 'Mont Saint-Michel', p: 'Gulf of Saint-Malo',
    coords: '48.6360° N, 1.5115° E', class: 'Tidal Benedictine Abbey',
    desc: 'A granite abbey spire crowns an island rock encircled by legendary fast-flowing Atlantic tides and vast sandy mudflats.',
    notes: 'First sanctuary consecrated in 708 AD; celebrated for dramatic tides rising up to 14 meters.',
    file: 'plates/fr-mont-saint-michel.svg',
    alt: 'Atmospheric pencil and gray-wash illustration of Mont Saint-Michel at low tide.'
  },
  {
    plate: 31, ch: 4, c: 'France', cc: 'FR', r: 'Île-de-France',
    t: 'Notre-Dame Cathedral', p: 'Île de la Cité',
    coords: '48.8530° N, 2.3499° E', class: 'High Gothic Cathedral',
    desc: 'Soaring flying buttresses and stone chimeras watch over the river island, illuminated through magnificent stained-glass rose windows.',
    notes: 'Begun in 1163 under Bishop Maurice de Sully; exemplar of French Gothic rib vaulting.',
    file: 'plates/fr-notre-dame.svg',
    alt: 'High Gothic architectural study of Notre-Dame Cathedral west facade and rose window.'
  },
  {
    plate: 32, ch: 4, c: 'France', cc: 'FR', r: 'Yvelines',
    t: 'Palace of Versailles', p: 'Versailles',
    coords: '48.8049° N, 2.1204° E', class: 'Baroque Royal Estate',
    desc: 'Gilded gates and classical ashlar facades open toward the Grand Canal through formal parterres designed with geometric precision.',
    notes: 'Expanded under Louis XIV from 1661 by Louis Le Vau, Jules Hardouin-Mansart, and André Le Nôtre.',
    file: 'plates/fr-versailles.svg',
    alt: 'Regal ink sketch of the gilded Versailles gates and classical facade.'
  },
  {
    plate: 33, ch: 4, c: 'France', cc: 'FR', r: 'Île-de-France',
    t: 'Arc de Triomphe', p: 'Place Charles de Gaulle',
    coords: '48.8738° N, 2.2950° E', class: 'Neoclassical Triumphal Arch',
    desc: 'Colossal heroic reliefs carved by François Rude flank the monumental vault anchoring twelve radiating tree-lined avenues.',
    notes: 'Commissioned by Napoleon in 1806 after victory at Austerlitz; height 50 meters.',
    file: 'plates/fr-arc-de-triomphe.svg',
    alt: 'Architectural study of the neoclassical relief carvings on the Arc de Triomphe.'
  },
  {
    plate: 34, ch: 4, c: 'France', cc: 'FR', r: 'Provence-Alpes-Côte d’Azur',
    t: 'French Riviera', p: 'Nice & Promenade des Anglais',
    coords: '43.6960° N, 7.2656° E', class: 'Mediterranean Coastline',
    desc: 'Curve of the Baie des Anges lined with Belle Époque hotels, azure waters, and palm trees stirring under warm maritime breezes.',
    notes: 'A celebrated winter refuge for European aristocracy since the late 18th century.',
    file: 'plates/fr-french-riviera.svg',
    alt: 'Soft watercolor wash of the curved Promenade des Anglais and turquoise sea.'
  },
  {
    plate: 35, ch: 4, c: 'France', cc: 'FR', r: 'Grand Est',
    t: 'Strasbourg Old Town', p: 'La Petite France',
    coords: '48.5800° N, 7.7420° E', class: 'Alsatian Half-Timbering',
    desc: 'Steep timbered gables and flower-filled wooden balconies overlook the locks of the River Ill under the shadow of pink sandstone spires.',
    notes: 'Historic tanners’ district featuring 16th and 17th-century half-timbered architecture.',
    file: 'plates/fr-strasbourg-old-town.svg',
    alt: 'Pencil and warm wash study of half-timbered tanners’ houses along the canals of Strasbourg.'
  },
  {
    plate: 36, ch: 4, c: 'France', cc: 'FR', r: 'Provence',
    t: 'Lavender Fields of Provence', p: 'Plateau de Valensole',
    coords: '43.8375° N, 5.9840° E', class: 'Agricultural Cultural Landscape',
    desc: 'Endless rolling waves of fragrant violet blossom stretch toward distant limestone foothills beneath the clear singing light of the south.',
    notes: 'Cultivated for centuries for fine essential oils; blooming throughout June and July.',
    file: 'plates/fr-provence-lavender.svg',
    alt: 'Field watercolor of purple lavender rows converging toward a dry-stone borie hut.'
  },

  // CHAPTER 5: INDIA (37-45)
  {
    plate: 37, ch: 5, c: 'India', cc: 'IN', r: 'Uttar Pradesh',
    t: 'Taj Mahal', p: 'Agra',
    coords: '27.1751° N, 78.0421° E', class: 'Mughal Marble Mausoleum',
    desc: 'Pure translucent Makrana marble reflects the blush of sunrise over the Yamuna River, framed by four slender minarets and floral pietra dura inlay.',
    notes: 'Commissioned by Mughal Emperor Shah Jahan in 1632 for his beloved wife Mumtaz Mahal.',
    file: 'plates/in-taj-mahal.svg',
    alt: 'Delicate pencil and white-wash architectural drawing of the Taj Mahal and reflection pool.'
  },
  {
    plate: 38, ch: 5, c: 'India', cc: 'IN', r: 'Rajasthan',
    t: 'Hawa Mahal', p: 'Jaipur',
    coords: '26.9239° N, 75.8267° E', class: 'Rajput Honeycomb Palace',
    desc: 'A five-storey pink and red sandstone facade carved with 953 jharokha casements, designed like Lord Krishna’s crown to catch cool mountain breezes.',
    notes: 'Built in 1799 by Maharaja Sawai Pratap Singh; designed by Lal Chand Ustad.',
    file: 'plates/in-hawa-mahal.svg',
    alt: 'Intricate pen sketch of the honeycomb sandstone facade of Hawa Mahal.'
  },
  {
    plate: 39, ch: 5, c: 'India', cc: 'IN', r: 'Maharashtra',
    t: 'Gateway of India', p: 'Mumbai Waterfront',
    coords: '18.9220° N, 72.8347° E', class: 'Indo-Saracenic Monument',
    desc: 'Basalt arches incorporating 16th-century Gujarati architectural motifs overlook Mumbai Harbour, where yellow fishing boats rock in the Arabian Sea swell.',
    notes: 'Erected to commemorate the 1911 landing of King George V; architect George Wittet.',
    file: 'plates/in-gateway-of-india.svg',
    alt: 'Architectural wash sketch of the basalt arch of the Gateway of India over Mumbai bay.'
  },
  {
    plate: 40, ch: 5, c: 'India', cc: 'IN', r: 'Delhi',
    t: 'India Gate', p: 'New Delhi',
    coords: '28.6129° N, 77.2295° E', class: 'National Memorial Arch',
    desc: 'Pale red Bharatpur sandstone triumphal arch stands at the eastern end of the ceremonial Rajpath, framed by green lawns and royal canopies.',
    notes: 'Designed by Sir Edwin Lutyens; height 42 meters; dedicated in 1931.',
    file: 'plates/in-india-gate.svg',
    alt: 'Fine line drawing of the India Gate arch under warm saffron evening sky.'
  },
  {
    plate: 41, ch: 5, c: 'India', cc: 'IN', r: 'Karnataka',
    t: 'Hampi Monuments', p: 'Vijayanagara',
    coords: '15.3350° N, 76.4600° E', class: 'Stone Temple Ruins',
    desc: 'Ornate granite stone chariot and musical pillars emerge from a surreal boulder-strewn landscape along the banks of the sacred Tungabhadra River.',
    notes: 'Capital of the Vijayanagara Empire from 1336 to 1565; UNESCO World Heritage Site.',
    file: 'plates/in-hampi.svg',
    alt: 'Sepia and granite ink sketch of the stone temple chariot at Vittala Temple, Hampi.'
  },
  {
    plate: 42, ch: 5, c: 'India', cc: 'IN', r: 'Uttar Pradesh',
    t: 'Varanasi Ghats', p: 'Ganges River',
    coords: '25.3176° N, 82.9739° E', class: 'Sacred Riverbank Steps',
    desc: 'Eighty-four stone stairways descending into the sacred river, where morning bathers offer prayers to the rising sun amidst floating marigold petals.',
    notes: 'One of the world’s oldest continuously inhabited cities, sacred to Hinduism and Buddhism.',
    file: 'plates/in-varanasi-ghats.svg',
    alt: 'Atmospheric watercolor sketch of stone ghats, temple spires, and wooden boats in Varanasi.'
  },
  {
    plate: 43, ch: 5, c: 'India', cc: 'IN', r: 'Tamil Nadu',
    t: 'Meenakshi Amman Temple', p: 'Madurai',
    coords: '9.9195° N, 78.1193° E', class: 'Dravidian Temple Towers',
    desc: 'Fourteen monumental gopuram gate towers covered in thousands of painted mythological figures and celestial guardians soar over the ancient lotus-shaped city.',
    notes: 'Dravidian masterpiece with core origins traced to the 6th century BC; present towers 16th century.',
    file: 'plates/in-meenakshi-temple.svg',
    alt: 'Detailed Dravidian architectural plate of the soaring southern gopuram at Madurai.'
  },
  {
    plate: 44, ch: 5, c: 'India', cc: 'IN', r: 'Odisha',
    t: 'Konark Sun Temple', p: 'Puri Coast',
    coords: '19.8876° N, 86.0945° E', class: 'Kalinga Stone Chariot',
    desc: 'A colossal 13th-century stone chariot carved with twenty-four giant wheels and seven horses, celebrating the sun god Surya on the Bay of Bengal.',
    notes: 'Built by King Narasimhadeva I of the Eastern Ganga Dynasty c. 1250; UNESCO World Heritage Site.',
    file: 'plates/in-konark-sun-temple.svg',
    alt: 'Fine architectural pen study of an intricately carved stone sundial wheel at Konark.'
  },
  {
    plate: 45, ch: 5, c: 'India', cc: 'IN', r: 'Kerala',
    t: 'Kerala Backwaters', p: 'Alleppey / Alappuzha',
    coords: '9.4981° N, 76.3388° E', class: 'Equatorial Lagoon Network',
    desc: 'Thatched kettuvallam houseboats drift serenely down tranquil brackish canals fringed by leaning coconut palms and emerald paddy fields.',
    notes: 'Over 900 kilometers of interconnected lagoons, lakes, and canals fed by 38 rivers.',
    file: 'plates/in-kerala-backwaters.svg',
    alt: 'Botanical and maritime wash sketch of a thatched wooden houseboat on calm Kerala backwaters.'
  },

  // CHAPTER 6: UNITED STATES (46-54)
  {
    plate: 46, ch: 6, c: 'United States', cc: 'US', r: 'New York',
    t: 'Statue of Liberty', p: 'New York Harbor',
    coords: '40.6892° N, 74.0445° E', class: 'Colossal Copper Sculpture',
    desc: 'Verdigris copper drapery catches the Atlantic wind as Lady Liberty lifts her radiant torch over upper New York Bay.',
    notes: 'Sculpted by Frédéric-Auguste Bartholdi with internal framework by Gustave Eiffel; dedicated 1886.',
    file: 'plates/us-statue-of-liberty.svg',
    alt: 'Vintage ink and copper-green wash illustration of the Statue of Liberty.'
  },
  {
    plate: 47, ch: 6, c: 'United States', cc: 'US', r: 'California',
    t: 'Golden Gate Bridge', p: 'San Francisco',
    coords: '37.8199° N, 122.4783° E', class: 'Art Deco Suspension Bridge',
    desc: 'International Orange steel towers soar through swirling Pacific marine fog, spanning the mile-wide strait connecting bay and ocean.',
    notes: 'Engineered by Joseph Strauss, Charles Ellis, and Irving Morrow; opened May 1937.',
    file: 'plates/us-golden-gate.svg',
    alt: 'Architectural sketch of the Art Deco Golden Gate tower rising through Pacific fog.'
  },
  {
    plate: 48, ch: 6, c: 'United States', cc: 'US', r: 'Arizona',
    t: 'Grand Canyon', p: 'South Rim',
    coords: '36.0544° N, 112.1401° E', class: 'Geological Chasm',
    desc: 'Banded sedimentary strata of crimson shale, sandstone, and Kaibab limestone plunging a vertical mile down to the silver Colorado River.',
    notes: 'Exposing nearly two billion years of Earth’s geological history across 446 kilometers.',
    file: 'plates/us-grand-canyon.svg',
    alt: 'Field sketch of layered red-rock cliffs and distant mesas across the Grand Canyon.'
  },
  {
    plate: 49, ch: 6, c: 'United States', cc: 'US', r: 'California',
    t: 'Yosemite Valley', p: 'Sierra Nevada',
    coords: '37.7456° N, 119.5936° E', class: 'Glacial Granite Valley',
    desc: 'Monolithic granite faces of El Capitan and Half Dome frame tumbling water falls and pine forests carved by ancient Pleistocene glaciers.',
    notes: 'Glacial valley protected since 1864 under the Yosemite Grant signed by Abraham Lincoln.',
    file: 'plates/us-yosemite-valley.svg',
    alt: 'Granite contour pencil drawing of El Capitan and Half Dome in Yosemite Valley.'
  },
  {
    plate: 50, ch: 6, c: 'United States', cc: 'US', r: 'New York',
    t: 'Central Park', p: 'Manhattan',
    coords: '40.7829° N, 73.9654° E', class: 'Urban Landscape Park',
    desc: 'Cast-iron Bow Bridge arches across the Ramble lake, where yellow fall foliage contrasts against Manhattan’s vertical skyline.',
    notes: 'Designed by Frederick Law Olmsted and Calvert Vaux; completed in 1876.',
    file: 'plates/us-central-park.svg',
    alt: 'Pencil and autumn watercolor sketch of Bow Bridge with distant Manhattan towers.'
  },
  {
    plate: 51, ch: 6, c: 'United States', cc: 'US', r: 'Utah / Arizona',
    t: 'Monument Valley', p: 'Navajo Nation',
    coords: '36.9980° N, 110.0985° E', class: 'Desert Sandstone Buttes',
    desc: 'Solitary red sandstone mittens and mesas tower up to 300 meters above the flat desert floor under an immense American sky.',
    notes: 'Sacred ancestral homeland of the Diné (Navajo) people, carved from De Chelly Sandstone.',
    file: 'plates/us-monument-valley.svg',
    alt: 'Earthy desert wash illustration of the twin Mitten Buttes in Monument Valley.'
  },
  {
    plate: 52, ch: 6, c: 'United States', cc: 'US', r: 'New York',
    t: 'Brooklyn Bridge', p: 'East River',
    coords: '40.7061° N, 73.9969° E', class: 'Gothic-Revival Suspension Bridge',
    desc: 'Dual limestone neo-Gothic towers pierced by pointed arches support a dense web of diagonal steel stays spanning the tidal East River.',
    notes: 'Engineered by John, Washington, and Emily Warren Roebling; opened May 1883.',
    file: 'plates/us-brooklyn-bridge.svg',
    alt: 'Graphite and sepia drawing of the Gothic stone arches and cable stays of Brooklyn Bridge.'
  },
  {
    plate: 53, ch: 6, c: 'United States', cc: 'US', r: 'Arizona',
    t: 'Antelope Canyon', p: 'Page',
    coords: '36.8619° N, 111.3743° E', class: 'Slot Canyon Formations',
    desc: 'Flowing undulating Navajo sandstone corridors carved by flash floods, glowing with reflected amber and violet light from above.',
    notes: 'Known as Tsé bighánílíní ("the place where water runs through rocks") by the Navajo.',
    file: 'plates/us-antelope-canyon.svg',
    alt: 'Fluid contour study of swirling sandstone canyon walls and descending sunbeams.'
  },
  {
    plate: 54, ch: 6, c: 'United States', cc: 'US', r: 'South Dakota',
    t: 'Mount Rushmore', p: 'Black Hills',
    coords: '43.8791° N, 103.4591° E', class: 'Monumental Granite Carving',
    desc: 'Sixty-foot colossal portraits of four presidents carved directly into the Harney Peak granite batholith of the Black Hills.',
    notes: 'Sculpted by Gutzon Borglum and 400 workers between 1927 and 1941.',
    file: 'plates/us-mount-rushmore.svg',
    alt: 'Pencil sketch of the monumental faces carved into Mount Rushmore granite.'
  },

  // CHAPTER 7: SWITZERLAND (55-63)
  {
    plate: 55, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Valais',
    t: 'Matterhorn', p: 'Zermatt',
    coords: '45.9763° N, 7.6586° E', class: 'Pyramidal Alpine Horn',
    desc: 'An isolated four-sided pyramid of gneiss and schist thrusts into the alpine sky, trailing a delicate banner cloud from its summit ridge.',
    notes: 'First climbed by Edward Whymper’s team in July 1865; altitude 4,478 meters.',
    file: 'plates/ch-matterhorn.svg',
    alt: 'Fine alpine pen and cold blue wash study of the sharp Matterhorn pyramid.'
  },
  {
    plate: 56, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Lucerne',
    t: 'Chapel Bridge', p: 'Reuss River',
    coords: '47.0516° N, 8.3074° E', class: 'Covered Wooden Footbridge',
    desc: 'A diagonal timber bridge dating to 1333 spans the Reuss, housing triangular roof paintings of Swiss history beside an octagonal water tower.',
    notes: 'The oldest surviving wooden truss bridge in Europe; spans 204 meters.',
    file: 'plates/ch-chapel-bridge.svg',
    alt: 'Detailed architectural drawing of the covered Chapel Bridge and Wasserturm in Lucerne.'
  },
  {
    plate: 57, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Bernese Oberland',
    t: 'Lauterbrunnen Valley', p: 'Interlaken Region',
    coords: '46.5935° N, 7.9090° E', class: 'Glacial U-Shaped Valley',
    desc: 'Vertical limestone cliffs punctuated by seventy-two roaring waterfalls plunging into an emerald alpine meadow dotted with timber chalets.',
    notes: 'Inspiration for J.R.R. Tolkien’s mythical valley of Rivendell after his 1911 journey.',
    file: 'plates/ch-lauterbrunnen.svg',
    alt: 'Landscape wash of Staubbach Fall plunging over sheer limestone cliffs into Lauterbrunnen.'
  },
  {
    plate: 58, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Vaud / Geneva',
    t: 'Lake Geneva', p: 'Lavaux Terraces',
    coords: '46.4950° N, 6.7450° E', class: 'Perialpine Crescent Lake',
    desc: 'Terraced stone vineyards descending steep sun-drenched hillsides to deep blue waters, with the snowcapped French Chablais Alps beyond.',
    notes: 'Lavaux vineyards cultivated by Cistercian monks since the 11th century; UNESCO site.',
    file: 'plates/ch-lake-geneva.svg',
    alt: 'Watercolor sketch of terraced Lavaux vineyards overlooking sparkling Lake Geneva.'
  },
  {
    plate: 59, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Bernese Alps',
    t: 'Jungfraujoch', p: 'Aletsch Glacier',
    coords: '46.5475° N, 7.9822° E', class: 'Alpine Saddle & Ice Palace',
    desc: 'Perched at 3,454 meters between the Jungfrau and Mönch, looking out over the immense serpentine curve of the Great Aletsch Glacier.',
    notes: 'Connected by a cogwheel railway tunneled through the Eiger rock; completed in 1912.',
    file: 'plates/ch-jungfraujoch.svg',
    alt: 'Ink and glacial wash depiction of the Sphinx observatory perched above the ice field.'
  },
  {
    plate: 60, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Valais',
    t: 'Zermatt Village', p: 'Matter Valley',
    coords: '45.9763° N, 7.7491° E', class: 'Alpine Wood Architecture',
    desc: 'Sun-blackened larch wood barns raised on circular rodent-guard stone discs (mazots), decorated with vibrant red geraniums.',
    notes: 'Car-free mountain resort maintaining traditional 17th and 18th-century timber chalets.',
    file: 'plates/ch-zermatt-village.svg',
    alt: 'Pencil drawing of traditional timber mazot storehouses with geranium flowerboxes.'
  },
  {
    plate: 61, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Schaffhausen',
    t: 'Rhine Falls', p: 'Neuhausen am Rheinfall',
    coords: '47.6779° N, 8.6156° E', class: 'River Cascade & Limestone Crag',
    desc: 'The most powerful waterfall in mainland Europe roars over jagged limestone reefs, sending sheets of white foam and rainbows into the river.',
    notes: 'Width 150 meters, drop 23 meters; formed in the last ice age approximately 15,000 years ago.',
    file: 'plates/ch-rhine-falls.svg',
    alt: 'Dynamic wash and line study of the churning white water at Rhine Falls.'
  },
  {
    plate: 62, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Vaud',
    t: 'Château de Chillon', p: 'Montreux',
    coords: '46.4142° N, 6.9275° E', class: 'Island Fortress Castle',
    desc: 'An oval medieval fortress perched on an isolated limestone rock in Lake Geneva, protected by double defensive ramparts and Romanesque keeps.',
    notes: 'Seat of the Counts of Savoy; immortalized by Lord Byron’s 1816 poem The Prisoner of Chillon.',
    file: 'plates/ch-chateau-chillon.svg',
    alt: 'Delicate ink study of the medieval towers of Château de Chillon reflected in lake waters.'
  },
  {
    plate: 63, ch: 7, c: 'Switzerland', cc: 'CH', r: 'Canton of Bern',
    t: 'Bern Old Town', p: 'Aare Peninsula',
    coords: '46.9480° N, 7.4474° E', class: 'Medieval Sandstone City',
    desc: 'Six kilometers of covered sandstone arcades (Lauben), Renaissance figured fountains, and the 15th-century astronomical Zytglogge clock tower.',
    notes: 'Founded in 1191 in a tight loop of the turquoise Aare River; UNESCO World Heritage Site.',
    file: 'plates/ch-bern-old-town.svg',
    alt: 'Architectural sketch of the Zytglogge clock tower and sandstone arcades in Bern.'
  },

  // CHAPTER 8: EGYPT (64-72)
  {
    plate: 64, ch: 8, c: 'Egypt', cc: 'EG', r: 'Giza Governorate',
    t: 'Great Pyramid of Giza', p: 'Giza Plateau',
    coords: '29.9792° N, 31.1342° E', class: 'Ancient Royal Tomb',
    desc: 'Over two million cut limestone blocks aligned with astronomical precision to the cardinal points, standing resilient against desert winds.',
    notes: 'Constructed for Pharaoh Khufu c. 2560 BC; the oldest and only intact Ancient Wonder of the World.',
    file: 'plates/eg-great-pyramid.svg',
    alt: 'Warm desert ochre and graphite study of the Great Pyramid of Khufu.'
  },
  {
    plate: 65, ch: 8, c: 'Egypt', cc: 'EG', r: 'Giza Governorate',
    t: 'Great Sphinx of Giza', p: 'Giza Plateau',
    coords: '29.9753° N, 31.1376° E', class: 'Monolithic Limestone Sphinx',
    desc: 'A mythical lion body with the head of Pharaoh Khafre gazes eastward toward the Nile, carved directly from the plateau bedrock.',
    notes: 'Length 73 meters, height 20 meters; carved during the Old Kingdom Fourth Dynasty c. 2500 BC.',
    file: 'plates/eg-great-sphinx.svg',
    alt: 'Pencil and desert wash sketch of the weathered Great Sphinx facing the eastern dawn.'
  },
  {
    plate: 66, ch: 8, c: 'Egypt', cc: 'EG', r: 'Luxor',
    t: 'Karnak Temple', p: 'Thebes East Bank',
    coords: '25.7188° N, 32.6573° E', class: 'Great Hypostyle Hall',
    desc: 'One hundred and thirty-four colossal sandstone papyrus columns rise like a petrified forest, carved with deep hieroglyphs and battle reliefs.',
    notes: 'Developed over two thousand years from the Middle Kingdom through the Ptolemaic period.',
    file: 'plates/eg-karnak-temple.svg',
    alt: 'Dramatic architectural sketch of the giant papyrus columns of Karnak Hypostyle Hall.'
  },
  {
    plate: 67, ch: 8, c: 'Egypt', cc: 'EG', r: 'Aswan Governorate',
    t: 'Abu Simbel', p: 'Lake Nasser',
    coords: '22.3372° N, 31.6258° E', class: 'Rock-Cut Temple Façade',
    desc: 'Four colossal seated statues of Ramesses II carved into the cliff face, welcoming the sunrise twice each year into the deepest sanctuary.',
    notes: 'Relocated block by block in 1968 to save the temples from the rising waters of Lake Nasser.',
    file: 'plates/eg-abu-simbel.svg',
    alt: 'Ink and sandstone wash plate of the four seated Ramesses colossi at Abu Simbel.'
  },
  {
    plate: 68, ch: 8, c: 'Egypt', cc: 'EG', r: 'Luxor',
    t: 'Valley of the Kings', p: 'Thebes West Bank',
    coords: '25.7402° N, 32.6014° E', class: 'Royal Necropolis',
    desc: 'Arid desert canyon sheltered beneath a natural pyramid peak, where rock-cut corridors descend to painted tomb chambers of New Kingdom pharaohs.',
    notes: 'Over sixty royal tombs including Tutankhamun (KV62) and Seti I (KV17); designated UNESCO site.',
    file: 'plates/eg-valley-of-the-kings.svg',
    alt: 'Field drawing of the arid limestone cliffs and subterranean tomb portals of the Kings.'
  },
  {
    plate: 69, ch: 8, c: 'Egypt', cc: 'EG', r: 'Luxor',
    t: 'Luxor Temple', p: 'Thebes East Bank',
    coords: '25.6995° N, 32.6392° E', class: 'Amun-Re Sanctuary Complex',
    desc: 'Pylon gateways flanked by colossal statues of Ramesses II and a solitary pink granite obelisk, leading into courtyard colonnades.',
    notes: 'Center of the annual Opet Festival; connected to Karnak by a three-kilometer Avenue of Sphinxes.',
    file: 'plates/eg-luxor-temple.svg',
    alt: 'Line and wash study of the entrance pylon, obelisk, and colossi of Luxor Temple.'
  },
  {
    plate: 70, ch: 8, c: 'Egypt', cc: 'EG', r: 'Upper Egypt',
    t: 'Nile River Landscapes', p: 'Aswan to Kom Ombo',
    coords: '24.0889° N, 32.8998° E', class: 'Historic River Corridor',
    desc: 'Traditional wooden feluccas with triangular lateen sails drifting past date palm groves, golden sand dunes, and granite cataracts.',
    notes: 'The longest river in Africa, whose annual inundation sustained Egyptian civilization for millennia.',
    file: 'plates/eg-nile-river.svg',
    alt: 'Watercolor sketch of white lateen-sail feluccas gliding past date palms on the Nile.'
  },
  {
    plate: 71, ch: 8, c: 'Egypt', cc: 'EG', r: 'Aswan',
    t: 'Philae Temple', p: 'Agilkia Island',
    coords: '24.0253° N, 32.8842° E', class: 'Isis Sanctuary & Kiosk of Trajan',
    desc: 'Hypaethral Trajan’s Kiosk with lotus flower capitals reflected in the calm waters of the Nile reservoir, dedicated to the mother goddess Isis.',
    notes: 'Rescued from flooding and reassembled on Agilkia Island under a UNESCO project in the 1970s.',
    file: 'plates/eg-philae-temple.svg',
    alt: 'Classical line drawing of the Roman Kiosk of Trajan on the island of Philae.'
  },
  {
    plate: 72, ch: 8, c: 'Egypt', cc: 'EG', r: 'Cairo',
    t: 'Egyptian Museum', p: 'Tahrir Square',
    coords: '30.0478° N, 31.2336° E', class: 'Neoclassical Antiquities Palace',
    desc: 'Distinguished dusty rose neoclassical facade designed by Marcel Dourgnon in 1901, housing over a century of golden Pharaonic discoveries.',
    notes: 'The oldest archaeological museum in the Middle East, preserving over 120,000 antiquities.',
    file: 'plates/eg-egyptian-museum.svg',
    alt: 'Architectural sketch of the neoclassical portico and arch of the Egyptian Museum in Cairo.'
  },

  // CHAPTER 9: UNITED KINGDOM (73-81)
  {
    plate: 73, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Greater London',
    t: 'Big Ben & Palace of Westminster', p: 'Westminster',
    coords: '51.5007° N, 0.1246° W', class: 'Perpendicular Gothic Revival',
    desc: 'Elizabeth Tower’s gilded clock faces and Gothic pinnacles cast long shadows over the tidal Thames as the Great Bell tolls the hour.',
    notes: 'Rebuilt by Sir Charles Barry and Augustus Pugin after the fire of 1834; limestone and cast-iron roof.',
    file: 'plates/gb-big-ben.svg',
    alt: 'Perpendicular Gothic architectural study of Elizabeth Tower and Westminster bridge.'
  },
  {
    plate: 74, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Greater London',
    t: 'Tower Bridge', p: 'River Thames',
    coords: '51.5055° N, 0.0754° W', class: 'Victorian Bascule & Suspension',
    desc: 'Twin Cornish granite-clad Gothic towers linked by elevated walkways, spanning hydraulic bascules that lift for tall-masted river traffic.',
    notes: 'Designed by Sir Horace Jones and Sir John Wolfe Barry; opened June 1894.',
    file: 'plates/gb-tower-bridge.svg',
    alt: 'Pen and watercolor wash sketch of Tower Bridge over the river Thames.'
  },
  {
    plate: 75, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Midlothian',
    t: 'Edinburgh Castle', p: 'Castle Rock',
    coords: '55.9486° N, 3.1999° W', class: 'Volcanic Fortress Citadel',
    desc: 'Ancient stone battlements and the Half Moon Battery crown the dark basalt volcanic plug, dominating the medieval Royal Mile below.',
    notes: 'Royal residence dating from the 12th century; holds the Honours of Scotland (crown jewels).',
    file: 'plates/gb-edinburgh-castle.svg',
    alt: 'Dramatic graphite and gray-wash illustration of Edinburgh Castle on its volcanic crag.'
  },
  {
    plate: 76, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Wiltshire',
    t: 'Stonehenge', p: 'Salisbury Plain',
    coords: '51.1789° N, 1.8262° W', class: 'Neolithic Megalithic Ring',
    desc: 'Towering sarsen trilithons and lintels aligned with solstitial sunrise, weathered by four thousand years of Atlantic rain and wind.',
    notes: 'Constructed in multiple phases from c. 3000 BC to 2000 BC; blue stones transported from Wales.',
    file: 'plates/gb-stonehenge.svg',
    alt: 'Atmospheric charcoal and moss-green wash drawing of the Stonehenge megaliths.'
  },
  {
    plate: 77, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Somerset',
    t: 'Roman Baths', p: 'Bath',
    coords: '51.3810° N, 2.3590° W', class: 'Thermal Spring Complex',
    desc: 'Steaming geothermal mineral water fills the Great Bath lined with lead sheets, surrounded by Roman column bases and 19th-century terrace statues.',
    notes: 'Constructed by the Romans c. 60–70 AD around natural hot springs producing 46°C water.',
    file: 'plates/gb-roman-baths.svg',
    alt: 'Architectural sketch of the steaming Great Bath surrounded by Roman columns in Bath.'
  },
  {
    plate: 78, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Greater London',
    t: 'Tower of London', p: 'White Tower',
    coords: '51.5081° N, 0.0759° W', class: 'Norman Royal Keep & Fortress',
    desc: 'William the Conqueror’s four-turreted White Tower built of Caen stone, guarding the eastern gate of London beside the Traitors’ Gate.',
    notes: 'Begun in 1078; served as royal residence, prison, armory, and home of the Crown Jewels.',
    file: 'plates/gb-tower-of-london.svg',
    alt: 'Pencil and ink study of the Norman White Tower battlements and corner turrets.'
  },
  {
    plate: 79, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'City of London',
    t: 'St Paul’s Cathedral', p: 'Ludgate Hill',
    coords: '51.5138° N, 0.0984° W', class: 'English Baroque Cathedral',
    desc: 'Sir Christopher Wren’s lead-clad dome and two-tier western portico rise serenely above the rooftops of the square mile.',
    notes: 'Rebuilt between 1675 and 1710 following the Great Fire of London; three-shell dome structure.',
    file: 'plates/gb-st-pauls.svg',
    alt: 'Baroque architectural study of St Paul’s Cathedral dome and west front.'
  },
  {
    plate: 80, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Cumbria',
    t: 'Lake District', p: 'Derwentwater & Borrowdale',
    coords: '54.5800° N, 3.1400° W', class: 'Glacial Valley & Fell Landscape',
    desc: 'Craggy slate fells, dry-stone sheep folds, and ancient sessile oak woods mirrored in the glassy waters of Derwentwater.',
    notes: 'Inspiration for the Romantic poets Wordsworth, Coleridge, and Southey; UNESCO site.',
    file: 'plates/gb-lake-district.svg',
    alt: 'Landscape wash of Derwentwater lake, rowing boats, and misty Borrowdale fells.'
  },
  {
    plate: 81, ch: 9, c: 'United Kingdom', cc: 'GB', r: 'Highland',
    t: 'Glenfinnan Viaduct', p: 'Loch Shiel',
    coords: '56.8763° N, 5.4319° W', class: 'Mass Concrete Railway Viaduct',
    desc: 'A sweeping curve of twenty-one semi-circular concrete arches carrying the West Highland Line across the peat glen toward Loch Shiel.',
    notes: 'Constructed by Robert McAlpine between 1897 and 1901 using unreinforced mass concrete.',
    file: 'plates/gb-glenfinnan-viaduct.svg',
    alt: 'Fine line drawing of the curving Glenfinnan Viaduct with a steam locomotive.'
  },

  // CHAPTER 10: NEW ZEALAND (82-90)
  {
    plate: 82, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Southland',
    t: 'Milford Sound', p: 'Piopiotahi / Fiordland',
    coords: '44.6715° S, 167.9256° E', class: 'Glacial Fjord & Mitre Peak',
    desc: 'Dark ink-blue waters reflect Mitre Peak rising sheer 1,692 meters from sea level, while temporary waterfalls cascade through rainforest mist.',
    notes: 'Carved by glaciers during successive ice ages; annual rainfall exceeds 6,800 millimeters.',
    file: 'plates/nz-milford-sound.svg',
    alt: 'Dramatic graphite and glacial wash illustration of Mitre Peak towering over Milford Sound.'
  },
  {
    plate: 83, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Canterbury',
    t: 'Aoraki / Mount Cook', p: 'Southern Alps',
    coords: '43.5950° S, 170.1418° E', class: 'Glaciated Alpine Summit',
    desc: 'The highest peak in Aotearoa crowned with permanent hanging glaciers and jagged aretes, towering above Hooker Valley’s glacial moraines.',
    notes: 'Sacred ancestor in Ngāi Tahu Māori tradition; elevation 3,724 meters.',
    file: 'plates/nz-mount-cook.svg',
    alt: 'Delicate alpine contour drawing of Aoraki / Mount Cook and Hooker Valley moraine.'
  },
  {
    plate: 84, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Waikato',
    t: 'Hobbiton Movie Set', p: 'Matamata',
    coords: '37.8721° S, 175.6829° E', class: 'Vernacular Earth-Sheltered Dwellings',
    desc: 'Round timber doors and stone chimneys embedded in rolling clover hills, surrounded by vegetable gardens, picket fences, and weeping willows.',
    notes: 'Permanent set rebuilt for The Hobbit films on the Alexander sheep farm; 44 hobbit holes.',
    file: 'plates/nz-hobbiton.svg',
    alt: 'Charming architectural watercolor of a round green hobbit hole door and cottage garden.'
  },
  {
    plate: 85, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Canterbury',
    t: 'Lake Tekapo', p: 'Church of the Good Shepherd',
    coords: '44.0040° S, 170.4770° E', class: 'Glacial Flour Lake & Fieldstone Chapel',
    desc: 'Opaque turquoise water tinted by rock flour laps against shorelines covered in purple Russell lupins beside an unadorned fieldstone chapel.',
    notes: 'Part of the Aoraki Mackenzie International Dark Sky Reserve; chapel built in 1935.',
    file: 'plates/nz-lake-tekapo.svg',
    alt: 'Watercolor sketch of the stone Church of the Good Shepherd and turquoise Lake Tekapo.'
  },
  {
    plate: 86, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Auckland Region',
    t: 'Auckland Sky Tower', p: 'Waitematā Harbour',
    coords: '36.8485° S, 174.7633° E', class: 'Telecommunications & Observation Spire',
    desc: 'Slender reinforced concrete mast puncturing the Pacific sky between the sparkling Waitematā and Manukau volcanic harbours.',
    notes: 'Completed in 1997; height 328 meters, designed to withstand 200 km/h winds.',
    file: 'plates/nz-sky-tower.svg',
    alt: 'Architectural line sketch of Auckland Sky Tower over city hills and harbour yachts.'
  },
  {
    plate: 87, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Bay of Plenty',
    t: 'Wai-O-Tapu Geothermal Landscape', p: 'Rotorua',
    coords: '38.3582° S, 176.3683° E', class: 'Active Hydrothermal Caldera',
    desc: 'Champagne Pool bubbling with mineral effervescence, ringed by vibrant orange sinter terraces and steaming fumaroles amidst native manuka.',
    notes: 'Māori for "sacred waters"; geothermal activity shaped by the Okataina Volcanic Centre.',
    file: 'plates/nz-wai-o-tapu.svg',
    alt: 'Earthy watercolor study of the orange sinter margin and steam at Champagne Pool.'
  },
  {
    plate: 88, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Otago',
    t: 'Queenstown', p: 'Lake Wakatipu & The Remarkables',
    coords: '45.0312° S, 168.6626° E', class: 'Glacial Lake & Razor Ridge',
    desc: 'Steep jagged quartzite crests of The Remarkables plunge straight into deep glacial waters, where the historic TSS Earnslaw steamship departs.',
    notes: 'Lake Wakatipu exhibits a unique 27-minute seiche rhythm rising and falling 20 centimeters.',
    file: 'plates/nz-queenstown.svg',
    alt: 'Pencil drawing of The Remarkables mountain range across Lake Wakatipu.'
  },
  {
    plate: 89, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Manawatu-Wanganui',
    t: 'Tongariro Alpine Crossing', p: 'Emerald Lakes',
    coords: '39.1415° S, 175.5870° E', class: 'Volcanic Alpine Caldera',
    desc: 'Luminous jade-green explosion craters steaming on barren scree slopes below the symmetrical volcanic cone of Mount Ngauruhoe.',
    notes: 'New Zealand’s oldest national park, gifted to the nation in 1887 by Paramount Chief Te Heuheu Tukino IV.',
    file: 'plates/nz-tongariro.svg',
    alt: 'Volcanic field sketch of the steaming turquoise Emerald Lakes on Tongariro.'
  },
  {
    plate: 90, ch: 10, c: 'New Zealand', cc: 'NZ', r: 'Waikato',
    t: 'Cathedral Cove', p: 'Te Whanganui-A-Hei',
    coords: '36.8285° S, 175.7905° E', class: 'Coastal Sea Arch & Marine Reserve',
    desc: 'A soaring natural Gothic cavern carved through pure white ignimbrite rock links two secluded pohutukawa-fringed golden beaches.',
    notes: 'Named for the cathedral-like proportions of its sea-carved limestone archway.',
    file: 'plates/nz-cathedral-cove.svg',
    alt: 'Coastal ink and wash sketch looking through the Cathedral Cove arch toward the sea rock.'
  },

  // CHAPTER 11: TURKEY (91-99)
  {
    plate: 91, ch: 11, c: 'Turkey', cc: 'TR', r: 'Marmara',
    t: 'Hagia Sophia', p: 'Sultanahmet, Istanbul',
    coords: '41.0086° N, 28.9802° E', class: 'Byzantine Dome & Ottoman Minarets',
    desc: 'A colossal brick dome supported by pendentives seems to hang suspended by a golden chain from heaven, flanked by four red-brick Ottoman minarets.',
    notes: 'Consecrated in 537 AD under Emperor Justinian I; architects Isidore of Miletus and Anthemius of Tralles.',
    file: 'plates/tr-hagia-sophia.svg',
    alt: 'Detailed architectural drawing of Hagia Sophia’s central dome and buttresses.'
  },
  {
    plate: 92, ch: 11, c: 'Turkey', cc: 'TR', r: 'Marmara',
    t: 'Blue Mosque', p: 'Sultanahmet, Istanbul',
    coords: '41.0054° N, 28.9768° E', class: 'Classical Ottoman Imperial Mosque',
    desc: 'Cascading domes and semi-domes flanked by six slender fluted minarets, sheltering interior galleries lined with twenty thousand handmade Iznik tiles.',
    notes: 'Commissioned by Sultan Ahmed I; built 1609–1616 by imperial architect Sedefkar Mehmed Agha.',
    file: 'plates/tr-blue-mosque.svg',
    alt: 'Pencil and turquoise wash study of the cascading domes of the Blue Mosque.'
  },
  {
    plate: 93, ch: 11, c: 'Turkey', cc: 'TR', r: 'Central Anatolia',
    t: 'Cappadocia', p: 'Göreme Valley',
    coords: '38.6431° N, 34.8289° E', class: 'Tufa Rock Formations & Cave Chapels',
    desc: 'Fairy chimneys carved from volcanic ash and basalt caps rise over honeycomb valleys, dotted with hot-air balloons rising into the sunrise.',
    notes: 'Eroded tufa landscape housing subterranean cities and rock-hewn Byzantine frescoed chapels.',
    file: 'plates/tr-cappadocia.svg',
    alt: 'Watercolor sketch of Cappadocia fairy chimneys and hot air balloons at sunrise.'
  },
  {
    plate: 94, ch: 11, c: 'Turkey', cc: 'TR', r: 'Aegean Region',
    t: 'Pamukkale', p: 'Denizli Province',
    coords: '37.9250° N, 29.1213° E', class: 'Travertine Thermal Terraces',
    desc: 'Brilliant white cascades of petrified limestone terraces filled with warm calcium-rich turquoise water cascading down the mountain side.',
    notes: 'Known as the "Cotton Castle"; adjacent to the ancient Greco-Roman spa city of Hierapolis.',
    file: 'plates/tr-pamukkale.svg',
    alt: 'Soft wash study of the terraced white travertine pools and turquoise waters of Pamukkale.'
  },
  {
    plate: 95, ch: 11, c: 'Turkey', cc: 'TR', r: 'Izmir Province',
    t: 'Ephesus', p: 'Library of Celsus',
    coords: '37.9392° N, 27.3409° E', class: 'Roman Monumental Facade',
    desc: 'Two-tier Corinthian marble facade featuring paired columns, decorated aedicules, and statues representing Wisdom, Knowledge, and Virtue.',
    notes: 'Built c. 114–117 AD in honor of Roman Senator Tiberius Julius Celsus Polemaeanus.',
    file: 'plates/tr-ephesus.svg',
    alt: 'Classical architectural plate of the reconstructed Corinthian facade of Celsus Library.'
  },
  {
    plate: 96, ch: 11, c: 'Turkey', cc: 'TR', r: 'Istanbul',
    t: 'Galata Tower', p: 'Karaköy',
    coords: '41.0256° N, 28.9741° E', class: 'Genoese Masonry Watchtower',
    desc: 'Conical lead cap crowns a massive Romanesque stone tower standing sentinel over the Golden Horn and the historic Genoese quarter.',
    notes: 'Built as Christea Turris in 1348 by the Genoese community of Galata; height 67 meters.',
    file: 'plates/tr-galata-tower.svg',
    alt: 'Ink drawing of the conical Galata Tower rising above the tiled roofs of Karaköy.'
  },
  {
    plate: 97, ch: 11, c: 'Turkey', cc: 'TR', r: 'Istanbul',
    t: 'Topkapi Palace', p: 'Sarayburnu',
    coords: '41.0115° N, 28.9833° E', class: 'Ottoman Imperial Palace Complex',
    desc: 'The Imperial Gate, Fountain of Ahmed III, and ornate pavilions of the Fourth Courtyard overlooking the confluence of the Bosphorus and Marmara.',
    notes: 'Administrative heart of the Ottoman Empire from the conquest of 1453 until 1856.',
    file: 'plates/tr-topkapi-palace.svg',
    alt: 'Fine line study of the Baghdad Kiosk and tiled courtyards at Topkapi Palace.'
  },
  {
    plate: 98, ch: 11, c: 'Turkey', cc: 'TR', r: 'Southeastern Anatolia',
    t: 'Mount Nemrut', p: 'Adıyaman',
    coords: '37.9806° N, 38.7408° E', class: 'Hierotheseion & Colossal Stone Heads',
    desc: 'Gigantic carved stone heads of King Antiochus I, Apollo-Mithra, and Hercules resting in mountain gravel at the summit of a gravel tumulus.',
    notes: 'Built in the 1st century BC by the Commagene kingdom at an altitude of 2,134 meters.',
    file: 'plates/tr-mount-nemrut.svg',
    alt: 'Graphite and stone-wash sketch of the colossal carved heads resting on Mount Nemrut.'
  },
  {
    plate: 99, ch: 11, c: 'Turkey', cc: 'TR', r: 'Istanbul',
    t: 'Bosphorus Waterfront', p: 'Ortaköy',
    coords: '41.0475° N, 29.0270° E', class: 'Neo-Baroque Mosque & Suspension Bridge',
    desc: 'The ornate neo-baroque Ortaköy Mosque sits directly at the water’s edge beneath the sweeping suspension cables of the Bosphorus Bridge.',
    notes: 'Designed by Armenian architect Garabet Balyan; connects Europe and Asia across the strait.',
    file: 'plates/tr-bosphorus-waterfront.svg',
    alt: 'Watercolor sketch of Ortaköy Mosque at the water’s edge with the Bosphorus Bridge behind.'
  },

  // CHAPTER 12: INDONESIA (100-108)
  {
    plate: 100, ch: 12, c: 'Indonesia', cc: 'ID', r: 'Central Java',
    t: 'Borobudur', p: 'Kedu Plain, Magelang',
    coords: '7.6079° S, 110.2038° E', class: 'Mahayana Buddhist Mandala Monument',
    desc: 'Nine stacked stone platforms carved from volcanic andesite crowned by seventy-two perforated stupas holding Buddha statues, rising above morning mist.',
    notes: 'Constructed in the 8th and 9th centuries during the Shailendra dynasty; largest Buddhist temple in the world.',
    file: 'plates/id-borobudur.svg',
    alt: 'Misty volcanic wash study of the perforated stone stupas of Borobudur at sunrise.'
  },
  {
    plate: 101, ch: 12, c: 'Indonesia', cc: 'ID', r: 'Special Region of Yogyakarta',
    t: 'Prambanan', p: 'Sleman',
    coords: '7.7520° S, 110.4914° E', class: 'Trimurti Hindu Temple Compound',
    desc: 'Tall pointed stone spires dedicated to Shiva, Brahma, and Vishnu soar 47 meters above courtyard shrines carved with Ramayana narrative reliefs.',
    notes: 'Built in the 9th century by the Mataram Kingdom; exemplar of classical Hindu temple architecture.',
    file: 'plates/id-prambanan.svg',
    alt: 'Architectural line and wash sketch of the towering central Shiva temple at Prambanan.'
  },
  {
    plate: 102, ch: 12, c: 'Indonesia', cc: 'ID', r: 'Bali',
    t: 'Tanah Lot', p: 'Tabanan',
    coords: '8.6212° S, 115.0868° E', class: 'Sea Temple & Wave-Cut Offshore Rock',
    desc: 'A sacred thatched meru shrine perched atop a wave-sculpted offshore crag, enveloped in Indian Ocean spray under golden Balinese sunsets.',
    notes: 'Founded in the 16th century by Dang Hyang Nirartha; one of seven sea temples guarding the Balinese coast.',
    file: 'plates/id-tanah-lot.svg',
    alt: 'Ocean wash sketch of the thatched sea temple of Tanah Lot at high tide.'
  },
  {
    plate: 103, ch: 12, c: 'Indonesia', cc: 'ID', r: 'Bali',
    t: 'Uluwatu Temple', p: 'Bukit Peninsula',
    coords: '8.8291° S, 115.0849° E', class: 'Cliff-Edge Sea Temple',
    desc: 'A black coral stone shrine balanced on the edge of a sheer 70-meter limestone cliff dropping into pounding surf, guarded by native macaque monkeys.',
    notes: 'Dedicated to the supreme water spirits (Sang Hyang Widhi Wasa in manifestation as Rudra).',
    file: 'plates/id-uluwatu.svg',
    alt: 'Dramatic pencil drawing of the cliff-edge Uluwatu Temple above breaking surf.'
  },
  {
    plate: 104, ch: 12, c: 'Indonesia', cc: 'ID', r: 'East Java',
    t: 'Mount Bromo', p: 'Bromo Tengger Semeru',
    coords: '7.9425° S, 112.9530° E', class: 'Active Volcanic Somma & Sand Sea',
    desc: 'Active steaming crater emitting plumes of white ash over the vast Sea of Sand, backed by the fluted ridges of Mount Batok at dawn.',
    notes: 'Sacred to the Hindu Tenggerese people who conduct the annual Yadnya Kasada offering ceremony.',
    file: 'plates/id-mount-bromo.svg',
    alt: 'Volcanic landscape sketch of the smoking caldera of Mount Bromo and Mount Batok.'
  },
  {
    plate: 105, ch: 12, c: 'Indonesia', cc: 'ID', r: 'Bali',
    t: 'Tegallalang Rice Terraces', p: 'Ubud',
    coords: '8.4344° S, 115.2796° E', class: 'Subak Irrigation Agricultural Terraces',
    desc: 'Stepped emerald paddies carved into ravine walls following natural topographical contours, irrigated by ancient communal subak canals.',
    notes: 'Traditional Balinese subak water management system dated to the 9th century; UNESCO World Heritage.',
    file: 'plates/id-tegallalang.svg',
    alt: 'Lush botanical wash drawing of stepped green rice terraces and palm trees at Tegallalang.'
  },
  {
    plate: 106, ch: 12, c: 'Indonesia', cc: 'ID', r: 'East Nusa Tenggara',
    t: 'Komodo National Park', p: 'Padar Island',
    coords: '8.6500° S, 119.5700° E', class: 'Volcanic Archipelago & Dragon Habitat',
    desc: 'Serrated volcanic ridges of Padar Island overlooking three crescent bays of pink, black, and white sand in the sapphire Flores Sea.',
    notes: 'Habitat of the endemic Komodo dragon (Varanus komodoensis), the world’s largest living lizard.',
    file: 'plates/id-komodo-padar.svg',
    alt: 'Topographical ink sketch of the multi-colored bays and volcanic ridges of Padar Island.'
  },
  {
    plate: 107, ch: 12, c: 'Indonesia', cc: 'ID', r: 'West Papua',
    t: 'Raja Ampat', p: 'Wayag Islands',
    coords: '0.1500° S, 130.0300° E', class: 'Karst Atolls & Coral Reefs',
    desc: 'Lush green conical karst limestone islets scattered like mushroom domes across turquoise and cobalt equatorial lagoons.',
    notes: 'Epicenter of the Coral Triangle, harboring the richest marine biodiversity recorded on Earth.',
    file: 'plates/id-raja-ampat.svg',
    alt: 'Turquoise and emerald watercolor study of the karst islets of Raja Ampat.'
  },
  {
    plate: 108, ch: 12, c: 'Indonesia', cc: 'ID', r: 'Special Capital Region',
    t: 'Jakarta Old Town', p: 'Fatahillah Square, Kota Tua',
    coords: '6.1352° S, 106.8133° E', class: 'Dutch Colonial Stadhuis',
    desc: 'Symmetrical 18th-century Dutch colonial city hall with bell tower and timber windows, facing a cobbled square filled with colorful vintage bicycles.',
    notes: 'Built in 1710 as the Stadhuis of Batavia; headquarters of the Dutch East India Company (VOC).',
    file: 'plates/id-jakarta-kota-tua.svg',
    alt: 'Colonial architectural sketch of the Stadhuis in Fatahillah Square, Jakarta.'
  }
];

// Helper to format landmark object
const landmarks = RAW_LANDMARKS.map(l => ({
  id: `${l.cc.toLowerCase()}-${l.t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
  plateNumber: l.plate,
  chapterNumber: l.ch,
  country: l.c,
  countryCode: l.cc,
  region: l.r,
  title: l.t,
  place: l.p,
  coordinates: l.coords,
  subjectClassification: l.class,
  description: l.desc,
  culturalNotes: l.notes,
  illustrationFile: l.file,
  altText: l.alt
}));

// Write src/data/landmarksData.ts
const tsContent = `// Auto-generated 108 curated global travel sketchbook landmarks
import { Landmark } from "./chaptersData";

export const LANDMARKS: Landmark[] = ${JSON.stringify(landmarks, null, 2)};

export function getLandmarkByPlate(plateNumber: number): Landmark | undefined {
  return LANDMARKS.find(l => l.plateNumber === plateNumber);
}

export function getLandmarksByChapter(chapterNumber: number): Landmark[] {
  return LANDMARKS.filter(l => l.chapterNumber === chapterNumber);
}

export function searchLandmarks(query: string): Landmark[] {
  const q = query.trim().toLowerCase();
  if (!q) return LANDMARKS;
  return LANDMARKS.filter(l =>
    l.title.toLowerCase().includes(q) ||
    l.country.toLowerCase().includes(q) ||
    l.region.toLowerCase().includes(q) ||
    l.place.toLowerCase().includes(q) ||
    l.subjectClassification.toLowerCase().includes(q) ||
    String(l.plateNumber).padStart(2, '0').includes(q) ||
    String(l.plateNumber) === q
  );
}
`;

fs.writeFileSync('src/data/landmarksData.ts', tsContent, 'utf8');
console.log('Generated src/data/landmarksData.ts with', landmarks.length, 'records.');

// Generate 99 SVG plates for non-Singapore landmarks
// Each SVG is 1760 x 1240 open sketchbook spread:
// Left page: Plate metadata, archival badge, field notes, pencil elevation contours, compass rose
// Right page: The dedicated architectural/landscape ink-watercolor sketch with washes, botanical border
const platesDir = 'public/landing-pages/meng-to-sketchbook/plates';
fs.mkdirSync(platesDir, { recursive: true });

// Style definitions per chapter for artwork creation
const CHAPTER_STYLES = {
  2: { // Japan
    wash: '#ECE7DC', ink: '#1F1E1C', accent: '#C45145', secondary: '#4A6B82',
    botany: 'Prunus serrulata (Cherry Blossom)',
    seal: '京都 京 (Archival Seal)',
    textureGrad: ['#F6F2EA', '#ECE6D8', '#E2D9C5']
  },
  3: { // Italy
    wash: '#EFE7DA', ink: '#28231E', accent: '#C26D45', secondary: '#8A9A65',
    botany: 'Olea europaea (Olive Branch)',
    seal: 'ROMA • ANNO ARCHIVIO',
    textureGrad: ['#F8F4EC', '#EFE6D8', '#E3D6C1']
  },
  4: { // France
    wash: '#EAE6DD', ink: '#24252A', accent: '#5C6E87', secondary: '#8B7B96',
    botany: 'Lavandula angustifolia (Provence)',
    seal: 'PARIS • CABINET DES DESSINS',
    textureGrad: ['#F7F5EE', '#EAE5DB', '#DDD6CB']
  },
  5: { // India
    wash: '#ECE1CD', ink: '#2A231C', accent: '#D47E3D', secondary: '#486D7A',
    botany: 'Nelumbo nucifera (Sacred Lotus)',
    seal: 'ARCHIVE OF HINDUSTAN',
    textureGrad: ['#F9F4E6', '#EDE0CA', '#DFCFB4']
  },
  6: { // USA
    wash: '#ECE3D5', ink: '#282522', accent: '#A3684B', secondary: '#5A7D84',
    botany: 'Sequoiadendron giganteum (Giant Sequoia)',
    seal: 'GEOLOGICAL SURVEY • FIELD PLATE',
    textureGrad: ['#F8F3EA', '#ECE2D3', '#E0D4C1']
  },
  7: { // Switzerland
    wash: '#E7E8E4', ink: '#1E2328', accent: '#4E6A78', secondary: '#5F7C56',
    botany: 'Leontopodium nivale (Edelweiss)',
    seal: 'HELVETIA ALPINUS ARCHIV',
    textureGrad: ['#F5F6F3', '#E7E8E3', '#D9DAD4']
  },
  8: { // Egypt
    wash: '#ECE0C8', ink: '#282117', accent: '#C9933B', secondary: '#3D6F8D',
    botany: 'Cyperus papyrus (Nile Papyrus)',
    seal: 'THEBAN ANTIQUITIES SURVEY',
    textureGrad: ['#F9F3E3', '#ECE0C6', '#DECDB1']
  },
  9: { // UK
    wash: '#E6E5DE', ink: '#202422', accent: '#536D57', secondary: '#707785',
    botany: 'Quercus robur (English Oak)',
    seal: 'ROYAL GEOGRAPHICAL FOLIO',
    textureGrad: ['#F6F5EF', '#E6E5DD', '#D8D6CC']
  },
  10: { // NZ
    wash: '#E5EAE7', ink: '#1B2423', accent: '#3F716F', secondary: '#5F8257',
    botany: 'Cyathea dealbata (Silver Fern)',
    seal: 'AOTEAROA SURVEY EXPEDITION',
    textureGrad: ['#F5F8F6', '#E5EBE8', '#D6DDD9']
  },
  11: { // Turkey
    wash: '#EDE6D7', ink: '#26211C', accent: '#43838E', secondary: '#B06B68',
    botany: 'Tulipa gesneriana (Ottoman Tulip)',
    seal: 'DER-I SAADET ARCHIVE',
    textureGrad: ['#FAF5E9', '#EDE5D5', '#DFD5C2']
  },
  12: { // Indonesia
    wash: '#E5E7DF', ink: '#1F2520', accent: '#4B7757', secondary: '#486E78',
    botany: 'Phalaenopsis amabilis (Moon Orchid)',
    seal: 'NUSANTARA MARITIME FOLIO',
    textureGrad: ['#F6F8F2', '#E5E7DE', '#D5D8CC']
  }
};

let platesCount = 0;

for (const lm of landmarks) {
  // Skip Singapore (ch 1) because it uses original verified PNGs!
  if (lm.chapterNumber === 1) continue;

  const style = CHAPTER_STYLES[lm.chapterNumber];
  const svgFilename = path.basename(lm.illustrationFile);
  const outPath = path.join(platesDir, svgFilename);

  // Generate unique vector architectural study based on classification & title
  const isLandscape = lm.subjectClassification.includes('Volcano') || lm.subjectClassification.includes('Valley') || lm.subjectClassification.includes('Fjord') || lm.subjectClassification.includes('Canyon') || lm.subjectClassification.includes('Coast');
  const isTower = lm.subjectClassification.includes('Spire') || lm.subjectClassification.includes('Campanile') || lm.subjectClassification.includes('Tower');
  const isDome = lm.subjectClassification.includes('Dome') || lm.subjectClassification.includes('Mosque') || lm.subjectClassification.includes('Cathedral');
  const isBridge = lm.subjectClassification.includes('Bridge') || lm.subjectClassification.includes('Viaduct');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1240" width="1760" height="1240">
  <defs>
    <!-- Paper texture & subtle noise -->
    <linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${style.textureGrad[0]}"/>
      <stop offset="50%" stop-color="${style.textureGrad[1]}"/>
      <stop offset="100%" stop-color="${style.textureGrad[2]}"/>
    </linearGradient>
    <linearGradient id="washGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${style.accent}" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="${style.secondary}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${style.wash}" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="crease" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.0"/>
      <stop offset="48%" stop-color="#2b2721" stop-opacity="0.14"/>
      <stop offset="50%" stop-color="#1a1714" stop-opacity="0.24"/>
      <stop offset="52%" stop-color="#2b2721" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.0"/>
    </linearGradient>
    <filter id="inkRough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>

  <!-- Open sketchbook spread background (1760 x 1240) -->
  <rect x="0" y="0" width="1760" height="1240" fill="url(#paperGrad)"/>

  <!-- Paper borders & deckle edges -->
  <rect x="40" y="40" width="1680" height="1160" fill="none" stroke="${style.ink}" stroke-opacity="0.12" stroke-width="1.5" stroke-dasharray="8 6"/>
  <rect x="52" y="52" width="1656" height="1136" fill="none" stroke="${style.ink}" stroke-opacity="0.06" stroke-width="1"/>

  <!-- Center binding gutter crease -->
  <rect x="850" y="0" width="60" height="1240" fill="url(#crease)"/>

  <!-- ================= LEFT PAGE: Editorial Field Notes & Archival Metadata ================= -->
  <g id="left-page" transform="translate(100, 110)">
    <!-- Chapter & Plate header -->
    <text x="0" y="40" font-family="'Instrument Serif', Georgia, serif" font-size="18" letter-spacing="4" fill="${style.ink}" opacity="0.6">CHAPTER ${String(lm.chapterNumber).padStart(2, '0')} • PLATE ${String(lm.plateNumber).padStart(3, '0')}</text>
    <text x="0" y="95" font-family="'Instrument Serif', Georgia, serif" font-size="52" font-weight="400" fill="${style.ink}" letter-spacing="-0.5">${lm.title}</text>
    <text x="0" y="132" font-family="'Newsreader', Georgia, serif" font-style="italic" font-size="24" fill="${style.accent}">${lm.place}, ${lm.country}</text>

    <!-- Decorative divider line -->
    <line x1="0" y1="165" x2="620" y2="165" stroke="${style.ink}" stroke-opacity="0.18" stroke-width="1.2"/>
    <circle cx="310" cy="165" r="3.5" fill="${style.accent}"/>

    <!-- Subject & Coordinates block -->
    <rect x="0" y="195" width="620" height="85" rx="4" fill="${style.wash}" fill-opacity="0.6" stroke="${style.ink}" stroke-opacity="0.12"/>
    <text x="24" y="230" font-family="'Instrument Serif', Georgia, serif" font-size="14" letter-spacing="2" fill="${style.ink}" opacity="0.7">CLASSIFICATION</text>
    <text x="24" y="258" font-family="'Newsreader', Georgia, serif" font-size="18" font-weight="600" fill="${style.ink}">${lm.subjectClassification}</text>

    <text x="340" y="230" font-family="'Instrument Serif', Georgia, serif" font-size="14" letter-spacing="2" fill="${style.ink}" opacity="0.7">COORDINATES</text>
    <text x="340" y="258" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${style.ink}">${lm.coordinates}</text>

    <!-- Editorial Travel Notes (Paragraph) -->
    <text x="0" y="340" font-family="'Instrument Serif', Georgia, serif" font-size="16" letter-spacing="3" fill="${style.accent}" opacity="0.9">TRAVEL JOURNAL NOTES</text>
    <foreignObject x="0" y="360" width="620" height="260">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Newsreader', Georgia, serif; font-size: 21px; line-height: 1.62; color: ${style.ink}; text-align: justify;">
        “${lm.description}”
      </div>
    </foreignObject>

    <!-- Architectural & Cultural Observation -->
    <g transform="translate(0, 620)">
      <line x1="0" y1="0" x2="620" y2="0" stroke="${style.ink}" stroke-opacity="0.15" stroke-dasharray="3 3"/>
      <text x="0" y="32" font-family="'Instrument Serif', Georgia, serif" font-size="15" letter-spacing="2.5" fill="${style.ink}" opacity="0.75">FIELD CURATOR ANNOTATION</text>
      <foreignObject x="0" y="48" width="620" height="150">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 18px; line-height: 1.55; color: ${style.ink}; opacity: 0.88;">
          ${lm.culturalNotes}
        </div>
      </foreignObject>
    </g>

    <!-- Botanical study label & Archival Seal -->
    <g transform="translate(0, 860)">
      <circle cx="60" cy="55" r="45" fill="none" stroke="${style.accent}" stroke-width="1.8" stroke-opacity="0.6"/>
      <circle cx="60" cy="55" r="40" fill="none" stroke="${style.accent}" stroke-width="0.8" stroke-dasharray="4 2" stroke-opacity="0.5"/>
      <text x="60" y="52" text-anchor="middle" font-family="'Instrument Serif', serif" font-size="11" letter-spacing="1" fill="${style.accent}">${lm.countryCode}</text>
      <text x="60" y="66" text-anchor="middle" font-family="'Newsreader', serif" font-size="10" font-weight="600" fill="${style.accent}">${String(lm.plateNumber).padStart(3, '0')}</text>

      <text x="130" y="44" font-family="'Newsreader', Georgia, serif" font-style="italic" font-size="16" fill="${style.ink}">Botanical specimen: ${style.botany}</text>
      <text x="130" y="70" font-family="'Instrument Serif', Georgia, serif" font-size="13" letter-spacing="3" fill="${style.ink}" opacity="0.6">${style.seal}</text>
    </g>
  </g>

  <!-- ================= RIGHT PAGE: Hand-Drawn Architectural & Watercolor Illustration ================= -->
  <g id="right-page" transform="translate(940, 90)">
    <!-- Decorative border framing the illustration -->
    <rect x="0" y="0" width="720" height="1060" fill="none" stroke="${style.ink}" stroke-opacity="0.16" stroke-width="1.2"/>
    <rect x="10" y="10" width="700" height="1040" fill="none" stroke="${style.ink}" stroke-opacity="0.08" stroke-width="0.8"/>

    <!-- Watercolor wash sky & atmosphere behind drawing -->
    <rect x="18" y="18" width="684" height="640" rx="2" fill="url(#washGrad)" opacity="0.85"/>

    <!-- Organic watercolor spots / blooms -->
    <ellipse cx="280" cy="220" rx="240" ry="160" fill="${style.accent}" fill-opacity="0.12" filter="url(#inkRough)"/>
    <ellipse cx="480" cy="360" rx="190" ry="140" fill="${style.secondary}" fill-opacity="0.15" filter="url(#inkRough)"/>
    <ellipse cx="200" cy="520" rx="160" ry="110" fill="${style.accent}" fill-opacity="0.08" filter="url(#inkRough)"/>

    <!-- Dynamic Architectural Drawing Elements according to landmark type -->
    <g id="drawing" filter="url(#inkRough)" stroke="${style.ink}" stroke-linecap="round" stroke-linejoin="round">
      ${isBridge ? `
        <!-- Bridge Silhouette -->
        <path d="M 40,680 Q 200,640 360,630 Q 520,640 680,680" fill="none" stroke-width="4.5"/>
        <path d="M 40,710 L 680,710" fill="none" stroke-width="2.5"/>
        <!-- Towers / Piers -->
        <rect x="190" y="320" width="65" height="390" fill="${style.wash}" fill-opacity="0.85" stroke-width="2.2"/>
        <rect x="465" y="320" width="65" height="390" fill="${style.wash}" fill-opacity="0.85" stroke-width="2.2"/>
        <!-- Arches and Gothic Windows -->
        <path d="M 205,480 Q 222,430 240,480 Z" fill="${style.secondary}" fill-opacity="0.3" stroke-width="1.5"/>
        <path d="M 480,480 Q 497,430 515,480 Z" fill="${style.secondary}" fill-opacity="0.3" stroke-width="1.5"/>
        <!-- Suspension Cables -->
        <path d="M 50,440 Q 222,320 360,540 Q 497,320 670,440" fill="none" stroke-width="2.2" stroke-dasharray="1 0"/>
        <!-- Vertical Stays -->
        ${Array.from({length: 18}).map((_, i) => `<line x1="${80 + i * 32}" y1="${440 + Math.abs(i - 9) * 12}" x2="${80 + i * 32}" y2="690" stroke-width="0.9" opacity="0.7"/>`).join('')}
      ` : isDome ? `
        <!-- Classical / Sacred Dome & Spires -->
        <!-- Ground & Portico Steps -->
        <path d="M 60,820 L 660,820 M 80,835 L 640,835 M 100,850 L 620,850" stroke-width="2"/>
        <!-- Main Rotunda / Core -->
        <rect x="160" y="460" width="400" height="360" fill="${style.wash}" fill-opacity="0.9" stroke-width="2.5"/>
        <!-- Portico Columns -->
        ${Array.from({length: 8}).map((_, i) => `<rect x="${180 + i * 48}" y="540" width="22" height="280" fill="${style.wash}" stroke-width="1.4"/>`).join('')}
        <polygon points="170,540 360,460 550,540" fill="${style.wash}" stroke-width="2.2"/>
        <!-- Great Dome -->
        <path d="M 210,460 C 210,260 510,260 510,460 Z" fill="${style.accent}" fill-opacity="0.18" stroke-width="3.2"/>
        <!-- Ribs -->
        <path d="M 360,260 L 360,460" stroke-width="1.8"/>
        <path d="M 360,260 Q 280,330 260,460" stroke-width="1.4"/>
        <path d="M 360,260 Q 440,330 460,460" stroke-width="1.4"/>
        <!-- Lantern / Spire -->
        <rect x="345" y="220" width="30" height="40" fill="${style.wash}" stroke-width="1.5"/>
        <line x1="360" y1="180" x2="360" y2="220" stroke-width="2.5"/>
        <circle cx="360" cy="180" r="4.5" fill="${style.accent}"/>
        <!-- Flanking Minarets or Campaniles -->
        <rect x="100" y="300" width="32" height="520" fill="${style.wash}" stroke-width="1.8"/>
        <polygon points="100,300 116,220 132,300" fill="${style.secondary}" fill-opacity="0.4" stroke-width="1.5"/>
        <rect x="588" y="300" width="32" height="520" fill="${style.wash}" stroke-width="1.8"/>
        <polygon points="588,300 604,220 620,300" fill="${style.secondary}" fill-opacity="0.4" stroke-width="1.5"/>
      ` : isTower ? `
        <!-- Vertical Tower Structure -->
        <rect x="300" y="160" width="120" height="660" fill="${style.wash}" fill-opacity="0.9" stroke-width="2.5"/>
        <!-- Tower levels -->
        <line x1="280" y1="340" x2="440" y2="340" stroke-width="2.2"/>
        <line x1="270" y1="520" x2="450" y2="520" stroke-width="2.2"/>
        <line x1="260" y1="700" x2="460" y2="700" stroke-width="2.2"/>
        <!-- Cross bracing / windows -->
        ${Array.from({length: 8}).map((_, i) => `
          <line x1="305" y1="${180 + i * 80}" x2="415" y2="${240 + i * 80}" stroke-width="1.1" stroke-opacity="0.7"/>
          <line x1="415" y1="${180 + i * 80}" x2="305" y2="${240 + i * 80}" stroke-width="1.1" stroke-opacity="0.7"/>
        `).join('')}
        <!-- Spire Top -->
        <polygon points="300,160 360,60 420,160" fill="${style.accent}" fill-opacity="0.3" stroke-width="2.2"/>
        <line x1="360" y1="20" x2="360" y2="60" stroke-width="3"/>
        <circle cx="360" cy="20" r="5" fill="${style.accent}"/>
        <!-- Base structure -->
        <polygon points="220,820 500,820 440,700 280,700" fill="${style.wash}" stroke-width="2.2"/>
      ` : `
        <!-- Natural Landscape / Mountain / Geological Ridge -->
        <!-- Background Mountain Contours -->
        <path d="M 40,680 Q 220,380 360,240 Q 500,380 680,680" fill="${style.accent}" fill-opacity="0.16" stroke-width="2.8"/>
        <path d="M 120,700 Q 280,480 360,340 Q 440,480 600,700" fill="none" stroke-width="1.8" stroke-dasharray="6 3"/>
        <!-- Foreground Ridges -->
        <path d="M 20,780 Q 200,620 380,690 Q 540,580 700,760" fill="${style.secondary}" fill-opacity="0.22" stroke-width="2.4"/>
        <path d="M 0,860 Q 240,740 480,820 Q 620,760 720,880" fill="${style.wash}" fill-opacity="0.9" stroke-width="2.4"/>
        <!-- Water reflection / valley floor -->
        <path d="M 40,940 C 240,910 480,950 680,920 M 60,970 C 260,950 460,980 660,960" stroke-width="1.5" stroke-opacity="0.5"/>
        <!-- Alpine pines / vegetation marks -->
        ${Array.from({length: 14}).map((_, i) => `
          <polygon points="${100 + i * 38},780 ${106 + i * 38},740 ${112 + i * 38},780" fill="${style.secondary}" stroke-width="1"/>
        `).join('')}
      `}

      <!-- Universal Hatching, Stone Texture, and Shading Lines -->
      ${Array.from({length: 22}).map((_, i) => `
        <line x1="${160 + (i % 6) * 70}" y1="${600 + Math.floor(i / 6) * 55}" x2="${195 + (i % 6) * 70}" y2="${625 + Math.floor(i / 6) * 55}" stroke-width="0.8" opacity="0.45"/>
      `).join('')}
    </g>

    <!-- Field Measure & Elevation Annotation Marks -->
    <g transform="translate(40, 880)">
      <line x1="0" y1="0" x2="640" y2="0" stroke="${style.ink}" stroke-opacity="0.25"/>
      <line x1="0" y1="-8" x2="0" y2="8" stroke="${style.ink}" stroke-opacity="0.4"/>
      <line x1="640" y1="-8" x2="640" y2="8" stroke="${style.ink}" stroke-opacity="0.4"/>
      <text x="320" y="-8" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-style="italic" font-size="14" fill="${style.ink}" opacity="0.75">Elevation study • Scale 1:2500 • Field observations in graphite & watercolor</text>
    </g>

    <!-- Caption on Illustration -->
    <g transform="translate(40, 940)">
      <text x="0" y="30" font-family="'Instrument Serif', Georgia, serif" font-size="32" fill="${style.ink}">${lm.title}</text>
      <text x="0" y="60" font-family="'Newsreader', Georgia, serif" font-size="16" fill="${style.accent}">Plate ${String(lm.plateNumber).padStart(3, '0')} — ${lm.country.toUpperCase()}</text>
      <text x="640" y="60" text-anchor="end" font-family="'Instrument Serif', Georgia, serif" font-size="14" letter-spacing="2" fill="${style.ink}" opacity="0.55">${lm.coordinates}</text>
    </g>
  </g>
</svg>`;

  fs.writeFileSync(outPath, svgContent, 'utf8');
  platesCount++;
}

console.log('Successfully generated', platesCount, 'curated SVG plates in', platesDir);

