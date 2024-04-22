import React from 'react';
import { Box, Typography, Paper, Chip, Grid } from '@mui/material';

const DetailedResults = ({ scoringResult }) => (
    <Box sx={{ mt: 4, p: 3 }} fontFamily={'Raleway'} marginTop={'0px'}>
        <Typography variant="h4" gutterBottom textAlign="center">
            Detailed Results
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Left Eye Results: {scoringResult.leftEye.result}
                </Typography>
                {scoringResult.leftEye.questions.map((q, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 2,
                            my: 1,
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
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Right Eye Results: {scoringResult.rightEye.result}
                </Typography>
                {scoringResult.rightEye.questions.map((q, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 2,
                            my: 1,
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
            </Grid>
        </Grid>
    </Box>
);

export default DetailedResults;

