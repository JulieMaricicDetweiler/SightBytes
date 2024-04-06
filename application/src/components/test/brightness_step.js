import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';

function Brightness_Step() {
    const [currentIcon, setCurrentIcon] = useState("small");

    useEffect(() => {
        setTimeout(() => {
        if (currentIcon === "small") { setCurrentIcon("medium") }
        else if (currentIcon === "medium") { setCurrentIcon("large") }
        else { setCurrentIcon("small") }
        }, 500);
    }, [currentIcon]);


    return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw"}}>
        <Box sx={{ width: "80%", display: "flex", justifyContent: "flex-end"}}>
            <Link to="/">
                <Button>
                    <CloseIcon fontSize={"medium"}/>
                </Button>
            </Link>
        </Box>
        <Box sx={{ maxWidth: "78.5%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
            <Typography
                noWrap
                sx={{
                    display: "flex", 
                    justifyContent: "center",
                    fontFamily: 'helvetica',
                    fontWeight: 500,
                    color: 'black',
                    typography: { xs: 'h5', sm: 'h4', md: 'h3' }
                }}
            >
            Maximize your screen brightness!
            </Typography>
            <Grid container spacing={0} sx={{height: '40px', marginTop: 5}}>
                <Grid item xs={4.5}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end' }}>
                        {currentIcon == "small" && <LightModeIcon fontSize={currentIcon}></LightModeIcon>}
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        {currentIcon == "medium" && <LightModeIcon fontSize={currentIcon}></LightModeIcon>}                    
                    </Box>
                </Grid>
                <Grid item xs={4.5}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                        {currentIcon == "large" && <LightModeIcon fontSize={currentIcon}></LightModeIcon>}
                    </Box>
                </Grid>               
            </Grid>
            <Typography
                sx={{
                    display: "flex", 
                    justifyContent: "center",
                    marginTop: "1em",
                    marginBottom: "2em",
                    fontFamily: 'helvetica',
                    fontWeight: 300,
                    color: 'black',
                    typography: 'h5'
                }}
            >
            To increase the efficacy of the assessment, 
            please ensure the text below is legible on your screen.
            </Typography>
            <Typography
                sx={{
                    display: "flex", 
                    justifyContent: "center",
                    marginBottom: "1em",
                    fontFamily: 'helvetica',
                    fontWeight: 300,
                    color: '#777777',
                    typography: 'h6',
                    opacity: 0.1
                }}
            >
            Hi there! If you're reading this, please click continue!
            </Typography>
        </Box>
    </Container>
    );
}
export default Brightness_Step;