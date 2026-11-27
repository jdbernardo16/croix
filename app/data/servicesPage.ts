/**
 * Services page section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/services.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/services.json`.
 * The mapped service data lives in `app/data/services.ts`.
 */
import type { CmsServicesPage } from '~/types/cms'
import snapshot from './generated/services.json'

export const services = snapshot as unknown as CmsServicesPage
