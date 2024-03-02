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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Mauris venenatis hendrerit felis, sit amet interdum lacus ornare non. 
            Aliquam metus dolor, elementum sit amet ligula at, luctus consectetur elit. 
            Morbi in malesuada neque. 
            Fusce nisi nisl, sagittis eget ultricies in, condimentum at lorem. 
            Fusce fringilla, diam id fermentum malesuada, risus nibh ullamcorper massa, sit amet blandit sapien justo id nisi. 
            Vivamus in est in arcu vestibulum venenatis. 
            Nulla vel ipsum in nisi lobortis sagittis quis vitae velit. 
            Maecenas porttitor, mi at interdum imperdiet, odio libero pharetra tellus, iaculis tempus sapien velit vehicula odio. 
            
            Curabitur in neque sem. Etiam vel purus metus.

            </Typography>
        </Box>
    </Container>
    );
}
export default Terms_And_Conditions_Step;