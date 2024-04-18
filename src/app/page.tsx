"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

// Componente principal de la aplicación
export default function App() {
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);

  // Función para obtener la canción actual de la API de Spotify
  const getSong = async () => {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing');
    setSong(response.data.item.name);
  };

  // Función para obtener una imagen de la API de Unsplash basada en la canción actual
  const getImage = async () => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${song}`);
    setImage(response.data.results[0].urls.small);
  };

  // Utilizar useEffect para obtener la canción e imagen cuando el componente se monta y cada vez que la canción cambia
  return (
    <div>
      <h1>Now Playing: {song}</h1>
      {song && image && <img src={image} alt={song} />}
    </div>
  );
}