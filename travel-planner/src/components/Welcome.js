import React from 'react';
import ImageCarousel from './ImageCarousel';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Crowd-Sourced-Travel-Planner!</h1>
      <h3>(name change pending)</h3>
      <p>A platform where travelers can share and discover unique, authentic travel experiences, focusing especially on lesser-known "hidden gems".</p>
      <ImageCarousel />
      <button className="explore-button">Explore Now</button>
    </div>
  );
}

export default Welcome;
