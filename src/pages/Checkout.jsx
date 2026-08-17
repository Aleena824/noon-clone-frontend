import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartSummary from '../components/cart/CartSummary';
import CheckoutForm from '../components/checkout/CheckoutForm';
import API from '../utils/api';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOrderSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');

      // Fixed standard shipping fee of 10 AED
      const shippingFee = 10;
      const grandTotal = totalPrice + shippingFee;

      // Extract shipping details and payment method from formData
      const { fullName, phone, address, city, country, paymentMethod } = formData;

      const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item._id || item.id || (typeof item.product === 'object' ? item.product._id : item.product),
        quantity: item.quantity || item.qty || 1,
        price: item.price,
      })),
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        country,
      },
      paymentMethod,
      shippingPrice: shippingFee,
      totalPrice: grandTotal,
    };

      const res = await API.post('/orders', orderPayload);
      

      clearCart();
      navigate('/orders', { state: { orderSuccess: true, orderId: res.data._id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyWrapper}>
        <h2>Your cart is empty.</h2>
        <button onClick={() => navigate('/')} style={styles.shopBtn}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.formColumn}>
          <CheckoutForm onSubmit={handleOrderSubmit} loading={loading} error={error} />
        </div>

        <div style={styles.summaryColumn}>
          <CartSummary isCheckoutPage={true} shippingFee={10} />
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
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  formColumn: {
    flex: 2,
  },
  summaryColumn: {
    flex: 1,
    position: 'sticky',
    top: '100px',
  },
  emptyWrapper: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBtn: {
    backgroundColor: '#feee00',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '12px',
  },
};

export default Checkout;