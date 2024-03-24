import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import axios from 'axios';

const Test_Step = ({ onTestCompletion, onSessionIdChange }) => {
    // Display Variables
    const [sessionId, setSessionId] = useState('');

    const [isCompleted, setIsCompleted] = useState(false);

    // Vars for both
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    // Code for always updating what question is displayed
    useEffect(() => {
      if (sessionId) {
        const db = getDatabase();
        const sessionRef = ref(db, `sessions/${sessionId}`);
        onValue(sessionRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.questions) {
            setCurrentQuestion(data.questions[data.currentQuestionIndex].letter);
            setIsCompleted(data.completed);
          }
        });
      }
    }, [sessionId]);

    // notify parent of any changes
    useEffect(() => {
        if (isCompleted) {
            onTestCompletion(true); // Notify parent that test is completed.
        }
    }, [isCompleted]);

    // notify parent of session id changes
    useEffect(() => {
        onSessionIdChange(sessionId);
    }, [sessionId]);

    //Listening for connection status
    useEffect(() => {
      if (sessionId) {
        const db = getDatabase();
        const sessionRef = ref(db, `sessions/${sessionId}/connected`);
        onValue(sessionRef, (snapshot) => {
          setIsConnected(snapshot.val());
        });
      }
    }, [sessionId])
    
    // Generating random letters FOR NOW
    const generateTestTemplate = () => {
      const letters = "ABCDEFGHIJKLNOPQRSTUVWXYZ";
      const questions = [];
      const numQuestions = 10;

      for (let i = 0; i < numQuestions; i++) {
        const randIndex = Math.floor(Math.random() * letters.length);
        questions.push({
          questionId: i + 1,
          letter: letters[randIndex],
          answer: '',
        });
      }

      return questions;
    }

    const postSessionToFirebase = async (sessionId) => {
      const db = getDatabase();
      const questions = generateTestTemplate(); // Ensure this function returns an array of questions
    
      set(ref(db, `sessions/${sessionId}`), {
        connected: false,
        currentQuestionIndex: 0,
        questions: questions,
        completed: false
      }).then(() => {
        console.log(`Session ${sessionId} successfully created in Firebase.`);
      }).catch((error) => {
        console.error('Error posting session to Firebase:', error);
      });
    };

    // Creating a session
    const createSession = async() => {
      console.log('Attempting to create a session');
      try {
        const response = await axios.post('http://localhost:8000/create-session');
        const newSessionId = response.data.session_id; // Assuming this is how your session ID is returned
        setSessionId(newSessionId); // Set session ID in state
        await postSessionToFirebase(newSessionId);
      } catch (error) {
        console.error('There was an error creating the session:', error);
      }
    }
      
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {sessionId && !isCompleted && (
                <>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Session ID: {sessionId}</Typography>
                    <Paper
                    sx={{
                        p: 1,
                        bgcolor: isConnected ? 'green' : 'red',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <Typography>{isConnected ? 'Connected' : 'Not Connected'}</Typography>
                    </Paper>
                </Box>
                {!isConnected && !isCompleted &&  (
                    <Typography variant="body1" sx={{ mt: 15, textAlign: 'center' }}>
                        Please connect with a mobile device...
                    </Typography>
                )}
                </>
            )}
            </Box>


            {!sessionId && !isCompleted && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '60vh' // Adjust the height as needed to center vertically in your view
                }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                    Let's start the exam.
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                    Please create a session.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={createSession}>
                    Create Session
                    </Button>
                </Box>
            )}


            {sessionId && isConnected && !isCompleted && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Typography variant="h1" sx={{ fontSize: '10rem' }}>
                        {currentQuestion}
                    </Typography>
                </Box>
            )}

            {isCompleted && (
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Thank you very much for completing the test!
                    </Typography>
                    <Typography variant="body1">
                        Please click continue to see your results.
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

export default Test_Step;