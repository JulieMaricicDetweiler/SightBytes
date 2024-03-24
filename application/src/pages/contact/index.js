import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const Contact = () => {

  return (
    <Container maxWidth="xl" sx={{ width: '70%', display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1em", marginTop: "5vw" }}>  {/* Changed alignItems to 'flex-start' for left alignment */}
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
          Contact
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
        Tam Huynh - tamhuynh@ufl.edu<br />
        Julie Maricic-Detweiler - j.maricicdetweil@ufl.edu<br />
        Kevin Zhang - kevin.zhang@ufl.edu<br />
        Taise Miyazumi - tmiyazumi@ufl.edu<br />
        Yash Hegde - yash.hegde@ufl.edu
      </Typography>
    </Container>
  );
}

export default Contact;