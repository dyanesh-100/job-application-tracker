import { useState } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signup = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.signup(userData);
      toast.success('Account created successfully! Please login.');
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(credentials);
      const { user, message } = response.data;
      
      toast.success(message || 'Login successful!');
      setLoading(false);
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      throw err;
    }
  };
  const logout = async () => {
    try {
      await authAPI.logout();
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout API error:', err);
      toast.info('Logged out');
    }
  };

  return {
    signup,
    login,
    logout,
    loading,
    error,
    setError,
  };
};