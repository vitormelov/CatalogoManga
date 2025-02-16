import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../style/WishList.css';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  // Buscar a lista de desejos do backend
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      try {
        const response = await fetch(`https://catalogomanga.onrender.com//api/mangas?userId=${userId}&listType=wishlist`);
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Erro ao buscar lista de desejos:', error);
      }
    };

    fetchWishlist();
  }, []);

  // Função para mover o mangá para a coleção (alterando apenas o listType)
  const moveToCollection = async (mangaId) => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;

    try {
      const response = await fetch('https://catalogomanga.onrender.com//api/mangas/move-to-collection', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, mangaId }),
      });

      if (response.ok) {
        setWishlist((prev) => prev.filter((manga) => manga._id !== mangaId));
        alert('Mangá movido para a coleção!');
      } else {
        alert('Erro ao mover o mangá.');
      }
    } catch (error) {
      console.error('Erro ao mover mangá:', error);
    }
  };

  // Função para deletar o mangá (já existente no MySpace)
  const deleteManga = async (mangaId) => {
    try {
      const response = await fetch(`https://catalogomanga.onrender.com//api/mangas/delete/${mangaId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setWishlist((prev) => prev.filter((manga) => manga._id !== mangaId));
        alert('Mangá deletado com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao deletar o mangá: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao deletar mangá:', error);
    }
  };

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
                    <p><b>{manga.title}</b></p>
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

                {/* Botões para mover e deletar */}
                <div className="wishlist-buttons">
                  <button className="wishlist-move-button" onClick={() => moveToCollection(manga._id)}>
                    ➕ Adicionar à Coleção
                  </button>
                  <button className="wishlist-delete-button" onClick={() => deleteManga(manga._id)}>
                    ❌ Deletar
                  </button>
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
