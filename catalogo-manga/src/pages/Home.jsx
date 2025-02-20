import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    const randomValue = Math.random();
    setCurrentVideo(randomValue < 0.5 ? '/videos/background.mp4' : '/videos/background2.mp4');
  }, []); // O array vazio garante que o código execute apenas uma vez, ao montar o componente

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <video className="background-video" autoPlay loop muted>
        <source src={currentVideo} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      <div className="home-content">
        <h1>CATÁLOGO DE MANGÁS</h1>
        <p>Bem-vindo ao seu organizador digital de mangás! Aqui você pode catalogar, explorar e gerenciar suas coleções favoritas.</p>
        <button onClick={handleStart}>COMEÇAR</button>
      </div>
    </div>
  );
};

export default Home;