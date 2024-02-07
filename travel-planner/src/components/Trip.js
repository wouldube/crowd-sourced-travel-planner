import { React, useEffect, useState, } from 'react';
import TripExperience from "./TripExperience";
import { useNavigate } from 'react-router-dom';

const Trip = ({tripObject}) => {
    /* Trip Data & Experiences */
    const [experiences, setExperiences] = useState([]);
    
    useEffect( () => { 
        const getExperiences = async() => {
            try {
            const data = await fetch(`http://localhost:5000/trip/experiences/${tripObject._id}`)
            const experiences = await data.json()
            setExperiences(experiences)
            } catch(error) { console.error('Error fetching data:', error) }
        }
        getExperiences() }, [])

    /* Adjustments */
    const deleteTrip = async () => {
        try {
            await fetch(`http://localhost:5000/delete-trip/${tripObject._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tripObject)
            })
        } catch(error) { console.error('Error Deleting Trip:', error) }
        navigate(`/trips`)
    }
    
    /* Navigation */
    const [component, which] = useState(0);
    const navigate = useNavigate()

    return (
        <div className="TripMap">
            <h3>{tripObject.title}</h3>
            <button onClick={() => {navigate(`update-trip`)}}>Edit?</button>
            <button onClick={() => {deleteTrip()}}>Delete!</button>
            {component === 0 && (
                <>
                {experiences.map((exp, index) => (
                    <div key={index} className="TripsTrip">
                        <button onClick={()=>which(1)}>{exp.title}</button>
                        <p>{exp.description}</p>
                    </div>
                ))}
                </>
            )}
            {component === 1 && (
                <>
                <TripExperience/>
                <button onClick={()=>which(0)}>X</button>
                </>
            )}
        </div>
    )
}

export default Trip;