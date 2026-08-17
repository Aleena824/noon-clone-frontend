import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { CartContext } from '../../context/CartContext';
import CurrencyDisplay from '../common/CurrencyDisplay';

const CartItem = ({ item }) => {
  const { language } = useContext(LanguageContext);
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const title = item.title?.[language] || item.title?.en || item.title || 'Product Item';
  const itemImage = item.images?.[0] || item.image || 'https://via.placeholder.com/120';

  return (
    <div style={styles.container}>
      {/* Product Image */}
      <img src={itemImage} alt={title} style={styles.image} />

      {/* Details Column */}
      <div style={styles.details}>
        <h4 style={styles.title}>{title}</h4>
        {item.brand && <span style={styles.brand}>Brand: {item.brand}</span>}
        
        <div style={styles.priceRow}>
          <CurrencyDisplay amount={item.price} className="cart-item-price" />
        </div>

        {/* Quantity Controls & Remove Action */}
        <div style={styles.actionsRow}>
          <div style={styles.quantityBox}>
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              style={styles.qtyBtn}
            >
              -
            </button>
            <span style={styles.qtyVal}>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              style={styles.qtyBtn}
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            style={styles.removeBtn}
          >
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    marginBottom: '12px',
    alignItems: 'center',
  },
  image: {
    width: '90px',
    height: '90px',
    objectFit: 'contain',
    borderRadius: '4px',
    border: '1px solid #f0f0f0',
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  title: {
    fontSize: '0.95rem',
    color: '#404553',
    margin: 0,
    fontWeight: '600',
  },
  brand: {
    fontSize: '0.78rem',
    color: '#7e859b',
  },
  priceRow: {
    fontSize: '1.05rem',
    fontWeight: 'bold',
    color: '#000',
    margin: '4px 0',
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginTop: '6px',
  },
  quantityBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #d0d0d0',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    backgroundColor: '#f7f7fa',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyVal: {
    padding: '0 12px',
    fontSize: '0.88rem',
    fontWeight: '600',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#d9534f',
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default CartItem;