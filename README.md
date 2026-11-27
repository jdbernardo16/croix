# CROIX — Lighting Design Studio site

Nuxt 4 + Tailwind CSS 4 marketing site for CROIX Lighting Design Studio. The
site is a fully static build; copy, images, projects, team, and navigation are
edited in the SilverStripe CMS (`../croix-cms/`) and pulled in at build time.
The browser never calls the CMS.

## Content pipeline

Build-time pull, not runtime API calls:

1. `scripts/cms-pull.mjs` queries the CMS GraphQL endpoint (`CMS_GRAPHQL_URL`),
   normalises every page and project, downloads referenced images into
   `public/uploads/cms/`, and writes a snapshot.
2. `scripts/cms-snapshot.mjs` splits it into one file per section in
   `app/data/generated/` (`site.json`, `home.json`, `work.json`,
   `projects.json`, `services.json`, `studio.json`, `team.json`,
   `contact.json`, `legal.json`) so a page bundles only what it imports.
3. Pages read those files through the typed modules in `app/data/` (for example
   `app/data/home.ts`). `app/data/content.ts` is kept for docs and tests only;
   pages no longer import it.
4. When the CMS is unreachable and `CMS_ALLOW_FALLBACK=1`, the build restores
   the committed snapshot in `app/data/fallback/` instead. `npm run dev` does
   this whenever `app/data/generated/` is missing, so a clean checkout runs
   offline.

`app/data/generated/` and `public/uploads/cms/` are gitignored build artifacts.
`app/data/fallback/` is committed and must be refreshed when a release changes
the default copy.

### Commands and environment

| Command | What it does |
| --- | --- |
| `npm run cms:pull` | Pull CMS content only (`prebuild` and `pregenerate` run it automatically) |
| `npm run dev` | Seed missing generated data from the fallback, then Nuxt on :3030 |
| `npm run generate` | Pull CMS content, then `nuxt generate --preset static` → `.output/public` |
| `npm run preview` | Serve the generated output |
| `npm run package:hostinger` | Generate, then zip `.output/public` for the legacy Hostinger host |
| `npm run deploy` | Deploy the Cloudflare Worker variant (`worker/index.ts`) |

| Variable | Meaning |
| --- | --- |
| `CMS_GRAPHQL_URL` | CMS endpoint; production `https://cms.croixlighting.com.ph/graphql`, local `http://localhost:8000/public/graphql` |
| `CMS_ALLOW_FALLBACK` | `1` builds from `app/data/fallback/` when the CMS is unreachable; `0` fails instead |

Both are read from the process environment first, then from `.env`; see
`.env.example`. With `CMS_GRAPHQL_URL` unset the build always uses the fallback,
even when `CMS_ALLOW_FALLBACK=0`, so a production build needs the variable set.

## Run it

```bash
npm install
npm run dev        # http://localhost:3030
npm run generate   # static build in .output/public
```

For content editing locally, run the CMS as well — see
`../croix-cms/README.md`.

## Deploy

**Primary: Cloudflare Pages.** Pages project from the `croix` GitHub repo, build
command `npm run generate`, output `.output/public`, build variables
`CMS_GRAPHQL_URL` and `CMS_ALLOW_FALLBACK=0`. The CMS publish hook triggers a
Pages deploy hook. Full runbook, cutover, and rollback: `DEPLOY-CLOUDFLARE.md`.

### Legacy: Hostinger static hosting (pre-cutover fallback)

This is the current production host until the Cloudflare cutover is signed off,
and the rollback target afterwards. It serves `.output/public` with no Node
runtime; the only server-side code is `public/api/contact.php`, which emails
enquiries through Brevo's HTTP API.

1. Build: `npm run package:hostinger` (runs the CMS pull first — set
   `CMS_GRAPHQL_URL` to publish current CMS copy, or leave it unset to publish
   the committed fallback).
2. hPanel → Files → **File Manager** → open the document root (public_html
   for the main domain, or the folder shown for a subdomain).
3. Upload croix-hostinger.zip, **Extract** it there, delete the zip. Confirm
   index.html, .htaccess, api/, _nuxt/, and work/ sit directly in the docroot.

Hostinger runs LiteSpeed, which reads `public/.htaccess`: the `/api/contact`
rewrite, HTTPS, apex → `www`, the 404 page, cache headers, and compression.

PHP and the Brevo key:

1. hPanel → Advanced → **PHP Configuration** → PHP 8.1 or newer; cURL is on by
   default.
2. Create `croix-config.php` from `deploy/hostinger/croix-config.example.php` —
   one level above public_html for the main domain, inside the subdomain
   docroot for a subdomain. It holds `BREVO_API_KEY`, `CONTACT_TO`, and
   `CONTACT_FROM`; it is gitignored and denied by `.htaccess`.
3. Verify `CONTACT_FROM` as a Brevo sender. A missing config returns 503; a
   Brevo rejection returns 502 and logs `CROIX contact: Brevo HTTP`.

UAT noindex: append `deploy/hostinger/uat-noindex.conf` to `.htaccess` and
replace `public/robots.txt` with `deploy/hostinger/uat-robots.txt`. Remove both
for production. Update the site by repeating step 1 and extracting over the
existing files; `croix-config.php` is not in the package, so it survives.

### Contact handler

All three transports send through Brevo's **HTTP API**; none uses SMTP:

- `public/api/contact.php` — Hostinger.
- `functions/api/contact.ts` — Cloudflare Pages (auto-detected `functions/`).
- `worker/index.ts` — Cloudflare Workers (`npm run deploy`).

Runtime variables: `BREVO_API_KEY` (the `xkeysib-…` HTTP key, not the
`xsmtpsib-…` SMTP key), `CONTACT_TO`, `CONTACT_FROM`. Locally, `npm run dev`
does not serve the API; use `npx wrangler dev` with `.dev.vars`. The endpoint
validates server-side, includes a honeypot, escapes HTML, and does not upload
files. Add Turnstile or a KV rate limit before heavy traffic.

## Structure

```
app/
  components/     SiteHeader, LightHero, DisciplineSplit, WorkIndex, ...
  pages/          index.vue, work/, studio/, services.vue, contact.vue, ...
  data/           per-section CMS modules, generated/, fallback/
  types/cms.ts    CMS snapshot types
scripts/          cms-pull.mjs, cms-snapshot.mjs, ensure-cms-data.mjs
worker/           Cloudflare Worker contact handler + static assets
functions/api/    Pages-compatible contact handler
public/           .htaccess, api/contact.php, img/, uploads/cms/, sitemap.xml
deploy/hostinger/ croix-config.example.php, UAT noindex files
```

## Design thesis and motion

**A gallery that can read a datasheet.** Three registers, one voice: **Gallery
Daylight** (Gallery Alabaster, Plaster Mist, Darkroom type, Kelvin Bronze
accents; Manrope 200/300 display, Inter 300 body, IBM Plex Mono measurements),
**Nocturne** (hero plates, one warm image, captions in the penumbra), and
**Precision** (Cast Charcoal, AISI 316L alloy, one category accent).

Hard rules: violet `#5B21B6` lives only inside the CROIX mark; bronze is an
accent, not body copy; hairlines dissolve; corners are 20–28px; no hard boxes or
glass cards. Motion is one IntersectionObserver reveal system (no
scroll-jacking), a cursor-following hero glow, a drag/keyboard discipline
aperture, and a hover project preview — all disabled for reduced motion.

`app/pages/pegs.vue` is an internal reference board: unlinked and noindexed, but
still shipped; delete the pegs page from the built docroot if it should not be
public.

## Before production

1. **Logo** — replace the raster crop with an SVG master, including a reversed
   version for dark grounds.
2. **Address** — the profile and the brand guide disagree; pick one canonical
   NAP and enter it in the CMS SiteConfig.
3. **Photography** — several projects have no usable images; commission or
   license the missing shots.
4. **Forms** — file uploads (DWG/RVT/PDF), Turnstile or rate limiting, and a
   real privacy-consent record are still open.
5. **Copy claims** — confirm the "35–55%" fee-savings figure is still approved
   for public use.
