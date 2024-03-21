import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import firebaseConfig from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function SignIn() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [authUser, setAuthUser] = React.useState(null);
    const [loginFailed, setLoginFailed] = React.useState(false);
    const navigate = useNavigate();

    //check if user is logged in or not 
    React.useEffect (() => {    
        const listen = firebaseConfig.auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        }
        );
            return () => {
                listen();
            }
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(firebaseConfig.auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log("WE IN");
            // ...
            navigate('/user');
          }
          ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginFailed(true);
            console.log(errorCode);
            console.log(errorMessage);
        });
      };
      
      const signOut = () => {
        firebaseConfig.auth.signOut(firebaseConfig.auth).then(() => {
          console.log("Sign out successful");
          setAuthUser(null);
        }).catch((error) => {
          console.log("Error signing out");
        });
      }


    return (
   
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography 
        variant="h4"
        sx={{
            fontFamily: 'helvetica',
            fontWeight: 500,
            color: 'black'
        }}
        >
        Sign in
        </Typography>

        {loginFailed && <Typography
        variant='p'
            sx={{
                color: 'red'
            }}
        >
            Username or password invalid
        </Typography>
        }

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontFamily: "helvetica" }}
        >
            Sign In
        </Button>
        <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
        </Link>
        </Box>
    </Box>
    </Container>
  
    );
}

export default SignIn;