export type TeamMember = {
  slug: string
  name: string
  shortName: string
  role: string
  location: string
  portrait: string
  partner?: boolean
  bio: string[]
  focus: string[]
  projects?: string[]
}

export const team: TeamMember[] = [
  {
    slug: 'jonathan-dela-cruz',
    name: 'Jonathan “Balong” Dela Cruz',
    shortName: 'Jonathan Dela Cruz',
    role: 'President and Founder',
    location: 'Manila',
    portrait: '/img/team/jonathan.jpg',
    bio: [
      'Jonathan establishes the corporate strategy, international partnerships, global supplier networks, and business operations of CROIX. Trained in business since childhood and educated in architecture at the University of Santo Tomas, he brings executive experience in luminaire manufacturing, lamp distribution, and optical engineering.',
      'From the primary engineering hub in Metro Manila, he governs turnkey project delivery and studio production for property developers, architects, and contractors worldwide. Because the studio operates independently of fixture manufacturers, he enforces unbiased procurement policies, value-engineering standards, and equipment budget controls across every engagement.',
      'Outside the studio, he is an active member of the Philippine Native Tree Enthusiasts (PNTE), studying, conserving, and promoting native trees across the Philippines. His conservation research in forest and coastal ecosystems guides CROIX’s commitment to human visual comfort and the protection of the nocturnal environment.',
    ],
    focus: ['Strategy & partnerships', 'Turnkey delivery', 'Unbiased procurement', 'Optical engineering'],
  },
  {
    slug: 'charmaine-javier-fornarelli',
    name: 'Ar. Charmaine “Ming” Javier-Fornarelli',
    shortName: 'Charmaine Javier-Fornarelli',
    role: 'Principal Lighting Designer',
    location: 'Milan',
    portrait: '/img/team/charmaine.jpg',
    bio: [
      'Charmaine directs the global design division from Milan, serving as Principal Lighting Designer of CROIX and Founder of its Italian sister practice, LUMEA Collective. A licensed architect with a Master’s Degree in Lighting Design and LED Technology from Politecnico di Milano, she sets the studio’s creative and technical standards across historic landmarks, corporate headquarters, and luxury hospitality.',
      'Her portfolio includes collaborations with Voltaire Light Design on the Arena di Verona, the Benetton Group Headquarters in Treviso, and Our Habitas AlUla; with In-visible lab on Hotel Aldrovandi in Rome and the Sheraton Spa in Como; and with Sergio Boccia Lighting Design on the JW Marriott in Jeju Island.',
    ],
    focus: ['Design direction', 'Heritage & hospitality', 'LUMEA Collective', 'Milan–Manila practice'],
    projects: ['Arena di Verona', 'Benetton Group HQ', 'Our Habitas AlUla', 'Hotel Aldrovandi', 'Sheraton Spa Como', 'JW Marriott Jeju'],
  },
  {
    slug: 'vivian-gacad',
    name: 'IDr. Vivian V. Gacad, PIID',
    shortName: 'Vivian Gacad',
    role: 'Interior Designer / Procurement',
    location: 'Manila',
    portrait: '/img/team/vivian.jpg',
    partner: true,
    bio: [
      'Vivian leads interior design, custom millwork, and turnkey fit-out execution as a partner specialist and Founder of Vivian Gacad Interior Design Services. Practicing since 2000 with a Bachelor of Arts in Interior Design from Assumption College (1997) and membership in the Philippine Institute of Interior Designers, she also owns and directs a furniture and modular cabinetry manufacturing facility employing craftsmen from Pampanga.',
      'Her published portfolio has been featured in Real Living Magazine, Good Housekeeping, The Philippine Star, and Studio 23’s Welcome Home, alongside exhibition spaces for the Ayala Land Sonera “Living Space” Community Project and Samsung. She has directed hospitality, institutional, commercial, and luxury residential fit-outs including Bellaroca Island Resort in Marinduque, commercial holiday installations for six Ayala Malls branches, De La Salle Dasmariñas College of Engineering and Architecture, New Hatchin Grocerant, and private residences across Metro Manila.',
    ],
    focus: ['Interior design', 'Custom millwork', 'Procurement', 'Turnkey fit-out'],
    projects: ['Bellaroca Island Resort', 'Ayala Malls installations', 'DLSU Dasmariñas', 'New Hatchin Grocerant'],
  },
  {
    slug: 'aldrin-fernandez',
    name: 'Engr. Aldrin Fernandez',
    shortName: 'Aldrin Fernandez',
    role: 'Systems Control Engineer',
    location: 'Manila',
    portrait: '/img/team/aldrin.jpg',
    bio: [
      'Aldrin directs the studio’s control systems engineering and commissioning division, bringing over 12 years of experience in architectural lighting, façade illumination, electrical engineering, and intelligent controls. He governs system architecture, integration, and on-site commissioning across Lutron, Crestron, Philips Dynalite, DALI, DMX, iLight, and Interact Pro platforms.',
      'His commissioned portfolio includes the Cebu–Cordova Link Expressway (CCLEX) Phase 2 façade, Bangko Sentral ng Pilipinas, Hilton Manila, the Marriott Grand Ballroom, Shangri-La properties in Makati, EDSA, and Mactan, Conrad Hotel, Globe Telecom Headquarters, and St. Luke’s Medical Center.',
    ],
    focus: ['Controls architecture', 'System integration', 'On-site commissioning', 'Hospitality & infrastructure'],
    projects: ['CCLEX Phase 2', 'Bangko Sentral ng Pilipinas', 'Hilton Manila', 'Marriott Grand Ballroom', 'Shangri-La Makati / EDSA / Mactan', 'Globe Telecom HQ'],
  },
  {
    slug: 'marry-grace-benigla',
    name: 'Engr. Marry Grace Benigla, REE, SO2',
    shortName: 'Marry Grace Benigla',
    role: 'Lighting Engineer / Safety Officer',
    location: 'Manila',
    portrait: '/img/team/grace.jpg',
    bio: [
      'Grace prepares photometric calculations, electrical load schedules, and CAD layouts to ensure every studio deliverable passes local building code inspections. A Registered Electrical Engineer and certified Safety Officer, she graduated as an academic scholar and Dean’s Lister from Colegio de San Juan de Letran, earning Best Electrical Engineering Student and Best in Thesis.',
      'She presented published research on solar-powered real-time monitoring systems at the 5th International Conference on Computer Applications Technology in Fukuoka, Japan, and completed training at the Parañaque Office of the Building Official reviewing electrical plans and load schedules.',
    ],
    focus: ['Photometric calculations', 'Electrical load schedules', 'CAD documentation', 'Code & safety compliance'],
  },
]

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug)
}
