import { AnimatePresence } from 'motion/react'
import { BottomNav } from './components/BottomNav'
import { BrandRow } from './components/BrandRow'
import { CartScreen } from './components/CartScreen'
import { FilterSheet } from './components/FilterSheet'
import { HomeHeader } from './components/HomeHeader'
import { MostPopular } from './components/MostPopular'
import { ProductDetail } from './components/ProductDetail'
import { ProfileScreen } from './components/ProfileScreen'
import { SearchEmpty } from './components/SearchEmpty'
import { SearchOverlay } from './components/SearchOverlay'
import { SignInScreen } from './components/SignInScreen'
import { SpecialOffer } from './components/SpecialOffer'
import { UpdateGate } from './components/UpdateGate'
import { filterProducts, products } from './data/catalog'
import { AuthProvider, useAuth } from './store/auth'
import { ShopProvider, useShop } from './store/shop'

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Shell />
      </ShopProvider>
    </AuthProvider>
  )
}

function Shell() {
  const { isAuthenticated } = useAuth()
  const { isSearchOpen, isFilterOpen, query, filters, selectedProduct, activeTab } = useShop()
  const searchEmpty = query.trim().length > 0 && filterProducts(products, filters, query).length === 0
  const showingDetail = selectedProduct !== null

  return (
    <div className="flex min-h-dvh justify-center">
      <div
        inert={isSearchOpen || isFilterOpen}
        className={`relative w-full max-w-[430px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] ${
          showingDetail ? '' : 'pb-28'
        }`}
      >
        <AnimatePresence mode="wait">
          {showingDetail ? (
            <ProductDetail key="detail" />
          ) : (
            <div key={activeTab}>
              {activeTab === 'home' && (
                <>
                  <HomeHeader />
                  {searchEmpty ? (
                    <SearchEmpty />
                  ) : (
                    <>
                      <SpecialOffer />
                      <BrandRow />
                      <MostPopular />
                    </>
                  )}
                </>
              )}

              {activeTab === 'cart' && <CartScreen />}

              {activeTab === 'profile' &&
                (isAuthenticated ? <ProfileScreen /> : <SignInScreen />)}

              {(activeTab === 'orders' || activeTab === 'wallet') && (
                <PlaceholderScreen label={activeTab} />
              )}

              <BottomNav />
            </div>
          )}
        </AnimatePresence>
      </div>

      <SearchOverlay />
      <FilterSheet />
      <UpdateGate />
    </div>
  )
}

function PlaceholderScreen({ label }: { label: string }) {
  const title = label.charAt(0).toUpperCase() + label.slice(1)

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 pb-28 text-center">
      <p className="text-[22px] font-bold tracking-[-0.02em]">{title}</p>
      <p className="mt-2 text-[14px] font-medium text-subtle">Coming soon</p>
    </div>
  )
}
