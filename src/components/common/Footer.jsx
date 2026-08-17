import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; {new Date().getFullYear()} noon Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#404553',
    color: '#ffffff',
    textAlign: 'center',
    padding: '1.5rem 0',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
};

export default Footer;