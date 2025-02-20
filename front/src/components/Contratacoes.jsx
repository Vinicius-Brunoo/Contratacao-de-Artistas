import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Contratacoes() {
  const [contratacoes, setContratacoes] = useState([]); // State to store fetched contracts
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchContratacoes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/contratacoes'); // Fetch contracts from API
        if (!response.ok) {
          throw new Error('Falha ao carregar contratações'); 
        }
        const data = await response.json();
        setContratacoes(data); // Store the fetched contracts in state
      } catch (err) {
        setError(err.message); // Capture and store the error message
      } finally {
        setLoading(false); // Ensure loading state is set to false after request
      }
    };

    fetchContratacoes(); // Fetch contracts on component mount
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger m-4" role="alert">
      Erro: {error}
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Contratações Realizadas</h1>
      <button 
        className="btn btn-primary mb-4" 
        onClick={() => navigate('/')}
      >
        Voltar à Tela Inicial
      </button>
      
      {contratacoes.length === 0 ? (
        <div className="alert alert-info text-center">
          Nenhuma contratação encontrada.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {contratacoes.map((contrato, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{contrato.nome}</h5>
                  <div className="card-text">
                    <p className="mb-2">
                      <i className="bi bi-person-fill me-2"></i>
                      <strong>Artista:</strong> {contrato.artista}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-cash me-2"></i>
                      <strong>Cachê:</strong> {contrato.cache || 'Não informado'}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-calendar-event me-2"></i>
                      <strong>Data:</strong> {new Date(contrato.dataEvento).toLocaleDateString()}
                    </p>
                    <p className="mb-0">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      <strong>Endereço:</strong> {contrato.endereco || 'Não informado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contratacoes;
