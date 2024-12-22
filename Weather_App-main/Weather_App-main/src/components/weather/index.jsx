import React, { useEffect } from "react";
import Search from "../search";
import { useState } from "react";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState();
  async function fetchWeatherData(param) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=b064cd6322b93c4ffd2f24ebea43fe50`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleSearch() {
    setLoading(true);
    fetchWeatherData(search);
    setLoading(false);
    setSearch("");
  }
  
useEffect(()=>{
  fetchWeatherData('Delhi')
},[])

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {
        loading? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {weatherData && (
              <div>
                <h1>{weatherData.name},<span>{weatherData?.sys?.country}</span></h1>
                <h1><span>{new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}</span></h1>
                <h2>{weatherData.weather[0].main}</h2>
                <h2>{weatherData.weather[0].description}</h2>
                <h2>{weatherData.main.temp}</h2>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}
