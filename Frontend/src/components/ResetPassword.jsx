import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: '', otp: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reset-password', formData);
      setMessage('Password reset successfully');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data || 'Password reset failed');
      setMessage('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={formData.otp}
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;