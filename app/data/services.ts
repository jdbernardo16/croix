import type { CmsAudience, CmsServicePackage } from '~/types/cms'
import { cmsList, cmsText } from '~/utils/cms'
import { services as servicesPage } from './content'

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

function toAudience(audience: CmsAudience): Audience {
  return {
    id: audience.id,
    label: cmsText(audience.label),
    title: cmsText(audience.title),
    intro: cmsText(audience.intro),
    points: cmsList(audience.points),
    outcome: cmsText(audience.outcome),
  }
}

function toPackage(servicePackage: CmsServicePackage): ServicePackage {
  const addOns = cmsList(servicePackage.addOns)

  return {
    number: cmsText(servicePackage.number),
    name: cmsText(servicePackage.name),
    shortName: cmsText(servicePackage.shortName, cmsText(servicePackage.name)),
    tagline: cmsText(servicePackage.tagline),
    bestFor: cmsText(servicePackage.bestFor),
    includes: cmsList(servicePackage.includes),
    ...(addOns.length ? { addOns } : {}),
    featured: servicePackage.featured,
  }
}

export const audiences: Audience[] = servicesPage.audiences.items.map(toAudience)

export const packages: ServicePackage[] = servicesPage.packages.items.map(toPackage)

export const phases: Phase[] = servicesPage.phases.items.map((phase) => ({
  number: cmsText(phase.number),
  title: cmsText(phase.title),
  receive: cmsText(phase.receive),
  helps: cmsText(phase.helps),
}))

export const platforms = cmsList(servicesPage.platforms)

export const standards = cmsList(servicesPage.standards)
