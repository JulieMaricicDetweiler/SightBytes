import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';

const DetailedResults = ({ scoringResult }) => (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
        Detailed Results
        </Typography>
        {scoringResult.questions.map((q, index) => (
        <Paper
            key={index}
            sx={{
            p: 2,
            my: 1,
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: q.correct ? '#e8f5e9' : '#ffebee',
            }}
        >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Q{q.question}:
            </Typography>
            <Typography variant="body2">Your answer: {q.answer}</Typography>
            <Typography variant="body2">Correct answer: {q.letter}</Typography>
            <Chip
            label={q.correct ? "Correct" : "Incorrect"}
            color={q.correct ? "success" : "error"}
            sx={{ height: '24px' }}
            />
        </Paper>
        ))}
    </Box>
);

export default DetailedResults;
