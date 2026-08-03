import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authApi.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Регистрация
        </Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Имя"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Typography variant="body2" align="center">
            Уже есть аккаунт? <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Войти</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
