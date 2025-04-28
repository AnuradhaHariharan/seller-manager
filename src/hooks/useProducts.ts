import { useEffect, useState } from 'react';
import { Product } from '../types/  Product';
import { ProductService } from '../services/ ProductService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    ProductService.fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return { products, setProducts, loading };
};
