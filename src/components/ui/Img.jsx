import { useState } from 'react'
import { photo, photoSrcSet } from '../../utils/images'

/**
 * Image with a soft fade-in. Always fills its parent with object-cover,
 * so the parent sets the aspect ratio and the placeholder colour.
 */
export default function Img({ id, alt, width = 1200, sizes = '100vw', className = '', priority = false, ...props }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={photo(id, width)}
      srcSet={photoSrcSet(id)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...props}
    />
  )
}
