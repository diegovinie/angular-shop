export class Product {
  id: number;
  name: string;
  price: string;
  available: boolean;
  best_seller: boolean;
  categories: number[];
  img: string;
  description: string;
}

export class Filter {
  name: string;
  value: string;
  checked: boolean;
}

export class Category {
  categori_id: number;
  name: string;
}
