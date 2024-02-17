import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Typography, SvgIcon } from '@mui/material';
import { ReactComponent as EyeLogo } from '../../assets/eye_logo.svg';
import { Link } from 'react-router-dom';

function LoginAppBar() {

    return (
    <AppBar position="static" style={{ background: "#C8C8C8", display: "flex", flexDirection: "row" }}>
        <Container maxWidth="m" sx={{ marginLeft: { md: "4em", xl: '8em' } }}>
            <Link to="/" style={{ height: "4em", width: "12em", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", textDecoration: "none"}}>
                <SvgIcon component={EyeLogo} fontSize={"large"} inheritViewBox />
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
    </AppBar>
    );
}
export default LoginAppBar;