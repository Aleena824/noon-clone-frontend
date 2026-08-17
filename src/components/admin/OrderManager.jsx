// src/components/admin/OrderManager.jsx
import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get('/orders');
      // Adjust based on your backend response structure
      const data = Array.isArray(res.data) ? res.data : res.data?.orders || [];
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order delivery status
  const handleMarkDelivered = async (id) => {
    if (!window.confirm('Mark this order as delivered?')) return;
    
    try {
      setError('');
      setSuccess('');
      // Adjust route based on your backend (e.g., /orders/:id/deliver)
      const res = await API.put(`/orders/${id}/deliver`);
      const updatedOrder = res.data;

      // Update the order in the local state
      setOrders(
        orders.map((order) => (order._id === id ? updatedOrder : order))
      );
      setSuccess('Order marked as delivered!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Order Management</h2>
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}
      {success && <div style={styles.successBanner}>{success}</div>}

      {/* Orders Table */}
      {loading ? (
        <div style={styles.loadingText}>Loading orders...</div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Total (AED)</th>
                <th style={styles.th}>Paid</th>
                <th style={styles.th}>Delivered</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.emptyTd}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} style={styles.tableRow}>
                    <td style={styles.td}>{order._id}</td>
                    <td style={styles.td}>{order.user?.name || 'Deleted User'}</td>
                    <td style={styles.td}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>{order.totalPriceAED?.toFixed(2)}</td>
                    
                    {/* Paid Status */}
                    <td style={styles.td}>
                      <span style={order.isPaid ? styles.badgeSuccess : styles.badgeDanger}>
                        {order.isPaid ? (order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'Yes') : 'No'}
                      </span>
                    </td>

                    {/* Delivered Status */}
                    <td style={styles.td}>
                      <span style={order.isDelivered ? styles.badgeSuccess : styles.badgeWarning}>
                        {order.isDelivered ? (order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'Yes') : 'Pending'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={styles.td}>
                      {!order.isDelivered ? (
                        <button
                          style={styles.actionBtn}
                          onClick={() => handleMarkDelivered(order._id)}
                        >
                          🚚 Mark Delivered
                        </button>
                      ) : (
                        <span style={styles.completedText}>Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    minWidth: '800px',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #f1f5f9',
  },
  th: {
    padding: '12px 8px',
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '12px 8px',
    fontSize: '0.875rem',
    color: '#334155',
  },
  emptyTd: {
    textAlign: 'center',
    padding: '24px',
    color: '#64748b',
  },
  badgeSuccess: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  badgeWarning: {
    backgroundColor: '#fef9c3',
    color: '#a16207',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  badgeDanger: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  actionBtn: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  completedText: {
    color: '#64748b',
    fontSize: '0.85rem',
    fontStyle: 'italic',
  },
  errorBanner: {
    padding: '12px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '6px',
    fontSize: '0.875rem',
  },
  successBanner: {
    padding: '12px',
    backgroundColor: '#dcfce7',
    color: '#15803d',
    borderRadius: '6px',
    fontSize: '0.875rem',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '1rem',
  },
};

export default OrderManager;