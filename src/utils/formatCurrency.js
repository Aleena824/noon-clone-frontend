/**
 * Formats a numeric price into localized currency format (e.g. AED 150.00 or د.إ 150.00)
 * @param {number} amount - The numeric price from database
 * @param {string} lang - 'en' or 'ar'
 * @returns {string} Formatted string
 */
export const formatCurrency = (amount, lang = 'en') => {
  if (isNaN(amount)) return 'AED 0.00';

  const numericAmount = Number(amount);

  if (lang === 'ar') {
    return `${numericAmount.toFixed(2)} د.إ`;
  }

  return `AED ${numericAmount.toFixed(2)}`;
};

export default formatCurrency;