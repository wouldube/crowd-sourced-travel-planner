import React from 'react';
import { useNavigate } from 'react-router-dom';

const Buttons = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className="logo" onClick={() => navigateTo('/')}>
                <h2>Travel-Planner</h2>
            </div>

            <div className="Buttons">
                <button onClick={() => navigateTo('/trips')} className="button">
                    Trips
                </button>
                <button onClick={() => navigateTo('/profile')} className="button">
                    Profile
                </button>
                <button onClick={() => navigateTo('/create-exp')} className="button">
                    Add Experience
                </button>
                {/* Add additional buttons here */}
                <button onClick={() => navigateTo('/UserExperiences')} className="button">
                    My Experiences
                </button>
                <button onClick={() => navigateTo('/favorites')} className="button">
                    Favorites
                </button>
                <button onClick={() => navigateTo('/ratings')} className="button">
                    Ratings
                </button>
                {/* ... more buttons as needed */}
            </div>
        </div>
    );
}

export default Buttons;
