#!/usr/bin/env node
/**
 * Shared read/write helpers for the build-time CMS snapshot.
 *
 * The pull script and the `predev` seed both write the same layout:
 *
 *   app/data/generated/cms.json      combined snapshot (docs/tests only)
 *   app/data/generated/<section>.json one file per app data module
 *   app/data/fallback/<section>.json  committed offline fallback
 *   app/data/fallback/meta.json       version/generatedAt for the fallback
 *
 * Sections are split so a page only bundles the copy it imports. Nothing in
 * the Nuxt app imports the combined `cms.json`.
 */

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const SECTIONS = [
  'site',
  'home',
  'work',
  'projects',
  'services',
  'studio',
  'team',
  'contact',
  'legal',
]

export const GENERATED_DIR = path.join(ROOT, 'app', 'data', 'generated')
export const GENERATED_FILE = path.join(GENERATED_DIR, 'cms.json')
export const FALLBACK_DIR = path.join(ROOT, 'app', 'data', 'fallback')
export const FALLBACK_META_FILE = path.join(FALLBACK_DIR, 'meta.json')

export function sectionFile(dir, section) {
  return path.join(dir, `${section}.json`)
}

async function readJsonFile(file, label) {
  let raw
  try {
    raw = await readFile(file, 'utf8')
  } catch (error) {
    throw new Error(`Missing ${label}: ${file}`, { cause: error })
  }

  try {
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`Invalid JSON in ${label}: ${file}`, { cause: error })
  }
}

export async function writeJsonAtomically(file, value) {
  await mkdir(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.tmp`
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`)
  await rename(temporary, file)
}

/** Read the committed per-section fallback and rebuild the combined snapshot. */
export async function readFallbackSnapshot() {
  const meta = await readJsonFile(FALLBACK_META_FILE, 'fallback metadata')
  const snapshot = {
    version: 1,
    generatedAt:
      typeof meta?.generatedAt === 'string' ? meta.generatedAt : new Date(0).toISOString(),
  }

  for (const section of SECTIONS) {
    snapshot[section] = await readJsonFile(
      sectionFile(FALLBACK_DIR, section),
      `fallback section "${section}"`,
    )
  }

  return snapshot
}

/** Write the combined snapshot and one file per section. */
export async function writeSnapshot(snapshot) {
  await writeJsonAtomically(GENERATED_FILE, snapshot)
  for (const section of SECTIONS) {
    await writeJsonAtomically(sectionFile(GENERATED_DIR, section), snapshot[section])
  }
}
