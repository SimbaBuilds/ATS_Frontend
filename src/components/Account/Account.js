import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'; // Import the Layout component
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Tabs, Tab, Box, TextField, Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const drawerWidth = 240;

const Account = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const menuItems = [
    { text: 'Account', icon: <AccountCircleIcon />, path: '/account' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Homework', icon: <AssignmentIcon />, path: '/homework' },
    { text: 'Practice Tests', icon: <AssessmentIcon />, path: '/practicetests' },
    { text: 'Sessions', icon: <EventNoteIcon />, path: '/summary' },
  ];

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Layout>
      <Paper>
        <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Personal Info" icon={<PersonIcon />} />
          <Tab label="Subscription" icon={<CreditCardIcon />} />
          <Tab label="Security" icon={<VpnKeyIcon />} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <PersonalInfo />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Subscription />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Security />
        </TabPanel>
      </Paper>
    </Layout>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PersonalInfo = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField fullWidth label="Name" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Email" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Phone Number" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Save</Button>
      </Grid>
    </Grid>
  );
};

const Subscription = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Current Plan: Premium</Typography>
        <Button variant="outlined" color="secondary">Change Plan</Button>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Billing Address" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Update Billing Info</Button>
      </Grid>
    </Grid>
  );
};

const Security = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField fullWidth label="Current Password" type="password" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="New Password" type="password" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Confirm New Password" type="password" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Change Password</Button>
      </Grid>
    </Grid>
  );
};

export default Account;
