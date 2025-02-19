import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Troca o código por um token
      getToken(code).then(data => {
        localStorage.setItem('spotifyAccessToken', data.access_token);
        localStorage.setItem('spotifyRefreshToken', data.refresh_token);
        localStorage.setItem('spotifyTokenExpiration', Date.now() + data.expires_in * 1000);

        // Redireciona o usuário para a página principal
        navigate('/');
      });
    }
  }, [navigate]);

  // Função para trocar o código por um token
  const getToken = async (code) => {
    const clientId = '097d6b90a9014f37a6b47c609596f95c'; // Substitua pelo seu Client ID
    const clientSecret = 'efa81cc7e99b4e46ab5cd6584ca33a3d'; // Substitua pelo seu Client Secret
    const redirectUri = 'http://localhost:5173/';

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    return await response.json();
  };

  return (
    <div>
      <p>Processando login...</p>
    </div>
  );
}

export default Callback;