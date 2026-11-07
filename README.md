# @meddleware/docs-site

User-facing documentation for the Meddleware Sui tools, served at
[`docs.meddleware.co.uk`](https://docs.meddleware.co.uk). Built with [VitePress](https://vitepress.dev).

One site for the people who use the tools. Each tool — **Walrus Storage**, **Sealed Storage**, **Access Gate**, **Token Issuance** and the
**Treasury** — has an overview, a walkthrough and a user-level reference (settings, fees, limits, the messages a user sees), next to pages on the
dashboard, fees, security and privacy, questions and troubleshooting, a glossary, and status and roadmap.

## Structure

```
docs/
  index.md                      Home
  blockchain/sui/               Everything for Sui (the only chain with tools today)
    getting-started.md, architecture.md, dashboard.md
    walrus-storage/ sealed-storage/ access-gate/ token-issuance/ treasury/
    fees.md, security-and-privacy.md, faq.md, glossary.md, status-and-roadmap.md
  .vitepress/
    config.ts                   Nav, sidebar, search; the shared theme's base config
    theme/                      Extends @meddleware/vitepress-theme; NetworkNotice.vue says which networks are live
    network.json                Written by `npm run gen:network` from the clients' deployment records; CI checks it
scripts/gen-api.mjs             TypeDoc autodoc for the generated SDK reference trees
```

Which Sui networks the tools are live on is stated in one place, the `NetworkNotice` component on the home and getting-started pages, from
`docs/.vitepress/network.json`. Every other page says "testnet" and points there; a test fails if a page claims mainnet is live.

## Develop

```sh
npm install
npm run dev        # gen:api (TypeDoc) + vitepress dev → http://localhost:5173
```

## Build

```sh
npm run build      # gen:api + gen:onchain + id check + vitepress build + llms-full.txt + audit-page check → dist/
docker build -t docs .
```

The build emits a static site to `dist/` (pinned via `outDir` in `.vitepress/config.ts`), which the
runtime image serves with the shared `static-server`.

## Content boundary

This site is for **end users** of the tools: people who create gates, buy passes, store files, issue tokens or read the treasury. Developer
integration guides, SDK use, the gateway and self-hosting belong on the developer site (`meddleware.dev`, repo `dev-site`). Each
`reference.md` keeps the user-level facts and ends with a short "For developers" pointer. The generated SDK API trees (`api/`, `wire-api/`) are
still built and linked from those pointers.

The build scripts `mw-gen-onchain`, `mw-check-onchain-ids`, `mw-gen-llms-full` and `mw-check-dist-no-audit` come from
`@meddleware/vitepress-theme` and are configured by the `"meddleware"` section of `package.json`.

## License

BSD Zero Clause License (`0BSD`). See [LICENSE](LICENSE).
