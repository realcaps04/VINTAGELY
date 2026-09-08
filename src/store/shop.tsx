import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  colorName,
  defaultFilters,
  products,
  type Product,
  type ProductFilters,
} from '../data/catalog'

export type TabId = 'home' | 'cart' | 'orders' | 'profile'

export type CartLine = {
  id: string
  productId: string
  size: number
  color: string
  colorLabel: string
  quantity: number
}

export type CartAddInput = {
  productId: string
  size: number
  color: string
  quantity: number
}

export type ShippingAddress = {
  id: string
  label: string
  line: string
  isDefault?: boolean
}

export const shippingAddresses: ShippingAddress[] = [
  {
    id: 'home',
    label: 'Home',
    line: '61480 Sunbrook Park, PC 5679',
    isDefault: true,
  },
  {
    id: 'office',
    label: 'Office',
    line: '6993 Meadow Valley Terra, PC 3637',
  },
  {
    id: 'apartment',
    label: 'Apartment',
    line: '21833 Clyde Gallagher, PC 4662',
  },
  {
    id: 'parents',
    label: "Parent's House",
    line: '5259 Blue Bill Park, PC 4627',
  },
]

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
  selectedProduct: Product | null
  openProduct: (id: string) => void
  closeProduct: () => void
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  cart: CartLine[]
  cartCount: number
  cartTotal: number
  addToCart: (item: CartAddInput) => void
  updateCartQuantity: (lineId: string, quantity: number) => void
  removeFromCart: (lineId: string) => void
  isCheckoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void
  isAddressPickerOpen: boolean
  openAddressPicker: () => void
  closeAddressPicker: () => void
  selectedAddressId: string
  setSelectedAddressId: (id: string) => void
  selectedAddress: ShippingAddress
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

const ShopContext = createContext<ShopValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<CartLine[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isAddressPickerOpen, setIsAddressPickerOpen] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(
    shippingAddresses.find((address) => address.isDefault)?.id ?? shippingAddresses[0].id,
  )
  const [activeTab, setActiveTabState] = useState<TabId>('home')

  const selectedAddress = useMemo(
    () =>
      shippingAddresses.find((address) => address.id === selectedAddressId) ?? shippingAddresses[0],
    [selectedAddressId],
  )

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, line) => {
        const product = products.find((entry) => entry.id === line.productId)
        return sum + (product?.price ?? 0) * line.quantity
      }, 0),
    [cart],
  )

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

  const openProduct = useCallback((id: string) => {
    setIsSearchOpen(false)
    setIsFilterOpen(false)
    setIsCheckoutOpen(false)
    setSelectedProductId(id)
  }, [])
  const closeProduct = useCallback(() => setSelectedProductId(null), [])

  const setActiveTab = useCallback((tab: TabId) => {
    setSelectedProductId(null)
    setIsSearchOpen(false)
    setIsFilterOpen(false)
    setIsCheckoutOpen(false)
    setIsAddressPickerOpen(false)
    setActiveTabState(tab)
  }, [])

  const openCheckout = useCallback(() => {
    setIsSearchOpen(false)
    setIsFilterOpen(false)
    setSelectedProductId(null)
    setIsAddressPickerOpen(false)
    setIsCheckoutOpen(true)
  }, [])
  const closeCheckout = useCallback(() => {
    setIsAddressPickerOpen(false)
    setIsCheckoutOpen(false)
  }, [])

  const openAddressPicker = useCallback(() => {
    setIsAddressPickerOpen(true)
  }, [])
  const closeAddressPicker = useCallback(() => {
    setIsAddressPickerOpen(false)
  }, [])

  const applyFilters = useCallback((next: ProductFilters) => {
    setFilters(next)
    setIsFilterOpen(false)
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const commitSearch = useCallback((term: string) => {
    setQuery(term)
    setFilters((current) => ({ ...current, category: 'All' }))
    setIsSearchOpen(false)
    setActiveTabState('home')
  }, [])

  const addToCart = useCallback((item: CartAddInput) => {
    const quantity = Math.max(1, item.quantity)
    setCart((lines) => {
      const match = lines.find(
        (line) =>
          line.productId === item.productId &&
          line.size === item.size &&
          line.color === item.color,
      )
      if (match) {
        return lines.map((line) =>
          line.id === match.id ? { ...line, quantity: Math.min(20, line.quantity + quantity) } : line,
        )
      }
      return [
        ...lines,
        {
          id: `${item.productId}-${item.size}-${item.color}-${Date.now()}`,
          productId: item.productId,
          size: item.size,
          color: item.color,
          colorLabel: colorName(item.color),
          quantity,
        },
      ]
    })
  }, [])

  const updateCartQuantity = useCallback((lineId: string, quantity: number) => {
    setCart((lines) =>
      lines
        .map((line) => (line.id === lineId ? { ...line, quantity: Math.min(20, Math.max(0, quantity)) } : line))
        .filter((line) => line.quantity > 0),
    )
  }, [])

  const removeFromCart = useCallback((lineId: string) => {
    setCart((lines) => lines.filter((line) => line.id !== lineId))
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
      selectedProduct,
      openProduct,
      closeProduct,
      wishlist,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      isAddressPickerOpen,
      openAddressPicker,
      closeAddressPicker,
      selectedAddressId,
      setSelectedAddressId,
      selectedAddress,
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
      selectedProduct,
      openProduct,
      closeProduct,
      wishlist,
      toggleWishlist,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      isAddressPickerOpen,
      openAddressPicker,
      closeAddressPicker,
      selectedAddressId,
      selectedAddress,
      activeTab,
      setActiveTab,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used inside ShopProvider')
  return context
}
