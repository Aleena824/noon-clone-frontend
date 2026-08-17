import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductList from '../components/product/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [categories, setCategories] = useState([]);

  // Category Circle Badges matching Noon
  const quickCategories = [
    { title: 'Electronics', img: '🎧', color: '#e3f2fd' },
    { title: 'Mobiles', img: '📱', color: '#e8f5e9' },
    { title: 'Laptops', img: '💻', color: '#f3e5f5' },
    { title: 'Beauty', img: '💄', color: '#fce4ec' },
    { title: 'Gift Cards', img: '💳', color: '#fff8e1' },
    { title: "Men's Fashion", img: '👕', color: '#e1f5fe' },
    { title: 'Home Appliances', img: '☕', color: '#efebe9' },
    { title: 'Health', img: '💊', color: '#e8eaf6' },
  ];

  // Home.jsx
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch all products by overriding backend pagination default
      const res = await API.get('/products?pageSize=0');
      const data = Array.isArray(res.data) ? res.data : res.data?.products || [];
      setProducts(data);

      const uniqueCats = [...new Set(data.map((p) => p.category).filter(Boolean))];
      setCategories(uniqueCats);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

const filteredProducts = products.filter((p) => {
  // FIX: Access p.name (schema key) instead of p.title
  const nameEn = p.name?.en?.toLowerCase() || '';
  const nameAr = p.name?.ar?.toLowerCase() || '';
  const q = searchQuery.toLowerCase();

  const matchesSearch = nameEn.includes(q) || nameAr.includes(q);

  // FIX: Case-insensitive category comparison
  const matchesCategory = selectedCategory
    ? p.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    : true;

  const matchesPrice = Number(p.price) <= Number(maxPrice);

  return matchesSearch && matchesCategory && matchesPrice;
});
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMaxPrice(10000);
  };

  return (
    <div style={styles.pageWrapper}>
      {/* 1. Top Hero Promo Banner */}
      <section style={styles.bannerContainer}>
        <div style={styles.bannerLeft}>
          <h3>Want more rewards on your card?</h3>
          <h2>Yes, there's a card for that.</h2>
          <p>Islamic 365 Cashback Credit Card</p>
        </div>
        <div style={styles.bannerRight}>
          <h2>UP TO <span>200 AED OFF</span></h2>
          <p>Get School-Ready With Extra Savings</p>
          <div style={styles.couponTag}>Use code: <strong>STYLE200</strong></div>
        </div>
      </section>

      {/* 2. Round Category Icons Row */}
      <section style={styles.quickCatSection}>
        <div style={styles.quickCatGrid}>
          {quickCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(cat.title === selectedCategory ? '' : cat.title)}
              style={{
                ...styles.catCard,
                border: selectedCategory === cat.title ? '2px solid #38ae04' : '1px solid #e0e0e0',
              }}
            >
              <div style={{ ...styles.catIconBox, backgroundColor: cat.color }}>
                <span style={{ fontSize: '2rem' }}>{cat.img}</span>
              </div>
              <span style={styles.catLabel}>{cat.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Main Product Feed with Left Filter Sidebar */}
      <div style={styles.mainLayout}>
        <FilterSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          categories={categories}
          resetFilters={resetFilters}
        />

        <main style={styles.productArea}>
          <div style={styles.resultsHeader}>
            <h3>Products</h3>
            <span>{filteredProducts.length} Results</span>
          </div>

          <ProductList products={filteredProducts} loading={loading} error={error} />
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: '#f7f7fa',
    minHeight: '100vh',
    paddingBottom: '2rem',
  },
  bannerContainer: {
    maxWidth: '1400px',
    margin: '15px auto',
    display: 'flex',
    gap: '15px',
    padding: '0 20px',
  },
  bannerLeft: {
    flex: 2,
    backgroundColor: '#e0f2fe',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bannerRight: {
    flex: 1,
    backgroundColor: '#fef3c7',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  couponTag: {
    marginTop: '10px',
    padding: '6px 14px',
    backgroundColor: '#fff',
    border: '1px dashed #000',
    borderRadius: '6px',
    fontSize: '0.85rem',
  },
  quickCatSection: {
    maxWidth: '1400px',
    margin: '20px auto',
    padding: '0 20px',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'auto',
  },
  quickCatGrid: {
    display: 'flex',
    justifyContent: 'space-between', // Spreads cards evenly across the row
    alignItems: 'stretch',
    gap: '12px',
    width: '100%',                   // Ensures container spans full width
    paddingBottom: '10px',
  },
  catCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1,                          // Allows cards to grow equally
    minWidth: '90px',                 // Prevents cards from getting squished on small screens
    maxWidth: '130px',                // Prevents cards from becoming unnaturally wide
    backgroundColor: '#fff',
    padding: '12px 8px',
    borderRadius: '12px',
  },
  catIconBox: {
    width: '65px',
    height: '65px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  catLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textAlign: 'center',
    color: '#404553',
  },
  mainLayout: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    gap: '20px',
  },
  productArea: {
    flex: 1,
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #e0e0e0',
  },
};

export default Home;