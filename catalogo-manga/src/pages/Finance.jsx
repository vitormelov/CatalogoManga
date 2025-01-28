import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../style/Finance.css';

const Finance = () => {
  const [collections, setCollections] = useState([]); // Coleções de mangás
  const [totalCost, setTotalCost] = useState(0); // Custo total de todas as coleções

  // Função para buscar as coleções do backend
  useEffect(() => {
    const fetchCollections = async () => {
      const token = localStorage.getItem('token'); // Obtém o token do usuário
      const userId = JSON.parse(atob(token.split('.')[1])).id; // Decodifica o ID do usuário do token

      try {
        const response = await fetch(`http://localhost:5000/api/mangas?userId=${userId}&listType=collection`);
        const data = await response.json();

        // Calcula o custo total para cada coleção de mangá
        const updatedCollections = data.map((manga) => {
          const totalMangaCost = manga.vols.reduce((sum, vol) => sum + vol.price, 0);
          return { ...manga, totalMangaCost };
        });

        setCollections(updatedCollections);

        // Calcula o custo total de todas as coleções
        const overallCost = updatedCollections.reduce((sum, manga) => sum + manga.totalMangaCost, 0);
        setTotalCost(overallCost);
      } catch (error) {
        console.error('Erro ao buscar coleções:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="finance">
      <Header />
      <main className="finance-main">
        <div className='finance-section'>
          <h2>Resumo Financeiro</h2>
          <p>Abaixo estão os custos totais de cada coleção e o valor acumulado de todas as coleções:</p>

          {/* Listagem das coleções */}
          <div className="finance-collections">
            {collections.length === 0 ? (
              <p>Sua lista de coleções está vazia.</p>
            ) : (
              <table className="finance-table">
                <thead>
                  <tr>
                    <th>Mangá</th>
                    <th>Número de Volumes</th>
                    <th>Custo Total (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((manga) => (
                    <tr key={manga.mal_id}>
                      <td>{manga.title}</td>
                      <td>{manga.vols.length}</td>
                      <td>R$ {manga.totalMangaCost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Valor total da coleção completa */}
          <div className="finance-total">
            <h3>Valor Total da Coleção Completa: R$ {totalCost.toFixed(2)}</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Finance;
