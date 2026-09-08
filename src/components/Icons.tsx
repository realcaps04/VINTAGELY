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

export const ChevronRightIcon = ({ className = 'h-5 w-5', strokeWidth = 1.9 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="m9 5.5 6.5 6.5L9 18.5" />
  </svg>
)

export const LogoutIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M10 4.5H6.5A2.5 2.5 0 0 0 4 7v10a2.5 2.5 0 0 0 2.5 2.5H10" />
    <path d="M14 8.5 18.5 12 14 15.5M18.5 12H9" />
  </svg>
)

export const MapPinIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>
)

export const HelpIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.25c-.7.4-1.2.9-1.2 1.85" />
    <circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const TrashIcon = ({ className = 'h-5 w-5', strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M5 7h14" />
    <path d="M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7" />
    <path d="M8 7l.7 12.2A1.5 1.5 0 0 0 10.2 20.5h3.6a1.5 1.5 0 0 0 1.5-1.3L16 7" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

export const ArrowRightIcon = ({ className = 'h-4 w-4', strokeWidth = 2.2 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M5 12h12.5M13 6.5 18.5 12 13 17.5" />
  </svg>
)

export const TruckIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M3 7.5h10.5v8H3z" />
    <path d="M13.5 10.5H18l2.5 3v2H13.5" />
    <circle cx="7" cy="17.5" r="1.7" />
    <circle cx="17" cy="17.5" r="1.7" />
  </svg>
)

export const EditIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="m14.2 5.8 4 4M4.5 19.5l.8-4.2L15.8 5.8a1.8 1.8 0 0 1 2.5 0l.4.4a1.8 1.8 0 0 1 0 2.5L8.7 18.7l-4.2.8Z" />
  </svg>
)

export const MoreIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <circle cx="6.5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="17.5" cy="12" r="1.6" />
  </svg>
)

export const ShareIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="m8.3 10.8 7.4-3.8M8.3 13.2l7.4 3.8" />
  </svg>
)

export const BackIcon = ({ className = 'h-6 w-6', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M15 5.5 8.5 12 15 18.5" />
  </svg>
)

export const CheckIcon = ({ className = 'h-4 w-4', strokeWidth = 2.4 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
  </svg>
)

export const MinusIcon = ({ className = 'h-4 w-4', strokeWidth = 2 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M6 12h12" />
  </svg>
)

export const PlusIcon = ({ className = 'h-4 w-4', strokeWidth = 2 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M12 6v12M6 12h12" />
  </svg>
)

export const BagIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M6.5 8.5h11l-.8 11.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6.5 8.5Z" />
    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
  </svg>
)

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

export const FilterIcon = ({ className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={strokeWidth} aria-hidden>
    <path d="M4 8h9M17.5 8H20M4 16h3M11.5 16H20" />
    <circle cx="15" cy="8" r="2.1" />
    <circle cx="9" cy="16" r="2.1" />
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
