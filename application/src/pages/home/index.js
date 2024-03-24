import * as React from 'react';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { Typography, hexToRgb } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <Container maxWidth="xl" sx={{ width: '70%', display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw" }}>
          <div style={{width: '100%'}}>
            <div style={{ display: 'flex', width: '100%', }}>
              <Typography
                noWrap
                variant="h2"
                sx={{
                  fontFamily: 'garamond',
                  fontWeight: 300,
                  color: 'black',
                  flex: 1, // Flexbox for heading width
                  paddingBottom: 3
                }}
              >
                Home Myopia Assessment
              </Typography>
            </div>
            <div>
              <Link to="/test" style={{ textDecoration: "none", display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <Chip
                  label="Check Your Vision"
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
                    textAlign: 'left',
                    borderRadius: 0,
                    backgroundColor: hexToRgb("#1c4aa6")
                  }}
                />
              </Link>
            </div>
          </div>
          <hr style={{ borderTop: '4px solid black', width: '100%' }} /> {/* Thicker border with full width */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'garamond',
              marginBottom: '2em',
              textAlign: 'center',
            }}
          >
            There are a number of extensive eye exams to fully assess eye health, many of which require physical examination of the eye through the use of advanced tools. In other words, there is a significant distinction to be drawn between an “eye exam” and a “vision exam.” Our product will be the latter. Users will be able to create an account in order to monitor the changes in their vision over time. We intend for our application to be used as a proxy for determining when it may be time to invest in receiving a full examination. We hope that this may save users at least a bit of cost when it comes to coarsely assessing visual acuity and potential deterioration.
          </Typography>
    
        </Container>
      );
}

export default Home;