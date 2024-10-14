// src/components/Sessions/SessionDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';

const drawerWidth = 240;

const SessionDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the session details from the backend or mock data
    const mockSession = { id: sessionId, date: '2024-06-01', topics: 'Algebra, Geometry', transcript: 'Transcript of session...' };
    setSession(mockSession);
  }, [sessionId]);

  const menuItems = [
    { text: 'Account', icon: <AccountCircleIcon />, path: '/account' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Homework', icon: <AssignmentIcon />, path: '/homework' },
    { text: 'Practice Tests', icon: <AssessmentIcon />, path: '/practicetests' },
    { text: 'Sessions', icon: <EventNoteIcon />, path: '/summary' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Session Detail
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{ width: drawerWidth, flexShrink: 0 }}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <Toolbar />
        <div style={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: 24, marginLeft: drawerWidth }}>
        <Toolbar />
        {session ? (
          <Paper>
            <Box p={3}>
              <Typography variant="h5">
                Session Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {session.date}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Topics: {session.topics}
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                Transcript:
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                {session.transcript}
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => navigate('/sessions')}>
                  Back to Sessions
                </Button>
              </Box>
            </Box>
          </Paper>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </main>
    </div>
  );
};

export default SessionDetail;
