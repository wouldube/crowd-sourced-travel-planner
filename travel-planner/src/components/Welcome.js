import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, Tooltip, IconButton } from '@mui/material'

const Welcome = () => {
  return (
    <Container>
      <h1>Welcome to Travel-Planner!</h1>
      <p>A platform where travelers can share and discover unique, authentic travel experiences.</p>
      <p>focusing especially on lesser-known "hidden gems".</p>
      <ImageCarousel/>
    </Container>
  );
}

export default Welcome;