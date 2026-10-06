import Reveal from '../ui/Reveal'
import PropertyCard from './PropertyCard'

export default function PropertyGrid({ properties, columns = 3, className = '' }) {
  const cols = columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
  return (
    <div className={`grid gap-6 lg:gap-8 ${cols} ${className}`}>
      {properties.map((p, i) => (
        <Reveal key={p.id} delay={(i % columns) * 90}>
          <PropertyCard property={p} />
        </Reveal>
      ))}
    </div>
  )
}
