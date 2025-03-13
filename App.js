import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './App.css';

// OpenWeather API key
const apiKey = "f04b45d97a6042a9c54715322e04345a";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("url('/images/default-bg.jpg')"); // Default background image

  // for Fetching weather data
  const fetchWeatherData = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);

      // Set background image 
      setBackgroundImage(getWeatherBackground(response.data.weather[0].main));

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  }, [city]);

  // Function to set the background images
  const getWeatherBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "url('/images/sunny.jpg')";
      case "Clouds":
        return "url('/images/cloudy.jpg')";
      case "Rain":
        return "url('/images/rainy.jpg')";
      case "Snow":
        return "url('/images/snowy.jpg')";
      default:
        return "url('/images/default-bg.jpg')";
    }
  };

  // Apply the background to the body whenever the backgroundImage state changes
  useEffect(() => {
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed"; 
  }, [backgroundImage]);

  useEffect(() => {
   
    if (city === "") {
      setBackgroundImage("url('/images/default-bg.jpg')"); 
    }
  }, [city]);

  return (
    <div className="App">
      <div className="overlay"></div>
      <div className="container">
        <h1>Weather App</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchWeatherData()}
          />
          <button onClick={fetchWeatherData}>Get Weather</button>
        </div>

        {loading && <div className="spinner">Loading...</div>}

        {error && <p className="error">{error}</p>}

        {weatherData && !loading && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <div className="weather-condition">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="weather-icon"
              />
              <p>{weatherData.weather[0].description}</p>
            </div>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
