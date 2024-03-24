import * as React from 'react';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw" }}>
          <div style={{ display: 'flex', width: '100%' }}> {/* Wrapper div */}
            <Typography
              noWrap
              variant="h2"
              sx={{
                fontFamily: 'garamond',
                fontWeight: 300,
                color: 'black',
                flex: 1 // Flexbox for heading width
              }}
            >
              Home Myopia Assessment
            </Typography>
            <Link to="/test" style={{ textDecoration: "none", display: 'flex', alignItems: 'flex-end' }}> {/* Link with flexbox */}
              <Chip
                label="Check Your Vision"
                color="primary"
                clickable
                sx={{
                  fontFamily: 'garamond',
                  fontWeight: 500,
                  fontSize: { xs: 20, sm: 24, md: 28 },
                  padding: { xs: 2, sm: 3, md: 4 },
                  "& .MuiChip-label": {
                    paddingLeft: 0,
                    paddingRight: 0
                  },
                  textAlign: 'left',
                }}
              />
            </Link>
          </div>
          <hr style={{ borderTop: '4px solid black', width: '100%' }} /> {/* Thicker border with full width */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'garamond',
              marginBottom: '2em',
              textAlign: 'left',
            }}
          >
            There are a number of extensive eye exams to fully assess eye health, many of which require physical examination of the eye through the use of advanced tools. In other words, there is a significant distinction to be drawn between an “eye exam” and a “vision exam.” Our product will be the latter. Users will be able to create an account in order to monitor the changes in their vision over time. We intend for our application to be used as a proxy for determining when it may be time to invest in receiving a full examination. We hope that this may save users at least a bit of cost when it comes to coarsely assessing visual acuity and potential deterioration.
          </Typography>
    
        </Container>
      );
}

export default Home;