import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/Buttons.js';


const Profile = () => {
    const [login, check] = useState(0);
    // const [user, userinfo] = useState(0);
    
    const navigate = useNavigate();
    const account = () => { navigate('/account'); };
    const UserExperiences = () => { navigate('/UserExperiences'); };
    const favorites = () => { navigate('/favorites'); };
    const ratings = () => { navigate('/ratings'); };

    const [username, setUsername] = useState("");

    // login check & user data
    // const userdata = async() => {
    //     try {
    //     const theuserinfo = await fetch("http://localhost:5000/user-info/:65b57e2b37f5c24ce79c5b6e")
    //     userinfo(theuserinfo)
    //     console.log(user)
    //     check(1)
    //     } catch(error) { console.error('Error fetching data:', error) }
    // }
    // useEffect( () => { userdata() }, []);

    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/profile")
            navigate("/login")
        }

        const id = localStorage.getItem("id")
        check(1)

        fetch(`http://localhost:5000/user-info/${id}`)
        .then(response => response.json())
        .then(user => {
            setUsername(user.username);
        })

    }, []);

    return (
        <div>           
            <div className="Profile">
                {login === 0 && (
                    <div className="loginblur"></div>
                )}
                {login === 1 && (
                    <div>
                        <div className="ProfileAccount">
                            <button onClick={account} className="ProfileAccountButton">
                            <p>{username}</p>
                            </button>
                        </div>

                        <div className='ProfileContainer'>
                            <div className="ProfileUserExperiences">
                                <button onClick={UserExperiences} class="ProfileUserExperiencesButton">
                                    <p><b>your experiences!</b></p>
                                </button>
                            </div>
                            <div className='ProfileContainer2'>
                                <div className="ProfileFavorites">
                                    <button onClick={favorites} class="ProfileFavoritesButton">
                                        <p>favorites</p>
                                    </button>
                                </div>
                                <div className="ProfileRatings">
                                    <button onClick={ratings} class="ProfileRatingsButton">
                                        <p>ratings</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;
