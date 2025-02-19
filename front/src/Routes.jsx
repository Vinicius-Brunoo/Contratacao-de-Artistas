import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import App from "./App";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;