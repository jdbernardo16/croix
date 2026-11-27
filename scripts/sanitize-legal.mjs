/**
 * Sanitizer for CMS-authored legal HTML.
 *
 * Legal bodies are the only CMS field rendered with `v-html`. Editors type
 * them in the CMS rich-text field, so the snapshot must never contain script,
 * event-handler, or navigational markup. `sanitizeHtml` parses the document and
 * discards anything outside the allowlist; do not replace this with a regex.
 *
 * The committed fallback snapshot is trusted repository content and is written
 * as-is, so this runs only on the CMS pull path.
 */

import sanitizeHtml from 'sanitize-html'

/** Elements the legal copy actually uses. */
const LEGAL_TAGS = ['h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br']

/** Link attributes the legal copy actually uses. */
const LEGAL_ATTRIBUTES = {
  a: ['href', 'title'],
}

/** Absolute schemes; protocol-relative `//host` URLs are rejected. */
const LEGAL_SCHEMES = ['http', 'https', 'mailto']

/**
 * Sanitize one legal document body.
 *
 * @param {string | null | undefined} value
 * @returns {string | null}
 */
export function sanitizeLegalHtml(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return sanitizeHtml(value, {
    allowedTags: LEGAL_TAGS,
    allowedAttributes: LEGAL_ATTRIBUTES,
    allowedSchemes: LEGAL_SCHEMES,
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard',
  })
}
