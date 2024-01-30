import React, { useEffect, useState } from 'react';
import Welcome from '../components/Welcome';
import ExperiencesMap from '../components/ExperiencesMap.js';
import ExperienceList from '../components/ExperienceList.js';
import Buttons from '../components/Buttons.js';

const Exploration = () => {
    const [initial, isInitial] = useState(0);
    const [component, which] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            isInitial(1);
        }, 100); //3000

        return () => clearTimeout(timeoutId)
    }, []);

    return (
        <div>
            {initial === 0 && (
                <div className="Initial">
                    <h2>Travel</h2>
                    <h2>Planner</h2>
                </div>
            )}

            {initial != 0 && (
                <>
                {component === 0 && (
                    <>
                    <div className="welcoming">
                        <Welcome/>
                        <button onClick={()=>which(1)} className="explore-button">Explore Now!</button>
                    </div>
                    </>
                )}

                {component === 1 && (
                    <>
                    <button onClick={()=>which(2)} className="explore-button">More Experiences?</button>
                    <ExperiencesMap/>
                    </>
                )}

                {component === 2 && (
                    <>
                    <ExperienceList/>
                    </>
                )}
                </>
            )}
        </div>
    )
}

export default Exploration;
