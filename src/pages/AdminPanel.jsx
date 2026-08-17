import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManager from '../components/admin/ProductManager';
import OrderManager from '../components/admin/OrderManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.topNavGroup}>
          <h2 style={styles.brand}>Admin Portal</h2>
          <nav style={styles.nav}>
            <button 
              style={activeTab === 'dashboard' ? styles.activeBtn : styles.btn} 
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              style={activeTab === 'products' ? styles.activeBtn : styles.btn} 
              onClick={() => setActiveTab('products')}
            >
              📦 Products
            </button>
            <button 
              style={activeTab === 'orders' ? styles.activeBtn : styles.btn} 
              onClick={() => setActiveTab('orders')}
            >
              🚚 Orders
            </button>
          </nav>
        </div>

        {/* Customer Store View Link pinned at the bottom */}
        <div style={styles.bottomNavGroup}>
          <hr style={styles.divider} />
          <Link to="/" style={styles.storeBtn}>
            🛍️ Customer Store
          </Link>
        </div>
      </aside>

      <main style={styles.content}>
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'orders' && <OrderManager />}
      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' },
  sidebar: { 
    width: '240px', 
    backgroundColor: '#1e293b', 
    color: '#fff', 
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box'
  },
  topNavGroup: { display: 'flex', flexDirection: 'column' },
  brand: { fontSize: '1.2rem', marginBottom: '30px', color: '#f8fafc' },
  nav: { display: 'flex', flexDirection: 'column', gap: '10px' },
  btn: { padding: '12px', textAlign: 'left', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', borderRadius: '6px' },
  activeBtn: { padding: '12px', textAlign: 'left', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold' },
  bottomNavGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  divider: { border: 'none', borderTop: '1px solid #334155', margin: '10px 0' },
  storeBtn: {
    padding: '12px',
    textAlign: 'center',
    backgroundColor: '#feee00',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem'
  },
  content: { flex: 1, padding: '30px' }
};

export default AdminPanel;