import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/auth/LogIn';
import SignIn from './components/auth/SignIn';
import TextAnalysis from './components/analysis/TextAnalysis';
import RadicalMessages from './components/analysis/RadicalMessages';
import RadicalUsers from './components/analysis/RadicalUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/analyze" element={<TextAnalysis />} />
        <Route path="/radical-messages" element={<RadicalMessages />} />
        <Route path="/radical-users" element={<RadicalUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
