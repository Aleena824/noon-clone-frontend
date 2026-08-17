import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatCurrency';

const CurrencyDisplay = ({ amount, className = '' }) => {
  const { language } = useContext(LanguageContext);

  return (
    <span className={`currency-display ${className}`}>
      {formatCurrency(amount, language)}
    </span>
  );
};

export default CurrencyDisplay;