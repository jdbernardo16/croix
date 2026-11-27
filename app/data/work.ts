/**
 * Work index page section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/work.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/work.json`.
 */
import type { CmsWorkPage } from '~/types/cms'
import snapshot from './generated/work.json'

export const work = snapshot as unknown as CmsWorkPage
