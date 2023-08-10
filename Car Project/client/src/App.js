import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

import Login from './Components/Account/Login.component';

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Car SHOP
          </Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
