import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import '../style/MySpace.css';

const MySpace = () => {
  const navigate = useNavigate();
  const { collections } = useCollection();
  const [volumes, setVolumes] = useState({}); // Estado para volumes por mangá
  const [currentManga, setCurrentManga] = useState(null); // Mangá atualmente editado
  const [formData, setFormData] = useState({
    volume: '',
    name: '',
    date: '',
    price: '',
    status: 'Lacrado', // Valor padrão para a situação
  });

  // Função para abrir o formulário modal
  const openForm = (mangaId) => {
    setCurrentManga(mangaId);
    setFormData({ volume: '', name: '', date: '', price: '', status: 'Lacrado' });
  };

  // Função para salvar o volume
  const saveVolume = () => {
    if (!currentManga) return;

    const mangaVolumes = volumes[currentManga] || [];
    const newVolume = {
      ...formData,
      price: parseFloat(formData.price), // Garantir que seja número
    };

    setVolumes({
      ...volumes,
      [currentManga]: [...mangaVolumes, newVolume],
    });

    setCurrentManga(null); // Fechar o modal
  };

  // Calcular o total de volumes
  const calculateTotal = (mangaId) => {
    return (volumes[mangaId] || []).reduce((total, vol) => total + vol.price, 0).toFixed(2);
  };

  return (
    <div className="myspace">
      <header className="myspace-header">
        <h1 className="site-title">Catálogo de Mangás</h1>
        <button className="add-button" onClick={() => navigate('/searchmanga')}>
          ADICIONAR
        </button>
      </header>

      <main>
        <section className="list-section">
          <h2>MINHA LISTA</h2>
          {collections.length === 0 ? (
            <p>Sua lista está vazia. Adicione mangás à sua coleção!</p>
          ) : (
            <div className="manga-list-myspace">
              {collections.map((manga) => (
                <div key={manga.mal_id} className="manga-card-myspace">
                  <div className="manga-item-myspace">
                    <img src={manga.images.jpg.large_image_url} alt={manga.title} />
                    <div className="manga-info-myspace">
                      <h3>{manga.title}</h3>
                      <p>Rank: {manga.rank || 'Sem descrição disponível.'}</p>
                      <p>Popularidade: {manga.popularity || 'Sem descrição disponível.'}</p>
                    </div>
                  </div>

                  {/* Volumes e Total */}
                  <div className="volumes-myspace">
                    <h4>Volumes:</h4>
                    <ul>
                      {(volumes[manga.mal_id] || []).map((vol, index) => (
                        <li key={index}>
                          Volume No. {vol.volume}: {vol.name} - R$ {vol.price.toFixed(2)} ({vol.date}) - Situação: {vol.status}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> R$ {calculateTotal(manga.mal_id)}</p>
                    <button onClick={() => openForm(manga.mal_id)}>Adicionar Volume</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal Formulário */}
      {currentManga && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Adicionar Volume</h3>
            <label>
              Número do Volume:
              <input
                type="text"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              />
            </label>
            <label>
              Nome do Volume:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
            <label>
              Data da Compra:
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </label>
            <label>
              Valor:
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </label>
            <label>
              Situação:
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Lacrado">Lacrado</option>
                <option value="Lendo">Lendo</option>
                <option value="Lido">Lido</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={saveVolume}>Salvar</button>
              <button onClick={() => setCurrentManga(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySpace;
