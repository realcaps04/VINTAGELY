import { useShop } from '../store/shop'
import { CloseIcon, FilterIcon, SearchIcon } from './Icons'

/**
 * Reads as an input but is a button: tapping it hands off to the full-screen
 * search sheet so there is only ever one real search field on the page.
 */
export function SearchField() {
  const { query, clearQuery, openSearch } = useShop()

  return (
    <div className="mt-5 px-6">
      <div className="flex h-14 items-center gap-3.5 rounded-3xl bg-surface px-5">
        <button
          type="button"
          onClick={openSearch}
          className="flex min-w-0 flex-1 items-center gap-3.5 text-left"
        >
          <SearchIcon className="h-5 w-5 shrink-0 text-subtle" />
          <span
            className={`min-w-0 flex-1 truncate text-[16px] font-normal tracking-[-0.01em] ${
              query ? 'text-ink' : 'text-subtle'
            }`}
          >
            {query || 'Search'}
          </span>
        </button>

        {query ? (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="shrink-0 p-0.5 text-ink transition-transform duration-200 active:scale-90"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Filters"
            className="shrink-0 p-0.5 text-ink transition-transform duration-200 active:scale-90"
          >
            <FilterIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
