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
    brand: 'Asics',
    rating: 4.5,
    sold: 7758,
    price: 90,
    image: '/images/app/s6.jpg',
  },
]

/**
 * Storefront brands. `mark` is a neutral placeholder monogram — swap in a
 * licensed logo asset per brand when you have the rights to use them.
 */
export const brands = [
  { id: 'nike', name: 'Nike', mark: 'N' },
  { id: 'adidas', name: 'Adidas', mark: 'A' },
  { id: 'puma', name: 'Puma', mark: 'P' },
  { id: 'asics', name: 'Asics', mark: 'AS' },
  { id: 'reebok', name: 'Reebok', mark: 'R' },
  { id: 'new-balance', name: 'New Balance', mark: 'NB' },
  { id: 'converse', name: 'Converse', mark: 'C' },
  { id: 'more', name: 'More', mark: '···' },
]

export const popularFilters = ['All', 'Nike', 'Adidas', 'Puma', 'Asics']

export const formatPrice = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export const formatSold = (value: number) => value.toLocaleString('en-US')
