import type { CmsGalleryImage, CmsProject } from '~/types/cms'
import { cmsList, cmsText } from '~/utils/cms'
import { projects as cmsProjects } from './content'

export type Sector =
  | 'Heritage'
  | 'Hospitality'
  | 'Transport'
  | 'Workplace'
  | 'Retail & Dining'
  // The CMS can add a sector without a Nuxt release.
  | (string & {})

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

const plateTones: PlateTone[] = ['bronze', 'night', 'alloy', 'steel']

function toPlateTone(value: string | null): PlateTone {
  return plateTones.find((tone) => tone === value) ?? 'bronze'
}

function toGallery(gallery: CmsGalleryImage[], projectName: string): ProjectImage[] {
  return gallery.flatMap((image) => {
    const src = cmsText(image.src)
    if (!src) return []

    return [
      {
        src,
        alt: cmsText(image.alt, projectName),
        ...(image.caption ? { caption: image.caption } : {}),
      },
    ]
  })
}

function toProject(project: CmsProject): Project {
  const slug = project.slug
  const name = project.name

  return {
    slug,
    name,
    location: cmsText(project.location),
    sector: cmsText(project.sector, 'Other'),
    ...(project.collaborator ? { collaborator: project.collaborator } : {}),
    scope: cmsText(project.scope),
    summary: cmsText(project.summary),
    context: cmsText(project.context),
    approach: cmsText(project.approach),
    ...(project.image?.src ? { image: project.image.src } : {}),
    ...(project.imageAlt ? { imageAlt: project.imageAlt } : {}),
    imagePosition: project.imagePosition === 'bottom' ? 'bottom' : 'center',
    gallery: toGallery(project.gallery, name),
    plate: toPlateTone(project.plate),
    services: cmsList(project.services),
    featured: project.featured,
  }
}

export const projects: Project[] = [...cmsProjects]
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map(toProject)

/** Sectors in project order; the snapshot has no separate sectors list. */
export const sectors: Sector[] = projects.reduce<Sector[]>((list, project) => {
  if (!list.includes(project.sector)) list.push(project.sector)
  return list
}, [])

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
