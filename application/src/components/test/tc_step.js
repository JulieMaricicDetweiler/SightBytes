import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function Terms_And_Conditions_Step() {

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
            Terms and Conditions
            </Typography>
            <Typography
                sx={{
                    display: "flex", 
                    justifyContent: "center",
                    marginTop: "2em",
                    marginBottom: "2em",
                    fontFamily: 'helvetica',
                    fontWeight: 300,
                    color: 'black',
                    typography: 'h6'
                }}
            >
            This vision test is intended to provide a cursory depiction of your vision at this time. 
            It is not a substitute for a medical test performed by a trained eye care professional. 
            Likewise, it is not intended to be used for diagnosing, treating, or preventing diseases. 
            It is rather a supplementary tool for gauging your visual acuity at this time and allowing you to make a more informed decision regarding your eye care. 
            SightBytes and all affiliating parties accept no liability or consequencies arising from the use of our application and/or the information provided.
            </Typography>
        </Box>
    </Container>
    );
}
export default Terms_And_Conditions_Step;