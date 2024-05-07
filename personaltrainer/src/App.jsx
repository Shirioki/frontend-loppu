import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Training from './components/Training';
import Customer from './components/Customer';
import Calendar from './components/Calendar';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Training
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/training">Training</Button>
          <Button color="inherit" component={Link} to="/customer">Customer</Button>
          <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/training" element={<Training />} /> 
        <Route path="/customer" element={<Customer />} /> 
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
}
export default App;
