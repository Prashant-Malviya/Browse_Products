export type Category =
  | 'Electronics'
  | 'Clothing'
  | 'Books'
  | 'Home & Garden'
  | 'Sports'
  | 'Toys'
  | 'Automotive'
  | 'Health & Beauty'
  | 'Food & Grocery'
  | 'Office Supplies'

export interface Product {
  _id: string
  name: string
  category: Category
  price: number
  createdAt: string
}
