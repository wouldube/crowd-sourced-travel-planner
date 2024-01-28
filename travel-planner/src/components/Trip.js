import React, { useEffect, useState, } from 'react';
import TripExperience from "./TripExperience";

const Trip = () => {
    const [component, which] = useState(0);

    return (
        <div className="TripMap">
            {component === 0 && (
                <>
                <div className="TripComponent1">
                    <p>thisisatripthing</p>
                    <button onClick={()=>which(1)}>clickclick</button>
                </div>
                <div className="TripComponent2">
                    <p>thisisatripthing</p>
                </div>
                <div className="TripComponent1">
                    <p>thisisatripthing</p>
                </div>
                <div className="TripComponent2">
                    <p>thisisatripthing</p>
                </div>
                <div className="TripComponent1">
                    <p>thisisatripthing</p>
                </div>
                </>
            )}

            {component === 1 && (
                <>
                <TripExperience/>
                <button onClick={()=>which(0)}>X</button>
                </>
            )}
        </div>
    )
}

export default Trip;