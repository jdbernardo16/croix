/**
 * Page-level content objects from the CMS snapshot.
 *
 * Each object comes from its own per-section module, so importing one page does
 * not bundle the rest. Leaves keep the CMS shape from `app/types/cms.ts`
 * (`string | null`); resolve them with `cmsText()`, `cmsLines()`, or `cmsList()`
 * from `~/utils/cms` and never render `null`.
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

export { contact } from './contact'
export { home } from './home'
export { legal } from './legal'
export { services } from './servicesPage'
export { studio } from './studio'
export { team } from './teamPage'
export { work } from './work'

export type HomePageContent = CmsHomePage
export type WorkPageContent = CmsWorkPage
export type ServicesPageContent = CmsServicesPage
export type StudioPageContent = CmsStudioPage
export type TeamPageContent = CmsTeamPage
export type ContactPageContent = CmsContactPage
export type LegalPageContent = CmsLegalPage
