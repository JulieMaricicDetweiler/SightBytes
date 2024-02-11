import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import { Icon } from '@material-ui/core';
import EyeLogo from '../../assets/eye_logo.svg';


function ResponsiveAppBar() {

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Icon>
                    <img src={EyeLogo} height={25} width={25}/>
                </Icon>
            </Toolbar>
        </Container>
    </AppBar>
    );
}
export default ResponsiveAppBar;