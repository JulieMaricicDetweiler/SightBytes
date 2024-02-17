import React, { useState, useEffect } from 'react';
import './test.css';
import DefaultAppBar from '../../components/shared/appbar';

const Test = () => {
    const [distance, setDistance] = useState(0);

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

    const progressBarStyle = {
        height: `${(distance / 100) * 300}px`,
        background: 'grey',
    };
      

    return (
        <div>
            <DefaultAppBar/>
            <h1 className="main-heading"> Vision Test </h1>
            <div className="test">
                <div className="progress-container">
                    <div className="progress-bar" style={progressBarStyle}></div>
                </div>
                <div className="dist-instructions">
                        <p>Continue moving away from your computer until the progress bar reaches the top</p>
                </div>
            </div>
            
        </div>
    );
}

export default Test;