import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserExperiences({setExperienceToUpdate}) {

    const [experiences, setUserExperiences] = useState([]);
    const navigate = useNavigate();

    const onUpdate = (expId) => {

        setExperienceToUpdate(expId);
        navigate("/update-exp");

    }


    const loadExperience = () => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/UserExperiences")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://localhost:5000/my-experiences/${id}`)
            .then(response => response.json())
            .then(experiences => setUserExperiences(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadExperience();
    }, []);

    return (
        <div>
        <div className="MyExperiences" id="my-experiences">
            <div className="experinceListBody">
                <strong>Your experiences</strong>
                <div className="experienceListContainer">
                    <div className="experienceListImage">
                    {experiences.map((exp, index) => (
                        <div key={index} className="user-experiences-list">
                            <div className="experiences-title-list"><strong>{exp.title}</strong></div>
                            <div className="experiences-other-listtext">{exp.location.coordinates[0]}, {exp.location.coordinates[1]}</div>
                            <div className="ratingImage">
                                <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img></div>
                            <div className="experiences-other-listtext">{exp.description}</div>
                            {/* Need to work on update button */}
                            <button onClick={(e) => onUpdate(exp._id)}>Update</button>
                        </div>
                    ))};  
                    </div>
                </div>
                <button onClick={() => navigate('/create-exp')} className="button">Create New Experience</button>
           </div>
        </div> 
        </div>
    );
}

export default UserExperiences;