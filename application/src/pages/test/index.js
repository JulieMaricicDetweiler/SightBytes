import React, { useState, useEffect } from 'react';
import './test.css';

const Test = () => {
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomDist = Math.floor(Math.random() * 101);
            setDistance(randomDist);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const progressBarStyle = {
        height: `${(distance / 100) * 300}px`,
        background: 'grey',
    };
      

    return (
        <div>
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