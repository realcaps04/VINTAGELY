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

export const FilterIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M4 8h9M17.5 8H20M4 16h3M11.5 16H20" />
    <circle cx="15" cy="8" r="2.1" />
    <circle cx="9" cy="16" r="2.1" />
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

/* Device status bar ------------------------------------------------------- */

export const SignalIcon = ({ className = 'h-3 w-4' }: IconProps) => (
  <svg viewBox="0 0 18 12" className={className} fill="currentColor" aria-hidden>
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
    <rect x="10" y="3" width="3" height="9" rx="1" />
    <rect x="15" y="0" width="3" height="12" rx="1" />
  </svg>
)

export const WifiIcon = ({ className = 'h-3 w-4' }: IconProps) => (
  <svg viewBox="0 0 18 13" className={className} fill="currentColor" aria-hidden>
    <path d="M9 12.2 6.6 9.4a3.7 3.7 0 0 1 4.8 0L9 12.2Z" />
    <path
      d="M3.9 6.6a7.6 7.6 0 0 1 10.2 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <path
      d="M1 3.4a11.9 11.9 0 0 1 16 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
)

export const BatteryIcon = ({ className = 'h-3 w-6' }: IconProps) => (
  <svg viewBox="0 0 26 12" className={className} aria-hidden>
    <rect
      x="0.6"
      y="0.6"
      width="21"
      height="10.8"
      rx="3"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.4"
      strokeWidth="1.2"
    />
    <rect x="2.2" y="2.2" width="17.8" height="7.6" rx="1.9" fill="currentColor" />
    <path
      d="M23.4 4.2a2 2 0 0 1 0 3.6V4.2Z"
      fill="currentColor"
      fillOpacity="0.4"
    />
  </svg>
)
