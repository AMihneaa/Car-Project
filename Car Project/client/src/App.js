import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';

import Login from './Components/Account/Login.component';
import Register from './Components/Account/Register.component'
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

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<CarList />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
