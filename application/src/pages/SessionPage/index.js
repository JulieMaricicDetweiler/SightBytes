import React, { useState } from 'react';
import axios from 'axios';

function SessionPage() {
    const [sessionId, setSessionId] = useState('');

    const createSession = async () => {
        try {
            const response = await axios.post('http://localhost:8000/create-session/');
            setSessionId(response.data.session_id);
        } catch (error) {
            console.error('There was an error creating the session:', error);
        }
    };

    return (
        <div>
            <h2>Session Handler</h2>
            <button onClick={createSession}>Create Session</button>
            {sessionId && <p>Session ID: {sessionId}</p>}
        </div>
    );
}

export default SessionPage;
