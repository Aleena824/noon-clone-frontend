import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Dubai',
    country: 'UAE',
    paymentMethod: 'cash_on_delivery',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h3 style={styles.sectionTitle}>1. Shipping Address</h3>

      {error && <div style={styles.errorBanner}>{error}</div>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g., John Doe"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g., +971 50 123 4567"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Street Address & Apartment</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g., Building 12, Street 4"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.inputGroup, flex: 1 }}>
          <label style={styles.label}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.inputGroup, flex: 1 }}>
          <label style={styles.label}>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: '24px' }}>2. Payment Method</h3>

      <div style={styles.paymentOptions}>
        <label style={styles.radioOption}>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={formData.paymentMethod === 'Cash on Delivery'}
            onChange={handleChange}
          />
          <div>
            <strong>💵 Cash on Delivery</strong>
            <p style={styles.radioSub}>Pay with cash upon delivery</p>
          </div>
        </label>

        <label style={styles.radioOption}>
          <input
            type="radio"
            name="paymentMethod"
            value="Card"
            checked={formData.paymentMethod === 'Card'}
            onChange={handleChange}
          />
          <div>
            <strong>💳 Credit / Debit Card</strong>
            <p style={styles.radioSub}>Visa, MasterCard, or AMEX</p>
          </div>
        </label>
      </div>

      <button type="submit" disabled={loading} style={styles.submitBtn}>
        {loading ? 'PROCESSING ORDER...' : 'PLACE ORDER'}
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    color: '#404553',
    margin: '0 0 16px 0',
    paddingBottom: '8px',
    borderBottom: '1px solid #f0f0f0',
  },
  errorBanner: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '0.85rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '14px',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  label: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#404553',
    marginBottom: '6px',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
    outline: 'none',
  },
  paymentOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #e0e0e0',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  radioSub: {
    margin: '2px 0 0 0',
    fontSize: '0.78rem',
    color: '#7e859b',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#38ae04',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default CheckoutForm;