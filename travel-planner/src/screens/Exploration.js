import React from 'react';
import Welcome from '../components/Welcome';
import ExperiencesMap from '../components/ExperiencesMap.js';
import ExperienceList from '../components/ExperienceList.js';
import Buttons from '../components/Buttons.js';
import ImageCarousel from '../components/ImageCarousel.js';

const Exploration = () => {
    return (
        <div>
            <Welcome />
            <Buttons />
            <ExperiencesMap />
            <ExperienceList />
        </div>
    )
}

export default Exploration;
