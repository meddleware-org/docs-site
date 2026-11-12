import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

// The built site (dist/): the brand icon set and manifest the theme provides, one svg icon link per page, no font files and no
// third-party origin loaded by a page. It needs a build, so it runs after one: CI sets REQUIRE_DIST=1 after `npm run build` and fails
// if dist/ is missing; locally it is skipped when dist/ is absent.
const dist = join(import.meta.dirname, '..', 'dist')

function files(dir = dist, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) files(p, out)
    else out.push(p)
  }
  return out
}

describe.skipIf(!existsSync(dist) && !process.env.REQUIRE_DIST)('the built site', () => {
  it('exists when it is required', () => {
    expect(existsSync(dist)).toBe(true)
  })

  const all = existsSync(dist) ? files() : []
  const rel = (p) => relative(dist, p).split(sep).join('/')
  const pages = all.filter((p) => p.endsWith('.html'))

  it.each(['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'site.webmanifest'])(
    'ships %s',
    (name) => {
      expect(statSync(join(dist, name)).size).toBeGreaterThan(0)
    },
  )

  it('has a manifest that names the site and lists the icons it ships', () => {
    const manifest = JSON.parse(readFileSync(join(dist, 'site.webmanifest'), 'utf8'))
    expect(manifest.name).toMatch(/Meddleware/)
    const sources = manifest.icons.map((i) => i.src)
    expect(sources).toEqual(expect.arrayContaining(['/icon-192.png', '/icon-512.png', '/favicon.svg']))
    for (const src of sources) expect(existsSync(join(dist, src))).toBe(true)
  })

  it('links the icon set from every page, with exactly one svg icon link', () => {
    expect(pages.length).toBeGreaterThan(20)
    const bad = pages.flatMap((p) => {
      const html = readFileSync(p, 'utf8')
      const svg = html.match(/<link rel="icon"[^>]*type="image\/svg\+xml"[^>]*>/g) ?? []
      const problems = []
      if (svg.length !== 1) problems.push(`${svg.length} svg icon links`)
      for (const need of ['href="/favicon.ico"', 'rel="apple-touch-icon"', 'rel="manifest" href="/site.webmanifest"']) {
        if (!html.includes(need)) problems.push(`missing ${need}`)
      }
      return problems.map((m) => `${rel(p)}: ${m}`)
    })
    expect(bad).toEqual([])
  })

  // 404.html is an empty shell that VitePress renders in the browser, so the bar is not in its file.
  it('shows the Meddleware mark in the navigation bar of every rendered page', () => {
    const bad = pages.filter((p) => rel(p) !== '404.html').filter((p) => !/class="VPNavBarTitle[^>]*>[\s\S]{0,600}?class="mw-brand-mark/.test(readFileSync(p, 'utf8'))).map(rel)
    expect(bad).toEqual([])
  })

  it('ships no font file and preloads none', () => {
    expect(all.map(rel).filter((p) => /\.(woff2?|ttf|otf|eot)$/i.test(p))).toEqual([])
    const preloaded = pages.filter((p) => /<link[^>]*rel="preload"[^>]*as="font"/.test(readFileSync(p, 'utf8'))).map(rel)
    expect(preloaded).toEqual([])
    const faces = all.filter((p) => p.endsWith('.css') && /@font-face/.test(readFileSync(p, 'utf8'))).map(rel)
    expect(faces).toEqual([])
  })

  it('loads nothing from another origin: no external script, stylesheet, image, font or css url()', () => {
    const external = /^(https?:)?\/\//
    const hits = []
    for (const p of pages) {
      const html = readFileSync(p, 'utf8')
      for (const m of html.matchAll(/<(link|script|img|source|iframe|video|audio)\b[^>]*?\s(?:href|src|srcset)="([^"]*)"/g)) {
        if (external.test(m[2])) hits.push(`${rel(p)}: <${m[1]}> ${m[2]}`)
      }
    }
    for (const p of all.filter((f) => f.endsWith('.css'))) {
      for (const m of readFileSync(p, 'utf8').matchAll(/url\(\s*["']?((?:https?:)?\/\/[^)"']+)/g)) hits.push(`${rel(p)}: url(${m[1]})`)
    }
    expect(hits).toEqual([])
  })
})
