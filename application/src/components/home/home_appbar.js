import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, Typography } from '@mui/material';
import { Icon } from '@material-ui/core';
import EyeLogo from '../../assets/eye_logo.svg';
import { Link } from 'react-router-dom';


function ResponsiveAppBar() {
    return (
    <AppBar position="static" style={{ background: "#C8C8C8", display: "flex", flexDirection: "row" }}>
        <Container maxWidth="m" sx={{ marginLeft: { md: "4em", xl: '8em' } }}>
            <Link to="/" style={{ height: "4em", width: "12em", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none"}}>
                <Icon style={{ width: "2.2em", height: "2em"}}>
                    <img alt="logo of a single eye" src={EyeLogo} height={48} width={48}/>
                </Icon>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'black'
                    }}
                >
                SightBytes
                </Typography>
            </Link>
        </Container>
        <Container maxWidth="m" sx={{ display: "flex", alignItems: "center", justifyContent: "end", marginRight: { md: "4em", xl: '8em' } }}>
            <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between",  alignItems: "center", justifyContent: "end", columnGap: "2em" }}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold", color: "black" }}>
                        About
                    </Button>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold", color: "black" }}>
                        Contact Us
                    </Button>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold" }} variant="contained">
                        Login
                    </Button>
                </Link>
            </Toolbar>
        </Container>
    </AppBar>
    );
}
export default ResponsiveAppBar;