import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthPage from './components/auth/AuthPage';
import SignUpPage from './components/auth/SignUpPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import MainScreen from './components/screens/MainScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import AccountScreen from './components/screens/AccountScreen';
import SearchScreen from './components/screens/SearchScreen';
import FriendsScreen from './components/screens/FriendsScreen';
import ChatScreen from './components/screens/ChatScreen';
import TextAnalysis from './components/analysis/TextAnalysis';
import RadicalMessages from './components/analysis/RadicalMessages';
import RadicalUsers from './components/analysis/RadicalUsers';
import ChannelsScreen from './components/screens/ChannelsScreen';
import UsersScreen from './components/screens/UsersScreen';
import MessagesScreen from './components/screens/MessagesScreen';
import LastSeenScreen from './components/screens/LastSeenScreen';
import FavoritesScreen from './components/screens/FavoritesScreen';
import DownloadsScreen from './components/screens/DownloadsScreen';
import './styles/global.css';


const queryClient = new QueryClient();

function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  return null;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes> 
      <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/main"element={<MainScreen />} />
        <Route path="/profile" element={<ProfileScreen />}/>
        <Route path="/account" element={<AccountScreen />}/>
        <Route path="/chat" element={<ChatScreen />}/>
        <Route path="/friends" element={<FriendsScreen />}/>
        <Route path="/search" element={<SearchScreen />}/>
        <Route path="/channels" element={<ChannelsScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/last-seen" element={<LastSeenScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/downloads" element={<DownloadsScreen />} />
        <Route path="/analyze" element={<TextAnalysis />} />
        <Route path="/radical-messages" element={<RadicalMessages />} />
        <Route path="/radical-users" element={<RadicalUsers />} />
        <Route path="" element={<Redirect to="/login" />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
};

export default App;
