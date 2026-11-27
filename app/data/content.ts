/**
 * The build-time CMS snapshot, exposed as typed module exports.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/cms.json` before `dev`,
 * `build`, and `generate`; `scripts/ensure-cms-data.mjs` seeds it from
 * `app/data/fallback/content.json` on a clean checkout. Both files share the
 * shape documented in `app/types/cms.ts` and never contain absolute CMS URLs.
 *
 * Nothing here fetches at runtime: pages and components import these values
 * synchronously, so the browser never talks to the CMS.
 */
import type { CmsContent } from '~/types/cms'
import snapshot from './generated/cms.json'

export const content = snapshot as unknown as CmsContent

export const site = content.site
export const home = content.home
export const work = content.work
export const projects = content.projects
export const services = content.services
export const studio = content.studio
export const team = content.team
export const contact = content.contact
export const legal = content.legal
