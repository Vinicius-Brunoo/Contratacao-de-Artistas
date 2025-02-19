import React, { useState } from 'react';
import { buscarArtistas } from '../api';

const ArtistasList = ({ onSelecionarArtista }) => {
  const [nome, setNome] = useState('');
  const [artistas, setArtistas] = useState([]);

  const handleBuscar = async () => {
    const dados = await buscarArtistas(nome);
    setArtistas(dados.artists?.items || []);
  };

  return (
    <div>
      <h2>Buscar Artistas</h2>
      <input 
        type="text" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        placeholder="Digite o nome do artista" 
      />
      <button onClick={handleBuscar}>Buscar</button>
      
      <ul>
        {artistas.map((artista) => (
          <li key={artista.id}>
            {artista.name} 
            <button onClick={() => onSelecionarArtista(artista)}>Selecionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistasList;
