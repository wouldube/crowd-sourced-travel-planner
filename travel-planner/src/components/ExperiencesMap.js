import React, { Component, useState, useEffect } from 'react';
import './experience.css';

const ExperiencesMap = () => {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/experiences")
      .then(response => response.json())
      .then(experiences => setExperiences(experiences))
      .catch(error => console.error('Error fetching data:', error));
  }, [])
            /*<p>Image: {exp.images[0]}</p>*/

  return (
    <div className="ExperiencesMap">
      {experiences.map((exp, index) => (
        <div key={index} class="Experience">
          <h3>{exp.title}</h3>
          <p>{exp.description}</p>
          <p>{exp.location.coordinates[0]}, {exp.location.coordinates[1]}</p>
      </div>
    ))}
      <div class="Experience AnExperience">
          <h3>Hoh Rainforest Hike</h3>
          <p>Hike the Hoh Rainforest in Olympic National Park on this mesmerizing trail. The towering trees draped in lush moss 
              create a magical and serene trail experience.</p>
          <p>X,Y</p>
      </div>
  </div>
);
}

export default ExperiencesMap;
