import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  if (!user) {
    return (
      <div style={styles.accountRequiredContainer}>
        <div style={styles.iconContainer}>
          <div style={styles.coin}>!</div>
          <div style={styles.document}>
            <div style={styles.docLine}></div>
            <div style={styles.docLineShort}></div>
          </div>
        </div>

        <h2 style={styles.heading}>Account required</h2>
        <p style={styles.subtext}>Please sign in or register to see this content</p>

        <Link to="/login" style={styles.loginBtn}>
          LOGIN/SIGNUP
        </Link>
      </div>
    );
  }

  if (loading) return <div style={styles.centerText}>Loading your orders...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have placed no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <div style={styles.header}>
              <span><strong>Order ID:</strong> {order._id}</span>
              <span><strong>Status:</strong> {order.isDelivered ? 'Delivered' : 'Processing'}</span>
            </div>

            {/* Render Order Items List */}
            <div style={styles.itemsContainer}>
              {order.orderItems?.map((item, idx) => {
                const productName =
                  item.product?.name?.en || item.name?.en || item.name || 'Product Item';
                const itemImage =
                  item.product?.image ||
                  (item.product?.images && item.product.images[0]) ||
                  item.image;

                return (
                  <div key={idx} style={styles.itemRow}>
                    {itemImage && (
                      <img
                        src={itemImage}
                        alt={productName}
                        style={styles.itemThumb}
                      />
                    )}
                    <div style={styles.itemDetails}>
                      <span style={styles.itemName}>{productName}</span>
                      <span style={styles.itemQty}>Qty: {item.quantity}</span>
                    </div>
                    <span style={styles.itemPrice}>
                      AED {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={styles.footer}>
              <strong>Total Amount:</strong>
              <strong style={styles.totalAmount}>
                AED {(order.totalPriceAED ?? order.totalPrice ?? 0).toFixed(2)}
              </strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  orderCard: {
    border: '1px solid #e2e8f0',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.95rem',
    color: '#334155',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    margin: '16px 0',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '8px 0',
  },
  itemThumb: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  itemName: {
    fontWeight: '600',
    fontSize: '0.95rem',
    color: '#1e293b',
  },
  itemQty: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginTop: '2px',
  },
  itemPrice: {
    fontWeight: '600',
    fontSize: '0.95rem',
    color: '#0f172a',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f1f5f9',
    fontSize: '1rem',
  },
  totalAmount: {
    color: '#38ae04',
    fontSize: '1.15rem',
  },
  centerText: { textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#64748b' },

  // Account Required Styling
  accountRequiredContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    backgroundColor: '#f7f9fa',
    padding: '40px 20px',
    textAlign: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  iconContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coin: {
    position: 'absolute',
    left: '10px',
    top: '25px',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#feee00',
    color: '#000',
    fontWeight: '900',
    fontSize: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    zIndex: 2,
  },
  document: {
    width: '70px',
    height: '90px',
    backgroundColor: '#e2e8f0',
    border: '2px solid #cbd5e1',
    borderRadius: '6px',
    padding: '16px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxSizing: 'border-box',
  },
  docLine: {
    height: '6px',
    backgroundColor: '#cbd5e1',
    borderRadius: '3px',
    width: '100%',
  },
  docLineShort: {
    height: '6px',
    backgroundColor: '#cbd5e1',
    borderRadius: '3px',
    width: '60%',
  },
  heading: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  subtext: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: '0 0 24px 0',
  },
  loginBtn: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '12px 36px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '0.9rem',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
  },
};

export default Orders;