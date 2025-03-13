import React from 'react';

const WeatherIcon = ({ weather }) => {
  const iconUrl = `/icons/${weather.toLowerCase()}.svg`; // Assuming icons are named by weather condition

  return <img src={iconUrl} alt={weather} className="weather-icon" />;
};

export default WeatherIcon;
