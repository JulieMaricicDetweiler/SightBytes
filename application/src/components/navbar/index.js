import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, hexToRgb } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext/authContext';
import firebaseConfig from "../../firebase/firebaseConfig";
import UserIcon from '../../assets/eye.png'; // Import the PNG image
import UserIcon2 from '../../assets/user.png';

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

    return (
        <AppBar position="fixed" sx={{ top: '0px', background: '#424242', boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.3)', height: '64px', display: 'flex' }}>
            <Container maxWidth="false" sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", textDecoration: "none" }}>
                    <img src={UserIcon} alt="Eye Logo" style={{ height: "50px" }} /> {/* Use the JPG image */}
                </Link>

                <Container maxWidth="m" sx={{ display: "flex", alignItems: "center", justifyContent: "end"}}>
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between",  alignItems: "center", columnGap: "2em" }}>
                        {!isMobile && (
                            <Link to="/about" style={{ textDecoration: "none" }}>
                                <Button size="large" style={{ fontFamily: "arial", color: "white", fontSize: '1.2rem', textTransform: "none" }}>
                                    About
                                </Button>
                            </Link>)}
                        {!isMobile && 
                            (<Link to="/contact" style={{ textDecoration: "none" }}>
                                <Button size="large" style={{ fontFamily: "arial", color: "white", fontSize: '1.2rem', textTransform: "none" }}>
                                    Contact Us
                                </Button>
                            </Link>)}
                        
                        {currentUser ? 
                            <>
                                <Link to="/login" style={{ textDecoration: "none" }}>
                                    <Button onClick={signOut} size="large" style={{ fontFamily: "arial", backgroundColor: "transparent", borderRadius: "50px", fontSize: '1.2rem', textTransform: "none", border: '2px solid white', padding: '4px 16px' }} variant="contained">
                                        Sign Out
                                    </Button>
                                </Link>
                                <Link to="/user">
                                    <img src={UserIcon2} alt="User Icon" style={{ height: "40px", paddingLeft: "15px" }} /> {/* Use the JPG image */}
                                </Link>
                            </>
                            :
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button size="large" style={{ fontFamily: "arial", backgroundColor: "transparent", borderRadius: "50px", fontSize: '1.2rem', textTransform: "none", border: '2px solid white', padding: '4px 16px' }} variant="contained">
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
