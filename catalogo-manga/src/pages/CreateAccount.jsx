import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Definir a URL do backend a partir do ambiente
  const API_URL = process.env.REACT_APP_API_URL || 'https://catalogomanga.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true, // 🔹 Importante para garantir autenticação e CORS correto
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage(response.data.message);

      // Se a conta foi criada com sucesso, redireciona para o login
      if (response.status === 201) {
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao criar conta.');
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <h2>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
          <label>Confirmar Senha:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Criar Conta</button>
        </form>
        {message && <p>{message}</p>}

        {/* Botão para voltar ao Login */}
        <button className="back-button" onClick={() => navigate('/login')}>
          Voltar para o Login
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;