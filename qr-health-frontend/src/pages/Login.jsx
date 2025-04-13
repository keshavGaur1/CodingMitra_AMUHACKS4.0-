import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');  // Error state for handling login failures
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate email format
  const isEmailValid = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple input validation
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!isEmailValid(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);  // Set loading state to true while the request is in progress

    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="error-message">{error}</p>}  {/* Display error message */}
        <button type="submit" disabled={loading}>  {/* Disable button while loading */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
