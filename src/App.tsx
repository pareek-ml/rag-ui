import { CssBaseline, ThemeProvider, createTheme, GlobalStyles, Box, AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import Chat from './components/Chat';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f0f2f5',
    backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(37, 145, 251, 0.1) 0%, rgba(0, 7, 128, 0.1) 90.1%)',
    minHeight: '100vh',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      backgroundSize: '60px 60px',
      backgroundPosition: '0 0, 30px 30px',
      opacity: 0.1,
      zIndex: -1,
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: 'rgba(25, 118, 210, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Toolbar>
            <ChatIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AI Chat Assistant
            </Typography>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'white', color: '#1976d2' }}>
              <AccountCircleIcon />
            </Avatar>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '40px 20px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              zIndex: -1,
            },
          }}
        >
          <Chat />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
