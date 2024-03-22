import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, Typography, SvgIcon } from '@mui/material';
import { ReactComponent as EyeLogo } from '../../assets/eye_logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

function HomeAppBar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const signOut = () => {
        firebaseConfig.auth.signOut(firebaseConfig.auth).then(() => {
          console.log("Sign out successful");
          navigate('/login');
        }).catch((error) => {
          console.log("Error signing out");
        });
    }

    //Detect screen size for responsive layout
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

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
        <Container maxWidth="m" sx={{ display: "flex", alignItems: "center", justifyContent: "end", marginRight: { md: "4em", xl: '8em' } }}>
            <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between",  alignItems: "center", columnGap: "2em" }}>
                {!isMobile && (
                <Link to="/about" style={{ textDecoration: "none" }}>
                    <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold", color: "black" }}>
                        About
                    </Button>
                </Link>)}
                {!isMobile && (<Link to="/" style={{ textDecoration: "none" }}>
                    <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold", color: "black" }}>
                        Contact Us
                    </Button>
                </Link>)}
                
                {currentUser ? 
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button onClick={signOut} size="large" style={{ fontFamily: "helvetica", fontWeight: "bold" }} variant="contained">
                            Sign Out
                        </Button>
                    </Link>
                :
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold" }} variant="contained">
                            Login
                        </Button>
                    </Link>
                }
            </Toolbar>
        </Container>
    </AppBar>
    );
}
export default HomeAppBar;