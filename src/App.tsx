import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { BrandRow } from './components/BrandRow'
import { HomeHeader } from './components/HomeHeader'
import { MostPopular } from './components/MostPopular'
import { SearchField } from './components/SearchField'
import { SpecialOffer } from './components/SpecialOffer'
import { StatusBar } from './components/StatusBar'
import { UpdateGate } from './components/UpdateGate'
import { ShopProvider } from './store/shop'

export default function App() {
  const [filter, setFilter] = useState('All')

  return (
    <ShopProvider>
      <div className="flex min-h-dvh justify-center">
        <div className="relative w-full max-w-[430px] bg-white pb-32 shadow-[0_0_60px_rgba(0,0,0,0.08)]">
          <StatusBar />
          <HomeHeader />
          <SearchField />
          <SpecialOffer />
          <BrandRow selected={filter} onSelect={setFilter} />
          <MostPopular filter={filter} onFilterChange={setFilter} />
          <BottomNav />
        </div>

        <UpdateGate />
      </div>
    </ShopProvider>
  )
}
