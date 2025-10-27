import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Donate from './components/donate';
import AddShelter from './components/AddShelter';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Shelters from './components/Shelters';
import MyDonations from './components/MyDonations';
//import AllDonations from './components/AllDonations';        

import logo from './assets/logo.png';
import { useEffect } from 'react';

function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // NEW
  const navigate = useNavigate();

  // Persist login state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
    setLoadingUser(false); // finished loading
  }, []);

  if (loadingUser) {
    return <div>Loading...</div>; // show spinner while checking login
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Header */}
      <header className="nav-bar">
  <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <img src={logo} alt="VetRelief Logo" style={{ height: '50px' }} />
  <span className="logo-text">VetRelief</span>
</div>

  <nav>
    <Link to="/">Home</Link>
    <Link to="/shelters">Shelters</Link>

    {loggedIn ? (
      <>
        <Link to="/donate">Donate</Link>

        {user?.email === 'admin@gmail.com' ? (
          <>
            <Link to="/add-shelter">Add Shelter</Link>
            <Link to="/my-donations">My Donations</Link>
          </>
        ) : (
          <Link to="/my-donations">My Donations</Link>
        )}

        <Link to="/contact">Contact Us</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/contact">Contact Us</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    )}
  </nav>
</header>




      {/* Main Routes */}
      <main>
        <Routes>
  <Route path="/" element={<Home loggedIn={loggedIn} user={user} />} />
  <Route path="/donate" element={loggedIn ? <Donate /> : <Navigate to="/login" />} />
  <Route
    path="/add-shelter"
    element={
      loggedIn && user?.email === 'admin@gmail.com' ? (
        <AddShelter user={user} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
  <Route
  path="/my-donations"
  element={loggedIn ? <MyDonations /> : <Navigate to="/login" />}
/>


  <Route path="/shelters" element={<Shelters />} /> {/* ✅ new route */}
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
  <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setUser={setUser} />} />
</Routes>
</main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 VetRelief. All rights reserved.</p>
        <p>Verified Donations for Stray Animals</p>
      </footer>
    </>
  );
}


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;     