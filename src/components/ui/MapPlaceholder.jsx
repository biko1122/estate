import { MapPin, Plus, Minus } from 'lucide-react'

/**
 * Illustrated map used until a real map provider (Google Maps / Mapbox)
 * is wired in. `pin` is the marker position in percent: [x, y].
 */
export default function MapPlaceholder({ pin = [55, 48], label, sublabel, className = '' }) {
  const [x, y] = pin
  return (
    <div className={`relative overflow-hidden bg-[#ebe8e1] ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* parks */}
        <g fill="#d9e2d0">
          <path d="M80 60h150l20 90-120 30-60-50z" />
          <path d="M520 330h170v120H540z" />
          <circle cx="640" cy="120" r="46" />
          <path d="M260 380l90-20 40 90H250z" />
        </g>
        {/* river */}
        <path d="M430 -10C400 90 470 170 440 260S380 420 420 520" fill="none" stroke="#c9dbe3" strokeWidth="38" />
        {/* blocks */}
        <g fill="#f5f3ee">
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 10 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={c * 82 + 6} y={r * 74 + 8} width="62" height="52" rx="4" opacity={(r + c) % 4 === 0 ? 0 : 0.85} />
            )),
          )}
        </g>
        {/* main roads */}
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path d="M-20 300C200 270 360 330 820 250" strokeWidth="14" />
          <path d="M160 -20C190 160 140 330 220 520" strokeWidth="11" />
          <path d="M600 -20C580 180 650 320 610 520" strokeWidth="11" />
          <path d="M-20 120H820" strokeWidth="7" />
        </g>
        <g fill="none" stroke="#e2c98f" strokeLinecap="round" opacity="0.8">
          <path d="M-20 300C200 270 360 330 820 250" strokeWidth="4" />
        </g>
      </svg>

      {/* pin */}
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -100%)' }}>
        <div className="relative flex flex-col items-center">
          {label && (
            <div className="mb-2 whitespace-nowrap rounded-xl bg-white px-3.5 py-2 text-center shadow-lift">
              <p className="text-[0.82rem] font-semibold text-ink">{label}</p>
              {sublabel && <p className="text-[0.72rem] text-muted">{sublabel}</p>}
            </div>
          )}
          <span className="absolute bottom-[2px] h-10 w-10 animate-ping rounded-full bg-accent/25" />
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-accent text-white shadow-lift ring-4 ring-white">
            <MapPin size={19} />
          </span>
        </div>
      </div>

      {/* faux controls */}
      <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl bg-white shadow-card">
        <span className="grid h-9 w-9 place-items-center border-b border-line text-ink/70"><Plus size={16} /></span>
        <span className="grid h-9 w-9 place-items-center text-ink/70"><Minus size={16} /></span>
      </div>
    </div>
  )
}
