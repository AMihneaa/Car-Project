import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CarList from './Components/Car/CarList.component';

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
      <CarList />
    </div>
  );
}

export default App;
