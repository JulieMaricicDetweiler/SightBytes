import * as React from 'react';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { Typography, hexToRgb } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="homepage-background"> {/* Add a class to apply the background image */}
            <Container maxWidth="xl" sx={{ width: '70%', display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "10vh" }}>
                <div style={{ width: '100%', marginTop: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Add margin top and align container to the center */}
                    <div style={{ marginBottom: '20px' }}>
                        <Typography
                            noWrap
                            variant="h2"
                            sx={{
                                fontFamily: 'garamond',
                                fontWeight: 'bold',
                                color: 'white', // Set the color to white
                                paddingBottom: 3,
                                paddingLeft: '40px', // Adjust the padding to move the text slightly to the right
                                fontSize: '3rem' // Adjust the font size to make the text smaller
                            }}
                        >
                            SightBytes
                        </Typography>
                    </div>
                    <div style={{ marginLeft: '40px' }}> {/* Add marginLeft to move the button to the right */}
                        <Link to="/test" style={{ textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '100%' }}>
                                <Chip
                                    label="Begin Myopia Test"
                                    color="primary"
                                    clickable
                                    sx={{
                                        fontWeight: 450,
                                        fontSize: { xs: 16, sm: 20, md: 22 },
                                        padding: { xs: 1, sm: 2, md: 3 },
                                        "& .MuiChip-label": {
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        },
                                        textAlign: 'center', // Center the text horizontally
                                        borderRadius: '50px', // Make the button rounded
                                        backgroundColor: 'transparent', // Set background color to transparent
                                        border: '2px solid white', // Create a white outline
                                        color: 'white', // Set text color to white
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;
