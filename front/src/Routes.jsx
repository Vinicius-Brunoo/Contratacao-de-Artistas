import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import ArtistasCadastrados from "./components/ArtistasCadastrados";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="/artistas-cadastrados" element={<ArtistasCadastrados />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;