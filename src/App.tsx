import { BottomNav } from './components/BottomNav'
import { BrandRow } from './components/BrandRow'
import { HomeHeader } from './components/HomeHeader'
import { MostPopular } from './components/MostPopular'
import { SearchOverlay } from './components/SearchOverlay'
import { SpecialOffer } from './components/SpecialOffer'
import { UpdateGate } from './components/UpdateGate'
import { ShopProvider, useShop } from './store/shop'

export default function App() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  )
}

function Shell() {
  const { isSearchOpen } = useShop()

  return (
    <div className="flex min-h-dvh justify-center">
      {/* `inert` takes the whole home screen out of the tab order and stops it
          receiving taps while the search sheet is up. */}
      <div
        inert={isSearchOpen}
        className="relative w-full max-w-[430px] bg-white pb-28 shadow-[0_0_60px_rgba(0,0,0,0.08)]"
      >
        <HomeHeader />
        <SpecialOffer />
        <BrandRow />
        <MostPopular />
        <BottomNav />
      </div>

      <SearchOverlay />
      <UpdateGate />
    </div>
  )
}
