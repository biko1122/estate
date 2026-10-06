import { Quote, Star } from 'lucide-react'

function initials(name) {
  return name
    .split(/\s|&/)
    .filter(Boolean)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

export default function TestimonialCard({ testimonial }) {
  const { quote, name, detail, rating } = testimonial
  return (
    <figure className="flex h-full flex-col rounded-[1.25rem] border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-8">
      <div className="flex items-center justify-between">
        <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
          <Quote size={18} fill="currentColor" strokeWidth={0} />
        </span>
        <div className="flex gap-0.5 text-sand" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
      <blockquote className="mt-5 flex-1 text-[1rem] leading-relaxed text-ink/85">{quote}</blockquote>
      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-5">
        <span className="arch grid h-12 w-10 shrink-0 place-items-end justify-center bg-limestone pb-1.5 font-display text-[0.95rem] text-accent">
          {initials(name)}
        </span>
        <span>
          <span className="block text-[0.92rem] font-semibold text-ink">{name}</span>
          <span className="block text-[0.82rem] text-muted">{detail}</span>
        </span>
      </figcaption>
    </figure>
  )
}
