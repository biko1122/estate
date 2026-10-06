import { useId, cloneElement, isValidElement } from 'react'

const control =
  'w-full rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink placeholder:text-ink/35 transition-all duration-200 hover:border-ink/30 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10'

export function Field({ label, hint, children, className = '' }) {
  const id = useId()
  const child = isValidElement(children) ? cloneElement(children, { id }) : children
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.8rem] font-semibold text-ink">
        {label}
      </label>
      {child}
      {hint && <p className="mt-1.5 text-[0.78rem] text-muted">{hint}</p>}
    </div>
  )
}

export function TextInput({ className = '', ...props }) {
  return <input className={`${control} h-12 ${className}`} {...props} />
}

export function TextArea({ className = '', ...props }) {
  return <textarea className={`${control} min-h-[150px] resize-y py-3 ${className}`} {...props} />
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`${control} h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='none'%20stroke='%23646a6e'%20stroke-width='2'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
