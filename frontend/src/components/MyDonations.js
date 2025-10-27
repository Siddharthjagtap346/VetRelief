import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../App.css';

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        if (!window.ethereum) {
          console.error('MetaMask not found!');
          setLoading(false);
          return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!accounts || accounts.length === 0) {
          console.error('No accounts found in MetaMask');
          setLoading(false);
          return;
        }

        const donor = accounts[0].toLowerCase(); // normalize
        console.log('Donor address:', donor);

        // Fetch donations for this donor
        const res = await axios.get(`http://localhost:5000/api/donations/my-donations/${donor}`);
        console.log('Backend response:', res.data);

        if (res.data.success) setDonations(res.data.donations);
      } catch (err) {
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading your donations...</h2>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="donations-container"
    >
      <div className="shelters-header">
      <h1 className="form-title text-center mb-4">My Donations</h1>
</div>
      {donations.length === 0 ? (
        <p className="text-center">You haven't donated yet.</p>
      ) : (
        <div className="donations-grid">
          {donations.map((donation) => (
            <motion.div
              key={donation.id}
              className="donation-card gradient-card"
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            >
              <h3>{donation.shelterName}</h3>
              <p>Amount: {donation.amount} ETH</p>
              <p>Date: {new Date(donation.createdAt).toLocaleString()}</p>
              <a
                href={`http://localhost:5000/receipts/${donation.receipt.split('/').pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                Download Receipt
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default MyDonations;
