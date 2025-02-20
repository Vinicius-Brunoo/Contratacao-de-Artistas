import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContratacoes } from '../services/api';

function ArtistasCadastrados() {
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buscarArtistasCadastrados();
  }, []);

  const buscarArtistasCadastrados = async () => {
    try {
      setLoading(true);
      const response = await getContratacoes();
      setArtistas(response.data);
    } catch (err) {
      setError('Erro ao carregar artistas cadastrados: ' + (err.response?.data?.message || err.message));
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleDetalhes = (artistaId) => {
    if (artistaId) {
      navigate(`/artista/${artistaId}`);
    } else {
      console.error('ID do artista inválido');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleVoltar}>
          Voltar
        </button>
      </div>
    );
  }

  const ArtistasLista = ({ artistas }) => (
    <div className="row g-4">
      {artistas.map((artista) => (
        <div key={artista.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img
              src={artista.artist?.images[0]?.url || "https://via.placeholder.com/150"}
              className="card-img-top"
              alt={artista.artist?.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{artista.artist?.name}</h5>
              <p className="card-text">
                <small className="text-muted">Local: {artista.local}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Data: {artista.data ? new Date(artista.data).toLocaleDateString() : 'Data não disponível'}
                </small>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success">Contratado</span>
                <small className="text-muted">Valor: R$ {artista.valor}</small>
              </div>
            </div>
            <div className="card-footer bg-transparent border-top-0">
              <button
                className="btn btn-primary w-100"
                onClick={() => handleDetalhes(artista.id)}
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Artistas Cadastrados</h1>
        <button className="btn btn-outline-primary" onClick={handleVoltar}>
          Voltar
        </button>
      </div>

      {artistas.length === 0 ? (
        <div className="text-center">
          <p className="fs-5 text-muted">Nenhum artista cadastrado ainda.</p>
        </div>
      ) : (
        <ArtistasLista artistas={artistas} />
      )}
    </div>
  );
}

export default ArtistasCadastrados;