import React, { useState, useEffect, useRef } from 'react';
import Welcome from '../components/Welcome';
import ExperiencesMap from '../components/ExperiencesMap.js';
import ExperienceList from '../components/ExperienceList.js';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';

const Exploration = ({ setExpId }) => {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper variant="experiencesMap">
                        <ExperiencesMap setExpId={setExpId} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper variant="welcoming">
                        <Welcome />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper variant="experiencesGrid">
                        <ExperienceList setExpId={setExpId} />
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    )
}

export default Exploration;
