# CROIX — Website Design Peg

A working design direction for the CROIX Lighting Design Studio website, built with Nuxt 4 and Tailwind CSS 4. This is a **peg**, not the production site: it proves the visual system, the page rhythm, and the interaction model on one homepage, plus a reference board at `/pegs`.

## Preview without running it

Static captures are in `preview/`:

- `01-home.jpg`, `02-disciplines.jpg`, `03-work.jpg`, `03b-work-hover-ccp.jpg`, `04-evidence.jpg`
- `06-contact.jpg`, `07-footer.jpg`
- `08-pegs.jpg`, `09-pegs-refs.jpg`, `10-pegs-interaction.jpg`
- `11-mobile.jpg`, `12-mobile-disciplines.jpg`

## Run it

```bash
npm install
npm run dev        # http://localhost:3030
npm run generate   # static build in .output/public
```

## Deploy to Hostinger (shared hosting)

The site is a fully static Nuxt build. Hostinger serves it from the folder mapped to the domain or subdomain; the only server-side code is `public/api/contact.php`, which emails enquiries through Brevo's HTTP API. No Node runtime is needed on the host.

### 1. Build the upload package

```bash
npm run package:hostinger
```

This runs `nuxt generate --preset static` (36 routes) and writes `croix-hostinger.zip` (about 4 MB). The `--preset static` flag matters: without it, a Cloudflare build environment sets `NITRO_PRESET=cloudflare-module` and only two routes are generated.

### 2. Upload

1. hPanel → Files → **File Manager** → open the document root for the site:
   - main domain: usually `public_html`
   - subdomain: the folder hPanel shows for it, e.g. `public_html/__croix`
2. Delete Hostinger's default `index.html` / `default.php` if present.
3. Upload `croix-hostinger.zip`, then **Extract** into that folder, then delete the zip.
4. Confirm `index.html`, `.htaccess`, `api/`, `_nuxt/`, and `work/` sit directly in the document root — not inside a nested folder.
5. In File Manager settings, enable **Show hidden files** so `.htaccess` is visible and editable.

Hostinger runs LiteSpeed, which reads `.htaccess`. It handles the `/api/contact` rewrite, HTTPS, apex → `www`, the 404 page, cache headers, and compression.

### 3. Subdomain or subfolder install

For a subdomain such as `https://croix.project-uat.online/` whose docroot is `/public_html/__croix/`:

- Extract the zip into `public_html/__croix/`, **not** into `public_html/`. The folder name is only the docroot; the URL is the subdomain root, so no `baseURL` change is needed.
- Put `croix-config.php` **inside `__croix/`**, next to `index.html`. The bundled `.htaccess` denies direct requests to it and PHP never prints its contents. One level above `__croix` is the main site's `public_html`, so do not put the key there.
- `.htaccess` needs no edits: the API rewrite is relative, and the apex → `www` rule only fires for `croixlighting.com.ph`.
- Install a separate SSL certificate for the subdomain in hPanel.
- This is a UAT host, so keep it out of search results: append `deploy/hostinger/uat-noindex.conf` to `.htaccess` and replace `robots.txt` with `deploy/hostinger/uat-robots.txt`. Remove both for production.
- `sitemap.xml` still lists the production URLs. That is fine while the UAT site is noindexed; regenerate it with the real host before a production subdomain launch.

If the site is served from a **subfolder of a URL** (e.g. `https://example.com/croix/`) instead of a subdomain, set `app.baseURL = '/croix/'` in `nuxt.config.ts` and rebuild.

### 4. PHP and the Brevo key

1. hPanel → Advanced → **PHP Configuration** → select PHP 8.1 or newer. The endpoint needs the cURL extension, which Hostinger enables by default.
2. Create `croix-config.php` using `deploy/hostinger/croix-config.example.php`:

   **Main domain** — one level above `public_html`:

   ```
   /home/uXXXXXXXX/domains/croixlighting.com.ph/croix-config.php
   /home/uXXXXXXXX/domains/croixlighting.com.ph/public_html/...
   ```

   **Subdomain** — inside the subdomain docroot (protected by `.htaccess`):

   ```
   /home/uXXXXXXXX/domains/project-uat.online/public_html/__croix/croix-config.php
   /home/uXXXXXXXX/domains/project-uat.online/public_html/__croix/index.html
   ```

   ```php
   <?php
   return [
       'BREVO_API_KEY' => 'xkeysib-...',
       'CONTACT_TO' => 'info@croixlighting.com.ph',
       'CONTACT_FROM' => 'website@croixlighting.com.ph',
   ];
   ```

   For UAT, point `CONTACT_TO` at your own inbox so test enquiries do not reach the client.

3. In Brevo: Settings → SMTP & API → **API keys** → create a key. It starts with `xkeysib-`. The SMTP key (`xsmtpsib-…`) will not work with the HTTP API.
4. Verify `website@croixlighting.com.ph` (or whichever `CONTACT_FROM` you use) under Brevo → Senders & Domains.
5. **Revoke the SMTP key that was shared in chat.** Treat it as compromised.

If `croix-config.php` is missing, the form returns a 503 and tells the visitor to email the studio directly.

### 5. SSL and domain

1. hPanel → Security → **SSL** → install the free certificate for the domain (or the subdomain) and `www` where applicable.
2. `.htaccess` already forces HTTPS and redirects `croixlighting.com.ph` → `https://www.croixlighting.com.ph`.
3. If the production domain is not `www.croixlighting.com.ph`, update `public/.htaccess`, `public/robots.txt`, and `public/sitemap.xml`, then rebuild.

### 6. Test after upload

- `/` and `/work`
- `/work/cultural-center-philippines` and `/work/arena-di-verona`
- `/studio` and `/studio/team`
- `/services`
- `/contact` — submit a real enquiry; check the inbox and the Brevo transactional log
- `/privacy`, `/terms`, and a missing URL (should show the CROIX 404, status 404)
- `https://` and the apex redirect

### 7. Updating the site

Rebuild and re-upload:

```bash
npm run package:hostinger
```

Upload the zip, extract over the existing files, delete the zip. `croix-config.php` survives because it is not part of the package. Hashed `_nuxt/` assets are cached for a year; old ones can be removed after a deploy.

### Notes

- `public/_headers` is Cloudflare-only and is ignored by LiteSpeed. `.htaccess` is the Hostinger equivalent.
- `/pegs` is unlinked and noindexed, but it is still uploaded. Delete `pegs/` from the docroot (or remove `app/pages/pegs.vue` before building) if you do not want the internal review board public.
- Shared hosting has no Node process, so the Cloudflare Worker in `worker/` is unused here. It stays in the repo only for the optional Cloudflare deploy below.

### Alternative: Cloudflare Workers

`wrangler.jsonc` + `worker/index.ts` still deploy the same static build to Workers, with `/api/contact` handled by the Worker instead of PHP. Build command `npm run generate`, deploy command `npx wrangler deploy`, and add `BREVO_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` as Worker runtime variables. `functions/api/contact.ts` keeps the Pages route working too.

## Structure

```
app/
  components/     SiteHeader, LightHero, TickerStrip, DisciplineSplit,
                  WorkIndex, ProofStrip, ContactBlock, SiteFooter
  pages/          index.vue (concept), pegs.vue (reference board)
  assets/css/     Tailwind theme + custom treatments
  plugins/        reveal.client.ts (IntersectionObserver reveals)
worker/
  index.ts        Cloudflare Worker: /api/contact + static assets
functions/api/    Pages-compatible contact handler
wrangler.jsonc    Workers config (name, entry, assets)
public/
  .htaccess       Hostinger: rewrites, HTTPS, 404, cache headers
  api/contact.php Brevo contact endpoint (PHP, no Composer)
  img/            logo, hero, project and reference imagery
  _headers        Cloudflare-only headers (ignored by LiteSpeed)
  robots.txt      /pegs excluded
deploy/hostinger/ croix-config.example.php
```

## Design thesis

**A gallery that can read a datasheet.**

The company profile is full of hard proof — UGR < 19, DIALux plates, IP66/67, AISI 316L, 35–55% fee savings — but its PDF design (green headings, brush type, gold triangles) fights the 2026 brand guide. This peg follows the guide, not the PDF.

Three registers, one voice:

1. **Gallery Daylight** — default pages. Gallery Alabaster, Plaster Mist, Darkroom type, Kelvin Bronze accents. Manrope 200/300 for display, Inter 300 for body, IBM Plex Mono for measurements.
2. **Nocturne** — hero plates and case-study covers. Darkroom field, one warm image, captions in the penumbra.
3. **Precision** — industrial routes. Cast Charcoal, AISI 316L alloy, one category accent. Space Grotesk Bold headings, Plex Mono data.

Hard rules carried from the guide:

- Violet `#5B21B6` lives **only inside the CROIX mark** — no purple buttons, links, hovers, borders, or gradients.
- Bronze is an **accent**, not body copy. `#B39463` on gallery white is ~2.6:1; `--color-bronze-ink` (a darker 4.7:1 variant) is used for small labels on light.
- Hairlines dissolve; corners are 20–28px; no hard boxes, no glass cards.
- Logo clear space is preserved in the header and footer plaque.

## Interactions

- **Hero light** — a soft radial glow follows the cursor across the Nocturne image (`mix-blend-mode: screen`), disabled on touch and reduced-motion.
- **Discipline split** — drag (or keyboard) the aperture to compare the architectural and industrial systems. A native range input drives `clip-path`, so it works with touch and arrow keys. Mobile gets two stacked cards instead.
- **Work index** — hovering a project floats a preview (real CCP/NSCR imagery or a typographic plate) near the cursor; clamped to the list bounds.
- **Reveal system** — one IntersectionObserver, 900ms easing, no scroll-jacking. Reduced motion disables all of it.
- **Marquee** — quiet client strip, pauses on hover.

## Reference board

`/pegs` groups twelve live references into Nocturne, Gallery Daylight, Precision Instrument, and Interaction — each with a “borrow” and “avoid” note. Screenshots were captured November 2026 for internal review only. Do not publish them.

Primary references:

- L'Observatoire International — lobsintl.com
- Apparatus — apparatusstudio.com
- Bocci — bocci.com
- Davide Groppi — davidegroppi.com
- Lambert & Fils — lambertetfils.com
- Michael Anastassiades — michaelanastassiades.com
- David Chipperfield Architects — davidchipperfield.com
- Delta Light — deltalight.com
- Teenage Engineering — teenage.engineering
- ERCO — erco.com
- IFI Lighting Design — ifilighting.com
- Lampå — lampa.bornfight.studio

## Contact email (Brevo)

The contact form posts to `/api/contact`: `public/api/contact.php` on Hostinger, `worker/index.ts` on Cloudflare Workers, or `functions/api/contact.ts` on Cloudflare Pages. All three send through Brevo's **HTTP API**; none uses SMTP or `nodemailer`.

1. **Revoke the SMTP key that was shared in chat.** Treat it as compromised.
2. In Brevo: Settings → SMTP & API → **API keys** → create a key. It starts with `xkeysib-`. The SMTP key (`xsmtpsib-…`) will not work with the HTTP API.
3. Verify a sender in Brevo (Senders & Domains). `website@croixlighting.com.ph` or `info@croixlighting.com.ph` must be verified before Brevo will send.
4. On Workers: Worker → Settings → Variables and Secrets → add the three variables below for Production (and Preview if used). They are **runtime** variables, not build variables.
   - `BREVO_API_KEY` — the `xkeysib-…` key (secret)
   - `CONTACT_TO` — defaults to `info@croixlighting.com.ph`
   - `CONTACT_FROM` — defaults to `website@croixlighting.com.ph` (must be a verified Brevo sender)
5. Deploy. On Workers, `wrangler.jsonc` points at `worker/index.ts` and `.output/public`; on Pages, the root `functions/` directory is detected automatically.
6. Local full-stack test: `npx wrangler dev` (Workers) or `npx wrangler pages dev .output/public` (Pages) with a `.dev.vars` file (gitignored). `npm run dev` serves the Nuxt app but not the API, so the form's POST will 404 locally.

The function validates server-side, includes a honeypot, escapes HTML, and does not upload files. File names are included in the email; the sender is asked to email the drawings separately. Add Turnstile or a KV rate limit before heavy traffic.

## Before production

1. **Logo** — the header/footer mark is a raster crop from the supplied PDF. Replace with the vector master (SVG), including a reversed version for dark grounds.
2. **Address** — the profile says 24 Saint Rita St., Parañaque 1718; the guide says Werco Arcade Lot 18, Parañaque 1715. This peg uses the guide’s address. Pick one canonical NAP.
3. **Contact details** — profile still has placeholders. This peg uses `info@croixlighting.com.ph` and `+63 969 222 8111` from the guide.
4. **Photography** — five of eight projects have no usable images. The work section uses the two real CCP/NSCR assets and typographic plates for the rest; commission or license the missing photography.
5. **Industrial line** — the profile never mentions Ex-Proof, Egress, or Marine. The guide presents them as live. Confirm status before adding `/industrial`.
6. **Forms** — the form posts to `/api/contact` and emails via Brevo. It still needs file uploads (DWG/RVT/PDF), Turnstile or rate limiting, and a real privacy-consent record.
7. **Content** — the page-2 quote is still “insert quote here”; no testimonials, client logos, or project years exist yet.
8. **Copy claims** — “35–55%” comes from the profile; confirm it is still approved for public use. The site says “within a few days,” matching the profile’s wording.

## Imagery credits

- Hero/gallery/industrial placeholders: Unsplash (free license). Replace with CROIX project photography.
- CCP interior/exterior and NSCR imagery: extracted from the supplied CROIX company profile.
- Logo: cropped from the supplied company profile cover.
