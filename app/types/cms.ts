/**
 * Shape of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes this document to `app/data/generated/cms.json`
 * (gitignored). When it cannot reach the CMS it copies the committed
 * `app/data/fallback/content.json`, which has the same shape and points at the
 * existing `/img/...` assets.
 *
 * Image `src` values are always site-relative once the pull has run: downloaded
 * CMS images live under `/uploads/cms/`, and the fallback uses `/img/`.
 */

export type CmsImage = {
  src: string
  width: number | null
  height: number | null
  title: string | null
}

export type CmsMeta = {
  title: string | null
  description: string | null
  ogImage: CmsImage | null
}

export type CmsCta = {
  eyebrow: string | null
  title: string | null
  text: string | null
  buttonLabel: string | null
  buttonUrl: string | null
  email: string | null
  phone: string | null
}

export type CmsNavItem = {
  label: string
  url: string
  sortOrder: number
  showInFooter: boolean
}

export type CmsSiteSettings = {
  name: string | null
  tagline: string | null
  footerIntro: string | null
  email: string | null
  phone: string | null
  manilaAddress: string | null
  milanStudio: string | null
  milanCountry: string | null
  manilaCoordinates: string | null
  milanCoordinates: string | null
  edition: string | null
  copyright: string | null
  responseTime: string | null
  defaultMetaDescription: string | null
  wordmark: CmsImage | null
  lockup: CmsImage | null
  defaultOgImage: CmsImage | null
  nav: CmsNavItem[]
}

export type CmsHeroStat = {
  value: string | null
  label: string | null
}

export type CmsHero = {
  section: string | null
  eyebrow: string | null
  title: string | null
  intro: string | null
}

export type CmsPageHero = CmsHero & {
  stats: CmsHeroStat[]
}

export type CmsDisciplineCard = {
  number: string | null
  title: string | null
  body: string | null
  meta: string | null
  image: CmsImage | null
  imageAlt: string | null
}

export type CmsProofStat = {
  value: string | null
  label: string | null
  note: string | null
}

export type CmsProofStep = {
  title: string | null
  note: string | null
}

export type CmsHomePage = {
  meta: CmsMeta
  hero: {
    topBarLeft: string | null
    topBarCentre: string | null
    topBarRight: string | null
    eyebrow: string | null
    titleLine1: string | null
    titleLine2: string | null
    intro: string | null
    primaryLabel: string | null
    primaryUrl: string | null
    secondaryLabel: string | null
    secondaryUrl: string | null
    credentials: string[]
    image: CmsImage | null
    imageAlt: string | null
    badge: string | null
    plate: {
      label: string | null
      title: string | null
      meta: string | null
    }
    captionLeft: string | null
    captionRight: string | null
  }
  ticker: string[]
  disciplines: {
    eyebrow: string | null
    titleLine1: string | null
    titleLine2: string | null
    intro: string | null
    footerLeft: string | null
    footerRight: string | null
    cards: CmsDisciplineCard[]
  }
  work: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    footerNote: string | null
    footerLinkLabel: string | null
  }
  proof: {
    eyebrow: string | null
    titleLine1: string | null
    titleLine2: string | null
    intro: string | null
    image: CmsImage | null
    imageAlt: string | null
    imageBadge: string | null
    imageCaption: string | null
    imageMeta: string | null
    imageFooterLeft: string | null
    imageFooterRight: string | null
    sequenceLabel: string | null
    phaseCount: string | null
    footerNote: string | null
    footerLinkLabel: string | null
    stats: CmsProofStat[]
    steps: CmsProofStep[]
  }
  contact: {
    eyebrow: string | null
    titleLine1: string | null
    titleLine2: string | null
    intro: string | null
    email: string | null
    formLabel: string | null
    checklistTitle: string | null
    checklist: string[]
    responseLabel: string | null
    responseValue: string | null
    phoneNote: string | null
  }
  cta: CmsCta
}

export type CmsWorkPage = {
  meta: CmsMeta
  hero: CmsHero
  stats: CmsHeroStat[]
  note: {
    label: string | null
    body: string | null
  }
  cta: CmsCta
}

export type CmsGalleryImage = {
  src: string | null
  alt: string | null
  caption: string | null
  width: number | null
  height: number | null
}

export type CmsProject = {
  slug: string
  name: string
  menuTitle: string | null
  meta: CmsMeta
  location: string | null
  sector: string | null
  collaborator: string | null
  scope: string | null
  summary: string | null
  context: string | null
  approach: string | null
  image: CmsImage | null
  imageAlt: string | null
  imagePosition: 'center' | 'bottom'
  plate: string | null
  services: string[]
  featured: boolean
  sortOrder: number
  gallery: CmsGalleryImage[]
}

export type CmsAudience = {
  id: string
  label: string | null
  title: string | null
  intro: string | null
  points: string[]
  outcome: string | null
}

export type CmsServicePackage = {
  number: string | null
  name: string | null
  shortName: string | null
  tagline: string | null
  bestFor: string | null
  includes: string[]
  addOns: string[]
  featured: boolean
}

export type CmsServicePhase = {
  number: string | null
  title: string | null
  receive: string | null
  helps: string | null
}

export type CmsServicesPage = {
  meta: CmsMeta
  hero: CmsPageHero
  problem: {
    eyebrow: string | null
    title: string | null
    body: string | null
    bullets: string[]
  }
  audiences: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    items: CmsAudience[]
  }
  packages: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    items: CmsServicePackage[]
  }
  volume: {
    label: string | null
    body: string | null
    value: string | null
  }
  phases: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    items: CmsServicePhase[]
  }
  platformsLabel: string | null
  platforms: string[]
  standardsLabel: string | null
  standards: string[]
  cta: CmsCta
}

export type CmsTimelineItem = {
  label: string | null
  title: string | null
  body: string | null
}

export type CmsModelCard = {
  label: string | null
  meta: string | null
  title: string | null
  body: string | null
  points: string[]
}

export type CmsPrinciple = {
  number: string | null
  title: string | null
  body: string | null
}

export type CmsStudioPage = {
  meta: CmsMeta
  hero: CmsHero
  who: {
    eyebrow: string | null
    title: string | null
    lead: string | null
    paragraphs: string[]
    image: CmsImage | null
    imageAlt: string | null
    captionLeft: string | null
    captionRight: string | null
  }
  mission: {
    label: string | null
    title: string | null
    body: string | null
  }
  vision: {
    label: string | null
    title: string | null
    body: string | null
  }
  timeline: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    items: CmsTimelineItem[]
  }
  model: {
    eyebrow: string | null
    titleLine1: string | null
    titleLine2: string | null
    intro: string | null
    cards: CmsModelCard[]
  }
  principles: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    items: CmsPrinciple[]
  }
  standardsLabel: string | null
  standards: string[]
  cta: CmsCta
}

export type CmsTeamMember = {
  slug: string
  name: string | null
  shortName: string | null
  role: string | null
  location: string | null
  partner: boolean
  bio: string[]
  focus: string[]
  projects: string[]
  portrait: CmsImage | null
}

export type CmsBenchGroup = {
  title: string | null
  body: string | null
}

export type CmsTeamPage = {
  meta: CmsMeta
  hero: CmsPageHero
  bench: {
    label: string | null
    intro: string | null
  }
  members: CmsTeamMember[]
  widerBench: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    groups: CmsBenchGroup[]
  }
  cta: CmsCta
}

export type CmsContactStep = {
  number: string | null
  title: string | null
  body: string | null
}

export type CmsContactPage = {
  meta: CmsMeta
  hero: CmsPageHero
  supplierNote: {
    label: string | null
    body: string | null
    linkLabel: string | null
    linkUrl: string | null
  }
  steps: {
    eyebrow: string | null
    title: string | null
    intro: string | null
    items: CmsContactStep[]
  }
  cta: CmsCta
}

export type CmsLegalPage = {
  meta: CmsMeta
  hero: {
    section: string | null
    eyebrow: string | null
    title: string | null
    intro: string | null
  }
  lastUpdated: string | null
  content: string | null
}

export type CmsContent = {
  /** Snapshot format version. */
  version: 1
  /** ISO timestamp of the pull that produced this file. */
  generatedAt: string
  site: CmsSiteSettings
  home: CmsHomePage
  work: CmsWorkPage
  projects: CmsProject[]
  services: CmsServicesPage
  studio: CmsStudioPage
  team: CmsTeamPage
  contact: CmsContactPage
  legal: {
    privacy: CmsLegalPage
    terms: CmsLegalPage
  }
}
