export const SCENES = [
  {
    id: 'origin',
    title: 'Origin',
    eyebrow: '01 — Departure',
    caption: 'Origin pickup with full chain-of-custody from the depot.',
  },
  {
    id: 'ground',
    title: 'Ground',
    eyebrow: '02 — On the move',
    caption: 'Cross-border ground operations with real-time telemetry.',
  },
  {
    id: 'lift',
    title: 'Lift',
    eyebrow: '03 — Ascent',
    caption: 'Synchronised handoff from depot to airframe.',
  },
  {
    id: 'cruise',
    title: 'Cruise',
    eyebrow: '04 — Air',
    caption: 'Same-week intercontinental cargo from Tokyo, Doha and Liège.',
  },
  {
    id: 'descent',
    title: 'Descent',
    eyebrow: '05 — Through',
    caption: 'Coordinated descent and customs clearance.',
  },
  {
    id: 'crossing',
    title: 'Crossing',
    eyebrow: '06 — Maritime',
    caption: 'Priority berth handling on Trans-Pacific corridors.',
  },
  {
    id: 'arrival',
    title: 'Delivered',
    eyebrow: '07 — Arrival',
    caption: 'Documented delivery, audited at every signature.',
  },
] as const;

export const SCENE_COUNT = SCENES.length;

export const PRIMARY_NAV = [
  {
    id: 'services',
    label: 'Services',
    items: [
      { id: 'capabilities', label: 'Transport Maritime — FCL & LCL', href: '#capabilities' },
      { id: 'capabilities', label: 'Transport Routier — National & Int.', href: '#capabilities' },
      { id: 'capabilities', label: 'Transport Aérien Express', href: '#capabilities' },
      { id: 'capabilities', label: 'Transit & Dédouanement', href: '#capabilities' },
      { id: 'capabilities', label: 'Supply Chain & Multimodal', href: '#capabilities' },
      { id: 'capabilities', label: 'Suivi & Conseil', href: '#capabilities' },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      { id: 'industries', label: 'Pharmaceutical', href: '#industries' },
      { id: 'industries', label: 'Fine Art',       href: '#industries' },
      { id: 'industries', label: 'Aerospace',      href: '#industries' },
      { id: 'industries', label: 'Automotive',     href: '#industries' },
      { id: 'industries', label: 'Fashion & Wine', href: '#industries' },
      { id: 'industries', label: 'Energy & Tech',  href: '#industries' },
    ],
  },
  { id: 'routes',     label: 'Network',  href: '#routes'     },
  { id: 'process',    label: 'Process',  href: '#process'    },
  { id: 'manifesto',  label: 'Approach', href: '#manifesto'  },
];

export const UTILITY_LINKS = [
  { label: 'Investor relations', href: '#' },
  { label: 'Press room',         href: '#' },
  { label: 'Careers',            href: '#' },
  { label: 'ESG report',         href: '#' },
];

export const LOCALES = ['EN', 'FR', 'DE', 'JP', 'AR'];
export const REGIONS = ['Global', 'Americas', 'EMEA', 'APAC', 'MENA'];

export const BRAND = {
  name: 'Ocean Link',
  full: 'Ocean Link Global',
  suffix: 'Global',
  tagline: 'Integrated logistics. Sea. Sky. Ground.',
  promise:
    'A global logistics provider operating maritime, air and ground corridors across 47 countries.',
  founded: 2018,
  hq: 'Maroc · Hub Atlantique–Méditerranéen',
  copy: 'Ocean Link Global — All rights reserved.',
  email: 'info@oceanlink-global.com',
  phone: '+212 663 446 665',
  phoneRaw: '+212663446665',
  address: '33 Avenue Hassan Sghir, 1st floor – Appt 17',
  country: 'Maroc',
} as const;

export const FOOTER_COLUMNS = [
  {
    heading: 'Services',
    links: [
      { label: 'FCL — Full Container Load',  href: '#capabilities' },
      { label: 'LCL — Groupage maritime',    href: '#capabilities' },
      { label: 'Transport Routier National', href: '#capabilities' },
      { label: 'Transport Routier International', href: '#capabilities' },
      { label: 'Transport Aérien Express',   href: '#capabilities' },
      { label: 'Transit & Dédouanement',     href: '#capabilities' },
      { label: 'Customs Brokerage',          href: '#capabilities' },
      { label: 'Import / Export',            href: '#capabilities' },
      { label: 'Logistique Internationale',  href: '#capabilities' },
      { label: 'Supply Chain Management',    href: '#capabilities' },
      { label: 'Door-to-Door Shipping',      href: '#capabilities' },
      { label: 'Tracking & Suivi',           href: '#capabilities' },
      { label: 'Solutions Multimodales',     href: '#capabilities' },
      { label: 'Consultation Logistique',    href: '#capabilities' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Pharmaceutical', href: '#industries' },
      { label: 'Fine Art',       href: '#industries' },
      { label: 'Aerospace',      href: '#industries' },
      { label: 'Automotive',     href: '#industries' },
      { label: 'Fashion & Retail', href: '#industries' },
      { label: 'Energy',         href: '#industries' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Ocean Link',   href: '#manifesto' },
      { label: 'Leadership',         href: '#' },
      { label: 'Press room',         href: '#' },
      { label: 'Careers',            href: '#' },
      { label: 'Newsroom',           href: '#' },
      { label: 'Investor relations', href: '#' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'info@oceanlink-global.com', href: 'mailto:info@oceanlink-global.com' },
      { label: '+212 663 446 665',          href: 'tel:+212663446665' },
      { label: '33 Av. Hassan Sghir',       href: '#contact' },
      { label: '1ᵉʳ étage — Appt 17',      href: '#contact' },
      { label: 'Maroc',                    href: '#contact' },
      { label: 'Ouvrir une route',         href: '#open-route' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms & conditions', href: '#' },
      { label: 'Privacy notice',     href: '#' },
      { label: 'Cookie policy',      href: '#' },
      { label: 'Modern slavery',     href: '#' },
      { label: 'Anti-bribery',       href: '#' },
      { label: 'Whistleblowing',     href: '#' },
    ],
  },
];

export const REGIONAL_OFFICES = [
  {
    city: 'Maroc',
    role: 'Siège social — Headquarters',
    address: '33 Avenue Hassan Sghir, 1ᵉʳ étage — Appt 17',
    phone: '+212 663 446 665',
    phoneRaw: '+212663446665',
    email: 'info@oceanlink-global.com',
    primary: true,
  },
];

export const CERTIFICATIONS = [
  { code: 'IMO',        body: 'International Maritime Organisation' },
  { code: 'IATA',       body: 'CASS-accredited cargo agent' },
  { code: 'AEO',        body: 'Authorised Economic Operator' },
  { code: 'ISO 27001',  body: 'Information security' },
  { code: 'ISO 14001',  body: 'Environmental management' },
  { code: 'SOC 2',      body: 'Type II audited' },
  { code: 'C-TPAT',     body: 'Customs-Trade Partnership' },
  { code: 'TAPA FSR',   body: 'Cargo security A-rated' },
];

export const FRAME_PATH = '/frames';
export const FRAME_COUNT = 180;
export const FRAME_EXT = 'webp';
