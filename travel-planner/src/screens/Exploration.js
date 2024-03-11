import React, { useEffect, useState } from 'react';
import Welcome from '../components/Welcome';
import ExperiencesMap from '../components/ExperiencesMap.js';
import ExperienceList from '../components/ExperienceList.js';
import { Container, Paper, Grid, Box, Card, Divider, Button } from '@mui/material';

const Exploration = ({setExpId}) => {
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
            <Grid container sizing={3}>
                <Grid item xs={12}>
                <Paper variant="experiencesMap">
                        <ExperiencesMap setExpId={setExpId}/>
                    </Paper>
                    </Grid>

                    <Grid item xs={4}>
                    <Paper variant="welcoming">
                        <Welcome />
                    </Paper>
                    </Grid>
                <Grid item xs={8}>
                    <Paper variant="experiencesGrid">
                        <ExperienceList setExpId={setExpId}/>
                        </Paper>

                </Grid>
            </Grid>
            {/*             
            {initial === 0 && (
                <>
                    <h2>Travel</h2>
                    <h2>Planner</h2>
                </>
            )}
            {initial != 0 && (
                <>
                {component === 1 && (
                    <>
                        <Button variant="extra" onClick={()=>which(2)}>More Experiences?</Button>
                        <br/>
                        <br/>
                        <br/>
                        <Divider/>
                        <Divider/>
                        <Divider/>
                        <Divider/>
                        <Divider/>
                        <br/>
                        <br/>
                        <br/>
                        <ExperiencesMap setExpId={setExpId}/>
                    </>
                )}

                {component === 0 && (
                    <>
                        <Button variant="extra" onClick={()=>which(1)}>Explore Now!</Button>
                        <Welcome/>
                    </>
                )}

                {component === 2 && (
                    <>
                    <ExperienceList setExpId={setExpId}/>
                    </>
                )}
                </>
            )} */}
        </Container>
    )
}

export default Exploration;
