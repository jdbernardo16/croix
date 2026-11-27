#!/usr/bin/env node
/**
 * Build-time CMS content pull.
 *
 * Fetches every page, project, and setting from the SilverStripe GraphQL
 * endpoint, normalises the response into the shape documented in
 * `app/types/cms.ts`, downloads referenced images into `public/uploads/cms/`,
 * and writes `app/data/generated/cms.json` atomically.
 *
 * Environment:
 *   CMS_GRAPHQL_URL    GraphQL endpoint. Unset → copy the committed fallback.
 *   CMS_ALLOW_FALLBACK 1/true/yes → copy the fallback when the CMS is
 *                     unreachable or an image cannot be downloaded. Content
 *                     validation failures never fall back silently.
 *
 * Variables are read from the process environment first, then from `.env`
 * (never overriding an existing variable). Nuxt also loads `.env` at runtime,
 * so the build and dev server agree on the source.
 */

import { createHash } from 'node:crypto'
import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GENERATED_DIR = path.join(ROOT, 'app', 'data', 'generated')
const GENERATED_FILE = path.join(GENERATED_DIR, 'cms.json')
const FALLBACK_FILE = path.join(ROOT, 'app', 'data', 'fallback', 'content.json')
const IMAGE_DIR = path.join(ROOT, 'public', 'uploads', 'cms')
const IMAGE_URL_PREFIX = '/uploads/cms/'

const TIMEOUT_MS = 30_000

/* ------------------------------------------------------------------ *
 * GraphQL
 * ------------------------------------------------------------------ */

/*
 * SilverStripe's GraphQL module rejects query bodies over 500 nodes, so the
 * pull is split into two requests. Fields are introspected from the live
 * schema; keep them in sync with croix-cms/app/_graphql/schema.yml.
 */
const IMAGE_FIELDS = 'URL AbsoluteURL Width Height Title'

const QUERIES = [
  `query CmsCore {
    siteSettings {
      id SiteName Tagline FooterIntro Email Phone ManilaAddress MilanStudio MilanCountry
      ManilaCoordinates MilanCoordinates Edition Copyright ResponseTime DefaultMetaDescription
      Wordmark { ${IMAGE_FIELDS} }
      Lockup { ${IMAGE_FIELDS} }
      DefaultOGImage { ${IMAGE_FIELDS} }
      NavItems { id Label URL SortOrder ShowInFooter }
    }
    homePage {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroTopBarLeft HeroTopBarCentre HeroTopBarRight HeroEyebrow HeroTitleLine1 HeroTitleLine2
      HeroIntro HeroPrimaryLabel HeroPrimaryURL HeroSecondaryLabel HeroSecondaryURL HeroCredentials
      HeroImageAlt HeroBadge HeroPlateLabel HeroPlateTitle HeroPlateMeta HeroCaptionLeft HeroCaptionRight
      HeroImage { ${IMAGE_FIELDS} }
      TickerItems
      DisciplinesEyebrow DisciplinesTitleLine1 DisciplinesTitleLine2 DisciplinesIntro
      DisciplinesFooterLeft DisciplinesFooterRight
      DisciplineCards { id Number Title Body Meta ImageAlt SortOrder Image { ${IMAGE_FIELDS} } }
      WorkEyebrow WorkTitle WorkIntro WorkFooterNote WorkFooterLinkLabel
      ProofEyebrow ProofTitleLine1 ProofTitleLine2 ProofIntro
      ProofImage { ${IMAGE_FIELDS} }
      ProofImageAlt ProofImageBadge ProofImageCaption ProofImageMeta
      ProofImageFooterLeft ProofImageFooterRight ProofSequenceLabel ProofPhaseCount
      ProofFooterNote ProofFooterLinkLabel
      StatItems { id Value Label Note SortOrder }
      StepItems { id Title Note SortOrder }
      ContactEyebrow ContactTitleLine1 ContactTitleLine2 ContactIntro ContactEmail ContactFormLabel
      ContactChecklistTitle ContactChecklist ContactResponseLabel ContactResponseValue ContactPhoneNote
      CtaEyebrow CtaTitle CtaText CtaButtonLabel CtaButtonURL CtaEmail CtaPhone
      OGImage { ${IMAGE_FIELDS} }
    }
    workPage {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro
      HeroStats { id Value Label Note SortOrder }
      NoteLabel NoteBody
      CtaEyebrow CtaTitle CtaText CtaButtonLabel CtaButtonURL CtaEmail CtaPhone
      OGImage { ${IMAGE_FIELDS} }
    }
    projects {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      Location Sector Collaborator Scope Summary Context Approach
      HeroImage { ${IMAGE_FIELDS} }
      HeroImageAlt HeroImagePosition Plate ServicesList SortOrder Featured
      Gallery { id Alt Caption SortOrder Image { ${IMAGE_FIELDS} } }
      OGImage { ${IMAGE_FIELDS} }
    }
  }`,
  `query CmsPages {
    servicesPage {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro
      HeroStatOneValue HeroStatOneLabel HeroStatTwoValue HeroStatTwoLabel
      ProblemEyebrow ProblemTitle ProblemBody ProblemBullets
      AudiencesEyebrow AudiencesTitle AudiencesIntro
      Audiences { id Label Title Intro Points Outcome SortOrder }
      PackagesEyebrow PackagesTitle PackagesIntro
      ServicePackages { id Number Name ShortName Tagline BestFor Includes AddOns Featured SortOrder }
      VolumeLabel VolumeBody VolumeValue
      PhasesEyebrow PhasesTitle PhasesIntro
      ServicePhases { id Number Title Receive Helps SortOrder }
      PlatformsLabel Platforms StandardsLabel Standards
      CtaEyebrow CtaTitle CtaText CtaButtonLabel CtaButtonURL CtaEmail CtaPhone
      OGImage { ${IMAGE_FIELDS} }
    }
    studioPage {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro
      WhoEyebrow WhoTitle WhoLead WhoParagraphs
      WhoImage { ${IMAGE_FIELDS} }
      WhoImageAlt WhoImageCaptionLeft WhoImageCaptionRight
      MissionLabel MissionTitle MissionBody VisionLabel VisionTitle VisionBody
      TimelineEyebrow TimelineTitle TimelineIntro
      TimelineItems { id Label Title Body SortOrder }
      ModelEyebrow ModelTitleLine1 ModelTitleLine2 ModelIntro
      ModelCards { id Label Meta Title Body Points SortOrder }
      PrinciplesEyebrow PrinciplesTitle PrinciplesIntro
      Principles { id Number Title Body SortOrder }
      StandardsLabel Standards
      CtaEyebrow CtaTitle CtaText CtaButtonLabel CtaButtonURL CtaEmail CtaPhone
      OGImage { ${IMAGE_FIELDS} }
    }
    teamPage {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro
      HeroStatOneValue HeroStatOneLabel HeroStatTwoValue HeroStatTwoLabel
      BenchLabel BenchIntro
      TeamMembers {
        id Name ShortName Role Location Partner Bio Focus Projects SortOrder
        Portrait { ${IMAGE_FIELDS} }
      }
      WiderBenchEyebrow WiderBenchTitle WiderBenchIntro
      BenchGroups { id Title Body SortOrder }
      CtaEyebrow CtaTitle CtaText CtaButtonLabel CtaButtonURL CtaEmail CtaPhone
      OGImage { ${IMAGE_FIELDS} }
    }
    contactPage {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro
      HeroStatOneValue HeroStatOneLabel HeroStatTwoValue HeroStatTwoLabel
      SupplierNoteLabel SupplierNoteBody SupplierNoteLinkLabel SupplierNoteLinkURL
      StepsEyebrow StepsTitle StepsIntro
      ContactSteps { id Number Title Body SortOrder }
      CtaEyebrow CtaTitle CtaText CtaButtonLabel CtaButtonURL CtaEmail CtaPhone
      OGImage { ${IMAGE_FIELDS} }
    }
    privacy: legalPage(slug: "privacy") {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro LastUpdated Content
      OGImage { ${IMAGE_FIELDS} }
    }
    terms: legalPage(slug: "terms") {
      id ID Title MenuTitle URLSegment MetaTitle MetaDescription
      HeroSection HeroEyebrow HeroTitle HeroIntro LastUpdated Content
      OGImage { ${IMAGE_FIELDS} }
    }
  }`,
]

const REQUIRED_RESPONSE_KEYS = [
  'siteSettings',
  'homePage',
  'workPage',
  'projects',
  'servicesPage',
  'studioPage',
  'teamPage',
  'contactPage',
  'privacy',
  'terms',
]

/* ------------------------------------------------------------------ *
 * Errors
 * ------------------------------------------------------------------ */

/** A failed pull. `canFallback` is true for transport/image failures only. */
class PullError extends Error {
  constructor(message, { canFallback = false, cause } = {}) {
    super(message, { cause })
    this.name = 'PullError'
    this.canFallback = canFallback
  }
}

/* ------------------------------------------------------------------ *
 * Environment
 * ------------------------------------------------------------------ */

async function loadDotEnv() {
  let raw
  try {
    raw = await readFile(path.join(ROOT, '.env'), 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw error
  }

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    if (!key || process.env[key] !== undefined) continue

    let value = trimmed.slice(separator + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] = value
  }
}

function readConfig() {
  const graphqlUrl = (process.env.CMS_GRAPHQL_URL ?? '').trim()
  const allowFallback = /^(1|true|yes)$/i.test((process.env.CMS_ALLOW_FALLBACK ?? '').trim())
  return { graphqlUrl, allowFallback }
}

/* ------------------------------------------------------------------ *
 * Fetch
 * ------------------------------------------------------------------ */

async function postQuery(url, query) {
  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (error) {
    const detail = error.cause?.code ? `${error.message} (${error.cause.code})` : error.message
    throw new PullError(`Could not reach ${url}: ${detail}`, {
      canFallback: true,
      cause: error,
    })
  }

  if (!response.ok) {
    throw new PullError(`GraphQL endpoint ${url} returned HTTP ${response.status}.`, {
      canFallback: true,
    })
  }

  let payload
  try {
    payload = await response.json()
  } catch (error) {
    throw new PullError(`GraphQL endpoint ${url} returned invalid JSON.`, {
      canFallback: true,
      cause: error,
    })
  }

  if (Array.isArray(payload.errors) && payload.errors.length) {
    const details = payload.errors.map((error) => error.message).join('; ')
    throw new PullError(`GraphQL query failed: ${details}`, { canFallback: true })
  }

  if (!payload.data || typeof payload.data !== 'object') {
    throw new PullError('GraphQL response did not contain a data object.', { canFallback: true })
  }

  return payload.data
}

async function fetchContent(graphqlUrl) {
  const data = {}
  for (const query of QUERIES) {
    Object.assign(data, await postQuery(graphqlUrl, query))
  }
  return data
}

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

function findMissingResponseKeys(data) {
  return REQUIRED_RESPONSE_KEYS.filter((key) => {
    const value = data[key]
    if (key === 'projects') return !Array.isArray(value) || value.length === 0
    return !value || typeof value !== 'object'
  })
}

function assertResponse(data) {
  const missing = findMissingResponseKeys(data)
  if (missing.length) {
    throw new PullError(
      `The CMS response is incomplete. Missing or empty: ${missing.join(', ')}.\n` +
        'Check that the CMS is seeded and that the GraphQL endpoint is the right one.',
    )
  }
}

function findMissingSnapshotKeys(snapshot) {
  const missing = []
  if (!snapshot.site || !Array.isArray(snapshot.site.nav) || !snapshot.site.nav.length) {
    missing.push('site.nav')
  }
  if (!snapshot.home || typeof snapshot.home !== 'object') missing.push('home')
  if (!snapshot.work || typeof snapshot.work !== 'object') missing.push('work')
  if (!Array.isArray(snapshot.projects) || !snapshot.projects.length) missing.push('projects')
  if (!snapshot.services) missing.push('services')
  if (!snapshot.studio) missing.push('studio')
  if (!snapshot.team || !Array.isArray(snapshot.team.members) || !snapshot.team.members.length) {
    missing.push('team.members')
  }
  if (!snapshot.contact) missing.push('contact')
  if (!snapshot.legal?.privacy || !snapshot.legal?.terms) missing.push('legal.privacy', 'legal.terms')
  return [...new Set(missing)]
}

function assertSnapshot(snapshot) {
  const missing = findMissingSnapshotKeys(snapshot)
  if (missing.length) {
    throw new PullError(
      `The CMS content is incomplete. Missing or empty: ${missing.join(', ')}.\n` +
        'Nothing was written; fix the CMS content and pull again.',
    )
  }
}

/* ------------------------------------------------------------------ *
 * Normalisation helpers
 * ------------------------------------------------------------------ */

const text = (value) => (value == null || value === '' ? null : String(value))

const lines = (value) =>
  typeof value === 'string'
    ? value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : []

const flag = (value) => value === true

const bySortOrder = (a, b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0)

function slugify(value, fallback) {
  const slug = String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || fallback
}

function normaliseImage(value) {
  if (!value) return null
  const src = value.AbsoluteURL || value.URL
  if (!src) return null
  return {
    src,
    width: typeof value.Width === 'number' ? value.Width : null,
    height: typeof value.Height === 'number' ? value.Height : null,
    title: text(value.Title),
  }
}

function normaliseMeta(page) {
  return {
    title: text(page.MetaTitle),
    description: text(page.MetaDescription),
    ogImage: normaliseImage(page.OGImage),
  }
}

function normaliseCta(page) {
  return {
    eyebrow: text(page.CtaEyebrow),
    title: text(page.CtaTitle),
    text: text(page.CtaText),
    buttonLabel: text(page.CtaButtonLabel),
    buttonUrl: text(page.CtaButtonURL),
    email: text(page.CtaEmail),
    phone: text(page.CtaPhone),
  }
}

function normaliseHero(page) {
  return {
    section: text(page.HeroSection),
    eyebrow: text(page.HeroEyebrow),
    title: text(page.HeroTitle),
    intro: text(page.HeroIntro),
  }
}

function normaliseHeroStats(page) {
  return [
    { value: text(page.HeroStatOneValue), label: text(page.HeroStatOneLabel) },
    { value: text(page.HeroStatTwoValue), label: text(page.HeroStatTwoLabel) },
  ]
}

function normaliseDisciplineCards(items) {
  return [...(items ?? [])].sort(bySortOrder).map((card) => ({
    number: text(card.Number),
    title: text(card.Title),
    body: text(card.Body),
    meta: text(card.Meta),
    image: normaliseImage(card.Image),
    imageAlt: text(card.ImageAlt),
  }))
}

function normaliseStats(items) {
  return [...(items ?? [])].sort(bySortOrder).map((item) => ({
    value: text(item.Value),
    label: text(item.Label),
    note: text(item.Note),
  }))
}

function normaliseSteps(items) {
  return [...(items ?? [])].sort(bySortOrder).map((item) => ({
    title: text(item.Title),
    note: text(item.Note),
  }))
}

function normaliseSite(settings) {
  return {
    name: text(settings.SiteName),
    tagline: text(settings.Tagline),
    footerIntro: text(settings.FooterIntro),
    email: text(settings.Email),
    phone: text(settings.Phone),
    manilaAddress: text(settings.ManilaAddress),
    milanStudio: text(settings.MilanStudio),
    milanCountry: text(settings.MilanCountry),
    manilaCoordinates: text(settings.ManilaCoordinates),
    milanCoordinates: text(settings.MilanCoordinates),
    edition: text(settings.Edition),
    copyright: text(settings.Copyright),
    responseTime: text(settings.ResponseTime),
    defaultMetaDescription: text(settings.DefaultMetaDescription),
    wordmark: normaliseImage(settings.Wordmark),
    lockup: normaliseImage(settings.Lockup),
    defaultOgImage: normaliseImage(settings.DefaultOGImage),
    nav: [...(settings.NavItems ?? [])].sort(bySortOrder).map((item) => ({
      label: text(item.Label) ?? '',
      url: text(item.URL) ?? '',
      sortOrder: item.SortOrder ?? 0,
      showInFooter: flag(item.ShowInFooter),
    })),
  }
}

function normaliseHome(page) {
  return {
    meta: normaliseMeta(page),
    hero: {
      topBarLeft: text(page.HeroTopBarLeft),
      topBarCentre: text(page.HeroTopBarCentre),
      topBarRight: text(page.HeroTopBarRight),
      eyebrow: text(page.HeroEyebrow),
      titleLine1: text(page.HeroTitleLine1),
      titleLine2: text(page.HeroTitleLine2),
      intro: text(page.HeroIntro),
      primaryLabel: text(page.HeroPrimaryLabel),
      primaryUrl: text(page.HeroPrimaryURL),
      secondaryLabel: text(page.HeroSecondaryLabel),
      secondaryUrl: text(page.HeroSecondaryURL),
      credentials: lines(page.HeroCredentials),
      image: normaliseImage(page.HeroImage),
      imageAlt: text(page.HeroImageAlt),
      badge: text(page.HeroBadge),
      plate: {
        label: text(page.HeroPlateLabel),
        title: text(page.HeroPlateTitle),
        meta: text(page.HeroPlateMeta),
      },
      captionLeft: text(page.HeroCaptionLeft),
      captionRight: text(page.HeroCaptionRight),
    },
    ticker: lines(page.TickerItems),
    disciplines: {
      eyebrow: text(page.DisciplinesEyebrow),
      titleLine1: text(page.DisciplinesTitleLine1),
      titleLine2: text(page.DisciplinesTitleLine2),
      intro: text(page.DisciplinesIntro),
      footerLeft: text(page.DisciplinesFooterLeft),
      footerRight: text(page.DisciplinesFooterRight),
      cards: normaliseDisciplineCards(page.DisciplineCards),
    },
    work: {
      eyebrow: text(page.WorkEyebrow),
      title: text(page.WorkTitle),
      intro: text(page.WorkIntro),
      footerNote: text(page.WorkFooterNote),
      footerLinkLabel: text(page.WorkFooterLinkLabel),
    },
    proof: {
      eyebrow: text(page.ProofEyebrow),
      titleLine1: text(page.ProofTitleLine1),
      titleLine2: text(page.ProofTitleLine2),
      intro: text(page.ProofIntro),
      image: normaliseImage(page.ProofImage),
      imageAlt: text(page.ProofImageAlt),
      imageBadge: text(page.ProofImageBadge),
      imageCaption: text(page.ProofImageCaption),
      imageMeta: text(page.ProofImageMeta),
      imageFooterLeft: text(page.ProofImageFooterLeft),
      imageFooterRight: text(page.ProofImageFooterRight),
      sequenceLabel: text(page.ProofSequenceLabel),
      phaseCount: text(page.ProofPhaseCount),
      footerNote: text(page.ProofFooterNote),
      footerLinkLabel: text(page.ProofFooterLinkLabel),
      stats: normaliseStats(page.StatItems),
      steps: normaliseSteps(page.StepItems),
    },
    contact: {
      eyebrow: text(page.ContactEyebrow),
      titleLine1: text(page.ContactTitleLine1),
      titleLine2: text(page.ContactTitleLine2),
      intro: text(page.ContactIntro),
      email: text(page.ContactEmail),
      formLabel: text(page.ContactFormLabel),
      checklistTitle: text(page.ContactChecklistTitle),
      checklist: lines(page.ContactChecklist),
      responseLabel: text(page.ContactResponseLabel),
      responseValue: text(page.ContactResponseValue),
      phoneNote: text(page.ContactPhoneNote),
    },
    cta: normaliseCta(page),
  }
}

function normaliseWork(page) {
  return {
    meta: normaliseMeta(page),
    hero: normaliseHero(page),
    stats: normaliseStats(page.HeroStats),
    note: {
      label: text(page.NoteLabel),
      body: text(page.NoteBody),
    },
    cta: normaliseCta(page),
  }
}

function normaliseProject(page) {
  return {
    slug: text(page.URLSegment) ?? '',
    name: text(page.Title) ?? '',
    menuTitle: text(page.MenuTitle),
    meta: normaliseMeta(page),
    location: text(page.Location),
    sector: text(page.Sector),
    collaborator: text(page.Collaborator),
    scope: text(page.Scope),
    summary: text(page.Summary),
    context: text(page.Context),
    approach: text(page.Approach),
    image: normaliseImage(page.HeroImage),
    imageAlt: text(page.HeroImageAlt),
    imagePosition: page.HeroImagePosition === 'bottom' ? 'bottom' : 'center',
    plate: text(page.Plate),
    services: lines(page.ServicesList),
    featured: flag(page.Featured),
    sortOrder: page.SortOrder ?? 0,
    gallery: [...(page.Gallery ?? [])].sort(bySortOrder).map((item) => {
      const image = normaliseImage(item.Image)
      return {
        src: image?.src ?? null,
        alt: text(item.Alt),
        caption: text(item.Caption),
        width: image?.width ?? null,
        height: image?.height ?? null,
      }
    }),
  }
}

function normaliseAudiences(items) {
  return [...(items ?? [])].sort(bySortOrder).map((item, index) => ({
    id: slugify(item.Label, `audience-${index + 1}`),
    label: text(item.Label),
    title: text(item.Title),
    intro: text(item.Intro),
    points: lines(item.Points),
    outcome: text(item.Outcome),
  }))
}

function normaliseServicePackages(items) {
  return [...(items ?? [])].sort(bySortOrder).map((item) => ({
    number: text(item.Number),
    name: text(item.Name),
    shortName: text(item.ShortName),
    tagline: text(item.Tagline),
    bestFor: text(item.BestFor),
    includes: lines(item.Includes),
    addOns: lines(item.AddOns),
    featured: flag(item.Featured),
  }))
}

function normaliseServicePhases(items) {
  return [...(items ?? [])].sort(bySortOrder).map((item) => ({
    number: text(item.Number),
    title: text(item.Title),
    receive: text(item.Receive),
    helps: text(item.Helps),
  }))
}

function normaliseServices(page) {
  return {
    meta: normaliseMeta(page),
    hero: { ...normaliseHero(page), stats: normaliseHeroStats(page) },
    problem: {
      eyebrow: text(page.ProblemEyebrow),
      title: text(page.ProblemTitle),
      body: text(page.ProblemBody),
      bullets: lines(page.ProblemBullets),
    },
    audiences: {
      eyebrow: text(page.AudiencesEyebrow),
      title: text(page.AudiencesTitle),
      intro: text(page.AudiencesIntro),
      items: normaliseAudiences(page.Audiences),
    },
    packages: {
      eyebrow: text(page.PackagesEyebrow),
      title: text(page.PackagesTitle),
      intro: text(page.PackagesIntro),
      items: normaliseServicePackages(page.ServicePackages),
    },
    volume: {
      label: text(page.VolumeLabel),
      body: text(page.VolumeBody),
      value: text(page.VolumeValue),
    },
    phases: {
      eyebrow: text(page.PhasesEyebrow),
      title: text(page.PhasesTitle),
      intro: text(page.PhasesIntro),
      items: normaliseServicePhases(page.ServicePhases),
    },
    platformsLabel: text(page.PlatformsLabel),
    platforms: lines(page.Platforms),
    standardsLabel: text(page.StandardsLabel),
    standards: lines(page.Standards),
    cta: normaliseCta(page),
  }
}

function normaliseStudio(page) {
  return {
    meta: normaliseMeta(page),
    hero: normaliseHero(page),
    who: {
      eyebrow: text(page.WhoEyebrow),
      title: text(page.WhoTitle),
      lead: text(page.WhoLead),
      paragraphs: lines(page.WhoParagraphs),
      image: normaliseImage(page.WhoImage),
      imageAlt: text(page.WhoImageAlt),
      captionLeft: text(page.WhoImageCaptionLeft),
      captionRight: text(page.WhoImageCaptionRight),
    },
    mission: {
      label: text(page.MissionLabel),
      title: text(page.MissionTitle),
      body: text(page.MissionBody),
    },
    vision: {
      label: text(page.VisionLabel),
      title: text(page.VisionTitle),
      body: text(page.VisionBody),
    },
    timeline: {
      eyebrow: text(page.TimelineEyebrow),
      title: text(page.TimelineTitle),
      intro: text(page.TimelineIntro),
      items: [...(page.TimelineItems ?? [])].sort(bySortOrder).map((item) => ({
        label: text(item.Label),
        title: text(item.Title),
        body: text(item.Body),
      })),
    },
    model: {
      eyebrow: text(page.ModelEyebrow),
      titleLine1: text(page.ModelTitleLine1),
      titleLine2: text(page.ModelTitleLine2),
      intro: text(page.ModelIntro),
      cards: [...(page.ModelCards ?? [])].sort(bySortOrder).map((item) => ({
        label: text(item.Label),
        meta: text(item.Meta),
        title: text(item.Title),
        body: text(item.Body),
        points: lines(item.Points),
      })),
    },
    principles: {
      eyebrow: text(page.PrinciplesEyebrow),
      title: text(page.PrinciplesTitle),
      intro: text(page.PrinciplesIntro),
      items: [...(page.Principles ?? [])].sort(bySortOrder).map((item) => ({
        number: text(item.Number),
        title: text(item.Title),
        body: text(item.Body),
      })),
    },
    standardsLabel: text(page.StandardsLabel),
    standards: lines(page.Standards),
    cta: normaliseCta(page),
  }
}

function normaliseTeam(page) {
  return {
    meta: normaliseMeta(page),
    hero: { ...normaliseHero(page), stats: normaliseHeroStats(page) },
    bench: {
      label: text(page.BenchLabel),
      intro: text(page.BenchIntro),
    },
    members: [...(page.TeamMembers ?? [])].sort(bySortOrder).map((member, index) => ({
      slug: slugify(member.ShortName || member.Name, `team-${index + 1}`),
      name: text(member.Name),
      shortName: text(member.ShortName),
      role: text(member.Role),
      location: text(member.Location),
      partner: flag(member.Partner),
      bio: lines(member.Bio),
      focus: lines(member.Focus),
      projects: lines(member.Projects),
      portrait: normaliseImage(member.Portrait),
    })),
    widerBench: {
      eyebrow: text(page.WiderBenchEyebrow),
      title: text(page.WiderBenchTitle),
      intro: text(page.WiderBenchIntro),
      groups: [...(page.BenchGroups ?? [])].sort(bySortOrder).map((group) => ({
        title: text(group.Title),
        body: text(group.Body),
      })),
    },
    cta: normaliseCta(page),
  }
}

function normaliseContact(page) {
  return {
    meta: normaliseMeta(page),
    hero: { ...normaliseHero(page), stats: normaliseHeroStats(page) },
    supplierNote: {
      label: text(page.SupplierNoteLabel),
      body: text(page.SupplierNoteBody),
      linkLabel: text(page.SupplierNoteLinkLabel),
      linkUrl: text(page.SupplierNoteLinkURL),
    },
    steps: {
      eyebrow: text(page.StepsEyebrow),
      title: text(page.StepsTitle),
      intro: text(page.StepsIntro),
      items: [...(page.ContactSteps ?? [])].sort(bySortOrder).map((step) => ({
        number: text(step.Number),
        title: text(step.Title),
        body: text(step.Body),
      })),
    },
    cta: normaliseCta(page),
  }
}

function normaliseLegal(page) {
  return {
    meta: normaliseMeta(page),
    hero: normaliseHero(page),
    lastUpdated: text(page.LastUpdated),
    content: text(page.Content),
  }
}

function normaliseContent(data) {
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    site: normaliseSite(data.siteSettings),
    home: normaliseHome(data.homePage),
    work: normaliseWork(data.workPage),
    projects: [...data.projects].sort(bySortOrder).map(normaliseProject),
    services: normaliseServices(data.servicesPage),
    studio: normaliseStudio(data.studioPage),
    team: normaliseTeam(data.teamPage),
    contact: normaliseContact(data.contactPage),
    legal: {
      privacy: normaliseLegal(data.privacy),
      terms: normaliseLegal(data.terms),
    },
  }
}

/* ------------------------------------------------------------------ *
 * Images
 * ------------------------------------------------------------------ */

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'])
const CONTENT_TYPE_EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
}

/*
 * Absolute image URLs plus SilverStripe's relative asset paths. The regex is
 * deliberately limited to image extensions so ordinary copy and page links are
 * never mistaken for downloads.
 */
const IMAGE_URL_PATTERN =
  /(?:https?:\/\/[^\s"'()<>\\]+?\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^\s"'()<>\\]*)?|\/public\/assets\/[^\s"'()<>\\]+?\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^\s"'()<>\\]*)?|\/assets\/[^\s"'()<>\\]+?\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^\s"'()<>\\]*)?)/gi

function isCmsAssetPath(value) {
  return value.startsWith('/public/assets/') || value.startsWith('/assets/')
}

function resolveAssetUrl(value, graphqlUrl) {
  if (/^https?:\/\//i.test(value)) return value
  return new URL(value, graphqlUrl).toString()
}

function extensionFor(url, contentType) {
  const pathname = new URL(url).pathname
  const match = pathname.match(/\.([a-z0-9]{2,5})$/i)
  const extension = match?.[1]?.toLowerCase()
  if (extension && IMAGE_EXTENSIONS.has(extension)) {
    return extension === 'jpeg' ? 'jpg' : extension
  }
  return CONTENT_TYPE_EXTENSIONS[(contentType ?? '').split(';')[0].trim()] ?? 'bin'
}

function collectImageUrls(node, graphqlUrl, found = new Map(), key = '') {
  if (typeof node === 'string') {
    const add = (original) => {
      const remote = resolveAssetUrl(original, graphqlUrl)
      if (!found.has(remote)) found.set(remote, new Set())
      found.get(remote).add(original)
    }

    if (key === 'src' && (isCmsAssetPath(node) || /^https?:\/\//i.test(node))) add(node)
    for (const match of node.matchAll(IMAGE_URL_PATTERN)) add(match[0])
    return found
  }

  if (Array.isArray(node)) {
    for (const item of node) collectImageUrls(item, graphqlUrl, found, key)
    return found
  }

  if (node && typeof node === 'object') {
    for (const [childKey, value] of Object.entries(node)) {
      collectImageUrls(value, graphqlUrl, found, childKey)
    }
  }

  return found
}

async function downloadImage(remoteUrl) {
  let response
  try {
    response = await fetch(remoteUrl, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  } catch (error) {
    throw new PullError(`Could not download image ${remoteUrl}: ${error.message}`, {
      canFallback: true,
      cause: error,
    })
  }

  if (!response.ok) {
    throw new PullError(`Image ${remoteUrl} returned HTTP ${response.status}.`, {
      canFallback: true,
    })
  }

  const contentType = (response.headers.get('content-type') ?? '').split(';')[0].trim()
  if (contentType && contentType !== 'application/octet-stream' && !contentType.startsWith('image/')) {
    throw new PullError(`Image ${remoteUrl} returned ${contentType}, not an image.`, {
      canFallback: true,
    })
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  if (!buffer.length) {
    throw new PullError(`Image ${remoteUrl} returned an empty response.`, { canFallback: true })
  }

  const extension = extensionFor(remoteUrl, response.headers.get('content-type'))
  const hash = createHash('sha1').update(buffer).digest('hex')
  const filename = `${hash}.${extension}`
  const target = path.join(IMAGE_DIR, filename)

  await mkdir(IMAGE_DIR, { recursive: true })
  try {
    await access(target)
  } catch {
    await writeFile(target, buffer)
  }

  return IMAGE_URL_PREFIX + filename
}

async function downloadAll(urisByRemote) {
  const remotes = [...urisByRemote.keys()].sort((a, b) => b.length - a.length)
  const results = await Promise.all(remotes.map(async (url) => [url, await downloadImage(url)]))
  const localByRemote = new Map(results)

  // Also replace the original spelling (for example a relative
  // `/public/assets/...` URL) anywhere it appears in text.
  const mapping = new Map()
  for (const [remote, local] of localByRemote) {
    mapping.set(remote, local)
    for (const original of urisByRemote.get(remote) ?? []) mapping.set(original, local)
  }
  return new Map([...mapping].sort((a, b) => b[0].length - a[0].length))
}

function replaceUrls(node, mapping, key = '') {
  if (typeof node === 'string') {
    // Longest first, so a URL that prefixes another cannot consume it.
    if (key === 'src' && mapping.has(node)) return mapping.get(node)
    let value = node
    for (const [remote, local] of mapping) {
      if (value.includes(remote)) value = value.split(remote).join(local)
    }
    return value
  }

  if (Array.isArray(node)) return node.map((item) => replaceUrls(item, mapping, key))

  if (node && typeof node === 'object') {
    for (const [childKey, value] of Object.entries(node)) {
      node[childKey] = replaceUrls(value, mapping, childKey)
    }
  }

  return node
}

function findRemainingCmsUrls(node, origin, path = '$', found = []) {
  if (typeof node === 'string') {
    if (node.startsWith(origin) || node.includes('/public/assets/')) {
      found.push({ path, value: node.length > 120 ? `${node.slice(0, 117)}...` : node })
    }
    return found
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => findRemainingCmsUrls(item, origin, `${path}[${index}]`, found))
    return found
  }

  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      findRemainingCmsUrls(value, origin, `${path}.${key}`, found)
    }
  }

  return found
}

async function localiseImages(snapshot, graphqlUrl) {
  const urls = collectImageUrls(snapshot, graphqlUrl)
  if (!urls.size) return snapshot

  console.log(`Downloading ${urls.size} image(s)...`)
  const mapping = await downloadAll(urls)
  const localised = replaceUrls(snapshot, mapping, '')

  const origin = new URL(graphqlUrl).origin
  const remaining = findRemainingCmsUrls(localised, origin)
  if (remaining.length) {
    const details = remaining
      .slice(0, 10)
      .map((entry) => `  ${entry.path}: ${entry.value}`)
      .join('\n')
    throw new PullError(
      `Absolute CMS URLs remain after the image rewrite:\n${details}\n` +
        'Images must be reachable and referenced with a supported URL.',
    )
  }

  return localised
}

/* ------------------------------------------------------------------ *
 * Output
 * ------------------------------------------------------------------ */

async function writeJsonAtomically(file, contents) {
  await mkdir(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.tmp`
  await writeFile(temporary, contents)
  await rename(temporary, file)
}

async function useFallback(reason) {
  let raw
  try {
    raw = await readFile(FALLBACK_FILE, 'utf8')
  } catch (error) {
    throw new PullError(
      `No CMS content available and the fallback snapshot is missing: ${FALLBACK_FILE}`,
      { cause: error },
    )
  }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    throw new PullError(`Fallback snapshot is not valid JSON: ${FALLBACK_FILE}`, { cause: error })
  }

  assertSnapshot(parsed)
  await writeJsonAtomically(GENERATED_FILE, raw)
  console.log(`${reason} Copied fallback snapshot to app/data/generated/cms.json.`)
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

async function main() {
  await loadDotEnv()
  const { graphqlUrl, allowFallback } = readConfig()

  if (!graphqlUrl) {
    await useFallback('CMS_GRAPHQL_URL is not set.')
    return
  }

  try {
    console.log(`Pulling CMS content from ${graphqlUrl}...`)
    const data = await fetchContent(graphqlUrl)
    assertResponse(data)

    const snapshot = normaliseContent(data)
    assertSnapshot(snapshot)

    await localiseImages(snapshot, graphqlUrl)
    assertSnapshot(snapshot)

    await writeJsonAtomically(GENERATED_FILE, `${JSON.stringify(snapshot, null, 2)}\n`)
    console.log(
      `Wrote app/data/generated/cms.json (${snapshot.projects.length} projects, ` +
        `${snapshot.team.members.length} team members).`,
    )
  } catch (error) {
    const failure = error instanceof PullError ? error : new PullError(error.message, { cause: error })

    if (allowFallback && failure.canFallback) {
      console.warn(`CMS pull failed: ${failure.message}`)
      await useFallback('CMS_ALLOW_FALLBACK is set.')
      return
    }

    throw failure
  }
}

main().catch((error) => {
  console.error(`\nCMS pull failed: ${error.message}`)
  process.exitCode = 1
})
