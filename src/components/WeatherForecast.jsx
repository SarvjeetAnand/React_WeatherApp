import React from 'react';

export default function WeatherForecast ({ forecastData, unit }){
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="weather-forecast">
      <h2 style={{ textAlign: "center" }}>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastData.map((day) => (
          <div key={day.dt} className="forecast-day">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
            <p>{Math.round(day.main.temp)}{unitSymbol}</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
