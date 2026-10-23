// Ilustrações animadas dos cargos da Trajetória, desenhadas em SVG com a
// paleta do site (viewBox 400 × 300, a mesma proporção 4:3 do painel). As
// animações são CSS (classes .illo-* no index.css): com "reduzir movimento"
// ligado, a regra global encerra cada uma e fica a cena parada, já completa.

const CARBON = '#191A1D'
const RAISED = '#222327'
const IVORY = '#FDFFF3'
const ELECTRIC = '#3FEE3F'
const ICE = '#89BBFE'
const MONO = "'Fira Code', ui-monospace, monospace"

// Atraso de cada peça numa animação em sequência
const delay = (s) => ({ animationDelay: `${s}s` })

function Backdrop({ id }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={IVORY} strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={CARBON} />
      <rect width="400" height="300" fill={`url(#${id})`} />
    </>
  )
}

// Painel solar visto de cima, em perspectiva
function SolarPanel({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M4 0H30L26 18H0Z" fill={IVORY} fillOpacity="0.12" stroke={IVORY} strokeOpacity="0.45" />
      <path d="M12.7 0L8.7 18M21.3 0L17.3 18M2 9H28" stroke={IVORY} strokeOpacity="0.3" />
      <path d="M13 18V25M8 25H18" stroke={IVORY} strokeOpacity="0.45" />
    </g>
  )
}

// Analista de TI — Centro de Operações Remotas: usinas ligadas ao COR,
// gráfico de geração ao vivo e indicadores de rede, telemetria, CFTV e servidores
export function OperationsIllustration() {
  const center = [108, 132]
  const plants = [
    [38, 70],
    [178, 70],
    [38, 196],
    [178, 196],
  ]
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <Backdrop id="illo-grid-cor" />

      <text x="20" y="32" fill={IVORY} fillOpacity="0.7" fontFamily={MONO} fontSize="11" fontWeight="700" letterSpacing="1">
        SCADA
      </text>
      <rect x="326" y="19" width="56" height="18" rx="9" fill={ELECTRIC} fillOpacity="0.15" stroke={ELECTRIC} strokeOpacity="0.5" />
      <circle className="illo-blink" cx="338" cy="28" r="3.5" fill={ELECTRIC} />
      <text x="346" y="32" fill={ELECTRIC} fontFamily={MONO} fontSize="10" fontWeight="700">
        LIVE
      </text>

      {/* Usinas → COR: dados correndo pelos cabos */}
      {plants.map(([x, y], i) => (
        <g key={i}>
          <line x1={x + 15} y1={y + 12} x2={center[0]} y2={center[1]} stroke={IVORY} strokeOpacity="0.1" strokeWidth="2" />
          <line
            className="illo-flow"
            style={delay(i * 0.3)}
            x1={x + 15}
            y1={y + 12}
            x2={center[0]}
            y2={center[1]}
            stroke={ELECTRIC}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <SolarPanel x={x} y={y} />
        </g>
      ))}
      <circle className="illo-pulse" cx={center[0]} cy={center[1]} r="20" fill="none" stroke={ELECTRIC} strokeWidth="1.5" />
      <circle cx={center[0]} cy={center[1]} r="20" fill={RAISED} stroke={ELECTRIC} strokeWidth="1.5" />
      <rect x={center[0] - 10} y={center[1] - 8} width="20" height="13" rx="2" fill="none" stroke={IVORY} strokeOpacity="0.85" strokeWidth="1.5" />
      <path d={`M${center[0] - 5} ${center[1] + 9}H${center[0] + 5}`} stroke={IVORY} strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" />

      {/* Geração do dia: curva solar desenhando e a linha de leitura varrendo */}
      <rect x="222" y="52" width="160" height="150" rx="10" fill={RAISED} stroke={IVORY} strokeOpacity="0.08" />
      <text x="234" y="72" fill={IVORY} fillOpacity="0.6" fontFamily={MONO} fontSize="10" fontWeight="700">
        MW
      </text>
      <text x="370" y="72" textAnchor="end" fill={IVORY} fontFamily={MONO} fontSize="12" fontWeight="700">
        12.4
      </text>
      {[110, 140, 170].map((y) => (
        <line key={y} x1="234" y1={y} x2="370" y2={y} stroke={IVORY} strokeOpacity="0.06" />
      ))}
      <path d="M234 186C262 186 270 96 302 92C334 88 342 186 370 186Z" fill={ICE} fillOpacity="0.14" />
      <path
        className="illo-draw"
        pathLength="1"
        d="M234 186C262 186 270 96 302 92C334 88 342 186 370 186"
        fill="none"
        stroke={ICE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g className="illo-scan">
        <line x1="234" y1="84" x2="234" y2="188" stroke={IVORY} strokeOpacity="0.35" strokeDasharray="3 3" />
      </g>

      {/* Indicadores: disponibilidade, telemetria, câmera, servidores */}
      {[20, 112, 204, 296].map((x) => (
        <rect key={x} x={x} y="222" width="84" height="58" rx="10" fill={RAISED} stroke={IVORY} strokeOpacity="0.08" />
      ))}
      <circle cx="34" cy="238" r="3.5" fill={ELECTRIC} />
      <text x="32" y="267" fill={IVORY} fontFamily={MONO} fontSize="17" fontWeight="700">
        99.9%
      </text>

      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          className="illo-bar"
          style={delay(i * 0.18)}
          x={130 + i * 13}
          y={268 - (i + 1) * 8}
          width="8"
          height={(i + 1) * 8}
          rx="2"
          fill={i < 3 ? ELECTRIC : IVORY}
          fillOpacity={i < 3 ? 1 : 0.25}
        />
      ))}

      <rect x="226" y="240" width="30" height="22" rx="4" fill="none" stroke={IVORY} strokeOpacity="0.7" strokeWidth="1.5" />
      <path d="M256 246L270 239V263L256 256" fill="none" stroke={IVORY} strokeOpacity="0.7" strokeWidth="1.5" strokeLinejoin="round" />
      <circle className="illo-blink" cx="279" cy="236" r="3.5" fill={ELECTRIC} />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="312" y={234 + i * 14} width="52" height="10" rx="2" fill="none" stroke={IVORY} strokeOpacity="0.45" />
          <circle className="illo-blink" style={delay(i * 0.45)} cx="356" cy={239 + i * 14} r="2" fill={ELECTRIC} />
          <path d={`M318 ${239 + i * 14}H336`} stroke={IVORY} strokeOpacity="0.3" />
        </g>
      ))}
    </svg>
  )
}

// Analista de Comunicação Interna & Web: o site do grupo montando no
// navegador, um cursor clicando no botão e um post em vídeo ao lado
export function WebIllustration() {
  const blocks = [
    // [x, y, largura, altura, cor, opacidade, raio]
    [44, 66, 26, 8, ELECTRIC, 1, 2],
    [214, 67, 22, 6, IVORY, 0.35, 3],
    [242, 67, 22, 6, IVORY, 0.35, 3],
    [270, 67, 22, 6, IVORY, 0.35, 3],
    [44, 94, 140, 12, IVORY, 0.9, 3],
    [44, 112, 104, 12, IVORY, 0.9, 3],
    [44, 134, 120, 6, IVORY, 0.35, 3],
    [44, 145, 96, 6, IVORY, 0.35, 3],
  ]
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <Backdrop id="illo-grid-web" />

      {/* Janela do navegador */}
      <rect x="28" y="22" width="290" height="236" rx="12" fill={RAISED} stroke={IVORY} strokeOpacity="0.12" />
      <path d="M28 50H318" stroke={IVORY} strokeOpacity="0.08" />
      {[44, 56, 68].map((cx) => (
        <circle key={cx} cx={cx} cy="36" r="3.5" fill={IVORY} fillOpacity="0.25" />
      ))}
      <rect x="92" y="28" width="150" height="16" rx="8" fill={CARBON} />
      <text x="167" y="40" textAnchor="middle" fill={IVORY} fillOpacity="0.6" fontFamily={MONO} fontSize="9">
        grupogvs.com.br
      </text>

      {/* A página montando, peça por peça */}
      {blocks.map(([x, y, w, h, fill, opacity, r], i) => (
        <rect key={i} className="illo-build" style={delay(i * 0.12)} x={x} y={y} width={w} height={h} rx={r} fill={fill} fillOpacity={opacity} />
      ))}
      <g className="illo-build" style={delay(1)}>
        <rect x="44" y="162" width="62" height="20" rx="10" fill={ELECTRIC} />
        <path d="M60 172H90" stroke={CARBON} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="illo-build" style={delay(0.6)}>
        <rect x="200" y="88" width="104" height="96" rx="8" fill={ICE} fillOpacity="0.16" />
        <circle cx="276" cy="112" r="10" fill={IVORY} fillOpacity="0.8" />
        <path d="M200 166L232 138L256 158L272 146L304 172V176A8 8 0 0 1 296 184H208A8 8 0 0 1 200 176Z" fill={ICE} fillOpacity="0.55" />
      </g>
      {[44, 132, 220].map((x, i) => (
        <g key={x} className="illo-build" style={delay(1.2 + i * 0.15)}>
          <rect x={x} y="198" width="80" height="46" rx="6" fill={CARBON} stroke={IVORY} strokeOpacity="0.1" />
          <rect x={x + 8} y="208" width="22" height="6" rx="3" fill={ELECTRIC} fillOpacity="0.8" />
          <rect x={x + 8} y="222" width="58" height="5" rx="2.5" fill={IVORY} fillOpacity="0.3" />
          <rect x={x + 8} y="232" width="42" height="5" rx="2.5" fill={IVORY} fillOpacity="0.3" />
        </g>
      ))}

      {/* Cursor indo até o botão e clicando */}
      <circle className="illo-ripple" cx="75" cy="172" r="14" fill="none" stroke={IVORY} strokeWidth="1.5" />
      <g className="illo-cursor">
        <path d="M75 172L75 190L80 185L84 194L88 192L84 183L91 183Z" fill={IVORY} stroke={CARBON} strokeWidth="1.2" strokeLinejoin="round" />
      </g>

      {/* Post com vídeo, ao lado da janela */}
      <g className="illo-float">
        <g transform="rotate(5 330 200)">
          <rect x="276" y="128" width="104" height="138" rx="12" fill={CARBON} stroke={IVORY} strokeOpacity="0.2" />
          <rect x="286" y="138" width="84" height="70" rx="6" fill={IVORY} fillOpacity="0.1" />
          <circle cx="328" cy="173" r="15" fill={ELECTRIC} />
          <path d="M323 165L336 173L323 181Z" fill={CARBON} />
          <path
            d="M291 226C291 221 297 219 300 223C303 219 309 221 309 226C309 231 300 236 300 236C300 236 291 231 291 226Z"
            fill={ELECTRIC}
          />
          <rect x="316" y="222" width="50" height="5" rx="2.5" fill={IVORY} fillOpacity="0.4" />
          <rect x="286" y="244" width="70" height="5" rx="2.5" fill={IVORY} fillOpacity="0.25" />
        </g>
      </g>
      <g transform="translate(330 30)">
        <rect width="52" height="22" rx="11" fill={ICE} fillOpacity="0.15" stroke={ICE} strokeOpacity="0.5" />
        <text x="26" y="15" textAnchor="middle" fill={ICE} fontFamily={MONO} fontSize="10" fontWeight="700">
          {'</>'}
        </text>
      </g>
    </svg>
  )
}

// Assistente de Comunicação e Marketing: celular gravando, curtidas subindo,
// o feed de posts preenchendo e a linha do tempo da edição
export function MediaIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <Backdrop id="illo-grid-mkt" />

      {/* Celular gravando */}
      <rect x="34" y="22" width="132" height="256" rx="20" fill={RAISED} stroke={IVORY} strokeOpacity="0.18" strokeWidth="1.5" />
      <rect x="44" y="34" width="112" height="208" rx="12" fill={CARBON} />
      <rect x="84" y="28" width="32" height="4" rx="2" fill={IVORY} fillOpacity="0.2" />
      <circle className="illo-blink" cx="56" cy="48" r="3.5" fill={ELECTRIC} />
      <text x="63" y="51.5" fill={IVORY} fontFamily={MONO} fontSize="9" fontWeight="700">
        REC
      </text>
      <text x="146" y="51.5" textAnchor="end" fill={IVORY} fillOpacity="0.6" fontFamily={MONO} fontSize="9">
        00:12
      </text>
      {/* Mira da câmera e a cena: usina solar ao sol */}
      <path
        d="M58 76V66H68M132 66H142V76M142 196V206H132M68 206H58V196"
        fill="none"
        stroke={IVORY}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <circle cx="122" cy="98" r="11" fill={IVORY} fillOpacity="0.85" />
      <SolarPanel x="66" y="150" />
      <SolarPanel x="98" y="150" />
      <path d="M58 190H142" stroke={IVORY} strokeOpacity="0.2" />
      <circle cx="100" cy="258" r="9" fill="none" stroke={IVORY} strokeOpacity="0.5" strokeWidth="1.5" />
      <circle className="illo-blink" cx="100" cy="258" r="5" fill={ELECTRIC} />

      {/* Curtidas subindo do celular */}
      {/* O translate fica no <g>: a animação CSS sobrescreveria o transform do próprio path */}
      {[
        [150, 206],
        [164, 178],
        [151, 150],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path
            className="illo-heart"
            style={delay(i * 0.9)}
            d="M0 4C0 0 5 -2 7 2C9 -2 14 0 14 4C14 8 7 12 7 12C7 12 0 8 0 4Z"
            fill={ELECTRIC}
          />
        </g>
      ))}

      {/* Feed: os posts aparecem um a um */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 196 + (i % 3) * 62
        const y = 26 + Math.floor(i / 3) * 62
        const tone = [ELECTRIC, IVORY, ICE][i % 3]
        return (
          <g key={i} className="illo-build" style={delay(i * 0.2)}>
            <rect x={x} y={y} width="54" height="54" rx="8" fill={tone} fillOpacity={tone === IVORY ? 0.1 : 0.25} stroke={IVORY} strokeOpacity="0.08" />
            {i === 4 && <path d={`M${x + 22} ${y + 18}L${x + 36} ${y + 27}L${x + 22} ${y + 36}Z`} fill={IVORY} />}
            {i === 0 && <circle cx={x + 27} cy={y + 27} r="9" fill={IVORY} fillOpacity="0.8" />}
            {i === 8 && <path d={`M${x + 10} ${y + 42}L${x + 24} ${y + 26}L${x + 34} ${y + 36}L${x + 44} ${y + 28}`} fill="none" stroke={ELECTRIC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        )
      })}

      {/* Linha do tempo da edição, com a agulha correndo */}
      <rect x="196" y="218" width="178" height="60" rx="10" fill={RAISED} stroke={IVORY} strokeOpacity="0.08" />
      <rect x="206" y="230" width="58" height="12" rx="3" fill={ELECTRIC} fillOpacity="0.8" />
      <rect x="268" y="230" width="44" height="12" rx="3" fill={ELECTRIC} fillOpacity="0.45" />
      <rect x="316" y="230" width="48" height="12" rx="3" fill={ELECTRIC} fillOpacity="0.8" />
      <rect x="206" y="248" width="94" height="10" rx="3" fill={ICE} fillOpacity="0.6" />
      <rect x="304" y="248" width="60" height="10" rx="3" fill={ICE} fillOpacity="0.3" />
      <path d="M206 266H364" stroke={IVORY} strokeOpacity="0.15" strokeDasharray="2 6" />
      <g className="illo-playhead">
        <line x1="206" y1="224" x2="206" y2="272" stroke={IVORY} strokeWidth="1.5" />
        <path d="M201 222H211L206 228Z" fill={IVORY} />
      </g>
    </svg>
  )
}
