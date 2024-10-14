import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'; // Import the Layout component
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Box, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Account', icon: <AccountCircleIcon />, path: '/account' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Homework', icon: <AssignmentIcon />, path: '/homework' },
    { text: 'Practice Tests', icon: <AssessmentIcon />, path: '/practicetests' },
    { text: 'Sessions', icon: <EventNoteIcon />, path: '/summary' },
  ];

  const tutoringServiceFeatures = [
    { feature: 'Chat Interface', available: true },
    { feature: 'File/Screenshot Understanding', available: true },
    { feature: 'Reliable Math Capabilities', available: true },
    { feature: 'Reliable Grammar Capabilities', available: true },
    { feature: 'Assessment Capabilities', available: true },
    { feature: 'Robust Up to Date SAT Knowledge', available: true },
    { feature: 'Diagnostic Testing', available: true },
    { feature: 'Homework Assignments', available: true },
    // { feature: 'Curriculum Development', available: true },
    // { feature: 'Guided, Long Term Learning', available: true },
  ];

  const comparisonData = [
    { service: 'Automated Tutoring Service', features: [true, true, true, true, true, true, true, true] },
    { service: 'Chat-GPT Plus', features: [true, true, null, null, null, null, null, null] },
    { service: 'Khanmigo Khan Academy Tutor', features: [true, null, null, null, null, null, null, null] },
  ];

  const renderFeatureIcon = (available) => {
    if (available === true) return <CheckIcon style={{ color: 'green' }} />;
    if (available === null) return <ClearIcon style={{ color: 'red' }} />;
    return null;
  };

  return (
    <Layout>
      <Box mt={4} mb={2}> {/* Add margin to move the content down */}
        <Typography variant="h4" gutterBottom>
          Welcome to Our Tutoring Service
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
      Standardized tests are making a resurgence.
      </Typography>
      <Typography variant="body1" paragraph>
      Many educational institutions adopted test-blind and test-optional policies during COVID.  Now, programs are realizing that they have lost a valuable tool for identifying students with potential.
      </Typography>

      <Typography paragraph>
        Our AI-driven tutoring service offers a comprehensive approach to SAT preparation, ensuring you are well-prepared for every section of the exam. Here’s why you should choose us:
      </Typography>
      <Box mt={3}>
        {/* <Grid container spacing={3}>
          {tutoringServiceFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {feature.feature}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {renderFeatureIcon(feature.available)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Box>
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Comparison with Other Services
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                {tutoringServiceFeatures.map((feature, index) => (
                  <TableCell key={index}>{feature.feature}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.service}</TableCell>
                  {row.features.map((available, i) => (
                    <TableCell key={i}>{renderFeatureIcon(available)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={5} textAlign="center">
        <Typography variant="h6" gutterBottom>
          Try Our Service!
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>
          Get 45 Minutes Free
        </Button>
      </Box>
    </Layout>
  );
};

export default Dashboard;
