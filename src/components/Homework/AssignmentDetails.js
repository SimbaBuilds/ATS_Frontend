// src/components/Homework/AssignmentDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout'; // Import the Layout component
import { Box, Typography } from '@mui/material';

const assignments = [
  {
    id: 1,
    title: 'Current Assignment',
    dueDate: '2024-06-10',
    details: 'Complete the exercises on pages 50-55 of the workbook.',
  },
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
  // Add more assignments here
];

const AssignmentDetails = () => {
  const { id } = useParams();
  const assignment = assignments.find(assignment => assignment.id === parseInt(id));

  if (!assignment) {
    return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Assignment Not Found</Typography>
        <Typography>Sorry, the assignment you are looking for does not exist.</Typography>
      </Box>
      </Layout>
    );
  }

  return (
        <Layout>
        <Box p={3}>
        <Typography variant="h4" gutterBottom>Details for {assignment.title}</Typography>
        <Typography variant="h6">Due Date: {assignment.dueDate}</Typography>
        <Typography>{assignment.details}</Typography>
        </Box>
        </Layout>

  );
};

export default AssignmentDetails;
