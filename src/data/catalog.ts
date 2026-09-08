import {
  siAdidas,
  siFila,
  siJordan,
  siNewbalance,
  siNike,
  siPuma,
  siReebok,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

export type Product = {
  id: string
  name: string
  brand: string
  gender: 'Men' | 'Women'
  rating: number
  reviews: number
  sold: number
  price: number
  image: string
  images: string[]
  description: string
  sizes: number[]
  colors: string[]
}

const shoeDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'

export const products: Product[] = [
  {
    id: 'vista-trainer',
    name: 'VNT Vista Trainer Pro',
    brand: 'Nike',
    gender: 'Men',
    rating: 4.5,
    reviews: 5231,
    sold: 8879,
    price: 1999,
    image: '/images/app/s1.jpg',
    images: ['/images/app/s1.jpg', '/images/app/s4.jpg', '/images/app/s3.jpg', '/images/app/s5.jpg'],
    description: shoeDescription,
    sizes: [40, 41, 42, 43],
    colors: ['#2b2b2b', '#5f7a8a', '#6b4f8a', '#8a8a8a', '#3d6bb3'],
  },
  {
    id: 'runner-x-women',
    name: 'VNT Runner X Women Sneakers',
    brand: 'Puma',
    gender: 'Women',
    rating: 4.7,
    reviews: 4182,
    sold: 7483,
    price: 2499,
    image: '/images/app/s2.jpg',
    images: ['/images/app/s2.jpg', '/images/app/s6.jpg', '/images/app/s1.jpg', '/images/app/s4.jpg'],
    description: shoeDescription,
    sizes: [36, 37, 38, 39],
    colors: ['#c45c5c', '#2b2b2b', '#5f7a8a', '#d4c4a8', '#3d6bb3'],
  },
  {
    id: 'windshift-15',
    name: 'VNT Windshift 15',
    brand: 'Adidas',
    gender: 'Men',
    rating: 4.3,
    reviews: 3904,
    sold: 6937,
    price: 1599,
    image: '/images/app/s3.jpg',
    images: ['/images/app/s3.jpg', '/images/app/s1.jpg', '/images/app/s5.jpg', '/images/app/s2.jpg'],
    description: shoeDescription,
    sizes: [40, 41, 42, 44],
    colors: ['#1a1a1a', '#2f6b4f', '#6b4f8a', '#8a8a8a', '#3d6bb3'],
  },
  {
    id: 'glass-package',
    name: 'VNT Glass Package',
    brand: 'Nike',
    gender: 'Women',
    rating: 4.9,
    reviews: 6573,
    sold: 8174,
    price: 1799,
    image: '/images/app/s4.jpg',
    images: ['/images/app/s4.jpg', '/images/app/s2.jpg', '/images/app/s6.jpg', '/images/app/s1.jpg'],
    description: shoeDescription,
    sizes: [37, 38, 39, 40],
    colors: ['#2b2b2b', '#5f7a8a', '#6b4f8a', '#8a8a8a', '#3d6bb3'],
  },
  {
    id: 'suede-classic',
    name: 'VNT Suede Classic',
    brand: 'Puma',
    gender: 'Men',
    rating: 4.6,
    reviews: 4820,
    sold: 6843,
    price: 2799,
    image: '/images/app/s5.jpg',
    images: ['/images/app/s5.jpg', '/images/app/s3.jpg', '/images/app/s1.jpg', '/images/app/s4.jpg'],
    description: shoeDescription,
    sizes: [40, 41, 42, 43],
    colors: ['#7a4a2b', '#2b2b2b', '#5f7a8a', '#8a8a8a', '#3d6bb3'],
  },
  {
    id: 'trainer-w',
    name: 'VNT Trainer W',
    brand: 'Fila',
    gender: 'Women',
    rating: 4.5,
    reviews: 5110,
    sold: 7758,
    price: 2199,
    image: '/images/app/s6.jpg',
    images: ['/images/app/s6.jpg', '/images/app/s2.jpg', '/images/app/s4.jpg', '/images/app/s5.jpg'],
    description: shoeDescription,
    sizes: [36, 37, 38, 40],
    colors: ['#2b2b2b', '#c45c5c', '#5f7a8a', '#8a8a8a', '#3d6bb3'],
  },
]

export type Offer = {
  id: string
  headline: string
  title: string
  body: string
  image: string
  /** Soft coloured shadow under the card. */
  glow: string
}

export const offers: Offer[] = [
  {
    id: 'today',
    headline: '25%',
    title: "Today's Special!",
    body: 'Get discount for every order. only valid for today',
    image: '/images/app/offer-red.jpg',
    glow: 'rgba(198,13,22,0.5)',
  },
  {
    id: 'weekend',
    headline: '40%',
    title: 'Weekend Drop!',
    body: 'Selected sneakers at their lowest price this season',
    image: '/images/app/offer-indigo.jpg',
    glow: 'rgba(26,35,92,0.5)',
  },
  {
    id: 'season',
    headline: '30%',
    title: 'New Season Sale!',
    body: 'Fresh arrivals marked down for a limited time only',
    image: '/images/app/offer-emerald.jpg',
    glow: 'rgba(15,79,58,0.5)',
  },
  {
    id: 'clearance',
    headline: '50%',
    title: 'Clearance Deal!',
    body: 'Last pairs from the previous drop, while stocks last',
    image: '/images/app/offer-amber.jpg',
    glow: 'rgba(178,72,24,0.5)',
  },
]

export type Brand = {
  id: string
  name: string
  /** Omitted for the trailing "More" tile, which renders an ellipsis instead. */
  icon?: SimpleIcon
}

export const brands: Brand[] = [
  { id: 'nike', name: 'Nike', icon: siNike },
  { id: 'adidas', name: 'Adidas', icon: siAdidas },
  { id: 'puma', name: 'Puma', icon: siPuma },
  { id: 'fila', name: 'Fila', icon: siFila },
  { id: 'reebok', name: 'Reebok', icon: siReebok },
  { id: 'new-balance', name: 'New Balance', icon: siNewbalance },
  { id: 'jordan', name: 'Jordan', icon: siJordan },
  { id: 'more', name: 'More' },
]

export const popularFilters = ['All', 'Nike', 'Adidas', 'Puma', 'Fila']

export const genderOptions = ['All', 'Men', 'Women'] as const
export type GenderOption = (typeof genderOptions)[number]

export const sortOptions = ['Popular', 'Most Recent', 'Price High', 'Price Low'] as const
export type SortOption = (typeof sortOptions)[number]

export const ratingOptions = ['All', '5', '4', '3', '2'] as const
export type RatingOption = (typeof ratingOptions)[number]

export const priceBounds = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
}

/** Soft outer limits so the slider has room past the cheapest / dearest pair. */
export const priceSlider = {
  min: 1000,
  max: 3500,
  step: 50,
}

export type ProductFilters = {
  category: string
  gender: GenderOption
  priceMin: number
  priceMax: number
  sortBy: SortOption
  rating: RatingOption
}

export const defaultFilters: ProductFilters = {
  category: 'All',
  gender: 'All',
  priceMin: priceSlider.min,
  priceMax: priceSlider.max,
  sortBy: 'Popular',
  rating: 'All',
}

const HISTOGRAM_BINS = 24

export const priceHistogram = Array.from({ length: HISTOGRAM_BINS }, (_, index) => {
  const span = priceSlider.max - priceSlider.min
  const start = priceSlider.min + (span / HISTOGRAM_BINS) * index
  const end = start + span / HISTOGRAM_BINS
  return products.filter((product) => product.price >= start && product.price < end).length
})

export const filterProducts = (
  list: Product[],
  filters: ProductFilters,
  query = '',
): Product[] => {
  const term = query.trim().toLowerCase()
  const minRating = filters.rating === 'All' ? 0 : Number(filters.rating)

  const matched = list.filter((product) => {
    const matchesBrand = filters.category === 'All' || product.brand === filters.category
    const matchesGender = filters.gender === 'All' || product.gender === filters.gender
    const matchesPrice = product.price >= filters.priceMin && product.price <= filters.priceMax
    const matchesRating = product.rating >= minRating
    const matchesQuery =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    return matchesBrand && matchesGender && matchesPrice && matchesRating && matchesQuery
  })

  const sorted = [...matched]
  switch (filters.sortBy) {
    case 'Most Recent':
      sorted.reverse()
      break
    case 'Price High':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'Price Low':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'Popular':
    default:
      sorted.sort((a, b) => b.sold - a.sold)
      break
  }

  return sorted
}

/**
 * Brands we actually carry stock for. Search only ever suggests these, so a
 * suggestion can never lead to an empty results grid.
 */
export const stockedBrands = brands.filter(
  (brand) => brand.icon && products.some((product) => product.brand === brand.name),
)

export const searchProducts = (term: string): Product[] => {
  const needle = term.trim().toLowerCase()
  if (!needle) return []

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(needle) ||
      product.brand.toLowerCase().includes(needle),
  )
}

export const searchBrands = (term: string): Brand[] => {
  const needle = term.trim().toLowerCase()
  if (!needle) return []

  return stockedBrands.filter((brand) => brand.name.toLowerCase().includes(needle))
}

export const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export const formatSold = (value: number) => value.toLocaleString('en-IN')

const colorNames: Record<string, string> = {
  '#2b2b2b': 'Black',
  '#1a1a1a': 'Black',
  '#5f7a8a': 'Slate',
  '#6b4f8a': 'Purple',
  '#8a8a8a': 'Silver',
  '#3d6bb3': 'Blue',
  '#c45c5c': 'Red',
  '#d4c4a8': 'Sand',
  '#2f6b4f': 'Green',
  '#7a4a2b': 'Brown Grey',
}

export const colorName = (hex: string) => colorNames[hex.toLowerCase()] ?? 'Custom'
