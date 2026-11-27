// Autodoc step for the docs site (Part C of the docs plan).
//
// Generates Markdown API reference from the published Meddleware TypeScript SDKs using TypeDoc +
// typedoc-plugin-markdown, writing into each service's `api/` subtree (git-ignored, built fresh).
// The service `reference.md` pages link into these.
//
// Design goals:
//  - Exhaustive: point TypeDoc at each SDK's full public entry so nothing is hand-maintained.
//  - Resilient: a missing/unresolvable package warns and writes a placeholder instead of failing
//    the whole docs build. An empty result is a signal to fix the SDK's `types`/`exports`, not to
//    paper over here — CI logs make that visible.
// Resolves an installed package's entry.
import { createRequire } from 'node:module'
// Runs TypeDoc without a shell.
import { execFileSync } from 'node:child_process'
// File-system helpers.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
// Turns a module URL into a path.
import { fileURLToPath } from 'node:url'
// Path helpers.
import { dirname, resolve, join } from 'node:path'

// A `require` for this module.
const require = createRequire(import.meta.url)
// The repository root: one level above this script.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Where the generated reference is written.
const docsRoot = join(root, 'docs')

// Each SDK → where its generated reference lands under docs/.
const targets = [
  { pkg: '@meddleware/walrus-storage-client', out: 'blockchain/sui/walrus-storage/api', name: 'Walrus client API' },
  { pkg: '@meddleware/sealed-storage-client', out: 'blockchain/sui/sealed-storage/api', name: 'Seal client API' },
  { pkg: '@meddleware/access-gate-client', out: 'blockchain/sui/access-gate/api', name: 'Access-gate client API' },
  { pkg: '@meddleware/access-gate-gateway-client', out: 'blockchain/sui/access-gate/wire-api', name: 'Gateway wire-protocol API' },
]

// Resolve the SDK's TypeScript entry. These packages export their `.` as `./src/index.ts`
// (string-form exports) but restrict `./package.json`, so resolve the package entry directly
/** Resolve an SDK's TypeScript entry; null when it cannot be found. */
function resolveEntry(pkg) {
  try {
    // `.` export → src/index.ts for the Meddleware SDKs.
    return require.resolve(pkg)
  } catch {
    // Fallback: locate the installed package dir without relying on an exported package.json.
    try {
      const dir = join(root, 'node_modules', ...pkg.split('/'))
      for (const candidate of ['src/index.ts', 'index.ts', 'dist/index.d.ts']) {
        const p = join(dir, candidate)
        if (existsSync(p)) return p
      }
    } catch {
      /* ignore */
    }
    return null
  }
}

/** The path to the TypeDoc binary, or null when it is not installed. */
function typedocBin() {
  const bin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'typedoc.cmd' : 'typedoc')
  return existsSync(bin) ? bin : null
}

// How many references fell back to a placeholder.
let failures = 0
// One reference per SDK.
for (const { pkg, out, name } of targets) {
  // Where this SDK's reference goes.
  const outDir = join(docsRoot, out)
  // Make sure the folder exists.
  mkdirSync(outDir, { recursive: true })

  // The SDK's TypeScript entry.
  const entry = resolveEntry(pkg)
  // The TypeDoc binary.
  const bin = typedocBin()
  // Cannot run: write a placeholder page and carry on, so the site still builds.
  if (!entry || !bin) {
    // Count it.
    failures++
    const why = !entry ? `could not resolve ${pkg}` : 'typedoc binary not found'
    console.warn(`[gen:api] ${name}: ${why} — writing placeholder.`)
    writeFileSync(
      join(outDir, 'index.md'),
      `# ${name}\n\n::: warning Reference not generated\nAutodoc could not run for \`${pkg}\` (${why}). ` +
        `Ensure the package is installed and exposes its TypeScript \`src\`/types, then rebuild.\n:::\n`,
    )
    continue
  }

  try {
    // Run TypeDoc with the Markdown plugins.
    execFileSync(
      bin,
      [
        entry,
        '--plugin', 'typedoc-plugin-markdown',
        '--plugin', 'typedoc-vitepress-theme',
        '--out', outDir,
        '--readme', 'none',
        '--githubPages', 'false',
        '--hideBreadcrumbs', 'true',
        '--tsconfig', join(root, 'tsconfig.typedoc.json'),
        '--skipErrorChecking',
        '--name', name,
      ],
      { stdio: 'inherit', cwd: root },
    )
    console.log(`[gen:api] ${name}: generated → docs/${out}`)
  } catch (e) {
    failures++
    console.warn(`[gen:api] ${name}: TypeDoc failed — writing placeholder. ${e?.message ?? e}`)
    writeFileSync(
      join(outDir, 'index.md'),
      `# ${name}\n\n::: warning Reference not generated\nTypeDoc failed for \`${pkg}\`. See build logs.\n:::\n`,
    )
  }
}

// Say how many placeholders were written, or that all references were generated.
if (failures) {
  console.warn(`[gen:api] completed with ${failures} placeholder(s); site still builds.`)
} else {
  console.log('[gen:api] all SDK references generated.')
}
