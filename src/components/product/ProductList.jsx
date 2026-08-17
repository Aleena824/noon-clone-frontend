import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <div style={styles.message}>Loading products...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div style={styles.message}>No products found.</div>;
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.2rem',
    width: '100%',
  },
  message: {
    textAlign: 'center',
    padding: '3rem 1rem',
    fontSize: '1.1rem',
    color: '#7e859b',
  },
  error: {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '6px',
  },
};

export default ProductList;