import type { CmsTeamMember } from '~/types/cms'
import { cmsList, cmsText } from '~/utils/cms'
import { team as teamPage } from './content'

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

function toTeamMember(member: CmsTeamMember): TeamMember {
  return {
    slug: member.slug,
    name: cmsText(member.name, member.shortName ?? ''),
    shortName: cmsText(member.shortName, member.name ?? ''),
    role: cmsText(member.role),
    location: cmsText(member.location),
    portrait: member.portrait?.src ?? '',
    partner: member.partner,
    bio: cmsList(member.bio),
    focus: cmsList(member.focus),
    projects: cmsList(member.projects),
  }
}

export const team: TeamMember[] = teamPage.members.map(toTeamMember)

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug)
}
