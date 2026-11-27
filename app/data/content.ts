/**
 * Combined build-time CMS snapshot, kept for docs and tests.
 *
 * The app does not import this module: each data module reads its own
 * `app/data/generated/<section>.json` so pages only bundle the copy they use.
 * `scripts/cms-pull.mjs` writes both the combined file and the sections;
 * `scripts/ensure-cms-data.mjs` seeds them from `app/data/fallback/`.
 */
import type { CmsContent } from '~/types/cms'
import snapshot from './generated/cms.json'

export const content = snapshot as unknown as CmsContent
