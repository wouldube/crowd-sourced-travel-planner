import React, { Component, useState, useEffect } from 'react';
import './experience.css';

const Experience = () => {

  const [experience, setExperience] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/experiences")
      .then(response => response.json())
      .then(experience => setExperience(experience))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <div className='experience'>
      {experience.map((exp, index) => (
        <div key={index}>
        <p>Title: {exp.title}</p>
        <p>Description: {exp.description}</p>
        <p>Geolocation: {exp.location.coordinates[0]}, {exp.location.coordinates[1]}</p>
        <p>Image: {exp.images[0]}</p>
      </div>
    ))}
  </div>
);
}

export default Experience;
