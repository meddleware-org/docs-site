# Changelog

All notable changes to `@meddleware/docs` are documented here.

## [0.0.47] - 2026-11-07

### Added

- User pages: Token Issuance (overview, walkthrough, reference), Dashboard, Status and roadmap, Questions and troubleshooting (with the messages the apps show), Glossary, Fees (every fee, current default, who receives it, from the cost model) and Security and privacy (custody, what Meddleware can and cannot see or do, the Sealed Storage trust model, data handling, legal notices).
- `NetworkNotice` (home and getting started): "Live on Sui testnet; mainnet is coming." or "Live on Sui testnet and mainnet.", read from `docs/.vitepress/network.json`, which `npm run gen:network` writes from the clients' deployment records and CI checks (`npm run check:network`). Every other page says "testnet" and points to it.
- Tests: the notice and its wording; every page has a title and description, is in the sidebar, and claims no live mainnet; banned developer wording stays off the pages.

### Changed

- Content reviewed against the apps: the Walrus Storage, Sealed Storage and Access Gate walkthroughs now use the real tab, step and button labels (Encrypt, Decrypt and Unlock are separate tabs; credits; Permanent; Show cost then Extend), the real fees and limits, and the real messages. Corrected: the public Walrus relay is a fallback only while Meddleware's relay is unavailable (a wallet without a pass is asked to buy one), and the Access Gate console is for gate owners (buyers purchase in the seller's app).
- The reference pages keep the user-level facts (settings, fees, limits, permanent rules, messages, identifiers); developer detail (wire formats, JSON object shapes, event and function names, SDK types) is replaced by a short "For developers" link to the developer site.
- The "Coming soon" navigation entries, the stub page for other blockchains and the retired DAO page are gone; the navigation lists the tools, fees, security and privacy, help and the developer site. Home, `llms.txt` and page titles use the user-facing wording ("gate owner", "Meddleware").
- Build scripts now come from `@meddleware/vitepress-theme` 0.0.3 (`mw-gen-onchain`, `mw-check-onchain-ids`, `mw-gen-llms-full`, `mw-check-dist-no-audit`) and `@meddleware/frontend-config` 0.0.7 (`mw-audit-gate`, `mw-third-party-licenses`, `mw-check-csp-inline`, `mw-sync`); the local copies and their tests are removed, and a test runs the on-chain id check against the real pages.
- Takes `@meddleware/ui` ^0.1.40 and the reworded on-chain pages of `@meddleware/access-gate-sui` 0.0.12 and `@meddleware/token-issuance-template-sui` 1.0.12.
- The sidebar keeps a focused item out from under the navigation bar when it scrolls (WCAG 2.4.11): provided by `@meddleware/vitepress-theme` 0.0.4, so the site carries no stylesheet of its own.
- The browser tests cover eleven pages (new: getting started, walkthrough, Token Issuance, fees, security, FAQ, glossary).

## [0.0.46] - 2026-11-06

### Changed

- Takes `@meddleware/ui` ^0.1.39 (the tab list items use `role="none"`) and the Dependabot merges of 2026-11-06: image bases `static-server` 0.1.12 and a refreshed `node` build image, and newer dev tools.

## [0.0.45] - 2026-11-05

### Fixed

- The footer's legal links are no longer hidden behind the fixed sidebar (`@meddleware/vitepress-theme` 0.0.2); VitePress 2.0.0-alpha.21.
- Two reference pages label the signed access message v3, as the message string is.

### Added

- `npm run check:csp` runs in CI: every inline script of the build is allowed by the image's CSP (it also refuses `'unsafe-inline'` and an empty build).

### Changed

- Dependency alignment: `@meddleware/ui` ^0.1.38 (form-field edge contrast, sticky-offset and focus-not-obscured fixes), `@meddleware/design-tokens` ^0.1.13, `@meddleware/web-utils` ^0.0.2 and `@meddleware/frontend-config` ^0.0.2.

## [0.0.44] - 2026-10-31

- Shared VitePress theme and accessibility gates

## [0.0.43] - 2026-10-30

- Dependency updates (minor and patch groups) and workflow action bumps. No source change.

## [0.0.42] - 2026-10-30

- Point the developer-docs and indexer links at the machine zone (ADR-0005); current @meddleware packages.

## [0.0.41] - 2026-10-24

### Changed

- Reference pages: the access message is `access-gate-gateway:access:v3`; the Move package is `sealed_storage` (ADR-0004).
- `robots.txt`, a curated `llms.txt` and a generated `llms-full.txt` (the whole site in one file, built after `vitepress build`).

## [0.0.40] - 2026-10-24

### Fixed

- The link to the gateway guide reads "Deploy the access-gate gateway" (it still said "NFT gate gateway").

## [0.0.39] - 2026-10-24

### Changed

- Dependencies on the latest package releases (`access-gate-sui` 0.0.9, `access-gate-client` 0.0.11, `access-gate-gateway-client` 0.0.20, `ui` 0.1.33); generated pages use the renamed package and service names (ADR-0003).

## [0.0.38] - 2026-10-24

### Fixed

- The image publish workflow pushed to the old repository name (`docs`); it now publishes `docs-site`, the name `config/images.yaml` pins. No code change.

## [0.0.37] - 2026-10-24

### Changed

- Renamed from `docs` to `docs-site` (workspace naming convention, `docs/architecture/ADR-0003-naming.md`). No code change beyond names, paths, hostnames and dependency names; the history below keeps the old names.

## [0.0.36] - 2026-10-22

### Security

- The image's Content-Security-Policy is `connect-src 'self'` (was `'self' https:`): the site's local search and footer load same-origin files only. A headless Chromium probe against the built site under the new policy found search results and the footer working with zero violations, and a deliberate cross-origin `fetch` is blocked. A test pins the directive.

## [0.0.35] - 2026-10-22

### Changed

- Image base: static-server 0.1.11 (Go 1.26.10 standard library, CVE-2026-111943, so the scan-before-sign gate passes)

## [0.0.34] - 2026-10-19

### Changed

- Access Gate and Treasury pages quote the re-priced platform defaults (workspace cost model, decision D57): a
  0.0005 SUI commission floor (minimum paid price 0.005 SUI) and a 1 SUI free-gate fee. Release together with
  `@meddleware/access-gate-sui` 0.0.7 and `@meddleware/walrus-client` 0.0.29 (generated on-chain and API pages).

## [0.0.33] - 2026-10-18

### Added

- Build-time drift check `scripts/check-onchain-ids.mjs`: the build fails when a hand-written page carries a `0x…` id that is not a current testnet id in the `deployments` of `@meddleware/access-gate-client` / `@meddleware/seal-client`, or when a "Deployed identifiers" reference page lacks one of its required ids; `scripts/check-dist-no-audit.mjs` fails the build if an audit page reaches `dist/`
- A `test` script (vitest) covering both checks and the npm package contents; CI runs it

### Changed

- Dependencies: walrus-client 0.0.28, sui-token-template 1.0.9, nft-gate-client 0.0.17, seal-client 0.0.20, access-gate-client 0.0.9, design-tokens 0.1.10 and the other first-party and tooling dependencies; image base static-server 0.1.8
- The npm release gate calls the full CI workflow (`node-ci.yml`), as the image release does
- The Access Gate and Walrus Storage reference pages describe the v2 audience-bound access-proof message (`nft-gate:access:v2`); the Walrus reference result shapes match walrus-client 0.0.28; the "forthcoming developer documentation" notes link to the developer site
- `SECURITY.md` scope names the on-chain generator and the build checks

### Fixed

- The internal audit tree (`docs/audit/`) is excluded from the npm package

## [0.0.32] - 2026-10-09

### Changed

- Release gate: the release runs the full CI workflow, the image is scanned (fixable CRITICAL/HIGH fail) before it is signed, third-party licence notices are served at /THIRD_PARTY_LICENSES and the lockfile ships in the image for SBOM tools

## [0.0.31] - 2026-10-09

### Changed

- Testnet identifiers now match the 2026-10-09 publications (the previous release built without its docs edits); the audit file is excluded from the site

## [0.0.30] - 2026-10-09

### Changed

- Image base static-server 0.1.7 (Go 1.26.9) and an explicit non-root USER; merged tooling updates; the audit file is excluded from the site (srcExclude)

## [0.0.29] - 2026-10-09

### Changed

- On-chain pages follow sui-token-template 1.0.8: the supply and metadata policies are applied by the coin's own init and recorded in the coin registry

## [0.0.28] - 2026-10-09

### Changed

- Testnet identifiers and API reference follow the 2026-10-09 publications (access-gate-client 0.0.8, seal-client 0.0.19, access-gate-sui 0.0.6, seal-policies-sui 0.0.7); the pass kind and soulbound flag are documented as fixed at creation; image base static-server 0.1.6

## [0.0.27] — 2026-10-08

- Access Gate reference: public full nodes keep events for days, not "~3 months" (measured: about
  5½ days on testnet); the sui-indexer is what keeps history for the apps.

## [0.0.26] — 2026-10-08

- API reference generated from `@mysten/seal` 1.4.17 and `@mysten/walrus` 1.2.32, the versions the
  SDK clients use (the site pinned older ones).

## [0.0.25] — 2026-10-03

- **Treasury** section (`/blockchain/sui/treasury/`, overview and reference) replaces the DAO section,
  matching the live Treasury console; the DAO page is a short "retired" note. The reference lists the
  `PlatformConfig` fields the console reads, the commission formula, the total-balance rule and the
  two events it shows (the Burned event was never read).
- Tool tables link the dashboard (`dash.`), Token Deployer and Treasury; the retired `sui-dao.` and
  the never-deployed `sui.` hub are gone.
- Served with clean URLs and a real 404 page (static-server 0.1.4 `CLEAN_URLS`, `NOT_FOUND_PAGE`):
  a direct visit to a page returns that page, and an unknown path returns 404 instead of the home
  page with 200.
- `@meddleware/*` dependencies at their latest versions.

## [0.0.24] — 2026-10-02

- Access Gate and Sealed Storage references from `@meddleware/access-gate-client` 0.0.3 (`toU64`,
  `readIndexerEvents`; parsers return `null` for a malformed object) and `@meddleware/seal-client`
  0.0.13.

## [0.0.23] — 2026-10-02

- Wire-protocol reference from `@meddleware/nft-gate-client` 0.0.14: `fetchChallenge` takes
  `timeoutMs` (10 s default) and requires an `https:` gateway host. Walrus reference from
  `@meddleware/walrus-client` 0.0.22.
- Ships the brand favicon (`/favicon.svg`).

## [0.0.22] — 2026-10-02

- Testnet identifiers: the version-gated `access_gate` `0xa55789…` (`PlatformConfig` `0x53a325…`) and
  `seal_policies` `0x61c4aa…` (with its `PolicyConfig` `0xa5013e…`); the DAO reference shows the
  `PlatformConfig.version` field. On-chain pages from `@meddleware/access-gate-sui` 0.0.5 and
  `@meddleware/seal-policies-sui` 0.0.6.
- Current SDKs in the generated references: `access-gate-client` 0.0.2, `seal-client` 0.0.11,
  `nft-gate-client` 0.0.13 (the wire-protocol package only), `walrus-client` 0.0.21.
- The generated wire-protocol reference (`access-gate/wire-api/`) is git-ignored like the other
  generated API pages.

## [0.0.21] — 2026-10-01

- Runs on static-server 0.1.3 (per-response CSP script nonce for Cloudflare JavaScript
  Detections, HSTS, Permissions-Policy).
- `@meddleware/seal-client` 0.0.10 (seal_policies v2 in the generated references); dropped the
  duplicate devDependency entry.

## [0.0.6] — 2026-09-18

Landing page and sidebar polish.

- Shortened tagline to "Built to work with leading blockchain ecosystems."
- Removed hero action buttons (redundant with the feature cards below)
- Added an accented brand-colour prompt ("Select a blockchain below…") where the buttons were,
  injected via the `home-hero-actions-after` VitePress layout slot
- Moved DAO sidebar section to the bottom (below Access Gate)
- All tool sidebar sections now start collapsed (`collapsed: true`); VitePress auto-opens the
  section containing the active page

## [0.0.5] — 2026-09-17

CI type-check fix and docs referencing.

- Fixed `TS18003: No inputs were found` by replacing `"include": ["docs/.vitepress", "scripts"]`
  with an explicit glob `"include": ["docs/.vitepress/**/*.ts"]`; `scripts/` has no `.ts` files
  so its presence caused TypeScript to find zero inputs in some CI environments
- Added `homepage` in `package.json` pointing to `https://docs.meddleware.co.uk/`

## [0.0.4] — 2026-09-17

Heading cleanup and naming improvements.

- Renamed `using.md` → `walkthrough.md` across all three tool sections (Walrus Storage, Sealed Storage, Access Gate); URLs updated accordingly
- Replaced all `# Feature — noun` H1 patterns with clean unhyphenated titles (`# Using Walrus Storage`, `# DAO reference`, `# Sealed Storage policies`, etc.)
- Sidebar and "Next" section links updated to "Walkthrough"
- Removed "fundraising/" qualifier from DAO governance placeholder copy

## [0.0.3] — 2026-09-17

Restructured to a blockchain-agnostic architecture with Sui as the first active chain.

- All Sui content moved under `/blockchain/sui/` URL hierarchy
- New blockchain-agnostic home page — hero + Sui card + "more blockchains coming soon" card
- New `/blockchain/` chain picker landing page
- New `/blockchain/sui/` Sui section landing page
- Navbar: `Blockchain` dropdown (Active / Coming soon groups) + `Sui Tools` dropdown
- Sidebar: per-path keyed — full Sui sidebar under `/blockchain/sui/`, minimal chain sidebar under `/blockchain/`
- Removed all references to the inactive `dev.meddleware.co.uk` URL; replaced with "forthcoming developer documentation"
- Bumped gen-api autodoc output paths to match new `/blockchain/sui/` hierarchy

## [0.0.1] — 2026-09-17

Initial release. VitePress documentation site for `docs.meddleware.co.uk` covering the four
Meddleware Sui tools: DAO, Walrus Storage, Sealed Storage, and Access Gate.

- Hand-authored narrative (what/how/when) for all four tools
- Auto-generated SDK API reference via TypeDoc (walrus-client, seal-client, nft-gate-client)
- On-brand via `@meddleware/design-tokens` (Oxblood/Indigo/Gold)
- Local search across all sections
- Dark-first appearance
