import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultFilters, type ProductFilters } from '../data/catalog'

export type TabId = 'home' | 'cart' | 'orders' | 'wallet' | 'profile'

type ShopValue = {
  query: string
  filters: ProductFilters
  applyFilters: (next: ProductFilters) => void
  resetFilters: () => void
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  commitSearch: (term: string) => void
  isFilterOpen: boolean
  openFilter: () => void
  closeFilter: () => void
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  cartCount: number
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

const ShopContext = createContext<ShopValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((ids) => (ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]))
  }, [])

  const openSearch = useCallback(() => {
    setIsFilterOpen(false)
    setIsSearchOpen(true)
  }, [])
  const closeSearch = useCallback(() => setIsSearchOpen(false), [])
  const openFilter = useCallback(() => {
    setIsSearchOpen(false)
    setIsFilterOpen(true)
  }, [])
  const closeFilter = useCallback(() => setIsFilterOpen(false), [])

  const applyFilters = useCallback((next: ProductFilters) => {
    setFilters(next)
    setIsFilterOpen(false)
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const commitSearch = useCallback((term: string) => {
    setQuery(term)
    // Searching widens category so a leftover brand chip can't empty the grid.
    setFilters((current) => ({ ...current, category: 'All' }))
    setIsSearchOpen(false)
  }, [])

  const value = useMemo<ShopValue>(
    () => ({
      query,
      filters,
      applyFilters,
      resetFilters,
      isSearchOpen,
      openSearch,
      closeSearch,
      commitSearch,
      isFilterOpen,
      openFilter,
      closeFilter,
      wishlist,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      cartCount: 0,
      activeTab,
      setActiveTab,
    }),
    [
      query,
      filters,
      applyFilters,
      resetFilters,
      isSearchOpen,
      openSearch,
      closeSearch,
      commitSearch,
      isFilterOpen,
      openFilter,
      closeFilter,
      wishlist,
      toggleWishlist,
      activeTab,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used inside ShopProvider')
  return context
}
