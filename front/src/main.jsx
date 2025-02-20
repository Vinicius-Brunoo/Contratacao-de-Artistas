import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // Página principal de pesquisa de artistas
import ContratacaoForm from "./components/ContratacaoForm"; // Formulário de contratação
import Sucesso from "./Sucesso"; // Página de sucesso após contratação
import Contratacoes from "./components/Contratacoes"; // Página de consulta de contratações

function Main() {
  return (
    <Router>
      <Routes>
        {/* Rota principal (pesquisa de artistas) */}
        <Route path="/" element={<App />} />

        {/* Rota do formulário de contratação */}
        <Route path="/contratar" element={<ContratacaoForm />} />

        {/* Rota de sucesso após contratação */}
        <Route path="/sucesso" element={<Sucesso />} />

        {/* Rota de consulta de contratações */}
        <Route path="/contratacoes" element={<Contratacoes />} />
      </Routes>
    </Router>
  );
}

export default Main;