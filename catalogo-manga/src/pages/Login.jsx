import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validação simples para demonstração
    if (email === 'usuario@exemplo.com' && password === '123456') {
      navigate('/myspace');
    } else {
      alert('Email ou senha incorretos!');
    }
  };

  const handleCreateAccount = () => {
    navigate('/createaccount');
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <p>Não tem uma conta?</p>
        <button onClick={handleCreateAccount} className="create-account-btn">
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default Login;
