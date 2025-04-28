import axios from 'axios';
import { Product } from '../types/  Product';

const BASE_URL = 'https://dummyjson.com';

export const ProductService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.products;
  },
};
