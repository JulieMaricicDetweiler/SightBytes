import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, update, onValue, get } from 'firebase/database';
import axios from 'axios';
import './test.css';

const Test = () => {
    // Distance detection
    const [distance, setDistance] = useState(0);

    // Display Variables
    const [sessionId, setSessionId] = useState('');

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


    // Mobile useEffect
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
        const response = await axios.post('http://4.152.91.100/create-session');
        const newSessionId = response.data.session_id; // Assuming this is how your session ID is returned
        setSessionId(newSessionId); // Set session ID in state

        await postSessionToFirebase(newSessionId);
      } catch (error) {
        console.error('There was an error creating the session:', error);
      }
    }

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
    
  

  // MOBILE FUNCTIONS

  const submitAnswer = () => {
    const db = getDatabase();
    const answerRef = ref(db, `sessions/${sessionId}/questions/${currentQuestionIndex}/answer`);

    set(answerRef, currentAnswer)
        .then(() => {
            console.log("Answer submitted successfully.");
            // Optionally move to the next question automatically after submitting the answer
            // navigateQuestion(sessionId, 'next');
        })
        .catch((error) => console.error("Error submitting answer:", error));
  };
  
  
      
  return (
      <div className="test-page-container">
          <h1 className="main-heading"> Vision Test </h1>

          {!isMobile && !sessionId && (
            <button onClick={createSession}>Create Session</button>
          )}

          {isMobile && !isConnected && (
            <>
              <input
                type="text"
                placeholder="Enter Session ID"
                value={inputSessionId}
                onChange={(e) => setInputSessionId(e.target.value)}
              />
              <button onClick={connectToSession}>Connect to Session</button>
            </>
          )}

          {sessionId && (
            <div>
              <p>Session ID: {sessionId}</p>
              {isConnected ? (
                    <p>Connected. You can start the test.</p>
                ) : (
                    <p>Waiting for another device to connect...</p>
              )}
            </div>
          )}

          {!isMobile && sessionId && isConnected && (
              <div>
                  <p>Current Letter: {currentQuestion}</p>
              </div>
          )}

          {isMobile && isConnected && (
              <>
                  <p>Current Letter: {currentQuestion}</p>
                  <input
                      type="text"
                      placeholder="Enter your answer"
                      // Assuming you have a state to store the current answer
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                  />
                  <div>
                    <button
                        onClick={() => navigateQuestion('back')}
                        disabled={currentQuestionIndex <= 0} // Disable if at the start
                        style={{ opacity: currentQuestionIndex <= 0 ? 0.5 : 1 }}>Back</button>
                    <button
                        onClick={() => navigateQuestion('next')}
                        disabled={currentQuestionIndex >= 9} // Disable if at the end
                        style={{ opacity: currentQuestionIndex >= 9 ? 0.5 : 1 }}>Next</button>
                  </div>
                  <button onClick={() => submitAnswer()}>Submit Answer</button>
              </>
          )}

      </div>
    );
}

export default Test;
