import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const t = translations[language] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login(email, password);

      // Check if user is an admin
      if (userData?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{t.auth.loginTitle}</h2>
        
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label>{t.auth.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>{t.auth.password}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          {t.auth.loginBtn}
        </button>

        <p style={styles.text}>
          {t.auth.noAccount} <Link to="/register">{t.navbar.register}</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '3rem 1rem' },
  form: { width: '100%', maxWidth: '400px', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' },
  inputGroup: { marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  input: { padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' },
  button: { width: '100%', padding: '0.75rem', background: '#feee00', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
  error: { background: '#ffebee', color: '#c62828', padding: '0.6rem', borderRadius: '4px', marginBottom: '1rem' },
  text: { marginTop: '1rem', textAlign: 'center' }
};

export default Login;