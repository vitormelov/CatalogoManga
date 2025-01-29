import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="home">
      <video className="background-video" autoPlay loop muted>
        <source src="/videos/background.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      <div className="home-content">
        <h1>CATALOG</h1>
        <p>Bem-vindo ao seu organizador digital de mangás! Aqui você pode catalogar, explorar e gerenciar suas coleções favoritas.</p>
        <button onClick={handleStart}>COMEÇAR</button>
      </div>
    </div>
  );
};

export default Home;
