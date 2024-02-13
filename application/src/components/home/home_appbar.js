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
    <AppBar position="static" style={{ background: "#C8C8C8"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
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
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button style={{ fontFamily: "helvetica" }} variant="contained">
                        Login
                    </Button>
                </Link>
            </Toolbar>
        </Container>
    </AppBar>
    );
}
export default ResponsiveAppBar;