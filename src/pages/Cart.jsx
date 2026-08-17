import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyCard}>
          <span style={{ fontSize: '4rem' }}>🛒</span>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" style={styles.shopBtn}>
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Left Side: Cart Items List */}
        <div style={styles.itemsColumn}>
          <div style={styles.headerRow}>
            <h2 style={styles.pageTitle}>
              Cart <span>({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
            </h2>
            <button onClick={clearCart} style={styles.clearAllBtn}>
              Clear Cart
            </button>
          </div>

          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div style={styles.summaryColumn}>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: '#f7f7fa',
    minHeight: '85vh',
    padding: '24px 20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  itemsColumn: {
    flex: 2,
  },
  summaryColumn: {
    flex: 1,
    position: 'sticky',
    top: '100px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '16px 20px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    marginBottom: '16px',
  },
  pageTitle: {
    fontSize: '1.25rem',
    color: '#404553',
    margin: 0,
    fontWeight: '700',
  },
  clearAllBtn: {
    background: 'none',
    border: 'none',
    color: '#d9534f',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: '600',
  },
  emptyContainer: {
    backgroundColor: '#f7f7fa',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  emptyCard: {
    backgroundColor: '#fff',
    padding: '40px 60px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    textAlign: 'center',
    maxWidth: '450px',
    width: '100%',
  },
  emptyTitle: {
    fontSize: '1.4rem',
    color: '#404553',
    margin: '12px 0 8px 0',
  },
  emptySubtitle: {
    fontSize: '0.9rem',
    color: '#7e859b',
    marginBottom: '24px',
  },
  shopBtn: {
    display: 'inline-block',
    backgroundColor: '#feee00',
    color: '#000',
    textDecoration: 'none',
    padding: '12px 28px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
};

export default Cart;