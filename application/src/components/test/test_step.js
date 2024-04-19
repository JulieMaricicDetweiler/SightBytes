import React, { useCallback, useRef, useState, useEffect } from "react";
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import axios from 'axios';
import Webcam from "react-webcam";

const Test_Step = ({ onTestCompletion, onSessionIdChange }) => {

    // Display Variables
    const [sessionId, setSessionId] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [distance, setDistance] = useState(null);
    const [initialDistance, setInitialDistance] = useState(null);
    const [isPaused, setIsPaused] = useState(0);
    const [fontSize, setFontSize] = useState('10px');
    const [currQuestionIndex, setCurrQuestionIndex] = useState(1);

    const qrUrl = `https://sightbyte-b9325.web.app/test?sessionId=${sessionId}`;

    const intervalId = useRef(null);
    const webcamRef = useRef(null);

    useEffect(() => {
      setInitialDistance(distance); // sets the initial distance after the session is connected
      console.log("Initial Distance: ", distance);
      calculateFontSize();
    },[isConnected]);


    useEffect(() => {
      // Call distancePauseCalc whenever distance or initialDistance changes
      distancePauseCalc();
      console.log("DISTANCE CHNANGED");
      calculateFontSize();
    }, [distance, initialDistance]);

    const distancePauseCalc = () => {
      // Check if distance and initialDistance have been set
      if (distance !== null && initialDistance !== null) {
        if ((distance - initialDistance)/initialDistance > 0.1) {
          console.log("Distance increased by 10%");
          console.log(initialDistance);
          setIsPaused(1);
        }
        else if ((distance - initialDistance)/initialDistance < -0.1){
          console.log("Distance decreased by 10%");
          console.log(initialDistance);
          setIsPaused(-1);
        }
        else{
          console.log("Distance is normal");
          console.log(initialDistance);
          setIsPaused(0);
        }
      }
    };

    const capture = useCallback(async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const base64Image = await convertImageToBase64(imageSrc);
  
      try {
        const response = await axios.post("http://localhost:8000/distance", {
          image_base64: base64Image,
        });
        await setDistance(response.data.distance);

        
      } catch (error) {
        console.error("Error calculating distance:", error);
      }
    }, []);

    useEffect(() => {
      setCurrQuestionIndex(currQuestionIndex + 1);
    }, [currentQuestion]);

    const calculateFontSize = () => {
      //so font size is inversely proportional to distance
      // at 20/70 font size is 152 pt at 20/60 font size is 130 pt,etc for courier specifically
      // so the ration between each distance is actually around 46% when 20ft / 152pt = 46%
      // so then the ration can be used to calculate the font size 
      var tempPoint = 0;

      //all in ft as of now 
      if (currQuestionIndex == 1) { // 20/200, 1 letter, ratio calculated not gen
        tempPoint = 434;
      }
      else if (currQuestionIndex == 2 ) { // 20/100, 2 letters, ratio calculated not gen
        tempPoint = 217;
      }
      else if (currQuestionIndex == 3) { // 20/70, 3 letters
        tempPoint = 152;
      }
      else if (currQuestionIndex == 4) {// 20/50, 4 letters
        tempPoint = 108;
      }
      else if (currQuestionIndex == 5) {// 20/40, 5 letters
        tempPoint = 87;
      }
      else if (currQuestionIndex == 6) {// 20/30, 6 letters
        tempPoint = 65;
      }
      else if (currQuestionIndex == 7) {// 20/25, 7 letters, ratio calculated gen
        tempPoint = 52;
      }
      else if (currQuestionIndex == 8) {// 20/20, 8 letters
        tempPoint = 43;
      }
      else if (currQuestionIndex ==9) {// 20/15, 8 letters, ratio calculated gen
        tempPoint = 34;
      }
      else if (currQuestionIndex == 10) {// 20/13, 8 letters, ratio calculated gen
        tempPoint = 26;
      }
      else if (currQuestionIndex == 11) {// 20/10, 9 letters
        tempPoint = 21;
      }
      
      var res = tempPoint * initialDistance / (20 * 30.48); // 20 ft = 609.6cm; res = 20ft * initialDistance / 609.6 from ratio to find pt
      //gotta change from pt to px its usually 16px = 12 pt
      var finRes = res * 1.33;
      // console.log("TEMPPP");
      // console.log(temp);
      console.log("FONTSIZEEEE");
      console.log(finRes);
      setFontSize(finRes);

    };
        
  
    useEffect(() => {
      intervalId.current = setInterval(capture, 3000);
      return () => clearInterval(intervalId.current);
    }, [capture]);
  
    const convertImageToBase64 = (imageSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const base64Data = canvas.toDataURL("image/jpeg");
          resolve(base64Data);
        };
        img.onerror = reject;
        img.src = imageSrc;
      });
    };

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

    useEffect(() => {
        if (isCompleted) {
            onTestCompletion(true); // Notify parent that test is completed.
        }
    }, [isCompleted]);

    useEffect(() => {
        onSessionIdChange(sessionId);
    }, [sessionId]);

    // useEffect(() => {
    //   if (sessionId) {
    //     const db = getDatabase();
    //     const sessionRef = ref(db, `sessions/${sessionId}/connected`);
    //     onValue(sessionRef, (snapshot) => {
    //       setIsConnected(snapshot.val());
    //       setInitialDistance(distance); // sets the initial distance after the session is connected
    //       console.log("Initial Distance: ", distance);
    //     });
    //   }
    // }, [sessionId])

    const waitForInitialDistance = async () => {
      return new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (initialDistance !== null) {
            clearInterval(intervalId);
            resolve();
          }
        }, 100); // Check every 100 milliseconds for the initial distance
      });
    };
    
    useEffect(() => {
      const fetchData = async () => {
        if (sessionId) {
          const db = getDatabase();
          const sessionRef = ref(db, `sessions/${sessionId}/connected`);
          onValue(sessionRef, (snapshot) => {
            setIsConnected(snapshot.val());
          });
    
          await waitForInitialDistance(); // Wait for initial distance to be set
          // Perform additional actions here after initial distance is set
        }
      };
    
      fetchData();
    }, [sessionId]);
    


    const generateTestTemplate = () => {
      const letters = "CDEFLOPTZ"; // these letters are the common snellen chart letters
      const questions = [];
      const numQuestions = 10;

      for (let i = 0; i < numQuestions; i++) {
        if(i == 0){
          questions.push({
            questionId: i + 1,
            letter: "E",
            answer: '',
          });
        }
        else {
          const randIndex = Math.floor(Math.random() * letters.length);
          questions.push({
            questionId: i + 1,
            letter: letters[randIndex],
            answer: '',
          });
        }
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
            <Webcam
                ref={webcamRef}
                style={{
                    position: "absolute",
                    visibility: "hidden", // Hide from the user
                }}
            />
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
                    <Typography variant="body1" sx={{ mt: 7, textAlign: 'center' }}>
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
                  <Button variant="contained" color="primary" onClick={createSession} sx={{backgroundColor: "#1c4aa6", borderRadius: 0}}>
                  Create Session
                  </Button>
              </Box>
            )}

            {sessionId && !isConnected && (
              <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                      Scan this QR code with your mobile device to join:
                  </Typography>
                  <QRCode value={qrUrl} size={256} />
              </Box>
            )}

            
            {sessionId && isConnected && !isCompleted && (isPaused == 0) &&(
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Typography variant="h1" sx={{ fontSize: fontSize, fontFamily: 'Courier New' }}>
                  {currentQuestion}
                </Typography>
              </Box>
            )}

            {sessionId && isConnected && !isCompleted && isPaused === 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Typography variant="h1">
                  Come closer to the screen
                </Typography>
              </Box>
            )}
            
            {sessionId && isConnected && !isCompleted && isPaused === -1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Typography variant="h1">
                  Go further from the screen
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

            {/* Log the distance */}
            {distance && !isCompleted &&(
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body1">
                      Distance: {distance.toFixed(2)} cm
                  </Typography>
              </Box>
            )}
        </Container>
    );
}

export default Test_Step;
