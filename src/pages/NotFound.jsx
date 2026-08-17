import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', padding: '4rem 1rem' },
  code: { fontSize: '4rem', color: '#404553', margin: '0' },
  link: { display: 'inline-block', marginTop: '1rem', color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }
};

export default NotFound;