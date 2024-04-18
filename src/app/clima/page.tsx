"use client"
// pages/index.js

import React, { useState } from 'react';

const WeatherForecast = () => {
    // const [location, setLocation] = useState('');
    const [location, setLocation] = useState([]);
    const [forecast, setForecast] = useState([]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const getWeatherData = async () => {
        try {
            // Reemplaza '<api_key>' con tu clave de API de WeatherAPI
            const apiKey = '8a582c538e304df4a12122022241804';
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;

            const response = await fetch(apiUrl);
            const data = await response.json();
            setForecast(data.forecast.forecastday);
            // setLocation(data.location.lat);
        } catch (error) {
            console.error('Error fetching weather data:', error);
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
            <button onClick={getWeatherData}>Buscar</button>

            <ul>
                {forecast.map((day) => (
                    <li key={day.date}>
                        <p>Fecha: {day.date}</p>
                        <p>Temperatura Máxima: {day.day.maxtemp_c}°C</p>
                        <p>Temperatura Mínima: {day.day.mintemp_c}°C</p>
                        {/* <p>Latitud: {forecast.length > 0 && forecast[0].location && forecast[0].location.lat}</p> */}

                    </li>

                ))}

            </ul>
        </div>
    );
};

export default WeatherForecast;
