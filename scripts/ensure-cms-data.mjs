#!/usr/bin/env node
/**
 * Restore the committed CMS fallback when no generated snapshot exists yet.
 *
 * Runs as `predev`, so a clean checkout can start `npm run dev` without a CMS
 * (or a prior `npm run cms:pull`). It never overwrites an existing generated
 * snapshot.
 */

import { access, copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GENERATED_DIR = path.join(ROOT, 'app', 'data', 'generated')
const GENERATED_FILE = path.join(GENERATED_DIR, 'cms.json')
const FALLBACK_FILE = path.join(ROOT, 'app', 'data', 'fallback', 'content.json')

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (await exists(GENERATED_FILE)) {
    console.log('CMS data present at app/data/generated/cms.json.')
    return
  }

  if (!(await exists(FALLBACK_FILE))) {
    throw new Error(`Missing fallback snapshot: ${FALLBACK_FILE}`)
  }

  await mkdir(GENERATED_DIR, { recursive: true })
  await copyFile(FALLBACK_FILE, GENERATED_FILE)
  console.log('Seeded app/data/generated/cms.json from the offline fallback snapshot.')
}

main().catch((error) => {
  console.error(`Could not prepare CMS data: ${error.message}`)
  process.exitCode = 1
})
