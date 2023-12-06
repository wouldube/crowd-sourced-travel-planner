import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExperience = () => {
    const navigate = useNavigate();
    const add = () => {
        navigate('/create-exp');
    };
    const profile = () => {
        navigate('/create-exp');
    };
    const search = () => {
      navigate('/create-exp');
    };
  return (
    <div class="Buttons">
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
  );
}

export default AddExperience;