import React, { Component, useState, useEffect } from 'react';
import './experience.css';

const Experience = () => {

  const [experience, setExperience] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/experiences", {
      method: "GET",
      body: response
    })
      .then(response => response.json())
      .then(experience => setExperience(experience))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <div className='experience'>
      {Object.entries(experience).map(([key,value]) => (
        <p>{key}</p>
      ))}
    </div>
  );
}

export default Experience;