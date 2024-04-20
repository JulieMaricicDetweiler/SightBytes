import * as React from 'react';
import Button from '@mui/material/Button';
import firebaseConfig from "../../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { AuthContext } from '../../components/authContext/authContext';
import { Typography, Container, Accordion, AccordionSummary, AccordionDetails, Chip, hexToRgb } from '@mui/material';
import { Link } from 'react-router-dom';
import DetailedResults from '../../components/test/detailedResults';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Profile = () => {
    const [name, setFirstName] = React.useState('');
    const { currentUser } = React.useContext(AuthContext);
    const [userTests, setUserTests] = React.useState([]);

    React.useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userDocRef = doc(firebaseConfig.firestore, "users", currentUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    setFirstName(userDocSnapshot.data().firstName);
                    const testsRef = collection(firebaseConfig.firestore, "users", currentUser.uid, "tests");
                    const testSnapshots = await getDocs(testsRef);
                    const tests = testSnapshots.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }));
                    setUserTests(tests);
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    return (
        <div>
            {currentUser ? (
                <>
                    <Typography variant='h3' fontFamily={'Raleway'} textAlign={'center'} paddingTop={15} lineHeight={3}>
                        <Typography variant='h4' fontFamily={'Raleway'}>
                            Hi, {name} <br />
                        </Typography>
                        <Typography variant='h2' fontFamily={'Raleway'}>Welcome to SightBytes</Typography>
                        <Typography variant='h5' fontFamily={'Raleway'} textAlign={'center'} paddingTop={'30px'}>See your past results below</Typography>
                    </Typography>
                    <hr style={{width: '75%'}} />
                    {userTests && userTests.length > 0 ? (
                        userTests.map(test => (
                            <Accordion key={test.id} style={{fontFamily: 'Raleway', paddingTop: '15px'}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Taken on: {test.data.scoreResult.date}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <DetailedResults scoringResult={test.data.scoreResult} />
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <>
                        <Typography variant='h4' fontFamily={'Raleway'} textAlign={'center'} paddingTop={'100px'}>No tests taken yet</Typography>
                        <Link to="/test" style={{ textDecoration: "none", display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: '30px' }}>
                            <Chip
                            label= "Test Your Vision"
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
                        </>
                    )}
                </>
            ) : (
                <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2em", marginTop: "5vw" }}>
                    <Typography variant='h4' paddingTop={15} paddingBottom={4} fontFamily={'Raleway'}>
                        Oops! Looks like you aren't logged in
                    </Typography>
                    <Link to='/login' style={{ textDecoration: "none" }}>
                        <Button size="large" style={{ fontFamily: 'Raleway', fontWeight: "bold" }} variant="contained">
                            Log in
                        </Button>
                    </Link>
                </Container>
            )}
        </div>
    );
}

export default Profile;
