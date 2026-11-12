import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('npm package contents', () => {
  it('does not include the audit tree, but does include the site source and scripts', () => {
    const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { encoding: 'utf8', cwd: join(import.meta.dirname, '..') })
    // `npm pack --json` prints an array in CI's npm, and an object keyed by the package name in newer ones: read both.
    const parsed = JSON.parse(out)
    const info = Array.isArray(parsed) ? parsed[0] : (parsed.files ? parsed : Object.values(parsed)[0])
    const files = info.files.map((f) => f.path)
    expect(files.filter((f) => f.startsWith('docs/audit'))).toEqual([])
    expect(files).toContain('docs/index.md')
    expect(files).toContain('scripts/gen-api.mjs')
  }, 30_000) // `npm pack` walks the generated docs tree; it can exceed the default 5 s when the other test files run alongside
})
