import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { AdminLoginRequest } from '../hooks/AdminAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = await AdminLoginRequest(email, password);
      console.log('Login response:', data); // For debugging
      
      // Store both token and admin data in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      
      // Pass the complete data object to adminLogin
      adminLogin(data);
      
      navigate('/adminPanel');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button 
          type="submit" 
          style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { 
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white'
  },
  heading: {
    color: '#333',
    marginBottom: '20px'
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  },
  label: {
    marginBottom: '5px',
    fontWeight: '500',
    fontSize: '14px'
  },
  input: { 
    padding: '10px', 
    width: '100%', 
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
  },
  button: { 
    padding: '12px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    backgroundColor: '#3B82F6', 
    color: 'white', 
    border: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed'
  },
  error: { 
    color: '#EF4444',
    padding: '10px',
    backgroundColor: '#FEF2F2',
    borderRadius: '4px',
    marginBottom: '10px'
  }
};

export default AdminLogin;