import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import firebaseConfig from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = React.useState(true);
    const [emailErrorText, setEmailErrorText] = React.useState("");

    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = React.useState(true);
    const [passwordErrorText, setPasswordErrorText] = React.useState("");
    const navigate = useNavigate();

    function checkEmailValidity(email) {
        const emailValidity = String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        setIsEmailValid(emailValidity)
        setEmailErrorText(emailValidity ? "" : "Invalid email address")
    }

    function checkEmailEmpty(email) {
        setIsEmailEmpty(email.length == 0);
        if (email.length == 0) { setEmailErrorText("") }
    }

    function checkPasswordValidity(password) {
        const passwordLength = password.length >= 8;
        if (!passwordLength) { 
            setIsPasswordValid(false);
            setPasswordErrorText("Password must be at least 8 characters long") 
            return
        }

        const passwordValidity = String(password)
        .match(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
        )

        setIsPasswordValid(passwordValidity)
        setPasswordErrorText(passwordValidity ? "" : "Password should contain at least one digit, uppercase, lowercase, and symbol character.")
    }

    function checkPasswordEmpty(password) {
        setIsPasswordEmpty(password.length == 0);
        if (password.length == 0) { setPasswordErrorText("") }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(firebaseConfig.auth, email, password).then(
            async (result) => {
              console.log(result)
              try {
                const ref = doc(firebaseConfig.firestore, "users", result.user.uid);
                const docRef = await setDoc(ref, { email, firstName, lastName });
                // alert("YEEEEE");
                console.log("Successfully created user and stored something");
                navigate('/user');
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
      };
    
      return (
        <Container component="main" maxWidth="xs" sx={{position: 'relative', marginTop: '150px'}}>
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
                fontFamily: 'Raleway',
                fontWeight: 500,
                color: 'black'
            }}
            >
            Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value = {firstName}
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value = {lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    error={!isEmailValid && !isEmailEmpty}
                    helperText={emailErrorText}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value = {email}
                    onChange = {(e) => { setEmail(e.target.value); checkEmailValidity(e.target.value); checkEmailEmpty(e.target.value) }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    error={!isPasswordValid && !isPasswordEmpty}
                    helperText={passwordErrorText}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value = {password}
                    onChange = {(e) => { setPassword(e.target.value); checkPasswordValidity(e.target.value); checkPasswordEmpty(e.target.value) }}
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: "Raleway", fontSize: {xs: 10, sm: 12, md:20}, backgroundColor: '#1c4aa6'}}
            >
                Sign Up
            </Button>
            <Link href="/login" variant="body2" sx={{fontSize: {xs: 10, sm: 12, md:20}, fontFamily: 'Raleway'}}>
                {"Already have an account? Sign in"}
            </Link>
            </Box>
        </Box>
        </Container>
      );
}

export default SignUp;