import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorModeContext } from '../App'
import { authApi } from '../api/authApi'

const Header = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Time Tracker
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          {authApi.isAuthenticated() && (
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              Выйти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header
