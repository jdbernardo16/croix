#!/usr/bin/env node
/**
 * Safety checks for CMS-authored content that reaches the public site.
 *
 * Run with `npm run check:content`. The checks cover the two unsafe sinks:
 * legal HTML rendered with `v-html` and project fields injected into an inline
 * JSON-LD script.
 */

import assert from 'node:assert/strict'
import { sanitizeLegalHtml } from './sanitize-legal.mjs'
import { serializeJsonLd } from '../app/utils/jsonld.ts'

/* ------------------------------------------------------------------ *
 * Legal HTML
 * ------------------------------------------------------------------ */

const hostile =
  '<h2>Security</h2>' +
  '<p>Email <a href="mailto:info@example.com">info@example.com</a>.</p>' +
  '<script>alert(1)</script>' +
  '<p onclick="alert(2)">Text</p>' +
  '<a href="javascript:alert(3)">bad link</a>' +
  '<img src="x" onerror="alert(4)">' +
  '<a href="//evil.example">protocol-relative</a>' +
  '<style>body{display:none}</style>'

const sanitized = sanitizeLegalHtml(hostile)

assert.equal(sanitized?.includes('<script'), false, 'script tags must be removed')
assert.equal(sanitized?.includes('alert(1)'), false, 'script content must be removed')
assert.equal(sanitized?.includes('onclick'), false, 'event handlers must be removed')
assert.equal(sanitized?.includes('onerror'), false, 'image event handlers must be removed')
assert.equal(sanitized?.includes('javascript:'), false, 'javascript: URLs must be removed')
assert.equal(sanitized?.includes('//evil.example'), false, 'protocol-relative URLs must be removed')
assert.equal(sanitized?.includes('<style'), false, 'style tags must be removed')

assert.ok(sanitized?.includes('<h2>Security</h2>'), 'headings must survive')
assert.ok(
  sanitized?.includes('<a href="mailto:info@example.com">info@example.com</a>'),
  'mail links must survive',
)

const normal =
  '<h2>Who we are</h2>' +
  '<p>CROIX is a lighting design practice.</p>' +
  '<ul><li>One</li><li><strong>Two</strong></li></ul>' +
  '<p><em>Note</em><br />Next line</p>' +
  '<p><a href="https://example.com" title="Example">External link</a></p>'

assert.equal(sanitizeLegalHtml(normal), normal, 'allowlisted legal markup must be preserved unchanged')
assert.equal(sanitizeLegalHtml(null), null, 'missing legal content stays null')
assert.equal(sanitizeLegalHtml('   '), null, 'blank legal content stays null')

/* ------------------------------------------------------------------ *
 * JSON-LD
 * ------------------------------------------------------------------ */

const hostileProject = '</script><script>alert(1)</script>'
const jsonLd = serializeJsonLd({
  '@context': 'https://schema.org',
  name: hostileProject,
  description: 'A < B & C',
})

assert.equal(jsonLd.includes('</script>'), false, 'JSON-LD must not contain a raw closing script tag')
assert.equal(jsonLd.includes('<'), false, 'JSON-LD must not contain a raw <')
assert.ok(jsonLd.includes('\\u003c'), 'JSON-LD must escape < as \\u003c')
assert.deepEqual(
  JSON.parse(jsonLd),
  {
    '@context': 'https://schema.org',
    name: hostileProject,
    description: 'A < B & C',
  },
  'escaped JSON-LD must still parse to the original value',
)

console.log('ok   legal HTML sanitizer')
console.log('ok   JSON-LD escaping')
