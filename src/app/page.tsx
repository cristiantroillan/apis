"use client"
import React, { useState } from 'react';

const clientId = 'U7UH-i5Et_JtU3nBRWqrGwYzwm3fMOObetZGr7stm1Y';
const weatherApiKey = '8a582c538e304df4a12122022241804';

const WeatherForecast = () => {
    const [location, setLocation] = useState('');
    const [forecast, setForecast] = useState([]);
    const [currentCondition, setCurrentCondition] = useState('');
    const [weatherImages, setWeatherImages] = useState([]);
    const [cityImages, setCityImages] = useState([]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const getWeatherData = async () => {
        try {
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=1`;

            const response = await fetch(apiUrl);
            const data = await response.json();
            setForecast(data.forecast.forecastday);
            setCurrentCondition(data.current.condition.text);

            // Después de obtener el pronóstico del tiempo, busca imágenes relevantes
            searchImages(data.current.condition.text, setWeatherImages);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const searchImages = async (query, setImageState) => {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}&per_page=5`);
            const data = await response.json();
            setImageState(data.results);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleSearch = () => {
        getWeatherData();
        searchImages(location, setCityImages);
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
            <button onClick={handleSearch}>Buscar</button>

            <ul>
                {forecast.map((day) => (
                    <li key={day.date}>
                        <p>Fecha: {day.date}</p>
                        <p>Temperatura Máxima: {day.day.maxtemp_c}°C</p>
                        <p>Temperatura Mínima: {day.day.mintemp_c}°C</p>
                        <p>Condición Actual: {currentCondition}</p>
                    </li>
                ))}
            </ul>

            <div>
                {weatherImages.map((image) => (
                    <img key={image.id} src={image.urls.thumb} alt="" />
                ))}
            </div>

            <div>
                {cityImages.map((image) => (
                    <img key={image.id} src={image.urls.thumb} alt="" />
                ))}
            </div>
        </div>
    );
};