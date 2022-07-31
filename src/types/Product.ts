export interface IProduct {
  name: string;
  id: number;
  url: string;
  price: number;
  description: string;
  category: string;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IProductsResponseApi {
  products: IProduct[];
}
