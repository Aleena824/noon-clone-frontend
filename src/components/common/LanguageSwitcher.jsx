import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button 
      onClick={toggleLanguage}
      className="language-switcher-btn"
      style={{
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        border: '1px solid #ccc',
        background: '#fff',
        fontWeight: 'bold'
      }}
    >
      {/* Show the target language name depending on current state */}
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;