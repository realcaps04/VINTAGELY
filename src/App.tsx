import { AnimatePresence } from 'motion/react'
import { BottomNav } from './components/BottomNav'
import { BrandRow } from './components/BrandRow'
import { CartScreen } from './components/CartScreen'
import { CheckoutScreen } from './components/CheckoutScreen'
import { ChooseShippingScreen } from './components/ChooseShippingScreen'
import { FilterSheet } from './components/FilterSheet'
import { HomeHeader } from './components/HomeHeader'
import { MostPopular } from './components/MostPopular'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { OrdersScreen } from './components/OrdersScreen'
import { ProductDetail } from './components/ProductDetail'
import { ProfileScreen } from './components/ProfileScreen'
import { SearchEmpty } from './components/SearchEmpty'
import { SearchOverlay } from './components/SearchOverlay'
import { ShippingAddressScreen } from './components/ShippingAddressScreen'
import { SignInScreen } from './components/SignInScreen'
import { SpecialOffer } from './components/SpecialOffer'
import { TrackOrderScreen } from './components/TrackOrderScreen'
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
  const {
    isSearchOpen,
    isFilterOpen,
    query,
    filters,
    selectedProduct,
    activeTab,
    isCheckoutOpen,
    isAddressPickerOpen,
    isShippingPickerOpen,
    trackingOrderId,
  } = useShop()
  const searchEmpty = query.trim().length > 0 && filterProducts(products, filters, query).length === 0
  const showingDetail = selectedProduct !== null
  const showingTracking = trackingOrderId !== null
  const hideChrome = showingDetail || isCheckoutOpen || showingTracking

  return (
    <div className="flex min-h-dvh justify-center">
      <div
        inert={isSearchOpen || isFilterOpen}
        className={`relative w-full max-w-[430px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] ${
          hideChrome ? '' : 'pb-28'
        }`}
      >
        <AnimatePresence mode="wait">
          {showingDetail ? (
            <ProductDetail key="detail" />
          ) : showingTracking ? (
            <TrackOrderScreen key="track-order" />
          ) : isCheckoutOpen && isAddressPickerOpen ? (
            <ShippingAddressScreen key="address-picker" />
          ) : isCheckoutOpen && isShippingPickerOpen ? (
            <ChooseShippingScreen key="shipping-picker" />
          ) : isCheckoutOpen ? (
            <CheckoutScreen key="checkout" />
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

              {activeTab === 'orders' && <OrdersScreen />}

              {activeTab === 'profile' &&
                (isAuthenticated ? <ProfileScreen /> : <SignInScreen />)}

              <BottomNav />
            </div>
          )}
        </AnimatePresence>
      </div>

      <SearchOverlay />
      <FilterSheet />
      <OrderSuccessModal />
      <UpdateGate />
    </div>
  )
}
