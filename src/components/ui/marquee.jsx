export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  duration = 25,
  gap = '1.5rem',
  ...props
}) {
  return (
    <div
      {...props}
      style={{
        '--duration': `${duration}s`,
        '--gap': gap,
      }}
      className={`group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              vertical ? 'flex-col animate-marquee-vertical' : 'animate-marquee'
            } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''} ${
              reverse ? '[animation-direction:reverse]' : ''
            }`}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

export default Marquee
