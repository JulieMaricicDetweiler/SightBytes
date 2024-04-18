import React from 'react';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { Box, Button, Paper, Typography, hexToRgb } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import homePersonImage from './../../assets/home_person.png';
import homeSideGlasses from './../../assets/home_side_glasses.jpg';

const BlueBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#cce7e8", // A blue shade
  position: 'absolute',
  top: '20%',
  left: '10%',
  width: '40%',
  height: '75%',
  zIndex: 1
}));

const GreenDiv = styled(Box)(({ theme }) => ({
  backgroundColor: '#e6f3f4',
  position: 'absolute',
  top: '77%',
  left: '40%',
  width: '25%',
  height: '10%',
  zIndex: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: '30%',
  left: '15%',
  width: '30%',
  height: '60%',
  backgroundImage: `url(${homePersonImage})`,
  backgroundSize: 'cover',
  minHeight: '100px',
  backgroundColor: 'transparent',
  zIndex: 3
}));

const SideImageContainer = styled(Box)(({theme}) => ({
  position: 'relative',
  top: '5%',
  left: '75%',
  width: '10%',
  height: '20%',
  backgroundImage: `url(${homeSideGlasses})`,
  backgroundSize: 'cover',
  backgroundColor: 'transparent',
  zIndex: 10,
}));

// Define a basic WelcomeText styled component
const WelcomeText = styled(Typography)({
  color: 'black',  // Example color
  fontSize: '30px', // Regular size
  fontWeight: 'normal'
});

// Define a LargeText for more significant text size
const LargeWelcomeText = styled(Typography)({
  color: 'black',  // Ensure color visibility against background
  fontSize: '150px', // Larger size
  fontWeight: 'bold'
});


const Home = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <BlueBox />
      <ImageContainer />
      <SideImageContainer/>
      <Box sx={{ position: 'absolute', top: '30%', left: '46%', zIndex: 5 }}>
        <WelcomeText>Welcome to</WelcomeText>
        <LargeWelcomeText>SightByte</LargeWelcomeText>
      </Box>
      <GreenDiv>
        <Button variant="contained" color="primary" sx={{ margin: 1, maxHeight: "50px" }}>
          Check your vision
        </Button>
      </GreenDiv>
    </Box>
  );
};

export default Home;
