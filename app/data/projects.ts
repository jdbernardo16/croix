export type Sector = 'Heritage' | 'Hospitality' | 'Transport' | 'Workplace' | 'Retail & Dining'

export type PlateTone = 'bronze' | 'night' | 'alloy' | 'steel'

export type ProjectImage = {
  src: string
  alt: string
  caption?: string
}

export type Project = {
  slug: string
  name: string
  location: string
  sector: Sector
  collaborator?: string
  scope: string
  summary: string
  context: string
  approach: string
  image?: string
  imageAlt?: string
  imagePosition?: 'center' | 'bottom'
  gallery?: ProjectImage[]
  plate: PlateTone
  services: string[]
  featured?: boolean
}

export const sectors: Sector[] = [
  'Heritage',
  'Hospitality',
  'Transport',
  'Workplace',
  'Retail & Dining',
]

export const projects: Project[] = [
  {
    slug: 'cultural-center-philippines',
    name: 'Cultural Center of the Philippines',
    location: 'Manila, Philippines',
    sector: 'Heritage',
    scope: 'Exterior + interior lighting design, testing, and fixture selection',
    summary:
      'Honouring and highlighting an iconic national landmark through complete exterior and interior lighting design, testing, and fixture selection.',
    context:
      'The Cultural Center of the Philippines is one of the country’s most recognisable civic buildings. The commission covered the full exterior and interior lighting scope, with testing and fixture selection included rather than left to a separate supplier.',
    approach:
      'Heritage work begins with restraint: the light should reveal the building’s fabric and proportion, not compete with it. The scope combined exterior façade studies, interior lighting design, on-site testing, and a fixture selection process documented for approval and handover.',
    image: '/img/projects/ccp-ext.jpg',
    imageAlt: 'Cultural Center of the Philippines exterior lighting study',
    gallery: [
      {
        src: '/img/projects/ccp-int.jpg',
        alt: 'Cultural Center of the Philippines interior lighting render',
        caption: 'Interior lighting study — main lobby',
      },
      {
        src: '/img/projects/ccp-int-false.jpg',
        alt: 'DIALux false-colour illuminance map of the CCP lobby',
        caption: 'DIALux evo — false-colour illuminance verification',
      },
      {
        src: '/img/projects/ccp-ext-false.jpg',
        alt: 'DIALux false-colour exterior lighting study of the CCP',
        caption: 'Exterior illuminance study — facade and forecourt',
      },
    ],
    plate: 'bronze',
    services: [
      'Exterior lighting design',
      'Interior lighting design',
      'On-site testing',
      'Fixture selection',
      'Photometric verification',
    ],
    featured: true,
  },
  {
    slug: 'nscr-malolos-clark',
    name: 'North–South Commuter Railway, Malolos–Clark CP N-03',
    location: 'Central Luzon, Philippines',
    sector: 'Transport',
    scope: 'Station, platform, building façade, and road lighting',
    summary:
      'Designing safe, reliable station, platform, building façade, and road lighting for a major national train network.',
    context:
      'The North–South Commuter Railway is a national transport programme. The lighting scope covered the passenger-facing environments — stations, platforms, façades — as well as the roads that connect them.',
    approach:
      'Transport lighting is a life-safety system as much as a design one. Illuminance, uniformity, emergency egress, glare, and maintainability drive the layout; the visual result follows from those constraints rather than fighting them.',
    image: '/img/projects/nscr.jpg',
    imageAlt: 'North–South Commuter Railway station lighting render',
    imagePosition: 'bottom',
    gallery: [
      {
        src: '/img/projects/nscr-false.jpg',
        alt: 'DIALux false-colour illuminance study of the NSCR station',
        caption: 'DIALux evo — station and platform illuminance study',
      },
    ],
    plate: 'steel',
    services: [
      'Station lighting',
      'Platform lighting',
      'Building façade lighting',
      'Road lighting',
      'Photometric verification',
    ],
    featured: true,
  },
  {
    slug: 'arena-di-verona',
    name: 'Arena di Verona',
    location: 'Verona, Italy',
    sector: 'Heritage',
    collaborator: 'Voltaire Light Design',
    scope: 'Architectural lighting design for an ancient Roman amphitheatre',
    summary:
      'Lighting one of Italy’s most treasured ancient Roman amphitheaters with care and drama.',
    context:
      'The Arena di Verona is a working opera house and a fragile Roman monument. The lighting had to serve performance, visitors, and the preservation of the original stone.',
    approach:
      'The design balances drama with conservation: controlled beams, warm colour temperatures, and careful aiming keep the light on the architecture rather than in the sky. The work was developed in collaboration with Voltaire Light Design.',
    plate: 'bronze',
    services: [
      'Architectural lighting design',
      'Heritage collaboration',
      'Beam and glare studies',
      'Fixture specification',
    ],
    featured: true,
  },
  {
    slug: 'habitats-alula',
    name: 'Our Habitas AlUla',
    location: 'AlUla, Saudi Arabia',
    sector: 'Hospitality',
    collaborator: 'Voltaire Light Design',
    scope: 'Nighttime atmosphere and lighting design for a desert resort',
    summary:
      'Creating an intimate, star-friendly nighttime atmosphere for a world-famous desert sanctuary.',
    context:
      'Our Habitas AlUla sits in a desert landscape where the night sky is part of the guest experience. The lighting had to support hospitality, wayfinding, and the character of the terrain without washing out the stars.',
    approach:
      'The scheme works in the low end of the lighting range: warm, low-glare sources; careful shielding; and a hierarchy that lets the desert recede into darkness. The work was developed in collaboration with Voltaire Light Design.',
    plate: 'night',
    services: [
      'Hospitality lighting design',
      'Nighttime atmosphere',
      'Dark-sky strategy',
      'Exterior wayfinding',
    ],
    featured: true,
  },
  {
    slug: 'benetton-headquarters',
    name: 'Benetton Group Headquarters',
    location: 'Treviso, Italy',
    sector: 'Workplace',
    collaborator: 'Voltaire Light Design',
    scope: 'Workplace and architectural lighting',
    summary:
      'Delivering clean, modern workplace and architectural lighting for a global fashion icon.',
    context:
      'The Benetton headquarters in Treviso is a workplace and a brand environment. The lighting needed to support long occupancy, visual comfort, and the clarity of the architecture.',
    approach:
      'Workplace lighting balances vertical illuminance, glare control, and control zoning. The design keeps the ceiling legible, gives the interior a calm rhythm, and allows the lighting to shift with the working day. The work was developed in collaboration with Voltaire Light Design.',
    plate: 'alloy',
    services: [
      'Workplace lighting',
      'Architectural lighting',
      'Control zoning',
      'Fixture specification',
    ],
  },
  {
    slug: 'aldrovandi-sheraton-spa',
    name: 'Hotel Aldrovandi & Sheraton Spa',
    location: 'Rome & Como, Italy',
    sector: 'Hospitality',
    collaborator: 'In-visible lab',
    scope: 'Hotel and spa lighting design',
    summary:
      'Shaping calm, restorative hotel and spa environments in two of Italy’s most famous destinations.',
    context:
      'Two hospitality settings, two different atmospheres: a city hotel in Rome and a spa in Como. Both depend on lighting that lowers the visual temperature and makes the guest experience feel unhurried.',
    approach:
      'The design uses layered, low-glare light: warm pools of illumination, soft vertical washes, and scenes that transition from arrival to rest. The work was developed in collaboration with In-visible lab.',
    plate: 'steel',
    services: [
      'Hotel lighting design',
      'Spa lighting design',
      'Scene programming',
      'Fixture specification',
    ],
  },
  {
    slug: 'jw-marriott-jeju',
    name: 'JW Marriott Hotel, Jeju Island',
    location: 'Jeju Island, South Korea',
    sector: 'Hospitality',
    collaborator: 'Sergio Boccia Lighting Design',
    scope: 'Specialist lighting design review',
    summary:
      'Elevating luxury guest experiences through specialist lighting design review alongside Sergio Boccia Lighting Design.',
    context:
      'A luxury resort project with an established design team. CROIX’s role was a specialist lighting design review rather than a full turnkey appointment.',
    approach:
      'The review focused on the guest-facing lighting layers: arrival, lobby, dining, and spa. The aim was to protect the design intent, check glare and colour consistency, and give the lighting team a clear set of decisions to carry into documentation.',
    plate: 'night',
    services: [
      'Lighting design review',
      'Hospitality lighting',
      'Glare and colour review',
      'Design team coordination',
    ],
  },
  {
    slug: 'signature-retail-dining',
    name: 'Signature Retail & Dining',
    location: 'Taguig, Philippines',
    sector: 'Retail & Dining',
    scope: 'Turnkey lighting design for IAI Restaurant, SMEG, and Mobelhaus showrooms',
    summary:
      'Complete turnkey lighting design for IAI Restaurant in BGC, SMEG Showrooms, and Mobelhaus Showrooms.',
    context:
      'A cluster of retail and dining environments in Taguig, each with a different product story: food, appliances, and furniture. The scope was turnkey lighting design across the group.',
    approach:
      'Retail lighting is merchandising: beam angles, contrast, and colour rendering are tuned to the product and the material. Dining adds another layer — the room has to feel good before the food arrives. The work was delivered as a single turnkey scope across the venues.',
    plate: 'bronze',
    services: [
      'Restaurant lighting',
      'Showroom lighting',
      'Turnkey design',
      'Fixture specification',
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function relatedProjects(slug: string, count = 3) {
  const current = getProject(slug)
  if (!current) return projects.slice(0, count)

  const sameSector = projects.filter(
    (project) => project.slug !== slug && project.sector === current.sector,
  )
  const others = projects.filter(
    (project) => project.slug !== slug && project.sector !== current.sector,
  )

  return [...sameSector, ...others].slice(0, count)
}
