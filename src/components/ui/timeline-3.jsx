// Adaptado de olewandowski1/timeline-3 (21st.dev, MIT-0): grupos com separador
// rotulado, trilho vertical e, em cada item, avatar com selo de ícone, texto
// "quem + ação + alvo" e o tempo à direita. Sem shadcn: Avatar, Badge, Marker e
// IconPlaceholder viraram marcação simples, sem foto no avatar, e as cores são
// as do fundo verde-musgo da Trajetória.

function Marker({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4EFEA]/75 tabular-nums">
        {children}
      </span>
      <span className="h-px flex-1 bg-white/12" aria-hidden="true" />
    </div>
  )
}

export function Timeline3({ groups }) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-5">
          <Marker>{group.label}</Marker>

          <ol className="relative flex flex-col gap-7">
            {group.events.map((event, i) => {
              const Icon = event.icon
              return (
                <li key={event.id} className="relative flex items-start gap-4">
                  {/* Trilho: do avatar deste item até o avatar do próximo */}
                  {i < group.events.length - 1 && (
                    <span className="absolute left-[19px] top-12 -bottom-6 w-px bg-white/12" aria-hidden="true" />
                  )}
                  <span className="relative shrink-0">
                    <span className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-[#34523F] text-[11px] font-bold tracking-wide text-[#F4EFEA] font-display">
                      {event.initials}
                    </span>
                    <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border border-white/15 bg-[#22382B] text-[#C9D8CE]">
                      <Icon className="size-3" aria-hidden="true" />
                    </span>
                  </span>

                  <div className="min-w-0 flex-1 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-6">
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] leading-snug text-[#F4EFEA]/75">
                        <span className="font-display font-bold text-[#F4EFEA]">{event.actor}</span>{' '}
                        {event.action}{' '}
                        {event.targetUrl ? (
                          <a
                            href={event.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#F4EFEA] underline decoration-white/25 underline-offset-4 hover:decoration-white transition-colors"
                          >
                            {event.target}
                          </a>
                        ) : (
                          <span className="font-semibold text-[#F4EFEA]">{event.target}</span>
                        )}
                      </p>
                      {event.description && (
                        <p className="mt-2 text-sm leading-relaxed text-[#F4EFEA]/80">{event.description}</p>
                      )}
                      {event.meta && <p className="mt-2 text-xs text-[#F4EFEA]/70">{event.meta}</p>}
                    </div>
                    <span className="order-first sm:order-none shrink-0 text-xs font-medium text-[#F4EFEA]/75 tabular-nums sm:pt-0.5 sm:text-right">
                      {event.time}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      ))}
    </div>
  )
}
