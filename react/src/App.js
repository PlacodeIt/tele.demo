import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import TextAnalysis from './components/analysis/TextAnalysis';
import RadicalMessages from './components/analysis/RadicalMessages';
import RadicalUsers from './components/analysis/RadicalUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/analyze" element={<TextAnalysis />} />
        <Route path="/radical-messages" element={<RadicalMessages />} />
        <Route path="/radical-users" element={<RadicalUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
