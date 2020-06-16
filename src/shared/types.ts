import { Category, Product } from 'shared/models';

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type DataResponse = {
  categories: Array<Category>;
  products: Array<Product>;
}
