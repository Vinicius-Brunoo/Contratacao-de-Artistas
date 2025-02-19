import React from "react";

function Login() {
  const handleLogin = () => {
    const clientId = '097d6b90a9014f37a6b47c609596f95c';
    const redirectUri = 'http://localhost:5173'; 
    const scopes = 'user-read-private user-read-email'; // Escopos de permissão

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Bem-vindo à Contratação de Artistas</h1>
      <p>Por favor, faça login com o Spotify para continuar.</p>
      <button onClick={handleLogin}>Login com Spotify</button>
    </div>
  );
}

export default Login;