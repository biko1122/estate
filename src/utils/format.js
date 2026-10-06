import { site } from '../config/site'

const nf = new Intl.NumberFormat('en-US')

export function formatPrice(price) {
  return `${site.currency} ${nf.format(price)}`
}

/** Compact form for tight spots: "EGP 48.5M", "EGP 145K" */
export function formatPriceShort(price) {
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `${site.currency} ${Number.isInteger(m) ? m : m.toFixed(1)}M`
  }
  if (price >= 1_000) return `${site.currency} ${Math.round(price / 1_000)}K`
  return `${site.currency} ${price}`
}

export function formatArea(area) {
  return `${nf.format(area)} m²`
}

export function formatNumber(n) {
  return nf.format(n)
}
