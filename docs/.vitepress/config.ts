import type { DefaultTheme } from 'vitepress'
import { baseConfig } from '@meddleware/vitepress-theme/config'
import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'

// User-facing documentation for the Meddleware developer tools. Blockchain-agnostic site with
// per-chain sections; Sui is the first active chain. Output is pinned to the repo-root dist/ so
// the Dockerfile's `COPY --from=build /app/dist` (shared static-server pattern) works unchanged.

// Sidebar groups for the canonical on-chain docs imported from the Sui Move package repos by
// mw-gen-onchain (generated, git-ignored). Absent (e.g. `vitepress dev` without the
// prebuild step) → no on-chain groups; the rest of the site is unaffected.
const onchainSidebarFile = fileURLToPath(new URL('./generated/onchain-sidebar.json', import.meta.url))
const onchainSidebar: DefaultTheme.SidebarItem[] = existsSync(onchainSidebarFile)
  ? JSON.parse(readFileSync(onchainSidebarFile, 'utf8'))
  : []

const S = '/blockchain/sui'

const nav: DefaultTheme.NavItem[] = [
  { text: 'Get started', link: `${S}/getting-started` },
  {
    text: 'Tools',
    items: [
      { text: 'Dashboard', link: `${S}/dashboard` },
      { text: 'Walrus Storage', link: `${S}/walrus-storage/` },
      { text: 'Sealed Storage', link: `${S}/sealed-storage/` },
      { text: 'Access Gate', link: `${S}/access-gate/` },
      { text: 'Token Issuance', link: `${S}/token-issuance/` },
      { text: 'Treasury', link: `${S}/treasury/` },
    ],
  },
  { text: 'Fees', link: `${S}/fees` },
  { text: 'Security and privacy', link: `${S}/security-and-privacy` },
  { text: 'Help', link: `${S}/faq` },
  { text: 'Developers', link: 'https://meddleware.dev' },
]

const sidebar: DefaultTheme.Sidebar = {
  [`${S}/`]: [
    {
      text: 'Start here',
      items: [
        { text: 'Overview', link: `${S}/` },
        { text: 'Getting started', link: `${S}/getting-started` },
        { text: 'How the tools fit together', link: `${S}/architecture` },
        { text: 'Dashboard', link: `${S}/dashboard` },
      ],
    },
    {
      text: 'Walrus Storage',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${S}/walrus-storage/` },
        { text: 'Walkthrough', link: `${S}/walrus-storage/walkthrough` },
        { text: 'Reference', link: `${S}/walrus-storage/reference` },
      ],
    },
    {
      text: 'Sealed Storage',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${S}/sealed-storage/` },
        { text: 'Walkthrough', link: `${S}/sealed-storage/walkthrough` },
        { text: 'Policies', link: `${S}/sealed-storage/policies` },
        { text: 'Reference', link: `${S}/sealed-storage/reference` },
      ],
    },
    {
      text: 'Access Gate',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${S}/access-gate/` },
        { text: 'Walkthrough', link: `${S}/access-gate/walkthrough` },
        { text: 'Reference', link: `${S}/access-gate/reference` },
      ],
    },
    {
      text: 'Token Issuance',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${S}/token-issuance/` },
        { text: 'Walkthrough', link: `${S}/token-issuance/walkthrough` },
        { text: 'Reference', link: `${S}/token-issuance/reference` },
      ],
    },
    {
      text: 'Treasury',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${S}/treasury/` },
        { text: 'Reference', link: `${S}/treasury/reference` },
      ],
    },
    {
      text: 'Before you use them',
      items: [
        { text: 'Fees', link: `${S}/fees` },
        { text: 'Security and privacy', link: `${S}/security-and-privacy` },
      ],
    },
    {
      text: 'Help',
      items: [
        { text: 'Questions and troubleshooting', link: `${S}/faq` },
        { text: 'Glossary', link: `${S}/glossary` },
        { text: 'Status and roadmap', link: `${S}/status-and-roadmap` },
      ],
    },
    // Canonical on-chain docs (generated from the Move packages by mw-gen-onchain).
    ...onchainSidebar,
  ],
}

// The site's language, URLs, colours, search, syntax themes and build settings are the shared VitePress config; `docs/` is the source
// directory and the repo-root `dist/` the output (the Dockerfile copies it into the static server).
export default baseConfig({
  configUrl: import.meta.url,
  title: 'Meddleware Docs',
  description:
    'How to use the Meddleware tools on Sui: store files on Walrus, encrypt them, sell access passes, issue a coin and read the treasury, with your own wallet.',
  nav,
  sidebar,
  extra: {
    // The per-service `api/` subtrees are generated at build time by scripts/gen-api.mjs (TypeDoc);
    // their exact filenames depend on the TypeDoc version, so don't fail the build on links into them.
    ignoreDeadLinks: [/\/api\//],
  },
})
