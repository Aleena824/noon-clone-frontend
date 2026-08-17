import React from 'react';
import { Link } from 'react-router-dom';

const AccountRequired = () => {
  return (
    <div style={styles.container}>
      {/* Document / Icon Illustration */}
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
};

const styles = {
  container: {
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
    backgroundColor: '#3b82f6', // Noon Blue
    color: '#ffffff',
    padding: '12px 36px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '0.9rem',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
    transition: 'background-color 0.2s ease',
  },
};

export default AccountRequired;