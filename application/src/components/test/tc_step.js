import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function Terms_And_Conditions_Step() {

    return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw"}}>
        <Typography
            noWrap
            sx={{
                fontFamily: 'helvetica',
                fontWeight: 300,
                color: 'black',
                typography: { xs: 'h4', sm: 'h3', md: 'h2' }
            }}
        >
        Terms and Condition stuff
        </Typography>

    </Container>
    );
}
export default Terms_And_Conditions_Step;