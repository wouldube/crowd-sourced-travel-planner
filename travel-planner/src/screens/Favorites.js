import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Favorites({ setUserFavorites }) {

    const [favorites, setFavorite] = useState([]);
    const navigate = useNavigate();

    // const onDelete = async _id => {
    //     const response = await fetch(`/my-favorites/${_id}`,{method: 'DELETE'});
    //     if (response.status === 204){
    //         const newFavorite = favorites.filter(m => m._id !== _id);
    //         setFavorite(newFavorite);
    //     } else {
    //         console.error(`Unable to remove favorite, status code = ${response.status}`);
    //     }
    // };

    // const loadFavorites = async () => {
    //     const response = await fetch('/my-favorites');
    //     const data = await response.json();
    //     setFavorite(data);
    // }

    const loadFavorites = () => {
        fetch("http://localhost:5000/my-favorites/65b57e2b37f5c24ce79c5b6e")
            .then(response => response.json())
            .then(favorites => setFavorite(favorites), console.log(favorites))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadFavorites();
        console.log(favorites)
    }, []);

    return (
         <div className="MyFavorites">
            <div className="experinceListBody">
                <strong>Your Favorited Experiences</strong>
                <div className="experienceListContainer">
                    <div className="experienceListImage">
                    {favorites.map((fav, index) => (
                        <div key={index} className="user-experiences-list">
                            <div className="experiences-title-list"><strong>{fav.title}</strong></div>
                            <div className="experiences-other-listtext">{fav.location.coordinates[0]}, {fav.location.coordinates[1]}</div>
                            <div className="experiences-other-owner">{fav.owner}</div>
                            {/* {favorites.reviews} */}
                            <div className="ratingImage">
                                <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img></div>
                            <div className="experiences-other-listtext">{fav.description}</div>
                            {/* Need to work on update button */}
                            {/* <button onClick={(onDelete)}> Remove </button> */}
                        </div>
                    ))};  
                    </div>
                </div>
           </div>
        </div> 
    );
}

export default Favorites;