import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    /* Data & Experiences */
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [owner, setOwner] = useState('')
    const [experiences, setExperiences] = useState([])

    const [allExperiences, setAllExperiences] = useState([])
    
    useEffect( () => { 
        
        if (localStorage.getItem("id") === null) {
            // localStorage.setItem("path", "/trips/create-trip")
            navigate("/login")
        }

        const id = localStorage.getItem("id")
        setOwner(id)

        const getExperiences = async() => {
            try {
                console.log(owner)
                const data = await fetch(`http://localhost:5000/my-experiences/${id}`)
                const experiences = await data.json()
                setAllExperiences(experiences)
            } catch(error) { console.error('Error fetching data:', error) }
        }
        
        getExperiences() }, [])

    /* CreateTrip Done */
    const SaveTrip = async () => {
        try {
            const trip = {title, description, image, owner, experiences}
            await fetch(`http://localhost:5000/create-trip`, {
                method: "POST",
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
            <button onClick={SaveTrip} className="explore-button">Create</button>
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

export default CreateTrip;
