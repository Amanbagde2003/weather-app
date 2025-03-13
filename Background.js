import React from 'react';

const Background = ({ weather }) => {
  const weatherConditions = {
    Clear: 'sunny.jpg',
    Rain: 'rainy.jpg',
    Clouds: 'cloudy.jpg',
    Snow: 'snowy.jpg',
    Drizzle: 'drizzle.jpg',
  };

  const backgroundImage = weatherConditions[weather] || 'default.jpg'; // Fallback to default

  return <div className="background" style={{ backgroundImage: `url(background-images/${backgroundImage})` }} />;
};

export default Background;
