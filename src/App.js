import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import AddCard from './screen/Add';
import EditCard from './screen/Edit';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCard />} />
          <Route path="/edit" element={<EditCard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
