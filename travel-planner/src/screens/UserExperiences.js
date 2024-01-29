import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserExperiences({ setUserExperienceToUpdate }) {

    const [experiences, setUserExperiences] = useState([]);
    const navigate = useNavigate();

    // Delete button stuff needed here

    // const onUpdate = experiences => {
    //     setUserExperienceToUpdate(experiences);
    //     navigate("/update-experiences")
    // }

    // const loadExperience = async () => {
    //     const response = await fetch('/my-experiences');
    //     const data = await response.json();
    //     setExperiences(data);
    // }

    const loadExperience = () => {
        fetch("http://localhost:5000/my-experiences/65b57e2b37f5c24ce79c5b6e")
            .then(response => response.json())
            .then(experiences => setUserExperiences(experiences), console.log(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadExperience();
        console.log(experiences)
    }, []);

    return (
    // <script> {experiences} </script>
         <div className="MyExperiences">
            <div className="experinceListBody">
                <strong>Your experiences</strong>
                <div className="experienceListContainer">
                    <div className="experienceListImage">
                    {experiences.map((exp, index) => (
                        <div key={index} className="user-experiences-list">
                            {/* {exp.title} */}
                            <div className="experiences-title-list"><strong>{exp.title}</strong></div>
                            <div className="experiences-other-listtext">{exp.location.coordinates[0]}, {exp.location.coordinates[1]}</div>
                            {/* Need to create experiences-other-owner in css file */}
                            {/* {exp.owner} */}
                            <div className="experiences-other-owner">{exp.owner}</div>
                            {/* {experiences.reviews} */}
                            <div className="ratingImage"><img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img></div>
                            {/* {exp.description} */}
                            <div className="experiences-other-listtext">{exp.description}</div>
                            {/* Need to work on update button */}
                            {/* <button onClick={updateExperience} className="explore-button">Create</button> */}
                        </div>
                    ))};  
                    </div>
                </div>
           </div>
        </div> 
    );
}

export default UserExperiences;