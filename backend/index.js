const express = require('express');
const cors = require('cors');
const path = require('path');

const donationRoutes = require('./routes/donations');
const authRoutes = require('./routes/auth');
const shelterRoutes = require('./routes/shelters');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ✅ Serve receipts folder statically
app.use('/receipts', express.static(path.join(__dirname, 'receipts')));
// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shelters', shelterRoutes);

// Start server
app.listen(5000, () => console.log('✅ Backend running on port 5000'));
