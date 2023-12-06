import React, { Component, useState, useEffect } from 'react';
import './experience.css';

const Experience = () => {

  const [experience, setExperience] = useState([])

  useEffect(() => {
    fetch("/paths/experiences")
      .then(response => response.json())
      .then(experience => setExperience(experience))
      .catch(error => console.error('Error fetching data:', error));
      console.log('hey!')
  }, [])

  return (
    <div className='experience'>
      {Object.entries(experience).map(([key,value]) => (
        <p>{value}</p>
      ))}
    </div>
  );
}

export default Experience;