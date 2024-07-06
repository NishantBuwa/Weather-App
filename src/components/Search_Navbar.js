import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import './Card.css'

export default function Search_Navbar() {
    const [city, setCity] = useState(''); 
    const [weatherData, setWeatherData] = useState(null);
    const [searchedCity, setSearchedCity] = useState('Delhi'); 

    const API_KEY = '2ddddaf43ef2bae00a5f3df2cc2dd620';

   
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleApiCall(city);
    };

    const making_url = (cityName) => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},91&limit=1&appid=${API_KEY}`;
        return url;
    };

    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`API call failed with error`);
            return null;
        } else {
            const data = await response.json();
            return data;
        }
    }

    const handleApiCall = (cityName) => {
        if (!cityName) {
            console.error('Please enter a city name');
            return;
        }
        const final_url = making_url(cityName);
        fetchData(final_url)
            .then(data => {
                if (data && data.length > 0) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    weather_api_call(latitude, longitude, cityName);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        handleApiCall('Delhi');
    }, [handleApiCall]);

    const weather_api_call = async (latitude, longitude, cityName) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log('API failed');
            return;
        }
        const data = await response.json();
        setWeatherData({
            temp: data.main.temp,
            wind_speed: data.wind.speed,
            humidity: data.main.humidity,
            main: data.weather[0].main,
            description: data.weather[0].description,
            date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        });
        setSearchedCity(cityName);
    };

    return (
        <div>
            <div className="navbar-top">
                <nav className="navbar">
                    <div className="container-fluid my-3 justify-content-center">
                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2 custom-input"
                                type="search"
                                placeholder="Enter City Name"
                                aria-label="Search"
                                value={city}
                                onChange={handleCityChange} />
                            <button className="btn btn-outline-success my-2 my-sm-0 btn-custom" type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>
            {weatherData && (
                <Card
                    location={searchedCity.replace(/^\w/, c => c.toUpperCase())}
                    temp={weatherData.temp}
                    date={weatherData.date}
                    time={weatherData.time}
                    wind_speed={weatherData.wind_speed}
                    humidity={weatherData.humidity}
                    main={weatherData.main}
                    description={weatherData.description}
                />
            )}
        </div>
    );
}
