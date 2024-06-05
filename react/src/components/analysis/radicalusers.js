import React, { useState, useEffect } from 'react';
import AnalysisService from '../../services/AnalysisService';

const RadicalUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AnalysisService.getRadicalUsers();
        setUsers(response.data);
      } catch (error) {
        alert('Failed to fetch radical users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Most Radical Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default RadicalUsers;
