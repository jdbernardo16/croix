#!/usr/bin/env node
/**
 * Restore the committed CMS fallback when the generated section files do not
 * exist yet.
 *
 * Runs as `predev`, so a clean checkout can start `npm run dev` without a CMS
 * (or a prior `npm run cms:pull`). It never overwrites a complete generated
 * snapshot; a partial one is replaced from the fallback.
 */

import { access } from 'node:fs/promises'
import {
  GENERATED_DIR,
  GENERATED_FILE,
  SECTIONS,
  readFallbackSnapshot,
  sectionFile,
  writeSnapshot,
} from './cms-snapshot.mjs'

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function generatedSnapshotIsComplete() {
  const files = [
    GENERATED_FILE,
    ...SECTIONS.map((section) => sectionFile(GENERATED_DIR, section)),
  ]

  for (const file of files) {
    if (!(await exists(file))) return false
  }
  return true
}

async function main() {
  if (await generatedSnapshotIsComplete()) {
    console.log('CMS data present at app/data/generated/.')
    return
  }

  const snapshot = await readFallbackSnapshot()
  await writeSnapshot(snapshot)
  console.log('Seeded app/data/generated/ from the offline fallback snapshot.')
}

main().catch((error) => {
  console.error(`Could not prepare CMS data: ${error.message}`)
  process.exitCode = 1
})
