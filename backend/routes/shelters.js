const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure folder exists
const shelterUploadDir = path.join(__dirname, '../uploads/shelters');
if (!fs.existsSync(shelterUploadDir)) {
  fs.mkdirSync(shelterUploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, shelterUploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// 🟢 Add Shelter (Admin only)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, wallet, email } = req.body;
    const image = req.file ? `shelters/${req.file.filename}` : null;

    if (email !== 'admin@gmail.com') {
      return res.status(403).json({ success: false, message: 'Only admin can add shelters' });
    }

    if (!name || !wallet) {
      return res.status(400).json({ success: false, message: 'Missing name or wallet' });
    }

    const [result] = await db
      .promise()
      .query('INSERT INTO shelters (name, wallet, image) VALUES (?, ?, ?)', [name, wallet, image]);

    return res.json({ success: true, shelterId: result.insertId });
  } catch (err) {
    console.error('❌ Error adding shelter:', err);
    res.status(500).json({ success: false, message: 'Server error while adding shelter' });
  }
});

// 🟢 List all shelters
router.get('/', async (req, res) => {
  try {
    const [shelters] = await db.promise().query('SELECT * FROM shelters');
    const formatted = shelters.map(s => ({
      ...s,
      image: s.image ? `http://localhost:5000/uploads/${s.image}` : null
    }));
    res.json({ success: true, shelters: formatted });
  } catch (err) {
    console.error('❌ Error fetching shelters:', err);
    res.status(500).json({ success: false, message: 'Server error fetching shelters' });
  }
});

module.exports = router;
