import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'
import { navLinks, site } from '../../config/site'
import { useFavorites } from '../../context/FavoritesContext'

// Pages that open with a full-bleed image: the bar starts transparent over it.
const OVERLAY_ROUTES = ['/', '/properties', '/about', '/contact']

export default function Navbar() {
  const { pathname } = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const transparent = OVERLAY_ROUTES.includes(pathname) && !scrolled
  const light = transparent

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-gradient-to-b from-black/35 to-transparent py-5'
            : 'border-b border-line/80 bg-white/90 py-3 shadow-[0_8px_30px_-20px_rgb(0_0_0/0.25)] backdrop-blur-xl'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Logo tone={light ? 'light' : 'dark'} />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300 after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
                    light
                      ? `text-white/85 hover:text-white after:bg-white ${isActive ? 'text-white after:scale-x-100' : 'after:scale-x-0'}`
                      : `text-ink/70 hover:text-ink after:bg-accent ${isActive ? 'text-ink after:scale-x-100' : 'after:scale-x-0'}`
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className={`mr-2 hidden items-center gap-2 text-[0.88rem] font-medium transition-colors xl:flex ${
                light ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-ink'
              }`}
            >
              <Phone size={15} />
              <span className="tabular">{site.phone}</span>
            </a>

            <Link
              to="/favorites"
              aria-label={`Saved homes (${count})`}
              className={`relative grid h-11 w-11 place-items-center rounded-full transition-colors duration-300 ${
                light ? 'text-white hover:bg-white/15' : 'text-ink hover:bg-limestone'
              }`}
            >
              <Heart size={19} strokeWidth={1.8} />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-white animate-pop"
                >
                  {count}
                </span>
              )}
            </Link>

            <span className="hidden md:block">
              <Button to="/contact" variant={light ? 'glass' : 'dark'} size="sm" className="h-10 px-5">
                Book a consultation
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                light ? 'text-white hover:bg-white/15' : 'text-ink hover:bg-limestone'
              }`}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
