export type Audience = {
  id: string
  label: string
  title: string
  intro: string
  points: string[]
  outcome: string
}

export type ServicePackage = {
  number: string
  name: string
  shortName: string
  tagline: string
  bestFor: string
  includes: string[]
  addOns?: string[]
  note?: string
  featured?: boolean
}

export type Phase = {
  number: string
  title: string
  receive: string
  helps: string
}

export const audiences: Audience[] = [
  {
    id: 'developers',
    label: 'Owners & developers',
    title: 'Prevent budget overruns and rework.',
    intro:
      'Property owners often overpay for lighting because suppliers push expensive fixtures or specify more lights than the space requires. Poorly planned lighting also raises monthly electricity bills and causes construction delays when ceilings have to be opened up.',
    points: [
      'Test the space in 3D DIALux evo before a single fixture is purchased.',
      'Confirm brightness levels and compliance with local energy and safety rules.',
      'Get an unbiased Bill of Quantities and value-engineering estimates.',
      'Reduce over-lighting, equipment cost, and on-site change orders.',
    ],
    outcome: 'A lighting package that is specified once, priced honestly, and built without rework.',
  },
  {
    id: 'architects',
    label: 'Architects & interior designers',
    title: 'Protect design intent and material accuracy.',
    intro:
      'You spend months selecting stone, wood, and fabrics. Poorly aimed lights or inaccurate colour rendering make those materials look flat and distorted, while standard electrical layouts clutter ceilings with unnecessary fixtures and glare.',
    points: [
      'Exact beam angles, colour temperatures, and optical shielding.',
      'Custom millwork lighting details drawn inside AutoCAD and Revit.',
      'Coordination with the Milan sister studio, LUMEA Collective.',
      'Ceilings kept clean, with glare controlled before construction.',
    ],
    outcome: 'The finished building looks and functions the way it was designed — without extra drafting work.',
  },
  {
    id: 'contractors',
    label: 'Electrical contractors',
    title: 'Eliminate installation delays and control failures.',
    intro:
      'Contractors lose time and profit on site when lighting drawings lack technical detail or when control systems are incompatible with the installed fixtures.',
    points: [
      'Reflected Ceiling Plans, Single-Line Diagrams, cable schedules, and load computations.',
      'Control architecture across Lutron, Crestron, Dynalite, DALI-2, DMX512, 0–10V, and BACnet/IP.',
      'On-site fixture aiming, keypad programming, and lux verification at completion.',
      'As-built drawings and maintenance guides for a smooth handover.',
    ],
    outcome: 'A coordinated installation, a working control system, and fewer site callbacks.',
  },
  {
    id: 'suppliers',
    label: 'Suppliers & manufacturers',
    title: 'Win bids and pass compliance.',
    intro:
      'Suppliers and contractors lose competitive tenders or face rejected submittals when they lack verified photometric data to prove their proposed fixtures meet the specification.',
    points: [
      'Fast DIALux evo photometric calculations and false-colour illuminance maps.',
      'Glare compliance reports (UGR < 19) and fixture quantity checks.',
      'Code verification for North American, European, Australian, New Zealand, and Asian projects.',
      'Value-engineered substitution reviews with documented evidence.',
    ],
    outcome: 'A submittal that answers the technical questions before the reviewer asks them.',
  },
]

export const packages: ServicePackage[] = [
  {
    number: '01',
    name: 'Partner Lighting Consultant',
    shortName: 'Full turnkey',
    tagline: 'A single dedicated partner from initial concept to opening night.',
    bestFor: 'Property developers, luxury hospitality, architects, and interior designers.',
    includes: [
      'Mood and daylighting strategy',
      'Custom light-integrated millwork detailing',
      '3D DIALux evo simulations',
      'Complete AutoCAD or Autodesk Revit (BIM) lighting layouts',
      'Full lighting control system architecture',
      'Brand-neutral luminaire schedules',
      'Tender and procurement support',
      'Final on-site nighttime aiming and scene programming',
    ],
    featured: true,
  },
  {
    number: '02',
    name: 'Core Essentials',
    shortName: 'Core + add-ons',
    tagline: 'Glare-free design and accurate specifications, with lean upfront fees.',
    bestFor: 'Architects, interior designers, and commercial projects.',
    includes: [
      'Essential 2D Reflected Ceiling Plan lighting layouts',
      'Target brightness verification',
      'Complete brand-neutral luminaire specification schedule',
    ],
    addOns: [
      'Intelligent control system architecture',
      'Full 3D photometric renderings',
      'Direct Revit (BIM) integration',
      'Custom millwork detailing',
      'On-site nighttime commissioning',
    ],
  },
  {
    number: '03',
    name: 'Photometric & DIALux Verification',
    shortName: 'Verification',
    tagline: 'Fast, certified calculations when the layout already exists.',
    bestFor: 'Electrical contractors, engineers, and lighting suppliers.',
    includes: [
      'Fast-turnaround DIALux evo illuminance maps',
      'Glare compliance reports (UGR < 19)',
      'Energy code verification',
      'Fixture quantity checks',
    ],
  },
]

export const phases: Phase[] = [
  {
    number: '01',
    title: 'Concept & simulation',
    receive: '3D photometric renders, false-colour illuminance maps, and glare compliance reports (UGR < 19) in DIALux evo.',
    helps: 'Gives you and your client confidence — and a clear code path — before construction starts.',
  },
  {
    number: '02',
    title: 'Detailed plans',
    receive: 'Reflected ceiling plans, fixture placement and aiming maps, beam angles, colour temperature schedules, and custom millwork details in AutoCAD and Revit.',
    helps: 'Makes stone, wood, and fabrics look rich and vibrant while keeping ceilings clean and glare-free.',
  },
  {
    number: '03',
    title: 'Control architecture',
    receive: 'Control zoning layouts, Single-Line Diagrams, cable schedules, load computations, and system architecture for Lutron, Crestron, Dynalite, DALI-2, DMX512, 0–10V, and BACnet/IP.',
    helps: 'Turns complex multi-scene lighting into a reliable system managed from simple wall keypads.',
  },
  {
    number: '04',
    title: 'Procurement support',
    receive: 'Brand-neutral fixture schedules, exact Bill of Quantities, value-engineering cost estimates, and vetted spec sheets checked for thermal and IP ratings.',
    helps: 'Protects the budget by making sure the right lights are ordered the first time, without waste or delays.',
  },
  {
    number: '05',
    title: 'Commissioning & handover',
    receive: 'On-site nighttime light aiming, mood button programming, lux meter verification, as-built drawings, and easy operation and maintenance replacement guides.',
    helps: 'Guarantees a flawless opening night and keeps long-term upkeep simple and affordable.',
  },
]

export const platforms = [
  'Lutron',
  'Crestron',
  'Philips Dynalite',
  'DALI-2',
  'DMX512',
  '0–10V',
  'BACnet/IP',
]

export const standards = [
  'IES',
  'ASHRAE 90.1',
  'LEED',
  'NECB',
  'AS/NZS 1680',
  'AS/NZS 1158',
  'AS/NZS 2293',
  'AS/NZS 60598',
  'AS/NZS 62386',
  'EN 12464-1',
  'CIE',
  'PEC',
  'WELL',
  'DarkSky',
]
