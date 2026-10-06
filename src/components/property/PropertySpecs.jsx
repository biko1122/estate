import { BedDouble, Bath, Maximize } from 'lucide-react'
import { formatArea } from '../../utils/format'

export default function PropertySpecs({ property, className = '' }) {
  const items = [
    { icon: BedDouble, value: property.beds, label: property.beds === 1 ? 'Bed' : 'Beds' },
    { icon: Bath, value: property.baths, label: property.baths === 1 ? 'Bath' : 'Baths' },
    { icon: Maximize, value: formatArea(property.area), label: '' },
  ]
  return (
    <ul className={`flex items-center text-[0.86rem] text-ink/75 ${className}`}>
      {items.map(({ icon: Icon, value, label }, i) => (
        <li key={i} className={`flex items-center gap-1.5 ${i > 0 ? 'ml-3.5 border-l border-line pl-3.5' : ''}`}>
          <Icon size={16} strokeWidth={1.6} className="text-muted" />
          <span className="tabular font-medium text-ink">{value}</span>
          {label && <span className="hidden text-muted min-[380px]:inline">{label}</span>}
        </li>
      ))}
    </ul>
  )
}
