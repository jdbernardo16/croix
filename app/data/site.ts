/**
 * Site settings section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/site.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/site.json`.
 * Kept as its own module so the shared header/footer do not bundle page copy.
 */
import type { CmsSiteSettings } from '~/types/cms'
import snapshot from './generated/site.json'

export const site = snapshot as unknown as CmsSiteSettings
