import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';
import { LanguageContext } from '../../context/LanguageContext';
import { CartContext } from '../../context/CartContext';
import { translations } from '../../utils/translations';
import CurrencyDisplay from '../common/CurrencyDisplay';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { language } = useContext(LanguageContext);
  const { addToCart } = useContext(CartContext);
  const t = translations[language] || translations.en;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div style={styles.centerMessage}>Loading product...</div>;
  if (error) return <div style={styles.errorMessage}>{error}</div>;
  if (!product) return <div style={styles.centerMessage}>Product not found.</div>;

  const title = product.title?.[language] || product.title?.en || 'Untitled Product';
  const description = product.description?.[language] || product.description?.en || '';

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img src={product.image || 'https://via.placeholder.com/400'} alt={title} style={styles.image} />
      </div>

      <div style={styles.infoSection}>
        <span style={styles.category}>{product.category}</span>
        <h1 style={styles.title}>{title}</h1>

        <div style={styles.priceRow}>
          <CurrencyDisplay amount={product.price} />
        </div>

        <p style={styles.description}>{description}</p>

        <div style={styles.stockRow}>
          <span>Status: </span>
          <strong style={{ color: product.stock > 0 ? '#2e7d32' : '#c62828' }}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </strong>
        </div>

        {product.stock > 0 && (
          <div style={styles.actionRow}>
            <label style={styles.qtyLabel}>Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={styles.qtySelect}
            >
              {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>

            <button
              onClick={() => addToCart(product, quantity)}
              style={styles.addBtn}
            >
              {t.product?.addToCart || 'Add to Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '2.5rem',
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    flexWrap: 'wrap',
  },
  imageSection: {
    flex: '1',
    minWidth: '280px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '380px',
    objectFit: 'contain',
  },
  infoSection: {
    flex: '1.2',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  category: {
    fontSize: '0.85rem',
    color: '#7e859b',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '1.6rem',
    color: '#404553',
    margin: '0',
  },
  priceRow: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#404553',
  },
  description: {
    color: '#555',
    lineHeight: '1.6',
  },
  stockRow: {
    fontSize: '1rem',
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
  qtyLabel: {
    fontWeight: 'bold',
  },
  qtySelect: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addBtn: {
    flex: '1',
    padding: '0.75rem',
    backgroundColor: '#feee00',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  centerMessage: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
  },
  errorMessage: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
};

export default ProductDetail;