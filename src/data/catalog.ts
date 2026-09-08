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
  rating: number
  sold: number
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: 'vista-trainer',
    name: 'VNT Vista Trainer Pro',
    brand: 'Nike',
    rating: 4.5,
    sold: 8879,
    price: 1999,
    image: '/images/app/s1.jpg',
  },
  {
    id: 'runner-x-women',
    name: 'VNT Runner X Women Sneakers',
    brand: 'Puma',
    rating: 4.7,
    sold: 7483,
    price: 2499,
    image: '/images/app/s2.jpg',
  },
  {
    id: 'windshift-15',
    name: 'VNT Windshift 15',
    brand: 'Adidas',
    rating: 4.3,
    sold: 6937,
    price: 1599,
    image: '/images/app/s3.jpg',
  },
  {
    id: 'glass-package',
    name: 'VNT Glass Package',
    brand: 'Nike',
    rating: 4.9,
    sold: 8174,
    price: 1799,
    image: '/images/app/s4.jpg',
  },
  {
    id: 'suede-classic',
    name: 'VNT Suede Classic',
    brand: 'Puma',
    rating: 4.6,
    sold: 6843,
    price: 2799,
    image: '/images/app/s5.jpg',
  },
  {
    id: 'trainer-w',
    name: 'VNT Trainer W',
    brand: 'Fila',
    rating: 4.5,
    sold: 7758,
    price: 2199,
    image: '/images/app/s6.jpg',
  },
]

export type Offer = {
  id: string
  headline: string
  title: string
  body: string
  image: string
  /** Drives the glow beneath the card so it picks up the artwork's colour. */
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
