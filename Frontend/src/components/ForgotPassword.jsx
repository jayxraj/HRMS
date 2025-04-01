import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../Style/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/forgot-password', { email });
      setMessage('OTP sent to your email');
      setError('');
      navigate('/reset-password');
    } catch (err) {
      setError(err.response?.data || 'Failed to send OTP');
      setMessage('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Forgot Password</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;