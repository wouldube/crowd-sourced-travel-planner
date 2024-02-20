import React, { useEffect, useState } from 'react';

const ExperienceList = () => {

    const [experiences, setAllExperiences] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/experiences")
          .then(response => response.json())
          .then(experiences => setAllExperiences(experiences))
          .catch(error => console.error('Error fetching data:', error));
      }, [])

    return (
        <div class="experinceListBody">
            <strong>More Experiences to Explore...</strong>
             <div class="experienceListContainer">
                 <div class="experienceListImage">
                    {experiences.map((allexp, index) => (
                        <div key={index} className="user-experiences-list">
                            <img src={allexp.image} alt=" "></img>
                            <div className="experiences-title-list"><strong>{allexp.title}</strong></div>
                            <div className="experiences-other-listtext">Location: {allexp.location.coordinates[0]}, {allexp.location.coordinates[1]}</div>
                            <div className="experiences-title-list">Posted By: {allexp.owner}</div>
                            {/* {allexp.reviews} */}
                            <div className="ratingImage">
                                <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img></div>
                            <div className="experiences-other-listtext">{allexp.description}</div>
                        </div>
                    ))};
                 </div>
           </div>
         </div>
        );
      }

export default ExperienceList;

