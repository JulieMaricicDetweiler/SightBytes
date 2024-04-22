import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography, TextField, Button } from '@mui/material';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#E1F5FE', height: '30vh', width: '100%', position: 'absolute', top: 0, zIndex: -1 }} />
      <Container maxWidth="xl" sx={{ width: '70%', display: "flex", flexDirection: "column", alignItems: "center", gap: "1em", paddingTop: "0vh" }}>  
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
          <Typography
            noWrap
            variant="h2"
            sx={{
              fontFamily: 'garamond',
              fontWeight: 'bold', // Make the title bold
              color: 'black',
            }}
          >
            Contact Us
          </Typography>
        </div>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'garamond',
            marginBottom: '2em',
            textAlign: 'left'
          }}
        >
          {/* Removed names and emails */}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <TextField id="first-name" label="First Name" variant="outlined" required />
          <TextField id="last-name" label="Last Name" variant="outlined" required />
          <TextField id="email" label="Email" variant="outlined" type="email" required />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            required
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            sx={{
              textTransform: 'none', // Prevents all caps
              color: 'black',
              borderRadius: '20px',
              border: '2px solid black',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Contact;
