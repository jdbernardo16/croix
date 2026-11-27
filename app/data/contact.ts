/**
 * Contact page section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/contact.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/contact.json`.
 */
import type { CmsContactPage } from '~/types/cms'
import snapshot from './generated/contact.json'

export const contact = snapshot as unknown as CmsContactPage
