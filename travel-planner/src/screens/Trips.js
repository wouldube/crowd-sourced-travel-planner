import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Trips = ({setTripObject}) => {
    /* Trips */
    const [trips, setTrips] = useState([]);

    const getTrips = async () => {
        try {
        const data = await fetch("http://localhost:5000/trips/65b57e2b37f5c24ce79c5b6e")
        const trips = await data.json()
        setTrips(trips)
        } catch(error) { console.error('Error fetching data:', error) }
    }
    useEffect( () => { getTrips() }, [])
    
    /* Navigation */
    const navigate = useNavigate()
    const TripClick = (trip) => {
        setTripObject(trip)
        navigate(`trip`)
    }

    return (
        <div className="Trips">
            <button onClick={() => {navigate(`create-trip`)}}>Plan a New One!!</button>
            {trips.map((trip, index) => (
                <div key={index} className="TripsTrip">
                    <button onClick={() => {TripClick(trip)}}>{trip.title}</button>
                    <p>{trip.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Trips;