import React, { useState, useEffect } from "react";
import "../style.css";
import axios from "axios";

function Home() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState([]); // Tilføjet state for vejrudsigt
  const [location, setLocation] = useState(""); // tilføjet state for lokation
  const [error, setError] = useState(null);

  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=da&appid=11c67fcb11c6719d9e09c7c7cf06d4a7&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=da&appid=11c67fcb11c6719d9e09c7c7cf06d4a7&units=metric`;

  useEffect(() => {
    const savedLocation = localStorage.getItem("savedLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      if (!/^[a-zA-ZæøåÆØÅ]+$/.test(location)) {
        setError(
          "Denne by findes ikke. Du må ikke bruge specialtegn eller tal"
        );
        return;
      }
      try {
        const response = await axios.get(currentURL);
        setData(response.data);
        setError(null);
        localStorage.setItem("savedLocation", location);

        // Hent 5-dages vejrudsigt når lokationen søges
        const forecastResponse = await axios.get(forecastURL);
        setForecastData(forecastResponse.data.list);
      } catch (error) {
        setError("Kunne ikke hente vejrdata. Denne by eksisterer ikke.");
      }

      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Indtast lokation"
          type="text"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          {data.weather && (
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather-icon"
              />
            </div>
          )}
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p className="weather">{data.weather[0].description}</p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="box">
              <p>Føles som</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}ºC</p>
              ) : null}
            </div>
            <div className="box">
              <p>Luftfugtighed</p>
              {data.main ? (
                <p className="bold">{data.main.humidity.toFixed()}%</p>
              ) : null}
            </div>
            <div className="box">
              <p>Vindhastighed</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Vis 5-dages vejrudsigt kun hvis der er data til rådighed */}
      {forecastData.length > 0 && (
        <div className="forecast-container">
          {forecastData.map((item, index) => (
            <div key={index} className="forecast-item">
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather-icon"
              />
              <p>{item.dt_txt}</p>
              <p>{item.main.temp.toFixed()}°C</p>
              {item.weather ? (
                <p className="weather">{item.weather[0].description}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
