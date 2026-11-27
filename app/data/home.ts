/**
 * Home page section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/home.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/home.json`.
 */
import type { CmsHomePage } from '~/types/cms'
import snapshot from './generated/home.json'

export const home = snapshot as unknown as CmsHomePage
