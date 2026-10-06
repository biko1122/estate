import { formatPrice } from '../../utils/format'

export default function PriceTag({ property, size = 'md', className = '' }) {
  const big = size === 'lg'
  return (
    <p className={`tabular flex items-baseline gap-1.5 ${className}`}>
      <span className={`font-semibold tracking-[-0.01em] text-ink ${big ? 'text-[1.7rem] sm:text-[2rem]' : 'text-[1.12rem]'}`}>
        {formatPrice(property.price)}
      </span>
      {property.purpose === 'rent' && <span className={`text-muted ${big ? 'text-[1rem]' : 'text-[0.85rem]'}`}>/ month</span>}
    </p>
  )
}
