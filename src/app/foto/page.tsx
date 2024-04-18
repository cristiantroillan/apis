"use client"
import React, { useState } from 'react';

const clientId = 'U7UH-i5Et_JtU3nBRWqrGwYzwm3fMOObetZGr7stm1Y';
const endpoint = 'https://api.unsplash.com/search/photos';

export default function Home() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const search = () => {
    if (!query.trim()) {
      setError('Por favor, introduce un término de búsqueda válido.');
      return;
    }

    fetch(`${endpoint}?query=${query}&client_id=${clientId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud de búsqueda.');
        }
        return response.json();
      })
      .then(jsonResponse => {
        setImages(jsonResponse.results);
        setError('');
      })
      .catch(error => {
        console.error('Error en la solicitud de búsqueda:', error.message);
        setError('Error en la solicitud de búsqueda. Por favor, inténtalo de nuevo.');
      });
  };

  const trackQueryValue = (ev) => {
    setQuery(ev.target.value);
  };

  return (
    <div>
      <input type="text" className='text-black' onChange={trackQueryValue} />
      <button onClick={search}>Buscar</button>
      {error && <p>{error}</p>}
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.urls.thumb} alt="" />
        ))}
      </div>
    </div>
  );
}
