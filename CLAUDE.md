# CLAUDE.md — @meddleware/docs-site

## What this is

The user-facing documentation site for the Meddleware Sui tools (`docs.meddleware.co.uk`), built with
VitePress. Static content only — no wallet, no chain reads, no accounting logic. One site with a
section per service (Walrus Storage, Sealed Storage, Access Gate, Token Issuance, Treasury) and cross-cutting pages (fees, security and
privacy, FAQ, glossary, status and roadmap, dashboard).

## Browser tests

`npm run test:e2e` builds the site and runs the shared accessibility sweep (WCAG 2.2 AA and AAA in every colour mode × season, reflow, text
size, forced colours, keyboard) over the pages in `e2e/pages.ts` (add a new kind of page there); `E2E_BROWSERS=all` runs five browsers (CI does).

## Architectural invariants

- **Static, thin, read-only.** No app logic. It documents the tools; it never talks to the chain or a
  wallet. Keep it a content site.
- **Single site, sectioned.** All services live under one VitePress instance (one nav, one search
  index, one theme). Do not split into per-service docs subdomains.
- **On-brand via design tokens.** The theme is `@meddleware/vitepress-theme` (`.vitepress/theme/index.ts` re-exports it): every
  `--vp-*` colour is a token role, so the colour mode, the seasons and the 7:1 contrast follow the apps (**no gold/purple**). The site
  has no stylesheet of its own: to change how it looks, change the theme package (or the tokens), never add hex here.
  The theme also provides the brand: the company mark in the nav bar, the favicon set and `site.webmanifest` (so the site keeps **no**
  `docs/public/favicon.*` and no icon `<link>` in `config.ts`) and no web fonts (system stacks only). `tests/dist.test.mjs` checks all of it,
  and that no page loads anything from another origin, on the built `dist/` (skipped when `dist/` is absent; CI sets `REQUIRE_DIST=1`).
  The image's CSP allows no external images (`img-src 'self' data:`, written by `mw-sync`): use no remote image in a page.
- **Output is pinned to `dist/`.** `outDir` in `.vitepress/config.ts` resolves to the repo-root
  `dist/` so the Dockerfile's `COPY --from=build /app/dist` (shared static-server pattern) works
  unchanged. Do not rely on VitePress's default `.vitepress/dist`.
- **Reference = autodoc + imported on-chain docs, narrative = hand-authored.** `scripts/gen-api.mjs`
  runs TypeDoc over the SDK packages into each service's `api/` subtree (git-ignored, built fresh).
  Prose is written by hand, seeded from the packages' READMEs/CLAUDE.md.
- **On-chain docs are imported, never authored here.** For the Sui Move packages
  (`access-gate-sui`, `sealed-storage-sui`, `token-issuance-template-sui`) the canonical on-chain docs live in
  each package repo (`docs/onchain/*.md` + `manifest.json`) and ship in its npm package.
  `mw-gen-onchain` (from `@meddleware/vitepress-theme`, run by `build`/`dev`) copies the pages the manifest assigns to this site
  into a git-ignored subtree and generates the sidebar (`docs/.vitepress/generated/`). Resolution is
  `node_modules` by default, or `ONCHAIN_DOCS_ROOT=..` to preview sibling checkouts. Fails soft
  (placeholder pages for every standard page name). Fix on-chain content in the Move repo, not here;
  hand-written pages link to the imported ones instead of duplicating Move tables.
- **Autodoc fails soft.** A missing/unresolvable SDK writes a placeholder and warns rather than
  failing the whole build — an empty result means fix the SDK's `types`/`exports`, visible in CI logs.

## Content boundary (docs vs dev)

This site is **user-facing**: what/how/when for end users, in plain words, checked against the apps (labels, fees, limits, messages). Never show
a user a build variable, script name, repo path, "operator" for a gate owner or Meddleware, "coming soon", or the spelling `MeddleWare` (D117).
**Out of scope** (lives in `meddleware.dev`, repo `dev-site`): integration guides, SDK use, wire formats, self-host and white-label guides. Each
`reference.md` keeps the user-level reference and ends with a short "For developers" link to the dev site.

**Which network is live** comes from data, never prose: `docs/.vitepress/network.json` (`npm run gen:network` writes it from the installed
clients' deployment records; `npm run check:network` runs in CI). `NetworkNotice` prints it on the home and getting-started pages; every other
page says "testnet" and links to the notice. `tests/content.test.mjs` fails if a page claims mainnet is live, lacks a title or description,
uses banned wording, or is missing from the sidebar.

**Fees** on the fees page are the current defaults from the workspace cost model (`docs/economics/COST_MODEL.md`), labelled "current defaults, may
change"; update them when the model is re-priced.

## Key files

| File | Purpose |
| --- | --- |
| `docs/.vitepress/config.ts` | Nav, sidebar, local search, `outDir`, dark-first appearance. |
| `docs/.vitepress/theme/` | `export { default } from '@meddleware/vitepress-theme'` (the design-token theme, footer and landmark fixes). |
| `tests/` | `content.test.mjs` (pages, wording, sidebar, "For developers" pointers), `csp.test.mjs`, `dist.test.mjs` (built site), `network-notice.test.ts`, `onchain-ids.test.mjs`, `package-contents.test.mjs`. |
| `scripts/gen-api.mjs` | TypeDoc → Markdown SDK reference per service (resilient). The other build scripts are bins of `@meddleware/vitepress-theme` and `@meddleware/frontend-config`. |
| `docs/.vitepress/theme/NetworkNotice.vue`, `network.ts` | The one sentence about where the tools run, from `network.json`. |
| `docs/<service>/` | Per-service `index.md` (overview), `using.md`, `reference.md`, etc. |
| `Dockerfile` | node:24 build → static-server runtime with `CLEAN_URLS` + `NOT_FOUND_PAGE` (no VITE_* args, no SPA fallback). |
| `.github/workflows/npm-publish.yml`, `docker-publish.yml` | npm OIDC publish (`@meddleware/docs-site`, `NPM_PUBLISH` opt-in); multi-arch image build → merge → cosign → attest. |

## Deploy

Image → `quay.io/meddleware-org/docs-site`. Wired into the cluster via `config/images.yaml` +
`post-bootstrap/docs-site/` (ingress `docs.meddleware.co.uk`) in the platform workspace, then a Cloudflare
Tunnel public hostname. See the platform repo's `docs/images/IMAGES.md` and
`docs/networking/CLOUDFLARE.md`.

## What NOT to do

- Do not add wallet/chain/accounting logic — this is a content site.
- Do not add developer integration or white-label how-to here (that's `meddleware.dev`).
- Do not split into multiple docs subdomains.
- Do not hardcode brand colours or the build output path.
