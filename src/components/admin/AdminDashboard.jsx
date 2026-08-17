// src/components/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Fetch products and orders concurrently
        const [productsRes, ordersRes] = await Promise.all([
          API.get('/products?pageSize=0'),
          API.get('/orders'),
        ]);

        const productsData = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data?.products || [];

        const ordersData = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data?.orders || [];

        // Calculate total sales
        const totalSales = ordersData.reduce(
          (sum, order) => sum + (order.totalPriceAED || 0),
          0
        );

        setStats({
          totalSales,
          totalOrders: ordersData.length,
          totalProducts: productsData.length,
          recentOrders: ordersData.slice(0, 5), // Get 5 most recent orders
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <div style={styles.loading}>Loading Dashboard...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard Overview</h2>

      {/* Metric Cards */}
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <span style={styles.cardIcon}>💰</span>
          <div>
            <h4 style={styles.cardTitle}>Total Sales</h4>
            <p style={styles.cardValue}>AED {stats.totalSales.toFixed(2)}</p>
          </div>
        </div>

        <div style={styles.card}>
          <span style={styles.cardIcon}>📦</span>
          <div>
            <h4 style={styles.cardTitle}>Total Orders</h4>
            <p style={styles.cardValue}>{stats.totalOrders}</p>
          </div>
        </div>

        <div style={styles.card}>
          <span style={styles.cardIcon}>🛍️</span>
          <div>
            <h4 style={styles.cardTitle}>Total Products</h4>
            <p style={styles.cardValue}>{stats.totalProducts}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={styles.tableContainer}>
        <h3 style={styles.subHeading}>Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p style={styles.emptyText}>No orders found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Paid</th>
                <th style={styles.th}>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id} style={styles.tableRow}>
                  <td style={styles.td}>{order._id}</td>
                  <td style={styles.td}>{order.user?.name || 'Guest/User'}</td>
                  <td style={styles.td}>AED {order.totalPriceAED?.toFixed(2)}</td>
                  <td style={styles.td}>
                    <span style={order.isPaid ? styles.badgeSuccess : styles.badgeDanger}>
                      {order.isPaid ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={order.isDelivered ? styles.badgeSuccess : styles.badgeWarning}>
                      {order.isDelivered ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  subHeading: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '16px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  cardIcon: {
    fontSize: '2rem',
  },
  cardTitle: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: '500',
  },
  cardValue: {
    margin: '4px 0 0 0',
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#0f172a',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
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
  loading: { padding: '20px', color: '#64748b' },
  error: { padding: '20px', color: '#ef4444' },
  emptyText: { color: '#64748b', fontSize: '0.9rem' },
};

export default AdminDashboard;