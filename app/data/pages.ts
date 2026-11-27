/**
 * Page-level content objects from the CMS snapshot.
 *
 * Leaves keep the CMS shape from `app/types/cms.ts` (`string | null`), so a
 * page resolves them with `cmsText()`, `cmsLines()`, or `cmsList()` from
 * `~/utils/cms` and never renders `null`.
 */
import type {
  CmsContactPage,
  CmsHomePage,
  CmsLegalPage,
  CmsServicesPage,
  CmsStudioPage,
  CmsTeamPage,
  CmsWorkPage,
} from '~/types/cms'

export { contact, home, legal, services, studio, team, work } from './content'

export type HomePageContent = CmsHomePage
export type WorkPageContent = CmsWorkPage
export type ServicesPageContent = CmsServicesPage
export type StudioPageContent = CmsStudioPage
export type TeamPageContent = CmsTeamPage
export type ContactPageContent = CmsContactPage
export type LegalPageContent = CmsLegalPage
