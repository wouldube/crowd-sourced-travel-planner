import Experience from '../components/Experience';
import ExperienceList from '../components/ExperienceList';
import React from 'react';

const Exploration = () => {
    return (
        <div>
            <div className="exploration">
                <h2>Hello World!!</h2>
                <Experience></Experience>
            </div>
            <div className="experienceListBody">
                <ExperienceList></ExperienceList>
            </div>
        </div>
    )
}

export default Exploration