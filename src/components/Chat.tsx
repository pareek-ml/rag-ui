import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, Typography, Avatar, AppBar, Toolbar, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import { Message } from '../types/chat';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await fetch('http://localhost:8000/generate-sql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input }),
        });

        if (response.ok) {
          const data = await response.json();
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: data.sql_query || 'No response from the bot.',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          console.error('Error from API:', response.statusText);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '97vw',
        maxWidth: '1600px',
        height: '80vh',
        display: 'flex',
        flexDirection: 'row',
        margin: '0 auto',
        gap: '20px',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <AppBar 
          position="static" 
          elevation={0} 
          sx={{ 
            backgroundColor: 'rgba(25, 118, 210, 0.9)',
            borderRadius: '16px 16px 0 0',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Toolbar>
            <ChatIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chat Assistant
            </Typography>
            <Avatar sx={{ bgcolor: 'white', color: '#1976d2' }}>
              <SmartToyIcon />
            </Avatar>
          </Toolbar>
        </AppBar>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '0 0 16px 16px',
            backgroundColor: 'transparent',
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            {messages.map((message) => (
              <Fade in={true} key={message.id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '70%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 0.5,
                        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: message.sender === 'user' ? 0 : 1,
                          ml: message.sender === 'user' ? 1 : 0,
                          bgcolor: message.sender === 'user' ? '#1976d2' : '#fff',
                          color: message.sender === 'user' ? '#fff' : '#1976d2',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {message.sender === 'user' ? 'You' : 'Assistant'}
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        padding: '12px 16px',
                        backgroundColor: message.sender === 'user' ? 'rgba(25, 118, 210, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        color: message.sender === 'user' ? '#fff' : 'inherit',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '12px',
                          [message.sender === 'user' ? 'right' : 'left']: '-6px',
                          width: '12px',
                          height: '12px',
                          backgroundColor: message.sender === 'user' ? 'rgba(25, 118, 210, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                          transform: 'rotate(45deg)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Typography sx={{ wordBreak: 'break-word' }}>{message.text}</Typography>
                    </Paper>
                  </Box>
                </Box>
              </Fade>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            sx={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    },
                  },
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                sx={{
                  backgroundColor: 'rgba(25, 118, 210, 0.9)',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 1)',
                  },
                  transition: 'all 0.2s',
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                  backdropFilter: 'blur(10px)',
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

export default Chat; 