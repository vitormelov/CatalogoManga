import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext.jsx';
import '../style/MySpace.css';

const MySpace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);

  const { addToCollection } = useCollection();
  const navigate = useNavigate();

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

  const handleAddToCollection = () => {
    addToCollection(selectedManga);
    setShowModal(false);
    setSelectedManga(null);
  };

  return (
    <div className="myspace">
      <header className="myspace-header">
        <h1>MySpace</h1>
        <div className="header-options">
          <button onClick={() => navigate('/collection')}>📚 Coleções</button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar mangá..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>🔍 Buscar</button>
        </div>
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

      {showModal && selectedManga && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedManga.title}</h2>
            <p>Deseja adicionar este mangá à sua coleção?</p>
            <div className="modal-buttons">
              <button onClick={handleAddToCollection}>📚 Adicionar à Coleção</button>
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

export default MySpace;