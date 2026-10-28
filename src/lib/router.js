import { createElement, useSyncExternalStore } from 'react'

// Roteamento mínimo pela History API, sem dependência: o site tem a página
// inicial e as páginas de estudo de caso (/projetos/<slug>). Na Vercel, o
// vercel.json devolve o index.html para qualquer caminho.

const subscribe = (callback) => {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}

export const usePathname = () => useSyncExternalStore(subscribe, () => window.location.pathname)

export function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

// <a> que troca de página sem recarregar; Ctrl/Cmd+clique e botão do meio
// continuam abrindo em outra aba, como num link comum
export function Link({ href, onClick, ...props }) {
  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(href)
  }
  return createElement('a', { href, onClick: handleClick, ...props })
}
