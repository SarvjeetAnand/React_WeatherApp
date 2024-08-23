import React, { useState, useEffect } from 'react';
import WeatherDetails from './WeatherDetails';
import WeatherForecast from './WeatherForecast';
import UnitToggle from './UnitToggle';
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Error from './Error';



export default function Main() {
    const [city, setCity] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [unit, setUnit] = useState('metric');
    let [error, setError] = useState(false);

    useEffect(() => {
        if (city) {
            fetchWeatherData(city, unit).then(data => setWeatherData(data));
            fetchForecastData(city, unit).then(data => setForecastData(data));
        }
    }, [city, unit]);

    const API_KEY = '019da0530bd3c89aff2248126daf5b30'; //API_KEY

    const fetchWeatherData = async (city, unit) => {
        let data;
        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
            data = await response.json();
            console.log(data);

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

    const fetchForecastData = async (city, unit) => {

        try {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
                .then((response) => {
                    let data = response.data.list.filter((sdg) =>
                        sdg.dt_txt.includes("18:00:00")
                    );


                    setForecastData(data);
                })

        } catch (error) {
            setError(true);
        }

    };

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

    let handleChange = (event) => {
        setCityInput(event.target.value);
    }


    return (
        <div className="app">
            <div className="app-content">
                <div className='SearchBox'>
                    <form onSubmit={handleCitySubmit}>
                        <h1 style={{ textAlign: "center" }}>Check Weather</h1>

                        <TextField id="City" label="City Name" variant="outlined" required value={cityInput} onChange={handleChange} />
                        <br />
                        <br />
                        <Button variant="contained" type='submit' >Search</Button>
                    </form>
                    {error && <Error/>}
                    <UnitToggle unit={unit} setUnit={setUnit} />
                    {weatherData && <WeatherDetails {...weatherData} unit={unit} />}
                </div>
                {forecastData && <WeatherForecast forecastData={forecastData} unit={unit} />}
            </div>
        </div >
    );
};
