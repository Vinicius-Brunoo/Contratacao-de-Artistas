import React, { useState, useEffect } from "react";
import "./App.css";
import FormularioContratacao from "./components/FormularioContratacao";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [artistaSelecionado, setArtistaSelecionado] = useState(null);

  const searchArtists = async () => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) throw new Error("Erro ao buscar artistas");

      const data = await response.json();
      setFilteredArtists(data.artists.items);
    } catch (error) {
      console.error("Erro:", error);
      setFilteredArtists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (token) setAccessToken(token);
  }, []);

  return (
    <div className="container">
      <h1>Pesquisar Artistas</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome do artista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchArtists} disabled={loading}>
          {loading ? "Pesquisando..." : "Pesquisar"}
        </button>
      </div>

      <div className="results-grid">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <img
                src={artist.images[0]?.url || "https://via.placeholder.com/150"}
                alt={artist.name}
              />
              <p>{artist.name}</p>
              <button onClick={() => setArtistaSelecionado(artist)}>Contratar</button>
            </div>
          ))
        ) : (
          <p>Nenhum artista encontrado.</p>
        )}
      </div>

      {artistaSelecionado && (
        <FormularioContratacao
          artistaSelecionado={artistaSelecionado}
          onClose={() => setArtistaSelecionado(null)}
        />
      )}
    </div>
  );

  const contratarArtista = async (artista) => {
    const nomeContratante = prompt("Digite seu nome para contratar o artista:");
    const cache = prompt("Digite o cachê (opcional):");
    const dataEvento = prompt("Digite a data do evento (YYYY-MM-DD):");
    const endereco = prompt("Digite o endereço (opcional):");
  
    if (!nomeContratante || !dataEvento) {
      alert("Nome e data do evento são obrigatórios.");
      return;
    }
  
    const dados = {
      nome: nomeContratante,
      artista: artista.name,
      cache: cache || null,
      data_evento: dataEvento,
      endereco: endereco || null,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/contratar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
  
      const resultado = await response.json();
      alert(resultado.message);
    } catch (error) {
      console.error("Erro ao contratar artista:", error);
      alert("Erro ao contratar o artista.");
    }
  };
  

}

export default App;
