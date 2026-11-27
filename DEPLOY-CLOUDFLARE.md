# Deploying the site to Cloudflare Pages

The Nuxt site is a fully static build. Cloudflare Pages runs `npm run generate`
on every push and on every CMS publish hook; the build pulls its copy from the
SilverStripe CMS and writes it into `app/data/generated/` plus
`public/uploads/cms/`.

**Runbook only — not executed.** Task 9 verification needs Cloudflare and
Hostinger access. Nothing below has been tried in the real accounts.

Prerequisites:

- The CMS is deployed, seeded, and answering
  `https://cms.croixlighting.com.ph/graphql` (assumed hostname) — see
  `../croix-cms/DEPLOY.md`.
- **The release branch is merged to `main`, or the Pages production branch is
  set to the release branch** (currently `feat/headless-cms`). `main` does not
  contain the headless work yet; a build from `main` today would ship the old
  static site.
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

The production branch must contain the release commit: merge
`feat/headless-cms` to `main` first, or use `feat/headless-cms` as the production
branch for the first deployment and switch to `main` after the merge.

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
- These are build-time variables, not runtime secrets. Within this build
  configuration the deploy hook URL (§3) is the only secret; the Brevo key (§4)
  is a separate runtime secret.

## 3. Deploy hook for CMS publishes

1. Pages project → Settings → **Builds & deployments** → **Deploy hooks** →
   add a hook for the production branch chosen in §1.
2. Copy the generated URL. It contains a token: treat it as a secret and never
   commit it.
3. Put it in the CMS `.env` as `CROIX_BUILD_HOOK` (`../croix-cms/DEPLOY.md`
   §4 and §8), then verify:

```sh
vendor/bin/sake tasks:trigger-build
```

Trigger is a POST with `{"source":"croix-cms","event":"publish"}` (or
`unpublish`, `siteconfig`, `navitem`), debounced for 60 seconds in the CMS.
Publishing in the CMS should start one Pages build **of the production branch**,
so the change appears on the production `*.pages.dev` deployment
(`https://<project>.pages.dev`), not on a preview URL. To see a CMS change on a
preview deployment, push the preview branch after the publish.

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
- Copy matches the CMS. Change one field in `/admin`, publish, then push the
  preview branch and confirm the change appears — the deploy hook rebuilds the
  production branch only.
- On the production `*.pages.dev` deployment, publishing alone should rebuild.
- Contact form: submit a real enquiry; check the inbox and the Brevo log.
- Mobile width and `https://` on the preview hostname.

Only after sign-off, continue to the cutover.

## 6. Custom domain cutover

Nothing here is done until preview passes and the client signs off.

1. Record the current DNS values and TTLs for **both** `www` and the apex
   (A/AAAA/CNAME targets, proxy status, TTL). This is the rollback baseline.
2. At least 24 hours before: lower the TTL on both records (provider UI:
   `TBD`).
3. Pages project → **Custom domains** → add `www.croixlighting.com.ph` and
   `croixlighting.com.ph`.
4. If the zone is already on Cloudflare, Pages creates or updates the DNS
   records. If it is not, create the CNAME/ALIAS records Pages shows. Keep the
   `cms` record untouched.
5. Wait until both domains show **Active** and the certificate is issued.
6. Switch **both** records to Pages: `www` and the apex (ALIAS/flattening where
   the provider supports it). Keep the Hostinger targets recorded in step 1 —
   those are the rollback (§7).
7. Recreate the Hostinger `.htaccess` behaviour that Pages does not inherit:
   HTTPS is automatic, the 404 page comes from `404.html`, and apex → `www`
   needs a Cloudflare Redirect Rule (or Bulk Redirect). Rule authoring: `TBD`.
8. Verify both hostnames after propagation:

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
- **Bad cutover:** restore the step-1 `www` and apex targets (Hostinger). The
  Hostinger static site and its `croix-config.php` must still be in place (the
  legacy deploy is kept current until the cutover is signed off — see
  `README.md`). Propagation follows the TTL lowered in §6.

While rolled back to Hostinger, publishing in the CMS still starts Pages
builds. Either accept the cost or clear `CROIX_BUILD_HOOK` in the CMS `.env`
until the next attempt.

## 8. Not covered yet

- DNS provider, TTL value, and apex redirect rule: `TBD`.
- Cloudflare Pages plan limits (build minutes, concurrent builds): `TBD`.
- Draft preview of unpublished CMS content: out of scope for this phase.
