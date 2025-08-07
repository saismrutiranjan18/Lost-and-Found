// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar bg-gradient-to-r from-blue-800 to-indigo-900 text-white fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold tracking-tight animate-slideInLeft">
          Campus Lost & Found
        </h1>
        <div className="space-x-6">
          <Link to="/" className="nav-link hover:text-blue-300 transition animate-slideInRight">
            Signup
          </Link>
          <Link to="/signin" className="nav-link hover:text-blue-300 transition animate-slideInRight delay-100">
            Signin  
          </Link>
          <Link to="/home" className="nav-link hover:text-blue-300 transition animate-slideInRight">
            Home
          </Link>
          <Link to="/lost-items" className="nav-link hover:text-blue-300 transition animate-slideInRight delay-100">
            Lost Items
          </Link>
          <Link to="/found-items" className="nav-link hover:text-blue-300 transition animate-slideInRight delay-200">
            Found Items
          </Link>
          <Link to="/report-lost" className="nav-link hover:text-blue-300 transition animate-slideInRight delay-300">
            Report Lost
          </Link>
          <Link to="/report-found" className="nav-link hover:text-blue-300 transition animate-slideInRight delay-400">
            Report Found
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;