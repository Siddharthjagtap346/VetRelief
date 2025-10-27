import React from 'react';
import '../App.css';
import heroImage from '../assets/hero.jpg';
import shelter1 from '../assets/shelter1.jpg';
import shelter2 from '../assets/shelter2.jpg';
import shelter3 from '../assets/shelter3.jpg';

function Home({ loggedIn, user }) {
  const recentShelters = [
    { name: 'Happy Paws Shelter', img: shelter1 },
    { name: 'Furry Friends', img: shelter2 },
    { name: 'Safe Haven', img: shelter3 },
  ];

  if (loggedIn && user) {
  const isAdmin = user.email === 'admin@gmail.com';
  return (
    <div style={{ padding: '50px 20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
        <img 
  src={heroImage} 
  alt="Helping Animals" 
  style={{
    flex: '1 1 350px',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    maxHeight: '400px',
    width: '100%',
    objectFit: 'contain',   // changed from cover to contain
    transition: 'transform 0.3s'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
/>


        <div style={{ flex: '1 1 350px' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: "'Fredoka One', cursive", marginBottom: '20px' }}>
            Welcome, {isAdmin ? 'Admin' : user.name || user.email}!
            {isAdmin && <span style={{ marginLeft: '10px', color: '#fff', background: '#f39c12', padding: '5px 12px', borderRadius: '8px', fontSize: '0.9rem' }}>Admin</span>}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '30px', lineHeight: '1.6' }}>
            {isAdmin ? "Manage shelters, view donations, and keep the mission running smoothly." : "Thank you for helping animals! Make a donation today and see the impact."}
          </p>
          <a href="/donate" style={{
            background: '#28a745',
            color: '#fff',
            padding: '15px 35px',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            transition: '0.3s'
          }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; }}
          >
            Donate Now
          </a>
          {isAdmin && <a href="/add-shelter" style={{
            background: '#ffc107',
            color: '#fff',
            padding: '15px 35px',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            marginLeft: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            transition: '0.3s'
          }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; }}
          >
            Add Shelter
          </a>}
        </div>
      </div>

      {/* Optional Feature Highlights */}
      {!isAdmin && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
          {['✅ Verified Shelters', '💳 Secure & Safe', '📊 Track Impact'].map((feat, idx) => (
            <div key={idx} style={{
              flex: '1 1 130px',
              textAlign: 'center',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.03)',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              cursor: 'default',
              transition: '0.3s'
            }}>
              {feat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



  // Guest Home Page
  return (
    <div className="home-container">
      {/* Hero Section */}
      
        <img src={heroImage} alt="Helping Animals" style={{
          flex: '1 1 400px',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          maxHeight: '400px',
          objectFit: 'cover',
          transition: 'transform 0.3s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ flex: '1 1 400px', position: 'relative' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2', fontFamily: "'Fredoka One', cursive" }}>
            Welcome to VetRelief
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '25px', color: '#555', lineHeight: '1.6' }}>
            Donate to verified shelters and see the impact of your generosity in real-time. Help stray and rescued animals find a better life.
          </p>
          <a href="/donate" style={{
            background: '#00ff80b4',
            color: '#fff',
            padding: '15px 35px',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            transition: '0.3s'
          }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; }}
          >
            Donate Now
          </a>

          {/* Feature Highlights */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
            {['✅ Verified Shelters', '💳 Secure Donations', '📊 Track Impact'].map((feat, idx) => (
              <div key={idx} style={{
                flex: '1 1 130px',
                textAlign: 'center',
                padding: '12px',
                borderRadius: '12px',
                background: idx % 2 === 0 ? 'rgba(0, 210, 255,0.15)' : 'rgba(58,123,213,0.15)',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'default',
                transition: '0.3s'
              }}>
                {feat}
              </div>
            ))}
          </div>
        </div>
      

      {/* Recent Shelters */}
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: "'Fredoka One', cursive" }}>Shelters You Can Help</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {recentShelters.map((shelter, index) => (
            <div key={index} style={{
              flex: '1 1 250px',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }}
            >
              <img src={shelter.img} alt={shelter.name} style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                transition: 'transform 0.3s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <h3 style={{ padding: '12px 0', fontSize: '1.2rem', fontWeight: '700', color: '#333' }}>{shelter.name}</h3>
              <p style={{ fontSize: '0.95rem', color: '#555', padding: '0 10px 15px' }}>Join our mission to save pets and make a difference today.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
