import { useState, useEffect, useRef, useMemo } from 'react'

export function BlurText({
  text = '',
  delay = 50,
  animateBy = 'words',
  direction = 'top',
  className = '',
  style = {}
}) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  const elements = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  )

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {elements.map((el, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'translateY(0)'
              : `translateY(${direction === 'top' ? '-20px' : '20px'})`,
            transition: `all 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${i * delay}ms`
          }}
        >
          {el}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </p>
  )
}

export default BlurText
