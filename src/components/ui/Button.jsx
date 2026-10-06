import { Link } from 'react-router-dom'

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition-all duration-300 ease-out select-none active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100 whitespace-nowrap'

const variants = {
  primary:
    'bg-accent text-white shadow-[0_10px_24px_-12px_var(--color-accent)] hover:bg-accent-dark hover:shadow-[0_16px_30px_-12px_var(--color-accent)]',
  dark: 'bg-ink text-white hover:bg-black',
  outline: 'border border-ink/15 bg-white text-ink hover:border-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-limestone',
  glass: 'border border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-ink',
  ghost: 'text-ink hover:bg-limestone',
}

const sizes = {
  sm: 'h-9 px-4 text-[0.82rem]',
  md: 'h-11 px-6 text-[0.9rem]',
  lg: 'h-[3.25rem] px-7 text-[0.95rem]',
  icon: 'h-11 w-11',
}

/**
 * One button for the whole site. Renders a router Link with `to`,
 * an anchor with `href`, or a <button> otherwise.
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} {...props}>{children}</a>
  return <button type="button" className={cls} {...props}>{children}</button>
}
