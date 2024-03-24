import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, Typography, SvgIcon } from '@mui/material';
import { ReactComponent as EyeLogo } from '../../assets/eye_logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from "../../firebase/firebaseConfig";
import { BsPersonCircle as UserIcon } from 'react-icons/bs';

function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <AppBar position="static" sx={{ background: '#F5FEFD', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', height: '64px', display: 'flex' }}>
            <Container maxWidth="false" sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", textDecoration: "none" }}>
                    <SvgIcon component={EyeLogo} fontSize={"large"} inheritViewBox />
                    <Typography variant="h5" noWrap sx={{ fontFamily: 'garamond', fontWeight: 700, color: 'black', fontSize: '1.5rem' }}>
                        SightBytes
                    </Typography>
                </Link>

                <Container maxWidth="m" sx={{ display: "flex", alignItems: "center", justifyContent: "end"}}>
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between",  alignItems: "center", columnGap: "2em" }}>
                        {!isMobile && (
                        <Link to="/about" style={{ textDecoration: "none" }}>
                            <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold", color: "black" }}>
                                About
                            </Button>
                        </Link>)}
                        {!isMobile && 
                        (<Link to="/contact" style={{ textDecoration: "none" }}>
                            <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold", color: "black" }}>
                                Contact Us
                            </Button>
                        </Link>)}
                        
                        {currentUser ? 
                            <>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button onClick={signOut} size="large" style={{ fontFamily: "helvetica", fontWeight: "bold" }} variant="contained">
                                    Sign Out
                                </Button>
                            </Link>
                            <Link to="/user">
                                <UserIcon size={40} color='black' paddingLeft={15}/>
                            </Link>
                            </>
                        :
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold" }} variant="contained">
                                    Login
                                </Button>
                            </Link>
                        }
                    </Toolbar>
                </Container>
            </Container>
        </AppBar>
    );
}

export default Navbar;