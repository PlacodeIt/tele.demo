import React, { useEffect, useState }   from 'react';
import axios from 'axios';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import SideBar from '../design/SideBar.tsx';
import './ProfileScreen.css'


const ProfileScreen = () => {
    const [user, setUser] = useState({ email: '', username: '' });
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('/api/users/me', { withCredentials: true });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    }, []);
  
    const handleUpdateEmail = async () => {
      try {
        const response = await axios.put('/api/users/me/email', { email: newEmail }, { withCredentials: true });
        setUser(prev => ({ ...prev, email: response.data.email }));
        setMessage('Email updated successfully');
      } catch (error) {
        console.error('Error updating email:', error);
      }
    };
  
    const handleUpdateUsername = async () => {
      try {
        const response = await axios.put('/api/users/me/username', { username: newUsername }, { withCredentials: true });
        setUser(prev => ({ ...prev, username: response.data.username }));
        setMessage('Username updated successfully');
      } catch (error) {
        console.error('Error updating username:', error);
      }
    };
  
    const handleUpdatePassword = async () => {
      try {
        await axios.put('/api/users/me/password', { newPassword }, { withCredentials: true });
        setMessage('Password updated successfully');
      } catch (error) {
        console.error('Error updating password:', error);
      }
    };

    return(
        <>
        <NavBar />
        <SideBar />
        <Container component="profile" maxWidth="md">
        <CssBaseline />
        <div className="profile-container" maxWidth="md">
        <Typography component="h1" variant="h5">
        <div>
        <h1>Profile</h1>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <div>
          <h2>Update Email</h2>
          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" />
          <button onClick={handleUpdateEmail}>Update Email</button>
        </div>
        <div>
          <h2>Update Username</h2>
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="New Username" />
          <button onClick={handleUpdateUsername}>Update Username</button>
        </div>
        <div>
          <h2>Update Password</h2>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
          <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
        {message && <p>{message}</p>}
      </div>
        </Typography>
        <div>
        <></>
        </div>
        </div>
        </Container>
        </>
    )
}
export default ProfileScreen;

