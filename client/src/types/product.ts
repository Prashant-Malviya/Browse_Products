export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Sports' | 'Books' | 'Toys'

export interface Product {
  _id: string
  name: string
  category: Category
  price: number
  createdAt: string
}
