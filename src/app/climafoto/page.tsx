"use client"
import React, { useState } from 'react';

const WeatherForecast = () => {
    const [location, setLocation] = useState('');
    const [forecast, setForecast] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const search = () => {
        if (!location.trim()) {
            setError('Por favor, introduce una ubicación válida.');
            return;
        }

        // Lógica para obtener datos del clima
        fetchWeatherData();

        // Lógica para obtener imágenes
        fetchImageData();
    };

    const fetchWeatherData = async () => {
        try {
            const apiKey = '8a582c538e304df4a12122022241804';
            const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;

            const response = await fetch(weatherApiUrl);
            const data = await response.json();
            setForecast(data.forecast.forecastday);
            setError('');
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error al obtener datos del clima. Por favor, inténtalo de nuevo.');
        }
    };

    const fetchImageData = () => {
        const clientId = 'U7UH-i5Et_JtU3nBRWqrGwYzwm3fMOObetZGr7stm1Y';
        const endpoint = 'https://api.unsplash.com/search/photos';

        const query = `${location} ciudad`; // Incluir la palabra "ciudad" en la búsqueda de imágenes

        fetch(`${endpoint}?query=${query}&client_id=${clientId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud de búsqueda de imágenes.');
                }
                return response.json();
            })
            .then(jsonResponse => {
                setImages(jsonResponse.results);
                setError('');
            })
            .catch(error => {
                console.error('Error en la solicitud de búsqueda de imágenes:', error.message);
                setError('Error en la solicitud de búsqueda de imágenes. Por favor, inténtalo de nuevo.');
            });
    };

    const getWeatherImageType = (maxTemp) => {
        // Determina el tipo de imagen basado en la temperatura máxima
        if (maxTemp > 24) {
            return "soleado";
        } else {
            return "invierno"; // Cambia esto por el tipo de imagen que desees mostrar para temperaturas menores o iguales a 24
        }
    };

    return (
        <div>
            <h1>Weather Forecast</h1>
            <input
                type="text"
                className='text-black'
                placeholder="Enter location (e.g., Diamante)"
                value={location}
                onChange={handleLocationChange}
            />
            <button onClick={search}>Buscar</button>

            {error && <p>{error}</p>}

            <ul>
                {forecast.map((day) => (
                    <li key={day.date}>
                        <p>Fecha: {day.date}</p>
                        <p>Temperatura Máxima: {day.day.maxtemp_c}°C</p>
                        <p>Temperatura Mínima: {day.day.mintemp_c}°C</p>
                    </li>
                ))}
            </ul>

            <div>
                {images.map((image) => (
                    // Aquí se utiliza la función getWeatherImageType para determinar el tipo de imagen
                    // Cambia la lógica aquí según tus necesidades para mostrar diferentes tipos de imágenes
                    <img key={image.id} src={getWeatherImageType(forecast[0]?.day.maxtemp_c) === "soleado" ? image.urls.sunny : image.urls.default} alt="" />
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
