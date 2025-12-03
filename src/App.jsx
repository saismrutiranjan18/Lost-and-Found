// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import ContactPage from './pages/Contact.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='h-full flex justify-center items-center flex-col'>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* Add other routes as needed, e.g., <Route path="/report-lost" element={<ReportLost />} /> */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;