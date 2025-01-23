import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import '../style/MySpace.css';

const MySpace = () => {
  const navigate = useNavigate();
  const { collections, wishlist } = useCollection();

  return (
    <div className="myspace">
      {/* Header */}
      <header className="myspace-header">
        <h1 className="site-title">Catálogo de Mangás</h1>
        <button className="add-button" onClick={() => navigate('/searchmanga')}>
          ADICIONAR
        </button>
      </header>

      <main>
        {/* Minha Lista */}
        <section className="list-section">
          <h2>MINHA LISTA</h2>
          {collections.length === 0 ? (
            <p>Sua lista está vazia. Adicione mangás à sua coleção!</p>
          ) : (
            <div className="manga-list">
              {collections.map((manga) => (
                <div key={manga.mal_id} className="manga-item">
                  <img src={manga.images.jpg.large_image_url} alt={manga.title} />
                  <div className="manga-info">
                    <h3>{manga.title}</h3>
                    <p>{manga.synopsis || 'Sem descrição disponível.'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Lista de Desejo */}
        <section className="list-section">
          <h2>LISTA DE DESEJO</h2>
          {wishlist.length === 0 ? (
            <p>Sua lista de desejos está vazia. Adicione mangás para ler mais tarde!</p>
          ) : (
            <div className="manga-list">
              {wishlist.map((manga) => (
                <div key={manga.mal_id} className="manga-item">
                  <img src={manga.images.jpg.large_image_url} alt={manga.title} />
                  <div className="manga-info">
                    <h3>{manga.title}</h3>
                    <p>{manga.synopsis || 'Sem descrição disponível.'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MySpace;
