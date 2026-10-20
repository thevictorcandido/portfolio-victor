# 05 - Internacionalização (i18n)

Voltar: [Portfolio Victor](README.md)

## Como está montado

> [!NOTE]
> **contexto**
>
> A arquitetura segue o repositório da disciplina DIAW (Prof. João Paulo Aramuni): config separada em `src/config/i18nConfig.js`, init em `src/i18n/index.js`, um `translation.json` por idioma e um `LanguageSwitcher`.

- **Idiomas:** `pt-BR` (Português, bandeira BR) e `en` (English, bandeira US).
- **Fallback:** `import.meta.env.VITE_DEFAULT_LANGUAGE` ou `pt-BR`.
- **Detecção:** `localStorage` (chave `i18nextLng`) → idioma do navegador. A escolha fica salva no `localStorage`.
- `interpolation.escapeValue: false` (React já escapa).
- `src/main.jsx` importa `./i18n` **antes** do `App`, para o init acontecer antes do primeiro render.
- No evento `languageChanged`, `syncDocument` atualiza `<html lang>` e `document.title` (chave `meta.title`).
- Textos em lista (bio, bullets, disciplinas) usam `t(chave, { returnObjects: true })`.

## LanguageSwitcher

`src/components/LanguageSwitcher/LanguageSwitcher.jsx` — pílula com botões PT/EN, `aria-pressed` no ativo, `title` "Mudar para {{language}}", atributo `lang` em cada botão. Considera ativo por prefixo (`pt*` → pt-BR, `en*` → en), para cobrir `en-US`, `pt-PT` etc. vindos do navegador.

## Cobertura medida em 2026-10-20

> [!TIP]
> **o que ficou pronto**
>
> 113 chaves em cada idioma, nenhuma faltando em nenhum dos dois (comparação recursiva das chaves dos dois JSON).
> Em 2026-10-20 subiu para **119** com as chaves do formulário (`contact.sendingBtn`, `successTitle`, `successText`, `errorText`, `copy`, `copied`) — paridade mantida.

> [!CAUTION]
> **defeito, com causa raiz**
>
> **No inglês aparecem textos em português.** Causa: estes campos são lidos de `portfolioData.js`, que não passa pelo i18next:
> - `projects[].tags` (ex.: "Desenvolvimento Web", "Trabalho em Grupo")
> - `experiences[].technologies` (ex.: "Infraestrutura de TI", "Gestão de Ativos")
> - `experiences[].imageAlt` (texto alternativo das fotos)
> - `skillsCategories[].technologies[].role` (ex.: "Automação & APIs")
>
> **Correção sugerida:** mover esses arrays para o `translation.json` (com `returnObjects`) ou trocar o valor por uma chave e chamar `t()` no componente.

> [!CAUTION]
> **defeito, com causa raiz**
>
> **`<meta name="description">` não muda com o idioma.** Causa: `syncDocument` só atualiza `title` e `lang`; a description está fixa em pt-BR no `index.html`, embora exista a chave `meta.description` nos dois JSON.
