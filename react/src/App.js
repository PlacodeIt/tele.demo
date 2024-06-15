import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import SignUpPage from './components/auth/SignUpPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import MainScreen from './components/screens/MainScreen';
import TextAnalysis from './components/analysis/TextAnalysis';
import RadicalMessages from './components/analysis/RadicalMessages';
import RadicalUsers from './components/analysis/RadicalUsers';
import './styles/global.css';




const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/main"elemen={<MainScreen />} />
        <Route path="/analyze" element={<TextAnalysis />} />
        <Route path="/radical-messages" element={<RadicalMessages />} />
        <Route path="/radical-users" element={<RadicalUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
