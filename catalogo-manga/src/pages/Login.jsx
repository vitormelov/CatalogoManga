import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://catalogomanga.onrender.com/api/users/login', formData);
      localStorage.setItem('token', response.data.token); // Salvar o token
      navigate('/myspace'); // Redirecionar para MySpace
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao realizar login.');
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Não tem uma conta?{' '}
          <span className="link-text" onClick={() => navigate('/createaccount')}>
            Clique aqui
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;