import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function Brightness_Step() {

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
            Turn up your brightness!
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
            Icons or instructions here

            </Typography>
        </Box>
    </Container>
    );
}
export default Brightness_Step;