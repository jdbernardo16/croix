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

## Deploy to Cloudflare Workers (free)

The app is hosted as a **Workers static-assets site** with one small Worker for the contact form. Cloudflare's build image sets `NITRO_PRESET=cloudflare-module`, so `npm run generate` passes `--preset static` to force a full 36-route prerender. Without that flag the build only emits `/200.html` and `/404.html`, and every page returns 404.

### 1. Repository

The Nuxt app is the repository root (`peg/` is its own git repo). `main` is the production branch.

```bash
cd peg
npm run generate
npx wrangler deploy --dry-run   # validates worker + assets locally
```

### 2. Cloudflare Workers Builds settings

Dashboard → Workers & Pages → `croix` → Settings → Build:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run generate` |
| Deploy command | `npx wrangler deploy` |
| Root directory | blank (the repo root is the app) |
| Node version | `22` (`NODE_VERSION=22`; `.nvmrc` is also present) |

`wrangler.jsonc` supplies the Worker name, entrypoint, and assets directory. Do **not** set a build output directory — this is not a Pages project.

```jsonc
{
  "name": "croix",
  "main": "worker/index.ts",
  "assets": { "directory": ".output/public", "binding": "ASSETS", "not_found_handling": "404-page" }
}
```

`worker/index.ts` serves static assets from the `ASSETS` binding and routes `POST /api/contact` to the same handler used by `functions/api/contact.ts`.

### 3. Runtime environment variables

These are **runtime** secrets on the Worker, not build variables. Workers & Pages → `croix` → Settings → Variables and Secrets → add for Production:

| Name | Value |
|---|---|
| `BREVO_API_KEY` | Brevo API key starting with `xkeysib-` (secret) |
| `CONTACT_TO` | `info@croixlighting.com.ph` (optional) |
| `CONTACT_FROM` | a verified Brevo sender, e.g. `website@croixlighting.com.ph` (optional) |

`BREVO_API_KEY` is not the SMTP key. See **Contact email (Brevo)** below. Without it the form returns a 503 and shows the studio email address instead.

### 4. First deploy

Deploy, then check:

- `/` and `/work`
- `/work/cultural-center-philippines` and `/work/arena-di-verona`
- `/studio` and `/studio/team`
- `/services`
- `/contact` — submit a real enquiry; check the Brevo log and the Worker log (`wrangler tail croix`)
- `/privacy`, `/terms`, and a missing URL for the 404

`_headers`, `sitemap.xml`, `robots.txt`, and `favicon.png` are served from `.output/public`. The `/pegs` route is unlinked, noindexed, and `X-Robots-Tag: noindex, nofollow`.

### 5. Custom domain

1. Worker → Settings → Domains & Routes → add `www.croixlighting.com.ph` and `croixlighting.com.ph`.
2. If the domain is already on Cloudflare, the DNS records are created automatically. If not, move the nameservers to Cloudflare or add the CNAME at the registrar.
3. Set `www` as the primary and add a Redirect Rule: apex → `https://www.croixlighting.com.ph/$1` (301).
4. SSL/TLS → **Full (strict)**, and enable **Always Use HTTPS**.
5. If the final domain is not `www.croixlighting.com.ph`, update `public/robots.txt` and `public/sitemap.xml` before deploying.

### 6. Free-tier notes

- Workers static assets: free and unlimited requests.
- Worker requests: 100,000/day on the free plan — only `/api/contact` and missing paths invoke it.
- Brevo: 300 emails/day on the free plan.
- Remove `app/pages/pegs.vue` and the `public/img/pegs/` folder before launch if you do not want the internal review board deployed.

### Alternative: Cloudflare Pages

Pages also works without `wrangler.jsonc` or `worker/`: build `npm run generate`, output `.output/public`, and let Pages pick up `functions/api/contact.ts`. Set the same three variables as Pages environment variables. The Pages build image does not set `NITRO_PRESET`, so `npm run generate` is enough there.

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
  img/            logo, hero, project and reference imagery
  _headers        Cloudflare security/cache headers
  robots.txt      /pegs excluded
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

The contact form posts to `/api/contact`, handled by `worker/index.ts` on Workers (or `functions/api/contact.ts` on Pages). Both call the same handler and send through Brevo's **HTTP API**. Neither static hosting model can run SMTP or `nodemailer`.

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
