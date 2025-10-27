import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Shelters() {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shelters');
        if (res.data.success) setShelters(res.data.shelters);
      } catch (err) {
        console.error('❌ Error fetching shelters:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShelters();
  }, []);

  const handleDonateClick = (shelterId) => {
    navigate('/donate', { state: { shelterId } });
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading shelters...</h2>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="shelters-container"
    >
      <div className="shelters-header">
  <h1 className="form-title">All Shelters</h1>
  <p>Total Shelters: {shelters.length}</p>
</div>


      <div className="shelters-grid">
        {shelters.length === 0 ? (
          <p className="text-center">No shelters added yet.</p>
        ) : (
          shelters.map((shelter) => (
            <motion.div
              key={shelter.id}
              className="shelter-card gradient-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            >
              <div className="shelter-img-wrapper">
                {shelter.image ? (
                  <img
                    src={shelter.image}
                    alt={shelter.name}
                    className="shelter-img"
                  />
                ) : (
                  <div className="shelter-placeholder">No Image</div>
                )}
              </div>
              <div className="shelter-info" style={{ textAlign: 'center' }}>
                <h3>{shelter.name}</h3>
                <p className="wallet-text" title={shelter.wallet}>
                  Wallet: {shelter.wallet.slice(0, 6)}...{shelter.wallet.slice(-4)}
                </p>
                <button
                  className="donate-card-btn"
                  onClick={() => handleDonateClick(shelter.id)}
                >
                  Donate
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Shelters;
