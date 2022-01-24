const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/flights', (req, res) => {
  db.createMultipleListings(req.body.data);
  res.send('ok');
});

module.exports = router;
