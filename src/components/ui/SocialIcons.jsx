import { site } from '../../config/site'

// Brand glyphs (lucide no longer ships brand icons).
const icons = {
  instagram:
    'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.2c-.1-1.5-.4-2.8-1.5-3.8-1-1-2.4-1.4-3.8-1.5-1.5-.1-5.9-.1-7.4 0-1.5.1-2.8.4-3.8 1.5-1.1 1-1.4 2.3-1.5 3.8-.1 1.5-.1 6 0 7.5.1 1.5.4 2.8 1.5 3.8 1.1 1 2.3 1.4 3.8 1.5 1.5.1 6 .1 7.5 0 1.5-.1 2.8-.4 3.8-1.5 1-1 1.4-2.3 1.5-3.8.1-1.5.1-6 0-7.5Zm-2 9.1a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4A3 3 0 0 1 19 6.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z',
  facebook: 'M14 13.5h2.5l1-4H14v-2c0-1 0-2 2-2h1.5V2.1c-.3 0-1.6-.1-2.9-.1C11.9 2 10 3.7 10 6.7v2.8H7v4h3V22h4v-8.5Z',
  linkedin:
    'M6.9 21H2.8V8.9h4.1V21ZM4.8 7.2a2.4 2.4 0 1 1 0-4.7 2.4 2.4 0 0 1 0 4.7ZM21.2 21h-4.1v-5.9c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6H8.8V8.9h3.9v1.7h.1c.5-1 1.9-2 3.8-2 4.1 0 4.9 2.7 4.9 6.2V21Z',
  youtube:
    'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.8 3-5.8 3Z',
}

const labels = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', youtube: 'YouTube' }

export default function SocialIcons({ className = '', itemClassName = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Object.entries(site.social).map(([key, href]) => (
        <a
          key={key}
          href={href}
          aria-label={labels[key]}
          onClick={(e) => href === '#' && e.preventDefault()}
          className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${itemClassName}`}
        >
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-current">
            <path d={icons[key]} />
          </svg>
        </a>
      ))}
    </div>
  )
}
