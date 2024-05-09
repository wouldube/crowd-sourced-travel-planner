import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
  FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
  Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
  

const Welcome = () => {
  return (
    <Container>
      <h1>Welcome to Curio!</h1>
      <p>A platform where travelers can share and discover unique, authentic travel experiences.</p>
      <p>Focusing especially on lesser-known "hidden gems".</p>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <ImageCarousel />
      </div>
    </Container>
  );
}

export default Welcome;