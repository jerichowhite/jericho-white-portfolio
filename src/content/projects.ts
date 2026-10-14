// ─────────────────────────────────────────────────────────────
// Everything on the site comes from this file.
//
// To add a new project:
//   1. Put the photos in raw/<slug>/ and run `npm run images`
//   2. Copy one of the entries below, give it the same <slug>,
//      and fill in the words. Leave out anything you don't have.
//   3. Order on the desk = order in this list.
// ─────────────────────────────────────────────────────────────

export type Credit = { name: string; role: string };

export type Video =
  | { kind: 'youtube'; id: string; title?: string }
  | { kind: 'file'; src: string; poster?: string; title?: string };

export type Project = {
  slug: string;
  title: string;
  /** Short line under the title, e.g. "Fashion editorial" */
  type: string;
  year?: string;
  place?: string;
  /** What Jericho did on this project, in plain words */
  role: string;
  summary: string;
  /** Optional "look and feel" notes shown on the project page */
  look?: string;
  /** File name in public/work/<slug>/ used on the folder and desk */
  cover?: string;
  /** Pick a few frames to show first; the rest follow automatically */
  featured?: string[];
  videos?: Video[];
  /** Loose clips that play muted on loop in the gallery */
  clips?: string[];
  credits?: Credit[];
};

const jericho = 'Jericho White';
const mark = { name: 'Mark White', role: 'Creative direction' };
const haris = { name: 'Haris White', role: 'Production manager' };

export const projects: Project[] = [
  {
    slug: 'shoot-03-04',
    title: 'Sunday Best',
    type: 'Fashion editorial',
    year: '2026',
    place: 'Nigeria',
    role: 'Photography, lighting and edit',
    summary:
      'A styled group story built on ties, headscarves, polka dots and borrowed tailoring. Four friends, one field, dressed like they had somewhere important to be.',
    cover: 'dsc02806.jpg',
    featured: ['dsc02806.jpg', 'dsc02845.jpg', 'dsc02834.jpg'],
    credits: [
      { name: jericho, role: 'Photography, lighting, edit' },
      { name: 'Dotimi', role: 'Model and stylist' },
      { name: 'Rhunor', role: 'Model' },
      { name: 'Sharon', role: 'Model' },
      { name: 'Dozie', role: 'Model' },
      mark,
      haris,
    ],
  },
  {
    slug: 'shoot-05',
    title: 'Corduroy',
    type: 'Portrait series',
    year: '2026',
    place: 'Nigeria',
    role: 'Photography, lighting and edit',
    summary:
      'Soft afternoon light, open grass and a cream corduroy jacket passed between six people. Shot as a series of quiet, unposed portraits.',
    cover: 'dsc04044.jpg',
    featured: ['dsc04044.jpg', 'dsc04031.jpg', 'dsc04104.jpg', 'dsc04052.jpg'],
    credits: [
      { name: jericho, role: 'Photography, lighting, edit' },
      { name: 'Dotimi', role: 'Model and stylist' },
      { name: 'Dozie', role: 'Model' },
      { name: 'Peter (Yuki)', role: 'Model' },
      { name: 'Divine', role: 'Model' },
      { name: 'Blessed', role: 'Model' },
      { name: 'Nore', role: 'Model' },
      mark,
      haris,
    ],
  },
  {
    slug: 'sharon',
    title: 'Sharon',
    type: 'Editorial portraits',
    year: '2026',
    place: 'Nigeria',
    role: 'Photography and edit',
    summary:
      'A one-model editorial in warm sepia: ribbon collars, a corset belt and an old tree for a set. Toned to feel like a found photograph.',
    cover: 'dsc02669.jpg',
    featured: ['dsc02607.jpg', 'dsc02669.jpg'],
    credits: [
      { name: jericho, role: 'Photography, edit' },
      { name: 'Sharon', role: 'Model' },
    ],
  },
  {
    slug: 'www',
    title: 'Worship Without Walls',
    type: 'Live concert',
    role: 'Gimbal videographer, lead photographer, photo editor and co-head of media',
    summary:
      'Worship Without Walls (WWW), a live worship concert by Blessing Ufuah. I co-led the media team, ran gimbal on the night, and shot and edited the stills.',
    videos: [{ kind: 'youtube', id: 'nLyUg_dZewM', title: 'Worship Without Walls — concert film' }],
    credits: [
      { name: 'Blessing Ufuah', role: 'Artist' },
      { name: jericho, role: 'Gimbal videographer, lead photographer, photo editor, co-head of media' },
    ],
  },
  {
    slug: 'voices',
    title: 'Voices',
    type: 'Short documentary',
    year: '2026',
    role: 'Videography and edit',
    summary:
      'A short documentary about Anita, a chef who left medicine to cook for a living. Told in her own words, from her own kitchen.',
    look:
      'Warm, close and honest. Practical and tungsten light kept soft, handheld camera tight on hands, steam and food, and a golden grade so the kitchen feels lived in. Bold yellow titles carry the energy of her cooking.',
    videos: [{ kind: 'youtube', id: 'VfjbScPK080', title: 'Voices — Anita’s Kitchen' }],
    credits: [
      { name: jericho, role: 'Videography, edit' },
      { name: 'Mark White', role: 'Creative direction' },
      { name: 'Haris White', role: 'Videography' },
    ],
  },
  {
    slug: 'mystery',
    title: 'Mystery in My Bones',
    type: 'Concert teaser',
    role: 'Videography and edit',
    summary: 'Teaser for an upcoming concert film. Full film coming soon.',
    videos: [{ kind: 'file', src: '/work/mystery/teaser.mp4', poster: '/work/mystery/poster.jpg', title: 'Mystery in My Bones — teaser' }],
    credits: [
      { name: jericho, role: 'Videography, edit' },
      { name: 'Mark White', role: 'Video editor, creative direction' },
      { name: 'Haris White', role: 'Production manager, videographer' },
    ],
  },
  {
    slug: 'bts',
    title: 'Behind the scenes',
    type: 'On set',
    role: 'Setting up, shooting, wrangling',
    summary: 'Phone snaps and clips from our shoots: lighting setups, tethering, wardrobe changes and the crew in between takes.',
  },
  {
    slug: 'design',
    title: 'Graphic design',
    type: 'Posters and artwork',
    role: 'Design',
    summary: 'Posters, covers and visual identity work made alongside the photo and film projects.',
  },
];

export const profile = {
  name: 'Jericho White',
  roles: 'Photographer and videographer',
  base: 'Toronto, from Lagos',
  bio: 'I shoot fashion, portraits and live productions, and I edit my own work. Back home I co-led a church media team: multi-camera shoots, live streams and every photo that came out of them. Now I’m in Toronto and looking to join crews as a camera operator, videographer, photo assistant or PA.',
  roles_available: ['Camera operator', 'Videographer', 'Gimbal operator', 'Photographer', 'Photo assistant', 'Production assistant', 'Photo editor'],
  cameras: ['Sony a7R V', 'Sony FX30', 'Blackmagic Pocket 6K Pro (two-camera setups)', 'Canon bodies'],
  lighting: ['Godox strobes', 'Hard-light portrait setups', 'Practical and tungsten light for video'],
  live: ['Multi-camera event coverage', 'Live-streaming systems and hardware', 'Gimbal'],
  software: ['Photoshop', 'Lightroom Classic', 'Capture One', 'Premiere Pro', 'Live-streaming software'],
  email: 'jerichowhite28@gmail.com',
  phone: '+1 416 564 6982',
  phoneHref: 'tel:+14165646982',
  instagram: [
    { handle: '@heis.jericho', href: 'https://instagram.com/heis.jericho' },
    { handle: '@blank_studios_', href: 'https://instagram.com/blank_studios_' },
  ],
};
