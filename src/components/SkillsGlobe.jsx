import { useEffect, useMemo, useRef } from 'react'

// Globo de tecnologias inspirado no `skills --globo` de aramuni.dev, sem three.js:
// os ícones são botões HTML posicionados por projeção 3D feita à mão e a malha
// de fundo é desenhada num <canvas> 2D. O mesmo efeito por uma fração do peso.

const AUTO_SPEED = 0.0022 // rad por quadro de 16 ms: uma volta a cada ~45 s
const HOVER_FACTOR = 0.35 // com o ponteiro em cima, desacelera em vez de parar
const DRAG_SPEED = 0.006 // rad por pixel arrastado
const DRAG_THRESHOLD = 6 // px até um clique virar arrasto
const MAX_PITCH = 1.2
const MOSS = '37, 155, 85'
const CREAM = '244, 239, 234'

// Pontos bem espalhados na esfera unitária (espiral de Fibonacci)
function fibonacciSphere(count) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / count
    const r = Math.sqrt(1 - y * y)
    return { x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r }
  })
}

// Icosaedro subdividido duas vezes: 162 vértices e 480 arestas para a malha
function icosphere(detail) {
  const t = (1 + Math.sqrt(5)) / 2
  let verts = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(normalize)
  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]
  for (let d = 0; d < detail; d++) {
    const cache = new Map()
    const mid = (a, b) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`
      if (!cache.has(key)) {
        const [va, vb] = [verts[a], verts[b]]
        verts.push(normalize([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]))
        cache.set(key, verts.length - 1)
      }
      return cache.get(key)
    }
    faces = faces.flatMap(([a, b, c]) => {
      const ab = mid(a, b)
      const bc = mid(b, c)
      const ca = mid(c, a)
      return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]]
    })
  }
  const edges = new Map()
  for (const [a, b, c] of faces) {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      edges.set(p < q ? `${p}-${q}` : `${q}-${p}`, [p, q])
    }
  }
  return { verts, edges: [...edges.values()] }
}

function normalize([x, y, z]) {
  const len = Math.hypot(x, y, z)
  return [x / len, y / len, z / len]
}

const MESH = icosphere(2)

// Gira em torno de Y (yaw) e depois de X (pitch)
function rotate(x, y, z, yaw, pitch) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const x1 = x * cy + z * sy
  const z1 = -x * sy + z * cy
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  return [x1, y * cp - z1 * sp, y * sp + z1 * cp]
}

// Ângulos que trazem o ponto para a frente, no centro do globo
function facingAngles({ x, y, z }) {
  const yaw = Math.atan2(-x, z)
  const pitch = Math.atan2(y, Math.hypot(x, z))
  return { yaw, pitch: Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch)) }
}

const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a))
const smoothstep = (a, b, v) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export default function SkillsGlobe({ items, selectedKey, onSelect, expanded = false, label }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const itemRefs = useRef([])
  const pointsRef = useRef([])
  const state = useRef({
    yaw: 0.4,
    pitch: -0.28,
    velYaw: 0,
    velPitch: 0,
    target: null,
    hovering: false,
    drag: null,
    moved: false,
    reduced: false,
    width: 0,
    height: 0,
    redraw: () => {},
  })

  const points = useMemo(() => fibonacciSphere(items.length), [items.length])

  // O laço de animação lê os pontos pela ref, fora do ciclo de render
  useEffect(() => {
    pointsRef.current = points
    state.current.redraw()
  }, [points])

  // Ao selecionar, o ícone desliza para a frente e o globo segue girando
  useEffect(() => {
    const s = state.current
    const index = items.findIndex((item) => item.key === selectedKey)
    s.target = index >= 0 ? { ...facingAngles(points[index]), release: true } : null
    s.redraw()
  }, [selectedKey, items, points])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const s = state.current
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    s.reduced = motionQuery.matches
    const onMotionChange = (e) => {
      s.reduced = e.matches
    }
    motionQuery.addEventListener('change', onMotionChange)

    let frame = 0
    let visible = false
    let last = 0

    const draw = () => {
      const { width: w, height: h, yaw, pitch } = s
      if (!w || !h) return
      const radius = Math.min(w, h) * 0.37
      const camera = radius * 3.2
      const cx = w / 2
      const cy = h / 2
      const itemScale = Math.max(0.72, Math.min(1, radius / 175))

      // Malha: arestas agrupadas em faixas de profundidade, um stroke por faixa
      const dpr = canvas.width / w
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const shell = radius * 0.86
      const glow = ctx.createRadialGradient(cx - shell * 0.3, cy - shell * 0.35, shell * 0.1, cx, cy, shell)
      glow.addColorStop(0, `rgba(${CREAM}, 0.07)`)
      glow.addColorStop(1, `rgba(${MOSS}, 0.04)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, shell, 0, Math.PI * 2)
      ctx.fill()

      const projected = MESH.verts.map(([x, y, z]) => {
        const [rx, ry, rz] = rotate(x, y, z, yaw, pitch)
        const k = camera / (camera - rz * shell)
        return [cx + rx * shell * k, cy + ry * shell * k, rz]
      })
      const bands = [[], [], [], []]
      for (const [a, b] of MESH.edges) {
        const depth = (projected[a][2] + projected[b][2]) / 2
        bands[Math.min(3, Math.floor(((depth + 1) / 2) * 4))].push(a, b)
      }
      ctx.lineWidth = 1
      bands.forEach((band, i) => {
        ctx.strokeStyle = `rgba(${MOSS}, ${[0.08, 0.13, 0.24, 0.4][i]})`
        ctx.beginPath()
        for (let j = 0; j < band.length; j += 2) {
          const p = projected[band[j]]
          const q = projected[band[j + 1]]
          ctx.moveTo(p[0], p[1])
          ctx.lineTo(q[0], q[1])
        }
        ctx.stroke()
      })

      // Ícones: posição, escala e opacidade conforme a profundidade
      pointsRef.current.forEach((point, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        const [rx, ry, rz] = rotate(point.x, point.y, point.z, yaw, pitch)
        const k = camera / (camera - rz * radius)
        const x = cx + rx * radius * k
        const y = cy + ry * radius * k
        const front = smoothstep(-0.4, 0.6, rz)
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${(k * itemScale * (0.8 + 0.2 * front)).toFixed(3)})`
        el.style.opacity = (0.14 + 0.86 * front).toFixed(3)
        // O rótulo some mais rápido que o ícone: atrás do globo, só o logo fica
        el.style.setProperty('--front', front.toFixed(3))
        el.style.zIndex = String(Math.round((rz + 1) * 50))
        el.style.pointerEvents = rz > -0.2 ? 'auto' : 'none'
      })
    }

    const step = (now) => {
      const dt = Math.min(48, now - (last || now)) / 16
      last = now
      if (s.target && !s.drag) {
        const ease = s.reduced ? 1 : 1 - Math.pow(0.86, dt)
        const dYaw = wrapAngle(s.target.yaw - s.yaw)
        const dPitch = s.target.pitch - s.pitch
        s.yaw += dYaw * ease
        s.pitch += dPitch * ease
        // Depois de trazer o ícone escolhido para a frente, volta a girar.
        // O foco por teclado segura o ícone na frente até o blur.
        if (s.target.release && Math.abs(dYaw) + Math.abs(dPitch) < 0.003) s.target = null
      } else if (!s.drag) {
        if (Math.abs(s.velYaw) + Math.abs(s.velPitch) > 0.0004 && !s.reduced) {
          s.yaw += s.velYaw * dt
          s.pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, s.pitch + s.velPitch * dt))
          s.velYaw *= Math.pow(0.93, dt)
          s.velPitch *= Math.pow(0.93, dt)
        } else if (!s.reduced) {
          s.yaw += AUTO_SPEED * (s.hovering ? HOVER_FACTOR : 1) * dt
        }
      }
      draw()
      frame = visible ? requestAnimationFrame(step) : 0
    }

    const start = () => {
      if (!frame && visible) {
        last = 0
        frame = requestAnimationFrame(step)
      }
    }
    s.redraw = () => {
      draw()
      start()
    }

    const resize = () => {
      const rect = stage.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      s.width = rect.width
      s.height = rect.height
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      draw()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    resize()

    // Fora da tela o laço para: nada de rAF gastando bateria à toa
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
      },
      { rootMargin: '120px 0px' },
    )
    intersection.observe(stage)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

  const handlePointerDown = (e) => {
    if (e.button !== 0) return
    const s = state.current
    s.drag = { x: e.clientX, y: e.clientY, lastX: e.clientX, lastY: e.clientY, id: e.pointerId }
    s.moved = false
    s.velYaw = 0
    s.velPitch = 0
  }

  const handlePointerMove = (e) => {
    const s = state.current
    const drag = s.drag
    if (!drag || drag.id !== e.pointerId) return
    if (!s.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < DRAG_THRESHOLD) return
      // Só agora captura: antes disso, o clique ainda chega ao botão do ícone
      s.moved = true
      s.target = null
      stageRef.current.setPointerCapture(e.pointerId)
    }
    const dx = e.clientX - drag.lastX
    const dy = e.clientY - drag.lastY
    drag.lastX = e.clientX
    drag.lastY = e.clientY
    s.yaw += dx * DRAG_SPEED
    s.pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, s.pitch - dy * DRAG_SPEED))
    s.velYaw = dx * DRAG_SPEED
    s.velPitch = -dy * DRAG_SPEED
    s.redraw()
  }

  const endDrag = (e) => {
    const s = state.current
    if (!s.drag || s.drag.id !== e.pointerId) return
    s.drag = null
    s.redraw()
  }

  // Um arrasto que termina em cima de um ícone não conta como clique
  const handleClickCapture = (e) => {
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }

  // Navegação por teclado: o ícone focado gira para a frente
  const handleFocus = (index) => {
    const s = state.current
    s.target = facingAngles(pointsRef.current[index])
    s.redraw()
  }

  const handleBlur = () => {
    state.current.target = null
  }

  // Sem seleção o globo fica maior; a altura anima junto com a coluna da grade
  // e o ResizeObserver redesenha a cada quadro da transição
  return (
    <div
      ref={stageRef}
      role="group"
      aria-label={label}
      className={`relative w-full h-[clamp(300px,82vw,500px)] transition-[height] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] cursor-grab active:cursor-grabbing select-none touch-pan-y ${
        expanded ? 'lg:h-[600px]' : ''
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={() => {
        state.current.hovering = true
      }}
      onPointerLeave={() => {
        state.current.hovering = false
      }}
      onClickCapture={handleClickCapture}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <ul className="absolute inset-0 m-0 p-0 list-none">
        {items.map((item, i) => {
          const selected = item.key === selectedKey
          const Icon = item.Icon
          return (
            <li key={item.key} className="contents">
              <button
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(selected ? null : item.key)}
                onFocus={() => handleFocus(i)}
                onBlur={handleBlur}
                draggable={false}
                className="group/item absolute left-0 top-0 flex flex-col items-center gap-1.5 p-1 opacity-0 rounded-2xl outline-none will-change-transform cursor-pointer"
              >
                <span
                  className={`w-11 h-11 rounded-xl bg-cream border flex items-center justify-center p-2 shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-out group-hover/item:scale-110 group-focus-visible/item:ring-2 group-focus-visible/item:ring-moss/60 ${
                    selected ? 'border-moss ring-2 ring-moss/50 scale-110' : 'border-cream/40'
                  }`}
                >
                  <Icon className="w-full h-full" />
                </span>
                <span
                  style={{ opacity: 'var(--front, 1)' }}
                  className={`text-[13px] font-display font-bold leading-none whitespace-nowrap transition-colors duration-200 ${
                    selected ? 'text-moss' : 'text-cream/70 group-hover/item:text-cream'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
