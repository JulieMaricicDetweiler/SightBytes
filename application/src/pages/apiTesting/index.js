import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const TestEndpoint = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reporter: '',
        severity: ''
    });

    // Handle change in form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Add a hardcoded project token
        const projectToken = 'L3zYcBBKKEeT3FtkFlwN'; // Replace 'your_project_token_here' with your actual token

        const dataWithToken = {
            ...formData,
            projectToken // Include the project token in the request
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataWithToken)
        };

        // Assuming your endpoint URL is defined here
        const endpoint = 'https://us-central1-debug-dynasty.cloudfunctions.net/submitIssue';
        
        fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <Box className='test-endpoint-container' sx={{ margin: 'auto', paddingTop: '100px', maxWidth: '60%'}}>
            <Typography variant="h6">Submit an Issue</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    label="Your Email"
                    variant="outlined"
                    name="reporter"
                    value={formData.reporter}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Severity"
                    variant="outlined"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    fullWidth
                    select
                    SelectProps={{
                        native: true,
                    }}
                    margin="normal"
                >
                    {/* Options for the 'severity' select input */}
                    <option value=""></option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </TextField>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 5}}>
                    Submit Issue
                </Button>
            </form>
        </Box>
    );
}

export default TestEndpoint;
