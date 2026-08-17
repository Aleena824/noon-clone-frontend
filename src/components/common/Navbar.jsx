import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);
  const { totalCount } = useContext(CartContext);

  const isAdmin = user && (user.role === 'admin' || user.isAdmin);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const subCategories = [
    'Electronics',
    'Beauty & Fragrance',
    'Home & Kitchen',
    'Grocery',
    "Men's Fashion",
    "Women's Fashion",
    'Mom & Baby',
    'Toys',
    "Kids' Fashion",
    'Sports & Outdoors',
  ];

  // ----------------------------------------------------
  // ADMIN NAVBAR VIEW
  // ----------------------------------------------------
  if (isAdmin) {
    return (
      <header style={styles.header}>
        <div style={styles.topBar}>
          <div style={styles.topContainer}>
            {/* Logo Links to Admin Dashboard */}
            <Link to="/admin" style={styles.adminLogoLink}>
              <span style={styles.logoText}>noon</span>
              <span style={styles.adminBadge}>DASHBOARD</span>
            </Link>

            {/* Right Action Items for Admin */}
            <div style={styles.adminActionsGroup}>
              {/* Language Switcher */}
              <button onClick={toggleLanguage} style={styles.langBtn}>
                🌐 {language === 'en' ? 'العربية' : 'English'}
              </button>

              {/* Admin User Info & Logout */}
              <div style={styles.adminUserArea}>
                <span style={styles.adminGreeting}>
                  👋 Hi, <strong>{user.name || 'Admin'}</strong>
                </span>
                <button onClick={handleLogout} style={styles.adminLogoutBtn}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ----------------------------------------------------
  // STANDARD CUSTOMER NAVBAR VIEW
  // ----------------------------------------------------
  return (
    <header style={styles.header}>
      {/* Top Main Yellow Bar */}
      <div style={styles.topBar}>
        <div style={styles.topContainer}>
          {/* Logo */}
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoText}>noon</span>
          </Link>

          {/* Location Picker */}
          <div style={styles.locationBox}>
            <span style={{ fontSize: '1rem' }}>📍</span>
            <div style={styles.locationText}>
              <span style={styles.deliverTo}>Deliver to</span>
              <strong style={styles.address}>Dubai, UAE ▾</strong>
            </div>
          </div>

          {/* Search Bar */}
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={styles.clearBtn}>
                ✕
              </button>
            )}
          </div>

          {/* Right Action Items */}
          <div style={styles.actionsGroup}>
            {/* Language Switcher */}
            <button onClick={toggleLanguage} style={styles.langBtn}>
              🌐 {language === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Auth / Account */}
            {user ? (
              <div style={styles.userMenu}>
                <span>Hi, {user.name || 'User'} ▾</span>
                <button onClick={logout} style={styles.logoutBtn}>Logout</button>
              </div>
            ) : (
              <Link to="/login" style={styles.actionItem}>
                👤 Log In
              </Link>
            )}

            {/* Orders */}
            <Link to="/orders" style={styles.actionItem}>
              📦 Orders
            </Link>

            {/* Cart */}
            <Link to="/cart" style={styles.cartBtn}>
              🛒 Cart
              {totalCount > 0 && <span style={styles.badge}>{totalCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Category Navigation Bar */}
      <nav style={styles.subNav}>
        <div style={styles.subContainer}>
          {subCategories.map((cat, idx) => (
            <Link key={idx} to={`/?category=${cat}`} style={styles.subNavLink}>
              {cat}
            </Link>
          ))}
          <div style={styles.noonOneBadge}>
            Get Free Delivery with <strong>noon <span>one</span></strong>
          </div>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#feee00', // Signature Noon Yellow
    padding: '8px 20px',
  },
  topContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  logoText: {
    fontSize: '2.2rem',
    fontWeight: '900',
    color: '#000',
    letterSpacing: '-1.5px',
    fontStyle: 'italic',
  },
  logoLink: { textDecoration: 'none' },

  // Admin Specific Styles
  adminLogoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  adminBadge: {
    backgroundColor: '#000',
    color: '#feee00',
    fontSize: '0.75rem',
    fontWeight: '800',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '1px',
    fontStyle: 'normal',
  },
  adminActionsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  adminUserArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  adminGreeting: {
    fontSize: '0.9rem',
    color: '#000',
  },
  adminLogoutBtn: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.82rem',
    cursor: 'pointer',
  },

  // Customer Specific Styles
  locationBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  locationText: { display: 'flex', flexDirection: 'column' },
  deliverTo: { fontSize: '0.7rem', color: '#404553' },
  address: { fontSize: '0.8rem', color: '#000' },
  searchWrapper: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: { position: 'absolute', left: '12px', color: '#7e859b' },
  searchInput: {
    width: '100%',
    padding: '10px 36px 10px 38px',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
    fontSize: '0.95rem',
  },
  clearBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#7e859b',
  },
  actionsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    fontSize: '0.88rem',
    fontWeight: '600',
  },
  actionItem: {
    color: '#000',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  langBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.88rem',
  },
  cartBtn: {
    color: '#000',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    position: 'relative',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#38ae04',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '0.75rem',
    marginLeft: '2px',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#d9534f',
    cursor: 'pointer',
    fontSize: '0.75rem',
    display: 'block',
  },
  userMenu: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  subNav: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: '8px 20px',
    overflowX: 'auto',
  },
  subContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    whiteSpace: 'nowrap',
  },
  subNavLink: {
    color: '#404553',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  noonOneBadge: {
    marginLeft: 'auto',
    border: '1px solid #feee00',
    borderRadius: '20px',
    padding: '3px 12px',
    fontSize: '0.78rem',
    backgroundColor: '#fffbe6',
  },
};

export default Navbar;