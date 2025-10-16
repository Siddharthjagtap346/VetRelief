const express = require('express'); 
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const receiptsDir = 'receipts';
if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir);

// POST donation record and generate professional receipt
router.post('/donate', async (req, res) => {
  const { shelterId, donor, amount, txHash } = req.body;

  try {
    // First, fetch the shelter name
    db.query('SELECT name FROM shelters WHERE id = ?', [shelterId], (err, shelterResults) => {
      if (err) return res.status(500).send(err);
      if (!shelterResults.length) return res.status(404).send({ error: 'Shelter not found' });

      const shelterName = shelterResults[0].name;

      // Generate PDF receipt
      const receiptFile = `${receiptsDir}/receipt-${Date.now()}.pdf`;
      const doc = new PDFDocument({ size: 'A4', margin: 50 });

      // Pipe PDF to file
      doc.pipe(fs.createWriteStream(receiptFile));

      // --- Professional Header ---
      doc
        .fillColor('#333')
        .fontSize(22)
        .text('VetRelief Donation Receipt', { align: 'center', underline: true });

      doc.moveDown(2);

      // --- Shelter & Donor Info Box ---
      doc
        .fontSize(14)
        .fillColor('#555')
        .text(`Shelter: ${shelterName}`, { continued: true })
        .text(`  |  Donor: ${donor}`, { align: 'right' });

      doc.moveDown();

      // --- Donation Details Table ---
      doc
        .fontSize(16)
        .fillColor('#000')
        .text(`Donation Details`, { underline: true });

      doc.moveDown(0.5);
      doc.fontSize(14)
        .text(`Amount Donated: ${amount} ETH`)
        .text(`Transaction Hash: ${txHash}`)
        .text(`Date: ${new Date().toLocaleString()}`);

      doc.moveDown(2);

      // --- Footer ---
      doc.fontSize(12)
        .fillColor('#888')
        .text('Thank you for supporting VetRelief and helping our shelters!', { align: 'center' });

      doc.end();

      // Save donation record in MySQL
      db.query(
        'INSERT INTO donations (shelterId, donor, amount, receipt) VALUES (?, ?, ?, ?)',
        [shelterId, donor, amount, receiptFile],
        (err, results) => {
          if (err) return res.status(500).send(err);
          res.json({ success: true, donationId: results.insertId, receiptPath: receiptFile });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;


//get dination detils 
// GET donations by donor address
// GET donations by donor address
router.get('/my-donations/:donor', (req, res) => {
  const donor = req.params.donor.toLowerCase(); // normalize

  db.query(
    `SELECT d.id, d.amount, d.receipt, d.createdAt, s.name AS shelterName
     FROM donations d
     JOIN shelters s ON d.shelterId = s.id
     WHERE LOWER(d.donor) = ?
     ORDER BY d.createdAt DESC`,
    [donor],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, donations: results });
    }
  );
});


module.exports = router;
