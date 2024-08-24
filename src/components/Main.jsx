import React, { useState, useEffect } from 'react';
import WeatherDetails from './WeatherDetails';
import WeatherForecast from './WeatherForecast';
import UnitToggle from './UnitToggle';
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Error from './Error';


// Main function

export default function Main() {

    // Defined USeStates variables for funtions updations.

    const [city, setCity] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [unit, setUnit] = useState('metric');
    const [error, setError] = useState(false);

    // Defined useEffect for fetching data & updating the DOM

    useEffect(() => {
        if (city) {
            fetchWeatherData(city, unit).then(data => setWeatherData(data));
            fetchForecastData(city, unit).then(data => setForecastData(data));
        }
    }, [city, unit]);

    const API_KEY = '019da0530bd3c89aff2248126daf5b30'; //OpenWeather API_KEY

    // Fetch Current Weather Data from Openweather API using Asynchronous function

    const fetchWeatherData = async (city, unit) => {
        let data;
        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
            data = await response.json();

            // Fetching Important Data from API

            let result = {
                city: city,
                temperature: data.main.temp,
                minTemp: data.main.temp_min,
                maxTemp: data.main.temp_max,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like,
                weather: data.weather[0].description,
                windSpeed: data.wind.speed,
                windDirection: data.wind.deg,
                icon: data.weather[0].icon,
                description: data.weather[0].description,


            }
            return result;

        } catch (error) {
            setError(true);
            return data;
        }
    };

    // Fetching 5 day Forecast Data from OpenWeather API using asynchronous function and Axios.

    const fetchForecastData = async (city, unit) => {

        try {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setForecastData(data.list);
                })

        } catch (error) {
            setError(true);
        }

    };

    // UseEffect For Average Temparature

    useEffect(() => {
        if (forecastData.length > 0) {
            calculateAverageTemp();
        }
    }, [forecastData]);

    // Fucntion for Calculating Average Temparature of 5 days forecast.

    const calculateAverageTemp = () => {
        let totalTemp = 0;
        let count = 0;

        forecastData.forEach(entry => {
            totalTemp += entry.main.temp;
            count += 1;
        });

        const average = totalTemp / count;
        setAverageTemp(average.toFixed(2));
    };


    // Handle City Submittion and error.

    const handleCitySubmit = (e) => {
        e.preventDefault();
        fetchWeatherData(cityInput, unit)
            .then(data => {

                if (data.cod === "404") {
                    // alert(data.message);
                } else {
                    setCity(cityInput);
                }
            });
    };

    // Handle Event

    let handleChange = (event) => {
        setCityInput(event.target.value);
    }


    // For Search Box and returns Anothers Components

    return (
        <div className="app">
            <div className="app-content">
                <div className='SearchBox'>

                    {/* Form for Search Box */}

                    <form onSubmit={handleCitySubmit}>
                        <h1 style={{ textAlign: "center" }}>Check Weather</h1>

                        <TextField id="City" label="City Name" variant="outlined" required value={cityInput} onChange={handleChange} />
                        <br />
                        <br />
                        <Button variant="contained" type='submit' >Search</Button>
                    </form>

                    {/* Error Component for ERROR Handling */}

                    {error && <Error />}

                    {/* Toggle Component For Toggle Fahrenheit and Celsius */}

                    <UnitToggle unit={unit} setUnit={setUnit} />

                    {/* Weather Data Component for current Weather */}

                    {weatherData && <WeatherDetails {...weatherData} unit={unit} />}
                </div>

                {/* Forecast Data Component For 5 Days forecast */}

                {forecastData && <WeatherForecast forecastData={forecastData} unit={unit} />}
            </div>
        </div >
    );
};
