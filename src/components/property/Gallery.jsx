import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Grid2x2, X } from 'lucide-react'
import Img from '../ui/Img'
import { photo } from '../../utils/images'
import { useLockBody } from '../../hooks/useLockBody'

function Lightbox({ images, index, onIndex, onClose, title }) {
  useLockBody(true)
  const count = images.length
  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex])
  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex])
  const stripRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [index])

  // simple swipe
  const touch = useRef(null)
  const onTouchStart = (e) => (touch.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)()
    touch.current = null
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#0d1012] text-white animate-fade-in" role="dialog" aria-modal="true" aria-label={`${title} photos`}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="text-[0.9rem] text-white/70">
          <span className="font-display text-[1.1rem] text-white">{title}</span>
          <span className="mx-3 text-white/30">|</span>
          <span className="tabular">{index + 1} / {count}</span>
        </p>
        <button type="button" onClick={onClose} aria-label="Close gallery" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
          <X size={20} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img
          key={images[index]}
          src={photo(images[index], 1800)}
          alt={`${title} — photo ${index + 1}`}
          className="max-h-full max-w-full rounded-xl object-contain animate-fade-in"
        />
        <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink sm:left-6 sm:grid">
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink sm:right-6 sm:grid">
          <ChevronRight size={22} />
        </button>
      </div>

      <div ref={stripRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-5 sm:justify-center sm:px-8">
        {images.map((id, i) => (
          <button
            key={id}
            type="button"
            onClick={() => onIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${i === index ? 'opacity-100 ring-2 ring-white' : 'opacity-45 hover:opacity-80'}`}
          >
            <img src={photo(id, 240)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>,
    document.body,
  )
}

export default function Gallery({ images, title }) {
  const [lightbox, setLightbox] = useState(null)
  const [slide, setSlide] = useState(0)
  const scroller = useRef(null)
  const side = images.slice(1, 5)

  const onScroll = () => {
    const el = scroller.current
    if (el) setSlide(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <>
      {/* Mobile: swipeable */}
      <div className="relative -mx-4 sm:-mx-6 md:hidden">
        <div ref={scroller} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
          {images.map((id, i) => (
            <button key={id} type="button" onClick={() => setLightbox(i)} className="aspect-[4/3] w-full shrink-0 snap-center bg-limestone" aria-label={`Open photo ${i + 1}`}>
              <Img id={id} alt={`${title} — photo ${i + 1}`} width={900} priority={i === 0} />
            </button>
          ))}
        </div>
        <span className="tabular absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[0.78rem] font-medium text-white backdrop-blur">
          {slide + 1} / {images.length}
        </span>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((id, i) => (
            <span key={id} className={`h-1.5 rounded-full bg-white transition-all duration-300 ${i === slide ? 'w-5' : 'w-1.5 opacity-60'}`} />
          ))}
        </div>
      </div>

      {/* Tablet & desktop: mosaic */}
      <div className="relative hidden h-[440px] grid-cols-4 grid-rows-2 gap-2.5 overflow-hidden rounded-[1.5rem] md:grid lg:h-[560px]">
        <button type="button" onClick={() => setLightbox(0)} className="group relative col-span-2 row-span-2 overflow-hidden bg-limestone" aria-label="Open photo 1">
          <Img id={images[0]} alt={`${title} — main photo`} width={1400} priority className="group-hover:scale-[1.03] duration-[1200ms]!" />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </button>
        {side.map((id, i) => (
          <button
            key={id}
            type="button"
            onClick={() => setLightbox(i + 1)}
            className={`group relative overflow-hidden bg-limestone ${side.length === 3 && i === 0 ? 'col-span-2' : ''} ${side.length === 2 ? 'col-span-2' : ''}`}
            aria-label={`Open photo ${i + 2}`}
          >
            <Img id={id} alt={`${title} — photo ${i + 2}`} width={700} className="group-hover:scale-[1.05] duration-[1200ms]!" />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setLightbox(0)}
          className="absolute bottom-5 right-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[0.88rem] font-semibold text-ink shadow-lift transition-all hover:bg-ink hover:text-white active:scale-95"
        >
          <Grid2x2 size={16} />
          Show all {images.length} photos
        </button>
      </div>

      {lightbox !== null && (
        <Lightbox images={images} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} title={title} />
      )}
    </>
  )
}
