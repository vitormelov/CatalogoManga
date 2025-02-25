import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../style/MySpace.css';

const MySpace = () => {
  const [collections, setCollections] = useState([]); // Coleção obtida do backend
  const [currentManga, setCurrentManga] = useState(null); // Mangá atualmente editado
  const [currentVolumeIndex, setCurrentVolumeIndex] = useState(null); // Índice do volume sendo editado
  const [formData, setFormData] = useState({
    volume: '',
    name: '',
    date: '',
    price: '',
    status: 'Lacrado', // Valor padrão para a situação
  });

  // 🟢 Buscar coleção do usuário corretamente
  useEffect(() => {
    const fetchCollections = async () => {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      try {
        // 🚀 Agora buscamos os mangás dentro do usuário
        const response = await fetch(`https://catalogomanga.onrender.com/api/users/${userId}/collection`);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('Erro ao buscar coleção:', error);
      }
    };

    fetchCollections();
  }, []);

// 🟢 Deletar um mangá da coleção do usuário
const deleteManga = async (mangaId) => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(atob(token.split('.')[1])).id;

  try {
    const response = await fetch(`https://catalogomanga.onrender.com/api/users/${userId}/delete-manga`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mangaId }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setCollections(updatedUser.mangas.filter((m) => m.listType === 'collection'));
      alert('✅ Mangá deletado com sucesso!');
    } else {
      alert('❌ Erro ao deletar mangá.');
    }
  } catch (error) {
    console.error('❌ Erro ao deletar mangá:', error);
  }
};

// 🟢 Abrir modal para adicionar ou editar volume
const openForm = (mangaId, volumeIndex = null) => {
  setCurrentManga(mangaId);
  setCurrentVolumeIndex(volumeIndex);

  if (volumeIndex !== null) {
    const selectedManga = collections.find((manga) => manga._id === mangaId);
    if (selectedManga) {
      setFormData({ ...selectedManga.vols[volumeIndex] });
    }
  } else {
    setFormData({ volume: '', name: '', date: '', price: '', status: 'Lacrado' });
  }
};

// 🟢 Salvar ou editar volume no MongoDB
const saveVolume = async () => {
  if (!currentManga) return;
  
  const token = localStorage.getItem('token');
  const userId = JSON.parse(atob(token.split('.')[1])).id;
  
  const newVolume = {
    ...formData,
    price: parseFloat(formData.price),
  };

  try {
    const response = await fetch(`https://catalogomanga.onrender.com/api/users/${userId}/update-volume`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mangaId: currentManga,
        volume: newVolume,
        volumeIndex: currentVolumeIndex,
      }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setCollections(updatedUser.mangas.filter((m) => m.listType === 'collection'));
      alert('✅ Volume salvo com sucesso!');
    } else {
      alert('❌ Erro ao salvar volume.');
    }
  } catch (error) {
    console.error('❌ Erro ao salvar volume:', error);
  }

  setCurrentManga(null);
  setCurrentVolumeIndex(null);
};

// 🟢 Deletar um volume dentro do usuário
const deleteVolume = async (mangaId, volumeIndex) => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(atob(token.split('.')[1])).id;

  try {
    const response = await fetch(`https://catalogomanga.onrender.com/api/users/${userId}/delete-volume`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mangaId, volumeIndex }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setCollections(updatedUser.mangas.filter((m) => m.listType === 'collection'));
      alert('✅ Volume deletado com sucesso!');
    } else {
      alert('❌ Erro ao deletar volume.');
    }
  } catch (error) {
    console.error('❌ Erro ao deletar volume:', error);
  }
};

// 🟢 Calcular o total dos volumes
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
                      <p><b>{manga.title}</b></p>
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
                          <button className='delete-volume-button' onClick={() => deleteVolume(manga._id, index)}>Deletar</button>
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> R$ {calculateTotal(manga.vols)}</p>
                    <button className='add-volume-button' onClick={() => openForm(manga._id)}>Adicionar Volume</button>
                    <button className="delete-manga-button" onClick={() => deleteManga(manga._id)}>Deletar Mangá</button>
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
            <h3>{currentVolumeIndex !== null ? 'Editar Volume' : 'Adicionar Volume'}</h3>
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
              <button onClick={() => { setCurrentManga(null); setCurrentVolumeIndex(null); }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySpace;
