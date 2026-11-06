// Regenera docs/ a partir do vault do Obsidian no Google Drive (fonte principal da documentação).
// Uso: npm run docs:sync — o caminho do vault pode vir em OBSIDIAN_VAULT (o Drive muda de letra
// entre máquinas). As notas ficam em <vault>/portfolio-victor/Documentação/: "00 - Portfolio
// Victor" vira o README.md e as demais, 01-…, viram NN-slug.md.
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

const VAULT = process.env.OBSIDIAN_VAULT ?? 'G:/My Drive/Obsidian Vault'
const NOTES_DIR = join(VAULT, 'portfolio-victor', 'Documentação')
const README_NOTE = '00 - Portfolio Victor'
// Nomes que apontam para o README: a nota de abertura e o índice do projeto no vault
const README_LINKS = [README_NOTE, 'portfolio-victor']
const DOCS = fileURLToPath(new URL('../docs/', import.meta.url))
const ONLY_VAULT = '#so-vault'
const BLOCKLIST = join(VAULT, '.docs-sync-bloqueio.txt')

if (!existsSync(join(NOTES_DIR, `${README_NOTE}.md`))) {
  console.error(`Notas não encontradas em ${NOTES_DIR}. Defina OBSIDIAN_VAULT com a pasta do vault.`)
  process.exit(1)
}
// Sem a lista de termos proibidos, nada é gravado: rodar sem o filtro deixaria vazar o que não pode ir para o repo
if (!existsSync(BLOCKLIST)) {
  console.error(`Lista de termos bloqueados não encontrada em ${BLOCKLIST}.`)
  process.exit(1)
}
const blocked = readFileSync(BLOCKLIST, 'utf8').split(/\r?\n/).map((t) => t.trim().toLowerCase()).filter(Boolean)

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

const notes = readdirSync(NOTES_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => basename(f, '.md'))
  .filter((n) => n !== README_NOTE)
  .sort()
// Arquivo de saída de cada nota; o README fica com os nomes de README_LINKS
const target = new Map([...README_LINKS.map((n) => [n, 'README.md']), ...notes.map((n) => [n, `${slug(n)}.md`])])
const sources = new Map([[README_NOTE, 'README.md'], ...notes.map((n) => [n, `${slug(n)}.md`])])

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
for (const [name, file] of sources) {
  const src = readFileSync(join(NOTES_DIR, `${name}.md`), 'utf8').replace(/\r\n/g, '\n')
  const header = name === README_NOTE ? '<!-- Espelho do vault Obsidian. Fonte: Obsidian Vault/portfolio-victor/Documentação/ -->\n\n' : ''
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

console.log(`docs/ sincronizado: ${sources.size} arquivos a partir de ${NOTES_DIR}`)
