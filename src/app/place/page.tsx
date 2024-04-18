"use client"
// pages/index.js
import React, { useEffect } from 'react';
import FoursquarePlaces from '../../../components/FoursquarePlaces';

const IndexPage = () => {
  // Coordenadas de ubicación (por ejemplo, de un servicio de geolocalización)
  const latitude = 40.7128;
  const longitude = -74.0060;

  useEffect(() => {
    // Llama a la función fetchPlaces cuando el componente se monta
    const fetchPlaces = async () => {
      const places = await FoursquarePlaces({ latitude, longitude });
      console.log('Nearby places:', places);
      // Aquí puedes hacer algo con los lugares devueltos, como mostrarlos en tu página
    };
    fetchPlaces();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      {/* Puedes mostrar los lugares cercanos aquí si lo deseas */}
    </div>
  );
};

export default IndexPage;
