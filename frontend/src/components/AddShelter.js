import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import web3 from '../web3';
import VetRelief from '../contracts/VetRelief.json';
import '../App.css';

const contractAddress = '0x1B88515Dc714744A286e8b1206bdF46410C4a4ae';
const vetContract = new web3.eth.Contract(VetRelief.abi, contractAddress);

function AddShelter({ user }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.email !== 'admin@gmail.com') {
      alert('Only admin can add shelters');
      return;
    }

    if (!name || !wallet) {
      alert('Enter shelter name and wallet address');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('wallet', wallet);
      formData.append('email', user.email);
      if (image) formData.append('image', image);

      // 1️⃣ Add to backend
      const res = await axios.post('http://localhost:5000/api/shelters/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!res.data.success) {
        throw new Error('Backend failed to add shelter');
      }

      // 2️⃣ Add to smart contract only if backend succeeded
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await vetContract.methods.addShelter(name, wallet).send({ from: accounts[0] });

      alert('✅ Shelter added successfully (Backend + Blockchain)!');
      setName('');
      setWallet('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Error adding shelter:', err);
      alert(err.response?.data?.message || 'Error adding shelter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="form-container">
      <h1 className="form-title">Add Shelter</h1>
      <form onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          placeholder="Shelter Name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Shelter Wallet Address"
          className="form-input"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Add Shelter'}
        </button>
      </form>
    </motion.div>
  );
}

export default AddShelter;
