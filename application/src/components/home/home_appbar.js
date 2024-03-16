import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, Typography, SvgIcon } from '@mui/material';
import { ReactComponent as EyeLogo } from '../../assets/eye_logo.svg';
import { Link } from 'react-router-dom';

function HomeAppBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppBar position="static" sx={{ background: '#F5FEFD', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', height: '64px', display: 'flex' }}>
      <Container maxWidth="false" sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}> {/* Container styles */}
        <Link to="/" style={{ height: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", textDecoration: "none" }}>
          <SvgIcon component={EyeLogo} fontSize={"large"} inheritViewBox />
          <Typography variant="h5" noWrap sx={{ fontFamily: 'garamond', fontWeight: 700, color: 'black', fontSize: '1.5rem' }}>
            SightBytes
          </Typography>
        </Link>
        {!isMobile && (
          <Container maxWidth="false" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}> {/* Buttons container */}
            <Button size="large" sx={{ fontFamily: 'garamond', fontWeight: "bold", color: "black", marginRight: '0.5em' }}>
              About
            </Button>
            <Button size="large" sx={{ fontFamily: 'garamond', fontWeight: "bold", color: "black", marginRight: '0.5em' }}>
              Contact
            </Button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button size="large" sx={{ fontFamily: 'garamond', fontWeight: "bold" }} variant="contained">
                Login
              </Button>
            </Link>
          </Container>
        )}
      </Container>
    </AppBar>
  );
}

export default HomeAppBar;
