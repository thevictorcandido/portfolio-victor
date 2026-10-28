// Regenera docs/ a partir do vault do Obsidian (fonte principal da documentação).
// Uso: npm run docs:sync — o caminho do vault pode vir em OBSIDIAN_VAULT.
//
// Conversão:
// - frontmatter e comentários %% %% saem;
// - [[Nota]] vira link .md quando a nota faz parte do projeto, negrito quando não;
// - callouts do Obsidian viram alertas do GitHub, com o título em negrito;
// - linhas terminadas em #so-vault (ou callouts com a marca no fim do título) ficam só no vault;
// - se sobrar algum termo de <vault>/.docs-sync-bloqueio.txt (um por linha), nada é gravado.

import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const VAULT = process.env.OBSIDIAN_VAULT ?? 'C:/Users/Victor Leite/Documents/Obsidian Vault'
const MOC = 'Portfolio Victor'
const DOCS = fileURLToPath(new URL('../docs/', import.meta.url))
const ONLY_VAULT = '#so-vault'
const BLOCKLIST = join(VAULT, '.docs-sync-bloqueio.txt')
const blocked = existsSync(BLOCKLIST)
  ? readFileSync(BLOCKLIST, 'utf8').split(/\r?\n/).map((t) => t.trim().toLowerCase()).filter(Boolean)
  : []

const ALERTS = {
  info: 'NOTE', note: 'NOTE', abstract: 'NOTE', summary: 'NOTE', example: 'NOTE', quote: 'NOTE',
  tip: 'TIP', success: 'TIP', check: 'TIP', done: 'TIP',
  important: 'IMPORTANT', question: 'IMPORTANT',
  warning: 'WARNING', caution: 'WARNING', attention: 'WARNING',
  bug: 'CAUTION', danger: 'CAUTION', error: 'CAUTION', failure: 'CAUTION',
}

const slug = (name) =>
  name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const notesDir = join(VAULT, MOC)
if (!existsSync(notesDir)) {
  console.error(`Vault não encontrado em ${VAULT}. Defina OBSIDIAN_VAULT.`)
  process.exit(1)
}

const notes = readdirSync(notesDir).filter((f) => f.endsWith('.md')).map((f) => basename(f, '.md')).sort()
const target = new Map([[MOC, 'README.md'], ...notes.map((n) => [n, `${slug(n)}.md`])])

function convertLinks(line) {
  return line.replace(/(!?)\[\[([^\]|#]+)(#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, embed, name, heading, alias) => {
    const text = alias ?? name
    const file = target.get(name.trim())
    if (!file || embed) return `**${text}**`
    return `[${text}](${file}${heading ? '#' + slug(heading.slice(1)) : ''})`
  })
}

function convert(src) {
  const out = []
  let skippingCallout = false
  const body = src.replace(/^---\n[\s\S]*?\n---\n+/, '').replace(/%%[\s\S]*?%%/g, '')

  for (const line of body.split('\n')) {
    if (skippingCallout) {
      if (line.startsWith('>')) continue
      skippingCallout = false
    }
    const callout = line.match(/^>\s*\[!(\w+)\][+-]?\s*(.*)$/)
    if (callout && callout[2].trimEnd().endsWith(ONLY_VAULT)) {
      skippingCallout = true
      continue
    }
    if (line.trimEnd().endsWith(ONLY_VAULT)) continue

    if (callout) {
      out.push(`> [!${ALERTS[callout[1].toLowerCase()] ?? 'NOTE'}]`)
      if (callout[2].trim()) out.push(`> **${convertLinks(callout[2].trim())}**`, '>')
      continue
    }
    out.push(convertLinks(line))
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

const output = new Map()
for (const [name, file] of target) {
  const src = readFileSync(join(name === MOC ? VAULT : notesDir, `${name}.md`), 'utf8').replace(/\r\n/g, '\n')
  const header = name === MOC ? `<!-- Espelho do vault Obsidian. Fonte: Obsidian Vault/${MOC}.md -->\n\n` : ''
  output.set(file, header + convert(src))
}

const leaks = [...output].flatMap(([file, text]) =>
  text.split('\n').flatMap((line, i) => (blocked.some((t) => line.toLowerCase().includes(t)) ? [`${file}:${i + 1}: ${line.slice(0, 120)}`] : [])))
if (leaks.length) {
  console.error(`Termo bloqueado que não pode ir para o repo. Marque com ${ONLY_VAULT} ou reescreva no vault:\n${leaks.join('\n')}`)
  process.exit(1)
}

for (const f of readdirSync(DOCS)) if (f.endsWith('.md')) rmSync(join(DOCS, f))
for (const [file, text] of output) writeFileSync(join(DOCS, file), text)

console.log(`docs/ sincronizado: ${target.size} arquivos a partir de ${VAULT}`)
