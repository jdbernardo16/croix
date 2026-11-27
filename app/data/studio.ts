/**
 * Studio page section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/studio.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/studio.json`.
 */
import type { CmsStudioPage } from '~/types/cms'
import snapshot from './generated/studio.json'

export const studio = snapshot as unknown as CmsStudioPage
