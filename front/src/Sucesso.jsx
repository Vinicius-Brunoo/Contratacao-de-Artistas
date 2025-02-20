import React from "react";
import { useNavigate } from "react-router-dom";

function Sucesso() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5 bg-white rounded shadow-sm">
        <h1 className="display-4 text-success mb-4">Contratação realizada com sucesso!</h1>
        <p className="lead mb-4">Obrigado por escolher nossos serviços. Agora você pode:</p>
        <div className="d-grid gap-3 d-md-block">
          <button
            className="btn btn-primary btn-lg me-md-3"
            onClick={() => navigate("/")}
          >
            Voltar à página inicial
          </button>
          
          <button
            className="btn btn-outline-success btn-lg"
            onClick={() => navigate("/contratacoes")}
          >
            Ver contratações
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sucesso;