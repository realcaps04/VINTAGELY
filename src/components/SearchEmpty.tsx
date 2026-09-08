import { useShop } from '../store/shop'
import { SearchIcon } from './Icons'

/** Two stacked clipboards — matches the empty-search reference art. */
export function NotFoundIllustration({ className = 'h-36 w-36' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden fill="none">
      <g transform="translate(28 18) rotate(-8 52 62)">
        <rect x="12" y="22" width="88" height="108" rx="10" fill="#fff" stroke="#1a1a1a" strokeWidth="4" />
        <rect x="28" y="42" width="56" height="68" rx="4" fill="#f0f0f0" />
        <rect x="40" y="10" width="32" height="22" rx="5" fill="#1a1a1a" />
        <rect x="48" y="16" width="16" height="10" rx="3" fill="#fff" />
      </g>

      <g transform="translate(42 28)">
        <rect x="12" y="22" width="88" height="108" rx="10" fill="#fff" stroke="#1a1a1a" strokeWidth="4" />
        <rect x="28" y="42" width="56" height="68" rx="4" fill="#ebebeb" />
        <rect x="40" y="10" width="32" height="22" rx="5" fill="#1a1a1a" />
        <rect x="48" y="16" width="16" height="10" rx="3" fill="#fff" />
      </g>
    </svg>
  )
}

export function NotFoundMessage({ keyword }: { keyword: string }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1 text-[16px] font-bold tracking-[-0.01em]">
          Results for “{keyword}”
        </p>
        <p className="shrink-0 text-[16px] font-bold tracking-[-0.01em]">0 found</p>
      </div>

      <div className="flex flex-col items-center px-2 pt-16 text-center">
        <NotFoundIllustration className="h-40 w-40" />
        <h2 className="mt-8 text-[28px] font-bold tracking-[-0.02em]">Not Found</h2>
        <p className="mt-3 max-w-[280px] text-[14px] font-medium leading-relaxed text-subtle">
          Sorry, the keyword you entered cannot be found, please check again or search with another
          keyword.
        </p>
      </div>
    </div>
  )
}

/**
 * Full empty-search screen shown on the home shell when a committed query
 * matches nothing. The field reopens the search sheet so the user can try again.
 */
export function SearchEmpty() {
  const { query, openSearch } = useShop()
  const keyword = query.trim()

  return (
    <section className="mt-5 px-6 pb-8">
      <button
        type="button"
        onClick={openSearch}
        className="flex h-14 w-full items-center gap-3.5 rounded-3xl bg-surface px-5 text-left"
      >
        <SearchIcon className="h-5 w-5 shrink-0 text-ink" />
        <span className="min-w-0 flex-1 truncate text-[16px] font-medium tracking-[-0.01em] text-ink">
          {keyword}
        </span>
      </button>

      <div className="mt-5">
        <NotFoundMessage keyword={keyword} />
      </div>
    </section>
  )
}
