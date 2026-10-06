import { Heart } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'
import PropertyGrid from '../components/property/PropertyGrid'
import { useFavorites } from '../context/FavoritesContext'
import { properties } from '../data/properties'

export default function Favorites() {
  const { ids } = useFavorites()
  const saved = ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean)

  return (
    <section className="min-h-[70vh] bg-limestone pb-24 pt-28 sm:pt-32 lg:pb-32">
      <div className="container-x">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Saved homes' }]} className="mb-6" />
        <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-[2.6rem] leading-tight sm:text-[3.4rem]">Saved homes</h1>
            <p className="mt-2 text-[1rem] text-muted">
              {saved.length
                ? `${saved.length} ${saved.length === 1 ? 'home' : 'homes'} saved on this device.`
                : 'Tap the heart on any property to keep it here.'}
            </p>
          </div>
          {saved.length > 0 && (
            <Button to="/contact" variant="dark">
              Ask about these homes
            </Button>
          )}
        </div>

        {saved.length ? (
          <PropertyGrid properties={saved} className="mt-10" />
        ) : (
          <div className="mt-12 flex flex-col items-center rounded-[1.5rem] bg-white px-6 py-20 text-center shadow-card">
            <span className="arch grid h-24 w-20 place-items-center bg-accent-soft pt-3 text-accent">
              <Heart size={28} strokeWidth={1.6} />
            </span>
            <h2 className="mt-7 font-display text-[1.9rem]">No saved homes yet</h2>
            <p className="mt-2 max-w-sm text-[0.98rem] text-muted">
              Save properties while you browse to compare them later or share them with your consultant.
            </p>
            <Button to="/properties" className="mt-8" size="lg">
              Browse properties
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
