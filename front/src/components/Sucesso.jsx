import React from "react";
import { useNavigate } from "react-router-dom";

function Sucesso() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Contratação realizada com sucesso!</h1>
      <button onClick={() => navigate("/")}>Voltar à página inicial</button>
      <button onClick={() => navigate("/contratacoes")}>Ver contratações</button>
    </div>
  );
}

export default Sucesso;