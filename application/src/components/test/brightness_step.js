import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import sunGif from '../../assets/sun.gif';
import bBalls from '../../assets/brightness.png';

function Brightness_Step() {
    // Prevent scrolling
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.backgroundColor = 'black'; // Set background color of body to black
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.backgroundColor = ''; // Reset background color of body
        };
    }, []);

    return (
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw" }}>
            <Box sx={{ width: "80%", display: "flex", justifyContent: "flex-end"}}>
                <Link to="/">
                    <Button>
                        <CloseIcon fontSize={"large"}/>
                    </Button>
                </Link>
            </Box>
            <Box sx={{ maxWidth: "78.5%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", marginTop: "2em" }}>
                <Typography
                    noWrap
                    sx={{
                        display: "flex", 
                        justifyContent: "center",
                        fontFamily: 'garamond',
                        fontWeight: 'bold',
                        color: 'white', // Set title text color to white
                        fontSize: '4em',
                        marginBottom: '0em' // Reduce space between title and gif
                    }}
                >
                Screen Brightness Calibration
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1em' }}>
                    <img src={bBalls} alt="bBall Image" style={{ width: 'auto', height: 'auto', maxWidth: '460px', maxHeight: '460px', marginRight: '1em', marginBottom: '0.5em'}} />
                    <img src={sunGif} alt="Sun GIF" style={{ width: '20%', maxWidth: '200px', marginBottom: '1em' }} /> {/* Reduce space below the gif */}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white', fontSize: '1.5em' }}>
                    Increase brightness until all circles are visible
                </Typography>
            </Box>
        </Container>
    );
}

export default Brightness_Step;
