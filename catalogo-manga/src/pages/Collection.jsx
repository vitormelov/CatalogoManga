import React, { useState } from 'react';
import Header from '../components/Header';
import { useCollection } from '../context/CollectionContext'; // Importa o contexto
import '../style/Collection.css';

const Collection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);

  const { addToCollection, addToWishlist } = useCollection(); // Funções do contexto

  // Função para buscar mangás
  const handleSearch = async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${searchQuery}&limit=10`);
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error('Erro ao buscar mangás:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para abrir o modal
  const openModal = (manga) => {
    setSelectedManga(manga);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setSelectedManga(null);
  };

  // Função para adicionar o mangá à coleção ou lista de desejos
  const handleAdd = (type) => {
    if (type === 'collection') {
      addToCollection(selectedManga); // Adiciona à coleção
    } else if (type === 'wishlist') {
      addToWishlist(selectedManga); // Adiciona à lista de desejos
    }
    closeModal();
  };

  return (
    <div className="collection">
      <Header />
      <main className="collection-main">
        <h2>Adicionar Mangás</h2>
        <p>Encontre e adicione mangás à sua coleção!</p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nome, autor ou gênero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>🔍 Buscar</button>
        </div>

        {/* Resultados da Pesquisa */}
        <div className="search-results">
          {isLoading && <p>Carregando...</p>}
          {!isLoading && results.length === 0 && searchQuery && <p>Nenhum resultado encontrado.</p>}
          {results.map((manga) => (
            <div key={manga.mal_id} className="manga-card">
              <img
                src={manga.images.jpg.large_image_url}
                alt={manga.title}
                onClick={() => openModal(manga)}
              />
              <div className="manga-info">
                <h3>{manga.title_english || manga.title }</h3>
                <p>Rank: {manga.rank || 'Descrição indisponível.'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal para Adicionar Mangá */}
      {selectedManga && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>{selectedManga.title_english || selectedManga.title}</h3>
              
            <div className="modal-buttons">
              <button onClick={() => handleAdd('collection')}>Coleção</button>
              <button onClick={() => handleAdd('wishlist')}>Lista de Desejos</button>
            </div>
            <div className="close-modal">
              <button onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
