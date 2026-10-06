import Img from '../ui/Img'
import Breadcrumb from '../ui/Breadcrumb'

/** Image header for inner pages. Leaves room underneath for overlapping panels via `children`. */
export default function PageHero({ eyebrow, title, intro, image, breadcrumb, children, tall = false }) {
  return (
    <section className="relative">
      <div className={`relative flex items-end overflow-hidden bg-basalt pt-36 ${tall ? 'min-h-[520px] pb-20 lg:min-h-[600px]' : 'min-h-[420px] pb-16 lg:min-h-[460px]'} ${children ? 'lg:pb-28' : ''}`}>
        <div className="absolute inset-0">
          <Img id={image} alt="" width={2000} priority className="animate-[hero-zoom_16s_ease-out_both]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1113]/85 via-[#0d1113]/55 to-[#0d1113]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1113]/60 to-transparent" />
        <div className="container-x relative">
          {breadcrumb && <Breadcrumb items={breadcrumb} tone="dark" className="mb-6 animate-fade-up" />}
          {eyebrow && (
            <p className="eyebrow mb-4 flex items-center gap-3 text-accent-bright animate-fade-up">
              <span className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl font-display text-[2.6rem] leading-[1.04] text-white animate-fade-up [animation-delay:100ms] sm:text-[3.4rem] lg:text-[4.2rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70 animate-fade-up [animation-delay:200ms]">{intro}</p>
          )}
        </div>
      </div>
      {children && <div className="container-x relative z-20 -mt-8 lg:-mt-14">{children}</div>}
    </section>
  )
}
