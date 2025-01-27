import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../style/WishList.css';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]); // Estado para armazenar os mangás da lista de desejos

  // Função para buscar a lista de desejos do backend
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token'); // Obtém o token do usuário
      const userId = JSON.parse(atob(token.split('.')[1])).id; // Decodifica o ID do usuário do token

      try {
        const response = await fetch(`http://localhost:5000/api/mangas?userId=${userId}&listType=wishlist`);
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Erro ao buscar lista de desejos:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="wishlist">
      <Header />
      <main className="list-section">
        <h2>Lista de Desejos</h2>
        {wishlist.length === 0 ? (
          <p>Sua lista de desejos está vazia.</p>
        ) : (
          <div className="manga-list-wishlist">
            {wishlist.map((manga) => (
              <div key={manga.mal_id} className="manga-card-wishlist">
                <div className="manga-item-wishlist">
                  <img src={manga.images.jpg.large_image_url} alt={manga.title} />
                  <div className="manga-info-wishlist">
                    <p>
                      <b>{manga.title}</b>
                    </p>
                    <p>Rank: {manga.rank || 'Sem descrição disponível.'}</p>
                    <p>Popularidade: {manga.popularity || 'Sem descrição disponível.'}</p>
                  </div>
                  <div className="manga-info-wishlist">
                    <p>Situação: {manga.status || 'Sem descrição disponível.'}</p>
                    <p>Início da publicação: {manga.published?.from || '?'}</p>
                    <p>Término da publicação: {manga.published?.to || '?'}</p>
                  </div>
                  <div className="manga-info-wishlist">
                    <p>No. de volumes: {manga.volumes || '?'}</p>
                    <p>No. de capítulos: {manga.chapters || '?'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WishList;
