/**
 * Team page section of the build-time CMS snapshot.
 *
 * `scripts/cms-pull.mjs` writes `app/data/generated/team.json`;
 * `scripts/ensure-cms-data.mjs` seeds it from `app/data/fallback/team.json`.
 * The mapped member list lives in `app/data/team.ts`.
 */
import type { CmsTeamPage } from '~/types/cms'
import snapshot from './generated/team.json'

export const team = snapshot as unknown as CmsTeamPage
