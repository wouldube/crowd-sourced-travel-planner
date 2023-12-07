import React from 'react';
import ExperiencesMap from '../components/ExperiencesMap.js';
import ExperienceList from '../components/ExperienceList.js';
import Buttons from '../components/Buttons.js';

const Exploration = () => {
    return (
        <div>
            <div class="logo">
                <h2>Travel-Planner</h2>
            </div>
            <Buttons/>
            <ExperiencesMap/>
            <ExperienceList/>
        </div>
    )
}

export default Exploration