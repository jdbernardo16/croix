/**
 * Serialize structured data for an inline JSON-LD `<script>` block.
 *
 * CMS-authored strings can contain markup. `JSON.stringify` leaves `<` intact,
 * so a value containing `</script><script>…</script>` would close the element
 * and execute. Escaping `<` as `\u003c` is valid JSON and keeps the payload
 * inert inside the script element.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
