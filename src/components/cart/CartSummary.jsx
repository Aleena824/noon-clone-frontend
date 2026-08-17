import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CurrencyDisplay from '../common/CurrencyDisplay';

const CartSummary = ({ isCheckoutPage = false, onCheckoutClick }) => {
  const { totalPrice, totalCount } = useContext(CartContext);
  const navigate = useNavigate();

const shippingFee = totalCount > 0 ? 10 : 0;
  const grandTotal = totalPrice + shippingFee;

  const handleProceed = () => {
    if (onCheckoutClick) {
      onCheckoutClick();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Order Summary</h3>

      <div style={styles.row}>
        <span>Subtotal ({totalCount} items)</span>
        <CurrencyDisplay amount={totalPrice} />
      </div>

      <div style={styles.row}>
        <span>Shipping Fee</span>
        {shippingFee === 0 ? (
          <span style={styles.freeText}>FREE</span>
        ) : (
          <CurrencyDisplay amount={shippingFee} />
        )}
      </div>

      <div style={styles.divider} />

      <div style={styles.totalRow}>
        <strong>Total (Inclusive of VAT)</strong>
        <strong style={styles.totalAmount}>
          <CurrencyDisplay amount={grandTotal} />
        </strong>
      </div>

      {!isCheckoutPage && (
        <button
          onClick={handleProceed}
          disabled={totalCount === 0}
          style={{
            ...styles.checkoutBtn,
            opacity: totalCount === 0 ? 0.6 : 1,
            cursor: totalCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          CHECKOUT ({totalCount})
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  heading: {
    fontSize: '1.1rem',
    color: '#404553',
    margin: '0 0 8px 0',
    paddingBottom: '8px',
    borderBottom: '1px solid #f0f0f0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#404553',
  },
  freeText: {
    color: '#38ae04',
    fontWeight: 'bold',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '4px 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.05rem',
    color: '#000',
  },
  totalAmount: {
    color: '#38ae04',
    fontSize: '1.2rem',
  },
  checkoutBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#feee00', // Noon Yellow
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    marginTop: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default CartSummary;