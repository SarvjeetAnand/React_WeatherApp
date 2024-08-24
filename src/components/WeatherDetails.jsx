
// This Component for Current Weather Details with OpenWeathericons.

import React from 'react';
export default function WeatherDetails({ city, temperature, minTemp, maxTemp, humidity, windSpeed, windDirection, description, icon, unit }){
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  
  return (
    <div className="weather-details">
      <h2>Weather in {city}</h2>
      <h3>{temperature}{unitSymbol}</h3>
      <div className="weather-main">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        <p>{description}</p>
      </div>

        {/* Fetching All Necessary Data */}

      <div className="weather-info">
        <p>Min: {minTemp}{unitSymbol}</p>
        <p>Max: {maxTemp}{unitSymbol}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {windSpeed} {unit==='metric'?'m/s':'mile/h'}, {windDirection}°</p>
      </div>
    </div>
  );
};

