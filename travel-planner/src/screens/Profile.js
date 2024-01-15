import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/Buttons.js';


const Profile = () => {
    const [login, check] = useState(0);
    const [user, userinfo] = useState(0);
    
    const navigate = useNavigate();
    const account = () => {
        navigate('/account');
    };
    const UserExperiences = () => {
        navigate('/UserExperiences');
    };
    const favorites = () => {
        navigate('/favorites');
    };
    const ratings = () => {
        navigate('/ratings');
    };
    const trips = () => {
        navigate('/trips');
    };

    // login check
    /*useEffect(() => {
        fetch("http://localhost:5000/smthn")
            .then(response => response.json())
            .then(login => check(login))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // user info
    useEffect(() => {
        if (login === 1) {
            fetch("http://localhost:5000/user-info")
                .then(response => response.json())
                .then(user => userinfo(user))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, []);*/

    return (
        <div>
            <Buttons/>
            
            <div className="Profile">
                {login === 0 && (
                    <div className="loginblur"></div>
                )}

                <div>
                <div className="ProfileAccount">
                    <button onClick={account} class="ProfileAccountButton">
                        <p>user name!</p>
                    </button>
                </div>
                </div>
                <div className='ProfileContainer'>
                    <div className="ProfileUserExperiences">
                        <button onClick={UserExperiences} class="ProfileUserExperiencesButton">
                            <p>circlescircles</p>
                        </button>
                    </div>
                    <div className='ProfileContainer2'>
                        <div className="ProfileFavorites">
                            <button onClick={favorites} class="ProfileFavoritesButton">
                                <p>circlescirclestoo</p>
                            </button>
                        </div>
                        <div className="ProfileRatings">
                            <button onClick={ratings} class="ProfileRatingsButton">
                                <p>circlescirclestoo?</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
