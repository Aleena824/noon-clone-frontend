import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';

const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories = [],
  resetFilters,
}) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;

  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.heading}>Filters</h3>

      {/* Search Input */}
      <div style={styles.section}>
        <label style={styles.label}>{t.product?.searchPlaceholder || 'Search products...'}</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.product?.searchPlaceholder || 'Search products...'}
          style={styles.input}
        />
      </div>

      {/* Category Dropdown */}
      <div style={styles.section}>
        <label style={styles.label}>{t.product?.category || 'Category'}</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div style={styles.section}>
        <label style={styles.label}>
          {t.product?.price || 'Max Price'}: AED {maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.slider}
        />
      </div>

      {/* Reset Button */}
      <button onClick={resetFilters} style={styles.resetBtn}>
        Reset Filters
      </button>
    </aside>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#fff',
    padding: '1.2rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    minWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  heading: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#404553',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  select: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  slider: {
    width: '100%',
  },
  resetBtn: {
    padding: '0.6rem',
    border: '1px solid #ccc',
    backgroundColor: '#f7f9fa',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default FilterSidebar;