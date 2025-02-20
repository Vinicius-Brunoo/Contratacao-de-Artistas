import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // Main artist search page
import ContratacaoForm from "./components/ContratacaoForm"; // Hiring form
import Sucesso from "./Sucesso"; // Success page after hiring
import Contratacoes from "./components/Contratacoes"; // Hiring inquiry page

function Main() {
  return (
    <Router>
      <Routes>
        {/* Main route (artist search) */}
        <Route path="/" element={<App />} />

        {/* Hiring form route */}
        <Route path="/contratar" element={<ContratacaoForm />} />

        {/* Path to success after hiringo */}
        <Route path="/sucesso" element={<Sucesso />} />

        {/* Hiring inquiry route */}
        <Route path="/contratacoes" element={<Contratacoes />} />
      </Routes>
    </Router>
  );
}

export default Main;