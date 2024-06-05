import React, { useState, useEffect } from 'react';
import AnalysisService from '../../services/analysisservice';

const RadicalMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AnalysisService.getRadicalMessages();
        setMessages(response.data);
      } catch (error) {
        alert('Failed to fetch radical messages');
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Most Radical Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default RadicalMessages;
