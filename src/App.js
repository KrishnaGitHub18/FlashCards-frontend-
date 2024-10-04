import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import AddCard from './screen/Add';
import EditCard from './screen/Edit';
import Login from './screen/Login';
import Head from './screen/Login-Head';
import Signup from './screen/signup';
import Waitlist from './screen/DisplayWaitlist';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCard />} />
          <Route path="/edit" element={<EditCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/head" element={<Head />} />
        </Routes>
      </Router>
    </>
  );
}

export default App ;
