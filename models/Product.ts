export default interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

export interface CartProduct extends Product {
  quantity: number;
}
