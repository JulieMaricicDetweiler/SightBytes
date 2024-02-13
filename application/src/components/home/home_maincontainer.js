import * as React from 'react';
import Container from '@mui/material/Container';
import { Icon } from '@material-ui/core';
import { Typography } from '@mui/material';
import EyeLogo from '../../assets/eye_logo.svg';

function HomeContainer() {

    return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Icon style={{ width: "auto", height: "auto"}}>
            <img alt="logo of a single eye" src={EyeLogo} height={200} width={200}/>
        </Icon>
        <Typography
            variant="h2"
            noWrap
            sx={{
                fontFamily: 'helvetica',
                fontWeight: 300,
                color: 'black'
            }}
        >
        Home Myopia Assessment
        </Typography>
    </Container>
    );
}
export default HomeContainer;