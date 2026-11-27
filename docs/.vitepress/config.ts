// VitePress configuration of the user documentation site: the navigation, the sidebars and the shared base configuration. Output is pinned to the repo-root dist/ so the Dockerfile's
// `COPY --from=build /app/dist` works unchanged. Related: docs/.vitepress/theme/ (the theme), scripts/gen-api.mjs (the generated reference).
// The VitePress theme types, for the navigation and the sidebar.
import type { DefaultTheme } from 'vitepress'
// The shared VitePress configuration: language, colours, search, syntax themes and build settings.
import { baseConfig } from '@meddleware/vitepress-theme/config'
// Turns a module URL into a file path.
import { fileURLToPath } from 'node:url'
// Reads the generated sidebar, if it exists.
import { existsSync, readFileSync } from 'node:fs'

// User-facing documentation for the Meddleware developer tools. Blockchain-agnostic site with
// per-chain sections; Sui is the first active chain. Output is pinned to the repo-root dist/ so
// the Dockerfile's `COPY --from=build /app/dist` (shared static-server pattern) works unchanged.

// Sidebar groups for the canonical on-chain docs imported from the Sui Move package repos by
// mw-gen-onchain (generated, git-ignored). Absent (e.g. `vitepress dev` without the
// prebuild step) → no on-chain groups; the rest of the site is unaffected.
// The sidebar groups `mw-gen-onchain` writes.
const onchainSidebarFile = fileURLToPath(new URL('./generated/onchain-sidebar.json', import.meta.url))
// The groups, or none when the generated file is absent (a dev run without the prebuild step).
const onchainSidebar: DefaultTheme.SidebarItem[] = existsSync(onchainSidebarFile)
  ? JSON.parse(readFileSync(onchainSidebarFile, 'utf8'))
  : []

// The Sui section's path, the only chain section there is.
const S = '/blockchain/sui'

// The top navigation: start here, getting started, the tools, fees, security, help and the developer site.
const nav: DefaultTheme.NavItem[] = [
    // The platform's own section comes first.
  { text: 'Start here', link: '/start/' },
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
    // The three pages a person reads before using a tool.
  { text: 'Fees', link: `${S}/fees` },
  { text: 'Security and privacy', link: `${S}/security-and-privacy` },
  { text: 'Help', link: `${S}/faq` },
  { text: 'Developers', link: 'https://meddleware.dev' },
]

// The sidebars, one per section.
const sidebar: DefaultTheme.Sidebar = {
  // The platform, whatever tools it holds (copy review 2, approved 2026-11-20).
  // The platform's own section, which holds whatever tools exist.
  '/start/': [
    {
      text: 'Start here',
      items: [
        { text: 'What Meddleware is', link: '/start/' },
        { text: 'How we treat your data', link: '/start/your-data' },
        { text: 'Leaving with your data', link: '/start/leaving' },
      ],
    },
  ],
  // The Sui section: using the tools, one group per tool, what to know before using them, and help.
  [`${S}/`]: [
    {
      text: 'Using the tools',
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
    // The generated on-chain groups come last.
    ...onchainSidebar,
  ],
}

// The site's language, URLs, colours, search, syntax themes and build settings are the shared VitePress config; `docs/` is the source
// directory and the repo-root `dist/` the output (the Dockerfile copies it into the static server).
// The site: the shared configuration with this site's title, description, footer link, navigation and sidebar.
export default baseConfig({
  configUrl: import.meta.url,
  title: 'Meddleware guides',
  description: "How to use Meddleware's tools, what they cost, and what we can and cannot see.",
  // Meddleware's own funds, in public.
  footerLinks: [{ text: 'Treasury', link: 'https://treasury.meddleware.co.uk' }],
  nav,
  sidebar,
  // Site-specific settings.
  extra: {
    // The per-service `api/` subtrees are generated at build time by scripts/gen-api.mjs (TypeDoc);
    // their exact filenames depend on the TypeDoc version, so don't fail the build on links into them.
    // Links into the generated API reference are not checked.
    ignoreDeadLinks: [/\/api\//],
  },
})
