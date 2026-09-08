type IconProps = {
  className?: string
  strokeWidth?: number
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const SearchIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" />
  </svg>
)

export const CloseIcon = ({ className = 'h-5 w-5', strokeWidth = 1.9 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  </svg>
)

export const AlertIcon = ({ className = 'h-4 w-4', strokeWidth = 1.9 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5.2" />
    <circle cx="12" cy="16.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const BellIcon = ({ className = 'h-6 w-6', strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M18 9a6 6 0 1 0-12 0c0 4.2-1.5 5.6-2 6.2-.3.4 0 1.05.5 1.05h15c.5 0 .8-.65.5-1.05-.5-.6-2-2-2-6.2Z" />
    <path d="M10 20a2.2 2.2 0 0 0 4 0" />
  </svg>
)

export const HeartIcon = ({
  className = 'h-6 w-6',
  strokeWidth = 1.7,
  filled = false,
}: IconProps & { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...stroke}
    fill={filled ? 'currentColor' : 'none'}
    strokeWidth={strokeWidth}
    aria-hidden
  >
    <path d="M12 20.3S3.6 15.4 3.6 9.5A4.4 4.4 0 0 1 12 7.7a4.4 4.4 0 0 1 8.4 1.8c0 5.9-8.4 10.8-8.4 10.8Z" />
  </svg>
)

export const StarIcon = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.05L6.2 20.55l1.1-6.5-4.7-4.6 6.5-.95L12 2.6Z" />
  </svg>
)

/* Bottom navigation ------------------------------------------------------- */

export const HomeIcon = ({ className = 'h-6 w-6', active = false }: IconProps & { active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...stroke}
    fill={active ? 'currentColor' : 'none'}
    strokeWidth={1.7}
    aria-hidden
  >
    <path d="M3.5 10.4 12 3.6l8.5 6.8V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.6Z" />
    {!active && <path d="M9.5 21v-6h5v6" />}
  </svg>
)

export const CartIcon = ({ className = 'h-6 w-6', active = false }: IconProps & { active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...stroke}
    fill={active ? 'currentColor' : 'none'}
    strokeWidth={1.7}
    aria-hidden
  >
    <path d="M5.5 8h13l-1.1 11.1a1 1 0 0 1-1 .9H7.6a1 1 0 0 1-1-.9L5.5 8Z" />
    <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
  </svg>
)

export const OrdersIcon = ({
  className = 'h-6 w-6',
  active = false,
}: IconProps & { active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...stroke}
    fill={active ? 'currentColor' : 'none'}
    strokeWidth={1.7}
    aria-hidden
  >
    <path d="M2.8 4h2.4l2.3 10.4a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.45-1.1l1.6-5.9H6.3" />
    <circle cx="9.5" cy="19.4" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="19.4" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

export const WalletIcon = ({
  className = 'h-6 w-6',
  active = false,
}: IconProps & { active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...stroke}
    fill={active ? 'currentColor' : 'none'}
    strokeWidth={1.7}
    aria-hidden
  >
    <rect x="2.8" y="5.6" width="18.4" height="13.2" rx="3.2" />
    <path d="M2.8 10.2h18.4" />
    <circle cx="17.2" cy="14.6" r="1.25" fill={active ? '#fff' : 'currentColor'} stroke="none" />
  </svg>
)

export const ProfileIcon = ({
  className = 'h-6 w-6',
  active = false,
}: IconProps & { active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...stroke}
    fill={active ? 'currentColor' : 'none'}
    strokeWidth={1.7}
    aria-hidden
  >
    <circle cx="12" cy="8.2" r="4" />
    <path d="M4.6 20.2a7.4 7.4 0 0 1 14.8 0" />
  </svg>
)

export const DownloadIcon = ({ className = 'h-6 w-6', strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M12 3.5v11M7.8 10.4 12 14.6l4.2-4.2" />
    <path d="M4.5 16.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" />
  </svg>
)
