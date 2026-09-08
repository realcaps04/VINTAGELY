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
    price: 85,
    image: '/images/app/s1.jpg',
  },
  {
    id: 'runner-x-women',
    name: 'VNT Runner X Women Sneakers',
    brand: 'Puma',
    rating: 4.7,
    sold: 7483,
    price: 110,
    image: '/images/app/s2.jpg',
  },
  {
    id: 'windshift-15',
    name: 'VNT Windshift 15',
    brand: 'Adidas',
    rating: 4.3,
    sold: 6937,
    price: 70,
    image: '/images/app/s3.jpg',
  },
  {
    id: 'glass-package',
    name: 'VNT Glass Package',
    brand: 'Nike',
    rating: 4.9,
    sold: 8174,
    price: 75,
    image: '/images/app/s4.jpg',
  },
  {
    id: 'suede-classic',
    name: 'VNT Suede Classic',
    brand: 'Puma',
    rating: 4.6,
    sold: 6843,
    price: 120,
    image: '/images/app/s5.jpg',
  },
  {
    id: 'trainer-w',
    name: 'VNT Trainer W',
    brand: 'Fila',
    rating: 4.5,
    sold: 7758,
    price: 90,
    image: '/images/app/s6.jpg',
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

export const formatPrice = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export const formatSold = (value: number) => value.toLocaleString('en-US')
