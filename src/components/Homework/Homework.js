import React from 'react';
import Layout from '../Layout'; // Import the Layout component
import { Box, Button, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const currentAssignment = {
  id: 1,
  title: 'Current Assignment',
  dueDate: '2024-06-10',
  details: 'Complete the exercises on pages 50-55 of the workbook.',
};

const pastAssignments = [
  {
    id: 2,
    title: 'Assignment 1',
    dueDate: '2024-05-01',
    details: 'Read chapters 1-3 and summarize the main points.',
  },
  {
    id: 3,
    title: 'Assignment 2',
    dueDate: '2024-05-15',
    details: 'Solve the problems in the worksheet provided.',
  },
  // Add more past assignments here
];

const Homework = () => {
  const navigate = useNavigate();

  const handleViewAssignment = (id) => {
    navigate(`/assignment/${id}`); // Navigate to the assignment details page
  };

  return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Homework Assignments</Typography>
        <Card style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5">Current Assignment</Typography>
            <Typography variant="body1">{currentAssignment.title}</Typography>
            <Typography variant="body2">Due Date: {currentAssignment.dueDate}</Typography>
            <Typography variant="body2">{currentAssignment.details}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleViewAssignment(currentAssignment.id)}>
              View Current Assignment
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Past Assignments</Typography>
            <List>
              {pastAssignments.map(assignment => (
                <ListItem button key={assignment.id} onClick={() => handleViewAssignment(assignment.id)}>
                  <ListItemText
                    primary={`${assignment.title} (Due: ${assignment.dueDate})`}
                    secondary={assignment.details}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default Homework;
