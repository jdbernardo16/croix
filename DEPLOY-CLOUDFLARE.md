# Deploying the site to Cloudflare Pages

The Nuxt site is a fully static build. Cloudflare Pages runs `npm run generate`
on every push and on every CMS publish hook; the build pulls its copy from the
SilverStripe CMS and writes it into `app/data/generated/` plus
`public/uploads/cms/`.

**Runbook only — not executed.** Task 9 verification needs Cloudflare and
Hostinger access. Nothing below has been tried in the real accounts.

Prerequisites:

- The CMS is deployed, seeded, and answering
  `https://cms.croixlighting.com.ph/graphql` — see `../croix-cms/DEPLOY.md`.
- The `croix` repository (`github.com/jdbernardo16/croix`) is pushed.
- A Cloudflare account with a Pages project allowed.

## 1. Create the Pages project

Cloudflare dashboard → Workers & Pages → **Create** → Pages → **Connect to
Git**:

| Setting | Value |
| --- | --- |
| Repository | `jdbernardo16/croix` |
| Production branch | `main` |
| Framework preset | None (custom commands below) |
| Root directory | `/` |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |

`npm run generate` is `nuxt generate --preset static`; keep the preset. Do not
switch the command to `npm run build`, and do not set `NITRO_PRESET` — a
Cloudflare build environment otherwise selects `cloudflare-module` and emits
only two routes.

## 2. Build environment variables

Pages project → Settings → **Environment variables** → Production (repeat for
Preview if preview builds should pull real content):

| Variable | Value |
| --- | --- |
| `CMS_GRAPHQL_URL` | `https://cms.croixlighting.com.ph/graphql` |
| `CMS_ALLOW_FALLBACK` | `0` |
| `NODE_VERSION` | `22` |

Notes:

- `CMS_ALLOW_FALLBACK=0` makes the build fail when the CMS is unreachable, so
  stale fallback content is never published silently. Content validation
  failures never fall back either.
- **Gotcha:** if `CMS_GRAPHQL_URL` is missing, the pull script does not fail —
  it copies the committed offline snapshot. Confirm the variable exists and
  that the build log starts with `Pulling CMS content from` followed by the CMS
  URL.
- These are build-time variables, not runtime secrets. The deploy hook URL
  (§3) is the only secret involved.

## 3. Deploy hook for CMS publishes

1. Pages project → Settings → **Builds & deployments** → **Deploy hooks** →
   add a hook for the production branch (`main`).
2. Copy the generated URL. It contains a token: treat it as a secret and never
   commit it.
3. Put it in the CMS `.env` as `CROIX_BUILD_HOOK` (`../croix-cms/DEPLOY.md`
   §4 and §8), then verify:

```sh
vendor/bin/sake tasks:trigger-build
```

Trigger is a POST with `{"source":"croix-cms","event":"publish"}` (or
`unpublish`, `siteconfig`, `navitem`), debounced for 60 seconds in the CMS.
Publishing in the CMS should start one Pages build.

## 4. Contact form on Pages

Pages auto-detects the repo-root `functions/` directory, so
`functions/api/contact.ts` serves `POST /api/contact` without extra routing.
Set these runtime variables for **Production and Preview**:

| Variable | Notes |
| --- | --- |
| `BREVO_API_KEY` | `xkeysib-…` HTTP API key; add as a secret/encrypted value |
| `CONTACT_TO` | enquiry inbox |
| `CONTACT_FROM` | a sender verified in Brevo |

`worker/index.ts` and `wrangler.jsonc` are for the optional Workers deploy
(`npm run deploy`) and are not used by Pages; leaving them in the repo is fine.

`public/_headers` is copied into the build and applies the security, cache, and
`/pegs` noindex headers on Pages.

## 5. Preview verification (before any DNS change)

Every non-production branch gets a preview URL
(`https://<hash>.<project>.pages.dev`). Push the release branch, wait for the
build, then check:

- `/`, `/work`, `/work/cultural-center-philippines`, `/services`, `/studio`,
  `/studio/team`, `/contact`, `/privacy`, `/terms`.
- A missing URL returns the static 404 page with status 404.
- Images load from `/uploads/cms/<hash>.jpg` — not from the CMS host. The build
  must contain no `cms.croixlighting.com.ph` image URLs.
- Copy matches the CMS. Change one field in `/admin`, publish, confirm the hook
  starts a build, and confirm the change appears.
- Contact form: submit a real enquiry; check the inbox and the Brevo log.
- Mobile width and `https://` on the preview hostname.

Only after sign-off, continue to the cutover.

## 6. Custom domain cutover

Nothing here is done until preview passes and the client signs off.

1. At least 24 hours before: lower the TTL on the existing `www` record
   (current TTL and provider UI: `TBD`).
2. Pages project → **Custom domains** → add `www.croixlighting.com.ph` and
   `croixlighting.com.ph`.
3. If the zone is already on Cloudflare, Pages creates or updates the DNS
   records. If it is not, create the CNAME/ALIAS records Pages shows. Keep the
   `cms` record untouched.
4. Wait until both domains show **Active** and the certificate is issued.
5. Switch the `www` record to Pages. Keep the old Hostinger record and the
   Hostinger document root intact — that is the rollback (§7).
6. Recreate the Hostinger `.htaccess` behaviour that Pages does not inherit:
   HTTPS is automatic, the 404 page comes from `404.html`, and apex → `www`
   needs a Cloudflare Redirect Rule (or Bulk Redirect). Rule authoring: `TBD`.
7. Verify after propagation:

```sh
curl -sI https://www.croixlighting.com.ph/
curl -sI https://croixlighting.com.ph/
curl -sS https://www.croixlighting.com.ph/robots.txt
```

Then repeat the §5 spot checks on the real domain, including the contact form.

## 7. Rollback

Two levels:

- **Bad build only:** Pages → Deployments → pick the last known-good deployment
  → **Rollback to this deployment**. Instant, no rebuild, DNS unchanged.
- **Bad cutover:** restore the previous `www` DNS record pointing at Hostinger.
  The Hostinger static site and its `croix-config.php` must still be in place
  (the legacy deploy is kept current until the cutover is signed off — see
  `README.md`). Propagation follows the TTL lowered in §6.

While rolled back to Hostinger, publishing in the CMS still starts Pages
builds. Either accept the cost or clear `CROIX_BUILD_HOOK` in the CMS `.env`
until the next attempt.

## 8. Not covered yet

- DNS provider, TTL value, and apex redirect rule: `TBD`.
- Cloudflare Pages plan limits (build minutes, concurrent builds): `TBD`.
- Draft preview of unpublished CMS content: out of scope for this phase.
