import React from 'react';
import ImageCarousel from './ImageCarousel';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Travel-Planner!</h1>
      <p>A platform where travelers can share and discover unique, authentic travel experiences.</p>
      <p>focusing especially on lesser-known "hidden gems".</p>
      <ImageCarousel/>
    </div>
  );
}

export default Welcome;