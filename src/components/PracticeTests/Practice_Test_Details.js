// src/components/PracticeTests/PracticeTestDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const practiceTests = [
  {
    id: 1,
    date: '2024-05-01',
    score: 1200,
    details: 'Math: 600, Reading/Writing: 600',
    diagnostic: 'Detailed diagnostic for the test taken on 2024-05-01.',
  },
  {
    id: 2,
    date: '2024-05-15',
    score: 1250,
    details: 'Math: 650, Reading/Writing: 600',
    diagnostic: 'Detailed diagnostic for the test taken on 2024-05-15.',
  },
  // Add more practice test details here
];

const PracticeTestDetails = () => {
  const { id } = useParams();
  const test = practiceTests.find(test => test.id === parseInt(id));

  if (!test) {
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Test Not Found</Typography>
        <Typography>Sorry, the test you are looking for does not exist.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Diagnostic for Test on {test.date}</Typography>
      <Typography variant="h6">Score: {test.score}</Typography>
      <Typography>{test.details}</Typography>
      <Typography>{test.diagnostic}</Typography>
    </Box>
  );
};

export default PracticeTestDetails;
