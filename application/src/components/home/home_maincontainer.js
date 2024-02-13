import * as React from 'react';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { Icon } from '@material-ui/core';
import { Typography } from '@mui/material';
import EyeLogo from '../../assets/eye_logo.svg';
import { Link } from 'react-router-dom';

function HomeContainer() {

    return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw"}}>
        <Icon style={{ width: "auto", height: "auto"}}>
            <img alt="logo of a single eye" src={EyeLogo} height={window.screen.width * .10} width={window.screen.width * .10}/>
        </Icon>
        <Typography
            noWrap
            sx={{
                fontFamily: 'helvetica',
                fontWeight: 300,
                color: 'black',
                typography: { xs: 'h4', sm: 'h3', md: 'h2' }
            }}
        >
        Home Myopia Assessment
        </Typography>

        <Link to="/test" style={{ textDecoration: "none" }}>
            <Chip 
            label="Check Your Vision" 
            color="primary" 
            clickable 
            sx={{ 
                fontFamily: 'helvetica',
                fontWeight: 500,
                fontSize: { xs: 20, sm: 24, md: 28 },
                padding: { xs: 2, sm: 3, md: 4 },
                "& .MuiChip-label": {
                    paddingLeft: 0,
                    paddingRight: 0
                }
            }}
            />
        </Link>

        <Link to="/" style={{ textDecoration: "none" }}>
            <Chip 
            label="Learn more" 
            style={{ backgroundColor:'#00ffff' }}
            clickable 
            sx={{ 
                color: 'white',
                fontFamily: 'helvetica',
                fontWeight: 500,
                fontSize: { xs: 16, sm: 20, md: 24 },
                padding: { xs: 1, sm: 2, md: 3 },
                "& .MuiChip-label": {
                    paddingLeft: 0,
                    paddingRight: 0
                }
            }}
            />
        </Link>
    </Container>
    );
}
export default HomeContainer;