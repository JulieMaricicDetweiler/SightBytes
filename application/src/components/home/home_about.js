import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function HomeAbout() {
  return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1em", marginTop: "5vw" }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Typography
          noWrap
          variant="h2"
          sx={{
            fontFamily: 'garamond',
            fontWeight: 300,
            color: 'black',
            flex: 1,
          }}
        >
          About
        </Typography>
      </div>
      <hr style={{ borderTop: '4px solid black', width: '100%' }} />
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'garamond',
          marginBottom: '2em',
          textAlign: 'left',
        }}
      >
        This project aims to develop an at-home myopia test application using the user’s computer webcam and a secondary device such as a mobile phone for inputting responses. This application will provide real-time distance estimations to aid the user in conducting the test at home and providing accurate calculations.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'garamond',
          marginBottom: '2em',
          textAlign: 'left',
        }}
      >
        Access to affordable healthcare is a long discussed issue in our country. Unfortunately, many Americans evade going to doctors and specialists for non-emergency purposes and checkups simply because the services may be economically inconvenient and potentially inaccessible. According to a 2022 survey by the National Center for Health Statistics, 28% of adults delayed or forwent healthcare due to cost. With over 60% of American adults having prescription eyeglasses, we hope that our application will help to relieve at least some of this emotional and economic burden. It is important to note that we do not intend for this application to be an exact replacement of the services provided by an optometrist.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'garamond',
          marginBottom: '2em',
          textAlign: 'left',
        }}
      >
        Recognizing the relevance and urgency of the issue, our team SightBytes has decided to develop a myopia detection web application that is readily accessible online. There have been multiple attempts for myopia tests online, and research has shown that “web-based eye testing is a valid and safe method for measuring visual acuity and refractive error in healthy eyes, particularly for mild myopia” (Wisse et al., 2019).
      </Typography>
    </Container>
  );
}

export default HomeAbout;
