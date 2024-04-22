import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function Terms_And_Conditions_Step() {
    React.useEffect(() => {
        // Prevent scrolling when the component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []); // Only run this effect once when the component mounts

    return (
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw"}}>
            <Box sx={{ width: "80%", display: "flex", justifyContent: "flex-end"}}>
                <Link to="/">
                    <Button>
                        <CloseIcon fontSize={"large"}/>
                    </Button>
                </Link>
            </Box>
            <Box sx={{ maxWidth: "78.5%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                <Typography
                    noWrap
                    sx={{
                        display: "flex", 
                        justifyContent: "center",
                        fontFamily: 'garamond',
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '4rem'
                    }}
                >
                Terms and Conditions
                </Typography>
                <Typography
                    sx={{
                        display: "flex", 
                        justifyContent: "center",
                        marginTop: "2em",
                        marginBottom: "2em",
                        color: 'black',
                        textAlign: 'left', // Align the list items to the left
                        fontFamily: 'inherit',
                        fontWeight: 'bold', // Make the text bold
                    }}
                >
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'center' }}> {/* Center the list */}
                        <li style={{ marginBottom: '1em' }}>This vision test is intended to provide a cursory depiction of your vision at this time.</li>
                        <li style={{ marginBottom: '1em' }}>It is not a substitute for a medical test performed by a trained eye care professional.</li>
                        <li style={{ marginBottom: '1em' }}>Likewise, it is not intended to be used for diagnosing, treating, or preventing diseases.</li>
                        <li style={{ marginBottom: '1em' }}>This is a tool for gauging your visual acuity at this time and allowing you to make a more informed decision regarding your eye care.</li>
                        <li style={{ marginBottom: '1em' }}>SightBytes and all affiliating parties accept no liability or consequences arising from the use of our application.</li>
                    </ul>
                </Typography>
            </Box>
        </Container>
    );
}

export default Terms_And_Conditions_Step;
