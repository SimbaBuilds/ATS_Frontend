import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'; // Import the Layout component
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Box, Card, CardContent, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';

const drawerWidth = 240;

const Sessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch the sessions from the backend or mock data
    const mockSessions = [
      { id: 1, date: '2024-06-01', topics: 'Algebra, Geometry' },
      { id: 2, date: '2024-06-02', topics: 'Trigonometry, Calculus' },
      // Add more mock sessions as needed
    ];
    setSessions(mockSessions);
  }, []);

  const handleSessionClick = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  const menuItems = [
    { text: 'Account', icon: <AccountCircleIcon />, path: '/account' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Homework', icon: <AssignmentIcon />, path: '/homework' },
    { text: 'Practice Tests', icon: <AssessmentIcon />, path: '/practicetests' },
    { text: 'Sessions', icon: <EventNoteIcon />, path: '/summary' },
  ];

  return (
    <Layout>
      <Box mt={4} mb={4}> {/* Add margin to move the content down */}
        <Typography variant="h4" gutterBottom>
          Chat Sessions
        </Typography>
      </Box>
      <Box mt={3}>
        <Grid container spacing={3}>
          {sessions.map((session) => (
            <Grid item xs={12} key={session.id}>
              <Card onClick={() => handleSessionClick(session.id)}>
                <CardContent>
                  <Typography variant="h6">
                    Session on {session.date} 
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Topics: {session.topics}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Details
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Sessions;
