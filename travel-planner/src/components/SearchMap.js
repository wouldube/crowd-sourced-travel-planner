import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Custom icon setup
const customIcon = L.icon({
    iconUrl: '/icons/marker1.png',
    iconSize: [20, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});



const SearchMap = ({ experiences, setExpId }) => {
    const navigate = useNavigate();

    const goToExperience = (expId) => {
        setExpId(expId);
        navigate(`/experience`);
    };


    if (!experiences || experiences.length === 0) {
        return <div>Loading map...</div>;
    }
    // Default map
    const randomIndex = Math.floor(Math.random() * experiences.length);
    const position = [experiences[randomIndex].location.coordinates[1], experiences[randomIndex].location.coordinates[0]]; 

    return (
        <MapContainer 
            center={position} 
            zoom={10} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', minHeight: '400px' }}
        >
            <TileLayer
                url="https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=abce6a14428f49d49ef299b1016bf4b2"
                attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
            />
            {experiences.map((exp) => (
                <Marker
                    key={exp._id}
                    position={[exp.location.coordinates[1], exp.location.coordinates[0]]}
                    icon={customIcon}
                >
                    <Popup>
                        <div style={{ textAlign: 'center' }}>
                            <strong>{exp.title}</strong><br/>
                            <img 
                                src={exp.images[0]} 
                                alt={exp.title} 
                                style={{ maxWidth: '100%', maxHeight: '100px', cursor: 'pointer' }} 
                                onClick={() => goToExperience(exp._id)}
                            /><br/>
                            {exp.description}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default SearchMap;
