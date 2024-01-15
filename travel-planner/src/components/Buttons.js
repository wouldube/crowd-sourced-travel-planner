import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExperience = () => {
    const navigate = useNavigate();
    const add = () => {
        navigate('/trips');
    };
    const profile = () => {
        navigate('/profile');
    };
    const search = () => {
      navigate('/create-exp');
    };
  return (
    <div>
        <div class="logo">
          <h2>Travel-Planner</h2>
        </div>

        <div className="Buttons">
          <button onClick={add} class="button">
              +
          </button>
          <button onClick={profile} class="button">
              o
          </button>
          <button onClick={search} class="button">
              -
          </button>
        </div>
    </div>
  );
}

export default AddExperience;