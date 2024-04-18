// components/FoursquarePlaces.js
import axios from 'axios';

const FoursquarePlaces = ({ latitude, longitude }) => {
  // Llave de acceso a la API de Foursquare
  const clientId = 'VKRLKAKVM2OG2EWB2J4XZW15V20WLT0B5ZBGGRGQCWPDDD51';
  const clientSecret = 'D4NIJVBHCM0OJACL5QPSFUPD03RCJGPSXMVDGJV1MW4XSIVX';
  const version = '20220101'; // Versión de la API

  // Función para hacer la solicitud a la API de Foursquare
  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`https://api.foursquare.com/v2/venues/explore`, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          v: version,
          ll: `${latitude},${longitude}`, // Coordenadas de ubicación
          limit: 5, // Limita el número de lugares devueltos
        },
      });
      return response.data.response.groups[0].items;
    } catch (error) {
      console.error('Error fetching Foursquare places:', error);
      return [];
    }
  };

  return null; // No se renderiza nada en este componente, solo realiza la solicitud
};

export default FoursquarePlaces;
