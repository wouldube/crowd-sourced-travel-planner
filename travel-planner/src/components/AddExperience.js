import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExperience = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/create-exp');
    };
  return (
    <button onClick={handleClick}>
        ADD
    </button>
  );
}

export default AddExperience;