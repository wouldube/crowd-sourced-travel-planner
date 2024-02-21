import React, { useEffect, useState } from 'react';
import Welcome from '../components/Welcome';
import ExperiencesMap from '../components/ExperiencesMap.js';
import ExperienceList from '../components/ExperienceList.js';
import {Container, Paper, Grid, Box, Card, Button} from '@mui/material';

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
        <Container>
            {initial === 0 && (
                <Paper>
                    <h2>Travel</h2>
                    <h2>Planner</h2>
                </Paper>
            )}
            {initial != 0 && (
                <>
                {component === 1 && (
                    <>
                    <Button variant="extra" onClick={()=>which(2)}>More Experiences?</Button>
                    <ExperiencesMap/>
                    </>
                )}

                {component === 0 && (
                    <>
                    <Paper>
                        <Welcome/>
                        <button onClick={()=>which(1)} className="explore-button">Explore Now!</button>
                    </Paper>
                    </>
                )}

                {component === 2 && (
                    <>
                    <ExperienceList/>
                    </>
                )}
                </>
            )}
        </Container>
    )
}

export default Exploration;
