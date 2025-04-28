import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/Product/ProductList';
import Input from '../components/Common/Input';
import Select from '../components/Common/Select';
import Button from '../components/Common/Button';
import { Product } from '../types/  Product';

const Dashboard = () => {
  const { products, setProducts, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return a.stock - b.stock;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  if (loading) return <p>Loading...</p>;

  const categoryOptions = Array.from(new Set(products.map((p) => p.category))).map((c) => ({ label: c, value: c }));

  return (
    <div>
      <h1>Seller Dashboard</h1>

      <div className="filters">
        <Input placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select options={[{ label: 'All', value: '' }, ...categoryOptions]} value={category} onChange={(e) => setCategory(e.target.value)} />
        <Select
          options={[
            { label: 'Sort by', value: '' },
            { label: 'Price', value: 'price' },
            { label: 'Stock', value: 'stock' },
            { label: 'Title', value: 'title' },
          ]}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        />
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Dashboard;
