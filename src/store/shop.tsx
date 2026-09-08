import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type TabId = 'home' | 'cart' | 'orders' | 'wallet' | 'profile'

type ShopValue = {
  query: string
  brandFilter: string
  setBrandFilter: (value: string) => void
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  commitSearch: (term: string) => void
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
  const [brandFilter, setBrandFilter] = useState('All')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((ids) => (ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]))
  }, [])

  const openSearch = useCallback(() => setIsSearchOpen(true), [])
  const closeSearch = useCallback(() => setIsSearchOpen(false), [])

  const commitSearch = useCallback((term: string) => {
    setQuery(term)
    // A brand chip left selected from earlier would silently narrow the results
    // the search just produced, so searching always widens back to every brand.
    setBrandFilter('All')
    setIsSearchOpen(false)
  }, [])

  const value = useMemo<ShopValue>(
    () => ({
      query,
      brandFilter,
      setBrandFilter,
      isSearchOpen,
      openSearch,
      closeSearch,
      commitSearch,
      wishlist,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      cartCount: 0,
      activeTab,
      setActiveTab,
    }),
    [
      query,
      brandFilter,
      isSearchOpen,
      openSearch,
      closeSearch,
      commitSearch,
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
