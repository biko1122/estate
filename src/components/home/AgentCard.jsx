import { Mail, Phone } from 'lucide-react'
import Img from '../ui/Img'

export default function AgentCard({ agent }) {
  return (
    <article className="group text-center">
      <div className="arch relative mx-auto aspect-[4/5] w-full bg-limestone">
        <Img
          id={agent.photo}
          alt={agent.name}
          width={600}
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-top grayscale-[35%] transition-all group-hover:scale-[1.04] group-hover:grayscale-0 duration-[1000ms]!"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-center gap-2 pb-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`} aria-label={`Call ${agent.name}`} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lift transition-colors hover:bg-accent hover:text-white">
            <Phone size={17} />
          </a>
          <a href={`mailto:${agent.email}`} aria-label={`Email ${agent.name}`} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lift transition-colors hover:bg-accent hover:text-white">
            <Mail size={17} />
          </a>
        </div>
      </div>
      <h3 className="mt-6 font-display text-[1.45rem] leading-tight">{agent.name}</h3>
      <p className="mt-1 text-[0.85rem] font-semibold text-accent">{agent.role}</p>
      <p className="mx-auto mt-3 max-w-[270px] text-[0.9rem] leading-relaxed text-muted">{agent.bio}</p>
    </article>
  )
}
