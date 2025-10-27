import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import web3 from '../web3';
import VetRelief from '../contracts/VetRelief.json';
import { useLocation } from 'react-router-dom';

import '../index.css';

const contractAddress = '0x1B88515Dc714744A286e8b1206bdF46410C4a4ae';
const vetContract = new web3.eth.Contract(VetRelief.abi, contractAddress);

function Donate() {
  const location = useLocation();
  const passedShelterId = location.state?.shelterId || 1;

  const [shelterId, setShelterId] = useState(passedShelterId);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const from = accounts[0];

      if (!amount || isNaN(amount) || amount <= 0) {
        alert('Enter a valid donation amount in ETH.');
        setLoading(false);
        return;
      }

      const shelter = await vetContract.methods.shelters(shelterId).call();
      if (!shelter.verified) {
        alert('Selected shelter is not verified.');
        setLoading(false);
        return;
      }

      // Step 1: Donate on blockchain
      const tx = await vetContract.methods.donate(shelterId).send({
        from,
        value: web3.utils.toWei(amount, 'ether'),
      });

      const txHash = tx.transactionHash;

      // Step 2: Save donation in backend & generate receipt
      const { data } = await axios.post('http://localhost:5000/api/donations/donate', {
        shelterId,
        donor: from,
        amount,
        txHash,
      });

      alert('Donation successful! Receipt ready.');

      // Auto-download PDF receipt
      const link = document.createElement('a');
      link.href = `http://localhost:5000/${data.receiptPath}`;
      link.download = `VetRelief-Donation-${data.donationId}.pdf`;
      link.click();

      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Transaction failed. Check Ganache & MetaMask.');
    }

    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="donate-container">
      <h1 className="donate-title">Donate to VetRelief</h1>
      <form onSubmit={handleSubmit} className="donate-form">
        <input
          type="number"
          placeholder="Shelter ID"
          className="donate-input"
          value={shelterId}
          onChange={(e) => setShelterId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Amount in ETH"
          className="donate-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="donate-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Donate'}
        </button>
      </form>
    </motion.div>
  );
}

export default Donate;
