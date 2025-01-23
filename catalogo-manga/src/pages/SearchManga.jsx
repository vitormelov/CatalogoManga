import React, { useState } from 'react';
import axios from 'axios';
import { useCollection } from '../context/CollectionContext';
import '../style/SearchManga.css';

const SearchManga = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedManga, setSelectedManga] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { addToCollection, addToWishlist } = useCollection();

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/manga?q=${searchQuery}&limit=10`
      );
      setResults(response.data.data);
    } catch (err) {
      setError('Erro ao buscar os mangás. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = (type) => {
    if (type === 'collection') {
      addToCollection(selectedManga);
    } else if (type === 'wishlist') {
      addToWishlist(selectedManga);
    }
    setShowModal(false);
    setSelectedManga(null);
  };

  return (
    <div className="searchmanga">
      {/* Header com Search Bar */}
      <header className="searchmanga-header">
        <input
          type="text"
          placeholder="Buscar mangá..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Buscar</button>
      </header>

      <main>
        {loading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}
        <div className="results">
          {results.map((manga) => (
            <div
              key={manga.mal_id}
              className="manga-item"
              onClick={() => {
                setSelectedManga(manga);
                setShowModal(true);
              }}
            >
              <img src={manga.images.jpg.large_image_url} alt={manga.title} />
              <div className="manga-info">
                <h3>{manga.title}</h3>
                <p>{manga.synopsis || 'Sem descrição disponível.'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal para Adicionar à Lista */}
      {showModal && selectedManga && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedManga.title}</h2>
            <p>Para qual lista deseja adicionar este mangá?</p>
            <div className="modal-buttons">
              <button onClick={() => handleAddToList('collection')}>📚 Minha Lista</button>
              <button onClick={() => handleAddToList('wishlist')}>⭐ Lista de Desejo</button>
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ❌ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchManga;
