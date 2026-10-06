import { NavLink } from 'react-router-dom'
import { ArrowUpRight, Heart, Mail, Phone, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import SocialIcons from '../ui/SocialIcons'
import { navLinks, site } from '../../config/site'
import { useLockBody } from '../../hooks/useLockBody'
import { useFavorites } from '../../context/FavoritesContext'

export default function MobileMenu({ open, onClose }) {
  useLockBody(open)
  const { count } = useFavorites()
  const links = [...navLinks, { label: 'Saved homes', to: '/favorites' }]

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white transition-transform duration-500 ease-[var(--ease-out-soft)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="grid h-11 w-11 place-items-center rounded-full bg-limestone text-ink transition-colors hover:bg-line"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pt-6" aria-label="Mobile">
          <ul className="border-t border-line">
            {links.map((l, i) => (
              <li
                key={l.to}
                className={`border-b border-line transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              >
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  tabIndex={open ? 0 : -1}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between py-5 font-display text-[1.9rem] leading-none transition-colors ${
                      isActive ? 'text-accent' : 'text-ink hover:text-accent'
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    {l.label}
                    {l.to === '/favorites' && count > 0 && (
                      <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 font-sans text-[0.75rem] font-bold text-accent">
                        <Heart size={11} fill="currentColor" /> {count}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight size={22} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-5 border-t border-line bg-limestone px-6 py-6">
          <div className="space-y-2 text-[0.92rem]">
            <a href={site.phoneHref} tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-ink">
              <Phone size={16} className="text-accent" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-ink">
              <Mail size={16} className="text-accent" /> {site.email}
            </a>
          </div>
          <Button to="/contact" onClick={onClose} size="lg" className="w-full" tabIndex={open ? 0 : -1}>
            Book a consultation
          </Button>
          <SocialIcons itemClassName="border-line bg-white text-ink hover:border-ink" />
        </div>
      </aside>
    </div>
  )
}
