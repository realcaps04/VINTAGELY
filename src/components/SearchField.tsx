import { useShop } from '../store/shop'
import { FilterIcon, SearchIcon } from './Icons'

export function SearchField() {
  const { query, setQuery } = useShop()

  return (
    <div className="mt-5 px-6">
      <div className="flex h-14 items-center gap-3.5 rounded-3xl bg-surface px-5">
        <SearchIcon className="h-5 w-5 shrink-0 text-subtle" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:text-subtle focus-visible:outline-none"
        />
        <button
          type="button"
          aria-label="Filters"
          className="shrink-0 p-0.5 text-ink transition-transform duration-200 active:scale-90"
        >
          <FilterIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
