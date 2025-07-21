import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KataChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const greet = async () => {
      const response = await axios.get('/api/kata/greet');
      setChatHistory([...chatHistory, { sender: 'Kata', text: response.data.response }]);
    };
    greet();
  }, []);

  const sendMessage = async () => {
    // This is a placeholder for sending a message to Kata
    // In a real application, you would send the message to the backend
    // and get a response from Kata
    setChatHistory([...chatHistory, { sender: 'User', text: message }, { sender: 'Kata', text: 'Estoy aprendiendo a responder. Gracias por tu paciencia.' }]);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, width: '300px', height: '400px', border: '1px solid black', backgroundColor: 'white' }}>
      <div style={{ height: '350px', overflowY: 'scroll' }}>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <strong>{chat.sender}:</strong> {chat.text}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default KataChat;
