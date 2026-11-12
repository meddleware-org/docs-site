import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

const docs = join(import.meta.dirname, '..', 'docs')

// Every hand-written page: not the audit notes, not the generated API and on-chain trees, not VitePress's own files.
function pages(dir = docs, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', '.vitepress', 'audit', 'api', 'wire-api', 'onchain', 'public'].includes(e.name)) continue
      pages(p, out)
    } else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}
const all = pages().map((p) => ({ rel: relative(docs, p).split(sep).join('/'), text: readFileSync(p, 'utf8') }))

describe('the hand-written pages', () => {
  it('finds the pages', () => {
    expect(all.length).toBeGreaterThan(20)
  })

  it.each(all.map((p) => [p.rel, p]))('%s has a title and a description in its front matter', (_rel, page) => {
    const front = /^---\n([\s\S]*?)\n---/.exec(page.text)?.[1] ?? ''
    expect(front).toMatch(/^title: \S/m)
    expect(front).toMatch(/^description: \S/m)
  })

  it('never claims in prose that mainnet is live (the notice component says it, from the deployment records)', () => {
    const claim = /mainnet[^.\n]{0,40}\b(is|are) (now )?(live|open|available)|live on (sui )?mainnet|(runs?|running) on mainnet/i
    const hits = all.filter((p) => claim.test(p.text.replace(/<NetworkNotice \/>/g, ''))).map((p) => p.rel)
    expect(hits).toEqual([])
  })

  it('uses the notice only on the home page and getting started', () => {
    const using = all.filter((p) => p.text.includes('<NetworkNotice')).map((p) => p.rel).sort()
    expect(using).toEqual(['blockchain/sui/getting-started.md', 'index.md'])
  })

  it('keeps developer and maintainer wording off the pages', () => {
    const banned = [/thin front-?end|white-?label|guidance still to come|coming soon|VITE_|\boperators?\b/i, /MeddleWare/]
    const hits = all.flatMap((p) => banned.flatMap((re) => (re.test(p.text) ? [`${p.rel}: ${re.exec(p.text)?.[0]}`] : [])))
    expect(hits).toEqual([])
  })

  it('has no page for other blockchains', () => {
    expect(all.map((p) => p.rel)).not.toContain('blockchain/index.md')
  })
})

describe('the "For developers" pointers', () => {
  const dev = (rel) => all.find((p) => p.rel === `blockchain/sui/${rel}`)?.text ?? ''
  const developerSection = (rel) => dev(rel).split(/^## For developers$/m)[1]?.split(/^## /m)[0] ?? ''

  it.each([
    ['walrus-storage/reference.md', ['/sui/walrus-storage/', '/sui/walrus-storage/integration', '/sui/walrus-storage/relay-self-host']],
    ['sealed-storage/reference.md', ['/sui/sealed-storage/', '/sui/sealed-storage/integration', '/sui/sealed-storage/policies']],
    ['access-gate/reference.md', ['/sui/access-gate/', '/sui/access-gate/integration', '/sui/access-gate/gateway']],
    ['treasury/reference.md', ['/sui/treasury/', '/sui/treasury/data', '/sui/indexer']],
    ['token-issuance/reference.md', ['/sui/token-issuance/', '/sui/token-issuance/deploy', '/sui/token-issuance/template']],
  ])('%s points to the developer site pages for its service', (rel, paths) => {
    const section = developerSection(rel)
    expect(section).not.toBe('')
    for (const path of paths) expect(section).toContain(`(https://meddleware.dev${path})`)
    // Treasury and Token Issuance have their own developer pages now (FU-0078): no detour through the on-chain or Access Gate pages.
    if (/^(treasury|token-issuance)\//.test(rel)) {
      expect(section).not.toContain('meddleware.dev/sui/onchain/')
      expect(section).not.toContain('meddleware.dev/sui/access-gate/')
    }
  })

  // When the developer site is checked out next to this repo (the workspace layout), every link to it must resolve to one of its pages.
  const devDocs = join(import.meta.dirname, '..', '..', 'dev-site', 'docs')
  it.skipIf(!existsSync(devDocs))('every link to the developer site names a page that exists there', () => {
    const broken = all.flatMap((p) =>
      [...p.text.matchAll(/\(https:\/\/meddleware\.dev(\/[^)#\s]*)/g)].flatMap((m) => {
        const path = m[1].replace(/\/$/, '')
        const candidates = [`${path}.md`, `${path}/index.md`, 'index.md'].map((c) => join(devDocs, path === '' ? 'index.md' : c))
        return candidates.slice(0, path === '' ? 3 : 2).some((c) => existsSync(c)) ? [] : [`${p.rel}: ${m[1]}`]
      }),
    )
    expect(broken).toEqual([])
  })
})

describe('the sidebar', () => {
  it('links every Sui page', async () => {
    const config = (await import('../docs/.vitepress/config.ts')).default
    const sidebar = JSON.stringify(config.themeConfig?.sidebar ?? {})
    const missing = all
      .filter((p) => p.rel.startsWith('blockchain/sui/'))
      .map((p) => '/' + p.rel.replace(/\.md$/, '').replace(/index$/, ''))
      .filter((link) => !sidebar.includes(`"${link}"`))
    expect(missing).toEqual([])
  })
})
