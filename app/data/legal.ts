/**
 * Legal pages section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/legal.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/legal.json`.
 */
import type { CmsContent } from '~/types/cms'
import snapshot from './generated/legal.json'

export const legal = snapshot as unknown as CmsContent['legal']
