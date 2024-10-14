import React from 'react';
import Layout from '../Layout'; // Import the Layout component
import { Box, Button, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const practiceTests = [
  {
    id: 1,
    date: '2024-05-01',
    score: 1200,
    details: 'Math: 600, Reading/Writing: 600',
  },
  {
    id: 2,
    date: '2024-05-15',
    score: 1250,
    details: 'Math: 650, Reading/Writing: 600',
  },
  // Add more practice test summaries here
];

const PracticeTests = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate('/take-test'); // Navigate to the page for taking a new practice test
  };

  const handleViewDiagnostic = (id) => {
    navigate(`/practice-test-details/${id}`); // Navigate to the diagnostic page for the selected test
  };

  return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Practice Tests</Typography>
        <Button variant="contained" color="primary" onClick={handleTakeTest} style={{ marginBottom: '20px' }}>
          Take A Practice Test
        </Button>
        <Card>
          <CardContent>
            <Typography variant="h5">Summary of Practice Tests</Typography>
            <List>
              {practiceTests.map(test => (
                <ListItem button key={test.id} onClick={() => handleViewDiagnostic(test.id)}>
                  <ListItemText
                    primary={`Test on ${test.date}`}
                    secondary={`Score: ${test.score} - ${test.details}`}
                  />
                      <Typography variant="body2" color="primary">
                        Details
                      </Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default PracticeTests;
