import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/Product/ProductList';
import Input from '../components/Common/Input';
import Select from '../components/Common/Select';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { Product } from '../types/  Product';

const Dashboard = () => {
  const { products, setProducts, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = {
      id: products.length + 1, 
      title: newProduct.title,
      price: Number(newProduct.price),
      category: newProduct.category,
      stock: Number(newProduct.stock),
      images: [newProduct.imageUrl],
    };

    setProducts([product, ...products]); 
    setIsModalOpen(false); 
    setNewProduct({ title: '', price: '', category: '', stock: '', imageUrl: '' }); 
  };

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
    <>
      <Navbar />

      <div className="dashboard-container">
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
          <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
        </div>

        <ProductList products={filteredProducts} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct} className="add-product-form">
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            required
          />
          <button type="submit" className="submit-button">Add Product</button>
        </form>
      </Modal>

      <Footer />
    </>
  );
};

export default Dashboard;

