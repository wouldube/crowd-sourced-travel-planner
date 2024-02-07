import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateTrip = ({tripObject}) => {
    /* Data & Experiences */
    const [title, setTitle] = useState(tripObject.title)
    const [description, setDescription] = useState(tripObject.description)
    const [image, setImage] = useState(tripObject.image)
    const [experiences, setExperiences] = useState([])
    
    const [allExperiences, setAllExperiences] = useState([]);
    useEffect( () => { 
        const getExperiences = async() => {
            try {
                const data = await fetch("http://localhost:5000/my-experiences/65b57e2b37f5c24ce79c5b6e")
                const experiences = await data.json()
                setAllExperiences(experiences)
            } catch(error) { console.error('Error fetching data:', error) }
        }
        getExperiences() }, [])

    /* UpdateTrip Done */
    const SaveTrip = async () => {
        try {
            const trip = {
                title:title,
                description:description,
                image:image,
                experiences:experiences
            }
            await fetch(`http://localhost:5000/update-trip/${tripObject._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trip)
            })
        } catch(error) { console.error('Error Saving Trip:', error) }
        navigate(`/trips`)
    }

    /* Navigation */
    const navigate = useNavigate()

    return (
        <div>
            <div>
            <input
                id="title" type="text" required
                placeholder="Title" value={title}
                onChange={(e) => {setTitle(e.target.value)}}
            /><br/>
            <input
                id="description" type="text"
                placeholder="Description" value={description}
                onChange={(e) => setDescription(e.target.value)}
            /><br/>
            <input
                id="image" type="text"
                placeholder="images" value={image}
                onChange={(e) => setImage(e.target.value)}
            /><br/>
            <button onClick={SaveTrip} className="explore-button">Update</button>
            </div>

            <div>
            <p>Add some of your experiences to the trip!</p>
            {allExperiences.map((exp, index) => (
                <div key={index} className="TripsTrip">
                    <h3>{exp.title}</h3>
                    <p>{exp.description}</p>
                    <button onClick={() => {setExperiences([...experiences, exp])}}>+</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default UpdateTrip;