import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './components/Account/Account';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ChatInterface from './components/Chat/ChatInterface';
import Dashboard from './components/Dashboard/Dashboard';
import Homework from './components/Homework/Homework';
import PracticeTests from './components/PracticeTests/PracticeTests';
import SessionSummaries from './components/Sessions/Sessions';

function App() {
  console.log('App component rendered');

  return (
    <Router>
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/summary" element={<SessionSummaries />} />
        <Route path="/practicetests" element={<PracticeTests />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
