import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // Página principal de pesquisa de artistas
import ContratacaoForm from "./components/ContratacaoForm"; // Formulário de contratação
import Sucesso from "./components/Sucesso"; // Página de sucesso após contratação
import Contratacoes from "./components/Contratacoes"; // Página de consulta de contratações
import Login from "./components/Login"; // Página de login com Spotify
import Callback from "./components/Callback"; // Página de callback para troca de código por token

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

        {/* Rota de login com Spotify */}
        <Route path="/login" element={<Login />} />

        {/* Rota de callback (troca de código por token) */}
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default Main;