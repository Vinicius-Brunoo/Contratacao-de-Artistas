import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import ContratacaoForm from "./components/ContratacaoForm";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [artistaSelecionado, setArtistaSelecionado] = useState(null);
  const [showRegistered, setShowRegistered] = useState(false);
  const navigate = useNavigate();

  // Function to get Spotify API token
  const getSpotifyToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  };

  // Function to search for artists
  const searchArtists = async () => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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

  // Effect to trigger search with debounce
  useEffect(() => {
    if (searchTerm) {
      const delayDebounce = setTimeout(() => {
        searchArtists();
      }, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setFilteredArtists([]);
    }
  }, [searchTerm]);

  // Effect to initialize Spotify API token
  useEffect(() => {
    const initializeToken = async () => {
      const token = await getSpotifyToken();
      if (token) {
        setAccessToken(token);
      } else {
        console.error('Não foi possível obter o token');
      }
    };

    initializeToken();
  }, []);

  // Function to navigate to the hiring page
  const handleContratar = (artist) => {
    navigate('/contratar', { state: { artist } });
  };

  // Display loading message if accessToken is not yet available
  if (!accessToken) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 text-center">
          <h1 className="display-4 mb-4">Pesquisar Artistas</h1>
          <div className="search-container d-flex gap-2 justify-content-center mb-3">
            <input
              type="text"
              className="form-control form-control-lg w-75"
              placeholder="Digite o nome do artista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} btn-lg`}
              onClick={searchArtists}
              disabled={loading}
            >
              {loading ? "Pesquisando..." : "Pesquisar"}
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={artist.images[0]?.url || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={artist.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center mb-3">{artist.name}</h5>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleContratar(artist)}
                  >
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted fs-5">Nenhum artista encontrado.</p>
          </div>
        )}
      </div>

      <div>
        <button
          className="btn btn-outline-success btn-lg"
          onClick={() => navigate("/contratacoes")}
        >
          Ver contratações
        </button>
      </div>

      {artistaSelecionado && (
        <ContratacaoForm
          artist={artistaSelecionado}
          onSubmit={(data) => {
            console.log(data);
            setArtistaSelecionado(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
