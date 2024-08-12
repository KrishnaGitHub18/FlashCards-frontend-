import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import AddCard from './screen/Add';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
