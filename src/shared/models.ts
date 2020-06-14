export interface Product {
  id: number;
  name: string;
  price: string;
  available: boolean;
  best_seller: boolean;
  categories: number[];
  img: string;
  description: string;
  parsedPrice?: any;
  quantity?: any;
}

export interface Filter {
  name: string;
  value: string;
  checked: boolean;
}

export interface Category {
  categori_id: number;
  name: string;
}
