import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import './test.css';
import { TextField, Button, Typography, Box } from '@mui/material';
import HorizontalLinearStepper from '../../components/test/horizontal_stepper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const Test = () => {

  const [sessionId, setSessionId] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Mobile Variables
  const [inputSessionId, setInputSessionId] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Vars for both
  const [isConnected, setIsConnected] = useState(false);
  const [leftAck, setLeftAck] = useState(false);
  const [rightAck, setRightAck] = useState(false);
  const [leftDone, setLeftDone] = useState(false);
  const [rightDone, setRightDone] = useState(false);
  

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
        if (data) {
          setIsCompleted(data.completed);
          setLeftAck(data.leftAck);
          setRightAck(data.rightAck);
          setLeftDone(data.leftDone);
          setRightDone(data.rightDone);
        }
      });
    }
  }, [sessionId]);

  

  // Getting sessionId from URL
  const getQueryParamByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  useEffect(() => {
    const sessionIdFromUrl = getQueryParamByName('sessionId');
    if (sessionIdFromUrl) setInputSessionId(sessionIdFromUrl);
  }, []); // mounted to check if sessionId from URL.


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
          let currentQuestion= '.';
          if (!sessionData.leftDone) {
            currentQuestion = sessionData.leftEyeQuestions[sessionData.currentQuestionIndex];
          } else {
            currentQuestion = sessionData.rightEyeQuestions[sessionData.currentQuestionIndex];
          }
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
      .then(() => console.log(`Navigated to ${direction} question: Index now ${newIndex}`))
      .catch((error) => console.error("Error navigating question:", error));
  };
  
    

  const submitAnswer = () => {
    console.log(sessionId);
    if (!isCompleted) {
      const db = getDatabase();
      const sessionRef = ref(db, `sessions/${sessionId}`);
      const answerRef = ref(db, `sessions/${sessionId}/${!leftDone ? 'leftEyeQuestions' : 'rightEyeQuestions'}/${currentQuestionIndex}/answer`);

      set(answerRef, currentAnswer)
        .then(() => {
          console.log("Answer submitted successfully.");
          // Check if it's the last question for the current eye
          const newIndex = currentQuestionIndex + 1;
  
          get(sessionRef).then(snapshot => {
            const sessionData = snapshot.val();
            const eyeQuestionKey = !leftDone ? 'leftEyeQuestions' : 'rightEyeQuestions';
            const totalQuestions = sessionData[eyeQuestionKey].length;
  
            if (newIndex < totalQuestions) {
              // Not the last question, move to the next one
              navigateQuestion('next');
            } else {
              // Last question for the current eye
              if (!leftDone) {
                // If it was the last question for the left eye, start the right eye test
                update(sessionRef, {
                  currentQuestionIndex: 0,  // Reset index for right eye questions
                  leftDone: true
                }).then(() => console.log("Left eye test completed. Starting right eye test."))
                  .catch((error) => console.error("Error completing left eye test:", error));
              } else {
                // If it was the last question for the right eye, mark the entire session as completed
                update(sessionRef, { completed: true })
                  .then(() => {
                    console.log("Test marked as completed.");
                    setIsCompleted(true);
                  })
                  .catch((error) => console.error("Error marking test as completed:", error));
              }
            }
          });
  
          setCurrentAnswer(''); // Reset current answer for the next question
        })
        .catch((error) => console.error("Error submitting answer:", error));
    }
  };
  
  
      
  return (
      <div className="test-page-container" style={{position: 'relative', marginTop: '150px'}}>

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
              {!leftAck && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3, }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Please cover your Right eye to test with your Left eye.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => {
                    setLeftAck(true);
                    const db = getDatabase();
                    update(ref(db, `sessions/${sessionId}`), {
                      leftAck: true
                    }).catch((error) => {
                      console.error("Error updating leftAck in Firebase:", error);
                    });
                  }}>
                    Confirm: My right eye is covered
                  </Button>
                </Box>
              )}
              {leftAck && !leftDone && (
                <>
                  <Typography variant="h4" align="center" gutterBottom>
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
                </>
              )}
              {leftDone && !rightAck && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3, }}>
                  <Typography variant="h4" align="center" gutterBottom>
                      Please cover your Left eye to test with your Right eye.
                  </Typography>
                  <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => {
                          setRightAck(true);
                          const db = getDatabase();
                          update(ref(db, `sessions/${sessionId}`), {
                            rightAck: true
                          }).catch((error) => {
                            console.error("Error updating rightAck in Firebase:", error);
                          });
                      }}
                      sx={{ mt: 2 }} // Adds margin-top for spacing between the text and the button
                  >
                      Confirm: My left eye is covered
                  </Button>
                </Box>
              )}
              {rightAck && leftDone && (
                <>
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
                </>
              )}
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
