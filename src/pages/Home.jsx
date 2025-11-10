// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container w-full min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 pt-20">
      <div className="hero-content animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to Campus Lost & Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Lost or found something on campus? Use our portal to report items and reconnect with what matters.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/report-lost"
            className="cta-button bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition animate-pulse"
          >
            Report Lost
          </Link>
          <Link
            to="/report-found"
            className="cta-button bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition animate-pulse"
          >
            Report Found
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;