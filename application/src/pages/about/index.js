import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import gifImage from '../../assets/gaytor.gif'; // Import the gif image
import healthImage from '../../assets/health.png';
import eyeImage from '../../assets/eye.png';
import julesImage from '../../images/jules.png'; // Import jules.png
import kevinImage from '../../images/kevin.png'; // Import kevin.png
import yashImage from '../../images/yash.png'; // Import yash.png
import taiseImage from '../../images/taise.png';
import tamImage from '../../images/tam.png';

function About() {
  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#E1F5FE', height: '50vh', width: '100%', position: 'absolute', top: 0, zIndex: -1 }} />
      <Container maxWidth="xl" sx={{ width: '70%', display: "flex", flexDirection: "column", alignItems: "center", gap: "1em", paddingTop: "120vh" }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
          <Typography
            noWrap
            variant="h2"
            sx={{
              fontFamily: 'garamond',
              fontWeight: 'bold', // Make the word "About" bold
              color: 'black',
            }}
          >
            About
          </Typography>
        </div>
        {/* Add the images and descriptions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1em', marginBottom: '1em' }}>
          <div style={{ textAlign: 'center', marginRight: '2em' }}>
            <img src={tamImage} alt="Tam" style={{ width: '200px', height: '200px', marginBottom: '0.5em', border: '4px solid #64B5F6', borderRadius: '50%', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="body1" sx={{ fontFamily: 'garamond', fontWeight: 'bold' }}>Tam</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Role: Backend Developer</Typography>
          </div>
          <div style={{ textAlign: 'center', marginRight: '2em' }}>
            <img src={julesImage} alt="Jules" style={{ width: '200px', height: '200px', marginBottom: '0.5em', border: '4px solid #64B5F6', borderRadius: '50%', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="body1" sx={{ fontFamily: 'garamond', fontWeight: 'bold' }}>Jules</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Role: Scrum Master</Typography>
          </div>
          <div style={{ textAlign: 'center', marginRight: '2em' }}>
            <img src={taiseImage} alt="Taise" style={{ width: '200px', height: '200px', marginBottom: '0.5em', border: '4px solid #64B5F6', borderRadius: '50%', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="body1" sx={{ fontFamily: 'garamond', fontWeight: 'bold' }}>Taise</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Role: Backend Developer</Typography>
          </div>
          <div style={{ textAlign: 'center', marginRight: '2em' }}>
            <img src={kevinImage} alt="Kevin" style={{ width: '200px', height: '200px', marginBottom: '0.5em', border: '4px solid #64B5F6', borderRadius: '50%', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="body1" sx={{ fontFamily: 'garamond', fontWeight: 'bold' }}>Kevin</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Role: Frontend Developer</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={yashImage} alt="Yash" style={{ width: '200px', height: '200px', marginBottom: '0.5em', border: '4px solid #64B5F6', borderRadius: '50%', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="body1" sx={{ fontFamily: 'garamond', fontWeight: 'bold' }}>Yash</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Role: Project Manager</Typography>
          </div>
        </div>
        {/* Add the UF image and description */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1em', marginBottom: '1em' }}>
          <div style={{ marginRight: '2em' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'garamond',
                fontWeight: 'bold',
                marginBottom: '0.5em',
              }}
            >
              Who are We?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'left',
              }}
            >
              We're a passionate team of CS majors at the University of Florida who aren't just about algorithms and applications – we're wired to solve real-world problems. We constantly look for ways to leverage our computer science knowledge to make a positive impact. This drive to make a difference is exactly what fueled the development of our senior project.
            </Typography>
          </div>
          <img src={gifImage} alt="UF" style={{ width: '250px', height: 'auto' }} /> {/* Changed src to gifImage */}
        </div>
        {/* Add the Health image and description */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '1em', marginBottom: '1em' }}>
          <img src={healthImage} alt="Health" style={{ width: '400px', height: 'auto', marginRight: '2em', border: '4px solid #64B5F6', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
          <div>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'garamond',
                fontWeight: 'bold',
                marginBottom: '0.5em',
              }}
            >
              Why this Project?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'left',
              }}
            >
              Cost is a major barrier to healthcare, with 28% of Americans skipping checkups (National Center for Health Statistics, 2022). This can be especially concerning for vision health, as over 60% of adults need glasses! We hope that our application will help to relieve at least some of this emotional and economic burden. It is important to note that we do not intend for this application to be an exact replacement of the services provided by an optometrist.</Typography>
          </div>
        </div>
        {/* Add the Eye image and description */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1em', marginBottom: '1em' }}>
          <div style={{ marginRight: '2em' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'garamond',
                fontWeight: 'bold',
                marginBottom: '0.5em',
              }}
            >
              What is our Project?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'left',
              }}
            >
              Our project aims to develop an at-home myopia test application using the user’s computer webcam and a secondary device such as a mobile phone for inputting responses. This application will provide real-time distance estimations to aid the user in conducting the test at home and providing accurate calculations.
            </Typography>
          </div>
          <img src={eyeImage} alt="Eye" style={{ width: '400px', height: 'auto', border: '4px solid #64B5F6', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }} />
        </div>
      </Container>
    </div>
  );
}

export default About;
