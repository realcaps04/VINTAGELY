import type { SimpleIcon } from 'simple-icons'

/**
 * Renders a brand logo from the simple-icons set. The SVG data is CC0, but the
 * marks themselves remain the trademarks of their respective owners.
 */
export function BrandMark({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" role="img" aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}
