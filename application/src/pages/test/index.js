import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import axios from 'axios';
import './test.css';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import DefaultAppBar from '../../components/navbar/appbar';
import HorizontalLinearStepper from '../../components/test/horizontal_stepper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const Test = () => {
    // Distance detection
    const [distance, setDistance] = useState(0);

    const [sessionId, setSessionId] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    // Mobile Variables
    const [inputSessionId, setInputSessionId] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Vars for both
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    //Detect screen size for responsive layout
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Temporary UseEffect for getting a random number
    /*
    useEffect(() => {
      const callAPI = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/randnum');
          const data = await response.json();
          console.log(data.random_number);
          setDistance(data.random_number);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      callAPI();
  
      // Set up an interval to get data every second
      const intervalId = setInterval(callAPI, 1000);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);
    */


    const progressBarStyle = {
        height: `${(distance / 100) * 300}px`,
        background: 'grey',
    };


    // Mobile useEffect for setting current question
    useEffect(() => {
      if (sessionId && isConnected) {
        const db = getDatabase();
        const sessionRef = ref(db, `sessions/${sessionId}`);
        const unsubscribe = onValue(sessionRef, (snapshot) => {
          const sessionData = snapshot.val();
          if (sessionData) {
            // Update local state with data from Firebase
            setCurrentQuestionIndex(sessionData.currentQuestionIndex);
            const currentQuestion = sessionData.questions[sessionData.currentQuestionIndex];
            setCurrentQuestion(currentQuestion ? currentQuestion.letter : '');
          }
        });
    
        return () => unsubscribe(); // Clean up listener when component unmounts or sessionId/isConnected changes
      }
    }, [sessionId, isConnected]); // Dependencies array

    // Connecting to a session
    const connectToSession = async () => {
      const db = getDatabase();
      const sessionRef = ref(db, `sessions/${inputSessionId}`);
      get(sessionRef).then((snapshot) => {
        if (snapshot.exists()) {
          update(sessionRef, {connected: true });
          setIsConnected(true);
          setSessionId(inputSessionId);
        } else {
          alert("Session not found.");
        }
      })
    }

  const navigateQuestion = (direction) => {
    // Assuming currentQuestionIndex is already updated locally
    const newIndex = direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1;
  
    // Update Firebase with the new index
    const db = getDatabase();
    update(ref(db, `sessions/${sessionId}`), { currentQuestionIndex: newIndex })
      .catch((error) => console.error("Error navigating question:", error));
  };

  const submitAnswer = () => {
    if (!isCompleted) {
      const db = getDatabase();
      const answerRef = ref(db, `sessions/${sessionId}/questions/${currentQuestionIndex}/answer`);

      set(answerRef, currentAnswer)
          .then(() => {
              console.log("Answer submitted successfully.");
              // Automatically navigate to the next question after submitting the answer
              const newIndex = currentQuestionIndex + 1;
              if (newIndex < 10) { // Assuming there are 10 questions
                setCurrentQuestionIndex(newIndex);
                navigateQuestion('next'); // update firebase
                setCurrentAnswer(''); // Reset current answer for the next question
              } else {
                // This was the last question, mark the session as completed in Firebase
                update(ref(db, `sessions/${sessionId}`), { completed: true })
                  .then(() => console.log("Test marked as completed."))
                  .catch((error) => console.error("Error marking test as completed:", error));
              }
          })
          .catch((error) => console.error("Error submitting answer:", error));
    }
  };
  
  
      
  return (
      <div className="test-page-container">
          <DefaultAppBar/>

          {!isMobile && !sessionId && (
            <HorizontalLinearStepper/>
          )}

          {isMobile && !isConnected && !isCompleted && (
            <Box sx={{ marginTop: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" gutterBottom>
                Please enter your session ID:
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter Session ID"
                value={inputSessionId}
                onChange={(e) => setInputSessionId(e.target.value)}
                sx={{ width: '80%' }} // Adjust width as needed
              />
              <Button variant="contained" color="primary" onClick={connectToSession}>
                Connect to Session
              </Button>
            </Box>
          )}

          {isMobile && isConnected && !isCompleted && (
            <Box sx={{ marginTop: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" gutterBottom>
                Please enter what you see.
              </Typography>
              <TextField
                  variant="outlined"
                  placeholder="Answer"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value.slice(0, 1))} // Limit input to a single character
                  inputProps={{ maxLength: 1 }} // Ensure only one character can be input
                  sx={{ 
                    width: '50%', // Make the input box smaller horizontally
                    '& .MuiInputBase-input': {
                      fontSize: '4rem', // Increase the font size to make the input more prominent
                      height: '5.5rem', // Increase the field height
                      padding: '0 14px', // Adjust padding as needed for better visual appearance
                    }
                  }} // Adjust width as needed
              />
              <Button variant="contained" color="primary" onClick={submitAnswer}>
                Submit Answer
              </Button>
            </Box>
          )}

        {isMobile && isCompleted && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: 'green', marginBottom: 2 }} />
            <Typography variant="h5" textAlign="center">
                Thank you! Please return to your computer for further instructions. You may close this site now.
            </Typography>
        </Box>
        )}
      </div>
    );
}

export default Test;
