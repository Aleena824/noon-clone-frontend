import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import { CartContext } from '../../context/CartContext';
import { translations } from '../../utils/translations';
import CurrencyDisplay from '../common/CurrencyDisplay';

const ProductCard = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const { addToCart } = useContext(CartContext);
  const t = translations[language] || translations.en;

  const title = product.name?.[language] || product.name?.en || 'Untitled Product';

  // Get image from images array or image field fallback
  const productImage =
    (product.images && product.images.length > 0 ? product.images[0] : product.image) ||
    '/images/placeholder.jpg';

  return (
    <div style={styles.card}>
      <Link to={`/product/${product._id}`} style={styles.imageContainer}>
        <img
          src={productImage}
          alt={typeof product.name === 'object' ? product.name.en : product.name}
          style={styles.image}
        />
      </Link>

      <div style={styles.details}>
        <span style={styles.category}>{product.category}</span>

        <Link to={`/product/${product._id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{title}</h3>
        </Link>

        <div style={styles.priceRow}>
          <CurrencyDisplay amount={product.price} className="card-price" />
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          disabled={product.countInStock <= 0}
          style={{
            ...styles.button,
            backgroundColor: product.countInStock > 0 ? '#feee00' : '#e0e0e0',
            cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          {product.countInStock > 0
            ? t.product?.addToCart || 'Add to Cart'
            : t.product?.outOfStock || 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    transition: 'box-shadow 0.2s ease',
  },
  imageContainer: {
    display: 'block',
    textAlign: 'center',
    marginBottom: '0.8rem',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'contain',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  category: {
    fontSize: '0.75rem',
    color: '#7e859b',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  titleLink: {
    textDecoration: 'none',
    color: '#404553',
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '500',
    lineHeight: '1.3',
    height: '2.6em',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  priceRow: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#404553',
    margin: '0.4rem 0',
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: '#404553',
  },
};

export default ProductCard;