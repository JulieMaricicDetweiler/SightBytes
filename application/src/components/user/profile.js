import * as React from 'react';
import Button from '@mui/material/Button';
import firebaseConfig from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../authContext/authContext';
import { Typography, Chip, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Profile = () => {
    const [authUser, setAuthUser] = React.useState(null);
    const [name, setFirstName] = React.useState('');
    const {currentUser} = React.useContext(AuthContext);

    React.useEffect(() => {
        const fetchUserData = async () => {
          if (currentUser) {
            console.log("hello");
            const userDoc = doc(firebaseConfig.firestore, "users", currentUser.uid);
            getDoc(userDoc)
            .then((doc) => {
                console.log(doc.data());
                setFirstName(doc.data().firstName);
                console.log(name);
            })
          }
        };
    
        fetchUserData();
      }, [currentUser]);

    return (
        <div>
            {currentUser ? 
                <>
                    <Typography 
                        variant='h3' 
                        fontFamily={'helvetica'}
                        textAlign={'center'}
                        paddingTop={15}
                        lineHeight={3}
                    >
                        <Typography variant='h4'>
                            Hi, {name} <br/>
                        </Typography>
                        Welcome to SightBytes
                    </Typography>    
                </>:

                <>
                <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw"}}>

                    <Typography variant='h4' paddingTop={15} paddingBottom={4}>
                        Oops! Looks like you aren't logged in
                    </Typography>
                    <Link to='/login' style={{ textDecoration: "none" }}>
                        <Button size="large" style={{ fontFamily: "helvetica", fontWeight: "bold" }} variant="contained">
                            Log in
                        </Button>
                    </Link>
                </Container>
                </> 
            }
        </div>
    );
}

export default Profile;