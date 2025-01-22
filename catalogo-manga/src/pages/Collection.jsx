import React from 'react';
import { useCollection } from '../context/CollectionContext.jsx';
import '../style/Collection.css';

const Collection = () => {
  const { collections } = useCollection();

  return (
    <div className="collection-page">
      <h1>Minha Coleção</h1>
      {collections.length === 0 ? (
        <p>Sua coleção está vazia. Adicione alguns mangás!</p>
      ) : (
        <div className="collection-grid">
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
    </div>
  );
};

export default Collection;
