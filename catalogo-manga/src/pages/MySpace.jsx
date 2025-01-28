import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../style/MySpace.css';

const MySpace = () => {
  const [collections, setCollections] = useState([]); // Coleção obtida do backend
  const [currentManga, setCurrentManga] = useState(null); // Mangá atualmente editado
  const [formData, setFormData] = useState({
    volume: '',
    name: '',
    date: '',
    price: '',
    status: 'Lacrado', // Valor padrão para a situação
  });

  // Função para buscar a coleção do usuário no backend
  useEffect(() => {
    const fetchCollections = async () => {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      try {
        const response = await fetch(`http://localhost:5000/api/mangas?userId=${userId}&listType=collection`);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('Erro ao buscar coleção:', error);
      }
    };

    fetchCollections();
  }, []);

    // Função para deletar um mangá
    const deleteManga = async (mangaId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/mangas/delete/${mangaId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setCollections((prev) => prev.filter((manga) => manga._id !== mangaId));
          alert('Mangá deletado com sucesso!');
        } else {
          alert('Erro ao deletar mangá.');
        }
      } catch (error) {
        console.error('Erro ao deletar mangá:', error);
      }
    };

  // Função para abrir o formulário modal
  const openForm = (mangaId) => {
    setCurrentManga(mangaId);
    setFormData({ volume: '', name: '', date: '', price: '', status: 'Lacrado' });
  };

  // Função para salvar o volume
  const saveVolume = async () => {
    if (!currentManga) return;

    const newVolume = {
      ...formData,
      price: parseFloat(formData.price), // Garantir que o preço seja um número
    };

    try {
      const response = await fetch('http://localhost:5000/api/mangas/add-volume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mangaId: currentManga,
          volume: newVolume,
        }),
      });

      if (response.ok) {
        const updatedManga = await response.json();
        setCollections((prev) =>
          prev.map((manga) =>
            manga._id === currentManga ? { ...manga, vols: updatedManga.manga.vols } : manga
          )
        );
        alert('Volume adicionado com sucesso!');
      } else {
        alert('Erro ao salvar volume.');
      }
    } catch (error) {
      console.error('Erro ao salvar volume:', error);
    }

    setCurrentManga(null); // Fechar o modal
  };

    // Função para calcular o total dos volumes de um mangá
    const calculateTotal = (volumes) => {
      return volumes.reduce((total, vol) => total + vol.price, 0).toFixed(2);
    };

  return (
    <div className="myspace">
      <Header />

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
                      <p><b>{manga.title_}</b></p>
                      <p>Rank: {manga.rank || 'Sem descrição disponível.'}</p>
                      <p>Popularidade: {manga.popularity || 'Sem descrição disponível.'}</p>
                    </div>
                    <div className="manga-info-myspace">
                      <p>Situação: {manga.status || 'Sem descrição disponível.'}</p>
                      <p>Início da publicação: {manga.published.from || '?'}</p>
                      <p>Término da publicação: {manga.published.to || '?'}</p>
                    </div>
                    <div className="manga-info-myspace">
                      <p>No. de volumes: {manga.volumes || '?'}</p>
                      <p>No. de capítulos: {manga.chapters || '?'}</p>
                    </div>
                  </div>

                  {/* Volumes e Total */}
                  <div className="volumes-myspace">
                    <h4>Volumes adquiridos:</h4>
                    <ul>
                      {manga.vols.map((vol, index) => (
                        <li key={index}>
                          Volume No. {vol.volume}: {vol.name} - R$ {vol.price.toFixed(2)} ({vol.date}) - Situação: {vol.status}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> R$ {calculateTotal(manga.vols)}</p>
                    <button onClick={() => openForm(manga._id)}>Adicionar Volume</button>
                    <button onClick={() => deleteManga(manga._id)} className="delete-button">Deletar</button>
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
