import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import ContratacaoForm from "./components/ContratacaoForm";

function App() {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // Stores the search input
  const [filteredArtists, setFilteredArtists] = useState([]); // Stores the search results
  const [accessToken, setAccessToken] = useState(null); // Stores the Spotify API token
  const [loading, setLoading] = useState(false); // Loading state for search
  const [artistaSelecionado, setArtistaSelecionado] = useState(null); // Stores selected artist
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
      console.error('Error fetching token:', error);
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

      if (!response.ok) throw new Error("Error fetching artists");

      const data = await response.json();
      setFilteredArtists(data.artists.items);
    } catch (error) {
      console.error("Error:", error);
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
        console.error('Failed to obtain token');
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-5">
      {/* Search Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 text-center">
          <h1 className="display-4 mb-4">Search Artists</h1>
          <div className="search-container d-flex gap-2 justify-content-center mb-3">
            <input
              type="text"
              className="form-control form-control-lg w-75"
              placeholder="Enter artist name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} btn-lg`}
              onClick={searchArtists} 
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Artists List */}
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
                    Hire
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted fs-5">No artists found.</p>
          </div>
        )}
      </div>

      {/* Hiring Form */}
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
