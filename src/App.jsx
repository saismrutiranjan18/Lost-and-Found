// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as needed, e.g., <Route path="/report-lost" element={<ReportLost />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;